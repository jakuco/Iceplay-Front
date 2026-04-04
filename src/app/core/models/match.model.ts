// ─────────────────────────────────────────────
// Tipos compartidos
// ─────────────────────────────────────────────

export type MatchStatus =
  | 'scheduled'
  | 'warmup'
  | 'live'
  | 'halftime'
  | 'break' // Between quarters/sets
  | 'overtime'
  | 'penalties'
  | 'finished'
  | 'suspended'
  | 'postponed'
  | 'cancelled';

export interface PeriodScore {
  period: number;
  homeScore: number;
  awayScore: number;
}

// ─────────────────────────────────────────────
// Tipos confirmados contra backend real
// Fuente: Iceplay-Fropen/src/domain/dto/match/match.dto.ts
//         Iceplay-Fropen/src/presentation/match/controller.ts
//         Iceplay-Fropen/src/presentation/services/match.service.ts
// ─────────────────────────────────────────────

/**
 * Shape confirmada de GET /matches (paginado) y GET /matches/all (array).
 * Fuente: match.dto.ts — campos exactos del mapper de la capa de presentación.
 * NO coincide con MatchApiResponse (que tenía campos inventados como round,
 * matchday, currentPeriod, isClockRunning, periodScores, etc.).
 */
export interface MatchDto {
  id: string;
  championshipId: string;
  homeTeamId: string;
  awayTeamId: string;
  scheduledDate: string;       // ISO string (mapeado desde scheduledStart)
  scheduledTime: string;       // "HH:mm"
  actualStartTime?: string;
  actualEndTime?: string;
  venue?: string;
  city?: string;
  elapsedSeconds?: number;
  homeScore: number;
  awayScore: number;
  status: string;              // 'scheduled' | 'live' | 'finished' | 'suspended' | 'postponed' | 'cancelled'
}

/**
 * Shape confirmada de GET /matches/:id, POST /matches y PUT /matches/:id.
 * El backend.service.getMatchById devuelve solo estos campos mínimos (no MatchDto completo).
 * Fuente: Iceplay-Fropen/src/presentation/services/match.service.ts:getMatchById
 *
 * ⚠️ homeScore y awayScore NO están en esta respuesta.
 * El score acumulado debe reconstruirse desde los eventos SSE.
 */
export interface MatchByIdResponse {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  scheduledStart: string;  // ISO 8601 string
  status: string;
}

/**
 * Wrapper paginado de GET /matches?page=&limit=
 * Fuente: Iceplay-Fropen/src/presentation/services/match.service.ts:getMatches
 */
export interface MatchPagedResponse {
  page: number;
  limit: number;
  total: number;
  next: string | null;
  prev: string | null;
  matches: MatchDto[];
}

/**
 * Ítem individual del resultado de GET /matches/search
 * Fuente: Iceplay-Fropen/src/presentation/services/match.service.ts:searchMatches
 * ⚠️ El campo `match` es un string concatenado (ej: "TeamA vs TeamB"), NO un MatchDto.
 */
export interface MatchSearchResult {
  id: string;
  match: string;    // concatenación de nombres: "HomeTeam vs AwayTeam"
  date: string;
  location: string;
  status: string;
}

/**
 * Wrapper paginado de GET /matches/search?...
 * Fuente: Iceplay-Fropen/src/presentation/services/match.service.ts:searchMatches
 */
export interface MatchSearchPagedResponse {
  page: number;
  limit: number;
  total: number;
  next: string | null;
  prev: string | null;
  matches: MatchSearchResult[];
}

/**
 * Resumen de equipo embebido en ScheduleMatchDto.
 * Fuente: match.dto.ts — ScheduleTeamSummary
 */
export interface ScheduleTeamSummary {
  id: string;
  name: string;
  shortname: string | null;
  logoUrl: string | null;
}

/**
 * Match enriquecido con resúmenes de equipo, usado en schedule-by-date.
 * Extiende MatchDto con homeTeam y awayTeam ya resueltos.
 * Fuente: match.dto.ts — ScheduleMatchDto
 */
