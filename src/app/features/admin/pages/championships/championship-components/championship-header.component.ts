// ─────────────────────────────────────────────────────────────
// championship-header.component.ts
// Header del campeonato — sin fases, standalone, Tailwind CSS
// ─────────────────────────────────────────────────────────────

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

// ─── Types ───────────────────────────────────────────────────

export type ChampionshipHeaderStatus = 'draft' | 'registration' | 'active' | 'finished' | 'cancelled';

export interface SportOption {
  id: number;
  label: string;
  icon: string;
}

export interface ChampionshipHeaderData {
  name: string;
  description: string;
  sportId: number;
  season: string;
  location: string;
  startDate: string;   // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  registrationStartDate: string;  // YYYY-MM-DD
  registrationEndDate: string;  // YYYY-MM-DD
  maxTeams: number;
  currentTeams: number;
  maxPlayersPerTeam: number;
  phaseCount: number;
  status: ChampionshipHeaderStatus;
  logoUrl: string | null;
  socialLinks: ChampionshipHeaderSocialLink[];
}

export interface ChampionshipHeaderSocialLink {
  id?: number;
  socialNetworkId: number;
  link: string;
  name?: string;
  icon?: string;
}

// ─── Constants ───────────────────────────────────────────────

const STATUS_META: Record<ChampionshipHeaderStatus, { label: string; dot: string; pill: string }> = {
  draft: { label: 'Borrador', dot: 'bg-slate-400', pill: 'bg-slate-500/20  text-slate-300   ring-slate-500/30' },
  registration: { label: 'Inscripciones', dot: 'bg-blue-400', pill: 'bg-blue-500/20   text-blue-300    ring-blue-500/30' },
  active: { label: 'Activo', dot: 'bg-green-400', pill: 'bg-green-500/20  text-green-300   ring-green-500/30' },
  finished: { label: 'Finalizado', dot: 'bg-slate-500', pill: 'bg-slate-500/20  text-slate-400   ring-slate-500/30' },
  cancelled: { label: 'Cancelado', dot: 'bg-red-400', pill: 'bg-red-500/20    text-red-300     ring-red-500/30' },
};

