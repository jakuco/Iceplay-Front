// ─────────────────────────────────────────────────────────────
// championship.model.ts
// Cubre todos los casos de uso identificados en el análisis:
//   Campeonato · Fases · Equipos · Partidos · Jugadores · Reglas
// ─────────────────────────────────────────────────────────────

import type { Organization } from './organization.model';
import type { Sport }        from './sport-config.model';
import type { Team }         from './team.model';

// ─────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────

/**
 * Ciclo de vida de un campeonato.
 * La transición es lineal: draft → registration → active → finished
 * El estado cancelled es terminal y puede venir de cualquier estado.
 */
export enum ChampionshipStatus {
  Draft        = 'draft',
  Registration = 'registration',
  Active       = 'active',
  Finished     = 'finished',
  Cancelled    = 'cancelled',
}

/**
 * Tipo de fase. Determina qué subtipo de configuración se crea junto a Phase.
 */
export enum PhaseType {
  League   = 'league',    // round-robin / todos contra todos → PhaseLeagueConfig
  Knockout = 'knockout',  // eliminación directa             → PhaseKnockoutConfig
  Groups   = 'groups',    // fase de grupos                  → PhaseGroupsConfig
  Swiss    = 'swiss',     // sistema suizo                   → PhaseSwissConfig
}

export enum PhaseStatus {
  Pending  = 'pending',
  Active   = 'active',
  Finished = 'finished',
}

/**
 * Tipo de grupo dentro de una fase.
 * Nota del diagrama: se puede agregar a groupTeam.
 */
export enum GroupType {
  Group           = 'group',
  DirectAdvanced  = 'direct',
  Playoff         = 'playoff',
}


// ─────────────────────────────────────────────────────────────
// ENTIDAD PRINCIPAL
// ─────────────────────────────────────────────────────────────

export interface Championship {
  id:                   number;
  organizationId:       number;
  sportId:              number;

  // Identidad pública
  name:                 string;
  slug:                 string;
  description:          string | null;
  season:               string;
  logo:                 string | null;

  // Estado y control
  status:               ChampionshipStatus;

  // Ventana de inscripción
  registrationStartDate: Date | null;
  registrationEndDate:   Date | null;

  // Duración del torneo
  startDate:            Date | null;
  endDate:              Date | null;

  // Límites operacionales
  maxTeams:             number;
  maxPlayersPerTeam:    number;

  createdAt:            Date;
  updatedAt:            Date;
}


// ─────────────────────────────────────────────────────────────
// REDES SOCIALES
// ─────────────────────────────────────────────────────────────

export interface SocialNetwork {
  id:   number;
  name: string;
  icon: string;
}

/** Caso de uso: ver/editar redes sociales de un campeonato */
export interface SocialLink {
  id:              number;
  championshipId:  number;
  socialNetworkId: number;
  link:            string;
  socialNetwork?:  SocialNetwork;   // JOIN para mostrar name e icon
}


// ─────────────────────────────────────────────────────────────
// REGLAS DEL PARTIDO
// ─────────────────────────────────────────────────────────────

/** Catálogo de reglas (max jugadores, max tarjetas, duración, etc.) */
export interface MatchRule {
  id:    number;
  name:  string;
  value: number;   // valor default del sistema
}

/**
 * Caso de uso: reglas configuradas específicamente para
 * este campeonato + deporte, con posible override del valor default.
 */
export interface ChampionshipMatchRule {
  matchRuleId:    number;
  championshipId: number;
  sportId:        number;
  value:          number;          // override; si es null se usa MatchRule.value
  matchRule?:     MatchRule;       // JOIN para mostrar name y valor default
}


// ─────────────────────────────────────────────────────────────
// FASES — entidad base
// ─────────────────────────────────────────────────────────────

export interface Phase {
  id:             number;
  championshipId: number;
  name:           string;
  phaseType:      PhaseType;
  phaseOrder:     number;
  status:         PhaseStatus;

  // Configuración específica según phaseType (solo uno estará presente)
  leagueConfig?:   PhaseLeagueConfig;
  knockoutConfig?: PhaseKnockoutConfig;
  groupsConfig?:   PhaseGroupsConfig;
  swissConfig?:    PhaseSwissConfig;

  // Relaciones de lectura
  groups?:         GroupTeam[];
}

// ─── Subtipos de configuración de fase ───────────────────────

