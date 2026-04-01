import {
  ApiService
} from "./chunk-MEYU7MSQ.js";
import {
  Injectable,
  catchError,
  inject,
  map,
  setClassMetadata,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-HGKGTKMW.js";

// src/app/core/services/match.service.ts
var MatchService = class _MatchService {
  api = inject(ApiService);
  /**
   * Get all matches for a championship
   */
  getMatches(championshipId) {
    return this.api.get("matches", { championshipId }).pipe(map((matches) => matches.map((m) => this.parseMatchDates(m))), catchError((error) => this.handleError("Error fetching matches", error)));
  }
  /**
   * Get matches by date (format: YYYY-MM-DD)
   */
  getMatchesByDate(date, championshipId) {
    const params = { date };
    if (championshipId) {
      params.championshipId = championshipId;
    }
    return this.api.get("matches", params).pipe(map((matches) => matches.map((m) => this.parseMatchDates(m))), catchError((error) => this.handleError("Error fetching matches by date", error)));
  }
  /**
   * Get a single match by ID
   */
  getMatchById(id) {
    return this.api.get(`matches/${id}`).pipe(map((match) => this.parseMatchDates(match)), catchError((error) => this.handleError("Error fetching match", error)));
  }
  /**
   * Get matches for an organization
   */
  getMatchesByOrganization(organizationId) {
    return this.api.get("matches", { organizationId }).pipe(map((matches) => matches.map((m) => this.parseMatchDates(m))), catchError((error) => this.handleError("Error fetching organization matches", error)));
  }
  /**
   * Get live matches
   */
  getLiveMatches(organizationId) {
    const params = { status: "live" };
    if (organizationId) {
      params.organizationId = organizationId;
    }
    return this.api.get("matches", params).pipe(map((matches) => matches.map((m) => this.parseMatchDates(m))), catchError((error) => this.handleError("Error fetching live matches", error)));
  }
  /**
   * Create a new match
   */
  createMatch(match) {
    return this.api.post("matches", match).pipe(map((m) => this.parseMatchDates(m)), catchError((error) => this.handleError("Error creating match", error)));
  }
  /**
   * Update match details
   */
  updateMatch(id, match) {
    return this.api.patch(`matches/${id}`, match).pipe(map((m) => this.parseMatchDates(m)), catchError((error) => this.handleError("Error updating match", error)));
  }
  /**
   * Update match score (for live control)
   */
  updateMatchScore(id, score) {
    return this.api.patch(`matches/${id}`, score).pipe(map((m) => this.parseMatchDates(m)), catchError((error) => this.handleError("Error updating match score", error)));
  }
  /**
   * Delete a match
   */
  deleteMatch(id) {
    return this.api.delete(`matches/${id}`).pipe(catchError((error) => this.handleError("Error deleting match", error)));
  }
  /**
   * Get match with populated team data
   */
  getMatchWithTeams(id) {
    return this.getMatchById(id).pipe(map((match) => {
      return match;
    }));
  }
  /**
   * Parse date strings to Date objects
   */
  parseMatchDates(match) {
    return match;
  }
  /**
   * Handle errors
   */
  handleError(message, error) {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
  static \u0275fac = function MatchService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatchService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MatchService, factory: _MatchService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatchService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  MatchService
};
//# sourceMappingURL=chunk-KLZHYUGG.js.map
