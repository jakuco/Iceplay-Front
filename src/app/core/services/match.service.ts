import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map, catchError, throwError } from 'rxjs';

import {
  Match,
  MatchStatus,
  MatchDto,
  MatchByIdResponse,
  MatchPagedResponse,
  MatchSearchPagedResponse,
  MatchSearchResult,
  DayScheduleResponse,
  CreateMatchApiDto,
  UpdateMatchApiDto,
} from '../models/match.model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private api = inject(ApiService);

  // ─────────────────────────────────────────
  // GET /matches (PAGINADO)
  // ─────────────────────────────────────────
  getMatches(page = 1, limit = 10): Observable<MatchPagedResponse> {
    return this.api.get<MatchPagedResponse>('matches', { page, limit }).pipe(
      catchError((error) => this.handleError('Error fetching matches', error)),
    );
  }

  // ─────────────────────────────────────────
  // GET /matches/all
  // ─────────────────────────────────────────
  getAllMatches(filters?: {
    championship_id?: string;
    state?: string;
    date?: string;
  }): Observable<MatchDto[]> {
    return this.api.get<MatchDto[]>('matches/all', filters).pipe(
      catchError((error) => this.handleError('Error fetching all matches', error)),
    );
  }

  // ─────────────────────────────────────────
  // GET /matches/search
  // ─────────────────────────────────────────
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

  // ─────────────────────────────────────────
  // GET /matches/search/all
  // ─────────────────────────────────────────

  /**
   * Búsqueda sin paginación de partidos.
   *
   * ⚠️ Contrato real: GET /matches/search/all devuelve
   *   `MatchSearchResult[]` — cada ítem tiene `{ id, match, date, location, status }`.
   *   `match` es una cadena concatenada "HomeTeam vs AwayTeam", NO un MatchDto.
   */
  searchAllMatches(filters: {
    championship_id?: string;
    state?: string;
    date?: string;
    match_id?: string;
  }): Observable<MatchSearchResult[]> {
    return this.api.get<MatchSearchResult[]>('matches/search/all', filters).pipe(
      catchError((error) => this.handleError('Error searching all matches', error)),
    );
  }

  // ─────────────────────────────────────────
  // GET /matches/schedule-by-date
  // ─────────────────────────────────────────
  getScheduleByDate(date: string, offset: number = 0): Observable<DayScheduleResponse> {
    return this.api.get<DayScheduleResponse>('matches/schedule-by-date', { date, offset }).pipe(
      catchError((error) => this.handleError('Error fetching schedule by date', error)),
    );
  }

  /**
   * 🔥 Compatibilidad útil (DE LA RAMA DE ÉL)
   * Convierte schedule en lista plana de Match
   * ✔ Seguro
   * ✔ No rompe backend
   */
  getMatchesByDate(date: string): Observable<Match[]> {
    return this.getScheduleByDate(date).pipe(
      map((res) => {
        const rows: Match[] = [];

        for (const block of res.championships ?? []) {
          for (const m of block.matches ?? []) {
            rows.push({
              id: m.id,
              championshipId: m.championshipId,
              homeTeamId: m.homeTeamId,
              awayTeamId: m.awayTeamId,
              homeScore: m.homeScore,
              awayScore: m.awayScore,
              status: m.status as MatchStatus,
              scheduledStart: m.scheduledDate,
              venue: m.venue,
              city: m.city,
              isActive: true,
            });
          }
        }

        return rows;
      })
    );
  }

  // ─────────────────────────────────────────
  // GET /matches/:id
  // ─────────────────────────────────────────
  getMatchById(id: string): Observable<MatchByIdResponse> {
    return this.api.get<MatchByIdResponse>(`matches/${id}`).pipe(
      catchError((error) => this.handleError('Error fetching match', error)),
    );
  }

  // ─────────────────────────────────────────
  // POST /matches
  // ─────────────────────────────────────────
  createMatch(match: CreateMatchApiDto): Observable<MatchByIdResponse> {
    return this.api.post<MatchByIdResponse>('matches', match).pipe(
      catchError((error) => this.handleError('Error creating match', error)),
    );
  }

  // ─────────────────────────────────────────
  // PUT /matches/:id
  // ─────────────────────────────────────────
  updateMatch(id: string, match: UpdateMatchApiDto): Observable<MatchByIdResponse> {
    return this.api.put<MatchByIdResponse>(`matches/${id}`, match).pipe(
      catchError((error) => this.handleError('Error updating match', error)),
    );
  }

  // ─────────────────────────────────────────
  // DELETE /matches/:id
  // ─────────────────────────────────────────
  deleteMatch(id: string): Observable<void> {
    return this.api.delete<void>(`matches/${id}`).pipe(
      catchError((error) => this.handleError('Error deleting match', error))
    );
  }

  // ─────────────────────────────────────────
  // Alias útil
  // ─────────────────────────────────────────
  getMatchWithTeams(id: string): Observable<MatchByIdResponse> {
    return this.getMatchById(id);
  }

  // ─────────────────────────────────────────
  // Error handler
  // ─────────────────────────────────────────
  private handleError(message: string, error: unknown): Observable<never> {
    console.error(message, error);
    const errorMessage =
      error instanceof Error ? error.message : String(error ?? 'Unknown error');
    return throwError(() => new Error(`${message}: ${errorMessage}`));
  }
}