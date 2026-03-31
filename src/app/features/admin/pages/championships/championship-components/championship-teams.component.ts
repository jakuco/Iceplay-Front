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
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, HostListener,
  computed, effect, inject, input, output, signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  PlayerModalComponent,
  PlayerFormData,
  PositionOption,
  MOCK_POSITIONS,
} from './player-modal.component';
import { FileUploadComponent } from '../../../../../shared/ui/file-upload/file-upload.component';
import { PdfViewerComponent } from '../../../../../shared/ui/pdf-viewer/pdf-viewer.component';
import { TeamImportService, ImportedTeamPayload, ImportedPlayer } from '../../../../../core/services/team-import.service';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export type PlayerStatus = 'active' | 'suspended' | 'injured' | 'inactive';

export interface TeamPlayer {
  id:         number;
  teamId:     number;
  positionId: number;
  firstName:  string;
  lastName:   string;
  nickName:   string | null;
  number:     number;
  birthDate:  string | null;
  height:     number | null;
  weight:     number | null;
  status:     PlayerStatus;
  photoUrl:   string | null;   // URL persistida
  photoFile?: File;             // transient — solo para preview/upload
}

export interface TeamItem {
  id:              number;
  championshipId:  number;
  name:            string;
  shortname:       string;
  slug:            string;
  logoUrl:         string | null;
  documentUrl:     string | null;
  primaryColor:    string;
  secondaryColor:  string;
  location:        string;
  foundedYear:     number | null;
  homeVenue:       string;
  coachName:       string;
  coachPhone:      string;
  isActive:        boolean;
  players:         TeamPlayer[];
}

/** Datos de conflicto cuando el CSV trae un equipo ya existente */
interface ImportConflict {
  existingTeam: TeamItem;
  incomingName: string;
  file:         File;
}

/** Datos del form para crear/editar un equipo */
interface TeamFormData {
  id?:            number;
  name:           string;
  shortname:      string;
  coachName:      string;
  coachPhone:     string;
  location:       string;
  foundedYear:    number | null;
  homeVenue:      string;
  primaryColor:   string;
  secondaryColor: string;
  logoUrl:        string | null;
  logoFile?:      File;
  documentUrl:    string | null;
  documentFile?:  File;
}

const DEFAULT_TEAM_FORM = (): TeamFormData => ({
  name: '', shortname: '', coachName: '', coachPhone: '',
  location: '', foundedYear: null, homeVenue: '',
  primaryColor: '#1a56db', secondaryColor: '#e74694',
  logoUrl: null, documentUrl: null,
});

let _nextTeamId   = 100;
let _nextPlayerId = 1000;

const PLAYER_STATUS_META: Record<PlayerStatus, { label: string; classes: string }> = {
  active:    { label: 'Activo',     classes: 'bg-green-50 text-green-700' },
  suspended: { label: 'Suspendido', classes: 'bg-amber-50 text-amber-700' },
  injured:   { label: 'Lesionado',  classes: 'bg-orange-50 text-orange-700' },
  inactive:  { label: 'Inactivo',   classes: 'bg-gray-100 text-gray-500' },
};

