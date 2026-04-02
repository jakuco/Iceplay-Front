import {
  ApiService
} from "./chunk-I4DDBC3P.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-2QF6PXYN.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  ViewChild,
  catchError,
  computed,
  forkJoin,
  inject,
  map,
  of,
  setClassMetadata,
  signal,
  switchMap,
  throwError,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-HGKGTKMW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/core/services/statistic.service.ts
var StatisticService = class _StatisticService {
  api = inject(ApiService);
  /**
   * Get general statistics for all teams
   */
  getTeamsGeneralStatistics(limit = 10, offset = 0) {
    const params = {
      limit,
      offset
    };
    return this.api.get("api/statistics/teams/general", params).pipe(catchError((error) => this.handleError("Error fetching teams", error)));
  }
  /**
   * Get history statistics for specific teams
   */
  getTeamsHistoryStatistics(teamsIds) {
    const requests = teamsIds.map((id) => {
      return this.api.get(`api/statistics/teams/history/${id}`).pipe(catchError((error) => {
        return of(null);
      }));
    });
    return forkJoin(requests).pipe(map((results) => results.filter((r) => r !== null)));
  }
  /**
   * Get top players statistics for scorers
   */
  getPlayersScorersStatistics(limit = 10, offset = 0) {
    const params = {
      limit,
      offset
    };
    return this.api.get("api/statistics/players/scorers", params).pipe(catchError((error) => this.handleError("Error fetching players scorers", error)));
  }
  /**
   * Get top players statistics for goalkeepers
   */
  getPlayersGoalkeepersStatistics(limit = 10, offset = 0) {
    const params = {
      limit,
      offset
    };
    return this.api.get("api/statistics/players/goalkeepers", params).pipe(catchError((error) => this.handleError("Error fetching players goalkeepers", error)));
  }
  /**
   * Get top players statistics for yellow cards
   */
  getPlayersYellowCardsStatistics(limit = 10, offset = 0) {
    const params = {
      limit,
      offset
    };
    return this.api.get("api/statistics/players/yellow-cards", params).pipe(catchError((error) => this.handleError("Error fetching players yellow cards", error)));
  }
  /**
   * Get top players statistics for red cards
   */
  getPlayersRedCardsStatistics(limit = 10, offset = 0) {
    const params = {
      limit,
      offset
    };
    return this.api.get("api/statistics/players/red-cards", params).pipe(catchError((error) => this.handleError("Error fetching players red cards", error)));
  }
  /**
   * Handle errors
   */
  handleError(message, error) {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
  static \u0275fac = function StatisticService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StatisticService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StatisticService, factory: _StatisticService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StatisticService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/admin/pages/statistics/statistics.page.ts
var _c0 = ["modalScrollContainer"];
var _forTrack0 = ($index, $item) => $item.position;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.rank;
function AdminStatisticsPage_Conditional_11_For_23_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r1 = ctx.$implicit;
    \u0275\u0275classProp("form-pill--win", result_r1 === "G")("form-pill--draw", result_r1 === "E")("form-pill--loss", result_r1 === "P");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", result_r1, " ");
  }
}
function AdminStatisticsPage_Conditional_11_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 12)(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 14)(4, "span", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 16)(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 17);
    \u0275\u0275repeaterCreate(10, AdminStatisticsPage_Conditional_11_For_23_For_11_Template, 2, 7, "span", 18, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 19);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 20);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 20);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 20);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 20);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 20);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 20);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 20);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const team_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r2.position);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(team_r2.badge);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(team_r2.teamName);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(team_r2.form);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(team_r2.points);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r2.played);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r2.won);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r2.drawn);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r2.lost);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r2.goalsFor);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r2.goalsAgainst);
    \u0275\u0275advance();
    \u0275\u0275classProp("metric--positive", team_r2.goalDifference > 0)("metric--negative", team_r2.goalDifference < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.goalDifferenceLabel(team_r2.goalDifference), " ");
  }
}
function AdminStatisticsPage_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 7)(1, "div", 11)(2, "span");
    \u0275\u0275text(3, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Equipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "PTS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "PJ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11, "PG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13, "PE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "PP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "GF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "GC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "DG");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(22, AdminStatisticsPage_Conditional_11_For_23_Template, 28, 15, "article", 12, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r2.teamStandings());
  }
}
function AdminStatisticsPage_Conditional_12_For_2_For_11_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", item_r6.ratio, ")");
  }
}
function AdminStatisticsPage_Conditional_12_For_2_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "span", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 29)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 30)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, AdminStatisticsPage_Conditional_12_For_2_For_11_Conditional_11_Template, 2, 1, "small");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.rank);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r6.playerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.teamName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r6.value);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r6.ratio ? 11 : -1);
  }
}
function AdminStatisticsPage_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 22)(1, "header", 23)(2, "div", 24)(3, "mat-icon");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 25);
    \u0275\u0275listener("click", function AdminStatisticsPage_Conditional_12_For_2_Template_button_click_7_listener() {
      const category_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openCategoryModal(category_r5.id));
    });
    \u0275\u0275text(8, " M\xC1S ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 26);
    \u0275\u0275repeaterCreate(10, AdminStatisticsPage_Conditional_12_For_2_For_11_Template, 12, 5, "div", 27, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r5 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(category_r5.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r5.title);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(category_r5.items);
  }
}
function AdminStatisticsPage_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 8);
    \u0275\u0275repeaterCreate(1, AdminStatisticsPage_Conditional_12_For_2_Template, 12, 2, "article", 22, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.playerCategories());
  }
}
function AdminStatisticsPage_Conditional_13_For_14_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", item_r8.ratio, ")");
  }
}
function AdminStatisticsPage_Conditional_13_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 29)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 30)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, AdminStatisticsPage_Conditional_13_For_14_Conditional_11_Template, 2, 1, "small");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.rank);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r8.playerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.teamName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r8.value);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r8.ratio ? 11 : -1);
  }
}
function AdminStatisticsPage_Conditional_13_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1, "Cargando estad\xEDsticas...");
    \u0275\u0275elementEnd();
  }
}
function AdminStatisticsPage_Conditional_13_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.modalErrorMessage(), " ");
  }
}
function AdminStatisticsPage_Conditional_13_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1, "No hay m\xE1s registros por mostrar.");
    \u0275\u0275elementEnd();
  }
}
function AdminStatisticsPage_Conditional_13_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1, "No se encontraron datos para esta categor\xEDa.");
    \u0275\u0275elementEnd();
  }
}
function AdminStatisticsPage_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275listener("click", function AdminStatisticsPage_Conditional_13_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeCategoryModal());
    });
    \u0275\u0275elementStart(1, "section", 32);
    \u0275\u0275listener("click", function AdminStatisticsPage_Conditional_13_Template_section_click_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 33)(3, "div", 34)(4, "h2", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Se cargan m\xE1s resultados autom\xE1ticamente al llegar al final.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 36);
    \u0275\u0275listener("click", function AdminStatisticsPage_Conditional_13_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeCategoryModal());
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 37, 0);
    \u0275\u0275listener("scroll", function AdminStatisticsPage_Conditional_13_Template_div_scroll_11_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onModalScroll($event));
    });
    \u0275\u0275repeaterCreate(13, AdminStatisticsPage_Conditional_13_For_14_Template, 12, 5, "div", 38, _forTrack2);
    \u0275\u0275conditionalCreate(15, AdminStatisticsPage_Conditional_13_Conditional_15_Template, 2, 0, "p", 39);
    \u0275\u0275conditionalCreate(16, AdminStatisticsPage_Conditional_13_Conditional_16_Template, 2, 1, "p", 40);
    \u0275\u0275conditionalCreate(17, AdminStatisticsPage_Conditional_13_Conditional_17_Template, 2, 0, "p", 39);
    \u0275\u0275conditionalCreate(18, AdminStatisticsPage_Conditional_13_Conditional_18_Template, 2, 0, "p", 39);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-labelledby", ctx_r2.modalTitleId);
    \u0275\u0275advance(3);
    \u0275\u0275property("id", ctx_r2.modalTitleId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Top 10+ ", ctx_r2.selectedCategoryTitle());
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r2.modalItems());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.modalIsLoading() ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.modalErrorMessage() ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.modalHasMore() && ctx_r2.modalItems().length > 0 ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.modalIsLoading() && ctx_r2.modalItems().length === 0 && !ctx_r2.modalErrorMessage() ? 18 : -1);
  }
}
var AdminStatisticsPage = class _AdminStatisticsPage {
  statisticService = inject(StatisticService);
  pageSize = 10;
  modalScrollContainer = viewChild("modalScrollContainer", __spreadValues({}, ngDevMode ? { debugName: "modalScrollContainer" } : {}));
  modalTitleId = "statistics-category-modal-title";
  allStatisticsTeamGeneral = signal([], __spreadValues({}, ngDevMode ? { debugName: "allStatisticsTeamGeneral" } : {}));
  allStatisticsTeamsHistory = signal([], __spreadValues({}, ngDevMode ? { debugName: "allStatisticsTeamsHistory" } : {}));
  activeTab = signal("equipos", __spreadValues({}, ngDevMode ? { debugName: "activeTab" } : {}));
  teamStandings = signal([], __spreadValues({}, ngDevMode ? { debugName: "teamStandings" } : {}));
  selectedCategoryId = signal(null, __spreadValues({}, ngDevMode ? { debugName: "selectedCategoryId" } : {}));
  isModalOpen = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isModalOpen" } : {}));
  modalItems = signal([], __spreadValues({}, ngDevMode ? { debugName: "modalItems" } : {}));
  modalOffset = signal(0, __spreadValues({}, ngDevMode ? { debugName: "modalOffset" } : {}));
  modalHasMore = signal(true, __spreadValues({}, ngDevMode ? { debugName: "modalHasMore" } : {}));
  modalIsLoading = signal(false, __spreadValues({}, ngDevMode ? { debugName: "modalIsLoading" } : {}));
  modalErrorMessage = signal(null, __spreadValues({}, ngDevMode ? { debugName: "modalErrorMessage" } : {}));
  selectedCategoryTitle = computed(() => {
    const categoryId = this.selectedCategoryId();
    if (!categoryId) {
      return "";
    }
    const category = this.playerCategories().find((item) => item.id === categoryId);
    return category?.title ?? "";
  }, __spreadValues({}, ngDevMode ? { debugName: "selectedCategoryTitle" } : {}));
  playerCategories = signal([
    {
      id: "goals",
      title: "Goleadores",
      icon: "sports_soccer",
      items: []
    },
    {
      id: "best-goalkeeper",
      title: "Mejor portero",
      icon: "pan_tool",
      items: []
    },
    {
      id: "yellow-cards",
      title: "Tarjetas amarillas",
      icon: "crop_portrait",
      items: []
    },
    {
      id: "red-cards",
      title: "Tarjetas rojas",
      icon: "stop_square",
      items: []
    }
  ], __spreadValues({}, ngDevMode ? { debugName: "playerCategories" } : {}));
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.statisticService.getTeamsGeneralStatistics(10, 0).pipe(switchMap((teamsGeneralStatistics) => {
      this.allStatisticsTeamGeneral.set(teamsGeneralStatistics);
      const teamIds = teamsGeneralStatistics.map((team) => team.team_id);
      return this.statisticService.getTeamsHistoryStatistics(teamIds).pipe(map((teamsHistoryStatistics) => {
        const flatHistory = teamsHistoryStatistics.flat();
        return this.formatTeamsData(teamsGeneralStatistics, flatHistory);
      }));
    })).subscribe({
      next: (formattedTeams) => {
        this.teamStandings.set(formattedTeams);
      },
      error: (error) => {
        console.error("Error loading data", error);
      }
    });
    const limit = 3;
    const offset = 0;
    forkJoin({
      scorers: this.statisticService.getPlayersScorersStatistics(limit, offset),
      goalkeepers: this.statisticService.getPlayersGoalkeepersStatistics(limit, offset),
      yellowCards: this.statisticService.getPlayersYellowCardsStatistics(limit, offset),
      redCards: this.statisticService.getPlayersRedCardsStatistics(limit, offset)
    }).pipe(map(({ scorers, goalkeepers, yellowCards, redCards }) => {
      return {
        scorers: this.transformStats(scorers),
        goalkeepers: this.transformStats(goalkeepers),
        yellowCards: this.transformStats(yellowCards),
        redCards: this.transformStats(redCards)
      };
    })).subscribe({
      next: (result) => {
        this.playerCategories.update((categories) => categories.map((cat) => {
          switch (cat.id) {
            case "goals":
              return __spreadProps(__spreadValues({}, cat), { items: result.scorers });
            case "best-goalkeeper":
              return __spreadProps(__spreadValues({}, cat), { items: result.goalkeepers });
            case "yellow-cards":
              return __spreadProps(__spreadValues({}, cat), { items: result.yellowCards });
            case "red-cards":
              return __spreadProps(__spreadValues({}, cat), { items: result.redCards });
            default:
              return cat;
          }
        }));
      },
      error: (err) => {
        console.error("Error cargando estad\xEDsticas", err);
      }
    });
  }
  setTab(tab) {
    this.activeTab.set(tab);
  }
  openCategoryModal(categoryId) {
    this.selectedCategoryId.set(categoryId);
    this.isModalOpen.set(true);
    this.modalItems.set([]);
    this.modalOffset.set(0);
    this.modalHasMore.set(true);
    this.modalErrorMessage.set(null);
    this.loadMoreCategoryStats();
  }
  closeCategoryModal() {
    this.isModalOpen.set(false);
    this.selectedCategoryId.set(null);
    this.modalItems.set([]);
    this.modalOffset.set(0);
    this.modalHasMore.set(true);
    this.modalErrorMessage.set(null);
    this.modalIsLoading.set(false);
  }
  onModalScroll(event) {
    if (this.modalIsLoading() || !this.modalHasMore()) {
      return;
    }
    const target = event.target;
    const thresholdPx = 100;
    const isNearBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - thresholdPx;
    if (isNearBottom) {
      this.loadMoreCategoryStats();
    }
  }
  goalDifferenceLabel(goalDifference) {
    return goalDifference > 0 ? `+${goalDifference}` : `${goalDifference}`;
  }
  // Formatters
  formatTeamsData(generalStats, historyStats) {
    const historyMap = /* @__PURE__ */ new Map();
    historyStats.forEach((h) => historyMap.set(h.team_id, h.history));
    const sortedGeneral = [...generalStats].sort((a, b) => b.points - a.points);
    return sortedGeneral.map((team, index) => {
      const historyString = historyMap.get(team.team_id) || "";
      const form = historyString.trim().split(" ").map((r) => r);
      return {
        position: index + 1,
        teamName: team.name,
        badge: team.name.substring(0, 3).toUpperCase(),
        // ejemplo de badge
        points: team.points,
        played: team.matches_played,
        won: team.wins,
        drawn: team.draws,
        lost: team.losses,
        goalsFor: team.goals_for,
        goalsAgainst: team.goals_against,
        goalDifference: team.goal_difference,
        form
      };
    });
  }
  transformStats(stats) {
    return stats.map((player) => ({
      rank: player.rank,
      playerName: player.full_name,
      teamName: player.team_name,
      value: Number(player.value),
      ratio: player.ratio.toString()
    }));
  }
  loadMoreCategoryStats() {
    const categoryId = this.selectedCategoryId();
    if (!categoryId || this.modalIsLoading() || !this.modalHasMore()) {
      return;
    }
    this.modalIsLoading.set(true);
    this.modalErrorMessage.set(null);
    this.getCategoryStatsRequest(categoryId, this.pageSize, this.modalOffset()).subscribe({
      next: (players) => {
        const nextBatch = this.transformStats(players);
        this.modalItems.update((items) => [...items, ...nextBatch]);
        this.modalOffset.update((offset) => offset + nextBatch.length);
        this.modalHasMore.set(nextBatch.length === this.pageSize);
        this.modalIsLoading.set(false);
        this.loadMoreIfContainerHasNoScroll();
      },
      error: () => {
        this.modalErrorMessage.set("No se pudieron cargar m\xE1s estad\xEDsticas. Intenta nuevamente.");
        this.modalIsLoading.set(false);
      }
    });
  }
  loadMoreIfContainerHasNoScroll() {
    if (!this.isModalOpen() || this.modalIsLoading() || !this.modalHasMore()) {
      return;
    }
    setTimeout(() => {
      const container = this.modalScrollContainer()?.nativeElement;
      if (!container || !this.modalHasMore() || this.modalIsLoading()) {
        return;
      }
      const canScroll = container.scrollHeight > container.clientHeight + 1;
      if (!canScroll) {
        this.loadMoreCategoryStats();
      }
    });
  }
  getCategoryStatsRequest(categoryId, limit, offset) {
    switch (categoryId) {
      case "goals":
        return this.statisticService.getPlayersScorersStatistics(limit, offset);
      case "best-goalkeeper":
        return this.statisticService.getPlayersGoalkeepersStatistics(limit, offset);
      case "yellow-cards":
        return this.statisticService.getPlayersYellowCardsStatistics(limit, offset);
      case "red-cards":
        return this.statisticService.getPlayersRedCardsStatistics(limit, offset);
    }
  }
  static \u0275fac = function AdminStatisticsPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminStatisticsPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminStatisticsPage, selectors: [["app-admin-statistics"]], viewQuery: function AdminStatisticsPage_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.modalScrollContainer, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 16, vars: 8, consts: [["modalScrollContainer", ""], [1, "page-container"], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["aria-label", "Cambiar vista de estad\xEDsticas", 1, "tabs"], ["type", "button", 1, "tab-button", 3, "click"], ["aria-label", "Tabla de posiciones", 1, "standings-card"], ["aria-label", "Estad\xEDsticas de jugadores", 1, "players-grid"], [1, "modal-backdrop"], [1, "backend-note"], [1, "standings-header"], [1, "standings-row"], [1, "position-cell"], [1, "team-cell"], [1, "team-badge"], [1, "team-meta"], ["aria-label", "Forma reciente", 1, "form-row"], [1, "form-pill", 3, "form-pill--win", "form-pill--draw", "form-pill--loss"], [1, "metric", "metric--bold"], [1, "metric"], [1, "form-pill"], [1, "stat-card"], [1, "stat-card__header"], [1, "stat-card__title"], ["type", "button", 1, "stat-card__link", 3, "click"], [1, "stat-card__rows"], [1, "player-row"], [1, "player-rank"], [1, "player-meta"], [1, "player-value"], [1, "modal-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", 1, "category-modal", 3, "click"], [1, "category-modal__header"], [1, "category-modal__title-wrap"], [3, "id"], ["type", "button", "aria-label", "Cerrar modal", 1, "category-modal__close", 3, "click"], [1, "category-modal__content", 3, "scroll"], [1, "player-row", "player-row--modal"], [1, "category-modal__status"], [1, "category-modal__status", "category-modal__status--error"]], template: function AdminStatisticsPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "h1", 3);
      \u0275\u0275text(3, "Estad\xEDsticas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 4);
      \u0275\u0275text(5, "Vista administrativa de rendimiento por equipos y jugadores");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "nav", 5)(7, "button", 6);
      \u0275\u0275listener("click", function AdminStatisticsPage_Template_button_click_7_listener() {
        return ctx.setTab("equipos");
      });
      \u0275\u0275text(8, " Equipos ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 6);
      \u0275\u0275listener("click", function AdminStatisticsPage_Template_button_click_9_listener() {
        return ctx.setTab("jugadores");
      });
      \u0275\u0275text(10, " Jugadores ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(11, AdminStatisticsPage_Conditional_11_Template, 24, 0, "section", 7)(12, AdminStatisticsPage_Conditional_12_Template, 3, 0, "section", 8);
      \u0275\u0275conditionalCreate(13, AdminStatisticsPage_Conditional_13_Template, 19, 7, "div", 9);
      \u0275\u0275elementStart(14, "div", 10);
      \u0275\u0275text(15, " Datos hardcodeados para vista previa. Estructura lista para conectar API. ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("tab-button--active", ctx.activeTab() === "equipos");
      \u0275\u0275attribute("aria-selected", ctx.activeTab() === "equipos");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("tab-button--active", ctx.activeTab() === "jugadores");
      \u0275\u0275attribute("aria-selected", ctx.activeTab() === "jugadores");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeTab() === "equipos" ? 11 : 12);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isModalOpen() ? 13 : -1);
    }
  }, dependencies: [MatIconModule, MatIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  max-width: 1300px;\n  margin: 0 auto;\n  display: grid;\n  gap: 1rem;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 800;\n  margin: 0;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.35rem;\n  background: color-mix(in srgb, var(--mat-sys-surface), #000 6%);\n  padding: 0.35rem;\n  border-radius: 999px;\n  width: fit-content;\n}\n.tab-button[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0.5rem 1rem;\n  border-radius: 999px;\n  font-weight: 700;\n  color: var(--mat-sys-on-surface-variant);\n  background: transparent;\n  cursor: pointer;\n  transition: background 120ms ease;\n}\n.tab-button--active[_ngcontent-%COMP%] {\n  background: var(--mat-sys-primary);\n  color: var(--mat-sys-on-primary);\n}\n.standings-card[_ngcontent-%COMP%] {\n  border: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 55%);\n  border-radius: 12px;\n  overflow: auto;\n  background: var(--mat-sys-surface-container-low);\n}\n.standings-header[_ngcontent-%COMP%], \n.standings-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 3rem minmax(220px, 2.3fr) repeat(8, minmax(2.6rem, 1fr));\n  align-items: center;\n  min-width: 860px;\n}\n.standings-header[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, #8acb88, white 55%);\n  color: #1f4420;\n  font-weight: 700;\n  font-size: 0.78rem;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  padding: 0.6rem 0.4rem;\n}\n.standings-row[_ngcontent-%COMP%] {\n  border-top: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 75%);\n  padding: 0.35rem 0.4rem;\n}\n.position-cell[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.5rem;\n  font-weight: 700;\n  color: white;\n  background: #4caf50;\n  margin-inline: auto;\n}\n.team-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  min-width: 0;\n}\n.team-badge[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 1.95rem;\n  height: 1.95rem;\n  border-radius: 50%;\n  background: color-mix(in srgb, var(--mat-sys-primary), white 72%);\n  color: var(--mat-sys-primary);\n  font-size: 0.75rem;\n  font-weight: 800;\n  flex: none;\n}\n.team-meta[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: grid;\n  gap: 0.25rem;\n}\n.team-meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 0.94rem;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.2rem;\n  flex-wrap: wrap;\n}\n.form-pill[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  font-size: 0.63rem;\n  font-weight: 700;\n  line-height: 1;\n  padding: 0.18rem 0.26rem;\n  color: white;\n}\n.form-pill--win[_ngcontent-%COMP%] {\n  background: #03a759;\n}\n.form-pill--draw[_ngcontent-%COMP%] {\n  background: #f4a621;\n}\n.form-pill--loss[_ngcontent-%COMP%] {\n  background: #e64a4a;\n}\n.metric[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.9rem;\n}\n.metric--bold[_ngcontent-%COMP%] {\n  font-weight: 800;\n}\n.metric--positive[_ngcontent-%COMP%] {\n  color: #008a3b;\n  font-weight: 700;\n}\n.metric--negative[_ngcontent-%COMP%] {\n  color: #c13535;\n  font-weight: 700;\n}\n.players-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  border: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 60%);\n  background: var(--mat-sys-surface-container-low);\n  overflow: hidden;\n  box-shadow: 0 1px 3px color-mix(in srgb, #000, transparent 88%);\n}\n.stat-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: color-mix(in srgb, var(--mat-sys-surface), #000 4%);\n  padding: 0.6rem 0.75rem;\n  border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 70%);\n}\n.stat-card__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.42rem;\n}\n.stat-card__title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n  font-size: 1rem;\n  color: color-mix(in srgb, var(--mat-sys-on-surface), #000 15%);\n}\n.stat-card__title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  text-transform: uppercase;\n  letter-spacing: 0.01em;\n  font-weight: 800;\n}\n.stat-card__link[_ngcontent-%COMP%] {\n  border: 0;\n  background: none;\n  font-size: 0.78rem;\n  color: #2d8e2f;\n  font-weight: 700;\n  cursor: pointer;\n}\n.stat-card__link[_ngcontent-%COMP%]:focus-visible, \n.category-modal__close[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid color-mix(in srgb, var(--mat-sys-primary), white 18%);\n  outline-offset: 2px;\n  border-radius: 6px;\n}\n.stat-card__rows[_ngcontent-%COMP%] {\n  display: grid;\n}\n.player-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2rem 1fr auto;\n  gap: 0.55rem;\n  align-items: center;\n  padding: 0.55rem 0.75rem;\n  border-top: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 76%);\n}\n.player-row[_ngcontent-%COMP%]:first-child {\n  border-top: 0;\n}\n.player-rank[_ngcontent-%COMP%] {\n  width: 1.65rem;\n  height: 1.65rem;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: var(--mat-sys-primary);\n  background: color-mix(in srgb, var(--mat-sys-primary), white 84%);\n}\n.player-meta[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n}\n.player-meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  line-height: 1.05;\n}\n.player-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--mat-sys-on-surface-variant);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.player-value[_ngcontent-%COMP%] {\n  margin: 0;\n  font-weight: 800;\n  text-align: right;\n  display: grid;\n  line-height: 1.05;\n}\n.player-value[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.75rem;\n}\n.backend-note[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 80;\n  display: grid;\n  place-items: center;\n  background: color-mix(in srgb, #000, transparent 40%);\n  padding: 1rem;\n}\n.category-modal[_ngcontent-%COMP%] {\n  width: min(100%, 700px);\n  height: min(86vh, 760px);\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr);\n  border-radius: 12px;\n  border: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 45%);\n  background: var(--mat-sys-surface-container-lowest);\n  overflow: hidden;\n  box-shadow: 0 12px 30px color-mix(in srgb, #000, transparent 72%);\n}\n.category-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.8rem;\n  align-items: flex-start;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 72%);\n  background: color-mix(in srgb, var(--mat-sys-surface), #000 2%);\n}\n.category-modal__title-wrap[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 800;\n}\n.category-modal__title-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  font-size: 0.8rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.category-modal__close[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  color: var(--mat-sys-on-surface);\n  cursor: pointer;\n  width: 2rem;\n  height: 2rem;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  flex: none;\n}\n.category-modal__close[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  width: 1.15rem;\n  height: 1.15rem;\n}\n.category-modal__content[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  overscroll-behavior: contain;\n  display: grid;\n  align-content: start;\n}\n.player-row--modal[_ngcontent-%COMP%] {\n  padding-inline: 1rem;\n}\n.category-modal__status[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.85rem 1rem 1rem;\n  font-size: 0.84rem;\n  color: var(--mat-sys-on-surface-variant);\n  text-align: center;\n}\n.category-modal__status--error[_ngcontent-%COMP%] {\n  color: #be2b2b;\n  font-weight: 600;\n}\n@media (max-width: 1180px) {\n  .players-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 720px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .players-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modal-backdrop[_ngcontent-%COMP%] {\n    padding: 0.65rem;\n  }\n  .category-modal[_ngcontent-%COMP%] {\n    height: 90vh;\n  }\n  .category-modal__header[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .player-row--modal[_ngcontent-%COMP%] {\n    padding-inline: 0.75rem;\n  }\n}\n/*# sourceMappingURL=statistics.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminStatisticsPage, [{
    type: Component,
    args: [{ selector: "app-admin-statistics", changeDetection: ChangeDetectionStrategy.OnPush, imports: [MatIconModule], template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Estad\xEDsticas</h1>
        <p class="page-subtitle">Vista administrativa de rendimiento por equipos y jugadores</p>
      </header>

      <nav class="tabs" aria-label="Cambiar vista de estad\xEDsticas">
        <button
          type="button"
          class="tab-button"
          [class.tab-button--active]="activeTab() === 'equipos'"
          (click)="setTab('equipos')"
          [attr.aria-selected]="activeTab() === 'equipos'"
        >
          Equipos
        </button>
        <button
          type="button"
          class="tab-button"
          [class.tab-button--active]="activeTab() === 'jugadores'"
          (click)="setTab('jugadores')"
          [attr.aria-selected]="activeTab() === 'jugadores'"
        >
          Jugadores
        </button>
      </nav>

      @if (activeTab() === 'equipos') {
        <section class="standings-card" aria-label="Tabla de posiciones">
          <div class="standings-header">
            <span>#</span>
            <span>Equipo</span>
            <span>PTS</span>
            <span>PJ</span>
            <span>PG</span>
            <span>PE</span>
            <span>PP</span>
            <span>GF</span>
            <span>GC</span>
            <span>DG</span>
          </div>

          @for (team of teamStandings(); track team.position) {
            <article class="standings-row">
              <div class="position-cell">{{ team.position }}</div>
              <div class="team-cell">
                <span class="team-badge">{{ team.badge }}</span>
                <div class="team-meta">
                  <strong>{{ team.teamName }}</strong>
                  <div class="form-row" aria-label="Forma reciente">
                    @for (result of team.form; track $index) {
                      <span
                        class="form-pill"
                        [class.form-pill--win]="result === 'G'"
                        [class.form-pill--draw]="result === 'E'"
                        [class.form-pill--loss]="result === 'P'"
                      >
                        {{ result }}
                      </span>
                    }
                  </div>
                </div>
              </div>
              <div class="metric metric--bold">{{ team.points }}</div>
              <div class="metric">{{ team.played }}</div>
              <div class="metric">{{ team.won }}</div>
              <div class="metric">{{ team.drawn }}</div>
              <div class="metric">{{ team.lost }}</div>
              <div class="metric">{{ team.goalsFor }}</div>
              <div class="metric">{{ team.goalsAgainst }}</div>
              <div
                class="metric"
                [class.metric--positive]="team.goalDifference > 0"
                [class.metric--negative]="team.goalDifference < 0"
              >
                {{ goalDifferenceLabel(team.goalDifference) }}
              </div>
            </article>
          }
        </section>
      } @else {
        <section class="players-grid" aria-label="Estad\xEDsticas de jugadores">
          @for (category of playerCategories(); track category.id) {
            <article class="stat-card">
              <header class="stat-card__header">
                <div class="stat-card__title">
                  <mat-icon>{{ category.icon }}</mat-icon>
                  <h2>{{ category.title }}</h2>
                </div>
                <button
                  type="button"
                  class="stat-card__link"
                  (click)="openCategoryModal(category.id)"
                >
                  M\xC1S
                </button>
              </header>

              <div class="stat-card__rows">
                @for (item of category.items; track item.rank) {
                  <div class="player-row">
                    <span class="player-rank">{{ item.rank }}</span>
                    <div class="player-meta">
                      <strong>{{ item.playerName }}</strong>
                      <span>{{ item.teamName }}</span>
                    </div>
                    <p class="player-value">
                      <span>{{ item.value }}</span>
                      @if (item.ratio) {
                        <small>({{ item.ratio }})</small>
                      }
                    </p>
                  </div>
                }
              </div>
            </article>
          }
        </section>
      }

      @if (isModalOpen()) {
        <div class="modal-backdrop" (click)="closeCategoryModal()">
          <section
            class="category-modal"
            role="dialog"
            aria-modal="true"
            [attr.aria-labelledby]="modalTitleId"
            (click)="$event.stopPropagation()"
          >
            <header class="category-modal__header">
              <div class="category-modal__title-wrap">
                <h2 [id]="modalTitleId">Top 10+ {{ selectedCategoryTitle() }}</h2>
                <p>Se cargan m\xE1s resultados autom\xE1ticamente al llegar al final.</p>
              </div>
              <button
                type="button"
                class="category-modal__close"
                aria-label="Cerrar modal"
                (click)="closeCategoryModal()"
              >
                <mat-icon>close</mat-icon>
              </button>
            </header>

            <div #modalScrollContainer class="category-modal__content" (scroll)="onModalScroll($event)">
              @for (item of modalItems(); track item.rank) {
                <div class="player-row player-row--modal">
                  <span class="player-rank">{{ item.rank }}</span>
                  <div class="player-meta">
                    <strong>{{ item.playerName }}</strong>
                    <span>{{ item.teamName }}</span>
                  </div>
                  <p class="player-value">
                    <span>{{ item.value }}</span>
                    @if (item.ratio) {
                      <small>({{ item.ratio }})</small>
                    }
                  </p>
                </div>
              }

              @if (modalIsLoading()) {
                <p class="category-modal__status">Cargando estad\xEDsticas...</p>
              }

              @if (modalErrorMessage()) {
                <p class="category-modal__status category-modal__status--error">
                  {{ modalErrorMessage() }}
                </p>
              }

              @if (!modalHasMore() && modalItems().length > 0) {
                <p class="category-modal__status">No hay m\xE1s registros por mostrar.</p>
              }

              @if (!modalIsLoading() && modalItems().length === 0 && !modalErrorMessage()) {
                <p class="category-modal__status">No se encontraron datos para esta categor\xEDa.</p>
              }
            </div>
          </section>
        </div>
      }

      <div class="backend-note">
        Datos hardcodeados para vista previa. Estructura lista para conectar API.
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;d43cffbbc95476347e1609be847a53fcdf5a6e3f3b4029d0eecff97dde12e773;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/admin/pages/statistics/statistics.page.ts */\n:host {\n  display: block;\n}\n.page-container {\n  padding: 1.25rem;\n  max-width: 1300px;\n  margin: 0 auto;\n  display: grid;\n  gap: 1rem;\n}\n.page-header {\n  margin-bottom: 0.25rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 800;\n  margin: 0;\n}\n.page-subtitle {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.tabs {\n  display: inline-flex;\n  gap: 0.35rem;\n  background: color-mix(in srgb, var(--mat-sys-surface), #000 6%);\n  padding: 0.35rem;\n  border-radius: 999px;\n  width: fit-content;\n}\n.tab-button {\n  border: 0;\n  padding: 0.5rem 1rem;\n  border-radius: 999px;\n  font-weight: 700;\n  color: var(--mat-sys-on-surface-variant);\n  background: transparent;\n  cursor: pointer;\n  transition: background 120ms ease;\n}\n.tab-button--active {\n  background: var(--mat-sys-primary);\n  color: var(--mat-sys-on-primary);\n}\n.standings-card {\n  border: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 55%);\n  border-radius: 12px;\n  overflow: auto;\n  background: var(--mat-sys-surface-container-low);\n}\n.standings-header,\n.standings-row {\n  display: grid;\n  grid-template-columns: 3rem minmax(220px, 2.3fr) repeat(8, minmax(2.6rem, 1fr));\n  align-items: center;\n  min-width: 860px;\n}\n.standings-header {\n  background: color-mix(in srgb, #8acb88, white 55%);\n  color: #1f4420;\n  font-weight: 700;\n  font-size: 0.78rem;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  padding: 0.6rem 0.4rem;\n}\n.standings-row {\n  border-top: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 75%);\n  padding: 0.35rem 0.4rem;\n}\n.position-cell {\n  display: grid;\n  place-items: center;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.5rem;\n  font-weight: 700;\n  color: white;\n  background: #4caf50;\n  margin-inline: auto;\n}\n.team-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  min-width: 0;\n}\n.team-badge {\n  display: grid;\n  place-items: center;\n  width: 1.95rem;\n  height: 1.95rem;\n  border-radius: 50%;\n  background: color-mix(in srgb, var(--mat-sys-primary), white 72%);\n  color: var(--mat-sys-primary);\n  font-size: 0.75rem;\n  font-weight: 800;\n  flex: none;\n}\n.team-meta {\n  min-width: 0;\n  display: grid;\n  gap: 0.25rem;\n}\n.team-meta strong {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 0.94rem;\n}\n.form-row {\n  display: flex;\n  gap: 0.2rem;\n  flex-wrap: wrap;\n}\n.form-pill {\n  border-radius: 4px;\n  font-size: 0.63rem;\n  font-weight: 700;\n  line-height: 1;\n  padding: 0.18rem 0.26rem;\n  color: white;\n}\n.form-pill--win {\n  background: #03a759;\n}\n.form-pill--draw {\n  background: #f4a621;\n}\n.form-pill--loss {\n  background: #e64a4a;\n}\n.metric {\n  text-align: center;\n  font-size: 0.9rem;\n}\n.metric--bold {\n  font-weight: 800;\n}\n.metric--positive {\n  color: #008a3b;\n  font-weight: 700;\n}\n.metric--negative {\n  color: #c13535;\n  font-weight: 700;\n}\n.players-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n.stat-card {\n  border-radius: 10px;\n  border: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 60%);\n  background: var(--mat-sys-surface-container-low);\n  overflow: hidden;\n  box-shadow: 0 1px 3px color-mix(in srgb, #000, transparent 88%);\n}\n.stat-card__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: color-mix(in srgb, var(--mat-sys-surface), #000 4%);\n  padding: 0.6rem 0.75rem;\n  border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 70%);\n}\n.stat-card__title {\n  display: flex;\n  align-items: center;\n  gap: 0.42rem;\n}\n.stat-card__title mat-icon {\n  width: 1rem;\n  height: 1rem;\n  font-size: 1rem;\n  color: color-mix(in srgb, var(--mat-sys-on-surface), #000 15%);\n}\n.stat-card__title h2 {\n  margin: 0;\n  font-size: 0.95rem;\n  text-transform: uppercase;\n  letter-spacing: 0.01em;\n  font-weight: 800;\n}\n.stat-card__link {\n  border: 0;\n  background: none;\n  font-size: 0.78rem;\n  color: #2d8e2f;\n  font-weight: 700;\n  cursor: pointer;\n}\n.stat-card__link:focus-visible,\n.category-modal__close:focus-visible {\n  outline: 2px solid color-mix(in srgb, var(--mat-sys-primary), white 18%);\n  outline-offset: 2px;\n  border-radius: 6px;\n}\n.stat-card__rows {\n  display: grid;\n}\n.player-row {\n  display: grid;\n  grid-template-columns: 2rem 1fr auto;\n  gap: 0.55rem;\n  align-items: center;\n  padding: 0.55rem 0.75rem;\n  border-top: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 76%);\n}\n.player-row:first-child {\n  border-top: 0;\n}\n.player-rank {\n  width: 1.65rem;\n  height: 1.65rem;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: var(--mat-sys-primary);\n  background: color-mix(in srgb, var(--mat-sys-primary), white 84%);\n}\n.player-meta {\n  display: grid;\n  min-width: 0;\n}\n.player-meta strong {\n  font-size: 0.9rem;\n  line-height: 1.05;\n}\n.player-meta span {\n  font-size: 0.8rem;\n  color: var(--mat-sys-on-surface-variant);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.player-value {\n  margin: 0;\n  font-weight: 800;\n  text-align: right;\n  display: grid;\n  line-height: 1.05;\n}\n.player-value small {\n  font-weight: 500;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.75rem;\n}\n.backend-note {\n  font-size: 0.82rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.modal-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 80;\n  display: grid;\n  place-items: center;\n  background: color-mix(in srgb, #000, transparent 40%);\n  padding: 1rem;\n}\n.category-modal {\n  width: min(100%, 700px);\n  height: min(86vh, 760px);\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr);\n  border-radius: 12px;\n  border: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 45%);\n  background: var(--mat-sys-surface-container-lowest);\n  overflow: hidden;\n  box-shadow: 0 12px 30px color-mix(in srgb, #000, transparent 72%);\n}\n.category-modal__header {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.8rem;\n  align-items: flex-start;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline), transparent 72%);\n  background: color-mix(in srgb, var(--mat-sys-surface), #000 2%);\n}\n.category-modal__title-wrap h2 {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 800;\n}\n.category-modal__title-wrap p {\n  margin: 0.2rem 0 0;\n  font-size: 0.8rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.category-modal__close {\n  border: 0;\n  background: transparent;\n  color: var(--mat-sys-on-surface);\n  cursor: pointer;\n  width: 2rem;\n  height: 2rem;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  flex: none;\n}\n.category-modal__close mat-icon {\n  font-size: 1.15rem;\n  width: 1.15rem;\n  height: 1.15rem;\n}\n.category-modal__content {\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  overscroll-behavior: contain;\n  display: grid;\n  align-content: start;\n}\n.player-row--modal {\n  padding-inline: 1rem;\n}\n.category-modal__status {\n  margin: 0;\n  padding: 0.85rem 1rem 1rem;\n  font-size: 0.84rem;\n  color: var(--mat-sys-on-surface-variant);\n  text-align: center;\n}\n.category-modal__status--error {\n  color: #be2b2b;\n  font-weight: 600;\n}\n@media (max-width: 1180px) {\n  .players-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 720px) {\n  .page-container {\n    padding: 1rem;\n  }\n  .players-grid {\n    grid-template-columns: 1fr;\n  }\n  .modal-backdrop {\n    padding: 0.65rem;\n  }\n  .category-modal {\n    height: 90vh;\n  }\n  .category-modal__header {\n    padding: 0.75rem;\n  }\n  .player-row--modal {\n    padding-inline: 0.75rem;\n  }\n}\n/*# sourceMappingURL=statistics.page.css.map */\n"] }]
  }], null, { modalScrollContainer: [{ type: ViewChild, args: ["modalScrollContainer", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminStatisticsPage, { className: "AdminStatisticsPage", filePath: "src/app/features/admin/pages/statistics/statistics.page.ts", lineNumber: 670 });
})();
export {
  AdminStatisticsPage as default
};
//# sourceMappingURL=chunk-BW64C7CU.js.map