const SOCIAL_NETWORK_OPTIONS: Array<{
  id: number;
  name: string;
  icon: string;
  placeholder: string;
  brandBg: string;
  brandBorder: string;
}> = [
    {
      id: 1,
      name: 'Facebook',
      icon: 'thumb_up',
      placeholder: 'https://facebook.com/tu-pagina',
      brandBg: '#1877F2',
      brandBorder: '#3B82F6',
    },
    {
      id: 2,
      name: 'Instagram',
      icon: 'photo_camera',
      placeholder: 'https://instagram.com/tu-cuenta',
      brandBg: 'linear-gradient(135deg, #F58529, #DD2A7B 45%, #8134AF 75%, #515BD4)',
      brandBorder: '#DD2A7B',
    },
    {
      id: 3,
      name: 'X',
      icon: 'close',
      placeholder: 'https://x.com/tu-cuenta',
      brandBg: '#111827',
      brandBorder: '#374151',
    },
    {
      id: 4,
      name: 'TikTok',
      icon: 'music_note',
      placeholder: 'https://tiktok.com/@tu-cuenta',
      brandBg: '#111827',
      brandBorder: '#14B8A6',
    },
    {
      id: 5,
      name: 'YouTube',
      icon: 'smart_display',
      placeholder: 'https://youtube.com/@tu-canal',
      brandBg: '#FF0000',
      brandBorder: '#EF4444',
    },
  ];

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-championship-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, MatIconModule, MatTooltipModule],
  template: `
<!-- ══ HEADER ════════════════════════════════════════════════ -->
<header
  class="relative flex gap-5 items-start px-7 pt-6 pb-5"
  style="background: radial-gradient(ellipse 55% 90% at 90% 10%, rgba(56,110,229,0.1) 0%, transparent 70%), linear-gradient(165deg, #0c1526 0%, #0f1d35 50%, #0c1728 100%);"
>

  <!-- ── Logo ──────────────────────────────────────────────── -->
  <div
    class="relative size-[72px] shrink-0 mt-0.5 rounded-[14px] overflow-hidden cursor-pointer
           border border-white/10 bg-white/5 transition-[border-color]
           hover:border-white/25 group"
    [class.pointer-events-none]="!editable()"
    (click)="editable() && triggerLogoUpload()"
    matTooltip="Cambiar logo"
    [matTooltipDisabled]="!editable()"
  >
    @if (logoPreview()) {
      <img [src]="logoPreview()" alt="Logo" class="size-full object-cover" />
    } @else {
      <div class="flex size-full items-center justify-center">
        <mat-icon class="!size-[34px] !text-[34px] text-amber-400">emoji_events</mat-icon>
      </div>
    }
    @if (editable()) {
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-0.5
                  bg-black/65 opacity-0 transition-opacity group-hover:opacity-100 text-white">
        <mat-icon class="!size-5 !text-[20px]">photo_camera</mat-icon>
        <span class="text-[11px] font-medium">Cambiar</span>
      </div>
    }
  </div>
  <input #fileInput type="file" accept="image/*" class="sr-only" (change)="onLogoSelected($event)" />

  <!-- ── Body ──────────────────────────────────────────────── -->
  <div class="flex min-w-0 flex-1 flex-col gap-1.5">

    <!-- Row 1 — Name + status pill -->
    <div class="relative flex flex-wrap items-center gap-2.5" #nameContainer>

      <!-- Name -->
      <h1
        class="m-0 text-[1.75rem] font-bold tracking-tight leading-tight text-white
               inline-flex items-center gap-1.5 transition-colors"
        [class.text-white/25]="!data().name"
        [class.cursor-pointer]="editable()"
        [class.rounded-md]="editable()"
        [class.hover:bg-white/8]="editable()"
        (click)="editable() && openPopover()"
      >
        {{ data().name || 'Nombre del campeonato' }}
        @if (editable() && !popoverOpen()) {
          <mat-icon class="!size-[15px] !text-[15px] text-white/30 opacity-0
                           group-[]/name:opacity-100 transition-opacity">edit</mat-icon>
        }
      </h1>

      <!-- Status pill -->
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5
               text-[12px] font-semibold ring-1 ring-inset"
        [class]="statusPillClass()"
      >
        <span class="size-1.5 rounded-full" [class]="statusDotClass()"></span>
        {{ statusLabel() }}
      </span>

      <!-- ── Name + description popover ── -->
      @if (popoverOpen()) {
        <div
          class="absolute left-0 top-[calc(100%+10px)] z-50 w-[380px] flex flex-col gap-2
                 rounded-xl border border-white/10 bg-[#1a2742]
                 p-4 shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
        >
          <p class="m-0 text-[12px] text-white/35">
            Edita el nombre e información del campeonato
          </p>

          <label class="text-[10.5px] font-semibold uppercase tracking-[.06em] text-white/45">
            Nombre <span class="text-red-400">*</span>
          </label>
          <input
            #nameInput
            class="w-full rounded-lg border border-white/10 bg-white/6 px-3 py-2
                   text-[15px] font-semibold text-white outline-none placeholder:text-white/20
                   focus:border-blue-500/50 transition-colors"
            [(ngModel)]="nameTemp"
            placeholder="Ej: Liga Premier 2024"
            maxlength="100"
            (keydown.enter)="applyPopover()"
            (keydown.escape)="closePopover()"
          />

          <label class="text-[10.5px] font-semibold uppercase tracking-[.06em] text-white/45">
            Descripción
            <span class="ml-1 normal-case text-[10px] font-normal text-white/30">(opcional)</span>
          </label>
          <textarea
            class="w-full resize-y rounded-lg border border-white/10 bg-white/6 px-3 py-2
                   text-[14px] text-white outline-none placeholder:text-white/20
                   focus:border-blue-500/50 transition-colors"
            [(ngModel)]="descriptionTemp"
            placeholder="Describe brevemente el campeonato..."
            rows="3"
            (keydown.escape)="closePopover()"
          ></textarea>

          <div class="flex justify-end gap-2 mt-1">
            <button
              class="rounded-md bg-white/7 px-4 py-1.5 text-[13px] font-medium
                     text-white/65 transition-colors hover:bg-white/12"
              (click)="closePopover()" type="button"
            >Cancelar</button>
            <button
              class="rounded-md bg-blue-500 px-4 py-1.5 text-[13px] font-medium text-white
                     transition-colors hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
              [disabled]="!nameTemp.trim()"
              (click)="applyPopover()" type="button"
            >Aplicar</button>
          </div>
        </div>
      }
    </div>

    <!-- Row 1.5 — Social links compactos (debajo del titulo) -->
    <div class="flex flex-wrap items-center gap-1.5">
      @for (link of socialLinksView(); track link.socialNetworkId) {
        <div class="relative">
          <a
            [href]="link.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex size-8 items-center justify-center rounded-lg border text-white no-underline
                   transition-transform duration-150 hover:scale-[1.03]"
            [style.background]="link.brandBg"
            [style.border-color]="link.brandBorder"
            [matTooltip]="link.name"
            [attr.aria-label]="'Abrir ' + link.name"
          >
            <mat-icon class="!size-[16px] !text-[16px]">{{ link.icon }}</mat-icon>
          </a>

          @if (editable()) {
            <button
              type="button"
              class="absolute -top-1 -right-1 inline-flex size-3.5 items-center justify-center
                     rounded-full border border-white/30 bg-[#0f1d35] text-white/80 hover:text-white"
              (click)="startEditSocialLink(link)"
              aria-label="Editar red social"
            >
              <mat-icon class="!size-[9px] !text-[9px]">edit</mat-icon>
            </button>
            <button
              type="button"
              class="absolute -bottom-1 -right-1 inline-flex size-3.5 items-center justify-center
                     rounded-full border border-red-300/45 bg-[#2b1520] text-red-200 hover:bg-red-500/20"
              (click)="removeSocialLink(link.socialNetworkId)"
              aria-label="Eliminar red social"
            >
              <mat-icon class="!size-[9px] !text-[9px]">close</mat-icon>
            </button>
          }
        </div>
      }

      @if (editable()) {
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-lg border border-dashed border-white/40
                 bg-transparent text-white/75 transition-colors hover:bg-white/8 hover:text-white
                 disabled:opacity-35 disabled:cursor-not-allowed"
          [disabled]="availableNetworkOptions().length === 0"
          (click)="startAddSocialLink()"
          matTooltip="Agregar red social"
          aria-label="Agregar red social"
        >
          <mat-icon class="!size-[16px] !text-[16px]">add</mat-icon>
        </button>
      }
    </div>

    @if (editable() && socialEditorOpen()) {
      <div class="rounded-lg border border-blue-400/25 bg-blue-500/10 p-2">
        <div class="flex flex-wrap items-center gap-1.5">
          @for (opt of editorNetworkOptions(); track opt.id) {
            <button
              type="button"
              class="inline-flex size-8 items-center justify-center rounded-lg border text-white transition-colors"
              [style.background]="opt.id === socialNetworkDraft ? opt.brandBg : '#0f1d35'"
              [style.border-color]="opt.id === socialNetworkDraft ? opt.brandBorder : 'rgba(255,255,255,0.2)'"
              [style.opacity]="opt.id === socialNetworkDraft ? '1' : '0.75'"
              (click)="socialNetworkDraft = opt.id"
              [matTooltip]="opt.name"
              [attr.aria-label]="'Seleccionar ' + opt.name"
            >
              <mat-icon class="!size-[16px] !text-[16px]">{{ opt.icon }}</mat-icon>
            </button>
          }
        </div>

        <label class="mt-2 flex flex-col gap-1">
          <span class="text-[11px] font-semibold uppercase tracking-[.05em] text-blue-200/85">URL</span>
          <input
            class="rounded-md border border-white/20 bg-[#0f1d35] px-2 py-1.5 text-[12.5px] text-white
                   outline-none placeholder:text-white/30 focus:border-blue-300"
            [(ngModel)]="socialUrlDraft"
            [placeholder]="socialUrlPlaceholder()"
            inputmode="url"
            autocomplete="off"
          />
        </label>

        @if (socialEditorError()) {
          <p class="m-0 mt-1 text-[11.5px] text-red-200">{{ socialEditorError() }}</p>
        }

        <div class="mt-2 flex items-center justify-end gap-1.5">
          <button
            type="button"
            class="rounded-md border border-white/16 bg-white/7 px-2.5 py-1.5 text-[12px] text-white/75
                   transition-colors hover:bg-white/12"
            (click)="cancelSocialEditor()"
          >Cancelar</button>
          <button
            type="button"
            class="rounded-md bg-blue-500 px-2.5 py-1.5 text-[12px] font-semibold text-white
                   transition-colors hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
            [disabled]="!canSaveSocialDraft()"
            (click)="saveSocialDraft()"
          >Guardar</button>
        </div>
      </div>
    }

    <!-- Row 2 — Sport · Season -->
    <div class="flex items-center gap-2 text-[14px] text-white/55">
      @if (editable()) {

        <!-- Sport custom dropdown -->
        <div class="relative" #sportWrap>
          <button
            class="inline-flex items-center gap-1.5 rounded-md border border-transparent
                   bg-transparent px-2 py-1 font-medium text-white/70
                   transition-colors hover:border-white/12 hover:bg-white/7 hover:text-white"
            type="button"
            (click)="sportDropOpen.set(!sportDropOpen())"
          >
            <mat-icon class="!size-4 !text-[16px] text-white/40">{{ currentSportIcon() }}</mat-icon>
            {{ currentSportLabel() }}
            <mat-icon
              class="!size-4 !text-[16px] text-white/35 transition-transform"
              [class.rotate-180]="sportDropOpen()"
            >expand_more</mat-icon>
          </button>

          @if (sportDropOpen()) {
            <div
              class="absolute left-0 top-[calc(100%+6px)] z-50 min-w-[200px]
                     rounded-xl border border-white/10 bg-[#1a2742]
                     p-1 shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
            >
              @for (s of sports(); track s.id) {
                <button
                  class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2
                         text-[13px] text-white/65 transition-colors
                         hover:bg-white/7 hover:text-white"
                  [class.bg-blue-500/12]="data().sportId === s.id"
                  [class.text-blue-300]="data().sportId === s.id"
                  [class.font-medium]="data().sportId === s.id"
                  type="button"
                  (click)="selectSport(s)"
                >
                  <mat-icon class="!size-4 !text-[16px] text-white/35"
                            [class.text-blue-400]="data().sportId === s.id">{{ s.icon }}</mat-icon>
                  {{ s.label }}
                  @if (data().sportId === s.id) {
                    <mat-icon class="ml-auto !size-3.5 !text-[14px] text-blue-400">check</mat-icon>
                  }
                </button>
              }
            </div>
          }
        </div>

        <span class="text-white/22">·</span>

        <span class="text-white/40">Temporada&nbsp;
          <input
            class="w-20 bg-transparent border-b border-dashed border-white/25 px-0.5
                   text-[14px] text-white/70 outline-none
                   focus:border-white/60 focus:text-white placeholder:text-white/18"
            [(ngModel)]="seasonModel"
            placeholder="2024-2025"
            maxlength="20"
          />
        </span>

      } @else {
        <span>{{ currentSportLabel() }} · Temporada {{ data().season }}</span>
      }
    </div>

    <!-- Row 3 — Meta chips -->
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/50">

      <!-- Teams -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon class="!size-3.5 !text-[14px] text-white/28">group</mat-icon>
        @if (editingTeams()) {
          <input
            #teamsInput
            class="w-10 bg-transparent border-b border-dashed border-white/28 text-[13px]
                   text-white/70 outline-none focus:border-white/55"
            type="number" min="2" max="256"
            [(ngModel)]="teamsModel"
            (blur)="editingTeams.set(false)"
            (keydown.enter)="editingTeams.set(false)"
            (keydown.escape)="editingTeams.set(false)"
          />
          <span class="text-white/35">equipos máx.</span>
        } @else {
          <span
            [class.cursor-pointer]="editable()"
            [class.border-b]="editable()"
            [class.border-dashed]="editable()"
            [class.border-white/18]="editable()"
            [class.hover:text-white/85]="editable()"
            [class.hover:border-white/45]="editable()"
            (click)="editable() && startEditTeams()"
          >
            {{ data().currentTeams }}/{{ data().maxTeams }} equipos
          </span>
        }
      </div>

      <!-- Max players per team -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon class="!size-3.5 !text-[14px] text-white/28">person</mat-icon>
        @if (editingPlayers()) {
          <input
            #playersInput
            class="w-10 bg-transparent border-b border-dashed border-white/28 text-[13px]
                   text-white/70 outline-none focus:border-white/55"
            type="number" min="1" max="100"
            [(ngModel)]="playersModel"
            (blur)="editingPlayers.set(false)"
            (keydown.enter)="editingPlayers.set(false)"
            (keydown.escape)="editingPlayers.set(false)"
          />
          <span class="text-white/35">jugadores máx. por equipo</span>
        } @else {
          <span
            [class.cursor-pointer]="editable()"
            [class.border-b]="editable()"
            [class.border-dashed]="editable()"
            [class.border-white/18]="editable()"
            [class.hover:text-white/85]="editable()"
            [class.hover:border-white/45]="editable()"
            (click)="editable() && startEditPlayers()"
          >
            {{ data().maxPlayersPerTeam }} jugadores máx. por equipo
          </span>
        }
      </div>

      <!-- Location -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon class="!size-3.5 !text-[14px] text-white/28">location_on</mat-icon>
        @if (editingLocation()) {
          <input
            #locationInput
            class="w-36 bg-transparent border-b border-dashed border-white/28 text-[13px]
                   text-white/70 outline-none focus:border-white/55"
            [(ngModel)]="locationModel"
            placeholder="Ciudad, País"
            (blur)="editingLocation.set(false)"
            (keydown.enter)="editingLocation.set(false)"
            (keydown.escape)="editingLocation.set(false)"
          />
        } @else {
          <span
            [class.cursor-pointer]="editable()"
            [class.border-b]="editable()"
            [class.border-dashed]="editable()"
            [class.border-white/18]="editable() && data().location"
            [class.text-white/22]="!data().location"
            [class.hover:text-white/85]="editable()"
            (click)="editable() && startEditLocation()"
          >{{ data().location || 'Ciudad, País' }}</span>
        }
      </div>

      <!-- Dates -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon class="!size-3.5 !text-[14px] text-white/28">calendar_today</mat-icon>
        @if (editable()) {
          <input
            class="bg-transparent border-b border-dashed border-white/22 text-[13px]
                   text-white/65 outline-none focus:border-white/55 [color-scheme:dark] w-30"
            type="date" [(ngModel)]="startDateModel" title="Fecha inicio"
          />
          <span class="text-white/28 mx-0.5">→</span>
          <input
            class="bg-transparent border-b border-dashed border-white/22 text-[13px]
                   text-white/65 outline-none focus:border-white/55 [color-scheme:dark] w-30"
            type="date" [(ngModel)]="endDateModel" title="Fecha fin"
          />
        } @else {
          <span>{{ dateRangeLabel() }}</span>
        }
      </div>

      <!-- Registration dates -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon
          class="!size-3.5 !text-[14px]"
          [class.text-green-400]="registrationStatus() === 'open'"
          [class.text-amber-300]="registrationStatus() === 'upcoming'"
          [class.text-white/28]="registrationStatus() === 'closed' || registrationStatus() === 'none'"
        >how_to_reg</mat-icon>
        @if (editable()) {
          <input
            class="bg-transparent border-b border-dashed border-white/22 text-[13px]
                   text-white/65 outline-none focus:border-white/55 [color-scheme:dark] w-30"
            type="date" [(ngModel)]="regStartModel" title="Inicio inscripciones"
            aria-label="Inicio de inscripciones"
          />
          <span class="text-white/28 mx-0.5">→</span>
          <input
            class="bg-transparent border-b border-dashed border-white/22 text-[13px]
                   text-white/65 outline-none focus:border-white/55 [color-scheme:dark] w-30"
            type="date" [(ngModel)]="regEndModel" title="Fin inscripciones"
            aria-label="Fin de inscripciones"
          />
        } @else {
          <span
            [class.text-green-400]="registrationStatus() === 'open'"
            [class.text-amber-300]="registrationStatus() === 'upcoming'"
            [class.text-white/35]="registrationStatus() === 'closed' || registrationStatus() === 'none'"
          >{{ regLabel() }}</span>
        }
      </div>

      <!-- Phase count -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon class="!size-3.5 !text-[14px] text-white/28">layers</mat-icon>
        <span>{{ data().phaseCount }} fases</span>
      </div>

    </div>
  </div>
</header>
  `,
})
export class ChampionshipHeaderComponent {

