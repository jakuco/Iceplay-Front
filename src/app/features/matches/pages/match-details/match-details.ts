import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  inject,
  signal,
  effect,
  OnDestroy,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, forkJoin, of, map, type Observable } from 'rxjs';
import { I18nService } from '@core/services/i18n.service';
import { TranslatePipe } from '@core/pipes/translate.pipe';
import { MatchService } from '@core/services/match.service';
import { MatchEventService } from '@core/services/match-event.service';
import { TeamService } from '@core/services/team.service';
import { ChampionshipService } from '@core/services/championship.service';
import { MatchByIdResponse } from '@core/models/match.model';
import {
  MatchEvent,
  MatchEventViewModel,
  mapEventToViewModel,
} from '@core/models/event.model';
import { TeamProfile } from '@core/models/team.model';
import {
  Championship,
  ChampionshipLeaders,
  LeaderRow,
  LeaderboardCategory,
} from '@core/models/championship.model';

interface DisplayMatch {
  id: string;
  homeTeam: { id: string; name: string; logo: string };
  awayTeam: { id: string; name: string; logo: string };
  status: 'scheduled' | 'live' | 'finished';
  time?: string;
  minute?: string;
  homeScore?: number;
  awayScore?: number;
  date: Date;
  league: string;
  events?: MatchEventViewModel[];
}

interface DisplayEvent {
  minute: string;
  type: string;
  playerName: string;
  teamName: string;
  description?: string;
}

