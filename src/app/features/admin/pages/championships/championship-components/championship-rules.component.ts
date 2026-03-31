// ─────────────────────────────────────────────────────────────
// championship-rules.component.ts
// Reglas del campeonato agrupadas por categoría.
// Soporta valores numéricos y booleanos con override por campeonato.
//
// ⚠️  MOCK DATA al final del archivo — reemplazar con llamadas al backend:
//   GET /championships/:id/rules  → ChampionshipRuleItem[]
//   PUT /championships/:id/rules  → { rules: RulePatchDto[] }
// ─────────────────────────────────────────────────────────────

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
  output,
  signal,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

/** Tipo de valor de una regla */
export type RuleValueType = 'number' | 'boolean';

/**
 * Regla enriquecida — viene del backend ya procesada con descripción y
 * valor actual (override del campeonato o default del deporte si no hay override).
 */
export interface ChampionshipRuleItem {
  matchRuleId:    number;
  name:           string;          // clave técnica: 'max_players', 'extra_time'
  label:          string;          // label UI: 'Máx. Jugadores por Equipo'
  description:    string;          // descripción procesada en el backend
  category:       string;          // 'players' | 'match' | 'additional' | custom
  categoryLabel:  string;          // 'Jugadores' | 'Partido' | 'Opciones Adicionales'
  valueType:      RuleValueType;
  defaultValue:   number;          // valor default del deporte (0/1 para booleans)
  currentValue:   number;          // valor actual del campeonato (0/1 para booleans)
  isOverridden:   boolean;         // true si el campeonato sobreescribió el default
  min?:           number;          // solo para type=number
  max?:           number;          // solo para type=number
  unit?:          string;          // 'min', 'partidos', etc.
  hint?:          string;          // texto de ayuda extra bajo el input
}

export interface RulePatchDto {
  matchRuleId: number;
  value:       number;
}

// Agrupación para el template
interface RuleGroup {
  category:      string;
  categoryLabel: string;
  numeric:       ChampionshipRuleItem[];
  boolean:       ChampionshipRuleItem[];
}

// ─────────────────────────────────────────────────────────────
// ⚠️  MOCK DATA — reemplazar con GET /championships/:id/rules
// Los datos vienen del backend ya con label, description y valor actual.
// ─────────────────────────────────────────────────────────────

