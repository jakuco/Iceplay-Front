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
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ChampionshipService } from '../../../core/services/championship.service';
import {
  ChampionshipLeaders,
  LeaderRow,
  LeaderboardCategory,
} from '../../../core/models/championship.model';

interface CategoryMeta {
  title: string;
  icon: string;
  unit: string;
  valueLabel: string;
  limit: number;
}

const CATEGORY_META: Record<LeaderboardCategory, CategoryMeta> = {
  scorers:        { title: 'Máximos goleadores',     icon: 'sports_soccer', unit: 'goles',       valueLabel: 'Goles',       limit: 10 },
  assisters:      { title: 'Máximos asistentes',     icon: 'handshake',     unit: 'asistencias', valueLabel: 'Asistencias', limit: 10 },
  mvps:           { title: 'Más MVPs',               icon: 'emoji_events',  unit: 'mvps',        valueLabel: 'MVPs',        limit: 5 },
  penaltyScorers: { title: 'Goleadores de penal',    icon: 'adjust',        unit: 'penales',     valueLabel: 'Penales',     limit: 5 },
  yellowCards:    { title: 'Más tarjetas amarillas', icon: 'warning',       unit: 'amarillas',   valueLabel: 'Amarillas',   limit: 5 },
  redCards:       { title: 'Más tarjetas rojas',     icon: 'block',         unit: 'rojas',       valueLabel: 'Rojas',       limit: 5 },
};

const VALID_CATEGORIES: ReadonlySet<LeaderboardCategory> = new Set<LeaderboardCategory>([
  'scorers', 'assisters', 'mvps', 'penaltyScorers', 'yellowCards', 'redCards',
]);

@Component({
  selector: 'app-championship-ranking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="page-container">
      <header class="page-header">
        <button matIconButton type="button" (click)="goBack()" aria-label="Volver">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <div class="page-header__text">
          <h1 class="page-title">
            <mat-icon class="page-title__icon">{{ meta().icon }}</mat-icon>
            {{ meta().title }}
          </h1>
          @if (championshipName()) {
            <p class="page-subtitle">{{ championshipName() }}</p>
          }
        </div>
      </header>

      @if (loading()) {
        <div class="loading-state">
          <mat-spinner diameter="36" />
        </div>
      } @else if (error()) {
        <p class="text-secondary">No se pudo cargar el ranking.</p>
      } @else if (rows().length === 0) {
        <p class="text-secondary">Aún no hay datos en esta categoría.</p>
      } @else {
        <div class="ranking-card">
          <table class="ranking-table">
            <thead>
              <tr>
                <th class="col-pos">#</th>
                <th class="col-player">Jugador</th>
                <th class="col-team">Equipo</th>
                <th class="col-value">{{ meta().valueLabel }}</th>
              </tr>
            </thead>
            <tbody>
              @for (row of rows(); track row.playerId; let i = $index) {
                <tr>
                  <td class="col-pos">{{ i + 1 }}</td>
                  <td class="col-player">{{ row.playerName }}</td>
                  <td class="col-team">{{ row.teamName ?? '—' }}</td>
                  <td class="col-value">
                    <span class="value-count">{{ row.value }}</span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  styles: `
    .page-container {
      padding: 1.5rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    .page-header__text {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .page-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.35rem;
      font-weight: 700;
      margin: 0;
      color: var(--mat-sys-on-surface);
    }

    .page-title__icon {
      color: var(--mat-sys-primary);
    }

    .page-subtitle {
      color: var(--mat-sys-on-surface-variant);
      margin: 0;
      font-size: 0.9rem;
    }

    .loading-state {
      display: flex;
      justify-content: center;
      padding: 2rem 0;
    }

    .ranking-card {
      background: var(--mat-sys-surface-container);
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 12px;
      overflow: hidden;
    }

    .ranking-table {
      width: 100%;
      border-collapse: collapse;
    }

    .ranking-table thead {
      background: var(--mat-sys-surface-container-high);
      color: var(--mat-sys-on-surface-variant);
    }

    .ranking-table th,
    .ranking-table td {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }

    .ranking-table th {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .ranking-table tbody tr {
      border-top: 1px solid var(--mat-sys-outline-variant);
    }

    .ranking-table tbody tr:hover {
      background: var(--mat-sys-surface-container-high);
    }

    .col-pos {
      width: 48px;
      color: var(--mat-sys-on-surface-variant);
      font-weight: 600;
    }

    .col-value {
      width: 100px;
      text-align: right;
    }

    .value-count {
      font-weight: 700;
      color: var(--mat-sys-primary);
    }

    .col-team {
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export default class ChampionshipRankingPage implements OnInit, OnDestroy {
  private readonly championshipSvc = inject(ChampionshipService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly location = inject(Location);

  id = input.required<string>();
  category = input.required<string>();

  loading = signal(true);
  error = signal(false);
  championshipName = signal('');
  private data = signal<ChampionshipLeaders | null>(null);

  private subscription: Subscription | null = null;

  private readonly safeCategory = computed<LeaderboardCategory>(() => {
    const raw = this.category() as LeaderboardCategory;
    return VALID_CATEGORIES.has(raw) ? raw : 'scorers';
  });

  meta = computed<CategoryMeta>(() => CATEGORY_META[this.safeCategory()]);

  rows = computed<LeaderRow[]>(() => {
    const data = this.data();
    if (!data) return [];
    const category = this.safeCategory();
    const all = data.leaderboard?.[category] ?? [];
    return all.slice(0, CATEGORY_META[category].limit);
  });

  ngOnInit(): void {
    const id = this.id();
    this.loading.set(true);
    this.error.set(false);

    this.subscription = this.championshipSvc.getLeaders(id).subscribe({
      next: data => {
        this.data.set(data);
        this.championshipName.set(data.championshipName ?? '');
        this.loading.set(false);
        this.cdr.markForCheck();
      },
      error: () => {
        this.data.set(null);
        this.loading.set(false);
        this.error.set(true);
        this.cdr.markForCheck();
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }
}