import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
  // GET /team (PAGINADO + FILTROS)
  // Backend confirmado:
  //   GET /team?page=&limit=&organizationId=&championshipId=
  // ─────────────────────────────────────────
  getTeams(
    page = 1,
    limit = 10,
    filters?: { organizationId?: string; championshipId?: string }
  ): Observable<TeamApiResponse[]> {
    const params: Record<string, string | number> = { page, limit };

    if (filters?.organizationId) params['organizationId'] = filters.organizationId;
    if (filters?.championshipId) params['championshipId'] = filters.championshipId;

    return this.api.get<TeamApiResponse[]>('team', params).pipe(
      catchError((error) => this.handleError('Error fetching teams', error))
    );
  }

  // ─────────────────────────────────────────
  // GET /team/all
  // Backend confirmado:
  //   GET /team/all?organizationId=&championshipId=
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
  // Wrapper de compatibilidad frontend
  // Mantener mientras existan vistas antiguas que llamen este método.
  // Internamente usa el endpoint REAL confirmado.
  // ─────────────────────────────────────────
  getTeamsByOrganization(organizationId: string): Observable<TeamApiResponse[]> {
    return this.getAllTeams({ organizationId });
  }

  // ─────────────────────────────────────────
  // GET /team/:id
  // Backend confirmado
  // ─────────────────────────────────────────
  getTeamById(id: string): Observable<TeamApiResponse> {
    return this.api.get<TeamApiResponse>(`team/${id}`).pipe(
      catchError((error) => this.handleError('Error fetching team', error))
    );
  }

  // ─────────────────────────────────────────
  // COMPOSICIÓN FRONT (NO BACKEND)
  // El backend no retorna players embebidos en el team.
  // Este método compone TeamProfile en frontend.
  // ─────────────────────────────────────────
  getTeamWithPlayers(id: string): Observable<TeamProfile> {
    return forkJoin({
      team: this.getTeamById(id),
      players: this.getPlayers(id),
    }).pipe(
      map(({ team, players }) => {
        return {
          id: team.id,
          name: team.name,
          shortname: team.shortname,

          // Campos que el backend no confirma en GET /team/:id
          championshipId: '',
          documentUrl: null,
          hasActiveMatches: false,

          // Campos opcionales enriquecidos
          slug: team.slug ?? '',
          logoUrl: team.logoUrl ?? null,
          primaryColor: team.primaryColor ?? null,
          secondaryColor: team.secondaryColor ?? null,
          foundedYear: team.foundedYear ?? null,
          homeVenue: team.homeVenue ? String(team.homeVenue) : null,
          location: team.location ?? team.city ?? null,
          coachName: team.coachName ?? null,
          coachPhone: team.coachPhone ?? null,
          isActive: team.isActive ?? true,

          // Fechas no confirmadas por backend en esta respuesta
          createdAt: new Date(),
          updatedAt: new Date(),

          // Relaciones frontend
          players,
          groups: [],

          // Stats frontend
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
  // POST /team NO EXISTE
  // Backend: la ruta está comentada en routes.ts
  // Se mantiene el método para no romper llamadas antiguas.
  // ─────────────────────────────────────────
  createTeam(): Observable<never> {
    return throwError(
      () => new Error('POST /team no está disponible en el backend')
    );
  }

  // ─────────────────────────────────────────
  // PUT /team/:id
  // Backend confirmado
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
  // DELETE /team/:id
  // Backend confirmado
  // ─────────────────────────────────────────
  deleteTeam(id: string): Observable<void> {
    return this.api.delete<void>(`team/${id}`).pipe(
      catchError((error) => this.handleError('Error deleting team', error))
    );
  }

  // ─────────────────────────────────────────
  // NO CONFIRMADO EN BACKEND
  // Se mantiene por compatibilidad de UI.
  // Si backend no soporta GET /player?teamId=, habrá que eliminarlo luego.
  // ─────────────────────────────────────────
  getPlayers(teamId: string): Observable<Player[]> {
    return this.api.get<Player[]>('player', { teamId }).pipe(
      catchError((error) => this.handleError('Error fetching players', error))
    );
  }

  // ─────────────────────────────────────────
  // NO CONFIRMADO EN BACKEND
  // Se mantiene por compatibilidad hasta auditar /player create completo.
  // ─────────────────────────────────────────
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
  // CSV IMPORT (NO ALINEADO)
  // - POST /team no existe
  // - búsqueda por name no está confirmada
  // - validación de duplicados no está confirmada
  // Se deja como simulación vacía para no romper compilación.
  // ─────────────────────────────────────────
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
  private handleError(message: string, error: unknown): Observable<never> {
    console.error(message, error);
    const errorMessage =
      error instanceof Error ? error.message : String(error ?? 'Unknown error');
    return throwError(() => new Error(`${message}: ${errorMessage}`));
  }
}