  // ── Inputs ────────────────────────────────────────────────────
  readonly data = input.required<ChampionshipHeaderData>();
  readonly sports = input<SportOption[]>([]);
  readonly editable = input(false);

  // ── Outputs ───────────────────────────────────────────────────
  readonly dataChange = output<Partial<ChampionshipHeaderData>>();
  readonly logoSelected = output<File>();

  // ── Template refs ─────────────────────────────────────────────
  private fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  private nameContainerRef = viewChild<ElementRef<HTMLElement>>('nameContainer');
  private sportWrapRef = viewChild<ElementRef<HTMLElement>>('sportWrap');
  private nameInputRef = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  private teamsInputRef = viewChild<ElementRef<HTMLInputElement>>('teamsInput');
  private playersInputRef = viewChild<ElementRef<HTMLInputElement>>('playersInput');
  private locationInputRef = viewChild<ElementRef<HTMLInputElement>>('locationInput');

  // ── UI state ──────────────────────────────────────────────────
  popoverOpen = signal(false);
  sportDropOpen = signal(false);
  editingTeams = signal(false);
  editingPlayers = signal(false);
  editingLocation = signal(false);
  logoPreview = signal<string | null>(null);
  socialEditorOpen = signal(false);
  socialEditorError = signal('');
  socialEditingNetworkId = signal<number | null>(null);
  socialNetworkDraft = 1;
  socialUrlDraft = '';

