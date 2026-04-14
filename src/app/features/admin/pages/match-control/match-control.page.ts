import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  computed,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Subscription } from 'rxjs';

import { MatchService } from '../../../../core/services/match.service';
import {
  MatchEventService,
  SSEMatchEvent,
} from '../../../../core/services/match-event.service';
import { TeamService } from '../../../../core/services/team.service';
import { PlayerService } from '../../../../core/services/player.service';

import {
  MatchByIdResponse,
  MatchStatus,
  UpdateMatchApiDto,
} from '../../../../core/models/match.model';
import {
  MatchEventViewModel,
  CreateMatchEventDto,
} from '../../../../core/models/event.model';
import type { TypeMatchEvent } from '../../../../core/models/sport-config.model';
import type { PlayerApiResponse } from '../../../../core/models/player.model';

const DEFAULT_PERIOD_DURATION = 2700;

interface LocalPlayer {
  id: string;
  number: number;
  name: string;
  positionCode: string;
  teamSide: 'home' | 'away';
  originalPlayerId: string;
}

interface LocalTeam {
  side: 'home' | 'away';
  id: string;
  name: string;
  score: number;
  logo: string;
  players: LocalPlayer[];
}

interface HistoryState {
  homeScore: number;
  awayScore: number;
  elapsedSeconds: number;
}

