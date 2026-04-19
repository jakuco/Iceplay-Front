import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ApiService } from './api.service';
import {
  Championship,
  ChampionshipApiResponse,
  ChampionshipDetail,
  BackendChampionshipsPage,
  BackendMatchRule,
  BackendPhase,
  ChampionshipListItem,
  ChampionshipStatus,
  ChampionshipRulesResponse,
  CreateChampionshipDto,
  CreateChampionshipMatchRuleDto,
  CreatePhaseApiDto,
  CreateSocialLinkDto,
  CreatePhaseDto,
  ChampionshipFiltersDto,
  PatchPhaseApiDto,
  PaginatedChampionships,
  Phase,
  PhaseStatus,
  PhaseSwissApiDto,
  PhaseType,
  SocialLink,
  SocialNetwork,
  SocialLinkUpsertPayload,
  UpdatePhaseApiDto,
  UpdateChampionshipDto,
  UpdateChampionshipStatusDto,
  ChampionshipFixture,
  ChampionshipLeaders,
  ChampionshipStanding,
  ChampionshipStandingsResponse,
} from '../models/championship.model';

import type { Position } from '../models/sport-config.model';
import { TeamProfile, TeamUpsertDto } from '../models/team.model';
import type { Player, PlayerUpsertDto } from '../models/player.model';
import type { DbId } from '../models/db.types';

@Injectable({ providedIn: 'root' })
export class ChampionshipService {
  private api = inject(ApiService);
  private http = inject(HttpClient);

  private _socialNetworks = signal<SocialNetwork[]>([]);
  private _loadingSocialNetworks = signal(false);
  private _positions = signal<Position[]>([]);
  private _loadingPositions = signal(false);

  readonly socialNetworks = this._socialNetworks.asReadonly();
  readonly loadingSocialNetworks = this._loadingSocialNetworks.asReadonly();
  readonly positions = this._positions.asReadonly();
  readonly loadingPositions = this._loadingPositions.asReadonly();

  private loaded = {
    socialNetworks: false,
    positionsBySport: new Set<number>(),
  };

  // ── Championship CRUD ──────────────────────────────────────────────────


  /**
   * Lista paginada de campeonatos.
   *
   * Contrato real:
   * GET /championships?page=1&limit=10
   *
   * Respuesta backend:
   * {
   *   page: number,
   *   limit: number,
   *   total: number,
   *   next: number | null,
   *   prev: number | null,
   *   championships: Championship[]
   * }
   *
   * Este método adapta esa respuesta a `PaginatedChampionships`
   * y calcula `totalPages` en cliente. Devuelve solo isActive=true
   */
  getAll(filters?: ChampionshipFiltersDto): Observable<PaginatedChampionships> {
    const params: Record<string, unknown> = {};
    if (filters?.organizationId !== undefined) params['organizationId'] = filters.organizationId;
    if (filters?.page !== undefined) params['page'] = filters.page;
    if (filters?.limit !== undefined) params['limit'] = filters.limit;
    if (filters?.status !== undefined) params['status'] = filters.status;
    if (filters?.season) params['season'] = filters.season;
    if (filters?.search) params['search'] = filters.search;
    return this.api.get<BackendChampionshipsPage>('championships', params).pipe(
      map(r => ({
        data: r.championships.map(c => this.parseChampionshipDates(c)) as unknown as ChampionshipListItem[],
        total: r.total,
        page: r.page,
        limit: r.limit,
        totalPages: Math.ceil(r.total / r.limit) || 1,
      })),
      catchError(e => this.handleError('Error fetching championships', e)),
    );
  }

  /**
   * Lista completa de campeonatos (sin paginacion).
   *
   * Contrato real:
   * GET /championships/all
   *
   * Respuesta backend:
   * Championship[]
   *
   * Cada item incluye:
   * id, organizationId, sportId, name, slug, description, season,
   * logo, status, registrationStartDate, registrationEndDate,
   * startDate, endDate, maxTeams, maxPlayersPerTeam,
   * createdAt, updatedAt, isActive.
   * 
   * Devuelve solo isActive=true
   */

  getAllChampionships(): Observable<Championship[]> {
    return this.api.get<Championship[]>('championships/all').pipe(
      map((championships) => championships.map((c) => this.parseChampionshipDates(c))),
      catchError((error) => this.handleError('Error fetching championships', error)),
    );
  }

