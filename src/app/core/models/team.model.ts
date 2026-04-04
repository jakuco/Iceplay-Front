// ─────────────────────────────────────────────────────────────
// team.model.ts
//
// Nota de dependencias:
//   · Importa Player desde player.model (relación opcional en TeamProfile)
//   · player.model NO importa de aquí — usa un TeamSummary inline
//     para evitar dependencia circular entre los dos archivos
// ─────────────────────────────────────────────────────────────

import type { Championship } from './championship.model';
import type { Player } from './player.model';
import type { DbId } from './db.types';


// ─────────────────────────────────────────────────────────────
// Interfaces basadas en DTOs reales del backend (Fase 2D)
// Fuente: Iceplay-Fropen/src/domain/dto/team/
// ─────────────────────────────────────────────────────────────

/**
 * Shape devuelta por el backend en GET /team/:id y listas.
 *
 * TODO: el backend no tiene un TeamResponseDto explícito y completo.
 *       El archivo team.dto.ts solo define id, name, shortName, logo?, city?
 *       (el resto está comentado). Esta interfaz combina los campos visibles
 *       en TeamDTO + UpdateTeamDto como guía aproximada.
 *       Confirmar con el backend la shape real antes de añadir campos.
 *
 * NOTA: el backend usa `shortname` (minúscula) en UpdateTeamDto, pero
 *       TeamDTO usa `shortName` (camelCase). Se usa `shortname` por alineación
 *       con UpdateTeamDto ya que es el DTO más reciente y completo.
 */
export interface TeamApiResponse {
  id: string;
  name: string;
  shortname: string;
  logoUrl?: string | null;
  city?: string;
  // Campos presentes en UpdateTeamDto — pueden no estar en el response por defecto
  slug?: string;
  documentURL?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  foundedYear?: number | null;
  homeVenue?: number | null;    // ID numérico de la cancha (no string)
  location?: string | null;
  coachName?: string | null;
  coachPhone?: string | null;
  isActive?: boolean;
}

/**
 * DTO para crear un equipo vía POST /team (requiere auth).
 * Basado en CreateTeamDto (create-team.dto.ts).
 *
 * IMPORTANTE: POST /team está COMENTADO en routes.ts — no hay endpoint
 * público de creación de equipo actualmente. Este DTO existe como referencia
 * para cuando el endpoint sea habilitado. NO usar en producción todavía.
 */
export interface CreateTeamApiDto {
  team_id: number;   // ID externo del equipo; requerido
  name: string;      // requerido
  shortname: string; // requerido
  city: string;      // requerido
}

/**
 * DTO para actualizar un equipo vía PUT /team/:id (requiere auth).
 * Basado en UpdateTeamDto (update-team.dto.ts).
 *
 * NOTA: `homeVenue` es número (ID de cancha), no string.
 *       `documentURL` usa mayúscula (URL), no `documentUrl`.
 */
export interface UpdateTeamApiDto {
  name?: string;
  shortname?: string;
  slug?: string;
  logoUrl?: string;
  documentURL?: string;   // nota: mayúscula en URL, según UpdateTeamDto del backend
  primaryColor?: string;
  secondaryColor?: string;
  foundedYear?: number;
  homeVenue?: number;     // ID numérico de la cancha
  location?: string;
  coachName?: string;
  coachPhone?: string;
  isActive?: boolean;
}


// ─────────────────────────────────────────────────────────────
// ENTIDAD PRINCIPAL (tipo frontend)
// ─────────────────────────────────────────────────────────────

/**
 * Modelo de equipo para uso en la UI.
 * Para el contrato HTTP real, usar TeamApiResponse.
 *
 * @note Varios campos de esta interfaz NO están confirmados
 *       en el response actual del backend (ej: hasActiveMatches, groups,
 *       championship, documentUrl). Se mantienen para la UI existente.
 */
export interface Team {
  id: DbId;
  championshipId: DbId;

  // Identidad pública
  name: string;
  shortname: string;
  slug: string;
  logoUrl: string | null;
  documentUrl: string | null;    // URL de documento de inscripción

  // Identidad visual
  primaryColor: string | null;
  secondaryColor: string | null;

  // Información del club
  foundedYear: number | null;
  homeVenue: string | null;
  location: string | null;

  // Datos del cuerpo técnico
  coachName: string | null;
  coachPhone: string | null;