export interface ScheduleMatchDto extends MatchDto {
  homeTeam: ScheduleTeamSummary;
  awayTeam: ScheduleTeamSummary;
}

/**
 * Response de GET /matches/schedule-by-date?date=YYYY-MM-DD
 * El backend devuelve UN ÚNICO OBJETO (no array) con los campeonatos del día.
 * Fuente: Iceplay-Fropen/src/presentation/services/match.service.ts:getScheduleByDate
 */
export interface DayScheduleResponse {
  date: string;
  championships: Array<{
    championship: unknown;        // shape interna del campeonato no confirmada en DTO
    matches: ScheduleMatchDto[];
  }>;
}

/**
 * @deprecated Alias mantenido para no romper imports existentes.
 * Usar DayScheduleResponse en código nuevo.
 */
export type ScheduleByDateResponse = DayScheduleResponse;

/**
 * DTO para crear un partido vía POST /matches (requiere auth).
 * Basado en CreateMatchDto (Iceplay-Fropen/src/domain/dto/match/create-match.dto.ts).
 */
export interface CreateMatchApiDto {
  groupTeamId: number;      // ID del grupo-equipo (por ahora numérico; puede cambiar a UUIDv7)
  homeTeamId: string;       // UUIDv7
  awayTeamId: string;       // UUIDv7
  scheduledStart: string;   // ISO 8601 string (el backend valida como Date)
  venue: string;
  status?: string;          // default: 'scheduled'
}

/**
 * DTO para actualizar un partido vía PUT /matches/:id (requiere auth).
 * Basado en UpdateMatchDto (Iceplay-Fropen/src/domain/dto/match/update-match.dto.ts).
 * Usa snake_case para coincidir exactamente con los campos del DTO del backend.
 */
export interface UpdateMatchApiDto {
  championship_id?: number;
  home_team_id?: number;
  away_team_id?: number;
  date?: string;            // ISO 8601 string (el backend convierte a Date)
  state?: number;
  match_events?: any;       // TODO: sin tipo confirmado para la estructura de eventos
}

// ─────────────────────────────────────────────
// MatchApiResponse — MANTENIDA SOLO PARA NO ROMPER CALLERS
// ⚠️ Esta interfaz NO coincide con ninguna respuesta real del backend.
//    Contiene campos inventados: round, matchday, group, stage, currentPeriod,
//    isClockRunning, periodScores, homeSets, awaySets, referee, organizationId, etc.
//    El backend (match.dto.ts) NO expone estos campos.
//    Migrar callers a MatchDto o MatchByIdResponse según corresponda.
// ─────────────────────────────────────────────

/**
 * @deprecated No coincide con ninguna respuesta real del backend.
 * Usar MatchDto (listas) o MatchByIdResponse (GET /:id, POST, PUT) en su lugar.
 */
