import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError, from, of } from 'rxjs';
import { map, catchError, mergeMap, toArray, tap, switchMap } from 'rxjs/operators';
import {
  PlayerApiResponse,
  CreatePlayerApiDto,
  UpdatePlayerApiDto,
  // Legacy type kept only to avoid breaking old CSV-related frontend flows
  CreatePlayerDto,
} from '../models/player.model';

// ─────────────────────────────────────────────────────────────
// Backend confirmado (routes.ts):
//   GET    /player            → getPlayers (page, limit)
//   GET    /player/:id        → getPlayerById
//   POST   /player            → createPlayer  (auth)
//   PUT    /player/:id        → updatePlayer  (auth)
//   DELETE /player/:id        → deletePlayer  (auth)
//
// NO confirmados como query params en GET /player:
//   teamId, championshipId, organizationId, document, name
// ─────────────────────────────────────────────────────────────

export interface CsvImportResult {
  playersImported: number;
  playersSkipped: string[];
  warnings: string[];
  errors: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private api = inject(ApiService);

  // ─── Métodos confirmados ──────────────────────────────────

  /**
   * Get players (paginated). Uses GET /player?page=&limit=
   *
   * TODO:
   * confirmar si el backend devuelve array plano o wrapper paginado.
   * Se tipa como array porque así lo estás consumiendo en el front actual.
   */
  getPlayers(page = 1, limit = 10): Observable<PlayerApiResponse[]> {
    return this.api.get<PlayerApiResponse[]>('player', { page, limit }).pipe(
      catchError((err) => this.handleError('Error fetching players', err)),
    );
  }

  /**
   * Get a single player by ID (UUIDv7). Uses GET /player/:id
   */
  getPlayerById(id: string): Observable<PlayerApiResponse> {
    return this.api.get<PlayerApiResponse>(`player/${id}`).pipe(
      catchError((err) => this.handleError('Error fetching player', err)),
    );
  }

  /**
   * Create a new player. Uses POST /player (requires auth).
   *
   * IMPORTANTE:
   * usar CreatePlayerApiDto para respetar el contrato real del backend.
   */
  createPlayer(player: CreatePlayerApiDto): Observable<PlayerApiResponse> {
    return this.api.post<PlayerApiResponse>('player', player).pipe(
      catchError((err) => this.handleError('Error creating player', err)),
    );
  }

  /**
   * Update a player. Uses PUT /player/:id (requires auth).
   */
  updatePlayer(id: string, player: UpdatePlayerApiDto): Observable<PlayerApiResponse> {
    return this.api.put<PlayerApiResponse>(`player/${id}`, player).pipe(
      catchError((err) => this.handleError('Error updating player', err)),
    );
  }

  /**
   * Delete a player. Uses DELETE /player/:id (requires auth).
   */
  deletePlayer(id: string): Observable<void> {
    return this.api
      .delete<void>(`player/${id}`)
      .pipe(catchError((err) => this.handleError('Error deleting player', err)));
  }

  // ─── Métodos no confirmados — wrappers de compatibilidad ──────────────────
  //
  // El controlador de GET /player solo acepta `page` y `limit`.
  // Los filtros teamId, championshipId y organizationId NO están publicados
  // como query params en el backend actual.
  //
  // Se mantienen como wrappers provisionales porque varias vistas del front
  // todavía dependen de ellos. Si el backend ignora el filtro, puede devolver
  // todos los jugadores.
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Get players by team.
   * TODO: sin endpoint confirmado — GET /player no acepta teamId como query param documentado.
   */
  getPlayersByTeam(teamId: string): Observable<PlayerApiResponse[]> {
    return this.api.get<PlayerApiResponse[]>('player', { teamId }).pipe(
      catchError((err) => this.handleError('Error fetching players by team', err)),
    );
  }

  /**
   * Get players by championship.
   * TODO: sin endpoint confirmado — championshipId no está documentado.
   */
  getPlayersByChampionship(championshipId: string): Observable<PlayerApiResponse[]> {
    return this.api.get<PlayerApiResponse[]>('player', { championshipId }).pipe(
      catchError((err) => this.handleError('Error fetching championship players', err)),
    );
  }

  /**
   * Get players by organization.
   * TODO: sin endpoint confirmado — organizationId no está documentado.
   */
  getPlayersByOrganization(organizationId: string): Observable<PlayerApiResponse[]> {
    return this.api.get<PlayerApiResponse[]>('player', { organizationId }).pipe(
      catchError((err) => this.handleError('Error fetching organization players', err)),
    );
  }

