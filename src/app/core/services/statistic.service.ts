import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError, from, forkJoin, of } from 'rxjs';
import { map, catchError, mergeMap, toArray, tap, switchMap } from 'rxjs/operators';

export interface StatisticsTeamGeneral {
  team_id: number;
  name: string;
  matches_played: number;
  wins: number;
  losses: number;
  draws: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
}

export interface StatisticsTeamsHistory {
  team_id: number;
  name: string;
  history: string;
}

export interface StatisticsPlayer {
  rank: number;
  full_name: string;
  team_name: string;
  logo_url: string;
  value: number;
  ratio: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private api = inject(ApiService);

  /**
   * Get general statistics for all teams
   */
  getTeamsGeneralStatistics(
    limit: number = 10,
    offset: number = 0,
  ): Observable<StatisticsTeamGeneral[]> {
    const params = {
      limit: limit,
      offset: offset,
    };

    return this.api
      .get<StatisticsTeamGeneral[]>('api/statistics/teams/general', params)
      .pipe(catchError((error) => this.handleError('Error fetching teams', error)));
  }

  /**
   * Get history statistics for specific teams
   */
  getTeamsHistoryStatistics(teamsIds: number[]): Observable<StatisticsTeamsHistory[]> {
    const requests: Observable<StatisticsTeamsHistory>[] = teamsIds.map((id) => {
      return this.api.get<StatisticsTeamsHistory>(`api/statistics/teams/history/${id}`).pipe(
        catchError((error) => {
          return of(null as any); // evitamos romper forkJoin
        }),
      );
    });

    return forkJoin(requests).pipe(
      map((results) => results.filter((r) => r !== null)), // limpiamos fallidos
    );
  }

  /**
   * Get top players statistics for scorers
   */
  getPlayersScorersStatistics(
    limit: number = 10,
    offset: number = 0,
  ): Observable<StatisticsPlayer[]> {
    const params = {
      limit: limit,
      offset: offset,
    };

    return this.api
      .get<StatisticsPlayer[]>('api/statistics/players/scorers', params)
      .pipe(catchError((error) => this.handleError('Error fetching players scorers', error)));
  }

  /**
   * Get top players statistics for goalkeepers
   */
  getPlayersGoalkeepersStatistics(
    limit: number = 10,
    offset: number = 0,
  ): Observable<StatisticsPlayer[]> {
    const params = {
      limit: limit,
      offset: offset,
    };

    return this.api
      .get<StatisticsPlayer[]>('api/statistics/players/goalkeepers', params)
      .pipe(catchError((error) => this.handleError('Error fetching players goalkeepers', error)));
  }

  /**
   * Get top players statistics for yellow cards
   */
  getPlayersYellowCardsStatistics(
    limit: number = 10,
    offset: number = 0,
  ): Observable<StatisticsPlayer[]> {
    const params = {
      limit: limit,
      offset: offset,
    };

    return this.api
      .get<StatisticsPlayer[]>('api/statistics/players/yellow-cards', params)
      .pipe(catchError((error) => this.handleError('Error fetching players yellow cards', error)));
  }

  /**
   * Get top players statistics for red cards
   */
  getPlayersRedCardsStatistics(
    limit: number = 10,
    offset: number = 0,
  ): Observable<StatisticsPlayer[]> {
    const params = {
      limit: limit,
      offset: offset,
    };

    return this.api
      .get<StatisticsPlayer[]>('api/statistics/players/red-cards', params)
      .pipe(catchError((error) => this.handleError('Error fetching players red cards', error)));
  }

  /**
   * Handle errors
   */
  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
}
