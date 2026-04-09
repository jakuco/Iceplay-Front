import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError, from, forkJoin, of } from 'rxjs';
import { map, catchError, mergeMap, toArray, tap, switchMap } from 'rxjs/operators';
import { Position } from '../models/position.model';

export interface CsvImportResult {
  playersImported: number;
  playersSkipped: string[];
  warnings: string[];
  errors: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private api = inject(ApiService);

  /**
   * Get a single position by ID
   */
  getPosicionById(id: number): Observable<Position> {
    return this.api.get<Position>(`positions/${id}`).pipe(
      catchError((error) => this.handleError('Error fetching position', error)),
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
