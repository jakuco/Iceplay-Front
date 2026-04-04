import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDatepickerToggleIcon,
  MatNativeDateModule
} from "./chunk-KNFDFUB5.js";
import {
  MatchService
} from "./chunk-UAP7CYK2.js";
import {
  ChampionshipStatus
} from "./chunk-Z53GGAOI.js";
import {
  I18nService,
  TranslatePipe
} from "./chunk-GT3UWJGO.js";
import "./chunk-VHW6UJNI.js";
import "./chunk-DYTKA3GQ.js";
import "./chunk-H27O3CUM.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-GQ2HD7F2.js";
import {
  MatFormFieldModule
} from "./chunk-YLNDQWGO.js";
import "./chunk-DXQNO7KC.js";
import "./chunk-LDEMS5LB.js";
import "./chunk-QFWQXRDF.js";
import "./chunk-YBE5VDY6.js";
import "./chunk-WFKBK73W.js";
import "./chunk-Q5IAYNPB.js";
import {
  MatButtonModule,
  MatIconButton
} from "./chunk-AE6CM25K.js";
import {
  RouterLink
} from "./chunk-ORPODLRN.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-YOLGDFC3.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-F7WKCRHW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/matches/pages/matches-list/matches-list.ts
var _c0 = (a0) => ["/championship", a0];
var _c1 = (a0) => ["/match", a0];
var _forTrack0 = ($index, $item) => $item.date.getTime();
var _forTrack1 = ($index, $item) => $item.id;
function MatchesList_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function MatchesList_For_18_Template_button_click_0_listener() {
      const day_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.selectDate(day_r3.date));
    });
    \u0275\u0275elementStart(1, "span", 16);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 17);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const day_r3 = ctx.$implicit;
    const \u0275$index_30_r5 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classProp("day-selected", day_r3.isSelected)("day-today", day_r3.isToday && !day_r3.isSelected)("day-hidden", ctx_r3.shouldHideDay(\u0275$index_30_r5));
    \u0275\u0275advance();
    \u0275\u0275classProp("font-semibold", day_r3.isToday);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", day_r3.isToday ? \u0275\u0275pipeBind1(3, 10, "common.today") : day_r3.dayOfWeek, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(day_r3.dayNumber);
  }
}
function MatchesList_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "mat-icon", 18);
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 19);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "common.loading"));
  }
}
function MatchesList_Conditional_23_For_1_For_11_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "span", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const match_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r7.time);
  }
}
function MatchesList_Conditional_23_For_1_For_11_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "span", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "span", 36);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", match_r7.homeScore, " - ", match_r7.awayScore);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", match_r7.minute, "'");
  }
}
function MatchesList_Conditional_23_For_1_For_11_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "span", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "span", 38);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", match_r7.homeScore, " - ", match_r7.awayScore);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 3, "common.finished"));
  }
}
function MatchesList_Conditional_23_For_1_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28)(2, "span", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "img", 30);
    \u0275\u0275listener("error", function MatchesList_Conditional_23_For_1_For_11_Template_img_error_4_listener() {
      const match_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(match_r7.homeTeam.logo = ctx_r3.defaultTeamLogoUrl);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 31);
    \u0275\u0275conditionalCreate(6, MatchesList_Conditional_23_For_1_For_11_Case_6_Template, 3, 1, "div", 32)(7, MatchesList_Conditional_23_For_1_For_11_Case_7_Template, 5, 3)(8, MatchesList_Conditional_23_For_1_For_11_Case_8_Template, 6, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 33)(10, "img", 30);
    \u0275\u0275listener("error", function MatchesList_Conditional_23_For_1_For_11_Template_img_error_10_listener() {
      const match_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(match_r7.awayTeam.logo = ctx_r3.defaultTeamLogoUrl);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 29);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_27_0;
    const match_r7 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(10, _c1, match_r7.id));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-red-500", match_r7.status === "live");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r7.homeTeam.name);
    \u0275\u0275advance();
    \u0275\u0275property("src", match_r7.homeTeam.logo, \u0275\u0275sanitizeUrl)("alt", match_r7.homeTeam.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_27_0 = match_r7.status) === "scheduled" ? 6 : tmp_27_0 === "live" ? 7 : tmp_27_0 === "finished" ? 8 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("src", match_r7.awayTeam.logo, \u0275\u0275sanitizeUrl)("alt", match_r7.awayTeam.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r7.awayTeam.name);
  }
}
function MatchesList_Conditional_23_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21)(2, "div", 22);
    \u0275\u0275element(3, "img", 23);
    \u0275\u0275elementStart(4, "h2", 24);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 25)(7, "mat-icon");
    \u0275\u0275text(8, "more_vert");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 26);
    \u0275\u0275repeaterCreate(10, MatchesList_Conditional_23_For_1_For_11_Template, 13, 12, "div", 27, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const league_r8 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275property("src", league_r8.flagUrl, \u0275\u0275sanitizeUrl)("alt", league_r8.country + " flag");
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c0, league_r8.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(league_r8.name);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(league_r8.matches);
  }
}
function MatchesList_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MatchesList_Conditional_23_For_1_Template, 12, 6, "div", 20, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r3.filteredLeagues());
  }
}
function MatchesList_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "mat-icon", 39);
    \u0275\u0275text(2, "sports_soccer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 19);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "matches.noMatchesForDate"));
  }
}
var MatchesList = class _MatchesList {
  i18nService = inject(I18nService);
  TOTAL_DAYS = 7;
  VISIBLE_MOBILE = 3;
  // Days visible on mobile (centered)
  /** Logo genérico cuando el API no envía `logoUrl` o viene vacío. */
  defaultTeamLogoUrl = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label=""><rect width="64" height="64" rx="10" fill="#e8eaed"/><circle cx="32" cy="24" r="10" fill="#9aa0a6"/><path fill="#9aa0a6" d="M16 52c4-12 12-18 16-18s12 6 16 18"/></svg>`);
  selectedDate = signal(this.getToday(), __spreadValues({}, ngDevMode ? { debugName: "selectedDate" } : {}));
  // Generate days centered around selected date
  visibleDays = computed(() => {
    const today = this.getToday();
    const selected = this.selectedDate();
    const daysBeforeCenter = Math.floor(this.TOTAL_DAYS / 2);
    const startDate = new Date(selected);
    startDate.setDate(selected.getDate() - daysBeforeCenter);
    const days = [];
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
        date: new Date(date)
      });
    }
    return days;
  }, __spreadValues({}, ngDevMode ? { debugName: "visibleDays" } : {}));
  /**
   * Formatted month and year for header, automatically translated based on current language
   */
  formattedMonthYear = computed(() => {
    const date = this.selectedDate();
    return this.i18nService.formatDate(date, { month: "long", year: "numeric" });
  }, __spreadValues({}, ngDevMode ? { debugName: "formattedMonthYear" } : {}));
  matchService = inject(MatchService);
  allMatches = signal([], __spreadValues({}, ngDevMode ? { debugName: "allMatches" } : {}));
  allChampionships = signal([], __spreadValues({}, ngDevMode ? { debugName: "allChampionships" } : {}));
  allTeams = signal([], __spreadValues({}, ngDevMode ? { debugName: "allTeams" } : {}));
  isLoading = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isLoading" } : {}));
  constructor() {
    effect(() => {
      this.loadMatchesByDate();
    });
  }
  // Filter leagues and matches by selected date
  filteredLeagues = computed(() => {
    const selectedDateStr = this.formatDateToISO(this.selectedDate());
    const matches = this.allMatches();
    const championships = this.allChampionships();
    const teams = this.allTeams();
    const matchesByChampionship = /* @__PURE__ */ new Map();
    for (const { championshipId, match } of matches) {
      const start = match.scheduledStart;
      if (!start)
        continue;
      const startDate = start instanceof Date ? start : new Date(start);
      const matchDate = this.formatDateToISO(startDate);
      if (matchDate === selectedDateStr) {
        const homeTeam = teams.find((t) => String(t.id) === String(match.homeTeamId));
        const awayTeam = teams.find((t) => String(t.id) === String(match.awayTeamId));
        if (!homeTeam || !awayTeam)
          continue;
        const championship = championships.find((c) => String(c.id) === championshipId);
        if (!championship)
          continue;
        const displayMatch = {
          id: String(match.id),
          homeTeam: {
            id: String(homeTeam.id),
            name: homeTeam.name,
            logo: homeTeam.logoUrl ?? this.defaultTeamLogoUrl
          },
          awayTeam: {
            id: String(awayTeam.id),
            name: awayTeam.name,
            logo: awayTeam.logoUrl ?? this.defaultTeamLogoUrl
          },
          status: this.mapMatchStatus(match.status),
          time: this.formatTimeFromDate(startDate),
          homeScore: match.homeScore,
          awayScore: match.awayScore,
          minute: this.liveMinuteLabel(match),
          date: matchDate,
          league: championship.name
        };
        if (!matchesByChampionship.has(championshipId)) {
          matchesByChampionship.set(championshipId, []);
        }
        matchesByChampionship.get(championshipId).push(displayMatch);
      }
    }
    const filtered = [];
    for (const [championshipId, championshipMatches] of matchesByChampionship) {
      const championship = championships.find((c) => String(c.id) === championshipId);
      if (!championship)
        continue;
      const org = championship.organization;
      const countryLabel = championship.organization?.country?.trim() || "Ecuador";
      const flagCode = this.countryToFlagCode(countryLabel);
      filtered.push({
        id: championshipId,
        name: championship.name,
        country: countryLabel,
        flagUrl: `https://flagcdn.com/w40/${flagCode}.png`,
        matches: championshipMatches.sort((a, b) => {
          const timeA = a.time || "00:00";
          const timeB = b.time || "00:00";
          return timeA.localeCompare(timeB);
        })
      });
    }
    return filtered;
  }, __spreadValues({}, ngDevMode ? { debugName: "filteredLeagues" } : {}));
  loadMatchesByDate() {
    const date = this.formatDateToISO(this.selectedDate());
    this.isLoading.set(true);
    this.matchService.getScheduleByDate(date).subscribe({
      next: (res) => {
        this.applyScheduleResponse(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error("Error loading matches by date", err);
        this.allMatches.set([]);
        this.allChampionships.set([]);
        this.allTeams.set([]);
        this.isLoading.set(false);
      }
    });
  }
  /**
   * Rellena `allMatches`, `allChampionships` y `allTeams` como espera `filteredLeagues`,
   * a partir del JSON del endpoint schedule-by-date.
   */
  applyScheduleResponse(res) {
    const championshipById = /* @__PURE__ */ new Map();
    const teamById = /* @__PURE__ */ new Map();
    const matchesWC = [];
    for (const block of res.championships ?? []) {
      for (const m of block.matches ?? []) {
        const rowChampId = m.championshipId != null && m.championshipId !== "" ? String(m.championshipId) : "";
        if (!rowChampId)
          continue;
        if (!championshipById.has(rowChampId)) {
          championshipById.set(rowChampId, this.buildSyntheticChampionshipListItem(rowChampId, block.championship));
        }
        this.ingestScheduleTeams(m, rowChampId, teamById);
        matchesWC.push({
          championshipId: rowChampId,
          match: this.scheduleApiRowToMatch(m)
        });
      }
    }
    this.allChampionships.set([...championshipById.values()]);
    this.allTeams.set([...teamById.values()]);
    this.allMatches.set(matchesWC);
  }
  buildSyntheticChampionshipListItem(id, meta) {
    const name = meta.name && String(meta.name).trim() !== "" ? meta.name : "Competici\xF3n";
    const org = meta.organization;
    const organization = __spreadValues({
      id: org?.id ?? "schedule",
      name: org?.name ?? "",
      logo: org?.logo ?? null
    }, org?.country !== void 0 ? { country: org.country } : {});
    return {
      id,
      name,
      slug: id,
      season: "",
      logo: null,
      status: ChampionshipStatus.Active,
      startDate: null,
      endDate: null,
      maxTeams: 0,
      teamCount: 0,
      phaseCount: 0,
      organization,
      sport: { id: 0, name: "", icon: "sports" }
    };
  }
  ingestScheduleTeams(m, championshipId, teamById) {
    const ensure = (snippet, fallbackId) => {
      const id = snippet?.id ?? fallbackId;
      if (teamById.has(id))
        return;
      teamById.set(id, snippet ? this.scheduleSnippetToTeam(snippet, championshipId) : this.placeholderScheduleTeam(fallbackId, championshipId));
    };
    ensure(m.homeTeam, String(m.homeTeamId));
    ensure(m.awayTeam, String(m.awayTeamId));
  }
  scheduleSnippetToTeam(snippet, championshipId) {
    const now = /* @__PURE__ */ new Date();
    const slug = snippet.shortname?.trim() || String(snippet.id);
    return {
      id: snippet.id,
      championshipId,
      name: snippet.name,
      shortname: snippet.shortname,
      slug: slug.toLowerCase().replace(/\s+/g, "-"),
      logoUrl: snippet.logoUrl ?? this.defaultTeamLogoUrl,
      documentUrl: null,
      primaryColor: null,
      secondaryColor: null,
      foundedYear: null,
      homeVenue: null,
      location: null,
      coachName: null,
      coachPhone: null,
      isActive: true,
      hasActiveMatches: false,
      createdAt: now,
      updatedAt: now
    };
  }
  placeholderScheduleTeam(id, championshipId) {
    const now = /* @__PURE__ */ new Date();
    return {
      id,
      championshipId,
      name: "\u2014",
      shortname: "\u2014",
      slug: String(id),
      logoUrl: null,
      documentUrl: null,
      primaryColor: null,
      secondaryColor: null,
      foundedYear: null,
      homeVenue: null,
      location: null,
      coachName: null,
      coachPhone: null,
      isActive: true,
      hasActiveMatches: false,
      createdAt: now,
      updatedAt: now
    };
  }
  scheduleApiRowToMatch(m) {
    return {
      id: m.id,
      championshipId: m.championshipId,
      groupTeamId: "",
      homeTeamId: m.homeTeamId,
      awayTeamId: m.awayTeamId,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      status: m.status,
      round: 0,
      scheduledStart: new Date(m.scheduledDate),
      venue: m.venue,
      city: m.city,
      isActive: true
    };
  }
  // /**
  //  * Convierte rutas relativas del API (`teams/foo.png`) en URL absoluta.
  //  * Usa el origen de `environment.baseUrl` sin el sufijo `/api`.
  //  */
  // private resolveScheduleAssetUrl(path: string | null | undefined): string | null {
  //   if (path == null) return null;
  //   const raw = String(path).trim();
  //   if (raw === '') return null;
  //   if (/^https?:\/\//i.test(raw)) return raw;
  //   const apiBase = environment.baseUrl.replace(/\/+$/, '');
  //   const originBase = apiBase.replace(/\/api\/?$/i, '') || apiBase;
  //   const segment = raw.startsWith('/') ? raw : `/${raw}`;
  //   return `${originBase}${segment}`;
  // }
  // private displayTeamLogo(url: string | null | undefined): string {
  //   if (url != null && String(url).trim() !== '') {
  //     return String(url).trim();
  //   }
  //   return this.defaultTeamLogoUrl;
  // }
  /** ISO 3166-1 alpha-2 para flagcdn; fallback ec. */
  countryToFlagCode(country) {
    const c = country.trim().toLowerCase();
    if (c.length === 2 && /^[a-z]{2}$/.test(c))
      return c;
    const map = {
      ecuador: "ec",
      spain: "es",
      switzerland: "ch",
      england: "gb-eng",
      "united kingdom": "gb",
      portugal: "pt",
      france: "fr",
      germany: "de",
      italy: "it"
    };
    return map[c] ?? "ec";
  }
  formatTimeFromDate(d) {
    return d.toLocaleTimeString(this.i18nService.getLocale(), {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }
  /** Minuto aproximado en vivo si hay `actualStartTime`; si no, sin etiqueta. */
  liveMinuteLabel(match) {
    if (match.status !== "live" || !match.actualStartTime) {
      return void 0;
    }
    const start = match.actualStartTime instanceof Date ? match.actualStartTime : new Date(match.actualStartTime);
    return Math.max(0, Math.floor((Date.now() - start.getTime()) / 6e4)).toString();
  }
  mapMatchStatus(status) {
    if (status === "live" || status === "warmup" || status === "halftime" || status === "break" || status === "overtime" || status === "penalties") {
      return "live";
    }
    if (status === "finished") {
      return "finished";
    }
    return "scheduled";
  }
  getToday() {
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }
  isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }
  formatDateToISO(date) {
    return date.toISOString().split("T")[0];
  }
  // Determine if day should be hidden on mobile (only show center 3)
  shouldHideDay(index) {
    const centerIndex = Math.floor(this.TOTAL_DAYS / 2);
    const range = Math.floor(this.VISIBLE_MOBILE / 2);
    return index < centerIndex - range || index > centerIndex + range;
  }
  selectDate(date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    this.selectedDate.set(newDate);
  }
  onDatePickerChange(event) {
    if (event.value) {
      const newDate = new Date(event.value);
      newDate.setHours(0, 0, 0, 0);
      this.selectedDate.set(newDate);
    }
  }
  previousDay() {
    const current = this.selectedDate();
    const newDate = new Date(current);
    newDate.setDate(current.getDate() - 1);
    this.selectedDate.set(newDate);
  }
  nextDay() {
    const current = this.selectedDate();
    const newDate = new Date(current);
    newDate.setDate(current.getDate() + 1);
    this.selectedDate.set(newDate);
  }
  /**
   * Gets abbreviated day names based on locale
   */
  getDayNames(locale) {
    const baseDate = new Date(2024, 0, 7);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      const dayName = date.toLocaleDateString(locale, { weekday: "short" }).toUpperCase();
      days.push(dayName);
    }
    return days;
  }
  /**
   * Gets abbreviated month names based on locale
   */
  getMonthNames(locale) {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(2024, i, 1);
      const monthName = date.toLocaleDateString(locale, { month: "short" }).toUpperCase();
      months.push(monthName);
    }
    return months;
  }
  static \u0275fac = function MatchesList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatchesList)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MatchesList, selectors: [["app-matches-list"]], decls: 25, vars: 7, consts: [["picker", ""], [1, "mx-auto", "flex", "max-w-5xl", "flex-col", "gap-6", "p-4", "md:p-6"], [1, "card", "rounded-xl", "p-3", "sm:p-4"], [1, "mb-3", "flex", "items-center", "justify-between"], [1, "text-lg", "font-semibold"], [1, "flex", "items-center"], ["matInput", "", 1, "hidden-input", 3, "dateChange", "matDatepicker", "value"], [3, "for"], ["matDatepickerToggleIcon", ""], [1, "flex", "items-center", "gap-1"], ["matIconButton", "", "aria-label", "Previous day", 1, "shrink-0", 3, "click"], [1, "flex", "flex-1", "justify-center", "gap-1", "overflow-hidden"], [1, "day-btn", "max-w-[60px]", "flex-1", "rounded-lg", "p-2", "transition-all", 3, "day-selected", "day-today", "day-hidden"], ["matIconButton", "", "aria-label", "Next day", 1, "shrink-0", 3, "click"], [1, "card", "rounded-xl", "p-8", "text-center"], [1, "day-btn", "max-w-[60px]", "flex-1", "rounded-lg", "p-2", "transition-all", 3, "click"], [1, "text-[10px]", "uppercase", "sm:text-xs"], [1, "text-base", "font-bold", "sm:text-lg"], [1, "mb-2", "animate-spin", "text-5xl!", "opacity-50"], [1, "text-secondary"], [1, "card", "overflow-hidden", "rounded-xl"], [1, "flex", "items-center", "justify-between", "border-b", "border-(--mat-sys-outline-variant)", "p-4"], [1, "flex", "items-center", "gap-3"], [1, "h-auto", "w-6", "rounded-sm", 3, "src", "alt"], [1, "text-lg", "font-bold", 3, "routerLink"], ["matIconButton", "", "aria-label", "More options"], [1, "divide-y", "divide-(--mat-sys-outline-variant)"], [1, "match-row", "flex", "cursor-pointer", "items-center", "justify-between", "p-4", 3, "routerLink"], [1, "flex", "w-2/5", "items-center", "justify-end", "gap-3", "text-right"], [1, "hidden", "text-sm", "font-medium", "sm:inline-block"], [1, "h-7", "w-7", 3, "error", "src", "alt"], [1, "w-1/5", "text-center"], [1, "status-badge", "scheduled"], [1, "flex", "w-2/5", "items-center", "justify-start", "gap-3", "text-left"], [1, "text-sm", "font-bold"], [1, "status-badge", "live"], [1, "text-primary", "mt-1", "block", "text-xs", "font-semibold"], [1, "status-badge", "finished"], [1, "text-secondary", "mt-1", "block", "text-xs"], [1, "mb-2", "text-5xl!", "opacity-50"]], template: function MatchesList_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "h2", 4);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 5)(6, "input", 6);
      \u0275\u0275listener("dateChange", function MatchesList_Template_input_dateChange_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDatePickerChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "mat-datepicker-toggle", 7)(8, "mat-icon", 8);
      \u0275\u0275text(9, "calendar_month");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(10, "mat-datepicker", null, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 9)(13, "button", 10);
      \u0275\u0275listener("click", function MatchesList_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.previousDay());
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "chevron_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 11);
      \u0275\u0275repeaterCreate(17, MatchesList_For_18_Template, 6, 12, "button", 12, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 13);
      \u0275\u0275listener("click", function MatchesList_Template_button_click_19_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.nextDay());
      });
      \u0275\u0275elementStart(20, "mat-icon");
      \u0275\u0275text(21, "chevron_right");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(22, MatchesList_Conditional_22_Template, 6, 3, "div", 14);
      \u0275\u0275conditionalCreate(23, MatchesList_Conditional_23_Template, 2, 0);
      \u0275\u0275conditionalCreate(24, MatchesList_Conditional_24_Template, 6, 3, "div", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const picker_r9 = \u0275\u0275reference(11);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.formattedMonthYear());
      \u0275\u0275advance(2);
      \u0275\u0275property("matDatepicker", picker_r9)("value", ctx.selectedDate());
      \u0275\u0275advance();
      \u0275\u0275property("for", picker_r9);
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.visibleDays());
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.isLoading() ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading() ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading() && ctx.filteredLeagues().length === 0 ? 24 : -1);
    }
  }, dependencies: [
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatIconButton,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerToggleIcon,
    MatNativeDateModule,
    MatInputModule,
    MatInput,
    MatFormFieldModule,
    RouterLink,
    TranslatePipe
  ], styles: ["\n\n.card[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-surface-container);\n}\n.day-btn[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n}\n.day-btn[_ngcontent-%COMP%]:hover {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 10%, transparent);\n}\n.day-selected[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-primary) !important;\n  color: var(--mat-sys-on-primary) !important;\n}\n.day-selected[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.day-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: inherit !important;\n}\n.day-today[_ngcontent-%COMP%]:not(.day-selected) {\n  border: 2px solid var(--mat-sys-primary);\n}\n.day-hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (min-width: 640px) {\n  .day-hidden[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n.match-row[_ngcontent-%COMP%]:hover {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 5%, transparent);\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 6px;\n}\n.status-badge.scheduled[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-surface-container-high);\n}\n.status-badge.live[_ngcontent-%COMP%] {\n  background-color: #dc2626;\n  color: white;\n}\n.status-badge.finished[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-surface-container-high);\n}\n.hidden-input[_ngcontent-%COMP%] {\n  width: 0;\n  height: 0;\n  opacity: 0;\n  position: absolute;\n  pointer-events: none;\n}\n/*# sourceMappingURL=matches-list.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatchesList, [{
    type: Component,
    args: [{ selector: "app-matches-list", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      MatIconModule,
      MatButtonModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule,
      MatFormFieldModule,
      RouterLink,
      TranslatePipe
    ], template: `
    <div class="mx-auto flex max-w-5xl flex-col gap-6 p-4 md:p-6">
      <!-- Date Picker -->
      <div class="card rounded-xl p-3 sm:p-4">
        <!-- Month/Year Header -->
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-lg font-semibold">{{ formattedMonthYear() }}</h2>

          <!-- Calendar Picker -->
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

        <!-- Days Navigation -->
        <div class="flex items-center gap-1">
          <button matIconButton (click)="previousDay()" aria-label="Previous day" class="shrink-0">
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
                <span class="text-[10px] uppercase sm:text-xs" [class.font-semibold]="day.isToday">
                  {{ day.isToday ? ('common.today' | translate) : day.dayOfWeek }}
                </span>
                <p class="text-base font-bold sm:text-lg">{{ day.dayNumber }}</p>
              </button>
            }
          </div>

          <button matIconButton (click)="nextDay()" aria-label="Next day" class="shrink-0">
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      @if (isLoading()) {
        <div class="card rounded-xl p-8 text-center">
          <mat-icon class="mb-2 animate-spin text-5xl! opacity-50">refresh</mat-icon>
          <p class="text-secondary">{{ 'common.loading' | translate }}</p>
        </div>
      }

      <!-- Leagues and Matches -->
      @if (!isLoading()) {
        @for (league of filteredLeagues(); track league.id) {
          <div class="card overflow-hidden rounded-xl">
            <!-- League Header -->
            <div
              class="flex items-center justify-between border-b border-(--mat-sys-outline-variant) p-4"
            >
              <div class="flex items-center gap-3">
                <img
                  [src]="league.flagUrl"
                  [alt]="league.country + ' flag'"
                  class="h-auto w-6 rounded-sm"
                />
                <h2 class="text-lg font-bold" [routerLink]="['/championship', league.id]">{{ league.name }}</h2>
              </div>  
              <button matIconButton aria-label="More options">
                <mat-icon>more_vert</mat-icon>
              </button>
            </div>

            <!-- Matches -->
            <div class="divide-y divide-(--mat-sys-outline-variant)">
              @for (match of league.matches; track match.id) {
                <div
                  class="match-row flex cursor-pointer items-center justify-between p-4"
                  [routerLink]="['/match', match.id]"
                >
                  <!-- Home Team -->
                  <div class="flex w-2/5 items-center justify-end gap-3 text-right">
                    <span
                      class="hidden text-sm font-medium sm:inline-block"
                      [class.text-red-500]="match.status === 'live'"
                      >{{ match.homeTeam.name }}</span
                    >
                    <img [src]="match.homeTeam.logo" (error)="match.homeTeam.logo = defaultTeamLogoUrl" [alt]="match.homeTeam.name" class="h-7 w-7" />
                  </div>

                  <!-- Score/Time -->
                  <div class="w-1/5 text-center">
                    @switch (match.status) {
                      @case ('scheduled') {
                        <div class="status-badge scheduled">
                          <span class="text-sm font-bold">{{ match.time }}</span>
                        </div>
                      }
                      @case ('live') {
                        <div class="status-badge live">
                          <span class="text-sm font-bold"
                            >{{ match.homeScore }} - {{ match.awayScore }}</span
                          >
                        </div>
                        <span class="text-primary mt-1 block text-xs font-semibold"
                          >{{ match.minute }}'</span
                        >
                      }
                      @case ('finished') {
                        <div class="status-badge finished">
                          <span class="text-sm font-bold"
                            >{{ match.homeScore }} - {{ match.awayScore }}</span
                          >
                        </div>
                        <span class="text-secondary mt-1 block text-xs">{{
                          'common.finished' | translate
                        }}</span>
                      }
                    }
                  </div>

                  <!-- Away Team -->
                  <div class="flex w-2/5 items-center justify-start gap-3 text-left">
                    <img [src]="match.awayTeam.logo" (error)="match.awayTeam.logo = defaultTeamLogoUrl" [alt]="match.awayTeam.name" class="h-7 w-7" />
                    <span class="hidden text-sm font-medium sm:inline-block">{{
                      match.awayTeam.name
                    }}</span>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      }

      <!-- Empty State -->
      @if (!isLoading() && filteredLeagues().length === 0) {
        <div class="card rounded-xl p-8 text-center">
          <mat-icon class="mb-2 text-5xl! opacity-50">sports_soccer</mat-icon>
          <p class="text-secondary">{{ 'matches.noMatchesForDate' | translate }}</p>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:scss;1d48862aea14d353de8d10d07a1686691554edad1d6c15de39c3056eedc7dd72;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/matches/pages/matches-list/matches-list.ts */\n.card {\n  background-color: var(--mat-sys-surface-container);\n}\n.day-btn {\n  color: var(--mat-sys-on-surface-variant);\n}\n.day-btn:hover {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 10%, transparent);\n}\n.day-selected {\n  background-color: var(--mat-sys-primary) !important;\n  color: var(--mat-sys-on-primary) !important;\n}\n.day-selected span,\n.day-selected p {\n  color: inherit !important;\n}\n.day-today:not(.day-selected) {\n  border: 2px solid var(--mat-sys-primary);\n}\n.day-hidden {\n  display: none;\n}\n@media (min-width: 640px) {\n  .day-hidden {\n    display: block;\n  }\n}\n.match-row:hover {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 5%, transparent);\n}\n.status-badge {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 6px;\n}\n.status-badge.scheduled {\n  background-color: var(--mat-sys-surface-container-high);\n}\n.status-badge.live {\n  background-color: #dc2626;\n  color: white;\n}\n.status-badge.finished {\n  background-color: var(--mat-sys-surface-container-high);\n}\n.hidden-input {\n  width: 0;\n  height: 0;\n  opacity: 0;\n  position: absolute;\n  pointer-events: none;\n}\n/*# sourceMappingURL=matches-list.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MatchesList, { className: "MatchesList", filePath: "src/app/features/matches/pages/matches-list/matches-list.ts", lineNumber: 302 });
})();
export {
  MatchesList as default
};
//# sourceMappingURL=chunk-7ED75M2H.js.map
