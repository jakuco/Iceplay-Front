// ─────────────────────────────────────────────────────────────
// player-modal.component.ts
// Modal reutilizable para crear y editar jugadores.
// Se abre desde championship-teams y desde la vista de partido.
// ─────────────────────────────────────────────────────────────

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { MatButtonModule } from '@angular/material/button';
import { ChampionshipService } from '@core/services/championship.service';
import { DbId, Position } from '@core/models';

// ─── Types ───────────────────────────────────────────────────

export interface PositionOption {
  id: number;
  code: string;
  label: string;
  abbreviation: string;
}

export interface PlayerFormData {
  /** Backend UUID o prefijo 'temp-' para jugadores locales. undefined = nuevo jugador. */
  id?: string;
  teamId: DbId;
  positionId: number;
  firstName: string;
  lastName: string;
  nickName: string;
  number: number | null;
  birthDate: string;  // YYYY-MM-DD
  height: number | null;
  weight: number | null;
  status: 'active' | 'suspended' | 'injured' | 'inactive';
  photoUrl?: string | null;  // URL persistida (viene del backend)
  photoFile?: File;           // transient — solo para upload/preview
}

// ⚠️ MOCK — reemplazar con GET /sports/:sportId/positions
export const MOCK_POSITIONS: PositionOption[] = [
  { id: 1, code: 'GK', label: 'Portero', abbreviation: 'POR' },
  { id: 2, code: 'DF', label: 'Defensa', abbreviation: 'DEF' },
  { id: 3, code: 'MF', label: 'Mediocampista', abbreviation: 'MED' },
  { id: 4, code: 'FW', label: 'Delantero', abbreviation: 'DEL' },
];

