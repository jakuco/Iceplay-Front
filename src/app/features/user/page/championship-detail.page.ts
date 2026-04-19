// ─────────────────────────────────────────────────────────────
// user/page/championship-detail.page.ts
//
// ESTADO: INTEGRADO — conectado al backend real.
//
// Carga:
//   · GET /championships/:id        → nombre/temporada del torneo
//   · GET /championships/:id/leaders → estadísticas individuales
//
// Muestra 6 líderes:
//   goleador · máximo asistente · más MVP · goles de penal ·
//   tarjetas amarillas · tarjetas rojas
// ─────────────────────────────────────────────────────────────
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
import { RouterLink } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ChampionshipService } from '../../../core/services/championship.service';
import {
  ChampionshipLeaders,
  LeaderRow,
  LeaderboardCategory,
} from '../../../core/models/championship.model';

@Component({
  selector: 'app-championship-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="page-container">
      <header class="page-header">
        <a matIconButton routerLink="/matches">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <div>
          <h1 class="page-title">{{ championshipName() }}</h1>
          @if (championshipSeason()) {
            <p class="page-subtitle">{{ championshipSeason() }}</p>
          }
        </div>
      </header>

      @if (loading()) {
        <div class="loading-state">
          <mat-spinner diameter="48" />
        </div>
      } @else if (error()) {
        <p class="text-secondary">No se pudo cargar el campeonato.</p>
      } @else {
        <section class="stats-section">
          <h2 class="section-title">
            <mat-icon>leaderboard</mat-icon>
            Estadísticas individuales
          </h2>

          @if (leadersLoading()) {
            <div class="loading-state">
              <mat-spinner diameter="32" />
            </div>
          } @else if (leadersError()) {
            <p class="text-secondary">No se pudieron cargar las estadísticas.</p>
          } @else {
            <div class="leaders-grid">
              @for (card of leaderCards(); track card.key) {
                <a class="leader-card"
                   [routerLink]="['/championship', id(), 'ranking', card.category]"
                   [attr.aria-label]="'Ver ranking de ' + card.title">
                  <div class="leader-card__header">
                    <mat-icon class="leader-card__icon">{{ card.icon }}</mat-icon>
                    <h3 class="leader-card__title">{{ card.title }}</h3>
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
        </section>
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
      align-items: center;
      gap: 0.75rem;
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
      font-size: 0.9rem;
    }

    .loading-state {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }

    .stats-section {
      background: var(--mat-sys-surface-container);
      border-radius: 12px;
      padding: 1.5rem;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 1rem;
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--mat-sys-on-surface);
    }

    .section-title mat-icon {
      color: var(--mat-sys-primary);
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
  error = signal(false);

  championshipName = signal('Campeonato');
  championshipSeason = signal('');

  leaders = signal<ChampionshipLeaders | null>(null);
  leadersLoading = signal(false);
  leadersError = signal(false);

  private subscription: Subscription | null = null;

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
      { key: 'topScorer',        category: 'scorers',        title: 'Goleador',           icon: 'sports_soccer', unit: 'goles',        leader: leader(data?.topScorer) },
      { key: 'topAssist',        category: 'assisters',      title: 'Máximo asistente',   icon: 'handshake',     unit: 'asistencias',  leader: leader(data?.topAssist) },
      { key: 'topMvp',           category: 'mvps',           title: 'Más MVPs',           icon: 'emoji_events',  unit: 'mvps',         leader: leader(data?.topMvp) },
      { key: 'topPenaltyScorer', category: 'penaltyScorers', title: 'Goles de penal',     icon: 'adjust',        unit: 'penales',      leader: leader(data?.topPenaltyScorer) },
      { key: 'topYellowCards',   category: 'yellowCards',    title: 'Tarjetas amarillas', icon: 'warning',       unit: 'amarillas',    leader: leader(data?.topYellowCards) },
      { key: 'topRedCards',      category: 'redCards',       title: 'Tarjetas rojas',     icon: 'block',         unit: 'rojas',        leader: leader(data?.topRedCards) },
    ];
  });

  ngOnInit(): void {
    const id = this.id();

    this.loading.set(true);
    this.leadersLoading.set(true);
    this.error.set(false);
    this.leadersError.set(false);

    this.subscription = forkJoin({
      detail: this.championshipSvc.getChampionshipById(id),
      leaders: this.championshipSvc.getLeaders(id),
    }).subscribe({
      next: ({ detail, leaders }) => {
        this.championshipName.set(detail.name);
        this.championshipSeason.set(detail.season ?? '');
        this.leaders.set(leaders);
        this.loading.set(false);
        this.leadersLoading.set(false);
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading.set(false);
        this.leadersLoading.set(false);
        this.error.set(true);
        this.leadersError.set(true);
        this.cdr.markForCheck();
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
