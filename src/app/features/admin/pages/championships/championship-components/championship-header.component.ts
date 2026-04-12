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
  output,
  signal,
  viewChild,
  computed,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// ─── Types ───────────────────────────────────────────────────

export type ChampionshipHeaderStatus = 0 | 1 | 2 | 3 | 4 | 'draft' | 'registration' | 'active' | 'finished' | 'cancelled';

export interface SportOption {
  id: number;
  label: string;
  icon: string;
}

export interface SocialNetworkOption {
  id: number;
  name: string;
  icon?: string | null;
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

const STATUS_META: Record<'draft' | 'registration' | 'active' | 'finished' | 'cancelled', { label: string; dot: string; pill: string }> = {
  draft: { label: 'Borrador', dot: 'bg-slate-400', pill: 'bg-slate-500/20  text-slate-300   ring-slate-500/30' },
  registration: { label: 'Inscripciones', dot: 'bg-blue-400', pill: 'bg-blue-500/20   text-blue-300    ring-blue-500/30' },
  active: { label: 'Activo', dot: 'bg-green-400', pill: 'bg-green-500/20  text-green-300   ring-green-500/30' },
  finished: { label: 'Finalizado', dot: 'bg-slate-500', pill: 'bg-slate-500/20  text-slate-400   ring-slate-500/30' },
  cancelled: { label: 'Cancelado', dot: 'bg-red-400', pill: 'bg-red-500/20    text-red-300     ring-red-500/30' },
};

const STATUS_BY_VALUE: Record<string, keyof typeof STATUS_META> = {
  '0': 'draft',
  '1': 'registration',
  '2': 'active',
  '3': 'finished',
  '4': 'cancelled',
  draft: 'draft',
  registration: 'registration',
  active: 'active',
  finished: 'finished',
  cancelled: 'cancelled',
};

const SOCIAL_BRAND_PALETTE = [
  { bg: '#1d4ed8', border: '#3b82f6' },
  { bg: '#be185d', border: '#ec4899' },
  { bg: '#0f766e', border: '#14b8a6' },
  { bg: '#7c2d12', border: '#ea580c' },
  { bg: '#3f3f46', border: '#71717a' },
];

type ResolvedSocialNetworkOption = {
  id: number;
  name: string;
  icon: string;
  placeholder: string;
  brandBg: string;
  brandBorder: string;
};

// ─────────────────────────────────────────────────────────────
// Social link dialog
// ─────────────────────────────────────────────────────────────

interface SocialLinkDialogData {
  networkOptions: ResolvedSocialNetworkOption[];
  editingNetworkId: number | null;
  initialUrl: string;
}

export interface SocialLinkDialogResult {
  socialNetworkId: number;
  link: string;
}

@Component({
  selector: 'app-social-link-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  styles: `
    .social-link-dialog-field {
      --mdc-outlined-text-field-outline-color: rgba(99,139,246,0.25);
      --mdc-outlined-text-field-hover-outline-color: rgba(99,139,246,0.45);
      --mdc-outlined-text-field-focus-outline-color: rgba(99,139,246,0.7);
      --mdc-outlined-text-field-input-text-color: rgba(255,255,255,0.88);
      --mdc-outlined-text-field-label-text-color: rgba(147,197,253,0.7);
      --mdc-outlined-text-field-focus-label-text-color: rgba(147,197,253,0.9);
      --mdc-outlined-text-field-container-shape: 6px;
      --mat-form-field-container-text-size: 13px;
    }
    .social-link-dialog-field .mat-mdc-text-field-wrapper {
      background: rgba(15,29,53,0.8) !important;
    }
  `,
  template: `
    <h2 mat-dialog-title>{{ data.editingNetworkId ? 'Editar' : 'Agregar' }} red social</h2>

    <mat-dialog-content>
      <p class="mat-body-2" style="opacity:.55; margin-bottom: 12px;">
        Selecciona la plataforma e ingresa la URL completa.
      </p>

      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px;">
        @for (opt of data.networkOptions; track opt.id) {
          <button
            type="button"
            style="display:inline-flex; align-items:center; justify-content:center;
                   width:34px; height:34px; border-radius:8px; border-width:1px;
                   border-style:solid; color:white; cursor:pointer; transition:opacity .15s;"
            [style.background]="selectedNetworkId() === opt.id ? opt.brandBg : '#1a2742'"
            [style.border-color]="selectedNetworkId() === opt.id ? opt.brandBorder : 'rgba(255,255,255,0.18)'"
            [style.opacity]="selectedNetworkId() === opt.id ? '1' : '0.6'"
            (click)="selectNetwork(opt.id)"
            [matTooltip]="opt.name"
            [attr.aria-label]="'Seleccionar ' + opt.name"
          >
            <mat-icon style="font-size:16px; width:16px; height:16px;">{{ opt.icon }}</mat-icon>
          </button>
        }
      </div>

      <mat-form-field appearance="outline" class="social-link-dialog-field" style="width:100%;">
        <mat-label>URL</mat-label>
        <input matInput
          [(ngModel)]="urlDraft"
          [placeholder]="urlPlaceholder()"
          inputmode="url"
          autocomplete="off"
        />
        @if (urlError()) {
          <mat-error>{{ urlError() }}</mat-error>
        }
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button matButton mat-dialog-close type="button">Cancelar</button>
      <button matButton="filled" type="button"
        [disabled]="!canSave()"
        (click)="save()"
      >Guardar</button>
    </mat-dialog-actions>
  `,
})
export class SocialLinkDialogComponent {
  readonly data = inject<SocialLinkDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<SocialLinkDialogComponent>);

  selectedNetworkId = signal(this.data.editingNetworkId ?? this.data.networkOptions[0]?.id ?? 1);
  urlDraft = this.data.initialUrl;
  urlError = signal('');

  urlPlaceholder = computed(() =>
    this.data.networkOptions.find(o => o.id === this.selectedNetworkId())?.placeholder ?? 'https://'
  );

  selectNetwork(id: number): void {
    this.selectedNetworkId.set(id);
    this.urlError.set('');
  }

  canSave(): boolean {
    try {
      return new URL(this.urlDraft.trim()).protocol === 'https:';
    } catch {
      return false;
    }
  }

  save(): void {
    const url = this.urlDraft.trim();
    try {
      if (new URL(url).protocol !== 'https:') throw new Error();
    } catch {
      this.urlError.set('La URL debe ser válida y comenzar con https://');
      return;
    }
    this.dialogRef.close({ socialNetworkId: this.selectedNetworkId(), link: url } satisfies SocialLinkDialogResult);
  }
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

const DDMMYYYY_FORMATS = {
  parse: { dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' } },
  display: {
    dateInput: { day: '2-digit', month: '2-digit', year: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@Component({
  selector: 'app-championship-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    { provide: MAT_DATE_FORMATS, useValue: DDMMYYYY_FORMATS },
  ],
  imports: [
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  styles: `
    /* ── Inline date chip trigger ── */
    :host .date-chip {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: transparent;
      border: none;
      border-bottom: 1px dashed rgba(255,255,255,0.25);
      color: rgba(255,255,255,0.65);
      font-size: 13px;
      font-family: inherit;
      padding: 2px 0 2px;
      cursor: pointer;
      transition: color 0.15s, border-color 0.15s;
    }
    :host .date-chip:hover {
      color: rgba(255,255,255,0.9);
      border-bottom-color: rgba(255,255,255,0.5);
    }
    :host .date-chip-icon {
      font-size: 13px !important;
      width: 13px !important;
      height: 13px !important;
      color: rgba(255,255,255,0.3);
    }

    /* ── Hidden mat-form-field that owns the datepicker input ── */
    :host .date-field-hidden {
      position: absolute !important;
      width: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
      visibility: hidden !important;
      pointer-events: none !important;
      opacity: 0 !important;
    }

    /* ── Popover mat-form-field — dark theme ── */
    :host .popover-field {
      --mdc-outlined-text-field-outline-color: rgba(255,255,255,0.12);
      --mdc-outlined-text-field-hover-outline-color: rgba(255,255,255,0.28);
      --mdc-outlined-text-field-focus-outline-color: rgba(99,139,246,0.7);
      --mdc-outlined-text-field-input-text-color: rgba(255,255,255,0.88);
      --mdc-outlined-text-field-label-text-color: rgba(255,255,255,0.4);
      --mdc-outlined-text-field-focus-label-text-color: rgba(255,255,255,0.6);
      --mdc-outlined-text-field-container-shape: 8px;
      --mat-form-field-container-text-size: 14px;
    }
    :host .popover-field .mat-mdc-text-field-wrapper {
      background: rgba(255,255,255,0.05) !important;
    }

    /* ── Social editor mat-form-field — dark theme ── */
    :host .social-field {
      --mdc-outlined-text-field-outline-color: rgba(99,139,246,0.25);
      --mdc-outlined-text-field-hover-outline-color: rgba(99,139,246,0.45);
      --mdc-outlined-text-field-focus-outline-color: rgba(99,139,246,0.7);
      --mdc-outlined-text-field-input-text-color: rgba(255,255,255,0.88);
      --mdc-outlined-text-field-label-text-color: rgba(147,197,253,0.7);
      --mdc-outlined-text-field-focus-label-text-color: rgba(147,197,253,0.9);
      --mdc-outlined-text-field-container-shape: 6px;
      --mat-form-field-container-text-size: 12.5px;
    }
    :host .social-field .mat-mdc-text-field-wrapper {
      background: rgba(15,29,53,0.8) !important;
    }
  `,
  template: `
<!-- ══ HEADER ════════════════════════════════════════════════ -->
<header
  class="relative flex gap-5 items-start px-7 pt-6 pb-5"
  style="background: radial-gradient(ellipse 55% 90% at 90% 10%, color-mix(in srgb, var(--mat-sys-primary) 20%, transparent) 0%, transparent 72%), linear-gradient(165deg, color-mix(in srgb, var(--mat-sys-surface-container-highest) 82%, black) 0%, color-mix(in srgb, var(--mat-sys-surface-container-high) 74%, black) 52%, color-mix(in srgb, var(--mat-sys-surface-container) 78%, black) 100%);"
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

          <mat-form-field appearance="outline" class="popover-field w-full">
            <mat-label>Nombre *</mat-label>
            <input matInput #nameInput
              [(ngModel)]="nameTemp"
              placeholder="Ej: Liga Premier 2024"
              maxlength="100"
              (keydown.enter)="applyPopover()"
              (keydown.escape)="closePopover()"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="popover-field w-full">
            <mat-label>Descripción (opcional)</mat-label>
            <textarea matInput
              [(ngModel)]="descriptionTemp"
              placeholder="Describe brevemente el campeonato..."
              rows="3"
              (keydown.escape)="closePopover()"
            ></textarea>
          </mat-form-field>

          <div class="flex justify-end gap-2 mt-1">
            <button matButton (click)="closePopover()" type="button"
            >Cancelar</button>
            <button matButton="filled"
              [disabled]="!nameTemp.trim()"
              (click)="applyPopover()" type="button"
            >Aplicar</button>
          </div>
        </div>
      }
    </div>

    <!-- Row 1.5 — Social links compactos (debajo del titulo) -->
    <div class="flex flex-wrap items-center gap-2">
      @for (link of socialLinksView(); track link.socialNetworkId) {
        <div class="relative pr-3">
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
            <div class="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              <button
                type="button"
                class="size-4.5 rounded-md border border-white/30 bg-black/35 text-white/90
                       flex items-center justify-center transition-colors hover:bg-black/55 hover:text-white"
                (click)="startEditSocialLink(link)"
                matTooltip="Editar enlace"
                aria-label="Editar red social"
              >
                <mat-icon class="!size-[10px] !text-[10px]">edit</mat-icon>
              </button>
              <button
                type="button"
                class="size-4.5 rounded-md border border-red-300/70 bg-red-500/25 text-red-100
                       flex items-center justify-center transition-colors hover:bg-red-500/45 hover:text-white"
                (click)="removeSocialLink(link.socialNetworkId)"
                matTooltip="Eliminar enlace"
                aria-label="Eliminar red social"
              >
                <mat-icon class="!size-[10px] !text-[10px]">close</mat-icon>
              </button>
            </div>
          }
        </div>
      }

