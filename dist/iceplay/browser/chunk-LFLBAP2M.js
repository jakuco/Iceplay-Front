import {
  ChampionshipService
} from "./chunk-BQKVUEWM.js";
import {
  toSignal
} from "./chunk-RSSJKDFU.js";
import "./chunk-I4DDBC3P.js";
import {
  ActivatedRoute
} from "./chunk-XIJO5SZ4.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-2QF6PXYN.js";
import {
  ChangeDetectionStrategy,
  Component,
  catchError,
  computed,
  inject,
  map,
  of,
  setClassMetadata,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/cup/cup.page.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function CupPage_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "Live");
    \u0275\u0275elementEnd();
  }
}
function CupPage_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1, "No Live");
    \u0275\u0275elementEnd();
  }
}
function CupPage_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 33)(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tab_r1 = ctx.$implicit;
    \u0275\u0275classProp("tab-btn-active", tab_r1.id === "overview");
    \u0275\u0275attribute("aria-current", tab_r1.id === "overview" ? "page" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r1.label);
  }
}
function CupPage_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 15)(1, "div", 34)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 36);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const stat_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stat_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r2.value);
  }
}
function CupPage_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 19)(1, "div", 37)(2, "span", 38);
    \u0275\u0275text(3, "Live");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 39);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 40)(7, "div", 41)(8, "div", 42)(9, "span", 43);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 44);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "strong", 45);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 41)(16, "div", 42)(17, "span", 43);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 44);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "strong", 45);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const match_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(match_r3.time);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.getTeamEmoji(match_r3.homeTeam));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r3.homeTeam);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r3.homeScore);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.getTeamEmoji(match_r3.awayTeam));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r3.awayTeam);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r3.awayScore);
  }
}
function CupPage_For_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 25)(1, "div", 46)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 47)(7, "span", 48)(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 43);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "span", 49);
    \u0275\u0275text(13, "vs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 48)(15, "span", 43);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const match_r5 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(match_r5.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r5.time);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(match_r5.homeTeam);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.getTeamEmoji(match_r5.homeTeam));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.getTeamEmoji(match_r5.awayTeam));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r5.awayTeam);
  }
}
function CupPage_For_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 27)(1, "span", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 43);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 52);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10, "pts");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const team_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r6.rank);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.getTeamEmoji(team_r6.team));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r6.team);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r6.points);
  }
}
function CupPage_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 31)(1, "p", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40)(4, "div", 41)(5, "div", 42)(6, "span", 43);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 44);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "strong", 45);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 41)(13, "div", 42)(14, "span", 43);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 44);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "strong", 45);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "p", 54);
    \u0275\u0275text(21, "Final");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r7.dateTime);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.getTeamEmoji(result_r7.homeTeam));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r7.homeTeam);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r7.homeScore);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.getTeamEmoji(result_r7.awayTeam));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r7.awayTeam);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r7.awayScore);
  }
}
var CupPage = class _CupPage {
  championshipService = inject(ChampionshipService);
  route = inject(ActivatedRoute);
  tabs = [
    { id: "overview", label: "Overview", icon: "shield" },
    { id: "matches", label: "Matches", icon: "calendar_today" },
    { id: "standings", label: "Standings", icon: "leaderboard" },
    { id: "teams", label: "Teams", icon: "groups" },
    { id: "players", label: "Players", icon: "person" },
    { id: "stats", label: "Stats", icon: "query_stats" }
  ];
  routeCupSlug = toSignal(this.route.paramMap.pipe(map((params) => params.get("cupName") ?? "liga-invernal-iceplay-2025")), { initialValue: "liga-invernal-iceplay-2025" });
  championshipDetail = toSignal(this.route.paramMap.pipe(map((params) => params.get("cupName") ?? ""), switchMap((cupSlug) => this.championshipService.getAllChampionships().pipe(map((championships) => this.findChampionshipBySlug(championships, cupSlug)), switchMap((championship) => {
    if (!championship) {
      return of(null);
    }
    const championshipId = this.parseNumericId(championship.id, 0);
    if (championshipId <= 0) {
      return of(null);
    }
    return this.championshipService.getChampionshipDetail(championshipId).pipe(map((detail) => this.toChampionshipDetailResponse(detail)));
  }))), catchError(() => of(null))), { initialValue: null });
  cupName = computed(() => {
    const detail = this.championshipDetail();
    if (detail?.name?.trim()) {
      return detail.name;
    }
    return this.normalizeCupName(this.routeCupSlug());
  }, __spreadValues({}, ngDevMode ? { debugName: "cupName" } : {}));
  championshipDescription = computed(() => {
    const detail = this.championshipDetail();
    if (detail?.description?.trim()) {
      return detail.description;
    }
    return "Informacion del campeonato en actualizacion.";
  }, __spreadValues({}, ngDevMode ? { debugName: "championshipDescription" } : {}));
  isChampionshipLive = computed(() => {
    const status = this.championshipDetail()?.status;
    return status === 1 || status === "1" || status === "active";
  }, __spreadValues({}, ngDevMode ? { debugName: "isChampionshipLive" } : {}));
  championshipStatusLabel = computed(() => this.isChampionshipLive() ? "En progreso" : "Finalizado", __spreadValues({}, ngDevMode ? { debugName: "championshipStatusLabel" } : {}));
  uniqueTeams = computed(() => this.extractUniqueTeams(this.championshipDetail()), __spreadValues({}, ngDevMode ? { debugName: "uniqueTeams" } : {}));
  liveMatches = computed(() => {
    const activeTeams = this.uniqueTeams().filter((team) => team.hasActiveMatches);
    return this.buildLiveMatches(activeTeams);
  }, __spreadValues({}, ngDevMode ? { debugName: "liveMatches" } : {}));
  upcomingMatches = computed(() => {
    const inactiveTeams = this.uniqueTeams().filter((team) => !team.hasActiveMatches);
    return this.buildUpcomingMatches(inactiveTeams);
  }, __spreadValues({}, ngDevMode ? { debugName: "upcomingMatches" } : {}));
  standings = computed(() => {
    const detail = this.championshipDetail();
    const teams = this.uniqueTeams();
    if (!detail || teams.length === 0) {
      return [];
    }
    const appearances = this.getTeamAppearances(detail);
    const sorted = [...teams].map((team) => {
      const teamId = this.parseNumericId(team.id, 0);
      const base = appearances.get(teamId) ?? 1;
      const points = base * 3 + (team.hasActiveMatches ? 2 : 0) + teamId % 3;
      return { team, points };
    }).sort((a, b) => b.points - a.points || a.team.name.localeCompare(b.team.name)).slice(0, 5);
    return sorted.map((entry, index) => ({
      id: `std-${entry.team.id}`,
      rank: index + 1,
      team: entry.team.name,
      points: entry.points
    }));
  }, __spreadValues({}, ngDevMode ? { debugName: "standings" } : {}));
  recentResults = computed(() => {
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
        awayScore: (awayId + index + 1) % 3
      };
    });
  }, __spreadValues({}, ngDevMode ? { debugName: "recentResults" } : {}));
  footerLabel = computed(() => {
    const season = this.championshipDetail()?.season;
    return `${this.cupName()}${season ? ` ${season}` : ""} - Powered by IcePlay Platform`;
  }, __spreadValues({}, ngDevMode ? { debugName: "footerLabel" } : {}));
  summaryStats = computed(() => {
    const teams = this.uniqueTeams().length;
    const matchesPlayed = this.recentResults().length;
    const goalsScored = this.recentResults().reduce((total, match) => total + match.homeScore + match.awayScore, 0) + this.liveMatches().reduce((total, match) => total + match.homeScore + match.awayScore, 0);
    const avgGoals = matchesPlayed > 0 ? (goalsScored / matchesPlayed).toFixed(1) : "0.0";
    return [
      { label: "Equipos", value: String(teams), icon: "groups" },
      { label: "Partidos Jugados", value: String(matchesPlayed), icon: "calendar_month" },
      { label: "Goles Anotados", value: String(goalsScored), icon: "sports_score" },
      { label: "Promedio de Goles/Partido", value: avgGoals, icon: "query_stats" }
    ];
  }, __spreadValues({}, ngDevMode ? { debugName: "summaryStats" } : {}));
  findChampionshipBySlug(championships, cupSlugParam) {
    const normalizedParam = this.normalizeSlug(cupSlugParam);
    return championships.find((championship) => this.normalizeSlug(championship.slug ?? championship.name ?? "").includes(normalizedParam));
  }
  toChampionshipDetailResponse(input) {
    if (!input || typeof input !== "object") {
      return null;
    }
    const detail = input;
    return {
      id: detail.id ?? "",
      name: typeof detail.name === "string" ? detail.name : "",
      slug: typeof detail.slug === "string" ? detail.slug : "",
      description: typeof detail.description === "string" ? detail.description : "",
      status: typeof detail.status === "number" || typeof detail.status === "string" ? detail.status : 0,
      season: typeof detail.season === "string" ? detail.season : "",
      totalTeams: typeof detail.totalTeams === "number" ? detail.totalTeams : void 0,
      phases: Array.isArray(detail.phases) ? detail.phases : []
    };
  }
  extractUniqueTeams(detail) {
    if (!detail?.phases?.length) {
      return [];
    }
    const teamMap = /* @__PURE__ */ new Map();
    for (const phase of detail.phases) {
      for (const group of phase.groups ?? []) {
        for (const team of group.teams ?? []) {
          if (!teamMap.has(team.id)) {
            teamMap.set(team.id, team);
          }
        }
      }
    }
    console.log("Unique teams extracted:", teamMap.size);
    return Array.from(teamMap.values());
  }
  buildLiveMatches(teams) {
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
        time: `${19 + index * 2}:00`
      };
    });
  }
  buildUpcomingMatches(teams) {
    const pairs = this.buildTeamPairs(teams).slice(0, 3);
    return pairs.map((pair, index) => ({
      id: `next-${index + 1}`,
      date: this.buildUpcomingDate(index),
      time: `${18 + index}:30`,
      homeTeam: pair.home.name,
      awayTeam: pair.away.name
    }));
  }
  buildTeamPairs(teams) {
    const pairs = [];
    for (let index = 0; index + 1 < teams.length; index += 2) {
      pairs.push({ home: teams[index], away: teams[index + 1] });
    }
    return pairs;
  }
  getTeamAppearances(detail) {
    const appearances = /* @__PURE__ */ new Map();
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
  buildUpcomingDate(index) {
    const baseDate = /* @__PURE__ */ new Date("2026-05-01");
    baseDate.setDate(baseDate.getDate() + index);
    return baseDate.toISOString().split("T")[0];
  }
  buildRecentResultDate(index) {
    const baseDate = /* @__PURE__ */ new Date("2026-04-20T20:00:00");
    baseDate.setDate(baseDate.getDate() - index);
    const date = baseDate.toISOString().split("T")[0];
    const hour = 20 - index;
    return `${date} - ${String(hour).padStart(2, "0")}:00`;
  }
  parseNumericId(value, fallback) {
    if (typeof value === "number") {
      return value;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }
  normalizeSlug(value) {
    return value.toLowerCase().replace(/^\/+|\/+$/g, "").replace(/\s+/g, "-");
  }
  getTeamEmoji(teamName) {
    const emojiMap = {
      "Lobos Grises": "\u{1F43A}",
      "Dragones Rojos": "\u{1F409}",
      "Aguilas Reales": "\u{1F985}",
      "Panteras Negras": "\u{1F406}",
      "Halcones Azules": "\u{1F985}",
      "Leones Dorados": "\u{1F981}",
      "Osos Polares FC": "\u{1F43B}",
      "Tigres del Sur": "\u{1F42F}"
    };
    return emojiMap[teamName] ?? "\u{1F3D2}";
  }
  normalizeCupName(slug) {
    if (!slug.trim()) {
      return "Liga Invernal IcePlay 2025";
    }
    const normalizedName = slug.replace(/-/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (char) => char.toUpperCase());
    return normalizedName;
  }
  static \u0275fac = function CupPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CupPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CupPage, selectors: [["app-cup-page"]], decls: 68, vars: 7, consts: [[1, "cup-page"], ["aria-label", "Resumen del campeonato", 1, "page-header"], [1, "header-title-wrap"], ["aria-hidden", "true", 1, "header-icon"], [1, "page-title"], [1, "page-subtitle"], ["aria-label", "Campeonato en vivo", 1, "live-pill"], ["aria-label", "Campeonato no activo", 1, "nolive-pill"], ["aria-label", "Secciones del campeonato", 1, "tab-nav"], ["type", "button", 1, "tab-btn", 3, "tab-btn-active"], ["aria-labelledby", "hero-title", 1, "hero-card"], [1, "hero-status"], ["id", "hero-title", 1, "hero-title"], [1, "hero-subtitle"], ["role", "list", "aria-label", "Resumen de m\xE9tricas del campeonato", 1, "hero-stats"], ["role", "listitem", 1, "stat-card"], ["aria-labelledby", "live-title", 1, "section-block"], ["id", "live-title", 1, "section-title", "with-dot"], [1, "live-grid"], [1, "match-live-card"], ["aria-label", "Calendario y clasificaci\xF3n", 1, "section-block", "grid-section"], [1, "section-head-row"], [1, "section-title"], ["type", "button", 1, "text-link"], ["role", "list", 1, "upcoming-list"], ["role", "listitem", 1, "upcoming-card"], [1, "standings-list"], [1, "standing-row"], ["aria-labelledby", "results-title", 1, "section-block"], ["id", "results-title", 1, "section-title"], ["role", "list", 1, "results-grid"], ["role", "listitem", 1, "result-card"], [1, "page-footer"], ["type", "button", 1, "tab-btn"], [1, "stat-label-wrap"], [1, "stat-label"], [1, "stat-value"], [1, "match-head"], [1, "match-live-badge"], [1, "match-time"], [1, "teams-stack"], [1, "team-row"], [1, "team-name-wrap"], ["aria-hidden", "true", 1, "team-emoji"], [1, "team-name"], [1, "team-score"], [1, "upcoming-meta"], [1, "upcoming-teams"], [1, "team-inline"], [1, "vs"], [1, "rank-pill"], [1, "standing-team"], [1, "standing-points"], [1, "result-datetime"], [1, "match-status"]], template: function CupPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3)(4, "mat-icon");
      \u0275\u0275text(5, "sports_hockey");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 4);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 5);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(11, CupPage_Conditional_11_Template, 2, 0, "span", 6)(12, CupPage_Conditional_12_Template, 2, 0, "span", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "nav", 8);
      \u0275\u0275repeaterCreate(14, CupPage_For_15_Template, 5, 5, "button", 9, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "section", 10)(17, "div", 11);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "h2", 12);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "p", 13);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 14);
      \u0275\u0275repeaterCreate(24, CupPage_For_25_Template, 8, 3, "article", 15, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "section", 16)(27, "h2", 17);
      \u0275\u0275text(28, "Partidos en Vivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 18);
      \u0275\u0275repeaterCreate(30, CupPage_For_31_Template, 23, 7, "article", 19, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "section", 20)(33, "div")(34, "div", 21)(35, "h2", 22);
      \u0275\u0275text(36, "Pr\xF3ximos Partidos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 23);
      \u0275\u0275text(38, " View all ");
      \u0275\u0275elementStart(39, "mat-icon");
      \u0275\u0275text(40, "arrow_forward");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 24);
      \u0275\u0275repeaterCreate(42, CupPage_For_43_Template, 19, 6, "article", 25, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "aside")(45, "div", 21)(46, "h2", 22);
      \u0275\u0275text(47, "Clasificaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "button", 23);
      \u0275\u0275text(49, " Full table ");
      \u0275\u0275elementStart(50, "mat-icon");
      \u0275\u0275text(51, "arrow_forward");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(52, "ol", 26);
      \u0275\u0275repeaterCreate(53, CupPage_For_54_Template, 11, 4, "li", 27, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(55, "section", 28)(56, "div", 21)(57, "h2", 29);
      \u0275\u0275text(58, "Resultados Recientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "button", 23);
      \u0275\u0275text(60, " All results ");
      \u0275\u0275elementStart(61, "mat-icon");
      \u0275\u0275text(62, "arrow_forward");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(63, "div", 30);
      \u0275\u0275repeaterCreate(64, CupPage_For_65_Template, 22, 7, "article", 31, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(66, "footer", 32);
      \u0275\u0275text(67);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.cupName());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.championshipStatusLabel());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isChampionshipLive() ? 11 : 12);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.tabs);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.championshipStatusLabel());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.cupName());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.championshipDescription());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.summaryStats());
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.liveMatches());
      \u0275\u0275advance(12);
      \u0275\u0275repeater(ctx.upcomingMatches());
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.standings());
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.recentResults());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.footerLabel());
    }
  }, dependencies: [MatIconModule, MatIcon], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.cup-page[_ngcontent-%COMP%] {\n  max-width: 1240px;\n  margin: 0 auto;\n  padding: 1.25rem 1rem 2rem;\n  color: var(--mat-sys-on-surface);\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.75rem;\n}\n.header-title-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 0;\n}\n.header-icon[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  color: #fff;\n  background:\n    linear-gradient(\n      150deg,\n      #3b82f6 0%,\n      #1d4ed8 100%);\n  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);\n  flex-shrink: 0;\n}\n.header-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n  font-size: 1rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(1.05rem, 1.8vw, 1.25rem);\n  font-weight: 700;\n  line-height: 1.25;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.78rem;\n}\n.live-pill[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, #22c55e 18%, white);\n  color: #0f7a31;\n  border: 1px solid color-mix(in srgb, #22c55e 40%, white);\n  border-radius: 999px;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  padding: 0.25rem 0.55rem;\n  flex-shrink: 0;\n}\n.nolive-pill[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, #f87171 18%, white);\n  color: #b91c1c;\n  border: 1px solid color-mix(in srgb, #f87171 40%, white);\n  border-radius: 999px;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  padding: 0.25rem 0.55rem;\n  flex-shrink: 0;\n}\n.tab-nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin-bottom: 1rem;\n  overflow-x: auto;\n  padding-bottom: 0.35rem;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  color: var(--mat-sys-on-surface-variant);\n  border-radius: 0.55rem;\n  padding: 0.45rem 0.65rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.tab-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  width: 0.95rem;\n  height: 0.95rem;\n  font-size: 0.95rem;\n}\n.tab-btn[_ngcontent-%COMP%]:hover {\n  background: color-mix(in srgb, var(--mat-sys-primary) 8%, transparent);\n}\n.tab-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--mat-sys-primary);\n  outline-offset: 2px;\n}\n.tab-btn-active[_ngcontent-%COMP%] {\n  color: #2563eb;\n  background: color-mix(in srgb, #2563eb 14%, white);\n}\n.hero-card[_ngcontent-%COMP%] {\n  margin-bottom: 1.2rem;\n  border-radius: 0.75rem;\n  padding: 1.2rem;\n  color: #fff;\n  background:\n    linear-gradient(\n      140deg,\n      #3178f6 0%,\n      #1d4ed8 100%);\n  box-shadow: 0 8px 22px rgba(37, 99, 235, 0.25);\n  position: relative;\n  overflow: hidden;\n}\n.hero-card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 10rem;\n  height: 10rem;\n  top: -4.5rem;\n  right: -3.5rem;\n  border-radius: 999px;\n  border: 1.5rem solid rgba(255, 255, 255, 0.08);\n  pointer-events: none;\n}\n.hero-status[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-bottom: 0.6rem;\n  border-radius: 999px;\n  padding: 0.16rem 0.6rem;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  background: rgba(255, 255, 255, 0.2);\n  color: #dbeafe;\n  letter-spacing: 0.03em;\n}\n.hero-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(1.45rem, 3vw, 2.05rem);\n  line-height: 1.15;\n}\n.hero-subtitle[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 1rem;\n  color: #dbeafe;\n  font-size: 0.92rem;\n}\n.hero-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 0.65rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  border-radius: 0.65rem;\n  padding: 0.6rem 0.72rem;\n  background: rgba(255, 255, 255, 0.12);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  -webkit-backdrop-filter: blur(1px);\n  backdrop-filter: blur(1px);\n}\n.stat-label-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #bfdbfe;\n  font-size: 0.75rem;\n}\n.stat-label-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  width: 0.8rem;\n  height: 0.8rem;\n  font-size: 0.8rem;\n}\n.stat-label[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.stat-value[_ngcontent-%COMP%] {\n  margin: 0.22rem 0 0;\n  font-size: 1.32rem;\n  line-height: 1;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n}\n.section-block[_ngcontent-%COMP%] {\n  margin-bottom: 1.15rem;\n}\n.section-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.22rem;\n  line-height: 1.2;\n  font-weight: 800;\n}\n.with-dot[_ngcontent-%COMP%]::before {\n  content: "\\2022";\n  color: #ef4444;\n  margin-right: 0.4rem;\n  font-size: 1.2rem;\n  line-height: 1;\n  vertical-align: middle;\n}\n.live-grid[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 0.75rem;\n}\n.match-live-card[_ngcontent-%COMP%], \n.upcoming-card[_ngcontent-%COMP%], \n.result-card[_ngcontent-%COMP%], \n.standing-row[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border: 1px solid var(--mat-sys-outline-variant);\n  border-radius: 0.75rem;\n}\n.match-live-card[_ngcontent-%COMP%] {\n  padding: 0.8rem;\n  border-color: color-mix(in srgb, #ef4444 26%, var(--mat-sys-outline-variant));\n}\n.match-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n}\n.match-live-badge[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  background: #ef4444;\n  color: #fff;\n  font-size: 0.62rem;\n  text-transform: uppercase;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  padding: 0.16rem 0.45rem;\n}\n.match-time[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--mat-sys-on-surface-variant);\n  font-weight: 600;\n}\n.teams-stack[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n}\n.team-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.team-name-wrap[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-width: 0;\n}\n.team-emoji[_ngcontent-%COMP%] {\n  font-size: 1.02rem;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.team-name[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 0.88rem;\n  font-weight: 600;\n}\n.team-score[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  line-height: 1;\n  font-weight: 800;\n}\n.grid-section[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.95rem;\n  align-items: start;\n}\n.section-head-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  margin-bottom: 0.7rem;\n}\n.text-link[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0.15rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.2rem;\n  background: transparent;\n  color: #2563eb;\n  font-size: 0.77rem;\n  font-weight: 700;\n  cursor: pointer;\n}\n.text-link[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  width: 0.9rem;\n  height: 0.9rem;\n  font-size: 0.9rem;\n}\n.text-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--mat-sys-primary);\n  outline-offset: 2px;\n  border-radius: 0.4rem;\n}\n.upcoming-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.58rem;\n}\n.upcoming-card[_ngcontent-%COMP%] {\n  padding: 0.72rem 0.85rem;\n}\n.upcoming-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.7rem;\n  margin-bottom: 0.55rem;\n  font-weight: 600;\n}\n.upcoming-teams[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  font-size: 0.84rem;\n  font-weight: 700;\n  text-align: center;\n}\n.team-inline[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  min-width: 0;\n}\n.vs[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  color: var(--mat-sys-on-surface-variant);\n  font-weight: 700;\n  font-size: 0.72rem;\n}\n.standings-list[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: grid;\n  gap: 0.55rem;\n}\n.standing-row[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: grid;\n  grid-template-columns: auto auto 1fr auto;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 0.75rem;\n}\n.rank-pill[_ngcontent-%COMP%] {\n  width: 1.3rem;\n  height: 1.3rem;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  background: color-mix(in srgb, #f59e0b 35%, white);\n  color: #7c2d12;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\n.standing-team[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-weight: 700;\n  font-size: 0.86rem;\n}\n.standing-points[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-align: right;\n}\n.standing-points[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: 0.2rem;\n}\n.results-grid[_ngcontent-%COMP%] {\n  margin-top: 0.65rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 0.75rem;\n}\n.result-card[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n}\n.result-datetime[_ngcontent-%COMP%] {\n  margin: 0 0 0.6rem;\n  font-size: 0.69rem;\n  color: var(--mat-sys-on-surface-variant);\n  font-weight: 600;\n}\n.match-status[_ngcontent-%COMP%] {\n  margin: 0.55rem 0 0;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.page-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 1.4rem;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.7rem;\n  border-top: 1px solid var(--mat-sys-outline-variant);\n  padding-top: 0.85rem;\n}\n@media (min-width: 920px) {\n  .cup-page[_ngcontent-%COMP%] {\n    padding: 1.4rem 1.5rem 2.25rem;\n  }\n  .grid-section[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 2fr) minmax(250px, 1fr);\n  }\n  .hero-card[_ngcontent-%COMP%] {\n    padding: 1.45rem;\n  }\n}\n/*# sourceMappingURL=cup.page.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CupPage, [{
    type: Component,
    args: [{ selector: "app-cup-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [MatIconModule], template: `
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

        <div class="hero-stats" role="list" aria-label="Resumen de m\xE9tricas del campeonato">
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

      <section class="section-block grid-section" aria-label="Calendario y clasificaci\xF3n">
        <div>
          <div class="section-head-row">
            <h2 class="section-title">Pr\xF3ximos Partidos</h2>
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
            <h2 class="section-title">Clasificaci\xF3n</h2>
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
  `, styles: ['@charset "UTF-8";\n\n/* angular:styles/component:scss;cb9c78aec20c0828682818d9a502c63c8b19931db782e05c94f9bbfd134888c5;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/cup/cup.page.ts */\n:host {\n  display: block;\n}\n.cup-page {\n  max-width: 1240px;\n  margin: 0 auto;\n  padding: 1.25rem 1rem 2rem;\n  color: var(--mat-sys-on-surface);\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.75rem;\n}\n.header-title-wrap {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 0;\n}\n.header-icon {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  color: #fff;\n  background:\n    linear-gradient(\n      150deg,\n      #3b82f6 0%,\n      #1d4ed8 100%);\n  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);\n  flex-shrink: 0;\n}\n.header-icon mat-icon {\n  width: 1rem;\n  height: 1rem;\n  font-size: 1rem;\n}\n.page-title {\n  margin: 0;\n  font-size: clamp(1.05rem, 1.8vw, 1.25rem);\n  font-weight: 700;\n  line-height: 1.25;\n}\n.page-subtitle {\n  margin: 0.1rem 0 0;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.78rem;\n}\n.live-pill {\n  background: color-mix(in srgb, #22c55e 18%, white);\n  color: #0f7a31;\n  border: 1px solid color-mix(in srgb, #22c55e 40%, white);\n  border-radius: 999px;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  padding: 0.25rem 0.55rem;\n  flex-shrink: 0;\n}\n.nolive-pill {\n  background: color-mix(in srgb, #f87171 18%, white);\n  color: #b91c1c;\n  border: 1px solid color-mix(in srgb, #f87171 40%, white);\n  border-radius: 999px;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  padding: 0.25rem 0.55rem;\n  flex-shrink: 0;\n}\n.tab-nav {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin-bottom: 1rem;\n  overflow-x: auto;\n  padding-bottom: 0.35rem;\n}\n.tab-btn {\n  border: 0;\n  background: transparent;\n  color: var(--mat-sys-on-surface-variant);\n  border-radius: 0.55rem;\n  padding: 0.45rem 0.65rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.tab-btn mat-icon {\n  width: 0.95rem;\n  height: 0.95rem;\n  font-size: 0.95rem;\n}\n.tab-btn:hover {\n  background: color-mix(in srgb, var(--mat-sys-primary) 8%, transparent);\n}\n.tab-btn:focus-visible {\n  outline: 2px solid var(--mat-sys-primary);\n  outline-offset: 2px;\n}\n.tab-btn-active {\n  color: #2563eb;\n  background: color-mix(in srgb, #2563eb 14%, white);\n}\n.hero-card {\n  margin-bottom: 1.2rem;\n  border-radius: 0.75rem;\n  padding: 1.2rem;\n  color: #fff;\n  background:\n    linear-gradient(\n      140deg,\n      #3178f6 0%,\n      #1d4ed8 100%);\n  box-shadow: 0 8px 22px rgba(37, 99, 235, 0.25);\n  position: relative;\n  overflow: hidden;\n}\n.hero-card::after {\n  content: "";\n  position: absolute;\n  width: 10rem;\n  height: 10rem;\n  top: -4.5rem;\n  right: -3.5rem;\n  border-radius: 999px;\n  border: 1.5rem solid rgba(255, 255, 255, 0.08);\n  pointer-events: none;\n}\n.hero-status {\n  display: inline-block;\n  margin-bottom: 0.6rem;\n  border-radius: 999px;\n  padding: 0.16rem 0.6rem;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  background: rgba(255, 255, 255, 0.2);\n  color: #dbeafe;\n  letter-spacing: 0.03em;\n}\n.hero-title {\n  margin: 0;\n  font-size: clamp(1.45rem, 3vw, 2.05rem);\n  line-height: 1.15;\n}\n.hero-subtitle {\n  margin: 0.35rem 0 1rem;\n  color: #dbeafe;\n  font-size: 0.92rem;\n}\n.hero-stats {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 0.65rem;\n}\n.stat-card {\n  border-radius: 0.65rem;\n  padding: 0.6rem 0.72rem;\n  background: rgba(255, 255, 255, 0.12);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  -webkit-backdrop-filter: blur(1px);\n  backdrop-filter: blur(1px);\n}\n.stat-label-wrap {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #bfdbfe;\n  font-size: 0.75rem;\n}\n.stat-label-wrap mat-icon {\n  width: 0.8rem;\n  height: 0.8rem;\n  font-size: 0.8rem;\n}\n.stat-label {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.stat-value {\n  margin: 0.22rem 0 0;\n  font-size: 1.32rem;\n  line-height: 1;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n}\n.section-block {\n  margin-bottom: 1.15rem;\n}\n.section-title {\n  margin: 0;\n  font-size: 1.22rem;\n  line-height: 1.2;\n  font-weight: 800;\n}\n.with-dot::before {\n  content: "\\2022";\n  color: #ef4444;\n  margin-right: 0.4rem;\n  font-size: 1.2rem;\n  line-height: 1;\n  vertical-align: middle;\n}\n.live-grid {\n  margin-top: 0.75rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 0.75rem;\n}\n.match-live-card,\n.upcoming-card,\n.result-card,\n.standing-row {\n  background: var(--mat-sys-surface-container);\n  border: 1px solid var(--mat-sys-outline-variant);\n  border-radius: 0.75rem;\n}\n.match-live-card {\n  padding: 0.8rem;\n  border-color: color-mix(in srgb, #ef4444 26%, var(--mat-sys-outline-variant));\n}\n.match-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n}\n.match-live-badge {\n  border-radius: 999px;\n  background: #ef4444;\n  color: #fff;\n  font-size: 0.62rem;\n  text-transform: uppercase;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  padding: 0.16rem 0.45rem;\n}\n.match-time {\n  font-size: 0.72rem;\n  color: var(--mat-sys-on-surface-variant);\n  font-weight: 600;\n}\n.teams-stack {\n  display: grid;\n  gap: 0.5rem;\n}\n.team-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.team-name-wrap {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-width: 0;\n}\n.team-emoji {\n  font-size: 1.02rem;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.team-name {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 0.88rem;\n  font-weight: 600;\n}\n.team-score {\n  font-size: 1.15rem;\n  line-height: 1;\n  font-weight: 800;\n}\n.grid-section {\n  display: grid;\n  gap: 0.95rem;\n  align-items: start;\n}\n.section-head-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  margin-bottom: 0.7rem;\n}\n.text-link {\n  border: 0;\n  padding: 0.15rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.2rem;\n  background: transparent;\n  color: #2563eb;\n  font-size: 0.77rem;\n  font-weight: 700;\n  cursor: pointer;\n}\n.text-link mat-icon {\n  width: 0.9rem;\n  height: 0.9rem;\n  font-size: 0.9rem;\n}\n.text-link:focus-visible {\n  outline: 2px solid var(--mat-sys-primary);\n  outline-offset: 2px;\n  border-radius: 0.4rem;\n}\n.upcoming-list {\n  display: grid;\n  gap: 0.58rem;\n}\n.upcoming-card {\n  padding: 0.72rem 0.85rem;\n}\n.upcoming-meta {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.7rem;\n  margin-bottom: 0.55rem;\n  font-weight: 600;\n}\n.upcoming-teams {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  font-size: 0.84rem;\n  font-weight: 700;\n  text-align: center;\n}\n.team-inline {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  min-width: 0;\n}\n.vs {\n  text-transform: uppercase;\n  color: var(--mat-sys-on-surface-variant);\n  font-weight: 700;\n  font-size: 0.72rem;\n}\n.standings-list {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: grid;\n  gap: 0.55rem;\n}\n.standing-row {\n  min-width: 0;\n  display: grid;\n  grid-template-columns: auto auto 1fr auto;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 0.75rem;\n}\n.rank-pill {\n  width: 1.3rem;\n  height: 1.3rem;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  background: color-mix(in srgb, #f59e0b 35%, white);\n  color: #7c2d12;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\n.standing-team {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-weight: 700;\n  font-size: 0.86rem;\n}\n.standing-points {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-align: right;\n}\n.standing-points small {\n  margin-left: 0.2rem;\n}\n.results-grid {\n  margin-top: 0.65rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 0.75rem;\n}\n.result-card {\n  padding: 0.75rem;\n}\n.result-datetime {\n  margin: 0 0 0.6rem;\n  font-size: 0.69rem;\n  color: var(--mat-sys-on-surface-variant);\n  font-weight: 600;\n}\n.match-status {\n  margin: 0.55rem 0 0;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.page-footer {\n  text-align: center;\n  margin-top: 1.4rem;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.7rem;\n  border-top: 1px solid var(--mat-sys-outline-variant);\n  padding-top: 0.85rem;\n}\n@media (min-width: 920px) {\n  .cup-page {\n    padding: 1.4rem 1.5rem 2.25rem;\n  }\n  .grid-section {\n    grid-template-columns: minmax(0, 2fr) minmax(250px, 1fr);\n  }\n  .hero-card {\n    padding: 1.45rem;\n  }\n}\n/*# sourceMappingURL=cup.page.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CupPage, { className: "CupPage", filePath: "src/app/features/cup/cup.page.ts", lineNumber: 775 });
})();
export {
  CupPage as default
};
//# sourceMappingURL=chunk-LFLBAP2M.js.map
