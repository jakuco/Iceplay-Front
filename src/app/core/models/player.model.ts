// ─────────────────────────────────────────────────────────────
// player.model.ts
//
// Nota de dependencias:
//   · NO importa Team directamente para evitar dependencia circular.
//     La referencia al equipo se modela como TeamSummary inline.
//   · Importa Position y TypeMatchEvent desde sport-config.model
//     para tipar estadísticas y convocatorias.
// ─────────────────────────────────────────────────────────────

import type { Position, TypeMatchEvent } from './sport-config.model';
import type { DbId } from './db.types';


// ─────────────────────────────────────────────────────────────
// Interfaces basadas en DTOs reales del backend (Fase 2D)
// Fuente: Iceplay-Fropen/src/domain/dto/player/
// ─────────────────────────────────────────────────────────────

/**
 * Shape exacta devuelta por el backend en GET /player/:id y listas.
 * Todos los campos reflejan las columnas reales de la tabla `players` en Drizzle.
 * Las fechas llegan como strings ISO 8601 o null — NO como objetos Date.
 *
 * NOTA SOBRE height/weight:
 *   El backend usa tipo `numeric` en PostgreSQL, que Drizzle devuelve como
 *   `string | null` (no number). Los valores deben parsearse con parseFloat()
 *   antes de usarse en cálculos. El ViewModel `Player` los expone como `number`.
 *
 * NOTA SOBRE positionId:
 *   Es `integer` en DB sin `.notNull()` → puede ser null.
 *   El backend devuelve el ID como string (los serializa en PlayerResponseDto).
 */
export interface PlayerApiResponse {
  id: string;
  teamId: string;
  /** positionId es integer nullable en DB; el backend lo serializa a string */
  positionId: string | null;
  photoUrl: string | null;
  firstName: string;
  lastName: string;
  nickName: string | null;
  number: number | null;
  birthDate: string | null;           // date → 'YYYY-MM-DD' string
  /** numeric en DB → Drizzle retorna string, no number */
  height: string | null;
  /** numeric en DB → Drizzle retorna string, no number */
  weight: string | null;
  status: string;                     // 'Active' | 'suspended' | 'injured' | 'inactive'
  suspensionEndDate: string | null;   // date → 'YYYY-MM-DD' string
  suspensionReason: string | null;
  isActive: boolean;
  createdAt: string;                  // ISO 8601 timestamp string
  updatedAt: string;                  // ISO 8601 timestamp string

  // Relaciones opcionales — presentes solo en GET /players/:id (con JOIN)
  team?: { id: string; name: string; shortname: string };
  position?: { id: number; code: string; label: string; abbreviation: string };
}

/**
 * Shape REAL de la respuesta paginada de GET /players.
 * Confirmado en Iceplay-Fropen/src/presentation/services/player.service.ts:
 *   return { page, limit, total, next, prev, players: rows }
 *
 * IMPORTANTE: el campo es `players`, NO `data`.
 * El frontend NO debe tratar esta respuesta como array plano.
 *
 * Filtros reales soportados por HTTP: SÓLO page y limit.
 * teamId, championshipId, organizationId → el controller los IGNORA (no los lee de req.query).
 * Los filtros teamId/status sí existen en el service backend, pero no se exponen en HTTP.
 */
export interface PlayerApiPaginatedResponse {
  page: number;
  limit: number;
  total: number;
  next: string | null;
  prev: string | null;
  players: PlayerApiResponse[];
}

/**
 * DTO para crear un jugador vía POST /player (requiere auth).
 * Basado en CreatePlayerDto (create-player.dto.ts).
 *
 * NOTA CRÍTICA DE NOMBRES: el backend usa snake_case y nombres distintos al frontend.
 *   · `name`             → equivale a firstName
 *   · `lastname`         → equivale a lastName
 *   · `team_id`          → numérico (no string)
 *   · `primary_position` → equivale a positionId
 *
 * NO confundir con el CreatePlayerDto del frontend (player.model.ts), que usa camelCase.
 */
export interface CreatePlayerApiDto {
  player_id: number;           // ID externo del jugador; requerido
  number: number;              // número de camiseta; requerido
  name: string;                // firstName — requerido
  lastname: string;            // lastName — requerido
  team_id: number;             // ID numérico del equipo; requerido
  weight?: number;
  height?: number;
  primary_position?: number;   // positionId
  secondary_position?: number;
  home_country?: string;
  state_id?: number;
  type?: number;
  player_statics?: any;        // TODO: sin tipo confirmado en el backend
}