@Component({
  selector: 'app-match-control',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  template: `
<div class="flex min-h-full flex-col gap-6 p-4 md:p-6">

  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div class="flex items-center gap-3">
      <a matIconButton routerLink="/admin/matches">
        <mat-icon>arrow_back</mat-icon>
      </a>
      <h1 class="text-xl md:text-2xl font-bold">Control de Partido</h1>
    </div>
    <div class="flex items-center gap-2">
      <button matIconButton (click)="undo()" [disabled]="!canUndo()" matTooltip="Deshacer">
        <mat-icon>undo</mat-icon>
      </button>
      <button matIconButton (click)="redo()" [disabled]="!canRedo()" matTooltip="Rehacer">
        <mat-icon>redo</mat-icon>
      </button>
      <mat-slide-toggle [(ngModel)]="showAdminPanel" color="primary">
        Modo Admin
      </mat-slide-toggle>
    </div>
  </div>

  @if (isLoading()) {
    <div class="flex flex-1 items-center justify-center">
      <mat-spinner [diameter]="50" />
    </div>

  } @else if (matchData(); as m) {

    <div class="card flex flex-wrap items-center justify-between gap-4 rounded-xl p-4">
      <div class="flex items-center gap-3">
        <mat-icon class="text-secondary">event</mat-icon>
        <div>
          <p class="text-secondary text-sm">
            {{ homeTeam().name }} vs {{ awayTeam().name }}
          </p>
          <p class="font-medium text-sm">Sin cancha</p>
        </div>
      </div>
      <span class="status-chip" [class]="'status-' + m.status">
        {{ getStatusLabel(m.status) }}
      </span>
    </div>

    @if (showAdminPanel) {
      <div class="flex flex-wrap gap-3">
        <button matButton="outlined" (click)="updateMatchStatus('live')">
          <mat-icon>play_circle</mat-icon> Iniciar
        </button>
        <button matButton="outlined" (click)="updateMatchStatus('halftime')">
          <mat-icon>pause_circle</mat-icon> Medio Tiempo
        </button>
        <button matButton="outlined" (click)="updateMatchStatus('finished')">
          <mat-icon>sports_score</mat-icon> Finalizar
        </button>
        <button matButton="outlined" (click)="updateMatchStatus('cancelled')">
          <mat-icon>cancel</mat-icon> Cancelar
        </button>
      </div>
    }

    <div class="score-header">

      <div class="card flex min-w-[140px] flex-1 flex-col items-center gap-3 rounded-xl p-4 sm:flex-row md:p-6">
        @if (homeTeam().logo) {
          <img class="h-14 w-14 sm:h-16 sm:w-16"
               [src]="homeTeam().logo" [alt]="homeTeam().name" />
        } @else {
          <div class="team-avatar">{{ initials(homeTeam().name) }}</div>
        }
        <div class="text-center sm:text-left">
          <p class="text-secondary text-sm">Local</p>
          <p class="text-lg font-bold">{{ homeTeam().name }}</p>
          <p class="text-primary text-3xl font-black">{{ homeTeam().score }}</p>
        </div>
      </div>

      <div class="timer-card rounded-xl p-4 flex flex-col items-center justify-center gap-2">
        @if (m.status === 'live') {
          <div class="flex items-center gap-2">
            <span class="relative flex h-3 w-3">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
            <p class="text-primary text-sm font-semibold uppercase">En Vivo</p>
          </div>
        }

        @if (isEditingTime) {
          <div class="flex items-center gap-1">
            <input
              type="number"
              min="0"
              max="999"
              class="time-input"
              [value]="editMinutes"
              (input)="editMinutes = +$any($event.target).value"
              (keydown.enter)="saveTime()"
              (keydown.escape)="cancelTimeEdit()"
            />
            <span class="text-2xl font-bold">:</span>
            <input
              type="number"
              min="0"
              max="59"
              class="time-input"
              [value]="editSeconds"
              (input)="editSeconds = +$any($event.target).value"
              (keydown.enter)="saveTime()"
              (keydown.escape)="cancelTimeEdit()"
            />
            <button matIconButton color="primary" (click)="saveTime()">
              <mat-icon>check</mat-icon>
            </button>
            <button matIconButton (click)="cancelTimeEdit()">
              <mat-icon>close</mat-icon>
            </button>
          </div>
        } @else {
          <p
            class="time-display font-mono text-3xl font-bold cursor-pointer"
            (click)="startTimeEdit()"
            title="Click para editar"
          >
            {{ formattedTime() }}
          </p>
        }

        <div class="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <button
            matFab="mini"
            class="transition-all! col-start-2"
            [class.shadow-none!]="isRunning()"
            [class.bg-transparent!]="isRunning()"
            (click)="isRunning() ? pauseTimer() : startTimer()"
          >
            <mat-icon>{{ isRunning() ? 'pause' : 'play_arrow'}}</mat-icon>
          </button>

          <button class="col-start-3" matIconButton (click)="resetTimer()">
            <mat-icon>restart_alt</mat-icon>
          </button>
        </div>
      </div>

      <div class="card flex min-w-[140px] flex-1 flex-col-reverse items-center justify-end gap-3 rounded-xl p-4 sm:flex-row md:p-6">
        <div class="text-center sm:text-right">
          <p class="text-secondary text-sm">Visitante</p>
          <p class="text-lg font-bold">{{ awayTeam().name }}</p>
          <p class="text-primary text-3xl font-black">{{ awayTeam().score }}</p>
        </div>
        @if (awayTeam().logo) {
          <img class="h-14 w-14 sm:h-16 sm:w-16"
               [src]="awayTeam().logo" [alt]="awayTeam().name" />
        } @else {
          <div class="team-avatar">{{ initials(awayTeam().name) }}</div>
        }
      </div>
    </div>

    @if (m.status === 'live' || m.status === 'warmup') {
      <section>
        <h2 class="mb-4 text-lg font-bold">Alineaciones y Acciones</h2>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">

          @for (side of ['home', 'away']; track side) {
            @let team = side === 'home' ? homeTeam() : awayTeam();
            <div class="card rounded-xl border border-(--mat-sys-outline-variant) p-4">
              <h3 class="mb-3 text-base font-semibold">
                {{ team.name }}
                <span class="text-secondary text-sm ml-1">
                  {{ side === 'home' ? '(Local)' : '(Visitante)' }}
                </span>
              </h3>
              <div class="space-y-1">
                @for (player of team.players; track player.id) {
                  <div class="player-row grid grid-cols-[20%_auto] items-center gap-2 rounded-lg p-2">
                    <div>
                      <p class="text-sm wrap-anywhere">#{{ player.number }} {{ player.name }}</p>
                      <p class="text-secondary text-xs">{{ player.positionCode }}</p>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 items-center gap-1">
                      @for (et of eventTypes(); track et.id) {
                        <button
                          matButton
                          class="action-btn min-h-9! h-fit! py-2"
                          [class]="'action-' + et.category"
                          [style.color]="et.color"
                          [matTooltip]="et.label"
                          (click)="logEvent(et, player, side === 'home' ? 'home' : 'away')"
                        >
                          @if (et.icon) {
                            <mat-icon class="text-xs!">{{ et.icon }}</mat-icon>
                          }
                          {{ et.label }}
                        </button>
                      }
                    </div>
                  </div>

                  @if ($index < team.players.length - 1) {
                    <hr class="my-2 opacity-25">
                  }
                }
              </div>
            </div>
          }

        </div>
      </section>
    }

    <section>
      <h2 class="mb-4 text-lg font-bold">Registro de Eventos</h2>
      <div class="card overflow-hidden rounded-xl border border-(--mat-sys-outline-variant)">
        @if (events().length === 0) {
          <div class="text-secondary p-8 text-center">
            <mat-icon class="mb-2 size-12! text-5xl! opacity-50">sports_soccer</mat-icon>
            <p>No hay eventos registrados aún.</p>
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="table-header">
                  <th class="w-24 px-4 py-3 text-left text-xs uppercase tracking-wider">Tiempo</th>
                  <th class="w-32 px-4 py-3 text-left text-xs uppercase tracking-wider">Evento</th>
                  <th class="px-4 py-3 text-left text-xs uppercase tracking-wider">Jugador</th>
                  <th class="px-4 py-3 text-left text-xs uppercase tracking-wider">Equipo</th>
                  <th class="w-20 px-4 py-3 text-center text-xs uppercase tracking-wider">Acc.</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-(--mat-sys-outline-variant)">
                @for (event of events(); track event.id) {
                  <tr>
                    <td class="text-secondary px-4 py-3 font-mono text-sm whitespace-nowrap">
                      {{ event.timeFormatted }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span
                        class="inline-flex items-center gap-2 text-sm font-semibold"
                        [style.color]="event.typeColor"
                      >
                        <mat-icon class="text-base!">{{ event.typeIcon }}</mat-icon>
                        {{ event.typeLabel }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm whitespace-nowrap">
                      {{ playerName(event) }}
                    </td>
                    <td class="text-secondary px-4 py-3 text-sm whitespace-nowrap">
                      {{ event.isHomeTeam ? homeTeam().name : awayTeam().name }}
                    </td>
                    <td class="px-4 py-3 text-center whitespace-nowrap">
                      <button
                        matIconButton
                        class="hover:text-red-400!"
                        (click)="removeEvent(String(event.id))"
                      >
                        <mat-icon class="text-lg">delete</mat-icon>
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </section>

  } @else {
    <div class="flex flex-1 items-center justify-center">
      <p class="text-secondary">Partido no encontrado.</p>
    </div>
  }
</div>
  `,
  styles: `
    .card { background-color: var(--mat-sys-surface-container); }

    .score-header {
      display: flex;
      flex-direction: column;
      gap: 12px;
      @media (min-width: 768px) { flex-direction: row; }
    }

    .timer-card {
      background-color: color-mix(in srgb, var(--mat-sys-primary) 10%, transparent);
      @media (min-width: 768px) { flex: 1; }
    }

    .time-display {
      padding: 4px 12px;
      border-radius: 8px;
      transition: background-color 0.2s;
      &:hover {
        background-color: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);
      }
    }

    .time-input {
      width: 60px;
      padding: 8px;
      font-size: 24px;
      font-weight: bold;
      font-family: monospace;
      text-align: center;
      border: 2px solid var(--mat-sys-primary);
      border-radius: 8px;
      background: var(--mat-sys-surface);
      color: var(--mat-sys-on-surface);
      &:focus { outline: none; }
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button { -webkit-appearance: none; }
      -moz-appearance: textfield;
    }

    .team-avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--mat-sys-surface-container-high);
      font-weight: bold;
      font-size: 1.25rem;
    }

    .table-header {
      background-color: var(--mat-sys-surface-container-high);
      color: var(--mat-sys-on-surface-variant);
    }

    .player-row {
      transition: background-color 0.15s linear;
    }

    .player-row:hover {
      background-color: color-mix(in srgb, var(--mat-sys-primary) 2%, transparent);
    }

    .status-chip {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      &.status-scheduled { background: color-mix(in srgb,#3b82f6 20%,transparent); color:#60a5fa; }
      &.status-warmup    { background: color-mix(in srgb,#f59e0b 20%,transparent); color:#fbbf24; }
      &.status-live      { background: color-mix(in srgb,#22c55e 20%,transparent); color:#4ade80; }
      &.status-halftime  { background: color-mix(in srgb,#8b5cf6 20%,transparent); color:#a78bfa; }
      &.status-finished  { background: color-mix(in srgb,#6b7280 20%,transparent); color:#9ca3af; }
      &.status-cancelled { background: color-mix(in srgb,#ef4444 20%,transparent); color:#f87171; }
      &.status-postponed { background: color-mix(in srgb,#8b5cf6 20%,transparent); color:#a78bfa; }
    }

    .action-btn {
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      &.action-scoring      { background: color-mix(in srgb,#22c55e 20%,transparent); }
      &.action-card         { background: color-mix(in srgb,#eab308 20%,transparent); }
      &.action-substitution { background: color-mix(in srgb,#3b82f6 20%,transparent); }
      &.action-other        { background: color-mix(in srgb,#6b7280 20%,transparent); }
    }
  `,
})
export default class MatchControlPage implements OnInit, OnDestroy {
  matchId = input.required<string>();

