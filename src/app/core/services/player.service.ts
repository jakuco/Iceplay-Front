import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError, from, forkJoin, of } from 'rxjs';
import { map, catchError, mergeMap, toArray, tap, switchMap } from 'rxjs/operators';
import { Player, CreatePlayerDto, UpdatePlayerDto } from '../models/player.model';
import { ApiEndpoints } from '@core/constants/endpoints.const';

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
   * Get all players for a team
   */
  getPlayersByTeam(teamId: string): Observable<Player[]> {
    return this.api.get<Player[]>(ApiEndpoints.PLAYERS.BASE, { teamId }).pipe(
      map((players) => players.map((p) => this.parsePlayerDates(p))),
      catchError((error) => this.handleError('Error fetching players', error)),
    );
  }

  /**
   * Get players by championship
   */
  getPlayersByChampionship(championshipId: string): Observable<Player[]> {
    return this.api.get<Player[]>(ApiEndpoints.PLAYERS.BASE, { championshipId }).pipe(
      map((players) => players.map((p) => this.parsePlayerDates(p))),
      catchError((error) => this.handleError('Error fetching championship players', error)),
    );
  }

  /**
   * Get players by organization
   */
  getPlayersByOrganization(organizationId: string): Observable<Player[]> {
    return this.api.get<Player[]>(ApiEndpoints.PLAYERS.BASE, { organizationId }).pipe(
      map((players) => players.map((p) => this.parsePlayerDates(p))),
      catchError((error) => this.handleError('Error fetching organization players', error)),
    );
  }

  /**
   * Get a single player by ID
   */
  getPlayerById(id: string): Observable<Player> {
    return this.api.get<Player>(ApiEndpoints.PLAYERS.BY_ID(id)).pipe(
      map((player) => this.parsePlayerDates(player)),
      catchError((error) => this.handleError('Error fetching player', error)),
    );
  }

  /**
   * Create a new player
   */
  createPlayer(
    player: CreatePlayerDto & { teamId: string; championshipId: string; organizationId: string },
  ): Observable<Player> {
    return this.api.post<Player>(ApiEndpoints.PLAYERS.BASE, player).pipe(
      map((p) => this.parsePlayerDates(p)),
      catchError((error) => this.handleError('Error creating player', error)),
    );
  }

  /**
   * Update a player
   */
  updatePlayer(id: string, player: UpdatePlayerDto): Observable<Player> {
    return this.api.patch<Player>(ApiEndpoints.PLAYERS.BY_ID(id), player).pipe(
      map((p) => this.parsePlayerDates(p)),
      catchError((error) => this.handleError('Error updating player', error)),
    );
  }

  /**
   * Delete a player
   */
  deletePlayer(id: string): Observable<void> {
    return this.api
      .delete<void>(ApiEndpoints.PLAYERS.BY_ID(id))
      .pipe(catchError((error) => this.handleError('Error deleting player', error)));
  }

  /**
   * Parse date strings to Date objects
   */
  private parsePlayerDates(player: Player): Player {
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
   * Import players from CSV
   * CSV format: documento,nombre,apellido,numero,posicion,fecha_nacimiento,nacionalidad,altura,peso
   * All fields except documento, nombre, apellido, numero, posicion are optional
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

    // Skip header row
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

        // Expected format: nombre,apellido,numero,posicionId,fecha_nacimiento,altura,peso
        if (cols.length < 4) {
          result.errors.push(
            `Línea ${index + 2}: Formato inválido. Se requieren al menos 5 columnas`,
          );
          return of(null);
        }

        const firstName = cols[0];
        const lastName = cols[1];
        const number = parseInt(cols[2] || '0', 10);
        const positionId = parseInt(cols[3] || '1', 10);

        if (!firstName || !lastName || !number || number < 1 || number > 99) {
          result.errors.push(
            `Línea ${index + 2}: Datos inválidos (documento, nombre, apellido o número)`,
          );
          return of(null);
        }

        // Parse optional fields
        const birthDate = cols[4] ? this.parseDate(cols[4]) : new Date('2000-01-01');
        const height = cols[5] ? parseInt(cols[5], 10) : undefined;
        const weight = cols[6] ? parseFloat(cols[6]) : undefined;

        return of(null).pipe(
          switchMap(() => {
            const newPlayer: CreatePlayerDto & {
              teamId: string;
              championshipId: string;
              organizationId: string;
            } = {
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
            };

            return this.createPlayer(newPlayer).pipe(
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

  /**
   * Parse date string to Date object
   * Supports formats: YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY
   */
  private parseDate(dateStr: string): Date | undefined {
    if (!dateStr) return undefined;

    // Try YYYY-MM-DD format
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return new Date(dateStr);
    }

    // Try DD/MM/YYYY or DD-MM-YYYY
    const parts = dateStr.split(/[-\/]/);
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }

    // Try parsing as-is
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }

  /**
   * Handle errors
   */
  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
}
