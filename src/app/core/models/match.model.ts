// ─────────────────────────────────────────────
// Tipos base / compatibilidad
// ─────────────────────────────────────────────

import type { DbId } from './db.types';
// ─────────────────────────────────────────────
// Tipos compartidos
// ─────────────────────────────────────────────

export type MatchStatus =
  | 'scheduled'
  | 'warmup'
  | 'live'
  | 'halftime'
  | 'break'
  | 'overtime'
  | 'penalties'
  | 'finished'
  | 'suspended'
  | 'postponed'
  | 'cancelled';

/**
 * Match entity / modelo amplio de frontend.
 * Mantiene campos ricos usados por otras pantallas.
 *
 * Nota:
 * no coincide 1:1 con todas las respuestas reales del backend;
 * para integración HTTP usar MatchDto o MatchByIdResponse.
 */
export interface Match {
  id: DbId;
  championshipId?: DbId;
  groupTeamId?: DbId;
  homeTeamId: DbId;
  awayTeamId: DbId;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  round?: number;
  matchDay?: number;
  scheduledStart?: Date | string;
  actualStartTime?: Date | string;
  actualEndTime?: Date | string;
  venue?: string;
  city?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  bracketSlotId?: number;
  legNumber?: number;
  isActive?: boolean;
}

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
 */
export interface MatchDto {
  id: string;
  championshipId: string;
  homeTeamId: string;
  awayTeamId: string;
  scheduledDate: string;
  scheduledTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  venue?: string;
  city?: string;
  elapsedSeconds?: number;
  homeScore: number;
  awayScore: number;
  status: string;
}

/**
 * Shape confirmada de GET /matches/:id, POST /matches y PUT /matches/:id.
 *
 * ⚠️ homeScore y awayScore NO están en esta respuesta.
 * ⚠️ venue NO está garantizado en esta respuesta.
 */
export interface MatchByIdResponse {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  scheduledStart: string;
  status: string;
}

/**
 * Wrapper paginado de GET /matches?page=&limit=
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
 */
export interface MatchSearchResult {
  id: string;
  match: string;
  date: string;
  location: string;
  status: string;
}

/**
 * Wrapper paginado de GET /matches/search?...
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
 * Resumen de equipo embebido en schedule-by-date.
 */
export interface ScheduleTeamSummary {
  id: string;
  name: string;
  shortname: string | null;
  logoUrl: string | null;
}

/**
 * Match enriquecido con resúmenes de equipo, usado en schedule-by-date.
 */
export interface ScheduleMatchDto extends MatchDto {
  homeTeam: ScheduleTeamSummary;
  awayTeam: ScheduleTeamSummary;
}

/**
 * Metadatos de campeonato en schedule-by-date.
 */
export interface ScheduleByDateChampionshipMeta {
  id?: string;
  name?: string;
  organization?: {
    id?: string;
    name?: string;
    country?: string;
    logo?: string | null;
  };
}

export interface ScheduleByDateChampionshipBlock {
  championship: ScheduleByDateChampionshipMeta | unknown;
  matches: ScheduleMatchDto[];
}

/**
 * Response de GET /matches/schedule-by-date?date=YYYY-MM-DD
 * El backend devuelve un único objeto.
 */
export interface DayScheduleResponse {
  date: string;
  championships: ScheduleByDateChampionshipBlock[];
}

/**
 * Alias de compatibilidad
 */
export type ScheduleByDateResponse = DayScheduleResponse;

/**
 * DTO para crear un partido vía POST /matches.
 * Mantengo compatibilidad con valores numéricos o string según branch/origen.
 */
export interface CreateMatchApiDto {
  groupTeamId: DbId;
  homeTeamId: string;
  awayTeamId: string;
  scheduledStart: string;
  venue?: string;
  status?: string;
}

/**
 * DTO para actualizar un partido vía PUT /matches/:id.
 *
 * Se mantiene flexible para no romper ramas con naming distinto.
 * El backend real debe terminar imponiendo el contrato definitivo.
 */
export interface UpdateMatchApiDto {
  status?: MatchStatus | string;

  championship_id?: number;
  home_team_id?: number;
  away_team_id?: number;
  date?: string;
  state?: number;
  match_events?: unknown;

  championshipId?: string | number;
  homeTeamId?: string | number;
  awayTeamId?: string | number;
  scheduledStart?: string;
  venue?: string;
  city?: string;
}

// ─────────────────────────────────────────────
// MatchApiResponse — legado, mantenido por compatibilidad
// ─────────────────────────────────────────────

/**
 * @deprecated No coincide exactamente con una única respuesta real del backend.
 * Usar MatchDto o MatchByIdResponse cuando sea posible.
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
 * View Model para panel de control.
 * Estos campos no vienen en MatchByIdResponse; se manejan localmente.
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
// Funciones utilitarias
// ─────────────────────────────────────────────

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

export function isMatchPlayable(status: MatchStatus): boolean {
  return ['live', 'halftime', 'break', 'overtime', 'penalties', 'warmup'].includes(status);
}