@Component({
  selector: 'app-match-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTabsModule, RouterLink, TranslatePipe],
  template: `
    @if (isLoading()) {
      <div class="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <mat-icon class="animate-spin text-6xl! opacity-50">refresh</mat-icon>
        <p class="text-secondary">{{ 'common.loading' | translate }}</p>
      </div>
    } @else if (match(); as m) {
      <div class="flex min-h-full flex-col gap-6 p-4 md:p-6">
        <nav class="flex flex-wrap items-center gap-2 text-sm">
          <a
            (click)="goBack()"
            class="text-secondary hover:text-primary flex cursor-pointer items-center gap-1"
          >
            <mat-icon class="text-base!">arrow_back</mat-icon>
            {{ 'common.matches' | translate }}
          </a>
          <span class="text-tertiary">/</span>
          <span class="text-secondary">{{ m.league }}</span>
          <span class="text-tertiary">/</span>
          <span>{{ m.homeTeam.name }} vs {{ m.awayTeam.name }}</span>
        </nav>

        <div>
          <div class="flex flex-col gap-4 md:flex-row md:flex-wrap">
            <div
              class="card flex min-w-[140px] flex-1 flex-col items-center gap-3 rounded-xl p-4 sm:flex-row md:p-6 cursor-pointer hover:ring-2 hover:ring-(--mat-sys-primary)/40 transition-shadow"
              [routerLink]="['/team', m.homeTeam.id]"
            >
              <img
                class="h-14 w-14 sm:h-16 sm:w-16"
                [alt]="m.homeTeam.name + ' Logo'"
                [src]="m.homeTeam.logo"
              />
              <div class="text-center sm:text-left">
                <p class="text-secondary text-sm font-medium">{{ 'match.home' | translate }}</p>
                <p class="text-lg font-bold md:text-xl">{{ m.homeTeam.name }}</p>
                @if (m.status !== 'scheduled') {
                  <p class="text-primary text-3xl font-black md:text-4xl">{{ m.homeScore }}</p>
                }
              </div>
            </div>

            <div
              class="status-card flex min-w-[140px] flex-1 flex-col items-center justify-center gap-2 rounded-xl p-4 md:p-6"
            >
              @switch (m.status) {
                @case ('scheduled') {
                  <span
                    class="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 uppercase"
                  >
                    {{ 'match.status.scheduled' | translate }}
                  </span>
                  <p class="text-2xl font-bold">{{ m.time }}</p>
                }
                @case ('live') {
                  <span
                    class="animate-pulse rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400 uppercase"
                  >
                    {{ 'match.status.live' | translate }} - {{ m.minute }}'
                  </span>
                }
                @case ('finished') {
                  <span
                    class="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400 uppercase"
                  >
                    {{ 'match.status.fullTime' | translate }}
                  </span>
                }
              }
              <p class="text-secondary text-sm">{{ formattedMatchDate(m) }}</p>
              <p class="text-secondary text-xs">{{ m.league }}</p>
            </div>

            <div
              class="card flex min-w-[140px] flex-1 flex-col-reverse items-center justify-end gap-3 rounded-xl p-4 sm:flex-row md:p-6 cursor-pointer hover:ring-2 hover:ring-(--mat-sys-primary)/40 transition-shadow"
              [routerLink]="['/team', m.awayTeam.id]"
            >
              <div class="text-center sm:text-right">
                <p class="text-secondary text-sm font-medium">{{ 'match.away' | translate }}</p>
                <p class="text-lg font-bold md:text-xl">{{ m.awayTeam.name }}</p>
                @if (m.status !== 'scheduled') {
                  <p class="text-primary text-3xl font-black md:text-4xl">{{ m.awayScore }}</p>
                }
              </div>
              <img
                class="h-14 w-14 sm:h-16 sm:w-16"
                [alt]="m.awayTeam.name + ' Logo'"
                [src]="m.awayTeam.logo"
              />
            </div>
          </div>
        </div>

        <mat-tab-group>
          <mat-tab [label]="'match.tabs.summary' | translate">
            <div class="py-4">
              <h2 class="mb-4 text-lg font-bold">Registro de Eventos</h2>
              <div class="card overflow-hidden rounded-xl border border-(--mat-sys-outline-variant)">
                @if (m.events && m.events.length === 0) {
                  <div class="text-secondary p-8 text-center">
                    <mat-icon class="mb-2 size-12! text-5xl! opacity-50">sports_soccer</mat-icon>
                    <p>No hay eventos registrados aún.</p>
                  </div>
                } @else if (m.events && m.events.length > 0) {
                  <div class="overflow-x-auto">
                    <table class="w-full">
                      <thead>
                        <tr class="table-header">
                          <th class="w-24 px-4 py-3 text-left text-xs uppercase tracking-wider">Tiempo</th>
                          <th class="w-32 px-4 py-3 text-left text-xs uppercase tracking-wider">Evento</th>
                          <th class="px-4 py-3 text-left text-xs uppercase tracking-wider">Jugador</th>
                          <th class="px-4 py-3 text-left text-xs uppercase tracking-wider">Equipo</th>
                        </tr>
                      </thead>

                      <tbody class="divide-y divide-(--mat-sys-outline-variant)">
                        @for (event of m.events; track event.id) {
                          <tr>
                            <td class="text-secondary px-4 py-3 font-mono text-sm whitespace-nowrap">
                              {{ event.timeFormatted }}
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap">
                              <span class="text-sm font-semibold">
                                {{ event.typeLabel }}
                              </span>
                            </td>

                            <td class="px-4 py-3 text-sm whitespace-nowrap">
                              {{ playerName(event) }}
                            </td>

                            <td class="text-secondary px-4 py-3 text-sm whitespace-nowrap">
                              {{ event.isHomeTeam ? m.homeTeam.name : m.awayTeam.name }}
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                } @else {
                  <div class="text-secondary p-8 text-center">
                    <mat-icon class="mb-2 size-12! text-5xl! opacity-50">sports_soccer</mat-icon>
                    <p>No hay eventos registrados aún.</p>
                  </div>
                }
              </div>
            </div>
          </mat-tab>

          <mat-tab [label]="'match.tabs.statistics' | translate">
            <div class="py-4">
              <h2 class="mb-4 text-lg font-bold">Estadísticas individuales</h2>

              <div class="leaders-grid">
                @for (card of leaderCards(); track card.key) {
                  <a
                    class="leader-card"
                    [routerLink]="['/championship', championshipId(), 'ranking', card.category]"
                  >
                    <div class="leader-card__header">
                      <mat-icon class="leader-card__icon">{{ card.icon }}</mat-icon>
                      <h4 class="leader-card__title">{{ card.title }}</h4>
                    </div>

                    @if (card.leader) {
                      <div class="leader-card__body">
                        <div class="leader-card__name">{{ card.leader.playerName }}</div>
                        <div class="leader-card__team">{{ card.leader.teamName || '-' }}</div>
                        <div class="leader-card__value">
                          {{ card.leader.value }} {{ card.unit }}
                        </div>
                      </div>
                    } @else {
                      <div class="leader-card__empty">Sin datos</div>
                    }
                  </a>
                }
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    } @else {
      <div class="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <mat-icon class="text-6xl! opacity-50">error_outline</mat-icon>
        <h2 class="text-xl font-bold">{{ 'match.notFound.title' | translate }}</h2>
        <p class="text-secondary">{{ 'match.notFound.message' | translate }}</p>
        <a (click)="goBack()" class="text-primary flex cursor-pointer items-center gap-1 hover:underline">
          <mat-icon class="text-base!">arrow_back</mat-icon>
          {{ 'match.notFound.backToMatches' | translate }}
        </a>
      </div>
    }
  `,
  styles: `
    .card {
      background-color: var(--mat-sys-surface-container);
    }

    .status-card {
      background-color: color-mix(in srgb, var(--mat-sys-primary) 10%, transparent);
    }

    .table-header {
      background-color: var(--mat-sys-surface-container-high);
      color: var(--mat-sys-on-surface-variant);
    }

    .leaders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.75rem;
    }

    .leader-card {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      padding: 1rem;
      background: var(--mat-sys-surface-container);
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 12px;
      color: inherit;
      text-decoration: none;
      transition: border-color 0.15s ease, transform 0.1s ease;
    }

    .leader-card:hover {
      border-color: var(--mat-sys-primary);
      transform: translateY(-1px);
    }

    .leader-card__header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .leader-card__icon {
      color: var(--mat-sys-primary);
    }

    .leader-card__title {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 700;
    }

    .leader-card__body {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .leader-card__name {
      font-size: 1rem;
      font-weight: 700;
    }

    .leader-card__team {
      font-size: 0.85rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .leader-card__value {
      font-size: 1rem;
      font-weight: 700;
      color: var(--mat-sys-primary);
    }

    .leader-card__empty {
      color: var(--mat-sys-on-surface-variant);
      font-style: italic;
    }

    .score-header {
      display: flex;
      flex-direction: column;
      gap: 12px;

      @media (min-width: 768px) {
        flex-direction: row;
      }
    }
  `,
})
export default class MatchDetails implements OnDestroy {
  private readonly i18nService = inject(I18nService);
  private readonly matchService = inject(MatchService);
  private readonly matchEventService = inject(MatchEventService);
  private readonly teamService = inject(TeamService);
  private readonly championshipService = inject(ChampionshipService);
  private readonly location = inject(Location);

