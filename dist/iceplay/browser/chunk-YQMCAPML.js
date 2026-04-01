import "./chunk-VUJOFXKG.js";

// src/app/features/super-admin/super-admin.routes.ts
var routes = [
  {
    path: "",
    loadComponent: () => import("./chunk-YLEFKNQE.js"),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-FWQMRT3R.js"),
        title: "Dashboard - Super Admin"
      },
      {
        path: "organizations",
        loadComponent: () => import("./chunk-SYDGAW25.js"),
        title: "Organizaciones - Super Admin"
      },
      {
        path: "organizations/new",
        loadComponent: () => import("./chunk-RFGC73R6.js"),
        title: "Nueva Organizaci\xF3n - Super Admin"
      },
      {
        path: "organizations/:id",
        loadComponent: () => import("./chunk-QRZLXBV3.js"),
        title: "Detalle Organizaci\xF3n - Super Admin"
      },
      {
        path: "announcements",
        loadComponent: () => import("./chunk-ZEXTPKB6.js"),
        title: "Anuncios - Super Admin"
      },
      {
        path: "announcements/new",
        loadComponent: () => import("./chunk-IRRSGEVQ.js"),
        title: "Nuevo Anuncio - Super Admin"
      },
      {
        path: "admins",
        loadComponent: () => import("./chunk-A5I5M4GO.js"),
        title: "Administradores - Super Admin"
      },
      {
        path: "reports",
        loadComponent: () => import("./chunk-6ORNJLRR.js"),
        title: "Reportes - Super Admin"
      },
      {
        path: "settings",
        loadComponent: () => import("./chunk-T2CUPO6N.js"),
        title: "Configuraci\xF3n - Super Admin"
      }
    ]
  }
];
var super_admin_routes_default = routes;
export {
  super_admin_routes_default as default
};
//# sourceMappingURL=chunk-YQMCAPML.js.map