  /**
   * Obtiene un campeonato por UUID.
   *
    * Contrato real actualizado: GET /championships/:id 
    * 
    * Ejemplo real:
    * {
    *   "id": "019d76ac-db7f-7a5c-9497-4b23e5139497",
    *   "organizationId": "019d3202-48c9-7c79-8236-cf46657fbb23",
    *   "sportId": 1,
    *   "name": "no se que hacer",
    *   "slug": "no-se-que-hacer",
    *   "description": null,
    *   "season": "2024-2025",
    *   "logo": null,
    *   "status": 0,
    *   "registrationStartDate": "2026-04-11T00:00:00.000Z",
    *   "registrationEndDate": "2026-04-13T00:00:00.000Z",
    *   "startDate": "2026-04-10T00:00:00.000Z",
    *   "endDate": "2026-04-30T00:00:00.000Z",
    *   "maxTeams": 12,
    *   "maxPlayersPerTeam": 12,
    *   "createdAt": "2026-04-10T09:15:33.118Z",
    *   "updatedAt": "2026-04-10T09:37:02.004Z",
    *   "isActive": true
    * }
   */
  getChampionshipById(id: string): Observable<Championship> {
    return this.api.get<Championship>(`championships/${id}`).pipe(
      map((championship) => this.parseChampionshipDates(championship)),
      catchError((error) => this.handleError('Error fetching championship', error)),
    );
  }


  /**
   * Crea un campeonato.
   *
   * Contrato real:
   * POST /championships
   *
   * Body esperado:
   * {
   *   "organizationId": "{{organizationId}}",
   *   "sportId": {{sportId}},
   *   "name": "Torneo Apertura 2026",
   *   "slug": "torneo-apertura-2026",
   *   "season": "2026",
   *   "status": 0,
   *   "maxTeams": 16,
   *   "maxPlayersPerTeam": 25,
   *   "isActive": true
   * }
   *
   * Respuesta real:
   * {
   *   "id": "019d782f-852e-70ca-9a03-c01c6940762f",
   *   "name": "Torneo Apertura 2026",
   *   "status": 0,
   *   "season": "2026"
   * }
   */
  create(dto: CreateChampionshipDto): Observable<Championship> {
    return this.api.post<Championship>('championships', dto).pipe(
      map(c => this.parseChampionshipDates(c)),
      catchError(e => this.handleError('Error creating championship', e)),
    );
  }

  /**
   * Update tipado del campeonato.
   *
   * Usa el mismo contrato de UPDATE (PUT):
   * PUT /championships/:id
   * Respuesta real corta: `{ id, name, status, season }`.
   */
  update(id: string, dto: UpdateChampionshipDto): Observable<Championship> {
    return this.api.put<Championship>(`championships/${id}`, dto).pipe(
      map(c => this.parseChampionshipDates(c)),
      catchError(e => this.handleError('Error updating championship', e)),
    );
  }

  /**
    * Actualiza parcialmente un campeonato.
   *
   * Contrato real:
    * PATCH /championships/:id
   *
   * Body esperado (ejemplo):
   * {
    *   "name": "Torneo Apertura 2026 - Patch",
    *   "maxTeams": 18
   * }
   *
   * Respuesta real:
   * {
   *   "id": "019d76ac-db7f-7a5c-9497-4b23e5139497",
    *   "name": "Torneo Apertura 2026 - Patch",
   *   "status": 0,
   *   "season": "2024-2025"
   * }
   */
  patch(id: string, championship: Partial<Championship>): Observable<Championship> {
    return this.api.patch<Championship>(`championships/${id}`, championship).pipe(
      map((c) => this.parseChampionshipDates(c)),
      catchError((error) => this.handleError('Error updating championship', error)),
    );
  }



  /**
   * Elimina (soft-delete) un campeonato.
   *
   * Contrato real:
   * DELETE /championships/:id
   *
   * Respuesta real:
   * {
   *   "message": "Championship deactivated successfully",
   *   "id": "019d76ac-db7f-7a5c-9497-4b23e5139497",
   *   "mode": "soft-delete"
   * }
   */
  delete(id: string): Observable<void> {
    return this.api.delete<void>(`championships/${id}`).pipe(
      catchError(e => this.handleError('Error deleting championship', e)),
    );
  }

  // ── Phase CRUD ─────────────────────────────────────────────────────────

  /**
   * Lista fases de un campeonato.
   *
   * Contrato real:
   * GET /championships/:championshipId/phases
   *
   * Respuesta real:
   * [
   *   {
   *     "id": 9,
   *     "championshipId": "019d7662-8584-7b73-8917-cdabb53e4bc5",
   *     "name": "Fase Suiza",
   *     "phaseType": "swiss",
   *     "phaseOrder": 1,
   *     "status": "pending",
   *     "isActive": true,
   *     "configuration": null
   *   }
   * ]
   */
  getPhases(championshipId: string): Observable<Phase[]> {
    return this.api.get<unknown>('phases/all', { championshipId }).pipe(
      map((response) => this.extractCollection(response, 'phases') as BackendPhase[]),
      map((items) => items.map((item) => this.mapBackendPhase(item))),
      catchError((error) => this.handleError('Error fetching phases', error)),
    );
  }