  // ── Editable field mirrors (ngModel) ──────────────────────────
  // Initialized from data() on first render; changes emitted via dataChange output
  nameTemp = '';
  descriptionTemp = '';

  get seasonModel(): string { return this.data().season; }
  set seasonModel(v) { this.dataChange.emit({ season: v }); }

  get teamsModel(): number { return this.data().maxTeams; }
  set teamsModel(v) { this.dataChange.emit({ maxTeams: +v }); }

  get playersModel(): number { return this.data().maxPlayersPerTeam; }
  set playersModel(v) { this.dataChange.emit({ maxPlayersPerTeam: +v }); }

  get locationModel(): string { return this.data().location; }
  set locationModel(v) { this.dataChange.emit({ location: v }); }

  get startDateModel(): string { return this.data().startDate; }
  set startDateModel(v) { this.dataChange.emit({ startDate: v }); }

  get endDateModel(): string { return this.data().endDate; }
  set endDateModel(v) { this.dataChange.emit({ endDate: v }); }

  get regStartModel(): string { return this.data().registrationStartDate; }
  set regStartModel(v: string) { this.dataChange.emit({ registrationStartDate: v }); }

  get regEndModel(): string { return this.data().registrationEndDate; }
  set regEndModel(v: string) { this.dataChange.emit({ registrationEndDate: v }); }

