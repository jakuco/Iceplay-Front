import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
  computed, inject, input, signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription, forkJoin } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ChampionshipService } from '../../../../core/services/championship.service';
import { MatchService } from '../../../../core/services/match.service';
import {
  ChampionshipFixture,
  FixturePhaseData,
  FixtureMatch,
  ChampionshipLeaders,
  LeaderRow,
  LeaderboardCategory,
  ChampionshipStanding,
} from '../../../../core/models/championship.model';
import {
  ChampionshipPhasesComponent,
  ChampionshipFormat,
} from './championship-components/championship-phases.component';
import { PhaseCardData, PhaseType } from './championship-components/phase-card.component';
import {
  ChampionshipRulesComponent,
  ChampionshipRuleItem,
  RuleValueType,
} from './championship-components/championship-rules.component';
import {
  ChampionshipTeamsComponent,
  TeamItem,
} from './championship-components/championship-teams.component';

@Component({
  selector: 'app-championship-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    ChampionshipTeamsComponent,
    ChampionshipPhasesComponent,
    ChampionshipRulesComponent,
  ],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/admin/championships">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <div>
            <h1 class="page-title">{{ championshipName() }}</h1>
            <p class="page-subtitle">{{ championshipSeason() }}</p>
          </div>
        </div>
        <a matButton="outlined" [routerLink]="['/admin/championships', id(), 'edit']">
          <mat-icon>edit</mat-icon>
          Editar
        </a>
      </header>

      @if (loading()) {
        <div class="loading-state">
          <mat-spinner diameter="48" />
        </div>
      } @else {
        <mat-tab-group>

          <mat-tab label="Equipos">
            <div class="tab-content">
              <app-championship-teams
                [championshipId]="id()"
                [maxTeams]="maxTeams()"
                [maxPlayersPerTeam]="maxPlayersPerTeam()"
                [initialTeams]="teamsData()"
                [sportId]="sportId()"
              />
            </div>
          </mat-tab>

          <mat-tab label="Fases">
            <div class="tab-content">
              <app-championship-phases
                [championshipId]="id()"
                [initialPhases]="phases()"
                [initialFormat]="activeFormat()"
                (fixtureGenerated)="reloadFixture()"
              />
            </div>
          </mat-tab>

          <mat-tab label="Reglas">
            <div class="tab-content">
              <app-championship-rules
                [initialRules]="rules()"
              />
            </div>
          </mat-tab>

          <mat-tab label="Fixture">
            <div class="tab-content">
              @if (fixturePhases().length === 0) {
                <p class="text-secondary">No hay partidos generados para este campeonato.</p>
              } @else {
                @for (phase of fixturePhases(); track phase.phaseId) {
                  <div class="fixture-phase">
                    <h3 class="fixture-phase-title">{{ phase.name }}
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
                                  <img [src]="match.homeTeam!.logoUrl" [alt]="match.homeTeam!.name" class="fixture-logo" />
                                }
                                <span>{{ match.homeTeam?.name ?? 'Por definir' }}</span>
                              </div>
                              <div class="fixture-score">
                                @if (editingMatchId() === match.id) {
                                  <div class="fixture-date-edit">
                                    <input
                                      type="datetime-local"
                                      [value]="editingValue()"
                                      (input)="editingValue.set($any($event.target).value)"
                                      class="fixture-date-input"
                                    />
                                    <select class="fixture-status-select"
                                      [value]="editingStatus()"
                                      (change)="editingStatus.set($any($event.target).value)">
                                      <option value="scheduled">Programado</option>
                                      <option value="warmup">Calentamiento</option>
                                      <option value="live">En vivo</option>
                                      <option value="halftime">Descanso</option>
                                      <option value="finished">Finalizado</option>
                                      <option value="postponed">Aplazado</option>
                                      <option value="cancelled">Cancelado</option>
                                    </select>
                                    <div class="fixture-date-actions">
                                      <button type="button" class="fixture-action-btn fixture-action-btn--save"
                                        (click)="saveMatchDate(match)"
                                        [disabled]="savingMatchId() === match.id"
                                        title="Guardar">
                                        <mat-icon>check</mat-icon>
                                      </button>
                                      <button type="button" class="fixture-action-btn fixture-action-btn--cancel"
                                        (click)="cancelEdit()" title="Cancelar">
                                        <mat-icon>close</mat-icon>
                                      </button>
                                    </div>
                                  </div>
                                } @else {
                                  @if (match.status === 'finished') {
                                    <span class="score-value">{{ match.homeScore }} – {{ match.awayScore }}</span>
                                  }
                                  <div class="score-pending-group">
                                    <span class="score-pending">
                                      {{ match.scheduledStart ? (match.scheduledStart | date:'dd/MM HH:mm') : 'vs' }}
                                    </span>
                                    <button type="button" class="fixture-edit-btn"
                                      (click)="startEditDate(match)" title="Editar fecha/estado">
                                      <mat-icon>edit_calendar</mat-icon>
                                    </button>
                                    <a class="fixture-edit-btn"
                                      [routerLink]="['/admin/match', match.id, 'control']"
                                      title="Control del partido">
                                      <mat-icon>sports</mat-icon>
                                    </a>
                                  </div>
                                }
                              </div>
                              <div class="fixture-team fixture-team--away">
                                @if (match.awayTeam?.logoUrl) {
                                  <img [src]="match.awayTeam!.logoUrl" [alt]="match.awayTeam!.name" class="fixture-logo" />
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
                    <a class="leader-card"
                       [routerLink]="['/championship', id(), 'ranking', card.category]"
                       [attr.aria-label]="'Ver ranking de ' + card.title">
                      <div class="leader-card__header">
                        <mat-icon class="leader-card__icon">{{ card.icon }}</mat-icon>
                        <h4 class="leader-card__title">{{ card.title }}</h4>
                        <mat-icon class="leader-card__chevron">chevron_right</mat-icon>
                      </div>
                      @if (card.leaders.length > 0) {
                        <div class="leader-card__body">
                          @for (player of card.leaders.slice(0,3); track player.playerId) {
                            <div class="leader-card__name">
                              {{ player.playerName }} ({{ player.value }})
                            </div>
                          }
                          @if (card.leaders[0].teamName) {
                            <div class="leader-card__team">{{ card.leaders[0].teamName }}</div>
                          }
                          <div class="leader-card__value">
                            <span class="leader-card__count">{{ card.leaders[0].value }}</span>
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

    .score-pending-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .fixture-edit-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 1px;
      color: var(--mat-sys-on-surface-variant);
      opacity: 0.45;
      line-height: 1;
      display: flex;
      align-items: center;
    }

    .fixture-edit-btn:hover {
      opacity: 1;
      color: var(--mat-sys-primary);
    }

    .fixture-edit-btn mat-icon { font-size: 14px; width: 14px; height: 14px; }

    .fixture-date-edit {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      min-width: 150px;
    }

    .fixture-date-input {
      font-size: 0.72rem;
      padding: 3px 5px;
      border: 1px solid var(--mat-sys-outline);
      border-radius: 4px;
      background: var(--mat-sys-surface-container-high);
      color: var(--mat-sys-on-surface);
      width: 100%;
    }

    .fixture-date-actions { display: flex; gap: 4px; }

    .fixture-action-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 4px;
      line-height: 1;
      display: flex;
      align-items: center;
    }

    .fixture-action-btn mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .fixture-action-btn--save { color: var(--mat-sys-primary); }
    .fixture-action-btn--save:hover { background: var(--mat-sys-primary-container); }
    .fixture-action-btn--cancel { color: var(--mat-sys-error); }
    .fixture-action-btn--cancel:hover { background: var(--mat-sys-error-container); }
    .fixture-action-btn:disabled { opacity: 0.4; cursor: not-allowed; }


        .standings-table-wrapper {
      overflow-x: auto;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 10px;
      background: var(--mat-sys-surface);
    }

    .standings-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 720px;
    }

    .standings-table th,
    .standings-table td {
      padding: 0.75rem 0.9rem;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      text-align: center;
      font-size: 0.85rem;
    }

    .standings-table th {
      background: var(--mat-sys-surface-container-high);
      font-weight: 700;
      color: var(--mat-sys-on-surface);
      white-space: nowrap;
    }

    .standings-table tbody tr:hover {
      background: var(--mat-sys-surface-container-low);
    }

    .standings-team {
      text-align: left !important;
      font-weight: 600;
      min-width: 220px;
    }

    .standings-points {
      font-weight: 800;
      color: var(--mat-sys-primary);
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
  private readonly snackBar = inject(MatSnackBar);
  private readonly matchSvc = inject(MatchService);

  id = input.required<string>();

  loading = signal(true);

  championshipName = signal('Campeonato');
  championshipSeason = signal('');
  maxTeams = signal(16);
  maxPlayersPerTeam = signal(20);
  sportId = signal<number>(1);

  teamsData = signal<TeamItem[]>([]);
  phases = signal<PhaseCardData[]>([]);
  activeFormat = signal<ChampionshipFormat | null>(null);
  rules = signal<ChampionshipRuleItem[]>([]);
  fixtureData = signal<ChampionshipFixture>({});
  private fixtureSubscription: Subscription | null = null;
  private leadersSubscription: Subscription | null = null;
  editingMatchId = signal<number | null>(null);
  editingValue = signal<string>('');
  editingStatus = signal<string>('');
  savingMatchId = signal<number | null>(null);

  leaders = signal<ChampionshipLeaders | null>(null);
  leadersLoading = signal(false);
  leadersError = signal(false);

  standings = signal<ChampionshipStanding[]>([]);
  standingsLoading = signal(false);
  standingsError = signal(false);

  /**
   * Convierte `leaders` en la lista ordenada de cards para el template.
   * Labels/iconos alineados con las categorías del backend.
   */
  leaderCards = computed(() => {
  const data = this.leaders();

  return [
    {
      key: 'topScorer',
      category: 'scorers',
      title: 'Goleador',
      icon: 'sports_soccer',
      unit: 'goles',
      leaders: data?.leaderboard?.scorers ?? []
    },
    {
      key: 'topAssist',
      category: 'assisters',
      title: 'Máximo asistente',
      icon: 'handshake',
      unit: 'asistencias',
      leaders: data?.leaderboard?.assisters ?? []
    },
    {
      key: 'topMvp',
      category: 'mvps',
      title: 'Más MVPs',
      icon: 'emoji_events',
      unit: 'mvps',
      leaders: data?.leaderboard?.mvps ?? []
    },
    {
      key: 'topPenaltyScorer',
      category: 'penaltyScorers',
      title: 'Goles de penal',
      icon: 'adjust',
      unit: 'penales',
      leaders: data?.leaderboard?.penaltyScorers ?? []
    },
    {
      key: 'topYellowCards',
      category: 'yellowCards',
      title: 'Tarjetas amarillas',
      icon: 'warning',
      unit: 'amarillas',
      leaders: data?.leaderboard?.yellowCards ?? []
    },
    {
      key: 'topRedCards',
      category: 'redCards',
      title: 'Tarjetas rojas',
      icon: 'block',
      unit: 'rojas',
      leaders: data?.leaderboard?.redCards ?? []
    }
  ];
});
  standingsByPhase = computed(() => {
    const standings = this.standings();
    const phases = this.phases();

    const grouped = new Map<number, ChampionshipStanding[]>();

    for (const row of standings) {
      const phaseId = Number(row.phase_id);
      if (!grouped.has(phaseId)) grouped.set(phaseId, []);
      grouped.get(phaseId)!.push(row);
    }

    return [...grouped.entries()].map(([phaseId, rows]) => {
      const phase = phases.find(p => Number(p.backendId ?? p.id) === phaseId);

      return {
        phaseId,
        phaseName: phase?.name ?? `Fase ${phaseId}`,
        rows,
      };
    });
  });

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

  ngOnInit(): void {
    const id = this.id();

    forkJoin({
      detail: this.championshipSvc.getChampionshipById(id),
      phases: this.championshipSvc.getPhases(id),
      rules: this.championshipSvc.getRules(id),
    }).subscribe({
      next: ({ detail: c, phases, rules }) => {
        this.championshipName.set(c.name);
        this.championshipSeason.set(c.season ?? '');
        this.maxTeams.set(c.maxTeams ?? 16);
        this.maxPlayersPerTeam.set(c.maxPlayersPerTeam ?? 20);
        this.sportId.set(Number(c.sportId) || 1);

        this.rules.set(rules.rules.map(r => this.toRuleItem(r)));

        const mapped: PhaseCardData[] = phases.map(p => ({
          id: Number(p.id),
          backendId: Number(p.id),
          name: p.name,
          phaseType: p.phaseType,
          phaseOrder: p.phaseOrder,
          status: p.status,
          league: p.leagueConfig
            ? {
              winsPoints: 3,
              drawPoints: 1,
              lossPoints: 0,
              totalRounds: 10,
              legs: p.leagueConfig.legs,
              advanceCount: p.leagueConfig.advanceCount,
              tiebreakOrder: 'points,goal_difference,goals_for,h2h,fair_play,draw',
            }
            : p.phaseType === PhaseType.League
              ? {
                winsPoints: 3,
                drawPoints: 1,
                lossPoints: 0,
                totalRounds: 10,
                legs: 1,
                advanceCount: 4,
                tiebreakOrder: 'points,goal_difference,goals_for,h2h,fair_play,draw',
              }
              : undefined,
          knockout: p.knockoutConfig
            ? {
              legs: p.knockoutConfig.legs,
              bracketSize: 8,
              thirdPlaceMatch: p.knockoutConfig.thirdPlaceMatch,
              seeding: p.knockoutConfig.seeding,
              awayGoalsRule: p.knockoutConfig.awayGoalsRule,
              tieBreak: p.knockoutConfig.tieBreak,
            }
            : p.phaseType === PhaseType.Knockout
              ? {
                legs: 1,
                bracketSize: 8,
                thirdPlaceMatch: false,
                seeding: 'ranking',
                awayGoalsRule: false,
                tieBreak: 'penalties',
              }
              : undefined,
          groups: p.groupsConfig
            ? {
              numGroups: p.groupsConfig.numGroups,
              teamsPerGroup: p.groupsConfig.teamsPerGroup,
              legs: p.groupsConfig.legs,
              advancePerGroup: p.groupsConfig.advancePerGroup,
              advanceBestThirds: p.groupsConfig.advanceBestThirds,
              tiebreakOrder: p.groupsConfig.tiebreakOrder,
            }
            : p.phaseType === PhaseType.Groups
              ? {
                numGroups: 4,
                teamsPerGroup: 4,
                legs: 1,
                advancePerGroup: 2,
                advanceBestThirds: 0,
                tiebreakOrder: 'points,diff,gf,h2h,random',
              }
              : undefined,
          swiss: p.swissConfig
            ? {
              numRounds: p.swissConfig.numRounds,
              pairingSystem: p.swissConfig.pairingSystem,
              firstRound: p.swissConfig.firstRound,
              allowRematch: p.swissConfig.allowRematch,
              tiebreakOrder: p.swissConfig.tiebreakOrder,
              directAdvancedCount: p.swissConfig.directAdvancedCount,
              playoffCount: p.swissConfig.playoffCount,
            }
            : p.phaseType === PhaseType.Swiss
              ? {
                numRounds: 7,
                pairingSystem: 'random',
                firstRound: 'random',
                allowRematch: false,
                tiebreakOrder: 'points,goal_difference,goals_for,h2h,fair_play,draw',
                directAdvancedCount: 2,
                playoffCount: 4,
              }
              : undefined,
        }));

        this.phases.set(mapped);
        this.activeFormat.set(this.inferFormat(mapped));

        this.reloadFixture(false);
        this.reloadLeaders();
        this.reloadStandings();

        this.championshipSvc.getTeams(id).subscribe({
          next: profiles => {
            const teamsMapped: TeamItem[] = profiles.map(p => ({
              id: p.id,
              championshipId: p.championshipId,
              name: p.name,
              shortname: p.shortname,
              slug: p.slug,
              logoUrl: p.logoUrl,
              documentUrl: p.documentUrl ?? null,
              primaryColor: p.primaryColor ?? '#1a56db',
              secondaryColor: p.secondaryColor ?? '#e5e7eb',
              location: p.location ?? '',
              foundedYear: p.foundedYear ?? null,
              homeVenue: p.homeVenue ?? '',
              coachName: p.coachName ?? '',
              coachPhone: p.coachPhone ?? '',
              isActive: p.isActive,
              players: (p.players ?? []).map(pl => ({
                id: pl.id,
                teamId: pl.teamId,
                positionId: pl.positionId,
                firstName: pl.firstName,
                lastName: pl.lastName,
                nickName: pl.nickName ?? null,
                number: pl.number,
                birthDate: pl.birthDate,
                height: pl.height ?? null,
                weight: pl.weight ?? null,
                status: (pl.status as TeamItem['players'][number]['status']) ?? 'active',
                photoUrl: pl.photoUrl ?? null,
                suspensionEndDate: pl.suspensionEndDate ?? null,
                suspensionReason: pl.suspensionReason ?? null,
                isActive: pl.isActive ?? true,
                createdAt: pl.createdAt ?? new Date(),
                updatedAt: pl.updatedAt ?? new Date(),
              })),
            }));
            this.teamsData.set(teamsMapped);
            this.cdr.markForCheck();
          },
          error: () => {
            this.snackBar.open('Error al cargar los equipos', 'Cerrar', { duration: 3000 });
          },
        });

        this.loading.set(false);
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Error al cargar el campeonato', 'Cerrar', { duration: 3000 });
        this.cdr.markForCheck();
      },
    });
  }

  reloadFixture(showError = true): void {
    const id = this.id();
    this.fixtureSubscription?.unsubscribe();
    this.fixtureSubscription = this.championshipSvc.getFixture(id).subscribe({
      next: fixture => {
        this.fixtureData.set(fixture);
        this.cdr.markForCheck();
      },
      error: () => {
        if (showError) {
          this.snackBar.open('Error al recargar el fixture', 'Cerrar', { duration: 3000 });
        }
        this.cdr.markForCheck();
      },
    });
  }

  reloadLeaders(): void {
    const id = this.id();
    this.leadersSubscription?.unsubscribe();
    this.leadersLoading.set(true);
    this.leadersError.set(false);
    this.leadersSubscription = this.championshipSvc.getLeaders(id).subscribe({
      next: data => {
        this.leaders.set(data);
        this.leadersLoading.set(false);
        this.cdr.markForCheck();
      },
      error: () => {
        this.leaders.set(null);
        this.leadersLoading.set(false);
        this.leadersError.set(true);
        this.cdr.markForCheck();
      },
    });
  }
    reloadStandings(): void {
      const id = this.id();
      this.standingsLoading.set(true);
      this.standingsError.set(false);

      this.championshipSvc.getStandings(id).subscribe({
        next: (data: ChampionshipStanding[]) => {
          this.standings.set(data);
          this.standingsLoading.set(false);
          this.cdr.markForCheck();
        },
        error: () => {
          this.standings.set([]);
          this.standingsLoading.set(false);
          this.standingsError.set(true);
          this.cdr.markForCheck();
        },
      });
    }

  ngOnDestroy(): void {
    this.fixtureSubscription?.unsubscribe();
    this.leadersSubscription?.unsubscribe();
  }

  startEditDate(match: FixtureMatch): void {
    this.editingMatchId.set(match.id);
    this.editingValue.set(this.toDatetimeLocal(match.scheduledStart));
    this.editingStatus.set(match.status ?? 'scheduled');
  }

  cancelEdit(): void {
    this.editingMatchId.set(null);
    this.editingValue.set('');
    this.editingStatus.set('');
  }

  saveMatchDate(match: FixtureMatch): void {
    const raw = this.editingValue();
    if (!raw) return;

    this.savingMatchId.set(match.id);
    const iso = new Date(raw).toISOString();
    const newStatus = this.editingStatus();

    this.matchSvc.updateMatch(String(match.id), { scheduledStart: iso, status: newStatus }).subscribe({
      next: () => {
        const current = this.fixtureData();
        const updated: ChampionshipFixture = {};

        for (const [phaseName, phaseData] of Object.entries(current) as [string, FixturePhaseData][]) {
          const updatedRounds: Record<string, FixtureMatch[]> = {};

          for (const [roundNum, roundMatches] of Object.entries(phaseData.rounds) as [string, FixtureMatch[]][]) {
            updatedRounds[roundNum] = roundMatches.map(m =>
              m.id === match.id ? { ...m, scheduledStart: iso, status: newStatus } : m,
            );
          }

          updated[phaseName] = { ...phaseData, rounds: updatedRounds };
        }

        this.fixtureData.set(updated);
        this.editingMatchId.set(null);
        this.savingMatchId.set(null);
        this.editingStatus.set('');
        this.snackBar.open('Partido actualizado', 'Ok', { duration: 2500 });
        this.cdr.markForCheck();
      },
      error: () => {
        this.savingMatchId.set(null);
        this.snackBar.open('Error al actualizar la fecha', 'Cerrar', { duration: 3000 });
        this.cdr.markForCheck();
      },
    });
  }

  private toDatetimeLocal(iso: string | null): string {
    if (!iso) return '';

    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');

    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
    toNumber(value: number | string | null | undefined): number {
    return Number(value ?? 0);
  }

  private inferFormat(phases: PhaseCardData[]): ChampionshipFormat | null {
    const types = new Set(phases.map(p => p.phaseType));

    if (types.has(PhaseType.Swiss)) return 'swiss_playoff';
    if (types.has(PhaseType.Groups)) return 'groups_knockout';
    if (types.has(PhaseType.Knockout) && !types.has(PhaseType.League)) return 'knockout';
    if (types.has(PhaseType.League)) return 'league';

    return null;
  }

  private toRuleItem(rule: {
    matchRuleId: number | string;
    name: string;
    defaultValue: number;
    currentValue: number;
    isOverridden: boolean;
  }): ChampionshipRuleItem {
    const isBoolean = this.isBooleanRule(rule.name);
    const label = this.humanizeRuleName(rule.name);

    return {
      matchRuleId: Number(rule.matchRuleId),
      name: rule.name,
      label,
      description: `Configuracion para ${label.toLowerCase()}.`,
      category: this.getRuleCategory(rule.name),
      categoryLabel: this.getRuleCategoryLabel(rule.name),
      valueType: (isBoolean ? 'boolean' : 'number') as RuleValueType,
      defaultValue: Number(rule.defaultValue),
      currentValue: Number(rule.currentValue),
      isOverridden: Boolean(rule.isOverridden),
      min: isBoolean ? undefined : 0,
      max: isBoolean ? undefined : 999,
    };
  }

  private humanizeRuleName(name: string): string {
    return name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  private isBooleanRule(name: string): boolean {
    return name.startsWith('allow_')
      || name.startsWith('enable_')
      || name.includes('penalty')
      || name.includes('extra_time');
  }

  private getRuleCategory(name: string): string {
    if (name.includes('player') || name.includes('substitution')) return 'players';
    if (name.includes('card') || name.includes('match') || name.includes('duration')) return 'match';
    return 'additional';
  }

  private getRuleCategoryLabel(name: string): string {
    const cat = this.getRuleCategory(name);
    if (cat === 'players') return 'Jugadores';
    if (cat === 'match') return 'Partido';
    return 'Opciones Adicionales';
  }
}