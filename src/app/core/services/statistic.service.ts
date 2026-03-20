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

    return this.api.get<StatisticsTeamGeneral[]>('api/statistics/teams/general', params).pipe(
      tap((data) => console.log('Received teams general statistics:', data)),
      catchError((error) => this.handleError('Error fetching teams', error)),
    );
  }

  /**
   * Get history statistics for specific teams
   */
  getTeamsHistoryStatistics(teamsIds: number[]): Observable<StatisticsTeamsHistory[]> {
		const requests: Observable<StatisticsTeamsHistory>[] = teamsIds.map((id) => {
			return this.api
				.get<StatisticsTeamsHistory>(`api/statistics/teams/history/${id}`)
				.pipe(
					tap((data) => console.log(`Received history for team ${id}:`, data)),
					catchError((error) => {
						console.error('Error fetching team history', id, error);
						return of(null as any); // evitamos romper forkJoin
					})
				);
		});

		return forkJoin(requests).pipe(
			map((results) => results.filter(r => r !== null)) // limpiamos fallidos
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
