import { ChangeDetectionStrategy, Component, input, inject, signal, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TeamService } from '../../../core/services/team.service';
import { PlayerService } from '../../../core/services/player.service';
import { Team } from '../../../core/models/team.model';
import { Player } from '../../../core/models/player.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { Match } from '../../../core/models/match.model';
import { MatchService } from '../../../core/services/match.service';

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
        <div class="team-header-card" [style.background]="t.primaryColor">
          <div class="team-header-content">
            <div class="team-logo">
              @if (t.logo) {
                <img [src]="t.logo" [alt]="t.name + ' Logo'" />
              } @else {
                <div class="team-avatar">{{ t.shortName }}</div>
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
                  <span class="info-value">{{ t.shortName }}</span>
                </div>
                @if (t.city) {
                  <div class="info-item">
                    <span class="info-label">Ciudad:</span>
                    <span class="info-value">{{ t.city }}</span>
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

            @if (t.managerName || t.managerPhone || t.managerEmail) {
              <div class="info-card">
                <h3 class="info-title">Entrenador</h3>
                <div class="info-list">
                  @if (t.managerName) {
                    <div class="info-item">
                      <span class="info-label">Nombre:</span>
                      <span class="info-value">{{ t.managerName }}</span>
                    </div>
                  }
                  @if (t.managerPhone) {
                    <div class="info-item">
                      <span class="info-label">Teléfono:</span>
                      <span class="info-value">{{ t.managerPhone }}</span>
                    </div>
                  }
                  @if (t.managerEmail) {
                    <div class="info-item">
                      <span class="info-label">Email:</span>
                      <span class="info-value">{{ t.managerEmail }}</span>
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
                    <td mat-cell *matCellDef="let player">{{ player.fullName }}</td>
                  </ng-container>

                  <ng-container matColumnDef="position">
                    <th mat-header-cell *matHeaderCellDef>Posición</th>
                    <td mat-cell *matCellDef="let player">{{ player.position }}</td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Estado</th>
                    <td mat-cell *matCellDef="let player">
                      <mat-chip [class]="'status-' + (player.status || 'active')">
                        {{ getStatusLabel(player.status) }}
                      </mat-chip>
                    </td>
                  </ng-container>

                  //TODO: To show the player details
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
  matches = signal<Match[]>([]);
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

    //TODO: Using  mock data for now
    const mockTeam = {
      id: '1',
      name: 'Team 1',
      shortName: 'T1',
      city: 'City 1',
      homeVenue: 'Venue 1',
      foundedYear: 2020,
    };
    const mockPlayers = [
      {
        id: '1',
        number: 1,
        fullName: 'Player 1',
        position: 'Forward',
        status: 'active',
      },
      {
        id: '2',
        number: 2,
        fullName: 'Player 2',
        position: 'Midfielder',
        status: 'active',
      },
      {
        id: '3',
        number: 3,
        fullName: 'Player 3',
        position: 'Defender',
        status: 'active',
      },
      {
        id: '4',
        number: 4,
        fullName: 'Player 4',
        position: 'Goalkeeper',
        status: 'active',
      },
      {
        id: '5',
        number: 5,
        fullName: 'Player 5',
        position: 'Forward',
        status: 'active',
      },
      {
        id: '6',
        number: 6,
        fullName: 'Player 6',
        position: 'Midfielder',
        status: 'active',
      },
      {
        id: '7',
        number: 7,
        fullName: 'Player 7',
        position: 'Defender',
        status: 'active',
      },
      {
        id: '8',
        number: 8,
        fullName: 'Player 8',
        position: 'Goalkeeper',
        status: 'active',
      },
      {
        id: '9',
        number: 9,
        fullName: 'Player 9',
        position: 'Forward',
        status: 'active',
      },
      {
        id: '10',
        number: 10,
        fullName: 'Player 10',
        position: 'Midfielder',
        status: 'active',
      },
    ];

    setTimeout(() => {
      this.team.set(mockTeam as unknown as Team);
      this.players.set(mockPlayers as unknown as Player[]);
      this.isLoading.set(false);
    }, 2000);
  }

  private loadMatches(id: string): void {
    this.isLoading.set(true);
    const mockTeamHome = {
      id: '1',
      name: 'Team 1',
      shortName: 'T1',
      logo: 'https://api.sofascore.app/api/v1/team/1/image',
      primaryColor: '#1a237e',
    };
    const mockTeamAway = {
      id: '2',
      name: 'Team 2',
      shortName: 'T2',
      logo: 'https://api.sofascore.app/api/v1/team/2/image',
      primaryColor: '#b71c1c',
    };
    // The mockMatches structure is currently a two-dimensional array and uses MongoDB style entities (ObjectId(), ISODate(), etc).
    // We'll replace it with a correct, simple array of objects using primitive types, and structure the objects so they match the Match model and your rendering template.

    // For demonstration, uses mockTeamHome and mockTeamAway as teams, and provides realistic fields.

    const mockMatches: Partial<Match>[] = [
      {
        id: 'match-1',
        championshipId: 'champ-1',
        organizationId: 'org-1',
        homeTeam: mockTeamHome,
        awayTeam: mockTeamAway,
        homeScore: 2,
        awayScore: 1,
        status: 'finished',
        round: 1,
        matchday: 1,
        scheduledDate: new Date('2024-08-01'),
        scheduledTime: '18:00',
        venue: 'Estadio Monumental',
        city: 'Guayaquil',
        currentPeriod: 2,
        elapsedSeconds: 5400,
        isClockRunning: false,
        periodScores: [
          { period: 1, homeScore: 2, awayScore: 0 },
          { period: 2, homeScore: 0, awayScore: 1 },
        ],
        isHighlighted: false,
        createdAt: new Date('2024-02-12T04:03:36.228Z'),
        updatedAt: new Date('2024-02-12T04:03:36.233Z'),
      },
      {
        id: 'match-2',
        championshipId: 'champ-1',
        organizationId: 'org-1',
        homeTeam: mockTeamHome,
        awayTeam: {
          ...mockTeamAway,
          id: '3',
          name: 'Team 3',
          shortName: 'T3',
          logo: 'https://api.sofascore.app/api/v1/team/3/image',
          primaryColor: '#388e3c',
        },
        homeScore: 1,
        awayScore: 3,
        status: 'finished',
        round: 1,
        matchday: 2,
        scheduledDate: new Date('2024-08-02'),
        scheduledTime: '20:00',
        venue: 'Estadio Capwell',
        city: 'Guayaquil',
        currentPeriod: 2,
        elapsedSeconds: 5400,
        isClockRunning: false,
        periodScores: [
          { period: 1, homeScore: 0, awayScore: 2 },
          { period: 2, homeScore: 1, awayScore: 1 },
        ],
        isHighlighted: false,
        createdAt: new Date('2024-02-12T04:03:36.228Z'),
        updatedAt: new Date('2024-02-12T04:03:36.234Z'),
      },
      {
        id: 'match-2',
        championshipId: 'champ-1',
        organizationId: 'org-1',
        homeTeam: mockTeamHome,
        awayTeam: {
          ...mockTeamAway,
          id: '3',
          name: 'Team 3',
          shortName: 'T3',
          logo: 'https://api.sofascore.app/api/v1/team/3/image',
          primaryColor: '#388e3c',
        },
        homeScore: 1,
        awayScore: 3,
        status: 'finished',
        round: 1,
        matchday: 2,
        scheduledDate: new Date('2024-08-02'),
        scheduledTime: '20:00',
        venue: 'Estadio Capwell',
        city: 'Guayaquil',
        currentPeriod: 2,
        elapsedSeconds: 5400,
        isClockRunning: false,
        periodScores: [
          { period: 1, homeScore: 0, awayScore: 2 },
          { period: 2, homeScore: 1, awayScore: 1 },
        ],
        isHighlighted: false,
        createdAt: new Date('2024-02-12T04:03:36.228Z'),
        updatedAt: new Date('2024-02-12T04:03:36.234Z'),
      },
    ];

    setTimeout(() => {
      this.matches.set(mockMatches as unknown as Match[]);
      this.isLoading.set(false);
    }, 2000);

    // this.matchService.getMatches(id).subscribe({
    //   next: (matches: Match[]) => {
    //     this.matches.set(matches);
    //     this.isLoading.set(false);
    //   },
    //   error: (error: any) => {
    //     console.error('Error loading matches', error);
    //     this.isLoading.set(false);
    //   },
    // });
    this.isLoading.set(false);
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      active: 'Activo',
      injured: 'Lesionado',
      suspended: 'Suspendido',
      inactive: 'Inactivo',
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
