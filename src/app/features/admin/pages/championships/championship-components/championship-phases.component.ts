// ─────────────────────────────────────────────────────────────
// championship-phases.component.ts
// Pestaña "Fases" extraída de championship-form.page.ts
//
// Responsabilidades:
//   · Selector de formato (primer paso si no hay fases aún)
//   · Lista de fases con drag & drop (CDK o HTML5 nativo)
//   · Fases "base" (generadas por el formato) → bloqueadas con candado
//   · Fases adicionales → arrastables y eliminables
//   · Formulario de configuración por tipo de fase
// ─────────────────────────────────────────────────────────────

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhaseCardComponent, PhaseCardData, PhaseType, PhaseStatus } from './phase-card.component';
import { ChampionshipService } from '../../../../../core/services/championship.service';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type PhaseViewMode = 'format-picker' | 'list' | 'detail';

export type ChampionshipFormat =
  | 'league'            // Liga (solo round-robin)
  | 'groups_knockout'   // Grupos + Eliminatoria
  | 'knockout'          // Eliminatoria directa
  | 'swiss_playoff';    // Suizo + Playoff

interface FormatOption {
  id: ChampionshipFormat;
  label: string;
  description: string;
  icon: string;
  phases: string[];   // resumen de fases que genera
}

type PhaseTemplate = Omit<PhaseCardData, 'id' | 'phaseOrder'> & {
  phaseOrder?: number;
};

interface PhaseTemplatesJson {
  formats?: Partial<Record<ChampionshipFormat, { phases?: PhaseTemplate[] }>>;
}

