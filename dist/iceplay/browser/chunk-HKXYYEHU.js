import {
  PlayerStatus
} from "./chunk-BHAGPFM3.js";
import {
  AvatarComponent
} from "./chunk-O42ALIVU.js";
import "./chunk-BM64NF7H.js";
import {
  PlayerService
} from "./chunk-K4K2REQ2.js";
import "./chunk-RSSJKDFU.js";
import "./chunk-I4DDBC3P.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-XFI35W56.js";
import {
  MatMenuModule
} from "./chunk-N73HKLCH.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-YXKCRHVH.js";
import "./chunk-Y2WVIPA7.js";
import "./chunk-PT2DXUCN.js";
import "./chunk-PEDZOI7R.js";
import "./chunk-5LOHSV5W.js";
import "./chunk-7MBHIBBN.js";
import "./chunk-UVODHWP6.js";
import "./chunk-VMJIIGHX.js";
import "./chunk-A4ZOVHWZ.js";
import "./chunk-2C543PJY.js";
import {
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-ZXHHQFWT.js";
import "./chunk-DNCNJ5D2.js";
import "./chunk-BTLIOYON.js";
import {
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
  Input,
  effect,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/user/page/player-detail.page.ts
var _forTrack0 = ($index, $item) => $item.label;
function PlayerDetailPage_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "p", 6);
    \u0275\u0275text(2, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function PlayerDetailPage_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 10);
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", p_r1.photoUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r1.playerFullName(p_r1) + " Photo");
  }
}
function PlayerDetailPage_Conditional_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ui-avatar", 11);
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("name", ctx_r1.playerFullName(p_r1));
  }
}
function PlayerDetailPage_Conditional_9_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 18)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 19)(5, "span", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const stat_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stat_r3.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stat_r3.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r3.label);
  }
}
function PlayerDetailPage_Conditional_9_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "p", 6);
    \u0275\u0275text(2, "Cargando partidos...");
    \u0275\u0275elementEnd()();
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, "Campeonato");
    \u0275\u0275elementEnd();
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r4.championshipId);
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, "Partido");
    \u0275\u0275elementEnd();
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r5.homeScore);
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_6_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r5.awayScore);
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "div", 36)(2, "div", 37)(3, "span", 38);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_6_Conditional_5_Template, 2, 1, "span", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 40);
    \u0275\u0275text(7, "vs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 37);
    \u0275\u0275conditionalCreate(9, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_6_Conditional_9_Template, 2, 1, "span", 39);
    \u0275\u0275elementStart(10, "span", 38);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const match_r5 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(match_r5.homeTeam.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(match_r5.status === "live" || match_r5.status === "finished" ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(match_r5.status === "live" || match_r5.status === "finished" ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r5.awayTeam.name);
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, "Fecha y Hora");
    \u0275\u0275elementEnd();
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "div", 41)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 42);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const match_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(match_r6.scheduledDate));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r6.scheduledTime);
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, "Lugar");
    \u0275\u0275elementEnd();
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r7.venue || "N/A");
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const match_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classMap("status-" + match_r8.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(match_r8.status), " ");
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 34);
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "button", 43)(2, "mat-icon");
    \u0275\u0275text(3, "info");
    \u0275\u0275elementEnd()()();
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 44);
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 45);
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 22);
    \u0275\u0275elementContainerStart(1, 24);
    \u0275\u0275template(2, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_2_Template, 2, 0, "th", 25)(3, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_3_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 27);
    \u0275\u0275template(5, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_5_Template, 2, 0, "th", 25)(6, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_6_Template, 12, 4, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 28);
    \u0275\u0275template(8, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_8_Template, 2, 0, "th", 25)(9, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_9_Template, 6, 2, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 29);
    \u0275\u0275template(11, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_11_Template, 2, 0, "th", 25)(12, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_12_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 30);
    \u0275\u0275template(14, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_14_Template, 2, 0, "th", 25)(15, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_15_Template, 3, 3, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 31);
    \u0275\u0275template(17, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_th_17_Template, 1, 0, "th", 25)(18, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_td_18_Template, 4, 0, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(19, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_tr_19_Template, 1, 0, "tr", 32)(20, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_tr_20_Template, 1, 0, "tr", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("dataSource", ctx_r1.matches());
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumnsMatches);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumnsMatches);
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "mat-icon");
    \u0275\u0275text(2, "sports_soccer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay partidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "No se encontraron partidos con los filtros seleccionados");
    \u0275\u0275elementEnd()();
  }
}
function PlayerDetailPage_Conditional_9_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275conditionalCreate(1, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_1_Template, 21, 3, "table", 22)(2, PlayerDetailPage_Conditional_9_Conditional_14_Conditional_2_Template, 7, 0, "div", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.matches().length > 0 ? 1 : 2);
  }
}
function PlayerDetailPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "div", 9);
    \u0275\u0275conditionalCreate(3, PlayerDetailPage_Conditional_9_Conditional_3_Template, 1, 2, "img", 10)(4, PlayerDetailPage_Conditional_9_Conditional_4_Template, 1, 1, "ui-avatar", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 12)(6, "h2", 13);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(8, "section", 14);
    \u0275\u0275repeaterCreate(9, PlayerDetailPage_Conditional_9_For_10_Template, 9, 3, "div", 15, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-tab-group")(12, "mat-tab", 16);
    \u0275\u0275conditionalCreate(13, PlayerDetailPage_Conditional_9_Conditional_13_Template, 3, 0, "div", 5)(14, PlayerDetailPage_Conditional_9_Conditional_14_Template, 3, 1, "div", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(p_r1.photoUrl ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.playerFullName(p_r1));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.stats());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.isLoading() ? 13 : 14);
  }
}
function PlayerDetailPage_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "p", 6);
    \u0275\u0275text(2, "Jugador no encontrado");
    \u0275\u0275elementEnd()();
  }
}
var PlayerDetailPage = class _PlayerDetailPage {
  id = input.required(__spreadValues({}, ngDevMode ? { debugName: "id" } : {}));
  isLoading = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isLoading" } : {}));
  player = signal(null, __spreadValues({}, ngDevMode ? { debugName: "player" } : {}));
  playerService = inject(PlayerService);
  matches = signal([], __spreadValues({}, ngDevMode ? { debugName: "matches" } : {}));
  displayedColumns = ["number", "name", "position", "status", "actions"];
  displayedColumnsMatches = ["championship", "teams", "date", "venue", "status", "actions"];
  stats = signal([
    {
      value: 10,
      label: "Goles",
      icon: "sports_soccer"
    },
    {
      value: 4,
      label: "Asistencias",
      icon: "sync_alt"
    },
    {
      value: 7,
      label: "Tarjetas",
      icon: "square"
    }
  ], __spreadValues({}, ngDevMode ? { debugName: "stats" } : {}));
  constructor() {
    effect(() => {
      this.loadPlayer(this.id());
      this.loadMatches(this.id());
    });
  }
  loadPlayer(id) {
    this.isLoading.set(true);
    setTimeout(() => {
      const player = {
        id: "1",
        teamId: "1",
        positionId: 1,
        photoUrl: null,
        firstName: "John",
        lastName: "Doe",
        nickName: null,
        birthDate: /* @__PURE__ */ new Date("1995-06-15"),
        number: 1,
        height: null,
        weight: null,
        status: PlayerStatus.Active,
        suspensionEndDate: null,
        suspensionReason: null,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
      this.player.set(player);
      this.isLoading.set(false);
    }, 2e3);
  }
  loadMatches(id) {
    this.isLoading.set(true);
    const mockMatches = [
      {
        id: "match-1",
        championshipId: "champ-1",
        homeTeam: { name: "Team 1" },
        awayTeam: { name: "Team 2" },
        homeScore: 2,
        awayScore: 1,
        status: "finished",
        scheduledDate: /* @__PURE__ */ new Date("2024-08-01"),
        scheduledTime: "18:00",
        venue: "Estadio Monumental"
      },
      {
        id: "match-2",
        championshipId: "champ-1",
        homeTeam: { name: "Team 1" },
        awayTeam: { name: "Team 3" },
        homeScore: 1,
        awayScore: 3,
        status: "finished",
        scheduledDate: /* @__PURE__ */ new Date("2024-08-02"),
        scheduledTime: "20:00",
        venue: "Estadio Capwell"
      },
      {
        id: "match-3",
        championshipId: "champ-1",
        homeTeam: { name: "Team 1" },
        awayTeam: { name: "Team 3" },
        homeScore: 1,
        awayScore: 3,
        status: "finished",
        scheduledDate: /* @__PURE__ */ new Date("2024-08-03"),
        scheduledTime: "20:00",
        venue: "Estadio Capwell"
      }
    ];
    setTimeout(() => {
      this.matches.set(mockMatches);
      this.isLoading.set(false);
    }, 2e3);
  }
  playerFullName(p) {
    return `${p.firstName} ${p.lastName}`.trim();
  }
  getStatusLabel(status) {
    const labels = {
      active: "Activo",
      injured: "Lesionado",
      suspended: "Suspendido",
      inactive: "Inactivo",
      scheduled: "Programado",
      live: "En vivo",
      finished: "Finalizado",
      warmup: "Calentamiento",
      halftime: "Descanso",
      cancelled: "Cancelado",
      postponed: "Aplazado"
    };
    return labels[status] || status;
  }
  formatDate(date) {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
  static \u0275fac = function PlayerDetailPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlayerDetailPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlayerDetailPage, selectors: [["app-player-detail"]], inputs: { id: [1, "id"] }, decls: 11, vars: 1, consts: [[1, "page-container"], [1, "page-header"], [1, "flex", "items-center", "gap-3"], ["matIconButton", "", "routerLink", "/matches"], [1, "page-title"], [1, "content-card"], [1, "text-secondary", "py-8", "text-center"], [1, "team-header-card", "flex", "flex-col", "items-center", "justify-center"], [1, "team-header-content", "flex", "flex-col", "items-center", "justify-center"], [1, "team-logo"], [3, "src", "alt"], ["size", "xl", 3, "name"], [1, "player-info"], [1, "player-name", "text-primary"], [1, "stats-grid"], [1, "stat-card", "rounded-md", "bg-gray-200", "p-2"], ["label", "Partidos"], [1, "tab-content"], [1, "stat-icon"], [1, "stat-content"], [1, "stat-value"], [1, "stat-label"], ["mat-table", "", 1, "w-full", 3, "dataSource"], [1, "empty-state"], ["matColumnDef", "championship"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "teams"], ["matColumnDef", "date"], ["matColumnDef", "venue"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "match-info"], [1, "team-info"], [1, "team-name-matches"], [1, "score"], [1, "vs"], [1, "date-info"], [1, "time"], ["matIconButton", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function PlayerDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "a", 3)(4, "mat-icon");
      \u0275\u0275text(5, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h1", 4);
      \u0275\u0275text(7, "Detalle del Jugador");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(8, PlayerDetailPage_Conditional_8_Template, 3, 0, "div", 5)(9, PlayerDetailPage_Conditional_9_Template, 15, 3)(10, PlayerDetailPage_Conditional_10_Template, 3, 0, "div", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.isLoading() ? 8 : (tmp_0_0 = ctx.player()) ? 9 : 10, tmp_0_0);
    }
  }, dependencies: [
    // RouterLink,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatIconButton,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatChipsModule,
    MatChip,
    MatMenuModule,
    MatTabsModule,
    MatTab,
    MatTabGroup,
    AvatarComponent
  ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.content-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n.team-header-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  padding: 2rem;\n  margin-bottom: 1.5rem;\n  color: var(--mat-sys-on-surface);\n  background-color: var(--mat-sys-surface-container);\n}\n.team-header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.team-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  text-decoration: none;\n  color: inherit;\n  transition: transform 0.2s, box-shadow 0.2s;\n  overflow: hidden;\n  min-width: 0;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n@media (min-width: 640px) {\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n    gap: 1rem;\n  }\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  flex-shrink: 0;\n}\n.stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n@media (min-width: 640px) {\n  .stat-icon[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n    border-radius: 12px;\n  }\n  .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 24px;\n    width: 24px;\n    height: 24px;\n  }\n}\n.stat-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  line-height: 1.2;\n}\n@media (min-width: 640px) {\n  .stat-value[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (min-width: 640px) {\n  .stat-label[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n}\n.stat-change[_ngcontent-%COMP%] {\n  display: none;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.7rem;\n  color: #ef4444;\n  flex-shrink: 0;\n  padding: 0.2rem 0.4rem;\n  border-radius: 4px;\n  background: rgba(239, 68, 68, 0.1);\n}\n.stat-change.positive[_ngcontent-%COMP%] {\n  color: #22c55e;\n  background: rgba(34, 197, 94, 0.1);\n}\n.stat-change[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n@media (min-width: 480px) {\n  .stat-change[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n@media (min-width: 640px) {\n  .stat-change[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.25rem 0.5rem;\n  }\n  .stat-change[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n    width: 16px;\n    height: 16px;\n  }\n}\n.match-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.team-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.team-name-matches[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.score[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1.125rem;\n  color: var(--mat-sys-primary);\n}\n.vs[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.875rem;\n}\n.date-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.time[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=player-detail.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlayerDetailPage, [{
    type: Component,
    args: [{ selector: "app-player-detail", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      // RouterLink,
      MatIconModule,
      MatButtonModule,
      MatTableModule,
      MatChipsModule,
      MatMenuModule,
      MatTabsModule,
      AvatarComponent
    ], template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/matches">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <h1 class="page-title">Detalle del Jugador</h1>
        </div>
      </header>

      @if (isLoading()) {
        <div class="content-card">
          <p class="text-secondary py-8 text-center">Cargando...</p>
        </div>
      } @else if (player(); as p) {
        <!-- Team Header Card -->
        <div class="team-header-card flex flex-col items-center justify-center">
          <div class="team-header-content flex flex-col items-center justify-center">
            <!-- Player Logo and Name -->
            <div class="team-logo">
              @if (p.photoUrl) {
                <img [src]="p.photoUrl" [alt]="playerFullName(p) + ' Photo'" />
              } @else {
                <ui-avatar [name]="playerFullName(p)" size="xl" />
              }
            </div>
            <div class="player-info">
              <h2 class="player-name text-primary">{{ playerFullName(p) }}</h2>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <section class="stats-grid">
          @for (stat of stats(); track stat.label) {
            <div class="stat-card rounded-md bg-gray-200 p-2">
              <div class="stat-icon">
                <mat-icon>{{ stat.icon }}</mat-icon>
              </div>
              <div class="stat-content">
                <span class="stat-value">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            </div>
          }
        </section>

        <!-- Partidos jugados -->
        <mat-tab-group>
          <!-- Team Partidos Tab -->
          <mat-tab label="Partidos">
            @if (isLoading()) {
              <div class="content-card">
                <p class="text-secondary py-8 text-center">Cargando partidos...</p>
              </div>
            } @else {
              <div class="tab-content">
                @if (matches().length > 0) {
                  <table mat-table [dataSource]="matches()" class="w-full">
                    <ng-container matColumnDef="championship">
                      <th mat-header-cell *matHeaderCellDef>Campeonato</th>
                      <td mat-cell *matCellDef="let match">{{ match.championshipId }}</td>
                    </ng-container>

                    <ng-container matColumnDef="teams">
                      <th mat-header-cell *matHeaderCellDef>Partido</th>
                      <td mat-cell *matCellDef="let match">
                        <div class="match-info">
                          <div class="team-info">
                            <span class="team-name-matches">{{ match.homeTeam.name }}</span>
                            @if (match.status === 'live' || match.status === 'finished') {
                              <span class="score">{{ match.homeScore }}</span>
                            }
                          </div>
                          <span class="vs">vs</span>
                          <div class="team-info">
                            @if (match.status === 'live' || match.status === 'finished') {
                              <span class="score">{{ match.awayScore }}</span>
                            }
                            <span class="team-name-matches">{{ match.awayTeam.name }}</span>
                          </div>
                        </div>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="date">
                      <th mat-header-cell *matHeaderCellDef>Fecha y Hora</th>
                      <td mat-cell *matCellDef="let match">
                        <div class="date-info">
                          <span>{{ formatDate(match.scheduledDate) }}</span>
                          <span class="time">{{ match.scheduledTime }}</span>
                        </div>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="venue">
                      <th mat-header-cell *matHeaderCellDef>Lugar</th>
                      <td mat-cell *matCellDef="let match">{{ match.venue || 'N/A' }}</td>
                    </ng-container>

                    <ng-container matColumnDef="status">
                      <th mat-header-cell *matHeaderCellDef>Estado</th>
                      <td mat-cell *matCellDef="let match">
                        <mat-chip [class]="'status-' + match.status">
                          {{ getStatusLabel(match.status) }}
                        </mat-chip>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="actions">
                      <th mat-header-cell *matHeaderCellDef></th>
                      <td mat-cell *matCellDef="let match">
                        <button matIconButton>
                          <mat-icon>info</mat-icon>
                        </button>
                      </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumnsMatches"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumnsMatches"></tr>
                  </table>
                } @else {
                  <div class="empty-state">
                    <mat-icon>sports_soccer</mat-icon>
                    <h3>No hay partidos</h3>
                    <p>No se encontraron partidos con los filtros seleccionados</p>
                  </div>
                }
              </div>
            }
          </mat-tab>
        </mat-tab-group>
      } @else {
        <div class="content-card">
          <p class="text-secondary py-8 text-center">Jugador no encontrado</p>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:scss;c211fba42386d348970a8c7d229b9ce1c12d56799bc2c701a62dfb0b0fecd307;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/user/page/player-detail.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.content-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n.team-header-card {\n  border-radius: 12px;\n  padding: 2rem;\n  margin-bottom: 1.5rem;\n  color: var(--mat-sys-on-surface);\n  background-color: var(--mat-sys-surface-container);\n}\n.team-header-content {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.team-logo img {\n  width: 80px;\n  height: 80px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.stat-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  text-decoration: none;\n  color: inherit;\n  transition: transform 0.2s, box-shadow 0.2s;\n  overflow: hidden;\n  min-width: 0;\n}\n.stat-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n@media (min-width: 640px) {\n  .stat-card {\n    padding: 1.25rem;\n    gap: 1rem;\n  }\n}\n.stat-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  flex-shrink: 0;\n}\n.stat-icon mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n@media (min-width: 640px) {\n  .stat-icon {\n    width: 48px;\n    height: 48px;\n    border-radius: 12px;\n  }\n  .stat-icon mat-icon {\n    font-size: 24px;\n    width: 24px;\n    height: 24px;\n  }\n}\n.stat-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.stat-value {\n  font-size: 1.25rem;\n  font-weight: 700;\n  line-height: 1.2;\n}\n@media (min-width: 640px) {\n  .stat-value {\n    font-size: 1.5rem;\n  }\n}\n.stat-label {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (min-width: 640px) {\n  .stat-label {\n    font-size: 0.875rem;\n  }\n}\n.stat-change {\n  display: none;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.7rem;\n  color: #ef4444;\n  flex-shrink: 0;\n  padding: 0.2rem 0.4rem;\n  border-radius: 4px;\n  background: rgba(239, 68, 68, 0.1);\n}\n.stat-change.positive {\n  color: #22c55e;\n  background: rgba(34, 197, 94, 0.1);\n}\n.stat-change mat-icon {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n@media (min-width: 480px) {\n  .stat-change {\n    display: flex;\n  }\n}\n@media (min-width: 640px) {\n  .stat-change {\n    font-size: 0.75rem;\n    padding: 0.25rem 0.5rem;\n  }\n  .stat-change mat-icon {\n    font-size: 16px;\n    width: 16px;\n    height: 16px;\n  }\n}\n.match-info {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.team-info {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.team-name-matches {\n  font-weight: 500;\n}\n.score {\n  font-weight: 700;\n  font-size: 1.125rem;\n  color: var(--mat-sys-primary);\n}\n.vs {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.875rem;\n}\n.date-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.time {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=player-detail.page.css.map */\n"] }]
  }], () => [], { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlayerDetailPage, { className: "PlayerDetailPage", filePath: "src/app/features/user/page/player-detail.page.ts", lineNumber: 384 });
})();
export {
  PlayerDetailPage as default
};
//# sourceMappingURL=chunk-HKXYYEHU.js.map