  private matchService = inject(MatchService);
  private matchEventService = inject(MatchEventService);
  private teamService = inject(TeamService);
  private playerService = inject(PlayerService);
  private snackBar = inject(MatSnackBar);

  isLoading = signal(true);
  matchData = signal<MatchByIdResponse | null>(null);
  events = signal<MatchEventViewModel[]>([]);
  eventTypes = signal<TypeMatchEvent[]>([]);

  elapsedSeconds = signal(0);
  isRunning = signal(false);

  private baselineHomeScore = 0;
  private baselineAwayScore = 0;

  homeTeam = signal<LocalTeam>({
    side: 'home',
    id: '',
    name: '',
    score: 0,
    logo: '',
    players: [],
  });

  awayTeam = signal<LocalTeam>({
    side: 'away',
    id: '',
    name: '',
    score: 0,
    logo: '',
    players: [],
  });

  showAdminPanel = false;
  isEditingTime = false;
  editMinutes = 0;
  editSeconds = 0;

  private readonly MAX_HISTORY = 50;
  private undoStack: HistoryState[] = [];
  private redoStack: HistoryState[] = [];
  canUndo = signal(false);
  canRedo = signal(false);

  private timerInterval?: ReturnType<typeof setInterval>;
  private sseSubscription?: Subscription;