export const MOCK_RULES_FOOTBALL: ChampionshipRuleItem[] = [
  // ── Jugadores ──────────────────────────────────────────────
  {
    matchRuleId: 1, name: 'max_players', label: 'Máx. Jugadores por Equipo',
    description: 'Número máximo de jugadores que puede inscribir cada equipo.',
    category: 'players', categoryLabel: 'Jugadores', valueType: 'number',
    defaultValue: 20, currentValue: 20, isOverridden: false, min: 11, max: 50,
  },
  {
    matchRuleId: 2, name: 'min_players', label: 'Mín. Jugadores por Equipo',
    description: 'Número mínimo para que el equipo pueda disputar un partido.',
    category: 'players', categoryLabel: 'Jugadores', valueType: 'number',
    defaultValue: 12, currentValue: 12, isOverridden: false, min: 7, max: 11,
  },
  {
    matchRuleId: 3, name: 'max_substitutions', label: 'Sustituciones Máximas',
    description: 'Cambios permitidos por equipo durante el partido.',
    category: 'players', categoryLabel: 'Jugadores', valueType: 'number',
    defaultValue: 5, currentValue: 5, isOverridden: false, min: 0, max: 11,
  },
  // ── Partido ────────────────────────────────────────────────
  {
    matchRuleId: 4, name: 'match_duration', label: 'Duración (minutos)',
    description: 'Duración de cada período en minutos.',
    category: 'match', categoryLabel: 'Partido', valueType: 'number',
    defaultValue: 45, currentValue: 60, isOverridden: true, min: 10, max: 90, unit: 'min',
  },
  {
    matchRuleId: 5, name: 'yellow_cards_suspension', label: 'Tarjetas Amarillas (susp.)',
    description: 'Acumulación de tarjetas amarillas para suspensión automática.',
    category: 'match', categoryLabel: 'Partido', valueType: 'number',
    defaultValue: 3, currentValue: 3, isOverridden: false, min: 1, max: 10,
    hint: 'Acumulación para suspensión',
  },
  {
    matchRuleId: 6, name: 'red_card_suspension', label: 'Roja = suspensión (partidos)',
    description: 'Partidos de suspensión automática por tarjeta roja directa.',
    category: 'match', categoryLabel: 'Partido', valueType: 'number',
    defaultValue: 1, currentValue: 1, isOverridden: false, min: 1, max: 10, unit: 'partidos',
  },
  // ── Opciones adicionales ───────────────────────────────────
  {
    matchRuleId: 7, name: 'extra_time', label: 'Tiempo Extra (Overtime)',
    description: 'Activar tiempo extra en caso de empate.',
    category: 'additional', categoryLabel: 'Opciones Adicionales', valueType: 'boolean',
    defaultValue: 0, currentValue: 1, isOverridden: true,
  },
  {
    matchRuleId: 8, name: 'penalty_shootout', label: 'Shootout de Penales',
    description: 'Resolver el partido con tanda de penales si persiste el empate.',
    category: 'additional', categoryLabel: 'Opciones Adicionales', valueType: 'boolean',
    defaultValue: 0, currentValue: 1, isOverridden: true,
  },
  {
    matchRuleId: 9, name: 'allow_guest_players', label: 'Permitir Jugadores Invitados',
    description: 'Jugadores que no pertenecen al equipo pueden participar.',
    category: 'additional', categoryLabel: 'Opciones Adicionales', valueType: 'boolean',
    defaultValue: 0, currentValue: 0, isOverridden: false,
  },
];

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-championship-rules',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, MatIconModule],
  template: `
<div class="max-w-[640px] mx-auto px-7 pt-7 pb-8 flex flex-col gap-5">

  <!-- ── Info banner ─────────────────────────────────────── -->
  <div class="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
    <mat-icon class="!size-[18px] !text-[18px] text-blue-400 shrink-0 mt-0.5">info_outline</mat-icon>
    <p class="m-0 text-[13px] text-blue-700 leading-relaxed">
      Las reglas se aplican a todos los partidos de este campeonato.
      Cambiarlas afecta partidos futuros.
    </p>
  </div>

  <!-- ── Rule groups ──────────────────────────────────────── -->
  <div class="flex flex-col gap-6">
    @for (group of ruleGroups(); track group.category; let last = $last) {

      <section class="flex flex-col gap-4">

        <!-- Category title -->
        <h3 class="m-0 text-[11px] font-black tracking-[.12em] uppercase text-gray-500">
          {{ group.categoryLabel }}
        </h3>

        <!-- Numeric rules grid -->
        @if (group.numeric.length) {
          <div class="grid gap-x-4 gap-y-5"
               [style.grid-template-columns]="numericGridCols(group.numeric.length)">
            @for (rule of group.numeric; track rule.matchRuleId) {
              <div class="flex flex-col gap-1.5">

                <!-- Label row -->
                <div class="flex items-center justify-between gap-2 min-h-[18px]">
                  <label class="text-[12.5px] font-semibold text-gray-700 leading-tight">
                    {{ rule.label }}
                  </label>
                  @if (isModified(rule)) {
                    <button
                      class="inline-flex items-center gap-0.5 text-[11px] font-semibold
                             text-blue-500 hover:text-blue-700 bg-transparent border-none
                             cursor-pointer p-0 shrink-0 transition-colors"
                      (click)="resetRule(rule)"
                      type="button"
                    >
                      <mat-icon class="!size-3 !text-[12px]">refresh</mat-icon>
                      Reset
                    </button>
                  }
                </div>

                <!-- Input + optional unit suffix -->
                <div class="flex items-center gap-2">
                  <input
                    class="w-full min-w-0 px-3 py-2 border rounded-lg text-[14px] font-medium
                           text-gray-900 outline-none transition-all bg-white"
                    [class.border-gray-300]="!isModified(rule)"
                    [class.border-blue-400]="isModified(rule)"
                    [style.box-shadow]="isModified(rule) ? '0 0 0 3px rgba(59,130,246,0.12)' : 'none'"
                    type="number"
                    [min]="rule.min ?? 0"
                    [max]="rule.max ?? 9999"
                    [ngModel]="getNumericValue(rule)"
                    (ngModelChange)="setNumericValue(rule, $event)"
                  />
                  @if (rule.unit) {
                    <span class="text-[12px] text-gray-400 whitespace-nowrap shrink-0">
                      {{ rule.unit }}
                    </span>
                  }
                </div>

                <!-- Hint -->
                @if (rule.hint) {
                  <p class="m-0 text-[11px] text-gray-400">{{ rule.hint }}</p>
                }

              </div>
            }
          </div>
        }

        <!-- Boolean rules card list -->
        @if (group.boolean.length) {
          <div class="rounded-xl border border-gray-200 bg-white overflow-hidden divide-y divide-gray-100">
            @for (rule of group.boolean; track rule.matchRuleId) {
              <div class="flex items-center justify-between gap-4 px-4 py-3.5">
                <div class="flex flex-col gap-0.5">
                  <span class="text-[13.5px] font-semibold text-gray-900">{{ rule.label }}</span>
                  <span class="text-[12px] text-gray-400 leading-snug">{{ rule.description }}</span>
                </div>

                <!-- Toggle (inline style for translate to avoid Tailwind purge) -->
                <button
                  class="relative shrink-0 w-[44px] h-[26px] rounded-full border-none
                         cursor-pointer transition-colors duration-200 p-0
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  [style.background]="getBoolValue(rule) ? '#3b82f6' : '#d1d5db'"
                  (click)="toggleBool(rule)"
                  type="button"
                  [attr.aria-label]="rule.label"
                  [attr.aria-checked]="getBoolValue(rule)"
                  role="switch"
                >
                  <span
                    class="absolute top-[4px] size-[18px] rounded-full bg-white shadow-sm
                           transition-transform duration-200 block"
                    [style.transform]="getBoolValue(rule) ? 'translateX(22px)' : 'translateX(4px)'"
                  ></span>
                </button>
              </div>
            }
          </div>
        }

      </section>

      <!-- Divider — skip after last group -->
      @if (!last) {
        <hr class="border-gray-200 m-0" />
      }

    }
  </div>

  <!-- ── Footer ───────────────────────────────────────────── -->
  <div class="flex items-center justify-between pt-3 mt-1 border-t border-gray-100">
    <p class="m-0 text-[12px] text-gray-400">
      @if (modifiedCount() > 0) {
        <span class="text-blue-500 font-semibold">{{ modifiedCount() }}</span>
        {{ modifiedCount() === 1 ? 'regla modificada' : 'reglas modificadas' }}
      } @else {
        Valores predeterminados del deporte
      }
    </p>
    <div class="flex gap-2.5">
      <button
        class="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg bg-white
               text-gray-700 text-[13px] font-medium border border-gray-300
               cursor-pointer hover:bg-gray-50 transition-colors"
        (click)="onCancel()"
        type="button"
      >Cancelar</button>
      <button
        class="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg
               text-[13px] font-semibold border-none cursor-pointer transition-colors"
        [style.background]="modifiedCount() > 0 ? '#3b82f6' : '#e5e7eb'"
        [style.color]="modifiedCount() > 0 ? '#fff' : '#9ca3af'"
        [style.cursor]="modifiedCount() === 0 ? 'not-allowed' : 'pointer'"
        [disabled]="modifiedCount() === 0"
        (click)="onSave()"
        type="button"
      >
        <mat-icon class="!size-4 !text-[16px]">save</mat-icon>
        Guardar todos los cambios
      </button>
    </div>
  </div>

</div>
  `,
})
export class ChampionshipRulesComponent implements OnInit {

