import "./chunk-VUJOFXKG.js";

// src/app/features/admin/pages/championships/championship-deactivate.guard.ts
var canDeactivateChampionshipForm = (component) => {
  if (!component.isDirty())
    return true;
  return window.confirm("\xBFDeseas salir sin guardar?\nLos cambios que no hayas guardado se perder\xE1n.");
};

// src/app/features/admin/admin.routes.ts
var routes = [
  {
    path: "",
    loadComponent: () => import("./chunk-VABLCJFQ.js"),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-KAMFB3NZ.js"),
        title: "Dashboard - Admin"
      },
      {
        path: "championships",
        loadComponent: () => import("./chunk-DC3NYVFG.js"),
        title: "Campeonatos - Admin"
      },
      {
        path: "championships/new",
        loadComponent: () => import("./chunk-V6JSLRDF.js"),
        canDeactivate: [canDeactivateChampionshipForm],
        title: "Nuevo Campeonato - Admin"
      },
      {
        path: "championships/:id/edit",
        loadComponent: () => import("./chunk-V6JSLRDF.js"),
        canDeactivate: [canDeactivateChampionshipForm],
        title: "Editar Campeonato - Admin"
      },
      {
        path: "championships/:id",
        loadComponent: () => import("./chunk-34JZA7SB.js"),
        title: "Detalle Campeonato - Admin"
      },
      // {
      //   path: 'teams',
      //   loadComponent: () => import('./pages/teams/teams-list.page'),
      //   title: 'Equipos - Admin',
      // },
      // {
      //   path: 'teams/new',
      //   loadComponent: () => import('./pages/teams/team-form.page'),
      //   title: 'Nuevo Equipo - Admin',
      // },
      {
        path: "teams/:id",
        loadComponent: () => import("./chunk-EYFF32WL.js"),
        title: "Detalle Equipo - Admin"
      },
      // {
      //   path: 'teams/:id/edit',
      //   loadComponent: () => import('./pages/teams/team-form.page'),
      //   title: 'Editar Equipo - Admin',
      // },
      // {
      //   path: 'players',
      //   loadComponent: () => import('./pages/players/players-list.page'),
      //   title: 'Jugadores - Admin',
      // },
      // {
      //   path: 'players/new',
      //   loadComponent: () => import('./pages/players/player-form.page'),
      //   title: 'Nuevo Jugador - Admin',
      // },
      // {
      //   path: 'players/:id/edit',
      //   loadComponent: () => import('./pages/players/player-form.page'),
      //   title: 'Editar Jugador - Admin',
      // },
      // {
      //   path: 'fixtures',
      //   loadComponent: () => import('./pages/fixtures/fixtures-list.page'),
      //   title: 'Fixture - Admin',
      // },
      // {
      //   path: 'fixtures/generate',
      //   loadComponent: () => import('./pages/fixtures/fixture-generator.page'),
      //   title: 'Generar Fixture - Admin',
      // },
      // {
      //   path: 'matches',
      //   loadComponent: () => import('./pages/matches/matches-list.page'),
      //   title: 'Partidos - Admin',
      // },
      // {
      //   path: 'match/:matchId/control',
      //   loadComponent: () => import('./pages/match-control/match-control.page'),
      //   title: 'Control de Partido - Admin',
      // },
      // {
      //   path: 'standings',
      //   loadComponent: () => import('./pages/standings/standings.page'),
      //   title: 'Tabla de Posiciones - Admin',
      // },
      {
        path: "statistics",
        loadComponent: () => import("./chunk-HQZI3YWC.js"),
        title: "Estad\xEDsticas - Admin"
      }
    ]
  }
];
var admin_routes_default = routes;
export {
  admin_routes_default as default
};
//# sourceMappingURL=chunk-DH4QSZCC.js.map
