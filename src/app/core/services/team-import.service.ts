// ─────────────────────────────────────────────────────────────
// team-import.service.ts
// Servicio PURO de parseo — sin conexiones HTTP.
//
// Recibe File[] (todos los archivos arrastrados al drop zone) y
// devuelve ImportedTeamPayload con la estructura completa del equipo
// lista para preview. El componente decide qué hacer con el resultado.
//
// Flujo:
//   File[] → classifyFiles() → parseExcel() → ImportedTeamPayload
// ─────────────────────────────────────────────────────────────

import { Injectable } from '@angular/core';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

/** Estado de validación de un campo individual */
export interface FieldError {
  row:     number;   // 0 = encabezado del equipo, >0 = fila de jugador
  field:   string;
  message: string;
}

/** Jugador tal como llega del Excel, con la foto adjuntada si existe */
export interface ImportedPlayer {
  number:       number;
  firstName:    string;
  lastName:     string;
  nickName:     string | null;
  position:     string;         // abbreviation normalizada: DEL, DEF, MED, POR…
  birthDate:    string | null;  // YYYY-MM-DD
  height:       number | null;
  weight:       number | null;

  // Archivo local — el componente crea la preview con URL.createObjectURL()
  photoFile:    File | null;
  photoFileName: string | null; // nombre del archivo de foto

  errors: FieldError[];
}

/** Resultado completo del parseo — listo para mostrar en preview */
export interface ImportedTeamPayload {
  // Datos del equipo
  name:           string;
  shortname:      string;
  coachName:      string;
  coachPhone:     string | null;
  location:       string | null;
  primaryColor:   string;
  secondaryColor: string;

  // Archivos identificados — el componente crea las previews con URL.createObjectURL()
  logoFile:      File | null;
  logoFileName:  string | null; // nombre del archivo de logo
  documentFile:  File | null;
  documentFileName: string | null; // nombre del archivo de documento
  excelFile:     File | null;

  // Jugadores parseados
  players: ImportedPlayer[];

  // Diagnóstico
  fileMap:  FileMap;
  errors:   FieldError[];        // errores bloqueantes
  warnings: string[];            // avisos no bloqueantes

  // false si hay errores obligatorios sin resolver
  isValid: boolean;
}

/** Mapa de archivos clasificados antes de parsear */
interface FileMap {
  excel:    File | null;
  logo:     File | null;
  document: File | null;
  // clave: "{numero}_{apellido_lowercase}" → File
  playerPhotos: Map<string, File>;
  unrecognized: File[];
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const EXCEL_EXTENSIONS  = new Set(['.xlsx', '.xls', '.csv']);
const IMAGE_EXTENSIONS  = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const DOC_EXTENSIONS    = new Set(['.pdf', '.doc', '.docx']);

/** Mapeo case-insensitive de abreviaciones y labels completos → code canónico */
const POSITION_MAP: Record<string, string> = {
  // Portero
  por: 'POR', portero: 'POR', goalkeeper: 'POR', gk: 'POR',
  // Defensa
  def: 'DEF', defensa: 'DEF', defender: 'DEF', df: 'DEF',
  // Mediocampista
  med: 'MED', mediocampista: 'MED', midfielder: 'MED', mf: 'MED', mc: 'MED',
  // Delantero
  del: 'DEL', delantero: 'DEL', forward: 'DEL', fw: 'DEL', st: 'DEL',
  // Pivot (futsal / básquetbol)
  piv: 'PIV', pivot: 'PIV',
  // Libero (voleibol)
  lib: 'LIB', libero: 'LIB', líbero: 'LIB',
};

const DEFAULT_PRIMARY_COLOR   = '#1a56db';
const DEFAULT_SECONDARY_COLOR = '#e74694';

// ─────────────────────────────────────────────────────────────
// SERVICE
// ─────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class TeamImportService {