  goBack(): void {
    const state = history.state as { navigationId?: number } | null;
    if (state && typeof state.navigationId === 'number' && state.navigationId > 1) {
      this.location.back();
    } else {
      this.location.historyGo(-1);
    }
  }

  matchId = input.required<string>();

  private matchData = signal<MatchByIdResponse | null>(null);
  private homeTeam = signal<TeamProfile | null>(null);
  private awayTeam = signal<TeamProfile | null>(null);
  private championship = signal<Championship | null>(null);
  private events = signal<MatchEventViewModel[]>([]);
  private eventSubscription?: Subscription;
  private leaders = signal<ChampionshipLeaders | null>(null);

  championshipId = computed(() => this.championship()?.id ?? null);

  leaderCards = computed<Array<{
  key: string;
  category: LeaderboardCategory;
  title: string;
  icon: string;
  unit: string;
  leader: LeaderRow | null;
}>>(() => {
  const data = this.leaders()?.leaderboard ?? null;
  const first = (rows: LeaderRow[] | null | undefined): LeaderRow | null =>
    rows && rows.length > 0 ? rows[0] : null;

  return [
    {
      key: 'topScorer',
      category: 'scorers',
      title: 'Goleador',
      icon: 'sports_soccer',
      unit: 'goles',
      leader: first(data?.scorers),
    },
    {
      key: 'topAssist',
      category: 'assisters',
      title: 'Asistencias',
      icon: 'handshake',
      unit: 'asistencias',
      leader: first(data?.assisters),
    },
    {
      key: 'topMvp',
      category: 'mvps',
      title: 'MVPs',
      icon: 'emoji_events',
      unit: 'mvps',
      leader: first(data?.mvps),
    },
    {
      key: 'topPenaltyScorer',
      category: 'penaltyScorers',
      title: 'Goles de penal',
      icon: 'adjust',
      unit: 'penales',
      leader: first(data?.penaltyScorers),
    },
    {
      key: 'topYellow',
      category: 'yellowCards',
      title: 'Tarjetas Amarillas',
      icon: 'warning',
      unit: 'amarillas',
      leader: first(data?.yellowCards),
    },
    {
      key: 'topRed',
      category: 'redCards',
      title: 'Tarjetas Rojas',
      icon: 'block',
      unit: 'rojas',
      leader: first(data?.redCards),
    },
  ];
});

