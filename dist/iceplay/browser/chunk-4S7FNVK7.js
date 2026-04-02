import {
  MatCardModule
} from "./chunk-NC7IRF23.js";
import {
  AuthService
} from "./chunk-CTYH5NZ2.js";
import "./chunk-I4DDBC3P.js";
import {
  MatChip,
  MatChipSet,
  MatChipsModule
} from "./chunk-YXKCRHVH.js";
import {
  MatDividerModule
} from "./chunk-KLQVA5RB.js";
import "./chunk-A4ZOVHWZ.js";
import "./chunk-2C543PJY.js";
import "./chunk-BTLIOYON.js";
import {
  RouterLink
} from "./chunk-XIJO5SZ4.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-TWF5BIFR.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-2QF6PXYN.js";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/super-admin/pages/dashboard/dashboard.page.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.id;
function SuperAdminDashboardPage_For_14_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const stat_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("positive", stat_r1.change > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.change > 0 ? "trending_up" : "trending_down");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", stat_r1.change > 0 ? "+" : "", "", stat_r1.change, "%");
  }
}
function SuperAdminDashboardPage_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 22)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 23)(5, "span", 24);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 25);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, SuperAdminDashboardPage_For_14_Conditional_9_Template, 5, 5, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", stat_r1.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stat_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(stat_r1.change !== void 0 ? 9 : -1);
  }
}
function SuperAdminDashboardPage_For_50_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 34);
    \u0275\u0275text(1, "Activa");
    \u0275\u0275elementEnd();
  }
}
function SuperAdminDashboardPage_For_50_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 35);
    \u0275\u0275text(1, "Inactiva");
    \u0275\u0275elementEnd();
  }
}
function SuperAdminDashboardPage_For_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 29)(4, "h3", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 31)(7, "mat-icon");
    \u0275\u0275text(8, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 32)(11, "span", 33)(12, "mat-icon");
    \u0275\u0275text(13, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 33)(16, "mat-icon");
    \u0275\u0275text(17, "emoji_events");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-chip-set");
    \u0275\u0275conditionalCreate(20, SuperAdminDashboardPage_For_50_Conditional_20_Template, 2, 0, "mat-chip", 34)(21, SuperAdminDashboardPage_For_50_Conditional_21_Template, 2, 0, "mat-chip", 35);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const org_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(org_r2.name.charAt(0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(org_r2.name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", org_r2.country, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", org_r2.adminsCount, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", org_r2.championshipsCount, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(org_r2.isActive ? 20 : 21);
  }
}
function SuperAdminDashboardPage_For_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "div", 36);
    \u0275\u0275elementStart(2, "div", 37)(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 38);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const activity_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", activity_r3.color);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(activity_r3.message);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(activity_r3.time);
  }
}
var SuperAdminDashboardPage = class _SuperAdminDashboardPage {
  authService = inject(AuthService);
  stats = signal([
    { icon: "business", label: "Organizaciones", value: 15, change: 20, color: "#3b82f6" },
    { icon: "people", label: "Administradores", value: 42, change: 8, color: "#22c55e" },
    { icon: "emoji_events", label: "Campeonatos Activos", value: 28, color: "#f59e0b" },
    { icon: "sports", label: "Partidos Hoy", value: 12, color: "#ef4444" }
  ], __spreadValues({}, ngDevMode ? { debugName: "stats" } : {}));
  organizations = signal([
    {
      id: "1",
      name: "Liga Deportiva Quito Norte",
      country: "Ecuador",
      adminsCount: 2,
      championshipsCount: 4,
      isActive: true,
      createdAt: "2024-06-01"
    },
    {
      id: "2",
      name: "Federaci\xF3n de Baloncesto Guayaquil",
      country: "Ecuador",
      adminsCount: 3,
      championshipsCount: 2,
      isActive: true,
      createdAt: "2024-08-15"
    },
    {
      id: "3",
      name: "Club Deportivo Los Andes",
      country: "Colombia",
      adminsCount: 1,
      championshipsCount: 1,
      isActive: false,
      createdAt: "2024-09-20"
    }
  ], __spreadValues({}, ngDevMode ? { debugName: "organizations" } : {}));
  systemActivity = signal([
    {
      id: "1",
      message: "Nueva organizaci\xF3n creada: Liga Norte FC",
      time: "Hace 2 horas",
      color: "#22c55e"
    },
    {
      id: "2",
      message: "Admin agregado a Liga Deportiva Quito",
      time: "Hace 5 horas",
      color: "#3b82f6"
    },
    { id: "3", message: "Campeonato finalizado: Copa Verano 2024", time: "Ayer", color: "#f59e0b" },
    {
      id: "4",
      message: "Organizaci\xF3n desactivada: Club Inactivo",
      time: "Hace 2 d\xEDas",
      color: "#ef4444"
    },
    {
      id: "5",
      message: "Anuncio publicado: Nuevas funciones",
      time: "Hace 3 d\xEDas",
      color: "#a855f7"
    }
  ], __spreadValues({}, ngDevMode ? { debugName: "systemActivity" } : {}));
  static \u0275fac = function SuperAdminDashboardPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SuperAdminDashboardPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SuperAdminDashboardPage, selectors: [["app-super-admin-dashboard"]], decls: 57, vars: 1, consts: [[1, "dashboard-container"], [1, "dashboard-header"], [1, "title"], [1, "subtitle"], [1, "header-actions"], ["matButton", "filled", "routerLink", "/super-admin/organizations/new"], [1, "stats-grid"], [1, "stat-card"], [1, "section"], [1, "section-title"], [1, "quick-actions"], ["routerLink", "/super-admin/organizations/new", 1, "action-card"], ["routerLink", "/super-admin/announcements/new", 1, "action-card"], ["routerLink", "/super-admin/admins", 1, "action-card"], ["routerLink", "/super-admin/reports", 1, "action-card"], [1, "two-columns"], [1, "section-header"], ["matButton", "", "routerLink", "/super-admin/organizations"], [1, "org-list"], [1, "org-card"], [1, "activity-list"], [1, "activity-item"], [1, "stat-icon"], [1, "stat-content"], [1, "stat-value"], [1, "stat-label"], [1, "stat-change", 3, "positive"], [1, "stat-change"], [1, "org-avatar"], [1, "org-info"], [1, "org-name"], [1, "org-meta"], [1, "org-stats"], [1, "org-stat"], [1, "chip-active"], [1, "chip-inactive"], [1, "activity-dot"], [1, "activity-content"], [1, "activity-time"]], template: function SuperAdminDashboardPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, "Panel de Control");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "button", 5)(9, "mat-icon");
      \u0275\u0275text(10, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Nueva Organizaci\xF3n ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "section", 6);
      \u0275\u0275repeaterCreate(13, SuperAdminDashboardPage_For_14_Template, 10, 6, "div", 7, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "section", 8)(16, "h2", 9);
      \u0275\u0275text(17, "Acciones R\xE1pidas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 10)(19, "a", 11)(20, "mat-icon");
      \u0275\u0275text(21, "business");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span");
      \u0275\u0275text(23, "Crear Organizaci\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "a", 12)(25, "mat-icon");
      \u0275\u0275text(26, "campaign");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "span");
      \u0275\u0275text(28, "Nuevo Anuncio");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "a", 13)(30, "mat-icon");
      \u0275\u0275text(31, "manage_accounts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "span");
      \u0275\u0275text(33, "Gestionar Admins");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "a", 14)(35, "mat-icon");
      \u0275\u0275text(36, "analytics");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span");
      \u0275\u0275text(38, "Ver Reportes");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(39, "div", 15)(40, "section", 8)(41, "div", 16)(42, "h2", 9);
      \u0275\u0275text(43, "Organizaciones Recientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "a", 17);
      \u0275\u0275text(45, " Ver todas ");
      \u0275\u0275elementStart(46, "mat-icon");
      \u0275\u0275text(47, "arrow_forward");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(48, "div", 18);
      \u0275\u0275repeaterCreate(49, SuperAdminDashboardPage_For_50_Template, 22, 6, "div", 19, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "section", 8)(52, "h2", 9);
      \u0275\u0275text(53, "Actividad del Sistema");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "div", 20);
      \u0275\u0275repeaterCreate(55, SuperAdminDashboardPage_For_56_Template, 7, 4, "div", 21, _forTrack1);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("Bienvenido, ", ctx.authService.userFullName(), " - Super Administrador");
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.stats());
      \u0275\u0275advance(36);
      \u0275\u0275repeater(ctx.organizations());
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.systemActivity());
    }
  }, dependencies: [
    RouterLink,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatChip,
    MatChipSet
  ], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 2rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  overflow: hidden;\n  min-width: 0;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n@media (min-width: 640px) {\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n    gap: 1rem;\n  }\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  flex-shrink: 0;\n}\n.stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n@media (min-width: 640px) {\n  .stat-icon[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n    border-radius: 12px;\n  }\n  .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 24px;\n    width: 24px;\n    height: 24px;\n  }\n}\n.stat-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  line-height: 1.2;\n}\n@media (min-width: 640px) {\n  .stat-value[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  margin-top: 0.125rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (min-width: 640px) {\n  .stat-label[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n}\n.stat-change[_ngcontent-%COMP%] {\n  display: none;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.7rem;\n  color: #ef4444;\n  flex-shrink: 0;\n  padding: 0.2rem 0.4rem;\n  border-radius: 4px;\n  background: rgba(239, 68, 68, 0.1);\n}\n.stat-change.positive[_ngcontent-%COMP%] {\n  color: #22c55e;\n  background: rgba(34, 197, 94, 0.1);\n}\n.stat-change[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n@media (min-width: 480px) {\n  .stat-change[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n@media (min-width: 640px) {\n  .stat-change[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.25rem 0.5rem;\n  }\n  .stat-change[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n    width: 16px;\n    height: 16px;\n  }\n}\n.section[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1.25rem;\n  margin-bottom: 1.5rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem;\n}\n.quick-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 1rem;\n}\n.action-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1.5rem;\n  background: var(--mat-sys-surface-container-high);\n  border-radius: 12px;\n  text-decoration: none;\n  color: inherit;\n  transition: transform 0.2s, background-color 0.2s;\n}\n.action-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  background: var(--mat-sys-surface-container-highest);\n}\n.action-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: var(--mat-sys-primary);\n}\n.action-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  text-align: center;\n}\n.two-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1.5rem;\n}\n@media (min-width: 900px) {\n  .two-columns[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.org-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.org-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem;\n  background: var(--mat-sys-surface-container-high);\n  border-radius: 8px;\n  flex-wrap: wrap;\n}\n@media (min-width: 480px) {\n  .org-card[_ngcontent-%COMP%] {\n    padding: 1rem;\n    gap: 1rem;\n    flex-wrap: nowrap;\n  }\n}\n.org-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  background: var(--mat-sys-primary);\n  color: var(--mat-sys-on-primary);\n  display: flex;\n  font-size: 0.875rem;\n  flex-shrink: 0;\n}\n@media (min-width: 480px) {\n  .org-avatar[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n    border-radius: 10px;\n    font-size: 1rem;\n  }\n}\n.org-avatar[_ngcontent-%COMP%] {\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n}\n.org-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  order: 2;\n  width: calc(100% - 60px);\n}\n@media (min-width: 480px) {\n  .org-info[_ngcontent-%COMP%] {\n    order: 0;\n    width: auto;\n  }\n}\n.org-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (min-width: 480px) {\n  .org-name[_ngcontent-%COMP%] {\n    font-size: 0.9375rem;\n  }\n}\n.org-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin: 0;\n  font-size: 0.7rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n@media (min-width: 480px) {\n  .org-meta[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n}\n.org-meta[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  width: 12px;\n  height: 12px;\n}\n@media (min-width: 480px) {\n  .org-meta[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n    width: 14px;\n    height: 14px;\n  }\n}\n.org-stats[_ngcontent-%COMP%] {\n  display: none;\n  gap: 0.5rem;\n}\n@media (min-width: 640px) {\n  .org-stats[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n.org-stat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.org-stat[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\nmat-chip-set[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (min-width: 480px) {\n  mat-chip-set[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n.chip-active[_ngcontent-%COMP%] {\n  --mat-chip-label-text-color: #22c55e;\n  --mat-chip-elevated-container-color: rgba(34, 197, 94, 0.15);\n}\n.chip-inactive[_ngcontent-%COMP%] {\n  --mat-chip-label-text-color: #ef4444;\n  --mat-chip-elevated-container-color: rgba(239, 68, 68, 0.15);\n}\n.activity-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n@media (min-width: 480px) {\n  .activity-list[_ngcontent-%COMP%] {\n    gap: 1rem;\n  }\n}\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n}\n@media (min-width: 480px) {\n  .activity-item[_ngcontent-%COMP%] {\n    gap: 0.75rem;\n  }\n}\n.activity-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin-top: 6px;\n  flex-shrink: 0;\n}\n.activity-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.activity-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.activity-time[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n/*# sourceMappingURL=dashboard.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SuperAdminDashboardPage, [{
    type: Component,
    args: [{ selector: "app-super-admin-dashboard", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      RouterLink,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatDividerModule,
      MatChipsModule
    ], template: `
    <div class="dashboard-container">
      <!-- Header -->
      <header class="dashboard-header">
        <div>
          <h1 class="title">Panel de Control</h1>
          <p class="subtitle">Bienvenido, {{ authService.userFullName() }} - Super Administrador</p>
        </div>
        <div class="header-actions">
          <button matButton="filled" routerLink="/super-admin/organizations/new">
            <mat-icon>add</mat-icon>
            Nueva Organizaci\xF3n
          </button>
        </div>
      </header>

      <!-- Stats Cards -->
      <section class="stats-grid">
        @for (stat of stats(); track stat.label) {
          <div class="stat-card">
            <div class="stat-icon" [style.background]="stat.color">
              <mat-icon>{{ stat.icon }}</mat-icon>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
            @if (stat.change !== undefined) {
              <div class="stat-change" [class.positive]="stat.change > 0">
                <mat-icon>{{ stat.change > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                <span>{{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%</span>
              </div>
            }
          </div>
        }
      </section>

      <!-- Quick Actions -->
      <section class="section">
        <h2 class="section-title">Acciones R\xE1pidas</h2>
        <div class="quick-actions">
          <a routerLink="/super-admin/organizations/new" class="action-card">
            <mat-icon>business</mat-icon>
            <span>Crear Organizaci\xF3n</span>
          </a>
          <a routerLink="/super-admin/announcements/new" class="action-card">
            <mat-icon>campaign</mat-icon>
            <span>Nuevo Anuncio</span>
          </a>
          <a routerLink="/super-admin/admins" class="action-card">
            <mat-icon>manage_accounts</mat-icon>
            <span>Gestionar Admins</span>
          </a>
          <a routerLink="/super-admin/reports" class="action-card">
            <mat-icon>analytics</mat-icon>
            <span>Ver Reportes</span>
          </a>
        </div>
      </section>

      <div class="two-columns">
        <!-- Recent Organizations -->
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">Organizaciones Recientes</h2>
            <a matButton routerLink="/super-admin/organizations">
              Ver todas
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </div>

          <div class="org-list">
            @for (org of organizations(); track org.id) {
              <div class="org-card">
                <div class="org-avatar">{{ org.name.charAt(0) }}</div>
                <div class="org-info">
                  <h3 class="org-name">{{ org.name }}</h3>
                  <p class="org-meta">
                    <mat-icon>location_on</mat-icon>
                    {{ org.country }}
                  </p>
                </div>
                <div class="org-stats">
                  <span class="org-stat">
                    <mat-icon>person</mat-icon>
                    {{ org.adminsCount }}
                  </span>
                  <span class="org-stat">
                    <mat-icon>emoji_events</mat-icon>
                    {{ org.championshipsCount }}
                  </span>
                </div>
                <mat-chip-set>
                  @if (org.isActive) {
                    <mat-chip class="chip-active">Activa</mat-chip>
                  } @else {
                    <mat-chip class="chip-inactive">Inactiva</mat-chip>
                  }
                </mat-chip-set>
              </div>
            }
          </div>
        </section>

        <!-- System Activity -->
        <section class="section">
          <h2 class="section-title">Actividad del Sistema</h2>
          <div class="activity-list">
            @for (activity of systemActivity(); track activity.id) {
              <div class="activity-item">
                <div class="activity-dot" [style.background]="activity.color"></div>
                <div class="activity-content">
                  <p>{{ activity.message }}</p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;c4b47f98e69af03694de26cad7f7af6053828e40e3b829de83cf490762daa837;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/super-admin/pages/dashboard/dashboard.page.ts */\n.dashboard-container {\n  padding: 1.5rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.dashboard-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 2rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.title {\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0;\n}\n.subtitle {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.stat-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n  overflow: hidden;\n  min-width: 0;\n}\n.stat-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n@media (min-width: 640px) {\n  .stat-card {\n    padding: 1.25rem;\n    gap: 1rem;\n  }\n}\n.stat-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  flex-shrink: 0;\n}\n.stat-icon mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n@media (min-width: 640px) {\n  .stat-icon {\n    width: 48px;\n    height: 48px;\n    border-radius: 12px;\n  }\n  .stat-icon mat-icon {\n    font-size: 24px;\n    width: 24px;\n    height: 24px;\n  }\n}\n.stat-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.stat-value {\n  font-size: 1.25rem;\n  font-weight: 700;\n  line-height: 1.2;\n}\n@media (min-width: 640px) {\n  .stat-value {\n    font-size: 1.5rem;\n  }\n}\n.stat-label {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  margin-top: 0.125rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (min-width: 640px) {\n  .stat-label {\n    font-size: 0.875rem;\n  }\n}\n.stat-change {\n  display: none;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.7rem;\n  color: #ef4444;\n  flex-shrink: 0;\n  padding: 0.2rem 0.4rem;\n  border-radius: 4px;\n  background: rgba(239, 68, 68, 0.1);\n}\n.stat-change.positive {\n  color: #22c55e;\n  background: rgba(34, 197, 94, 0.1);\n}\n.stat-change mat-icon {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n@media (min-width: 480px) {\n  .stat-change {\n    display: flex;\n  }\n}\n@media (min-width: 640px) {\n  .stat-change {\n    font-size: 0.75rem;\n    padding: 0.25rem 0.5rem;\n  }\n  .stat-change mat-icon {\n    font-size: 16px;\n    width: 16px;\n    height: 16px;\n  }\n}\n.section {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1.25rem;\n  margin-bottom: 1.5rem;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.section-title {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem;\n}\n.quick-actions {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 1rem;\n}\n.action-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1.5rem;\n  background: var(--mat-sys-surface-container-high);\n  border-radius: 12px;\n  text-decoration: none;\n  color: inherit;\n  transition: transform 0.2s, background-color 0.2s;\n}\n.action-card:hover {\n  transform: translateY(-2px);\n  background: var(--mat-sys-surface-container-highest);\n}\n.action-card mat-icon {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: var(--mat-sys-primary);\n}\n.action-card span {\n  font-size: 0.875rem;\n  font-weight: 500;\n  text-align: center;\n}\n.two-columns {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1.5rem;\n}\n@media (min-width: 900px) {\n  .two-columns {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.org-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.org-card {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem;\n  background: var(--mat-sys-surface-container-high);\n  border-radius: 8px;\n  flex-wrap: wrap;\n}\n@media (min-width: 480px) {\n  .org-card {\n    padding: 1rem;\n    gap: 1rem;\n    flex-wrap: nowrap;\n  }\n}\n.org-avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  background: var(--mat-sys-primary);\n  color: var(--mat-sys-on-primary);\n  display: flex;\n  font-size: 0.875rem;\n  flex-shrink: 0;\n}\n@media (min-width: 480px) {\n  .org-avatar {\n    width: 44px;\n    height: 44px;\n    border-radius: 10px;\n    font-size: 1rem;\n  }\n}\n.org-avatar {\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n}\n.org-info {\n  flex: 1;\n  min-width: 0;\n  order: 2;\n  width: calc(100% - 60px);\n}\n@media (min-width: 480px) {\n  .org-info {\n    order: 0;\n    width: auto;\n  }\n}\n.org-name {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (min-width: 480px) {\n  .org-name {\n    font-size: 0.9375rem;\n  }\n}\n.org-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin: 0;\n  font-size: 0.7rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n@media (min-width: 480px) {\n  .org-meta {\n    font-size: 0.75rem;\n  }\n}\n.org-meta mat-icon {\n  font-size: 12px;\n  width: 12px;\n  height: 12px;\n}\n@media (min-width: 480px) {\n  .org-meta mat-icon {\n    font-size: 14px;\n    width: 14px;\n    height: 14px;\n  }\n}\n.org-stats {\n  display: none;\n  gap: 0.5rem;\n}\n@media (min-width: 640px) {\n  .org-stats {\n    display: flex;\n  }\n}\n.org-stat {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.org-stat mat-icon {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\nmat-chip-set {\n  display: none;\n}\n@media (min-width: 480px) {\n  mat-chip-set {\n    display: block;\n  }\n}\n.chip-active {\n  --mat-chip-label-text-color: #22c55e;\n  --mat-chip-elevated-container-color: rgba(34, 197, 94, 0.15);\n}\n.chip-inactive {\n  --mat-chip-label-text-color: #ef4444;\n  --mat-chip-elevated-container-color: rgba(239, 68, 68, 0.15);\n}\n.activity-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n@media (min-width: 480px) {\n  .activity-list {\n    gap: 1rem;\n  }\n}\n.activity-item {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n}\n@media (min-width: 480px) {\n  .activity-item {\n    gap: 0.75rem;\n  }\n}\n.activity-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin-top: 6px;\n  flex-shrink: 0;\n}\n.activity-content {\n  flex: 1;\n}\n.activity-content p {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.activity-time {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n/*# sourceMappingURL=dashboard.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SuperAdminDashboardPage, { className: "SuperAdminDashboardPage", filePath: "src/app/features/super-admin/pages/dashboard/dashboard.page.ts", lineNumber: 564 });
})();
export {
  SuperAdminDashboardPage as default
};
//# sourceMappingURL=chunk-4S7FNVK7.js.map
