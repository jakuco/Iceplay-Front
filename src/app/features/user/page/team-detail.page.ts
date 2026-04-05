// ─────────────────────────────────────────────────────────────
// user/page/team-detail.page.ts
//
// ESTADO: MOCK-ONLY — pendiente de integración real con backend.
//
// Este componente NO hace llamadas reales al backend.
// Todos los datos (equipo, jugadores, partidos) son generados con mock data
// en loadTeamDetail(), loadPlayers(), loadMatches().
//
// Clasificación (Fase 2E):
//   · Categoría: mock-only / pendiente de integración
//   · No bloquea el build ni el runtime
//   · No mezclar con el flujo admin (admin/pages/teams/team-detail.page.ts)
//   · Pendiente: conectar al backend cuando los endpoints de filtro sean funcionales
//
// Dependencias que NO están confirmadas en backend:
//   · GET /player?teamId=    → controller ignora teamId
//   · GET /team/:id/players  → no existe en routes.ts
//   · GET /match?teamId=     → no confirmado
// ─────────────────────────────────────────────────────────────
import { ChangeDetectionStrategy, Component, input, inject, signal, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TeamService } from '../../../core/services/team.service';
import { PlayerService } from '../../../core/services/player.service';
import { Team } from '../../../core/models/team.model';
import { Player, PlayerStatus } from '../../../core/models/player.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatchService } from '../../../core/services/match.service';

/** Fila de tabla de partidos (mock enriquecido; no coincide con `Match` del dominio). */
interface UserMatchTableRow {
  id: string;
  championshipId: string;
  homeTeam: { name: string };
  awayTeam: { name: string };
  homeScore: number;
  awayScore: number;
  status: string;
  scheduledDate: Date;
  scheduledTime: string;
  venue?: string;
}

