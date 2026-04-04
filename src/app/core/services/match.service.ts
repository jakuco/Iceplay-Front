import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map, catchError, throwError } from 'rxjs';
import {
  MatchApiResponse,
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
   * Backend confirmado:
   *   GET /match?page=&limit=
   *
   * NOTA:
   * El backend real parece devolver un wrapper paginado, pero el front actual
   * consume arrays. Se mantiene el tipado como MatchApiResponse[] por compatibilidad
   * hasta confirmar la shape exacta del response.
   */
  getMatches(page = 1, limit = 10): Observable<MatchApiResponse[]> {
    return this.api.get<MatchApiResponse[]>('match', { page, limit }).pipe(
      catchError((error) => this.handleError('Error fetching matches', error)),
    );
  }

  /**
   * Search matches with filters and pagination. Uses GET /match/search
   *
   * Filtros confirmados en backend:
   *   championship_id, state, date, match_id, page, limit
   */
  searchMatches(filters: {
    championship_id?: string;
    state?: string;
    date?: string;
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
   * Alias deprecated también existente en backend:
   *   /match/by-championship-date
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
   *
   * TODO:
   * Sin endpoint confirmado. El backend no expone organizationId como filtro
   * documentado en GET /match ni en GET /match/search.
   *
   * Se deja comentado para no fingir soporte inexistente.
   */
  // getMatchesByOrganization(organizationId: string): Observable<MatchApiResponse[]> {
  //   return this.api.get<MatchApiResponse[]>('match', { organizationId }).pipe(
  //     catchError((error) => this.handleError('Error fetching organization matches', error)),
  //   );
  // }

  /**
   * Get live matches.
   *
   * TODO:
   * Sin endpoint confirmado dedicado. El backend expone `state` en /match/search,
   * pero no está cerrado si ese valor equivale 1:1 al `status` string del frontend.
   */
  // getLiveMatches(organizationId?: string): Observable<MatchApiResponse[]> {
  //   const params: Record<string, string> = { state: 'live' };
  //   if (organizationId) params['organizationId'] = organizationId;
  //   return this.api.get<MatchApiResponse[]>('match/search', params).pipe(
  //     catchError((error) => this.handleError('Error fetching live matches', error)),
  //   );
  // }

  /**
   * Create a new match. Uses POST /match
   */
  createMatch(match: CreateMatchApiDto): Observable<MatchApiResponse> {
    return this.api.post<MatchApiResponse>('match', match).pipe(
      catchError((error) => this.handleError('Error creating match', error)),
    );
  }

  /**
   * Update match details. Uses PUT /match/:id
   *
   * Backend confirmado:
   *   PUT /match/:match_id
   */
  updateMatch(id: string, match: UpdateMatchApiDto): Observable<MatchApiResponse> {
    return this.api.put<MatchApiResponse>(`match/${id}`, match).pipe(
      catchError((error) => this.handleError('Error updating match', error)),
    );
  }

  /**
   * Update match score (for live control).
   *
   * TODO:
   * El backend no expone endpoint dedicado para score ni DTO confirmado
   * para homeScore/awayScore/periodScores.
   * Se deja fuera hasta confirmar contrato real.
   */
  // updateMatchScore(id: string, score: UpdateMatchScoreDto): Observable<MatchApiResponse> {
  //   return this.api.put<MatchApiResponse>(`match/${id}`, score).pipe(
  //     catchError((error) => this.handleError('Error updating match score', error)),
  //   );
  // }

  /**
   * Delete a match. Uses DELETE /match/:id
   */
  deleteMatch(id: string): Observable<void> {
    return this.api
      .delete<void>(`match/${id}`)
      .pipe(catchError((error) => this.handleError('Error deleting match', error)));
  }

  /**
   * Get match by ID (alias semántico).
   *
   * El backend devuelve IDs de equipos, no objetos populados.
   * Para mostrar datos completos de los equipos, se requiere fetch adicional.
   */
  getMatchWithTeams(id: string): Observable<MatchApiResponse> {
    return this.getMatchById(id).pipe(
      map((match) => match),
    );
  }

  /**
   * Handle errors
   */
  private handleError(message: string, error: unknown): Observable<never> {
    console.error(message, error);
    const errorMessage =
      error instanceof Error ? error.message : String(error ?? 'Unknown error');
    return throwError(() => new Error(`${message}: ${errorMessage}`));
  }
}