const DEFAULT_FORM = (teamId: DbId): PlayerFormData => ({
  teamId,
  positionId: 1,
  firstName: '',
  lastName: '',
  nickName: '',
  number: null,
  birthDate: '',
  height: null,
  weight: null,
  status: 'active',
  photoUrl: null,
});

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-player-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatIconModule, MatButtonModule],
  template: `
<!-- Backdrop -->
<div
  class="fixed inset-0 z-[200] flex items-center justify-center p-4"
  style="background: rgba(0,0,0,0.45);"
  (click)="onBackdropClick($event)"
>
  <!-- Modal panel -->
  <div
    class="relative w-full max-w-[520px] rounded-2xl bg-[var(--mat-sys-surface-container)] shadow-2xl flex flex-col
           max-h-[90vh] overflow-hidden"
    (click)="$event.stopPropagation()"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--mat-sys-outline-variant)]">
      <div>
        <h2 class="text-[16px] font-bold text-[var(--mat-sys-on-surface)] m-0">
          {{ isEdit() ? 'Editar Jugador' : 'Inscribir Jugador' }}
        </h2>
        <p class="text-[12px] text-[var(--mat-sys-on-surface-variant)] m-0 mt-0.5">
          {{ isEdit() ? 'Modifica los datos del jugador' : 'Agrega un nuevo jugador al equipo' }}
        </p>
      </div>
      <button
        matIconButton
        (click)="dismiss.emit()"
        type="button"
        aria-label="Cerrar"
      >
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <!-- Body -->
    <div class="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

      <!-- Foto del jugador -->
      <div class="flex items-center gap-4">
        <button
          class="size-16 rounded-full flex items-center justify-center text-white
                 shrink-0 cursor-pointer relative overflow-hidden group border-none p-0
                 bg-[var(--mat-sys-surface-container-high)]"
          type="button"
          (click)="photoInput.click()"
          [attr.aria-label]="photoUrl() ? 'Cambiar foto del jugador' : 'Subir foto del jugador'"
        >
          @if (photoUrl()) {
            <img [src]="photoUrl()!" class="w-full h-full object-cover" alt="Foto del jugador" />
          } @else {
            <mat-icon class="!size-8 !text-[32px] text-[var(--mat-sys-on-surface-variant)]">person</mat-icon>
          }
          <div class="absolute inset-0 bg-black/50 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <mat-icon class="!size-5 !text-[20px] text-white">photo_camera</mat-icon>
          </div>
        </button>
        <input
          #photoInput
          type="file"
          accept="image/*"
          class="sr-only"
          (change)="onPhotoSelected($event)"
          aria-hidden="true"
        />
        <div>
          <p class="m-0 text-[13px] font-medium text-[var(--mat-sys-on-surface)]">Foto del jugador</p>
          <p class="m-0 mt-0.5 text-[11.5px] text-[var(--mat-sys-on-surface-variant)]">
            {{ photoUrl() ? 'Haz clic para cambiarla' : 'Haz clic para subir una foto (opcional)' }}
          </p>
        </div>
      </div>

      <!-- Row: Nombre + Apellido -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            Nombre <span class="text-red-400">*</span>
          </label>
          <input
            class="px-3 py-2 border border-[var(--mat-sys-outline-variant)] rounded-lg text-[14px] text-[var(--mat-sys-on-surface)]
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-[var(--mat-sys-surface-container)]"
            [(ngModel)]="form.firstName"
            placeholder="Ej: Juan"
            maxlength="50"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            Apellido <span class="text-red-400">*</span>
          </label>
          <input
            class="px-3 py-2 border border-[var(--mat-sys-outline-variant)] rounded-lg text-[14px] text-[var(--mat-sys-on-surface)]
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-[var(--mat-sys-surface-container)]"
            [(ngModel)]="form.lastName"
            placeholder="Ej: García"
            maxlength="50"
          />
        </div>
      </div>

      <!-- Row: Apodo + Número -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            Apodo <span class="text-[var(--mat-sys-outline)] font-normal normal-case text-[11px]">(opcional)</span>
          </label>
          <input
            class="px-3 py-2 border border-[var(--mat-sys-outline-variant)] rounded-lg text-[14px] text-[var(--mat-sys-on-surface)]
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-[var(--mat-sys-surface-container)]"
            [(ngModel)]="form.nickName"
            placeholder="Ej: Juancho"
            maxlength="30"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            N° Camiseta <span class="text-red-400">*</span>
          </label>
          <input
            class="px-3 py-2 border border-[var(--mat-sys-outline-variant)] rounded-lg text-[14px] text-[var(--mat-sys-on-surface)]
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-[var(--mat-sys-surface-container)]"
            type="number"
            [(ngModel)]="form.number"
            placeholder="Ej: 10"
            min="0" max="99"
          />
        </div>
      </div>

      <!-- Row: Posición + Fecha de nacimiento -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            Posición <span class="text-red-400">*</span>
          </label>
          <select
            class="px-3 py-2 border border-[var(--mat-sys-outline-variant)] rounded-lg text-[14px] text-[var(--mat-sys-on-surface)]
                   outline-none cursor-pointer focus:border-blue-400 focus:ring-2
                   focus:ring-blue-400/10 transition-all bg-[var(--mat-sys-surface-container)]"
            [(ngModel)]="form.positionId"
          >
            @for (pos of positions(); track pos.id) {
              <option [ngValue]="pos.id">{{ pos.label }} ({{ pos.abbreviation }})</option>
            }
          </select>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            Fecha de Nacimiento
          </label>
          <input
            class="px-3 py-2 border border-[var(--mat-sys-outline-variant)] rounded-lg text-[14px] text-[var(--mat-sys-on-surface)]
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-[var(--mat-sys-surface-container)]"
            type="date"
            [(ngModel)]="form.birthDate"
          />
        </div>
      </div>

      <!-- Row: Altura + Peso -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            Altura <span class="text-[var(--mat-sys-outline)] font-normal normal-case text-[11px]">(cm)</span>
          </label>
          <input
            class="px-3 py-2 border border-[var(--mat-sys-outline-variant)] rounded-lg text-[14px] text-[var(--mat-sys-on-surface)]
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-[var(--mat-sys-surface-container)]"
            type="number"
            [(ngModel)]="form.height"
            placeholder="Ej: 175"
            min="100" max="230"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            Peso <span class="text-[var(--mat-sys-outline)] font-normal normal-case text-[11px]">(kg)</span>
          </label>
          <input
            class="px-3 py-2 border border-[var(--mat-sys-outline-variant)] rounded-lg text-[14px] text-[var(--mat-sys-on-surface)]
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-[var(--mat-sys-surface-container)]"
            type="number"
            [(ngModel)]="form.weight"
            placeholder="Ej: 70"
            min="40" max="150"
          />
        </div>
      </div>

      <!-- Estado (solo en edición) -->
      @if (isEdit()) {
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide">
            Estado
          </label>
          <select
            class="px-3 py-2 border border-[var(--mat-sys-outline-variant)] rounded-lg text-[14px] text-[var(--mat-sys-on-surface)]
                   outline-none cursor-pointer focus:border-blue-400 transition-all bg-[var(--mat-sys-surface-container)]"
            [(ngModel)]="form.status"
          >
            <option value="active">Activo</option>
            <option value="suspended">Suspendido</option>
            <option value="injured">Lesionado</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>
      }

      <!-- Validation error -->
      @if (showErrors() && !isValid) {
        <div class="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200
                    px-3 py-2.5 text-[12.5px] text-red-600">
          <mat-icon class="!size-4 !text-[16px] shrink-0">error_outline</mat-icon>
          Completa nombre, apellido y número de camiseta.
        </div>
      }

    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between px-6 py-4 border-t border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface-container-low)]">
      @if (isEdit()) {
        <button
          matButton
          class="text-red-500"
          (click)="onDelete()"
          type="button"
        >
          <mat-icon>delete</mat-icon>
          Dar de baja
        </button>
      } @else {
        <div></div>
      }
      <div class="flex gap-2.5">
        <button matButton="outlined" (click)="dismiss.emit()" type="button">Cancelar</button>
        <button matButton="filled" (click)="onSubmit()" type="button">
          <mat-icon>{{ isEdit() ? 'save' : 'person_add' }}</mat-icon>
          {{ isEdit() ? 'Guardar cambios' : 'Inscribir jugador' }}
        </button>
      </div>
    </div>
  </div>
</div>
  `,
})
export class PlayerModalComponent implements OnInit {

