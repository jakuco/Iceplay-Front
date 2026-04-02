import {
  ApiService
} from "./chunk-I4DDBC3P.js";
import {
  Injectable,
  catchError,
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

// src/app/core/services/player.service.ts
var PlayerService = class _PlayerService {
  api = inject(ApiService);
  /**
   * Get all players for a team
   */
  getPlayersByTeam(teamId) {
    return this.api.get("players", { teamId }).pipe(map((players) => players.map((p) => this.parsePlayerDates(p))), catchError((error) => this.handleError("Error fetching players", error)));
  }
  /**
   * Get players by championship
   */
  getPlayersByChampionship(championshipId) {
    return this.api.get("players", { championshipId }).pipe(map((players) => players.map((p) => this.parsePlayerDates(p))), catchError((error) => this.handleError("Error fetching championship players", error)));
  }
  /**
   * Get players by organization
   */
  getPlayersByOrganization(organizationId) {
    return this.api.get("players", { organizationId }).pipe(map((players) => players.map((p) => this.parsePlayerDates(p))), catchError((error) => this.handleError("Error fetching organization players", error)));
  }
  /**
   * Get a single player by ID
   */
  getPlayerById(id) {
    return this.api.get(`players/${id}`).pipe(map((player) => this.parsePlayerDates(player)), catchError((error) => this.handleError("Error fetching player", error)));
  }
  /**
   * Create a new player
   */
  createPlayer(player) {
    return this.api.post("players", player).pipe(map((p) => this.parsePlayerDates(p)), catchError((error) => this.handleError("Error creating player", error)));
  }
  /**
   * Update a player
   */
  updatePlayer(id, player) {
    return this.api.patch(`players/${id}`, player).pipe(map((p) => this.parsePlayerDates(p)), catchError((error) => this.handleError("Error updating player", error)));
  }
  /**
   * Delete a player
   */
  deletePlayer(id) {
    return this.api.delete(`players/${id}`).pipe(catchError((error) => this.handleError("Error deleting player", error)));
  }
  /**
   * Parse date strings to Date objects
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
   * Import players from CSV
   * CSV format: documento,nombre,apellido,numero,posicion,fecha_nacimiento,nacionalidad,altura,peso
   * All fields except documento, nombre, apellido, numero, posicion are optional
   */
  importPlayersFromCsv(teamId, championshipId, organizationId, csvContent) {
    const lines = csvContent.split("\n").filter((line) => line.trim() !== "");
    if (lines.length < 2) {
      return throwError(() => new Error("El archivo CSV debe tener al menos una fila de encabezado y una fila de datos"));
    }
    const dataLines = lines.slice(1);
    const result = {
      playersImported: 0,
      playersSkipped: [],
      warnings: [],
      errors: []
    };
    return from(dataLines).pipe(mergeMap((line, index) => {
      const cols = line.split(",").map((col) => col.trim());
      if (cols.length < 4) {
        result.errors.push(`L\xEDnea ${index + 2}: Formato inv\xE1lido. Se requieren al menos 5 columnas`);
        return of(null);
      }
      const firstName = cols[0];
      const lastName = cols[1];
      const number = parseInt(cols[2] || "0", 10);
      const positionId = parseInt(cols[3] || "1", 10);
      if (!firstName || !lastName || !number || number < 1 || number > 99) {
        result.errors.push(`L\xEDnea ${index + 2}: Datos inv\xE1lidos (documento, nombre, apellido o n\xFAmero)`);
        return of(null);
      }
      const birthDate = cols[4] ? this.parseDate(cols[4]) : /* @__PURE__ */ new Date("2000-01-01");
      const height = cols[5] ? parseInt(cols[5], 10) : void 0;
      const weight = cols[6] ? parseFloat(cols[6]) : void 0;
      return of(null).pipe(switchMap(() => {
        const newPlayer = {
          teamId,
          championshipId,
          organizationId,
          firstName,
          lastName,
          number,
          positionId,
          birthDate: birthDate ?? /* @__PURE__ */ new Date("2000-01-01"),
          height,
          weight
        };
        return this.createPlayer(newPlayer).pipe(tap(() => result.playersImported++), catchError((error) => {
          result.errors.push(`Error al crear jugador ${firstName} ${lastName}: ${error.message}`);
          return of(null);
        }));
      }));
    }), toArray(), map(() => result), catchError((error) => {
      result.errors.push(`Error general en la importaci\xF3n: ${error.message}`);
      return of(result);
    }));
  }
  /**
   * Parse date string to Date object
   * Supports formats: YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY
   */
  parseDate(dateStr) {
    if (!dateStr)
      return void 0;
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return new Date(dateStr);
    }
    const parts = dateStr.split(/[-\/]/);
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? void 0 : parsed;
  }
  /**
   * Handle errors
   */
  handleError(message, error) {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
  static \u0275fac = function PlayerService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlayerService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlayerService, factory: _PlayerService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlayerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  PlayerService
};
//# sourceMappingURL=chunk-K4K2REQ2.js.map
