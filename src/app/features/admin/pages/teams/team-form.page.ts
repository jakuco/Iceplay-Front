import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamService } from '../../../../core/services/team.service';
import { ChampionshipService } from '../../../../core/services/championship.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Championship } from '../../../../core/models/championship.model';
import { UpdateTeamApiDto } from '../../../../core/models/team.model';

@Component({
  selector: 'app-team-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/admin/teams">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <h1 class="page-title">{{ isEditMode() ? 'Editar Equipo' : 'Nuevo Equipo' }}</h1>
        </div>
      </header>

      @if (isLoading()) {
        <div class="content-card">
          <p class="text-secondary text-center py-8">Cargando...</p>
        </div>
      } @else {
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-card">
          <div class="form-section">
            <h2 class="section-title">Información General</h2>

            <div class="form-grid">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Campeonato</mat-label>
                <mat-select formControlName="championshipId">
                  @for (champ of championships(); track champ.id) {
                    <mat-option [value]="champ.id">{{ champ.name }}</mat-option>
                  }
                </mat-select>
                @if (form.controls.championshipId.hasError('required')) {
                  <mat-error>Selecciona un campeonato</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Nombre del Equipo</mat-label>
                <input matInput formControlName="name" placeholder="Ej: Los Rayos FC" />
                @if (form.controls.name.hasError('required')) {
                  <mat-error>El nombre es requerido</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Nombre Corto</mat-label>
                <input matInput formControlName="shortname" placeholder="Ej: RAY" maxlength="5" />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Ubicación / Ciudad</mat-label>
                <input matInput formControlName="location" placeholder="Ej: Quito" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>URL del Logo</mat-label>
                <input matInput formControlName="logoUrl" placeholder="https://..." type="url" />
              </mat-form-field>
            </div>
          </div>

          <div class="form-section">
            <h2 class="section-title">Información del Entrenador</h2>

            <div class="form-grid">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Nombre del Entrenador</mat-label>
                <input matInput formControlName="coachName" placeholder="Ej: Carlos Pérez" />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Teléfono del Entrenador</mat-label>
                <input matInput formControlName="coachPhone" placeholder="+593..." />
              </mat-form-field>
            </div>
          </div>

          <div class="form-actions">
            <button matButton="outlined" type="button" routerLink="/admin/teams">Cancelar</button>
            <button matButton="filled" type="submit" [disabled]="form.invalid || isSaving()">
              <mat-icon>save</mat-icon>
              {{ isEditMode() ? 'Guardar Cambios' : 'Crear Equipo' }}
            </button>
          </div>
        </form>
      }
    </div>
  `,
  styles: `
    .page-container {
      padding: 1.5rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .page-header {
      margin-bottom: 1.5rem;
    }
    .page-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
    .content-card {
      background: var(--mat-sys-surface-container);
      border-radius: 12px;
      padding: 2rem;
    }
    .form-card {
      background: var(--mat-sys-surface-container);
      border-radius: 12px;
      padding: 1.5rem;
    }
    .form-section {
      margin-bottom: 2rem;
      &:last-of-type { margin-bottom: 0; }
    }
    .section-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 1rem;
      color: var(--mat-sys-primary);
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      @media (max-width: 600px) { grid-template-columns: 1fr; }
    }
    .full-width { grid-column: 1 / -1; }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--mat-sys-outline-variant);
      margin-top: 1.5rem;
    }
  `,
})
export default class TeamFormPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private teamService = inject(TeamService);
  private championshipService = inject(ChampionshipService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  championships = signal<Championship[]>([]);
  isLoading = signal(false);
  isSaving = signal(false);
  isEditMode = signal(false);
  teamId = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    championshipId: ['', Validators.required],
    name:           ['', [Validators.required, Validators.minLength(3)]],
    shortname:      [''],
    location:       [''],
    logoUrl:        [''],
    coachName:      [''],
    coachPhone:     [''],
  });

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      if (user?.organizationId) {
        this.loadChampionships(String(user.organizationId));
      }
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.teamId.set(id);
      this.loadTeam(id);
    }
  }

  private loadChampionships(organizationId: string): void {
    this.championshipService.getAllChampionships().subscribe({
      next: (championships: Championship[]) => {
        this.championships.set(
          championships.filter((c: Championship) =>
            String(c.organizationId) === organizationId &&
            ['active', 'registration', 'draft'].includes(String(c.status))
          )
        );
      },
      error: (err: any) => console.error('Error loading championships', err),
    });
  }

  private loadTeam(id: string): void {
    this.isLoading.set(true);
    this.teamService.getTeamById(id).subscribe({
      next: (team) => {
        this.form.patchValue({
          championshipId: String(team.championshipId),
          name:           team.name,
          shortname:      team.shortname ?? '',
          location:       team.location ?? '',
          logoUrl:        team.logoUrl ?? '',
          coachName:      team.coachName ?? '',
          coachPhone:     team.coachPhone ?? '',
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading team', err);
        this.isLoading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isSaving.set(true);

    const { championshipId, ...rest } = this.form.getRawValue();

    if (this.isEditMode() && this.teamId()) {
      const updateData: UpdateTeamApiDto = { ...rest };
      this.teamService.updateTeam(this.teamId()!, updateData).subscribe({
        next: () => this.router.navigate(['/admin/teams']),
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error al actualizar el equipo', 'Cerrar', { duration: 3000 });
          this.isSaving.set(false);
        },
      });
    } else {
      this.teamService.createTeam({ ...rest, championshipId }).subscribe({
        next: () => this.router.navigate(['/admin/teams']),
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error al crear el equipo', 'Cerrar', { duration: 3000 });
          this.isSaving.set(false);
        },
      });
    }
  }
}
