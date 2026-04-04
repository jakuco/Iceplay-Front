import {
  PlayerService
} from "./chunk-C6HJVWB7.js";
import {
  TeamService
} from "./chunk-I6OJW7FU.js";
import "./chunk-DYTKA3GQ.js";
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
} from "./chunk-BTC4VTXD.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-URAQ4NZC.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-SX2GLNSI.js";
import "./chunk-OXFAHERR.js";
import "./chunk-LDEMS5LB.js";
import "./chunk-QFWQXRDF.js";
import "./chunk-YBE5VDY6.js";
import {
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-JQQIU6QV.js";
import "./chunk-WFKBK73W.js";
import "./chunk-Q5IAYNPB.js";
import {
  MatButton,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-F7WKCRHW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/admin/pages/teams/team-detail.page.ts
var _c0 = (a0) => ["/admin/teams", a0, "edit"];
var _c1 = (a0) => ["/admin/players", a0, "edit"];
var _c2 = () => ["/admin/players/new"];
var _c3 = (a0) => ({ teamId: a0 });
function TeamDetailPage_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "p", 8);
    \u0275\u0275text(2, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function TeamDetailPage_Conditional_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 12);
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", t_r1.logoUrl, \u0275\u0275sanitizeUrl)("alt", t_r1.name + " Logo");
  }
}
function TeamDetailPage_Conditional_13_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r1.shortname);
  }
}
function TeamDetailPage_Conditional_13_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17)(1, "mat-icon");
    \u0275\u0275text(2, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", t_r1.location, " ");
  }
}
function TeamDetailPage_Conditional_13_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2, "Ubicaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.location);
  }
}
function TeamDetailPage_Conditional_13_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2, "Estadio:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.homeVenue);
  }
}
function TeamDetailPage_Conditional_13_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2, "A\xF1o de Fundaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.foundedYear);
  }
}
function TeamDetailPage_Conditional_13_Conditional_32_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.coachName);
  }
}
function TeamDetailPage_Conditional_13_Conditional_32_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2, "Tel\xE9fono:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.coachPhone);
  }
}
function TeamDetailPage_Conditional_13_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "h3", 22);
    \u0275\u0275text(2, "Entrenador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 23);
    \u0275\u0275conditionalCreate(4, TeamDetailPage_Conditional_13_Conditional_32_Conditional_4_Template, 5, 1, "div", 24);
    \u0275\u0275conditionalCreate(5, TeamDetailPage_Conditional_13_Conditional_32_Conditional_5_Template, 5, 1, "div", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(t_r1.coachName ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.coachPhone ? 5 : -1);
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const player_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(player_r2.number);
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "Nombre");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const player_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", player_r3.firstName, " ", player_r3.lastName);
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "Posici\xF3n (ID)");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const player_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(player_r4.positionId);
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 40)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const player_r5 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classMap("status-" + (player_r5.status || "active"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r5.getStatusLabel(player_r5.status), " ");
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 39);
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_td_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 40)(1, "button", 41)(2, "mat-icon");
    \u0275\u0275text(3, "more_vert");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-menu", null, 0)(6, "button", 42)(7, "mat-icon");
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 43);
    \u0275\u0275listener("click", function TeamDetailPage_Conditional_13_Conditional_35_td_15_Template_button_click_10_listener() {
      const player_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r5.deletePlayer(player_r8.id));
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Eliminar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const player_r8 = ctx.$implicit;
    const menu_r9 = \u0275\u0275reference(5);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r9);
    \u0275\u0275advance(5);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c1, player_r8.id));
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 44);
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 45);
  }
}
function TeamDetailPage_Conditional_13_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 28);
    \u0275\u0275elementContainerStart(1, 30);
    \u0275\u0275template(2, TeamDetailPage_Conditional_13_Conditional_35_th_2_Template, 2, 0, "th", 31)(3, TeamDetailPage_Conditional_13_Conditional_35_td_3_Template, 2, 1, "td", 32);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 33);
    \u0275\u0275template(5, TeamDetailPage_Conditional_13_Conditional_35_th_5_Template, 2, 0, "th", 31)(6, TeamDetailPage_Conditional_13_Conditional_35_td_6_Template, 2, 2, "td", 32);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 34);
    \u0275\u0275template(8, TeamDetailPage_Conditional_13_Conditional_35_th_8_Template, 2, 0, "th", 31)(9, TeamDetailPage_Conditional_13_Conditional_35_td_9_Template, 2, 1, "td", 32);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 35);
    \u0275\u0275template(11, TeamDetailPage_Conditional_13_Conditional_35_th_11_Template, 2, 0, "th", 31)(12, TeamDetailPage_Conditional_13_Conditional_35_td_12_Template, 3, 3, "td", 32);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 36);
    \u0275\u0275template(14, TeamDetailPage_Conditional_13_Conditional_35_th_14_Template, 1, 0, "th", 31)(15, TeamDetailPage_Conditional_13_Conditional_35_td_15_Template, 14, 4, "td", 32);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(16, TeamDetailPage_Conditional_13_Conditional_35_tr_16_Template, 1, 0, "tr", 37)(17, TeamDetailPage_Conditional_13_Conditional_35_tr_17_Template, 1, 0, "tr", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275property("dataSource", ctx_r5.players());
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r5.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r5.displayedColumns);
  }
}
function TeamDetailPage_Conditional_13_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "mat-icon");
    \u0275\u0275text(2, "person_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay jugadores");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Agrega jugadores a este equipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 46)(8, "mat-icon");
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Agregar Jugador ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(2, _c2))("queryParams", \u0275\u0275pureFunction1(3, _c3, ctx_r5.id()));
  }
}
function TeamDetailPage_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "div", 11);
    \u0275\u0275conditionalCreate(3, TeamDetailPage_Conditional_13_Conditional_3_Template, 1, 2, "img", 12)(4, TeamDetailPage_Conditional_13_Conditional_4_Template, 2, 1, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 14)(6, "h2", 15);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 16);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, TeamDetailPage_Conditional_13_Conditional_10_Template, 4, 1, "p", 17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "mat-tab-group")(12, "mat-tab", 18)(13, "div", 19)(14, "div", 20)(15, "div", 21)(16, "h3", 22);
    \u0275\u0275text(17, "Informaci\xF3n General");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 23)(19, "div", 24)(20, "span", 25);
    \u0275\u0275text(21, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 26);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 24)(25, "span", 25);
    \u0275\u0275text(26, "Nombre Corto:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 26);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(29, TeamDetailPage_Conditional_13_Conditional_29_Template, 5, 1, "div", 24);
    \u0275\u0275conditionalCreate(30, TeamDetailPage_Conditional_13_Conditional_30_Template, 5, 1, "div", 24);
    \u0275\u0275conditionalCreate(31, TeamDetailPage_Conditional_13_Conditional_31_Template, 5, 1, "div", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(32, TeamDetailPage_Conditional_13_Conditional_32_Template, 6, 2, "div", 21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "mat-tab", 27)(34, "div", 19);
    \u0275\u0275conditionalCreate(35, TeamDetailPage_Conditional_13_Conditional_35_Template, 18, 3, "table", 28)(36, TeamDetailPage_Conditional_13_Conditional_36_Template, 11, 5, "div", 29);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r1 = ctx;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background", t_r1.primaryColor ?? "#1e40af");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(t_r1.logoUrl ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r1.shortname);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.location ? 10 : -1);
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(t_r1.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r1.shortname);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.location ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.homeVenue ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.foundedYear ? 31 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.coachName || t_r1.coachPhone ? 32 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r5.players().length > 0 ? 35 : 36);
  }
}
function TeamDetailPage_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "p", 8);
    \u0275\u0275text(2, "Equipo no encontrado");
    \u0275\u0275elementEnd()();
  }
}
var TeamDetailPage = class _TeamDetailPage {
  id = input.required(__spreadValues({}, ngDevMode ? { debugName: "id" } : {}));
  teamService = inject(TeamService);
  playerService = inject(PlayerService);
  team = signal(null, __spreadValues({}, ngDevMode ? { debugName: "team" } : {}));
  players = signal([], __spreadValues({}, ngDevMode ? { debugName: "players" } : {}));
  isLoading = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isLoading" } : {}));
  displayedColumns = ["number", "name", "position", "status", "actions"];
  constructor() {
    effect(() => {
      const teamId = this.id();
      if (teamId) {
        this.loadTeam(teamId);
      }
    });
  }
  loadTeam(id) {
    this.isLoading.set(true);
    this.teamService.getTeamWithPlayers(id).subscribe({
      next: (teamProfile) => {
        this.team.set(teamProfile);
        this.players.set(teamProfile.players);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("Error loading team", error);
        this.isLoading.set(false);
      }
    });
  }
  deletePlayer(playerId) {
    if (confirm("\xBFEst\xE1s seguro de que deseas eliminar este jugador?")) {
      this.playerService.deletePlayer(playerId).subscribe({
        next: () => {
          this.loadTeam(this.id());
        },
        error: (error) => {
          console.error("Error deleting player", error);
          alert("Error al eliminar el jugador");
        }
      });
    }
  }
  getStatusLabel(status) {
    const labels = {
      active: "Activo",
      injured: "Lesionado",
      suspended: "Suspendido",
      inactive: "Inactivo"
    };
    return labels[status] || status;
  }
  static \u0275fac = function TeamDetailPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeamDetailPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeamDetailPage, selectors: [["app-team-detail"]], inputs: { id: [1, "id"] }, decls: 15, vars: 4, consts: [["menu", "matMenu"], [1, "page-container"], [1, "page-header"], [1, "flex", "items-center", "gap-3"], ["matIconButton", "", "routerLink", "/admin/teams"], [1, "page-title"], ["matButton", "filled", 3, "routerLink"], [1, "content-card"], [1, "text-secondary", "py-8", "text-center"], [1, "team-header-card"], [1, "team-header-content"], [1, "team-logo"], [3, "src", "alt"], [1, "team-avatar"], [1, "team-info"], [1, "team-name"], [1, "team-short-name"], [1, "team-city"], ["label", "Informaci\xF3n"], [1, "tab-content"], [1, "info-grid"], [1, "info-card"], [1, "info-title"], [1, "info-list"], [1, "info-item"], [1, "info-label"], [1, "info-value"], ["label", "Jugadores"], ["mat-table", "", 1, "w-full", 3, "dataSource"], [1, "empty-state"], ["matColumnDef", "number"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "position"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["matIconButton", "", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "routerLink"], ["mat-menu-item", "", 1, "text-red-500", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], ["matButton", "filled", 3, "routerLink", "queryParams"]], template: function TeamDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "div", 3)(3, "a", 4)(4, "mat-icon");
      \u0275\u0275text(5, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h1", 5);
      \u0275\u0275text(7, "Detalle del Equipo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 6)(9, "mat-icon");
      \u0275\u0275text(10, "edit");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Editar ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, TeamDetailPage_Conditional_12_Template, 3, 0, "div", 7)(13, TeamDetailPage_Conditional_13_Template, 37, 13)(14, TeamDetailPage_Conditional_14_Template, 3, 0, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c0, ctx.id()));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.isLoading() ? 12 : (tmp_1_0 = ctx.team()) ? 13 : 14, tmp_1_0);
    }
  }, dependencies: [
    RouterLink,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
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
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatTabsModule,
    MatTab,
    MatTabGroup
  ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.content-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n.team-header-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  padding: 2rem;\n  margin-bottom: 1.5rem;\n  color: white;\n}\n.team-header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.team-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n}\n.team-avatar[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n  color: #1f2937;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.5rem;\n}\n.team-name[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0;\n}\n.team-short-name[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  opacity: 0.9;\n  margin: 0.25rem 0;\n}\n.team-city[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0.5rem 0 0;\n  opacity: 0.9;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 1.5rem 0;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n.info-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem;\n  color: var(--mat-sys-primary);\n}\n.info-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--mat-sys-on-surface-variant);\n}\n.info-value[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: var(--mat-sys-outline);\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.25rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0 0 1.5rem;\n}\n/*# sourceMappingURL=team-detail.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeamDetailPage, [{
    type: Component,
    args: [{ selector: "app-team-detail", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      RouterLink,
      MatIconModule,
      MatButtonModule,
      MatTableModule,
      MatChipsModule,
      MatMenuModule,
      MatTabsModule
    ], template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/admin/teams">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <h1 class="page-title">Detalle del Equipo</h1>
        </div>
        <button matButton="filled" [routerLink]="['/admin/teams', id(), 'edit']">
          <mat-icon>edit</mat-icon>
          Editar
        </button>
      </header>

      @if (isLoading()) {
        <div class="content-card">
          <p class="text-secondary py-8 text-center">Cargando...</p>
        </div>
      } @else if (team(); as t) {
        <div class="team-header-card" [style.background]="t.primaryColor ?? '#1e40af'">
          <div class="team-header-content">
            <div class="team-logo">
              @if (t.logoUrl) {
                <img [src]="t.logoUrl" [alt]="t.name + ' Logo'" />
              } @else {
                <div class="team-avatar">{{ t.shortname }}</div>
              }
            </div>
            <div class="team-info">
              <h2 class="team-name">{{ t.name }}</h2>
              <p class="team-short-name">{{ t.shortname }}</p>
              @if (t.location) {
                <p class="team-city">
                  <mat-icon>location_on</mat-icon>
                  {{ t.location }}
                </p>
              }
            </div>
          </div>
        </div>

        <mat-tab-group>
          <mat-tab label="Informaci\xF3n">
            <div class="tab-content">
              <div class="info-grid">
                <div class="info-card">
                  <h3 class="info-title">Informaci\xF3n General</h3>
                  <div class="info-list">
                    <div class="info-item">
                      <span class="info-label">Nombre:</span>
                      <span class="info-value">{{ t.name }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Nombre Corto:</span>
                      <span class="info-value">{{ t.shortname }}</span>
                    </div>
                    @if (t.location) {
                      <div class="info-item">
                        <span class="info-label">Ubicaci\xF3n:</span>
                        <span class="info-value">{{ t.location }}</span>
                      </div>
                    }
                    @if (t.homeVenue) {
                      <div class="info-item">
                        <span class="info-label">Estadio:</span>
                        <span class="info-value">{{ t.homeVenue }}</span>
                      </div>
                    }
                    @if (t.foundedYear) {
                      <div class="info-item">
                        <span class="info-label">A\xF1o de Fundaci\xF3n:</span>
                        <span class="info-value">{{ t.foundedYear }}</span>
                      </div>
                    }
                  </div>
                </div>

                @if (t.coachName || t.coachPhone) {
                  <div class="info-card">
                    <h3 class="info-title">Entrenador</h3>
                    <div class="info-list">
                      @if (t.coachName) {
                        <div class="info-item">
                          <span class="info-label">Nombre:</span>
                          <span class="info-value">{{ t.coachName }}</span>
                        </div>
                      }
                      @if (t.coachPhone) {
                        <div class="info-item">
                          <span class="info-label">Tel\xE9fono:</span>
                          <span class="info-value">{{ t.coachPhone }}</span>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Jugadores">
            <div class="tab-content">
              @if (players().length > 0) {
                <table mat-table [dataSource]="players()" class="w-full">
                  <ng-container matColumnDef="number">
                    <th mat-header-cell *matHeaderCellDef>#</th>
                    <td mat-cell *matCellDef="let player">{{ player.number }}</td>
                  </ng-container>

                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Nombre</th>
                    <td mat-cell *matCellDef="let player">{{ player.firstName }} {{ player.lastName }}</td>
                  </ng-container>

                  <ng-container matColumnDef="position">
                    <th mat-header-cell *matHeaderCellDef>Posici\xF3n (ID)</th>
                    <td mat-cell *matCellDef="let player">{{ player.positionId }}</td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Estado</th>
                    <td mat-cell *matCellDef="let player">
                      <mat-chip [class]="'status-' + (player.status || 'active')">
                        {{ getStatusLabel(player.status) }}
                      </mat-chip>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let player">
                      <button matIconButton [matMenuTriggerFor]="menu">
                        <mat-icon>more_vert</mat-icon>
                      </button>
                      <mat-menu #menu="matMenu">
                        <button mat-menu-item [routerLink]="['/admin/players', player.id, 'edit']">
                          <mat-icon>edit</mat-icon>
                          Editar
                        </button>
                        <button
                          mat-menu-item
                          class="text-red-500"
                          (click)="deletePlayer(player.id)"
                        >
                          <mat-icon>delete</mat-icon>
                          Eliminar
                        </button>
                      </mat-menu>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
                </table>
              } @else {
                <div class="empty-state">
                  <mat-icon>person_off</mat-icon>
                  <h3>No hay jugadores</h3>
                  <p>Agrega jugadores a este equipo</p>
                  <button
                    matButton="filled"
                    [routerLink]="['/admin/players/new']"
                    [queryParams]="{ teamId: id() }"
                  >
                    <mat-icon>add</mat-icon>
                    Agregar Jugador
                  </button>
                </div>
              }
            </div>
          </mat-tab>
        </mat-tab-group>
      } @else {
        <div class="content-card">
          <p class="text-secondary py-8 text-center">Equipo no encontrado</p>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:scss;b88f66cbdeef7ad784650923e151650aa969e74cbb10f0f4c45883194dada96c;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/admin/pages/teams/team-detail.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.content-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n.team-header-card {\n  border-radius: 12px;\n  padding: 2rem;\n  margin-bottom: 1.5rem;\n  color: white;\n}\n.team-header-content {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.team-logo img {\n  width: 80px;\n  height: 80px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n}\n.team-avatar {\n  width: 80px;\n  height: 80px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n  color: #1f2937;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.5rem;\n}\n.team-name {\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0;\n}\n.team-short-name {\n  font-size: 1rem;\n  opacity: 0.9;\n  margin: 0.25rem 0;\n}\n.team-city {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0.5rem 0 0;\n  opacity: 0.9;\n}\n.tab-content {\n  padding: 1.5rem 0;\n}\n.info-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.info-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n.info-title {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem;\n  color: var(--mat-sys-primary);\n}\n.info-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.info-item {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.info-label {\n  font-weight: 500;\n  color: var(--mat-sys-on-surface-variant);\n}\n.info-value {\n  text-align: right;\n}\n.empty-state {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.empty-state mat-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: var(--mat-sys-outline);\n  margin-bottom: 1rem;\n}\n.empty-state h3 {\n  margin: 0 0 0.5rem;\n  font-size: 1.25rem;\n}\n.empty-state p {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0 0 1.5rem;\n}\n/*# sourceMappingURL=team-detail.page.css.map */\n"] }]
  }], () => [], { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeamDetailPage, { className: "TeamDetailPage", filePath: "src/app/features/admin/pages/teams/team-detail.page.ts", lineNumber: 333 });
})();
export {
  TeamDetailPage as default
};
//# sourceMappingURL=chunk-EYFF32WL.js.map
