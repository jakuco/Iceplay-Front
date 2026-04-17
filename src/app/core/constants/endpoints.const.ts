const AUTH_BASE = "auth";
// Backend confirmado: rutas montadas en plural (presentation/routes.ts)
//   router.use('/api/players', ...), router.use('/api/teams', ...), router.use('/api/matches', ...)
const PLAYERS_BASE = "players";
const TEAMS_BASE = "teams";
const ORGANIZATIONS_BASE = "organizations";
const SPORTS_BASE = "sports";
const MATCHES_BASE = "matches";
const CHAMPIONSHIPS_BASE = "championships";
const PHASES_BASE = "phases";
const FILES_BASE = "files";
const STATISTICS_BASE = "statistics";

export const ApiEndpoints = {
  AUTH: {
    BASE: AUTH_BASE,
    LOGIN: `${AUTH_BASE}/login`,
    REGISTER: `${AUTH_BASE}/register`,
    LOGOUT: `${AUTH_BASE}/logout`,
    VALIDATE_EMAIL: (token: string) => `${AUTH_BASE}/validate-email/${token}`,
    REFRESH: `${AUTH_BASE}/refresh`
  },

  PLAYERS: {
    BASE: PLAYERS_BASE,
    BY_ID: (id: string) => `${PLAYERS_BASE}/${id}`
  },

  TEAMS: {
    BASE: TEAMS_BASE,
    ALL: `${TEAMS_BASE}/all`,
    BY_ID: (id: string) => `${TEAMS_BASE}/${id}`
  },

  ORGANIZATIONS: {
    /**
     * ⚠️ Warning: Not implemented
     */
    BASE: ORGANIZATIONS_BASE,
    BY_ID: (id: string) => { throw new Error('Not implemented') /*return `${ORGANIZATIONS_BASE}/${id}`*/ }
  },

  SPORTS: {
    /**
     * ⚠️ Warning: Not implemented
     */
    BASE: SPORTS_BASE,
    BY_ID: (id: string) => { throw new Error('Not implemented') /*return `${SPORTS_BASE}/${id}`*/ },
    DEFAULT_RULES: (id: string) => { throw new Error('Not implemented') /*return `${SPORTS_BASE}/${id}/default-rules`*/ }
  },

  MATCHES: {
    BASE: MATCHES_BASE,
    SEARCH: `${MATCHES_BASE}/search`,
    SEARCH_ALL: `${MATCHES_BASE}/search/all`,
    ALL: `${MATCHES_BASE}/all`,
    BY_ID: (id: string) => `${MATCHES_BASE}/${id}`,
    EVENTS: (id: string) => `${MATCHES_BASE}/${id}/events`,
    EVENT_TYPES: `${MATCHES_BASE}/event-types`,
    EVENT_BY_ID: (matchId: string, eventId: string) => `${MATCHES_BASE}/${matchId}/events/${eventId}`,
    EVENTS_STREAM: (id: string) => `${MATCHES_BASE}/${id}/events/stream`
  },

  CHAMPIONSHIPS: {
    BASE: CHAMPIONSHIPS_BASE,
    ALL: `${CHAMPIONSHIPS_BASE}/all`,
    BY_ID: (id: string) => `${CHAMPIONSHIPS_BASE}/${id}`,
    DETAIL: (id: string) => `${CHAMPIONSHIPS_BASE}/${id}/detail`,
    TEAMS: (id: string) => `${CHAMPIONSHIPS_BASE}/${id}/teams`,
    FIXTURE: (id: string) => `${CHAMPIONSHIPS_BASE}/${id}/fixture`,
    FIXTURE_GEN: (id: string) => `${CHAMPIONSHIPS_BASE}/${id}/fixture/generate`,

    // Found these in some comments. No idea if they're actually needed or not.
    // Leaving them in as a unimplemented placeholder for now.
    STATUS: (id: string) => { throw new Error('Not implemented') /*return `${CHAMPIONSHIPS_BASE}/${id}/status`*/ },
    PHASES: (id: string) => { throw new Error('Not implemented') /*return `${CHAMPIONSHIPS_BASE}/${id}/phases`*/ },
    RULES: (id: string) => { throw new Error('Not implemented') /*return `${CHAMPIONSHIPS_BASE}/${id}/rules`*/ },
    SOCIAL_LINKS: (id: string) => { throw new Error('Not implemented') /*return `${CHAMPIONSHIPS_BASE}/${id}/social-links`*/ },
  },

  PHASES: {
    BASE: PHASES_BASE,
    BY_ID: (id: number | string) => `${PHASES_BASE}/${id}`,
    SWISS: (id: number | string) => `${PHASES_BASE}/${id}/swiss`,
  },

  FILES: {
    BASE: FILES_BASE,

    /**
     * @deprecated Not actually deprecated, but please avoid.
     * Prefer using `UPLOAD_COMPRESSED` instead.
     */
    UPLOAD: `${FILES_BASE}/upload`,
    /**
     * @deprecated Not actually deprecated, but please avoid.
     * Prefer using `DOWNLOAD_COMPRESSED` instead.
     */
    DOWNLOAD: (id: string) => `${FILES_BASE}/download/${id}`,

    UPLOAD_COMPRESSED: `${FILES_BASE}/upload/compressed`,
    DOWNLOAD_COMPRESSED: (id: string) => `${FILES_BASE}/download/compressed/${id}`,
    BY_ID: (id: string) => `${FILES_BASE}/${id}`,
    PLAYERS_ARCHIVE: `${FILES_BASE}/upload/players/archive`
  },

  /**
   * ⚠️ Warning: Not implemented
   */
  STATISTICS: {
    BASE: STATISTICS_BASE,
    TEAMS: {
      GENERAL: `${STATISTICS_BASE}/teams/general`,
      HISTORY: (id: string) => { throw new Error('Not implemented') /*return `${STATISTICS_BASE}/teams/history/${id}`*/ }
    },
    PLAYERS: {
      SCORERS: `${STATISTICS_BASE}/players/scorers`,
      GOALKEEPERS: `${STATISTICS_BASE}/players/goalkeepers`,
      YELLOW_CARDS: `${STATISTICS_BASE}/players/yellow-cards`,
      RED_CARDS: `${STATISTICS_BASE}/players/red-cards`,
    }
  }
} as const;
