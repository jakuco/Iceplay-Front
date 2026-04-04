import type { Player } from './player.model';
import type { Team } from './team.model';
import type { DbId } from './db.types';
export type MatchEventType = import('./sport-config.model').TypeMatchEvent & { id: number };

type PlayerBasicInfo = Pick<Player, 'id' | 'firstName' | 'lastName' | 'nickName' | 'number' | 'positionId'>;
type TeamBasicInfo   = Pick<Team, 'id' | 'name' | 'shortname' | 'logoUrl'>;

// ─── Espejo de FullEventDTO del backend ───────────────────────
//
// Fuente: Iceplay-Fropen/src/domain/dto/match/event/full-event.dto.ts
//
// NOTAS DE ALINEACIÓN:
//   · `relatedEventMatch` (string) — el backend usa este nombre exacto.
//     La versión anterior usaba `relatedEventMatchId`; se corrige aquí
//     y en el mapper para que el parseo SSE funcione correctamente.
//   · `player?` y `team?` — NO están en FullEventDTO del backend.
//     El SSE no emite objetos de equipo ni jugador, solo sus IDs
//     (teamId, playerId). Se mantienen opcionalmente por si algún
//     endpoint futuro los popula, pero no deben asumirse en el stream.
//   · `typeMatchEvent.icon` y `typeMatchEvent.color` son opcionales en
//     el backend (FullEventDTO). El frontend los declara requeridos en
//     TypeMatchEvent (sport-config.model). El mapper usa `??` como
//     fallback; no es un error de runtime pero sí una inconsistencia
//     de tipos. TODO: alinear TypeMatchEvent con la realidad del backend.
// ──────────────────────────────────────────────────────────────

export interface MatchEvent {
  id:                   DbId;
  matchId:              DbId;
  typeMatchEventId:     number;
  typeMatchEvent:       MatchEventType;
  playerId?:            DbId;
  /**
   * @note NO está en FullEventDTO del backend. El SSE no emite este objeto.
   * Solo disponible si un endpoint futuro lo popula en el join.
   */
  player?:              PlayerBasicInfo;
  teamId?:              DbId;
  /**
   * @note NO está en FullEventDTO del backend. El SSE no emite este objeto.
   * Solo disponible si un endpoint futuro lo popula en el join.
   */
  team?:                TeamBasicInfo;
  /**
   * Nombre del campo en el backend: `relatedEventMatch` (string).
   * Antes se llamaba `relatedEventMatchId` en el frontend — corregido
   * para alinear con FullEventDTO y PostEventDTO del backend.
   */
  relatedEventMatch?:   string;
  time:                 number;        // segundos — fuente de verdad
  description?:         string | null;
  isActive?:            boolean;
}

// ─── DTO para crear evento ────────────────────────────────────
//
// Fuente: Iceplay-Fropen/src/domain/dto/match/event/post-event.dto.ts
//
// NOTA sobre `matchId`: el backend toma `matchId` desde la URL
//   (req.params.match_id) y lo inyecta en el body vía
//   `{...req.body, matchId: match_id}` en el controller.
//   Enviar `matchId` en el body es redundante pero inocuo.
//   Se mantiene para evitar romper componentes existentes.
//   TODO: evaluar si eliminar en Fase 2C cuando se ajuste match-control.
// ──────────────────────────────────────────────────────────────

export interface CreateMatchEventDto {
  matchId:              DbId;          // redundante — ver nota arriba
  typeMatchEventId:     number;
  time:                 number;        // segundos
  playerId?:            DbId;
  teamId?:              DbId;
  /**
   * Nombre del campo en el backend: `relatedEventMatch` (string).
   * Antes `relatedEventMatchId` — corregido para alinear con PostEventDTO.
   */
  relatedEventMatch?:   string;
  description?:         string;
}

// ─── DTO para actualizar evento ───────────────────────────────
//
// TODO: sin endpoint confirmado para actualización de eventos.
//       El backend solo expone POST y DELETE para eventos.
//       Este DTO se mantiene como referencia, pero no usar hasta confirmar.
// ──────────────────────────────────────────────────────────────

export interface UpdateMatchEventDto {
  typeMatchEventId?:    number;
  time?:                number;
  playerId?:            DbId;
  teamId?:              DbId;
  /**
   * Nombre del campo en el backend: `relatedEventMatch` (string).
   * Antes `relatedEventMatchId` — corregido para consistencia con los demás DTOs.
   */
  relatedEventMatch?:   string;
  description?:         string;
}

// ─── ViewModel para el template ──────────────────────────────
//
// Este tipo NO se modifica: los templates lo consumen directamente.
// El campo `relatedEventMatchId` se mantiene con ese nombre en el VM
// para no romper la UI. La corrección del nombre de origen
// (MatchEvent.relatedEventMatch) se aplica solo en el mapper.
// ──────────────────────────────────────────────────────────────

export interface MatchEventViewModel {
  id:                   DbId;
  matchId:              DbId;
  typeId:               number;
  typeLabel:            string;
  typeIcon:             string;
  typeColor:            string;
  category:             string;
  period:               number;
  minute:               number;
  extraMinute:          number;
  timeFormatted:        string;        // "45+2'" | "67'"
  timeRaw:              number;        // segundos — para ordenar
  playerId?:            DbId;
  playerInfo?:          PlayerBasicInfo;
  teamId?:              DbId;
  teamInfo?:            TeamBasicInfo;
  /**
   * Mapeado desde `MatchEvent.relatedEventMatch` (backend).
   * Se mantiene como `relatedEventMatchId` en el VM por compatibilidad
   * con los templates existentes (Fase 2C hará el rename final si procede).
   */
  relatedEventMatchId?: DbId;
  description?:         string | null;
  isHomeTeam:           boolean;
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
    // icon y color son opcionales en FullEventDTO del backend; el ?? garantiza un fallback seguro
    typeIcon:            event.typeMatchEvent.icon   ?? 'event',
    typeColor:           event.typeMatchEvent.color  ?? 'var(--mat-sys-on-surface-variant)',
    category:            event.typeMatchEvent.category,
    period,
    minute,
    extraMinute,
    timeFormatted:       formatMatchTime(minute, extraMinute),
    timeRaw:             event.time,
    playerId:            event.playerId,
    // player no está en FullEventDTO/SSE — será undefined en el stream
    playerInfo:          event.player,
    teamId:              event.teamId,
    // team no está en FullEventDTO/SSE — será undefined en el stream
    teamInfo:            event.team,
    // Origen correcto: event.relatedEventMatch (backend)
    // El VM mantiene el nombre relatedEventMatchId por compatibilidad con templates
    relatedEventMatchId: event.relatedEventMatch,
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