export interface PhaseLeagueConfig {
  id:             number;
  phaseId:        number;
  legs:           number;                    // 1 = solo ida, 2 = ida y vuelta
  tiebreakOrder:  string;                    // 'points,diff,gf,h2h,random'
  advanceCount:   number;
}

export interface PhaseKnockoutConfig {
  id:              number;
  phaseId:         number;
  legs:            number;
  fixtureMode:     string;
  seeding:         string;
  byeStrategy:     string;
  tieBreak:        string;
  awayGoalsRule:   boolean;
  thirdPlaceMatch: boolean;
}

export interface PhaseGroupsConfig {
  id:                 number;
  phaseId:            number;
  numGroups:          number;
  teamsPerGroup:      number;
  assignment:         string;
  legs:               number;
  advancePerGroup:    number;
  advanceBestThirds:  number;
  tiebreakOrder:      string;
}

export interface PhaseSwissConfig {
  id:                   number;
  phaseId:              number;
  numRounds:            number;
  pairingSystem:        string;
  firstRound:           string;
  allowRematch:         boolean;
  tiebreakOrder:        string;
  directAdvancedCount:  number;
  playoffCount:         number;
}

// ─────────────────────────────────────────────────────────────
// GRUPOS
// ─────────────────────────────────────────────────────────────

export interface GroupTeam {
  id:       number;
  phaseId:  number;
  order:    number;
  type?:    GroupType;    // puede agregarse según nota del diagrama
  name?:    string;       // 'Grupo A', 'Clasificados Directos', etc.
  teams?:   Team[];       // JOIN via Team_groupTeam
}


// ─────────────────────────────────────────────────────────────
// DTOs — CREATE
// ─────────────────────────────────────────────────────────────

/** UC: Crear campeonato */
export interface CreateChampionshipDto {
  organizationId:        number;
  sportId:               number;
  name:                  string;
  slug:                  string;
  season:                string;
  status?:               ChampionshipStatus;   // default: draft
  description?:          string;
  logo?:                 string;
  registrationStartDate?: Date;
  registrationEndDate?:   Date;
  startDate?:            Date;
  endDate?:              Date;
  maxTeams?:             number;
  maxPlayersPerTeam?:    number;
}

/** UC: Agregar red social al campeonato */
export interface CreateSocialLinkDto {
  socialNetworkId: number;
  link:            string;
}

/** UC: Crear fase */
export interface CreatePhaseDto {
  name:        string;
  phaseType:   PhaseType;
  phaseOrder:  number;
  status?:     PhaseStatus;

  // Solo uno de estos objetos debe estar presente, según phaseType
  leagueConfig?:   Omit<PhaseLeagueConfig,   'id' | 'phaseId'>;
  knockoutConfig?: Omit<PhaseKnockoutConfig, 'id' | 'phaseId'>;
  groupsConfig?:   Omit<PhaseGroupsConfig,   'id' | 'phaseId'>;
  swissConfig?:    Omit<PhaseSwissConfig,    'id' | 'phaseId'>;
}

/** UC: Crear grupo dentro de una fase */
export interface CreateGroupTeamDto {
  phaseId: number;
  order:   number;
  type?:   GroupType;
  name?:   string;
}

/** UC: Configurar regla del campeonato */
export interface CreateChampionshipMatchRuleDto {
  matchRuleId: number;
  sportId:     number;
  value:       number;
}


// ─────────────────────────────────────────────────────────────
// DTOs — UPDATE
// ─────────────────────────────────────────────────────────────

/** UC: Editar información básica del campeonato */
export interface UpdateChampionshipDto {
  name?:                 string;
  slug?:                 string;
  description?:          string;
  season?:               string;
  logo?:                 string;
  registrationStartDate?: Date | null;
  registrationEndDate?:   Date | null;
  startDate?:            Date | null;
  endDate?:              Date | null;
  maxTeams?:             number;
  maxPlayersPerTeam?:    number;
}

/**
 * UC: Cambiar estado del campeonato.
 * Separado de UpdateChampionshipDto para forzar validación de
 * transiciones en el service (draft→registration→active→finished).
 */
export interface UpdateChampionshipStatusDto {
  status: ChampionshipStatus;
}

/** UC: Editar red social */
export interface UpdateSocialLinkDto {
  link: string;
}

