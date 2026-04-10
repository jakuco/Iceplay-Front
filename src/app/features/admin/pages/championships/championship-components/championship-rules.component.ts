// ─────────────────────────────────────────────────────────────
// championship-rules.component.ts
// Reglas del campeonato agrupadas por categoría.
// Soporta valores numéricos y booleanos con override por campeonato.
// ─────────────────────────────────────────────────────────────

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
// COMPONENT
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-championship-rules',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, MatIconModule, MatButtonModule],
  template: `
<div class="max-w-[640px] mx-auto px-7 pt-7 pb-8 flex flex-col gap-5">

  <!-- ── Info banner ─────────────────────────────────────── -->
  <div class="flex items-start gap-3 rounded-xl border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container)] px-4 py-3">
    <mat-icon class="!size-[18px] !text-[18px] text-[var(--mat-sys-primary)] shrink-0 mt-0.5">info_outline</mat-icon>
    <p class="m-0 text-[13px] text-[var(--mat-sys-on-surface-variant)] leading-relaxed">
      Las reglas se aplican a todos los partidos de este campeonato.
      Cambiarlas afecta partidos futuros.
    </p>
  </div>

  <!-- ── Rule groups ──────────────────────────────────────── -->
  <div class="flex flex-col gap-6">
    @for (group of ruleGroups(); track group.category; let last = $last) {

      <section class="flex flex-col gap-4">

        <!-- Category title -->
        <h3 class="m-0 pb-2 text-[11px] font-black tracking-[.12em] uppercase text-[var(--mat-sys-on-surface-variant)] border-b border-[var(--mat-sys-outline-variant)]">
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
                  <label class="text-[12.5px] font-semibold text-[var(--mat-sys-on-surface)] leading-tight">
                    {{ rule.label }}
                  </label>
                  @if (isModified(rule)) {
                    <button
                      class="inline-flex items-center gap-0.5 text-[11px] font-semibold
                             text-[var(--mat-sys-primary)] hover:opacity-80 bg-transparent border-none
                             cursor-pointer p-0 shrink-0 transition-opacity"
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
                           text-[var(--mat-sys-on-surface)] outline-none transition-all bg-[var(--mat-sys-surface-container)]"
                    [class.border-blue-400]="isModified(rule)"
                    [style.border-color]="!isModified(rule) ? 'var(--mat-sys-outline-variant)' : ''"
                    [style.box-shadow]="isModified(rule) ? '0 0 0 3px rgba(59,130,246,0.12)' : 'none'"
                    type="number"
                    [min]="rule.min ?? 0"
                    [max]="rule.max ?? 9999"
                    [ngModel]="getNumericValue(rule)"
                    (ngModelChange)="setNumericValue(rule, $event)"
                  />
                  @if (rule.unit) {
                    <span class="text-[12px] text-[var(--mat-sys-on-surface-variant)] whitespace-nowrap shrink-0">
                      {{ rule.unit }}
                    </span>
                  }
                </div>

                <!-- Hint -->
                @if (rule.hint) {
                  <p class="m-0 text-[11px] text-[var(--mat-sys-on-surface-variant)]">{{ rule.hint }}</p>
                }

              </div>
            }
          </div>
        }

        <!-- Boolean rules card list -->
        @if (group.boolean.length) {
          <div class="rounded-xl border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container)] overflow-hidden divide-y divide-[var(--mat-sys-outline-variant)]">
            @for (rule of group.boolean; track rule.matchRuleId) {
              <div class="flex items-center justify-between gap-4 px-4 py-3.5">
                <div class="flex flex-col gap-0.5">
                  <span class="text-[13.5px] font-semibold text-[var(--mat-sys-on-surface)]">{{ rule.label }}</span>
                  <span class="text-[12px] text-[var(--mat-sys-on-surface-variant)] leading-snug">{{ rule.description }}</span>
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
        <hr class="border-[var(--mat-sys-outline-variant)] m-0" />
      }

    }
  </div>

  <!-- ── Footer ───────────────────────────────────────────── -->
  <div class="flex items-center justify-between pt-3 mt-1 border-t border-[var(--mat-sys-outline-variant)]">
    <p class="m-0 text-[12px] text-[var(--mat-sys-on-surface-variant)]">
      @if (modifiedCount() > 0) {
        <span class="text-blue-500 font-semibold">{{ modifiedCount() }}</span>
        {{ modifiedCount() === 1 ? 'regla modificada' : 'reglas modificadas' }}
      } @else {
        Valores predeterminados del deporte
      }
    </p>
    <div class="flex gap-2.5">
      <button matButton (click)="onCancel()" type="button">Cancelar</button>
      <button matButton="filled" [disabled]="modifiedCount() === 0" (click)="onSave()" type="button">
        <mat-icon>save</mat-icon>
        Guardar todos los cambios
      </button>
    </div>
  </div>

</div>
  `,
})
export class ChampionshipRulesComponent {

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

  /** Copia de trabajo de las reglas — se resetea automáticamente cuando cambia initialRules */
  rules = linkedSignal(() => this.initialRules().map(r => ({ ...r })));

  constructor() {
    // Resetea overrides cuando cambia el deporte o llegan nuevas reglas
    effect(() => {
      this.initialRules(); // tracked
      this.overrides.set(new Map());
    }, { allowSignalWrites: true });
  }

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