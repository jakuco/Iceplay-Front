import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SportOption } from '../models/sport-config.model';
import { ApiService } from './api.service';

interface BackendSport {
  id: number | string;
  name: string;
  icon?: string | null;
}

@Injectable({ providedIn: 'root' })
export class SportService {
  private api = inject(ApiService);

  getAll(): Observable<SportOption[]> {
    return this.api.get<unknown>('sports/all', { isActive: true }).pipe(
      map((response) => this.extractCollection(response, 'sports') as BackendSport[]),
      map((sports) =>
        sports.map((sport) => ({
          id: sport.id,
          name: sport.name,
          icon: sport.icon ?? 'sports',
        })),
      ),
      catchError((error) => {
        console.error('Error fetching sports', error);
        throw error;
      }),
    );
  }

  getById(id: number): Observable<SportOption | null> {
    return this.getAll().pipe(
      map((list) => list.find((sport) => Number(sport.id) === id) ?? null),
    );
  }

  private extractCollection(response: unknown, key: string): unknown[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (response && typeof response === 'object') {
      const boxed = response as Record<string, unknown>;
      const value = boxed[key];
      if (Array.isArray(value)) {
        return value;
      }
    }

    return [];
  }
}