/**
 * DTO para actualizar un jugador vía PUT /player/:id (requiere auth).
 * Basado en UpdatePlayerDto (update-player.dto.ts).
 * Usa camelCase — distinto del CreatePlayerApiDto que usa snake_case.
 */
export interface UpdatePlayerApiDto {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  number?: number;
  birthDate?: string;          // ISO 8601 string (el backend convierte a Date internamente)
  height?: number;
  weight?: number;
  positionId?: number;
  status?: string;             // 'active' | 'suspended' | 'injured' | 'inactive'
  suspensionEndDate?: string;  // ISO 8601 string
  suspensionReason?: string;
}


// ─────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────

/**
 * Estado del jugador.
 * Afecta directamente la disponibilidad para convocatorias.
 *
 *  active     → disponible para ser convocado a partido
 *  suspended  → sancionado; suspensionEndDate indica cuándo se levanta
 *  injured    → baja médica; no convocable pero preserva historial
 *  inactive   → soft-delete; dado de baja del equipo
 */
export enum PlayerStatus {
  Active = 'active',
  Suspended = 'suspended',
  Injured = 'injured',
  Inactive = 'inactive',
}


// ─────────────────────────────────────────────────────────────
// TIPOS AUXILIARES
// ─────────────────────────────────────────────────────────────

/**
 * Resumen mínimo del equipo para mostrar en contexto del jugador.
 * Definido inline para evitar dependencia circular con team.model.
 */
export interface TeamSummary {
  id: DbId;
  name: string;
  shortname: string;
  logoUrl: string | null;
}


// ─────────────────────────────────────────────────────────────
// ENTIDAD PRINCIPAL (tipo frontend — fechas como Date)
// ─────────────────────────────────────────────────────────────

/**
 * Modelo de jugador para uso en la UI (fechas como Date, no string).
 * Se obtiene parseando PlayerApiResponse en el service.
 * Para el contrato HTTP real, usar PlayerApiResponse.
 *
 * NOTA DE NULLABILIDAD (según schema de DB):
 *   positionId, number, birthDate son nullable en la tabla players.
 *   height/weight en la API vienen como string (numeric en Drizzle) —
 *   el service debe parsearlos a number antes de asignarlos al ViewModel.
 */
export interface Player {
  id: DbId;
  teamId: DbId;
  /**
   * ⚠️ Nullable en DB (integer sin NOT NULL).
   * En el ViewModel se mantiene no-null para compatibilidad con callers
   * que usan positionId como argumento de tipo number (p.ej. positionLabel()).
   * El service debe proveer un fallback (p.ej. 0) al parsear PlayerApiResponse.
   */
  positionId: DbId;
  photoUrl?: string | null;

  // Datos personales
  firstName: string;
  lastName: string;
  nickName: string | null;
  /** nullable en DB — date sin NOT NULL */
  birthDate: Date | null;

  // Datos deportivos
  /**
   * ⚠️ Nullable en DB (integer sin NOT NULL).
   * El service debe proveer un fallback (p.ej. 0) al parsear PlayerApiResponse.
   */
  number: number;
  height: number | null; // cm — parseado desde string (numeric en Drizzle)
  weight: number | null; // kg — parseado desde string (numeric en Drizzle)

  // Estado y sanciones
  status: PlayerStatus;
  suspensionEndDate: Date | null;
  suspensionReason: string | null;
  /** NOT NULL en DB con default true */
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  // Relaciones opcionales (populadas por joins; NO vienen en GET /player por defecto)
  position?: Position;
  team?: TeamSummary;
}


// ─────────────────────────────────────────────────────────────
// PIVOT Match ↔ Player (convocatoria)
// ─────────────────────────────────────────────────────────────

/**
 * UC: jugadores convocados a un partido.
 * Registra qué jugadores fueron habilitados para un partido específico.
 */
export interface MatchPlayer {
  matchId: DbId;
  playerId: DbId;
  isStarter?: boolean;
  minutesPlayed?: number | null;
  player?: Pick<Player, 'id' | 'firstName' | 'lastName' | 'nickName' | 'number' | 'positionId'>;
}