  // ── Computed ──────────────────────────────────────────────────
  registrationStatus = computed((): 'open' | 'upcoming' | 'closed' | 'none' => {
    const { registrationStartDate: start, registrationEndDate: end } = this.data();
    if (!start && !end) return 'none';
    const now = Date.now();
    const s = start ? new Date(start + 'T00:00:00').getTime() : null;
    const e = end ? new Date(end + 'T23:59:59').getTime() : null;
    if (s && now < s) return 'upcoming';
    if (e && now > e) return 'closed';
    return 'open';
  });

  regLabel = computed(() => {
    const { registrationStartDate: start, registrationEndDate: end } = this.data();
    if (!start && !end) return 'Inscripciones no configuradas';
    const fmt = (iso: string) =>
      new Date(iso + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    if (start && end) return `Inscr. ${fmt(start)} → ${fmt(end)}`;
    if (start) return `Inscr. desde ${fmt(start)}`;
    return `Inscr. hasta ${fmt(end!)}`;
  });

  currentSportLabel = computed(() =>
    this.sports().find(s => s.id === this.data().sportId)?.label ?? 'Deporte'
  );
  currentSportIcon = computed(() =>
    this.sports().find(s => s.id === this.data().sportId)?.icon ?? 'sports'
  );
  socialLinksView = computed(() => {
    return this.data().socialLinks.map(link => {
      const meta = SOCIAL_NETWORK_OPTIONS.find(opt => opt.id === link.socialNetworkId);
      return {
        ...link,
        name: link.name ?? meta?.name ?? `Red ${link.socialNetworkId}`,
        icon: link.icon ?? meta?.icon ?? 'link',
        brandBg: meta?.brandBg ?? '#0f1d35',
        brandBorder: meta?.brandBorder ?? 'rgba(255,255,255,0.25)',
      };
    });
  });
  availableNetworkOptions = computed(() => {
    const used = new Set(this.data().socialLinks.map(link => link.socialNetworkId));
    return SOCIAL_NETWORK_OPTIONS.filter(opt => !used.has(opt.id));
  });
  editorNetworkOptions = computed(() => {
    const editing = this.socialEditingNetworkId();
    const used = new Set(this.data().socialLinks
      .filter(link => link.socialNetworkId !== editing)
      .map(link => link.socialNetworkId));
    return SOCIAL_NETWORK_OPTIONS.filter(opt => !used.has(opt.id));
  });
  socialUrlPlaceholder = computed(() => {
    const meta = SOCIAL_NETWORK_OPTIONS.find(opt => opt.id === this.socialNetworkDraft);
    return meta?.placeholder ?? 'https://...';
  });
  statusLabel() { return STATUS_META[this.data().status].label; }
  statusDotClass() { return STATUS_META[this.data().status].dot; }
  statusPillClass() { return STATUS_META[this.data().status].pill; }

  // ── Click outside ──────────────────────────────────────────────
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const t = e.target as Node;
    if (this.popoverOpen()) {
      const c = this.nameContainerRef()?.nativeElement;
      if (c && !c.contains(t)) this.closePopover();
    }
    if (this.sportDropOpen()) {
      const w = this.sportWrapRef()?.nativeElement;
      if (w && !w.contains(t)) this.sportDropOpen.set(false);
    }
  }

