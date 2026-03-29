import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { createEmptyPlayerStats, Player, PlayerStats } from '../../../core/models/player.model';
import { PlayerService } from '../../../core/services/player.service';
import { AvatarComponent } from '../../../shared/ui';
import { Match } from '../../../core/models';

@Component({
  selector: 'app-player-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // RouterLink,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    MatTabsModule,
    AvatarComponent,
  ],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/matches">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <h1 class="page-title">Detalle del Jugador</h1>
        </div>
      </header>

      @if (isLoading()) {
        <div class="content-card">
          <p class="text-secondary py-8 text-center">Cargando...</p>
        </div>
      } @else if (player(); as p) {
        <!-- Team Header Card -->
        <div class="team-header-card flex flex-col items-center justify-center">
          <div class="team-header-content flex flex-col items-center justify-center">
            <!-- Player Logo and Name -->
            <div class="team-logo">
              @if (p.photo) {
                <img [src]="p.photo" [alt]="p.fullName + ' Photo'" />
              } @else {
                <ui-avatar name="John Doe" size="xl" />
              }
            </div>
            <div class="player-info">
              <h2 class="player-name text-primary">{{ p.fullName }}</h2>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <section class="stats-grid">
          @for (stat of stats(); track stat.label) {
            <div class="stat-card rounded-md bg-gray-200 p-2">
              <div class="stat-icon">
                <mat-icon>{{ stat.icon }}</mat-icon>
              </div>
              <div class="stat-content">
                <span class="stat-value">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            </div>
          }
        </section>

        <!-- Partidos jugados -->
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
                        <button matIconButton>
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
        </mat-tab-group>
      } @else {
        <div class="content-card">
          <p class="text-secondary py-8 text-center">Jugador no encontrado</p>
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
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--mat-sys-surface-container);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
      transition:
        transform 0.2s,
        box-shadow 0.2s;
      overflow: hidden;
      min-width: 0;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      @media (min-width: 640px) {
        padding: 1.25rem;
        gap: 1rem;
      }
    }

    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      @media (min-width: 640px) {
        width: 48px;
        height: 48px;
        border-radius: 12px;

        mat-icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
        }
      }
    }

    .stat-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .stat-value {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.2;

      @media (min-width: 640px) {
        font-size: 1.5rem;
      }
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--mat-sys-on-surface-variant);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (min-width: 640px) {
        font-size: 0.875rem;
      }
    }

    .stat-change {
      display: none;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.7rem;
      color: #ef4444;
      flex-shrink: 0;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      background: rgba(239, 68, 68, 0.1);

      &.positive {
        color: #22c55e;
        background: rgba(34, 197, 94, 0.1);
      }

      mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }

      @media (min-width: 480px) {
        display: flex;
      }

      @media (min-width: 640px) {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;

        mat-icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
        }
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
export default class PlayerDetailPage {
  id = input.required<string>();
  isLoading = signal(false);
  player = signal<Player | null>(null);
  private playerService = inject(PlayerService);
  matches = signal<Match[]>([]);
  displayedColumns = ['number', 'name', 'position', 'status', 'actions'];
  displayedColumnsMatches = ['championship', 'teams', 'date', 'venue', 'status', 'actions'];

  stats = signal<{ value: number; label: string; icon: string }[]>([
    {
      value: 10,
      label: 'Goles',
      icon: 'sports_soccer',
    },
    {
      value: 4,
      label: 'Asistencias',
      icon: 'sync_alt',
    },
    {
      value: 7,
      label: 'Tarjetas',
      icon: 'square',
    },
  ]);

  constructor() {
    effect(() => {
      this.loadPlayer(this.id());
      this.loadMatches(this.id());
    });
  }

  private loadPlayer(id: string): void {
    this.isLoading.set(true);
    // this.playerService.getPlayerById(id).subscribe((player) => {
    //   this.player.set(player);
    //   this.isLoading.set(false);
    // });
    setTimeout(() => {
      const player: Player = {
        id: '1',
        teamId: '1',
        championshipId: '1',
        organizationId: '1',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        number: 1,
        position: 'Forward',
        status: 'active',
        stats: {
          matchesPlayed: 10,
          minutesPlayed: 1000,
          goals: 10,
          assists: 10,
          yellowCards: 10,
          redCards: 10,
          ownGoals: 10,
          penaltiesScored: 10,
          penaltiesMissed: 10,
          points: 10,
          freeThrows: 10,
          twoPointers: 10,
          threePointers: 10,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.player.set(player);
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
      this.matches = signal<Match[]>(mockMatches as unknown as Match[]);
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