  /**
   * GET /championships/:id/fixture
   * Devuelve el fixture agrupado por fase y ronda.
   * Filters opcionales: phaseId, round.
   */
  getFixture(
    championshipId: string,
    filters?: { phaseId?: number; round?: number },
  ): Observable<ChampionshipFixture> {
    const params: Record<string, string | number> = {};
    if (filters?.phaseId != null) params['phaseId'] = filters.phaseId;
    if (filters?.round != null) params['round'] = filters.round;
    return this.api.get<ChampionshipFixture>(
      `championships/${championshipId}/fixture`,
      params,
    ).pipe(
      catchError((error) => this.handleError('Error fetching fixture', error)),
    );
  }

  /**
   * GET /championships/:id/leaders
   *
   * Devuelve los líderes individuales del campeonato, calculados
   * desde match_events reales filtrando por phases.championshipId.
   *
   * Respuesta backend:
   * {
   *   championshipId, championshipName,
   *   leaders: {
   *     topScorer, topAssist, topMvp,
   *     topPenaltyScorer, topYellowCards, topRedCards
   *   }
   * }
   * Cada leader = { playerId, playerName, teamId, teamName, value } | null.
   */
  getLeaders(championshipId: string): Observable<ChampionshipLeaders> {
    return this.api.get<ChampionshipLeaders>(
      `championships/${championshipId}/leaders`,
    ).pipe(
      catchError((error) => this.handleError('Error fetching leaders', error)),
    );
  }

    /**
     * GET /championships/:id/standings
     *
     * Devuelve la tabla de posiciones del campeonato.
     * Se espera un arreglo de filas, una por equipo/fase.
     */
    getStandings(championshipId: string): Observable<ChampionshipStanding[]> {
      return this.api.get<ChampionshipStandingsResponse | ChampionshipStanding[]>(
        `championships/${championshipId}/standings`,
      ).pipe(
        map((res) => Array.isArray(res) ? res : (res?.standings ?? [])),
        catchError((error) => this.handleError('Error fetching standings', error)),
      );
    }

  /**
   * POST /phases/:phaseId/fixture
   * Genera los partidos del fixture para una fase.
   * El backend activa la fase (status → active) al terminar.
   */
  generateFixture(
    phaseId: number,
    params?: { startDate?: string; matchIntervalDays?: number; venue?: string; city?: string },
  ): Observable<{ phaseId: number; phaseName: string; phaseType: string; totalMatches: number }> {
    return this.api.post<{ phaseId: number; phaseName: string; phaseType: string; totalMatches: number }>(
      `phases/${phaseId}/fixture`,
      params ?? {},
    ).pipe(
      catchError((error) => this.handleError('Error generating fixture', error)),
    );
  }

  /**
   * Crea fases en bloque para un campeonato.
   *
   * Contrato real:
   * POST /phases/championship/:championshipId/bulk
   *
   * Body esperado:
   * [
   *   {
   *     name: string,
   *     phaseType: string,
   *     phaseOrder: number,
   *     status: string,
   *     isActive: boolean,
   *     config: Record<string, unknown>
   *   }
   * ]
   *
   * Nota: este método es BULK CREATE (agrega nuevas fases).
   * No reemplaza ni elimina fases existentes.
   */
  savePhases(championshipId: string, phases: CreatePhaseDto[]): Observable<Phase[]> {
    const payload = phases.map((phase, index) => this.toPhaseBulkCreatePayload(phase, index + 1));

    return this.api.post<BackendPhase[] | { phases: BackendPhase[] }>(
      `phases/championship/${championshipId}/bulk`,
      payload,
    ).pipe(
      map((response) => Array.isArray(response) ? response : response.phases ?? []),
      map((items) => items.map((item) => this.mapBackendPhase(item))),
      catchError((error) => this.handleError('Error bulk creating phases', error)),
    );
  }

  createPhase(dto: CreatePhaseApiDto): Observable<Phase> {
    return this.api.post<BackendPhase>('phases', dto).pipe(
      map((phase) => this.mapBackendPhase(phase)),
      catchError((error) => this.handleError('Error creating phase', error)),
    );
  }