// CSV template headers (localized)
const CSV_HEADERS = 'nombre,nombre_corto,entrenador,telefono_entrenador,ciudad,color_primario,color_secundario';

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-championship-teams',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, MatIconModule, PlayerModalComponent, FileUploadComponent, PdfViewerComponent],
  template: `
<div class="max-w-[960px] mx-auto px-7 pt-6 pb-8 flex flex-col gap-4">

  <!-- ══ TOOLBAR ══════════════════════════════════════════ -->
  <div class="flex items-center gap-3 flex-wrap">

    <!-- Counter + progress -->
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white
                border border-gray-200 text-[13px] font-medium text-gray-700 shrink-0">
      <mat-icon class="!size-4 !text-[16px] text-gray-400">group</mat-icon>
      <span><strong class="text-gray-900">{{ teams().length }}</strong>/{{ maxTeams() }}</span>
      <div class="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-300"
          [style.width.%]="progressPct()"
          [style.background]="progressColor()"
        ></div>
      </div>
    </div>

    <!-- Search -->
    <div class="relative flex-1 min-w-[180px]">
      <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 !size-4 !text-[16px] text-gray-400
                       pointer-events-none">search</mat-icon>
      <input
        class="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-white text-[13px]
               text-gray-900 outline-none focus:border-blue-400 focus:ring-2
               focus:ring-blue-400/10 transition-all placeholder:text-gray-400"
        [ngModel]="searchQuery()" (ngModelChange)="searchQuery.set($event)"
        placeholder="Buscar equipo..."
      />
    </div>

    <div class="flex items-center gap-2 ml-auto">
      <!-- Importar -->
      <button
        class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px]
               font-medium cursor-pointer transition-colors border"
        [style.background]="showImport() ? '#3b82f6' : '#fff'"
        [style.color]="showImport() ? '#fff' : '#374151'"
        [style.border-color]="showImport() ? '#3b82f6' : '#d1d5db'"
        (click)="toggleImport()"
        type="button"
      >
        <mat-icon class="!size-4 !text-[16px]">upload</mat-icon>
        Importar
        <mat-icon class="!size-3.5 !text-[14px] transition-transform duration-200"
                  [style.transform]="showImport() ? 'rotate(180deg)' : 'rotate(0)'">
          expand_more
        </mat-icon>
      </button>

      <!-- Inscribir -->
      <button
        class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-500 border-none
               text-white text-[13px] font-semibold cursor-pointer hover:bg-blue-600
               transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        [disabled]="isFull()"
        (click)="openCreateTeam()"
        type="button"
        [title]="isFull() ? 'Se alcanzó el límite de equipos' : 'Inscribir nuevo equipo'"
      >
        <mat-icon class="!size-4 !text-[16px]">add</mat-icon>
        Inscribir
      </button>
    </div>
  </div>

  <!-- ══ IMPORT PANEL ═════════════════════════════════════ -->
  @if (showImport()) {
    <div class="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-3">

      <!-- Info banner -->
      <div class="flex items-start justify-between gap-4 rounded-lg bg-blue-50
                  border border-blue-100 px-4 py-3">
        <div class="flex items-start gap-3">
          <mat-icon class="!size-[18px] !text-[18px] text-blue-400 shrink-0 mt-0.5">
            description
          </mat-icon>
          <div>
            <p class="m-0 text-[13px] text-blue-800 font-semibold">
              Importa equipos masivamente desde un archivo
              <span class="font-bold">.csv</span> o
              <span class="font-bold">.xlsx</span>.
            </p>
            <p class="m-0 mt-0.5 text-[12px] text-blue-600">
              Columnas reconocidas: nombre, nombre_corto, entrenador, teléfono, ciudad,
              color_primario, color_secundario
            </p>
          </div>
        </div>
        <!-- TODO-DOWNLOAD: reemplazar el método downloadTemplate() con llamada al backend
             cuando el servicio de descarga esté disponible.
             this.teamService.downloadTemplate().subscribe(blob => saveAs(blob, 'plantilla.csv')) -->
        <button
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border
                 border-blue-200 text-[12.5px] font-medium text-blue-600 cursor-pointer
                 hover:bg-blue-50 transition-colors shrink-0"
          (click)="downloadTemplate()"
          type="button"
        >
          <mat-icon class="!size-[14px] !text-[14px]">download</mat-icon>
          Plantilla CSV
        </button>
      </div>

      <!-- Drop zone -->
      <div
        class="relative border-2 border-dashed rounded-xl transition-colors cursor-pointer
               flex flex-col items-center justify-center gap-2 py-10 px-6 text-center"
        [class.border-blue-400]="isDragOver()"
        [class.bg-blue-50]="isDragOver()"
        [class.border-gray-300]="!isDragOver()"
        [class.bg-gray-50]="!isDragOver()"
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
        <div class="size-12 rounded-full bg-white border border-gray-200 flex items-center
                    justify-center shadow-sm">
          <mat-icon class="!size-6 !text-[24px] text-gray-400">upload_file</mat-icon>
        </div>
        <div>
          <p class="m-0 text-[14px] font-semibold text-gray-700">Arrastra Excel + imágenes aquí</p>
          <p class="m-0 mt-1 text-[12px] text-gray-400">
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
            <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50
                        border border-gray-100 text-[12.5px]">
              <mat-icon class="!size-4 !text-[16px] shrink-0"
                [class.text-blue-400]="item.status === 'uploading'"
                [class.text-green-500]="item.status === 'done'"
                [class.text-red-400]="item.status === 'error'"
                [class.text-amber-400]="item.status === 'conflict'"
              >
                {{ item.status === 'done' ? 'check_circle' :
                   item.status === 'error' ? 'error' :
                   item.status === 'conflict' ? 'warning' : 'hourglass_top' }}
              </mat-icon>
              <span class="flex-1 truncate text-gray-700">{{ item.fileName }}</span>
              <span class="text-gray-400 shrink-0">
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
    <div class="rounded-xl border border-blue-200 bg-white p-6 flex flex-col gap-4">
      
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-[15px] font-bold text-gray-900 m-0">Preview: {{ importedTeams().length }} Equipo(s)</h3>
          <p class="text-[12px] text-gray-500 m-0 mt-1">{{ importProgressText() }}</p>
        </div>
        <button
          class="size-8 flex items-center justify-center rounded-lg text-gray-400
                 hover:bg-gray-100 border-none bg-transparent cursor-pointer transition-colors"
          (click)="cancelImport()"
          type="button"
        >
          <mat-icon class="!size-[18px] !text-[18px]">close</mat-icon>
        </button>
      </div>

      <!-- Progreso -->
      <div class="rounded-lg bg-blue-50 border border-blue-100 p-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] font-medium text-blue-900">
            {{ importProgress().imagesProcessed }}/{{ importProgress().totalImages }} imágenes
          </span>
          <span class="text-[12px] font-medium text-blue-900">
            {{ importedTeams().length }} Excel(s) procesado(s)
          </span>
        </div>
        <div class="h-2 bg-blue-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-blue-500 transition-all duration-300"
            [style.width.%]="importProgress().totalImages > 0 
              ? (importProgress().imagesProcessed / importProgress().totalImages) * 100 
              : 0"
          ></div>
        </div>
      </div>

      <!-- Teams preview - Acordeones -->
      <div class="flex flex-col gap-3 max-h-96 overflow-y-auto">
        @for (team of importedTeams(); track team.name; let idx = $index) {
          <div class="rounded-lg border border-gray-200 overflow-hidden">
            <!-- Header del acordeón -->
            <div class="bg-gray-50 p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                 (click)="toggleTeamExpand(idx)">
              <div class="flex items-center gap-2 flex-1">
                <span class="text-[13px] font-semibold text-gray-900">{{ team.name }} ({{ team.shortname }})</span>
                <span class="text-[11px] text-gray-500">{{ team.players.length }} jugadores</span>
                @if (team.logoFile) {
                  <span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-medium">
                    <mat-icon class="!size-3 !text-[12px]">check</mat-icon> Logo
                  </span>
                }
                @if (hasPlayersWithPhoto(team.players)) {
                  <span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-medium">
                    <mat-icon class="!size-3 !text-[12px]">check</mat-icon> 
                    {{ countPlayersWithPhoto(team.players) }} fotos
                  </span>
                }
              </div>
              <mat-icon class="!size-5 !text-[20px] text-gray-600 transition-transform"
                        [style.transform]="expandedTeams().has(idx) ? 'rotate(180deg)' : 'rotate(0)'">
                expand_more
              </mat-icon>
            </div>

            <!-- Contenido del acordeón -->
            @if (expandedTeams().has(idx)) {
              <div class="p-4 border-t border-gray-200 bg-white">
                <!-- Logo + Datos -->
                <div class="flex gap-3 mb-4">
                  <div class="size-24 rounded-lg flex items-center justify-center text-white font-bold
                              text-lg shrink-0 shadow-sm overflow-hidden"
                       [style.background]="team.primaryColor">
                    @if (team.logoFile) {
                      <img [src]="getTeamLogoUrl(team.logoFile)" class="w-full h-full object-cover" alt="Logo" />
                    } @else {
                      {{ (team.shortname || team.name).slice(0,2).toUpperCase() }}
                    }
                  </div>
                  <div class="flex-1">
                    <p class="text-[13px] font-semibold text-gray-900 m-0">{{ team.coachName }}</p>
                    @if (team.coachPhone) {
                      <p class="text-[12px] text-gray-500 m-0">{{ team.coachPhone }}</p>
                    }
                    @if (team.location) {
                      <p class="text-[12px] text-gray-500 m-0">{{ team.location }}</p>
                    }
                    <div class="mt-2 flex gap-2">
                      <div class="flex items-center gap-1">
                        <div class="size-3 rounded" [style.background]="team.primaryColor"></div>
                        <span class="text-[10px] text-gray-600">{{ team.primaryColor }}</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <div class="size-3 rounded" [style.background]="team.secondaryColor"></div>
                        <span class="text-[10px] text-gray-600">{{ team.secondaryColor }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Tabla de jugadores + fotos -->
                <div class="border-t border-gray-100 pt-3">
                  <p class="text-[12px] font-semibold text-gray-900 m-0 mb-2">Jugadores ({{ team.players.length }})</p>
                  <table class="w-full text-[11px]">
                    <tbody>
                      @for (player of team.players; track player.number) {
                        <tr class="border-b border-gray-100 last:border-b-0">
                          <td class="px-2 py-1.5 font-medium">{{ player.number }}</td>
                          <td class="px-2 py-1.5">{{ player.firstName }} {{ player.lastName }}</td>
                          <td class="px-2 py-1.5">{{ player.position }}</td>
                          <td class="px-2 py-1.5 text-right">
                            @if (player.photoFile) {
                              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[9px]">
                                <mat-icon class="!size-3 !text-[12px]">check</mat-icon> Foto ✓
                              </span>
                            } @else {
                              <span class="text-gray-400">—</span>
                            }
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>

                <!-- Errores del equipo -->
                @if (team.errors.length > 0) {
                  <div class="mt-3 rounded bg-red-50 border border-red-200 p-2">
                    <p class="text-[11px] font-semibold text-red-700 m-0 mb-1">
                      <mat-icon class="!size-3 !text-[12px] inline">error</mat-icon>
                      {{ team.errors.length }} error(es)
                    </p>
                    <ul class="list-none m-0 p-0">
                      @for (err of team.errors.slice(0, 3); track $index) {
                        <li class="text-[10px] text-red-600 m-0">• {{ err.message }}</li>
                      }
                      @if (team.errors.length > 3) {
                        <li class="text-[10px] text-red-500 m-0 font-medium">+{{ team.errors.length - 3 }} más...</li>
                      }
                    </ul>
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>

      <!-- Errores de imágenes -->
      @if (importErrors().length > 0) {
        <div class="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p class="text-[12px] font-semibold text-amber-700 m-0 mb-2">
            <mat-icon class="!size-4 !text-[16px] inline mr-1">warning</mat-icon>
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

      <!-- Botones de acción -->
      <div class="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <button
          class="px-4 py-2 rounded-lg bg-white border border-gray-300 text-[13px]
                 font-medium text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
          (click)="cancelImport()"
          type="button"
        >
          Cancelar
        </button>
        <button
          class="px-4 py-2 rounded-lg bg-blue-500 border-none text-white text-[13px]
                 font-semibold cursor-pointer hover:bg-blue-600 transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
          [disabled]="!canConfirmImport()"
          (click)="confirmImportedTeam()"
          type="button"
          [title]="!canConfirmImport() ? 'Hay equipos con errores' : 'Importar todos los equipos'"
        >
          <mat-icon class="!size-4 !text-[16px] inline mr-1.5">check_circle</mat-icon>
          Importar {{ importedTeams().length }} Equipo(s)
        </button>
      </div>
    </div>
  }

  <!-- ══ TEAMS LIST ════════════════════════════════════════ -->
  <div class="rounded-xl border border-gray-200 bg-white overflow-hidden">

    @if (filteredTeams().length === 0) {
      <div class="flex flex-col items-center gap-3 py-12 text-center text-gray-500">
        <mat-icon class="!size-10 !text-[40px] text-gray-300">group_off</mat-icon>
        @if (searchQuery()) {
          <p class="m-0 text-[14px]">Sin resultados para "<strong>{{ searchQuery() }}</strong>"</p>
        } @else {
          <p class="m-0 text-[14px]">No hay equipos inscritos aún.</p>
          <button
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500
                   text-white text-[13px] font-semibold border-none cursor-pointer
                   hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
            [disabled]="isFull()"
            (click)="openCreateTeam()"
            type="button"
          >
            <mat-icon class="!size-4 !text-[16px]">add</mat-icon> Inscribir primer equipo
          </button>
        }
      </div>
    }

    @for (team of filteredTeams(); track team.id; let last = $last) {
      <!-- Team row -->
      <div [class.border-b]="!last" class="border-gray-100">

        <!-- ── Team header (clickeable → expand) ── -->
        <div
          class="flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none
                 hover:bg-gray-50 transition-colors"
          (click)="toggleTeam(team.id)"
        >
          <!-- Logo placeholder -->
          <div
            class="size-10 rounded-lg shrink-0 flex items-center justify-center
                   text-white text-[13px] font-bold shadow-sm"
            [style.background]="team.primaryColor"
          >
            {{ team.shortname.slice(0,2) }}
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-[14px] font-semibold text-gray-900 truncate">{{ team.name }}</span>
              @if (!team.isActive) {
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full
                             bg-gray-100 text-gray-500">INACTIVO</span>
              }
            </div>
            <p class="m-0 text-[12px] text-gray-400 truncate">
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
              [class.bg-gray-50]="!team.isActive"
              [class.text-gray-500]="!team.isActive"
              [class.border-gray-200]="!team.isActive"
            >
              <span
                class="size-1.5 rounded-full"
                [class.bg-green-500]="team.isActive"
                [class.bg-gray-400]="!team.isActive"
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
                <mat-icon class="!size-[15px] !text-[15px]">description</mat-icon>
              </button>
            }

            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12.5px]
                     font-medium text-gray-600 bg-transparent border border-gray-200
                     cursor-pointer hover:bg-gray-100 transition-colors"
              (click)="openEditTeam(team, $event)"
              type="button"
            >
              <mat-icon class="!size-[14px] !text-[14px]">edit</mat-icon>
              Editar
            </button>

            <button
              class="size-8 flex items-center justify-center rounded-lg border border-red-100
                     bg-red-50 text-red-400 cursor-pointer hover:bg-red-100 hover:text-red-600
                     transition-colors"
              (click)="removeTeam(team.id, $event)"
              type="button"
              title="Retirar equipo"
            >
              <mat-icon class="!size-[14px] !text-[14px]">close</mat-icon>
            </button>

            <!-- Chevron -->
            <mat-icon
              class="!size-4 !text-[16px] text-gray-400 transition-transform duration-200 ml-1"
              [style.transform]="expandedTeams().has(team.id) || playerMatchedTeamIds().has(team.id) ? 'rotate(180deg)' : 'rotate(0)'"
            >expand_more</mat-icon>
          </div>
        </div>

        <!-- ── Players expand panel ── -->
        @if (expandedTeams().has(team.id) || playerMatchedTeamIds().has(team.id)) {
          <div class="border-t border-gray-100 bg-gray-50">

            <!-- Players table -->
            @if (team.players.length > 0) {
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-400 w-12">#</th>
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-400">Jugador</th>
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-400">Posición</th>
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-400">Estado</th>
                    <th class="px-4 py-2 w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  @for (player of team.players; track player.id) {
                    <tr class="border-b border-gray-100 hover:bg-white transition-colors group">
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
                          <span class="text-[13.5px] font-semibold text-gray-900">
                            {{ player.firstName }} {{ player.lastName }}
                          </span>
                          @if (player.nickName) {
                            <span class="text-[11px] text-gray-400">"{{ player.nickName }}"</span>
                          }
                        </div>
                      </td>
                      <td class="px-4 py-2.5 text-[13px] text-gray-600">
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
                          class="size-6 flex items-center justify-center rounded text-gray-400
                                 bg-transparent border-none cursor-pointer hover:bg-gray-200
                                 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                          (click)="openEditPlayer(team, player)"
                          type="button"
                          title="Editar jugador"
                        >
                          <mat-icon class="!size-3.5 !text-[14px]">edit</mat-icon>
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            } @else {
              <div class="flex flex-col items-center gap-2 py-6 text-center text-gray-400">
                <mat-icon class="!size-8 !text-[32px] text-gray-300">person_off</mat-icon>
                <p class="m-0 text-[13px]">Sin jugadores inscritos</p>
              </div>
            }

            <!-- Add player button -->
            <div class="px-4 py-3 border-t border-gray-100 flex items-center gap-3">
              <button
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px]
                       font-medium border transition-colors"
                [class.text-blue-600]="team.players.length < maxPlayersPerTeam()"
                [class.bg-blue-50]="team.players.length < maxPlayersPerTeam()"
                [class.border-blue-100]="team.players.length < maxPlayersPerTeam()"
                [class.hover:bg-blue-100]="team.players.length < maxPlayersPerTeam()"
                [class.cursor-pointer]="team.players.length < maxPlayersPerTeam()"
                [class.text-gray-400]="team.players.length >= maxPlayersPerTeam()"
                [class.bg-gray-50]="team.players.length >= maxPlayersPerTeam()"
                [class.border-gray-200]="team.players.length >= maxPlayersPerTeam()"
                [class.cursor-not-allowed]="team.players.length >= maxPlayersPerTeam()"
                [class.opacity-60]="team.players.length >= maxPlayersPerTeam()"
                (click)="openCreatePlayer(team)"
                [disabled]="team.players.length >= maxPlayersPerTeam()"
                type="button"
                [attr.aria-label]="team.players.length >= maxPlayersPerTeam()
                  ? 'Límite de jugadores alcanzado'
                  : 'Agregar jugador al equipo ' + team.name"
              >
                <mat-icon class="!size-[14px] !text-[14px]">person_add</mat-icon>
                Agregar jugador
              </button>
              @if (team.players.length >= maxPlayersPerTeam()) {
                <span class="text-[11.5px] text-amber-600 font-medium">
                  Límite de {{ maxPlayersPerTeam() }} jugadores alcanzado
                </span>
              } @else {
                <span class="text-[11.5px] text-gray-400">
                  {{ team.players.length }}/{{ maxPlayersPerTeam() }} jugadores
                </span>
              }
            </div>
          </div>
        }
      </div>
    }
  </div>

  <!-- ══ FOOTER ════════════════════════════════════════════ -->
  <div class="flex justify-end pt-3 border-t border-gray-200">
    <button
      class="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg bg-blue-500
             text-white text-[13px] font-semibold border-none cursor-pointer
             hover:bg-blue-600 transition-colors"
      (click)="save.emit(teams())"
      type="button"
    >
      <mat-icon class="!size-4 !text-[16px]">save</mat-icon>
      Guardar todos los cambios
    </button>
  </div>

</div>

<!-- ══ TEAM MODAL (drawer lateral) ══════════════════════════ -->
@if (teamModal()) {
  <div
    class="fixed inset-0 z-[150] flex justify-end"
    style="background: rgba(0,0,0,0.35);"
    (click)="closeTeamModal()"
  >
    <div
      class="h-full w-full max-w-[440px] bg-white flex flex-col shadow-2xl"
      (click)="$event.stopPropagation()"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 class="text-[16px] font-bold text-gray-900 m-0">
          {{ teamModal()!.id ? 'Editar Equipo' : 'Inscribir Equipo' }}
        </h2>
        <button
          class="size-8 flex items-center justify-center rounded-lg text-gray-400
                 hover:bg-gray-100 border-none bg-transparent cursor-pointer transition-colors"
          (click)="closeTeamModal()" type="button"
        >
          <mat-icon class="!size-[18px] !text-[18px]">close</mat-icon>
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
              <mat-icon class="!size-5 !text-[20px] text-white">photo_camera</mat-icon>
            </div>
          </div>
          <input #logoFileInput type="file" accept="image/*" class="sr-only"
                 (change)="onTeamLogoSelected($event)" />
          <div>
            <p class="m-0 text-[13px] font-medium text-gray-700">Logo del equipo</p>
            <p class="m-0 mt-0.5 text-[11.5px] text-gray-400">Haz clic en la imagen para cambiarla</p>
          </div>
        </div>

        <!-- Nombre + Nombre corto -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Nombre <span class="text-red-400">*</span>
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.name" placeholder="Ej: Osos Polares" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Nombre corto
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.shortname"
                   placeholder="Ej: OSP" maxlength="5" />
          </div>
        </div>

        <!-- Coach + Teléfono -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Entrenador
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.coachName" placeholder="Nombre del coach" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Teléfono coach
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.coachPhone" placeholder="+57 300..." />
          </div>
        </div>

        <!-- Ciudad + Año fundación -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Ciudad
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.location" placeholder="Ej: Bogotá" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Año de fundación
              <span class="ml-1 normal-case text-[10px] font-normal text-gray-300">(opcional)</span>
            </label>
            <input class="team-input" type="number" min="1800" max="2100"
                   [(ngModel)]="teamModal()!.foundedYear" placeholder="Ej: 1995" />
          </div>
        </div>

        <!-- Estadio / Sede -->
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Estadio / Sede
            <span class="ml-1 normal-case text-[10px] font-normal text-gray-300">(opcional)</span>
          </label>
          <input class="team-input" [(ngModel)]="teamModal()!.homeVenue"
                 placeholder="Ej: Estadio El Campín" />
        </div>

        <!-- Colores -->
        <div>
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide block mb-2">
            Colores del equipo
          </label>
          <div class="flex items-center gap-4">
            <div class="flex flex-col items-center gap-1.5">
              <input
                type="color"
                class="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white"
                [(ngModel)]="teamModal()!.primaryColor"
              />
              <span class="text-[10px] text-gray-400">Principal</span>
            </div>
            <div class="flex flex-col items-center gap-1.5">
              <input
                type="color"
                class="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white"
                [(ngModel)]="teamModal()!.secondaryColor"
              />
              <span class="text-[10px] text-gray-400">Secundario</span>
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
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
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
            <mat-icon class="!size-4 !text-[16px] shrink-0">error_outline</mat-icon>
            {{ teamModalError() }}
          </div>
        }
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-gray-100 bg-gray-50">
        <button class="btn-ghost-sm" (click)="closeTeamModal()" type="button">Cancelar</button>
        <button
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500 text-white
                 text-[13px] font-semibold border-none cursor-pointer hover:bg-blue-600
                 transition-colors"
          (click)="submitTeamModal()"
          type="button"
        >
          <mat-icon class="!size-4 !text-[16px]">save</mat-icon>
          {{ teamModal()!.id ? 'Guardar cambios' : 'Inscribir equipo' }}
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
    [positions]="positions"
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
      padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px;
      font-size: 14px; color: #111827; background: #fff; font-family: inherit;
      outline: none; transition: border-color .15s; width: 100%; box-sizing: border-box;
    }
    .team-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
    .btn-ghost-sm {
      padding: 8px 16px; border-radius: 8px; background: #fff; color: #374151;
      font-size: 13px; font-weight: 500; border: 1px solid #d1d5db; cursor: pointer;
      transition: background .15s;
    }
    .btn-ghost-sm:hover { background: #f9fafb; }
  `,
})
export class ChampionshipTeamsComponent {

