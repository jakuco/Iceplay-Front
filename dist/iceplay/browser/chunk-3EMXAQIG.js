import "./chunk-VUJOFXKG.js";

// src/app/features/super-admin/super-admin.routes.ts
var routes = [
  {
    path: "",
    loadComponent: () => import("./chunk-OZ5TC2JO.js"),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-Y46LUMLO.js"),
        title: "Dashboard - Super Admin"
      },
      {
        path: "organizations",
        loadComponent: () => import("./chunk-ELHUDPQ2.js"),
        title: "Organizaciones - Super Admin"
      },
      {
        path: "organizations/new",
        loadComponent: () => import("./chunk-LZPX4VVE.js"),
        title: "Nueva Organizaci\xF3n - Super Admin"
      },
      {
        path: "organizations/:id",
        loadComponent: () => import("./chunk-SGGVVWYO.js"),
        title: "Detalle Organizaci\xF3n - Super Admin"
      },
      {
        path: "announcements",
        loadComponent: () => import("./chunk-UESX2RKV.js"),
        title: "Anuncios - Super Admin"
      },
      {
        path: "announcements/new",
        loadComponent: () => import("./chunk-VDYB3Z6M.js"),
        title: "Nuevo Anuncio - Super Admin"
      },
      {
        path: "admins",
        loadComponent: () => import("./chunk-5I5VPS7L.js"),
        title: "Administradores - Super Admin"
      },
      {
        path: "reports",
        loadComponent: () => import("./chunk-PRNGEE5Z.js"),
        title: "Reportes - Super Admin"
      },
      {
        path: "settings",
        loadComponent: () => import("./chunk-AJK4VYQE.js"),
        title: "Configuraci\xF3n - Super Admin"
      }
    ]
  }
];
var super_admin_routes_default = routes;
export {
  super_admin_routes_default as default
};
//# sourceMappingURL=chunk-3EMXAQIG.js.map
