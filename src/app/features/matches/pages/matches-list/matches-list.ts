import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
  inject,
  effect,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepickerModule,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../../../core/services/i18n.service';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { MatchService } from '../../../../core/services/match.service';

import {
  Match,
  MatchStatus,
  ScheduleByDateResponse,
  ScheduleMatchDto,
  ScheduleByDateChampionshipMeta,
} from '../../../../core/models/match.model';
import {
  ChampionshipListItem,
  ChampionshipStatus,
} from '../../../../core/models/championship.model';

interface MatchWithChampionship {
  championshipId: string;
  match: Match;
}

interface DayOption {
  dayOfWeek: string;
  dayNumber: number;
  month: string;
  isToday: boolean;
  isSelected: boolean;
  date: Date;
}

interface DisplayMatch {
  id: string;
  homeTeam: { id: string; name: string; logo: string };
  awayTeam: { id: string; name: string; logo: string };
  status: 'scheduled' | 'live' | 'finished';
  time?: string;
  minute?: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  league: string;
}

interface FilteredLeague {
  id: string;
  name: string;
  country: string;
  flagUrl: string;
  matches: DisplayMatch[];
}

interface LightweightTeam {
  id: string;
  championshipId: string;
  name: string;
  shortname: string;
  logoUrl: string | null;
}

