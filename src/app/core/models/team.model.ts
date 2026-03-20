// ─────────────────────────────────────────────────────────────
// team.model.ts
//
// Nota de dependencias:
//   · Importa Player desde player.model (relación opcional en TeamProfile)
//   · player.model NO importa de aquí — usa un TeamSummary inline
//     para evitar dependencia circular entre los dos archivos
// ─────────────────────────────────────────────────────────────

import type { Championship } from './championship.model';
import type { Player }       from './player.model';


// ─────────────────────────────────────────────────────────────
// ENTIDAD PRINCIPAL
// ─────────────────────────────────────────────────────────────

export interface Team {
  id:               number;
  championshipId:   number;

  // Identidad pública
  name:             string;
  shortname:        string;
  slug:             string;
  logoUrl:          string | null;
  documentUrl:      string | null;    // URL de documento de inscripción

  // Identidad visual
  primaryColor:     string | null;    // hex, ej. '#D4001A'
  secondaryColor:   string | null;

  // Información del club
  foundedYear:      number | null;
  homeVenue:        string | null;
  location:         string | null;

  // Datos del cuerpo técnico (desnormalizados — no es entidad propia)
  coachName:        string | null;
  coachPhone:       string | null;

  // Estado operacional
  isActive:         boolean;
  hasActiveMatches: boolean;          // campo materializado; NO calcular en runtime

  createdAt:        Date;
  updatedAt:        Date;

  // Relaciones opcionales
  championship?:    Pick<Championship, 'id' | 'name' | 'slug' | 'maxPlayersPerTeam'>;
  players?:         Player[];
  groups?:          TeamGroupTeam[];
}


// ─────────────────────────────────────────────────────────────
// PIVOT Team ↔ GroupTeam
// ─────────────────────────────────────────────────────────────

/**
 * UC: grupos en que participa un equipo / asignar equipo a grupo.
 */
export interface TeamGroupTeam {
  teamId:       number;
  groupTeamId:  number;

  // JOIN enriquecido para mostrar contexto de la fase
  groupTeam?: {
    id:         number;
    order:      number;
    name:       string | null;
    phaseId:    number;
    phaseName?: string;
    phaseType?: string;
  };
}


// ─────────────────────────────────────────────────────────────
// DTOs — CREATE
// ─────────────────────────────────────────────────────────────

/** UC: Inscribir equipo al campeonato */
export interface CreateTeamDto {
  name:            string;
  shortname:       string;
  slug:            string;
  logoUrl?:        string;
  documentUrl?:    string;
  primaryColor?:   string;
  secondaryColor?: string;
  foundedYear?:    number;
  homeVenue?:      string;
  location?:       string;
  coachName?:      string;
  coachPhone?:     string;
}

/** UC: Asignar equipo a un grupo */
export interface CreateTeamGroupTeamDto {
  teamId:      number;
  groupTeamId: number;
}


// ─────────────────────────────────────────────────────────────
// DTOs — UPDATE
// ─────────────────────────────────────────────────────────────

/** UC: Editar información del equipo */
export interface UpdateTeamDto {
  name?:           string;
  shortname?:      string;
  slug?:           string;
  logoUrl?:        string | null;
  documentUrl?:    string | null;
  primaryColor?:   string | null;
  secondaryColor?: string | null;
  foundedYear?:    number | null;
  homeVenue?:      string | null;
  location?:       string | null;
  coachName?:      string | null;
  coachPhone?:     string | null;
}

/**
 * UC: Activar / desactivar equipo.
 * Separado de UpdateTeamDto — el service debe validar:
 * si isActive=false y hasActiveMatches=true → bloquear o advertir.
 */
export interface UpdateTeamStatusDto {
  isActive: boolean;
}


// ─────────────────────────────────────────────────────────────
// DTOs — QUERY
// ─────────────────────────────────────────────────────────────

/** UC: Listar equipos del campeonato con filtros */
export interface TeamFiltersDto {
  isActive?:         boolean;
  hasActiveMatches?: boolean;
  search?:           string;   // sobre name y shortname
  page?:             number;
  limit?:            number;
}


// ─────────────────────────────────────────────────────────────
// RESPONSE TYPES
// ─────────────────────────────────────────────────────────────

/**
 * UC: Listar equipos.
 * Campos planos + playerCount. Sin array de jugadores.
 */
export interface TeamListItem {
  id:               number;
  name:             string;
  shortname:        string;
  slug:             string;
  logoUrl:          string | null;
  primaryColor:     string | null;
  secondaryColor:   string | null;
  coachName:        string | null;
  isActive:         boolean;
  hasActiveMatches: boolean;
  playerCount:      number;       // COUNT materializado, no array
}

/**
 * UC: Ver perfil de un equipo.
 * Vista completa: jugadores activos, grupos y estadísticas.
 */
export interface TeamProfile extends Team {
  players: Player[];
  groups:  TeamGroupTeam[];
  stats:   TeamStats;
}

/**
 * UC: Estadísticas del equipo en el campeonato.
 * Recomendado materializar en tabla Standing — no calcular en cada request.
 */
export interface TeamStats {
  teamId:         number;
  played:         number;
  won:            number;
  drawn:          number;
  lost:           number;
  goalsFor:       number;
  goalsAgainst:   number;
  goalDifference: number;
  points:         number;
}

/** Respuesta paginada */
export interface PaginatedTeams {
  data:       TeamListItem[];
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}