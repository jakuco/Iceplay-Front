// ─────────────────────────────────────────────────────────────
// championship-teams.component.ts
// Tab "Equipos" dentro de championship-form.page.ts
//
// Funcionalidades:
//   · Lista de equipos con expand/collapse de jugadores (click en fila)
//   · Buscar equipo por nombre
//   · Counter + progress bar (equipos inscritos / máximo)
//   · Inscribir equipo (modal lateral)
//   · Editar equipo (modal lateral)
//   · Retirar equipo (soft-delete con confirmación)
//   · Inscribir / editar / dar de baja jugadores (PlayerModalComponent)
//   · Vista "Lista" toggle (preparado para vista "Grid")
//   · ── Importar equipos via CSV/XLSX ──────────────────────────
//     ⚠️ STUB: this.teamService.importTeams(file) no existe aún.
//     El componente simula el flujo completo incluyendo:
//       - Detección de conflicto (equipo ya existe)
//       - Confirmación del usuario antes de merge
//       - Progreso de upload (simulado)
//     Reemplaza el bloque marcado con TODO-IMPORT cuando el backend esté listo.
//   · ── Descarga de plantilla CSV ──────────────────────────────
//     ⚠️ STUB: genera y descarga un CSV vacío localmente.
//     Reemplaza con llamada real marcada con TODO-DOWNLOAD.
// ─────────────────────────────────────────────────────────────

import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef,
  computed, effect, inject, input, output, signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, switchMap, map } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';

import {
  PlayerModalComponent,
  PlayerFormData,
} from './player-modal.component';
import { ChampionshipService } from '../../../../../core/services/championship.service';
import { FileUploadComponent } from '../../../../../shared/ui/file-upload/file-upload.component';
import { PdfViewerComponent } from '../../../../../shared/ui/pdf-viewer/pdf-viewer.component';
import { TeamImportService, ImportedTeamPayload, ImportedPlayer, FieldError } from '../../../../../core/services/team-import.service';
import { DbId, Player, PlayerApiResponse, PlayerStatus, PlayerUpsertDto, Team, TeamApiResponse } from '@core/models';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

/** Datos de conflicto cuando el CSV trae un equipo ya existente */
interface ImportConflict {
  existingTeam: TeamItem;
  incomingName: string;
  file: File;
}

interface ExpectedImageTarget {
  teamIdx: number;
  playerId?: number;
  isLogo: boolean;
}

type ImportedTeamEditableField =
  | 'name'
  | 'shortname'
  | 'coachName'
  | 'coachPhone'
  | 'location'
  | 'primaryColor'
  | 'secondaryColor';

type ImportedPlayerEditableField = 'number' | 'firstName' | 'lastName' | 'position' | 'nickName';

/**
 * Representación UI de un equipo.
 * Extiende Team reemplazando players opcionales por Player[] requerido.
 * Equipos locales (no persistidos) usan IDs con prefijo "temp-".
 * Equipos del backend usan su UUID string directamente como id.
 */
export interface TeamItem extends Omit<Team, 'players'> {
  players: Player[];
}

type TeamPlayer = Player & { photoFile?: File };

/** Datos del form para crear/editar un equipo */
interface TeamFormData {
  id?: DbId;   // backend UUID o prefijo 'temp-' para equipos locales
  name: string;
  shortname: string;
  coachName: string;
  coachPhone: string;
  location: string;
  foundedYear: number | null;
  homeVenue: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string | null;
  logoFile?: File;
  documentUrl: string | null;
  documentFile?: File;
}

const DEFAULT_TEAM_FORM = (): TeamFormData => ({
  name: '', shortname: '', coachName: '', coachPhone: '',
  location: '', foundedYear: null, homeVenue: '',
  primaryColor: '#1a56db', secondaryColor: '#e74694',
  logoUrl: null, documentUrl: null,
});

let _nextTeamId = 100;
let _nextPlayerId = 1000;

const PLAYER_STATUS_META: Record<PlayerStatus, { label: string; classes: string }> = {
  active: { label: 'Activo', classes: 'bg-green-50 text-green-700' },
  suspended: { label: 'Suspendido', classes: 'bg-amber-50 text-amber-700' },
  injured: { label: 'Lesionado', classes: 'bg-orange-50 text-orange-700' },
  inactive: { label: 'Inactivo', classes: 'bg-[var(--mat-sys-surface-container-high)] text-[var(--mat-sys-on-surface-variant)]' },
};

// ─── Module-level helpers ──────────────────────────────────────

/** Convierte PlayerApiResponse → Player (modelo frontend con fechas como Date). */
function apiToPlayer(api: PlayerApiResponse): Player {
  return {
    id: api.id,
    teamId: api.teamId,
    positionId: api.positionId ? Number(api.positionId) : 0,
    photoUrl: api.photoUrl,
    firstName: api.firstName,
    lastName: api.lastName,
    nickName: api.nickName ?? null,
    birthDate: api.birthDate ? new Date(api.birthDate) : null,
    number: api.number ?? 0,
    height: api.height ? parseFloat(api.height) : null,
    weight: api.weight ? parseFloat(api.weight) : null,
    status: (api.status as PlayerStatus) ?? PlayerStatus.Active,
    suspensionEndDate: api.suspensionEndDate ? new Date(api.suspensionEndDate) : null,
    suspensionReason: api.suspensionReason ?? null,
    isActive: api.isActive,
    createdAt: new Date(api.createdAt),
    updatedAt: new Date(api.updatedAt),
  };
}

/** Convierte TeamApiResponse → Team (modelo frontend). */
function apiToTeam(api: TeamApiResponse): Team {
  return {
    id: api.id,
    championshipId: api.championshipId,
    name: api.name,
    shortname: api.shortname ?? '',
    slug: api.slug,
    logoUrl: api.logoUrl ?? null,
    documentUrl: api.documentURL ?? null,
    primaryColor: api.primaryColor ?? '#1a56db',
    secondaryColor: api.secondaryColor ?? '#e74694',
    foundedYear: api.foundedYear ?? null,
    homeVenue: api.homeVenue?.toString() ?? null,
    location: api.location ?? null,
    coachName: api.coachName ?? null,
    coachPhone: api.coachPhone ?? null,
    isActive: api.isActive,
    hasActiveMatches: api.hasActiveMatches ?? undefined,
    isTeamActive: api.isTeamActive ?? undefined,
  };
}

