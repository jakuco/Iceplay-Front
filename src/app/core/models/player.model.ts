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
  Active    = 'active',
  Suspended = 'suspended',
  Injured   = 'injured',
  Inactive  = 'inactive',
}


// ─────────────────────────────────────────────────────────────
// TIPOS AUXILIARES
// ─────────────────────────────────────────────────────────────

/**
 * Resumen mínimo del equipo para mostrar en contexto del jugador.
 * Definido inline para evitar dependencia circular con team.model.
 */
export interface TeamSummary {
  id:        number;
  name:      string;
  shortname: string;
  logoUrl:   string | null;
}


// ─────────────────────────────────────────────────────────────
// ENTIDAD PRINCIPAL
// ─────────────────────────────────────────────────────────────

export interface Player {
  id:         number;
  teamId:     number;
  positionId: number;

  // Datos personales
  firstName:  string;
  lastName:   string;
  nickName:   string | null;
  birthDate:  Date;

  // Datos deportivos
  number:     number;        // número de camiseta; único por equipo
  height:     number | null; // cm
  weight:     number | null; // kg

  // Estado y sanciones
  status:             PlayerStatus;
  suspensionEndDate:  Date | null;
  suspensionReason:   string | null;

  createdAt:  Date;
  updatedAt:  Date;

  // Relaciones opcionales
  position?:  Position;
  team?:      TeamSummary;
}


// ─────────────────────────────────────────────────────────────
// PIVOT Match ↔ Player (convocatoria)
// ─────────────────────────────────────────────────────────────

/**
 * UC: jugadores convocados a un partido.
 * Registra qué jugadores fueron habilitados para un partido específico.
 */
export interface MatchPlayer {
  matchId:  number;
  playerId: number;
  player?:  Pick<Player, 'id' | 'firstName' | 'lastName' | 'nickName' | 'number' | 'positionId'>;
}


// ─────────────────────────────────────────────────────────────
// DTOs — CREATE
// ─────────────────────────────────────────────────────────────

/**
 * UC: Inscribir jugador en equipo.
 * positionId debe validarse contra SportPosition del deporte del campeonato.
 * number debe ser único dentro del equipo.
 */
export interface CreatePlayerDto {
  positionId: number;
  firstName:  string;
  lastName:   string;
  nickName?:  string;
  birthDate:  Date;
  number:     number;
  height?:    number;
  weight?:    number;
}

/** UC: Convocar jugador a partido */
export interface CreateMatchPlayerDto {
  playerId: number;   // validar que pertenezca al homeTeam o awayTeam del Match
}


// ─────────────────────────────────────────────────────────────
// DTOs — UPDATE
// ─────────────────────────────────────────────────────────────

/** UC: Editar datos básicos del jugador (sin implicaciones de negocio) */
export interface UpdatePlayerDto {
  firstName?: string;
  lastName?:  string;
  nickName?:  string | null;
  number?:    number;        // validar unicidad dentro del equipo
  height?:    number | null;
  weight?:    number | null;
}

/**
 * UC: Cambiar equipo del jugador (transferencia).
 * El nuevo teamId debe pertenecer al mismo campeonato.
 * El historial de MatchEvent permanece intacto — referencia playerId, no teamId.
 */
export interface TransferPlayerDto {
  teamId: number;
}

/**
 * UC: Sancionar jugador.
 * Separado de UpdatePlayerDto para que el service pueda
 * auditar y disparar notificaciones específicas de sanción.
 * Normalmente disparado por acumulación de tarjetas desde MatchEvent.
 */
export interface SuspendPlayerDto {
  suspensionEndDate:  Date;
  suspensionReason:   string;
}

/**
 * UC: Levantar sanción manualmente (apelación).
 * Sin payload — el service resetea status=active y nullea los campos de suspensión.
 */
export type LiftSuspensionDto = Record<never, never>;


// ─────────────────────────────────────────────────────────────
// DTOs — QUERY
// ─────────────────────────────────────────────────────────────

/** UC: Listar jugadores de un equipo con filtros */
export interface PlayerFiltersDto {
  status?:     PlayerStatus;
  positionId?: number;
  search?:     string;       // sobre firstName, lastName, nickName
  page?:       number;
  limit?:      number;
}


// ─────────────────────────────────────────────────────────────
// RESPONSE TYPES
// ─────────────────────────────────────────────────────────────

/**
 * UC: Perfil de jugador con estadísticas del campeonato.
 */
export interface PlayerProfile extends Player {
  stats: PlayerStats;
}

/**
 * UC: Estadísticas del jugador calculadas desde MatchEvent.
 * matchesPlayed viene de MatchPlayer.
 * eventStats agrupa conteos por TypeMatchEvent (goles, tarjetas, etc.).
 */
export interface PlayerStats {
  playerId:      number;
  matchesPlayed: number;
  minutesPlayed: number | null;   // solo si el deporte registra tiempo exacto
  eventStats: Array<{
    typeMatchEvent: Pick<TypeMatchEvent, 'id' | 'label' | 'icon' | 'color' | 'category'>;
    count:          number;
  }>;
}

/**
 * UC: Jugadores disponibles para convocatoria.
 * Subset mínimo para poblar el selector de convocatoria.
 */
export type PlayerConvocationItem = Pick<
  Player,
  'id' | 'firstName' | 'lastName' | 'nickName' | 'number' | 'positionId' | 'status'
> & {
  position: Pick<Position, 'label' | 'abbreviation'>;
};

/** Respuesta paginada */
export interface PaginatedPlayers {
  data:       Player[];
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}