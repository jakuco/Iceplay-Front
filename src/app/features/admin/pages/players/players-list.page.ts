import { ChangeDetectionStrategy, Component, signal, inject, effect, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PlayerService } from '../../../../core/services/player.service';
import { TeamService } from '../../../../core/services/team.service';
import { ChampionshipService } from '../../../../core/services/championship.service';
import { AuthService } from '../../../../core/services/auth.service';
import { PlayerApiResponse } from '../../../../core/models/player.model';
import { TeamApiResponse } from '../../../../core/models/team.model';
import { Championship, ChampionshipStatus } from '../../../../core/models/championship.model';

interface DisplayPlayer {
    id: string;
    fullName: string;
    number: number;
    position: string;
    team: string;
    teamId: string;
    status: 'active' | 'injured' | 'suspended' | 'inactive';
}

@Component({
    selector: 'app-players-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatChipsModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
    ],
    template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1 class="page-title">Jugadores</h1>
          <p class="page-subtitle">Gestiona los jugadores de todos los equipos</p>
        </div>
        <button matButton="filled" routerLink="/admin/players/new">
          <mat-icon>add</mat-icon>
          Nuevo Jugador
        </button>
      </header>

      <!-- Filters -->
      <div class="filters-card">
        <div class="filters-grid">
          <mat-form-field appearance="outline">
            <mat-label>Campeonato</mat-label>
            <mat-select [(ngModel)]="selectedChampionshipId" (selectionChange)="onChampionshipChange()">
              <mat-option value="">Todos</mat-option>
              @for (champ of championships(); track champ.id) {
                <mat-option [value]="champ.id">{{ champ.name }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Equipo</mat-label>
            <mat-select [(ngModel)]="selectedTeamId" (selectionChange)="onTeamChange()">
              <mat-option value="">Todos</mat-option>
              @for (team of filteredTeams(); track team.id) {
                <mat-option [value]="team.id">{{ team.name }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Buscar</mat-label>
            <input
              matInput
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange()"
              placeholder="Nombre o número"
            />
            <mat-icon matPrefix>search</mat-icon>
          </mat-form-field>
        </div>
      </div>

      @if (isLoading()) {
        <div class="content-card">
          <p class="text-secondary py-8 text-center">Cargando jugadores...</p>
        </div>
      } @else {
        <div class="content-card">
          @if (displayPlayers().length > 0) {
            <table mat-table [dataSource]="displayPlayers()" class="w-full">
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

              <ng-container matColumnDef="team">
                <th mat-header-cell *matHeaderCellDef>Equipo</th>
                <td mat-cell *matCellDef="let player">{{ player.team }}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Estado</th>
                <td mat-cell *matCellDef="let player">
                  <mat-chip [class]="'status-' + (player.status || 'active')">
                    {{ getStatusLabel(player.status || 'active') }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let player">
                  <button matIconButton [matMenuTriggerFor]="menu">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item [routerLink]="['/admin/players', player.id, 'edit']">
                      <mat-icon>edit</mat-icon>
                      Editar
                    </button>
                    <button mat-menu-item class="text-red-500" (click)="deletePlayer(player.id)">
                      <mat-icon>delete</mat-icon>
                      Eliminar
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>

            @if (!selectedTeamId && totalPlayers() > pageSize) {
              <div class="pagination">
                <button matIconButton [disabled]="currentPage() <= 1" (click)="prevPage()">
                  <mat-icon>chevron_left</mat-icon>
                </button>
                <span class="page-info">
                  {{ paginationStart() }}–{{ paginationEnd() }} de {{ totalPlayers() }}
                </span>
                <button matIconButton [disabled]="currentPage() * pageSize >= totalPlayers()" (click)="nextPage()">
                  <mat-icon>chevron_right</mat-icon>
                </button>
              </div>
            }
          } @else {
            <div class="empty-state">
              <mat-icon class="empty-state-icon">person_off</mat-icon>
              <h3>No hay jugadores</h3>
              <p>Crea tu primer jugador para comenzar</p>
              <button matButton="filled" routerLink="/admin/players/new">
                <mat-icon>add</mat-icon>
                Crear Jugador
              </button>
            </div>
          }
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
      align-items: flex-start;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .page-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
    .page-subtitle {
      color: var(--mat-sys-on-surface-variant);
      margin: 0.25rem 0 0;
    }
    .filters-card {
      background: var(--mat-sys-surface-container);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }
    .filters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    .content-card {
      background: var(--mat-sys-surface-container);
      border-radius: 12px;
      overflow: hidden;
    }
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-top: 1px solid var(--mat-sys-outline-variant);
    }
    .page-info {
      font-size: 0.875rem;
      color: var(--mat-sys-on-surface-variant);
      min-width: 120px;
      text-align: center;
    }
    .empty-state-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: var(--mat-sys-outline);
      margin-bottom: 1rem;
    }
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      h3 {
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
      }
      p {
        color: var(--mat-sys-on-surface-variant);
        margin: 0 0 1.5rem;
      }
    }
  `,
})
export default class PlayersListPage implements OnInit {
    displayedColumns = ['number', 'name', 'position', 'team', 'status', 'actions'];
    readonly pageSize = 20;

    private playerService = inject(PlayerService);
    private teamService = inject(TeamService);
    private championshipService = inject(ChampionshipService);
    private authService = inject(AuthService);
    private router = inject(Router);

    /** Raw players from the last API call */
    rawPlayers = signal<PlayerApiResponse[]>([]);
    allTeams = signal<TeamApiResponse[]>([]);
    filteredTeams = signal<TeamApiResponse[]>([]);
    championships = signal<Championship[]>([]);
    displayPlayers = signal<DisplayPlayer[]>([]);
    isLoading = signal(false);

    currentPage = signal(1);
    totalPlayers = signal(0);

    selectedChampionshipId = '';
    selectedTeamId = '';
    searchTerm = '';

    paginationStart = signal(1);
    paginationEnd = signal(0);

    constructor() {
        effect(() => {
            const user = this.authService.currentUser();
            if (user?.organizationId) {
                this.loadData(String(user.organizationId));
            }
        });
    }

    ngOnInit(): void {
        this.router.events
            .pipe(
                filter(
                    (event): event is NavigationEnd =>
                        event instanceof NavigationEnd &&
                        (event.urlAfterRedirects === '/admin/players' ||
                            event.urlAfterRedirects.startsWith('/admin/players?')),
                ),
            )
            .subscribe(() => {
                const user = this.authService.currentUser();
                if (user?.organizationId) {
                    this.loadData(String(user.organizationId));
                }
            });
    }

    /** Initial load: fetch teams + championships, then load first page of players */
    private loadData(organizationId: string): void {
        this.isLoading.set(true);
        forkJoin({
            teams: this.teamService.getTeamsByOrganization(organizationId),
            championships: this.championshipService.getChampionships(organizationId),
        }).subscribe({
            next: ({ teams, championships }) => {
                this.allTeams.set(teams);
                this.filteredTeams.set(teams);
                this.championships.set(
                    championships.filter((c) => c.status === ChampionshipStatus.Active),
                );
                this.loadPlayers();
            },
            error: (error) => {
                console.error('Error loading data', error);
                this.isLoading.set(false);
            },
        });
    }

    /** Load players from the API based on current filter state */
    private loadPlayers(): void {
        const user = this.authService.currentUser();
        if (!user?.organizationId) return;

        this.isLoading.set(true);

        if (this.selectedTeamId) {
            // Server-side: fetch all players for selected team (no pagination)
            this.playerService.getPlayersByTeam(this.selectedTeamId).subscribe({
                next: (resp) => {
                    this.rawPlayers.set(resp.players ?? []);
                    this.totalPlayers.set(resp.players?.length ?? 0);
                    this.transformAndDisplay();
                    this.isLoading.set(false);
                },
                error: (err) => {
                    console.error('Error loading players by team', err);
                    this.isLoading.set(false);
                },
            });
        } else {
            // Server-side: paginated org-level load
            this.playerService
                .getPlayersByOrganization(String(user.organizationId), this.currentPage(), this.pageSize)
                .subscribe({
                    next: (resp) => {
                        this.rawPlayers.set(resp.players);
                        this.totalPlayers.set(resp.total);
                        this.transformAndDisplay();
                        this.isLoading.set(false);
                    },
                    error: (err) => {
                        console.error('Error loading players', err);
                        this.isLoading.set(false);
                    },
                });
        }
    }

    /** Client-side filter + transform rawPlayers → displayPlayers */
    private transformAndDisplay(): void {
        let filtered = this.rawPlayers();

        // Championship filter (client-side: no backend support)
        if (this.selectedChampionshipId) {
            const teamsInChampionship = this.allTeams()
                .filter((t) => String(t.championshipId) === this.selectedChampionshipId)
                .map((t) => t.id);
            filtered = filtered.filter((p) => teamsInChampionship.includes(p.teamId as any));
        }

        // Search filter (client-side)
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter((p) => {
                const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim();
                return (
                    fullName.toLowerCase().includes(term) ||
                    String(p.number ?? '').includes(term)
                );
            });
        }

        // Update pagination display values
        const start = (this.currentPage() - 1) * this.pageSize + 1;
        const end = Math.min(this.currentPage() * this.pageSize, this.totalPlayers());
        this.paginationStart.set(start);
        this.paginationEnd.set(end);

        const display: DisplayPlayer[] = filtered.map((player) => {
            const team = this.allTeams().find((t) => String(t.id) === String(player.teamId));
            const fullName = `${player.firstName || ''} ${player.lastName || ''}`.trim() || 'Sin nombre';
            const normalizedStatus = String(player.status || 'active').toLowerCase();

            return {
                id: String(player.id),
                fullName,
                number: player.number ?? 0,
                position: String(player.positionId),
                team: team?.name || 'Sin equipo',
                teamId: String(player.teamId),
                status: this.toDisplayStatus(normalizedStatus),
            };
        });

        this.displayPlayers.set(display);
    }

    onChampionshipChange(): void {
        // Update team dropdown options based on championship
        if (this.selectedChampionshipId) {
            this.filteredTeams.set(
                this.allTeams().filter((t) => String(t.championshipId) === this.selectedChampionshipId),
            );
        } else {
            this.filteredTeams.set(this.allTeams());
        }
        // Clear team selection if it no longer belongs to the selected championship
        if (this.selectedTeamId) {
            const teamStillValid = this.filteredTeams().some((t) => String(t.id) === this.selectedTeamId);
            if (!teamStillValid) this.selectedTeamId = '';
        }
        this.currentPage.set(1);
        this.loadPlayers();
    }

    onTeamChange(): void {
        this.currentPage.set(1);
        this.loadPlayers();
    }

    onSearchChange(): void {
        // Search is client-side only — no server call needed
        this.transformAndDisplay();
    }

    prevPage(): void {
        if (this.currentPage() > 1) {
            this.currentPage.update((p) => p - 1);
            this.loadPlayers();
        }
    }

    nextPage(): void {
        if (this.currentPage() * this.pageSize < this.totalPlayers()) {
            this.currentPage.update((p) => p + 1);
            this.loadPlayers();
        }
    }

    deletePlayer(playerId: string): void {
        if (confirm('¿Estás seguro de que deseas eliminar este jugador?')) {
            this.playerService.deletePlayer(playerId).subscribe({
                next: () => {
                    const user = this.authService.currentUser();
                    if (user?.organizationId) {
                        this.loadData(String(user.organizationId));
                    }
                },
                error: (error) => {
                    console.error('Error deleting player', error);
                    alert('Error al eliminar el jugador');
                },
            });
        }
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

    private toDisplayStatus(status: string): 'active' | 'injured' | 'suspended' | 'inactive' {
        if (status === 'injured' || status === 'suspended' || status === 'inactive') {
            return status;
        }
        return 'active';
    }
}
