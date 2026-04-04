import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError, from, of } from 'rxjs';
import { map, catchError, mergeMap, toArray, tap, switchMap } from 'rxjs/operators';
import {
  PlayerApiResponse,
  CreatePlayerApiDto,
  UpdatePlayerApiDto,
  // Los tipos legacy se importan solo para no romper el CSV import existente
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
   * El backend solo acepta page y limit como query params.
   */
  getPlayers(page = 1, limit = 10): Observable<PlayerApiResponse[]> {
    // TODO: confirmar si el backend devuelve array plano o wrapper paginado.
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
   * ATENCIÓN: el backend CreatePlayerDto usa campos snake_case distintos al frontend:
   *   · `name`     (no firstName)    · `lastname` (no lastName)
   *   · `team_id`  (número)          · `primary_position` (no positionId)
   * Usar CreatePlayerApiDto para garantizar el contrato correcto.
   */
  createPlayer(player: CreatePlayerApiDto): Observable<PlayerApiResponse> {
    return this.api.post<PlayerApiResponse>('player', player).pipe(
      catchError((err) => this.handleError('Error creating player', err)),
    );
  }

  /**
   * Update a player. Uses PUT /player/:id (requires auth).
   *
   * Antes: api.patch — cambiado a api.put según routes.ts del backend.
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

  // ─── Métodos no confirmados — TODO ───────────────────────────────────────────
  //
  // El controlador de GET /player solo acepta `page` y `limit`.
  // Los filtros teamId, championshipId y organizationId NO están publicados
  // como query params en el backend actual. Se dejan comentados hasta confirmar.
  //
  // Alternativa recomendada mientras no hay endpoint:
  //   · Obtener jugadores vía lista paginada y filtrar en cliente (solo viable
  //     si el conjunto es pequeño) o esperar endpoint dedicado.
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Get players by team.
   * TODO: sin endpoint confirmado — GET /player no acepta teamId como query param.
   *       Verificar si el backend planea añadir este filtro.
   */
  getPlayersByTeam(teamId: string): Observable<PlayerApiResponse[]> {
    // PROVISIONAL: se envía teamId como query param aunque no está documentado.
    // Si el backend lo ignora, devolverá todos los jugadores paginados.
    // Sustituir por endpoint real cuando sea confirmado.
    return this.api.get<PlayerApiResponse[]>('player', { teamId }).pipe(
      catchError((err) => this.handleError('Error fetching players by team', err)),
    );
  }

  /**
   * Get players by championship.
   * TODO: sin endpoint confirmado — championshipId no es un query param
   *       documentado en GET /player.
   */
  // getPlayersByChampionship(championshipId: string): Observable<PlayerApiResponse[]> {
  //   return this.api.get<PlayerApiResponse[]>('player', { championshipId }).pipe(
  //     catchError((err) => this.handleError('Error fetching championship players', err)),
  //   );
  // }

  /**
   * Get players by organization.
   * TODO: sin endpoint confirmado — organizationId no es un query param
   *       documentado en GET /player.
   */
  // getPlayersByOrganization(organizationId: string): Observable<PlayerApiResponse[]> {
  //   return this.api.get<PlayerApiResponse[]>('player', { organizationId }).pipe(
  //     catchError((err) => this.handleError('Error fetching organization players', err)),
  //   );
  // }

  // ─── CSV Import ───────────────────────────────────────────────────────────────
  //
  // Clasificación de operaciones internas:
  //   · createPlayer() → CONFIRMADA la ruta, pero el DTO de entrada difiere mucho
  //     del frontend. El CSV usa campos camelCase (firstName, lastName) que NO
  //     coinciden con el backend (name, lastname, team_id numérico, player_id).
  //     La creación vía CSV está ROTA hasta que se mapeen los campos correctamente.
  //   · Búsqueda por `document` → NO confirmada (no existe query param document).
  //   · teamId en createPlayer → el backend espera team_id: number, no string.
  //
  // TODO Fase 3: reescribir importPlayersFromCsv con CreatePlayerApiDto real.
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Import players from CSV.
   * CSV format: nombre,apellido,numero,posicionId,fecha_nacimiento,altura,peso
   *
   * AVISO: Este método está PARCIALMENTE ROTO hasta que se actualice el DTO:
   *   · El DTO que se construye usa camelCase (firstName, lastName, etc.)
   *     pero el backend espera snake_case (name, lastname, team_id numérico).
   *   · El campo teamId se envía como string pero el backend espera team_id: number.
   *   · No se valida duplicados por documento (no hay query param `document`).
   *
   * TODO Fase 3: reemplazar el DTO interno por CreatePlayerApiDto.
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
        () => new Error('El archivo CSV debe tener al menos una fila de encabezado y una fila de datos'),
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
          result.errors.push(`Línea ${index + 2}: Formato inválido. Se requieren al menos 4 columnas`);
          return of(null);
        }

        const firstName = cols[0];
        const lastName = cols[1];
        const number = parseInt(cols[2] || '0', 10);
        const positionId = parseInt(cols[3] || '1', 10);

        if (!firstName || !lastName || !number || number < 1 || number > 99) {
          result.errors.push(`Línea ${index + 2}: Datos inválidos (nombre, apellido o número)`);
          return of(null);
        }

        const birthDate = cols[4] ? this.parseDate(cols[4]) : new Date('2000-01-01');
        const height = cols[5] ? parseInt(cols[5], 10) : undefined;
        const weight = cols[6] ? parseFloat(cols[6]) : undefined;

        return of(null).pipe(
          switchMap(() => {
            // TODO Fase 3: migrar a CreatePlayerApiDto real.
            // El backend espera: name, lastname, team_id (number), player_id (number), etc.
            // Este payload actual NO es compatible con el backend y fallará.
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
            } as any; // PROVISIONAL — no compatible con CreatePlayerApiDto

            return this.api.post<PlayerApiResponse>('player', legacyPayload).pipe(
              tap(() => result.playersImported++),
              catchError((error) => {
                result.errors.push(`Error al crear jugador ${firstName} ${lastName}: ${error.message}`);
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
   * Convierte las fechas string del PlayerApiResponse a objetos Date.
   * Útil cuando se necesita un Player (con Date) en lugar de PlayerApiResponse (con string).
   * Se mantiene para compatibilidad con componentes que usan el tipo Player.
   */
  parsePlayerDates<T extends {
    birthDate?: any;
    suspensionEndDate?: any;
    createdAt?: any;
    updatedAt?: any;
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

  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
}