  // ─── CSV Import ────────────────────────────────────────────
  //
  // Clasificación:
  //   · createPlayer() → CONFIRMADA la ruta, pero el DTO real del backend
  //     usa snake_case y campos distintos.
  //   · búsqueda por `document` → NO confirmada
  //   · teamId/championshipId/organizationId actuales del CSV NO coinciden con
  //     el contrato real del backend
  //
  // Se mantiene provisional para no romper flujos existentes, pero está
  // documentado como pendiente de reescritura.
  // ───────────────────────────────────────────────────────────

  /**
   * Import players from CSV.
   * CSV format: nombre,apellido,numero,posicionId,fecha_nacimiento,altura,peso
   *
   * AVISO:
   * Este método sigue siendo provisional hasta que se reescriba con
   * CreatePlayerApiDto real.
   */
  importPlayersFromCsv(
    teamId: string,
    championshipId: string,
    organizationId: string,
    csvContent: string,
  ): Observable<CsvImportResult> {
    const lines = csvContent.split('\n').filter((line) => line.trim() !== '');
    if (lines.length < 2) {
      return throwError(
        () =>
          new Error(
            'El archivo CSV debe tener al menos una fila de encabezado y una fila de datos',
          ),
      );
    }

    const dataLines = lines.slice(1);
    const result: CsvImportResult = {
      playersImported: 0,
      playersSkipped: [],
      warnings: [],
      errors: [],
    };

    return from(dataLines).pipe(
      mergeMap((line, index) => {
        const cols = line.split(',').map((col) => col.trim());

        if (cols.length < 4) {
          result.errors.push(
            `Línea ${index + 2}: Formato inválido. Se requieren al menos 4 columnas`,
          );
          return of(null);
        }

        const firstName = cols[0];
        const lastName = cols[1];
        const number = parseInt(cols[2] || '0', 10);
        const positionId = parseInt(cols[3] || '1', 10);

        if (!firstName || !lastName || !number || number < 1 || number > 99) {
          result.errors.push(
            `Línea ${index + 2}: Datos inválidos (nombre, apellido o número)`,
          );
          return of(null);
        }

        const birthDate = cols[4] ? this.parseDate(cols[4]) : new Date('2000-01-01');
        const height = cols[5] ? parseInt(cols[5], 10) : undefined;
        const weight = cols[6] ? parseFloat(cols[6]) : undefined;

        return of(null).pipe(
          switchMap(() => {
            // TODO Fase 3:
            // Reemplazar por CreatePlayerApiDto real.
            // El backend espera campos snake_case distintos.
            const legacyPayload = {
              teamId,
              championshipId,
              organizationId,
              firstName,
              lastName,
              number,
              positionId,
              birthDate: birthDate ?? new Date('2000-01-01'),
              height,
              weight,
            } as unknown as CreatePlayerDto;

            return this.api.post<PlayerApiResponse>('player', legacyPayload).pipe(
              tap(() => result.playersImported++),
              catchError((error) => {
                result.errors.push(
                  `Error al crear jugador ${firstName} ${lastName}: ${error.message}`,
                );
                return of(null);
              }),
            );
          }),
        );
      }),
      toArray(),
      map(() => result),
      catchError((error) => {
        result.errors.push(`Error general en la importación: ${error.message}`);
        return of(result);
      }),
    );
  }

  // ─── Helpers ──────────────────────────────────────────────

  /**
   * Convierte fechas string a Date cuando un componente legacy lo necesita.
   * Se mantiene por compatibilidad.
   */
  parsePlayerDates<T extends {
    birthDate?: unknown;
    suspensionEndDate?: unknown;
    createdAt?: unknown;
    updatedAt?: unknown;
  }>(player: T): T {
    if (player.birthDate && typeof player.birthDate === 'string') {
      player.birthDate = new Date(player.birthDate);
    }
    if (player.suspensionEndDate && typeof player.suspensionEndDate === 'string') {
      player.suspensionEndDate = new Date(player.suspensionEndDate);
    }
    if (player.createdAt && typeof player.createdAt === 'string') {
      player.createdAt = new Date(player.createdAt);
    }
    if (player.updatedAt && typeof player.updatedAt === 'string') {
      player.updatedAt = new Date(player.updatedAt);
    }
    return player;
  }

  /**
   * Parse date string to Date object.
   * Supports: YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY
   */
  private parseDate(dateStr: string): Date | undefined {
    if (!dateStr) return undefined;
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return new Date(dateStr);

    const parts = dateStr.split(/[-\/]/);
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }

    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }

  private handleError(message: string, error: unknown): Observable<never> {
    console.error(message, error);
    const errorMessage =
      error instanceof Error ? error.message : String(error ?? 'Unknown error');
    return throwError(() => new Error(`${message}: ${errorMessage}`));
  }
}