  // Estado operacional
  isActive: boolean;
  hasActiveMatches: boolean;
  isTeamActive?: boolean;

  createdAt: Date;
  updatedAt: Date;

  // Relaciones opcionales
  championship?: Pick<Championship, 'id' | 'name' | 'slug' | 'maxPlayersPerTeam'>;
  players?: Player[];
  groups?: TeamGroupTeam[];
}


// ─────────────────────────────────────────────────────────────
// PIVOT Team ↔ GroupTeam
// ─────────────────────────────────────────────────────────────

export interface TeamGroupTeam {
  teamId: DbId;
  groupTeamId: DbId;

  groupTeam?: {
    id: DbId;
    order: number;
    name: string | null;
    phaseId: DbId;
    phaseName?: string;
    phaseType?: string;
  };
}


// ─────────────────────────────────────────────────────────────
// DTOs — CREATE (frontend — parcialmente incompatible con backend)
// ─────────────────────────────────────────────────────────────

/**
 * @deprecated Para llamadas HTTP usar CreateTeamApiDto.
 * Además, POST /team está comentado en routes.ts (sin endpoint público).
 * Se mantiene para no romper código existente (CSV import).
 *
 * DISCREPANCIAS con el backend:
 *   · Frontend: slug, logoUrl, primaryColor, etc. (campos ricos)
 *   · Backend CreateTeamDto: solo team_id, name, shortname, city
 */
export interface CreateTeamDto {
  name: string;
  shortname: string;
  slug: string;
  logoUrl?: string;
  documentUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  foundedYear?: number;
  homeVenue?: string;
  location?: string;
  coachName?: string;
  coachPhone?: string;
}

/** UC: Asignar equipo a un grupo */
export interface CreateTeamGroupTeamDto {
  teamId: DbId;
  groupTeamId: DbId;
}


// ─────────────────────────────────────────────────────────────
// DTOs — UPDATE (frontend — usar UpdateTeamApiDto para HTTP)
// ─────────────────────────────────────────────────────────────

/**
 * @deprecated Para llamadas HTTP usar UpdateTeamApiDto.
 * Discrepancias: `documentUrl` (frontend) vs `documentURL` (backend),
 *                `homeVenue: string|null` (frontend) vs `homeVenue: number` (backend).
 * Se mantiene para no romper componentes existentes.
 */
export interface UpdateTeamDto {
  name?: string;
  shortname?: string;
  slug?: string;
  logoUrl?: string | null;
  documentUrl?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  foundedYear?: number | null;
  homeVenue?: string | null;
  location?: string | null;
  coachName?: string | null;
  coachPhone?: string | null;
}

/**
 * UC: Activar / desactivar equipo.
 * TODO: isActive está dentro de UpdateTeamApiDto — no hay endpoint separado.
 */
export interface UpdateTeamStatusDto {
  isActive: boolean;
}


// ─────────────────────────────────────────────────────────────
// DTOs — QUERY
// ─────────────────────────────────────────────────────────────

/**
 * UC: Listar equipos del campeonato con filtros.
 * Filtros confirmados en GET /team: organizationId, championshipId, page, limit.
 * Filtros NOT confirmados: isActive, hasActiveMatches, search.
 */
export interface TeamFiltersDto {
  organizationId?: string;  // CONFIRMADO en backend controller
  championshipId?: string;  // CONFIRMADO en backend controller
  isActive?: boolean;       // TODO: no confirmado como query param
  hasActiveMatches?: boolean; // TODO: no confirmado como query param
  search?: string;          // TODO: no confirmado como query param
  page?: number;
  limit?: number;
}


// ─────────────────────────────────────────────────────────────
// RESPONSE TYPES
// ─────────────────────────────────────────────────────────────

export interface TeamListItem {
  id: number;
  name: string;
  shortname: string;
  slug: string;
  logoUrl: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  coachName: string | null;
  isActive: boolean;
  hasActiveMatches: boolean;
  playerCount: number;
}

/**
 * UC: Ver perfil de un equipo (composición frontend).
 * players y stats NO vienen del backend en un solo request —
 * se construyen con forkJoin en el service.
 */
export interface TeamProfile extends Team {
  players: Player[];
  groups: TeamGroupTeam[];
  stats: TeamStats;
}

export interface TeamStats {
  teamId: DbId;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface PaginatedTeams {
  data: TeamListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
