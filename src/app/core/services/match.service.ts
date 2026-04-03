import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { Match, UpdateMatchDto, UpdateMatchScoreDto } from '../models/match.model';

export interface MatchSearchFilters {
  championship_id?: string;
  state?: string;
  date?: string;
  match_id?: string;
}

export interface MatchPaginationParams extends MatchSearchFilters {
  page?: number;
  limit?: number;
}

export interface PostMatchEventDto {
  typeMatchEventId: number;
  time?: number;
  playerId?: string;
  teamId?: string;
  relatedEventMatchId?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private api = inject(ApiService);

  /**
   * GET /matches
   * Lista paginada básica
   */
  getPaginatedMatches(page = 1, limit = 10): Observable<any> {
    return this.api.get<any>('matches', { page, limit }).pipe(
      catchError((error) => this.handleError('Error fetching paginated matches', error)),
    );
  }

  /**
   * GET /matches/all
   * Todos los partidos
   */
  getAllMatches(): Observable<Match[]> {
    return this.api.get<Match[]>('matches/all').pipe(
      map((matches) => matches.map((m) => this.parseMatchDates(m))),
      catchError((error) => this.handleError('Error fetching all matches', error)),
    );
  }

  /**
   * GET /matches/search
   * Búsqueda paginada con filtros
   */
  searchMatches(params: MatchPaginationParams = {}): Observable<any> {
    const query = {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      ...(params.championship_id ? { championship_id: params.championship_id } : {}),
      ...(params.state ? { state: params.state } : {}),
      ...(params.date ? { date: params.date } : {}),
      ...(params.match_id ? { match_id: params.match_id } : {}),
    };

    return this.api.get<any>('matches/search', query).pipe(
      catchError((error) => this.handleError('Error searching paginated matches', error)),
    );
  }

  /**
   * GET /matches/search/all
   * Búsqueda sin paginación con filtros
   */
  searchAllMatches(filters: MatchSearchFilters = {}): Observable<Match[]> {
    const query = {
      ...(filters.championship_id ? { championship_id: filters.championship_id } : {}),
      ...(filters.state ? { state: filters.state } : {}),
      ...(filters.date ? { date: filters.date } : {}),
      ...(filters.match_id ? { match_id: filters.match_id } : {}),
    };

    return this.api.get<Match[]>('matches/search/all', query).pipe(
      map((matches) => matches.map((m) => this.parseMatchDates(m))),
      catchError((error) => this.handleError('Error searching all matches', error)),
    );
  }

  /**
   * Buscar partidos por campeonato
   */
  getMatchesByChampionship(championshipId: string): Observable<Match[]> {
    return this.searchAllMatches({ championship_id: championshipId });
  }

  /**
   * Buscar partidos por fecha
   * Ruta real del back: /matches/search/all?date=YYYY-MM-DD
   */
  getMatchesByDate(date: string): Observable<Match[]> {
    return this.searchAllMatches({ date });
  }

  /**
   * Buscar partidos en vivo
   */
  getLiveMatches(): Observable<Match[]> {
    return this.searchAllMatches({ state: 'live' });
  }

  /**
   * Buscar un partido por match_id usando filtros
   */
  findMatchByFilter(matchId: string): Observable<Match[]> {
    return this.searchAllMatches({ match_id: matchId });
  }

  /**
   * GET /matches/:match_id
   */
  getMatchById(id: string): Observable<Match> {
    return this.api.get<Match>(`matches/${id}`).pipe(
      map((match) => this.parseMatchDates(match)),
      catchError((error) => this.handleError('Error fetching match by id', error)),
    );
  }

  /**
   * POST /matches
   */
  createMatch(match: Partial<Match>): Observable<Match> {
    return this.api.post<Match>('matches', match).pipe(
      map((m) => this.parseMatchDates(m)),
      catchError((error) => this.handleError('Error creating match', error)),
    );
  }

  /**
   * PUT /matches/:match_id
   * Tu backend usa PUT, no PATCH
   */
  updateMatch(id: string, match: UpdateMatchDto): Observable<Match> {
    return this.api.put<Match>(`matches/${id}`, match).pipe(
      map((m) => this.parseMatchDates(m)),
      catchError((error) => this.handleError('Error updating match', error)),
    );
  }

  /**
   * PUT /matches/:match_id
   * El backend no tiene ruta separada para score
   */
  updateMatchScore(id: string, score: UpdateMatchScoreDto): Observable<Match> {
    return this.api.put<Match>(`matches/${id}`, score).pipe(
      map((m) => this.parseMatchDates(m)),
      catchError((error) => this.handleError('Error updating match score', error)),
    );
  }

  /**
   * DELETE /matches/:match_id
   */
  deleteMatch(id: string): Observable<void> {
    return this.api.delete<void>(`matches/${id}`).pipe(
      catchError((error) => this.handleError('Error deleting match', error)),
    );
  }

  /**
   * POST /matches/:match_id/events
   */
  postMatchEvent(matchId: string, event: PostMatchEventDto): Observable<void> {
    return this.api.post<void>(`matches/${matchId}/events`, event).pipe(
      catchError((error) => this.handleError('Error posting match event', error)),
    );
  }

  /**
   * DELETE /matches/:match_id/events/:event_id
   */
  deleteMatchEvent(matchId: string, eventId: string): Observable<void> {
    return this.api.delete<void>(`matches/${matchId}/events/${eventId}`).pipe(
      catchError((error) => this.handleError('Error deleting match event', error)),
    );
  }

  /**
   * SSE /matches/:match_id/events/stream
   */
  subscribeToMatchEvents(matchId: string): EventSource {
    return this.api.subscribe(`matches/${matchId}/events/stream`);
  }

  /**
   * Parsear strings de fecha a objetos Date
   */
  private parseMatchDates(match: Match): Match {
    if (match.scheduledStart && typeof match.scheduledStart === 'string') {
      match.scheduledStart = new Date(match.scheduledStart);
    }

    if (match.actualStartTime && typeof match.actualStartTime === 'string') {
      match.actualStartTime = new Date(match.actualStartTime);
    }

    if (match.actualEndTime && typeof match.actualEndTime === 'string') {
      match.actualEndTime = new Date(match.actualEndTime);
    }

    if (match.createdAt && typeof match.createdAt === 'string') {
      match.createdAt = new Date(match.createdAt);
    }

    if (match.updatedAt && typeof match.updatedAt === 'string') {
      match.updatedAt = new Date(match.updatedAt);
    }

    return match;
  }

  /**
   * Manejo centralizado de errores
   */
  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error?.message || error}`));
  }
}