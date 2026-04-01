// ─────────────────────────────────────────────────────────────
// sport-config.model.ts
// Tabla catálogo: cambia muy rara vez.
// Implicaciones de diseño:
//   · Sin UpdateDto profundo — los cambios son administrativos/migraciones
//   · Datos aptos para cache (Redis / in-memory) con TTL largo
//   · Los pivotes (SportPosition, Sport_TypeMatchEvent, SportMatchRules)
//     son la parte más volátil: se agregan nuevas posiciones o eventos
//     cuando se incorpora un deporte nuevo, no en operación normal
// ─────────────────────────────────────────────────────────────


import type { DbId } from './db.types';

// ─────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────

/**
 * Categoría de evento de partido.
 * Determina cómo afecta al marcador y a la tabla de posiciones.
 *
 *  scoring      → suma matchPoint al score del equipo
 *  card         → puede derivar en suspensión automática del jugador
 *  substitution → registra cambio de jugador, no afecta score
 *  other        → eventos informativos (lesión, VAR, tiempo extra, etc.)
 */
export enum MatchEventCategory {
  Scoring = 'scoring',
  Card = 'card',
  Substitution = 'substitution',
  Other = 'other',
}


// ─────────────────────────────────────────────────────────────
// ENTIDAD PRINCIPAL
// ─────────────────────────────────────────────────────────────

/**
 * Catálogo de deportes.
 * Cada deporte define cómo se mide un partido (goles, sets, puntos)
 * y cómo se estructuran sus períodos.
 *
 * Nota de caché: este objeto puede vivir en memoria o Redis con TTL
 * de varias horas — casi nunca cambia en producción.
 */
export interface Sport {
  id: DbId;
  name: string; // Campo implícito; asumido de la relación en el diagrama
  icon: string;

  // Estructura temporal del partido
  periods: number;   // cantidad de períodos (2 mitades, 3 sets, 4 cuartos...)
  periodDuration: number;   // duración en minutos por período
  periodLabel: string;   // 'Tiempo', 'Set', 'Cuarto', 'Período'
  periodLabelPlural: string;  // 'Tiempos', 'Sets', 'Cuartos', 'Períodos'

  // Unidad de medición del resultado
  matchTypeSingular: string;  // 'gol', 'punto', 'set'
  matchTypePlural: string;  // 'goles', 'puntos', 'sets'

  // Relaciones cargadas opcionalmente (joins).
  // Tipadas como la entidad destino (no el pivot) para que
  // SportDetail pueda extender Sport sin conflicto de tipos.
  positions?: Position[];
  matchEventTypes?: TypeMatchEvent[];
  matchRules?: MatchRule[];
  isActive?: boolean;
}


// ─────────────────────────────────────────────────────────────
// POSICIONES
// ─────────────────────────────────────────────────────────────

/**
 * Catálogo de posiciones (Portero, Delantero, Pivot, Líbero...).
 * Son globales y se asocian a uno o varios deportes via SportPosition.
 */
export interface Position {
  id: DbId;
  code: string;         // 'GK', 'FW', 'MF', 'DF'
  label: string;         // 'Portero', 'Delantero'
  abbreviation: string;         // 'POR', 'DEL'
  isActive?: boolean;
}

/**
 * Pivot Sport ↔ Position.
 * UC: Posiciones disponibles para el deporte (form de inscripción de jugador).
 */
export interface SportPosition {
  sportId: DbId;
  positionId: DbId;
  position?: Position;   // JOIN para mostrar label y abbreviation
}


// ─────────────────────────────────────────────────────────────
// TIPOS DE EVENTO DE PARTIDO
// ─────────────────────────────────────────────────────────────

/**
 * Catálogo global de tipos de evento.
 * Ejemplos: Gol, Gol en propia puerta, Tarjeta amarilla, Roja,
 *           Sustitución, Tiempo extra, Penalti, etc.
 *
 *  matchPoint     → cuántos puntos suma al marcador (gol=1, try=5, 0 si no suma)
 *  standingPoints → cuántos puntos de tabla otorga al equipo ganador/perdedor
 *                   (normalmente se calcula a nivel partido, no por evento)
 */
export interface TypeMatchEvent {
  id: DbId;
  label: string;              // 'Gol', 'Tarjeta amarilla', 'Sustitución'
  icon: string;              // nombre del icono o URL
  color: string;              // hex o nombre CSS para mostrar en UI
  matchPoint: number;              // puntos que suma al marcador del equipo
  category: MatchEventCategory;
  standingPoints: number;              // puntos de tabla (para casos edge como walkover)
  relatedEventId?: DbId;
  isActive?: boolean;
}

