import { Injectable, inject, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, throwError } from 'rxjs';
import {
  MatchEvent,
  MatchEventViewModel,
  CreateMatchEventDto,
  mapEventToViewModel,
} from '../models/event.model';

export interface SSEEventAdd {
  type: 'add';
  event: MatchEventViewModel;
}

export interface SSEEventRemove {
  type: 'remove';
  eventId: string;
}

export type SSEMatchEvent = SSEEventAdd | SSEEventRemove;

@Injectable({
  providedIn: 'root',
})
export class MatchEventService {
  private api = inject(ApiService);
  private ngZone = inject(NgZone);

  /**
   * Backend actual:
   * - NO expone GET /events
   * - NO expone GET /matches/:id/events como ruta pública
   * - SÍ expone SSE en /matches/:matchId/events/stream
   *
   * Por eso la hidratación inicial y los cambios en vivo deben venir por SSE.
   */

  /**
   * Connect to the match event stream via Server-Sent Events (SSE).
   * Uses GET /matches/:matchId/events/stream
   *
   * Backend confirmado:
   *   GET /api/matches/:matchId/events/stream
   *
   * Eventos emitidos:
   *   - "add"    => FullEventDTO serializado como JSON
   *   - "remove" => eventId como string plano
   */
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

      source.onerror = (err) => {
        console.error('SSE error:', err);
      };

      return () => source.close();
    });
  }

  /**
   * Wrapper de compatibilidad con la rama avanzada.
   * Permite usar callbacks sobre el SSE real del backend.
   */
  subscribeToEvents(
    matchId: string,
    homeTeamId: string,
    periodDuration: number,
    onAdd: (event: MatchEventViewModel) => void,
    onDelete: (eventId: string) => void
  ): () => void {
    const sub = this.connectToMatchStream(matchId, homeTeamId, periodDuration).subscribe({
      next: (msg) => {
        if (msg.type === 'add') onAdd(msg.event);
        else onDelete(msg.eventId);
      },
      error: (err) => console.error('SSE subscription error:', err),
    });

    return () => sub.unsubscribe();
  }

  /**
   * Create a match event. Uses POST /matches/:matchId/events
   *
   * Backend confirmado:
   *   POST /api/matches/:matchId/events
   *
   * Response:
   *   201 No Content
   */
  createEvent(matchId: string, dto: CreateMatchEventDto): Observable<void> {
    return this.api
      .post<void>(`matches/${matchId}/events`, dto)
      .pipe(catchError((err) => this.handleError('Error creating event', err)));
  }

  /**
   * Delete a match event. Uses DELETE /matches/:matchId/events/:eventId
   *
   * Backend confirmado:
   *   DELETE /api/matches/:matchId/events/:eventId
   *
   * Response:
   *   204 No Content
   */
  deleteEvent(matchId: string, eventId: string): Observable<void> {
    return this.api
      .delete<void>(`matches/${matchId}/events/${eventId}`)
      .pipe(catchError((err) => this.handleError('Error deleting event', err)));
  }

  private handleError(message: string, error: unknown): Observable<never> {
    console.error(message, error);
    const errorMessage =
      error instanceof Error ? error.message : String(error ?? 'Unknown error');
    return throwError(() => new Error(`${message}: ${errorMessage}`));
  }
}