import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ApiService } from './api.service';
import {
  Championship,
  ChampionshipApiResponse,
  ChampionshipDetail,
  ChampionshipListItem,
  ChampionshipStatus,
  ChampionshipRulesResponse,
  CreateChampionshipDto,
  CreateChampionshipMatchRuleDto,
  CreateSocialLinkDto,
  CreatePhaseDto,
  ChampionshipFiltersDto,
  PaginatedChampionships,
  Phase,
  PhaseStatus,
  SocialLink,
  SocialNetwork,
  UpdateChampionshipDto,
  UpdateChampionshipStatusDto,
} from '../models/championship.model';
import { CreateTeamDto, TeamProfile } from '../models/team.model';
import type { Player } from '../models/player.model';
import type { DbId } from '../models/db.types';

// ─────────────────────────────────────────────────────────────
// Local types (not in model)
// ─────────────────────────────────────────────────────────────

interface BackendChampionshipsPage {
  championships: Championship[];
  page: number;
  limit: number;
  total: number;
  next: string | null;
  prev: string | null;
}

// ─────────────────────────────────────────────────────────────
// localStorage keys (mocks pendientes de backend)
// ─────────────────────────────────────────────────────────────

const LS_PHASES = 'iceplay_phases';
const LS_RULES = 'iceplay_rules';
const LS_TEAMS = 'iceplay_teams';
const LS_SOCIAL_LINKS = 'iceplay_social_links';

// ─────────────────────────────────────────────────────────────
// Reglas por defecto por deporte (seed cuando no hay backend)
// ─────────────────────────────────────────────────────────────

type DefaultRule = ChampionshipRulesResponse['rules'][number];

const FOOTBALL_RULES: DefaultRule[] = [
  { matchRuleId: 1, name: 'max_players', defaultValue: 20, currentValue: 20, isOverridden: false },
  { matchRuleId: 2, name: 'min_players', defaultValue: 12, currentValue: 12, isOverridden: false },
  { matchRuleId: 3, name: 'max_substitutions', defaultValue: 5, currentValue: 5, isOverridden: false },
  { matchRuleId: 4, name: 'match_duration', defaultValue: 45, currentValue: 45, isOverridden: false },
  { matchRuleId: 5, name: 'yellow_cards_suspension', defaultValue: 3, currentValue: 3, isOverridden: false },
  { matchRuleId: 6, name: 'red_card_suspension', defaultValue: 1, currentValue: 1, isOverridden: false },
  { matchRuleId: 7, name: 'extra_time', defaultValue: 0, currentValue: 0, isOverridden: false },
  { matchRuleId: 8, name: 'penalty_shootout', defaultValue: 0, currentValue: 0, isOverridden: false },
  { matchRuleId: 9, name: 'allow_guest_players', defaultValue: 0, currentValue: 0, isOverridden: false },
];

const DEFAULT_RULES_BY_SPORT: Record<number, DefaultRule[]> = {
  1: FOOTBALL_RULES,
  2: FOOTBALL_RULES,
  3: FOOTBALL_RULES,
  4: FOOTBALL_RULES,
  5: FOOTBALL_RULES,
};

const SOCIAL_NETWORKS: SocialNetwork[] = [
  { id: 1, name: 'Facebook', icon: 'thumb_up' },
  { id: 2, name: 'Instagram', icon: 'photo_camera' },
  { id: 3, name: 'X', icon: 'close' },
  { id: 4, name: 'TikTok', icon: 'music_note' },
  { id: 5, name: 'YouTube', icon: 'smart_display' },
];

@Injectable({ providedIn: 'root' })
export class ChampionshipService {
  private api = inject(ApiService);

  // ── CRUD base ──────────────────────────────────────────────────────────

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

  // ── HTTP API (integración rama cup) ─────────────────────────────────────

  /**
   * Devuelve la lista plana de campeonatos filtrando por organización.
   *
   * ⚠️ Contrato real: GET /championships devuelve
   *   `{ championships, page, limit, total }`.
   * Se extrae `championships` del envoltorio de paginación.
   * Para acceder a los metadatos de paginación, usar `getAll()`.
   */
  getChampionships(organizationId?: string): Observable<Championship[]> {
    const params = organizationId ? { organizationId } : {};
    return this.api.get<BackendChampionshipsPage>('championships', params).pipe(
      map((response) => response.championships.map((c) => this.parseChampionshipDates(c))),
      catchError((error) => this.handleError('Error fetching championships', error)),
    );
  }