export interface MatchApiResponse {
  id: string;
  championshipId: string;
  organizationId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  round: number;
  matchday: number;
  group?: string;
  stage?: string;
  scheduledDate: string;
  scheduledTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  venue?: string;
  city?: string;
  referee?: string;
  assistantReferee1?: string;
  assistantReferee2?: string;
  currentPeriod: number;
  elapsedSeconds: number;
  isClockRunning: boolean;
  periodScores: PeriodScore[];
  homeSets?: number;
  awaySets?: number;
  notes?: string;
  isHighlighted: boolean;
  streamUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @deprecated Migrar a MatchDto cuando los callers sean actualizados.
 */
export interface MatchListItem {
  id: string;
  championshipId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  round: number;
  matchday: number;
  scheduledDate: string;
  scheduledTime: string;
  venue?: string;
  currentPeriod: number;
  elapsedSeconds: number;
  isClockRunning: boolean;
  isHighlighted: boolean;
}

/**
 * View Model para el panel de control en vivo.
 * ⚠️ homeScore/awayScore/currentPeriod/elapsedSeconds/isClockRunning/periodScores
 *    NO están en MatchByIdResponse. Son manejados localmente desde eventos SSE.
 */
export interface MatchControlVm {
  id: string;
  status: MatchStatus;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  currentPeriod: number;
  elapsedSeconds: number;
  isClockRunning: boolean;
  periodScores: PeriodScore[];
  homeSets?: number;
  awaySets?: number;
}

// ─────────────────────────────────────────────
// Interfaces anteriores — comentadas, no eliminadas
// Mantenidas como referencia hasta confirmar migración completa en todos los consumidores.
// ─────────────────────────────────────────────

/**
 * @deprecated Usar MatchApiResponse en su lugar.
 * Esta interfaz mezclaba campos del frontend con la entidad de BD y no coincidía
 * con los campos reales que devuelve el backend (ej: scheduledStart vs scheduledDate,
 * groupTeamId, isActive, bracketSlotId no están en MatchResponseDto).
 */
// export interface Match {
//   id: DbId;
//   groupTeamId: DbId;
//   homeTeamId: DbId;
//   awayTeamId: DbId;
//   homeScore: number;
//   awayScore: number;
//   status: MatchStatus;
//   round: number;
//   matchDay?: number;
//   scheduledStart?: Date;
//   actualStartTime?: Date;
//   actualEndTime?: Date;
//   venue?: string;
//   city?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   bracketSlotId?: number;
//   legNumber?: number;
//   isActive: boolean;
// }

/**
 * @deprecated Usar CreateMatchApiDto en su lugar.
 * Los campos no coincidían con el CreateMatchDto del backend
 * (faltaba groupTeamId, scheduledStart vs scheduledDate/scheduledTime, etc.).
 */
// export interface CreateMatchDto {
//   homeTeamId: DbId;
//   awayTeamId: DbId;
//   scheduledDate: Date;
//   scheduledTime: string;
//   round: number;
//   matchday?: number;
//   group?: string;
//   stage?: string;
//   venue?: string;
//   referee?: string;
// }

/**
 * @deprecated Usar UpdateMatchApiDto en su lugar.
 * Los campos no coincidían con el UpdateMatchDto del backend
 * (camelCase en frontend vs snake_case en backend; campos distintos).
 */
// export interface UpdateMatchDto {
//   scheduledDate?: Date;
//   scheduledTime?: string;
//   venue?: string;
//   referee?: string;
//   assistantReferee1?: string;
//   assistantReferee2?: string;
//   status?: MatchStatus;
//   notes?: string;
//   isHighlighted?: boolean;
//   streamUrl?: string;
// }

/**
 * @deprecated Sin endpoint confirmado para actualización de score en vivo.
 * TODO: confirmar si el backend expondrá un endpoint dedicado para score.
 *       Los campos de score no están presentes en UpdateMatchDto del backend.
 */
// export interface UpdateMatchScoreDto {
//   homeScore: number;
//   awayScore: number;
//   currentPeriod?: number;
//   elapsedSeconds?: number;
//   periodScores?: PeriodScore[];
//   homeSets?: number;
//   awaySets?: number;
// }

/**
 * @deprecated El backend no popula equipos en GET /match/:id;
 * solo devuelve homeTeamId / awayTeamId. Requeriría llamada adicional a /team/:id.
 */
// export interface MatchWithTeams extends Match {
//   homeTeam: Team;
//   awayTeam: Team;
// }

// ─────────────────────────────────────────────
// Funciones utilitarias (sin cambios)
// ─────────────────────────────────────────────

/**
 * Get status label in Spanish
 */
export function getMatchStatusLabel(status: MatchStatus): string {
  const labels: Record<MatchStatus, string> = {
    scheduled: 'Programado',
    warmup: 'Calentamiento',
    live: 'En Vivo',
    halftime: 'Medio Tiempo',
    break: 'Descanso',
    overtime: 'Tiempo Extra',
    penalties: 'Penales',
    finished: 'Finalizado',
    suspended: 'Suspendido',
    postponed: 'Pospuesto',
    cancelled: 'Cancelado',
  };
  return labels[status];
}

/**
 * Check if match is in a playable state
 */
export function isMatchPlayable(status: MatchStatus): boolean {
  return ['live', 'halftime', 'break', 'overtime', 'penalties', 'warmup'].includes(status);
}
