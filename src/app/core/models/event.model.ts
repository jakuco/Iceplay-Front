import type { Player } from './player.model';
import type { Team } from './team.model';
import type { DbId } from './db.types';

type PlayerBasicInfo = Pick<
  Player,
  'id' | 'firstName' | 'lastName' | 'nickName' | 'number' | 'positionId'
>;

type TeamBasicInfo = Pick<Team, 'id' | 'name' | 'shortname' | 'logoUrl'>;

/**
 * Match event entity
 *
 * Espejo de FullEventDTO del backend con compatibilidad frontend.
 *
 * Notas:
 * - El backend usa `relatedEventMatch`
 * - Algunas ramas del front usaban `relatedEventMatchId`
 * - Se soportan ambas, pero la fuente principal es `relatedEventMatch`
 * - `player` y `team` no están garantizados en SSE; se dejan opcionales
 */
export interface MatchEvent {
  id: DbId;
  matchId: DbId;
  typeMatchEventId: number;

  /**
   * Tiempo del evento en segundos corridos del partido.
   * El backend sí lo maneja y el frontend lo usa para ordenar y mapear.
   */
  time: number;

  typeMatchEvent: {
    id: number;
    label: string;
    category: string;
    icon?: string;
    color?: string;
    matchPoint?: number;
    standingPoints?: number;
  };

  teamId?: DbId;
  playerId?: DbId;

  /**
   * Nombre real del backend actual.
   */
  relatedEventMatch?: string;

  /**
   * Alias legacy para compatibilidad de ramas viejas.
   */
  relatedEventMatchId?: DbId;

  description?: string | null;

  /**
   * Opcionales del frontend; normalmente no vienen en SSE.
   */
  player?: PlayerBasicInfo;
  team?: TeamBasicInfo;
}

/**
 * DTO para crear evento
 *
 * Backend real:
 * - `typeMatchEventId`
 * - `time`
 * - `playerId?`
 * - `teamId?`
 * - `relatedEventMatch?`
 * - `description?`
 *
 * Se mantiene `matchId` por compatibilidad, aunque el backend lo toma de la URL.
 */
export interface CreateMatchEventDto {
  matchId: DbId;
  typeMatchEventId: number;
  time: number;
  playerId?: DbId;
  teamId?: DbId;
  relatedEventMatch?: string;
  description?: string;
}

/**
 * Alias de compatibilidad con ramas que usan CreateEventDto.
 */
export type CreateEventDto = CreateMatchEventDto;

/**
 * DTO para actualizar evento
 *
 * No hay endpoint confirmado de update en backend actual,
 * pero se mantiene como referencia/compatibilidad.
 */
export interface UpdateMatchEventDto {
  typeMatchEventId?: number;
  time?: number;
  playerId?: DbId;
  teamId?: DbId;
  relatedEventMatch?: string;
  description?: string;
}

/**
 * Alias de compatibilidad con ramas que usan UpdateEventDto.
 */
export type UpdateEventDto = UpdateMatchEventDto;

/**
 * ViewModel usado por templates y panel de control.
 */
export interface MatchEventViewModel {
  id: DbId;
  matchId: DbId;
  typeId: number;
  typeLabel: string;
  typeIcon: string;
  typeColor: string;
  category: string;
  period: number;
  minute: number;
  extraMinute: number;
  timeFormatted: string;
  timeRaw: number;
  playerId?: DbId;
  playerInfo?: PlayerBasicInfo;
  teamId?: DbId;
  teamInfo?: TeamBasicInfo;
  relatedEventMatchId?: DbId | string;
  description?: string | null;
  isHomeTeam: boolean;
}

/**
 * Event for display in timeline
 */
export interface EventTimelineItem {
  id: DbId;
  type: string;
  typeLabel: string;
  typeIcon: string;
  typeColor: string;
  minute: string;
  player: PlayerBasicInfo;
  team: TeamBasicInfo;
  relatedPlayer?: PlayerBasicInfo;
  description?: string;
  isHomeTeam: boolean;
}

/**
 * Convierte segundos corridos a periodo/minuto/extraMinute.
 */
export function secondsToMatchTime(
  timeInSeconds: number,
  periodDuration: number
): {
  period: number;
  minute: number;
  extraMinute: number;
} {
  const safeSeconds = Math.max(0, timeInSeconds);
  const safePeriodDuration = Math.max(1, periodDuration);

  const period = Math.floor(safeSeconds / safePeriodDuration) + 1;
  const secondsIntoPeriod = safeSeconds % safePeriodDuration;

  const minute = Math.floor(secondsIntoPeriod / 60);
  const extraMinute = 0;

  return { period, minute, extraMinute };
}

/**
 * Format match time for UI.
 */
export function formatMatchTime(minute: number, extraMinute = 0): string {
  if (extraMinute > 0) {
    return `${minute}+${extraMinute}'`;
  }
  return `${minute}'`;
}

/**
 * Alias usado por otras ramas.
 */
export function formatEventMinute(minute: number, extraMinute?: number): string {
  return formatMatchTime(minute, extraMinute ?? 0);
}

/**
 * Mapper principal de entidad backend -> ViewModel frontend
 */
export function mapEventToViewModel(
  event: MatchEvent,
  homeTeamId: DbId,
  periodDuration: number
): MatchEventViewModel {
  const { period, minute, extraMinute } = secondsToMatchTime(
    event.time,
    periodDuration
  );

  return {
    id: event.id,
    matchId: event.matchId,
    typeId: event.typeMatchEventId,
    typeLabel: event.typeMatchEvent.label,
    typeIcon: event.typeMatchEvent.icon ?? 'event',
    typeColor:
      event.typeMatchEvent.color ?? 'var(--mat-sys-on-surface-variant)',
    category: event.typeMatchEvent.category,
    period,
    minute,
    extraMinute,
    timeFormatted: formatMatchTime(minute, extraMinute),
    timeRaw: event.time,
    playerId: event.playerId,
    playerInfo: event.player,
    teamId: event.teamId,
    teamInfo: event.team,
    relatedEventMatchId: event.relatedEventMatch ?? event.relatedEventMatchId,
    description: event.description,
    isHomeTeam: event.teamId === homeTeamId,
  };
}

/**
 * Mapper de lista ordenada
 */
export function mapEventsToViewModels(
  events: MatchEvent[],
  homeTeamId: DbId,
  periodDuration: number
): MatchEventViewModel[] {
  return [...events]
    .sort((a, b) => a.time - b.time)
    .map((e) => mapEventToViewModel(e, homeTeamId, periodDuration));
}