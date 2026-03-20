import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  inject,
  OnInit,
  computed,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import {
  StatisticService,
  StatisticsTeamGeneral,
  StatisticsTeamsHistory,
  StatisticsPlayer,
} from '../../../../core/services/statistic.service';

type FormResult = 'G' | 'E' | 'P';
type StatisticsTab = 'equipos' | 'jugadores';
type PlayerCategoryId = 'goals' | 'best-goalkeeper' | 'yellow-cards' | 'red-cards';

interface TeamStanding {
  position: number;
  teamName: string;
  badge: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: FormResult[];
}

interface PlayerStatItem {
  rank: number;
  playerName: string;
  teamName: string;
  value: number;
  ratio: string;
}

interface PlayerStatCategory {
  id: PlayerCategoryId;
  title: string;
  icon: string;
  items: PlayerStatItem[];
}

@Component({
  selector: 'app-admin-statistics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Estadísticas</h1>
        <p class="page-subtitle">Vista administrativa de rendimiento por equipos y jugadores</p>
      </header>

      <nav class="tabs" aria-label="Cambiar vista de estadísticas">
        <button
          type="button"
          class="tab-button"
          [class.tab-button--active]="activeTab() === 'equipos'"
          (click)="setTab('equipos')"
          [attr.aria-selected]="activeTab() === 'equipos'"
        >
          Equipos
        </button>
        <button
          type="button"
          class="tab-button"
          [class.tab-button--active]="activeTab() === 'jugadores'"
          (click)="setTab('jugadores')"
          [attr.aria-selected]="activeTab() === 'jugadores'"
        >
          Jugadores
        </button>
      </nav>

      @if (activeTab() === 'equipos') {
        <section class="standings-card" aria-label="Tabla de posiciones">
          <div class="standings-header">
            <span>#</span>
            <span>Equipo</span>
            <span>PTS</span>
            <span>PJ</span>
            <span>PG</span>
            <span>PE</span>
            <span>PP</span>
            <span>GF</span>
            <span>GC</span>
            <span>DG</span>
          </div>

          @for (team of teamStandings(); track team.position) {
            <article class="standings-row">
              <div class="position-cell">{{ team.position }}</div>
              <div class="team-cell">
                <span class="team-badge">{{ team.badge }}</span>
                <div class="team-meta">
                  <strong>{{ team.teamName }}</strong>
                  <div class="form-row" aria-label="Forma reciente">
                    @for (result of team.form; track $index) {
                      <span
                        class="form-pill"
                        [class.form-pill--win]="result === 'G'"
                        [class.form-pill--draw]="result === 'E'"
                        [class.form-pill--loss]="result === 'P'"
                      >
                        {{ result }}
                      </span>
                    }
                  </div>
                </div>
              </div>
              <div class="metric metric--bold">{{ team.points }}</div>
              <div class="metric">{{ team.played }}</div>
              <div class="metric">{{ team.won }}</div>
              <div class="metric">{{ team.drawn }}</div>
              <div class="metric">{{ team.lost }}</div>
              <div class="metric">{{ team.goalsFor }}</div>
              <div class="metric">{{ team.goalsAgainst }}</div>
              <div
                class="metric"
                [class.metric--positive]="team.goalDifference > 0"
                [class.metric--negative]="team.goalDifference < 0"
              >
                {{ goalDifferenceLabel(team.goalDifference) }}
              </div>
            </article>
          }
        </section>
      } @else {
        <section class="players-grid" aria-label="Estadísticas de jugadores">
          @for (category of playerCategories(); track category.id) {
            <article class="stat-card">
              <header class="stat-card__header">
                <div class="stat-card__title">
                  <mat-icon>{{ category.icon }}</mat-icon>
                  <h2>{{ category.title }}</h2>
                </div>
                <button
                  type="button"
                  class="stat-card__link"
                  (click)="openCategoryModal(category.id)"
                >
                  MÁS
                </button>
              </header>

              <div class="stat-card__rows">
                @for (item of category.items; track item.rank) {
                  <div class="player-row">
                    <span class="player-rank">{{ item.rank }}</span>
                    <div class="player-meta">
                      <strong>{{ item.playerName }}</strong>
                      <span>{{ item.teamName }}</span>
                    </div>
                    <p class="player-value">
                      <span>{{ item.value }}</span>
                      @if (item.ratio) {
                        <small>({{ item.ratio }})</small>
                      }
                    </p>
                  </div>
                }
              </div>
            </article>
          }
        </section>
      }

      @if (isModalOpen()) {
        <div class="modal-backdrop" (click)="closeCategoryModal()">
          <section
            class="category-modal"
            role="dialog"
            aria-modal="true"
            [attr.aria-labelledby]="modalTitleId"
            (click)="$event.stopPropagation()"
          >
            <header class="category-modal__header">
              <div class="category-modal__title-wrap">
                <h2 [id]="modalTitleId">Top 10+ {{ selectedCategoryTitle() }}</h2>
                <p>Se cargan más resultados automáticamente al llegar al final.</p>
              </div>
              <button
                type="button"
                class="category-modal__close"
                aria-label="Cerrar modal"
                (click)="closeCategoryModal()"
              >
                <mat-icon>close</mat-icon>
              </button>
            </header>

            <div #modalScrollContainer class="category-modal__content" (scroll)="onModalScroll($event)">
              @for (item of modalItems(); track item.rank) {
                <div class="player-row player-row--modal">
                  <span class="player-rank">{{ item.rank }}</span>
                  <div class="player-meta">
                    <strong>{{ item.playerName }}</strong>
                    <span>{{ item.teamName }}</span>
                  </div>
                  <p class="player-value">
                    <span>{{ item.value }}</span>
                    @if (item.ratio) {
                      <small>({{ item.ratio }})</small>
                    }
                  </p>
                </div>
              }

              @if (modalIsLoading()) {
                <p class="category-modal__status">Cargando estadísticas...</p>
              }

              @if (modalErrorMessage()) {
                <p class="category-modal__status category-modal__status--error">
                  {{ modalErrorMessage() }}
                </p>
              }

              @if (!modalHasMore() && modalItems().length > 0) {
                <p class="category-modal__status">No hay más registros por mostrar.</p>
              }

              @if (!modalIsLoading() && modalItems().length === 0 && !modalErrorMessage()) {
                <p class="category-modal__status">No se encontraron datos para esta categoría.</p>
              }
            </div>
          </section>
        </div>
      }

      <div class="backend-note">
        Datos hardcodeados para vista previa. Estructura lista para conectar API.
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .page-container {
      padding: 1.25rem;
      max-width: 1300px;
      margin: 0 auto;
      display: grid;
      gap: 1rem;
    }

    .page-header {
      margin-bottom: 0.25rem;
    }

    .page-title {
      font-size: 1.5rem;
      font-weight: 800;
      margin: 0;
    }

    .page-subtitle {
      color: var(--mat-sys-on-surface-variant);
      margin: 0.25rem 0 0;
    }

    .tabs {
      display: inline-flex;
      gap: 0.35rem;
      background: color-mix(in srgb, var(--mat-sys-surface), #000 6%);
      padding: 0.35rem;
      border-radius: 999px;
      width: fit-content;
    }

    .tab-button {
      border: 0;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-weight: 700;
      color: var(--mat-sys-on-surface-variant);
      background: transparent;
      cursor: pointer;
      transition: background 120ms ease;
    }

    .tab-button--active {
      background: var(--mat-sys-primary);
      color: var(--mat-sys-on-primary);
    }

    .standings-card {
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 55%);
      border-radius: 12px;
      overflow: auto;
      background: var(--mat-sys-surface-container-low);
    }

    .standings-header,
    .standings-row {
      display: grid;
      grid-template-columns: 3rem minmax(220px, 2.3fr) repeat(8, minmax(2.6rem, 1fr));
      align-items: center;
      min-width: 860px;
    }

    .standings-header {
      background: color-mix(in srgb, #8acb88, white 55%);
      color: #1f4420;
      font-weight: 700;
      font-size: 0.78rem;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      padding: 0.6rem 0.4rem;
    }

    .standings-row {
      border-top: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 75%);
      padding: 0.35rem 0.4rem;
    }

    .position-cell {
      display: grid;
      place-items: center;
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
      font-weight: 700;
      color: white;
      background: #4caf50;
      margin-inline: auto;
    }

    .team-cell {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      min-width: 0;
    }

    .team-badge {
      display: grid;
      place-items: center;
      width: 1.95rem;
      height: 1.95rem;
      border-radius: 50%;
      background: color-mix(in srgb, var(--mat-sys-primary), white 72%);
      color: var(--mat-sys-primary);
      font-size: 0.75rem;
      font-weight: 800;
      flex: none;
    }

    .team-meta {
      min-width: 0;
      display: grid;
      gap: 0.25rem;
    }

    .team-meta strong {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.94rem;
    }

    .form-row {
      display: flex;
      gap: 0.2rem;
      flex-wrap: wrap;
    }

    .form-pill {
      border-radius: 4px;
      font-size: 0.63rem;
      font-weight: 700;
      line-height: 1;
      padding: 0.18rem 0.26rem;
      color: white;
    }

    .form-pill--win {
      background: #03a759;
    }

    .form-pill--draw {
      background: #f4a621;
    }

    .form-pill--loss {
      background: #e64a4a;
    }

    .metric {
      text-align: center;
      font-size: 0.9rem;
    }

    .metric--bold {
      font-weight: 800;
    }

    .metric--positive {
      color: #008a3b;
      font-weight: 700;
    }

    .metric--negative {
      color: #c13535;
      font-weight: 700;
    }

    .players-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.9rem;
    }

    .stat-card {
      border-radius: 10px;
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 60%);
      background: var(--mat-sys-surface-container-low);
      overflow: hidden;
      box-shadow: 0 1px 3px color-mix(in srgb, #000, transparent 88%);
    }

    .stat-card__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: color-mix(in srgb, var(--mat-sys-surface), #000 4%);
      padding: 0.6rem 0.75rem;
      border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 70%);
    }

    .stat-card__title {
      display: flex;
      align-items: center;
      gap: 0.42rem;
    }

    .stat-card__title mat-icon {
      width: 1rem;
      height: 1rem;
      font-size: 1rem;
      color: color-mix(in srgb, var(--mat-sys-on-surface), #000 15%);
    }

    .stat-card__title h2 {
      margin: 0;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.01em;
      font-weight: 800;
    }

    .stat-card__link {
      border: 0;
      background: none;
      font-size: 0.78rem;
      color: #2d8e2f;
      font-weight: 700;
      cursor: pointer;
    }

    .stat-card__link:focus-visible,
    .category-modal__close:focus-visible {
      outline: 2px solid color-mix(in srgb, var(--mat-sys-primary), white 18%);
      outline-offset: 2px;
      border-radius: 6px;
    }

    .stat-card__rows {
      display: grid;
    }

    .player-row {
      display: grid;
      grid-template-columns: 2rem 1fr auto;
      gap: 0.55rem;
      align-items: center;
      padding: 0.55rem 0.75rem;
      border-top: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 76%);
    }

    .player-row:first-child {
      border-top: 0;
    }

    .player-rank {
      width: 1.65rem;
      height: 1.65rem;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--mat-sys-primary);
      background: color-mix(in srgb, var(--mat-sys-primary), white 84%);
    }

    .player-meta {
      display: grid;
      min-width: 0;
    }

    .player-meta strong {
      font-size: 0.9rem;
      line-height: 1.05;
    }

    .player-meta span {
      font-size: 0.8rem;
      color: var(--mat-sys-on-surface-variant);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .player-value {
      margin: 0;
      font-weight: 800;
      text-align: right;
      display: grid;
      line-height: 1.05;
    }

    .player-value small {
      font-weight: 500;
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.75rem;
    }

    .backend-note {
      font-size: 0.82rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 80;
      display: grid;
      place-items: center;
      background: color-mix(in srgb, #000, transparent 40%);
      padding: 1rem;
    }

    .category-modal {
      width: min(100%, 700px);
      height: min(86vh, 760px);
      display: grid;
      grid-template-rows: auto minmax(0, 1fr);
      border-radius: 12px;
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 45%);
      background: var(--mat-sys-surface-container-lowest);
      overflow: hidden;
      box-shadow: 0 12px 30px color-mix(in srgb, #000, transparent 72%);
    }

    .category-modal__header {
      display: flex;
      justify-content: space-between;
      gap: 0.8rem;
      align-items: flex-start;
      padding: 0.85rem 1rem;
      border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 72%);
      background: color-mix(in srgb, var(--mat-sys-surface), #000 2%);
    }

    .category-modal__title-wrap h2 {
      margin: 0;
      font-size: 1rem;
      font-weight: 800;
    }

    .category-modal__title-wrap p {
      margin: 0.2rem 0 0;
      font-size: 0.8rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .category-modal__close {
      border: 0;
      background: transparent;
      color: var(--mat-sys-on-surface);
      cursor: pointer;
      width: 2rem;
      height: 2rem;
      display: grid;
      place-items: center;
      border-radius: 999px;
      flex: none;
    }

    .category-modal__close mat-icon {
      font-size: 1.15rem;
      width: 1.15rem;
      height: 1.15rem;
    }

    .category-modal__content {
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      overscroll-behavior: contain;
      display: grid;
      align-content: start;
    }

    .player-row--modal {
      padding-inline: 1rem;
    }

    .category-modal__status {
      margin: 0;
      padding: 0.85rem 1rem 1rem;
      font-size: 0.84rem;
      color: var(--mat-sys-on-surface-variant);
      text-align: center;
    }

    .category-modal__status--error {
      color: #be2b2b;
      font-weight: 600;
    }

    @media (max-width: 1180px) {
      .players-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 720px) {
      .page-container {
        padding: 1rem;
      }

      .players-grid {
        grid-template-columns: 1fr;
      }

      .modal-backdrop {
        padding: 0.65rem;
      }

      .category-modal {
        height: 90vh;
      }

      .category-modal__header {
        padding: 0.75rem;
      }

      .player-row--modal {
        padding-inline: 0.75rem;
      }
    }
  `,
})
export default class AdminStatisticsPage implements OnInit {
  private statisticService = inject(StatisticService);
  private readonly pageSize = 10;
  private readonly modalScrollContainer = viewChild<ElementRef<HTMLElement>>('modalScrollContainer');
  protected readonly modalTitleId = 'statistics-category-modal-title';

  allStatisticsTeamGeneral = signal<StatisticsTeamGeneral[]>([]);
  allStatisticsTeamsHistory = signal<StatisticsTeamsHistory[]>([]);

  protected readonly activeTab = signal<StatisticsTab>('equipos');
  teamStandings = signal<TeamStanding[]>([]);
  protected readonly selectedCategoryId = signal<PlayerCategoryId | null>(null);
  protected readonly isModalOpen = signal(false);
  protected readonly modalItems = signal<PlayerStatItem[]>([]);
  protected readonly modalOffset = signal(0);
  protected readonly modalHasMore = signal(true);
  protected readonly modalIsLoading = signal(false);
  protected readonly modalErrorMessage = signal<string | null>(null);
  protected readonly selectedCategoryTitle = computed(() => {
    const categoryId = this.selectedCategoryId();
    if (!categoryId) {
      return '';
    }

    const category = this.playerCategories().find((item) => item.id === categoryId);
    return category?.title ?? '';
  });

  playerCategories = signal<PlayerStatCategory[]>([
    {
      id: 'goals',
      title: 'Goleadores',
      icon: 'sports_soccer',
      items: [],
    },
    {
      id: 'best-goalkeeper',
      title: 'Mejor portero',
      icon: 'pan_tool',
      items: [],
    },
    {
      id: 'yellow-cards',
      title: 'Tarjetas amarillas',
      icon: 'crop_portrait',
      items: [],
    },
    {
      id: 'red-cards',
      title: 'Tarjetas rojas',
      icon: 'stop_square',
      items: [],
    },
  ]);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // this.isLoading.set(true);

    this.statisticService
      .getTeamsGeneralStatistics(10, 0)
      .pipe(
        switchMap((teamsGeneralStatistics) => {
          this.allStatisticsTeamGeneral.set(teamsGeneralStatistics);
          const teamIds = teamsGeneralStatistics.map((team) => team.team_id);

          return this.statisticService.getTeamsHistoryStatistics(teamIds).pipe(
            map((teamsHistoryStatistics) => {
              // Convertimos a
              const flatHistory = teamsHistoryStatistics.flat();
              return this.formatTeamsData(teamsGeneralStatistics, flatHistory);
            }),
          );
        }),
      )
      .subscribe({
        next: (formattedTeams) => {
          this.teamStandings.set(formattedTeams);
          // this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading data', error);
          // this.isLoading.set(false);
        },
      });

    const limit = 3;
    const offset = 0;

    forkJoin({
      scorers: this.statisticService.getPlayersScorersStatistics(limit, offset),
      goalkeepers: this.statisticService.getPlayersGoalkeepersStatistics(limit, offset),
      yellowCards: this.statisticService.getPlayersYellowCardsStatistics(limit, offset),
      redCards: this.statisticService.getPlayersRedCardsStatistics(limit, offset),
    })
      .pipe(
        map(({ scorers, goalkeepers, yellowCards, redCards }) => {
          return {
            scorers: this.transformStats(scorers),
            goalkeepers: this.transformStats(goalkeepers),
            yellowCards: this.transformStats(yellowCards),
            redCards: this.transformStats(redCards),
          };
        }),
      )
      .subscribe({
        next: (result) => {
          this.playerCategories.update((categories) =>
            categories.map((cat) => {
              switch (cat.id) {
                case 'goals':
                  return { ...cat, items: result.scorers };
                case 'best-goalkeeper':
                  return { ...cat, items: result.goalkeepers };
                case 'yellow-cards':
                  return { ...cat, items: result.yellowCards };
                case 'red-cards':
                  return { ...cat, items: result.redCards };
                default:
                  return cat;
              }
            }),
          );
        },
        error: (err) => {
          console.error('Error cargando estadísticas', err);
        },
      });
  }

  protected setTab(tab: StatisticsTab): void {
    this.activeTab.set(tab);
  }

  protected openCategoryModal(categoryId: PlayerCategoryId): void {
    this.selectedCategoryId.set(categoryId);
    this.isModalOpen.set(true);
    this.modalItems.set([]);
    this.modalOffset.set(0);
    this.modalHasMore.set(true);
    this.modalErrorMessage.set(null);
    this.loadMoreCategoryStats();
  }

  protected closeCategoryModal(): void {
    this.isModalOpen.set(false);
    this.selectedCategoryId.set(null);
    this.modalItems.set([]);
    this.modalOffset.set(0);
    this.modalHasMore.set(true);
    this.modalErrorMessage.set(null);
    this.modalIsLoading.set(false);
  }

  protected onModalScroll(event: Event): void {
    if (this.modalIsLoading() || !this.modalHasMore()) {
      return;
    }

    const target = event.target as HTMLElement;
    const thresholdPx = 100;
    const isNearBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - thresholdPx;

    if (isNearBottom) {
      this.loadMoreCategoryStats();
    }
  }

  protected goalDifferenceLabel(goalDifference: number): string {
    return goalDifference > 0 ? `+${goalDifference}` : `${goalDifference}`;
  }

  // Formatters
  private formatTeamsData(
    generalStats: StatisticsTeamGeneral[],
    historyStats: StatisticsTeamsHistory[],
  ): TeamStanding[] {
    // Mapa rápido de historial por team_id
    const historyMap = new Map<number, string>();
    historyStats.forEach((h) => historyMap.set(h.team_id, h.history));
    // Ordenamos por puntos descendente
    const sortedGeneral = [...generalStats].sort((a, b) => b.points - a.points);

    return sortedGeneral.map((team, index) => {
      const historyString = historyMap.get(team.team_id) || '';
      // Transformamos el historial en array de FormResult y tomamos últimos 5
      const form: FormResult[] = historyString
        .trim()
        .split(' ')
        .map((r) => r as FormResult);

      return {
        position: index + 1,
        teamName: team.name,
        badge: team.name.substring(0, 3).toUpperCase(), // ejemplo de badge
        points: team.points,
        played: team.matches_played,
        won: team.wins,
        drawn: team.draws,
        lost: team.losses,
        goalsFor: team.goals_for,
        goalsAgainst: team.goals_against,
        goalDifference: team.goal_difference,
        form,
      };
    });
  }

  private transformStats(stats: StatisticsPlayer[]): PlayerStatItem[] {
    return stats.map((player) => ({
      rank: player.rank,
      playerName: player.full_name,
      teamName: player.team_name,
      value: Number(player.value),
      ratio: player.ratio.toString(),
    }));
  }

  private loadMoreCategoryStats(): void {
    const categoryId = this.selectedCategoryId();
    if (!categoryId || this.modalIsLoading() || !this.modalHasMore()) {
      return;
    }

    this.modalIsLoading.set(true);
    this.modalErrorMessage.set(null);

    this.getCategoryStatsRequest(categoryId, this.pageSize, this.modalOffset()).subscribe({
      next: (players) => {
        const nextBatch = this.transformStats(players);
        this.modalItems.update((items) => [...items, ...nextBatch]);
        this.modalOffset.update((offset) => offset + nextBatch.length);
        this.modalHasMore.set(nextBatch.length === this.pageSize);
        this.modalIsLoading.set(false);
        this.loadMoreIfContainerHasNoScroll();
      },
      error: () => {
        this.modalErrorMessage.set('No se pudieron cargar más estadísticas. Intenta nuevamente.');
        this.modalIsLoading.set(false);
      },
    });
  }

  private loadMoreIfContainerHasNoScroll(): void {
    if (!this.isModalOpen() || this.modalIsLoading() || !this.modalHasMore()) {
      return;
    }

    setTimeout(() => {
      const container = this.modalScrollContainer()?.nativeElement;
      if (!container || !this.modalHasMore() || this.modalIsLoading()) {
        return;
      }

      const canScroll = container.scrollHeight > container.clientHeight + 1;
      if (!canScroll) {
        this.loadMoreCategoryStats();
      }
    });
  }

  private getCategoryStatsRequest(categoryId: PlayerCategoryId, limit: number, offset: number) {
    switch (categoryId) {
      case 'goals':
        return this.statisticService.getPlayersScorersStatistics(limit, offset);
      case 'best-goalkeeper':
        return this.statisticService.getPlayersGoalkeepersStatistics(limit, offset);
      case 'yellow-cards':
        return this.statisticService.getPlayersYellowCardsStatistics(limit, offset);
      case 'red-cards':
        return this.statisticService.getPlayersRedCardsStatistics(limit, offset);
    }
  }
}