interface SavePhaseDialogData {
  phaseName: string;
  withConfig: boolean;
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const FORMAT_OPTIONS: FormatOption[] = [
  {
    id: 'league',
    label: 'Liga',
    description: 'Todos los equipos se enfrentan entre sí. El mejor clasificado gana.',
    icon: 'emoji_events',
    phases: ['Fase de Liga'],
  },
  {
    id: 'groups_knockout',
    label: 'Grupos + Eliminatoria',
    description: 'Fase de grupos inicial seguida de rondas eliminatorias.',
    icon: 'account_tree',
    phases: ['Fase de Grupos', 'Fase Eliminatoria'],
  },
  {
    id: 'knockout',
    label: 'Eliminatoria directa',
    description: 'Bracket de eliminación directa desde la primera ronda.',
    icon: 'merge',
    phases: ['Fase Eliminatoria'],
  },
  {
    id: 'swiss_playoff',
    label: 'Suizo + Playoff',
    description: 'Rondas suizas clasificatorias seguidas de un playoff final.',
    icon: 'swap_vert',
    phases: ['Fase Suiza', 'Playoff'],
  },
];

const SWISS_PAIRING_SYSTEM = 'random';
const SWISS_TIEBREAK_ORDER = 'points,goal_difference,goals_for,h2h,fair_play,draw';
const LEAGUE_TIEBREAK_ORDER = SWISS_TIEBREAK_ORDER;
const COMMON_TIEBREAK_LABELS = [
  'Puntos',
  'Diferencia de goles',
  'Goles a favor',
  'Enfrentamientos directos',
  'Fair Play',
  'Sorteo',
];

const PHASE_TEMPLATES_URL = '/championship-phase-templates.json';

const DEFAULT_PHASE_TEMPLATES: Record<ChampionshipFormat, PhaseTemplate[]> = {
  league: [{
    name: 'Fase de Liga',
    phaseType: PhaseType.League,
    status: PhaseStatus.Pending,
    isBase: true,
    league: { winsPoints: 3, drawPoints: 1, lossPoints: 0, totalRounds: 10, legs: 1, tiebreakOrder: LEAGUE_TIEBREAK_ORDER, advanceCount: 4 },
  }],
  groups_knockout: [
    {
      name: 'Fase de Grupos',
      phaseType: PhaseType.Groups,
      status: PhaseStatus.Pending,
      isBase: true,
      groups: { numGroups: 4, teamsPerGroup: 4, legs: 1, advancePerGroup: 2, advanceBestThirds: 0, tiebreakOrder: 'points,diff,gf,h2h,random' },
    },
    {
      name: 'Fase Eliminatoria',
      phaseType: PhaseType.Knockout,
      status: PhaseStatus.Pending,
      isBase: true,
      knockout: { legs: 1, bracketSize: 8, thirdPlaceMatch: true, seeding: 'ranking', awayGoalsRule: false, tieBreak: 'penalties' },
    },
  ],
  knockout: [{
    name: 'Fase Eliminatoria',
    phaseType: PhaseType.Knockout,
    status: PhaseStatus.Pending,
    isBase: true,
    knockout: { legs: 1, bracketSize: 8, thirdPlaceMatch: true, seeding: 'ranking', awayGoalsRule: false, tieBreak: 'penalties' },
  }],
  swiss_playoff: [
    {
      name: 'Fase Suiza',
      phaseType: PhaseType.Swiss,
      status: PhaseStatus.Pending,
      isBase: true,
      swiss: { numRounds: 7, pairingSystem: SWISS_PAIRING_SYSTEM, firstRound: 'random', allowRematch: false, tiebreakOrder: SWISS_TIEBREAK_ORDER, directAdvancedCount: 2, playoffCount: 4 },
    },
    {
      name: 'Playoff',
      phaseType: PhaseType.Knockout,
      status: PhaseStatus.Pending,
      isBase: true,
      knockout: { legs: 1, bracketSize: 4, thirdPlaceMatch: false, seeding: 'ranking', awayGoalsRule: false, tieBreak: 'penalties' },
    },
  ],
};

let _nextPhaseId = 100;

@Component({
  selector: 'app-save-phase-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmar guardado</h2>
    <mat-dialog-content>
      <p class="m-0 text-[14px] text-[var(--mat-sys-on-surface)]">
        Se guardará la fase "{{ data.phaseName }}"
        {{ data.withConfig ? 'con configuración.' : 'sin configuración.' }}
      </p>
      @if (!data.withConfig) {
        <p class="m-0 mt-2 text-[12px] text-[var(--mat-sys-on-surface-variant)]">
          Podrás completar su configuración más adelante.
        </p>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton (click)="close(false)" type="button">Cancelar</button>
      <button matButton="filled" (click)="close(true)" type="button">Guardar</button>
    </mat-dialog-actions>
  `,
})
export class SavePhaseDialogComponent {
  readonly data = inject<SavePhaseDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<SavePhaseDialogComponent, boolean>);

  close(confirmed: boolean): void {
    this.dialogRef.close(confirmed);
  }
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-championship-phases',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, MatIconModule, MatButtonModule, MatCheckboxModule, PhaseCardComponent],
  template: `
<div class="max-w-[960px] mx-auto px-7 pt-7 pb-8">

  <!-- ══ FORMAT PICKER ══════════════════════════════════════ -->
  @if (viewMode() === 'format-picker') {
    <div class="flex flex-col gap-6">

      <div>
        <h2 class="text-[1.05rem] font-bold text-[var(--mat-sys-on-surface)] m-0 mb-1">
          Selecciona el formato del campeonato
        </h2>
        <p class="text-[13px] text-[var(--mat-sys-on-surface-variant)] m-0">
          Esto define las fases base. Puedes agregar fases adicionales después.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        @for (fmt of formatOptions; track fmt.id) {
          <button
            class="flex flex-col gap-3 p-5 rounded-xl border-2 text-left cursor-pointer
                   transition-all group"
            [class.border-blue-500]="selectedFormat() === fmt.id"
            [style.border-color]="selectedFormat() !== fmt.id ? 'var(--mat-sys-outline-variant)' : ''"
            [style.background]="selectedFormat() === fmt.id
              ? 'rgba(59,130,246,0.1)'
              : 'var(--mat-sys-surface-container)'"
            (click)="selectedFormat.set(fmt.id)"
            type="button"
          >
            <div class="flex items-center gap-3">
              <div
                class="size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                [class.bg-blue-500]="selectedFormat() === fmt.id"
                [class.text-white]="selectedFormat() === fmt.id"
                [style.background]="selectedFormat() !== fmt.id ? 'var(--mat-sys-surface-container-high)' : ''"
                [style.color]="selectedFormat() !== fmt.id ? 'var(--mat-sys-on-surface-variant)' : ''"
              >
                <mat-icon class="!size-[18px] !text-[18px]">{{ fmt.icon }}</mat-icon>
              </div>
              <span class="text-[14px] font-bold text-[var(--mat-sys-on-surface)]">{{ fmt.label }}</span>
              @if (selectedFormat() === fmt.id) {
                <mat-icon class="!size-4 !text-[16px] text-blue-500 ml-auto">check_circle</mat-icon>
              }
            </div>

            <p class="m-0 text-[12.5px] text-[var(--mat-sys-on-surface-variant)] leading-relaxed">{{ fmt.description }}</p>

            <!-- Phase preview chips -->
            <div class="flex flex-wrap gap-1.5">
              @for (ph of formatPreview(fmt.id); track ph) {
                <span
                  class="text-[10.5px] font-semibold px-2 py-0.5 rounded-full"
                  [style.background]="selectedFormat() === fmt.id ? 'rgba(59,130,246,0.2)' : 'var(--mat-sys-surface-container-high)'"
                  [style.color]="selectedFormat() === fmt.id ? '#1d4ed8' : 'var(--mat-sys-on-surface-variant)'"
                >{{ ph }}</span>
              }
            </div>
          </button>
        }
      </div>

      <div class="flex justify-end gap-2.5">
        <button matButton="filled" [disabled]="!selectedFormat()" (click)="applyFormat()" type="button">
          <mat-icon>check</mat-icon>
          Confirmar formato
        </button>
      </div>

    </div>
  }

  <!-- ══ PHASE LIST ═════════════════════════════════════════ -->
  @if (viewMode() === 'list') {
    <div class="flex flex-col gap-6">

      <!-- Header -->
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h2 class="text-[1rem] font-bold text-[var(--mat-sys-on-surface)] m-0">Flujo de Competición</h2>
            <!-- Format badge -->
            <span class="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1
                         rounded-full bg-blue-100 text-blue-700 border border-blue-200">
              <mat-icon class="!size-3 !text-[12px]">lock</mat-icon>
              {{ formatLabel() }}
            </span>
            <button
              class="text-[11px] text-[var(--mat-sys-on-surface-variant)] underline cursor-pointer bg-transparent
                     border-none hover:text-[var(--mat-sys-on-surface)] transition-colors"
              (click)="changeFormat()"
              type="button"
              title="Cambiar formato resetea las fases base"
            >Cambiar formato</button>
          </div>
          <p class="text-[13px] text-[var(--mat-sys-on-surface-variant)] m-0 mt-0.5">
            Arrastra las fases para reordenarlas. Las fases base
            <mat-icon class="!size-3 !text-[12px] text-[var(--mat-sys-on-surface-variant)] inline-block align-middle">lock</mat-icon>
            no se pueden eliminar.
          </p>
        </div>
        <button matButton="filled" (click)="addPhase()">
          <mat-icon>add</mat-icon>
          Agregar Fase
        </button>
      </div>

      <!-- Phase list with drag -->
      <div
        class="flex flex-col gap-3"
        (dragover)="onListDragOver($event)"
        (drop)="onListDrop($event)"
      >
        @for (ph of phases(); track ph.id; let idx = $index) {
          <div
            class="relative transition-opacity duration-150"
            [class.opacity-50]="dragState.dragging && dragState.dragId === ph.id"
            [attr.data-phase-id]="ph.id"
            [draggable]="!ph.isBase"
            (dragstart)="onDragStart($event, ph)"
            (dragend)="onDragEnd()"
            (dragover)="onItemDragOver($event, ph)"
          >
            <!-- Lock indicator for base phases -->
            @if (ph.isBase) {
              <div class="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col items-center
                          gap-0.5 pointer-events-none">
                <div class="w-px flex-1 bg-[var(--mat-sys-outline)]"></div>
                <mat-icon
                  class="!size-3.5 !text-[14px] text-[var(--mat-sys-outline)]"
                  [title]="'Fase base del formato ' + formatLabel() + ' — no se puede eliminar'"
                >lock</mat-icon>
                @if (idx < phases().length - 1) {
                  <div class="w-px h-3 bg-[var(--mat-sys-outline)]"></div>
                }
              </div>
            }

            <!-- Drag handle only for non-base phases -->
            <div class="flex items-start gap-2">
              @if (!ph.isBase) {
                <div
                  class="mt-4 cursor-grab active:cursor-grabbing text-[var(--mat-sys-outline)]
                         hover:text-[var(--mat-sys-on-surface-variant)] transition-colors select-none shrink-0 py-1"
                  title="Arrastra para reordenar"
                >
                  <mat-icon class="!size-5 !text-[20px]">drag_indicator</mat-icon>
                </div>
              } @else {
                <!-- Spacer to align with draggable phases -->
                <div class="w-7 shrink-0"></div>
              }

              <div class="flex-1 min-w-0">
                <app-phase-card
                  [phase]="ph"
                  [locked]="ph.isBase ?? false"
                  (configure)="openPhaseDetail($event)"
                  (delete)="ph.isBase ? null : deletePhase(ph.id)"
                />
              </div>
            </div>

            <!-- Drop indicator -->
            @if (dragState.overId === ph.id && dragState.dragId !== ph.id) {
              <div class="h-0.5 bg-blue-400 rounded-full mx-9 mt-1"></div>
            }
          </div>
        }
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-2.5 pt-4 border-t border-[var(--mat-sys-outline-variant)]">
        <button matButton (click)="cancel.emit()">Cancelar</button>
      </div>
    </div>
  }

  <!-- ══ PHASE DETAIL / FORM ════════════════════════════════ -->
  @if (viewMode() === 'detail') {
    <div class="flex flex-col gap-5">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-2.5 flex-wrap">
        <button
          class="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--mat-sys-on-surface-variant)]
                 bg-transparent border-none cursor-pointer px-2 py-1 rounded-md
                 hover:bg-[var(--mat-sys-surface-container-high)] transition-colors"
          (click)="cancelEdit()"
        >
          <mat-icon class="!size-4 !text-[16px]">arrow_back</mat-icon>
          Todas las fases
        </button>
        <span class="text-[15px] font-semibold text-[var(--mat-sys-on-surface)]">
          {{ phaseForm.name || 'Nueva Fase' }}
        </span>
        <span class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
              [class]="phaseTypeTagClass(phaseFormType())">
          {{ phaseTypeLabel(phaseFormType()) }}
        </span>
        <div class="flex-1"></div>
        @if (!isNewPhase() && !editingPhaseIsBase()) {
          <button
            class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px]
                   font-medium text-red-600 bg-red-50 border border-red-200/60
                   cursor-pointer hover:bg-red-100 transition-colors"
            (click)="deletePhase(editingPhaseId()!)"
          >
            <mat-icon class="!size-[15px] !text-[15px]">delete</mat-icon>
            Eliminar fase
          </button>
        }
        @if (editingPhaseIsBase()) {
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]
                      font-medium text-[var(--mat-sys-on-surface-variant)] bg-[var(--mat-sys-surface-container-high)] border border-[var(--mat-sys-outline-variant)]">
            <mat-icon class="!size-[14px] !text-[14px]">lock</mat-icon>
            Fase base · no eliminable
          </div>
        }
      </div>

      <!-- Edit card -->
      <div class="bg-[var(--mat-sys-surface-container)] border border-[var(--mat-sys-outline-variant)] rounded-xl overflow-hidden">

        <!-- Card preview header -->
        <div class="flex items-center gap-2.5 px-4 py-3 border-b border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container-low)]">
          <span class="text-[var(--mat-sys-outline)] text-base select-none">⠿</span>
          <div class="size-[26px] rounded-full flex items-center justify-center shrink-0
                      text-[12px] font-bold border-2 border-[var(--mat-sys-outline)] text-[var(--mat-sys-on-surface-variant)]">
            {{ phaseForm.phaseOrder }}
          </div>
          <span class="text-[14px] font-semibold text-[var(--mat-sys-on-surface)]">
            {{ phaseForm.name || 'Nueva Fase' }}
          </span>
          <span class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                [class]="phaseTypeTagClass(phaseFormType())">
            {{ phaseTypeLabel(phaseFormType()) }}
          </span>
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                [class.bg-green-50]="phaseForm.status === 'active'"
                [class.text-green-700]="phaseForm.status === 'active'"
                [class.bg-amber-50]="phaseForm.status === 'pending'"
                [class.text-amber-700]="phaseForm.status === 'pending'"
                [style.background]="phaseForm.status === 'finished' ? 'var(--mat-sys-surface-container-high)' : ''"
                [style.color]="phaseForm.status === 'finished' ? 'var(--mat-sys-on-surface-variant)' : ''">
            {{ phaseStatusLabel(phaseForm.status) }}
          </span>
        </div>

        <!-- Form fields -->
        <div class="p-5 flex flex-col gap-4">

          <!-- Name + Type -->
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-[12.5px] font-semibold text-[var(--mat-sys-on-surface)]">Nombre de la Fase</label>
              <input class="ph-field" [(ngModel)]="phaseForm.name" placeholder="Ej: Fase de Liga" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[12.5px] font-semibold text-[var(--mat-sys-on-surface)]">Tipo de Fase</label>
              <select class="ph-field" [ngModel]="phaseFormType()" (ngModelChange)="onTypeChange($event)">
                <option value="league">Liga</option>
                <option value="knockout">Eliminatoria</option>
                <option value="groups">Grupos</option>
                <option value="swiss">Suizo</option>
              </select>
              <small class="text-[11.5px] text-[var(--mat-sys-on-surface-variant)]">El cambio de tipo reinicia la configuración</small>
            </div>
          </div>

          <!-- Status -->
          <div class="flex flex-col gap-1.5 max-w-[320px]">
            <label class="text-[12.5px] font-semibold text-[var(--mat-sys-on-surface)]">Estado</label>
            <select class="ph-field" [(ngModel)]="phaseForm.status">
              <option value="pending">Pendiente</option>
              <option value="active">En Curso</option>
              <option value="finished">Finalizado</option>
            </select>
          </div>

          <!-- Type-specific config -->
          <div class="flex items-center gap-3">
            <mat-checkbox
              [ngModel]="saveWithoutConfig()"
              (ngModelChange)="saveWithoutConfig.set(!!$event)"
            >Guardar fase sin configuración</mat-checkbox>
            @if (saveWithoutConfig()) {
              <span class="text-[12px] text-[var(--mat-sys-on-surface-variant)]">
                Solo se guardarán nombre, tipo, estado y orden.
              </span>
            }
          </div>

          @if (!saveWithoutConfig()) {
          @switch (phaseFormType()) {

            @case ('league') {
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Puntos por Victoria</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.winsPoints" min="0" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Puntos por Empate</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.drawPoints" min="0" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Puntos por Derrota</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.lossPoints" min="0" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Total de Rondas</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.totalRounds" min="1" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Partidos</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.legs">
                    <option [value]="1">Solo Ida</option><option [value]="2">Ida y Vuelta</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Equipos que Avanzan</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.advanceCount" min="0" />
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="ph-label">Criterio de Desempate</label>
                <div class="rounded-lg border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container-low)] px-3 py-2 text-[13px] text-[var(--mat-sys-on-surface)]">
                  @for (rule of leagueTiebreakCriteria(); track rule) {
                    <div>{{ $index + 1 }}. {{ rule }}</div>
                  }
                </div>
              </div>
            }

            @case ('knockout') {
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Formato</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.knockoutLegs">
                    <option [value]="1">Solo Ida</option><option [value]="2">Ida y Vuelta</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Tamaño del Bracket</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.bracketSize">
                    <option [value]="4">4 equipos</option><option [value]="8">8 equipos</option>
                    <option [value]="16">16 equipos</option><option [value]="32">32 equipos</option>
                  </select>
                  <small class="text-[11.5px] text-[var(--mat-sys-on-surface-variant)]">{{ knockoutRoundsLabel(phaseForm.bracketSize) }}</small>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Desempate</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.tieBreak">
                    <option value="penalties">Penaltis</option>
                    <option value="extra_time">Tiempo Extra + Penaltis</option>
                    <option value="away_goals">Gol de Visitante</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Criterio de Sembrado</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.seeding">
                    <option value="ranking">Por clasificación</option>
                    <option value="random">Aleatorio</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center justify-between gap-4">
                  <label class="ph-label">Partido 3er Lugar</label>
                  <button class="ph-toggle" [style.background]="phaseForm.thirdPlaceMatch ? '#3b82f6' : '#d1d5db'"
                          (click)="phaseForm.thirdPlaceMatch = !phaseForm.thirdPlaceMatch" type="button">
                    <span class="ph-thumb" [style.transform]="phaseForm.thirdPlaceMatch ? 'translateX(18px)' : 'translateX(2px)'"></span>
                  </button>
                </div>
                <div class="flex items-center justify-between gap-4">
                  <label class="ph-label">Gol Visitante</label>
                  <button class="ph-toggle" [style.background]="phaseForm.awayGoalsRule ? '#3b82f6' : '#d1d5db'"
                          (click)="phaseForm.awayGoalsRule = !phaseForm.awayGoalsRule" type="button">
                    <span class="ph-thumb" [style.transform]="phaseForm.awayGoalsRule ? 'translateX(18px)' : 'translateX(2px)'"></span>
                  </button>
                </div>
              </div>
            }

            @case ('groups') {
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Número de Grupos</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.numGroups" min="2" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Equipos por Grupo</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.teamsPerGroup" min="2" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Partidos</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.groupLegs">
                    <option [value]="1">Solo Ida</option><option [value]="2">Ida y Vuelta</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Avanzan por Grupo</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.advancePerGroup" min="1" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Mejores Terceros</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.advanceBestThirds" min="0" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Asignación</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.assignment">
                    <option value="manual">Manual</option>
                    <option value="random">Aleatoria</option>
                    <option value="seeded">Sembrada</option>
                  </select>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="ph-label">Criterio de Desempate</label>
                <select class="ph-field" [(ngModel)]="phaseForm.groupTiebreakOrder">
                  <option value="points,diff,gf,h2h,random">Puntos → Diferencia → GF → H2H → Azar</option>
                  <option value="points,diff,gf,random">Puntos → Diferencia → GF → Azar</option>
                </select>
              </div>
            }

            @case ('swiss') {
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Número de Rondas</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.numRounds" min="1" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Sistema de Emparejamiento</label>
                  <div class="ph-field bg-[var(--mat-sys-surface-container-low)] text-[var(--mat-sys-on-surface)]">Aleatorio </div>
                  <small class="text-[11.5px] text-[var(--mat-sys-on-surface-variant)]">No es configurable</small>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Primera Ronda</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.firstRound">
                    <option value="random">Aleatoria</option>
                    <option value="seeded">Sembrada por ranking</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Criterio de Desempate</label>
                  <div class="rounded-lg border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container-low)] px-3 py-2 text-[13px] text-[var(--mat-sys-on-surface)]">
                    @for (rule of swissTiebreakCriteria(); track rule) {
                      <div>{{ $index + 1 }}. {{ rule }}</div>
                    }
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Clasificados Directos</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.directAdvancedCount" min="0" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Clasificados a Playoff</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.playoffCount" min="0" />
                </div>
              </div>
              <div class="flex items-center justify-between gap-4 max-w-[320px]">
                <label class="ph-label">Permitir Revancha</label>
                <button class="ph-toggle" [style.background]="phaseForm.allowRematch ? '#3b82f6' : '#d1d5db'"
                        (click)="phaseForm.allowRematch = !phaseForm.allowRematch" type="button">
                  <span class="ph-thumb" [style.transform]="phaseForm.allowRematch ? 'translateX(18px)' : 'translateX(2px)'"></span>
                </button>
              </div>
            }
          }
          }

          <!-- Form footer -->
          <div class="flex justify-end gap-2.5 pt-1.5">
            <button matButton (click)="cancelEdit()" type="button">Cancelar</button>
            <button matButton="filled" [disabled]="!phaseForm.name.trim() || pendingPhaseOps() > 0" (click)="savePhase()" type="button">
              <mat-icon>save</mat-icon>
              Guardar Fase
            </button>
          </div>
        </div>
      </div>

      <!-- Panel footer -->
      <div class="flex justify-end gap-2.5 pt-4 border-t border-[var(--mat-sys-outline-variant)]">
        <button matButton (click)="cancel.emit()" type="button">Cancelar</button>
      </div>
    </div>
  }

</div>
  `,
  styles: `
    :host { display: block; }

    .ph-label { font-size: 12.5px; font-weight: 600; color: var(--mat-sys-on-surface); }

    .ph-field {
      padding: 8px 12px; border: 1px solid var(--mat-sys-outline-variant); border-radius: 8px;
      font-size: 14px; color: var(--mat-sys-on-surface); background: var(--mat-sys-surface-container); font-family: inherit;
      outline: none; transition: border-color .15s; width: 100%; box-sizing: border-box;
      appearance: auto;
      &:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
    }

    .ph-toggle {
      position: relative; width: 38px; height: 22px; border-radius: 11px; border: none;
      cursor: pointer; transition: background .2s; padding: 0; shrink-flow: 0; flex-shrink: 0;
    }
    .ph-thumb {
      position: absolute; top: 2px; width: 18px; height: 18px; border-radius: 50%;
      background: #fff; transition: transform .2s; display: block; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }

    .btn-ghost-sm {
      padding: 8px 18px; border-radius: 8px; background: var(--mat-sys-surface-container); color: var(--mat-sys-on-surface);
      font-size: 13px; font-weight: 500; border: 1px solid var(--mat-sys-outline-variant); cursor: pointer;
      transition: background .15s;
      &:hover { background: var(--mat-sys-surface-container-high); }
    }
  `,
})
export class ChampionshipPhasesComponent {

  // ── Inputs / Outputs ──────────────────────────────────────────
  readonly championshipId = input<string | null>(null);
  /** Fases pre-existentes (modo edición — viene del backend) */
  readonly initialPhases = input<PhaseCardData[]>([]);
  readonly initialFormat = input<ChampionshipFormat | null>(null);

  readonly phasesChange = output<PhaseCardData[]>();
  readonly cancel = output<void>();

  // ── Services ──────────────────────────────────────────────────
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);
  private championshipSvc = inject(ChampionshipService);
  private dialog = inject(MatDialog);

  // ── Static ────────────────────────────────────────────────────
  readonly formatOptions = FORMAT_OPTIONS;
  readonly leagueTiebreakCriteria = () => COMMON_TIEBREAK_LABELS;
  readonly swissTiebreakCriteria = () => COMMON_TIEBREAK_LABELS;
  readonly phaseTemplates = signal<Record<ChampionshipFormat, PhaseTemplate[]>>(DEFAULT_PHASE_TEMPLATES);

  // ── State ─────────────────────────────────────────────────────
  viewMode = signal<PhaseViewMode>('format-picker');
  selectedFormat = signal<ChampionshipFormat | null>(null);
  activeFormat = signal<ChampionshipFormat | null>(null);
  phases = signal<PhaseCardData[]>([]);
  originalPhases = signal<PhaseCardData[]>([]);
  editingPhaseId = signal<number | null>(null);
  phaseFormType = signal<PhaseType>(PhaseType.League);
  hasUnsavedChanges = signal(false);
  pendingPhaseOps = signal(0);
  saveWithoutConfig = signal(false);
  private hasLoadedInitialData = false;

  // Drag state (plain object — not signal, updated via CD)
  dragState = { dragging: false, dragId: null as number | null, overId: null as number | null };

  // ── Phase form ────────────────────────────────────────────────
  phaseForm = {
    phaseId: null as number | null, name: '', status: PhaseStatus.Pending as string, phaseOrder: 1,
    winsPoints: 3, drawPoints: 1, lossPoints: 0, totalRounds: 10, legs: 1,
    tiebreakOrder: LEAGUE_TIEBREAK_ORDER, advanceCount: 4,
    knockoutLegs: 1, bracketSize: 8, thirdPlaceMatch: false,
    seeding: 'ranking', awayGoalsRule: false, tieBreak: 'penalties',
    numGroups: 4, teamsPerGroup: 4, groupLegs: 1, advancePerGroup: 2,
    advanceBestThirds: 0, assignment: 'manual', groupTiebreakOrder: 'points,diff,gf,h2h,random',
    numRounds: 7, pairingSystem: SWISS_PAIRING_SYSTEM, firstRound: 'random', allowRematch: false,
    swissTiebreakOrder: SWISS_TIEBREAK_ORDER, directAdvancedCount: 2, playoffCount: 4,
  };

  // ── Computed ──────────────────────────────────────────────────
  isNewPhase = computed(() => !this.phaseForm.phaseId);

  editingPhaseIsBase = computed(() => {
    const id = this.editingPhaseId();
    if (!id) return false;
    return this.phases().find(p => p.id === id)?.isBase ?? false;
  });

  formatLabel = computed(() =>
    FORMAT_OPTIONS.find(f => f.id === this.activeFormat())?.label ?? ''
  );

  // ── Lifecycle ─────────────────────────────────────────────────
  constructor() {
    void this.loadTemplatesFromJson();

    effect(() => {
      const existing = this.initialPhases();
      if (existing.length === 0) {
        return;
      }

      // Avoid overriding local edits after the user starts changing phases.
      if (this.hasLoadedInitialData && this.hasUnsavedChanges()) {
        return;
      }

      this.hasLoadedInitialData = true;
      this.phases.set(existing.map(p => ({ ...p })));
      this.originalPhases.set(existing.map(p => ({ ...p })));
      const fmt = this.initialFormat() ?? this.inferFormat(existing);
      if (fmt) {
        this.activeFormat.set(fmt);
        this.selectedFormat.set(fmt);
      }
      this.viewMode.set('list');
      this.cdr.markForCheck();
    });
  }

  /** Infiere el formato del campeonato a partir de los tipos de fases existentes. */
  private inferFormat(phases: PhaseCardData[]): ChampionshipFormat | null {
    const types = new Set(phases.map(p => p.phaseType));
    if (types.has(PhaseType.Swiss)) return 'swiss_playoff';
    if (types.has(PhaseType.Groups)) return 'groups_knockout';
    if (types.has(PhaseType.Knockout) && !types.has(PhaseType.League)) return 'knockout';
    if (types.has(PhaseType.League)) return 'league';
    return null;
  }

  // ── Format picker ─────────────────────────────────────────────
  applyFormat(): void {
    const fmt = this.selectedFormat();
    if (!fmt) return;
    this.activeFormat.set(fmt);
    const base = this.buildBasePhasesFromTemplate(fmt);
    this.phases.set(base);
    this.originalPhases.set(base.map(p => ({ ...p })));
    this.hasUnsavedChanges.set(true);
    this.viewMode.set('list');
    this.phasesChange.emit(this.phases());
  }

  changeFormat(): void {
    if (this.phases().some(p => p.status === PhaseStatus.Active)) {
      this.snackBar.open(
        'No puedes cambiar el formato: hay fases en curso.',
        'Cerrar', { duration: 3500 }
      );
      return;
    }
    this.selectedFormat.set(this.activeFormat());
    this.viewMode.set('format-picker');
  }

  // ── Phase CRUD ────────────────────────────────────────────────
  openPhaseDetail(phase: PhaseCardData): void {
    this.editingPhaseId.set(phase.id);
    this.phaseFormType.set(phase.phaseType);
    Object.assign(this.phaseForm, {
      phaseId: phase.id, name: phase.name,
      status: phase.status, phaseOrder: phase.phaseOrder,
    });
    if (phase.league) Object.assign(this.phaseForm, { winsPoints: phase.league.winsPoints, drawPoints: phase.league.drawPoints, lossPoints: phase.league.lossPoints, totalRounds: phase.league.totalRounds, legs: phase.league.legs, tiebreakOrder: LEAGUE_TIEBREAK_ORDER, advanceCount: phase.league.advanceCount });
    if (phase.knockout) Object.assign(this.phaseForm, { knockoutLegs: phase.knockout.legs, bracketSize: phase.knockout.bracketSize, thirdPlaceMatch: phase.knockout.thirdPlaceMatch, seeding: phase.knockout.seeding, awayGoalsRule: phase.knockout.awayGoalsRule, tieBreak: phase.knockout.tieBreak });
    if (phase.groups) Object.assign(this.phaseForm, { numGroups: phase.groups.numGroups, teamsPerGroup: phase.groups.teamsPerGroup, groupLegs: phase.groups.legs, advancePerGroup: phase.groups.advancePerGroup, advanceBestThirds: phase.groups.advanceBestThirds, groupTiebreakOrder: phase.groups.tiebreakOrder });
    if (phase.swiss) Object.assign(this.phaseForm, { numRounds: phase.swiss.numRounds, pairingSystem: SWISS_PAIRING_SYSTEM, firstRound: phase.swiss.firstRound, allowRematch: phase.swiss.allowRematch, swissTiebreakOrder: SWISS_TIEBREAK_ORDER, directAdvancedCount: phase.swiss.directAdvancedCount, playoffCount: phase.swiss.playoffCount });
    const hasConfig = Boolean(phase.league || phase.knockout || phase.groups || phase.swiss);
    this.saveWithoutConfig.set(!hasConfig);
    this.viewMode.set('detail');
  }

  addPhase(): void {
    this.editingPhaseId.set(null);
    this.phaseFormType.set(PhaseType.League);
    Object.assign(this.phaseForm, {
      phaseId: null, name: '', status: PhaseStatus.Pending,
      phaseOrder: this.phases().length + 1,
      winsPoints: 3, drawPoints: 1, lossPoints: 0, totalRounds: 10, legs: 1,
      tiebreakOrder: LEAGUE_TIEBREAK_ORDER, advanceCount: 4,
    });
    this.saveWithoutConfig.set(false);
    this.viewMode.set('detail');
  }

  private getChampionshipId(): string | null {
    const raw = this.championshipId();
    return raw && raw.trim().length > 0 ? raw : null;
  }

  private persistReorder(list: PhaseCardData[]): void {
    const championshipId = this.getChampionshipId();
    if (championshipId === null) return;

    const updates = list
      .filter((phase) => phase.backendId !== undefined)
      .map((phase) => this.championshipSvc.updatePhase(phase.backendId!, {
        id: phase.backendId!,
        championshipId,
        name: phase.name,
        phaseType: phase.phaseType as 'swiss',
        phaseOrder: phase.phaseOrder,
        status: phase.status,
        isActive: true,
      } as any));

    if (updates.length === 0) return;

    this.pendingPhaseOps.update((v) => v + 1);
    forkJoin(updates)
      .pipe(finalize(() => this.pendingPhaseOps.update((v) => Math.max(0, v - 1))))
      .subscribe({
        error: () => {
          this.snackBar.open('No se pudo persistir el nuevo orden de fases', 'Cerrar', { duration: 3000 });
        },
      });
  }

  savePhase(): void {
    const phaseName = this.phaseForm.name.trim();
    if (!phaseName) return;

    // Only require confirmation when the phase will be saved without configuration.
    if (!this.saveWithoutConfig()) {
      this.savePhaseConfirmed();
      return;
    }

    this.dialog.open<SavePhaseDialogComponent, SavePhaseDialogData, boolean>(SavePhaseDialogComponent, {
      data: {
        phaseName,
        withConfig: false,
      },
      width: '420px',
    }).afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.savePhaseConfirmed();
    });
  }

  private savePhaseConfirmed(): void {
    if (!this.phaseForm.name.trim()) return;
    const t = this.phaseFormType();
    const existing = this.phases().find(p => p.id === this.phaseForm.phaseId);
    const withConfig = !this.saveWithoutConfig();
    const phase: PhaseCardData = {
      id: existing?.id ?? (_nextPhaseId++),
      name: this.phaseForm.name,
      phaseType: t,
      phaseOrder: this.phaseForm.phaseOrder,
      status: this.phaseForm.status as PhaseStatus,
      isBase: existing?.isBase ?? false,
      ...(withConfig && t === PhaseType.League && { league: { winsPoints: this.phaseForm.winsPoints, drawPoints: this.phaseForm.drawPoints, lossPoints: this.phaseForm.lossPoints, totalRounds: this.phaseForm.totalRounds, legs: this.phaseForm.legs, tiebreakOrder: LEAGUE_TIEBREAK_ORDER, advanceCount: this.phaseForm.advanceCount } }),
      ...(withConfig && t === PhaseType.Knockout && { knockout: { legs: this.phaseForm.knockoutLegs, bracketSize: this.phaseForm.bracketSize, thirdPlaceMatch: this.phaseForm.thirdPlaceMatch, seeding: this.phaseForm.seeding, awayGoalsRule: this.phaseForm.awayGoalsRule, tieBreak: this.phaseForm.tieBreak } }),
      ...(withConfig && t === PhaseType.Groups && { groups: { numGroups: this.phaseForm.numGroups, teamsPerGroup: this.phaseForm.teamsPerGroup, legs: this.phaseForm.groupLegs, advancePerGroup: this.phaseForm.advancePerGroup, advanceBestThirds: this.phaseForm.advanceBestThirds, tiebreakOrder: this.phaseForm.groupTiebreakOrder } }),
      ...(withConfig && t === PhaseType.Swiss && { swiss: { numRounds: this.phaseForm.numRounds, pairingSystem: SWISS_PAIRING_SYSTEM, firstRound: this.phaseForm.firstRound, allowRematch: this.phaseForm.allowRematch, tiebreakOrder: SWISS_TIEBREAK_ORDER, directAdvancedCount: this.phaseForm.directAdvancedCount, playoffCount: this.phaseForm.playoffCount } }),
    };
    const applyLocal = (nextPhase: PhaseCardData): void => {
      this.phases.update(list =>
        existing ? list.map(p => p.id === nextPhase.id ? nextPhase : p) : [...list, nextPhase],
      );
      this.hasUnsavedChanges.set(true);
      this.phasesChange.emit(this.phases());
      this.viewMode.set('list');
      this.snackBar.open(`Fase "${nextPhase.name}" guardada`, 'Cerrar', { duration: 2000 });
    };

    const championshipId = this.getChampionshipId();
    if (championshipId === null) {
      applyLocal(phase);
      return;
    }

    const dto = {
      championshipId,
      name: phase.name,
      phaseType: phase.phaseType as 'swiss',
      phaseOrder: phase.phaseOrder,
      status: phase.status,
      isActive: true,
    };

    const request$ = existing?.backendId
      ? this.championshipSvc.updatePhase(existing.backendId, dto as any)
      : this.championshipSvc.createPhase(dto as any);

    this.pendingPhaseOps.update((v) => v + 1);
    request$
      .pipe(finalize(() => this.pendingPhaseOps.update((v) => Math.max(0, v - 1))))
      .subscribe({
        next: (saved) => {
          applyLocal({
            ...phase,
            backendId: existing?.backendId ?? Number(saved.id),
          });
        },
        error: () => {
          applyLocal(phase);
          this.snackBar.open('No se pudo persistir en backend. Se guardo localmente.', 'Cerrar', { duration: 3500 });
        },
      });
  }

  deletePhase(id: number): void {
    const phase = this.phases().find(p => p.id === id);
    if (phase?.isBase) {
      this.snackBar.open('Las fases base del formato no se pueden eliminar', 'Cerrar', { duration: 3000 });
      return;
    }
    const applyLocalDelete = (): void => {
      this.phases.update(list =>
        list.filter(p => p.id !== id).map((p, i) => ({ ...p, phaseOrder: i + 1 })),
      );
      this.hasUnsavedChanges.set(true);
      this.phasesChange.emit(this.phases());
      if (this.viewMode() === 'detail') this.viewMode.set('list');
    };

    if (phase?.backendId === undefined) {
      applyLocalDelete();
      return;
    }

    this.pendingPhaseOps.update((v) => v + 1);
    this.championshipSvc.deletePhase(phase.backendId)
      .pipe(finalize(() => this.pendingPhaseOps.update((v) => Math.max(0, v - 1))))
      .subscribe({
        next: () => applyLocalDelete(),
        error: () => this.snackBar.open('No se pudo eliminar la fase en el servidor', 'Cerrar', { duration: 3500 }),
      });
  }

  cancelEdit(): void { this.viewMode.set('list'); }

  // ── Type change ───────────────────────────────────────────────
  onTypeChange(type: PhaseType): void {
    this.phaseFormType.set(type);
    const defaults: Record<PhaseType, object> = {
      [PhaseType.League]: { winsPoints: 3, drawPoints: 1, lossPoints: 0, totalRounds: 10, legs: 1, tiebreakOrder: LEAGUE_TIEBREAK_ORDER, advanceCount: 4 },
      [PhaseType.Knockout]: { knockoutLegs: 1, bracketSize: 8, thirdPlaceMatch: false, seeding: 'ranking', awayGoalsRule: false, tieBreak: 'penalties' },
      [PhaseType.Groups]: { numGroups: 4, teamsPerGroup: 4, groupLegs: 1, advancePerGroup: 2, advanceBestThirds: 0, assignment: 'manual', groupTiebreakOrder: 'points,diff,gf,h2h,random' },
      [PhaseType.Swiss]: { numRounds: 7, pairingSystem: SWISS_PAIRING_SYSTEM, firstRound: 'random', allowRematch: false, swissTiebreakOrder: SWISS_TIEBREAK_ORDER, directAdvancedCount: 2, playoffCount: 4 },
    };
    Object.assign(this.phaseForm, defaults[type]);
    this.cdr.markForCheck();
  }

  // ── Drag & Drop (HTML5 native) ────────────────────────────────
  onDragStart(event: DragEvent, phase: PhaseCardData): void {
    if (phase.isBase) { event.preventDefault(); return; }
    this.dragState = { dragging: true, dragId: phase.id, overId: null };
    event.dataTransfer?.setData('text/plain', String(phase.id));
    this.cdr.markForCheck();
  }

  onDragEnd(): void {
    this.dragState = { dragging: false, dragId: null, overId: null };
    this.cdr.markForCheck();
  }

  onItemDragOver(event: DragEvent, target: PhaseCardData): void {
    event.preventDefault();
    if (this.dragState.dragId === target.id) return;
    this.dragState.overId = target.id;
    this.cdr.markForCheck();
  }

  onListDragOver(event: DragEvent): void { event.preventDefault(); }

  onListDrop(event: DragEvent): void {
    event.preventDefault();
    const dragId = this.dragState.dragId;
    const overId = this.dragState.overId;
    this.dragState = { dragging: false, dragId: null, overId: null };

    if (!dragId || dragId === overId) { this.cdr.markForCheck(); return; }

    const list = [...this.phases()];
    const fromIdx = list.findIndex(p => p.id === dragId);
    const toIdx = overId ? list.findIndex(p => p.id === overId) : list.length - 1;

    if (fromIdx === -1 || toIdx === -1) { this.cdr.markForCheck(); return; }

    // Base phases are always first — prevent dragging before them
    const baseCutoff = list.filter(p => p.isBase).length;
    if (toIdx < baseCutoff) { this.cdr.markForCheck(); return; }

    const [moved] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, moved);
    const reordered = list.map((p, i) => ({ ...p, phaseOrder: i + 1 }));

    this.phases.set(reordered);
    this.hasUnsavedChanges.set(true);
    this.phasesChange.emit(reordered);
    this.persistReorder(reordered);
    this.cdr.markForCheck();
  }

  // ── UI helpers ────────────────────────────────────────────────
  phaseTypeLabel(type: string): string {
    return { league: 'Liga', knockout: 'Eliminatoria', groups: 'Grupos', swiss: 'Suizo' }[type] ?? type;
  }
  phaseStatusLabel(status: string): string {
    return { pending: 'Pendiente', active: 'En Curso', finished: 'Finalizado' }[status] ?? status;
  }
  phaseTypeTagClass(type: string): string {
    return {
      league: 'bg-blue-100 text-blue-700',
      knockout: 'bg-orange-100 text-orange-700',
      groups: 'bg-purple-100 text-purple-700',
      swiss: 'bg-emerald-100 text-emerald-700',
    }[type] ?? 'bg-gray-100 text-gray-600';
  }
  knockoutRoundsLabel(size: number): string {
    const map: Record<number, string> = { 2: 'Final', 4: 'Semifinal', 8: 'Cuartos', 16: 'Octavos', 32: 'Dieciseisavos' };
    const r: string[] = []; let n = size;
    while (n >= 2) { if (map[n]) r.push(map[n]); n = Math.floor(n / 2); }
    return r.join(', ');
  }

  private buildBasePhasesFromTemplate(format: ChampionshipFormat): PhaseCardData[] {
    const templates = this.phaseTemplates()[format] ?? DEFAULT_PHASE_TEMPLATES[format];

    return templates.map((template, index) => {
      const phase = structuredClone(template);
      return {
        ...phase,
        id: index + 1,
        phaseOrder: phase.phaseOrder ?? index + 1,
        status: phase.status ?? PhaseStatus.Pending,
        isBase: phase.isBase ?? true,
      };
    });
  }

  formatPreview(format: ChampionshipFormat): string[] {
    const templates = this.phaseTemplates()[format] ?? DEFAULT_PHASE_TEMPLATES[format];
    if (!templates.length) {
      return FORMAT_OPTIONS.find((item) => item.id === format)?.phases ?? [];
    }
    return templates.map((template) => template.name);
  }

  private async loadTemplatesFromJson(): Promise<void> {
    try {
      const response = await fetch(PHASE_TEMPLATES_URL, { cache: 'no-store' });
      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as PhaseTemplatesJson;
      const parsed = this.parseTemplatesJson(payload);
      if (!parsed) {
        return;
      }

      this.phaseTemplates.set(parsed);
      this.cdr.markForCheck();
    } catch {
      // Keep defaults when JSON file is not available.
    }
  }

  private parseTemplatesJson(payload: PhaseTemplatesJson): Record<ChampionshipFormat, PhaseTemplate[]> | null {
    if (!payload || typeof payload !== 'object' || !payload.formats) {
      return null;
    }

    const merged = structuredClone(DEFAULT_PHASE_TEMPLATES);
    for (const option of FORMAT_OPTIONS) {
      const rawTemplates = payload.formats[option.id]?.phases;
      if (!Array.isArray(rawTemplates) || rawTemplates.length === 0) {
        continue;
      }

      const valid = rawTemplates.filter((item) => this.isValidTemplate(item));
      if (valid.length > 0) {
        merged[option.id] = valid;
      }
    }

    return merged;
  }

  private isValidTemplate(template: PhaseTemplate): boolean {
    if (!template || typeof template !== 'object') {
      return false;
    }

    if (!template.name || typeof template.name !== 'string') {
      return false;
    }

    return Object.values(PhaseType).includes(template.phaseType);
  }
}