  // ── Inputs ────────────────────────────────────────────────────
  /** Si se pasa un jugador existente → modo edición. Si no → modo creación. */
  readonly player = input<PlayerFormData | null>(null);
  readonly teamId = input.required<DbId>();

  // ── Outputs ───────────────────────────────────────────────────
  readonly saved = output<PlayerFormData>();
  readonly deleted = output<{ id: string | undefined }>();
  readonly dismiss = output<void>();

  // ── Services ──────────────────────────────────────────────────
  private cdr = inject(ChangeDetectorRef);
  private championshipSvc = inject(ChampionshipService);

  // ── State ─────────────────────────────────────────────────────
  form: PlayerFormData = DEFAULT_FORM(0);
  showErrors = signal(false);
  photoUrl = signal<string | null>(null);

  isEdit = computed(() => !!this.player()?.id);

  positions = signal<Position[]>(this.championshipSvc.positions());

  get isValid(): boolean {
    return (
      this.form.firstName.trim().length > 0 &&
      this.form.lastName.trim().length > 0 &&
      this.form.number !== null
    );
  }

  // ── Lifecycle ─────────────────────────────────────────────────
  ngOnInit(): void {
    const p = this.player();
    this.form = p ? { ...p } : DEFAULT_FORM(this.teamId());
    this.photoUrl.set(this.form.photoUrl ?? null);
  }

  // ── Actions ───────────────────────────────────────────────────
  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.form.photoFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.photoUrl.set(e.target?.result as string);
      this.form.photoUrl = this.photoUrl();
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    this.showErrors.set(true);
    if (!this.isValid) return;
    this.saved.emit({ ...this.form, photoUrl: this.photoUrl() });
  }

  onDelete(): void {
    this.deleted.emit({ id: this.form.id });
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as Element) === e.currentTarget) this.dismiss.emit();
  }
}