  // ── Logo ──────────────────────────────────────────────────────
  triggerLogoUpload(): void {
    this.fileInputRef()?.nativeElement.click();
  }

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => this.logoPreview.set(e.target?.result as string);
    reader.readAsDataURL(file);
    this.logoSelected.emit(file);
    (event.target as HTMLInputElement).value = '';
  }

  // ── Name popover ──────────────────────────────────────────────
  openPopover(): void {
    this.nameTemp = this.data().name;
    this.descriptionTemp = this.data().description;
    this.popoverOpen.set(true);
    setTimeout(() => this.nameInputRef()?.nativeElement.focus());
  }

  closePopover(): void { this.popoverOpen.set(false); }

  applyPopover(): void {
    const name = this.nameTemp.trim();
    if (!name) return;
    this.dataChange.emit({ name, description: this.descriptionTemp.trim() });
    this.closePopover();
  }

  // ── Sport dropdown ─────────────────────────────────────────────
  selectSport(sport: SportOption): void {
    this.dataChange.emit({ sportId: sport.id });
    this.sportDropOpen.set(false);
  }

  // ── Inline editing ─────────────────────────────────────────────
  startEditTeams(): void {
    this.editingTeams.set(true);
    setTimeout(() => { const el = this.teamsInputRef()?.nativeElement; el?.focus(); el?.select(); });
  }

  startEditPlayers(): void {
    this.editingPlayers.set(true);
    setTimeout(() => { const el = this.playersInputRef()?.nativeElement; el?.focus(); el?.select(); });
  }

  startEditLocation(): void {
    this.editingLocation.set(true);
    setTimeout(() => this.locationInputRef()?.nativeElement.focus());
  }

  // ── Social links ───────────────────────────────────────────────
  startAddSocialLink(): void {
    const options = this.availableNetworkOptions();
    if (options.length === 0) {
      this.socialEditorError.set('Ya agregaste todas las redes disponibles.');
      return;
    }
    this.socialEditingNetworkId.set(null);
    this.socialNetworkDraft = options[0].id;
    this.socialUrlDraft = '';
    this.socialEditorError.set('');
    this.socialEditorOpen.set(true);
  }

  startEditSocialLink(link: ChampionshipHeaderSocialLink): void {
    this.socialEditingNetworkId.set(link.socialNetworkId);
    this.socialNetworkDraft = link.socialNetworkId;
    this.socialUrlDraft = link.link;
    this.socialEditorError.set('');
    this.socialEditorOpen.set(true);
  }

  cancelSocialEditor(): void {
    this.socialEditorOpen.set(false);
    this.socialEditorError.set('');
    this.socialEditingNetworkId.set(null);
    this.socialUrlDraft = '';
  }

  removeSocialLink(socialNetworkId: number): void {
    const next = this.data().socialLinks.filter(link => link.socialNetworkId !== socialNetworkId);
    this.dataChange.emit({ socialLinks: next });
  }

  canSaveSocialDraft(): boolean {
    const url = this.socialUrlDraft.trim();
    if (!this.isValidHttpsUrl(url)) return false;
    const exists = this.data().socialLinks.some(link =>
      link.socialNetworkId === this.socialNetworkDraft &&
      link.socialNetworkId !== this.socialEditingNetworkId()
    );
    return !exists;
  }

  saveSocialDraft(): void {
    const url = this.socialUrlDraft.trim();
    if (!this.isValidHttpsUrl(url)) {
      this.socialEditorError.set('La URL debe ser valida y comenzar con https://');
      return;
    }

    const duplicated = this.data().socialLinks.some(link =>
      link.socialNetworkId === this.socialNetworkDraft &&
      link.socialNetworkId !== this.socialEditingNetworkId()
    );
    if (duplicated) {
      this.socialEditorError.set('Solo se permite una red por tipo.');
      return;
    }

    const meta = SOCIAL_NETWORK_OPTIONS.find(opt => opt.id === this.socialNetworkDraft);
    const next = [...this.data().socialLinks];
    const idx = next.findIndex(link => link.socialNetworkId === this.socialEditingNetworkId());
    const payload: ChampionshipHeaderSocialLink = {
      socialNetworkId: this.socialNetworkDraft,
      link: url,
      name: meta?.name,
      icon: meta?.icon,
    };

    if (idx >= 0) {
      const existing = next[idx];
      next[idx] = { ...existing, ...payload };
    } else {
      next.push({ ...payload, id: Date.now() });
    }

    this.dataChange.emit({ socialLinks: next });
    this.cancelSocialEditor();
  }

  private isValidHttpsUrl(value: string): boolean {
    try {
      const parsed = new URL(value);
      return parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  // ── Date range label ───────────────────────────────────────────
  dateRangeLabel(): string {
    const { startDate, endDate } = this.data();
    if (!startDate && !endDate) return 'Fechas no definidas';
    const fmt = (iso: string, yr: boolean) =>
      new Date(iso + 'T00:00:00').toLocaleDateString('es-ES',
        { day: 'numeric', month: 'short', ...(yr ? { year: 'numeric' } : {}) });
    const s = startDate ? fmt(startDate, false) : '?';
    const e = endDate ? fmt(endDate, true) : '?';
    return `${s} → ${e}`;
  }
}