  updatePhase(id: number, dto: UpdatePhaseApiDto): Observable<Phase> {
    return this.api.put<BackendPhase>(`phases/${id}`, dto).pipe(
      map((phase) => this.mapBackendPhase(phase)),
      catchError((error) => this.handleError('Error updating phase', error)),
    );
  }

  patchPhase(id: number, dto: PatchPhaseApiDto): Observable<Phase> {
    return this.api.patch<BackendPhase>(`phases/${id}`, dto).pipe(
      map((phase) => this.mapBackendPhase(phase)),
      catchError((error) => this.handleError('Error patching phase', error)),
    );
  }

  deletePhase(id: number): Observable<void> {
    return this.api.delete<void>(`phases/${id}`).pipe(
      catchError((error) => this.handleError('Error deleting phase', error)),
    );
  }

  // ── Rules CRUD ─────────────────────────────────────────────────────────

  getDefaultRules(sportId: number): Observable<ChampionshipRulesResponse> {
    return this.api.get<unknown>('match-rules/all', { sportId }).pipe(
      map((response) => {
        const rules = this.extractCollection(response, 'matchRules') as BackendMatchRule[];

        return {
          championshipId: 0,
          sportId,
          // NOTE: El backend no tiene source of truth para `defaultValue`/`value`
          // a nivel de regla global (schema `match_rules` sólo guarda {id, name};
          // `sport_match_rules` es un join puro sin columna de valor). El único
          // valor real vive en `match_rules_championship_sports.value` (override
          // por campeonato) y se mergea en getRules(). Aquí `defaultValue` es
          // sólo un placeholder hasta que exista una fuente real en DB.
          rules: rules.map((rule) => {
            const base = this.toNumeric(rule.defaultValue ?? rule.value ?? 0, 0);
            return {
              matchRuleId: rule.id,
              name: rule.name,
              defaultValue: base,
              currentValue: base,
              isOverridden: false,
            };
          }),
        };
      }),
      catchError((error) => this.handleError('Error fetching default rules', error)),
    );
  }

  getRules(championshipId: string): Observable<ChampionshipRulesResponse> {
    return this.getChampionshipById(championshipId).pipe(
      switchMap((detail) => {
        const sportId = Number(detail.sportId);
        return forkJoin({
          defaults: this.getDefaultRules(sportId),
          overrides: this.api.get<unknown>('match-rules-championship-sports', { championshipId, sportId }).pipe(
            map((r) => this.extractCollection(r, 'items') as { matchRulesId: number; value: number }[]),
            catchError(() => of([] as { matchRulesId: number; value: number }[])),
          ),
        }).pipe(
          map(({ defaults, overrides }) => {
            const overrideMap = new Map(overrides.map(o => [Number(o.matchRulesId), Number(o.value)]));
            return {
              ...defaults,
              championshipId,
              rules: defaults.rules.map(rule => {
                const overrideValue = overrideMap.get(Number(rule.matchRuleId));
                if (overrideValue === undefined) return rule;
                return { ...rule, currentValue: overrideValue, isOverridden: overrideValue !== rule.defaultValue };
              }),
            };
          }),
        );
      }),
      catchError((error) => this.handleError('Error fetching rules', error)),
    );
  }

  updateRules(
    championshipId: string,
    patches: CreateChampionshipMatchRuleDto[],
  ): Observable<ChampionshipRulesResponse> {
    const body = {
      rules: patches.map(p => ({
        matchRulesId: p.matchRuleId,  // backend usa matchRulesId (con s)
        sportId: p.sportId,
        value: p.value,
      })),
    };
    return this.api.patch<{ championshipId: string; updated: number; rules: unknown[] }>(
      `championships/${championshipId}/rules`,
      body,
    ).pipe(
      map(response => ({
        championshipId,
        sportId: patches[0]?.sportId ?? 1,
        rules: (response.rules ?? []).map((r: any) => ({
          matchRuleId: r.matchRulesId ?? r.matchRuleId ?? r.id,
          name: r.name ?? `Regla ${r.matchRulesId ?? r.id}`,
          defaultValue: Number(r.defaultValue ?? r.value ?? 0),
          currentValue: Number(r.value ?? r.currentValue ?? 0),
          isOverridden: true,
        })),
      })),
      catchError((error) => this.handleError('Error updating rules', error)),
    );
  }

  // ── Team CRUD ──────────────────────────────────────────────────────────

