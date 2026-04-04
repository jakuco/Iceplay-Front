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
// Interfaces basadas en DTOs reales del backend
// ─────────────────────────────────────────────

/**
 * Shape exacta que devuelve el backend en GET /match/:id y en listas.
 * Basada en MatchResponseDto (Iceplay-Fropen/src/domain/dto/match/match-response.dto.ts).
 * Las fechas llegan como strings ISO 8601 al ser serializadas vía JSON.
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
  scheduledDate: string;    // ISO 8601 string
  scheduledTime: string;
  actualStartTime?: string; // ISO 8601 string
  actualEndTime?: string;   // ISO 8601 string
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
  createdAt: string;  // ISO 8601 string
  updatedAt: string;  // ISO 8601 string
}

/**
 * Ítem de match para listas paginadas (tablas, tarjetas de resultado).
 * Subset de MatchApiResponse con los campos relevantes para mostrar en UI.
 * Nota: el backend devuelve la estructura completa de MatchApiResponse en listas;
 * este tipo es un subconjunto para tipar vistas de lista sin arrastrar campos
 * de control (isClockRunning, periodScores, etc.) donde no son necesarios.
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
  scheduledDate: string; // ISO 8601 string
  scheduledTime: string;
  venue?: string;
  currentPeriod: number;
  elapsedSeconds: number;
  isClockRunning: boolean;
  isHighlighted: boolean;
}

/**
 * View Model para el panel de control en vivo.
 * Agrupa los campos de MatchApiResponse relevantes para la vista de control/marcador.
 * TODO: sin endpoint confirmado para actualización de score en vivo.
 *       Ver método updateMatchScore (comentado) en match.service.ts.
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

/**
 * Response de GET /match/schedule-by-date?date=YYYY-MM-DD
 * El backend agrupa los partidos del día por campeonato.
 * TODO: confirmar la shape exacta del response con el equipo de backend.
 *       El controller dice: "Devuelve todos los campeonatos con partidos ese día
 *       y sus datos completos." La estructura interna (campos del campeonato,
 *       array de partidos anidados, etc.) no está confirmada en los DTOs revisados.
 */
export interface ScheduleByDateResponse {
  // TODO: completar cuando el equipo de backend documente el response de getScheduleByDate.
  [key: string]: any;
}

/**
 * DTO para crear un partido vía POST /match (requiere auth).
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
 * DTO para actualizar un partido vía PUT /match/:id (requiere auth).
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
