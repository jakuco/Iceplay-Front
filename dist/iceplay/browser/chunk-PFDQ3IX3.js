import "./chunk-VUJOFXKG.js";

// src/app/features/super-admin/super-admin.routes.ts
var routes = [
  {
    path: "",
    loadComponent: () => import("./chunk-2FIHNOG7.js"),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-4S7FNVK7.js"),
        title: "Dashboard - Super Admin"
      },
      {
        path: "organizations",
        loadComponent: () => import("./chunk-XSD27L6T.js"),
        title: "Organizaciones - Super Admin"
      },
      {
        path: "organizations/new",
        loadComponent: () => import("./chunk-IQKQHLVV.js"),
        title: "Nueva Organizaci\xF3n - Super Admin"
      },
      {
        path: "organizations/:id",
        loadComponent: () => import("./chunk-ZLGLQ5AU.js"),
        title: "Detalle Organizaci\xF3n - Super Admin"
      },
      {
        path: "announcements",
        loadComponent: () => import("./chunk-HEGTNPLS.js"),
        title: "Anuncios - Super Admin"
      },
      {
        path: "announcements/new",
        loadComponent: () => import("./chunk-2BGCGTE6.js"),
        title: "Nuevo Anuncio - Super Admin"
      },
      {
        path: "admins",
        loadComponent: () => import("./chunk-YHIVRPNT.js"),
        title: "Administradores - Super Admin"
      },
      {
        path: "reports",
        loadComponent: () => import("./chunk-AMKR673N.js"),
        title: "Reportes - Super Admin"
      },
      {
        path: "settings",
        loadComponent: () => import("./chunk-UC34S3EU.js"),
        title: "Configuraci\xF3n - Super Admin"
      }
    ]
  }
];
var super_admin_routes_default = routes;
export {
  super_admin_routes_default as default
};
//# sourceMappingURL=chunk-PFDQ3IX3.js.map