  protected String = String;

  formattedTime = computed(() => {
    const m = Math.floor(this.elapsedSeconds() / 60);
    const s = this.elapsedSeconds() % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  });

  ngOnInit(): void {
    this.loadMatch();
    this.matchEventService.getEventTypes().subscribe({
      next: (types) => this.eventTypes.set(types),
      error: (err) => console.error('Error loading event types', err),
    });
  }

  ngOnDestroy(): void {
    this.stopTimer();
    this.sseSubscription?.unsubscribe();
  }

  private loadMatch(): void {
    this.isLoading.set(true);

    this.matchService.getMatchById(this.matchId()).subscribe({
      next: (match) => {
        this.matchData.set(match);
        this.elapsedSeconds.set(0);

        forkJoin({
          homeTeam: this.teamService.getTeamById(String(match.homeTeamId)),
          awayTeam: this.teamService.getTeamById(String(match.awayTeamId)),
        }).subscribe({
          next: ({ homeTeam, awayTeam }) => {
            this.baselineHomeScore = 0;
            this.baselineAwayScore = 0;

            this.homeTeam.set({
              side: 'home',
              id: String(homeTeam.id),
              name: homeTeam.name,
              score: 0,
              logo: homeTeam.logoUrl ?? '',
              players: [],
            });

            this.awayTeam.set({
              side: 'away',
              id: String(awayTeam.id),
              name: awayTeam.name,
              score: 0,
              logo: awayTeam.logoUrl ?? '',
              players: [],
            });

            this.loadPlayers(String(homeTeam.id), String(awayTeam.id));
            this.loadEventsAndConnect(String(match.id), String(match.homeTeamId));
            this.isLoading.set(false);
            this.saveToHistory();
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open('Error cargando datos', 'Cerrar', { duration: 3000 });
            this.isLoading.set(false);
          },
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error cargando partido', 'Cerrar', { duration: 3000 });
        this.isLoading.set(false);
      },
    });
  }

  private loadPlayers(homeId: string, awayId: string): void {
    forkJoin({
      home: this.playerService.getPlayersByTeam(homeId),
      away: this.playerService.getPlayersByTeam(awayId),
    }).subscribe({
      next: ({ home, away }) => {
        this.homeTeam.update((t) => ({
          ...t,
          players: home.players.map((p) => this.toLocalPlayer(p, 'home')),
        }));
        this.awayTeam.update((t) => ({
          ...t,
          players: away.players.map((p) => this.toLocalPlayer(p, 'away')),
        }));
      },
      error: (err) => console.error('Error loading players', err),
    });
  }

  private toLocalPlayer(p: PlayerApiResponse, side: 'home' | 'away'): LocalPlayer {
    const positionCode = p.positionId ? String(p.positionId) : '—';

    return {
      id: crypto.randomUUID(),
      number: p.number ?? 0,
      name: `${p.firstName ?? ''} ${p.lastName ?? ''}`.trim(),
      positionCode,
      teamSide: side,
      originalPlayerId: String(p.id),
    };
  }

  private loadEventsAndConnect(matchId: string, homeTeamId: string): void {
    const pd = DEFAULT_PERIOD_DURATION;

    this.sseSubscription?.unsubscribe();
    this.sseSubscription = this.matchEventService
      .connectToMatchStream(matchId, homeTeamId, pd)
      .subscribe({
        next: (msg: SSEMatchEvent) => {
          if (msg.type === 'add') {
            this.events.update((list) => {
              if (list.some((e) => e.id === msg.event.id)) return list;
              return [...list, msg.event].sort((a, b) => a.timeRaw - b.timeRaw);
            });
            this.recomputeScoreFromEvents();
          } else {
            this.events.update((list) =>
              list.filter((e) => String(e.id) !== msg.eventId)
            );
            this.recomputeScoreFromEvents();
          }
        },
        error: (err) => console.error('SSE error', err),
      });
  }

  private recomputeScoreFromEvents(): void {
    const evts = this.events();
    const homePoints = evts.filter(
      (e) => e.category === 'scoring' && e.isHomeTeam
    ).length;
    const awayPoints = evts.filter(
      (e) => e.category === 'scoring' && !e.isHomeTeam
    ).length;

    this.homeTeam.update((t) => ({ ...t, score: this.baselineHomeScore + homePoints }));
    this.awayTeam.update((t) => ({ ...t, score: this.baselineAwayScore + awayPoints }));
  }

  logEvent(eventType: TypeMatchEvent, player: LocalPlayer, side: 'home' | 'away'): void {
    const match = this.matchData();
    if (!match || !player.originalPlayerId) return;

    this.saveToHistory();

    const team = side === 'home' ? this.homeTeam() : this.awayTeam();

    const dto: CreateMatchEventDto = {
      matchId: String(match.id),
      typeMatchEventId: Number(eventType.id),
      time: this.elapsedSeconds(),
      playerId: player.originalPlayerId,
      teamId: team.id,
    };

    this.matchEventService.createEvent(String(match.id), dto).subscribe({
      error: (err) => {
        console.error('Error creating event', err);
        this.snackBar.open('Error al registrar evento', 'Cerrar', { duration: 3000 });
      },
    });
  }

  removeEvent(eventId: string): void {
    const match = this.matchData();
    if (!match) return;

    this.saveToHistory();

    this.matchEventService.deleteEvent(String(match.id), eventId).subscribe({
      error: (err) => {
        console.error('Error deleting event', err);
        this.snackBar.open('Error al eliminar evento', 'Cerrar', { duration: 3000 });
      },
    });
  }

  updateMatchStatus(status: MatchStatus): void {
    const match = this.matchData();
    if (!match) return;

    this.saveToHistory();

    const payload: UpdateMatchApiDto = { status };
    if (status === 'finished') {
      payload.homeScore = this.homeTeam().score;
      payload.awayScore = this.awayTeam().score;
    }

    this.matchService
      .updateMatch(String(match.id), payload)
      .subscribe({
        next: (updated) => {
          this.matchData.set(updated);
          if (updated.status === 'live') this.startTimer();
          else this.pauseTimer();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error actualizando estado', 'Cerrar', { duration: 3000 });
        },
      });
  }

  startTimer(): void {
    if (this.timerInterval) return;
    this.isRunning.set(true);
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds.update((s) => s + 1);
    }, 1000);
  }