  /**
   * Punto de entrada principal.
   * Recibe todos los archivos arrastrados al drop zone y devuelve
   * un ImportedTeamPayload con preview lista para mostrar al coach.
   */
  async processFiles(files: File[]): Promise<ImportedTeamPayload> {
    const fileMap = this.classifyFiles(files);
    const errors:   FieldError[] = [];
    const warnings: string[]     = [];

    // ── Advertencias por archivos no reconocidos ──────────────
    for (const f of fileMap.unrecognized) {
      warnings.push(`Archivo ignorado: "${f.name}" (formato no reconocido)`);
    }

    // ── Validar que existe el Excel ───────────────────────────
    if (!fileMap.excel) {
      errors.push({ row: 0, field: 'excel', message: 'Falta el archivo equipo.xlsx (o .csv)' });
      return this.emptyPayload(fileMap, errors, warnings);
    }

    // ── Parsear Excel ─────────────────────────────────────────
    let teamRow:    Record<string, unknown>;
    let playerRows: Record<string, unknown>[];

    try {
      ({ teamRow, playerRows } = await this.parseExcel(fileMap.excel));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push({ row: 0, field: 'excel', message: `Error al leer el Excel: ${msg}` });
      return this.emptyPayload(fileMap, errors, warnings, fileMap.excel);
    }

    // ── Mapear equipo ─────────────────────────────────────────
    const teamErrors: FieldError[] = [];

    const name = this.str(teamRow['nombre']);
    if (!name) teamErrors.push({ row: 0, field: 'nombre', message: 'El nombre del equipo es obligatorio' });

    const shortname = this.str(teamRow['nombre_corto']);
    if (!shortname) teamErrors.push({ row: 0, field: 'nombre_corto', message: 'El nombre corto es obligatorio' });

    const coachName = this.str(teamRow['entrenador']);
    if (!coachName) teamErrors.push({ row: 0, field: 'entrenador', message: 'El nombre del entrenador es obligatorio' });

    // Leer nombres de archivos desde el Excel
    const logoName = this.str(teamRow['logo']);
    const documentName = this.str(teamRow['documento']);
    const filesByName = (fileMap as any).filesByName as Map<string, File>;

    // Buscar archivos por nombre del Excel
    const logoFile = logoName ? filesByName.get(this.normalizeKey(logoName).toLowerCase()) ?? null : null;
    const documentFile = documentName ? filesByName.get(this.normalizeKey(documentName).toLowerCase()) ?? null : null;

    // ── Mapear jugadores ──────────────────────────────────────
    const players: ImportedPlayer[] = [];

    for (let i = 0; i < playerRows.length; i++) {
      const row    = playerRows[i];
      const rowNum = i + 2; // fila 1 = headers, fila 2+ = jugadores
      const pErrors: FieldError[] = [];

      const numRaw   = row['numero'];
      const number   = numRaw !== undefined && numRaw !== '' ? Number(numRaw) : NaN;
      const lastName = this.str(row['apellido']);
      const firstName = this.str(row['nombre']);

      if (isNaN(number) || number < 1 || number > 99) {
        pErrors.push({ row: rowNum, field: 'numero', message: `Número de camiseta inválido: "${numRaw}"` });
      }
      if (!firstName) {
        pErrors.push({ row: rowNum, field: 'nombre', message: 'El nombre es obligatorio' });
      }
      if (!lastName) {
        pErrors.push({ row: rowNum, field: 'apellido', message: 'El apellido es obligatorio' });
      }

      const posRaw  = this.str(row['posicion']);
      const position = posRaw ? (POSITION_MAP[posRaw.toLowerCase()] ?? posRaw.toUpperCase()) : '';
      if (!position) {
        pErrors.push({ row: rowNum, field: 'posicion', message: 'La posición es obligatoria' });
      }

      // Fecha: acepta YYYY-MM-DD, DD/MM/YYYY, número serial de Excel
      const birthDate = this.parseDateCell(row['fecha_nacimiento']);

      // Leer nombre de foto desde el Excel
      const photoName = this.str(row['foto']);
      const photoFile = photoName ? filesByName.get(this.normalizeKey(photoName).toLowerCase()) ?? null : null;
      const photoFileName = photoFile?.name ?? null;

      players.push({
        number:   isNaN(number) ? 0 : number,
        firstName,
        lastName,
        nickName: this.str(row['apodo']) || null,
        position,
        birthDate,
        height:   this.num(row['altura_cm']),
        weight:   this.num(row['peso_kg']),
        photoFile,
        photoFileName,
        errors:   pErrors,
      });
    }

    // Advertir archivos no utilizados (todos los archivos que no son Excel ni los mencionados)
    const usedFileNames = new Set<string>();
    if (logoFile) usedFileNames.add(logoName.toLowerCase());
    if (documentFile) usedFileNames.add(documentName.toLowerCase());
    players.forEach(p => {
      if (p.photoFileName) usedFileNames.add(this.normalizeKey(p.photoFileName).toLowerCase());
    });

    for (const [normalizedName] of filesByName) {
      if (!usedFileNames.has(normalizedName)) {
        warnings.push(`Archivo "${normalizedName}" no se usa en el Excel`);
      }
    }

    const allErrors = [
      ...errors,
      ...teamErrors,
      ...players.flatMap(p => p.errors),
    ];

    const isValid =
      allErrors.length === 0 &&
      !!name && !!shortname && !!coachName &&
      players.every(p => p.errors.length === 0);

    return {
      name:           name          || '',
      shortname:      shortname     || '',
      coachName:      coachName     || '',
      coachPhone:     this.str(teamRow['telefono_entrenador']) || null,
      location:       this.str(teamRow['ciudad'])             || null,
      primaryColor:   this.str(teamRow['color_primario'])     || DEFAULT_PRIMARY_COLOR,
      secondaryColor: this.str(teamRow['color_secundario'])   || DEFAULT_SECONDARY_COLOR,
      logoFile:       logoFile,
      logoFileName:   logoFile?.name ?? null,
      documentFile:   documentFile,
      documentFileName: documentFile?.name ?? null,
      excelFile:      fileMap.excel,
      players,
      fileMap,
      errors:         allErrors,
      warnings,
      isValid,
    };
  }