// ─────────────────────────────────────────────────────────────
// DTOs — CREATE (frontend — NO usar directamente con el backend)
// ─────────────────────────────────────────────────────────────

/**
 * @deprecated Para llamadas HTTP al backend usar CreatePlayerApiDto.
 * Este DTO usa camelCase y no coincide con los campos reales del backend
 * (el backend espera name/lastname/team_id en snake_case).
 * Se mantiene para no romper componentes existentes.
 */
export interface CreatePlayerDto {
  positionId: DbId;
  firstName: string;
  lastName: string;
  nickName?: string;
  birthDate: Date;
  number: number;
  height?: number;
  weight?: number;
}

/** UC: Convocar jugador a partido */
export interface CreateMatchPlayerDto {
  playerId: DbId;   // validar que pertenezca al homeTeam o awayTeam del Match
}


// ─────────────────────────────────────────────────────────────
// DTOs — UPDATE (frontend — NO usar directamente con el backend)
// ─────────────────────────────────────────────────────────────

/**
 * @deprecated Para llamadas HTTP al backend usar UpdatePlayerApiDto.
 * Este DTO de frontend omite campos que el backend sí acepta
 * (status, suspensionEndDate, suspensionReason, positionId, birthDate).
 * Se mantiene para no romper componentes existentes.
 */
export interface UpdatePlayerDto {
  firstName?: string;
  lastName?: string;
  nickName?: string | null;
  number?: number;        // validar unicidad dentro del equipo
  height?: number | null;
  weight?: number | null;
}

/**
 * UC: Cambiar equipo del jugador (transferencia).
 * TODO: sin endpoint confirmado en el backend para transferencia.
 */
export interface TransferPlayerDto {
  teamId: DbId;
}

/**
 * UC: Sancionar jugador.
 * TODO: sin endpoint dedicado confirmado. Los campos de suspensión
 *       se pueden enviar via UpdatePlayerApiDto (PUT /player/:id).
 */
export interface SuspendPlayerDto {
  suspensionEndDate: Date;
  suspensionReason: string;
}

/**
 * UC: Levantar sanción manualmente (apelación).
 * TODO: sin endpoint confirmado.
 */
export type LiftSuspensionDto = Record<never, never>;


// ─────────────────────────────────────────────────────────────
// DTOs — QUERY
// ─────────────────────────────────────────────────────────────

/**
 * UC: Listar jugadores de un equipo con filtros.
 * TODO: el backend solo acepta page/limit en GET /player.
 *       Ninguno de estos filtros está confirmado como query param.
 */
export interface PlayerFiltersDto {
  status?: PlayerStatus;
  positionId?: DbId;
  search?: string;       // sobre firstName, lastName, nickName
  page?: number;
  limit?: number;
}


// ─────────────────────────────────────────────────────────────
// RESPONSE TYPES
// ─────────────────────────────────────────────────────────────

/**
 * UC: Perfil de jugador con estadísticas del campeonato.
 * TODO: sin endpoint confirmado para stats de jugador.
 */
export interface PlayerProfile extends Player {
  stats: PlayerStats;
}

/**
 * UC: Estadísticas del jugador calculadas desde MatchEvent.
 */
export interface PlayerStats {
  playerId: DbId;
  matchesPlayed: number;
  minutesPlayed: number | null;
  eventStats: Array<{
    typeMatchEvent: Pick<TypeMatchEvent, 'id' | 'label' | 'icon' | 'color' | 'category'>;
    count: number;
  }>;
}

/**
 * UC: Jugadores disponibles para convocatoria.
 */
export type PlayerConvocationItem = Pick<
  Player,
  'id' | 'firstName' | 'lastName' | 'nickName' | 'number' | 'positionId' | 'status'
> & {
  position: Pick<Position, 'label' | 'abbreviation'>;
};

/** Respuesta paginada */
export interface PaginatedPlayers {
  data: Player[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Stats vacías hasta que el backend devuelva `PlayerProfile.stats`. */
export function createEmptyPlayerStats(playerId: DbId): PlayerStats {
  return {
    playerId,
    matchesPlayed: 0,
    minutesPlayed: null,
    eventStats: [],
  };
}