  // ── Inputs / Outputs ──────────────────────────────────────────
  readonly maxTeams          = input(16);
  readonly maxPlayersPerTeam = input(20);
  readonly initialTeams      = input<TeamItem[]>([]);
  readonly positions    = MOCK_POSITIONS;

  readonly save   = output<TeamItem[]>();
  /** Emite cuando hay cambios locales sin guardar (jugador/equipo añadido, editado o eliminado). */
  readonly dirty  = output<void>();

  // ── Services ──────────────────────────────────────────────────
  private snackBar = inject(MatSnackBar);
  private cdr      = inject(ChangeDetectorRef);
  private teamImportService = inject(TeamImportService);

  // ── State ─────────────────────────────────────────────────────
  teams        = signal<TeamItem[]>([]);

  constructor() {
    effect(() => {
      this.teams.set(this.initialTeams().map(t => ({ ...t, players: [...t.players] })));
    });
    this.destroyRef.onDestroy(() => {
      this.blobUrls.forEach(u => URL.revokeObjectURL(u));
    });
  }
  expandedTeams = signal<Set<number>>(new Set());
  showImport   = signal(true);   // visible por defecto — colapsable con el botón Importar
  isDragOver   = signal(false);
  importQueue  = signal<Array<{
    fileName: string; status: 'uploading' | 'done' | 'error' | 'conflict';
    teamName?: string; error?: string;
  }>>([]);
  conflictDialog = signal<ImportConflict | null>(null);
  // ── Import masivo ──────────────────────────────────────────
  importedTeams      = signal<ImportedTeamPayload[]>([]);  // Array de equipos parseados
  importState        = signal<'uploading' | 'preview' | null>(null);
  maxFileSize        = signal(5);  // MB — editable
  importProgress     = signal<{excels: number; imagesProcessed: number; totalImages: number}>({excels: 0, imagesProcessed: 0, totalImages: 0});
  importErrors       = signal<Array<{type: string; file: string; message: string}>>([]);
  expectedImageFiles = signal<Map<string, {teamIdx: number; playerId?: number; isLogo: boolean}>>(new Map());  // Mapping: filename → {team, player}
  matchedImages      = signal<Map<string, File>>(new Map());  // Tracking: matched images
  // ─────────────────────────────────────────────────────────────
  teamModal      = signal<TeamFormData | null>(null);
  teamModalError = signal('');
  playerModal    = signal<{ player: PlayerFormData | null; teamId: number } | null>(null);
  pdfViewerData  = signal<{ url: string; title: string } | null>(null);

