import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map, catchError, throwError } from 'rxjs';
import {
  MatchApiResponse,
  MatchListItem,
  CreateMatchApiDto,
  UpdateMatchApiDto,
  ScheduleByDateResponse,
} from '../models/match.model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private api = inject(ApiService);

  /**
   * Get matches (paginated). Uses GET /match?page=&limit=
   *
   * Antes: getMatches(championshipId: string) → GET /matches?championshipId=
   * Ahora: recibe parámetros de paginación según el endpoint real del backend.
   * Para filtrar por championship_id u otros campos, usar searchMatches().
   *
   * TODO: confirmar la shape exacta del wrapper paginado que devuelve el backend
   *       (si envuelve en { data, page, limit, total } o es array plano).
   *       Por ahora se tipa como MatchApiResponse[] como aproximación conservadora.
   */
  getMatches(page = 1, limit = 10): Observable<MatchApiResponse[]> {
    return this.api.get<MatchApiResponse[]>('match', { page, limit }).pipe(
      catchError((error) => this.handleError('Error fetching matches', error)),
    );
  }

  /**
   * Search matches with filters and pagination. Uses GET /match/search
   * Filtros disponibles (confirmados en el backend): championship_id, state, date, match_id.
   *
   * TODO: confirmar la shape exacta del wrapper paginado que devuelve el backend.
   */
  searchMatches(filters: {
    championship_id?: string;
    state?: string;
    date?: string;       // YYYY-MM-DD
    match_id?: string;
    page?: number;
    limit?: number;
  }): Observable<MatchApiResponse[]> {
    return this.api.get<MatchApiResponse[]>('match/search', filters).pipe(
      catchError((error) => this.handleError('Error searching matches', error)),
    );
  }

  /**
   * Get schedule grouped by championship for a given date.
   * Uses GET /match/schedule-by-date?date=YYYY-MM-DD
   *
   * Reemplaza el anterior getMatchesByDate(), que apuntaba al endpoint incorrecto.
   * También existe el alias deprecated /match/by-championship-date → mismo handler.
   */
  getScheduleByDate(date: string): Observable<ScheduleByDateResponse[]> {
    return this.api.get<ScheduleByDateResponse[]>('match/schedule-by-date', { date }).pipe(
      catchError((error) => this.handleError('Error fetching schedule by date', error)),
    );
  }

  /**
   * Get a single match by ID. Uses GET /match/:id
   */
  getMatchById(id: string): Observable<MatchApiResponse> {
    return this.api.get<MatchApiResponse>(`match/${id}`).pipe(
      catchError((error) => this.handleError('Error fetching match', error)),
    );
  }

  /**
   * Get matches for an organization.
   * TODO: sin endpoint confirmado — el backend no expone filtro organizationId
   *       en GET /match ni en GET /match/search. No asumir hasta confirmar.
   */
  // getMatchesByOrganization(organizationId: string): Observable<MatchApiResponse[]> {
  //   return this.api.get<MatchApiResponse[]>('match', { organizationId }).pipe(
  //     catchError((error) => this.handleError('Error fetching organization matches', error)),
  //   );
  // }

  /**
   * Get live matches.
   * TODO: sin endpoint confirmado — no existe /match/live ni filtro status=live en GET /match.
   *       El endpoint /match/search acepta el campo 'state' pero no está documentado
   *       si su valor es equivalente al campo 'status' string de MatchApiResponse.
   */
  // getLiveMatches(organizationId?: string): Observable<MatchApiResponse[]> {
  //   const params: any = { state: 'live' };
  //   if (organizationId) {
  //     params.organizationId = organizationId; // TODO: sin endpoint confirmado
  //   }
  //   return this.api.get<MatchApiResponse[]>('match/search', params).pipe(
  //     catchError((error) => this.handleError('Error fetching live matches', error)),
  //   );
  // }

  /**
   * Create a new match. Uses POST /match (requires auth)
   */
  createMatch(match: CreateMatchApiDto): Observable<MatchApiResponse> {
    return this.api.post<MatchApiResponse>('match', match).pipe(
      catchError((error) => this.handleError('Error creating match', error)),
    );
  }

  /**
   * Update match details. Uses PUT /match/:id (requires auth)
   *
   * Antes: api.patch → 'matches/:id'
   * Ahora: api.put  → 'match/:id'  (el backend define router.put, no router.patch)
   */
  updateMatch(id: string, match: UpdateMatchApiDto): Observable<MatchApiResponse> {
    return this.api.put<MatchApiResponse>(`match/${id}`, match).pipe(
      catchError((error) => this.handleError('Error updating match', error)),
    );
  }

  /**
   * Update match score (for live control).
   * TODO: sin endpoint confirmado — el backend no expone un endpoint dedicado para score.
   *       PUT /match/:id acepta UpdateMatchDto del backend, pero sus campos
   *       (championship_id, home_team_id, etc.) no incluyen homeScore, awayScore
   *       ni periodScores. Endpoint de score a confirmar antes de implementar.
   */
  // updateMatchScore(id: string, score: UpdateMatchScoreDto): Observable<MatchApiResponse> {
  //   return this.api.patch<MatchApiResponse>(`match/${id}`, score).pipe(
  //     catchError((error) => this.handleError('Error updating match score', error)),
  //   );
  // }

  /**
   * Delete a match. Uses DELETE /match/:id (requires auth)
   *
   * Antes: 'matches/:id'
   * Ahora: 'match/:id'
   */
  deleteMatch(id: string): Observable<void> {
    return this.api
      .delete<void>(`match/${id}`)
      .pipe(catchError((error) => this.handleError('Error deleting match', error)));
  }

  /**
   * Get match by ID (alias semántico).
   * Nota: el backend devuelve solo homeTeamId / awayTeamId (IDs), no objetos de equipo.
   * Para datos completos de equipo se requiere fetch adicional al endpoint de teams.
   */
  getMatchWithTeams(id: string): Observable<MatchApiResponse> {
    return this.getMatchById(id).pipe(
      map((match) => {
        // TODO: equipos no vienen populados en GET /match/:id.
        // Realizar fetch separado a /team/:id si se necesitan datos del equipo.
        return match;
      }),
    );
  }

  /**
   * Handle errors
   */
  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
}