  getTeams(championshipId: string): Observable<TeamProfile[]> {

    return this.api.get<unknown>('teams/all', { championshipId }).pipe(
      map((response) => this.extractCollection(response, 'teams')),
      switchMap((teams) => {
        if (teams.length === 0) {
          return of([] as TeamProfile[]);
        }

        return forkJoin(
          teams.map((team, index) => {
            const normalized = this.normalizeTeamProfile(team, championshipId);
            const teamId = String((team as Record<string, unknown>)['id'] ?? normalized.id ?? index + 1);

            return this.getPlayersByTeamId(teamId).pipe(
              map((players) => ({
                ...normalized,
                players,
              })),
            );
          }),
        );
      }),
      catchError((error) => this.handleError('Error fetching teams', error)),
    );
  }

  saveTeams(championshipId: string, teams: ({ name: string; shortname: string; slug: string; logoUrl?: string; documentUrl?: string; primaryColor?: string; secondaryColor?: string; foundedYear?: number; homeVenue?: string; location?: string; coachName?: string; coachPhone?: string; players?: any[] })[]): Observable<TeamProfile[]> {
    if (teams.length === 0) return of([]);

    // POST /teams acepta players[] inline — no hace falta POST /players por separado
    type TeamResult = { profile: TeamProfile | null; isDuplicate: boolean };

    const creates = teams.map(t =>
      this.api.post<Record<string, unknown>>('teams', { ...t, championshipId }).pipe(
        map(saved => ({
          profile: this.normalizeTeamProfile(saved, championshipId),
          isDuplicate: false,
        } as TeamResult)),
        catchError(e => {
          const status = (e as { status?: number }).status;
          const msg = String((e as Error).message ?? '').toLowerCase();
          const isDuplicate = status === 409 || msg.includes('exist') || msg.includes('duplicate') || msg.includes('already');
          return of<TeamResult>({ profile: null, isDuplicate });
        }),
      ),
    );

    return forkJoin(creates).pipe(
      map(results => results.filter(r => r.profile !== null).map(r => r.profile!)),
    );
  }

  createTeam(dto: TeamUpsertDto): Observable<TeamProfile> {
    return this.api.post<unknown>('teams', dto).pipe(
      map((response) => this.normalizeTeamProfile(response, dto.championshipId)),
      catchError((error) => this.handleError('Error creating team', error)),
    );
  }

  updateTeam(teamId: string, dto: Partial<TeamUpsertDto>): Observable<TeamProfile> {
    return this.api.put<unknown>(`teams/${teamId}`, dto).pipe(
      map((response) => this.normalizeTeamProfile(response, String(dto.championshipId ?? ''))),
      catchError((error) => this.handleError('Error updating team', error)),
    );
  }

  deactivateTeam(teamId: string): Observable<void> {
    return this.api.patch<void>(`teams/${teamId}/deactivate`, {}).pipe(
      catchError(e => this.handleError('Error deactivating team', e)),
    );
  }

  deleteTeam(teamId: string): Observable<void> {
    return this.api.delete<void>(`teams/${teamId}`).pipe(
      catchError((error) => this.handleError('Error deleting team', error)),
    );
  }

  // ── Player CRUD ────────────────────────────────────────────────────────

  createPlayer(dto: PlayerUpsertDto): Observable<Player> {
    return this.api.post<Player>('players', dto).pipe(
      catchError((error) => this.handleError('Error creating player', error)),
    );
  }

  updatePlayer(playerId: string, dto: Partial<PlayerUpsertDto>): Observable<Player> {
    return this.api.put<Player>(`players/${playerId}`, dto).pipe(
      catchError((error) => this.handleError('Error updating player', error)),
    );
  }

  deletePlayer(playerId: string): Observable<void> {
    return this.api.delete<void>(`players/${playerId}`).pipe(
      catchError((error) => this.handleError('Error deleting player', error)),
    );
  }

  uploadFile(file: File): Observable<{ key: string; bucket: string; size: number; contentType: string }> {
    console.log('📤 uploadFile called with:', { file, fileName: file?.name, fileSize: file?.size, fileType: file?.type });
    const formData = new FormData();
    formData.append('file', file);
    console.log('📤 FormData entries:', Array.from(formData.entries()));
    return this.api.post<{ key: string; bucket: string; size: number; contentType: string }>('files/upload', formData).pipe(
      catchError((error) => this.handleError('Error uploading file', error)),
    );
  }