  isLoading = signal(true);

  private readonly SCORE_LABELS = new Set(['gol', 'gol por penal']);

  match = computed<DisplayMatch | null>(() => {
    const m = this.matchData();
    const home = this.homeTeam();
    const away = this.awayTeam();
    const champ = this.championship();
    const evts = this.events();

    if (!m || !home || !away) return null;

    const scheduledStart = this.toDate(m.scheduledStart);
    if (!scheduledStart) return null;

    const actualStartTime = this.toDate(
      (m as { actualStartTime?: string | Date | null }).actualStartTime
    );

    const normalize = (s: string) => s.toLowerCase().trim();

    const homeScoreFromEvents = evts.filter(
      (e) => this.SCORE_LABELS.has(normalize(this.safeTypeLabel(e.typeLabel))) && e.isHomeTeam
    ).length;

    const awayScoreFromEvents = evts.filter(
      (e) => this.SCORE_LABELS.has(normalize(this.safeTypeLabel(e.typeLabel))) && !e.isHomeTeam
    ).length;

    const backendHomeScore = Number((m as { homeScore?: number | null }).homeScore ?? 0);
    const backendAwayScore = Number((m as { awayScore?: number | null }).awayScore ?? 0);

    const hasScoringEvents = homeScoreFromEvents > 0 || awayScoreFromEvents > 0;
    const homeScore = hasScoringEvents ? homeScoreFromEvents : backendHomeScore;
    const awayScore = hasScoringEvents ? awayScoreFromEvents : backendAwayScore;

    return {
      id: String(m.id),
      homeTeam: {
        id: String(home.id),
        name: home.name,
        logo: home.logoUrl || 'https://via.placeholder.com/50',
      },
      awayTeam: {
        id: String(away.id),
        name: away.name,
        logo: away.logoUrl || 'https://via.placeholder.com/50',
      },
      status: this.mapMatchStatus(m.status),
      time: scheduledStart.toLocaleTimeString(this.i18nService.getLocale(), {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      minute:
        m.status === 'live' && actualStartTime
          ? Math.max(0, Math.floor((Date.now() - actualStartTime.getTime()) / 60_000)).toString()
          : undefined,
      homeScore,
      awayScore,
      date: scheduledStart,
      league: champ?.name ?? 'Campeonato',
      events: evts,
    };
  });

  constructor() {
    effect(() => {
      const id = this.matchId();
      if (id) {
        this.loadMatch(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription?.unsubscribe();
  }

  private loadMatch(id: string): void {
    this.isLoading.set(true);

    this.matchService.getMatchById(id).subscribe({
      next: (match) => {
        this.matchData.set(match);

        const isLive =
          match.status === 'live' ||
          match.status === 'warmup' ||
          match.status === 'halftime' ||
          match.status === 'break' ||
          match.status === 'overtime' ||
          match.status === 'penalties';

        forkJoin({
          homeTeam: this.teamService.getTeamWithPlayers(String(match.homeTeamId)),
          awayTeam: this.teamService.getTeamWithPlayers(String(match.awayTeamId)),
          championship: this.resolveChampionship(match),
        }).subscribe({
          next: ({ homeTeam, awayTeam, championship }) => {
            this.homeTeam.set(homeTeam);
            this.awayTeam.set(awayTeam);
            this.championship.set(championship);

            if (championship?.id) {
              this.championshipService.getLeaders(String(championship.id)).subscribe({
                next: (data) => this.leaders.set(data),
                error: (err) => console.error('Error loading leaders', err),
              });
            } else {
              this.leaders.set(null);
            }

            this.isLoading.set(false);
            this.loadEvents(id, isLive);
          },
          error: (error) => {
            console.error('Error loading match details', error);
            this.isLoading.set(false);
          },
        });
      },
      error: (error) => {
        console.error('Error loading match', error);
        this.isLoading.set(false);
      },
    });
  }

  private resolveChampionship(match: MatchByIdResponse): Observable<Championship | null> {
    const championshipId = (match as { championshipId?: string | number | null }).championshipId;

    if (!championshipId) {
      return of(null);
    }

    return this.championshipService.getChampionshipById(String(championshipId));
  }

  private loadEvents(matchId: string, isLive: boolean): void {
    this.eventSubscription?.unsubscribe();
    this.events.set([]);

    const homeTeamId = String(this.homeTeam()?.id ?? '');
    const PERIOD_DURATION_SECONDS = 2700;

    const subscribeToSSE = () => {
      this.eventSubscription = this.matchEventService
        .connectToMatchStream(matchId, homeTeamId, PERIOD_DURATION_SECONDS)
        .subscribe({
          next: (msg) => {
            if (msg.type === 'add') {
              this.events.update((current) => {
                if (current.some((e) => e.id === msg.event.id)) return current;
                return [...current, msg.event].sort((a, b) => a.timeRaw - b.timeRaw);
              });
            } else {
              this.events.update((current) => current.filter((e) => e.id !== msg.eventId));
            }
          },
          error: (error) => {
            console.error('Error loading events via SSE', error);
          },
        });
    };

    if (isLive) {
      this.matchEventService
        .getMatchEvents(matchId)
        .pipe(
          map((rawEvents: MatchEvent[]) =>
            rawEvents
              .map((e) => mapEventToViewModel(e, homeTeamId, PERIOD_DURATION_SECONDS))
              .sort((a, b) => a.timeRaw - b.timeRaw)
          )
        )
        .subscribe({
          next: (viewModels) => {
            this.events.set(viewModels);
            subscribeToSSE();
          },
          error: (error) => {
            console.error('Error bootstrapping live match events', error);
            subscribeToSSE();
          },
        });
    } else {
      this.matchEventService
        .getMatchEvents(matchId)
        .pipe(
          map((rawEvents: MatchEvent[]) =>
            rawEvents
              .map((e) => mapEventToViewModel(e, homeTeamId, PERIOD_DURATION_SECONDS))
              .sort((a, b) => a.timeRaw - b.timeRaw)
          )
        )
        .subscribe({
          next: (viewModels) => {
            this.events.set(viewModels);
          },
          error: (error) => {
            console.error('Error loading match events', error);
          },
        });
    }
  }

  private resolvePlayerName(event: MatchEventViewModel): string {
    const info = (event as {
      playerInfo?: { firstName?: string; lastName?: string; nickName?: string; number?: number };
    }).playerInfo;

    if (info) {
      const fullName = [info.firstName, info.lastName].filter(Boolean).join(' ').trim();

      if (fullName) {
        return info.number !== undefined && info.number !== null
          ? `#${info.number} ${fullName}`.trim()
          : fullName;
      }

      if (info.nickName) {
        return info.number !== undefined && info.number !== null
          ? `#${info.number} ${info.nickName}`.trim()
          : info.nickName;
      }
    }

    const team = event.isHomeTeam ? this.homeTeam() : this.awayTeam();
    const p = team?.players?.find((pl) => String(pl.id) === String(event.playerId));

    if (p) {
      const fullName = [p.firstName, p.lastName].filter(Boolean).join(' ').trim();
      if (p.number !== undefined && p.number !== null) {
        return `#${p.number} ${fullName}`.trim();
      }
      return fullName || '—';
    }

    return event.playerId ? `#${String(event.playerId)}` : '—';
  }

  private transformEvents(
    events: MatchEventViewModel[],
    homeTeam: TeamProfile,
    awayTeam: TeamProfile
  ): DisplayEvent[] {
    return events
      .map((event) => {
        const team = event.isHomeTeam ? homeTeam : awayTeam;

        return {
          minute: event.timeFormatted,
          type: this.safeTypeLabel(event.typeLabel),
          playerName: this.resolvePlayerName(event),
          teamName: team.name,
          description: typeof event.description === 'string' ? event.description : undefined,
        };
      })
      .sort((a, b) => {
        const minuteA = parseInt(a.minute.replace(/[^0-9]/g, ''), 10) || 0;
        const minuteB = parseInt(b.minute.replace(/[^0-9]/g, ''), 10) || 0;
        return minuteA - minuteB;
      });
  }

  private safeTypeLabel(typeLabel: string | null | undefined): string {
    return (typeLabel ?? '').trim();
  }

  private toDate(value: string | Date | null | undefined): Date | null {
    if (!value) return null;
    if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  private mapMatchStatus(status: string): 'scheduled' | 'live' | 'finished' {
    if (
      status === 'live' ||
      status === 'warmup' ||
      status === 'halftime' ||
      status === 'break' ||
      status === 'overtime' ||
      status === 'penalties'
    ) {
      return 'live';
    }
    if (status === 'finished') {
      return 'finished';
    }
    return 'scheduled';
  }

  formattedMatchDate(match: DisplayMatch): string {
    return this.i18nService.formatDate(match.date, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  getEventIcon(type: string): string {
    const icons: Record<string, string> = {
      Gol: 'sports_soccer',
      'Gol por penal': 'sports_soccer',
      'Gol recibido': 'sports_soccer',
      'Gol recibido por penal': 'sports_soccer',
      Asistencia: 'sports_soccer',
      'Tarjeta Amarilla': 'square',
      'Tarjeta Roja': 'square',
      Sustitución: 'swap_vert',
      Falta: 'warning',
      'MVP de Partido': 'star',
    };
    return icons[type] ?? 'event';
  }

    getEventColor(type: string): string {
    const colors: Record<string, string> = {
      Gol: '#4ade80',
      'Gol por penal': '#22c55e',
      'Gol recibido': '#f87171',
      'Gol recibido por penal': '#ef4444',
      Asistencia: '#60a5fa',
      'Tarjeta Amarilla': '#facc15',
      'Tarjeta Roja': '#ef4444',
      Sustitución: '#a78bfa',
      Falta: '#fb923c',
      'MVP de Partido': '#f59e0b',
    };
    return colors[type] ?? '#94a3b8';
  }

  playerName(event: MatchEventViewModel): string {
    return this.resolvePlayerName(event);
  }
}

  