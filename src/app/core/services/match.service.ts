import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map, catchError, throwError } from 'rxjs';
import {
  MatchDto,
  MatchByIdResponse,
  MatchPagedResponse,
  MatchSearchPagedResponse,
  DayScheduleResponse,
  CreateMatchApiDto,
  UpdateMatchApiDto,
} from '../models/match.model';

// ─────────────────────────────────────────────────────────────
// Backend confirmado (Iceplay-Fropen/src/presentation/routes.ts):
//   router.use('/api/matches', MatchRoutes.routes)
//
// Subrutas (presentation/match/routes.ts):
//   GET  /matches/search             → searchMatches
//   GET  /matches/search/all         → searchAllMatches
//   GET  /matches/schedule-by-date   → getScheduleByDate
//   GET  /matches                    → getMatches (paginado)
//   GET  /matches/all                → getAllMatches (array plano)
//   GET  /matches/:match_id          → getMatchById
//   POST /matches                    → createMatch  (auth)
//   PUT  /matches/:match_id          → updateMatch  (auth)
//   DELETE /matches/:match_id        → deleteMatch  (auth)
//
//   POST   /matches/:match_id/events         → addEvent  (en match-event.service.ts)
//   DELETE /matches/:match_id/events/:id     → removeEvent  (en match-event.service.ts)
//   GET    /matches/:match_id/events/stream  → SSE stream  (en match-event.service.ts)
// ─────────────────────────────────────────────────────────────

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private api = inject(ApiService);

  // ─── GET /matches?page=&limit= ───────────────────────────

  /**
   * Get matches (paginated).
   *
   * Backend confirmado: GET /matches?page=&limit=
   * Response shape: { page, limit, total, next, prev, matches: MatchDto[] }
   * Fuente: Iceplay-Fropen/src/presentation/services/match.service.ts:getMatches
   */
  getMatches(page = 1, limit = 10): Observable<MatchPagedResponse> {
    return this.api.get<MatchPagedResponse>('matches', { page, limit }).pipe(
      catchError((error) => this.handleError('Error fetching matches', error)),
    );
  }

  // ─── GET /matches/all ────────────────────────────────────

  /**
   * Get all matches without pagination.
   *
   * Backend confirmado: GET /matches/all
   * Response shape: MatchDto[]  (array plano, sin wrapper paginado)
   * Fuente: Iceplay-Fropen/src/presentation/services/match.service.ts:getAllMatches
   */
  getAllMatches(filters?: {
    championship_id?: string;
    state?: string;
    date?: string;
  }): Observable<MatchDto[]> {
    return this.api.get<MatchDto[]>('matches/all', filters).pipe(
      catchError((error) => this.handleError('Error fetching all matches', error)),
    );
  }

  // ─── GET /matches/search ─────────────────────────────────

  /**
   * Search matches with filters and pagination.
   *
   * Backend confirmado: GET /matches/search
   * Filtros confirmados en controller: championship_id, state, date, match_id, page, limit
   *
   * ⚠️ Response shape DIFERENTE a getMatches:
   *    { page, limit, total, next, prev, matches: MatchSearchResult[] }
   *    Donde MatchSearchResult.match es un STRING concatenado ("HomeTeam vs AwayTeam"),
   *    NO un MatchDto. Fuente: match.service.ts (backend):searchMatches
   */
  searchMatches(filters: {
    championship_id?: string;
    state?: string;
    date?: string;
    match_id?: string;
    page?: number;
    limit?: number;
  }): Observable<MatchSearchPagedResponse> {
    return this.api.get<MatchSearchPagedResponse>('matches/search', filters).pipe(
      catchError((error) => this.handleError('Error searching matches', error)),
    );
  }

  // ─── GET /matches/search/all ──────────────────────────────

  /**
   * Search matches without pagination.
   *
   * Backend confirmado: GET /matches/search/all
   * Filtros confirmados: championship_id, state, date, match_id (sin page/limit)
   *
   * ⚠️ Response shape: array de MatchSearchResult (no confirmado completamente).
   *    Se tipifica igual que searchMatches.matches por coherencia con el backend.
   */
  searchAllMatches(filters: {
    championship_id?: string;
    state?: string;
    date?: string;
    match_id?: string;
  }): Observable<MatchDto[]> {
    return this.api.get<MatchDto[]>('matches/search/all', filters).pipe(
      catchError((error) => this.handleError('Error searching all matches', error)),
    );
  }

  // ─── GET /matches/schedule-by-date ───────────────────────

  /**
   * Get schedule grouped by championship for a given date.
   *
   * Backend confirmado: GET /matches/schedule-by-date?date=YYYY-MM-DD
   *
   * ⚠️ El backend devuelve UN ÚNICO OBJETO (DayScheduleResponse), NO un array.
   *    Shape: { date, championships: [{ championship, matches: ScheduleMatchDto[] }] }
   *    Fuente: Iceplay-Fropen/src/presentation/services/match.service.ts:getScheduleByDate
   */
  getScheduleByDate(date: string): Observable<DayScheduleResponse> {
    return this.api.get<DayScheduleResponse>('matches/schedule-by-date', { date }).pipe(
      catchError((error) => this.handleError('Error fetching schedule by date', error)),
    );
  }

  // ─── GET /matches/:id ────────────────────────────────────

  /**
   * Get a single match by ID.
   *
   * Backend confirmado: GET /matches/:match_id
   *
   * ⚠️ Response shape MÍNIMA: { id, homeTeamId, awayTeamId, scheduledStart, status }
   *    homeScore y awayScore NO están en esta respuesta.
   *    El score debe reconstruirse desde los eventos SSE al conectarse al stream.
   *    Fuente: Iceplay-Fropen/src/presentation/services/match.service.ts:getMatchById
   */
  getMatchById(id: string): Observable<MatchByIdResponse> {
    return this.api.get<MatchByIdResponse>(`matches/${id}`).pipe(
      catchError((error) => this.handleError('Error fetching match', error)),
    );
  }

  // ─── POST /matches ───────────────────────────────────────

  /**
   * Create a new match.
   *
   * Backend confirmado: POST /matches (requiere auth)
   * Response shape: MatchByIdResponse (misma respuesta mínima que GET /:id)
   */
  createMatch(match: CreateMatchApiDto): Observable<MatchByIdResponse> {
    return this.api.post<MatchByIdResponse>('matches', match).pipe(
      catchError((error) => this.handleError('Error creating match', error)),
    );
  }

  // ─── PUT /matches/:id ────────────────────────────────────

  /**
   * Update match details.
   *
   * Backend confirmado: PUT /matches/:match_id (requiere auth)
   * Response shape: MatchByIdResponse (misma respuesta mínima que GET /:id)
   */
  updateMatch(id: string, match: UpdateMatchApiDto): Observable<MatchByIdResponse> {
    return this.api.put<MatchByIdResponse>(`matches/${id}`, match).pipe(
      catchError((error) => this.handleError('Error updating match', error)),
    );
  }

  // ─── DELETE /matches/:id ─────────────────────────────────

  /**
   * Delete a match.
   *
   * Backend confirmado: DELETE /matches/:match_id (requiere auth)
   * Response: 204 No Content (sin body).
   */
  deleteMatch(id: string): Observable<void> {
    return this.api
      .delete<void>(`matches/${id}`)
      .pipe(catchError((error) => this.handleError('Error deleting match', error)));
  }

  // ─── Helpers / Aliases ───────────────────────────────────

  /**
   * Get match by ID (alias semántico — mismo endpoint que getMatchById).
   *
   * ⚠️ El backend devuelve solo homeTeamId y awayTeamId, no objetos populados.
   * Para mostrar datos completos de los equipos, se requiere fetch adicional
   * a GET /teams/:id para cada equipo.
   */
  getMatchWithTeams(id: string): Observable<MatchByIdResponse> {
    return this.getMatchById(id);
  }

  // ─── TODO: No implementados ──────────────────────────────

  /**
   * Get matches for an organization.
   * TODO: Sin endpoint confirmado. GET /matches no expone organizationId como filtro.
   *       Usar searchMatches con championship_id como alternativa si aplica.
   */
  // getMatchesByOrganization(organizationId: string): Observable<MatchPagedResponse> { ... }

  /**
   * Get live matches.
   * TODO: Sin endpoint dedicado. Usar searchMatches({ state: 'live' }).
   *       Pendiente confirmar que el valor 'live' es aceptado por backend en state.
   */
  // getLiveMatches(): Observable<MatchSearchPagedResponse> { ... }

  /**
   * Update match score (for live control).
   * TODO: El backend NO expone endpoint dedicado para score.
   *       homeScore/awayScore se calculan localmente desde eventos SSE.
   *       No llamar a PUT /matches/:id para actualizar score — no está en UpdateMatchDto.
   */
  // updateMatchScore(id: string, score: UpdateMatchScoreDto): Observable<MatchByIdResponse> { ... }

  // ─── Error Handler ───────────────────────────────────────

  private handleError(message: string, error: unknown): Observable<never> {
    console.error(message, error);
    const errorMessage =
      error instanceof Error ? error.message : String(error ?? 'Unknown error');
    return throwError(() => new Error(`${message}: ${errorMessage}`));
  }
}
