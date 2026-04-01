import type { Player } from './player.model';
import type { Team } from './team.model';
import type { DbId } from './db.types';
export type MatchEventType = import('./sport-config.model').TypeMatchEvent & { id: number };

type PlayerBasicInfo = Pick<Player, 'id' | 'firstName' | 'lastName' | 'nickName' | 'number' | 'positionId'>;
type TeamBasicInfo   = Pick<Team, 'id' | 'name' | 'shortname' | 'logoUrl'>;

// ─── Espejo exacto de FullEventDTO del backend ────────────────
export interface MatchEvent {
  id:                  DbId;
  matchId:             DbId;
  typeMatchEventId:    number;
  typeMatchEvent:      MatchEventType;
  playerId?:           DbId;
  player?:             PlayerBasicInfo;
  teamId?:             DbId;
  team?:               TeamBasicInfo;
  relatedEventMatchId?: DbId;
  time:                number;        // segundos — fuente de verdad
  description?:        string | null;
  isActive?:           boolean;
}

// ─── DTO para crear evento ────────────────────────────────────
export interface CreateMatchEventDto {
  matchId:             DbId;
  typeMatchEventId:    number;
  time:                number;        // segundos
  playerId?:           DbId;
  teamId?:             DbId;
  relatedEventMatchId?: DbId;
  description?:        string;
}

// ─── DTO para actualizar evento ───────────────────────────────
export interface UpdateMatchEventDto {
  typeMatchEventId?:   number;
  time?:               number;
  playerId?:           DbId;
  teamId?:             DbId;
  relatedEventMatchId?: DbId;
  description?:        string;
}

// ─── ViewModel para el template ──────────────────────────────
export interface MatchEventViewModel {
  id:                  DbId;
  matchId:             DbId;
  typeId:              number;
  typeLabel:           string;
  typeIcon:            string;
  typeColor:           string;
  category:            string;
  period:              number;
  minute:              number;
  extraMinute:         number;
  timeFormatted:       string;        // "45+2'" | "67'"
  timeRaw:             number;        // segundos — para ordenar
  playerId?:           DbId;
  playerInfo?:         PlayerBasicInfo;
  teamId?:             DbId;
  teamInfo?:           TeamBasicInfo;
  relatedEventMatchId?: DbId;
  description?:        string | null;
  isHomeTeam:          boolean;
}

// ─── Item para timeline (compatibilidad con tu compañero) ─────
export interface EventTimelineItem {
  id:            DbId;
  type:          string;
  typeLabel:     string;
  typeIcon:      string;
  typeColor:     string;
  minute:        string;              // Formatted: "45'" or "90+3'"
  player:        PlayerBasicInfo;
  team:          TeamBasicInfo;
  relatedPlayer?: PlayerBasicInfo;
  description?:  string;
  isHomeTeam:    boolean;
}

// ─── Utilidades de tiempo ─────────────────────────────────────
/**
 * Convierte segundos → { period, minute, extraMinute }
 * periodDuration: sport.periodDuration en segundos
 */
export function secondsToMatchTime(
  time: number,
  periodDuration: number
): { period: number; minute: number; extraMinute: number } {
  const period        = Math.floor(time / periodDuration) + 1;
  const timeInPeriod  = time % periodDuration;
  const periodMinutes = Math.floor(periodDuration / 60);
  const minuteRaw     = Math.floor(timeInPeriod / 60);

  if (minuteRaw >= periodMinutes) {
    return { period, minute: periodMinutes, extraMinute: minuteRaw - periodMinutes };
  }
  return { period, minute: minuteRaw + 1, extraMinute: 0 };
}

export function formatMatchTime(minute: number, extraMinute = 0): string {
  return extraMinute > 0 ? `${minute}+${extraMinute}'` : `${minute}'`;
}

export function matchTimeToSeconds(
  period: number,
  minute: number,
  extraMinute = 0,
  periodDuration: number
): number {
  return (period - 1) * periodDuration + (minute + extraMinute) * 60;
}

/** Compatibilidad con código existente */
export function formatEventMinute(minute: number, extraMinute?: number): string {
  return formatMatchTime(minute, extraMinute ?? 0);
}

// ─── Mapper ───────────────────────────────────────────────────
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
    id:                  event.id,
    matchId:             event.matchId,
    typeId:              event.typeMatchEventId,
    typeLabel:           event.typeMatchEvent.label,
    typeIcon:            event.typeMatchEvent.icon   ?? 'event',
    typeColor:           event.typeMatchEvent.color  ?? 'var(--mat-sys-on-surface-variant)',
    category:            event.typeMatchEvent.category,
    period,
    minute,
    extraMinute,
    timeFormatted:       formatMatchTime(minute, extraMinute),
    timeRaw:             event.time,
    playerId:            event.playerId,
    playerInfo:          event.player,
    teamId:              event.teamId,
    teamInfo:            event.team,
    relatedEventMatchId: event.relatedEventMatchId,
    description:         event.description,
    isHomeTeam:          event.teamId === homeTeamId,
  };
}

export function mapEventsToViewModels(
  events: MatchEvent[],
  homeTeamId: DbId,
  periodDuration: number
): MatchEventViewModel[] {
  return [...events]
    .sort((a, b) => a.time - b.time)
    .map((e) => mapEventToViewModel(e, homeTeamId, periodDuration));
}