  // ── Inputs / Outputs ──────────────────────────────────────
  /** Reglas recibidas del backend (ya enriquecidas con label y description) */
  readonly initialRules = input<ChampionshipRuleItem[]>([]);

  readonly save   = output<RulePatchDto[]>();
  readonly cancel = output<void>();

  // ── Services ──────────────────────────────────────────────
  private snackBar = inject(MatSnackBar);

  // ── State ─────────────────────────────────────────────────
  /**
   * Mapa local de overrides: matchRuleId → currentValue.
   * Solo contiene las reglas que el usuario ha modificado en esta sesión.
   */
  private overrides = signal<Map<number, number>>(new Map());

  /** Copia de trabajo de las reglas — no muta el input */
  rules = signal<ChampionshipRuleItem[]>([]);

  // ── Computed ──────────────────────────────────────────────

  /** Reglas agrupadas por categoría para el template */
  ruleGroups = computed<RuleGroup[]>(() => {
    const map = new Map<string, RuleGroup>();
    for (const rule of this.rules()) {
      if (!map.has(rule.category)) {
        map.set(rule.category, {
          category: rule.category,
          categoryLabel: rule.categoryLabel,
          numeric: [],
          boolean: [],
        });
      }
      const group = map.get(rule.category)!;
      if (rule.valueType === 'boolean') group.boolean.push(rule);
      else                              group.numeric.push(rule);
    }
    return Array.from(map.values());
  });

