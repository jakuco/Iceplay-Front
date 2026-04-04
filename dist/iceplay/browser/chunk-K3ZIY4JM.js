import {
  PlayerStatus
} from "./chunk-BHAGPFM3.js";
import {
  MatchService
} from "./chunk-UAP7CYK2.js";
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-F7WKCRHW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/user/page/team-detail.page.ts
var _c0 = (a0) => ["/match", a0];
function TeamDetailPage_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p", 7);
    \u0275\u0275text(2, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function TeamDetailPage_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 11);
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", t_r1.logoUrl, \u0275\u0275sanitizeUrl)("alt", t_r1.name + " Logo");
  }
}
function TeamDetailPage_Conditional_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r1.shortname);
  }
}
function TeamDetailPage_Conditional_9_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2, "Ciudad:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.location);
  }
}
function TeamDetailPage_Conditional_9_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2, "Estadio:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.homeVenue);
  }
}
function TeamDetailPage_Conditional_9_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2, "A\xF1o de Fundaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.foundedYear);
  }
}
function TeamDetailPage_Conditional_9_Conditional_27_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.coachName);
  }
}
function TeamDetailPage_Conditional_9_Conditional_27_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2, "Tel\xE9fono:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.coachPhone);
  }
}
function TeamDetailPage_Conditional_9_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "h3", 18);
    \u0275\u0275text(2, "Entrenador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19);
    \u0275\u0275conditionalCreate(4, TeamDetailPage_Conditional_9_Conditional_27_Conditional_4_Template, 5, 1, "div", 20);
    \u0275\u0275conditionalCreate(5, TeamDetailPage_Conditional_9_Conditional_27_Conditional_5_Template, 5, 1, "div", 20);
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
function TeamDetailPage_Conditional_9_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p", 7);
    \u0275\u0275text(2, "Cargando partidos...");
    \u0275\u0275elementEnd()();
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "Campeonato");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r2.championshipId);
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "Partido");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r3.homeScore);
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_6_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r3.awayScore);
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38)(1, "div", 39)(2, "div", 13)(3, "span", 40);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_6_Conditional_5_Template, 2, 1, "span", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 42);
    \u0275\u0275text(7, "vs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 13);
    \u0275\u0275conditionalCreate(9, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_6_Conditional_9_Template, 2, 1, "span", 41);
    \u0275\u0275elementStart(10, "span", 40);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const match_r3 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(match_r3.homeTeam.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(match_r3.status === "live" || match_r3.status === "finished" ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(match_r3.status === "live" || match_r3.status === "finished" ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r3.awayTeam.name);
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "Fecha y Hora");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38)(1, "div", 43)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 44);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const match_r4 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.formatDate(match_r4.scheduledDate));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r4.scheduledTime);
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "Lugar");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r6.venue || "N/A");
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const match_r7 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classMap("status-" + match_r7.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.getStatusLabel(match_r7.status), " ");
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 37);
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38)(1, "button", 45)(2, "mat-icon");
    \u0275\u0275text(3, "info");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const match_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, match_r8.id));
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 46);
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 47);
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 25);
    \u0275\u0275elementContainerStart(1, 27);
    \u0275\u0275template(2, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_2_Template, 2, 0, "th", 28)(3, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_3_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 30);
    \u0275\u0275template(5, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_5_Template, 2, 0, "th", 28)(6, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_6_Template, 12, 4, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 31);
    \u0275\u0275template(8, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_8_Template, 2, 0, "th", 28)(9, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_9_Template, 6, 2, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 32);
    \u0275\u0275template(11, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_11_Template, 2, 0, "th", 28)(12, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_12_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 33);
    \u0275\u0275template(14, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_14_Template, 2, 0, "th", 28)(15, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_15_Template, 3, 3, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 34);
    \u0275\u0275template(17, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_th_17_Template, 1, 0, "th", 28)(18, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_td_18_Template, 4, 3, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(19, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_tr_19_Template, 1, 0, "tr", 35)(20, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_tr_20_Template, 1, 0, "tr", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275property("dataSource", ctx_r4.matches());
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r4.displayedColumnsMatches);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r4.displayedColumnsMatches);
  }
}
function TeamDetailPage_Conditional_9_Conditional_31_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "mat-icon");
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
function TeamDetailPage_Conditional_9_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275conditionalCreate(1, TeamDetailPage_Conditional_9_Conditional_31_Conditional_1_Template, 21, 3, "table", 25)(2, TeamDetailPage_Conditional_9_Conditional_31_Conditional_2_Template, 7, 0, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.matches().length > 0 ? 1 : 2);
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const player_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(player_r9.number);
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "Nombre");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const player_r10 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.playerRowName(player_r10));
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "Posici\xF3n");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const player_r11 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.playerRowPosition(player_r11));
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const player_r12 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classMap("status-" + (player_r12.status || "active"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.getStatusLabel(player_r12.status), " ");
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 37);
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38)(1, "button", 51)(2, "mat-icon");
    \u0275\u0275text(3, "info");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(4, "mat-menu", null, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const menu_r13 = \u0275\u0275reference(5);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r13);
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 46);
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 47);
  }
}
function TeamDetailPage_Conditional_9_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 25);
    \u0275\u0275elementContainerStart(1, 48);
    \u0275\u0275template(2, TeamDetailPage_Conditional_9_Conditional_34_th_2_Template, 2, 0, "th", 28)(3, TeamDetailPage_Conditional_9_Conditional_34_td_3_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 49);
    \u0275\u0275template(5, TeamDetailPage_Conditional_9_Conditional_34_th_5_Template, 2, 0, "th", 28)(6, TeamDetailPage_Conditional_9_Conditional_34_td_6_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 50);
    \u0275\u0275template(8, TeamDetailPage_Conditional_9_Conditional_34_th_8_Template, 2, 0, "th", 28)(9, TeamDetailPage_Conditional_9_Conditional_34_td_9_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 33);
    \u0275\u0275template(11, TeamDetailPage_Conditional_9_Conditional_34_th_11_Template, 2, 0, "th", 28)(12, TeamDetailPage_Conditional_9_Conditional_34_td_12_Template, 3, 3, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 34);
    \u0275\u0275template(14, TeamDetailPage_Conditional_9_Conditional_34_th_14_Template, 1, 0, "th", 28)(15, TeamDetailPage_Conditional_9_Conditional_34_td_15_Template, 6, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(16, TeamDetailPage_Conditional_9_Conditional_34_tr_16_Template, 1, 0, "tr", 35)(17, TeamDetailPage_Conditional_9_Conditional_34_tr_17_Template, 1, 0, "tr", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("dataSource", ctx_r4.players());
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r4.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r4.displayedColumns);
  }
}
function TeamDetailPage_Conditional_9_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "mat-icon");
    \u0275\u0275text(2, "person_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay jugadores");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Agrega jugadores a este equipo");
    \u0275\u0275elementEnd()();
  }
}
function TeamDetailPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "div", 10);
    \u0275\u0275conditionalCreate(3, TeamDetailPage_Conditional_9_Conditional_3_Template, 1, 2, "img", 11)(4, TeamDetailPage_Conditional_9_Conditional_4_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 13)(6, "h2", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(8, "div", 15)(9, "div", 16)(10, "div", 17)(11, "h3", 18);
    \u0275\u0275text(12, "Informaci\xF3n General");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 19)(14, "div", 20)(15, "span", 21);
    \u0275\u0275text(16, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 22);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 20)(20, "span", 21);
    \u0275\u0275text(21, "Nombre Corto:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 22);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(24, TeamDetailPage_Conditional_9_Conditional_24_Template, 5, 1, "div", 20);
    \u0275\u0275conditionalCreate(25, TeamDetailPage_Conditional_9_Conditional_25_Template, 5, 1, "div", 20);
    \u0275\u0275conditionalCreate(26, TeamDetailPage_Conditional_9_Conditional_26_Template, 5, 1, "div", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, TeamDetailPage_Conditional_9_Conditional_27_Template, 6, 2, "div", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "mat-tab-group")(29, "mat-tab", 23);
    \u0275\u0275conditionalCreate(30, TeamDetailPage_Conditional_9_Conditional_30_Template, 3, 0, "div", 6)(31, TeamDetailPage_Conditional_9_Conditional_31_Template, 3, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "mat-tab", 24)(33, "div", 15);
    \u0275\u0275conditionalCreate(34, TeamDetailPage_Conditional_9_Conditional_34_Template, 18, 3, "table", 25)(35, TeamDetailPage_Conditional_9_Conditional_35_Template, 7, 0, "div", 26);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r1 = ctx;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background", "var(--mat-sys-surface-container)");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(t_r1.logoUrl ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.name);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(t_r1.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r1.shortname);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.location ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.homeVenue ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.foundedYear ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.coachName || t_r1.coachPhone ? 27 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r4.isLoading() ? 30 : 31);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r4.players().length > 0 ? 34 : 35);
  }
}
function TeamDetailPage_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p", 7);
    \u0275\u0275text(2, "Equipo no encontrado");
    \u0275\u0275elementEnd()();
  }
}
var TeamDetailPage = class _TeamDetailPage {
  id = input.required(__spreadValues({}, ngDevMode ? { debugName: "id" } : {}));
  teamService = inject(TeamService);
  matchService = inject(MatchService);
  team = signal(null, __spreadValues({}, ngDevMode ? { debugName: "team" } : {}));
  players = signal([], __spreadValues({}, ngDevMode ? { debugName: "players" } : {}));
  matches = signal([], __spreadValues({}, ngDevMode ? { debugName: "matches" } : {}));
  isLoading = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isLoading" } : {}));
  displayedColumns = ["number", "name", "position", "status", "actions"];
  displayedColumnsMatches = ["championship", "teams", "date", "venue", "status", "actions"];
  constructor() {
    effect(() => {
      const teamId = this.id();
      if (teamId) {
        this.loadTeam(teamId);
        this.loadMatches(teamId);
      }
    });
  }
  loadTeam(id) {
    this.isLoading.set(true);
    const mockTeam = {
      id: 1,
      championshipId: 1,
      name: "Team 1",
      shortname: "T1",
      slug: "team-1",
      logoUrl: null,
      documentUrl: null,
      primaryColor: "#1a237e",
      secondaryColor: null,
      foundedYear: 2020,
      homeVenue: "Venue 1",
      location: "City 1",
      coachName: null,
      coachPhone: null,
      isActive: true,
      hasActiveMatches: false,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    const positions = ["Delantero", "Mediocampista", "Defensa", "Portero"];
    const mockPlayers = Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      teamId: "1",
      positionId: 1,
      photoUrl: null,
      firstName: "Jugador",
      lastName: String(i + 1),
      nickName: null,
      birthDate: /* @__PURE__ */ new Date("2000-01-01"),
      number: i + 1,
      height: null,
      weight: null,
      status: PlayerStatus.Active,
      suspensionEndDate: null,
      suspensionReason: null,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      position: {
        id: 1,
        code: "FW",
        label: positions[i % 4],
        abbreviation: "JUG"
      }
    }));
    setTimeout(() => {
      this.team.set(mockTeam);
      this.players.set(mockPlayers);
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
  playerRowName(p) {
    return `${p.firstName} ${p.lastName}`.trim();
  }
  playerRowPosition(p) {
    return p.position?.label ?? "\u2014";
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
  static \u0275fac = function TeamDetailPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeamDetailPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeamDetailPage, selectors: [["app-team-detail"]], inputs: { id: [1, "id"] }, decls: 11, vars: 1, consts: [["menu", "matMenu"], [1, "page-container"], [1, "page-header"], [1, "flex", "items-center", "gap-3"], ["matIconButton", "", "routerLink", "/matches"], [1, "page-title"], [1, "content-card"], [1, "text-secondary", "py-8", "text-center"], [1, "team-header-card"], [1, "team-header-content"], [1, "team-logo"], [3, "src", "alt"], [1, "team-avatar"], [1, "team-info"], [1, "team-name", "text-primary"], [1, "tab-content"], [1, "info-grid"], [1, "info-card"], [1, "info-title"], [1, "info-list"], [1, "info-item"], [1, "info-label"], [1, "info-value"], ["label", "Partidos"], ["label", "Jugadores"], ["mat-table", "", 1, "w-full", 3, "dataSource"], [1, "empty-state"], ["matColumnDef", "championship"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "teams"], ["matColumnDef", "date"], ["matColumnDef", "venue"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "match-info"], [1, "team-name-matches"], [1, "score"], [1, "vs"], [1, "date-info"], [1, "time"], ["matIconButton", "", 3, "routerLink"], ["mat-header-row", ""], ["mat-row", ""], ["matColumnDef", "number"], ["matColumnDef", "name"], ["matColumnDef", "position"], ["matIconButton", "", 3, "matMenuTriggerFor"]], template: function TeamDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "div", 3)(3, "a", 4)(4, "mat-icon");
      \u0275\u0275text(5, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h1", 5);
      \u0275\u0275text(7, "Detalle del Equipo");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(8, TeamDetailPage_Conditional_8_Template, 3, 0, "div", 6)(9, TeamDetailPage_Conditional_9_Template, 36, 12)(10, TeamDetailPage_Conditional_10_Template, 3, 0, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.isLoading() ? 8 : (tmp_0_0 = ctx.team()) ? 9 : 10, tmp_0_0);
    }
  }, dependencies: [
    RouterLink,
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
    MatMenu,
    MatMenuTrigger,
    MatTabsModule,
    MatTab,
    MatTabGroup
  ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.content-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n.team-header-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  padding: 2rem;\n  margin-bottom: 1.5rem;\n  color: var(--mat-sys-on-surface);\n  background-color: var(--mat-sys-surface-container);\n}\n.team-header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.team-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n}\n.team-avatar[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n  color: #1f2937;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.5rem;\n}\n.team-name[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0;\n}\n.team-short-name[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  opacity: 0.9;\n  margin: 0.25rem 0;\n}\n.team-city[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0.5rem 0 0;\n  opacity: 0.9;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 1.5rem 0;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n.info-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem;\n  color: var(--mat-sys-primary);\n}\n.info-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--mat-sys-on-surface-variant);\n}\n.info-value[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: var(--mat-sys-outline);\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.25rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0 0 1.5rem;\n}\n.match-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.team-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.team-name-matches[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.score[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1.125rem;\n  color: var(--mat-sys-primary);\n}\n.vs[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.875rem;\n}\n.date-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.time[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=team-detail.page.css.map */"], changeDetection: 0 });
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
          <a matIconButton routerLink="/matches">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <h1 class="page-title">Detalle del Equipo</h1>
        </div>
      </header>

      @if (isLoading()) {
        <div class="content-card">
          <p class="text-secondary py-8 text-center">Cargando...</p>
        </div>
      } @else if (team(); as t) {
        <!-- Team Header Card -->
        <div class="team-header-card" [style.background]="'var(--mat-sys-surface-container)'">
          <div class="team-header-content">
            <div class="team-logo">
              @if (t.logoUrl) {
                <img [src]="t.logoUrl" [alt]="t.name + ' Logo'" />
              } @else {
                <div class="team-avatar">{{ t.shortname }}</div>
              }
            </div>
            <div class="team-info">
              <h2 class="team-name text-primary">{{ t.name }}</h2>
            </div>
          </div>
        </div>

        <!-- Team Information Card -->
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
                    <span class="info-label">Ciudad:</span>
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

        <!-- Team Tabs -->
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
                        <button matIconButton [routerLink]="['/match', match.id]">
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

          <!-- Team Players Tab -->
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
                    <td mat-cell *matCellDef="let player">{{ playerRowName(player) }}</td>
                  </ng-container>

                  <ng-container matColumnDef="position">
                    <th mat-header-cell *matHeaderCellDef>Posici\xF3n</th>
                    <td mat-cell *matCellDef="let player">{{ playerRowPosition(player) }}</td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Estado</th>
                    <td mat-cell *matCellDef="let player">
                      <mat-chip [class]="'status-' + (player.status || 'active')">
                        {{ getStatusLabel(player.status) }}
                      </mat-chip>
                    </td>
                  </ng-container>

                  <!-- TODO: detalle del jugador -->
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let player">
                      <button matIconButton [matMenuTriggerFor]="menu">
                        <mat-icon>info</mat-icon>
                      </button>
                      <mat-menu #menu="matMenu"> </mat-menu>
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
  `, styles: ["/* angular:styles/component:scss;a36cc1f48b6ad74f81ce2ecafeba4101677a882f9280ecd27c0c703a25ffd849;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/user/page/team-detail.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.content-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n.team-header-card {\n  border-radius: 12px;\n  padding: 2rem;\n  margin-bottom: 1.5rem;\n  color: var(--mat-sys-on-surface);\n  background-color: var(--mat-sys-surface-container);\n}\n.team-header-content {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.team-logo img {\n  width: 80px;\n  height: 80px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n}\n.team-avatar {\n  width: 80px;\n  height: 80px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n  color: #1f2937;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.5rem;\n}\n.team-name {\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0;\n}\n.team-short-name {\n  font-size: 1rem;\n  opacity: 0.9;\n  margin: 0.25rem 0;\n}\n.team-city {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0.5rem 0 0;\n  opacity: 0.9;\n}\n.tab-content {\n  padding: 1.5rem 0;\n}\n.info-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.info-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n.info-title {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem;\n  color: var(--mat-sys-primary);\n}\n.info-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.info-item {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.info-label {\n  font-weight: 500;\n  color: var(--mat-sys-on-surface-variant);\n}\n.info-value {\n  text-align: right;\n}\n.empty-state {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.empty-state mat-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: var(--mat-sys-outline);\n  margin-bottom: 1rem;\n}\n.empty-state h3 {\n  margin: 0 0 0.5rem;\n  font-size: 1.25rem;\n}\n.empty-state p {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0 0 1.5rem;\n}\n.match-info {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.team-info {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.team-name-matches {\n  font-weight: 500;\n}\n.score {\n  font-weight: 700;\n  font-size: 1.125rem;\n  color: var(--mat-sys-primary);\n}\n.vs {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.875rem;\n}\n.date-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.time {\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=team-detail.page.css.map */\n"] }]
  }], () => [], { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeamDetailPage, { className: "TeamDetailPage", filePath: "src/app/features/user/page/team-detail.page.ts", lineNumber: 435 });
})();
export {
  TeamDetailPage as default
};
//# sourceMappingURL=chunk-K3ZIY4JM.js.map
