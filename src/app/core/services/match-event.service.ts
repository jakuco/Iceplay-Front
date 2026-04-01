import { Injectable, inject, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, throwError, map } from 'rxjs';
import {
  MatchEvent,
  MatchEventViewModel,
  CreateMatchEventDto,
  mapEventToViewModel,
  mapEventsToViewModels,
} from '../models/event.model';

export interface SSEEventAdd    { type: 'add';    event: MatchEventViewModel; }
export interface SSEEventRemove { type: 'remove'; eventId: string; }
export type SSEMatchEvent = SSEEventAdd | SSEEventRemove;

@Injectable({ providedIn: 'root' })
export class MatchEventService {
  private api    = inject(ApiService);
  private ngZone = inject(NgZone);

  getMatchEvents(
    matchId: string,
    homeTeamId: string,
    periodDuration: number
  ): Observable<MatchEventViewModel[]> {
    return this.api
      .get<MatchEvent[]>(`matches/${matchId}/events`)
      .pipe(
        map((events) => mapEventsToViewModels(events, homeTeamId, periodDuration)),
        catchError((err) => this.handleError('Error fetching events', err))
      );
  }

  connectToMatchStream(
    matchId: string,
    homeTeamId: string,
    periodDuration: number
  ): Observable<SSEMatchEvent> {
    return new Observable<SSEMatchEvent>((observer) => {
      const source = this.api.subscribe(`matches/${matchId}/events/stream`);

      source.addEventListener('add', (e: MessageEvent) => {
        this.ngZone.run(() => {
          try {
            const raw: MatchEvent = JSON.parse(e.data);
            const vm = mapEventToViewModel(raw, homeTeamId, periodDuration);
            observer.next({ type: 'add', event: vm });
          } catch (err) {
            console.error('SSE parse error (add):', err);
          }
        });
      });

      source.addEventListener('remove', (e: MessageEvent) => {
        this.ngZone.run(() => {
          observer.next({ type: 'remove', eventId: e.data });
        });
      });

      source.onerror = (err) => console.error('SSE error:', err);

      return () => source.close();
    });
  }

  createEvent(matchId: string, dto: CreateMatchEventDto): Observable<void> {
    return this.api
      .post<void>(`matches/${matchId}/events`, dto)
      .pipe(catchError((err) => this.handleError('Error creating event', err)));
  }

  deleteEvent(matchId: string, eventId: string): Observable<void> {
    return this.api
      .delete<void>(`matches/${matchId}/events/${eventId}`)
      .pipe(catchError((err) => this.handleError('Error deleting event', err)));
  }

  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
}