// CSV template headers (localized)
const CSV_HEADERS = 'nombre,nombre_corto,entrenador,telefono_entrenador,ciudad,color_primario,color_secundario';

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-championship-teams',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    PlayerModalComponent,
    FileUploadComponent,
    PdfViewerComponent,
  ],
  template: `
<div class="max-w-[960px] mx-auto px-7 pt-6 pb-8 flex flex-col gap-4">

  <!-- ══ TOOLBAR ══════════════════════════════════════════ -->
  <div class="flex items-center gap-3 flex-wrap">

    <!-- Counter + progress -->
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--mat-sys-surface-container)]
                border border-[var(--mat-sys-outline-variant)] text-[13px] font-medium text-[var(--mat-sys-on-surface)] shrink-0">
      <mat-icon class="size!-4 text-[16px]! text-[var(--mat-sys-on-surface-variant)]">group</mat-icon>
      <span><strong class="text-[var(--mat-sys-on-surface)]">{{ teams().length }}</strong>/{{ maxTeams() }}</span>
      <div class="w-16 h-1.5 bg-[var(--mat-sys-surface-container-high)] rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-300"
          [style.width.%]="progressPct()"
          [style.background]="progressColor()"
        ></div>
      </div>
    </div>

    <!-- Search -->
    <div class="relative flex-1 min-w-[180px]">
      <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 size!-4 text-[16px]! text-[var(--mat-sys-on-surface-variant)]
                       pointer-events-none">search</mat-icon>
      <input
        class="w-full pl-9 pr-3 py-2 border border-[var(--mat-sys-outline-variant)] rounded-lg bg-[var(--mat-sys-surface-container)] text-[13px]
               text-[var(--mat-sys-on-surface)] outline-none focus:border-blue-400 focus:ring-2
               focus:ring-blue-400/10 transition-all placeholder:text-[var(--mat-sys-on-surface-variant)]"
        [ngModel]="searchQuery()" (ngModelChange)="searchQuery.set($event)"
        placeholder="Buscar equipo..."
      />
    </div>

    <div class="flex items-center gap-2 ml-auto">
      <!-- Importar -->
      <button
        matButton="outlined"
        class="!h-9"
        (click)="toggleImport()"
        type="button"
      >
        <mat-icon>upload</mat-icon>
        Importar
        <mat-icon class="transition-transform duration-200"
                  [style.transform]="showImport() ? 'rotate(180deg)' : 'rotate(0)'">
          expand_more
        </mat-icon>
      </button>

      <!-- Inscribir -->
      <button
        matButton="filled"
        [disabled]="isFull()"
        (click)="openCreateTeam()"
        type="button"
        [title]="isFull() ? 'Se alcanzó el límite de equipos' : 'Inscribir nuevo equipo'"
      >
        <mat-icon>add</mat-icon>
        Inscribir
      </button>
    </div>
  </div>

  <!-- ══ IMPORT PANEL ═════════════════════════════════════ -->
  @if (showImport()) {
    <div class="rounded-xl border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container)] p-4 flex flex-col gap-3">

      <!-- Info banner -->
      <div class="flex items-start justify-between gap-4 rounded-lg bg-[var(--mat-sys-surface-container-low)]
                  border border-[var(--mat-sys-outline-variant)] px-4 py-3">
        <div class="flex items-start gap-3">
          <mat-icon class="size!-[18px] text-[18px]! text-[var(--mat-sys-primary)] shrink-0 mt-0.5">
            description
          </mat-icon>
          <div>
            <p class="m-0 text-[13px] text-[var(--mat-sys-on-surface)] font-semibold">
              Importa equipos masivamente desde un archivo
              <span class="font-bold">.csv</span> o
              <span class="font-bold">.xlsx</span>.
            </p>
            <p class="m-0 mt-0.5 text-[12px] text-[var(--mat-sys-on-surface-variant)]">
              Columnas reconocidas: nombre, nombre_corto, entrenador, teléfono, ciudad,
              color_primario, color_secundario
            </p>
          </div>
        </div>
        <!-- TODO-DOWNLOAD: reemplazar el método downloadTemplate() con llamada al backend
             cuando el servicio de descarga esté disponible.
             this.teamService.downloadTemplate().subscribe(blob => saveAs(blob, 'plantilla.csv')) -->
        <button matButton="outlined" class="!h-8 shrink-0" (click)="downloadTemplate()" type="button">
          <mat-icon class="size!-[14px] text-[14px]!">download</mat-icon>
          Plantilla CSV
        </button>
      </div>

      <!-- Drop zone -->
      <div
        class="relative border-2 border-dashed rounded-xl transition-colors cursor-pointer
               flex flex-col items-center justify-center gap-2 py-10 px-6 text-center"
        [class.border-blue-400]="isDragOver()"
        [class.bg-blue-50]="isDragOver()"
        [style.border-color]="!isDragOver() ? 'var(--mat-sys-outline)' : ''"
        [style.background]="!isDragOver() ? 'var(--mat-sys-surface-container-low)' : ''"
        [class.opacity-50]="importState() === 'uploading'"
        [class.pointer-events-none]="importState() === 'uploading'"
        (dragover)="onDragOver($event)"
        (dragleave)="isDragOver.set(false)"
        (drop)="onDrop($event)"
        (click)="importFileInput.click()"
      >
        <input
          #importFileInput
          type="file"
          accept=".csv,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.webp"
          multiple
          class="sr-only"
          (change)="onFilesSelected($event)"
        />
        <div class="size-12 rounded-full bg-[var(--mat-sys-surface-container)] border border-[var(--mat-sys-outline-variant)] flex items-center
                    justify-center shadow-sm">
          <mat-icon class="size!-6 text-[24px]! text-[var(--mat-sys-on-surface-variant)]">upload_file</mat-icon>
        </div>
        <div>
          <p class="m-0 text-[14px] font-semibold text-[var(--mat-sys-on-surface)]">Arrastra Excel + imágenes aquí</p>
          <p class="m-0 mt-1 text-[12px] text-[var(--mat-sys-on-surface-variant)]">
            Excel + logo (opcional) + fotos de jugadores (opcional)
          </p>
        </div>
        @if (importState() === 'uploading') {
          <p class="m-0 text-[12px] text-blue-600 font-medium">Procesando...</p>
        }
      </div>

      <!-- Upload progress list -->
      @if (importQueue().length) {
        <div class="flex flex-col gap-2">
          @for (item of importQueue(); track item.fileName) {
            <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--mat-sys-surface-container-low)]
                        border border-[var(--mat-sys-outline-variant)] text-[12.5px]">
              <mat-icon class="size!-4 text-[16px]! shrink-0"
                [class.text-blue-400]="item.status === 'uploading'"
                [class.text-green-500]="item.status === 'done'"
                [class.text-red-400]="item.status === 'error'"
                [class.text-amber-400]="item.status === 'conflict'"
              >
                {{ item.status === 'done' ? 'check_circle' :
                   item.status === 'error' ? 'error' :
                   item.status === 'conflict' ? 'warning' : 'hourglass_top' }}
              </mat-icon>
              <span class="flex-1 truncate text-[var(--mat-sys-on-surface)]">{{ item.fileName }}</span>
              <span class="text-[var(--mat-sys-on-surface-variant)] shrink-0">
                {{ item.status === 'uploading' ? 'Procesando...' :
                   item.status === 'done'      ? item.teamName + ' importado' :
                   item.status === 'conflict'  ? 'Conflicto' : item.error }}
              </span>
            </div>
          }
        </div>
      }
    </div>
  }

  <!-- ══ IMPORT PREVIEW PANEL ═════════════════════════════ -->
  @if (importState() === 'preview') {
    <div class="rounded-xl border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container)] p-6 flex flex-col gap-4">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-[15px] font-bold text-[var(--mat-sys-on-surface)] m-0">Preview: {{ importedTeams().length }} Equipo(s)</h3>
          <p class="text-[12px] text-[var(--mat-sys-on-surface-variant)] m-0 mt-1">{{ importProgressText() }}</p>
        </div>
        <button
          class="size-8 flex items-center justify-center rounded-lg text-[var(--mat-sys-on-surface-variant)]
                 hover:bg-[var(--mat-sys-surface-container-high)] border-none bg-transparent cursor-pointer transition-colors"
          (click)="cancelImport()"
          type="button"
        >
          <mat-icon class="size!-[18px] text-[18px]!">close</mat-icon>
        </button>
      </div>

      <!-- Progreso -->
      <div class="rounded-lg bg-[var(--mat-sys-surface-container-low)] border border-[var(--mat-sys-outline-variant)] p-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] font-medium text-[var(--mat-sys-on-surface)]">
            {{ importProgress().imagesProcessed }}/{{ importProgress().totalImages }} imágenes
          </span>
          <span class="text-[12px] font-medium text-[var(--mat-sys-on-surface)]">
            {{ importedTeams().length }} Excel(s) procesado(s)
          </span>
        </div>
        <mat-progress-bar
          mode="determinate"
          [value]="importProgress().totalImages > 0
            ? (importProgress().imagesProcessed / importProgress().totalImages) * 100
            : 0"
        />
      </div>

      <!-- Teams preview - Lista resumida -->
      <div class="flex flex-col gap-3 max-h-96 overflow-y-auto">
        @for (team of importedTeams(); track team.name; let idx = $index) {
          <div class="rounded-lg border border-[var(--mat-sys-outline-variant)] overflow-hidden">
            <div class="bg-[var(--mat-sys-surface-container-low)] p-3 flex items-center justify-between">
              <div class="flex items-center gap-2 flex-1">
                <span class="text-[13px] font-semibold text-[var(--mat-sys-on-surface)]">{{ team.name }} ({{ team.shortname }})</span>
                <span class="text-[11px] text-[var(--mat-sys-on-surface-variant)]">{{ team.players.length }} jugadores</span>
                @if (team.logoFile) {
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold
                               border-[var(--mat-sys-outline-variant)]"
                        style="background: color-mix(in srgb, var(--mat-sys-primary) 16%, var(--mat-sys-surface-container-high)); color: var(--mat-sys-primary);">
                    <mat-icon class="!w-3 !h-3 !text-[12px] leading-none align-middle">check</mat-icon> Logo
                  </span>
                }
                @if (hasPlayersWithPhoto(team.players)) {
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold
                               border-[var(--mat-sys-outline-variant)]"
                        style="background: color-mix(in srgb, var(--mat-sys-primary) 10%, var(--mat-sys-surface-container-high)); color: var(--mat-sys-on-surface);">
                    <mat-icon class="!w-3 !h-3 !text-[12px] leading-none align-middle">check</mat-icon>
                    {{ countPlayersWithPhoto(team.players) }} fotos
                  </span>
                }
              </div>
              <div class="flex items-center gap-2">
                <button matButton="outlined" class="!h-7 !text-[11px]" type="button" (click)="openImportDetailDialog(idx)">
                  <mat-icon class="size!-3 text-[12px]!">visibility</mat-icon>
                  Ver detalle
                </button>
                <button matButton="outlined" class="!h-7 !text-[11px]" type="button" (click)="removeImportedTeam(idx)">
                  <mat-icon class="size!-3 text-[12px]!">delete</mat-icon>
                  Quitar
                </button>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Errores de imágenes -->
      @if (importErrors().length > 0) {
        <div class="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p class="text-[12px] font-semibold text-amber-700 m-0 mb-2">
            <mat-icon class="size!-4 text-[16px]! inline mr-1">warning</mat-icon>
            {{ importErrors().length }} Imagen(es) sin match
          </p>
          <ul class="list-none m-0 p-0 max-h-24 overflow-y-auto">
            @for (error of importErrors(); track error.file) {
              <li class="text-[11px] text-amber-600 m-0 mb-1 last:mb-0">
                <strong>{{ error.file }}</strong>: {{ error.message }}
              </li>
            }
          </ul>
        </div>
      }

      @if (importValidationErrors().length > 0) {
        <div class="rounded-lg bg-red-50 border border-red-200 p-3">
          <p class="text-[12px] font-semibold text-red-700 m-0 mb-2">
            <mat-icon class="size!-4 text-[16px]! inline mr-1">error</mat-icon>
            {{ importValidationErrors().length }} error(es) bloquean la importación
          </p>
          <ul class="list-none m-0 p-0 max-h-28 overflow-y-auto">
            @for (error of importValidationErrors().slice(0, 8); track $index) {
              <li class="text-[11px] text-red-700 m-0 mb-1 last:mb-0">• {{ error }}</li>
            }
            @if (importValidationErrors().length > 8) {
              <li class="text-[11px] text-red-600 font-medium">+{{ importValidationErrors().length - 8 }} más...</li>
            }
          </ul>
        </div>
      }

      <!-- Botones de acción -->
      <div class="flex justify-end gap-3 pt-2 border-t border-[var(--mat-sys-outline-variant)]">
        <button matButton (click)="cancelImport()" type="button">Cancelar</button>
        <button
          matButton="filled"
          [disabled]="!canConfirmImport() || isSavingTeam()"
          (click)="confirmImportedTeam()"
          type="button"
          [title]="canConfirmImport() ? (isSavingTeam() ? 'Guardando equipos...' : 'Importar todos los equipos') : importBlockReason()"
        >
          <mat-icon>check_circle</mat-icon>
          Importar {{ importedTeams().length }} Equipo(s)
        </button>
      </div>
    </div>
  }

  <!-- ══ IMPORT DETAIL DIALOG ═══════════════════════════════ -->
  @if (importDetailTeam(); as team) {
    <div
      class="fixed inset-0 z-[2200] flex items-center justify-center p-4"
      style="background: rgba(0,0,0,0.45);"
      (click)="closeImportDetailDialog()"
    >
      <div
        class="relative w-full max-w-[1080px] max-h-[88vh] rounded-xl border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container)] shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-detail-title"
        tabindex="0"
        (keydown.escape)="closeImportDetailDialog()"
        (click)="$event.stopPropagation()"
      >
        <div class="flex items-center justify-between px-5 py-3 border-b border-[var(--mat-sys-outline-variant)]">
          <h3 id="import-detail-title" class="m-0 text-[15px] font-bold text-[var(--mat-sys-on-surface)]">
            {{ team.name }} ({{ team.shortname }}) · {{ team.players.length }} jugadores
          </h3>
          <button
            class="size-8 flex items-center justify-center rounded-lg text-[var(--mat-sys-on-surface-variant)]
                   hover:bg-[var(--mat-sys-surface-container-high)] border-none bg-transparent cursor-pointer transition-colors"
            (click)="closeImportDetailDialog()"
            type="button"
            aria-label="Cerrar detalle"
          >
            <mat-icon class="size!-[18px] text-[18px]!">close</mat-icon>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <div class="flex gap-3 mb-4">
            <div class="size-24 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm overflow-hidden"
                 [style.background]="team.primaryColor">
              @if (team.logoFile) {
                <img [src]="getTeamLogoUrl(team.logoFile)" class="w-full h-full object-cover" alt="Logo" />
              } @else {
                {{ (team.shortname || team.name).slice(0,2).toUpperCase() }}
              }
            </div>
            <div class="flex-1">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  class="px-2 py-1.5 text-[12px] border border-[var(--mat-sys-outline-variant)] rounded-md bg-[var(--mat-sys-surface-container)]"
                  [class.border-red-400]="hasImportedTeamFieldError(team, 'name')"
                  [class.bg-red-50]="hasImportedTeamFieldError(team, 'name')"
                  placeholder="Nombre equipo"
                  [ngModel]="team.name"
                  (ngModelChange)="onImportedTeamFieldChange(importDetailTeamIdx()!, 'name', $event)"
                />
                <input
                  class="px-2 py-1.5 text-[12px] border border-[var(--mat-sys-outline-variant)] rounded-md bg-[var(--mat-sys-surface-container)]"
                  [class.border-red-400]="hasImportedTeamFieldError(team, 'shortname')"
                  [class.bg-red-50]="hasImportedTeamFieldError(team, 'shortname')"
                  placeholder="Nombre corto"
                  [ngModel]="team.shortname"
                  (ngModelChange)="onImportedTeamFieldChange(importDetailTeamIdx()!, 'shortname', $event)"
                />
                <input
                  class="px-2 py-1.5 text-[12px] border border-[var(--mat-sys-outline-variant)] rounded-md bg-[var(--mat-sys-surface-container)]"
                  [class.border-red-400]="hasImportedTeamFieldError(team, 'coachName')"
                  [class.bg-red-50]="hasImportedTeamFieldError(team, 'coachName')"
                  placeholder="Entrenador"
                  [ngModel]="team.coachName"
                  (ngModelChange)="onImportedTeamFieldChange(importDetailTeamIdx()!, 'coachName', $event)"
                />
                <input
                  class="px-2 py-1.5 text-[12px] border border-[var(--mat-sys-outline-variant)] rounded-md bg-[var(--mat-sys-surface-container)]"
                  placeholder="Teléfono"
                  [ngModel]="team.coachPhone || ''"
                  (ngModelChange)="onImportedTeamFieldChange(importDetailTeamIdx()!, 'coachPhone', $event)"
                />
              </div>
              <input
                class="mt-2 w-full px-2 py-1.5 text-[12px] border border-[var(--mat-sys-outline-variant)] rounded-md bg-[var(--mat-sys-surface-container)]"
                placeholder="Ciudad / ubicación"
                [ngModel]="team.location || ''"
                (ngModelChange)="onImportedTeamFieldChange(importDetailTeamIdx()!, 'location', $event)"
              />
              <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Color primario</mat-label>
                  <input
                    matInput
                    [ngModel]="team.primaryColor"
                    (ngModelChange)="onImportedTeamFieldChange(importDetailTeamIdx()!, 'primaryColor', $event)"
                    placeholder="#1a56db"
                  />
                  <input
                    matSuffix
                    type="color"
                    class="h-7 w-7 cursor-pointer rounded border-none bg-transparent p-0"
                    [ngModel]="team.primaryColor"
                    (ngModelChange)="onImportedTeamFieldChange(importDetailTeamIdx()!, 'primaryColor', $event)"
                    aria-label="Seleccionar color primario"
                  />
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Color secundario</mat-label>
                  <input
                    matInput
                    [ngModel]="team.secondaryColor"
                    (ngModelChange)="onImportedTeamFieldChange(importDetailTeamIdx()!, 'secondaryColor', $event)"
                    placeholder="#e74694"
                  />
                  <input
                    matSuffix
                    type="color"
                    class="h-7 w-7 cursor-pointer rounded border-none bg-transparent p-0"
                    [ngModel]="team.secondaryColor"
                    (ngModelChange)="onImportedTeamFieldChange(importDetailTeamIdx()!, 'secondaryColor', $event)"
                    aria-label="Seleccionar color secundario"
                  />
                </mat-form-field>
              </div>
            </div>
          </div>

          <div class="border-t border-[var(--mat-sys-outline-variant)] pt-3">
            <p class="text-[12px] font-semibold text-[var(--mat-sys-on-surface)] m-0 mb-2">Jugadores ({{ team.players.length }})</p>
            <div class="max-h-[52vh] overflow-y-auto pr-1">
              <table class="w-full text-[11px]">
                <tbody>
                  @for (player of team.players; track $index) {
                    <tr class="border-b border-[var(--mat-sys-outline-variant)] last:border-b-0">
                      <td class="px-2 py-1.5 font-medium w-16">
                        <input
                          class="w-full px-1 py-1 text-[11px] border border-[var(--mat-sys-outline-variant)] rounded bg-[var(--mat-sys-surface-container)]"
                          [class.border-red-400]="hasImportedPlayerFieldError(player, 'number')"
                          [class.bg-red-50]="hasImportedPlayerFieldError(player, 'number')"
                          [ngModel]="player.number"
                          (ngModelChange)="onImportedPlayerFieldChange(importDetailTeamIdx()!, $index, 'number', $event)"
                        />
                      </td>
                      <td class="px-2 py-1.5">
                        <div class="grid grid-cols-2 gap-1">
                          <input
                            class="w-full px-1 py-1 text-[11px] border border-[var(--mat-sys-outline-variant)] rounded bg-[var(--mat-sys-surface-container)]"
                            [class.border-red-400]="hasImportedPlayerFieldError(player, 'firstName')"
                            [class.bg-red-50]="hasImportedPlayerFieldError(player, 'firstName')"
                            [ngModel]="player.firstName"
                            (ngModelChange)="onImportedPlayerFieldChange(importDetailTeamIdx()!, $index, 'firstName', $event)"
                          />
                          <input
                            class="w-full px-1 py-1 text-[11px] border border-[var(--mat-sys-outline-variant)] rounded bg-[var(--mat-sys-surface-container)]"
                            [class.border-red-400]="hasImportedPlayerFieldError(player, 'lastName')"
                            [class.bg-red-50]="hasImportedPlayerFieldError(player, 'lastName')"
                            [ngModel]="player.lastName"
                            (ngModelChange)="onImportedPlayerFieldChange(importDetailTeamIdx()!, $index, 'lastName', $event)"
                          />
                        </div>
                      </td>
                      <td class="px-2 py-1.5 w-24">
                        <input
                          class="w-full px-1 py-1 text-[11px] border border-[var(--mat-sys-outline-variant)] rounded bg-[var(--mat-sys-surface-container)] uppercase"
                          [class.border-red-400]="hasImportedPlayerFieldError(player, 'position')"
                          [class.bg-red-50]="hasImportedPlayerFieldError(player, 'position')"
                          [ngModel]="player.position"
                          (ngModelChange)="onImportedPlayerFieldChange(importDetailTeamIdx()!, $index, 'position', $event)"
                        />
                      </td>
                      <td class="px-2 py-1.5 text-right">
                        @if (player.photoFile) {
                          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-semibold
                                       border-[var(--mat-sys-outline-variant)]"
                                style="background: color-mix(in srgb, var(--mat-sys-primary) 10%, var(--mat-sys-surface-container-high)); color: var(--mat-sys-on-surface);">
                            <mat-icon class="!w-3 !h-3 !text-[11px] leading-none align-middle">check</mat-icon> Foto ✓
                          </span>
                        } @else {
                          <span class="text-[var(--mat-sys-on-surface-variant)]">—</span>
                        }
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          @if (team.errors.length > 0) {
            <div class="mt-3 rounded bg-red-50 border border-red-200 p-2">
              <p class="text-[11px] font-semibold text-red-700 m-0 mb-1">
                <mat-icon class="size!-3 text-[12px]! inline">error</mat-icon>
                {{ team.errors.length }} error(es)
              </p>
              <ul class="list-none m-0 p-0">
                @for (err of team.errors.slice(0, 6); track $index) {
                  <li class="text-[10px] text-red-600 m-0">• {{ err.message }}</li>
                }
                @if (team.errors.length > 6) {
                  <li class="text-[10px] text-red-500 m-0 font-medium">+{{ team.errors.length - 6 }} más...</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  }

  <!-- ══ TEAMS LIST ════════════════════════════════════════ -->
  <div class="rounded-xl border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container)] overflow-hidden">

    @if (filteredTeams().length === 0) {
      <div class="flex flex-col items-center gap-3 py-12 text-center text-[var(--mat-sys-on-surface-variant)]">
        <mat-icon class="size!-10 text-[40px]! text-[var(--mat-sys-outline)]">group_off</mat-icon>
        @if (searchQuery()) {
          <p class="m-0 text-[14px]">Sin resultados para "<strong>{{ searchQuery() }}</strong>"</p>
        } @else {
          <p class="m-0 text-[14px]">No hay equipos inscritos aún.</p>
          <button matButton="filled" [disabled]="isFull()" (click)="openCreateTeam()" type="button">
            <mat-icon>add</mat-icon> Inscribir primer equipo
          </button>
        }
      </div>
    }

    @for (team of filteredTeams(); track team.id; let last = $last) {
      <!-- Team row -->
      <div [class.border-b]="!last" class="border-[var(--mat-sys-outline-variant)]">

        <!-- ── Team header (clickeable → expand) ── -->
        <div
          class="flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none
                 hover:bg-[var(--mat-sys-surface-container-low)] transition-colors"
          (click)="toggleTeam(team.id)"
        >
          <!-- Logo placeholder -->
          <div
            class="size-10 rounded-lg shrink-0 flex items-center justify-center
                   text-white text-[13px] font-bold shadow-sm"
            [style.background]="team.primaryColor"
          >
            @if (team.logoUrl) {
              <img [src]="team.logoUrl" class="w-full h-full object-cover rounded-lg" alt="Logo equipo" />
            } @else {
              {{ team.shortname.slice(0,2) }}
            }
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-[14px] font-semibold text-[var(--mat-sys-on-surface)] truncate">{{ team.name }}</span>
              @if (!team.isActive) {
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full
                             bg-[var(--mat-sys-surface-container-high)] text-[var(--mat-sys-on-surface-variant)]">INACTIVO</span>
              }
            </div>
            <p class="m-0 text-[12px] text-[var(--mat-sys-on-surface-variant)] truncate">
              {{ team.players.length }} jugadores · {{ team.coachName || '—' }} · {{ team.location || '—' }}
            </p>
          </div>

          <!-- Status pill + actions -->
          <div class="flex items-center gap-2 shrink-0">
            <span
              class="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1
                     rounded-full border"
              [class.bg-green-50]="team.isActive"
              [class.text-green-700]="team.isActive"
              [class.border-green-200]="team.isActive"
              [style.background]="!team.isActive ? 'var(--mat-sys-surface-container-high)' : ''"
              [style.color]="!team.isActive ? 'var(--mat-sys-on-surface-variant)' : ''"
              [style.border-color]="!team.isActive ? 'var(--mat-sys-outline-variant)' : ''"
            >
              <span
                class="size-1.5 rounded-full"
                [class.bg-green-500]="team.isActive"
                [style.background]="!team.isActive ? 'var(--mat-sys-outline)' : ''"
              ></span>
              {{ team.isActive ? 'Activo' : 'Inactivo' }}
            </span>

            @if (team.documentUrl) {
              <button
                class="size-8 flex items-center justify-center rounded-lg border border-blue-100
                       bg-blue-50 text-blue-400 cursor-pointer hover:bg-blue-100 hover:text-blue-600
                       transition-colors"
                (click)="viewDocument(team, $event)"
                type="button"
                title="Ver documento"
                [attr.aria-label]="'Ver documento de ' + team.name"
              >
                <mat-icon class="size!-[15px] text-[15px]!">description</mat-icon>
              </button>
            }

            <a
              [routerLink]="['/team', team.id]"
              class="size-8 flex items-center justify-center rounded-lg border border-[var(--mat-sys-outline-variant)]
                     bg-[var(--mat-sys-surface-container)] text-[var(--mat-sys-on-surface-variant)]
                     hover:bg-[var(--mat-sys-surface-container-high)] transition-colors"
              (click)="$event.stopPropagation()"
              title="Ver perfil público"
              [attr.aria-label]="'Ver perfil de ' + team.name"
            >
              <mat-icon class="size!-[15px] text-[15px]!">open_in_new</mat-icon>
            </a>

            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12.5px]
                     font-medium text-[var(--mat-sys-on-surface-variant)] bg-transparent border border-[var(--mat-sys-outline-variant)]
                     cursor-pointer hover:bg-[var(--mat-sys-surface-container-high)] transition-colors"
              (click)="openEditTeam(team, $event)"
              [disabled]="pendingTeamDeletes().has(team.id)"
              type="button"
            >
              <mat-icon class="size!-[14px] text-[14px]!">edit</mat-icon>
              Editar
            </button>

            <button
              class="size-8 flex items-center justify-center rounded-lg border border-red-100
                     bg-red-50 text-red-400 cursor-pointer hover:bg-red-100 hover:text-red-600
                     transition-colors"
              (click)="removeTeam(team.id, $event)"
              [disabled]="pendingTeamDeletes().has(team.id)"
              type="button"
              title="Retirar equipo"
            >
              <mat-icon class="size!-[14px] text-[14px]!">close</mat-icon>
            </button>

            <!-- Chevron -->
            <mat-icon
              class="size!-4 text-[16px]! text-[var(--mat-sys-on-surface-variant)] transition-transform duration-200 ml-1"
              [style.transform]="expandedTeams().has(team.id) || playerMatchedTeamIds().has(team.id) ? 'rotate(180deg)' : 'rotate(0)'"
            >expand_more</mat-icon>
          </div>
        </div>

        <!-- ── Players expand panel ── -->
        @if (expandedTeams().has(team.id) || playerMatchedTeamIds().has(team.id)) {
          <div class="border-t border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container-low)]">

            <!-- Players table -->
            @if (team.players.length > 0) {
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-[var(--mat-sys-outline-variant)]">
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[var(--mat-sys-on-surface-variant)] w-12">#</th>
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[var(--mat-sys-on-surface-variant)]">Jugador</th>
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[var(--mat-sys-on-surface-variant)]">Posición</th>
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[var(--mat-sys-on-surface-variant)]">Estado</th>
                    <th class="px-4 py-2 w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  @for (player of team.players; track player.id) {
                    <tr class="border-b border-[var(--mat-sys-outline-variant)] hover:bg-[var(--mat-sys-surface-container)] transition-colors group">
                      <td class="px-4 py-2.5">
                        <span class="inline-flex size-7 items-center justify-center rounded-full
                                     text-[12px] font-bold text-white shrink-0"
                              [style.background]="team.primaryColor">
                          {{ player.number }}
                        </span>
                      </td>
                      <td class="px-4 py-2.5">
                        <div class="flex items-center gap-2.5">
                          <div
                            class="size-7 rounded-full overflow-hidden shrink-0 flex items-center
                                   justify-center text-[11px] font-bold text-white"
                            [style.background]="player.photoUrl ? 'transparent' : team.secondaryColor"
                          >
                            @if (player.photoUrl) {
                              <img [src]="player.photoUrl" class="w-full h-full object-cover" alt="" />
                            } @else {
                              <span [style.color]="team.primaryColor">
                                {{ player.firstName.charAt(0) }}{{ player.lastName.charAt(0) }}
                              </span>
                            }
                          </div>
                          <a
                            [routerLink]="['/player', player.id]"
                            class="text-[13.5px] font-semibold text-[var(--mat-sys-on-surface)]
                                   hover:text-[var(--mat-sys-primary)] hover:underline transition-colors"
                          >
                            {{ player.firstName }} {{ player.lastName }}
                          </a>
                          @if (player.nickName) {
                            <span class="text-[11px] text-[var(--mat-sys-on-surface-variant)]">"{{ player.nickName }}"</span>
                          }
                        </div>
                      </td>
                      <td class="px-4 py-2.5 text-[13px] text-[var(--mat-sys-on-surface-variant)]">
                        {{ positionLabel(player.positionId) }}
                      </td>
                      <td class="px-4 py-2.5">
                        <span
                          class="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          [class]="playerStatusClasses(player.status)"
                        >{{ playerStatusLabel(player.status) }}</span>
                      </td>
                      <td class="px-4 py-2.5">
                        <button
                          class="size-6 flex items-center justify-center rounded text-[var(--mat-sys-on-surface-variant)]
                                 bg-transparent border-none cursor-pointer hover:bg-[var(--mat-sys-surface-container-high)]
                                 hover:text-[var(--mat-sys-on-surface)] transition-colors opacity-0 group-hover:opacity-100"
                          (click)="openEditPlayer(team, player)"
                          type="button"
                          title="Editar jugador"
                        >
                            <mat-icon class="size!-3.5 text-[14px]!">edit</mat-icon>
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            } @else {
              <div class="flex flex-col items-center gap-2 py-6 text-center text-[var(--mat-sys-on-surface-variant)]">
                <mat-icon class="size!-8 text-[32px]! text-[var(--mat-sys-outline)]">person_off</mat-icon>
                <p class="m-0 text-[13px]">Sin jugadores inscritos</p>
              </div>
            }

            <!-- Add player button -->
            <div class="px-4 py-3 border-t border-[var(--mat-sys-outline-variant)] flex items-center gap-3">
              <button
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px]
                       font-medium border transition-colors"
                [class.text-blue-600]="team.players.length < maxPlayersPerTeam()"
                [class.bg-blue-50]="team.players.length < maxPlayersPerTeam()"
                [class.border-blue-100]="team.players.length < maxPlayersPerTeam()"
                [class.hover:bg-blue-100]="team.players.length < maxPlayersPerTeam()"
                [class.cursor-pointer]="team.players.length < maxPlayersPerTeam()"
                [style.color]="team.players.length >= maxPlayersPerTeam() ? 'var(--mat-sys-on-surface-variant)' : ''"
                [style.background]="team.players.length >= maxPlayersPerTeam() ? 'var(--mat-sys-surface-container-high)' : ''"
                [style.border-color]="team.players.length >= maxPlayersPerTeam() ? 'var(--mat-sys-outline-variant)' : ''"
                [class.cursor-not-allowed]="team.players.length >= maxPlayersPerTeam()"
                [class.opacity-60]="team.players.length >= maxPlayersPerTeam()"
                (click)="openCreatePlayer(team)"
                [disabled]="team.players.length >= maxPlayersPerTeam()"
                type="button"
                [attr.aria-label]="team.players.length >= maxPlayersPerTeam()
                  ? 'Límite de jugadores alcanzado'
                  : 'Agregar jugador al equipo ' + team.name"
              >
                <mat-icon class="size!-[14px] text-[14px]!">person_add</mat-icon>
                Agregar jugador
              </button>
              @if (team.players.length >= maxPlayersPerTeam()) {
                <span class="text-[11.5px] text-amber-600 font-medium">
                  Límite de {{ maxPlayersPerTeam() }} jugadores alcanzado
                </span>
              } @else {
                <span class="text-[11.5px] text-[var(--mat-sys-on-surface-variant)]">
                  {{ team.players.length }}/{{ maxPlayersPerTeam() }} jugadores
                </span>
              }
            </div>
          </div>
        }
      </div>
    }
  </div>

</div>

<!-- ══ TEAM MODAL (drawer lateral) ══════════════════════════ -->
@if (teamModal()) {
  <div
    class="fixed inset-0 z-[2100] flex justify-end"
    style="background: rgba(0,0,0,0.35);"
    (click)="closeTeamModal()"
  >
    <div
      class="h-full w-full max-w-[440px] bg-[var(--mat-sys-surface-container)] flex flex-col shadow-2xl"
      (click)="$event.stopPropagation()"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--mat-sys-outline-variant)]">
        <h2 class="text-[16px] font-bold text-[var(--mat-sys-on-surface)] m-0">
          {{ teamModal()!.id ? 'Editar Equipo' : 'Inscribir Equipo' }}
        </h2>
        <button
          class="size-8 flex items-center justify-center rounded-lg text-[var(--mat-sys-on-surface-variant)]
                 hover:bg-[var(--mat-sys-surface-container-high)] border-none bg-transparent cursor-pointer transition-colors"
          (click)="closeTeamModal()" type="button"
        >
          <mat-icon class="size!-[18px] text-[18px]!">close</mat-icon>
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
        <!-- Logo preview + upload -->
        <div class="flex items-center gap-4">
          <div
            class="size-16 rounded-xl flex items-center justify-center text-white font-bold
                   text-xl shrink-0 cursor-pointer relative overflow-hidden group"
            [style.background]="teamModal()!.primaryColor"
            (click)="logoFileInput.click()"
          >
            @if (teamModal()!.logoUrl) {
              <img [src]="teamModal()!.logoUrl" class="w-full h-full object-cover" />
            } @else {
              {{ (teamModal()!.shortname || teamModal()!.name).slice(0,2).toUpperCase() }}
            }
            <div class="absolute inset-0 bg-black/50 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity">
              <mat-icon class="size!-5 text-[20px]! text-white">photo_camera</mat-icon>
            </div>
          </div>
          <input #logoFileInput type="file" accept="image/*" class="sr-only"
                 (change)="onTeamLogoSelected($event)" />
          <div>
            <p class="m-0 text-[13px] font-medium text-[var(--mat-sys-on-surface)]">Logo del equipo</p>
            <p class="m-0 mt-0.5 text-[11.5px] text-[var(--mat-sys-on-surface-variant)]">Haz clic en la imagen para cambiarla</p>
          </div>
        </div>

        <!-- Nombre + Nombre corto -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
              Nombre <span class="text-red-400">*</span>
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.name" placeholder="Ej: Osos Polares" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
              Nombre corto
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.shortname"
                   placeholder="Ej: OSP" maxlength="5" />
          </div>
        </div>

        <!-- Coach + Teléfono -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
              Entrenador
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.coachName" placeholder="Nombre del coach" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
              Teléfono coach
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.coachPhone" placeholder="+57 300..." />
          </div>
        </div>

        <!-- Ciudad + Año fundación -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
              Ciudad
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.location" placeholder="Ej: Bogotá" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
              Año de fundación
              <span class="ml-1 normal-case text-[10px] font-normal text-[var(--mat-sys-on-surface-variant)]">(opcional)</span>
            </label>
            <input class="team-input" type="number" min="1800" max="2100"
                   [(ngModel)]="teamModal()!.foundedYear" placeholder="Ej: 1995" />
          </div>
        </div>

        <!-- Estadio / Sede -->
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            Estadio / Sede
            <span class="ml-1 normal-case text-[10px] font-normal text-[var(--mat-sys-on-surface-variant)]">(opcional)</span>
          </label>
          <input class="team-input" [(ngModel)]="teamModal()!.homeVenue"
                 placeholder="Ej: Estadio El Campín" />
        </div>

        <!-- Colores -->
        <div>
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide block mb-2">
            Colores del equipo
          </label>
          <div class="flex items-center gap-4">
            <div class="flex flex-col items-center gap-1.5">
              <input
                type="color"
                class="w-12 h-10 rounded-lg border border-[var(--mat-sys-outline-variant)] cursor-pointer p-0.5 bg-[var(--mat-sys-surface-container)]"
                [(ngModel)]="teamModal()!.primaryColor"
              />
              <span class="text-[10px] text-[var(--mat-sys-on-surface-variant)]">Principal</span>
            </div>
            <div class="flex flex-col items-center gap-1.5">
              <input
                type="color"
                class="w-12 h-10 rounded-lg border border-[var(--mat-sys-outline-variant)] cursor-pointer p-0.5 bg-[var(--mat-sys-surface-container)]"
                [(ngModel)]="teamModal()!.secondaryColor"
              />
              <span class="text-[10px] text-[var(--mat-sys-on-surface-variant)]">Secundario</span>
            </div>
            <!-- Preview -->
            <div class="flex-1 h-10 rounded-lg overflow-hidden flex">
              <div class="flex-1" [style.background]="teamModal()!.primaryColor"></div>
              <div class="flex-1" [style.background]="teamModal()!.secondaryColor"></div>
            </div>
          </div>
        </div>

        <!-- Documento del equipo -->
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            Documento del equipo
          </label>
          <app-file-upload
            [currentUrl]="teamModal()!.documentUrl"
            label="PDF"
            hint="PDF · Máx 50 MB"
            (fileChange)="onDocumentFileChanged($event)"
          />
        </div>

        <!-- Validation error -->
        @if (teamModalError()) {
          <div class="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200
                      px-3 py-2.5 text-[12.5px] text-red-600">
            <mat-icon class="size!-4 text-[16px]! shrink-0">error_outline</mat-icon>
            {{ teamModalError() }}
          </div>
        }
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container-low)]">
        <button matButton (click)="closeTeamModal()" type="button">Cancelar</button>
        <button matButton="filled" [disabled]="isSavingTeam()" (click)="submitTeamModal()" type="button">
          <mat-icon>save</mat-icon>
          {{ isSavingTeam() ? 'Guardando...' : (teamModal()!.id ? 'Guardar cambios' : 'Inscribir equipo') }}
        </button>
      </div>
    </div>
  </div>
}

<!-- ══ PLAYER MODAL ══════════════════════════════════════════ -->
@if (playerModal()) {
  <app-player-modal
    [player]="playerModal()!.player"
    [teamId]="playerModal()!.teamId"
    (saved)="onPlayerSaved($event)"
    (deleted)="onPlayerDeleted($event)"
    (dismiss)="playerModal.set(null)"
  />
}

<!-- ══ PDF VIEWER ══════════════════════════════════════════ -->
@if (pdfViewerData()) {
  <app-pdf-viewer
    [url]="pdfViewerData()!.url"
    [title]="pdfViewerData()!.title"
    (close)="pdfViewerData.set(null)"
  />
}
  `,
  styles: `
    :host { display: block; }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
    .team-input {
      padding: 8px 12px; border: 1px solid var(--mat-sys-outline-variant); border-radius: 8px;
      font-size: 14px; color: var(--mat-sys-on-surface); background: var(--mat-sys-surface-container); font-family: inherit;
      outline: none; transition: border-color .15s; width: 100%; box-sizing: border-box;
    }
    .team-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
    .btn-ghost-sm {
      padding: 8px 16px; border-radius: 8px; background: var(--mat-sys-surface-container); color: var(--mat-sys-on-surface);
      font-size: 13px; font-weight: 500; border: 1px solid var(--mat-sys-outline-variant); cursor: pointer;
      transition: background .15s;
    }
    .btn-ghost-sm:hover { background: var(--mat-sys-surface-container-high); }
  `,
})
export class ChampionshipTeamsComponent {

