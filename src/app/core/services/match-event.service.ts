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

@Injectable({ providedIn: 'root' })
export class MatchEventService {
  private api = inject(ApiService);
  private ngZone = inject(NgZone);

  /**
   * Fetch all events for a match.
   *
   * TODO:
   * GET /match/:id/events NO está publicado en routes.ts del backend.
   * Existe lógica interna `getMatchEvents(matchId)` en el service backend,
   * pero no hay ruta pública confirmada.
   *
   * Por eso este método NO se expone activo aquí.
   *
   * Alternativa recomendada:
   * usar el mecanismo SSE + catch-up vía `Last-Event-ID`, ya soportado
   * por el backend en el stream.
   */
  // getMatchEvents(
  //   matchId: string,
  //   homeTeamId: string,
  //   periodDuration: number
  // ): Observable<MatchEventViewModel[]> {
  //   return this.api
  //     .get<MatchEvent[]>(`match/${matchId}/events`)
  //     .pipe(
  //       map((events) => mapEventsToViewModels(events, homeTeamId, periodDuration)),
  //       catchError((err) => this.handleError('Error fetching events', err))
  //     );
  // }

  /**
   * Connect to the match event stream via Server-Sent Events (SSE).
   * Uses GET /matches/:matchId/events/stream
   *
   * Backend confirmado: Iceplay-Fropen/src/presentation/match/routes.ts
   * Eventos confirmados:
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

      source.onerror = (err) => console.error('SSE error:', err);

      return () => source.close();
    });
  }

  /**
   * Create a match event. Uses POST /matches/:matchId/events
   *
   * Backend confirmado: POST /:match_id/events (montado en /api/matches)
   * Response: 201 No Content (sin body — el backend hace res.status(201).end())
   */
  createEvent(matchId: string, dto: CreateMatchEventDto): Observable<void> {
    return this.api
      .post<void>(`matches/${matchId}/events`, dto)
      .pipe(catchError((err) => this.handleError('Error creating event', err)));
  }

  /**
   * Delete a match event. Uses DELETE /matches/:matchId/events/:eventId
   *
   * Backend confirmado: DELETE /:match_id/events/:event_id (montado en /api/matches)
   * Response: 204 No Content (sin body)
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