import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { ChampionshipService } from '../../core/services/championship.service';

interface LiveMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
}

interface UpcomingMatch {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
}

interface StandingRow {
  id: string;
  rank: number;
  team: string;
  points: number;
}

interface RecentResult {
  id: string;
  dateTime: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

interface ChampionshipSummary {
  id: string | number;
  slug?: string;
  name?: string;
}

interface ChampionshipDetailResponse {
  id: string | number;
  name: string;
  slug?: string;
  description?: string;
  status?: string | number;
  season?: string;
  totalTeams?: number;
  phases?: ChampionshipPhase[];
}

interface ChampionshipPhase {
  id: number;
  phaseOrder?: number;
  groups?: ChampionshipGroup[];
}

interface ChampionshipGroup {
  id: number;
  order?: number;
  teams?: ChampionshipTeam[];
}

interface ChampionshipTeam {
  id: number;
  name: string;
  hasActiveMatches?: boolean;
}

@Component({
  selector: 'app-cup-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="cup-page">
      <header class="page-header" aria-label="Resumen del campeonato">
        <div class="header-title-wrap">
          <div class="header-icon" aria-hidden="true">
            <mat-icon>sports_hockey</mat-icon>
          </div>

          <div>
            <h1 class="page-title">{{ cupName() }}</h1>
            <p class="page-subtitle">{{ championshipStatusLabel() }}</p>
          </div>
        </div>

        @if (isChampionshipLive()) {
          <span class="live-pill" aria-label="Campeonato en vivo">Live</span>
        } @else {
          <span class="nolive-pill" aria-label="Campeonato no activo">No Live</span>
        }
      </header>

      <nav class="tab-nav" aria-label="Secciones del campeonato">
        @for (tab of tabs; track tab.id) {
          <button
            type="button"
            class="tab-btn"
            [class.tab-btn-active]="tab.id === 'overview'"
            [attr.aria-current]="tab.id === 'overview' ? 'page' : null"
          >
            <mat-icon>{{ tab.icon }}</mat-icon>
            <span>{{ tab.label }}</span>
          </button>
        }
      </nav>

      <section class="hero-card" aria-labelledby="hero-title">
        <div class="hero-status">{{ championshipStatusLabel() }}</div>
        <h2 id="hero-title" class="hero-title">{{ cupName() }}</h2>
        <p class="hero-subtitle">{{ championshipDescription() }}</p>

        <div class="hero-stats" role="list" aria-label="Resumen de métricas del campeonato">
          @for (stat of summaryStats(); track stat.label) {
            <article class="stat-card" role="listitem">
              <div class="stat-label-wrap">
                <mat-icon>{{ stat.icon }}</mat-icon>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
              <p class="stat-value">{{ stat.value }}</p>
            </article>
          }
        </div>
      </section>

      <section aria-labelledby="live-title" class="section-block">
        <h2 id="live-title" class="section-title with-dot">Partidos en Vivo</h2>

        <div class="live-grid">
          @for (match of liveMatches(); track match.id) {
            <article class="match-live-card">
              <div class="match-head">
                <span class="match-live-badge">Live</span>
                <span class="match-time">{{ match.time }}</span>
              </div>

              <div class="teams-stack">
                <div class="team-row">
                  <div class="team-name-wrap">
                    <span class="team-emoji" aria-hidden="true">{{
                      getTeamEmoji(match.homeTeam)
                    }}</span>
                    <span class="team-name">{{ match.homeTeam }}</span>
                  </div>
                  <strong class="team-score">{{ match.homeScore }}</strong>
                </div>

                <div class="team-row">
                  <div class="team-name-wrap">
                    <span class="team-emoji" aria-hidden="true">{{
                      getTeamEmoji(match.awayTeam)
                    }}</span>
                    <span class="team-name">{{ match.awayTeam }}</span>
                  </div>
                  <strong class="team-score">{{ match.awayScore }}</strong>
                </div>
              </div>
            </article>
          }
        </div>
      </section>

      <section class="section-block grid-section" aria-label="Calendario y clasificación">
        <div>
          <div class="section-head-row">
            <h2 class="section-title">Próximos Partidos</h2>
            <button class="text-link" type="button">
              View all <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>

          <div class="upcoming-list" role="list">
            @for (match of upcomingMatches(); track match.id) {
              <article class="upcoming-card" role="listitem">
                <div class="upcoming-meta">
                  <span>{{ match.date }}</span>
                  <span>{{ match.time }}</span>
                </div>

                <div class="upcoming-teams">
                  <span class="team-inline">
                    <span>{{ match.homeTeam }}</span>
                    <span class="team-emoji" aria-hidden="true">{{
                      getTeamEmoji(match.homeTeam)
                    }}</span>
                  </span>
                  <span class="vs">vs</span>
                  <span class="team-inline">
                    <span class="team-emoji" aria-hidden="true">{{
                      getTeamEmoji(match.awayTeam)
                    }}</span>
                    <span>{{ match.awayTeam }}</span>
                  </span>
                </div>
              </article>
            }
          </div>
        </div>

        <aside>
          <div class="section-head-row">
            <h2 class="section-title">Clasificación</h2>
            <button class="text-link" type="button">
              Full table <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>

          <ol class="standings-list">
            @for (team of standings(); track team.id) {
              <li class="standing-row">
                <span class="rank-pill">{{ team.rank }}</span>
                <span class="team-emoji" aria-hidden="true">{{ getTeamEmoji(team.team) }}</span>
                <span class="standing-team">{{ team.team }}</span>
                <span class="standing-points">{{ team.points }}<small>pts</small></span>
              </li>
            }
          </ol>
        </aside>
      </section>

      <section class="section-block" aria-labelledby="results-title">
        <div class="section-head-row">
          <h2 id="results-title" class="section-title">Resultados Recientes</h2>
          <button class="text-link" type="button">
            All results <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>

        <div class="results-grid" role="list">
          @for (result of recentResults(); track result.id) {
            <article class="result-card" role="listitem">
              <p class="result-datetime">{{ result.dateTime }}</p>

              <div class="teams-stack">
                <div class="team-row">
                  <div class="team-name-wrap">
                    <span class="team-emoji" aria-hidden="true">{{
                      getTeamEmoji(result.homeTeam)
                    }}</span>
                    <span class="team-name">{{ result.homeTeam }}</span>
                  </div>
                  <strong class="team-score">{{ result.homeScore }}</strong>
                </div>

                <div class="team-row">
                  <div class="team-name-wrap">
                    <span class="team-emoji" aria-hidden="true">{{
                      getTeamEmoji(result.awayTeam)
                    }}</span>
                    <span class="team-name">{{ result.awayTeam }}</span>
                  </div>
                  <strong class="team-score">{{ result.awayScore }}</strong>
                </div>
              </div>

              <p class="match-status">Final</p>
            </article>
          }
        </div>
      </section>

      <footer class="page-footer">{{ footerLabel() }}</footer>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .cup-page {
      max-width: 1240px;
      margin: 0 auto;
      padding: 1.25rem 1rem 2rem;
      color: var(--mat-sys-on-surface);
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }

    .header-title-wrap {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 0;
    }

    .header-icon {
      width: 2rem;
      height: 2rem;
      border-radius: 999px;
      display: grid;
      place-items: center;
      color: #fff;
      background: linear-gradient(150deg, #3b82f6 0%, #1d4ed8 100%);
      box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
      flex-shrink: 0;

      mat-icon {
        width: 1rem;
        height: 1rem;
        font-size: 1rem;
      }
    }

    .page-title {
      margin: 0;
      font-size: clamp(1.05rem, 1.8vw, 1.25rem);
      font-weight: 700;
      line-height: 1.25;
    }

    .page-subtitle {
      margin: 0.1rem 0 0;
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.78rem;
    }

    .live-pill {
      background: color-mix(in srgb, #22c55e 18%, white);
      color: #0f7a31;
      border: 1px solid color-mix(in srgb, #22c55e 40%, white);
      border-radius: 999px;
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      padding: 0.25rem 0.55rem;
      flex-shrink: 0;
    }

    .nolive-pill {
      background: color-mix(in srgb, #f87171 18%, white); /* rojo suave */
      color: #b91c1c; /* rojo oscuro */
      border: 1px solid color-mix(in srgb, #f87171 40%, white);
      border-radius: 999px;
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      padding: 0.25rem 0.55rem;
      flex-shrink: 0;
    }

    .tab-nav {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-bottom: 1rem;
      overflow-x: auto;
      padding-bottom: 0.35rem;
    }

    .tab-btn {
      border: 0;
      background: transparent;
      color: var(--mat-sys-on-surface-variant);
      border-radius: 0.55rem;
      padding: 0.45rem 0.65rem;
      font-size: 0.8rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      cursor: pointer;
      transition: background-color 0.2s ease;

      mat-icon {
        width: 0.95rem;
        height: 0.95rem;
        font-size: 0.95rem;
      }

      &:hover {
        background: color-mix(in srgb, var(--mat-sys-primary) 8%, transparent);
      }

      &:focus-visible {
        outline: 2px solid var(--mat-sys-primary);
        outline-offset: 2px;
      }
    }

    .tab-btn-active {
      color: #2563eb;
      background: color-mix(in srgb, #2563eb 14%, white);
    }

    .hero-card {
      margin-bottom: 1.2rem;
      border-radius: 0.75rem;
      padding: 1.2rem;
      color: #fff;
      background: linear-gradient(140deg, #3178f6 0%, #1d4ed8 100%);
      box-shadow: 0 8px 22px rgba(37, 99, 235, 0.25);
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        width: 10rem;
        height: 10rem;
        top: -4.5rem;
        right: -3.5rem;
        border-radius: 999px;
        border: 1.5rem solid rgba(255, 255, 255, 0.08);
        pointer-events: none;
      }
    }

    .hero-status {
      display: inline-block;
      margin-bottom: 0.6rem;
      border-radius: 999px;
      padding: 0.16rem 0.6rem;
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      background: rgba(255, 255, 255, 0.2);
      color: #dbeafe;
      letter-spacing: 0.03em;
    }

    .hero-title {
      margin: 0;
      font-size: clamp(1.45rem, 3vw, 2.05rem);
      line-height: 1.15;
    }

    .hero-subtitle {
      margin: 0.35rem 0 1rem;
      color: #dbeafe;
      font-size: 0.92rem;
    }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 0.65rem;
    }

    .stat-card {
      border-radius: 0.65rem;
      padding: 0.6rem 0.72rem;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(1px);
    }

    .stat-label-wrap {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      color: #bfdbfe;
      font-size: 0.75rem;

      mat-icon {
        width: 0.8rem;
        height: 0.8rem;
        font-size: 0.8rem;
      }
    }

    .stat-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .stat-value {
      margin: 0.22rem 0 0;
      font-size: 1.32rem;
      line-height: 1;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .section-block {
      margin-bottom: 1.15rem;
    }

    .section-title {
      margin: 0;
      font-size: 1.22rem;
      line-height: 1.2;
      font-weight: 800;
    }

    .with-dot::before {
      content: '•';
      color: #ef4444;
      margin-right: 0.4rem;
      font-size: 1.2rem;
      line-height: 1;
      vertical-align: middle;
    }

    .live-grid {
      margin-top: 0.75rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 0.75rem;
    }

    .match-live-card,
    .upcoming-card,
    .result-card,
    .standing-row {
      background: var(--mat-sys-surface-container);
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 0.75rem;
    }

    .match-live-card {
      padding: 0.8rem;
      border-color: color-mix(in srgb, #ef4444 26%, var(--mat-sys-outline-variant));
    }

    .match-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .match-live-badge {
      border-radius: 999px;
      background: #ef4444;
      color: #fff;
      font-size: 0.62rem;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.03em;
      padding: 0.16rem 0.45rem;
    }

    .match-time {
      font-size: 0.72rem;
      color: var(--mat-sys-on-surface-variant);
      font-weight: 600;
    }

    .teams-stack {
      display: grid;
      gap: 0.5rem;
    }

    .team-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }

    .team-name-wrap {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 0;
    }

    .team-emoji {
      font-size: 1.02rem;
      line-height: 1;
      flex-shrink: 0;
    }

    .team-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.88rem;
      font-weight: 600;
    }

    .team-score {
      font-size: 1.15rem;
      line-height: 1;
      font-weight: 800;
    }

    .grid-section {
      display: grid;
      gap: 0.95rem;
      align-items: start;
    }

    .section-head-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.6rem;
      margin-bottom: 0.7rem;
    }

    .text-link {
      border: 0;
      padding: 0.15rem;
      display: inline-flex;
      align-items: center;
      gap: 0.2rem;
      background: transparent;
      color: #2563eb;
      font-size: 0.77rem;
      font-weight: 700;
      cursor: pointer;

      mat-icon {
        width: 0.9rem;
        height: 0.9rem;
        font-size: 0.9rem;
      }

      &:focus-visible {
        outline: 2px solid var(--mat-sys-primary);
        outline-offset: 2px;
        border-radius: 0.4rem;
      }
    }

    .upcoming-list {
      display: grid;
      gap: 0.58rem;
    }

    .upcoming-card {
      padding: 0.72rem 0.85rem;
    }

    .upcoming-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.7rem;
      margin-bottom: 0.55rem;
      font-weight: 600;
    }

    .upcoming-teams {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      font-size: 0.84rem;
      font-weight: 700;
      text-align: center;
    }

    .team-inline {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      min-width: 0;
    }

    .vs {
      text-transform: uppercase;
      color: var(--mat-sys-on-surface-variant);
      font-weight: 700;
      font-size: 0.72rem;
    }

    .standings-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 0.55rem;
    }

    .standing-row {
      min-width: 0;
      display: grid;
      grid-template-columns: auto auto 1fr auto;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 0.75rem;
    }

    .rank-pill {
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 999px;
      display: grid;
      place-items: center;
      background: color-mix(in srgb, #f59e0b 35%, white);
      color: #7c2d12;
      font-size: 0.72rem;
      font-weight: 700;
    }

    .standing-team {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 700;
      font-size: 0.86rem;
    }

    .standing-points {
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.78rem;
      font-weight: 700;
      text-align: right;

      small {
        margin-left: 0.2rem;
      }
    }

    .results-grid {
      margin-top: 0.65rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.75rem;
    }

    .result-card {
      padding: 0.75rem;
    }

    .result-datetime {
      margin: 0 0 0.6rem;
      font-size: 0.69rem;
      color: var(--mat-sys-on-surface-variant);
      font-weight: 600;
    }

    .match-status {
      margin: 0.55rem 0 0;
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .page-footer {
      text-align: center;
      margin-top: 1.4rem;
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.7rem;
      border-top: 1px solid var(--mat-sys-outline-variant);
      padding-top: 0.85rem;
    }

    @media (min-width: 920px) {
      .cup-page {
        padding: 1.4rem 1.5rem 2.25rem;
      }

      .grid-section {
        grid-template-columns: minmax(0, 2fr) minmax(250px, 1fr);
      }

      .hero-card {
        padding: 1.45rem;
      }
    }
  `,
})
export default class CupPage {
  private readonly championshipService = inject(ChampionshipService);
  private readonly route = inject(ActivatedRoute);

  protected readonly tabs = [
    { id: 'overview', label: 'Overview', icon: 'shield' },
    { id: 'matches', label: 'Matches', icon: 'calendar_today' },
    { id: 'standings', label: 'Standings', icon: 'leaderboard' },
    { id: 'teams', label: 'Teams', icon: 'groups' },
    { id: 'players', label: 'Players', icon: 'person' },
    { id: 'stats', label: 'Stats', icon: 'query_stats' },
  ] as const;

  private readonly routeCupSlug = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('cupName') ?? 'liga-invernal-iceplay-2025'),
    ),
    { initialValue: 'liga-invernal-iceplay-2025' },
  );

  private readonly championshipDetail = toSignal<ChampionshipDetailResponse | null>(
    this.route.paramMap.pipe(
      map((params) => params.get('cupName') ?? ''),
      switchMap((cupSlug) =>
        this.championshipService.getAllChampionships().pipe(
          map((championships) => this.findChampionshipBySlug(championships, cupSlug)),
          switchMap((championship) => {
            if (!championship) {
              return of(null);
            }

            const championshipId = this.parseNumericId(championship.id, 0);
            if (championshipId <= 0) {
              return of(null);
            }

            return this.championshipService
              .getChampionshipDetail(championshipId)
              .pipe(map((detail: unknown) => this.toChampionshipDetailResponse(detail)));
          }),
        ),
      ),
      catchError(() => of(null)),
    ),
    { initialValue: null },
  );

  protected readonly cupName = computed(() => {
    const detail = this.championshipDetail();
    if (detail?.name?.trim()) {
      return detail.name;
    }

    return this.normalizeCupName(this.routeCupSlug());
  });

  protected readonly championshipDescription = computed(() => {
    const detail = this.championshipDetail();
    if (detail?.description?.trim()) {
      return detail.description;
    }

    return 'Informacion del campeonato en actualizacion.';
  });

  protected readonly isChampionshipLive = computed(() => {
    const status = this.championshipDetail()?.status;
    return status === 1 || status === '1' || status === 'active';
  });

  protected readonly championshipStatusLabel = computed(() =>
    this.isChampionshipLive() ? 'En progreso' : 'Finalizado',
  );

  private readonly uniqueTeams = computed<ChampionshipTeam[]>(() =>
    this.extractUniqueTeams(this.championshipDetail()),
  );

  protected readonly liveMatches = computed<LiveMatch[]>(() => {
    const activeTeams = this.uniqueTeams().filter((team) => team.hasActiveMatches);
    return this.buildLiveMatches(activeTeams);
  });

  protected readonly upcomingMatches = computed<UpcomingMatch[]>(() => {
    const inactiveTeams = this.uniqueTeams().filter((team) => !team.hasActiveMatches);
    return this.buildUpcomingMatches(inactiveTeams);
  });

  protected readonly standings = computed<StandingRow[]>(() => {
    const detail = this.championshipDetail();
    const teams = this.uniqueTeams();
    if (!detail || teams.length === 0) {
      return [];
    }

    const appearances = this.getTeamAppearances(detail);
    const sorted = [...teams]
      .map((team) => {
        const teamId = this.parseNumericId(team.id, 0);
        const base = appearances.get(teamId) ?? 1;
        const points = base * 3 + (team.hasActiveMatches ? 2 : 0) + (teamId % 3);
        return { team, points };
      })
      .sort((a, b) => b.points - a.points || a.team.name.localeCompare(b.team.name))
      .slice(0, 5);

    return sorted.map((entry, index) => ({
      id: `std-${entry.team.id}`,
      rank: index + 1,
      team: entry.team.name,
      points: entry.points,
    }));
  });

  protected readonly recentResults = computed<RecentResult[]>(() => {
    const teams = this.uniqueTeams();
    const pairs = this.buildTeamPairs(teams).slice(0, 2);
    return pairs.map((pair, index) => {
      const homeId = this.parseNumericId(pair.home.id, index + 1);
      const awayId = this.parseNumericId(pair.away.id, index + 2);
      return {
        id: `res-${index + 1}`,
        dateTime: this.buildRecentResultDate(index),
        homeTeam: pair.home.name,
        awayTeam: pair.away.name,
        homeScore: (homeId + index) % 4,
        awayScore: (awayId + index + 1) % 3,
      };
    });
  });

  protected readonly footerLabel = computed(() => {
    const season = this.championshipDetail()?.season;
    return `${this.cupName()}${season ? ` ${season}` : ''} - Powered by IcePlay Platform`;
  });

  protected readonly summaryStats = computed(() => {
    const teams = this.uniqueTeams().length;
    const matchesPlayed = this.recentResults().length;
    const goalsScored =
      this.recentResults().reduce((total, match) => total + match.homeScore + match.awayScore, 0) +
      this.liveMatches().reduce((total, match) => total + match.homeScore + match.awayScore, 0);

    const avgGoals = matchesPlayed > 0 ? (goalsScored / matchesPlayed).toFixed(1) : '0.0';

    return [
      { label: 'Equipos', value: String(teams), icon: 'groups' },
      { label: 'Partidos Jugados', value: String(matchesPlayed), icon: 'calendar_month' },
      { label: 'Goles Anotados', value: String(goalsScored), icon: 'sports_score' },
      { label: 'Promedio de Goles/Partido', value: avgGoals, icon: 'query_stats' },
    ];
  });

  private findChampionshipBySlug(
    championships: ChampionshipSummary[],
    cupSlugParam: string,
  ): ChampionshipSummary | undefined {
    const normalizedParam = this.normalizeSlug(cupSlugParam);
    return championships.find((championship) =>
      this.normalizeSlug(championship.slug ?? championship.name ?? '').includes(normalizedParam),
    );
  }

  private toChampionshipDetailResponse(input: unknown): ChampionshipDetailResponse | null {
    if (!input || typeof input !== 'object') {
      return null;
    }

    const detail = input as Partial<ChampionshipDetailResponse>;
    return {
      id: detail.id ?? '',
      name: typeof detail.name === 'string' ? detail.name : '',
      slug: typeof detail.slug === 'string' ? detail.slug : '',
      description: typeof detail.description === 'string' ? detail.description : '',
      status:
        typeof detail.status === 'number' || typeof detail.status === 'string' ? detail.status : 0,
      season: typeof detail.season === 'string' ? detail.season : '',
      totalTeams: typeof detail.totalTeams === 'number' ? detail.totalTeams : undefined,
      phases: Array.isArray(detail.phases) ? detail.phases : [],
    };
  }

  private extractUniqueTeams(detail: ChampionshipDetailResponse | null): ChampionshipTeam[] {
    if (!detail?.phases?.length) {
      return [];
    }

    const teamMap = new Map<number, ChampionshipTeam>();
    for (const phase of detail.phases) {
      for (const group of phase.groups ?? []) {
        for (const team of group.teams ?? []) {
          if (!teamMap.has(team.id)) {
            teamMap.set(team.id, team);
          }
        }
      }
    }
    console.log('Unique teams extracted:', teamMap.size);
    return Array.from(teamMap.values());
  }

  private buildLiveMatches(teams: ChampionshipTeam[]): LiveMatch[] {
    const pairs = this.buildTeamPairs(teams).slice(0, 2);
    return pairs.map((pair, index) => {
      const homeId = this.parseNumericId(pair.home.id, index + 1);
      const awayId = this.parseNumericId(pair.away.id, index + 2);
      return {
        id: `live-${index + 1}`,
        homeTeam: pair.home.name,
        awayTeam: pair.away.name,
        homeScore: (homeId + index) % 5,
        awayScore: (awayId + index + 1) % 4,
        time: `${19 + index * 2}:00`,
      };
    });
  }

  private buildUpcomingMatches(teams: ChampionshipTeam[]): UpcomingMatch[] {
    const pairs = this.buildTeamPairs(teams).slice(0, 3);
    return pairs.map((pair, index) => ({
      id: `next-${index + 1}`,
      date: this.buildUpcomingDate(index),
      time: `${18 + index}:30`,
      homeTeam: pair.home.name,
      awayTeam: pair.away.name,
    }));
  }

  private buildTeamPairs(
    teams: ChampionshipTeam[],
  ): { home: ChampionshipTeam; away: ChampionshipTeam }[] {
    const pairs: { home: ChampionshipTeam; away: ChampionshipTeam }[] = [];
    for (let index = 0; index + 1 < teams.length; index += 2) {
      pairs.push({ home: teams[index], away: teams[index + 1] });
    }

    return pairs;
  }

  private getTeamAppearances(detail: ChampionshipDetailResponse): Map<number, number> {
    const appearances = new Map<number, number>();
    for (const phase of detail.phases ?? []) {
      for (const group of phase.groups ?? []) {
        for (const team of group.teams ?? []) {
          const current = appearances.get(team.id) ?? 0;
          appearances.set(team.id, current + 1);
        }
      }
    }

    return appearances;
  }

  private buildUpcomingDate(index: number): string {
    const baseDate = new Date('2026-05-01');
    baseDate.setDate(baseDate.getDate() + index);
    return baseDate.toISOString().split('T')[0];
  }

  private buildRecentResultDate(index: number): string {
    const baseDate = new Date('2026-04-20T20:00:00');
    baseDate.setDate(baseDate.getDate() - index);
    const date = baseDate.toISOString().split('T')[0];
    const hour = 20 - index;
    return `${date} - ${String(hour).padStart(2, '0')}:00`;
  }

  private parseNumericId(value: string | number, fallback: number): number {
    if (typeof value === 'number') {
      return value;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }

  private normalizeSlug(value: string): string {
    return value
      .toLowerCase()
      .replace(/^\/+|\/+$/g, '')
      .replace(/\s+/g, '-');
  }

  protected getTeamEmoji(teamName: string): string {
    const emojiMap: Record<string, string> = {
      'Lobos Grises': '🐺',
      'Dragones Rojos': '🐉',
      'Aguilas Reales': '🦅',
      'Panteras Negras': '🐆',
      'Halcones Azules': '🦅',
      'Leones Dorados': '🦁',
      'Osos Polares FC': '🐻',
      'Tigres del Sur': '🐯',
    };

    return emojiMap[teamName] ?? '🏒';
  }

  private normalizeCupName(slug: string): string {
    if (!slug.trim()) {
      return 'Liga Invernal IcePlay 2025';
    }

    const normalizedName = slug
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return normalizedName;
  }
}
