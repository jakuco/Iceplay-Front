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

  /**
   * Fetch all events for a match.
   *
   * TODO: sin endpoint confirmado — GET /match/:id/events NO está publicado en routes.ts.
   *       Existe lógica interna `getMatchEvents(matchId)` en el MatchService del backend,
   *       pero no hay ruta pública expuesta. No usar en producción hasta confirmar.
   *
   *       Alternativa recomendada para hidratación inicial:
   *         · Usar el mecanismo SSE catch-up vía header `Last-Event-ID`
   *           (el backend ya implementa eventCatchUp en el stream handler).
   *
   * Antes (incorrecto): GET matches/${matchId}/events  (ruta plural + ruta no publicada)
   * Corregido a:        GET match/${matchId}/events    (pendiente de confirmación backend)
   */
  // getMatchEvents(
  //   matchId: string,
  //   homeTeamId: string,
  //   periodDuration: number
  // ): Observable<MatchEventViewModel[]> {
  //   return this.api
  //     .get<MatchEvent[]>(`match/${matchId}/events`)   // TODO: ruta no confirmada en routes.ts
  //     .pipe(
  //       map((events) => mapEventsToViewModels(events, homeTeamId, periodDuration)),
  //       catchError((err) => this.handleError('Error fetching events', err))
  //     );
  // }

  /**
   * Connect to the match event stream via Server-Sent Events (SSE).
   * Uses GET /match/:matchId/events/stream
   *
   * El stream emite dos tipos de evento (confirmados en controller.ts):
   *   · "add"    → data: FullEventDTO serializado (JSON)
   *   · "remove" → data: eventId (string plano)
   *
   * El backend implementa catch-up via Last-Event-ID para reconexión.
   * El Observable retorna un teardown que cierra la conexión SSE.
   *
   * Antes: api.subscribe('matches/${matchId}/events/stream')
   * Ahora: api.subscribe('match/${matchId}/events/stream')
   */
  connectToMatchStream(
    matchId: string,
    homeTeamId: string,
    periodDuration: number
  ): Observable<SSEMatchEvent> {
    return new Observable<SSEMatchEvent>((observer) => {
      const source = this.api.subscribe(`match/${matchId}/events/stream`);

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
          // El backend emite el eventId como string plano (no JSON)
          observer.next({ type: 'remove', eventId: e.data });
        });
      });

      source.onerror = (err) => console.error('SSE error:', err);

      return () => source.close();
    });
  }

  /**
   * Create a match event. Uses POST /match/:matchId/events (no requiere auth en routes.ts actual).
   *
   * Antes: api.post('matches/${matchId}/events', dto)
   * Ahora: api.post('match/${matchId}/events', dto)
   */
  createEvent(matchId: string, dto: CreateMatchEventDto): Observable<void> {
    return this.api
      .post<void>(`match/${matchId}/events`, dto)
      .pipe(catchError((err) => this.handleError('Error creating event', err)));
  }

  /**
   * Delete a match event. Uses DELETE /match/:matchId/events/:eventId
   *
   * Antes: api.delete('matches/${matchId}/events/${eventId}')
   * Ahora: api.delete('match/${matchId}/events/${eventId}')
   */
  deleteEvent(matchId: string, eventId: string): Observable<void> {
    return this.api
      .delete<void>(`match/${matchId}/events/${eventId}`)
      .pipe(catchError((err) => this.handleError('Error deleting event', err)));
  }

  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
}