  /**
   * Solicita URLs firmadas para subida directa desde frontend a R2.
   *
   * Payload enviado:
   * { uploads: [{ key: string, mimeType: string }, ...] }
   *
   * Respuesta esperada:
   * - { key1: 'https://signed-url-1', key2: 'https://signed-url-2' }
   * o
   * - { uploads: { key1: 'https://signed-url-1', key2: 'https://signed-url-2' } }
   */
  requestSignedUploadUrls(uploads: Array<{ key: string; mimeType: string }>): Observable<Record<string, string>> {
    const normalized = Array.from(
      new Map(
        uploads
          .filter(u => u.key && u.key.trim())
          .map(u => [u.key.trim(), { key: u.key.trim(), mimeType: u.mimeType }])
      ).values()
    );
    if (normalized.length === 0) return of({});
    return this.api.post<unknown>('files/generate-presigned-urls', { uploads: normalized }).pipe(
      map((response) => {
        return this.extractSignedUploadMap(response);
      }
      ),
      catchError((error) => this.handleError('Error requesting signed upload urls', error)),
    );
  }

  /**
   * Ejecuta PUT directo al signed URL de R2 (sin baseUrl de API).
   */
  uploadFileToSignedUrl(signedUrl: string, file: File): Observable<void> {

    return this.http.put(signedUrl, file).pipe(
      map(() => void 0),
      catchError((error) => this.handleError('Error uploading file to signed url', error)),
    );
  }

  // ── Social Links CRUD ──────────────────────────────────────────────────

  loadSocialNetworks(): void {
    if (this.loaded.socialNetworks) return;
    this.loaded.socialNetworks = true;
    this._loadingSocialNetworks.set(true);

    this.api.get<SocialNetwork[]>('social-networks').subscribe({
      next: data => {
        this._socialNetworks.set(data);
        this._loadingSocialNetworks.set(false);
      },
      error: () => {
        this.loaded.socialNetworks = false; // permitir reintento
        this._loadingSocialNetworks.set(false);
      },
    });
  }

  getSocialNetworks(): Observable<SocialNetwork[]> {
    return this.api.get<SocialNetwork[]>('social-networks').pipe(
      catchError(() => of([] as SocialNetwork[])),
    );
  }

  /**
   * Carga en memoria el catálogo de posiciones por deporte.
   *
   * Contrato real:
   * GET /positions?sportId=:sportId
   */
  loadPositions(sportId: number): void {
    const normalizedSportId = Number(sportId);
    if (!Number.isFinite(normalizedSportId) || normalizedSportId <= 0) return;
    if (this.loaded.positionsBySport.has(normalizedSportId)) return;

    this.loaded.positionsBySport.add(normalizedSportId);
    this._loadingPositions.set(true);

    this.getPositions(normalizedSportId).subscribe({
      next: (data) => {
        this._positions.set(data);
        this._loadingPositions.set(false);
      },
      error: () => {
        this.loaded.positionsBySport.delete(normalizedSportId); // permitir reintento
        this._loadingPositions.set(false);
      },
    });
  }

  getPositions(sportId: number): Observable<Position[]> {
    return this.api.get<unknown>('positions', { sportId }).pipe(
      map((response) => {
        const items = this.extractCollection(response, 'positions');
        return items.map((item) => item as Position);
      }),
      catchError(() => of([] as Position[])),
    );
  }

  getSocialLinks(championshipId: string): Observable<SocialLink[]> {
    const params = {
      championshipId,
      isActive: true,
    };

    return this.api.get<unknown>('social-links/all', params).pipe(
      map((response) => this.extractCollection(response, 'socialLinks') as SocialLink[]),
      catchError(() => of([] as SocialLink[])),
    );
  }

  saveSocialLinks(championshipId: string, links: CreateSocialLinkDto[]): Observable<SocialLink[]> {
    return this.replaceSocialLinks(championshipId, links);
  }

  replaceSocialLinks(championshipId: string, links: CreateSocialLinkDto[]): Observable<SocialLink[]> {
    const uniqueByNetwork = new Map<DbId, CreateSocialLinkDto>();
    for (const link of links) {
      const normalized = link.link.trim();
      if (!normalized) continue;
      if (!uniqueByNetwork.has(link.socialNetworkId)) {
        uniqueByNetwork.set(link.socialNetworkId, {
          socialNetworkId: link.socialNetworkId,
          link: normalized,
        });
      }
    }

    const desired = Array.from(uniqueByNetwork.values());

    return this.getSocialLinks(championshipId).pipe(
      switchMap((existing) => {
        // Normalizar a string para evitar fallos de lookup number vs string
        const existingByNetwork = new Map<string, SocialLink>();
        for (const item of existing) {
          existingByNetwork.set(String(item.socialNetworkId), item);
        }

        const toUpsert = desired.map((item) => {
          const payload: SocialLinkUpsertPayload = {
            championshipId,
            socialNetworkId: item.socialNetworkId,
            link: item.link,
            isActive: true,
          };
          const existingItem = existingByNetwork.get(String(item.socialNetworkId));
          if (existingItem) {
            console.log("Updating social link", existingItem);
            return this.api.put<SocialLink>(`social-links/${existingItem.id}`, {
              socialNetworkId: item.socialNetworkId,
              link: item.link,
              isActive: true,
            });
          }
          return this.api.post<SocialLink>('social-links', payload);
        });

        const desiredNetworks = new Set(desired.map((item) => String(item.socialNetworkId)));
        const toDelete = existing
          .filter((item) => !desiredNetworks.has(String(item.socialNetworkId)))
          .map((item) => this.api.delete<void>(`social-links/${item.id}`));

        const operations: Observable<unknown>[] = [...toUpsert, ...toDelete];
        if (operations.length === 0) {
          return of([] as SocialLink[]);
        }

        return forkJoin(operations).pipe(
          switchMap(() => this.getSocialLinks(championshipId)),
        );
      }),
      catchError((error) => this.handleError('Error replacing social links', error)),
    );
  }