@Component({
  selector: 'app-matches-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    TranslatePipe,
  ],
  template: `
    <div class="mx-auto flex max-w-5xl flex-col gap-6 p-4 md:p-6">
      <div class="card rounded-xl p-3 sm:p-4">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-lg font-semibold">{{ formattedMonthYear() }}</h2>

          <div class="flex items-center">
            <input
              matInput
              [matDatepicker]="picker"
              [value]="selectedDate()"
              (dateChange)="onDatePickerChange($event)"
              class="hidden-input"
            />
            <mat-datepicker-toggle [for]="picker">
              <mat-icon matDatepickerToggleIcon>calendar_month</mat-icon>
            </mat-datepicker-toggle>
            <mat-datepicker #picker />
          </div>
        </div>

        <div class="flex items-center gap-1">
          <button
            matIconButton
            (click)="previousDay()"
            aria-label="Previous day"
            class="shrink-0"
          >
            <mat-icon>chevron_left</mat-icon>
          </button>

          <div class="flex flex-1 justify-center gap-1 overflow-hidden">
            @for (day of visibleDays(); track day.date.getTime(); let i = $index) {
              <button
                class="day-btn max-w-[60px] flex-1 rounded-lg p-2 transition-all"
                [class.day-selected]="day.isSelected"
                [class.day-today]="day.isToday && !day.isSelected"
                [class.day-hidden]="shouldHideDay(i)"
                (click)="selectDate(day.date)"
              >
                <span
                  class="text-[10px] uppercase sm:text-xs"
                  [class.font-semibold]="day.isToday"
                >
                  {{
                    day.isToday ? ('common.today' | translate) : day.dayOfWeek
                  }}
                </span>
                <p class="text-base font-bold sm:text-lg">{{ day.dayNumber }}</p>
              </button>
            }
          </div>

          <button
            matIconButton
            (click)="nextDay()"
            aria-label="Next day"
            class="shrink-0"
          >
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
      </div>

      @if (isLoading()) {
        <div class="card rounded-xl p-8 text-center">
          <mat-icon class="mb-2 animate-spin text-5xl! opacity-50">refresh</mat-icon>
          <p class="text-secondary">{{ 'common.loading' | translate }}</p>
        </div>
      }

      @if (!isLoading()) {
        @for (league of filteredLeagues(); track league.id) {
          <div class="card overflow-hidden rounded-xl">
            <div
              class="flex items-center justify-between border-b border-(--mat-sys-outline-variant) p-4"
            >
              <div class="flex items-center gap-3">
                <div class="league-logo">
                  <div class="triangle"></div>
                </div>

                <a
                  class="league-link text-lg font-bold"
                  [routerLink]="['/championship', league.id]"
                >
                  {{ league.name }}
                </a>
              </div>
              <button matIconButton aria-label="More options">
                <mat-icon>more_vert</mat-icon>
              </button>
            </div>

            <div class="divide-y divide-(--mat-sys-outline-variant)">
              @for (match of league.matches; track match.id) {
                <div
                  class="match-row flex cursor-pointer items-center justify-between p-4"
                  [routerLink]="['/match', match.id]"
                >
                  <div class="flex w-2/5 items-center justify-end gap-3 text-right">
                    <span
                      class="hidden text-sm font-medium sm:inline-block"
                      [class.text-red-500]="match.status === 'live'"
                    >
                      {{ match.homeTeam.name }}
                    </span>
                    <img
                      [src]="match.homeTeam.logo"
                      (error)="match.homeTeam.logo = defaultTeamLogoUrl"
                      [alt]="match.homeTeam.name"
                      class="h-7 w-7"
                    />
                  </div>

                  <div class="w-1/5 text-center">
                    @switch (match.status) {
                      @case ('scheduled') {
                        <div class="status-badge scheduled">
                          <span class="text-sm font-bold">{{ match.time }}</span>
                        </div>
                      }
                      @case ('live') {
                        <div class="status-badge live">
                          <span class="text-sm font-bold">
                            {{ match.homeScore }} - {{ match.awayScore }}
                          </span>
                        </div>
                        <span class="text-primary mt-1 block text-xs font-semibold">
                          {{ match.minute }}'
                        </span>
                      }
                      @case ('finished') {
                        <div class="status-badge finished">
                          <span class="text-sm font-bold">
                            {{ match.homeScore }} - {{ match.awayScore }}
                          </span>
                        </div>
                        <span class="text-secondary mt-1 block text-xs">
                          {{ 'common.finished' | translate }}
                        </span>
                      }
                    }
                  </div>

                  <div class="flex w-2/5 items-center justify-start gap-3 text-left">
                    <img
                      [src]="match.awayTeam.logo"
                      (error)="match.awayTeam.logo = defaultTeamLogoUrl"
                      [alt]="match.awayTeam.name"
                      class="h-7 w-7"
                    />
                    <span class="hidden text-sm font-medium sm:inline-block">
                      {{ match.awayTeam.name }}
                    </span>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      }

      @if (!isLoading() && filteredLeagues().length === 0) {
        <div class="card rounded-xl p-8 text-center">
          <mat-icon class="mb-2 text-5xl! opacity-50">sports_soccer</mat-icon>
          <p class="text-secondary">{{ 'matches.noMatchesForDate' | translate }}</p>
        </div>
      }
    </div>
  `,
  styles: `

    .league-link {
      color: inherit;
      text-decoration: none;
      cursor: pointer;
    }

    .league-link:hover {
      color: var(--mat-sys-primary);
      text-decoration: underline;
    }
      .triangle {
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 12px solid #fbbf24;
        transform: translateY(-1px);
      }

    .league-logo {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      background: linear-gradient(135deg, #7a0000, #b91c1c, #dc2626);
      border: 1px solid rgba(255,255,255,0.1);
      color: #facc15;

      font-weight: 800;
      font-size: 14px;

      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .league-initial {
      text-transform: uppercase;
    }

    .card {
      background-color: var(--mat-sys-surface-container);
    }

    .day-btn {
      color: var(--mat-sys-on-surface-variant);

      &:hover {
        background-color: color-mix(in srgb, var(--mat-sys-primary) 10%, transparent);
      }
    }

    .day-selected {
      background-color: var(--mat-sys-primary) !important;
      color: var(--mat-sys-on-primary) !important;

      span,
      p {
        color: inherit !important;
      }
    }

    .day-today:not(.day-selected) {
      border: 2px solid var(--mat-sys-primary);
    }

    .day-hidden {
      display: none;
    }

    @media (min-width: 640px) {
      .day-hidden {
        display: block;
      }
    }

    .match-row:hover {
      background-color: color-mix(in srgb, var(--mat-sys-primary) 5%, transparent);
    }

    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 6px;

      &.scheduled {
        background-color: var(--mat-sys-surface-container-high);
      }

      &.live {
        background-color: #dc2626;
        color: white;
      }

      &.finished {
        background-color: var(--mat-sys-surface-container-high);
      }
    }

    .hidden-input {
      width: 0;
      height: 0;
      opacity: 0;
      position: absolute;
      pointer-events: none;
    }
  `,
})
export default class MatchesList {
  private readonly i18nService = inject(I18nService);
  private readonly matchService = inject(MatchService);

