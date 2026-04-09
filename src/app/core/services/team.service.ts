import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {
  TeamApiResponse,
  TeamPagedResponse,
  UpdateTeamApiDto,
  TeamProfile,
} from '../models/team.model';

import {
  Player,
  CreatePlayerDto,
  PlayerApiPaginatedResponse,
  PlayerApiResponse
} from '../models/player.model';
import { ApiEndpoints } from '@core/constants/endpoints.const';

export interface CsvImportResult {
  teamsImported: number;
  playersImported: number;
  teamsSkipped: string[];
  playersSkipped: string[];
  warnings: string[];
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private api = inject(ApiService);

  // ─────────────────────────────────────────
  // GET /teams (PAGINADO + FILTROS)
  // Backend confirmado:
  //   GET /teams?page=&limit=&organizationId=&championshipId=
  // ─────────────────────────────────────────
  getTeams(
    page = 1,
    limit = 10,
    filters?: { organizationId?: string; championshipId?: string }
  ): Observable<TeamPagedResponse> {
    const params: Record<string, string | number> = { page, limit };

    if (filters?.organizationId) params['organizationId'] = filters.organizationId;
    if (filters?.championshipId) params['championshipId'] = filters.championshipId;

    // Backend devuelve { page, limit, total, next, prev, teams: [] }, NO array plano.
    return this.api.get<TeamPagedResponse>('teams', params).pipe(
      catchError((error) => this.handleError('Error fetching teams', error))
    );
  }

  // ─────────────────────────────────────────
  // GET /teams/all
  // Backend confirmado:
  //   GET /teams/all?organizationId=&championshipId=
  // ─────────────────────────────────────────
  getAllTeams(filters?: {
    organizationId?: string;
    championshipId?: string;
  }): Observable<TeamApiResponse[]> {
    return this.api.get<TeamApiResponse[]>(ApiEndpoints.TEAMS.ALL, filters).pipe(
      catchError((error) => this.handleError('Error fetching all teams', error))
    );
  }

  // ─────────────────────────────────────────
  // Wrapper de compatibilidad frontend
  // ─────────────────────────────────────────
  getTeamsByOrganization(organizationId: string): Observable<TeamApiResponse[]> {
    return this.getAllTeams({ organizationId });
  }

  // ─────────────────────────────────────────
  // GET /teams/:id
  // Backend confirmado
  // ─────────────────────────────────────────
  getTeamById(id: string): Observable<TeamApiResponse> {
    return this.api.get<TeamApiResponse>(ApiEndpoints.TEAMS.BY_ID(id)).pipe(
      catchError((error) => this.handleError('Error fetching team', error))
    );
  }

  // ─────────────────────────────────────────
  // COMPOSICIÓN FRONT (NO BACKEND)
  // El backend no retorna players embebidos en el team.
  // ⚠️ GET /players?teamId= no filtra realmente en backend actual.
  // Por seguridad, players se deja vacío.
  // ─────────────────────────────────────────
  getTeamWithPlayers(id: string): Observable<TeamProfile> {
    return forkJoin({
      team: this.getTeamById(id),
      playersPaginated: this.getAllPlayers(id),
    }).pipe(
      map(({ team, playersPaginated }) => {
        return {
          id: team.id,
          name: team.name,
          shortname: team.shortname ?? '',

          championshipId: '',
          documentUrl: null,
          hasActiveMatches: false,

          slug: team.slug ?? '',
          logoUrl: team.logoUrl ?? null,
          primaryColor: team.primaryColor ?? null,
          secondaryColor: team.secondaryColor ?? null,
          foundedYear: team.foundedYear ?? null,
          homeVenue: team.homeVenue ? String(team.homeVenue) : null,
          location: team.location ?? null,
          coachName: team.coachName ?? null,
          coachPhone: team.coachPhone ?? null,
          isActive: team.isActive ?? true,

          createdAt: new Date(),
          updatedAt: new Date(),

          players: this.extractPlayers(playersPaginated),
          groups: [],

          stats: {
            teamId: team.id,
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
      }),
      catchError((error) =>
        this.handleError('Error fetching team with players', error)
      )
    );
  }

  private extractPlayers(playersPaginated: PlayerApiPaginatedResponse): Player[] {
    const players: Player[] = [];
    // TODO: Verify response.
    // This assumes all players are returned in the same page. If that ever changes on
    // the backend, this will break.

    // FIXME: Forced conversion, most fields are invalid.
    // I just need the name and ID of the player, so I'm leaving it like this for now.
    players.push(...playersPaginated.players.map((p) => {
      return {
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      } as Player;
    }));

    return players;
  }

  // ─────────────────────────────────────────
  // POST /teams NO DISPONIBLE
  // ─────────────────────────────────────────
  createTeam(): Observable<never> {
    return throwError(
      () => new Error('POST /teams no está disponible en el backend')
    );
  }

  // ─────────────────────────────────────────
  // PUT /teams/:id
  // Backend confirmado
  // ─────────────────────────────────────────
  updateTeam(
    id: string,
    team: UpdateTeamApiDto
  ): Observable<TeamApiResponse> {
    return this.api.put<TeamApiResponse>(`teams/${id}`, team).pipe(
      catchError((error) => this.handleError('Error updating team', error))
    );
  }

  // ─────────────────────────────────────────
  // DELETE /teams/:id
  // Backend confirmado
  // ─────────────────────────────────────────
  deleteTeam(id: string): Observable<void> {
    return this.api.delete<void>(`teams/${id}`).pipe(
      catchError((error) => this.handleError('Error deleting team', error))
    );
  }

  // ─────────────────────────────────────────
  // NO CONFIRMADO EN BACKEND COMO FILTRO FUNCIONAL
  // GET /players acepta la query teamId, pero el backend actual la ignora.
  // ─────────────────────────────────────────
  getPlayers(teamId: string): Observable<PlayerApiPaginatedResponse> {
    return this.api.get<PlayerApiPaginatedResponse>(ApiEndpoints.PLAYERS.BASE, { teamId }).pipe(
      catchError((error) => this.handleError('Error fetching players', error))
    );
  }

  getAllPlayers(teamId: string): Observable<PlayerApiPaginatedResponse> {
    return this.api.get<PlayerApiPaginatedResponse>(ApiEndpoints.PLAYERS.BASE, { teamId }).pipe(
      catchError((error) => this.handleError('Error fetching players', error))
    );
  }

  // ─────────────────────────────────────────
  // Se mantiene por compatibilidad
  // ─────────────────────────────────────────
  createPlayer(
    player: CreatePlayerDto & {
      teamId: string;
      championshipId: string;
      organizationId: string;
    }
  ): Observable<Player> {
    return this.api.post<Player>(ApiEndpoints.PLAYERS.BASE, player).pipe(
      catchError((error) => this.handleError('Error creating player', error))
    );
  }

  // ─────────────────────────────────────────
  // CSV IMPORT (placeholder seguro)
  // ─────────────────────────────────────────
  importFromCsv(
    championshipId: string,
    organizationId: string,
    csvContent: string
  ): Observable<CsvImportResult> {
    void championshipId;
    void organizationId;
    void csvContent;

    return of({
      teamsImported: 0,
      playersImported: 0,
      teamsSkipped: [],
      playersSkipped: [],
      warnings: [
        'Importación CSV no alineada todavía con el backend actual.',
      ],
    });
  }

  private handleError(message: string, error: unknown): Observable<never> {
    console.error(message, error);
    const errorMessage =
      error instanceof Error ? error.message : String(error ?? 'Unknown error');
    return throwError(() => new Error(`${message}: ${errorMessage}`));
  }
}
