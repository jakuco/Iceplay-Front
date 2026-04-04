import {
  MatchService
} from "./chunk-UAP7CYK2.js";
import {
  ChampionshipService
} from "./chunk-OV3LMQTO.js";
import "./chunk-Z53GGAOI.js";
import {
  TeamService
} from "./chunk-I6OJW7FU.js";
import {
  I18nService,
  TranslatePipe
} from "./chunk-GT3UWJGO.js";
import {
  ApiService
} from "./chunk-DYTKA3GQ.js";
import {
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-JQQIU6QV.js";
import "./chunk-WFKBK73W.js";
import "./chunk-Q5IAYNPB.js";
import {
  MatButtonModule
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
  Injectable,
  Input,
  catchError,
  computed,
  effect,
  forkJoin,
  inject,
  input,
  interval,
  map,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-F7WKCRHW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/core/services/match-event.service.ts
var MatchEventService = class _MatchEventService {
  api = inject(ApiService);
  POLLING_INTERVAL = 3e3;
  // 3 seconds
  /**
   * Get all events for a match
   */
  getMatchEvents(matchId) {
    return this.api.get("events", { matchId }).pipe(map((events) => events.map((e) => this.parseEventDates(e))), catchError((error) => this.handleError("Error fetching match events", error)));
  }
  /**
   * Get events with polling for live matches
   * Polls every 3 seconds when match is live
   */
  getMatchEventsWithPolling(matchId, isLive) {
    if (!isLive) {
      return this.getMatchEvents(matchId);
    }
    return interval(this.POLLING_INTERVAL).pipe(
      startWith(0),
      // Start immediately
      switchMap(() => this.getMatchEvents(matchId)),
      catchError((error) => {
        console.error("Error polling match events", error);
        return throwError(() => error);
      })
    );
  }
  /**
   * Create a new match event
   */
  createEvent(event) {
    return this.api.post("events", event).pipe(map((e) => this.parseEventDates(e)), catchError((error) => this.handleError("Error creating event", error)));
  }
  /**
   * Update an event
   */
  updateEvent(id, event) {
    return this.api.patch(`events/${id}`, event).pipe(map((e) => this.parseEventDates(e)), catchError((error) => this.handleError("Error updating event", error)));
  }
  /**
   * Delete an event
   */
  deleteEvent(id) {
    return this.api.delete(`events/${id}`).pipe(catchError((error) => this.handleError("Error deleting event", error)));
  }
  /**
   * Get event by ID
   */
  getEventById(id) {
    return this.api.get(`events/${id}`).pipe(map((e) => this.parseEventDates(e)), catchError((error) => this.handleError("Error fetching event", error)));
  }
  subscribeToEvents(matchId, onAdd, onDelete) {
    const source = this.api.subscribe(`/${matchId}/events/stream`);
    source.addEventListener("add", (e) => {
      const event = JSON.parse(e.data);
      onAdd(event);
    });
    source.addEventListener("remove", (e) => {
      onDelete(e.lastEventId);
    });
    return source.close;
  }
  /**
   * Parse date strings to Date objects
   */
  parseEventDates(event) {
    return event;
  }
  /**
   * Handle errors
   */
  handleError(message, error) {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
  static \u0275fac = function MatchEventService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatchEventService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MatchEventService, factory: _MatchEventService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatchEventService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/models/event.model.ts
function formatEventMinute(minute, extraMinute) {
  if (extraMinute && extraMinute > 0) {
    return `${minute}+${extraMinute}'`;
  }
  return `${minute}'`;
}

// src/app/features/matches/pages/match-details/match-details.ts
var _forTrack0 = ($index, $item) => $item.minute + $item.type;
function MatchDetails_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "mat-icon", 2);
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 3);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "common.loading"));
  }
}
function MatchDetails_Conditional_1_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r1.homeScore);
  }
}
function MatchDetails_Conditional_1_Case_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, "match.status.scheduled"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r1.time);
  }
}
function MatchDetails_Conditional_1_Case_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(2, 2, "match.status.live"), " - ", m_r1.minute, "' ");
  }
}
function MatchDetails_Conditional_1_Case_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "match.status.fullTime"), " ");
  }
}
function MatchDetails_Conditional_1_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r1.awayScore);
  }
}
function MatchDetails_Conditional_1_Conditional_50_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 37)(4, "span", 38)(5, "mat-icon", 6);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 39);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 40);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", event_r2.minute, " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r2.getEventColor(event_r2.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getEventIcon(event_r2.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getEventLabel(event_r2.type), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", event_r2.teamName, " ");
  }
}
function MatchDetails_Conditional_1_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 29)(2, "table", 30)(3, "thead")(4, "tr", 31)(5, "th", 32);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 33);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 34);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 34);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody", 35);
    \u0275\u0275repeaterCreate(18, MatchDetails_Conditional_1_Conditional_50_For_19_Template, 12, 7, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const m_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 4, "match.table.time"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 6, "match.table.event"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 8, "match.table.description"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 10, "match.table.team"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(m_r1.events);
  }
}
function MatchDetails_Conditional_1_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "mat-icon", 41);
    \u0275\u0275text(2, "event_note");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 3);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "match.noEvents"));
  }
}
function MatchDetails_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "nav", 4)(2, "a", 5)(3, "mat-icon", 6);
    \u0275\u0275text(4, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 7);
    \u0275\u0275text(8, "/");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 3);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 7);
    \u0275\u0275text(12, "/");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "div", 8)(17, "div", 9);
    \u0275\u0275element(18, "img", 10);
    \u0275\u0275elementStart(19, "div", 11)(20, "p", 12);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 13);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(25, MatchDetails_Conditional_1_Conditional_25_Template, 2, 1, "p", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 15);
    \u0275\u0275conditionalCreate(27, MatchDetails_Conditional_1_Case_27_Template, 5, 4)(28, MatchDetails_Conditional_1_Case_28_Template, 3, 4, "span", 16)(29, MatchDetails_Conditional_1_Case_29_Template, 3, 3, "span", 17);
    \u0275\u0275elementStart(30, "p", 18);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p", 19);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 20)(35, "div", 21)(36, "p", 12);
    \u0275\u0275text(37);
    \u0275\u0275pipe(38, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "p", 13);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(41, MatchDetails_Conditional_1_Conditional_41_Template, 2, 1, "p", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275element(42, "img", 10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "mat-tab-group")(44, "mat-tab", 22);
    \u0275\u0275pipe(45, "translate");
    \u0275\u0275elementStart(46, "div", 23)(47, "h2", 24);
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(50, MatchDetails_Conditional_1_Conditional_50_Template, 20, 12, "div", 25)(51, MatchDetails_Conditional_1_Conditional_51_Template, 6, 3, "div", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "mat-tab", 22);
    \u0275\u0275pipe(53, "translate");
    \u0275\u0275elementStart(54, "div", 23)(55, "p", 3);
    \u0275\u0275text(56);
    \u0275\u0275pipe(57, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(58, "mat-tab", 22);
    \u0275\u0275pipe(59, "translate");
    \u0275\u0275elementStart(60, "div", 23)(61, "p", 3);
    \u0275\u0275text(62);
    \u0275\u0275pipe(63, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "mat-tab", 22);
    \u0275\u0275pipe(65, "translate");
    \u0275\u0275elementStart(66, "div", 23)(67, "p", 3);
    \u0275\u0275text(68);
    \u0275\u0275pipe(69, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_10_0;
    const m_r1 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 26, "common.matches"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(m_r1.league);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", m_r1.homeTeam.name, " vs ", m_r1.awayTeam.name);
    \u0275\u0275advance(4);
    \u0275\u0275property("alt", m_r1.homeTeam.name + " Logo")("src", m_r1.homeTeam.logo, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 28, "match.home"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r1.homeTeam.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(m_r1.status !== "scheduled" ? 25 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_10_0 = m_r1.status) === "scheduled" ? 27 : tmp_10_0 === "live" ? 28 : tmp_10_0 === "finished" ? 29 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.formattedMatchDate(m_r1));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r1.league);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(38, 30, "match.away"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r1.awayTeam.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(m_r1.status !== "scheduled" ? 41 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("alt", m_r1.awayTeam.name + " Logo")("src", m_r1.awayTeam.logo, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(45, 32, "match.tabs.summary"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(49, 34, "match.matchEvents"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(m_r1.events && m_r1.events.length > 0 ? 50 : 51);
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(53, 36, "match.tabs.statistics"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(57, 38, "match.comingSoon.statistics"));
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(59, 40, "match.tabs.lineups"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(63, 42, "match.comingSoon.lineups"));
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(65, 44, "match.tabs.h2h"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(69, 46, "match.comingSoon.h2h"));
  }
}
function MatchDetails_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "mat-icon", 42);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 43);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 3);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "a", 44)(10, "mat-icon", 6);
    \u0275\u0275text(11, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 3, "match.notFound.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 5, "match.notFound.message"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 7, "match.notFound.backToMatches"), " ");
  }
}
var MatchDetails = class _MatchDetails {
  i18nService = inject(I18nService);
  matchService = inject(MatchService);
  matchEventService = inject(MatchEventService);
  teamService = inject(TeamService);
  championshipService = inject(ChampionshipService);
  matchId = input.required(__spreadValues({}, ngDevMode ? { debugName: "matchId" } : {}));
  matchData = signal(null, __spreadValues({}, ngDevMode ? { debugName: "matchData" } : {}));
  homeTeam = signal(null, __spreadValues({}, ngDevMode ? { debugName: "homeTeam" } : {}));
  awayTeam = signal(null, __spreadValues({}, ngDevMode ? { debugName: "awayTeam" } : {}));
  championship = signal(null, __spreadValues({}, ngDevMode ? { debugName: "championship" } : {}));
  events = signal([], __spreadValues({}, ngDevMode ? { debugName: "events" } : {}));
  eventSubscription;
  isLoading = signal(true, __spreadValues({}, ngDevMode ? { debugName: "isLoading" } : {}));
  match = computed(() => {
    const m = this.matchData();
    const home = this.homeTeam();
    const away = this.awayTeam();
    const champ = this.championship();
    const evts = this.events();
    if (!m || !home || !away || !champ || !m.scheduledStart)
      return null;
    return {
      id: String(m.id),
      homeTeam: {
        id: String(home.id),
        name: home.name,
        logo: home.logoUrl || "https://via.placeholder.com/50"
      },
      awayTeam: {
        id: String(away.id),
        name: away.name,
        logo: away.logoUrl || "https://via.placeholder.com/50"
      },
      status: this.mapMatchStatus(m.status),
      time: m.scheduledStart?.toLocaleTimeString(this.i18nService.getLocale(), {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }),
      minute: m.status === "live" && m.actualStartTime ? Math.max(0, Math.floor((Date.now() - m.actualStartTime.getTime()) / 6e4)).toString() : void 0,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      date: m.scheduledStart,
      league: champ.name,
      events: this.transformEvents(evts, home, away)
    };
  }, __spreadValues({}, ngDevMode ? { debugName: "match" } : {}));
  constructor() {
    effect(() => {
      const id = this.matchId();
      if (id) {
        this.loadMatch(id);
      }
    });
  }
  ngOnDestroy() {
    this.eventSubscription?.unsubscribe();
  }
  loadMatch(id) {
    this.isLoading.set(true);
    this.matchService.getMatchById(id).subscribe({
      next: (match) => {
        this.matchData.set(match);
        const isLive = match.status === "live" || match.status === "warmup" || match.status === "halftime";
        forkJoin({
          homeTeam: this.teamService.getTeamById(String(match.homeTeamId)),
          awayTeam: this.teamService.getTeamById(String(match.awayTeamId)),
          championship: this.championshipService.getChampionshipById(String(match.championshipId))
        }).subscribe({
          next: ({ homeTeam, awayTeam, championship }) => {
            this.homeTeam.set(homeTeam);
            this.awayTeam.set(awayTeam);
            this.championship.set(championship);
            this.isLoading.set(false);
            this.loadEvents(id, isLive);
          },
          error: (error) => {
            console.error("Error loading match details", error);
            this.isLoading.set(false);
          }
        });
      },
      error: (error) => {
        console.error("Error loading match", error);
        this.isLoading.set(false);
      }
    });
  }
  loadEvents(matchId, isLive) {
    this.eventSubscription?.unsubscribe();
    this.eventSubscription = this.matchEventService.getMatchEventsWithPolling(matchId, isLive).subscribe({
      next: (events) => {
        this.events.set(events);
      },
      error: (error) => {
        console.error("Error loading events", error);
      }
    });
  }
  transformEvents(events, homeTeam, awayTeam) {
    return events.map((event) => {
      const team = event.teamId === String(homeTeam.id) ? homeTeam : awayTeam;
      return {
        minute: formatEventMinute(event.time),
        type: event.typeMatchEvent.label,
        description: event.description || "",
        teamName: team.name
      };
    }).sort((a, b) => {
      const minuteA = parseInt(a.minute.replace(/[^0-9]/g, "")) || 0;
      const minuteB = parseInt(b.minute.replace(/[^0-9]/g, "")) || 0;
      return minuteA - minuteB;
    });
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
  /**
   * Formats match date according to current language
   */
  formattedMatchDate(match) {
    return this.i18nService.formatDate(match.date, {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
  getEventIcon(type) {
    const icons = {
      goal: "sports_soccer",
      point: "sports_soccer",
      substitution: "swap_vert",
      yellow_card: "square",
      red_card: "square",
      assist: "sports_soccer",
      foul: "warning"
    };
    return icons[type] || "event";
  }
  getEventColor(type) {
    const colors = {
      goal: "#4ade80",
      point: "#4ade80",
      substitution: "var(--mat-sys-on-surface-variant)",
      yellow_card: "#facc15",
      red_card: "#f87171",
      assist: "#60a5fa",
      foul: "#f59e0b"
    };
    return colors[type] || "var(--mat-sys-on-surface-variant)";
  }
  getEventLabel(type) {
    const labels = {
      goal: this.i18nService.translate("match.events.goal"),
      point: this.i18nService.translate("match.events.goal"),
      substitution: this.i18nService.translate("match.events.substitution"),
      yellow_card: this.i18nService.translate("match.events.yellowCard"),
      red_card: this.i18nService.translate("match.events.redCard"),
      assist: this.i18nService.translate("match.events.assist") || "Assist",
      foul: this.i18nService.translate("match.events.foul") || "Foul"
    };
    return labels[type] || type;
  }
  static \u0275fac = function MatchDetails_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatchDetails)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MatchDetails, selectors: [["app-match-details"]], inputs: { matchId: [1, "matchId"] }, decls: 3, vars: 1, consts: [[1, "flex", "min-h-[50vh]", "flex-col", "items-center", "justify-center", "gap-4"], [1, "flex", "min-h-full", "flex-col", "gap-6", "p-4", "md:p-6"], [1, "animate-spin", "text-6xl!", "opacity-50"], [1, "text-secondary"], [1, "flex", "flex-wrap", "items-center", "gap-2", "text-sm"], ["routerLink", "/matches", 1, "text-secondary", "hover:text-primary", "flex", "cursor-pointer", "items-center", "gap-1"], [1, "text-base!"], [1, "text-tertiary"], [1, "flex", "flex-col", "gap-4", "md:flex-row", "md:flex-wrap"], [1, "card", "flex", "min-w-[140px]", "flex-1", "flex-col", "items-center", "gap-3", "rounded-xl", "p-4", "sm:flex-row", "md:p-6"], [1, "h-14", "w-14", "sm:h-16", "sm:w-16", 3, "alt", "src"], [1, "text-center", "sm:text-left"], [1, "text-secondary", "text-sm", "font-medium"], [1, "text-lg", "font-bold", "md:text-xl"], [1, "text-primary", "text-3xl", "font-black", "md:text-4xl"], [1, "status-card", "flex", "min-w-[140px]", "flex-1", "flex-col", "items-center", "justify-center", "gap-2", "rounded-xl", "p-4", "md:p-6"], [1, "animate-pulse", "rounded-full", "bg-red-500/20", "px-3", "py-1", "text-xs", "font-semibold", "text-red-400", "uppercase"], [1, "rounded-full", "bg-green-500/20", "px-3", "py-1", "text-xs", "font-semibold", "text-green-400", "uppercase"], [1, "text-secondary", "text-sm"], [1, "text-secondary", "text-xs"], [1, "card", "flex", "min-w-[140px]", "flex-1", "flex-col-reverse", "items-center", "justify-end", "gap-3", "rounded-xl", "p-4", "sm:flex-row", "md:p-6"], [1, "text-center", "sm:text-right"], [3, "label"], [1, "py-4"], [1, "mb-4", "text-xl", "font-bold"], [1, "card", "overflow-hidden", "rounded-xl", "border", "border-(--mat-sys-outline-variant)"], [1, "card", "rounded-xl", "p-8", "text-center"], [1, "rounded-full", "bg-blue-500/20", "px-3", "py-1", "text-xs", "font-semibold", "text-blue-400", "uppercase"], [1, "text-2xl", "font-bold"], [1, "overflow-x-auto"], [1, "w-full"], [1, "table-header"], [1, "w-24", "px-4", "py-3", "text-left", "text-xs", "font-medium", "tracking-wider", "uppercase"], [1, "w-32", "px-4", "py-3", "text-left", "text-xs", "font-medium", "tracking-wider", "uppercase"], [1, "px-4", "py-3", "text-left", "text-xs", "font-medium", "tracking-wider", "uppercase"], [1, "divide-y", "divide-(--mat-sys-outline-variant)"], [1, "text-secondary", "px-4", "py-3", "font-mono", "text-sm", "font-bold", "whitespace-nowrap"], [1, "px-4", "py-3", "whitespace-nowrap"], [1, "inline-flex", "items-center", "gap-2", "text-sm", "font-semibold"], [1, "px-4", "py-3", "text-sm"], [1, "text-secondary", "px-4", "py-3", "text-sm", "whitespace-nowrap"], [1, "mb-2", "text-5xl!", "opacity-50"], [1, "text-6xl!", "opacity-50"], [1, "text-xl", "font-bold"], ["routerLink", "/matches", 1, "text-primary", "flex", "items-center", "gap-1", "hover:underline"]], template: function MatchDetails_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, MatchDetails_Conditional_0_Template, 6, 3, "div", 0)(1, MatchDetails_Conditional_1_Template, 70, 48, "div", 1)(2, MatchDetails_Conditional_2_Template, 14, 9, "div", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional(ctx.isLoading() ? 0 : (tmp_0_0 = ctx.match()) ? 1 : 2, tmp_0_0);
    }
  }, dependencies: [MatIconModule, MatIcon, MatButtonModule, MatTabsModule, MatTab, MatTabGroup, RouterLink, TranslatePipe], styles: ["\n\n.card[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-surface-container);\n}\n.status-card[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 10%, transparent);\n}\n.table-header[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-surface-container-high);\n  color: var(--mat-sys-on-surface-variant);\n}\n.score-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n@media (min-width: 768px) {\n  .score-header[_ngcontent-%COMP%] {\n    flex-direction: row;\n  }\n}\n/*# sourceMappingURL=match-details.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatchDetails, [{
    type: Component,
    args: [{ selector: "app-match-details", changeDetection: ChangeDetectionStrategy.OnPush, imports: [MatIconModule, MatButtonModule, MatTabsModule, RouterLink, TranslatePipe], template: `
    @if (isLoading()) {
      <div class="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <mat-icon class="animate-spin text-6xl! opacity-50">refresh</mat-icon>
        <p class="text-secondary">{{ 'common.loading' | translate }}</p>
      </div>
    } @else if (match(); as m) {
      <div class="flex min-h-full flex-col gap-6 p-4 md:p-6">
        <!-- Breadcrumbs -->
        <nav class="flex flex-wrap items-center gap-2 text-sm">
          <a
            routerLink="/matches"
            class="text-secondary hover:text-primary flex cursor-pointer items-center gap-1"
          >
            <mat-icon class="text-base!">arrow_back</mat-icon>
            {{ 'common.matches' | translate }}
          </a>
          <span class="text-tertiary">/</span>
          <span class="text-secondary">{{ m.league }}</span>
          <span class="text-tertiary">/</span>
          <span>{{ m.homeTeam.name }} vs {{ m.awayTeam.name }}</span>
        </nav>

        <div>
          <!-- Match Header -->
          <div class="flex flex-col gap-4 md:flex-row md:flex-wrap">
            <!-- Home Team -->
            <div
              class="card flex min-w-[140px] flex-1 flex-col items-center gap-3 rounded-xl p-4 sm:flex-row md:p-6"
            >
              <img
                class="h-14 w-14 sm:h-16 sm:w-16"
                [alt]="m.homeTeam.name + ' Logo'"
                [src]="m.homeTeam.logo"
              />
              <div class="text-center sm:text-left">
                <p class="text-secondary text-sm font-medium">{{ 'match.home' | translate }}</p>
                <p class="text-lg font-bold md:text-xl">{{ m.homeTeam.name }}</p>
                @if (m.status !== 'scheduled') {
                  <p class="text-primary text-3xl font-black md:text-4xl">{{ m.homeScore }}</p>
                }
              </div>
            </div>

            <!-- Match Info -->
            <div
              class="status-card flex min-w-[140px] flex-1 flex-col items-center justify-center gap-2 rounded-xl p-4 md:p-6"
            >
              @switch (m.status) {
                @case ('scheduled') {
                  <span
                    class="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 uppercase"
                  >
                    {{ 'match.status.scheduled' | translate }}
                  </span>
                  <p class="text-2xl font-bold">{{ m.time }}</p>
                }
                @case ('live') {
                  <span
                    class="animate-pulse rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400 uppercase"
                  >
                    {{ 'match.status.live' | translate }} - {{ m.minute }}'
                  </span>
                }
                @case ('finished') {
                  <span
                    class="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400 uppercase"
                  >
                    {{ 'match.status.fullTime' | translate }}
                  </span>
                }
              }
              <p class="text-secondary text-sm">{{ formattedMatchDate(m) }}</p>
              <p class="text-secondary text-xs">{{ m.league }}</p>
            </div>

            <!-- Away Team -->
            <div
              class="card flex min-w-[140px] flex-1 flex-col-reverse items-center justify-end gap-3 rounded-xl p-4 sm:flex-row md:p-6"
            >
              <div class="text-center sm:text-right">
                <p class="text-secondary text-sm font-medium">{{ 'match.away' | translate }}</p>
                <p class="text-lg font-bold md:text-xl">{{ m.awayTeam.name }}</p>
                @if (m.status !== 'scheduled') {
                  <p class="text-primary text-3xl font-black md:text-4xl">{{ m.awayScore }}</p>
                }
              </div>
              <img
                class="h-14 w-14 sm:h-16 sm:w-16"
                [alt]="m.awayTeam.name + ' Logo'"
                [src]="m.awayTeam.logo"
              />
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <mat-tab-group>
          <mat-tab [label]="'match.tabs.summary' | translate">
            <div class="py-4">
              <h2 class="mb-4 text-xl font-bold">{{ 'match.matchEvents' | translate }}</h2>

              @if (m.events && m.events.length > 0) {
                <div
                  class="card overflow-hidden rounded-xl border border-(--mat-sys-outline-variant)"
                >
                  <div class="overflow-x-auto">
                    <table class="w-full">
                      <thead>
                        <tr class="table-header">
                          <th
                            class="w-24 px-4 py-3 text-left text-xs font-medium tracking-wider uppercase"
                          >
                            {{ 'match.table.time' | translate }}
                          </th>
                          <th
                            class="w-32 px-4 py-3 text-left text-xs font-medium tracking-wider uppercase"
                          >
                            {{ 'match.table.event' | translate }}
                          </th>
                          <th
                            class="px-4 py-3 text-left text-xs font-medium tracking-wider uppercase"
                          >
                            {{ 'match.table.description' | translate }}
                          </th>
                          <th
                            class="px-4 py-3 text-left text-xs font-medium tracking-wider uppercase"
                          >
                            {{ 'match.table.team' | translate }}
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-(--mat-sys-outline-variant)">
                        @for (event of m.events; track event.minute + event.type) {
                          <tr>
                            <td
                              class="text-secondary px-4 py-3 font-mono text-sm font-bold whitespace-nowrap"
                            >
                              {{ event.minute }}
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                              <span
                                class="inline-flex items-center gap-2 text-sm font-semibold"
                                [style.color]="getEventColor(event.type)"
                              >
                                <mat-icon class="text-base!">{{
                                  getEventIcon(event.type)
                                }}</mat-icon>
                                {{ getEventLabel(event.type) }}
                              </span>
                            </td>
                            <td class="px-4 py-3 text-sm">{{ event.description }}</td>
                            <td class="text-secondary px-4 py-3 text-sm whitespace-nowrap">
                              {{ event.teamName }}
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              } @else {
                <div class="card rounded-xl p-8 text-center">
                  <mat-icon class="mb-2 text-5xl! opacity-50">event_note</mat-icon>
                  <p class="text-secondary">{{ 'match.noEvents' | translate }}</p>
                </div>
              }
            </div>
          </mat-tab>

          <mat-tab [label]="'match.tabs.statistics' | translate">
            <div class="py-4">
              <p class="text-secondary">{{ 'match.comingSoon.statistics' | translate }}</p>
            </div>
          </mat-tab>

          <mat-tab [label]="'match.tabs.lineups' | translate">
            <div class="py-4">
              <p class="text-secondary">{{ 'match.comingSoon.lineups' | translate }}</p>
            </div>
          </mat-tab>

          <mat-tab [label]="'match.tabs.h2h' | translate">
            <div class="py-4">
              <p class="text-secondary">{{ 'match.comingSoon.h2h' | translate }}</p>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    } @else {
      <div class="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <mat-icon class="text-6xl! opacity-50">error_outline</mat-icon>
        <h2 class="text-xl font-bold">{{ 'match.notFound.title' | translate }}</h2>
        <p class="text-secondary">{{ 'match.notFound.message' | translate }}</p>
        <a routerLink="/matches" class="text-primary flex items-center gap-1 hover:underline">
          <mat-icon class="text-base!">arrow_back</mat-icon>
          {{ 'match.notFound.backToMatches' | translate }}
        </a>
      </div>
    }
  `, styles: ["/* angular:styles/component:scss;1fe807abd1b8b62cb8212401cd64d27cb36e4536c887a7a7a65a4f2679c49b42;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/matches/pages/match-details/match-details.ts */\n.card {\n  background-color: var(--mat-sys-surface-container);\n}\n.status-card {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 10%, transparent);\n}\n.table-header {\n  background-color: var(--mat-sys-surface-container-high);\n  color: var(--mat-sys-on-surface-variant);\n}\n.score-header {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n@media (min-width: 768px) {\n  .score-header {\n    flex-direction: row;\n  }\n}\n/*# sourceMappingURL=match-details.css.map */\n"] }]
  }], () => [], { matchId: [{ type: Input, args: [{ isSignal: true, alias: "matchId", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MatchDetails, { className: "MatchDetails", filePath: "src/app/features/matches/pages/match-details/match-details.ts", lineNumber: 278 });
})();
export {
  MatchDetails as default
};
//# sourceMappingURL=chunk-6FNKXDWP.js.map
