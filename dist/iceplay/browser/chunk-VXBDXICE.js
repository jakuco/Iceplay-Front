import {
  ApiService
} from "./chunk-MEYU7MSQ.js";
import {
  Injectable,
  catchError,
  inject,
  map,
  of,
  setClassMetadata,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-HGKGTKMW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/core/models/championship.model.ts
var ChampionshipStatus;
(function(ChampionshipStatus2) {
  ChampionshipStatus2["Draft"] = "draft";
  ChampionshipStatus2["Registration"] = "registration";
  ChampionshipStatus2["Active"] = "active";
  ChampionshipStatus2["Finished"] = "finished";
  ChampionshipStatus2["Cancelled"] = "cancelled";
})(ChampionshipStatus || (ChampionshipStatus = {}));
var PhaseType;
(function(PhaseType2) {
  PhaseType2["League"] = "league";
  PhaseType2["Knockout"] = "knockout";
  PhaseType2["Groups"] = "groups";
  PhaseType2["Swiss"] = "swiss";
})(PhaseType || (PhaseType = {}));
var PhaseStatus;
(function(PhaseStatus2) {
  PhaseStatus2["Pending"] = "pending";
  PhaseStatus2["Active"] = "active";
  PhaseStatus2["Finished"] = "finished";
})(PhaseStatus || (PhaseStatus = {}));
var GroupType;
(function(GroupType2) {
  GroupType2["Group"] = "group";
  GroupType2["DirectAdvanced"] = "direct";
  GroupType2["Playoff"] = "playoff";
})(GroupType || (GroupType = {}));

// src/app/core/services/championship.service.ts
var LS_CHAMPIONSHIPS = "iceplay_championships";
var LS_PHASES = "iceplay_phases";
var LS_RULES = "iceplay_rules";
var LS_TEAMS = "iceplay_teams";
var LS_SOCIAL_LINKS = "iceplay_social_links";
var FOOTBALL_RULES = [
  { matchRuleId: 1, name: "max_players", defaultValue: 20, currentValue: 20, isOverridden: false },
  { matchRuleId: 2, name: "min_players", defaultValue: 12, currentValue: 12, isOverridden: false },
  { matchRuleId: 3, name: "max_substitutions", defaultValue: 5, currentValue: 5, isOverridden: false },
  { matchRuleId: 4, name: "match_duration", defaultValue: 45, currentValue: 45, isOverridden: false },
  { matchRuleId: 5, name: "yellow_cards_suspension", defaultValue: 3, currentValue: 3, isOverridden: false },
  { matchRuleId: 6, name: "red_card_suspension", defaultValue: 1, currentValue: 1, isOverridden: false },
  { matchRuleId: 7, name: "extra_time", defaultValue: 0, currentValue: 0, isOverridden: false },
  { matchRuleId: 8, name: "penalty_shootout", defaultValue: 0, currentValue: 0, isOverridden: false },
  { matchRuleId: 9, name: "allow_guest_players", defaultValue: 0, currentValue: 0, isOverridden: false }
];
var DEFAULT_RULES_BY_SPORT = {
  1: FOOTBALL_RULES,
  // Fútbol
  2: FOOTBALL_RULES,
  // Básquetbol (misma estructura base)
  3: FOOTBALL_RULES,
  // Voleibol
  4: FOOTBALL_RULES,
  // Hockey
  5: FOOTBALL_RULES
  // Béisbol
};
var SOCIAL_NETWORKS = [
  { id: 1, name: "Facebook", icon: "thumb_up" },
  { id: 2, name: "Instagram", icon: "photo_camera" },
  { id: 3, name: "X", icon: "close" },
  { id: 4, name: "TikTok", icon: "music_note" },
  { id: 5, name: "YouTube", icon: "smart_display" }
];
var ChampionshipService = class _ChampionshipService {
  api = inject(ApiService);
  // ── CRUD base ──────────────────────────────────────────────────────────
  getAll(filters) {
    let list = this.readList();
    if (filters?.organizationId !== void 0)
      list = list.filter((c) => c.organizationId === filters.organizationId);
    if (filters?.sportId !== void 0)
      list = list.filter((c) => c.sportId === filters.sportId);
    if (filters?.status)
      list = list.filter((c) => c.status === filters.status);
    if (filters?.season)
      list = list.filter((c) => c.season === filters.season);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q));
    }
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 20;
    const start = (page - 1) * limit;
    const data = list.slice(start, start + limit);
    const totalPages = Math.ceil(list.length / limit) || 1;
    return of({ data, total: list.length, page, limit, totalPages });
  }
  // ── HTTP API (integración rama cup) ─────────────────────────────────────
  getChampionships(organizationId) {
    const params = organizationId ? { organizationId } : {};
    return this.api.get("championships", params).pipe(map((championships) => championships.map((c) => this.parseChampionshipDates(c))), catchError((error) => this.handleError("Error fetching championships", error)));
  }
  getAllChampionships() {
    return this.api.get("api/championships/all").pipe(map((championships) => championships.map((c) => this.parseChampionshipDates(c))), catchError((error) => this.handleError("Error fetching championships", error)));
  }
  getChampionshipDetail(id) {
    return this.api.get(`api/championships/${id}/detail`).pipe(map((championship) => this.parseChampionshipDates(championship)), catchError((error) => this.handleError("Error fetching championship details", error)));
  }
  getActiveChampionships() {
    return this.api.get("championships", { status: "active" }).pipe(map((championships) => championships.map((c) => this.parseChampionshipDates(c))), catchError((error) => this.handleError("Error fetching active championships", error)));
  }
  getChampionshipById(id) {
    return this.api.get(`championships/${id}`).pipe(map((championship) => this.parseChampionshipDates(championship)), catchError((error) => this.handleError("Error fetching championship", error)));
  }
  createChampionship(championship) {
    return this.api.post("championships", championship).pipe(map((c) => this.parseChampionshipDates(c)), catchError((error) => this.handleError("Error creating championship", error)));
  }
  updateChampionship(id, championship) {
    return this.api.patch(`championships/${id}`, championship).pipe(map((c) => this.parseChampionshipDates(c)), catchError((error) => this.handleError("Error updating championship", error)));
  }
  deleteChampionship(id) {
    return this.api.delete(`championships/${id}`).pipe(catchError((error) => this.handleError("Error deleting championship", error)));
  }
  getById(id) {
    const champ = this.readList().find((c) => String(c.id) === id);
    if (!champ)
      return throwError(() => new Error(`Championship ${id} not found`));
    const teamsStored = this.readRecord(LS_TEAMS)[id] ?? [];
    const detail = __spreadProps(__spreadValues({}, champ), {
      organization: { id: champ.organizationId, name: "Organizaci\xF3n", logo: null },
      sport: { id: champ.sportId, name: "Deporte", icon: "sports" },
      socialLinks: this.getStoredSocialLinks(id),
      phases: this.readRecord(LS_PHASES)[id] ?? [],
      matchRules: [],
      teamCount: teamsStored.length,
      activeMatchCount: 0
    });
    return of(detail);
  }
  create(dto) {
    const list = this.readList();
    const nextId = list.length ? Math.max(...list.map((c) => Number(c.id))) + 1 : 1;
    const now = /* @__PURE__ */ new Date();
    const champ = {
      id: nextId,
      organizationId: dto.organizationId,
      sportId: dto.sportId,
      name: dto.name,
      slug: dto.slug,
      description: dto.description ?? null,
      season: dto.season,
      logo: dto.logo ?? null,
      status: dto.status ?? ChampionshipStatus.Draft,
      registrationStartDate: dto.registrationStartDate ?? null,
      registrationEndDate: dto.registrationEndDate ?? null,
      startDate: dto.startDate ?? null,
      endDate: dto.endDate ?? null,
      maxTeams: dto.maxTeams ?? 16,
      maxPlayersPerTeam: dto.maxPlayersPerTeam ?? 20,
      createdAt: now,
      updatedAt: now
    };
    this.writeList([...list, champ]);
    return of(champ);
  }
  update(id, dto) {
    const list = this.readList();
    const index = list.findIndex((c) => String(c.id) === id);
    if (index === -1)
      return throwError(() => new Error(`Championship ${id} not found`));
    const updated = __spreadProps(__spreadValues(__spreadValues({}, list[index]), dto), { updatedAt: /* @__PURE__ */ new Date() });
    list[index] = updated;
    this.writeList(list);
    return of(updated);
  }
  updateStatus(id, dto) {
    const list = this.readList();
    const index = list.findIndex((c) => String(c.id) === id);
    if (index === -1)
      return throwError(() => new Error(`Championship ${id} not found`));
    const updated = __spreadProps(__spreadValues({}, list[index]), { status: dto.status, updatedAt: /* @__PURE__ */ new Date() });
    list[index] = updated;
    this.writeList(list);
    return of(updated);
  }
  delete(id) {
    this.writeList(this.readList().filter((c) => String(c.id) !== id));
    return of(void 0);
  }
  // ── Sub-recursos ───────────────────────────────────────────────────────
  getPhases(championshipId) {
    const phases = this.readRecord(LS_PHASES)[championshipId] ?? [];
    return of(phases);
  }
  savePhases(championshipId, phases) {
    const saved = phases.map((dto, i) => ({
      id: i + 1,
      championshipId: +championshipId,
      name: dto.name,
      phaseType: dto.phaseType,
      phaseOrder: dto.phaseOrder,
      status: dto.status ?? PhaseStatus.Pending,
      leagueConfig: dto.leagueConfig ? __spreadValues({ id: i + 1, phaseId: i + 1 }, dto.leagueConfig) : void 0,
      knockoutConfig: dto.knockoutConfig ? __spreadValues({ id: i + 1, phaseId: i + 1 }, dto.knockoutConfig) : void 0,
      groupsConfig: dto.groupsConfig ? __spreadValues({ id: i + 1, phaseId: i + 1 }, dto.groupsConfig) : void 0,
      swissConfig: dto.swissConfig ? __spreadValues({ id: i + 1, phaseId: i + 1 }, dto.swissConfig) : void 0
    }));
    const record = this.readRecord(LS_PHASES);
    record[championshipId] = saved;
    this.writeRecord(LS_PHASES, record);
    return of(saved);
  }
  getRules(championshipId) {
    const record = this.readRecord(LS_RULES);
    const stored = record[championshipId];
    if (stored)
      return of(stored);
    return of({ championshipId: +championshipId, sportId: 1, rules: [] });
  }
  updateRules(championshipId, patches) {
    const record = this.readRecord(LS_RULES);
    const current = record[championshipId] ?? {
      championshipId: +championshipId,
      sportId: patches[0]?.sportId ?? 1,
      rules: []
    };
    for (const patch of patches) {
      const rule = current.rules.find((r) => r.matchRuleId === patch.matchRuleId);
      if (rule) {
        rule.currentValue = patch.value;
        rule.isOverridden = patch.value !== rule.defaultValue;
      } else {
        current.rules.push({
          matchRuleId: patch.matchRuleId,
          name: `Regla ${patch.matchRuleId}`,
          defaultValue: patch.value,
          currentValue: patch.value,
          isOverridden: false
        });
      }
    }
    record[championshipId] = current;
    this.writeRecord(LS_RULES, record);
    return of(current);
  }
  /** Reglas por defecto del deporte — usadas al crear un campeonato nuevo */
  getDefaultRules(sportId) {
    const key = `iceplay_default_rules_sport_${sportId}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        return of(JSON.parse(raw));
      } catch {
      }
    }
    const defaults = DEFAULT_RULES_BY_SPORT[sportId] ?? DEFAULT_RULES_BY_SPORT[1];
    const response = { championshipId: 0, sportId, rules: defaults };
    localStorage.setItem(key, JSON.stringify(response));
    return of(response);
  }
  getTeams(championshipId) {
    const teams = this.readRecord(LS_TEAMS)[championshipId] ?? [];
    return of(teams);
  }
  getSocialLinks(championshipId) {
    return of(this.getStoredSocialLinks(championshipId));
  }
  saveSocialLinks(championshipId, links) {
    const uniqueByNetwork = /* @__PURE__ */ new Map();
    for (const link of links) {
      if (!link.link?.trim())
        continue;
      if (!uniqueByNetwork.has(link.socialNetworkId)) {
        uniqueByNetwork.set(link.socialNetworkId, {
          socialNetworkId: link.socialNetworkId,
          link: link.link.trim()
        });
      }
    }
    const saved = Array.from(uniqueByNetwork.values()).map((dto, index) => ({
      id: index + 1,
      championshipId: +championshipId,
      socialNetworkId: dto.socialNetworkId,
      link: dto.link,
      socialNetwork: SOCIAL_NETWORKS.find((n) => n.id === dto.socialNetworkId)
    }));
    const record = this.readRecord(LS_SOCIAL_LINKS);
    record[championshipId] = saved;
    this.writeRecord(LS_SOCIAL_LINKS, record);
    return of(saved);
  }
  saveTeams(championshipId, teams) {
    const now = /* @__PURE__ */ new Date();
    const saved = teams.map((dto, i) => ({
      id: i + 1,
      championshipId: +championshipId,
      name: dto.name,
      shortname: dto.shortname,
      slug: dto.slug,
      logoUrl: dto.logoUrl ?? null,
      documentUrl: dto.documentUrl ?? null,
      primaryColor: dto.primaryColor ?? null,
      secondaryColor: dto.secondaryColor ?? null,
      foundedYear: dto.foundedYear ?? null,
      homeVenue: dto.homeVenue ?? null,
      location: dto.location ?? null,
      coachName: dto.coachName ?? null,
      coachPhone: dto.coachPhone ?? null,
      isActive: true,
      hasActiveMatches: false,
      createdAt: now,
      updatedAt: now,
      players: dto.players ?? [],
      groups: [],
      stats: {
        teamId: i + 1,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
      }
    }));
    const record = this.readRecord(LS_TEAMS);
    record[championshipId] = saved;
    this.writeRecord(LS_TEAMS, record);
    return of(saved);
  }
  // ── Privados ────────────────────────────────────────────────────────────
  readList() {
    const raw = localStorage.getItem(LS_CHAMPIONSHIPS);
    if (!raw)
      return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  writeList(list) {
    localStorage.setItem(LS_CHAMPIONSHIPS, JSON.stringify(list));
  }
  readRecord(key) {
    const raw = localStorage.getItem(key);
    if (!raw)
      return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  writeRecord(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  getStoredSocialLinks(championshipId) {
    const stored = this.readRecord(LS_SOCIAL_LINKS)[championshipId] ?? [];
    return stored.map((link) => __spreadProps(__spreadValues({}, link), {
      championshipId: +championshipId,
      socialNetwork: SOCIAL_NETWORKS.find((n) => n.id === link.socialNetworkId)
    }));
  }
  parseChampionshipDates(c) {
    const parse = (v) => v && typeof v === "string" ? new Date(v) : v;
    return __spreadProps(__spreadValues({}, c), {
      startDate: parse(c.startDate),
      endDate: parse(c.endDate),
      registrationStartDate: parse(c.registrationStartDate),
      registrationEndDate: parse(c.registrationEndDate),
      createdAt: parse(c.createdAt),
      updatedAt: parse(c.updatedAt)
    });
  }
  handleError(message, error) {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message ?? String(error)}`));
  }
  static \u0275fac = function ChampionshipService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChampionshipService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ChampionshipService, factory: _ChampionshipService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChampionshipService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ChampionshipStatus,
  ChampionshipService
};
//# sourceMappingURL=chunk-VXBDXICE.js.map