  // ── Inputs / Outputs ──────────────────────────────────────────
  readonly championshipId = input<string | null>(null);
  readonly maxTeams = input(16);
  readonly maxPlayersPerTeam = input(20);
  readonly initialTeams = input<TeamItem[]>([]);
  readonly sportId = input<number>(1);

  readonly teamsChange = output<TeamItem[]>();
  /** Emite cuando hay cambios locales sin guardar (jugador/equipo añadido, editado o eliminado). */
  readonly dirty = output<void>();

  // ── Services ──────────────────────────────────────────────────
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);
  private teamImportService = inject(TeamImportService);
  private championshipSvc = inject(ChampionshipService);

  // ── State ─────────────────────────────────────────────────────
  teams = signal<TeamItem[]>([]);

  readonly positions = computed(() => this.championshipSvc.positions());

  constructor() {
    effect(() => {
      console.log('Initializing teams:', this.initialTeams());
      this.teams.set(this.initialTeams().map(t => ({ ...t, players: [...(t.players ?? [])] })));
    });
    this.championshipSvc.loadPositions(this.sportId());
    this.destroyRef.onDestroy(() => {
      this.blobUrls.forEach(u => URL.revokeObjectURL(u));
    });
  }
  expandedTeams = signal<Set<DbId>>(new Set());
  showImport = signal(false);  // inicia oculto por defecto en edición — colapsable con el botón Importar
  isDragOver = signal(false);
  importQueue = signal<Array<{
    fileName: string; status: 'uploading' | 'done' | 'error' | 'conflict';
    teamName?: string; error?: string;
  }>>([]);
  conflictDialog = signal<ImportConflict | null>(null);
  // ── Import masivo ──────────────────────────────────────────
  importedTeams = signal<ImportedTeamPayload[]>([]);  // Array de equipos parseados
  importState = signal<'uploading' | 'preview' | null>(null);
  importDetailTeamIdx = signal<number | null>(null);
  maxFileSize = signal(5);  // MB — editable
  importProgress = signal<{ excels: number; imagesProcessed: number; totalImages: number }>({ excels: 0, imagesProcessed: 0, totalImages: 0 });
  importErrors = signal<Array<{ type: string; file: string; message: string }>>([]);
  expectedImageFiles = signal<Map<string, ExpectedImageTarget[]>>(new Map());  // Mapping: filename normalizado → posibles matches
  matchedImages = signal<Map<string, File>>(new Map());  // Tracking: matched images
  // ─────────────────────────────────────────────────────────────
  teamModal = signal<TeamFormData | null>(null);
  teamModalError = signal('');
  playerModal = signal<{ player: PlayerFormData | null; teamId: DbId } | null>(null);
  pdfViewerData = signal<{ url: string; title: string } | null>(null);
  isSavingTeam = signal(false);
  pendingTeamDeletes = signal<Set<DbId>>(new Set());
  pendingPlayerOps = signal<Set<DbId>>(new Set());

  private destroyRef = inject(DestroyRef);
  private blobUrls: string[] = [];

  searchQuery = signal('');

  private normalize(s: string): string {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  private normalizeImportFileKey(raw: string): string {
    return this.normalize(raw)
      .trim()
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  }

  private normalizeTeamNameKey(name: string): string {
    return this.normalize(name)
      .trim()
      .replace(/\s+/g, ' ');
  }

  private extractImportFileKeyCandidates(fileName: string): string[] {
    const normalized = this.normalize(fileName).trim();
    const withoutExt = normalized.replace(/\.[^.]+$/, '');
    const justName = withoutExt.split(/[\\/]/).pop() ?? withoutExt;
    const compact = justName.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

    const candidates = [
      this.normalizeImportFileKey(fileName),
      this.normalizeImportFileKey(withoutExt),
      this.normalizeImportFileKey(justName),
      compact,
    ].filter(Boolean);

    return Array.from(new Set(candidates));
  }

  private isExpectedTargetAlreadyMatched(target: ExpectedImageTarget, teams: ImportedTeamPayload[]): boolean {
    const team = teams[target.teamIdx];
    if (!team) return true;
    if (target.isLogo) return !!team.logoFile;
    if (target.playerId === undefined) return true;
    return !!team.players[target.playerId]?.photoFile;
  }

  private findExpectedTargetForImage(
    fileName: string,
    expectedMap: Map<string, ExpectedImageTarget[]>,
    teams: ImportedTeamPayload[],
  ): ExpectedImageTarget | undefined {
    const keys = this.extractImportFileKeyCandidates(fileName);

    for (const key of keys) {
      const candidates = expectedMap.get(key) ?? [];
      const available = candidates.find((candidate) => !this.isExpectedTargetAlreadyMatched(candidate, teams));
      if (available) return available;
      if (candidates.length > 0) return candidates[0];
    }

    return undefined;
  }

  private resolveImportedPositionId(positionRaw: string): DbId {
    const positions = this.positions();
    if (positions.length === 0) return 1;

    const trimmed = String(positionRaw ?? '').trim();
    if (!trimmed) return positions[0].id;

    const byId = positions.find((pos) => String(pos.id) === trimmed);
    if (byId) return byId.id;

    const normalized = this.normalize(trimmed);
    const aliasToAbbreviation: Record<string, string> = {
      gk: 'por',
      goalkeeper: 'por',
      portero: 'por',
      por: 'por',
      df: 'def',
      defender: 'def',
      defensa: 'def',
      def: 'def',
      mf: 'med',
      midfielder: 'med',
      mediocampista: 'med',
      med: 'med',
      fw: 'del',
      st: 'del',
      forward: 'del',
      delantero: 'del',
      del: 'del',
      piv: 'piv',
      pivot: 'piv',
      lib: 'lib',
      libero: 'lib',
      líbero: 'lib',
    };

    const wanted = aliasToAbbreviation[normalized] ?? normalized;
    const byCodeOrAbbreviation = positions.find((pos) => {
      const code = this.normalize(String(pos.code ?? ''));
      const abbr = this.normalize(String(pos.abbreviation ?? ''));
      return code === wanted || abbr === wanted;
    });
    if (byCodeOrAbbreviation) return byCodeOrAbbreviation.id;

    const byLabel = positions.find((pos) => this.normalize(String(pos.label ?? '')).includes(wanted));
    if (byLabel) return byLabel.id;

    return positions[0].id;
  }

  private emitTeamsChange(): void {
    this.teamsChange.emit(this.teams());
  }

  private toSlug(name: string): string {
    return name.toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private markTeamDeletePending(teamId: DbId, pending: boolean): void {
    this.pendingTeamDeletes.update((set) => {
      const next = new Set(set);
      if (pending) next.add(teamId);
      else next.delete(teamId);
      return next;
    });
  }

  private markPlayerPending(playerId: DbId, pending: boolean): void {
    this.pendingPlayerOps.update((set) => {
      const next = new Set(set);
      if (pending) next.add(playerId);
      else next.delete(playerId);
      return next;
    });
  }

  private mapProfileToTeamItem(profile: {
    id: string | number;
    championshipId: string | number;
    name: string;
    shortname?: string | null;
    slug: string;
    logoUrl?: string | null;
    documentUrl?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    location?: string | null;
    foundedYear?: number | null;
    homeVenue?: string | number | null;
    coachName?: string | null;
    coachPhone?: string | null;
    isActive: boolean;
  }, existingId?: DbId): TeamItem {
    return {
      id: existingId ?? profile.id,
      championshipId: profile.championshipId,
      name: profile.name,
      shortname: String(profile.shortname ?? ''),
      slug: profile.slug,
      logoUrl: profile.logoUrl ?? null,
      documentUrl: profile.documentUrl ?? null,
      primaryColor: profile.primaryColor ?? '#1a56db',
      secondaryColor: profile.secondaryColor ?? '#e74694',
      location: String(profile.location ?? ''),
      foundedYear: profile.foundedYear ?? null,
      homeVenue: String(profile.homeVenue ?? ''),
      coachName: String(profile.coachName ?? ''),
      coachPhone: String(profile.coachPhone ?? ''),
      isActive: profile.isActive,
      players: [],
    };
  }

  // ── Computed ──────────────────────────────────────────────────
  filteredTeams = computed(() => {
    const q = this.normalize(this.searchQuery().trim());
    if (!q) return this.teams();

    const result: TeamItem[] = [];
    for (const t of this.teams()) {
      const teamMatch = this.normalize(t.name).includes(q);
      if (teamMatch) {
        result.push(t);
        continue;
      }
      const matchingPlayerIds = new Set(
        t.players?.filter(p => this.normalize(`${p.firstName} ${p.lastName}`).includes(q)).map(p => p.id)
      );
      if (matchingPlayerIds.size > 0) {
        const sorted = [
          ...t.players?.filter(p => matchingPlayerIds.has(p.id)) || [],
          ...t.players?.filter(p => !matchingPlayerIds.has(p.id)) || [],
        ];
        result.push({ ...t, players: sorted });
      }
    }
    return result;
  });

  // IDs de equipos que aparecen por coincidencia en jugadores (para auto-expandir)
  playerMatchedTeamIds = computed(() => {
    const q = this.normalize(this.searchQuery().trim());
    if (!q) return new Set<DbId>();
    const ids = new Set<DbId>();
    for (const t of this.teams()) {
      if (this.normalize(t.name).includes(q)) continue;
      if (t.players?.some(p => this.normalize(`${p.firstName} ${p.lastName}`).includes(q))) {
        ids.add(t.id);
      }
    }
    return ids;
  });

  isFull = computed(() => this.teams().length >= this.maxTeams());
  progressPct = computed(() => Math.min(100, (this.teams().length / this.maxTeams()) * 100));
  progressColor = computed(() => {
    const p = this.progressPct();
    if (p >= 100) return '#ef4444';
    if (p >= 75) return '#f59e0b';
    return '#3b82f6';
  });

  // ── Computed: Import state ───────────────────────────────────
  importIsProcessing = computed(() => this.importState() === 'uploading');
  importProgressText = computed(() => {
    const p = this.importProgress();
    return `Procesando ${p.excels} excels + ${p.totalImages} imágenes... (${p.imagesProcessed}/${p.totalImages} completadas)`;
  });
  importHasErrors = computed(() => this.importErrors().length > 0);
  importValidationErrors = computed(() => {
    const messages: string[] = [];
    for (const team of this.importedTeams()) {
      const teamLabel = team.name || team.shortname || 'Equipo sin nombre';
      for (const err of team.errors) {
        messages.push(`${teamLabel}: ${err.message}`);
      }
    }
    return messages;
  });
  importBlockReason = computed(() => {
    if (this.importedTeams().length === 0) return 'No hay equipos cargados';
    if (this.importIsProcessing()) return 'El procesamiento aún no termina';
    const validationCount = this.importValidationErrors().length;
    if (validationCount > 0) return `Hay ${validationCount} error(es) de validación`;
    return 'Hay equipos con errores';
  });
  canConfirmImport = computed(() =>
    this.importedTeams().length > 0 &&
    !this.importIsProcessing() &&
    this.importedTeams().every(team => team.isValid)
  );

  importDetailTeam = computed<ImportedTeamPayload | null>(() => {
    const idx = this.importDetailTeamIdx();
    if (idx === null) return null;
    return this.importedTeams()[idx] ?? null;
  });

  // ── Import helpers ───────────────────────────────────────────
  openImportDetailDialog(idx: number): void {
    this.importDetailTeamIdx.set(idx);
  }

  closeImportDetailDialog(): void {
    this.importDetailTeamIdx.set(null);
  }

  toggleTeamExpand(idx: number): void {
    this.expandedTeams.update(s => {
      const next = new Set(s);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  getTeamLogoUrl(logoFile: File | null): string | null {
    return logoFile ? URL.createObjectURL(logoFile) : null;
  }

  countPlayersWithPhoto(players: ImportedPlayer[]): number {
    return players.filter(p => p.photoFile !== undefined).length;
  }

  hasPlayersWithPhoto(players: ImportedPlayer[]): boolean {
    return players.some(p => p.photoFile !== undefined);
  }

  private buildImportedAssetUrl(file: File | null | undefined, fileName: string | null | undefined): string | null {
    if (file) return URL.createObjectURL(file);
    const trimmedName = String(fileName ?? '').trim();
    if (!trimmedName) return null;
    return `/uploads/${encodeURIComponent(trimmedName)}`;
  }

  private buildExpectedImageMap(payloads: ImportedTeamPayload[]): Map<string, ExpectedImageTarget[]> {
    const expectedMap = new Map<string, ExpectedImageTarget[]>();

    payloads.forEach((payload, teamIdx) => {
      if (payload.logoFileName) {
        const logoFileKey = this.normalizeImportFileKey(payload.logoFileName);
        const logoFileTargets = expectedMap.get(logoFileKey) ?? [];
        logoFileTargets.push({ teamIdx, isLogo: true });
        expectedMap.set(logoFileKey, logoFileTargets);
      }

      const logoFallbackKey = this.normalizeImportFileKey(`${payload.name}_logo`);
      const logoFallbackTargets = expectedMap.get(logoFallbackKey) ?? [];
      logoFallbackTargets.push({ teamIdx, isLogo: true });
      expectedMap.set(logoFallbackKey, logoFallbackTargets);

      payload.players.forEach((player, playerId) => {
        if (player.photoFileName) {
          const photoFileKey = this.normalizeImportFileKey(player.photoFileName);
          const photoFileTargets = expectedMap.get(photoFileKey) ?? [];
          photoFileTargets.push({ teamIdx, playerId, isLogo: false });
          expectedMap.set(photoFileKey, photoFileTargets);
        }

        const photoFallbackKey = this.normalizeImportFileKey(`${payload.name}_${player.number}_${player.lastName}`);
        const playerFallbackTargets = expectedMap.get(photoFallbackKey) ?? [];
        playerFallbackTargets.push({ teamIdx, playerId, isLogo: false });
        expectedMap.set(photoFallbackKey, playerFallbackTargets);
      });
    });

    return expectedMap;
  }

  private syncExpectedImageFiles(): void {
    this.expectedImageFiles.set(this.buildExpectedImageMap(this.importedTeams()));
  }

  removeImportedTeam(teamIdx: number): void {
    this.importedTeams.update(teams => teams.filter((_, idx) => idx !== teamIdx));
    this.expandedTeams.set(new Set());

    const currentDetailIdx = this.importDetailTeamIdx();
    if (currentDetailIdx !== null) {
      if (currentDetailIdx === teamIdx) {
        this.importDetailTeamIdx.set(null);
      } else if (currentDetailIdx > teamIdx) {
        this.importDetailTeamIdx.set(currentDetailIdx - 1);
      }
    }

    this.syncExpectedImageFiles();
    this.importProgress.update(p => ({ ...p, excels: this.importedTeams().length }));

    if (this.importedTeams().length === 0) {
      this.importState.set(null);
    }
  }

  hasImportedTeamFieldError(team: ImportedTeamPayload, field: ImportedTeamEditableField): boolean {
    const fieldsByInput: Record<ImportedTeamEditableField, string[]> = {
      name: ['nombre'],
      shortname: ['nombre_corto'],
      coachName: ['entrenador'],
      coachPhone: [],
      location: [],
      primaryColor: [],
      secondaryColor: [],
    };
    const fields = fieldsByInput[field];
    return fields.length > 0 && team.errors.some(err => err.row === 0 && fields.includes(err.field));
  }

  hasImportedPlayerFieldError(player: ImportedPlayer, field: ImportedPlayerEditableField): boolean {
    const fieldsByInput: Record<ImportedPlayerEditableField, string[]> = {
      number: ['numero'],
      firstName: ['nombre'],
      lastName: ['apellido'],
      position: ['posicion'],
      nickName: [],
    };
    const fields = fieldsByInput[field];
    return fields.length > 0 && player.errors.some(err => fields.includes(err.field));
  }

  onImportedTeamFieldChange(teamIdx: number, field: ImportedTeamEditableField, value: string): void {
    this.importedTeams.update(teams => teams.map((team, idx) => {
      if (idx !== teamIdx) return team;
      const nextTeam: ImportedTeamPayload = {
        ...team,
        [field]: ['coachPhone', 'location'].includes(field) && !String(value ?? '').trim() ? null : String(value ?? '').trim(),
      };
      return this.revalidateImportedTeam(nextTeam);
    }));
    this.syncExpectedImageFiles();
  }

  onImportedPlayerFieldChange(
    teamIdx: number,
    playerIdx: number,
    field: ImportedPlayerEditableField,
    value: string
  ): void {
    this.importedTeams.update(teams => teams.map((team, idx) => {
      if (idx !== teamIdx) return team;

      const nextPlayers = team.players.map((player, pIdx) => {
        if (pIdx !== playerIdx) return player;

        if (field === 'number') {
          const raw = String(value ?? '').trim();
          const parsed = raw === '' ? 0 : Number(raw);
          return { ...player, number: Number.isNaN(parsed) ? 0 : parsed };
        }

        if (field === 'position') {
          return { ...player, position: String(value ?? '').trim().toUpperCase() };
        }

        if (field === 'nickName') {
          const nick = String(value ?? '').trim();
          return { ...player, nickName: nick || null };
        }

        return { ...player, [field]: String(value ?? '').trim() };
      });

      return this.revalidateImportedTeam({ ...team, players: nextPlayers });
    }));
    this.syncExpectedImageFiles();
  }

  private revalidateImportedTeam(team: ImportedTeamPayload): ImportedTeamPayload {
    const teamErrors: FieldError[] = [];
    if (!team.name.trim()) {
      teamErrors.push({ row: 0, field: 'nombre', message: 'El nombre del equipo es obligatorio' });
    }
    if (!team.shortname.trim()) {
      teamErrors.push({ row: 0, field: 'nombre_corto', message: 'El nombre corto es obligatorio' });
    }
    if (!team.coachName.trim()) {
      teamErrors.push({ row: 0, field: 'entrenador', message: 'El nombre del entrenador es obligatorio' });
    }

    const players = team.players.map((player, i) => {
      const rowNum = i + 2;
      const pErrors: FieldError[] = [];
      if (!Number.isFinite(player.number) || player.number < 0 || player.number > 99) {
        pErrors.push({ row: rowNum, field: 'numero', message: `Número de camiseta inválido: "${player.number}"` });
      }
      if (!player.firstName.trim()) {
        pErrors.push({ row: rowNum, field: 'nombre', message: 'El nombre es obligatorio' });
      }
      if (!player.lastName.trim()) {
        pErrors.push({ row: rowNum, field: 'apellido', message: 'El apellido es obligatorio' });
      }
      if (!player.position.trim()) {
        pErrors.push({ row: rowNum, field: 'posicion', message: 'La posición es obligatoria' });
      }
      return { ...player, errors: pErrors };
    });

    const allErrors = [...teamErrors, ...players.flatMap(p => p.errors)];
    return {
      ...team,
      players,
      errors: allErrors,
      isValid: allErrors.length === 0,
    };
  }

  cancelImport(options?: { revokeObjectUrls?: boolean }): void {
    const shouldRevokeObjectUrls = options?.revokeObjectUrls ?? true;

    // Limpiar blob URLs solo cuando se cancela/reinicia explícitamente.
    if (shouldRevokeObjectUrls) {
      for (const url of this.blobUrls) {
        URL.revokeObjectURL(url);
      }
      this.blobUrls = [];
    }

    // Reset state
    this.importedTeams.set([]);
    this.importState.set(null);
    this.importDetailTeamIdx.set(null);
    this.importProgress.set({ excels: 0, imagesProcessed: 0, totalImages: 0 });
    this.importErrors.set([]);
    this.expectedImageFiles.set(new Map());
    this.matchedImages.set(new Map());
  }

  // ── Team expand ───────────────────────────────────────────────
  toggleTeam(id: DbId): void {
    this.expandedTeams.update(s => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ── Team modal ────────────────────────────────────────────────
  openCreateTeam(): void {
    if (this.isFull()) {
      this.snackBar.open(`Límite de ${this.maxTeams()} equipos alcanzado`, 'Cerrar', { duration: 3000 });
      return;
    }
    this.teamModal.set(DEFAULT_TEAM_FORM());
    this.teamModalError.set('');
  }

  openEditTeam(team: TeamItem, event: Event): void {
    event.stopPropagation();
    this.teamModal.set({
      id: team.id,
      name: team.name,
      shortname: team.shortname,
      coachName: team.coachName ?? '',
      coachPhone: team.coachPhone ?? '',
      location: team.location ?? '',
      foundedYear: team.foundedYear,
      homeVenue: team.homeVenue ?? '',
      primaryColor: team.primaryColor ?? '#1a56db',
      secondaryColor: team.secondaryColor ?? '#e74694',
      logoUrl: team.logoUrl,
      documentUrl: team.documentUrl,
      // NO setear logoFile ni documentFile - usar solo si usuario selecciona nuevo
    });
    this.teamModalError.set('');
  }

  closeTeamModal(): void { this.teamModal.set(null); }

  private buildUploadFormData(form: TeamFormData): FormData {
    const fd = new FormData();
    if (form.logoFile) {
      fd.append('logoUrl', form.logoFile, form.logoFile.name);
    }
    if (form.documentFile) {
      fd.append('documentUrl', form.documentFile, form.documentFile.name);
    }
    return fd;
  }

  private logUploadFormData(fd: FormData): void {
    const fields: Array<{ key: string; name: string; type: string; size: number }> = [];
    fd.forEach((value, key) => {
      if (value instanceof File) {
        fields.push({ key, name: value.name, type: value.type, size: value.size });
      }
    });
    console.log('Team upload FormData (mock):', fields);
  }

  submitTeamModal(): void {
    const f = this.teamModal();
    if (!f) return;
    if (!f.name.trim()) { this.teamModalError.set('El nombre del equipo es requerido.'); return; }

    const championshipId = this.championshipId();
    
    if (!championshipId) {
      // Local mode - no backend involved
      const logoUrl = f.logoUrl;
      const documentUrl = f.documentUrl;
      if (f.id) {
        this.teams.update(list => list.map(t => t.id !== f.id ? t : {
          ...t,
          name: f.name,
          shortname: f.shortname,
          coachName: f.coachName,
          coachPhone: f.coachPhone,
          location: f.location,
          foundedYear: f.foundedYear,
          homeVenue: f.homeVenue,
          primaryColor: f.primaryColor,
          secondaryColor: f.secondaryColor,
          logoUrl,
          documentUrl,
        }));
      } else {
        const newTeam: TeamItem = {
          id: _nextTeamId++, championshipId: 1, name: f.name, shortname: f.shortname,
          slug: this.toSlug(f.name), logoUrl, documentUrl,
          primaryColor: f.primaryColor, secondaryColor: f.secondaryColor, location: f.location,
          foundedYear: f.foundedYear, homeVenue: f.homeVenue,
          coachName: f.coachName, coachPhone: f.coachPhone, isActive: true, players: [],
        };
        this.teams.update(list => [...list, newTeam]);
      }
      this.teamModal.set(null);
      this.dirty.emit();
      this.emitTeamsChange();
      this.snackBar.open('Equipo actualizado localmente', 'Cerrar', { duration: 2000 });
      return;
    }

    this.isSavingTeam.set(true);

    // 1. Preparar uploads SOLO si existen archivos NUEVOS (no los existentes)
    const uploadTasks: Observable<{ type: 'logo' | 'document'; key: string }>[] = [];
    console.log('📝 Form data:', { logoFile: f.logoFile, documentFile: f.documentFile, logoUrl: f.logoUrl, documentUrl: f.documentUrl });
    
    // Solo subir si hay un archivo NUEVO seleccionado
    if (f.logoFile) {
      console.log('📤 Uploading logo file:', { name: f.logoFile.name, size: f.logoFile.size, type: f.logoFile.type });
      uploadTasks.push(
        this.championshipSvc.uploadFile(f.logoFile).pipe(
          map(response => ({ type: 'logo' as const, key: response.key }))
        )
      );
    }
    if (f.documentFile) {
      console.log('📤 Uploading document file:', { name: f.documentFile.name, size: f.documentFile.size, type: f.documentFile.type });
      uploadTasks.push(
        this.championshipSvc.uploadFile(f.documentFile).pipe(
          map(response => ({ type: 'document' as const, key: response.key }))
        )
      );
    }

    // 2. Ejecutar uploads o proceder directamente si no hay archivos
    const uploadObservable: Observable<{ type: 'logo' | 'document'; key: string }[]> = 
      uploadTasks.length > 0 ? forkJoin(uploadTasks) : of([]);

    uploadObservable.pipe(
      switchMap((uploadResults) => {
        // 3. Procesar resultados de uploads
        let logoUrl = f.logoUrl;
        let documentUrl = f.documentUrl;

        uploadResults.forEach((result) => {
          if (result.type === 'logo') logoUrl = result.key;
          if (result.type === 'document') documentUrl = result.key;
        });

        // 4. Construir DTO con las URLs reales (keys o URLs originales)
        const dto = {
          championshipId: championshipId ?? String(this.teams()[0]?.championshipId ?? ''),
          name: f.name,
          shortname: f.shortname,
          slug: this.toSlug(f.name),
          coachName: f.coachName,
          coachPhone: f.coachPhone,
          location: f.location,
          foundedYear: f.foundedYear,
          homeVenue: f.homeVenue,
          primaryColor: f.primaryColor,
          secondaryColor: f.secondaryColor,
          logoUrl,
          documentUrl,
          isActive: true,
        };

        console.log('📤 Enviando equipo con URLs:', { logoUrl, documentUrl });

        // 5. Hacer POST/PUT del equipo
        if (f.id) {
          // Edit mode
          const current = this.teams().find((team) => team.id === f.id);
          const teamId = typeof current?.id === 'string' ? current.id : null;
          if (!teamId) {
            this.snackBar.open('No se pudo identificar el equipo en backend', 'Cerrar', { duration: 3000 });
            throw new Error('Team ID not found');
          }
          return this.championshipSvc.updateTeam(teamId, dto);
        } else {
          // Create mode
          return this.championshipSvc.createTeam(dto);
        }
      }),
      finalize(() => this.isSavingTeam.set(false))
    ).subscribe({
      next: (response: any) => {
        if (f.id) {
          // Update mode
          this.teams.update((list) => list.map((team) =>
            team.id === f.id
              ? { ...team, ...this.mapProfileToTeamItem(response, team.id), players: team.players }
              : team,
          ));
          this.snackBar.open('Equipo actualizado', 'Cerrar', { duration: 2000 });
        } else {
          // Create mode
          const mapped = this.mapProfileToTeamItem(response);
          this.teams.update((list) => [...list, mapped]);
          this.snackBar.open(`Equipo "${f.name}" inscrito`, 'Cerrar', { duration: 2000 });
        }
        this.teamModal.set(null);
        this.dirty.emit();
        this.emitTeamsChange();
      },
      error: (err: any) => {
        console.error('❌ Error:', err);
        const errorMsg = err?.error?.message || err?.message || 'Error desconocido';
        this.snackBar.open(`Error al procesar el equipo: ${errorMsg}`, 'Cerrar', { duration: 5000 });
      },
    });
  }

  onDocumentFileChanged(file: File | null): void {
    const m = this.teamModal();
    if (!m) return;
    let documentUrl: string | null = null;
    if (file) {
      documentUrl = URL.createObjectURL(file);
    }
    this.teamModal.set({ ...m, documentUrl, documentFile: file ?? undefined });
  }

  viewDocument(team: TeamItem, event: Event): void {
    event.stopPropagation();
    const url = team.documentUrl ?? null;
    if (url) this.pdfViewerData.set({ url, title: team.name });
  }

  onTeamLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const logoUrl = URL.createObjectURL(file);
    const m = this.teamModal();
    if (!m) return;
    this.teamModal.set({ ...m, logoUrl, logoFile: file });
  }

  removeTeam(id: DbId, event: Event): void {
    event.stopPropagation();
    const team = this.teams().find(t => t.id === id);
    if (!team) return;

    if (typeof team.id !== 'string') {
      this.teams.update(list => list.filter(t => t.id !== id));
      this.expandedTeams.update(s => { const n = new Set(s); n.delete(id); return n; });
      this.snackBar.open('Equipo retirado localmente', 'Cerrar', { duration: 2000 });
      this.dirty.emit();
      this.emitTeamsChange();
      return;
    }

    this.markTeamDeletePending(id, true);
    this.championshipSvc.deleteTeam(team.id)
      .pipe(finalize(() => this.markTeamDeletePending(id, false)))
      .subscribe({
        next: () => {
          this.teams.update(list => list.filter(t => t.id !== id));
          this.expandedTeams.update(s => { const n = new Set(s); n.delete(id); return n; });
          this.snackBar.open('Equipo retirado del campeonato', 'Cerrar', { duration: 2000 });
          this.dirty.emit();
          this.emitTeamsChange();
        },
        error: () => {
          this.snackBar.open('Error al retirar equipo', 'Cerrar', { duration: 3000 });
        },
      });
  }

  // ── Player modal ──────────────────────────────────────────────
  openCreatePlayer(team: TeamItem): void {
    if (team.players.length >= this.maxPlayersPerTeam()) {
      this.snackBar.open(
        `Límite de ${this.maxPlayersPerTeam()} jugadores por equipo alcanzado`,
        'Cerrar', { duration: 3000 },
      );
      return;
    }
    this.playerModal.set({ player: null, teamId: team.id });
  }

  openEditPlayer(team: TeamItem, player: TeamPlayer): void {
    this.playerModal.set({
      teamId: team.id,
      player: {
        id: String(player.id), teamId: player.teamId, positionId: Number(player.positionId),
        firstName: player.firstName, lastName: player.lastName,
        nickName: player.nickName ?? '', number: player.number,
        birthDate: player.birthDate ? player.birthDate.toISOString().slice(0, 10) : '', height: player.height,
        weight: player.weight, status: player.status,
        photoUrl: player.photoUrl, photoFile: player.photoFile,
      },
    });
  }

  onPlayerSaved(data: PlayerFormData): void {
    const team = this.teams().find(t => t.id === data.teamId);
    if (!team) return;

    const dto = {
      teamId: typeof team.id === 'string' ? team.id : String(data.teamId),
      firstName: data.firstName,
      lastName: data.lastName,
      nickName: data.nickName || null,
      number: data.number ?? 0,
      birthDate: data.birthDate || null,
      height: data.height,
      weight: data.weight,
      positionId: data.positionId,
      status: data.status,
      photoUrl: data.photoUrl || null,
    };

    const localUpsert = (player: TeamPlayer): void => {
      this.teams.update(list => list.map(t => {
        if (t.id !== data.teamId) return t;
        const isEdit = !!data.id;
        return {
          ...t,
          players: isEdit
            ? (t.players ?? []).map(p => String(p.id) === String(player.id) ? player : p)
            : [...(t.players ?? []), player],
        };
      }));
      this.playerModal.set(null);
      this.dirty.emit();
      this.emitTeamsChange();
    };

    if (typeof team.id !== 'string') {
      const localPlayer: TeamPlayer = {
        id: data.id ? Number(data.id) || data.id : _nextPlayerId++,
        teamId: data.teamId,
        positionId: data.positionId,
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName || null,
        number: data.number!,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        height: data.height,
        weight: data.weight,
        status: data.status as PlayerStatus,
        photoUrl: data.photoUrl ?? null,
        photoFile: data.photoFile,
        suspensionEndDate: null,
        suspensionReason: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      localUpsert(localPlayer);
      return;
    }

    const pendingId: DbId = data.id ?? `temp-${Date.now()}`;
    this.markPlayerPending(pendingId, true);
    const request$ = data.id
      ? this.championshipSvc.updatePlayer(data.id, dto)
      : this.championshipSvc.createPlayer(dto);

    request$
      .pipe(finalize(() => this.markPlayerPending(pendingId, false)))
      .subscribe({
        next: (saved) => {
          const mapped: TeamPlayer = {
            ...saved,
            id: saved.id ?? data.id ?? _nextPlayerId++,
            teamId: saved.teamId ?? data.teamId,
            positionId: saved.positionId ?? data.positionId,
            status: saved.status ?? (data.status as PlayerStatus),
            photoUrl: saved.photoUrl ?? data.photoUrl ?? null,
            photoFile: data.photoFile,
          };
          localUpsert(mapped);
          this.snackBar.open(data.id ? 'Jugador actualizado' : 'Jugador inscrito', 'Cerrar', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open(data.id ? 'Error al actualizar jugador' : 'Error al crear jugador', 'Cerrar', { duration: 3000 });
        },
      });
  }

  onPlayerDeleted(event: { id: string | undefined }): void {
    if (!event.id) {
      return;
    }

    const existing = this.teams()
      .flatMap((team) => team.players)
      .find((player) => String(player.id) === event.id);

    const applyLocalDelete = (): void => {
      this.teams.update(list => list.map(t => ({
        ...t,
        players: t.players.filter(p => String(p.id) !== event.id),
      })));
      this.playerModal.set(null);
      this.snackBar.open('Jugador dado de baja', 'Cerrar', { duration: 2000 });
      this.dirty.emit();
      this.emitTeamsChange();
    };

    if (!existing || typeof existing.id !== 'string') {
      applyLocalDelete();
      return;
    }

    this.markPlayerPending(existing.id, true);
    this.championshipSvc.deletePlayer(existing.id)
      .pipe(finalize(() => this.markPlayerPending(existing.id, false)))
      .subscribe({
        next: () => applyLocalDelete(),
        error: () => this.snackBar.open('Error al eliminar jugador', 'Cerrar', { duration: 3000 }),
      });
  }

  // ── Position helpers ──────────────────────────────────────────
  positionLabel(positionId: DbId): string {
    return this.positions().find((p) => String(p.id) === String(positionId))?.label ?? '—';
  }
  playerStatusLabel(s: PlayerStatus): string {
    return PLAYER_STATUS_META[s]?.label ?? s;
  }
  playerStatusClasses(s: PlayerStatus): string {
    return PLAYER_STATUS_META[s]?.classes ?? '';
  }

  // ── Import ────────────────────────────────────────────────────
  toggleImport(): void {
    this.showImport.update(v => !v);
  }

  onDragOver(e: DragEvent): void {
    e.preventDefault();
    this.isDragOver.set(true);
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.isDragOver.set(false);
    const files = Array.from(e.dataTransfer?.files ?? []);
    this._processUploadedFiles(files);
  }

  onFilesSelected(e: Event): void {
    const files = Array.from((e.target as HTMLInputElement).files ?? []);
    if (files.length === 0) return;
    this._processUploadedFiles(files);
    (e.target as HTMLInputElement).value = '';
  }

  private _processUploadedFiles(files: File[]): void {
    // Separar Excels de imágenes
    const excelFiles = files.filter(f => /\.(xlsx|xls|csv)$/i.test(f.name));
    const imageFiles = files.filter(f => /\.(png|jpg|jpeg|gif|webp)$/i.test(f.name));

    if (excelFiles.length === 0 && imageFiles.length === 0) {
      this.snackBar.open('No se detectaron archivos compatibles', 'Cerrar', { duration: 3000 });
      return;
    }

    // Permitir flujo incremental: imágenes después del Excel
    if (excelFiles.length === 0 && imageFiles.length > 0) {
      const expectedMap = this.expectedImageFiles();
      if (this.importedTeams().length === 0 || expectedMap.size === 0) {
        this.snackBar.open('Primero sube un Excel válido y luego las imágenes', 'Cerrar', { duration: 3500 });
        return;
      }

      this.importState.set('uploading');
      this.importProgress.set({
        excels: this.importedTeams().length,
        imagesProcessed: 0,
        totalImages: imageFiles.length,
      });

      this._matchAndProcessImages(imageFiles, expectedMap);
      return;
    }

    // Validar que haya al menos 1 Excel
    if (excelFiles.length === 0) {
      this.snackBar.open('Debe incluir al menos 1 archivo Excel', 'Cerrar', { duration: 3000 });
      return;
    }

    // Validar tamaño de Excel
    const validExcels = excelFiles.filter(f => {
      if (f.size > this.maxFileSize() * 1024 * 1024) {
        this.importErrors.update(e => [...e, {
          type: 'file-size',
          file: f.name,
          message: `Demasiado grande (${(f.size / 1024 / 1024).toFixed(1)} MB > ${this.maxFileSize()} MB)`
        }]);
        return false;
      }
      return true;
    });

    if (validExcels.length === 0) {
      this.snackBar.open('Ningún Excel válido', 'Cerrar', { duration: 3000 });
      return;
    }

    // Iniciar procesamiento
    this.importState.set('uploading');
    this.importProgress.set({
      excels: validExcels.length,
      imagesProcessed: 0,
      totalImages: imageFiles.length
    });

    // Procesar múltiples excels en paralelo
    Promise.all(
      validExcels.map(file => this.teamImportService.processFiles([file]))
    ).then(payloads => {
      // Guardar todos los equipos parseados
      this.importedTeams.set(payloads);

      // Extraer todos los expected filenames para matching
      const expectedMap = this.buildExpectedImageMap(payloads);

      this.expectedImageFiles.set(expectedMap);

      // Procesar imágenes con matching
      if (imageFiles.length > 0) {
        this._matchAndProcessImages(imageFiles, expectedMap);
      } else {
        // Sin imágenes, mostrar preview
        this.importState.set('preview');
      }
    }).catch(err => {
      const msg = err instanceof Error ? err.message : String(err);
      this.importErrors.update(e => [...e, {
        type: 'excel-parse',
        file: 'unknown',
        message: msg
      }]);
      this.snackBar.open(`Error al procesar excels: ${msg}`, 'Cerrar', { duration: 4000 });
      this.importState.set(null);
    });
  }

  private _matchAndProcessImages(
    imageFiles: File[],
    expectedMap: Map<string, ExpectedImageTarget[]>
  ): void {
    let processedCount = 0;
    const matchedImgs = new Map(this.matchedImages());
    const unmatchedErrors: Array<string> = [];

    // Procesar cada imagen
    imageFiles.forEach(file => {
      const matched = this.findExpectedTargetForImage(file.name, expectedMap, this.importedTeams());

      if (matched) {
        // Validar tamaño (5 MB)
        if (file.size > 5 * 1024 * 1024) {
          this.importErrors.update(e => [...e, {
            type: 'image-size',
            file: file.name,
            message: `Demasiado grande (${(file.size / 1024 / 1024).toFixed(1)} MB)`
          }]);
        } else {
          // Éxito: crear blob URL y guardar
          const blobUrl = URL.createObjectURL(file);
          this.blobUrls.push(blobUrl);
          matchedImgs.set(this.normalizeImportFileKey(file.name), file);

          // Asignar a payload según tipo
          if (matched.isLogo) {
            this.importedTeams.update(teams =>
              teams.map((t, idx) => idx === matched.teamIdx ? { ...t, logoFile: file, logoFileName: file.name } : t)
            );
          } else if (matched.playerId !== undefined) {
            this.importedTeams.update(teams =>
              teams.map((t, idx) => {
                if (idx !== matched.teamIdx) return t;
                return {
                  ...t,
                  players: t.players.map((p, pIdx) =>
                    pIdx === matched.playerId ? { ...p, photoFile: file, photoFileName: file.name } : p
                  )
                };
              })
            );
          }
        }
      } else {
        // Error: imagen no encontrada en expected
        unmatchedErrors.push(file.name);
      }

      processedCount++;
      this.importProgress.update(p => ({ ...p, imagesProcessed: processedCount }));
    });

    // Registrar errores de imágenes sin match
    unmatchedErrors.forEach(name => {
      this.importErrors.update(e => [...e, {
        type: 'image-not-found',
        file: name,
        message: 'No coincide con ningún equipo/jugador del Excel'
      }]);
    });

    // Mantener preview para permitir cargas incrementales
    this.matchedImages.set(matchedImgs);
    this.importState.set('preview');

    if (unmatchedErrors.length > 0) {
      this.snackBar.open(`${unmatchedErrors.length} imagen(es) sin match`, 'Ver detalles', { duration: 4000 });
    }
  }

  /**
   * TODO-IMPORT: Reemplaza la simulación de este método con:
   *   this.teamService.importTeam(file).subscribe({
   *     next: (team) => { ... },
   *     error: (err) => { ... }
   *   })
   * El backend devuelve un TeamItem completo con jugadores parseados.
   * El servicio lanzará un 409 si el equipo ya existe → mostrar conflictDialog.
   */
  confirmImportedTeam(): void {
    const payloads = this.importedTeams();
    if (payloads.length === 0 || payloads.some(p => p.errors.length > 0)) {
      this.snackBar.open('No se puede confirmar: hay errores', 'Cerrar', { duration: 3000 });
      return;
    }

    const existingNameKeys = new Set(this.teams().map(team => this.normalizeTeamNameKey(team.name)));
    const seenImportedKeys = new Set<string>();
    const duplicatedNames: string[] = [];

    for (const payload of payloads) {
      const key = this.normalizeTeamNameKey(payload.name);
      if (existingNameKeys.has(key) || seenImportedKeys.has(key)) {
        duplicatedNames.push(payload.name);
        continue;
      }
      seenImportedKeys.add(key);
    }

    if (duplicatedNames.length > 0) {
      const dedupedNames = Array.from(new Set(duplicatedNames));
      this.importErrors.update(errors => {
        const cleaned = errors.filter(err => err.type !== 'duplicate-team-name');
        return [
          ...cleaned,
          ...dedupedNames.map((name) => ({
            type: 'duplicate-team-name',
            file: name,
            message: 'Ya existe un equipo con ese nombre. No se puede actualizar por este medio.',
          })),
        ];
      });

      this.snackBar.open(
        'Hay equipos duplicados por nombre. No se puede actualizar por este medio.',
        'Cerrar',
        { duration: 5000 }
      );
      return;
    }

    const championshipId = this.championshipId();
    if (championshipId) {
      this.persistImportedTeams(championshipId, payloads);
      return;
    }

    // Procesar cada equipo
    const newTeams: TeamItem[] = [];

    for (const payload of payloads) {
      // Crear slug
      const slug = payload.name.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

      // Crear TeamPlayer[] desde ImportedPlayer[]
      const teamPlayers: TeamPlayer[] = payload.players.map(p => ({
        id: _nextPlayerId++,
        teamId: _nextTeamId, // se actualiza después
        firstName: p.firstName,
        lastName: p.lastName,
        nickName: p.nickName,
        number: p.number,
        positionId: this.resolveImportedPositionId(p.position),
        birthDate: p.birthDate ? new Date(p.birthDate) : null,
        height: p.height,
        weight: p.weight,
        status: 'active' as PlayerStatus,
        photoUrl: this.buildImportedAssetUrl(p.photoFile, p.photoFileName),
        photoFile: p.photoFile || undefined,
        suspensionEndDate: null,
        suspensionReason: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      const logoUrl = this.buildImportedAssetUrl(payload.logoFile, payload.logoFileName);
      const documentUrl = this.buildImportedAssetUrl(payload.documentFile, payload.documentFileName);

      // Crear TeamItem
      const newTeam: TeamItem = {
        id: _nextTeamId++,
        championshipId: 1,
        name: payload.name,
        shortname: payload.shortname,
        slug,
        logoUrl,
        documentUrl,
        primaryColor: payload.primaryColor,
        secondaryColor: payload.secondaryColor,
        location: payload.location || '',
        foundedYear: null,
        homeVenue: '',
        coachName: payload.coachName,
        coachPhone: payload.coachPhone || '',
        isActive: true,
        players: teamPlayers,
      };

      // Actualizar teamId en jugadores
      for (const player of newTeam.players) {
        player.teamId = newTeam.id;
      }

      // Registrar blob URLs para limpieza posterior
      if (logoUrl?.startsWith('blob:')) this.blobUrls.push(logoUrl);
      if (documentUrl?.startsWith('blob:')) this.blobUrls.push(documentUrl);
      for (const player of newTeam.players) {
        if (player.photoUrl?.startsWith('blob:')) this.blobUrls.push(player.photoUrl);
      }

      newTeams.push(newTeam);
    }

    // Agregar todos los equipos a la lista
    this.teams.update(t => [...t, ...newTeams]);
    this.emitTeamsChange();

    // Limpiar estado
    this.cancelImport({ revokeObjectUrls: false });
    this.snackBar.open(`${newTeams.length} equipo(s) importado(s) exitosamente`, 'Cerrar', { duration: 3000 });
  }

  private persistImportedTeams(championshipId: string, payloads: ImportedTeamPayload[]): void {
    const toPersistedAssetUrl = (url: string | null): string | null => {
      if (!url) return null;
      return url.startsWith('blob:') ? null : url;
    };

    const playersBySlug = new Map<string, PlayerUpsertDto[]>();
    payloads.forEach((payload) => {
      const teamSlug = this.toSlug(payload.name);
      const players: PlayerUpsertDto[] = payload.players.map((player) => ({
        teamId: '',
        firstName: player.firstName,
        lastName: player.lastName,
        nickName: player.nickName || null,
        number: player.number,
        birthDate: player.birthDate,
        height: player.height,
        weight: player.weight,
        positionId: Number(this.resolveImportedPositionId(player.position)) || 0,
        status: PlayerStatus.Active,
        photoUrl: toPersistedAssetUrl(this.buildImportedAssetUrl(player.photoFile, player.photoFileName)),
      }));
      playersBySlug.set(teamSlug, players);
    });

    const dtos = payloads.map((payload) => ({
      name: payload.name,
      shortname: payload.shortname,
      slug: this.toSlug(payload.name),
      logoUrl: toPersistedAssetUrl(this.buildImportedAssetUrl(payload.logoFile, payload.logoFileName)) ?? undefined,
      documentUrl: toPersistedAssetUrl(this.buildImportedAssetUrl(payload.documentFile, payload.documentFileName)) ?? undefined,
      primaryColor: payload.primaryColor ?? undefined,
      secondaryColor: payload.secondaryColor ?? undefined,
      location: payload.location ?? undefined,
      coachName: payload.coachName ?? undefined,
      coachPhone: payload.coachPhone ?? undefined,
      players: playersBySlug.get(this.toSlug(payload.name)) ?? [],
    }));

    this.isSavingTeam.set(true);
    this.championshipSvc.saveTeams(championshipId, dtos)
      .pipe(finalize(() => this.isSavingTeam.set(false)))
      .subscribe({
        next: () => {
          this.championshipSvc.getTeams(championshipId).subscribe({
            next: (profiles) => {
              const mapped: TeamItem[] = profiles.map((profile) => ({
                ...this.mapProfileToTeamItem(profile),
                players: [...(profile.players ?? [])],
              }));
              this.teams.set(mapped);
              this.emitTeamsChange();
              this.dirty.emit();
              this.cancelImport({ revokeObjectUrls: false });
              this.snackBar.open(`${payloads.length} equipo(s) importado(s) y guardado(s)`, 'Cerrar', { duration: 3000 });
            },
            error: () => {
              this.snackBar.open('Equipos guardados, pero no se pudo refrescar la lista.', 'Cerrar', { duration: 3500 });
            },
          });
        },
        error: () => {
          this.snackBar.open('Error al guardar equipos importados', 'Cerrar', { duration: 3500 });
        },
      });
  }

  onPlayerPhotosSelected(event: Event): void {
    const files = Array.from((event.target as HTMLInputElement).files ?? []);
    if (files.length === 0) return;

    for (const file of files) {
      if (file.size > this.maxFileSize() * 1024 * 1024) {
        this.snackBar.open(
          `Foto demasiado grande: ${file.name}`,
          'Cerrar', { duration: 3000 }
        );
        continue;
      }
    }
  }

  removePlayerPhoto(key: string): void {
    // No usado en flujo masivo
  }

  /**
   * TODO-DOWNLOAD: Reemplaza este método con descarga real del backend
   */
  downloadTemplate(): void {
    const rows = [CSV_HEADERS, 'Osos Polares,OSP,Carlos Mendez,+573001234567,Bogotá,#1a56db,#e74694'];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'plantilla_equipos.csv'; a.click();
    URL.revokeObjectURL(url);
  }
}