@Component({
  selector: 'app-team-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    MatTabsModule,
  ],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/matches">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <h1 class="page-title">Detalle del Equipo</h1>
        </div>
      </header>

      @if (isLoading()) {
        <div class="content-card">
          <p class="text-secondary py-8 text-center">Cargando...</p>
        </div>
      } @else if (team(); as t) {
        <!-- Team Header Card -->
        <div class="team-header-card" [style.background]="'var(--mat-sys-surface-container)'">
          <div class="team-header-content">
            <div class="team-logo">
              @if (t.logoUrl) {
                <img [src]="t.logoUrl" [alt]="t.name + ' Logo'" />
              } @else {
                <div class="team-avatar">{{ t.shortname }}</div>
              }
            </div>
            <div class="team-info">
              <h2 class="team-name text-primary">{{ t.name }}</h2>
            </div>
          </div>
        </div>

        <!-- Team Information Card -->
        <div class="tab-content">
          <div class="info-grid">
            <div class="info-card">
              <h3 class="info-title">Información General</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-label">Nombre:</span>
                  <span class="info-value">{{ t.name }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Nombre Corto:</span>
                  <span class="info-value">{{ t.shortname }}</span>
                </div>
                @if (t.location) {
                  <div class="info-item">
                    <span class="info-label">Ciudad:</span>
                    <span class="info-value">{{ t.location }}</span>
                  </div>
                }
                @if (t.homeVenue) {
                  <div class="info-item">
                    <span class="info-label">Estadio:</span>
                    <span class="info-value">{{ t.homeVenue }}</span>
                  </div>
                }
                @if (t.foundedYear) {
                  <div class="info-item">
                    <span class="info-label">Año de Fundación:</span>
                    <span class="info-value">{{ t.foundedYear }}</span>
                  </div>
                }
              </div>
            </div>

            @if (t.coachName || t.coachPhone) {
              <div class="info-card">
                <h3 class="info-title">Entrenador</h3>
                <div class="info-list">
                  @if (t.coachName) {
                    <div class="info-item">
                      <span class="info-label">Nombre:</span>
                      <span class="info-value">{{ t.coachName }}</span>
                    </div>
                  }
                  @if (t.coachPhone) {
                    <div class="info-item">
                      <span class="info-label">Teléfono:</span>
                      <span class="info-value">{{ t.coachPhone }}</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Team Tabs -->
        <mat-tab-group>
          <!-- Team Partidos Tab -->
          <mat-tab label="Partidos">
            @if (isLoading()) {
              <div class="content-card">
                <p class="text-secondary py-8 text-center">Cargando partidos...</p>
              </div>
            } @else {
              <div class="tab-content">
                @if (matches().length > 0) {
                  <table mat-table [dataSource]="matches()" class="w-full">
                    <ng-container matColumnDef="championship">
                      <th mat-header-cell *matHeaderCellDef>Campeonato</th>
                      <td mat-cell *matCellDef="let match">{{ match.championshipId }}</td>
                    </ng-container>

                    <ng-container matColumnDef="teams">
                      <th mat-header-cell *matHeaderCellDef>Partido</th>
                      <td mat-cell *matCellDef="let match">
                        <div class="match-info">
                          <div class="team-info">
                            <span class="team-name-matches">{{ match.homeTeam.name }}</span>
                            @if (match.status === 'live' || match.status === 'finished') {
                              <span class="score">{{ match.homeScore }}</span>
                            }
                          </div>
                          <span class="vs">vs</span>
                          <div class="team-info">
                            @if (match.status === 'live' || match.status === 'finished') {
                              <span class="score">{{ match.awayScore }}</span>
                            }
                            <span class="team-name-matches">{{ match.awayTeam.name }}</span>
                          </div>
                        </div>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="date">
                      <th mat-header-cell *matHeaderCellDef>Fecha y Hora</th>
                      <td mat-cell *matCellDef="let match">
                        <div class="date-info">
                          <span>{{ formatDate(match.scheduledDate) }}</span>
                          <span class="time">{{ match.scheduledTime }}</span>
                        </div>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="venue">
                      <th mat-header-cell *matHeaderCellDef>Lugar</th>
                      <td mat-cell *matCellDef="let match">{{ match.venue || 'N/A' }}</td>
                    </ng-container>

                    <ng-container matColumnDef="status">
                      <th mat-header-cell *matHeaderCellDef>Estado</th>
                      <td mat-cell *matCellDef="let match">
                        <mat-chip [class]="'status-' + match.status">
                          {{ getStatusLabel(match.status) }}
                        </mat-chip>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="actions">
                      <th mat-header-cell *matHeaderCellDef></th>
                      <td mat-cell *matCellDef="let match">
                        <button matIconButton [routerLink]="['/match', match.id]">
                          <mat-icon>info</mat-icon>
                        </button>
                      </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumnsMatches"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumnsMatches"></tr>
                  </table>
                } @else {
                  <div class="empty-state">
                    <mat-icon>sports_soccer</mat-icon>
                    <h3>No hay partidos</h3>
                    <p>No se encontraron partidos con los filtros seleccionados</p>
                  </div>
                }
              </div>
            }
          </mat-tab>

          <!-- Team Players Tab -->
          <mat-tab label="Jugadores">
            <div class="tab-content">
              @if (players().length > 0) {
                <table mat-table [dataSource]="players()" class="w-full">
                  <ng-container matColumnDef="number">
                    <th mat-header-cell *matHeaderCellDef>#</th>
                    <td mat-cell *matCellDef="let player">{{ player.number }}</td>
                  </ng-container>

                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Nombre</th>
                    <td mat-cell *matCellDef="let player">{{ playerRowName(player) }}</td>
                  </ng-container>

                  <ng-container matColumnDef="position">
                    <th mat-header-cell *matHeaderCellDef>Posición</th>
                    <td mat-cell *matCellDef="let player">{{ playerRowPosition(player) }}</td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Estado</th>
                    <td mat-cell *matCellDef="let player">
                      <mat-chip [class]="'status-' + (player.status || 'active')">
                        {{ getStatusLabel(player.status) }}
                      </mat-chip>
                    </td>
                  </ng-container>

                  <!-- TODO: detalle del jugador -->
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let player">
                      <button matIconButton [matMenuTriggerFor]="menu">
                        <mat-icon>info</mat-icon>
                      </button>
                      <mat-menu #menu="matMenu"> </mat-menu>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
                </table>
              } @else {
                <div class="empty-state">
                  <mat-icon>person_off</mat-icon>
                  <h3>No hay jugadores</h3>
                  <p>Agrega jugadores a este equipo</p>
                </div>
              }
            </div>
          </mat-tab>
        </mat-tab-group>
      } @else {
        <div class="content-card">
          <p class="text-secondary py-8 text-center">Equipo no encontrado</p>
        </div>
      }
    </div>
  `,
  styles: `
    .page-container {
      padding: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
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
    .team-header-card {
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 1.5rem;
      color: var(--mat-sys-on-surface);
      background-color: var(--mat-sys-surface-container);
    }
    .team-header-content {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .team-logo img {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.9);
    }
    .team-avatar {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.9);
      color: #1f2937;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.5rem;
    }
    .team-name {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0;
    }
    .team-short-name {
      font-size: 1rem;
      opacity: 0.9;
      margin: 0.25rem 0;
    }
    .team-city {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.5rem 0 0;
      opacity: 0.9;
    }
    .tab-content {
      padding: 1.5rem 0;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .info-card {
      background: var(--mat-sys-surface-container);
      border-radius: 12px;
      padding: 1.5rem;
    }
    .info-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 1rem;
      color: var(--mat-sys-primary);
    }
    .info-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .info-item {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
    .info-label {
      font-weight: 500;
      color: var(--mat-sys-on-surface-variant);
    }
    .info-value {
      text-align: right;
    }
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: var(--mat-sys-outline);
        margin-bottom: 1rem;
      }
      h3 {
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
      }
      p {
        color: var(--mat-sys-on-surface-variant);
        margin: 0 0 1.5rem;
      }
    }
    .match-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .team-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .team-name-matches {
      font-weight: 500;
    }
    .score {
      font-weight: 700;
      font-size: 1.125rem;
      color: var(--mat-sys-primary);
    }
    .vs {
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.875rem;
    }
    .date-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .time {
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.875rem;
    }
  `,
})
export default class TeamDetailPage {
  id = input.required<string>();

  private teamService = inject(TeamService);
  private matchService = inject(MatchService);

  team = signal<Team | null>(null);
  players = signal<Player[]>([]);
  matches = signal<UserMatchTableRow[]>([]);
  isLoading = signal(false);
  displayedColumns = ['number', 'name', 'position', 'status', 'actions'];
  displayedColumnsMatches = ['championship', 'teams', 'date', 'venue', 'status', 'actions'];

  constructor() {
    effect(() => {
      const teamId = this.id();
      if (teamId) {
        this.loadTeam(teamId);
        this.loadMatches(teamId);
      }
    });
  }

  private loadTeam(id: string): void {
    this.isLoading.set(true);

    // this.teamService.getTeamWithPlayers(id).subscribe({
    //   next: (teamWithPlayers) => {
    //     this.team.set(teamWithPlayers);
    //     this.players.set(teamWithPlayers.players);
    //     this.isLoading.set(false);
    //   },
    //   error: (error) => {
    //     console.error('Error loading team', error);
    //     this.isLoading.set(false);
    //   },
    // });

    const mockTeam: Team = {
      id: 1,
      championshipId: 1,
      name: 'Team 1',
      shortname: 'T1',
      slug: 'team-1',
      logoUrl: null,
      documentUrl: null,
      primaryColor: '#1a237e',
      secondaryColor: null,
      foundedYear: 2020,
      homeVenue: 'Venue 1',
      location: 'City 1',
      coachName: null,
      coachPhone: null,
      isActive: true,
      hasActiveMatches: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const positions = ['Delantero', 'Mediocampista', 'Defensa', 'Portero'];
    const mockPlayers: Player[] = Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      teamId: '1',
      positionId: 1,
      photoUrl: null,
      firstName: 'Jugador',
      lastName: String(i + 1),
      nickName: null,
      birthDate: new Date('2000-01-01'),
      number: i + 1,
      height: null,
      weight: null,
      status: PlayerStatus.Active,
      suspensionEndDate: null,
      suspensionReason: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      position: {
        id: 1,
        code: 'FW',
        label: positions[i % 4],
        abbreviation: 'JUG',
      },
    }));

    setTimeout(() => {
      this.team.set(mockTeam);
      this.players.set(mockPlayers);
      this.isLoading.set(false);
    }, 2000);
  }

  private loadMatches(id: string): void {
    this.isLoading.set(true);
    const mockMatches: UserMatchTableRow[] = [
      {
        id: 'match-1',
        championshipId: 'champ-1',
        homeTeam: { name: 'Team 1' },
        awayTeam: { name: 'Team 2' },
        homeScore: 2,
        awayScore: 1,
        status: 'finished',
        scheduledDate: new Date('2024-08-01'),
        scheduledTime: '18:00',
        venue: 'Estadio Monumental',
      },
      {
        id: 'match-2',
        championshipId: 'champ-1',
        homeTeam: { name: 'Team 1' },
        awayTeam: { name: 'Team 3' },
        homeScore: 1,
        awayScore: 3,
        status: 'finished',
        scheduledDate: new Date('2024-08-02'),
        scheduledTime: '20:00',
        venue: 'Estadio Capwell',
      },
      {
        id: 'match-3',
        championshipId: 'champ-1',
        homeTeam: { name: 'Team 1' },
        awayTeam: { name: 'Team 3' },
        homeScore: 1,
        awayScore: 3,
        status: 'finished',
        scheduledDate: new Date('2024-08-03'),
        scheduledTime: '20:00',
        venue: 'Estadio Capwell',
      },
    ];

    setTimeout(() => {
      this.matches.set(mockMatches);
      this.isLoading.set(false);
    }, 2000);

    // this.matchService.getMatches(id).subscribe({
    //   next: (matches) => {
    //     this.matches.set(matches);
    //     this.isLoading.set(false);
    //   },
    //   error: (error: any) => {
    //     console.error('Error loading matches', error);
    //     this.isLoading.set(false);
    //   },
    // });
  }

  playerRowName(p: Player): string {
    return `${p.firstName} ${p.lastName}`.trim();
  }

  playerRowPosition(p: Player): string {
    // TODO: Player.position (legacy) no existe en PlayerApiResponse.
    // Actualmente funciona sólo con mock data que incluye position.label.
    // Al migrar a PlayerApiResponse, reemplazar con: String(p.positionId ?? '—')
    return (p as any).position?.label ?? String(p.positionId ?? '—');
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      active: 'Activo',
      injured: 'Lesionado',
      suspended: 'Suspendido',
      inactive: 'Inactivo',
      scheduled: 'Programado',
      live: 'En vivo',
      finished: 'Finalizado',
      warmup: 'Calentamiento',
      halftime: 'Descanso',
      cancelled: 'Cancelado',
      postponed: 'Aplazado',
    };
    return labels[status] || status;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}