  private readonly TOTAL_DAYS = 7;
  private readonly VISIBLE_MOBILE = 3;

  readonly defaultTeamLogoUrl =
    'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label=""><rect width="64" height="64" rx="10" fill="#e8eaed"/><circle cx="32" cy="24" r="10" fill="#9aa0a6"/><path fill="#9aa0a6" d="M16 52c4-12 12-18 16-18s12 6 16 18"/></svg>`
    );

  selectedDate = signal(this.getToday());
  allMatches = signal<MatchWithChampionship[]>([]);
  allChampionships = signal<ChampionshipListItem[]>([]);
  allTeams = signal<LightweightTeam[]>([]);
  isLoading = signal(false);

  constructor() {
    effect(() => {
      this.loadMatchesByDate();
    });
  }

  visibleDays = computed<DayOption[]>(() => {
    const today = this.getToday();
    const selected = this.selectedDate();
    const daysBeforeCenter = Math.floor(this.TOTAL_DAYS / 2);

    const startDate = new Date(selected);
    startDate.setDate(selected.getDate() - daysBeforeCenter);

    const days: DayOption[] = [];
    const locale = this.i18nService.getLocale();
    const dayNames = this.getDayNames(locale);
    const monthNames = this.getMonthNames(locale);

    for (let i = 0; i < this.TOTAL_DAYS; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      days.push({
        dayOfWeek: dayNames[date.getDay()],
        dayNumber: date.getDate(),
        month: monthNames[date.getMonth()],
        isToday: this.isSameDay(date, today),
        isSelected: this.isSameDay(date, selected),
        date: new Date(date),
      });
    }

    return days;
  });

  formattedMonthYear = computed(() => {
    const date = this.selectedDate();
    return this.i18nService.formatDate(date, {
      month: 'long',
      year: 'numeric',
    });
  });

  filteredLeagues = computed<FilteredLeague[]>(() => {
    const selectedDateStr = this.formatDateToISO(this.selectedDate());
    const matches = this.allMatches();
    const championships = this.allChampionships();
    const teams = this.allTeams();

    const matchesByChampionship = new Map<string, DisplayMatch[]>();

    for (const { championshipId, match } of matches) {
      const dateSource = match.scheduledStart;
      if (!dateSource) continue;

      const startDate =
        dateSource instanceof Date ? dateSource : new Date(dateSource);

      if (isNaN(startDate.getTime())) continue;

      const matchDate = this.formatDateToISO(startDate);
      if (matchDate !== selectedDateStr) continue;

      const homeTeam = teams.find(
        (t) => String(t.id) === String(match.homeTeamId)
      );
      const awayTeam = teams.find(
        (t) => String(t.id) === String(match.awayTeamId)
      );
      if (!homeTeam || !awayTeam) continue;

      const championship = championships.find(
        (c) => String(c.id) === championshipId
      );
      if (!championship) continue;

      const displayMatch: DisplayMatch = {
        id: String(match.id),
        homeTeam: {
          id: String(homeTeam.id),
          name: homeTeam.name,
          logo: homeTeam.logoUrl ?? this.defaultTeamLogoUrl,
        },
        awayTeam: {
          id: String(awayTeam.id),
          name: awayTeam.name,
          logo: awayTeam.logoUrl ?? this.defaultTeamLogoUrl,
        },
        status: this.mapMatchStatus(match.status),
        time: this.formatTimeFromDate(startDate),
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        minute: this.liveMinuteLabel(match),
        date: matchDate,
        league: championship.name,
      };

      if (!matchesByChampionship.has(championshipId)) {
        matchesByChampionship.set(championshipId, []);
      }

      matchesByChampionship.get(championshipId)!.push(displayMatch);
    }

    const filtered: FilteredLeague[] = [];

    for (const [championshipId, championshipMatches] of matchesByChampionship) {
      const championship = championships.find(
        (c) => String(c.id) === championshipId
      );
      if (!championship) continue;

      const countryLabel =
        championship.organization?.country?.trim() || 'Ecuador';
      const flagCode = this.countryToFlagCode(countryLabel);

      filtered.push({
        id: championshipId,
        name: championship.name,
        country: countryLabel,
        flagUrl: `https://flagcdn.com/w40/${flagCode}.png`,
        matches: championshipMatches.sort((a, b) => {
          const timeA = a.time || '00:00';
          const timeB = b.time || '00:00';
          return timeA.localeCompare(timeB);
        }),
      });
    }

    return filtered;
  });

  private loadMatchesByDate(): void {
    const date = this.formatDateToISO(this.selectedDate());
    this.isLoading.set(true);

    const offset = this.selectedDate().getTimezoneOffset();
    this.matchService.getScheduleByDate(date, offset).subscribe({
      next: (res) => {
        this.applyScheduleResponse(res);
        this.isLoading.set(false);
      },
      error: (err: unknown) => {
        console.error('Error loading matches by date', err);
        this.allMatches.set([]);
        this.allChampionships.set([]);
        this.allTeams.set([]);
        this.isLoading.set(false);
      },
    });
  }

  private applyScheduleResponse(res: ScheduleByDateResponse): void {
    const championshipById = new Map<string, ChampionshipListItem>();
    const teamById = new Map<string, LightweightTeam>();
    const matchesWC: MatchWithChampionship[] = [];

    for (const block of res.championships ?? []) {
      const meta = (block.championship ?? {}) as ScheduleByDateChampionshipMeta;

      for (const m of block.matches ?? []) {
        const rowChampId =
          m.championshipId != null && String(m.championshipId).trim() !== ''
            ? String(m.championshipId)
            : '';

        if (!rowChampId) continue;

        if (!championshipById.has(rowChampId)) {
          championshipById.set(
            rowChampId,
            this.buildSyntheticChampionshipListItem(rowChampId, meta)
          );
        }

        this.ingestScheduleTeams(m, rowChampId, teamById);

        matchesWC.push({
          championshipId: rowChampId,
          match: this.scheduleApiRowToMatch(m),
        });
      }
    }

    this.allChampionships.set([...championshipById.values()]);
    this.allTeams.set([...teamById.values()]);
    this.allMatches.set(matchesWC);
  }

  private buildSyntheticChampionshipListItem(
  id: string,
  meta: ScheduleByDateChampionshipMeta
): ChampionshipListItem {
  const name =
    meta.name && String(meta.name).trim() !== '' ? meta.name : 'Competición';

  const org = meta.organization;

  return {
    id,
    name,
    slug: id,
    season: '',
    logo: null,
    status: ChampionshipStatus.Active,
    startDate: null,
    endDate: null,
    maxTeams: 0,
    teamCount: 0,
    phaseCount: 0,
    organization: {
      id: org?.id ?? 'schedule',
      name: org?.name ?? '',
      logo: org?.logo ?? undefined,
      country: org?.country ?? 'Ecuador',
    },
    sport: {
      id: 0,
      name: '',
      icon: 'sports',
    },
  };
}

  private ingestScheduleTeams(
    m: ScheduleMatchDto,
    championshipId: string,
    teamById: Map<string, LightweightTeam>
  ): void {
    const ensure = (
      snippet: ScheduleMatchDto['homeTeam'] | ScheduleMatchDto['awayTeam'] | undefined,
      fallbackId: string
    ) => {
      const id = snippet?.id ?? fallbackId;
      if (teamById.has(id)) return;

      teamById.set(
        id,
        snippet
          ? {
              id: snippet.id,
              championshipId,
              name: snippet.name,
              shortname: snippet.shortname ?? snippet.name,
              logoUrl: snippet.logoUrl ?? this.defaultTeamLogoUrl,
            }
          : {
              id: fallbackId,
              championshipId,
              name: '—',
              shortname: '—',
              logoUrl: this.defaultTeamLogoUrl,
            }
      );
    };

    ensure(m.homeTeam, String(m.homeTeamId));
    ensure(m.awayTeam, String(m.awayTeamId));
  }

  private scheduleApiRowToMatch(m: ScheduleMatchDto): Match {
    return {
      id: m.id,
      championshipId: m.championshipId,
      homeTeamId: m.homeTeamId,
      awayTeamId: m.awayTeamId,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      status: m.status as MatchStatus,
      round: 0,
      scheduledStart: m.scheduledDate,
      venue: m.venue,
      city: m.city,
      isActive: true,
    };
  }

  private countryToFlagCode(country: string): string {
    const c = country.trim().toLowerCase();

    if (c.length === 2 && /^[a-z]{2}$/.test(c)) return c;

    const map: Record<string, string> = {
      ecuador: 'ec',
      spain: 'es',
      switzerland: 'ch',
      england: 'gb-eng',
      'united kingdom': 'gb',
      portugal: 'pt',
      france: 'fr',
      germany: 'de',
      italy: 'it',
    };

    return map[c] ?? 'ec';
  }

  private formatTimeFromDate(d: Date): string {
    return d.toLocaleTimeString(this.i18nService.getLocale(), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  private liveMinuteLabel(match: Match): string | undefined {
    if (match.status !== 'live' || !match.actualStartTime) {
      return undefined;
    }

    const start =
      match.actualStartTime instanceof Date
        ? match.actualStartTime
        : new Date(match.actualStartTime);

    if (isNaN(start.getTime())) return undefined;

    return Math.max(
      0,
      Math.floor((Date.now() - start.getTime()) / 60_000)
    ).toString();
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

  private getToday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  private formatDateToISO(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  shouldHideDay(index: number): boolean {
    const centerIndex = Math.floor(this.TOTAL_DAYS / 2);
    const range = Math.floor(this.VISIBLE_MOBILE / 2);
    return index < centerIndex - range || index > centerIndex + range;
  }

  selectDate(date: Date): void {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    this.selectedDate.set(newDate);
  }

  onDatePickerChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const newDate = new Date(event.value);
      newDate.setHours(0, 0, 0, 0);
      this.selectedDate.set(newDate);
    }
  }

  previousDay(): void {
    const current = this.selectedDate();
    const newDate = new Date(current);
    newDate.setDate(current.getDate() - 1);
    this.selectedDate.set(newDate);
  }

  nextDay(): void {
    const current = this.selectedDate();
    const newDate = new Date(current);
    newDate.setDate(current.getDate() + 1);
    this.selectedDate.set(newDate);
  }

  private getDayNames(locale: string): string[] {
    const ref = new Date(2024, 0, 7); // Sunday
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const names: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(ref);
      d.setDate(ref.getDate() + i);
      names.push(formatter.format(d));
    }
    return names;
  }

  private getMonthNames(locale: string): string[] {
    const formatter = new Intl.DateTimeFormat(locale, { month: 'short' });
    const names: string[] = [];
    for (let i = 0; i < 12; i++) {
      names.push(formatter.format(new Date(2024, i, 1)));
    }
    return names;
  }
}