  // ── Privados ────────────────────────────────────────────────────────────

  /**
   * Adapta el DTO interno al payload de bulk create requerido por backend.
   */
  private toPhaseBulkCreatePayload(phase: CreatePhaseDto, fallbackOrder: number): {
    name: string;
    phaseType: string;
    phaseOrder: number;
    status: string;
    isActive: boolean;
    config: Record<string, unknown>;
  } {
    const phaseType = String(phase.phaseType ?? PhaseType.Swiss).toLowerCase();

    return {
      name: phase.name,
      phaseType,
      phaseOrder: phase.phaseOrder || fallbackOrder,
      status: phase.status ?? PhaseStatus.Pending,
      isActive: true,
      config: this.getPhaseBulkConfig(phase, phaseType),
    };
  }

  /**
   * Deriva config según tipo de fase.
   * Acepta "playoff" como alias de knockout para compatibilidad.
   */
  private getPhaseBulkConfig(phase: CreatePhaseDto, phaseType: string): Record<string, unknown> {
    if (phaseType === PhaseType.Knockout || phaseType === 'playoff') {
      return { ...(phase.knockoutConfig ?? {}) };
    }
    if (phaseType === PhaseType.Groups) {
      return { ...(phase.groupsConfig ?? {}) };
    }
    if (phaseType === PhaseType.League) {
      return { ...(phase.leagueConfig ?? {}) };
    }

    return { ...(phase.swissConfig ?? {}) };
  }

  private mapBackendPhase(phase: BackendPhase): Phase {
    const normalizedType = this.normalizePhaseType(phase.phaseType);
    const swiss = (phase.swissConfig ?? phase.swiss ?? phase.configuration) as
      | Record<string, unknown>
      | null
      | undefined;
    return {
      id: phase.id,
      championshipId: phase.championshipId,
      name: phase.name,
      phaseType: normalizedType,
      phaseOrder: Number(phase.phaseOrder) || 1,
      status: this.normalizePhaseStatus(phase.status),
      isActive: Boolean(phase.isActive ?? true),
      swissConfig: normalizedType === PhaseType.Swiss && swiss
        ? {
          id: Number(swiss['id'] ?? phase.id),
          phaseId: Number(swiss['phaseId'] ?? phase.id),
          numRounds: Number(swiss['numRounds'] ?? 1),
          pairingSystem: String(swiss['pairingSystem'] ?? 'dutch'),
          firstRound: String(swiss['firstRound'] ?? 'random'),
          allowRematch: Boolean(swiss['allowRematch'] ?? false),
          tiebreakOrder: String(swiss['tiebreakOrder'] ?? ''),
          directAdvancedCount: Number(swiss['directAdvancedCount'] ?? 0),
          playoffCount: Number(swiss['playoffCount'] ?? 0),
        }
        : undefined,
    };
  }

  private normalizePhaseType(value: string): PhaseType {
    const normalized = value.trim().toLowerCase();
    if (normalized === PhaseType.League) return PhaseType.League;
    if (normalized === PhaseType.Knockout) return PhaseType.Knockout;
    if (normalized === PhaseType.Groups) return PhaseType.Groups;
    return PhaseType.Swiss;
  }

  private normalizePhaseStatus(value: string): PhaseStatus {
    const normalized = value.trim().toLowerCase();
    if (normalized === PhaseStatus.Active) return PhaseStatus.Active;
    if (normalized === PhaseStatus.Finished) return PhaseStatus.Finished;
    return PhaseStatus.Pending;
  }

