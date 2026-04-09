import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError, from, of } from 'rxjs';
import { map, catchError, mergeMap, toArray, tap, switchMap } from 'rxjs/operators';
import {
  PlayerApiResponse,
  PlayerApiPaginatedResponse,
  CreatePlayerApiDto,
  UpdatePlayerApiDto,
  // Legacy type kept only to avoid breaking old CSV-related frontend flows
  CreatePlayerDto,
} from '../models/player.model';

// ─────────────────────────────────────────────────────────────
// Backend confirmado (Iceplay-Fropen/src/presentation/routes.ts):
//   router.use('/api/players', PlayerRoutes.routes)
//
//   GET    /players            → getPlayers (page, limit)
//   GET    /players/:id        → getPlayerById
//   POST   /players            → createPlayer  (auth)
//   PUT    /players/:id        → updatePlayer  (auth)
//   DELETE /players/:id        → deletePlayer  (auth)
//
// NO confirmados como query params en GET /players:
//   teamId, championshipId, organizationId, document, name
//   (el controller solo lee page y limit de req.query)
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

  /**
   * GET /players?page=&limit=
   * Confirmado: backend devuelve wrapper paginado { page, limit, total, next, prev, players[] }.
   * NO devuelve array plano.
   * Filtros soportados por HTTP: SÓLO page y limit.
   * teamId, organizationId, championshipId → el controller los ignora (no los lee de req.query).
   */
  getPlayers(page = 1, limit = 10): Observable<PlayerApiPaginatedResponse> {
    return this.api.get<PlayerApiPaginatedResponse>('players', { page, limit }).pipe(
      catchError((err) => this.handleError('Error fetching players', err)),
    );
  }

  /**
   * Get a single player by ID (UUIDv7). Uses GET /players/:id
   */
  getPlayerById(id: string): Observable<PlayerApiResponse> {
    return this.api.get<PlayerApiResponse>(`players/${id}`).pipe(
      catchError((err) => this.handleError('Error fetching player', err)),
    );
  }

  /**
   * Create a new player. Uses POST /players (requires auth).
   */
  createPlayer(player: CreatePlayerApiDto): Observable<PlayerApiResponse> {
    return this.api.post<PlayerApiResponse>('players', player).pipe(
      catchError((err) => this.handleError('Error creating player', err)),
    );
  }

  /**
   * Update a player. Uses PUT /players/:id (requires auth).
   */
  updatePlayer(id: string, player: UpdatePlayerApiDto): Observable<PlayerApiResponse> {
    return this.api.put<PlayerApiResponse>(`players/${id}`, player).pipe(
      catchError((err) => this.handleError('Error updating player', err)),
    );
  }

  /**
   * Delete a player. Uses DELETE /players/:id (requires auth).
   */
  deletePlayer(id: string): Observable<void> {
    return this.api
      .delete<void>(`players/${id}`)
      .pipe(catchError((err) => this.handleError('Error deleting player', err)));
  }

  /**
   * GET /players?teamId=
   * Backend: cuando se pasa teamId, el controller llama playerService.getPlayersByTeam()
   * y devuelve { players: [] } (sin wrapper de paginación).
   */
  getPlayersByTeam(teamId: string): Observable<{ players: PlayerApiResponse[] }> {
    return this.api.get<{ players: PlayerApiResponse[] }>('players', { teamId }).pipe(
      catchError((err) => this.handleError('Error fetching players by team', err)),
    );
  }

  /**
   * @deprecated-behavior FILTRO NO FUNCIONAL.
   * GET /players ignora ?championshipId=
   */
  getPlayersByChampionship(championshipId: string): Observable<PlayerApiPaginatedResponse> {
    return this.api.get<PlayerApiPaginatedResponse>('players', { championshipId }).pipe(
      catchError((err) => this.handleError('Error fetching championship players', err)),
    );
  }

  /**
   * GET /players?organizationId=&page=&limit=
   * Filtro organizationId confirmado en backend (controller + service).
   * Respuesta paginada: { page, limit, total, next, prev, players[] }.
   */
  getPlayersByOrganization(organizationId: string, page = 1, limit = 20): Observable<PlayerApiPaginatedResponse> {
    return this.api.get<PlayerApiPaginatedResponse>('players', { organizationId, page, limit }).pipe(
      catchError((err) => this.handleError('Error fetching organization players', err)),
    );
  }

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

            return this.api.post<PlayerApiResponse>('players', legacyPayload).pipe(
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