/** UC: Editar configuración de fase */
export interface UpdatePhaseDto {
  name?:       string;
  phaseOrder?: number;
  status?:     PhaseStatus;

  leagueConfig?:   Partial<Omit<PhaseLeagueConfig,   'id' | 'phaseId'>>;
  knockoutConfig?: Partial<Omit<PhaseKnockoutConfig, 'id' | 'phaseId'>>;
  groupsConfig?:   Partial<Omit<PhaseGroupsConfig,   'id' | 'phaseId'>>;
  swissConfig?:    Partial<Omit<PhaseSwissConfig,    'id' | 'phaseId'>>;
}

/** UC: Modificar valor de una regla */
export interface UpdateChampionshipMatchRuleDto {
  value: number;
}


// ─────────────────────────────────────────────────────────────
// DTOs — QUERY / FILTROS
// ─────────────────────────────────────────────────────────────

/** UC: Listar campeonatos con filtros */
export interface ChampionshipFiltersDto {
  organizationId?: number;
  sportId?:        number;
  status?:         ChampionshipStatus;
  season?:         string;
  search?:         string;     // fulltext sobre name y slug
  page?:           number;
  limit?:          number;
}

/** UC: Listar partidos del campeonato con filtros */
export interface MatchFiltersDto {
  groupTeamId?: number;
  status?:      string;
  matchday?:    number;
  round?:       number;
  page?:        number;
  limit?:       number;
}


// ─────────────────────────────────────────────────────────────
// RESPONSE TYPES — por caso de uso
// ─────────────────────────────────────────────────────────────

/**
 * UC: Listar campeonatos.
 * Solo campos planos para no inflar el listado. Sin relaciones profundas.
 */
export interface ChampionshipListItem {
  id:             number;
  name:           string;
  slug:           string;
  season:         string;
  logo:           string | null;
  status:         ChampionshipStatus;
  startDate:      Date | null;
  endDate:        Date | null;
  maxTeams:       number;

  // Conteos calculados (no relaciones completas)
  teamCount:      number;
  phaseCount:     number;

  // JOIN mínimo
  organization:   Pick<Organization, 'id' | 'name' | 'logo'>;
  sport:          Pick<Sport, 'id' | 'name' | 'icon'>;
}

/**
 * UC: Ver detalle de un campeonato.
 * Incluye todas las relaciones necesarias para una vista completa.
 */
export interface ChampionshipDetail extends Championship {
  organization:   Organization;
  sport:          Sport;
  socialLinks:    SocialLink[];
  phases:         Phase[];
  matchRules:     ChampionshipMatchRule[];

  // Conteos para mostrar en header sin cargar listas completas
  teamCount:      number;
  activeMatchCount: number;
}

/**
 * UC: Ver reglas del partido del campeonato.
 * Lista enriquecida con el catálogo de reglas para mostrar
 * nombre, valor default y el override configurado.
 */
export interface ChampionshipRulesResponse {
  championshipId: number;
  sportId:        number;
  rules: Array<{
    matchRuleId:    number;
    name:           string;
    defaultValue:   number;
    currentValue:   number;   // override o default si no hay override
    isOverridden:   boolean;
  }>;
}

/**
 * UC: Standings / tabla de posiciones por fase.
 * Los puntos se calculan desde MatchEvent × TypeMatchEvent.standingPoints.
 * Recomendación: materializar en tabla Standing y referenciar desde aquí.
 */
export interface PhaseStandingsResponse {
  phaseId:   number;
  phaseName: string;
  groups: Array<{
    groupTeamId:   number;
    groupName:     string | null;
    standings: Array<{
      position:       number;
      team:           Pick<Team, 'id' | 'name' | 'shortname' | 'logoUrl'>;
      played:         number;
      won:            number;
      drawn:          number;
      lost:           number;
      goalsFor:       number;
      goalsAgainst:   number;
      goalDifference: number;
      points:         number;
    }>;
  }>;
}

/**
 * UC: Campeonatos activos por deporte / por organización.
 * Subset de ChampionshipListItem con menos joins.
 */
export type ChampionshipSummary = Pick<
  ChampionshipListItem,
  'id' | 'name' | 'slug' | 'season' | 'logo' | 'status' | 'startDate' | 'endDate'
>;

/**
 * Respuesta paginada genérica para listas de campeonatos.
 */
export interface PaginatedChampionships {
  data:       ChampionshipListItem[];
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}