  /** Número de reglas con valor distinto al que llegó del backend */
  modifiedCount = computed(() => this.overrides().size);

  // ── Lifecycle ─────────────────────────────────────────────

  ngOnInit(): void {
    // Si no llegan reglas por input (ej. vista aislada), usa los mocks
    const source = this.initialRules().length
      ? this.initialRules()
      : MOCK_RULES_FOOTBALL;
    this.rules.set(source.map(r => ({ ...r })));
  }

  // ── Value helpers ─────────────────────────────────────────

  /** Grid template columns string based on rule count — avoids Tailwind purge issues */
  numericGridCols(count: number): string {
    if (count >= 3) return 'repeat(3, minmax(0, 1fr))';
    if (count === 2) return 'repeat(2, minmax(0, 1fr))';
    return 'minmax(0, 1fr)';
  }

  /** Devuelve el valor actual de una regla (override local tiene prioridad) */
  private getValue(rule: ChampionshipRuleItem): number {
    return this.overrides().get(rule.matchRuleId) ?? rule.currentValue;
  }

  getNumericValue(rule: ChampionshipRuleItem): number {
    return this.getValue(rule);
  }

  getBoolValue(rule: ChampionshipRuleItem): boolean {
    return this.getValue(rule) === 1;
  }

  /** Una regla está modificada si su valor local difiere del que vino del backend */
  isModified(rule: ChampionshipRuleItem): boolean {
    return this.overrides().has(rule.matchRuleId) &&
           this.overrides().get(rule.matchRuleId) !== rule.currentValue;
  }

  // ── Mutations ─────────────────────────────────────────────

  setNumericValue(rule: ChampionshipRuleItem, raw: number | string): void {
    const val = Number(raw);
    if (isNaN(val)) return;
    const clamped = Math.min(rule.max ?? 9999, Math.max(rule.min ?? 0, val));
    this.overrides.update(m => {
      const next = new Map(m);
      if (clamped === rule.currentValue) next.delete(rule.matchRuleId);
      else                               next.set(rule.matchRuleId, clamped);
      return next;
    });
  }

  toggleBool(rule: ChampionshipRuleItem): void {
    const current = this.getValue(rule);
    const next    = current === 1 ? 0 : 1;
    this.overrides.update(m => {
      const map = new Map(m);
      if (next === rule.currentValue) map.delete(rule.matchRuleId);
      else                            map.set(rule.matchRuleId, next);
      return map;
    });
  }

  resetRule(rule: ChampionshipRuleItem): void {
    this.overrides.update(m => {
      const map = new Map(m);
      map.delete(rule.matchRuleId);
      return map;
    });
  }

  // ── Save / Cancel ─────────────────────────────────────────

  onSave(): void {
    if (this.modifiedCount() === 0) return;

    const patches: RulePatchDto[] = Array.from(this.overrides().entries()).map(
      ([matchRuleId, value]) => ({ matchRuleId, value })
    );

    this.save.emit(patches);

    // Optimistic update: apply overrides to local rule state and clear the diff map
    this.rules.update(list =>
      list.map(r => {
        const override = this.overrides().get(r.matchRuleId);
        if (override === undefined) return r;
        return { ...r, currentValue: override, isOverridden: override !== r.defaultValue };
      })
    );
    this.overrides.set(new Map());
    this.snackBar.open('Reglas guardadas', 'Cerrar', { duration: 2000 });
  }

  onCancel(): void {
    this.overrides.set(new Map());
    this.cancel.emit();
  }
}