      @if (editable()) {
        <button
          matButton="outlined"
          type="button"
          class="!size-8 !min-w-0 !p-0 border-dashed border-white/40 text-white/75"
          [disabled]="availableNetworkOptions().length === 0"
          (click)="startAddSocialLink()"
          matTooltip="Agregar red social"
          aria-label="Agregar red social"
        >
          <mat-icon class="!size-[16px] !text-[16px]">add</mat-icon>
        </button>
      }
    </div>



    <!-- Row 2 — Sport · Season -->
    <div class="flex items-center gap-2 text-[14px] text-white/55">
      @if (editable()) {

        <!-- Sport mat-menu dropdown -->
        <button
          matButton
          type="button"
          class="!text-white/70 !font-medium"
          [matMenuTriggerFor]="sportMenu"
        >
          <mat-icon class="!size-4 !text-[16px] text-white/40">{{ currentSportIcon() }}</mat-icon>
          {{ currentSportLabel() }}
          <mat-icon class="!size-4 !text-[16px] text-white/35">expand_more</mat-icon>
        </button>

        <mat-menu #sportMenu="matMenu">
          @for (s of sports(); track s.id) {
            <button mat-menu-item type="button" (click)="selectSport(s)">
              <mat-icon>{{ s.icon }}</mat-icon>
              {{ s.label }}
              @if (data().sportId === s.id) {
                <mat-icon class="ml-auto !size-3.5 !text-[14px]">check</mat-icon>
              }
            </button>
          }
        </mat-menu>

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
          <button type="button" class="date-chip" (click)="startPicker.open()" aria-label="Fecha de inicio">
            {{ formatDate(startDateValue()) }}
            <mat-icon class="date-chip-icon">expand_more</mat-icon>
          </button>
          <mat-form-field class="date-field-hidden">
            <input matInput [matDatepicker]="startPicker" [value]="startDateValue()"
                   (dateChange)="onStartDateChange($event.value)" />
            <mat-datepicker #startPicker />
          </mat-form-field>

          <span class="text-white/22 mx-0.5">→</span>

          <button type="button" class="date-chip" (click)="endPicker.open()" aria-label="Fecha de fin">
            {{ formatDate(endDateValue()) }}
            <mat-icon class="date-chip-icon">expand_more</mat-icon>
          </button>
          <mat-form-field class="date-field-hidden">
            <input matInput [matDatepicker]="endPicker" [value]="endDateValue()"
                   (dateChange)="onEndDateChange($event.value)" />
            <mat-datepicker #endPicker />
          </mat-form-field>
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
          <button type="button" class="date-chip" (click)="regStartPicker.open()" aria-label="Inicio inscripciones">
            {{ formatDate(regStartValue()) }}
            <mat-icon class="date-chip-icon">expand_more</mat-icon>
          </button>
          <mat-form-field class="date-field-hidden">
            <input matInput [matDatepicker]="regStartPicker" [value]="regStartValue()"
                   (dateChange)="onRegStartChange($event.value)" />
            <mat-datepicker #regStartPicker />
          </mat-form-field>

          <span class="text-white/22 mx-0.5">→</span>

          <button type="button" class="date-chip" (click)="regEndPicker.open()" aria-label="Fin inscripciones">
            {{ formatDate(regEndValue()) }}
            <mat-icon class="date-chip-icon">expand_more</mat-icon>
          </button>
          <mat-form-field class="date-field-hidden">
            <input matInput [matDatepicker]="regEndPicker" [value]="regEndValue()"
                   (dateChange)="onRegEndChange($event.value)" />
            <mat-datepicker #regEndPicker />
          </mat-form-field>
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
  readonly socialNetworkOptions = input<SocialNetworkOption[]>([]);
  readonly editable = input(false);

  // ── Outputs ───────────────────────────────────────────────────
  readonly dataChange = output<Partial<ChampionshipHeaderData>>();
  readonly logoSelected = output<File>();

  // ── Template refs ─────────────────────────────────────────────
  private fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  private nameContainerRef = viewChild<ElementRef<HTMLElement>>('nameContainer');
  private nameInputRef = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  private teamsInputRef = viewChild<ElementRef<HTMLInputElement>>('teamsInput');
  private playersInputRef = viewChild<ElementRef<HTMLInputElement>>('playersInput');
  private locationInputRef = viewChild<ElementRef<HTMLInputElement>>('locationInput');

  private readonly dialog = inject(MatDialog);

  // ── UI state ──────────────────────────────────────────────────
  popoverOpen = signal(false);
  editingTeams = signal(false);
  editingPlayers = signal(false);
  editingLocation = signal(false);
  logoPreview = signal<string | null>(null);

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

  // ── Date helpers ──────────────────────────────────────────────
  formatDate(d: Date | null): string {
    if (!d) return '—';
    return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
  }

  private toDate(s: string): Date | null {
    if (!s) return null;
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  private fromDate(d: Date | null): string {
    if (!d) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  startDateValue = computed(() => this.toDate(this.data().startDate));
  endDateValue = computed(() => this.toDate(this.data().endDate));
  regStartValue = computed(() => this.toDate(this.data().registrationStartDate));
  regEndValue = computed(() => this.toDate(this.data().registrationEndDate));

  onStartDateChange(d: Date | null) { this.dataChange.emit({ startDate: this.fromDate(d) }); }
  onEndDateChange(d: Date | null) { this.dataChange.emit({ endDate: this.fromDate(d) }); }
  onRegStartChange(d: Date | null) { this.dataChange.emit({ registrationStartDate: this.fromDate(d) }); }
  onRegEndChange(d: Date | null) { this.dataChange.emit({ registrationEndDate: this.fromDate(d) }); }

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
  private resolvedSocialNetworkOptions = computed<ResolvedSocialNetworkOption[]>(() => {
    return this.socialNetworkOptions().map((opt, index) => {
      const brand = SOCIAL_BRAND_PALETTE[index % SOCIAL_BRAND_PALETTE.length];
      return {
        id: opt.id,
        name: opt.name,
        icon: this.normalizeSocialIcon(opt.icon, opt.name),
        placeholder: 'https://tu-enlace.com/perfil',
        brandBg: brand.bg,
        brandBorder: brand.border,
      };
    });
  });

  socialLinksView = computed(() => {
    return this.data().socialLinks.map(link => {
      const meta = this.resolvedSocialNetworkOptions().find(opt => opt.id === link.socialNetworkId);
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
    return this.resolvedSocialNetworkOptions().filter(opt => !used.has(opt.id));
  });
  statusLabel() { return this.getStatusMeta().label; }
  statusDotClass() { return this.getStatusMeta().dot; }
  statusPillClass() { return this.getStatusMeta().pill; }

  // ── Click outside ──────────────────────────────────────────────
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const t = e.target as Node;
    if (this.popoverOpen()) {
      const c = this.nameContainerRef()?.nativeElement;
      if (c && !c.contains(t)) this.closePopover();
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
    if (options.length === 0) return;
    this.dialog.open<SocialLinkDialogComponent, SocialLinkDialogData, SocialLinkDialogResult>(
      SocialLinkDialogComponent,
      { data: { networkOptions: options, editingNetworkId: null, initialUrl: '' }, width: '380px' }
    ).afterClosed().subscribe(result => {
      if (!result) return;
      this.applySocialResult(result, null);
    });
  }

  startEditSocialLink(link: ChampionshipHeaderSocialLink): void {
    const options = this.resolvedSocialNetworkOptions().filter(opt =>
      !this.data().socialLinks.some(l => l.socialNetworkId === opt.id && l.socialNetworkId !== link.socialNetworkId)
    );
    this.dialog.open<SocialLinkDialogComponent, SocialLinkDialogData, SocialLinkDialogResult>(
      SocialLinkDialogComponent,
      { data: { networkOptions: options, editingNetworkId: link.socialNetworkId, initialUrl: link.link }, width: '380px' }
    ).afterClosed().subscribe(result => {
      if (!result) return;
      this.applySocialResult(result, link.socialNetworkId);
    });
  }

  private applySocialResult(result: SocialLinkDialogResult, editingNetworkId: number | null): void {
    const meta = this.resolvedSocialNetworkOptions().find(opt => opt.id === result.socialNetworkId);
    const payload: ChampionshipHeaderSocialLink = {
      socialNetworkId: result.socialNetworkId,
      link: result.link,
      name: meta?.name,
      icon: meta?.icon,
    };
    const next = [...this.data().socialLinks];
    const idx = next.findIndex(l => l.socialNetworkId === editingNetworkId);
    if (idx >= 0) {
      next[idx] = { ...next[idx], ...payload };
    } else {
      next.push({ ...payload, id: Date.now() });
    }
    this.dataChange.emit({ socialLinks: next });
  }

  removeSocialLink(socialNetworkId: number): void {
    const next = this.data().socialLinks.filter(link => link.socialNetworkId !== socialNetworkId);
    this.dataChange.emit({ socialLinks: next });
  }

  private getStatusMeta(): (typeof STATUS_META)[keyof typeof STATUS_META] {
    const rawStatus = this.data().status;
    const statusKey = STATUS_BY_VALUE[String(rawStatus).toLowerCase()] ?? 'draft';
    return STATUS_META[statusKey];
  }

  private normalizeSocialIcon(icon: string | null | undefined, name: string): string {
    if (icon) {
      const normalizedIcon = icon.trim().toLowerCase();
      const directMap: Record<string, string> = {
        instagram: 'photo_camera',
        facebook: 'thumb_up',
        youtube: 'smart_display',
        tiktok: 'music_note',
        x: 'close',
        twitter: 'close',
      };
      return directMap[normalizedIcon] ?? 'link';
    }

    const normalizedName = name.trim().toLowerCase();
    if (normalizedName.includes('instagram')) return 'photo_camera';
    if (normalizedName.includes('facebook')) return 'thumb_up';
    if (normalizedName.includes('youtube')) return 'smart_display';
    if (normalizedName.includes('tiktok')) return 'music_note';
    if (normalizedName === 'x' || normalizedName.includes('twitter')) return 'close';
    return 'link';
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