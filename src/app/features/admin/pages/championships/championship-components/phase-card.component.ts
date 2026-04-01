// ─────────────────────────────────────────────────────────────
// phase-card.component.ts
// ─────────────────────────────────────────────────────────────

import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatIconModule }   from '@angular/material/icon';

// ─── Types (re-exportados para uso en el parent) ──────────────
export enum PhaseType   { League = 'league', Knockout = 'knockout', Groups = 'groups', Swiss = 'swiss' }
export enum PhaseStatus { Pending = 'pending', Active = 'active', Finished = 'finished' }

export interface LeagueConfig {
  winsPoints:     number;
  drawPoints:     number;
  lossPoints:     number;
  totalRounds:    number;
  legs:           number;
  advanceCount:   number;
  tiebreakOrder:  string;
}

export interface KnockoutConfig {
  legs:             number;
  bracketSize:      number;
  thirdPlaceMatch:  boolean;
  seeding:          string;
  awayGoalsRule:    boolean;
  tieBreak:         string;
}

export interface GroupsConfig {
  numGroups:          number;
  teamsPerGroup:      number;
  legs:               number;
  advancePerGroup:    number;
  advanceBestThirds:  number;
  tiebreakOrder:      string;
}

export interface SwissConfig {
  numRounds:            number;
  pairingSystem:        string;
  firstRound:           string;
  allowRematch:         boolean;
  tiebreakOrder:        string;
  directAdvancedCount:  number;
  playoffCount:         number;
}

export interface PhaseCardData {
  id:          number;
  name:        string;
  phaseType:   PhaseType;
  phaseOrder:  number;
  status:      PhaseStatus;
  isBase?:     boolean;    // true = fase generada por el formato, no eliminable
  league?:     LeagueConfig;
  knockout?:   KnockoutConfig;
  groups?:     GroupsConfig;
  swiss?:      SwissConfig;
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const TYPE_META: Record<PhaseType, { label: string; tw: string }> = {
  [PhaseType.League]:   { label: 'Liga',         tw: 'bg-blue-100  text-blue-700'     },
  [PhaseType.Knockout]: { label: 'Eliminatoria', tw: 'bg-orange-100 text-orange-700'  },
  [PhaseType.Groups]:   { label: 'Grupos',       tw: 'bg-purple-100 text-purple-700'  },
  [PhaseType.Swiss]:    { label: 'Suizo',        tw: 'bg-emerald-100 text-emerald-700'},
};

const STATUS_META: Record<PhaseStatus, { label: string; dotTw: string; pillTw: string }> = {
  [PhaseStatus.Active]:   { label: 'En Curso',   dotTw: 'bg-green-500',  pillTw: 'bg-green-50  text-green-700  ring-green-200'  },
  [PhaseStatus.Pending]:  { label: 'Pendiente',  dotTw: 'bg-amber-400',  pillTw: 'bg-amber-50  text-amber-700  ring-amber-200'  },
  [PhaseStatus.Finished]: { label: 'Finalizado', dotTw: 'bg-slate-400',  pillTw: 'bg-slate-100 text-slate-600  ring-slate-200'  },
};

function knockoutRounds(bracketSize: number): string {
  const names: Record<number, string> = {
    32: 'Dieciseisavos', 16: 'Octavos de Final',
    8:  'Cuartos de Final', 4: 'Semifinal', 2: 'Final',
  };
  const rounds: string[] = [];
  let n = bracketSize;
  while (n >= 2) { if (names[n]) rounds.push(names[n]); n = Math.floor(n / 2); }
  return rounds.join(', ');
}

function swissPairingLabel(sys: string): string {
  return { dutch: 'Holandés', accelerated: 'Acelerado', monrad: 'Monrad' }[sys] ?? sys;
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-phase-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet, MatIconModule],
  template: `
    <!-- ── Outer card ──────────────────────────────────────── -->
    <div
      class="relative flex rounded-xl border bg-white transition-shadow duration-150 hover:shadow-md"
      [class]="activeBorderClass()"
    >
      <!-- Order badge (left column) -->
      <div
        class="flex w-12 min-w-[3rem] shrink-0 items-center justify-center rounded-l-xl border-r text-sm font-bold"
        [class]="orderBadgeClass()"
      >
        {{ phase().phaseOrder }}
      </div>

      <!-- Body -->
      <div class="flex min-w-0 flex-1 flex-col gap-3 px-4 py-3">

        <!-- ── Title row ──────────────────────────────────── -->
        <div class="flex flex-wrap items-center gap-2">

          <!-- Status dot -->
          <span
            class="inline-block size-2 shrink-0 rounded-full"
            [class]="statusDotClass()"
          ></span>

          <!-- Name -->
          <span class="text-[15px] font-semibold text-gray-900">
            {{ phase().name }}
          </span>

          <!-- Type tag -->
          <span
            class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            [class]="typeTagClass()"
          >
            {{ typeLabel() }}
          </span>

          <!-- Status pill -->
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset"
            [class]="statusPillClass()"
          >
            <span class="size-1.5 rounded-full" [class]="statusDotClass()"></span>
            {{ statusLabel() }}
          </span>

          <!-- Configure button -->
          <button
            class="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-[13px] text-gray-400
                   transition-colors hover:bg-gray-50 hover:text-gray-700 active:bg-gray-100"
            (click)="configure.emit(phase())"
            type="button"
          >
            <mat-icon class="!size-[14px] !text-[14px]">edit</mat-icon>
            Configurar
            <mat-icon class="!size-4 !text-[16px]">chevron_right</mat-icon>
          </button>

          <!-- Lock badge for base phases -->
          @if (locked()) {
            <div
              class="inline-flex items-center gap-1 px-2 py-1 rounded-md
                     bg-gray-100 text-gray-400 text-[11px] font-medium"
              title="Fase base del formato — no se puede eliminar ni mover por delante de las fases base"
            >
              <mat-icon class="!size-[12px] !text-[12px]">lock</mat-icon>
              Base
            </div>
          }
        </div>

        <!-- ── Stats grid ─────────────────────────────────── -->
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">

          @switch (phase().phaseType) {

            @case ('league') {
              <ng-container *ngTemplateOutlet="stat; context: { label: 'PTS. VICTORIA', value: phase().league?.winsPoints  }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'PTS. EMPATE',   value: phase().league?.drawPoints  }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'PTS. DERROTA',  value: phase().league?.lossPoints  }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'TOTAL RONDAS',  value: phase().league?.totalRounds }"></ng-container>
            }

            @case ('knockout') {
              <ng-container *ngTemplateOutlet="stat; context: { label: 'FORMATO',    value: phase().knockout?.legs === 2 ? 'Ida y Vuelta' : 'Solo Ida' }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: '3ER LUGAR',  value: phase().knockout?.thirdPlaceMatch ? 'Sí' : 'No'           }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'RONDAS', value: knockoutRoundsLabel(), wide: true }"></ng-container>
            }

            @case ('groups') {
              <ng-container *ngTemplateOutlet="stat; context: { label: 'N° GRUPOS',     value: phase().groups?.numGroups     }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'EQ. POR GRUPO', value: phase().groups?.teamsPerGroup }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'AVANZAN',        value: (phase().groups?.advancePerGroup ?? 0) + ' por grupo' }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'PARTIDOS',       value: phase().groups?.legs === 2 ? 'Ida y Vuelta' : 'Solo Ida' }"></ng-container>
            }

            @case ('swiss') {
              <ng-container *ngTemplateOutlet="stat; context: { label: 'RONDAS',        value: phase().swiss?.numRounds                              }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'SISTEMA',       value: swissPairingLabel(phase().swiss?.pairingSystem ?? '') }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'CLASIF. DIREC.', value: phase().swiss?.directAdvancedCount                   }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'PLAYOFF',       value: phase().swiss?.playoffCount                           }"></ng-container>
            }

          }
        </div>

      </div>
    </div>

    <!-- ── Stat cell template ──────────────────────────────── -->
    <ng-template #stat let-label="label" let-value="value" let-wide="wide">
      <div
        class="flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
        [class.col-span-2]="wide"
      >
        <span class="text-[9px] font-bold uppercase tracking-widest text-gray-400">
          {{ label }}
        </span>
        <span class="text-[15px] font-semibold text-gray-900">{{ value }}</span>
      </div>
    </ng-template>
  `,
})
export class PhaseCardComponent {