/**
 * Pivot Sport ↔ TypeMatchEvent.
 * UC: Tipos de evento disponibles para un deporte específico.
 * (Fútbol tiene tarjetas; Voleibol no; Basket tiene faltas técnicas.)
 */
export interface SportTypeMatchEvent {
  sportId: DbId;
  typeMatchEventId: DbId;
  typeMatchEvent?: TypeMatchEvent;   // JOIN para mostrar label, icon, color
}


// ─────────────────────────────────────────────────────────────
// REGLAS DEL PARTIDO (catálogo)
// ─────────────────────────────────────────────────────────────

/**
 * Catálogo de reglas configurables por partido.
 * Ejemplos: max_jugadores_convocados=18, max_tarjetas_amarillas=2,
 *           duracion_tiempo_extra=15, max_sustituciones=5
 *
 * El campo `value` es el default del sistema.
 * Puede ser sobreescrito a nivel campeonato via ChampionshipMatchRule.
 */
export interface MatchRule {
  id: DbId;
  name: string;   // 'max_players', 'max_yellow_cards', 'extra_time_duration'
  value: number;   // valor default
  isActive?: boolean;
}

/**
 * Pivot Sport ↔ MatchRule.
 * UC: Qué reglas aplican por defecto a este deporte.
 * El campeonato puede hacer override via ChampionshipMatchRule.
 */
export interface SportMatchRule {
  sportId: DbId;
  matchRuleId: DbId;
  matchRule?: MatchRule;   // JOIN para mostrar name y value default
}


// ─────────────────────────────────────────────────────────────
// DTOs
// ─────────────────────────────────────────────────────────────

/**
 * UC: Crear deporte (operación administrativa, muy infrecuente).
 * Se crea el Sport y luego se asocian posiciones, eventos y reglas
 * en llamadas separadas a los pivotes.
 */
export interface CreateSportDto {
  name: string;
  icon: string;
  periods: number;
  periodDuration: number;
  periodLabel: string;
  periodLabelPlural: string;
  matchTypeSingular: string;
  matchTypePlural: string;
}

/**
 * UC: Actualizar deporte.
 * Partial completo porque puede ser necesario ajustar labels o duración.
 * organization_id y sport_id son FKs inmutables post-creación de campeonato,
 * pero el catálogo en sí puede corregir un label o duración de período.
 */
export type UpdateSportDto = Partial<Omit<CreateSportDto, 'name'>>;

/** UC: Agregar posición a un deporte */
export interface AddSportPositionDto {
  positionId: DbId;
}

/** UC: Agregar tipo de evento a un deporte */
export interface AddSportTypeMatchEventDto {
  typeMatchEventId: DbId;
}

/** UC: Agregar regla a un deporte */
export interface AddSportMatchRuleDto {
  matchRuleId: DbId;
}


// ─────────────────────────────────────────────────────────────
// RESPONSE TYPES
// ─────────────────────────────────────────────────────────────

/**
 * UC: Listado de deportes (selector en form de creación de campeonato).
 * Sin relaciones — solo lo necesario para poblar un <select>.
 */
export type SportOption = Pick<Sport, 'id' | 'name' | 'icon'>;

/**
 * UC: Detalle completo de un deporte.
 * Incluye todas las relaciones. Apto para cachear con TTL largo.
 */
export interface SportDetail extends Sport {
  positions: Position[];
  matchEventTypes: TypeMatchEvent[];
  matchRules: MatchRule[];
}

/**
 * UC: Configuración de deporte para el módulo de partidos.
 * Respuesta compacta con solo lo que el motor de partidos necesita:
 * cómo se puntúa, qué eventos existen y qué reglas aplican.
 */
export interface SportMatchConfig {
  sportId: DbId;
  matchTypeSingular: string;
  matchTypePlural: string;
  periods: number;
  periodDuration: number;
  periodLabel: string;

  // Eventos disponibles agrupados por categoría para facilitar el render en UI
  eventsByCategory: Record<MatchEventCategory, TypeMatchEvent[]>;

  // Reglas con su valor default (el campeonato puede hacer override)
  rules: Array<{
    matchRuleId: DbId;
    name: string;
    defaultValue: number;
  }>;
}