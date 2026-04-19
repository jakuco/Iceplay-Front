import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ChampionshipService } from '../../../core/services/championship.service';
import {
  ChampionshipFixture,
  ChampionshipLeaders,
  ChampionshipStanding,
  FixtureMatch,
  FixturePhaseData,
  LeaderRow,
  LeaderboardCategory,
} from '../../../core/models/championship.model';

@Component({
  selector: 'app-championship-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/matches" aria-label="Volver">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <div>
            <h1 class="page-title">{{ championshipName() }}</h1>
            <p class="page-subtitle">{{ championshipSeason() }}</p>
          </div>
        </div>
      </header>

      @if (loading()) {
        <div class="loading-state">
          <mat-spinner diameter="48" />
        </div>
      } @else {
        <mat-tab-group>

          <mat-tab label="Fixture">
            <div class="tab-content">
              @if (fixturePhases().length === 0) {
                <p class="text-secondary">No hay partidos generados para este campeonato.</p>
              } @else {
                @for (phase of fixturePhases(); track phase.phaseId) {
                  <div class="fixture-phase">
                    <h3 class="fixture-phase-title">
                      {{ phase.name }}
                      <span class="fixture-phase-meta">· {{ phase.totalMatches }} partidos</span>
                    </h3>

                    @for (round of phase.roundList; track round.number) {
                      <div class="fixture-round">
                        <h4 class="fixture-round-title">Ronda {{ round.number }}</h4>

                        <div class="fixture-matches">
                          @for (match of round.matches; track match.id) {
                            <div
                              class="fixture-match"
                              [class.fixture-match--played]="match.status === 'finished'"
                            >
                              <div class="fixture-team fixture-team--home">
                                @if (match.homeTeam?.logoUrl) {
                                  <img
                                    [src]="match.homeTeam!.logoUrl"
                                    [alt]="match.homeTeam!.name"
                                    class="fixture-logo"
                                  />
                                }
                                <span>{{ match.homeTeam?.name ?? 'Por definir' }}</span>
                              </div>

                              <div class="fixture-score">
                                @if (match.status === 'finished') {
                                  <span class="score-value">
                                    {{ match.homeScore }} – {{ match.awayScore }}
                                  </span>
                                } @else {
                                  <span class="score-pending">
                                    {{
                                      match.scheduledStart
                                        ? (match.scheduledStart | date:'dd/MM HH:mm')
                                        : 'vs'
                                    }}
                                  </span>
                                }
                              </div>

                              <div class="fixture-team fixture-team--away">
                                @if (match.awayTeam?.logoUrl) {
                                  <img
                                    [src]="match.awayTeam!.logoUrl"
                                    [alt]="match.awayTeam!.name"
                                    class="fixture-logo"
                                  />
                                }
                                <span>{{ match.awayTeam?.name ?? 'Por definir' }}</span>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                }
              }
            </div>
          </mat-tab>

          <mat-tab label="Estadísticas">
            <div class="tab-content">
              @if (leadersLoading()) {
                <div class="leaders-loading">
                  <mat-spinner diameter="32" />
                </div>
              } @else if (leadersError()) {
                <p class="text-secondary">No se pudieron cargar las estadísticas.</p>
              } @else {
                <div class="leaders-grid">
                  @for (card of leaderCards(); track card.key) {
                    <a
                      class="leader-card"
                      [routerLink]="['/championship', id(), 'ranking', card.category]"
                      [attr.aria-label]="'Ver ranking de ' + card.title"
                    >
                      <div class="leader-card__header">
                        <mat-icon class="leader-card__icon">{{ card.icon }}</mat-icon>
                        <h4 class="leader-card__title">{{ card.title }}</h4>
                        <mat-icon class="leader-card__chevron">chevron_right</mat-icon>
                      </div>

                      @if (card.leader) {
                        <div class="leader-card__body">
                          <div class="leader-card__name">{{ card.leader.playerName }}</div>

                          @if (card.leader.teamName) {
                            <div class="leader-card__team">{{ card.leader.teamName }}</div>
                          }

                          <div class="leader-card__value">
                            <span class="leader-card__count">{{ card.leader.value }}</span>
                            <span class="leader-card__unit">{{ card.unit }}</span>
                          </div>
                        </div>
                      } @else {
                        <div class="leader-card__empty">Sin datos</div>
                      }
                    </a>
                  }
                </div>
              }
            </div>
          </mat-tab>

          <mat-tab label="Tabla">
            <div class="tab-content">
              @if (standingsLoading()) {
                <div class="leaders-loading">
                  <mat-spinner diameter="32" />
                </div>
              } @else if (standingsError()) {
                <p class="text-secondary">No se pudo cargar la tabla de posiciones.</p>
              } @else if (standingsByPhase().length === 0) {
                <p class="text-secondary">No hay partidos finalizados para calcular la tabla.</p>
              } @else {
                @for (phase of standingsByPhase(); track phase.phaseId) {
                  <div class="fixture-phase">
                    <h3 class="fixture-phase-title">
                      {{ phase.phaseName }}
                      <span class="fixture-phase-meta">· {{ phase.rows.length }} equipos</span>
                    </h3>

                    <div class="standings-table-wrapper">
                      <table class="standings-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Equipo</th>
                            <th>PJ</th>
                            <th>PG</th>
                            <th>PE</th>
                            <th>PP</th>
                            <th>GF</th>
                            <th>GC</th>
                            <th>DG</th>
                            <th>PTS</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (row of phase.rows; track row.team_id; let i = $index) {
                            <tr>
                              <td>{{ i + 1 }}</td>
                              <td class="standings-team">{{ row.team_name }}</td>
                              <td>{{ toNumber(row.pj) }}</td>
                              <td>{{ toNumber(row.pg) }}</td>
                              <td>{{ toNumber(row.pe) }}</td>
                              <td>{{ toNumber(row.pp) }}</td>
                              <td>{{ toNumber(row.gf) }}</td>
                              <td>{{ toNumber(row.gc) }}</td>
                              <td>{{ toNumber(row.dg) }}</td>
                              <td class="standings-points">{{ toNumber(row.pts) }}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                }
              }
            </div>
          </mat-tab>

        </mat-tab-group>
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

    .tab-content {
      padding: 1.5rem;
      background: var(--mat-sys-surface-container);
      border-radius: 0 0 12px 12px;
      min-height: 300px;
    }

    .loading-state {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }

    .fixture-phase {
      margin-bottom: 2rem;
    }

    .fixture-phase-title {
      font-size: 1rem;
      font-weight: 700;
      margin: 0 0 0.75rem;
      color: var(--mat-sys-on-surface);
      border-bottom: 2px solid var(--mat-sys-outline-variant);
      padding-bottom: 0.5rem;
    }

    .fixture-phase-meta {
      font-weight: 400;
      font-size: 0.8rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .fixture-round {
      margin-bottom: 1.25rem;
    }

    .fixture-round-title {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--mat-sys-on-surface-variant);
      margin: 0 0 0.5rem;
    }

    .fixture-matches {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .fixture-match {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 1rem;
      background: var(--mat-sys-surface);
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 8px;
    }

    .fixture-match--played {
      background: var(--mat-sys-surface-container-lowest);
    }

    .fixture-team {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .fixture-team--away {
      flex-direction: row-reverse;
      text-align: right;
    }

    .fixture-logo {
      width: 24px;
      height: 24px;
      object-fit: contain;
      border-radius: 4px;
    }

    .fixture-score {
      text-align: center;
      min-width: 80px;
    }

    .score-value {
      font-size: 1rem;
      font-weight: 700;
      color: var(--mat-sys-on-surface);
    }

    .score-pending {
      font-size: 0.75rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .leaders-loading {
      display: flex;
      justify-content: center;
      padding: 2rem 0;
    }

    .leaders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.75rem;
    }

    .leader-card {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.9rem 1rem;
      background: var(--mat-sys-surface);
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 10px;
      text-decoration: none;
      color: inherit;
      transition: background-color 0.15s ease, transform 0.15s ease;
    }

    .leader-card:hover {
      background: var(--mat-sys-surface-container-high);
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
      flex: 1;
      font-size: 0.875rem;
      font-weight: 600;
      margin: 0;
    }

    .leader-card__chevron {
      color: var(--mat-sys-on-surface-variant);
    }

    .leader-card__body {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .leader-card__name {
      font-size: 1rem;
      font-weight: 700;
    }

    .leader-card__team {
      font-size: 0.75rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .leader-card__value {
      display: flex;
      align-items: baseline;
      gap: 0.35rem;
      margin-top: 0.2rem;
    }

    .leader-card__count {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--mat-sys-primary);
      line-height: 1;
    }

    .leader-card__unit {
      font-size: 0.75rem;
      color: var(--mat-sys-on-surface-variant);
      text-transform: lowercase;
    }

    .leader-card__empty {
      font-size: 0.8rem;
      color: var(--mat-sys-on-surface-variant);
      font-style: italic;
    }

    .standings-table-wrapper {
      overflow-x: auto;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 10px;
      background: var(--mat-sys-surface);
    }

    .standings-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }

    .standings-table th,
    .standings-table td {
      padding: 0.5rem 0.75rem;
      text-align: center;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
    }

    .standings-table th {
      background: var(--mat-sys-surface-container-high);
      font-weight: 700;
      color: var(--mat-sys-on-surface);
      text-transform: uppercase;
      font-size: 0.7rem;
      letter-spacing: 0.04em;
    }

    .standings-table tbody tr:last-child td {
      border-bottom: none;
    }

    .standings-table tbody tr:hover {
      background: var(--mat-sys-surface-container-lowest);
    }

    .standings-team {
      text-align: left !important;
      font-weight: 600;
    }

    .standings-points {
      font-weight: 800;
      color: var(--mat-sys-primary);
    }

    .text-secondary {
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export default class ChampionshipDetailPage implements OnInit, OnDestroy {
  private readonly championshipSvc = inject(ChampionshipService);
  private readonly cdr = inject(ChangeDetectorRef);

  id = input.required<string>();

  loading = signal(true);
  championshipName = signal('Campeonato');
  championshipSeason = signal('');

  fixtureData = signal<ChampionshipFixture>({});

  leaders = signal<ChampionshipLeaders | null>(null);
  leadersLoading = signal(false);
  leadersError = signal(false);

  standings = signal<ChampionshipStanding[]>([]);
  standingsLoading = signal(false);
  standingsError = signal(false);

  private fixtureSubscription: Subscription | null = null;
  private leadersSubscription: Subscription | null = null;
  private standingsSubscription: Subscription | null = null;

  fixturePhases = computed(() =>
    Object.entries(this.fixtureData()).map(([phaseName, data]: [string, FixturePhaseData]) => ({
      name: phaseName,
      phaseId: data.phaseId,
      phaseType: data.phaseType,
      status: data.status,
      totalMatches: data.totalMatches,
      roundList: Object.entries(data.rounds)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([roundNum, matches]: [string, FixtureMatch[]]) => ({
          number: Number(roundNum),
          matches,
        })),
    }))
  );

  leaderCards = computed<
    Array<{
      key: string;
      category: LeaderboardCategory;
      title: string;
      icon: string;
      unit: string;
      leader: LeaderRow | null;
    }>
  >(() => {
    const data = this.leaders();
    const top = (k: keyof NonNullable<ChampionshipLeaders['leaders']>): LeaderRow | null =>
      data?.leaders?.[k] ?? null;

    return [
      { key: 'topScorer',        category: 'scorers',        title: 'Goleador',            icon: 'sports_soccer', unit: 'goles',       leader: top('topScorer') },
      { key: 'topAssist',        category: 'assisters',      title: 'Máximo asistente',    icon: 'handshake',     unit: 'asistencias', leader: top('topAssist') },
      { key: 'topMvp',           category: 'mvps',           title: 'Más MVPs',            icon: 'emoji_events',  unit: 'mvps',        leader: top('topMvp') },
      { key: 'topPenaltyScorer', category: 'penaltyScorers', title: 'Goles de penal',      icon: 'adjust',        unit: 'penales',     leader: top('topPenaltyScorer') },
      { key: 'topYellowCards',   category: 'yellowCards',    title: 'Tarjetas amarillas',  icon: 'warning',       unit: 'amarillas',   leader: top('topYellowCards') },
      { key: 'topRedCards',      category: 'redCards',       title: 'Tarjetas rojas',      icon: 'block',         unit: 'rojas',       leader: top('topRedCards') },
    ];
  });

  standingsByPhase = computed(() => {
    const rows = this.standings();
    const grouped = new Map<number, { phaseId: number; phaseName: string; rows: ChampionshipStanding[] }>();

    for (const row of rows) {
      const phaseId = Number(row.phase_id);
      const bucket = grouped.get(phaseId);
      if (bucket) {
        bucket.rows.push(row);
      } else {
        grouped.set(phaseId, {
          phaseId,
          phaseName: row.phase_name ?? `Fase ${phaseId}`,
          rows: [row],
        });
      }
    }

    return [...grouped.values()];
  });

  toNumber(value: unknown, fallback = 0): number {
    if (typeof value === 'number') return Number.isFinite(value) ? value : fallback;
    if (typeof value === 'string') {
      const n = Number(value);
      return Number.isFinite(n) ? n : fallback;
    }
    return fallback;
  }

  ngOnInit(): void {
    const id = this.id();

    forkJoin({
      detail: this.championshipSvc.getChampionshipById(id),
    }).subscribe({
      next: ({ detail }) => {
        this.championshipName.set(detail.name);
        this.championshipSeason.set(detail.season ?? '');
        this.loading.set(false);
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading.set(false);
        this.cdr.markForCheck();
      },
    });

    this.reloadFixture();
    this.reloadLeaders();
    this.reloadStandings();
  }

  reloadFixture(): void {
    const id = this.id();
    this.fixtureSubscription?.unsubscribe();
    this.fixtureSubscription = this.championshipSvc.getFixture(id).subscribe({
      next: fixture => {
        this.fixtureData.set(fixture);
        this.cdr.markForCheck();
      },
      error: () => {
        this.cdr.markForCheck();
      },
    });
  }

  reloadLeaders(): void {
    const id = this.id();
    this.leadersLoading.set(true);
    this.leadersError.set(false);
    this.leadersSubscription?.unsubscribe();
    this.leadersSubscription = this.championshipSvc.getLeaders(id).subscribe({
      next: data => {
        this.leaders.set(data);
        this.leadersLoading.set(false);
        this.cdr.markForCheck();
      },
      error: () => {
        this.leadersError.set(true);
        this.leadersLoading.set(false);
        this.cdr.markForCheck();
      },
    });
  }

  reloadStandings(): void {
    const id = this.id();
    this.standingsLoading.set(true);
    this.standingsError.set(false);
    this.standingsSubscription?.unsubscribe();
    this.standingsSubscription = this.championshipSvc.getStandings(id).subscribe({
      next: rows => {
        this.standings.set(rows ?? []);
        this.standingsLoading.set(false);
        this.cdr.markForCheck();
      },
      error: () => {
        this.standingsError.set(true);
        this.standingsLoading.set(false);
        this.cdr.markForCheck();
      },
    });
  }

  ngOnDestroy(): void {
    this.fixtureSubscription?.unsubscribe();
    this.leadersSubscription?.unsubscribe();
    this.standingsSubscription?.unsubscribe();
  }
}