  // ── Inputs / Outputs ──────────────────────────────────────────
  readonly phase     = input.required<PhaseCardData>();
  readonly locked    = input(false);   // true = fase base, no eliminable
  readonly configure = output<PhaseCardData>();
  readonly delete    = output<void>();

  // ── Exposed helpers for template ──────────────────────────────
  readonly knockoutRoundsLabel = () => knockoutRounds(this.phase().knockout?.bracketSize ?? 8);
  readonly swissPairingLabel   = swissPairingLabel;

  typeLabel()   { return TYPE_META[this.phase().phaseType].label;   }
  statusLabel() { return STATUS_META[this.phase().status].label;    }

  typeTagClass()    { return TYPE_META[this.phase().phaseType].tw;          }
  statusDotClass()  { return STATUS_META[this.phase().status].dotTw;        }
  statusPillClass() { return STATUS_META[this.phase().status].pillTw;       }

  activeBorderClass(): string {
    const s = this.phase().status;
    if (s === PhaseStatus.Active)   return 'border-blue-300 shadow-[inset_3px_0_0_0_#3b82f6]';
    if (s === PhaseStatus.Finished) return 'border-gray-200';
    return 'border-gray-200';
  }

  orderBadgeClass(): string {
    const s = this.phase().status;
    if (s === PhaseStatus.Active)  return 'border-gray-100 bg-blue-50  text-blue-500';
    if (s === PhaseStatus.Pending) return 'border-gray-100 bg-amber-50 text-amber-500';
    return 'border-gray-100 bg-gray-50 text-gray-400';
  }
}