  // ─────────────────────────────────────────────────────────────
  // Clasificación de archivos por nombre
  // ─────────────────────────────────────────────────────────────

  private classifyFiles(files: File[]): FileMap {
    const map: FileMap = {
      excel:        null,
      logo:         null,
      document:     null,
      playerPhotos: new Map(),
      unrecognized: [],
    };

    // Mapa de todos los archivos por nombre normalizado (sin extensión)
    const filesByNormalizedName = new Map<string, File>();

    for (const file of files) {
      const name = file.name.toLowerCase();
      const ext  = this.getExtension(name);
      const normalizedName = this.getFileNameWithoutExt(name).toLowerCase();

      // equipo.xlsx / equipo.csv / equipo.xls
      if (name.startsWith('equipo') && EXCEL_EXTENSIONS.has(ext)) {
        map.excel = file;
        continue;
      }

      // Guardar todos los demás archivos en el mapa por nombre normalizado
      filesByNormalizedName.set(normalizedName, file);
    }

    // Crear un getter que devuelva archivos por nombre (para uso en el parseo)
    (map as any).filesByName = filesByNormalizedName;

    return map;
  }

  // ─────────────────────────────────────────────────────────────
  // Parser Excel (SheetJS cargado dinámicamente)
  // ─────────────────────────────────────────────────────────────

  private async parseExcel(
    file: File
  ): Promise<{ teamRow: Record<string, unknown>; playerRows: Record<string, unknown>[] }> {

    // Import dinámico → SheetJS (~600 KB) solo se carga cuando se usa
    const XLSX = await import('xlsx');

    const buffer    = await file.arrayBuffer();
    const workbook  = XLSX.read(buffer, { type: 'array', cellDates: true });

    const isCsv = file.name.toLowerCase().endsWith('.csv');

    if (isCsv) {
      return this.parseCsv(workbook, XLSX);
    }

    // ── Excel con 2 hojas ─────────────────────────────────────
    const sheetTeam    = workbook.Sheets['Equipo']    ?? workbook.Sheets[workbook.SheetNames[0]];
    const sheetPlayers = workbook.Sheets['Jugadores'] ?? workbook.Sheets[workbook.SheetNames[1]];

    if (!sheetTeam) {
      throw new Error('No se encontró la hoja "Equipo"');
    }

    // Hoja Equipo: fila 1 = headers, fila 2 = datos → tomamos la primera fila de datos
    const teamRows = XLSX.utils.sheet_to_json(sheetTeam, {
      defval: '',
      raw:    false,
    }) as Record<string, unknown>[];

    if (!teamRows.length) {
      throw new Error('La hoja "Equipo" está vacía');
    }

    // Normalizar headers (quitar tildes, lowercase, trim)
    const teamRow = this.normalizeRowKeys(teamRows[0]);

    // Hoja Jugadores
    const playerRows = sheetPlayers
      ? (XLSX.utils.sheet_to_json(sheetPlayers, {
          defval: '',
          raw:    false,
        }) as Record<string, unknown>[]).map((r: Record<string, unknown>) => this.normalizeRowKeys(r))
      : [];

    return { teamRow, playerRows };
  }

