# 📚 Documentación Completa de API - IcePlay Frontend

**Fecha**: 17 de marzo de 2026  
**Versión**: 1.0  
**Base URL**: `http://localhost:3001/api`  
**Tecnología**: Angular 21+ + RxJS + HttpClient

---

## 📑 Índice

1. [Arquitectura General](#arquitectura-general)
2. [Autenticación](#autenticación)
3. [Consultas GET](#consultas-get)
4. [Campeonatos](#campeonatos)
5. [Equipos](#equipos)
6. [Jugadores](#jugadores)
7. [Partidos](#partidos)
8. [Eventos de Partido](#eventos-de-partido)
9. [Organizaciones](#organizaciones)
10. [Patrón General de Servicios](#patrón-general-de-servicios)
11. [Manejo de Errores](#manejo-de-errores)
12. [Códigos HTTP](#códigos-http)

---

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                   COMPONENTES ANGULAR                       │
│  (championship-form, team-form, player-form, etc.)          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         SERVICIOS (.service.ts)                             │
│  (ChampionshipService, TeamService, PlayerService, etc.)    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              API SERVICE (Middleware)                       │
│  - Añade baseUrl: http://localhost:3001/api                │
│  - post<T>(path, body): Observable<T>                       │
│  - get<T>(path, params?): Observable<T>                     │
│  - patch<T>(path, body): Observable<T>                      │
│  - delete<T>(path): Observable<T>                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│           HTTP CLIENT (ANGULAR)                             │
│  + AUTH INTERCEPTOR (Añade JWT Token)                       │
│  Authorization: Bearer <token>                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│             BACKEND EXPRESS JS                              │
│         http://localhost:3001/api/...                       │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de una Solicitud

```typescript
// 1. Componente dispara acción
this.championshipService.createChampionship(data).subscribe({
  next: (result) => { /* Éxito */ },
  error: (error) => { /* Error */ }
});

// 2. Servicio ejecuta
createChampionship(championship: Partial<Championship>): Observable<Championship> {
  return this.api.post<Championship>('championships', championship)
    .pipe(
      map((c) => this.parseChampionshipDates(c)),
      catchError((error) => this.handleError('Error creating championship', error))
    );
}

// 3. ApiService realiza POST
post<T>(path: string, body: any): Observable<T> {
  console.log('POST request to:', `${this.baseUrl}/${path}`, 'with body:', body);
  return this.http.post<T>(`${this.baseUrl}/${path}`, body);
}

// 4. HttpClient + AuthInterceptor envía
// Authorization header añadido automáticamente
POST http://localhost:3001/api/championships
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
{...championship payload...}

// 5. Backend responde
// HTTP 201 Created
{id: "champ_123", name: "Liga Premier", ...}

// 6. Servicio parsea fechas
parseChampionshipDates(championship) { /* Convierte strings a Date */ }

// 7. Componente recibe datos procesados
```

---

## Autenticación

### POST /auth/login

**Ubicación**: `src/app/core/services/auth.service.ts` (línea 99)

**Descripción**: Autentica un usuario con email y contraseña.

**Método HTTP**: `POST`
**Endpoint**: `/auth/login`
**Autenticación**: ❌ NO REQUIERE (es para obtener el token)

**Solicitud**:
```json
{
  "email": "admin@example.com",
  "password": "securePass123"
}
```

**Respuesta (200 OK)**:
```json
{
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin Usuario",
    "firstName": "Admin",
    "lastName": "Usuario",
    "role": "admin",
    "organizationId": 1,
    "createdAt": "2026-03-10T08:30:00.000Z",
    "lastLoginAt": "2026-03-17T10:15:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAzODI4NDAwfQ.signature"
}
```

**Errores Posibles**:
- `400 Bad Request`: Email o contraseña incorrectos
- `401 Unauthorized`: Usuario no existe
- `422 Unprocessable Entity`: Email inválido
- `500 Internal Server Error`: Error del servidor

**Validaciones en Frontend**:
- Email no vacío y formato válido
- Password no vacío (mínimo 6 caracteres recomendado)

**Validaciones en Backend**:
- Email existe en base de datos
- Contraseña correcta (comparada con hash)
- Usuario activo

**Uso en Componentes**:
```typescript
// login.page.ts
async login(email: string, password: string) {
  try {
    await this.authService.login({ 
      email, 
      password 
    });
    // Redirige automáticamente según rol
    // super_admin → /super-admin
    // admin → /admin/dashboard
  } catch (error) {
    this.snackBar.open('Error al iniciar sesión', 'Cerrar');
  }
}
```

**Post-Login**:
- Token guardado en `localStorage` con clave `token`
- User guardado en `localStorage` con clave `user`
- Token se agrega automáticamente a futuras requests mediante `AuthInterceptor`
- Sesión se restaura al recargar página desde `localStorage`

---

## Consultas GET

Las consultas GET obtienen datos del servidor. Todas requieren autenticación (excepto login).

### GET /championships

**Ubicación**: `src/app/core/services/championship.service.ts` (línea 14)

**Método HTTP**: `GET`
**Endpoint**: `/championships`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene todos los campeonatos de una organización.

**Parámetros Query**:

| Parámetro | Tipo | Descripción | Requerido | Ejemplo |
|-----------|------|-------------|-----------|---------|
| `organizationId` | string | ID de la organización | ❌ Opcional | "1" |

**Solicitud sin parámetros** (obtiene todos):
```
GET /championships
Authorization: Bearer <token>
```

**Solicitud con parámetros**:
```
GET /championships?organizationId=1
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
[
  {
    "id": "champ_550e8400e29b41d4a716446655440000",
    "organizationId": 1,
    "name": "Liga Premier 2024-2025",
    "slug": "liga-premier-2024-2025",
    "description": "Campeonato principal",
    "sport": "football",
    "format": "league",
    "season": "2024-2025",
    "status": "active",
    "logo": "https://...",
    "settings": { /* ... */ },
    "startDate": "2026-03-17T00:00:00Z",
    "endDate": "2026-06-30T00:00:00Z",
    "totalTeams": 20,
    "totalMatches": 380,
    "matchesPlayed": 45,
    "createdAt": "2026-03-17T10:30:00Z",
    "updatedAt": "2026-03-17T10:30:00Z"
  },
  {
    "id": "champ_660e8400e29b41d4a716446655440001",
    "organizationId": 1,
    "name": "Copa del Rey 2024",
    "slug": "copa-del-rey-2024",
    ...
  }
]
```

**Errores Posibles**:
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Sin permiso
- `500 Internal Server Error`: Error del servidor

**Respuesta cuando no hay campeonatos**:
```json
[]
```

**Uso en Componentes**:
```typescript
this.championshipService.getChampionships(user.organizationId).subscribe({
  next: (championships) => {
    this.championships.set(championships);
    console.log('Campeonatos cargados:', championships);
  },
  error: (error) => {
    this.snackBar.open('Error al cargar campeonatos', 'Cerrar');
  }
});
```

---

### GET /championships?status=active

**Ubicación**: `src/app/core/services/championship.service.ts` (línea 25)

**Método HTTP**: `GET`
**Endpoint**: `/championships`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene solo los campeonatos activos (para vista pública).

**Parámetros Query**:

| Parámetro | Tipo | Valor |
|-----------|------|-------|
| `status` | string | `active` |

**Solicitud**:
```
GET /championships?status=active
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
[
  {
    "id": "champ_550e8400e29b41d4a716446655440000",
    "name": "Liga Premier 2024-2025",
    "status": "active",
    "startDate": "2026-03-17T00:00:00Z",
    ...
  }
]
```

**Uso en Componentes**:
```typescript
this.championshipService.getActiveChampionships().subscribe({
  next: (championships) => {
    this.activeChampionships.set(championships);
  }
});
```

---

### GET /championships/:id

**Ubicación**: `src/app/core/services/championship.service.ts` (línea 32)

**Método HTTP**: `GET`
**Endpoint**: `/championships/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene un campeonato específico por ID.

**Parámetros Path**:

| Parámetro | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `id` | string | ID del campeonato | ✅ Sí |

**Solicitud**:
```
GET /championships/champ_550e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
{
  "id": "champ_550e8400e29b41d4a716446655440000",
  "organizationId": 1,
  "name": "Liga Premier 2024-2025",
  "slug": "liga-premier-2024-2025",
  "description": "Campeonato principal",
  "sport": "football",
  "format": "league",
  "season": "2024-2025",
  "status": "active",
  "logo": "https://...",
  "settings": {
    "pointsForWin": 3,
    "pointsForDraw": 1,
    "pointsForLoss": 0,
    "roundsCount": 1,
    "tiebreakers": ["goal_difference", "goals_for"],
    "allowDraws": true,
    "extraTimeAllowed": false,
    "penaltyShootoutAllowed": true,
    "teamsPerGroup": 4,
    "teamsAdvancePerGroup": 2
  },
  "startDate": "2026-03-17T00:00:00Z",
  "endDate": "2026-06-30T00:00:00Z",
  "registrationStartDate": "2026-03-01T00:00:00Z",
  "registrationEndDate": "2026-03-15T00:00:00Z",
  "totalTeams": 20,
  "totalMatches": 380,
  "matchesPlayed": 45,
  "createdAt": "2026-03-17T10:30:00Z",
  "updatedAt": "2026-03-17T10:30:00Z"
}
```

**Errores Posibles**:
- `401 Unauthorized`: No autenticado
- `404 Not Found`: Campeonato no existe
- `500 Internal Server Error`: Error del servidor

**Uso en Componentes** (ejemplo: carga de formulario de edición):
```typescript
// championship-form.page.ts ngOnInit()
this.championshipService.getChampionshipById(id).subscribe({
  next: (championship) => {
    this.championship.set(championship);
    // Llenar el formulario con los datos
    this.form.patchValue({
      name: championship.name,
      sport: championship.sport,
      season: championship.season,
      format: championship.format,
      startDate: championship.startDate,
      description: championship.description,
      pointsForWin: championship.settings?.pointsForWin ?? 3,
      pointsForDraw: championship.settings?.pointsForDraw ?? 1,
      pointsForLoss: championship.settings?.pointsForLoss ?? 0
    });
  }
});
```

---

### GET /teams

**Ubicación**: `src/app/core/services/team.service.ts` (línea 25)

**Método HTTP**: `GET`
**Endpoint**: `/teams`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene equipos con filtros.

**Parámetros Query**:

| Parámetro | Tipo | Descripción | Controla |
|-----------|------|-------------|----------|
| `championshipId` | string | Equipos de un campeonato | Filtrar por campeonato |
| `organizationId` | string | Equipos de una organización | Filtrar por organización |

**Solicitud - Equipos de un campeonato**:
```
GET /teams?championshipId=champ_550e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

**Solicitud - Equipos de una organización**:
```
GET /teams?organizationId=1
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
[
  {
    "id": "team_660e8400e29b41d4a716446655440000",
    "championshipId": "champ_550e8400e29b41d4a716446655440000",
    "organizationId": 1,
    "name": "Real Madrid CF",
    "shortName": "RMA",
    "slug": "real-madrid-cf",
    "logo": "https://...",
    "primaryColor": "#FFFFFF",
    "secondaryColor": "#000000",
    "homeVenue": "Estadio Santiago Bernabéu",
    "city": "Madrid",
    "managerName": "Carlo Ancelotti",
    "managerPhone": "+34912345678",
    "managerEmail": "carlo@realmadrid.com",
    "isActive": true,
    "hasActiveMatches": true,
    "playersCount": 25,
    "createdAt": "2026-03-17T10:35:00Z",
    "updatedAt": "2026-03-17T10:35:00Z"
  },
  {
    "id": "team_770e8400e29b41d4a716446655440001",
    "name": "Barcelona FC",
    ...
  }
]
```

**Uso en Componentes** (ejemplo: listar equipos de un campeonato):
```typescript
// championships-list.page.ts
this.teamService.getTeams(champId).subscribe({
  next: (teams) => {
    this.teams.set(teams);
    console.log(`${teams.length} equipos cargados`);
  },
  error: (error) => {
    this.snackBar.open('Error al cargar equipos', 'Cerrar');
  }
});
```

---

### GET /teams/:id

**Ubicación**: `src/app/core/services/team.service.ts` (línea 45)

**Método HTTP**: `GET`
**Endpoint**: `/teams/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene un equipo específico.

**Solicitud**:
```
GET /teams/team_660e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
{
  "id": "team_660e8400e29b41d4a716446655440000",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "organizationId": 1,
  "name": "Real Madrid CF",
  "shortName": "RMA",
  "slug": "real-madrid-cf",
  "logo": "https://...",
  "coverImage": "https://...",
  "primaryColor": "#FFFFFF",
  "secondaryColor": "#000000",
  "foundedYear": 1902,
  "homeVenue": "Estadio Santiago Bernabéu",
  "city": "Madrid",
  "managerName": "Carlo Ancelotti",
  "managerPhone": "+34912345678",
  "managerEmail": "carlo@realmadrid.com",
  "isActive": true,
  "hasActiveMatches": true,
  "playersCount": 25,
  "createdAt": "2026-03-17T10:35:00Z",
  "updatedAt": "2026-03-17T10:35:00Z"
}
```

---

### GET /teams/:id/players

**Ubicación**: `src/app/core/services/team.service.ts` (línea 55)

**Método HTTP**: `GET`
**Endpoint**: `/teams/:id` + llamada a `/players` (forkJoin interno)
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene un equipo con todos sus jugadores.

**Método en Servicio**:
```typescript
getTeamWithPlayers(id: string): Observable<TeamWithPlayers> {
  return forkJoin({
    team: this.getTeamById(id),
    players: this.getPlayers(id)
  }).pipe(
    map(({ team, players }) => ({
      ...team,
      players
    }))
  );
}
```

**Respuesta (200 OK)**:
```json
{
  "id": "team_660e8400e29b41d4a716446655440000",
  "name": "Real Madrid CF",
  "shortName": "RMA",
  "playersCount": 3,
  "players": [
    {
      "id": "player_770e8400e29b41d4a716446655440000",
      "firstName": "Cristiano",
      "lastName": "Ronaldo",
      "fullName": "Cristiano Ronaldo",
      "number": 7,
      "position": "ST",
      "status": "active"
    },
    {
      "id": "player_880e8400e29b41d4a716446655440001",
      "firstName": "Vinícius",
      "lastName": "Júnior",
      "fullName": "Vinícius Júnior",
      "number": 11,
      "position": "LW",
      "status": "active"
    },
    {
      "id": "player_990e8400e29b41d4a716446655440002",
      "firstName": "Jude",
      "lastName": "Bellingham",
      "fullName": "Jude Bellingham",
      "number": 5,
      "position": "CM",
      "status": "active"
    }
  ]
}
```

**Uso en Componentes**:
```typescript
this.teamService.getTeamWithPlayers(teamId).subscribe({
  next: (teamWithPlayers) => {
    this.team.set(teamWithPlayers.team);
    this.players.set(teamWithPlayers.players);
  }
});
```

---

### GET /players

**Ubicación**: `src/app/core/services/player.service.ts` (línea 23-43)

**Método HTTP**: `GET`
**Endpoint**: `/players`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene jugadores con múltiples filtros opcionales.

**Parámetros Query**:

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `teamId` | string | Jugadores de un equipo |
| `championshipId` | string | Jugadores de un campeonato |
| `organizationId` | string | Jugadores de una organización |

**Variantes**:

#### A. Obtener jugadores por equipo
```
GET /players?teamId=team_660e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

**Respuesta**:
```json
[
  {
    "id": "player_770e8400e29b41d4a716446655440000",
    "teamId": "team_660e8400e29b41d4a716446655440000",
    "championshipId": "champ_550e8400e29b41d4a716446655440000",
    "organizationId": 1,
    "firstName": "Cristiano",
    "lastName": "Ronaldo",
    "fullName": "Cristiano Ronaldo",
    "number": 7,
    "position": "ST",
    "secondaryPosition": "LW",
    "nickname": "CR7",
    "birthDate": "1985-02-05T00:00:00Z",
    "age": 41,
    "nationality": "Portugal",
    "height": 187,
    "weight": 84,
    "photo": "https://...",
    "status": "active",
    "stats": {
      "matchesPlayed": 15,
      "minutesPlayed": 1350,
      "goals": 12,
      "assists": 3,
      "yellowCards": 0,
      "redCards": 0
    },
    "createdAt": "2026-03-17T10:40:00Z",
    "updatedAt": "2026-03-17T10:40:00Z"
  }
]
```

#### B. Obtener jugadores por campeonato
```
GET /players?championshipId=champ_550e8400e29b41d4a716446655440000
```

#### C. Obtener jugadores por organización
```
GET /players?organizationId=1
```

**Uso en Componentes**:
```typescript
// Cargar jugadores de un equipo
this.playerService.getPlayersByTeam(teamId).subscribe({
  next: (players) => {
    this.players.set(players);
  }
});

// Cargar jugadores de un campeonato
this.playerService.getPlayersByChampionship(champId).subscribe({
  next: (players) => {
    this.allPlayers.set(players);
  }
});
```

---

### GET /players/:id

**Ubicación**: `src/app/core/services/player.service.ts` (línea 53)

**Método HTTP**: `GET`
**Endpoint**: `/players/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene datos detallados de un jugador.

**Solicitud**:
```
GET /players/player_770e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
{
  "id": "player_770e8400e29b41d4a716446655440000",
  "teamId": "team_660e8400e29b41d4a716446655440000",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "organizationId": 1,
  "firstName": "Cristiano",
  "lastName": "Ronaldo",
  "fullName": "Cristiano Ronaldo",
  "number": 7,
  "position": "ST",
  "secondaryPosition": "LW",
  "nickname": "CR7",
  "document": "12345678A",
  "birthDate": "1985-02-05T00:00:00Z",
  "age": 41,
  "nationality": "Portugal",
  "height": 187,
  "weight": 84,
  "photo": "https://...",
  "status": "active",
  "suspensionEndDate": null,
  "suspensionReason": null,
  "stats": {
    "matchesPlayed": 15,
    "minutesPlayed": 1350,
    "goals": 12,
    "assists": 3,
    "yellowCards": 0,
    "redCards": 0
  },
  "createdAt": "2026-03-17T10:40:00Z",
  "updatedAt": "2026-03-17T10:40:00Z"
}
```

---

### GET /matches

**Ubicación**: `src/app/core/services/match.service.ts` (línea 16-60)

**Método HTTP**: `GET`
**Endpoint**: `/matches`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene partidos con múltiples opciones de filtrado.

**Parámetros Query**:

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `championshipId` | string | Partidos de un campeonato |
| `organizationId` | string | Partidos de una organización |
| `date` | string | Partidos en una fecha (YYYY-MM-DD) |
| `status` | enum | Filtrar por estado (`scheduled`, `live`, `finished`) |

**Variantes**:

#### A. Obtener partidos de un campeonato
```
GET /matches?championshipId=champ_550e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

#### B. Obtener partidos en vivo
```
GET /matches?status=live
Authorization: Bearer <token>
```

#### C. Obtener partidos de una fecha
```
GET /matches?date=2026-03-20&championshipId=champ_550e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
[
  {
    "id": "match_880e8400e29b41d4a716446655440000",
    "championshipId": "champ_550e8400e29b41d4a716446655440000",
    "organizationId": 1,
    "homeTeamId": "team_660e8400e29b41d4a716446655440000",
    "awayTeamId": "team_770e8400e29b41d4a716446655440001",
    "homeTeam": {
      "id": "team_660e8400e29b41d4a716446655440000",
      "name": "Real Madrid CF",
      "shortName": "RMA",
      "logo": "https://..."
    },
    "awayTeam": {
      "id": "team_770e8400e29b41d4a716446655440001",
      "name": "Barcelona FC",
      "shortName": "FCB",
      "logo": "https://..."
    },
    "homeScore": 2,
    "awayScore": 1,
    "status": "finished",
    "round": 1,
    "matchday": 1,
    "group": "A",
    "stage": "group_stage",
    "scheduledDate": "2026-03-20T15:00:00Z",
    "scheduledTime": "15:00",
    "venue": "Estadio Santiago Bernabéu",
    "city": "Madrid",
    "referee": "Juan García",
    "currentPeriod": 2,
    "isClockRunning": false,
    "createdAt": "2026-03-17T10:45:00Z",
    "updatedAt": "2026-03-20T17:15:00Z"
  }
]
```

**Uso en Componentes**:
```typescript
// Cargar partidos del campeonato
this.matchService.getMatches(champId).subscribe({
  next: (matches) => {
    this.matches.set(matches);
  }
});

// Cargar partidos en vivo
this.matchService.getLiveMatches().subscribe({
  next: (liveMatches) => {
    this.liveMatches.set(liveMatches);
    // Actualizar cada 5 segundos
  }
});

// Cargar partidos de una fecha específica
this.matchService.getMatchesByDate('2026-03-20').subscribe({
  next: (matches) => {
    this.matchesByDate.set(matches);
  }
});
```

---

### GET /matches/:id

**Ubicación**: `src/app/core/services/match.service.ts` (línea 40)

**Método HTTP**: `GET`
**Endpoint**: `/matches/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene detalles de un partido específico.

**Solicitud**:
```
GET /matches/match_880e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
{
  "id": "match_880e8400e29b41d4a716446655440000",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "homeTeamId": "team_660e8400e29b41d4a716446655440000",
  "awayTeamId": "team_770e8400e29b41d4a716446655440001",
  "homeTeam": { /* datos equipo */ },
  "awayTeam": { /* datos equipo */ },
  "homeScore": 2,
  "awayScore": 1,
  "status": "finished",
  "round": 1,
  "matchday": 1,
  "scheduledDate": "2026-03-20T15:00:00Z",
  "scheduledTime": "15:00",
  "actualStartTime": "2026-03-20T15:05:00Z",
  "actualEndTime": "2026-03-20T16:50:00Z",
  "venue": "Estadio Santiago Bernabéu",
  "referee": "Juan García",
  "currentPeriod": 2,
  "elapsedSeconds": 5400,
  "isClockRunning": false,
  "periodScores": [
    { "period": 1, "homeScore": 1, "awayScore": 0 },
    { "period": 2, "homeScore": 2, "awayScore": 1 }
  ],
  "notes": "Partido disputado",
  "streamUrl": "https://example.com/stream/match_880",
  "createdAt": "2026-03-17T10:45:00Z",
  "updatedAt": "2026-03-20T17:15:00Z"
}
```

---

### GET /events

**Ubicación**: `src/app/core/services/match-event.service.ts` (línea 16)

**Método HTTP**: `GET`
**Endpoint**: `/events`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene eventos de un partido.

**Parámetros Query**:

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `matchId` | string | Eventos de un partido (requerido) |

**Solicitud**:
```
GET /events?matchId=match_880e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
[
  {
    "id": "event_990e8400e29b41d4a716446655440000",
    "matchId": "match_880e8400e29b41d4a716446655440000",
    "championshipId": "champ_550e8400e29b41d4a716446655440000",
    "type": "goal",
    "playerId": "player_770e8400e29b41d4a716446655440000",
    "player": {
      "id": "player_770e8400e29b41d4a716446655440000",
      "firstName": "Cristiano",
      "lastName": "Ronaldo",
      "fullName": "Cristiano Ronaldo",
      "number": 7
    },
    "teamId": "team_660e8400e29b41d4a716446655440000",
    "period": 1,
    "minute": 25,
    "extraMinute": 0,
    "description": "Gol de Cristiano",
    "createdAt": "2026-03-20T15:25:00Z",
    "createdBy": "admin_user_123"
  },
  {
    "id": "event_aa0e8400e29b41d4a716446655440001",
    "type": "yellow_card",
    "playerId": "player_880e8400e29b41d4a716446655440001",
    "player": { /* ... */ },
    "period": 2,
    "minute": 45,
    "description": "Tarjeta amarilla",
    "createdAt": "2026-03-20T16:15:00Z"
  },
  {
    "id": "event_bb0e8400e29b41d4a716446655440002",
    "type": "substitution",
    "playerId": "player_880e8400e29b41d4a716446655440001", // Sale
    "relatedPlayerId": "player_cc0e8400e29b41d4a716446655440003", // Entra
    "period": 2,
    "minute": 60,
    "description": "Cambio: sale Bellingham, entra Modric",
    "createdAt": "2026-03-20T16:45:00Z"
  }
]
```

**Con Polling (para partidos en vivo)**:
```typescript
// match-event.service.ts
getMatchEventsWithPolling(matchId: string, isLive: boolean): Observable<MatchEvent[]> {
  if (!isLive) {
    return this.getMatchEvents(matchId);
  }
  
  // Poll cada 3 segundos si está en vivo
  return interval(3000).pipe(
    startWith(0),
    switchMap(() => this.getMatchEvents(matchId)),
    catchError((error) => {
      console.error('Error polling events', error);
      return throwError(() => error);
    })
  );
}
```

**Uso en Componentes** (actualización en vivo):
```typescript
// match-live-logger.page.ts
this.matchEventService.getMatchEventsWithPolling(matchId, true).subscribe({
  next: (events) => {
    this.events.set(events);
    // Se actualiza automáticamente cada 3 segundos si isLive=true
  }
});
```

---

### GET /events/:id

**Ubicación**: `src/app/core/services/match-event.service.ts` (línea 76)

**Método HTTP**: `GET`
**Endpoint**: `/events/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene un evento específico.

**Solicitud**:
```
GET /events/event_990e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
{
  "id": "event_990e8400e29b41d4a716446655440000",
  "matchId": "match_880e8400e29b41d4a716446655440000",
  "type": "goal",
  "playerId": "player_770e8400e29b41d4a716446655440000",
  "player": {
    "id": "player_770e8400e29b41d4a716446655440000",
    "firstName": "Cristiano",
    "lastName": "Ronaldo",
    "fullName": "Cristiano Ronaldo",
    "number": 7
  },
  "teamId": "team_660e8400e29b41d4a716446655440000",
  "period": 1,
  "minute": 25,
  "extraMinute": 0,
  "description": "Gol de Cristiano",
  "createdAt": "2026-03-20T15:25:00Z",
  "createdBy": "admin_user_123"
}
```

---

### GET /organizations

**Ubicación**: `src/app/core/services/organization.service.ts` (línea 29)

**Método HTTP**: `GET`
**Endpoint**: `/organizations`
**Autenticación**: ✅ REQUERIDA (solo Super Admin)

**Descripción**: Obtiene todas las organizaciones (solo super admins).

**Solicitud**:
```
GET /organizations
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
[
  {
    "id": "org_aa0e8400e29b41d4a716446655440000",
    "name": "Federación Española de Fútbol",
    "logo": "https://...",
    "contactEmail": "info@fef.es",
    "contactPhone": "+34912345678",
    "planLimits": {
      "maxTeams": 100,
      "maxPlayers": 2000,
      "maxChampionships": 10
    },
    "colors": {
      "primary": "#FF0000",
      "secondary": "#FFFF00"
    },
    "status": "active",
    "createdAt": "2026-03-17T10:50:00Z"
  }
]
```

**Errores Posibles**:
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Solo super admins pueden acceder
- `500 Internal Server Error`: Error del servidor

---

### GET /organizations/:id

**Ubicación**: `src/app/core/services/organization.service.ts` (línea 33)

**Método HTTP**: `GET`
**Endpoint**: `/organizations/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Obtiene una organización específica.

**Solicitud**:
```
GET /organizations/org_aa0e8400e29b41d4a716446655440000
Authorization: Bearer <token>
```

**Respuesta (200 OK)**:
```json
{
  "id": "org_aa0e8400e29b41d4a716446655440000",
  "name": "Federación Española de Fútbol",
  "logo": "https://example.com/logo.png",
  "contactEmail": "info@fef.es",
  "contactPhone": "+34912345678",
  "planLimits": {
    "maxTeams": 100,
    "maxPlayers": 2000,
    "maxChampionships": 10
  },
  "colors": {
    "primary": "#FF0000",
    "secondary": "#FFFF00"
  },
  "status": "active",
  "createdAt": "2026-03-17T10:50:00Z",
  "updatedAt": "2026-03-17T10:50:00Z"
}
```

---

## Resumen de Consultas GET

| Recurso | Endpoint | Parámetros | Descripción |
|---------|----------|-----------|-------------|
| Campeonatos | `GET /championships` | `?organizationId` | Listar campeonatos |
| Campeonatos Activos | `GET /championships?status=active` | `status=active` | Campeonatos activos |
| Campeonato Individual | `GET /championships/:id` | `:id` | Detalles campeonato |
| Equipos | `GET /teams` | `?championshipId` \| `?organizationId` | Listar equipos |
| Equipo Individual | `GET /teams/:id` | `:id` | Detalles equipo |
| Equipo + Jugadores | `GET /teams/:id/players` | `:id` | Equipo con jugadores |
| Jugadores | `GET /players` | `?teamId` \| `?championshipId` \| `?organizationId` | Listar jugadores |
| Jugador Individual | `GET /players/:id` | `:id` | Detalles jugador |
| Partidos | `GET /matches` | `?championshipId` \| `?date` \| `?status` | Listar partidos |
| Partidos en Vivo | `GET /matches?status=live` | `status=live` | Partidos activos |
| Partido Individual | `GET /matches/:id` | `:id` | Detalles partido |
| Eventos | `GET /events` | `?matchId` | Eventos de partido |
| Evento Individual | `GET /events/:id` | `:id` | Detalles evento |
| Organizaciones | `GET /organizations` | (ninguno) | Listar organizaciones |
| Organización Individual | `GET /organizations/:id` | `:id` | Detalles organización |

---

## Campeonatos

### POST /championships

**Ubicación**: `src/app/core/services/championship.service.ts` (línea 40)

**Método HTTP**: `POST`
**Endpoint**: `/championships`
**Autenticación**: ✅ REQUERIDA (Bearer Token)

**Descripción**: Crea un nuevo campeonato/torneo.

**Solicitud**:
```json
{
  "name": "Liga Premier 2024-2025",
  "slug": "liga-premier-2024-2025",
  "sport": "football",
  "format": "league",
  "season": "2024-2025",
  "startDate": "2026-03-17T00:00:00.000Z",
  "description": "Campeonato principal de fútbol",
  "organizationId": 1,
  "status": "registration",
  "totalTeams": 0,
  "totalMatches": 0,
  "matchesPlayed": 0,
  "settings": {
    "pointsForWin": 3,
    "pointsForDraw": 1,
    "pointsForLoss": 0,
    "roundsCount": 1,
    "tiebreakers": ["goal_difference", "goals_for", "head_to_head"],
    "allowDraws": true,
    "extraTimeAllowed": false,
    "penaltyShootoutAllowed": true,
    "teamsPerGroup": 4,
    "teamsAdvancePerGroup": 2
  }
}
```

**Respuesta (201 Created)**:
```json
{
  "id": "champ_550e8400e29b41d4a716446655440000",
  "organizationId": 1,
  "name": "Liga Premier 2024-2025",
  "slug": "liga-premier-2024-2025",
  "description": "Campeonato principal de fútbol",
  "sport": "football",
  "format": "league",
  "season": "2024-2025",
  "status": "registration",
  "logo": null,
  "coverImage": null,
  "settings": {
    "pointsForWin": 3,
    "pointsForDraw": 1,
    "pointsForLoss": 0,
    "roundsCount": 1,
    "teamsPerGroup": 4,
    "teamsAdvancePerGroup": 2,
    "tiebreakers": ["goal_difference", "goals_for", "head_to_head"],
    "allowDraws": true,
    "extraTimeAllowed": false,
    "penaltyShootoutAllowed": true
  },
  "startDate": "2026-03-17T00:00:00.000Z",
  "endDate": null,
  "registrationStartDate": null,
  "registrationEndDate": null,
  "totalTeams": 0,
  "totalMatches": 0,
  "matchesPlayed": 0,
  "createdAt": "2026-03-17T10:30:00.000Z",
  "updatedAt": "2026-03-17T10:30:00.000Z"
}
```

**Errores Posibles**:
- `400 Bad Request`: Campos requeridos faltantes o inválidos
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Sin permiso para crear campeonatos
- `409 Conflict`: El slug ya existe en la organización
- `422 Unprocessable Entity`: Validación de datos fallida

**Campos Requeridos**:

| Campo | Tipo | Descripción | Validación | Ejemplo |
|-------|------|-------------|-----------|---------|
| `name` | string | Nombre del campeonato | Min 3, Max 100 caracteres | "Liga Premier 2024" |
| `slug` | string | URL amigable (único) | Formato: `[a-z0-9\-]` | "liga-premier-2024" |
| `sport` | enum | Deporte | `football`, `basketball`, `volleyball` | "football" |
| `format` | enum | Formato | `league`, `knockout`, `group_stage`, `mixed` | "league" |
| `season` | string | Temporada | Formato: `YYYY-YYYY` | "2024-2025" |
| `startDate` | ISO date | Fecha inicio | Formato ISO 8601 | "2026-03-17T00:00:00Z" |
| `organizationId` | number | ID organización | Debe existir en BD | 1 |
| `status` | enum | Estado | `draft`, `registration`, `active`, `finished`, `cancelled` | "registration" |
| `settings` | object | Configuración | Ver tabla Settings | `{ ... }` |

**Campos Opcionales**:

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `description` | string | Descripción | "Campeonato principal" |
| `logo` | string | URL del logo | "https://example.com/logo.png" |
| `registrationStartDate` | ISO date | Inicio registro | "2026-03-01T00:00:00Z" |
| `registrationEndDate` | ISO date | Fin registro | "2026-03-15T00:00:00Z" |
| `endDate` | ISO date | Fecha fin | "2026-06-30T00:00:00Z" |
| `maxTeams` | number | Máximo equipos | 20 |
| `maxPlayersPerTeam` | number | Max jugadores/equipo | 25 |

**Campos de Settings**:

```typescript
interface ChampionshipSettings {
  // Puntos (formato liga)
  pointsForWin: number;      // Default: 3
  pointsForDraw: number;     // Default: 1
  pointsForLoss: number;     // Default: 0
  
  // Configuración formato
  roundsCount: number;       // 1 = ida, 2 = ida y vuelta
  teamsPerGroup?: number;    // Para fase de grupos
  teamsAdvancePerGroup?: number; // Cómo avanzan
  
  // Reglas de desempate (orden de prioridad)
  tiebreakers: TiebreakerRule[]; // Ver tipos abajo
  
  // Reglas de partido
  allowDraws: boolean;       // ¿Permiten empates?
  extraTimeAllowed: boolean; // ¿Prórroga?
  penaltyShootoutAllowed: boolean; // ¿Penaltis?
}

type TiebreakerRule = 
  | 'goal_difference'        // Diferencia de goles
  | 'goals_for'              // Goles a favor
  | 'head_to_head'           // Enfrentamiento directo
  | 'head_to_head_goal_difference'
  | 'points_in_head_to_head'
  | 'fair_play';             // Tarjetas/faltas
```

**Uso en Componentes**:
```typescript
// championship-form.page.ts
onSubmit() {
  const user = this.authService.currentUser();
  
  this.championshipService.createChampionship({
    name: this.form.value.name,
    slug: this.generateSlug(this.form.value.name),
    sport: this.form.value.sport,
    format: this.form.value.format,
    season: this.form.value.season,
    startDate: this.form.value.startDate, // Se serializa a ISO
    description: this.form.value.description,
    settings: settings,
    organizationId: user.organizationId,
    status: 'registration',
    totalTeams: 0,
    totalMatches: 0,
    matchesPlayed: 0,
  }).subscribe({
    next: (championship) => {
      this.snackBar.open('Campeonato creado exitosamente', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/admin/championships']);
    },
    error: (error) => {
      console.error('Error creating championship', error);
      this.snackBar.open('Error al crear el campeonato', 'Cerrar', { duration: 3000 });
    },
  });
}

private generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[^a-z0-9]+/g, '-')     // Reemplaza no-alfanuméricos
    .replace(/^-+|-+$/g, '');        // Elimina guiones al inicio/fin
}
```

---

### PATCH /championships/:id

**Ubicación**: `src/app/core/services/championship.service.ts` (línea 48)

**Método HTTP**: `PATCH`
**Endpoint**: `/championships/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Actualiza un campeonato existente.

**Solicitud**:
```json
{
  "name": "Liga Premier 2024-2025 - Actualizado",
  "description": "Nueva descripción del campeonato",
  "startDate": "2026-03-20T00:00:00.000Z",
  "settings": {
    "pointsForWin": 3,
    "pointsForDraw": 1,
    "pointsForLoss": 0,
    "roundsCount": 2,
    "tiebreakers": ["goal_difference", "goals_for"],
    "allowDraws": true,
    "extraTimeAllowed": false,
    "penaltyShootoutAllowed": true,
    "teamsPerGroup": 4,
    "teamsAdvancePerGroup": 2
  }
}
```

**Respuesta (200 OK)**:
```json
{
  "id": "champ_550e8400e29b41d4a716446655440000",
  "name": "Liga Premier 2024-2025 - Actualizado",
  "description": "Nueva descripción del campeonato",
  "startDate": "2026-03-20T00:00:00.000Z",
  "settings": { /* actualizado */ },
  "updatedAt": "2026-03-17T10:45:00.000Z",
  ...
}
```

**Campos Actualizables**:
- `name`: Nombre
- `description`: Descripción
- `startDate`: Fecha de inicio
- `endDate`: Fecha de fin
- `registrationStartDate`: Inicio de registro
- `registrationEndDate`: Fin de registro
- `settings`: Configuración completa
- `status`: Estado (`draft`, `registration`, `active`, `finished`, `cancelled`)
- `logo`: URL del logo
- `coverImage`: URL imagen portada

**Campos NO Editables** (después de creación):
- `id`: ID único
- `slug`: URL amigable
- `sport`: Deporte
- `format`: Formato del campeonato
- `organizationId`: Organización propietaria

**Errores Posibles**:
- `400 Bad Request`: Datos inválidos
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Sin permiso
- `404 Not Found`: Campeonato no existe
- `409 Conflict`: El slug ya existe

**Uso en Componentes**:
```typescript
this.championshipService.updateChampionship(championshipId, {
  name: newName,
  description: newDescription,
  startDate: newStartDate,
  settings: updatedSettings
}).subscribe({
  next: (championship) => {
    this.snackBar.open('Campeonato actualizado', 'Cerrar', { duration: 3000 });
  },
  error: (error) => {
    this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 });
  }
});
```

---

### DELETE /championships/:id

**Ubicación**: `src/app/core/services/championship.service.ts` (línea 54)

**Método HTTP**: `DELETE`
**Endpoint**: `/championships/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Elimina un campeonato.

**Parámetros**:
- `id` (requerido): ID del campeonato a eliminar

**Respuesta (204 No Content)**:
```
(sin cuerpo)
```

**Errores Posibles**:
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Sin permiso
- `404 Not Found`: Campeonato no existe
- `409 Conflict`: El campeonato tiene partidos/equipos (no se puede eliminar)

**Uso en Componentes**:
```typescript
deleteChampionship(id: string) {
  if (!confirm('¿Estás seguro de que deseas eliminar este campeonato?')) {
    return;
  }
  
  this.championshipService.deleteChampionship(id).subscribe({
    next: () => {
      this.snackBar.open('Campeonato eliminado', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/admin/championships']);
    },
    error: (error) => {
      this.snackBar.open('Error al eliminar el campeonato', 'Cerrar', { duration: 3000 });
    }
  });
}
```

---

## Equipos

### POST /teams

**Ubicación**: `src/app/core/services/team.service.ts` (línea 74)

**Método HTTP**: `POST`
**Endpoint**: `/teams`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Crea un nuevo equipo dentro de un campeonato.

**Solicitud**:
```json
{
  "name": "Real Madrid CF",
  "shortName": "RMA",
  "slug": "real-madrid-cf",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "organizationId": 1,
  "primaryColor": "#FFFFFF",
  "secondaryColor": "#000000",
  "logo": "https://example.com/logos/real-madrid.png",
  "homeVenue": "Estadio Santiago Bernabéu",
  "city": "Madrid",
  "managerName": "Carlo Ancelotti",
  "managerPhone": "+34912345678",
  "managerEmail": "carlo@realmadrid.com"
}
```

**Respuesta (201 Created)**:
```json
{
  "id": "team_660e8400e29b41d4a716446655440000",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "organizationId": 1,
  "name": "Real Madrid CF",
  "shortName": "RMA",
  "slug": "real-madrid-cf",
  "logo": "https://example.com/logos/real-madrid.png",
  "coverImage": null,
  "primaryColor": "#FFFFFF",
  "secondaryColor": "#000000",
  "foundedYear": null,
  "homeVenue": "Estadio Santiago Bernabéu",
  "city": "Madrid",
  "managerName": "Carlo Ancelotti",
  "managerPhone": "+34912345678",
  "managerEmail": "carlo@realmadrid.com",
  "isActive": true,
  "hasActiveMatches": false,
  "playersCount": 0,
  "createdAt": "2026-03-17T10:35:00.000Z",
  "updatedAt": "2026-03-17T10:35:00.000Z"
}
```

**Campos Requeridos**:

| Campo | Tipo | Validación | Ejemplo |
|-------|------|-----------|---------|
| `name` | string | Min 3, Max 100 | "Real Madrid CF" |
| `shortName` | string | Exactly 3 chars | "RMA" |
| `championshipId` | string | Debe existir | "champ_..." |
| `organizationId` | number | Debe existir | 1 |
| `primaryColor` | string | Hex (#RRGGBB) | "#FFFFFF" |
| `secondaryColor` | string | Hex (#RRGGBB) | "#000000" |

**Campos Opcionales**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `slug` | string | URL amigable (auto-generado si no se proporciona) |
| `logo` | string | URL del logo del equipo |
| `homeVenue` | string | Nombre del estadio/campo |
| `city` | string | Ciudad del equipo |
| `managerName` | string | Nombre del entrenador |
| `managerPhone` | string | Teléfono del entrenador |
| `managerEmail` | string | Email del entrenador |
| `foundedYear` | number | Año de fundación |

**Errores Posibles**:
- `400 Bad Request`: Campos requeridos faltantes
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Sin permiso
- `409 Conflict`: El slug ya existe en el campeonato
- `422 Unprocessable Entity`: Validación fallida (ej: shortName no es 3 caracteres)

**Validaciones Backend**:
- `shortName`: Exactamente 3 caracteres alfabéticos
- `primaryColor` y `secondaryColor`: Formato hex válido
- El equipo es único por championship + slug

**Uso en Componentes**:
```typescript
this.teamService.createTeam({
  name: "Real Madrid CF",
  shortName: "RMA",
  slug: this.generateSlug("Real Madrid CF"),
  championshipId: champId,
  organizationId: user.organizationId,
  primaryColor: "#FFFFFF",
  secondaryColor: "#000000",
  logo: logoUrl,
  homeVenue: "Estadio Santiago Bernabéu",
  city: "Madrid",
  managerName: "Carlo Ancelotti"
}).subscribe({
  next: (team) => {
    this.snackBar.open('Equipo creado exitosamente', 'Cerrar', { duration: 3000 });
  },
  error: (error) => {
    this.snackBar.open('Error al crear el equipo', 'Cerrar', { duration: 3000 });
  }
});
```

---

### PATCH /teams/:id

**Ubicación**: `src/app/core/services/team.service.ts` (línea 82)

**Método HTTP**: `PATCH`
**Endpoint**: `/teams/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Actualiza datos de un equipo.

**Solicitud**:
```json
{
  "name": "Real Madrid CF Actualizado",
  "logo": "https://example.com/new-logo.png",
  "primaryColor": "#003399",
  "secondaryColor": "#FFFFFF",
  "managerName": "Nuevo Entrenador",
  "isActive": true
}
```

**Respuesta (200 OK)**:
```json
{
  "id": "team_660e8400e29b41d4a716446655440000",
  "name": "Real Madrid CF Actualizado",
  "logo": "https://example.com/new-logo.png",
  "primaryColor": "#003399",
  "managerName": "Nuevo Entrenador",
  "updatedAt": "2026-03-17T10:50:00.000Z",
  ...
}
```

**Campos Actualizables**:
- `name`: Nombre del equipo
- `shortName`: Siglas
- `logo`: URL del logo
- `primaryColor`: Color primario
- `secondaryColor`: Color secundario
- `homeVenue`: Estadio
- `city`: Ciudad
- `managerName`: Entrenador
- `managerPhone`: Teléfono entrenador
- `managerEmail`: Email entrenador
- `isActive`: Estado del equipo
- `coverImage`: Imagen de portada

**Campos NO Editables**:
- `id`: ID único
- `slug`: URL amigable
- `championshipId`: Campeonato propietario
- `organizationId`: Organización propietaria

**Errores Posibles**:
- `400 Bad Request`: Datos inválidos
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Sin permiso
- `404 Not Found`: Equipo no existe

---

### DELETE /teams/:id

**Ubicación**: `src/app/core/services/team.service.ts` (línea 89)

**Método HTTP**: `DELETE`
**Endpoint**: `/teams/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Elimina un equipo.

**Condiciones**:
- No puede tener partidos activos
- No puede tener jugadores asignados (opcional según frontend)

**Respuesta (204 No Content)**:
```
(sin cuerpo)
```

**Errores Posibles**:
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Sin permiso
- `404 Not Found`: Equipo no existe
- `409 Conflict`: El equipo tiene partidos/jugadores activos

**Uso en Componentes**:
```typescript
deleteTeam(teamId: string) {
  if (!confirm('¿Deseas eliminar este equipo?')) return;
  
  this.teamService.deleteTeam(teamId).subscribe({
    next: () => {
      this.snackBar.open('Equipo eliminado', 'Cerrar');
      this.loadTeams(); // Recarga lista
    },
    error: (error) => {
      this.snackBar.open('Error al eliminar el equipo', 'Cerrar');
    }
  });
}
```

---

## Jugadores

### POST /players

**Ubicación**: 
- `src/app/core/services/player.service.ts` (línea 66)
- `src/app/core/services/team.service.ts` (línea 115)

**Método HTTP**: `POST`
**Endpoint**: `/players`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Crea un nuevo jugador en un equipo y campeonato.

**Solicitud**:
```json
{
  "firstName": "Cristiano",
  "lastName": "Ronaldo",
  "fullName": "Cristiano Ronaldo",
  "teamId": "team_660e8400e29b41d4a716446655440000",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "organizationId": 1,
  "number": 7,
  "position": "ST",
  "secondaryPosition": "LW",
  "nickname": "CR7",
  "document": "12345678A",
  "birthDate": "1985-02-05T00:00:00.000Z",
  "nationality": "Portugal",
  "height": 187,
  "weight": 84,
  "photo": "https://example.com/players/ronaldo.jpg",
  "status": "active"
}
```

**Respuesta (201 Created)**:
```json
{
  "id": "player_770e8400e29b41d4a716446655440000",
  "teamId": "team_660e8400e29b41d4a716446655440000",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "organizationId": 1,
  "firstName": "Cristiano",
  "lastName": "Ronaldo",
  "fullName": "Cristiano Ronaldo",
  "number": 7,
  "position": "ST",
  "secondaryPosition": "LW",
  "nickname": "CR7",
  "document": "12345678A",
  "birthDate": "1985-02-05T00:00:00.000Z",
  "age": 39,
  "nationality": "Portugal",
  "height": 187,
  "weight": 84,
  "photo": "https://example.com/players/ronaldo.jpg",
  "status": "active",
  "suspensionEndDate": null,
  "suspensionReason": null,
  "stats": {
    "matchesPlayed": 0,
    "minutesPlayed": 0,
    "goals": 0,
    "assists": 0,
    "yellowCards": 0,
    "redCards": 0
  },
  "createdAt": "2026-03-17T10:40:00.000Z",
  "updatedAt": "2026-03-17T10:40:00.000Z"
}
```

**Campos Requeridos**:

| Campo | Tipo | Validación | Ejemplo |
|-------|------|-----------|---------|
| `firstName` | string | Min 2, Max 50 | "Cristiano" |
| `lastName` | string | Min 2, Max 50 | "Ronaldo" |
| `fullName` | string | firstName + lastName | "Cristiano Ronaldo" |
| `number` | number | 1-99, único en equipo | 7 |
| `position` | string | Código posición | "ST" (Striker) |
| `teamId` | string | Debe existir | "team_..." |
| `championshipId` | string | Debe existir | "champ_..." |
| `organizationId` | number | Debe existir | 1 |

**Campos Opcionales**:

| Campo | Tipo | Descripción | Validación |
|-------|------|-------------|-----------|
| `nickname` | string | Apodo/nombre artístico | Max 50 |
| `secondaryPosition` | string | Posición secundaria | Código posición |
| `document` | string | Cédula/DNI/Pasaporte | Max 50 |
| `birthDate` | ISO date | Fecha nacimiento | ISO 8601 |
| `nationality` | string | Nacionalidad | Max 50 |
| `height` | number | Altura en cm | Min 50, Max 250 |
| `weight` | number | Peso en kg | Min 30, Max 200 |
| `photo` | string | URL de foto | URL válida |
| `status` | enum | `active`, `injured`, `suspended`, `inactive` | Default: `active` |
| `suspensionEndDate` | ISO date | Fin de suspensión | ISO 8601 |
| `suspensionReason` | string | Motivo suspensión | Max 255 |

**Posiciones Válidas** (por deporte):
```typescript
// Football/Soccer
ST  = Striker / Delantero
LW  = Left Wing / Extremo Izquierda
RW  = Right Wing / Extremo Derecha
CAM = Central Attacking Midfielder / Mediapunta
CM  = Central Midfielder / Centrocampista
LM  = Left Midfielder
RM  = Right Midfielder
CDM = Defensive Midfielder / Centrocampista Defensivo
LB  = Left Back / Lateral Izquierda
RB  = Right Back / Lateral Derecha
CB  = Center Back / Central Defensa
GK  = Goalkeeper / Portero
```

**Errores Posibles**:
- `400 Bad Request`: Campos requeridos faltantes
- `401 Unauthorized`: No autenticado
- `422 Unprocessable Entity`: 
  - Número de dorsal ya existe en el equipo
  - Número fuera de rango (1-99)
  - Posición inválida
  - Validación de datos fallida
- `404 Not Found`: Equipo o campeonato no existe

**Validaciones Backend**:
- El número es único por equipo
- El número está entre 1 y 99
- El position es válido para el deporte
- El firstName y lastName no están vacíos
- Si tiene suspensión, la fecha es futura

**Uso en Componentes**:
```typescript
this.playerService.createPlayer({
  firstName: "Cristiano",
  lastName: "Ronaldo",
  fullName: "Cristiano Ronaldo",
  teamId: teamId,
  championshipId: champId,
  organizationId: user.organizationId,
  number: 7,
  position: "ST",
  birthDate: new Date("1985-02-05"),
  nationality: "Portugal",
  status: "active"
}).subscribe({
  next: (player) => {
    this.snackBar.open('Jugador creado exitosamente', 'Cerrar');
  },
  error: (error) => {
    this.snackBar.open('Error al crear el jugador', 'Cerrar');
  }
});
```

---

### PATCH /players/:id

**Ubicación**: `src/app/core/services/player.service.ts` (línea 80)

**Método HTTP**: `PATCH`
**Endpoint**: `/players/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Actualiza datos de un jugador. Calcula automáticamente `fullName` si se actualizan `firstName` o `lastName`.

**Solicitud**:
```json
{
  "firstName": "Cristiano",
  "lastName": "Ronaldo",
  "number": 7,
  "position": "ST",
  "status": "injured",
  "height": 187,
  "weight": 84,
  "photo": "https://example.com/new-photo.jpg",
  "suspensionReason": "Tarjeta roja",
  "suspensionEndDate": "2026-03-24T00:00:00.000Z"
}
```

**Nota Especial - fullName**:
```typescript
// Si se actualiza firstName o lastName, el servicio:
// 1. Obtiene el jugador actual
// 2. Fusiona con los nuevos valores
// 3. Calcula fullName = firstName + " " + lastName
// 4. Envía PATCH con fullName actualizado

// Esto significa que no necesitas enviar fullName en el PATCH
```

**Respuesta (200 OK)**:
```json
{
  "id": "player_770e8400e29b41d4a716446655440000",
  "firstName": "Cristiano",
  "lastName": "Ronaldo",
  "fullName": "Cristiano Ronaldo",
  "status": "injured",
  "updatedAt": "2026-03-17T10:55:00.000Z",
  ...
}
```

**Campos Actualizables**:
- `firstName`: Nombre
- `lastName`: Apellido
- `number`: Número dorsal
- `position`: Posición
- `secondaryPosition`: Posición secundaria
- `nickname`: Apodo
- `birthDate`: Fecha nacimiento
- `nationality`: Nacionalidad
- `height`: Altura
- `weight`: Peso
- `photo`: Foto
- `status`: Estado (active, injured, suspended, inactive)
- `suspensionReason`: Motivo suspensión
- `suspensionEndDate`: Fin suspensión
- `document`: Documento

**Campos NO Editables**:
- `id`: ID único
- `teamId`: Equipo (cambiar requiere DELETE + POST)
- `championshipId`: Campeonato
- `organizationId`: Organización

**Errores Posibles**:
- `400 Bad Request`: Datos inválidos
- `401 Unauthorized`: No autenticado
- `404 Not Found`: Jugador no existe
- `422 Unprocessable Entity`: Número de dorsal ya existe

---

### DELETE /players/:id

**Ubicación**: `src/app/core/services/player.service.ts` (línea 125)

**Método HTTP**: `DELETE`
**Endpoint**: `/players/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Elimina un jugador.

**Respuesta (204 No Content)**:
```
(sin cuerpo)
```

**Errores Posibles**:
- `401 Unauthorized`: No autenticado
- `404 Not Found`: Jugador no existe
- `409 Conflict`: El jugador tiene estadísticas activas (opcional)

---

## Partidos

### POST /matches

**Ubicación**: `src/app/core/services/match.service.ts` (línea 75)

**Método HTTP**: `POST`
**Endpoint**: `/matches`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Crea un nuevo partido/encuentro.

**Solicitud**:
```json
{
  "homeTeamId": "team_660e8400e29b41d4a716446655440000",
  "awayTeamId": "team_770e8400e29b41d4a716446655440000",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "organizationId": 1,
  "round": 1,
  "matchday": 1,
  "group": "A",
  "stage": "group_stage",
  "scheduledDate": "2026-03-20T15:00:00.000Z",
  "scheduledTime": "15:00",
  "venue": "Estadio Santiago Bernabéu",
  "city": "Madrid",
  "referee": "Juan García",
  "assistantReferee1": "Pedro López",
  "assistantReferee2": "María González",
  "status": "scheduled",
  "homeScore": 0,
  "awayScore": 0,
  "currentPeriod": 0,
  "elapsedSeconds": 0,
  "isClockRunning": false
}
```

**Respuesta (201 Created)**:
```json
{
  "id": "match_880e8400e29b41d4a716446655440000",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "organizationId": 1,
  "homeTeamId": "team_660e8400e29b41d4a716446655440000",
  "awayTeamId": "team_770e8400e29b41d4a716446655440000",
  "homeTeam": {
    "id": "team_660e8400e29b41d4a716446655440000",
    "name": "Real Madrid CF",
    "logo": "https://..."
  },
  "awayTeam": {
    "id": "team_770e8400e29b41d4a716446655440000",
    "name": "Barcelona FC",
    "logo": "https://..."
  },
  "round": 1,
  "matchday": 1,
  "group": "A",
  "stage": "group_stage",
  "scheduledDate": "2026-03-20T15:00:00.000Z",
  "scheduledTime": "15:00",
  "venue": "Estadio Santiago Bernabéu",
  "city": "Madrid",
  "referee": "Juan García",
  "status": "scheduled",
  "homeScore": 0,
  "awayScore": 0,
  "currentPeriod": 0,
  "elapsedSeconds": 0,
  "isClockRunning": false,
  "createdAt": "2026-03-17T10:45:00.000Z",
  "updatedAt": "2026-03-17T10:45:00.000Z"
}
```

**Campos Requeridos**:

| Campo | Tipo | Validación | Ejemplo |
|-------|------|-----------|---------|
| `homeTeamId` | string | Debe existir | "team_..." |
| `awayTeamId` | string | Debe existir | "team_..." |
| `championshipId` | string | Debe existir | "champ_..." |
| `organizationId` | number | Debe existir | 1 |
| `scheduledDate` | ISO date | ISO 8601 | "2026-03-20T15:00:00Z" |

**Validación**: `homeTeamId ≠ awayTeamId` (no puede jugar contra sí mismo)

**Campos Opcionales**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `round` | number | Número de ronda (1, 2, ...) |
| `matchday` | number | Orden dentro de la ronda |
| `group` | string | Grupo (para fase de grupos: "A", "B", etc.) |
| `stage` | string | Etapa: "group_stage", "quarterfinals", "semifinals", etc. |
| `scheduledTime` | string | Hora programada (HH:MM) |
| `venue` | string | Nombre del estadio/recinto |
| `city` | string | Ciudad del partido |
| `referee` | string | Árbitro principal |
| `assistantReferee1` | string | Asistente 1 |
| `assistantReferee2` | string | Asistente 2 |
| `status` | enum | `scheduled`, `warmup`, `live`, `halftime`, `finished`, `suspended`, `postponed`, `cancelled` |

**Estados de Partido** (MatchStatus):
```typescript
type MatchStatus =
  | 'scheduled'   // Programado
  | 'warmup'      // Calentamiento
  | 'live'        // En directo
  | 'halftime'    // Descanso
  | 'break'       // Descanso entre sets/cuartos
  | 'overtime'    // Prórroga
  | 'penalties'   // Tanda de penaltis
  | 'finished'    // Finalizado
  | 'suspended'   // Suspendido
  | 'postponed'   // Aplazado
  | 'cancelled';  // Cancelado
```

**Errores Posibles**:
- `400 Bad Request`: Campos requeridos faltantes
- `401 Unauthorized`: No autenticado
- `409 Conflict`: Los equipos no existen o son iguales
- `422 Unprocessable Entity`: Validación fallida

---

### PATCH /matches/:id

**Ubicación**: `src/app/core/services/match.service.ts` (línea 83)

**Método HTTP**: `PATCH`
**Endpoint**: `/matches/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Actualiza detalles de un partido.

**Dos variantes**:

#### A. Actualizar Detalles del Partido:
```json
{
  "venue": "Nuevo Estadio",
  "referee": "Nuevo Árbitro",
  "scheduledDate": "2026-03-22T15:00:00.000Z",
  "status": "live"
}
```

#### B. Actualizar Score (en vivo):
```json
{
  "homeScore": 2,
  "awayScore": 1,
  "currentPeriod": 2,
  "elapsedSeconds": 2450,
  "isClockRunning": true,
  "status": "live"
}
```

**Respuesta (200 OK)**:
```json
{
  "id": "match_880e8400e29b41d4a716446655440000",
  "homeScore": 2,
  "awayScore": 1,
  "status": "live",
  "updatedAt": "2026-03-20T15:40:00.000Z",
  ...
}
```

**Campos Actualizables**:
- Detalles: `venue`, `city`, `referee`, `assistantReferee1`, `assistantReferee2`, `scheduledDate`, `scheduledTime`
- Score: `homeScore`, `awayScore`, `currentPeriod`, `elapsedSeconds`, `isClockRunning`
- Estado: `status`

**Campos NO Editables**:
- `id`, `homeTeamId`, `awayTeamId`, `championshipId`, `organizationId`

---

### DELETE /matches/:id

**Ubicación**: `src/app/core/services/match.service.ts` (línea 104)

**Método HTTP**: `DELETE`
**Endpoint**: `/matches/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Elimina un partido.

**Condición**: No puede eliminar si tiene eventos registrados

**Respuesta (204 No Content)**:
```
(sin cuerpo)
```

---

## Eventos de Partido

### POST /events

**Ubicación**: `src/app/core/services/match-event.service.ts` (línea 48)

**Método HTTP**: `POST`
**Endpoint**: `/events`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Crea un evento durante un partido (gol, tarjeta, sustitución, etc.).

**Solicitud**:
```json
{
  "type": "goal",
  "matchId": "match_880e8400e29b41d4a716446655440000",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "playerId": "player_770e8400e29b41d4a716446655440000",
  "teamId": "team_660e8400e29b41d4a716446655440000",
  "period": 1,
  "minute": 25,
  "extraMinute": 0,
  "relatedPlayerId": null,
  "description": "Gol de Cristiano en el minuto 25"
}
```

**Tipos de Eventos**:

| Tipo | Descripción | Requiere playerId | Requiere relatedPlayerId |
|------|-------------|------------------|-------------------------|
| `goal` | Gol | ✅ Sí | ❌ No |
| `own_goal` | Autogol | ✅ Sí | ❌ No |
| `yellow_card` | Tarjeta amarilla | ✅ Sí | ❌ No |
| `red_card` | Tarjeta roja | ✅ Sí | ❌ No |
| `substitution` | Cambio/Sustitución | ✅ Sí (sale) | ✅ Sí (entra) |
| `injury` | Lesión | ✅ Sí | ❌ No |
| `penalty` | Penalti | ✅ Sí | ❌ No |
| `corner` | Saque de esquina | ❌ No | ❌ No |
| `foul` | Falta | ✅ Sí | ❌ No |
| `offside` | Fuera de juego | ✅ Sí | ❌ No |

**Respuesta (201 Created)**:
```json
{
  "id": "event_990e8400e29b41d4a716446655440000",
  "matchId": "match_880e8400e29b41d4a716446655440000",
  "championshipId": "champ_550e8400e29b41d4a716446655440000",
  "type": "goal",
  "playerId": "player_770e8400e29b41d4a716446655440000",
  "player": {
    "id": "player_770e8400e29b41d4a716446655440000",
    "firstName": "Cristiano",
    "lastName": "Ronaldo",
    "fullName": "Cristiano Ronaldo",
    "number": 7
  },
  "teamId": "team_660e8400e29b41d4a716446655440000",
  "period": 1,
  "minute": 25,
  "extraMinute": 0,
  "description": "Gol de Cristiano en el minuto 25",
  "createdAt": "2026-03-20T15:25:00.000Z",
  "createdBy": "admin_user_123"
}
```

**Campos Requeridos**:

| Campo | Tipo | Validación | Ejemplo |
|-------|------|-----------|---------|
| `type` | enum | Ver tipos arriba | "goal" |
| `matchId` | string | Debe existir | "match_..." |
| `playerId` | string | Debe existir (según tipo) | "player_..." |
| `teamId` | string | Debe existir | "team_..." |
| `period` | number | 1, 2, 3... | 1 |
| `minute` | number | 0-120+ | 25 |

**Campos Opcionales**:

| Campo | Tipo | Descripción | Restricciones |
|-------|------|-------------|---------------|
| `extraMinute` | number | Minutos adicionales (prórroga) | Default: 0 |
| `relatedPlayerId` | string | Segundo jugador (sustituciones) | Solo si type "substitution" |
| `description` | string | Descripción del evento | Max 500 caracteres |
| `championshipId` | string | ID campeonato (denormalización) | Opcional |

**Validaciones**:
- El `minute` debe estar entre 0 y el máximo según el deporte
- Para `substitution`: requiere `relatedPlayerId`
- El `period` debe ser válido para el deporte
- El `extraMinute` solo se usa en periodos de prórroga

**Errores Posibles**:
- `400 Bad Request`: Campos requeridos faltantes o tipo inválido
- `401 Unauthorized`: No autenticado
- `404 Not Found`: Partido o jugador no existe
- `422 Unprocessable Entity`: 
  - Minuto fuera de rango
  - Período inválido
  - Falta `relatedPlayerId` en sustitución

---

### PATCH /events/:id

**Ubicación**: `src/app/core/services/match-event.service.ts` (línea 56)

**Método HTTP**: `PATCH`
**Endpoint**: `/events/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Actualiza un evento (generalmente para correcciones).

**Solicitud**:
```json
{
  "minute": 26,
  "extraMinute": 1,
  "description": "Gol actualizado - fue en el minuto 26+1"
}
```

**Campos Actualizables**:
- `minute`, `extraMinute`, `description`

**Campos NO Editables**:
- `type`, `matchId`, `playerId`, `teamId`, `period` (para mantener integridad)

---

### DELETE /events/:id

**Ubicación**: `src/app/core/services/match-event.service.ts` (línea 64)

**Método HTTP**: `DELETE`
**Endpoint**: `/events/:id`
**Autenticación**: ✅ REQUERIDA

**Descripción**: Elimina un evento.

**Respuesta (204 No Content)**:
```
(sin cuerpo)
```

**Nota**: Esto recalcula las estadísticas del jugador y del partido

---

## Organizaciones

### POST /organizations

**Ubicación**: `src/app/core/services/organization.service.ts` (línea 38)

**Método HTTP**: `POST`
**Endpoint**: `/organizations`
**Autenticación**: ✅ REQUERIDA (solo Super Admin)

**Descripción**: Crea una nueva organización (solo para super admins).

**Solicitud**:
```json
{
  "name": "Federación Española de Fútbol",
  "logo": "https://example.com/logos/fef.png",
  "contactEmail": "info@fef.es",
  "contactPhone": "+34912345678",
  "planLimits": {
    "maxTeams": 100,
    "maxPlayers": 2000,
    "maxChampionships": 10
  },
  "colors": {
    "primary": "#FF0000",
    "secondary": "#FFFF00"
  },
  "status": "active"
}
```

**Respuesta (201 Created)**:
```json
{
  "id": "org_aa0e8400e29b41d4a716446655440000",
  "name": "Federación Española de Fútbol",
  "logo": "https://example.com/logos/fef.png",
  "contactEmail": "info@fef.es",
  "contactPhone": "+34912345678",
  "planLimits": {
    "maxTeams": 100,
    "maxPlayers": 2000,
    "maxChampionships": 10
  },
  "colors": {
    "primary": "#FF0000",
    "secondary": "#FFFF00"
  },
  "status": "active",
  "createdAt": "2026-03-17T10:50:00.000Z"
}
```

**Campos Requeridos**:

| Campo | Tipo | Validación | Ejemplo |
|-------|------|-----------|---------|
| `name` | string | Min 3, Max 100 | "Federación Española..." |
| `contactEmail` | string | Email válido | "info@fef.es" |
| `contactPhone` | string | Formato teléfono | "+34912345678" |

**Campos Opcionales**:
- `logo`: URL del logo
- `planLimits`: Límites del plan (maxTeams, maxPlayers, maxChampionships)
- `colors`: Colores (primary, secondary)
- `status`: `active` o `inactive`

**Errores Posibles**:
- `400 Bad Request`: Campos requeridos faltantes
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Solo super admins pueden crear organizaciones
- `409 Conflict`: La organización ya existe

---

### PATCH /organizations/:id

**Ubicación**: `src/app/core/services/organization.service.ts`

**Método HTTP**: `PATCH`
**Endpoint**: `/organizations/:id`
**Autenticación**: ✅ REQUERIDA (super admin o owner)

**Descripción**: Actualiza datos de una organización.

**Solicitud**:
```json
{
  "name": "Federación Española de Fútbol Actualizada",
  "contactEmail": "newemail@fef.es",
  "colors": {
    "primary": "#003399",
    "secondary": "#FFFFFF"
  },
  "status": "active"
}
```

**Campos Actualizables**:
- `name`, `contactEmail`, `contactPhone`, `logo`
- `colors`, `planLimits`, `status`

---

## Patrón General de Servicios

Todos los servicios siguen este patrón consistente:

### Estructura Base

```typescript
@Injectable({ providedIn: 'root' })
export class ExampleService {
  private api = inject(ApiService);

  // ✅ POST: Crear nuevo recurso
  createExample(data: CreateExampleDto): Observable<Example> {
    return this.api.post<Example>('endpoint', data).pipe(
      map((response) => this.parseData(response)),      // Procesar fechas/datos
      catchError((error) => this.handleError('msg', error))  // Manejo errores
    );
  }

  // ✅ GET: Obtener recurso(s)
  getExamples(params?: any): Observable<Example[]> {
    return this.api.get<Example[]>('endpoint', params).pipe(
      map((examples) => examples.map(e => this.parseData(e))),
      catchError((error) => this.handleError('Error fetching', error))
    );
  }

  // ✅ PATCH: Actualizar recurso
  updateExample(id: string, data: Partial<Example>): Observable<Example> {
    return this.api.patch<Example>(`endpoint/${id}`, data).pipe(
      map((response) => this.parseData(response)),
      catchError((error) => this.handleError('Error updating', error))
    );
  }

  // ✅ DELETE: Eliminar recurso
  deleteExample(id: string): Observable<void> {
    return this.api.delete<void>(`endpoint/${id}`).pipe(
      catchError((error) => this.handleError('Error deleting', error))
    );
  }

  // 🔧 Procesar datos (ejs: convertir strings a Date)
  private parseData(item: Example): Example {
    if (item.createdAt && typeof item.createdAt === 'string') {
      item.createdAt = new Date(item.createdAt);
    }
    return item;
  }

  // 🔧 Manejo de errores centralizado
  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(`${message}: ${error.message || error}`));
  }
}
```

### ApiService (Middleware)

```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3001/api';

  // POST: Crear
  post<T>(path: string, body: any): Observable<T> {
    console.log('POST request to:', `${this.baseUrl}/${path}`, 'with body:', body);
    return this.http.post<T>(`${this.baseUrl}/${path}`, body);
  }

  // GET: Leer
  get<T>(path: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<T>(`${this.baseUrl}/${path}`, { params: httpParams });
  }

  // PATCH: Actualizar parcialmente
  patch<T>(path: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${path}`, body);
  }

  // DELETE: Eliminar
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${path}`);
  }
}
```

### AuthInterceptor

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    if (token && !req.url.includes('auth/login')) {
      // Agregar Authorization header a todas las requests excepto login
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(req);
  }
}
```

---

## Manejo de Errores

### En Servicios

```typescript
// Los servicios usan catchError para procesar errores:

createExample(data: ExampleDto): Observable<Example> {
  return this.api.post<Example>('endpoint', data).pipe(
    map((response) => this.parseData(response)),
    catchError((error) => {
      // Log del error
      console.error('Error creating example:', error);
      
      // Extract error message
      const errorMessage = error?.error?.message 
        || error?.message 
        || 'Erro desconocido';
      
      // Retornar observable de error
      return throwError(() => new Error(errorMessage));
    })
  );
}
```

### En Componentes

```typescript
// Los componentes deben manejar el Observable:

this.exampleService.createExample(data).subscribe({
  // ✅ Éxito
  next: (result) => {
    console.log('Creado:', result);
    this.snackBar.open('Creado exitosamente', 'Cerrar', { duration: 3000 });
    this.router.navigate(['/admin/list']);
  },
  
  // ❌ Error
  error: (error) => {
    console.error('Error:', error);
    const message = error.message || 'Error al crear';
    this.snackBar.open(message, 'Cerrar', { duration: 5000 });
    this.isSaving.set(false);
  },
  
  // ✅ Completado
  complete: () => {
    console.log('Solicitud completada');
  }
});
```

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `401 Unauthorized` | Token expirado o inválido | Hacer login de nuevo |
| `403 Forbidden` | Sin permisos | Verificar rol del usuario |
| `404 Not Found` | Recurso no existe | Verificar ID |
| `409 Conflict` | Violación de restricción única | Cambiar valor (ej: slug) |
| `422 Unprocessable Entity` | Validación fallida | Revisar datos enviados |
| `500 Internal Server Error` | Error del servidor | Revisar logs backend |

---

## Códigos HTTP

### Respuestas de Éxito

| Código | Significado | Uso |
|--------|------------|-----|
| `200 OK` | Solicitud exitosa | GET, PATCH, PUT |
| `201 Created` | Recurso creado | POST |
| `204 No Content` | Éxito sin cuerpo | DELETE, PATCH sin respuesta |

### Errores de Cliente

| Código | Significado | Ejemplo |
|--------|------------|---------|
| `400 Bad Request` | Datos inválidos | JSON malformado, campos requeridos faltantes |
| `401 Unauthorized` | Sin autenticación | Token ausente o expirado |
| `403 Forbidden` | Sin autorización | Rol insuficiente |
| `404 Not Found` | Recurso no existe | ID inválido |
| `409 Conflict` | Conflicto de datos | Slug duplicado |
| `422 Unprocessable Entity` | Validación fallida | Email inválido, número fuera de rango |

### Errores de Servidor

| Código | Significado | Acción |
|--------|------------|--------|
| `500 Internal Server Error` | Error del servidor | Revisar logs, contactar admin |
| `503 Service Unavailable` | Servicio no disponible | Reintentar después |

---

## 📝 Resumen de Métodos HTTP

### Verbos HTTP Utilizados

| Verbo | Operación | Endpoint | Headers | Body |
|-------|-----------|----------|---------|------|
| `POST` | Crear | `/endpoint` | `Authorization, Content-Type` | ✅ Sí |
| `PATCH` | Actualizar | `/endpoint/:id` | `Authorization, Content-Type` | ✅ Sí |
| `DELETE` | Eliminar | `/endpoint/:id` | `Authorization` | ❌ No |
| `GET` | Leer | `/endpoint` o `/endpoint/:id` | `Authorization` | ❌ No |

### Content-Type

Todas las requests POST/PATCH usan:
```
Content-Type: application/json
```

### Authorization

Todas las requests (excepto login) usan:
```
Authorization: Bearer <token>
```

El token se agrega automáticamente mediante `AuthInterceptor`.

---

## 🔄 Flujo Completo: Ejemplo - Crear Campeonato

```typescript
// 1️⃣ COMPONENTE: championship-form.page.ts
onSubmit() {
  // Validar form
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  // Obtener usuario autenticado
  const user = this.authService.currentUser();
  if (!user?.organizationId) {
    this.snackBar.open('Error: Sin organización', 'Cerrar');
    return;
  }

  this.isSaving.set(true);
  const formValue = this.form.getRawValue();

  // 2️⃣ COMPONENTE → SERVICIO
  this.championshipService.createChampionship({
    name: formValue.name,
    slug: this.generateSlug(formValue.name),
    sport: formValue.sport,
    format: formValue.format,
    season: formValue.season,
    startDate: formValue.startDate, // Date object
    description: formValue.description,
    settings: settings,
    organizationId: user.organizationId,
    status: 'registration',
    totalTeams: 0,
    totalMatches: 0,
    matchesPlayed: 0,
  }).subscribe({
    next: (championship) => {
      // 6️⃣ RESPUESTA DEL BACKEND
      this.snackBar.open('Campeonato creado exitosamente', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/admin/championships']);
    },
    error: (error) => {
      console.error('Error creating championship', error);
      this.snackBar.open('Error al crear el campeonato', 'Cerrar', { duration: 3000 });
      this.isSaving.set(false);
    },
  });
}

// 3️⃣ SERVICIO: championship.service.ts
createChampionship(championship: Partial<Championship>): Observable<Championship> {
  return this.api.post<Championship>('championships', championship).pipe(
    map((c) => this.parseChampionshipDates(c)),
    catchError((error) => this.handleError('Error creating championship', error))
  );
}

// 4️⃣ API SERVICE: api.service.ts
post<T>(path: string, body: any): Observable<T> {
  console.log('POST request to:', `http://localhost:3001/api/${path}`, 'with body:', body);
  return this.http.post<T>(`http://localhost:3001/api/${path}`, body);
}

// 5️⃣ AUTH INTERCEPTOR + HTTP CLIENT
// Request:
POST http://localhost:3001/api/championships
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "name": "Liga Premier 2024",
  "slug": "liga-premier-2024",
  "sport": "football",
  ...
}

// Backend procesa y responde:
HTTP 201 Created

{
  "id": "champ_123",
  "name": "Liga Premier 2024",
  "slug": "liga-premier-2024",
  ...
  "createdAt": "2026-03-17T10:30:00.000Z"
}

// 5️⃣ SERVICIO: Parse dates
parseChampionshipDates(c) {
  c.createdAt = new Date(c.createdAt); // String a Date
  return c;
}

// 6️⃣ COMPONENTE: Mostrar éxito y navegar
```

---

## ✅ Checklist para Nuevas Request

Cuando crees una nueva request POST/PATCH/DELETE:

- [ ] Método HTTP correcto (POST, PATCH, DELETE)
- [ ] Endpoint correcto (`/api/...`)
- [ ] Headers incluidos (`Authorization: Bearer <token>`)
- [ ] Body incluye todos los campos requeridos
- [ ] Formato JSON válido
- [ ] Fechas en formato ISO 8601
- [ ] IDs existen en la base de datos
- [ ] Manejo de errores implementado
- [ ] SnackBar mostrado al usuario
- [ ] Loading state mientras se procesa
- [ ] Redirección tras éxito (si aplica)

---

**Última actualización**: 17 de marzo de 2026  
**Versión**: 1.0  
**Autor**: IcePlay Frontend Team
