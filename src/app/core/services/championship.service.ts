import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from './api.service';
import {
  Championship,
  ChampionshipDetail,
  ChampionshipListItem,
  ChampionshipRulesResponse,
  ChampionshipStatus,
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
import type { DbId } from '../models/db.types';

// ─────────────────────────────────────────────────────────────
// localStorage keys
// ─────────────────────────────────────────────────────────────

const LS_CHAMPIONSHIPS = 'iceplay_championships';
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
  1: FOOTBALL_RULES,   // Fútbol
  2: FOOTBALL_RULES,   // Básquetbol (misma estructura base)
  3: FOOTBALL_RULES,   // Voleibol
  4: FOOTBALL_RULES,   // Hockey
  5: FOOTBALL_RULES,   // Béisbol
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
    // 🔴 MOCK — localStorage
    let list = this.readList();
    if (filters?.organizationId !== undefined) list = list.filter(c => c.organizationId === filters.organizationId);
    if (filters?.sportId !== undefined) list = list.filter(c => c.sportId === filters.sportId);
    if (filters?.status) list = list.filter(c => c.status === filters.status);
    if (filters?.season) list = list.filter(c => c.season === filters.season);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.slug.includes(q));
    }
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 20;
    const start = (page - 1) * limit;
    const data = list.slice(start, start + limit) as unknown as ChampionshipListItem[];
    const totalPages = Math.ceil(list.length / limit) || 1;
    return of({ data, total: list.length, page, limit, totalPages });

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.get<PaginatedChampionships>('championships', filters as Record<string, unknown>).pipe(
    //   map(r => ({ ...r, data: r.data.map(c => this.parseChampionshipDates(c)) })),
    //   catchError(e => this.handleError('Error fetching championships', e)),
    // );
  }

  // ── HTTP API (integración rama cup) ─────────────────────────────────────

  getChampionships(organizationId?: string): Observable<Championship[]> {
    const params = organizationId ? { organizationId } : {};
    return this.api.get<Championship[]>('championships', params).pipe(
      map((championships) => championships.map((c) => this.parseChampionshipDates(c))),
      catchError((error) => this.handleError('Error fetching championships', error)),
    );
  }

  getAllChampionships(): Observable<Championship[]> {
    return this.api.get<Championship[]>('api/championships/all').pipe(
      map((championships) => championships.map((c) => this.parseChampionshipDates(c))),
      catchError((error) => this.handleError('Error fetching championships', error)),
    );
  }

  getChampionshipDetail(id: number): Observable<Championship> {
    return this.api.get<Championship>(`api/championships/${id}/detail`).pipe(
      map((championship) => this.parseChampionshipDates(championship)),
      catchError((error) => this.handleError('Error fetching championship details', error)),
    );
  }

  getActiveChampionships(): Observable<Championship[]> {
    return this.api.get<Championship[]>('championships', { status: 'active' }).pipe(
      map((championships) => championships.map((c) => this.parseChampionshipDates(c))),
      catchError((error) => this.handleError('Error fetching active championships', error)),
    );
  }

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

  updateChampionship(id: string, championship: Partial<Championship>): Observable<Championship> {
    return this.api.patch<Championship>(`championships/${id}`, championship).pipe(
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
    // 🔴 MOCK — localStorage
    const champ = this.readList().find(c => String(c.id) === id);
    if (!champ) return throwError(() => new Error(`Championship ${id} not found`));
    const teamsStored = this.readRecord<TeamProfile[]>(LS_TEAMS)[id] ?? [];
    const detail = {
      ...champ,
      organization: { id: champ.organizationId, name: 'Organización', logo: null },
      sport: { id: champ.sportId, name: 'Deporte', icon: 'sports' },
      socialLinks: this.getStoredSocialLinks(id),
      phases: this.readRecord<Phase[]>(LS_PHASES)[id] ?? [],
      matchRules: [],
      teamCount: teamsStored.length,
      activeMatchCount: 0,
    } as unknown as ChampionshipDetail;
    return of(detail);

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.get<ChampionshipDetail>(`championships/${id}`).pipe(
    //   map(c => ({ ...c, ...this.parseChampionshipDates(c) })),
    //   catchError(e => this.handleError('Error fetching championship', e)),
    // );
  }

  create(dto: CreateChampionshipDto): Observable<Championship> {
    // 🔴 MOCK — localStorage
    const list = this.readList();
    const nextId = list.length ? Math.max(...list.map(c => Number(c.id))) + 1 : 1;
    const now = new Date();
    const champ: Championship = {
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
      updatedAt: now,
    };
    this.writeList([...list, champ]);
    return of(champ);

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.post<Championship>('championships', dto).pipe(
    //   map(c => this.parseChampionshipDates(c)),
    //   catchError(e => this.handleError('Error creating championship', e)),
    // );
  }

  update(id: string, dto: UpdateChampionshipDto): Observable<Championship> {
    // 🔴 MOCK — localStorage
    const list = this.readList();
    const index = list.findIndex(c => String(c.id) === id);
    if (index === -1) return throwError(() => new Error(`Championship ${id} not found`));
    const updated: Championship = { ...list[index], ...dto, updatedAt: new Date() };
    list[index] = updated;
    this.writeList(list);
    return of(updated);

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.patch<Championship>(`championships/${id}`, dto).pipe(
    //   map(c => this.parseChampionshipDates(c)),
    //   catchError(e => this.handleError('Error updating championship', e)),
    // );
  }

  updateStatus(id: string, dto: UpdateChampionshipStatusDto): Observable<Championship> {
    // 🔴 MOCK — localStorage
    const list = this.readList();
    const index = list.findIndex(c => String(c.id) === id);
    if (index === -1) return throwError(() => new Error(`Championship ${id} not found`));
    const updated: Championship = { ...list[index], status: dto.status, updatedAt: new Date() };
    list[index] = updated;
    this.writeList(list);
    return of(updated);

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.patch<Championship>(`championships/${id}/status`, dto).pipe(
    //   map(c => this.parseChampionshipDates(c)),
    //   catchError(e => this.handleError('Error updating championship status', e)),
    // );
  }

  delete(id: string): Observable<void> {
    // 🔴 MOCK — localStorage
    this.writeList(this.readList().filter(c => String(c.id) !== id));
    return of(undefined);

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.delete<void>(`championships/${id}`).pipe(
    //   catchError(e => this.handleError('Error deleting championship', e)),
    // );
  }

  // ── Sub-recursos ───────────────────────────────────────────────────────

  getPhases(championshipId: string): Observable<Phase[]> {
    // 🔴 MOCK — localStorage
    const phases = this.readRecord<Phase[]>(LS_PHASES)[championshipId] ?? [];
    return of(phases);

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.get<Phase[]>(`championships/${championshipId}/phases`).pipe(
    //   catchError(e => this.handleError('Error fetching phases', e)),
    // );
  }

  savePhases(championshipId: string, phases: CreatePhaseDto[]): Observable<Phase[]> {
    // 🔴 MOCK — localStorage
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

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.put<Phase[]>(`championships/${championshipId}/phases`, phases).pipe(
    //   catchError(e => this.handleError('Error saving phases', e)),
    // );
  }

  getRules(championshipId: string): Observable<ChampionshipRulesResponse> {
    // 🔴 MOCK — localStorage
    const record = this.readRecord<ChampionshipRulesResponse>(LS_RULES);
    const stored = record[championshipId];
    if (stored) return of(stored);
    return of({ championshipId: +championshipId, sportId: 1, rules: [] });

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.get<ChampionshipRulesResponse>(`championships/${championshipId}/rules`).pipe(
    //   catchError(e => this.handleError('Error fetching rules', e)),
    // );
  }

  updateRules(
    championshipId: string,
    patches: CreateChampionshipMatchRuleDto[],
  ): Observable<ChampionshipRulesResponse> {
    // 🔴 MOCK — localStorage
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

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.patch<ChampionshipRulesResponse>(`championships/${championshipId}/rules`, patches).pipe(
    //   catchError(e => this.handleError('Error updating rules', e)),
    // );
  }

  /** Reglas por defecto del deporte — usadas al crear un campeonato nuevo */
  getDefaultRules(sportId: number): Observable<ChampionshipRulesResponse> {
    // 🔴 MOCK — seed fijo por deporte (no depende de localStorage)
    const key = `iceplay_default_rules_sport_${sportId}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try { return of(JSON.parse(raw) as ChampionshipRulesResponse); } catch { /* fall through */ }
    }
    const defaults = DEFAULT_RULES_BY_SPORT[sportId] ?? DEFAULT_RULES_BY_SPORT[1];
    const response: ChampionshipRulesResponse = { championshipId: 0, sportId, rules: defaults };
    localStorage.setItem(key, JSON.stringify(response));
    return of(response);

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.get<ChampionshipRulesResponse>(`sports/${sportId}/default-rules`).pipe(
    //   catchError(e => this.handleError('Error fetching default rules', e)),
    // );
  }

  getTeams(championshipId: string): Observable<TeamProfile[]> {
    // 🔴 MOCK — localStorage
    const teams = this.readRecord<TeamProfile[]>(LS_TEAMS)[championshipId] ?? [];
    return of(teams);

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.get<TeamProfile[]>(`championships/${championshipId}/teams`).pipe(
    //   catchError(e => this.handleError('Error fetching teams', e)),
    // );
  }

  getSocialLinks(championshipId: string): Observable<SocialLink[]> {
    // 🔴 MOCK — localStorage
    return of(this.getStoredSocialLinks(championshipId));

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.get<SocialLink[]>(`championships/${championshipId}/social-links`).pipe(
    //   catchError(e => this.handleError('Error fetching social links', e)),
    // );
  }

  saveSocialLinks(championshipId: string, links: CreateSocialLinkDto[]): Observable<SocialLink[]> {
    // 🔴 MOCK — localStorage
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

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.put<SocialLink[]>(`championships/${championshipId}/social-links`, links).pipe(
    //   catchError(e => this.handleError('Error saving social links', e)),
    // );
  }

  saveTeams(championshipId: string, teams: (CreateTeamDto & { players?: any[] })[]): Observable<TeamProfile[]> {
    // 🔴 MOCK — localStorage
    const now = new Date();
    const saved: TeamProfile[] = teams.map((dto, i) => ({
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
        points: 0,
      },
    }));
    const record = this.readRecord<TeamProfile[]>(LS_TEAMS);
    record[championshipId] = saved;
    this.writeRecord(LS_TEAMS, record);
    return of(saved);

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.put<TeamProfile[]>(`championships/${championshipId}/teams`, teams).pipe(
    //   catchError(e => this.handleError('Error saving teams', e)),
    // );
  }

  // ── Privados ────────────────────────────────────────────────────────────

  private readList(): Championship[] {
    const raw = localStorage.getItem(LS_CHAMPIONSHIPS);
    if (!raw) return [];
    try { return JSON.parse(raw) as Championship[]; } catch { return []; }
  }

  private writeList(list: Championship[]): void {
    localStorage.setItem(LS_CHAMPIONSHIPS, JSON.stringify(list));
  }

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

  private parseChampionshipDates(c: Championship): Championship {
    const parse = (v: Date | string | null): Date | null =>
      v && typeof v === 'string' ? new Date(v) : (v as Date | null);
    return {
      ...c,
      startDate: parse(c.startDate),
      endDate: parse(c.endDate),
      registrationStartDate: parse(c.registrationStartDate),
      registrationEndDate: parse(c.registrationEndDate),
      createdAt: parse(c.createdAt) as Date,
      updatedAt: parse(c.updatedAt) as Date,
    };
  }

  private handleError(message: string, error: unknown): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${(error as Error).message ?? String(error)}`));
  }
}