  private destroyRef = inject(DestroyRef);
  private blobUrls: string[] = [];

  searchQuery = signal('');

  private normalize(s: string): string {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
        t.players
          .filter(p => this.normalize(`${p.firstName} ${p.lastName}`).includes(q))
          .map(p => p.id)
      );
      if (matchingPlayerIds.size > 0) {
        const sorted = [
          ...t.players.filter(p => matchingPlayerIds.has(p.id)),
          ...t.players.filter(p => !matchingPlayerIds.has(p.id)),
        ];
        result.push({ ...t, players: sorted });
      }
    }
    return result;
  });

  // IDs de equipos que aparecen por coincidencia en jugadores (para auto-expandir)
  playerMatchedTeamIds = computed(() => {
    const q = this.normalize(this.searchQuery().trim());
    if (!q) return new Set<number>();
    const ids = new Set<number>();
    for (const t of this.teams()) {
      if (this.normalize(t.name).includes(q)) continue;
      if (t.players.some(p => this.normalize(`${p.firstName} ${p.lastName}`).includes(q))) {
        ids.add(t.id);
      }
    }
    return ids;
  });

  isFull       = computed(() => this.teams().length >= this.maxTeams());
  progressPct  = computed(() => Math.min(100, (this.teams().length / this.maxTeams()) * 100));
  progressColor = computed(() => {
    const p = this.progressPct();
    if (p >= 100) return '#ef4444';
    if (p >= 75)  return '#f59e0b';
    return '#3b82f6';
  });

  // ── Computed: Import state ───────────────────────────────────
  importIsProcessing = computed(() => this.importState() === 'uploading');
  importProgressText = computed(() => {
    const p = this.importProgress();
    return `Procesando ${p.excels} excels + ${p.totalImages} imágenes... (${p.imagesProcessed}/${p.totalImages} completadas)`;
  });
  importHasErrors = computed(() => this.importErrors().length > 0);
  canConfirmImport = computed(() => 
    this.importedTeams().length > 0 && 
    !this.importIsProcessing() && 
    this.importedTeams().every(team => team.isValid)
  );

  // ── Import helpers ───────────────────────────────────────────
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

  cancelImport(): void {
    // Limpiar blob URLs
    for (const url of this.blobUrls) {
      URL.revokeObjectURL(url);
    }
    this.blobUrls = [];
    
    // Reset state
    this.importedTeams.set([]);
    this.importState.set(null);
    this.importProgress.set({excels: 0, imagesProcessed: 0, totalImages: 0});
    this.importErrors.set([]);
    this.expectedImageFiles.set(new Map());
    this.matchedImages.set(new Map());
  }

  // ── Team expand ───────────────────────────────────────────────
  toggleTeam(id: number): void {
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
      id:             team.id,
      name:           team.name,
      shortname:      team.shortname,
      coachName:      team.coachName,
      coachPhone:     team.coachPhone,
      location:       team.location,
      foundedYear:    team.foundedYear,
      homeVenue:      team.homeVenue,
      primaryColor:   team.primaryColor,
      secondaryColor: team.secondaryColor,
      logoUrl:        team.logoUrl,
      documentUrl:    team.documentUrl,
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

    const uploadFormData = this.buildUploadFormData(f);
    this.logUploadFormData(uploadFormData);

    const filePayload = {
      teamName: f.name,
      logoFile: f.logoFile
        ? { name: f.logoFile.name, type: f.logoFile.type, size: f.logoFile.size }
        : null,
      documentFile: f.documentFile
        ? { name: f.documentFile.name, type: f.documentFile.type, size: f.documentFile.size }
        : null,
    };
    console.log('Team files payload (mock upload):', filePayload);

    if (f.id) {
      // Edit
      if (f.logoUrl?.startsWith('blob:')) this.blobUrls.push(f.logoUrl);
      if (f.documentUrl?.startsWith('blob:')) this.blobUrls.push(f.documentUrl);
      this.teams.update(list => list.map(t => t.id !== f.id ? t : {
        ...t, name: f.name, shortname: f.shortname, coachName: f.coachName,
        coachPhone: f.coachPhone, location: f.location,
        foundedYear: f.foundedYear, homeVenue: f.homeVenue,
        primaryColor: f.primaryColor, secondaryColor: f.secondaryColor,
        logoUrl: f.logoUrl, documentUrl: f.documentUrl,
      }));
      this.snackBar.open('Equipo actualizado', 'Cerrar', { duration: 2000 });
    } else {
      // Create
      const slug = f.name.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const newTeam: TeamItem = {
        id: _nextTeamId++, championshipId: 1, name: f.name, shortname: f.shortname,
        slug, logoUrl: f.logoUrl, documentUrl: f.documentUrl,
        primaryColor: f.primaryColor, secondaryColor: f.secondaryColor, location: f.location,
        foundedYear: f.foundedYear, homeVenue: f.homeVenue,
        coachName: f.coachName, coachPhone: f.coachPhone, isActive: true, players: [],
      };
      this.teams.update(list => [...list, newTeam]);
      this.snackBar.open(`Equipo "${f.name}" inscrito`, 'Cerrar', { duration: 2000 });
    }
    this.teamModal.set(null);
    this.dirty.emit();
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

  removeTeam(id: number, event: Event): void {
    event.stopPropagation();
    this.teams.update(list => list.filter(t => t.id !== id));
    this.expandedTeams.update(s => { const n = new Set(s); n.delete(id); return n; });
    this.snackBar.open('Equipo retirado del campeonato', 'Cerrar', { duration: 2000 });
    this.dirty.emit();
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
        id: player.id, teamId: player.teamId, positionId: player.positionId,
        firstName: player.firstName, lastName: player.lastName,
        nickName: player.nickName ?? '', number: player.number,
        birthDate: player.birthDate ?? '', height: player.height,
        weight: player.weight, status: player.status,
        photoUrl: player.photoUrl, photoFile: player.photoFile,
      },
    });
  }

  onPlayerSaved(data: PlayerFormData): void {
    this.teams.update(list => list.map(t => {
      if (t.id !== data.teamId) return t;
      const isEdit = !!data.id;
      const updated: TeamPlayer = {
        id: data.id ?? _nextPlayerId++, teamId: data.teamId, positionId: data.positionId,
        firstName: data.firstName, lastName: data.lastName, nickName: data.nickName || null,
        number: data.number!, birthDate: data.birthDate || null,
        height: data.height, weight: data.weight, status: data.status,
        photoUrl:  data.photoUrl  ?? null,
        photoFile: data.photoFile,
      };
      return {
        ...t, players: isEdit
          ? t.players.map(p => p.id === updated.id ? updated : p)
          : [...t.players, updated],
      };
    }));
    this.playerModal.set(null);
    this.dirty.emit();
  }

  onPlayerDeleted(playerId: number): void {
    this.teams.update(list => list.map(t => ({
      ...t, players: t.players.filter(p => p.id !== playerId),
    })));
    this.playerModal.set(null);
    this.snackBar.open('Jugador dado de baja', 'Cerrar', { duration: 2000 });
    this.dirty.emit();
  }

  // ── Position helpers ──────────────────────────────────────────
  positionLabel(positionId: number): string {
    return this.positions.find(p => p.id === positionId)?.label ?? '—';
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
      const expectedMap = new Map<string, {teamIdx: number; playerId?: number; isLogo: boolean}>();
      
      payloads.forEach((payload, teamIdx) => {
        // Logo esperado: "{nombreEquipo}_logo.*"
        const logoKey = `${payload.name}_logo`;
        expectedMap.set(logoKey, {teamIdx, isLogo: true});

        // Fotos de jugadores: "{nombreEquipo}_{numero}_{apellido}.*"
        payload.players.forEach((player, playerId) => {
          const photoKey = `${payload.name}_${player.number}_${player.lastName}`;
          expectedMap.set(photoKey, {teamIdx, playerId, isLogo: false});
        });
      });

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
    expectedMap: Map<string, {teamIdx: number; playerId?: number; isLogo: boolean}>
  ): void {
    let processedCount = 0;
    const matchedImgs = new Map<string, File>();
    const unmatchedErrors: Array<string> = [];

    // Procesar cada imagen
    imageFiles.forEach(file => {
      // Extraer nombre sin extensión
      const nameWithoutExt = file.name.split('.').slice(0, -1).join('.');
      const matched = expectedMap.get(nameWithoutExt);

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
          matchedImgs.set(nameWithoutExt, file);

          // Asignar a payload según tipo
          if (matched.isLogo) {
            this.importedTeams.update(teams => 
              teams.map((t, idx) => idx === matched.teamIdx ? {...t, logoFile: file} : t)
            );
          } else if (matched.playerId !== undefined) {
            this.importedTeams.update(teams => 
              teams.map((t, idx) => {
                if (idx !== matched.teamIdx) return t;
                return {
                  ...t,
                  players: t.players.map((p, pIdx) => 
                    pIdx === matched.playerId ? {...p, photoFile: file} : p
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
      this.importProgress.update(p => ({...p, imagesProcessed: processedCount}));
    });

    // Registrar errores de imágenes sin match
    unmatchedErrors.forEach(name => {
      this.importErrors.update(e => [...e, {
        type: 'image-not-found',
        file: name,
        message: 'No coincide con ningún equipo/jugador del Excel'
      }]);
    });

    // Drop zone deshabilitado: no se acepta más
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
        positionId: MOCK_POSITIONS.find(pos => pos.code === p.position)?.id ?? 1,
        birthDate: p.birthDate,
        height: p.height,
        weight: p.weight,
        status: 'active' as PlayerStatus,
        photoUrl: p.photoFile ? URL.createObjectURL(p.photoFile) : null,
        photoFile: p.photoFile || undefined,
      }));

      const logoUrl = payload.logoFile ? URL.createObjectURL(payload.logoFile) : null;
      const documentUrl = payload.documentFile ? URL.createObjectURL(payload.documentFile) : null;

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
      if (logoUrl) this.blobUrls.push(logoUrl);
      if (documentUrl) this.blobUrls.push(documentUrl);
      for (const player of newTeam.players) {
        if (player.photoUrl) this.blobUrls.push(player.photoUrl);
      }

      newTeams.push(newTeam);
    }

    // Agregar todos los equipos a la lista
    this.teams.update(t => [...t, ...newTeams]);

    // Limpiar estado
    this.cancelImport();
    this.snackBar.open(`${newTeams.length} equipo(s) importado(s) exitosamente`, 'Cerrar', { duration: 3000 });
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
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'plantilla_equipos.csv'; a.click();
    URL.revokeObjectURL(url);
  }
}