  getAllChampionships(): Observable<Championship[]> {
    return this.api.get<Championship[]>('championships/all').pipe(
      map((championships) => championships.map((c) => this.parseChampionshipDates(c))),
      catchError((error) => this.handleError('Error fetching championships', error)),
    );
  }

  /**
   * Obtiene el detalle de un campeonato por su UUID.
   *
   * ⚠️ Contrato real: GET /championships/:id devuelve SOLO
   *   `{ id, name, status, season }` — no el objeto Championship completo.
   * Los campos extra (fechas, etc.) llegarán como undefined.
   */
  getChampionshipDetail(id: string): Observable<Championship> {
    return this.api.get<Championship>(`championships/${id}`).pipe(
      map((championship) => this.parseChampionshipDates(championship)),
      catchError((error) => this.handleError('Error fetching championship details', error)),
    );
  }

  /**
   * Devuelve campeonatos activos.
   *
   * ⚠️ El backend NO garantiza filtrado por `status` en GET /championships.
   * Se aplica filtro en cliente como salvaguarda.
   * Para paginación correcta, usar `getAll({ status: ChampionshipStatus.Active })`.
   */
  getActiveChampionships(): Observable<Championship[]> {
    return this.api.get<BackendChampionshipsPage>('championships', { status: ChampionshipStatus.Active }).pipe(
      map((response) =>
        response.championships
          .map((c) => this.parseChampionshipDates(c))
          .filter((c) => c.status === ChampionshipStatus.Active),
      ),
      catchError((error) => this.handleError('Error fetching active championships', error)),
    );
  }

  /**
   * Obtiene un campeonato por UUID.
   *
   * ⚠️ Contrato real: GET /championships/:id devuelve SOLO
   *   `{ id, name, status, season }` — no el modelo Championship completo.
   * Los campos extra llegarán como undefined. Para el flujo principal
   * de detalle, usar `getById()`.
   */
  getChampionshipById(id: string): Observable<Championship> {
    return this.api.get<Championship>(`championships/${id}`).pipe(
      map((championship) => this.parseChampionshipDates(championship)),
      catchError((error) => this.handleError('Error fetching championship', error)),
    );
  }

  createChampionship(championship: Partial<Championship>): Observable<Championship> {
    return this.api.post<Championship>('championships', championship).pipe(
      map((c) => this.parseChampionshipDates(c)),
      catchError((error) => this.handleError('Error creating championship', error)),
    );
  }

  /**
   * Actualiza un campeonato.
   *
   * ⚠️ El backend solo expone PUT /championships/:id — no PATCH.
   * Se usa `api.put()` para coincidir con el método HTTP correcto.
   * Para actualizaciones parciales del frontend, enviar solo los campos
   * que cambian; el backend acepta Partial gracias a Zod.
   */
  updateChampionship(id: string, championship: Partial<Championship>): Observable<Championship> {
    return this.api.put<Championship>(`championships/${id}`, championship).pipe(
      map((c) => this.parseChampionshipDates(c)),
      catchError((error) => this.handleError('Error updating championship', error)),
    );
  }

  deleteChampionship(id: string): Observable<void> {
    return this.api
      .delete<void>(`championships/${id}`)
      .pipe(catchError((error) => this.handleError('Error deleting championship', error)));
  }

  getById(id: string): Observable<ChampionshipDetail> {
    return this.api.get<ChampionshipDetail>(`championships/${id}/detail`).pipe(
      map(c => ({ ...c, ...this.parseChampionshipDates(c) })),
      catchError(e => this.handleError('Error fetching championship', e)),
    );
  }

  create(dto: CreateChampionshipDto): Observable<Championship> {
    return this.api.post<Championship>('championships', dto).pipe(
      map(c => this.parseChampionshipDates(c)),
      catchError(e => this.handleError('Error creating championship', e)),
    );
  }

  update(id: string, dto: UpdateChampionshipDto): Observable<Championship> {
    return this.api.put<Championship>(`championships/${id}`, dto).pipe(
      map(c => this.parseChampionshipDates(c)),
      catchError(e => this.handleError('Error updating championship', e)),
    );
  }