  private normalizeTeamProfile(team: unknown, championshipId: string): TeamProfile {
    const source = team as Record<string, unknown>;
    const players = this.normalizePlayers(source['players']);

    return {
      id: source['id'] as DbId,
      championshipId: (source['championshipId'] ?? championshipId) as DbId,
      name: String(source['name'] ?? ''),
      shortname: String(source['shortname'] ?? ''),
      slug: String(source['slug'] ?? ''),
      logoUrl: (source['logoUrl'] ?? null) as string | null,
      documentUrl: (source['documentUrl'] ?? source['documentURL'] ?? null) as string | null,
      primaryColor: (source['primaryColor'] ?? null) as string | null,
      secondaryColor: (source['secondaryColor'] ?? null) as string | null,
      foundedYear: (source['foundedYear'] ?? null) as number | null,
      homeVenue: (source['homeVenue'] ?? null) as string | null,
      location: (source['location'] ?? null) as string | null,
      coachName: (source['coachName'] ?? null) as string | null,
      coachPhone: (source['coachPhone'] ?? null) as string | null,
      isActive: Boolean(source['isActive'] ?? source['isTeamActive'] ?? true),
      hasActiveMatches: Boolean(source['hasActiveMatches'] ?? false),
      createdAt: source['createdAt'] ? new Date(String(source['createdAt'])) : new Date(),
      updatedAt: source['updatedAt'] ? new Date(String(source['updatedAt'])) : new Date(),
      players,
      groups: (source['groups'] as TeamProfile['groups']) ?? [],
      stats:
        (source['stats'] as TeamProfile['stats']) ?? {
          teamId: source['id'] as DbId,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0,
        },
    };
  }

  private normalizePlayers(value: unknown): Player[] {
    if (!Array.isArray(value)) {
      return [];
    }
    return value as Player[];
  }

  private getPlayersByTeamId(teamId: string): Observable<Player[]> {
    return this.api.get<unknown>('players/all', { teamId }).pipe(
      map((response) => this.extractCollection(response, 'players') as Player[]),
      catchError(() => of([])),
    );
  }

  private extractCollection(response: unknown, key: string): unknown[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (response && typeof response === 'object') {
      const boxed = response as Record<string, unknown>;
      // Intentar la clave específica primero, luego 'items' como fallback genérico
      for (const k of [key, 'items']) {
        const value = boxed[k];
        if (Array.isArray(value)) {
          return value;
        }
      }
    }

    return [];
  }

      private extractSignedUploadMap(response: unknown): Record<string, string> {
    if (!response || typeof response !== 'object') {
      return {};
    }

    const boxed = response as Record<string, unknown>;
    const candidate =
      boxed['uploads'] && typeof boxed['uploads'] === 'object'
        ? (boxed['uploads'] as Record<string, unknown>)
        : boxed;

    const out: Record<string, string> = {};

    for (const [key, value] of Object.entries(candidate)) {
      if (typeof value === 'string' && value.trim()) {
        out[String(key)] = value;
        continue;
      }

      if (value && typeof value === 'object') {
        const nested = value as Record<string, unknown>;
        const signedUrl =
          nested['signedUrl'] ??
          nested['url'] ??
          nested['uploadUrl'] ??
          nested['presignedUrl'];

        if (typeof signedUrl === 'string' && signedUrl.trim()) {
          out[String(key)] = signedUrl;
        }
      }
    }

    return out;
  }

  private parseChampionshipDates(championship: Championship): Championship {
    return {
      ...championship,
      registrationStartDate: this.toDateOrNull(championship.registrationStartDate),
      registrationEndDate: this.toDateOrNull(championship.registrationEndDate),
      startDate: this.toDateOrNull(championship.startDate),
      endDate: this.toDateOrNull(championship.endDate),
      createdAt: this.toDate(championship.createdAt),
      updatedAt: this.toDate(championship.updatedAt),
    };
  }

  private toDate(value: unknown): Date {
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? new Date() : value;
    }

    const parsed = new Date(String(value));
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  private toDateOrNull(value: unknown): Date | null {
    if (value == null || value === '') {
      return null;
    }

    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }

    const parsed = new Date(String(value));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private toNumeric(value: unknown, fallback = 0): number {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : fallback;
    }

    if (typeof value === 'string') {
      const n = Number(value);
      return Number.isFinite(n) ? n : fallback;
    }

    return fallback;
  }

  private handleError(message: string, error: unknown): Observable<never> {
    console.error(message, error);
    const errorMessage =
      error instanceof Error ? error.message : String(error ?? 'Unknown error');
    return throwError(() => new Error(`${message}: ${errorMessage}`));
  }
}
