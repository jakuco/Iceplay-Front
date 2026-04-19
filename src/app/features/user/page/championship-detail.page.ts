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
  FixtureMatch,
  FixturePhaseData,
  LeaderRow,
  LeaderboardCategory,
} from '../../../core/models/championship.model';

@Component({
  selector: 'app-championship-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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
                            <div class="fixture-match" [class.fixture-match--played]="match.status === 'finished'">
                              <div class="fixture-team fixture-team--home">
                                @if (match.homeTeam?.logoUrl) {
                                  <img
                                    [src]="match.homeTeam.logoUrl"
                                    [alt]="match.homeTeam.name"
                                    class="fixture-logo"
                                  />
                                }
                                <span>{{ match.homeTeam?.name ?? 'Por definir' }}</span>
                              </div>

                              <div class="fixture-score">
                                @if (match.status === 'finished') {
                                  <span class="score-value">{{ match.homeScore }} – {{ match.awayScore }}</span>
                                } @else {
                                  <span class="score-pending">
                                    {{ match.scheduledStart ? (match.scheduledStart | date:'dd/MM HH:mm') : 'vs' }}
                                  </span>
                                }
                              </div>

                              <div class="fixture-team fixture-team--away">
                                @if (match.awayTeam?.logoUrl) {
                                  <img
                                    [src]="match.awayTeam.logoUrl"
                                    [alt]="match.awayTeam.name"
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
              <p class="text-secondary">Próximamente: tabla de posiciones.</p>
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
      gap: 0.6rem;
      padding: 1rem;
      background: var(--mat-sys-surface);
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 12px;
      min-height: 140px;
      color: inherit;
      text-decoration: none;
      cursor: pointer;
      transition: border-color 0.15s ease, transform 0.1s ease;
    }

    .leader-card:hover {
      border-color: var(--mat-sys-primary);
      transform: translateY(-1px);
    }

    .leader-card:focus-visible {
      outline: 2px solid var(--mat-sys-primary);
      outline-offset: 2px;
    }

    .leader-card__header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .leader-card__icon {
      color: var(--mat-sys-primary);
    }

    .leader-card__chevron {
      margin-left: auto;
      color: var(--mat-sys-on-surface-variant);
      opacity: 0.6;
    }

    .leader-card__title {
      font-size: 0.85rem;
      font-weight: 600;
      margin: 0;
      color: var(--mat-sys-on-surface);
    }

    .leader-card__body {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .leader-card__name {
      font-size: 1rem;
      font-weight: 700;
      color: var(--mat-sys-on-surface);
    }

    .leader-card__team {
      font-size: 0.8rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .leader-card__value {
      display: flex;
      align-items: baseline;
      gap: 0.35rem;
      margin-top: 0.25rem;
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

  private fixtureSubscription: Subscription | null = null;
  private leadersSubscription: Subscription | null = null;
  private detailSubscription: Subscription | null = null;

  leaderCards = computed<Array<{
    key: string;
    category: LeaderboardCategory;
    title: string;
    icon: string;
    unit: string;
    leader: LeaderRow | null;
  }>>(() => {
    const data = this.leaders()?.leaders ?? null;
    const leader = (row: LeaderRow | null | undefined): LeaderRow | null => row ?? null;

    return [
      {
        key: 'topScorer',
        category: 'scorers',
        title: 'Goleador',
        icon: 'sports_soccer',
        unit: 'goles',
        leader: leader(data?.topScorer),
      },
      {
        key: 'topAssist',
        category: 'assisters',
        title: 'Máximo asistente',
        icon: 'handshake',
        unit: 'asistencias',
        leader: leader(data?.topAssist),
      },
      {
        key: 'topMvp',
        category: 'mvps',
        title: 'Más MVPs',
        icon: 'emoji_events',
        unit: 'mvps',
        leader: leader(data?.topMvp),
      },
      {
        key: 'topPenaltyScorer',
        category: 'penaltyScorers',
        title: 'Goles de penal',
        icon: 'adjust',
        unit: 'penales',
        leader: leader(data?.topPenaltyScorer),
      },
      {
        key: 'topYellowCards',
        category: 'yellowCards',
        title: 'Tarjetas amarillas',
        icon: 'warning',
        unit: 'amarillas',
        leader: leader(data?.topYellowCards),
      },
      {
        key: 'topRedCards',
        category: 'redCards',
        title: 'Tarjetas rojas',
        icon: 'block',
        unit: 'rojas',
        leader: leader(data?.topRedCards),
      },
    ];
  });

  fixturePhases = computed(() =>
    (Object.entries(this.fixtureData()) as [string, FixturePhaseData][])
      .map(([phaseName, data]) => ({
        name: phaseName,
        phaseId: data.phaseId,
        phaseType: data.phaseType,
        status: data.status,
        totalMatches: data.totalMatches,
        roundList: (Object.entries(data.rounds) as [string, FixtureMatch][][] | [string, FixtureMatch[]][])
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([roundNum, matches]) => ({
            number: Number(roundNum),
            matches,
          })),
      }))
  );

  ngOnInit(): void {
    const id = this.id();

    this.detailSubscription = forkJoin({
      detail: this.championshipSvc.getChampionshipById(id),
      fixture: this.championshipSvc.getFixture(id),
      leaders: this.championshipSvc.getLeaders(id),
    }).subscribe({
      next: ({ detail, fixture, leaders }) => {
        this.championshipName.set(detail.name);
        this.championshipSeason.set(detail.season ?? '');
        this.fixtureData.set(fixture);
        this.leaders.set(leaders);
        this.leadersLoading.set(false);
        this.leadersError.set(false);
        this.loading.set(false);
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading.set(false);
        this.leadersLoading.set(false);
        this.leadersError.set(true);
        this.cdr.markForCheck();
      },
    });
  }

  ngOnDestroy(): void {
    this.fixtureSubscription?.unsubscribe();
    this.leadersSubscription?.unsubscribe();
    this.detailSubscription?.unsubscribe();
  }
}