import {
  MatchService
} from "./chunk-XZHYPPCH.js";
import {
  ChampionshipService
} from "./chunk-BQKVUEWM.js";
import {
  TeamService
} from "./chunk-CUFOQHZL.js";
import {
  PlayerService
} from "./chunk-K4K2REQ2.js";
import {
  MatCardModule
} from "./chunk-NC7IRF23.js";
import {
  AuthService
} from "./chunk-CTYH5NZ2.js";
import "./chunk-I4DDBC3P.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-N73HKLCH.js";
import "./chunk-DRU5KYA4.js";
import "./chunk-7MBHIBBN.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-KLQVA5RB.js";
import "./chunk-UVODHWP6.js";
import "./chunk-VMJIIGHX.js";
import "./chunk-2C543PJY.js";
import "./chunk-DNCNJ5D2.js";
import {
  Router,
  RouterLink
} from "./chunk-XIJO5SZ4.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-TWF5BIFR.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-2QF6PXYN.js";
import {
  ChangeDetectionStrategy,
  Component,
  Subscription,
  effect,
  forkJoin,
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
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/admin/pages/dashboard/dashboard.page.ts
var _c0 = (a0) => ["/match", a0];
var _c1 = (a0) => ["/admin/match", a0, "control"];
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.id;
function DashboardPage_For_14_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const stat_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("positive", stat_r1.change > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.change > 0 ? "trending_up" : "trending_down");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", stat_r1.change > 0 ? "+" : "", "", stat_r1.change, "%");
  }
}
function DashboardPage_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8)(1, "div", 27)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 28)(5, "span", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 30);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, DashboardPage_For_14_Conditional_9_Template, 5, 5, "div", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", stat_r1.route);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r1.getIconBg(stat_r1.icon));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stat_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(stat_r1.change !== void 0 ? 9 : -1);
  }
}
function DashboardPage_For_60_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 41)(1, "mat-icon");
    \u0275\u0275text(2, "sports");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Controlar Partido");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const match_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c1, match_r3.id));
  }
}
function DashboardPage_For_60_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "mat-divider");
    \u0275\u0275elementStart(1, "button", 42);
    \u0275\u0275listener("click", function DashboardPage_For_60_Conditional_27_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const match_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteMatch(match_r3.id));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Eliminar");
    \u0275\u0275elementEnd()();
  }
}
function DashboardPage_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 33)(2, "mat-icon");
    \u0275\u0275text(3, "sports_soccer");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 34)(5, "span", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 36);
    \u0275\u0275text(8, "vs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 35);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 37)(12, "span", 38);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 39);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 40)(17, "mat-icon");
    \u0275\u0275text(18, "more_vert");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-menu", null, 0);
    \u0275\u0275conditionalCreate(21, DashboardPage_For_60_Conditional_21_Template, 5, 3, "button", 41);
    \u0275\u0275elementStart(22, "button", 41)(23, "mat-icon");
    \u0275\u0275text(24, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "Ver Detalles");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, DashboardPage_For_60_Conditional_27_Template, 6, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const match_r3 = ctx.$implicit;
    const matchMenu_r5 = \u0275\u0275reference(20);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(match_r3.homeTeam);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(match_r3.awayTeam);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(match_r3.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r3.time);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", matchMenu_r5);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(match_r3.status === "scheduled" || match_r3.status === "live" ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c0, match_r3.id));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(match_r3.status === "scheduled" ? 27 : -1);
  }
}
function DashboardPage_ForEmpty_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "mat-icon");
    \u0275\u0275text(2, "event_busy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay partidos programados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 43);
    \u0275\u0275text(6, "Crear Fixture");
    \u0275\u0275elementEnd()();
  }
}
function DashboardPage_For_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 44)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 45)(5, "p", 46);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 47);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const activity_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", activity_r6.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(activity_r6.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(activity_r6.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(activity_r6.time);
  }
}
var DashboardPage = class _DashboardPage {
  authService = inject(AuthService);
  championshipService = inject(ChampionshipService);
  teamService = inject(TeamService);
  matchService = inject(MatchService);
  playerService = inject(PlayerService);
  router = inject(Router);
  stats = signal([], __spreadValues({}, ngDevMode ? { debugName: "stats" } : {}));
  upcomingMatches = signal([], __spreadValues({}, ngDevMode ? { debugName: "upcomingMatches" } : {}));
  recentActivity = signal([], __spreadValues({}, ngDevMode ? { debugName: "recentActivity" } : {}));
  allTeams = signal([], __spreadValues({}, ngDevMode ? { debugName: "allTeams" } : {}));
  allChampionships = signal([], __spreadValues({}, ngDevMode ? { debugName: "allChampionships" } : {}));
  allMatches = signal([], __spreadValues({}, ngDevMode ? { debugName: "allMatches" } : {}));
  reloadSub;
  constructor() {
    effect((onCleanup) => {
      const user = this.authService.currentUser();
      if (user?.organizationId) {
        const sub = this.loadDashboardData(String(user.organizationId));
        onCleanup(() => {
          sub.unsubscribe();
          this.reloadSub?.unsubscribe();
          this.reloadSub = void 0;
        });
      }
    });
  }
  loadDashboardData(organizationId) {
    const composite = new Subscription();
    const orgId = Number(organizationId);
    const outerSub = forkJoin({
      championships: this.championshipService.getAll({ organizationId: orgId }),
      teams: this.teamService.getTeamsByOrganization(organizationId),
      players: this.playerService.getPlayersByOrganization(organizationId)
    }).subscribe({
      next: ({ championships, teams, players }) => {
        this.allChampionships.set(championships.data);
        this.allTeams.set(teams);
        this.stats.set([
          {
            icon: "emoji_events",
            label: "Campeonatos",
            value: championships.total,
            route: "/admin/championships"
          },
          { icon: "groups", label: "Equipos", value: teams.length, route: "/admin/teams" },
          { icon: "person", label: "Jugadores", value: players.length, route: "/admin/players" },
          { icon: "sports", label: "Partidos", value: 0, route: "/admin/matches" }
        ]);
        if (championships.data.length > 0) {
          const matchObservables = championships.data.map((champ) => this.matchService.getMatches(champ.id.toString()));
          const innerSub = forkJoin(matchObservables).subscribe({
            next: (matchResults) => {
              const allMatches = matchResults.flat();
              this.allMatches.set(allMatches);
              this.stats.update((stats) => {
                const newStats = [...stats];
                newStats[3].value = allMatches.length;
                return newStats;
              });
              const upcoming = allMatches.filter((m) => m.status === "scheduled").slice(0, 5).map((m) => {
                const homeTeam = teams.find((t) => t.id.toString() === m.homeTeamId);
                const awayTeam = teams.find((t) => t.id.toString() === m.awayTeamId);
                return {
                  id: String(m.id),
                  homeTeam: homeTeam?.name || "Equipo Desconocido",
                  awayTeam: awayTeam?.name || "Equipo Desconocido",
                  date: this.formatDate(m.scheduledStart),
                  time: m.scheduledStart?.toLocaleTimeString("es-EC") || "00:00",
                  venue: m.venue || "",
                  status: m.status
                };
              });
              this.upcomingMatches.set(upcoming);
              const recent = allMatches.filter((m) => m.status === "finished").slice(0, 5).map((m, index) => {
                const homeTeam = teams.find((t) => t.id.toString() === m.homeTeamId);
                const awayTeam = teams.find((t) => t.id.toString() === m.awayTeamId);
                return {
                  id: String(m.id),
                  icon: "sports_soccer",
                  text: `${homeTeam?.name || "Equipo"} ${m.homeScore}-${m.awayScore} ${awayTeam?.name || "Equipo"} (Finalizado)`,
                  time: index === 0 ? "Hace 2 horas" : index === 1 ? "Hace 5 horas" : `Hace ${index + 1} d\xEDas`,
                  color: "#22c55e"
                };
              });
              this.recentActivity.set(recent);
            },
            error: (error) => {
              console.error("Error loading matches", error);
            }
          });
          composite.add(innerSub);
        }
      },
      error: (error) => {
        console.error("Error loading dashboard data", error);
      }
    });
    composite.add(outerSub);
    return composite;
  }
  deleteMatch(matchId) {
    if (confirm("\xBFEst\xE1s seguro de que deseas eliminar este partido?")) {
      this.matchService.deleteMatch(matchId).subscribe({
        next: () => {
          const user = this.authService.currentUser();
          if (user?.organizationId) {
            this.reloadSub?.unsubscribe();
            this.reloadSub = this.loadDashboardData(String(user.organizationId));
          }
        },
        error: (error) => {
          console.error("Error deleting match", error);
          alert("Error al eliminar el partido");
        }
      });
    }
  }
  formatDate(date) {
    if (!date)
      return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("es-EC", { day: "numeric", month: "short" });
  }
  getIconBg(icon) {
    const colors = {
      emoji_events: "#f59e0b",
      groups: "#3b82f6",
      person: "#22c55e",
      sports: "#ef4444"
    };
    return colors[icon] || "#6b7280";
  }
  static \u0275fac = function DashboardPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardPage, selectors: [["app-admin-dashboard"]], decls: 69, vars: 2, consts: [["matchMenu", "matMenu"], [1, "dashboard-container"], [1, "dashboard-header"], [1, "title"], [1, "subtitle"], [1, "header-actions"], ["matButton", "filled", "routerLink", "/admin/matches/new"], [1, "stats-grid"], [1, "stat-card", 3, "routerLink"], [1, "section"], [1, "section-title", "pb-5"], [1, "quick-actions"], ["routerLink", "/admin/championships/new", 1, "action-card"], ["routerLink", "/admin/teams/new", 1, "action-card"], ["routerLink", "/admin/players/new", 1, "action-card"], ["routerLink", "/admin/fixtures/generate", 1, "action-card"], ["routerLink", "/admin/matches", 1, "action-card"], ["routerLink", "/admin/standings", 1, "action-card"], [1, "two-columns"], [1, "section-header"], [1, "section-title"], ["matButton", "", "routerLink", "/admin/matches", 1, "view-all"], [1, "matches-list"], [1, "match-card"], [1, "empty-state"], [1, "activity-list"], [1, "activity-item"], [1, "stat-icon"], [1, "stat-content"], [1, "stat-value"], [1, "stat-label"], [1, "stat-change", 3, "positive"], [1, "stat-change"], [1, "match-sport"], [1, "match-teams"], [1, "team-name"], [1, "vs"], [1, "match-info"], [1, "match-date"], [1, "match-time"], ["matIconButton", "", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "routerLink"], ["mat-menu-item", "", 1, "text-red-500", 3, "click"], ["matButton", "outlined", "routerLink", "/admin/fixtures"], [1, "activity-icon"], [1, "activity-content"], [1, "activity-text"], [1, "activity-time"]], template: function DashboardPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "div")(3, "h1", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Panel de administraci\xF3n de tu organizaci\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "button", 6)(9, "mat-icon");
      \u0275\u0275text(10, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Nuevo Partido ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "section", 7);
      \u0275\u0275repeaterCreate(13, DashboardPage_For_14_Template, 10, 7, "a", 8, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "section", 9)(16, "h2", 10);
      \u0275\u0275text(17, "Acciones R\xE1pidas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 11)(19, "a", 12)(20, "mat-icon");
      \u0275\u0275text(21, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span");
      \u0275\u0275text(23, "Nuevo Campeonato");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "a", 13)(25, "mat-icon");
      \u0275\u0275text(26, "group_add");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "span");
      \u0275\u0275text(28, "Agregar Equipo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "a", 14)(30, "mat-icon");
      \u0275\u0275text(31, "person_add");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "span");
      \u0275\u0275text(33, "Agregar Jugador");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "a", 15)(35, "mat-icon");
      \u0275\u0275text(36, "calendar_month");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span");
      \u0275\u0275text(38, "Generar Fixture");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "a", 16)(40, "mat-icon");
      \u0275\u0275text(41, "sports");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "span");
      \u0275\u0275text(43, "Control Partido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "a", 17)(45, "mat-icon");
      \u0275\u0275text(46, "leaderboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "span");
      \u0275\u0275text(48, "Ver Tabla");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(49, "div", 18)(50, "section", 9)(51, "div", 19)(52, "h2", 20);
      \u0275\u0275text(53, "Pr\xF3ximos Partidos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "a", 21);
      \u0275\u0275text(55, " Ver todos ");
      \u0275\u0275elementStart(56, "mat-icon");
      \u0275\u0275text(57, "arrow_forward");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(58, "div", 22);
      \u0275\u0275repeaterCreate(59, DashboardPage_For_60_Template, 28, 10, "div", 23, _forTrack1, false, DashboardPage_ForEmpty_61_Template, 7, 0, "div", 24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "section", 9)(63, "div", 19)(64, "h2", 20);
      \u0275\u0275text(65, "Actividad Reciente");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(66, "div", 25);
      \u0275\u0275repeaterCreate(67, DashboardPage_For_68_Template, 9, 5, "div", 26, _forTrack1);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Bienvenido, ", ctx.authService.userFullName());
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.stats());
      \u0275\u0275advance(46);
      \u0275\u0275repeater(ctx.upcomingMatches());
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.recentActivity());
    }
  }, dependencies: [
    RouterLink,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatCardModule,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDividerModule,
    MatDivider
  ], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 2rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  text-decoration: none;\n  color: inherit;\n  transition: transform 0.2s, box-shadow 0.2s;\n  overflow: hidden;\n  min-width: 0;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n@media (min-width: 640px) {\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n    gap: 1rem;\n  }\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  flex-shrink: 0;\n}\n.stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n@media (min-width: 640px) {\n  .stat-icon[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n    border-radius: 12px;\n  }\n  .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 24px;\n    width: 24px;\n    height: 24px;\n  }\n}\n.stat-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  line-height: 1.2;\n}\n@media (min-width: 640px) {\n  .stat-value[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (min-width: 640px) {\n  .stat-label[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n}\n.stat-change[_ngcontent-%COMP%] {\n  display: none;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.7rem;\n  color: #ef4444;\n  flex-shrink: 0;\n  padding: 0.2rem 0.4rem;\n  border-radius: 4px;\n  background: rgba(239, 68, 68, 0.1);\n}\n.stat-change.positive[_ngcontent-%COMP%] {\n  color: #22c55e;\n  background: rgba(34, 197, 94, 0.1);\n}\n.stat-change[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n@media (min-width: 480px) {\n  .stat-change[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n@media (min-width: 640px) {\n  .stat-change[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.25rem 0.5rem;\n  }\n  .stat-change[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n    width: 16px;\n    height: 16px;\n  }\n}\n.section[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1.25rem;\n  margin-bottom: 1.5rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0;\n}\n.view-all[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.875rem;\n}\n.view-all[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.quick-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 1rem;\n}\n.action-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1.5rem;\n  background: var(--mat-sys-surface-container-high);\n  border-radius: 12px;\n  text-decoration: none;\n  color: inherit;\n  transition: transform 0.2s, background-color 0.2s;\n}\n.action-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  background: var(--mat-sys-surface-container-highest);\n}\n.action-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: var(--mat-sys-primary);\n}\n.action-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  text-align: center;\n}\n.two-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  gap: 1.5rem;\n}\n@media (max-width: 900px) {\n  .two-columns[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.matches-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.match-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n  background: var(--mat-sys-surface-container-high);\n  border-radius: 8px;\n}\n.match-sport[_ngcontent-%COMP%] {\n  color: var(--mat-sys-primary);\n}\n.match-teams[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n}\n.team-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.vs[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.75rem;\n}\n.match-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  font-size: 0.75rem;\n}\n.match-date[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n}\n.match-time[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  opacity: 0.5;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 1rem;\n}\n.activity-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.activity-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n}\n.activity-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.activity-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.activity-text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.activity-time[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n/*# sourceMappingURL=dashboard.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardPage, [{
    type: Component,
    args: [{ selector: "app-admin-dashboard", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      RouterLink,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatMenuModule,
      MatDividerModule
    ], template: `
    <div class="dashboard-container">
      <!-- Header -->
      <header class="dashboard-header">
        <div>
          <h1 class="title">Bienvenido, {{ authService.userFullName() }}</h1>
          <p class="subtitle">Panel de administraci\xF3n de tu organizaci\xF3n</p>
        </div>
        <div class="header-actions">
          <button matButton="filled" routerLink="/admin/matches/new">
            <mat-icon>add</mat-icon>
            Nuevo Partido
          </button>
        </div>
      </header>

      <!-- Stats Cards -->
      <section class="stats-grid">
        @for (stat of stats(); track stat.label) {
          <a [routerLink]="stat.route" class="stat-card">
            <div class="stat-icon" [style.background]="getIconBg(stat.icon)">
              <mat-icon>{{ stat.icon }}</mat-icon>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
            @if (stat.change !== undefined) {
              <div class="stat-change" [class.positive]="stat.change > 0">
                <mat-icon>{{ stat.change > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                <span>{{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%</span>
              </div>
            }
          </a>
        }
      </section>

      <!-- Quick Actions -->
      <section class="section">
        <h2 class="section-title pb-5">Acciones R\xE1pidas</h2>
        <div class="quick-actions">
          <a routerLink="/admin/championships/new" class="action-card">
            <mat-icon>add_circle</mat-icon>
            <span>Nuevo Campeonato</span>
          </a>
          <a routerLink="/admin/teams/new" class="action-card">
            <mat-icon>group_add</mat-icon>
            <span>Agregar Equipo</span>
          </a>
          <a routerLink="/admin/players/new" class="action-card">
            <mat-icon>person_add</mat-icon>
            <span>Agregar Jugador</span>
          </a>
          <a routerLink="/admin/fixtures/generate" class="action-card">
            <mat-icon>calendar_month</mat-icon>
            <span>Generar Fixture</span>
          </a>
          <a routerLink="/admin/matches" class="action-card">
            <mat-icon>sports</mat-icon>
            <span>Control Partido</span>
          </a>
          <a routerLink="/admin/standings" class="action-card">
            <mat-icon>leaderboard</mat-icon>
            <span>Ver Tabla</span>
          </a>
        </div>
      </section>

      <div class="two-columns">
        <!-- Upcoming Matches -->
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">Pr\xF3ximos Partidos</h2>
            <a matButton routerLink="/admin/matches" class="view-all">
              Ver todos
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </div>

          <div class="matches-list">
            @for (match of upcomingMatches(); track match.id) {
              <div class="match-card">
                <div class="match-sport">
                  <mat-icon>sports_soccer</mat-icon>
                </div>
                <div class="match-teams">
                  <span class="team-name">{{ match.homeTeam }}</span>
                  <span class="vs">vs</span>
                  <span class="team-name">{{ match.awayTeam }}</span>
                </div>
                <div class="match-info">
                  <span class="match-date">{{ match.date }}</span>
                  <span class="match-time">{{ match.time }}</span>
                </div>
                <button matIconButton [matMenuTriggerFor]="matchMenu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #matchMenu="matMenu">
                  @if (match.status === 'scheduled' || match.status === 'live') {
                    <button mat-menu-item [routerLink]="['/admin/match', match.id, 'control']">
                      <mat-icon>sports</mat-icon>
                      <span>Controlar Partido</span>
                    </button>
                  }
                  <button mat-menu-item [routerLink]="['/match', match.id]">
                    <mat-icon>visibility</mat-icon>
                    <span>Ver Detalles</span>
                  </button>
                  @if (match.status === 'scheduled') {
                    <mat-divider />
                    <button mat-menu-item class="text-red-500" (click)="deleteMatch(match.id)">
                      <mat-icon>delete</mat-icon>
                      <span>Eliminar</span>
                    </button>
                  }
                </mat-menu>
              </div>
            } @empty {
              <div class="empty-state">
                <mat-icon>event_busy</mat-icon>
                <p>No hay partidos programados</p>
                <button matButton="outlined" routerLink="/admin/fixtures">Crear Fixture</button>
              </div>
            }
          </div>
        </section>

        <!-- Recent Activity -->
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">Actividad Reciente</h2>
          </div>

          <div class="activity-list">
            @for (activity of recentActivity(); track activity.id) {
              <div class="activity-item">
                <div class="activity-icon" [style.background]="activity.color">
                  <mat-icon>{{ activity.icon }}</mat-icon>
                </div>
                <div class="activity-content">
                  <p class="activity-text">{{ activity.text }}</p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;ff12115859d222dd566e5284e2233d83e98cdf9035c048095a8bc4da6109f8ba;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/admin/pages/dashboard/dashboard.page.ts */\n.dashboard-container {\n  padding: 1.5rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.dashboard-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 2rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.title {\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0;\n}\n.subtitle {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.stat-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  text-decoration: none;\n  color: inherit;\n  transition: transform 0.2s, box-shadow 0.2s;\n  overflow: hidden;\n  min-width: 0;\n}\n.stat-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n@media (min-width: 640px) {\n  .stat-card {\n    padding: 1.25rem;\n    gap: 1rem;\n  }\n}\n.stat-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  flex-shrink: 0;\n}\n.stat-icon mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n@media (min-width: 640px) {\n  .stat-icon {\n    width: 48px;\n    height: 48px;\n    border-radius: 12px;\n  }\n  .stat-icon mat-icon {\n    font-size: 24px;\n    width: 24px;\n    height: 24px;\n  }\n}\n.stat-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.stat-value {\n  font-size: 1.25rem;\n  font-weight: 700;\n  line-height: 1.2;\n}\n@media (min-width: 640px) {\n  .stat-value {\n    font-size: 1.5rem;\n  }\n}\n.stat-label {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (min-width: 640px) {\n  .stat-label {\n    font-size: 0.875rem;\n  }\n}\n.stat-change {\n  display: none;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.7rem;\n  color: #ef4444;\n  flex-shrink: 0;\n  padding: 0.2rem 0.4rem;\n  border-radius: 4px;\n  background: rgba(239, 68, 68, 0.1);\n}\n.stat-change.positive {\n  color: #22c55e;\n  background: rgba(34, 197, 94, 0.1);\n}\n.stat-change mat-icon {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n@media (min-width: 480px) {\n  .stat-change {\n    display: flex;\n  }\n}\n@media (min-width: 640px) {\n  .stat-change {\n    font-size: 0.75rem;\n    padding: 0.25rem 0.5rem;\n  }\n  .stat-change mat-icon {\n    font-size: 16px;\n    width: 16px;\n    height: 16px;\n  }\n}\n.section {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1.25rem;\n  margin-bottom: 1.5rem;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.section-title {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0;\n}\n.view-all {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.875rem;\n}\n.view-all mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.quick-actions {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 1rem;\n}\n.action-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1.5rem;\n  background: var(--mat-sys-surface-container-high);\n  border-radius: 12px;\n  text-decoration: none;\n  color: inherit;\n  transition: transform 0.2s, background-color 0.2s;\n}\n.action-card:hover {\n  transform: translateY(-2px);\n  background: var(--mat-sys-surface-container-highest);\n}\n.action-card mat-icon {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: var(--mat-sys-primary);\n}\n.action-card span {\n  font-size: 0.875rem;\n  font-weight: 500;\n  text-align: center;\n}\n.two-columns {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  gap: 1.5rem;\n}\n@media (max-width: 900px) {\n  .two-columns {\n    grid-template-columns: 1fr;\n  }\n}\n.matches-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.match-card {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n  background: var(--mat-sys-surface-container-high);\n  border-radius: 8px;\n}\n.match-sport {\n  color: var(--mat-sys-primary);\n}\n.match-teams {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n}\n.team-name {\n  font-weight: 500;\n}\n.vs {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.75rem;\n}\n.match-info {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  font-size: 0.75rem;\n}\n.match-date {\n  color: var(--mat-sys-on-surface-variant);\n}\n.match-time {\n  font-weight: 600;\n}\n.empty-state {\n  text-align: center;\n  padding: 2rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.empty-state mat-icon {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  opacity: 0.5;\n}\n.empty-state p {\n  margin: 0.5rem 0 1rem;\n}\n.activity-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.activity-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.activity-icon {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n}\n.activity-icon mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.activity-content {\n  flex: 1;\n}\n.activity-text {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.activity-time {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n/*# sourceMappingURL=dashboard.page.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardPage, { className: "DashboardPage", filePath: "src/app/features/admin/pages/dashboard/dashboard.page.ts", lineNumber: 553 });
})();
export {
  DashboardPage as default
};
//# sourceMappingURL=chunk-EO7LEE5H.js.map
