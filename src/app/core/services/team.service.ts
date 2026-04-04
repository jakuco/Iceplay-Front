import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, forkJoin, of, from, throwError } from 'rxjs';
import { map, switchMap, mergeMap, toArray, catchError, tap } from 'rxjs/operators';

import {
  Team,
  TeamApiResponse,
  UpdateTeamApiDto,
  TeamProfile,
} from '../models/team.model';

import { Player, CreatePlayerDto } from '../models/player.model';

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
  // ✅ GET /team (PAGINADO + FILTROS)
  // ─────────────────────────────────────────
  getTeams(
    page = 1,
    limit = 10,
    filters?: { organizationId?: string; championshipId?: string }
  ): Observable<TeamApiResponse[]> {
    const params: any = { page, limit };

    if (filters?.organizationId) params.organizationId = filters.organizationId;
    if (filters?.championshipId) params.championshipId = filters.championshipId;

    return this.api.get<TeamApiResponse[]>('team', params).pipe(
      catchError((error) => this.handleError('Error fetching teams', error))
    );
  }

  // ─────────────────────────────────────────
  // ✅ GET /team/all
  // ─────────────────────────────────────────
  getAllTeams(filters?: {
    organizationId?: string;
    championshipId?: string;
  }): Observable<TeamApiResponse[]> {
    return this.api.get<TeamApiResponse[]>('team/all', filters).pipe(
      catchError((error) => this.handleError('Error fetching all teams', error))
    );
  }

  // ─────────────────────────────────────────
  // ✅ GET /team/:id
  // ─────────────────────────────────────────
  getTeamById(id: string): Observable<TeamApiResponse> {
    return this.api.get<TeamApiResponse>(`team/${id}`).pipe(
      catchError((error) => this.handleError('Error fetching team', error))
    );
  }

  // ─────────────────────────────────────────
  // ⚠️ COMPOSICIÓN FRONT (NO BACKEND)
  // ─────────────────────────────────────────
  getTeamWithPlayers(id: string): Observable<TeamProfile> {
  return forkJoin({
    team: this.getTeamById(id),
    players: this.getPlayers(id),
  }).pipe(
    map(({ team, players }) => {
      return {
        // 🔥 MAPEO CONTROLADO (NO SPREAD)
        id: team.id,
        name: team.name,
        shortname: team.shortname,

        // ⚠️ CAMPOS QUE EL BACKEND NO TIENE
        championshipId: '', // TODO: backend no lo devuelve
        documentUrl: null,
        hasActiveMatches: false,

        // ⚠️ OPCIONALES
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

        // ⚠️ FECHAS (no vienen del backend)
        createdAt: new Date(),
        updatedAt: new Date(),

        // RELACIONES
        players,
        groups: [],

        // STATS (frontend only)
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

  // ─────────────────────────────────────────
  // ❌ POST /team NO EXISTE
  // ─────────────────────────────────────────
  /**
   * TODO:
   * POST /team está comentado en el backend (routes.ts)
   * NO usar hasta que el endpoint sea habilitado.
   */
  createTeam(): Observable<never> {
    return throwError(
      () => new Error('POST /team no está disponible en el backend')
    );
  }

  // ─────────────────────────────────────────
  // ✅ PUT /team/:id
  // ─────────────────────────────────────────
  updateTeam(
    id: string,
    team: UpdateTeamApiDto
  ): Observable<TeamApiResponse> {
    return this.api.put<TeamApiResponse>(`team/${id}`, team).pipe(
      catchError((error) => this.handleError('Error updating team', error))
    );
  }

  // ─────────────────────────────────────────
  // ✅ DELETE /team/:id
  // ─────────────────────────────────────────
  deleteTeam(id: string): Observable<void> {
    return this.api.delete<void>(`team/${id}`).pipe(
      catchError((error) => this.handleError('Error deleting team', error))
    );
  }

  // ─────────────────────────────────────────
  // ⚠️ NO CONFIRMADO EN BACKEND
  // ─────────────────────────────────────────
  /**
   * TODO:
   * No existe endpoint confirmado:
   * GET /player?teamId=
   */
  getPlayers(teamId: string): Observable<Player[]> {
    return this.api.get<Player[]>('player', { teamId }).pipe(
      catchError((error) => this.handleError('Error fetching players', error))
    );
  }

  /**
   * TODO:
   * Endpoint de creación de player debe validarse contra backend real
   */
  createPlayer(
    player: CreatePlayerDto & {
      teamId: string;
      championshipId: string;
      organizationId: string;
    }
  ): Observable<Player> {
    return this.api.post<Player>('player', player).pipe(
      catchError((error) => this.handleError('Error creating player', error))
    );
  }

  // ─────────────────────────────────────────
  // ❌ CSV IMPORT (NO ALINEADO)
  // ─────────────────────────────────────────
  /**
   * ⚠️ NO ALINEADO CON BACKEND:
   * - POST /team no existe
   * - búsqueda por name no existe
   * - validación de duplicados no soportada
   *
   * Se mantiene solo como simulación local
   */
  importFromCsv(
    championshipId: string,
    organizationId: string,
    csvContent: string
  ): Observable<CsvImportResult> {
    const result: CsvImportResult = {
      teamsImported: 0,
      playersImported: 0,
      teamsSkipped: [],
      playersSkipped: [],
      warnings: [],
    };

    return of(result);
  }

  // ─────────────────────────────────────────
  // ERROR HANDLER
  // ─────────────────────────────────────────
  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
}