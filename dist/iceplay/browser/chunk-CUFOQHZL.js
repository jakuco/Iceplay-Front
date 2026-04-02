import {
  ApiService
} from "./chunk-I4DDBC3P.js";
import {
  Injectable,
  catchError,
  forkJoin,
  from,
  inject,
  map,
  mergeMap,
  of,
  setClassMetadata,
  switchMap,
  tap,
  throwError,
  toArray,
  ɵɵdefineInjectable
} from "./chunk-HGKGTKMW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/core/services/team.service.ts
var TeamService = class _TeamService {
  api = inject(ApiService);
  /**
   * Get all teams for a championship
   */
  getTeams(championshipId) {
    return this.api.get("teams", { championshipId }).pipe(map((teams) => teams.map((t) => this.parseTeamDates(t))), catchError((error) => this.handleError("Error fetching teams", error)));
  }
  /**
   * Get teams by organization
   */
  getTeamsByOrganization(organizationId) {
    return this.api.get("teams", { organizationId }).pipe(map((teams) => teams.map((t) => this.parseTeamDates(t))), catchError((error) => this.handleError("Error fetching organization teams", error)));
  }
  /**
   * Get a single team by ID
   */
  getTeamById(id) {
    return this.api.get(`teams/${id}`).pipe(map((team) => this.parseTeamDates(team)), catchError((error) => this.handleError("Error fetching team", error)));
  }
  /**
   * Get team with players
   */
  getTeamWithPlayers(id) {
    return forkJoin({
      team: this.getTeamById(id),
      players: this.getPlayers(id)
    }).pipe(map(({ team, players }) => __spreadProps(__spreadValues({}, team), {
      players,
      groups: team.groups ?? [],
      stats: {
        teamId: team.id,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
      }
    })), catchError((error) => this.handleError("Error fetching team with players", error)));
  }
  /**
   * Create a new team
   */
  createTeam(team) {
    return this.api.post("teams", team).pipe(map((t) => this.parseTeamDates(t)), catchError((error) => this.handleError("Error creating team", error)));
  }
  /**
   * Update a team
   */
  updateTeam(id, team) {
    return this.api.patch(`teams/${id}`, team).pipe(map((t) => this.parseTeamDates(t)), catchError((error) => this.handleError("Error updating team", error)));
  }
  /**
   * Delete a team
   */
  deleteTeam(id) {
    return this.api.delete(`teams/${id}`).pipe(catchError((error) => this.handleError("Error deleting team", error)));
  }
  /**
   * Get players for a team
   */
  getPlayers(teamId) {
    return this.api.get("players", { teamId }).pipe(map((players) => players.map((p) => this.parsePlayerDates(p))), catchError((error) => this.handleError("Error fetching players", error)));
  }
  /**
   * Create a player
   */
  createPlayer(player) {
    return this.api.post("players", player).pipe(map((p) => this.parsePlayerDates(p)), catchError((error) => this.handleError("Error creating player", error)));
  }
  /**
   * Parse date strings to Date objects for Team
   */
  parseTeamDates(team) {
    if (team.createdAt && typeof team.createdAt === "string") {
      team.createdAt = new Date(team.createdAt);
    }
    if (team.updatedAt && typeof team.updatedAt === "string") {
      team.updatedAt = new Date(team.updatedAt);
    }
    return team;
  }
  /**
   * Parse date strings to Date objects for Player
   */
  parsePlayerDates(player) {
    if (player.birthDate && typeof player.birthDate === "string") {
      player.birthDate = new Date(player.birthDate);
    }
    if (player.suspensionEndDate && typeof player.suspensionEndDate === "string") {
      player.suspensionEndDate = new Date(player.suspensionEndDate);
    }
    if (player.createdAt && typeof player.createdAt === "string") {
      player.createdAt = new Date(player.createdAt);
    }
    if (player.updatedAt && typeof player.updatedAt === "string") {
      player.updatedAt = new Date(player.updatedAt);
    }
    return player;
  }
  /**
   * Handle errors
   */
  handleError(message, error) {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
  // Simulated CSV Import
  importFromCsv(championshipId, organizationId, csvContent) {
    const lines = csvContent.split("\n");
    const headers = lines[0].split(",");
    const data = lines.slice(1).filter((line) => line.trim() !== "");
    const result = {
      teamsImported: 0,
      playersImported: 0,
      teamsSkipped: [],
      playersSkipped: [],
      warnings: []
    };
    return from(data).pipe(mergeMap((line) => {
      const cols = line.split(",");
      const teamName = cols[0]?.trim();
      if (!teamName)
        return of(null);
      return this.api.get("teams", { name: teamName, championshipId }).pipe(switchMap((teams) => {
        let teamObs;
        if (teams.length > 0) {
          teamObs = of(teams[0]);
        } else {
          const slug = teamName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
          const newTeam = {
            championshipId,
            organizationId,
            name: teamName,
            slug,
            shortname: cols[1]?.trim() || teamName.substring(0, 3).toUpperCase(),
            primaryColor: "#1e40af",
            secondaryColor: "#ffffff",
            logoUrl: "https://via.placeholder.com/50",
            coachName: cols[2]?.trim() || "",
            location: cols[3]?.trim() || ""
          };
          teamObs = this.createTeam(newTeam).pipe(tap(() => result.teamsImported++));
        }
        return teamObs.pipe(switchMap((team) => {
          const playerDoc = cols[7]?.trim();
          if (!playerDoc)
            return of(null);
          return this.api.get("players", { document: playerDoc }).pipe(switchMap((existingPlayers) => {
            if (existingPlayers.length > 0) {
              result.warnings.push(`Documento duplicado: ${playerDoc}`);
              result.playersSkipped.push(playerDoc);
              return of(null);
            }
            const newPlayer = {
              teamId: String(team.id),
              championshipId,
              organizationId,
              firstName: cols[5]?.trim() || "",
              lastName: cols[6]?.trim() || "",
              number: parseInt(cols[8]?.trim() || "0", 10),
              positionId: parseInt(cols[9]?.trim() || "1", 10),
              birthDate: /* @__PURE__ */ new Date("2000-01-01")
            };
            return this.createPlayer(newPlayer).pipe(tap(() => result.playersImported++));
          }));
        }));
      }));
    }), toArray(), map(() => result));
  }
  static \u0275fac = function TeamService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeamService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TeamService, factory: _TeamService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeamService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  TeamService
};
//# sourceMappingURL=chunk-CUFOQHZL.js.map