  /** Parsea CSV con secciones #EQUIPO y #JUGADORES */
  private parseCsv(
    workbook: import('xlsx').WorkBook,
    XLSX: typeof import('xlsx')
  ): { teamRow: Record<string, unknown>; playerRows: Record<string, unknown>[] } {
    const sheet    = workbook.Sheets[workbook.SheetNames[0]];
    const allRows  = XLSX.utils.sheet_to_csv(sheet).split('\n').map((r: string) => r.trim()).filter(Boolean);

    let section: 'none' | 'equipo' | 'jugadores' = 'none';
    let teamHeaders:    string[] = [];
    let playerHeaders:  string[] = [];
    let teamData:       string[] = [];
    let playerData:     string[] = [];

    for (const line of allRows) {
      if (line.toLowerCase().startsWith('#equipo'))    { section = 'equipo';    continue; }
      if (line.toLowerCase().startsWith('#jugadores')) { section = 'jugadores'; continue; }
      if (!line) continue;

      if (section === 'equipo') {
        if (!teamHeaders.length) { teamHeaders = this.splitCsv(line); }
        else                     { teamData.push(line); }
      } else if (section === 'jugadores') {
        if (!playerHeaders.length) { playerHeaders = this.splitCsv(line); }
        else                       { playerData.push(line); }
      }
    }

    // Si no hay marcadores de sección, asumir formato simple (solo jugadores en hoja única)
    if (section === 'none') {
      throw new Error('El CSV debe tener secciones #EQUIPO y #JUGADORES');
    }

    const teamRow = teamData.length
      ? Object.fromEntries(
          teamHeaders.map((h, i) => [
            this.normalizeKey(h),
            this.splitCsv(teamData[0])[i] ?? '',
          ])
        )
      : {};

    const playerRows = playerData.map((line: string) => {
      const cols = this.splitCsv(line);
      return Object.fromEntries(
        playerHeaders.map((h, i) => [this.normalizeKey(h), cols[i] ?? ''])
      );
    });

    return { teamRow, playerRows };
  }

  // ─────────────────────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────────────────────

  /** Normaliza las claves de una fila: trim + lowercase + sin tildes */
  private normalizeRowKeys(row: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(row).map(([k, v]) => [this.normalizeKey(k), v])
    );
  }

  /** Convierte "Nombre Corto" → "nombre_corto", quita tildes */
  private normalizeKey(str: string): string {
    return (str ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_');
  }

  private getExtension(filename: string): string {
    const idx = filename.lastIndexOf('.');
    return idx >= 0 ? filename.slice(idx) : '';
  }

  private getFileNameWithoutExt(filename: string): string {
    const idx = filename.lastIndexOf('.');
    return idx >= 0 ? filename.slice(0, idx) : filename;
  }

  /** Parsea una celda de fecha: Date nativo, YYYY-MM-DD, DD/MM/YYYY o serial Excel */
  private parseDateCell(raw: unknown): string | null {
    if (!raw || raw === '') return null;

    // SheetJS con cellDates:true ya devuelve Date
    if (raw instanceof Date && !isNaN(raw.getTime())) {
      return raw.toISOString().split('T')[0];
    }

    const str = String(raw).trim();

    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

    // DD/MM/YYYY
    const dmy = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dmy) return `${dmy[3]}-${dmy[2].padStart(2,'0')}-${dmy[1].padStart(2,'0')}`;

    // Número serial de Excel (días desde 1900-01-01)
    const serial = Number(str);
    if (!isNaN(serial) && serial > 1000) {
      const date = new Date((serial - 25569) * 86400 * 1000);
      if (!isNaN(date.getTime())) return date.toISOString().split('T')[0];
    }

    return null;
  }

  private str(v: unknown): string {
    return v != null ? String(v).trim() : '';
  }

  private num(v: unknown): number | null {
    const n = Number(v);
    return !isNaN(n) && String(v).trim() !== '' ? n : null;
  }

  /** Split CSV respetando campos entre comillas */
  private splitCsv(line: string): string[] {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line.charAt(i);
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) { result.push(cur.trim()); cur = ''; continue; }
      cur += ch;
    }
    result.push(cur.trim());
    return result;
  }

  /** Crea un payload vacío para casos de error temprano */
  private emptyPayload(
    fileMap: FileMap,
    errors: FieldError[],
    warnings: string[],
    excelFile?: File
  ): ImportedTeamPayload {
    return {
      name: '', shortname: '', coachName: '', coachPhone: null,
      location: null, primaryColor: DEFAULT_PRIMARY_COLOR,
      secondaryColor: DEFAULT_SECONDARY_COLOR,
      logoFile: null,
      logoFileName: null,
      documentFile: null,
      documentFileName: null,
      excelFile: excelFile ?? null,
      players: [], fileMap, errors, warnings, isValid: false,
    };
  }
}