  /**
   * Cambia el estado de un campeonato.
   *
   * ⚠️ CONTRATO REAL: PUT /championships/:id devuelve SOLO
   *   `{ id, name, status: number, season }`.
   * Callers NO deben reemplazar un Championship completo con esta respuesta.
   * Solo actualizar el campo `status` en el modelo local.
   */
  updateStatus(id: string, dto: UpdateChampionshipStatusDto): Observable<ChampionshipApiResponse> {
    return this.api.put<ChampionshipApiResponse>(`championships/${id}`, dto).pipe(
      catchError(e => this.handleError('Error updating championship status', e)),
    );
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`championships/${id}`).pipe(
      catchError(e => this.handleError('Error deleting championship', e)),
    );
  }

  // ── Sub-recursos ───────────────────────────────────────────────────────

  getPhases(championshipId: string): Observable<Phase[]> {
    return this.getById(championshipId).pipe(
      map(detail => detail.phases ?? []),
      catchError(e => this.handleError('Error fetching phases', e)),
    );
  }

  savePhases(championshipId: string, phases: CreatePhaseDto[]): Observable<Phase[]> {
    // ⚠️ NO BACKEND ENDPOINT — las fases solo se pueden configurar en /setup al crear.
    // Los cambios de fases en modo edición se guardan solo localmente (mock).
    const saved: Phase[] = phases.map((dto, i) => ({
      id: i + 1,
      championshipId: +championshipId,
      name: dto.name,
      phaseType: dto.phaseType,
      phaseOrder: dto.phaseOrder,
      status: dto.status ?? PhaseStatus.Pending,
      leagueConfig: dto.leagueConfig ? { id: i + 1, phaseId: i + 1, ...dto.leagueConfig } : undefined,
      knockoutConfig: dto.knockoutConfig ? { id: i + 1, phaseId: i + 1, ...dto.knockoutConfig } : undefined,
      groupsConfig: dto.groupsConfig ? { id: i + 1, phaseId: i + 1, ...dto.groupsConfig } : undefined,
      swissConfig: dto.swissConfig ? { id: i + 1, phaseId: i + 1, ...dto.swissConfig } : undefined,
    }));
    const record = this.readRecord<Phase[]>(LS_PHASES);
    record[championshipId] = saved;
    this.writeRecord(LS_PHASES, record);
    return of(saved);
  }

  getRules(championshipId: string): Observable<ChampionshipRulesResponse> {
    // 🔴 MOCK — pendiente endpoint GET /championships/:id/rules
    const record = this.readRecord<ChampionshipRulesResponse>(LS_RULES);
    const stored = record[championshipId];
    if (stored) return of(stored);
    return of({ championshipId: +championshipId, sportId: 1, rules: [] });
  }

  updateRules(
    championshipId: string,
    patches: CreateChampionshipMatchRuleDto[],
  ): Observable<ChampionshipRulesResponse> {
    // 🔴 MOCK — pendiente endpoint PATCH /championships/:id/rules
    const record = this.readRecord<ChampionshipRulesResponse>(LS_RULES);
    const current = record[championshipId] ?? {
      championshipId: +championshipId,
      sportId: patches[0]?.sportId ?? 1,
      rules: [],
    };
    for (const patch of patches) {
      const rule = current.rules.find(r => r.matchRuleId === patch.matchRuleId);
      if (rule) {
        rule.currentValue = patch.value;
        rule.isOverridden = patch.value !== rule.defaultValue;
      } else {
        current.rules.push({
          matchRuleId: patch.matchRuleId,
          name: `Regla ${patch.matchRuleId}`,
          defaultValue: patch.value,
          currentValue: patch.value,
          isOverridden: false,
        });
      }
    }
    record[championshipId] = current;
    this.writeRecord(LS_RULES, record);
    return of(current);
  }

  /** Reglas por defecto del deporte — usadas al crear un campeonato nuevo */
  getDefaultRules(sportId: number): Observable<ChampionshipRulesResponse> {
    // 🔴 MOCK — pendiente endpoint GET /sports/:sportId/default-rules
    const key = `iceplay_default_rules_sport_${sportId}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try { return of(JSON.parse(raw) as ChampionshipRulesResponse); } catch { /* fall through */ }
    }
    const defaults = DEFAULT_RULES_BY_SPORT[sportId] ?? DEFAULT_RULES_BY_SPORT[1];
    const response: ChampionshipRulesResponse = { championshipId: 0, sportId, rules: defaults };
    localStorage.setItem(key, JSON.stringify(response));
    return of(response);
  }

  getTeams(championshipId: string): Observable<TeamProfile[]> {
    return this.api.get<unknown>('teams', { championshipId }).pipe(
      map((response) => this.extractCollection(response, 'teams')),
      switchMap((teams) => {
        if (teams.length === 0) {
          return of([]);
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
      catchError(() => {
        // Fallback local para no bloquear edición si el endpoint falla temporalmente.
        const teams = this.readRecord<TeamProfile[]>(LS_TEAMS)[championshipId] ?? [];
        return of(teams);
      }),
    );
  }

  getSocialLinks(championshipId: string): Observable<SocialLink[]> {
    // 🔴 MOCK — pendiente endpoint GET /championships/:id/social-links
    return of(this.getStoredSocialLinks(championshipId));
  }

  saveSocialLinks(championshipId: string, links: CreateSocialLinkDto[]): Observable<SocialLink[]> {
    // 🔴 MOCK — pendiente endpoint PUT /championships/:id/social-links
    const uniqueByNetwork = new Map<DbId, CreateSocialLinkDto>();
    for (const link of links) {
      if (!link.link?.trim()) continue;
      if (!uniqueByNetwork.has(link.socialNetworkId)) {
        uniqueByNetwork.set(link.socialNetworkId, {
          socialNetworkId: link.socialNetworkId,
          link: link.link.trim(),
        });
      }
    }

    const saved: SocialLink[] = Array.from(uniqueByNetwork.values()).map((dto, index) => ({
      id: index + 1,
      championshipId: +championshipId,
      socialNetworkId: dto.socialNetworkId,
      link: dto.link,
      socialNetwork: SOCIAL_NETWORKS.find(n => n.id === dto.socialNetworkId),
    }));

    const record = this.readRecord<SocialLink[]>(LS_SOCIAL_LINKS);
    record[championshipId] = saved;
    this.writeRecord(LS_SOCIAL_LINKS, record);
    return of(saved);
  }

  saveTeams(championshipId: string, teams: (CreateTeamDto & { players?: any[] })[]): Observable<TeamProfile[]> {
    return this.api.post<TeamProfile[]>(`championships/${championshipId}/teams`, { teams }).pipe(
      catchError(e => this.handleError('Error saving teams', e)),
    );
  }

  // ── Privados ────────────────────────────────────────────────────────────

  private readRecord<T>(key: string): Record<string, T> {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    try { return JSON.parse(raw) as Record<string, T>; } catch { return {}; }
  }

  private writeRecord(key: string, data: Record<string, unknown>): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getStoredSocialLinks(championshipId: string): SocialLink[] {
    const stored = this.readRecord<SocialLink[]>(LS_SOCIAL_LINKS)[championshipId] ?? [];
    return stored.map(link => ({
      ...link,
      championshipId: +championshipId,
      socialNetwork: SOCIAL_NETWORKS.find(n => n.id === link.socialNetworkId),
    }));
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
    return this.api.get<unknown>('players', { teamId }).pipe(
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
      const value = boxed[key];
      if (Array.isArray(value)) {
        return value;
      }
    }

    return [];
  }

  private parseChampionshipDates(c: Championship): Championship {
    const parse = (v: Date | string | null): Date | null =>
      v && typeof v === 'string' ? new Date(v) : (v as Date | null);
    return {
      ...c,
      status: this.normalizeChampionshipStatus(c.status),
      startDate: parse(c.startDate),
      endDate: parse(c.endDate),
      registrationStartDate: parse(c.registrationStartDate),
      registrationEndDate: parse(c.registrationEndDate),
      createdAt: parse(c.createdAt) as Date,
      updatedAt: parse(c.updatedAt) as Date,
    };
  }

  private normalizeChampionshipStatus(status: Championship['status'] | string | number): ChampionshipStatus {
    if (typeof status === 'number') {
      if (status in ChampionshipStatus) {
        return status as ChampionshipStatus;
      }
      return ChampionshipStatus.Draft;
    }

    const normalized = String(status).trim().toLowerCase();
    const byName: Record<string, ChampionshipStatus> = {
      draft: ChampionshipStatus.Draft,
      registration: ChampionshipStatus.Registration,
      active: ChampionshipStatus.Active,
      finished: ChampionshipStatus.Finished,
      cancelled: ChampionshipStatus.Cancelled,
      '0': ChampionshipStatus.Draft,
      '1': ChampionshipStatus.Registration,
      '2': ChampionshipStatus.Active,
      '3': ChampionshipStatus.Finished,
      '4': ChampionshipStatus.Cancelled,
    };

    return byName[normalized] ?? ChampionshipStatus.Draft;
  }

  private handleError(message: string, error: unknown): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${(error as Error).message ?? String(error)}`));
  }
}
