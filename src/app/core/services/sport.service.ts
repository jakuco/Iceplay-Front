import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SportOption } from '../models/sport-config.model';
import { ApiEndpoints } from '@core/constants/endpoints.const';

// ─────────────────────────────────────────────────────────────
// localStorage key
// ─────────────────────────────────────────────────────────────

const LS_SPORTS = 'iceplay_sports';

// ─────────────────────────────────────────────────────────────
// Seed por defecto — se escribe solo si localStorage está vacío
// ─────────────────────────────────────────────────────────────

const DEFAULT_SPORTS: SportOption[] = [
  { id: 1, name: 'Fútbol',             icon: 'sports_soccer'     },
  { id: 2, name: 'Básquetbol',         icon: 'sports_basketball' },
  { id: 3, name: 'Voleibol',           icon: 'sports_volleyball' },
  { id: 4, name: 'Hockey sobre Hielo', icon: 'sports_hockey'     },
  { id: 5, name: 'Béisbol',            icon: 'sports_baseball'   },
];

@Injectable({ providedIn: 'root' })
export class SportService {

  getAll(): Observable<SportOption[]> {
    // 🔴 MOCK — localStorage (seed automático si está vacío)
    const raw = localStorage.getItem(LS_SPORTS);
    if (!raw) {
      localStorage.setItem(LS_SPORTS, JSON.stringify(DEFAULT_SPORTS));
      return of(DEFAULT_SPORTS);
    }
    try {
      return of(JSON.parse(raw) as SportOption[]);
    } catch {
      return of(DEFAULT_SPORTS);
    }

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.get<SportOption[]>(ApiEndpoints.SPORTS.BASE);
  }

  getById(id: number): Observable<SportOption | null> {
    // 🔴 MOCK — localStorage
    const raw = localStorage.getItem(LS_SPORTS);
    const list: SportOption[] = raw ? JSON.parse(raw) : DEFAULT_SPORTS;
    return of(list.find(s => s.id === id) ?? null);

    // 🟢 BACKEND — descomentar cuando el endpoint exista
    // return this.api.get<SportOption>(ApiEndpoints.SPORTS.BY_ID(id));
  }
}