  pauseTimer(): void {
    this.stopTimer();
    this.isRunning.set(false);
  }

  resetTimer(): void {
    this.stopTimer();
    this.isRunning.set(false);
    this.elapsedSeconds.set(0);
  }

  startTimeEdit(): void {
    this.pauseTimer();
    this.editMinutes = Math.floor(this.elapsedSeconds() / 60);
    this.editSeconds = this.elapsedSeconds() % 60;
    this.isEditingTime = true;
  }

  saveTime(): void {
    this.saveToHistory();
    this.elapsedSeconds.set(
      Math.max(0, this.editMinutes) * 60 + Math.min(59, Math.max(0, this.editSeconds))
    );
    this.isEditingTime = false;
  }

  cancelTimeEdit(): void {
    this.isEditingTime = false;
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
  }

  private saveToHistory(): void {
    this.undoStack.push(this.currentState());
    if (this.undoStack.length > this.MAX_HISTORY) this.undoStack.shift();
    this.redoStack = [];
    this.updateHistorySignals();
  }

  undo(): void {
    if (!this.undoStack.length) return;
    this.redoStack.push(this.currentState());
    this.restoreState(this.undoStack.pop()!);
    this.updateHistorySignals();
  }

  redo(): void {
    if (!this.redoStack.length) return;
    this.undoStack.push(this.currentState());
    this.restoreState(this.redoStack.pop()!);
    this.updateHistorySignals();
  }

  private currentState(): HistoryState {
    return {
      homeScore: this.homeTeam().score,
      awayScore: this.awayTeam().score,
      elapsedSeconds: this.elapsedSeconds(),
    };
  }

  private restoreState(s: HistoryState): void {
    this.homeTeam.update((t) => ({ ...t, score: s.homeScore }));
    this.awayTeam.update((t) => ({ ...t, score: s.awayScore }));
    this.elapsedSeconds.set(s.elapsedSeconds);
  }

  private updateHistorySignals(): void {
    this.canUndo.set(this.undoStack.length > 0);
    this.canRedo.set(this.redoStack.length > 0);
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      scheduled: 'Programado',
      warmup: 'Calentamiento',
      live: 'En Vivo',
      halftime: 'Medio Tiempo',
      break: 'Descanso',
      overtime: 'Tiempo Extra',
      penalties: 'Penales',
      finished: 'Finalizado',
      suspended: 'Suspendido',
      postponed: 'Pospuesto',
      cancelled: 'Cancelado',
    };
    return labels[status] ?? status;
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  playerName(event: MatchEventViewModel): string {
    const team = event.isHomeTeam ? this.homeTeam() : this.awayTeam();
    const p = team.players.find((pl) => pl.originalPlayerId === String(event.playerId));
    return p ? `#${p.number} ${p.name}` : '—';
  }
}

/*
  Se eliminaron únicamente los merge conflict markers para que el archivo vuelva a ser válido:
  <<<<<<<
  =======
  >>>>>>>

  El bloque comentado legacy que venía después del conflicto estaba truncado en lo que compartiste,
  así que no era posible reconstruirlo completo sin inventar contenido.
*/
