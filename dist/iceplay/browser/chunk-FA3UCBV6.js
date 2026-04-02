import {
  MatSnackBar
} from "./chunk-YMDV4HUG.js";
import {
  ChampionshipService,
  ChampionshipStatus
} from "./chunk-BQKVUEWM.js";
import {
  MatTooltipModule
} from "./chunk-N35N62WD.js";
import "./chunk-5PCYIOFH.js";
import {
  AuthService
} from "./chunk-CTYH5NZ2.js";
import "./chunk-I4DDBC3P.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-XFI35W56.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-N73HKLCH.js";
import {
  MatChipsModule
} from "./chunk-YXKCRHVH.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-Y2WVIPA7.js";
import {
  MatOption
} from "./chunk-PT2DXUCN.js";
import {
  MatFormFieldModule
} from "./chunk-5LOHSV5W.js";
import "./chunk-DRU5KYA4.js";
import "./chunk-7MBHIBBN.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-KLQVA5RB.js";
import "./chunk-UVODHWP6.js";
import "./chunk-VMJIIGHX.js";
import {
  MatFormField
} from "./chunk-A4ZOVHWZ.js";
import "./chunk-2C543PJY.js";
import "./chunk-DNCNJ5D2.js";
import "./chunk-BTLIOYON.js";
import {
  RouterLink
} from "./chunk-XIJO5SZ4.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-TWF5BIFR.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-2QF6PXYN.js";
import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/admin/pages/championships/championships-list.page.ts
var _c0 = (a0) => ["/admin/championships", a0];
var _c1 = (a0) => ["/admin/championships", a0, "edit"];
var _forTrack0 = ($index, $item) => $item.value;
function ChampionshipsListPage_Conditional_12_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Nombre");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipsListPage_Conditional_12_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19)(1, "div", 20)(2, "div", 21)(3, "mat-icon");
    \u0275\u0275text(4, "emoji_events");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "span", 22);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 23);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(item_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.season);
  }
}
function ChampionshipsListPage_Conditional_12_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Deporte (ID)");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipsListPage_Conditional_12_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.sportId);
  }
}
function ChampionshipsListPage_Conditional_12_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Max. Equipos");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipsListPage_Conditional_12_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.maxTeams || 0);
  }
}
function ChampionshipsListPage_Conditional_12_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipsListPage_Conditional_12_td_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r7 = ctx.$implicit;
    \u0275\u0275property("value", status_r7.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", status_r7.label, " ");
  }
}
function ChampionshipsListPage_Conditional_12_td_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 19)(1, "mat-form-field", 24)(2, "mat-select", 25);
    \u0275\u0275listener("selectionChange", function ChampionshipsListPage_Conditional_12_td_12_Template_mat_select_selectionChange_2_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.updateChampionshipStatus(item_r5.id, $event.value));
    });
    \u0275\u0275repeaterCreate(3, ChampionshipsListPage_Conditional_12_td_12_For_4_Template, 2, 2, "mat-option", 26, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", item_r5.status);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r5.availableStatuses);
  }
}
function ChampionshipsListPage_Conditional_12_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 18);
  }
}
function ChampionshipsListPage_Conditional_12_td_15_For_20_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 34);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipsListPage_Conditional_12_td_15_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function ChampionshipsListPage_Conditional_12_td_15_For_20_Template_button_click_0_listener() {
      const status_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const item_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.updateChampionshipStatus(item_r10.id, status_r9.value));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ChampionshipsListPage_Conditional_12_td_15_For_20_Conditional_5_Template, 2, 0, "mat-icon", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r9 = ctx.$implicit;
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected-status", item_r10.status === status_r9.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r5.getStatusIcon(status_r9.value));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(status_r9.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r10.status === status_r9.value ? 5 : -1);
  }
}
function ChampionshipsListPage_Conditional_12_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19)(1, "button", 27)(2, "mat-icon");
    \u0275\u0275text(3, "more_vert");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-menu", null, 0)(6, "a", 28)(7, "mat-icon");
    \u0275\u0275text(8, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Ver detalles");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "a", 28)(12, "mat-icon");
    \u0275\u0275text(13, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Editar");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(16, "mat-divider");
    \u0275\u0275elementStart(17, "div", 29);
    \u0275\u0275text(18, "Cambiar Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(19, ChampionshipsListPage_Conditional_12_td_15_For_20_Template, 6, 5, "button", 30, _forTrack0);
    \u0275\u0275element(21, "mat-divider");
    \u0275\u0275elementStart(22, "button", 31)(23, "mat-icon");
    \u0275\u0275text(24, "content_copy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "Duplicar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "button", 32)(28, "mat-icon");
    \u0275\u0275text(29, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31, "Eliminar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const menu_r11 = \u0275\u0275reference(5);
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r11);
    \u0275\u0275advance(5);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c0, item_r10.id));
    \u0275\u0275advance(5);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c1, item_r10.id));
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r5.availableStatuses);
  }
}
function ChampionshipsListPage_Conditional_12_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 35);
  }
}
function ChampionshipsListPage_Conditional_12_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 36);
  }
}
function ChampionshipsListPage_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 7);
    \u0275\u0275elementContainerStart(1, 9);
    \u0275\u0275template(2, ChampionshipsListPage_Conditional_12_th_2_Template, 2, 0, "th", 10)(3, ChampionshipsListPage_Conditional_12_td_3_Template, 10, 2, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 12);
    \u0275\u0275template(5, ChampionshipsListPage_Conditional_12_th_5_Template, 2, 0, "th", 10)(6, ChampionshipsListPage_Conditional_12_td_6_Template, 2, 1, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 13);
    \u0275\u0275template(8, ChampionshipsListPage_Conditional_12_th_8_Template, 2, 0, "th", 10)(9, ChampionshipsListPage_Conditional_12_td_9_Template, 2, 1, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 14);
    \u0275\u0275template(11, ChampionshipsListPage_Conditional_12_th_11_Template, 2, 0, "th", 10)(12, ChampionshipsListPage_Conditional_12_td_12_Template, 5, 1, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 15);
    \u0275\u0275template(14, ChampionshipsListPage_Conditional_12_th_14_Template, 1, 0, "th", 10)(15, ChampionshipsListPage_Conditional_12_td_15_Template, 32, 7, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(16, ChampionshipsListPage_Conditional_12_tr_16_Template, 1, 0, "tr", 16)(17, ChampionshipsListPage_Conditional_12_tr_17_Template, 1, 0, "tr", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r5.championships());
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r5.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r5.displayedColumns);
  }
}
function ChampionshipsListPage_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "emoji_events");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay campeonatos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Crea tu primer campeonato para comenzar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 5)(8, "mat-icon");
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Crear Campeonato ");
    \u0275\u0275elementEnd()();
  }
}
var ChampionshipsListPage = class _ChampionshipsListPage {
  displayedColumns = ["name", "sport", "teams", "status", "actions"];
  championshipService = inject(ChampionshipService);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  championships = signal([], __spreadValues({}, ngDevMode ? { debugName: "championships" } : {}));
  availableStatuses = [
    { value: ChampionshipStatus.Draft, label: "Borrador" },
    { value: ChampionshipStatus.Registration, label: "Inscripciones" },
    { value: ChampionshipStatus.Active, label: "Activo" },
    { value: ChampionshipStatus.Finished, label: "Finalizado" },
    { value: ChampionshipStatus.Cancelled, label: "Cancelado" }
  ];
  constructor() {
    effect((onCleanup) => {
      const user = this.authService.currentUser();
      if (user && user.organizationId) {
        const sub = this.championshipService.getAll({ organizationId: +user.organizationId }).subscribe((result) => {
          this.championships.set(result.data);
        });
        onCleanup(() => sub.unsubscribe());
      }
    });
  }
  getStatusLabel(status) {
    const labels = {
      draft: "Borrador",
      registration: "Inscripciones",
      active: "Activo",
      finished: "Finalizado",
      cancelled: "Cancelado"
    };
    return labels[status] || status;
  }
  getStatusIcon(status) {
    const icons = {
      draft: "drafts",
      registration: "how_to_reg",
      active: "play_circle",
      finished: "check_circle",
      cancelled: "cancel"
    };
    return icons[status] || "help";
  }
  updateChampionshipStatus(championshipId, newStatus) {
    this.championshipService.updateStatus(String(championshipId), { status: newStatus }).subscribe({
      next: (updatedChampionship) => {
        this.championships.update((champs) => champs.map((c) => c.id === championshipId ? updatedChampionship : c));
        this.snackBar.open(`Estado cambiado a "${this.getStatusLabel(newStatus)}"`, "Cerrar", {
          duration: 3e3
        });
      },
      error: (error) => {
        console.error("Error updating championship status", error);
        this.snackBar.open("Error al cambiar el estado del campeonato", "Cerrar", {
          duration: 3e3
        });
      }
    });
  }
  static \u0275fac = function ChampionshipsListPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChampionshipsListPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChampionshipsListPage, selectors: [["app-championships-list"]], decls: 14, vars: 1, consts: [["menu", "matMenu"], [1, "page-container"], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["matButton", "filled", "routerLink", "/admin/championships/new"], [1, "content-card"], ["mat-table", "", 1, "w-full", 3, "dataSource"], [1, "empty-state"], ["matColumnDef", "name"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "sport"], ["matColumnDef", "teams"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "flex", "items-center", "gap-3"], [1, "sport-icon"], [1, "font-medium"], [1, "text-secondary", "block", "text-sm"], ["appearance", "outline", 1, "status-select"], [3, "selectionChange", "value"], [3, "value"], ["matIconButton", "", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "routerLink"], [1, "text-secondary", "px-4", "py-2", "text-xs", "font-semibold"], ["mat-menu-item", "", 3, "selected-status"], ["mat-menu-item", ""], ["mat-menu-item", "", 1, "text-red-500"], ["mat-menu-item", "", 3, "click"], [1, "ml-auto"], ["mat-header-row", ""], ["mat-row", ""]], template: function ChampionshipsListPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "div")(3, "h1", 3);
      \u0275\u0275text(4, "Campeonatos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Gestiona los campeonatos de tu organizaci\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 5)(8, "mat-icon");
      \u0275\u0275text(9, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " Nuevo Campeonato ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 6);
      \u0275\u0275conditionalCreate(12, ChampionshipsListPage_Conditional_12_Template, 18, 3, "table", 7)(13, ChampionshipsListPage_Conditional_13_Template, 11, 0, "div", 8);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275conditional(ctx.championships().length > 0 ? 12 : 13);
    }
  }, dependencies: [
    RouterLink,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatChipsModule,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatTooltipModule,
    MatSelectModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    MatDividerModule,
    MatDivider
  ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.content-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.sport-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n}\n.status-draft[_ngcontent-%COMP%] {\n  --mat-chip-label-text-color: #6b7280;\n  --mat-chip-elevated-container-color: rgba(107, 114, 128, 0.15);\n}\n.status-active[_ngcontent-%COMP%] {\n  --mat-chip-label-text-color: #22c55e;\n  --mat-chip-elevated-container-color: rgba(34, 197, 94, 0.15);\n}\n.status-finished[_ngcontent-%COMP%] {\n  --mat-chip-label-text-color: #3b82f6;\n  --mat-chip-elevated-container-color: rgba(59, 130, 246, 0.15);\n}\n.status-registration[_ngcontent-%COMP%] {\n  --mat-chip-label-text-color: #f59e0b;\n  --mat-chip-elevated-container-color: rgba(245, 158, 11, 0.15);\n}\n.status-cancelled[_ngcontent-%COMP%] {\n  --mat-chip-label-text-color: #ef4444;\n  --mat-chip-elevated-container-color: rgba(239, 68, 68, 0.15);\n}\n.status-select[_ngcontent-%COMP%] {\n  width: 140px;\n  font-size: 0.875rem;\n}\n.status-select[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.selected-status[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-surface-container-high);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: var(--mat-sys-outline);\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.25rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0 0 1.5rem;\n}\n/*# sourceMappingURL=championships-list.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChampionshipsListPage, [{
    type: Component,
    args: [{ selector: "app-championships-list", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      RouterLink,
      MatIconModule,
      MatButtonModule,
      MatTableModule,
      MatChipsModule,
      MatMenuModule,
      MatTooltipModule,
      MatSelectModule,
      MatFormFieldModule,
      MatDividerModule
    ], template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1 class="page-title">Campeonatos</h1>
          <p class="page-subtitle">Gestiona los campeonatos de tu organizaci\xF3n</p>
        </div>
        <button matButton="filled" routerLink="/admin/championships/new">
          <mat-icon>add</mat-icon>
          Nuevo Campeonato
        </button>
      </header>

      <div class="content-card">
        @if (championships().length > 0) {
          <table mat-table [dataSource]="championships()" class="w-full">
            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nombre</th>
              <td mat-cell *matCellDef="let item">
                <div class="flex items-center gap-3">
                  <div class="sport-icon">
                    <mat-icon>emoji_events</mat-icon>
                  </div>
                  <div>
                    <span class="font-medium">{{ item.name }}</span>
                    <span class="text-secondary block text-sm">{{ item.season }}</span>
                  </div>
                </div>
              </td>
            </ng-container>

            <!-- Sport Column -->
            <ng-container matColumnDef="sport">
              <th mat-header-cell *matHeaderCellDef>Deporte (ID)</th>
              <td mat-cell *matCellDef="let item">{{ item.sportId }}</td>
            </ng-container>

            <!-- Teams Column -->
            <ng-container matColumnDef="teams">
              <th mat-header-cell *matHeaderCellDef>Max. Equipos</th>
              <td mat-cell *matCellDef="let item">{{ item.maxTeams || 0 }}</td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Estado</th>
              <td mat-cell *matCellDef="let item">
                <mat-form-field appearance="outline" class="status-select">
                  <mat-select
                    [value]="item.status"
                    (selectionChange)="updateChampionshipStatus(item.id, $event.value)"
                  >
                    @for (status of availableStatuses; track status.value) {
                      <mat-option [value]="status.value">
                        {{ status.label }}
                      </mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let item">
                <button matIconButton [matMenuTriggerFor]="menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <a mat-menu-item [routerLink]="['/admin/championships', item.id]">
                    <mat-icon>visibility</mat-icon>
                    <span>Ver detalles</span>
                  </a>
                  <a mat-menu-item [routerLink]="['/admin/championships', item.id, 'edit']">
                    <mat-icon>edit</mat-icon>
                    <span>Editar</span>
                  </a>
                  <mat-divider></mat-divider>
                  <div class="text-secondary px-4 py-2 text-xs font-semibold">Cambiar Estado</div>
                  @for (status of availableStatuses; track status.value) {
                    <button
                      mat-menu-item
                      (click)="updateChampionshipStatus(item.id, status.value)"
                      [class.selected-status]="item.status === status.value"
                    >
                      <mat-icon>{{ getStatusIcon(status.value) }}</mat-icon>
                      <span>{{ status.label }}</span>
                      @if (item.status === status.value) {
                        <mat-icon class="ml-auto">check</mat-icon>
                      }
                    </button>
                  }
                  <mat-divider></mat-divider>
                  <button mat-menu-item>
                    <mat-icon>content_copy</mat-icon>
                    <span>Duplicar</span>
                  </button>
                  <button mat-menu-item class="text-red-500">
                    <mat-icon>delete</mat-icon>
                    <span>Eliminar</span>
                  </button>
                </mat-menu>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        } @else {
          <div class="empty-state">
            <mat-icon>emoji_events</mat-icon>
            <h3>No hay campeonatos</h3>
            <p>Crea tu primer campeonato para comenzar</p>
            <button matButton="filled" routerLink="/admin/championships/new">
              <mat-icon>add</mat-icon>
              Crear Campeonato
            </button>
          </div>
        }
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;1be1c58b5a937602b4be645f78d866632f29e00db308cd2a79b6c42ac755f5c2;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/admin/pages/championships/championships-list.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.content-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.sport-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n}\n.status-draft {\n  --mat-chip-label-text-color: #6b7280;\n  --mat-chip-elevated-container-color: rgba(107, 114, 128, 0.15);\n}\n.status-active {\n  --mat-chip-label-text-color: #22c55e;\n  --mat-chip-elevated-container-color: rgba(34, 197, 94, 0.15);\n}\n.status-finished {\n  --mat-chip-label-text-color: #3b82f6;\n  --mat-chip-elevated-container-color: rgba(59, 130, 246, 0.15);\n}\n.status-registration {\n  --mat-chip-label-text-color: #f59e0b;\n  --mat-chip-elevated-container-color: rgba(245, 158, 11, 0.15);\n}\n.status-cancelled {\n  --mat-chip-label-text-color: #ef4444;\n  --mat-chip-elevated-container-color: rgba(239, 68, 68, 0.15);\n}\n.status-select {\n  width: 140px;\n  font-size: 0.875rem;\n}\n.status-select ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.selected-status {\n  background-color: var(--mat-sys-surface-container-high);\n}\n.empty-state {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.empty-state mat-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: var(--mat-sys-outline);\n  margin-bottom: 1rem;\n}\n.empty-state h3 {\n  margin: 0 0 0.5rem;\n  font-size: 1.25rem;\n}\n.empty-state p {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0 0 1.5rem;\n}\n/*# sourceMappingURL=championships-list.page.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChampionshipsListPage, { className: "ChampionshipsListPage", filePath: "src/app/features/admin/pages/championships/championships-list.page.ts", lineNumber: 274 });
})();
export {
  ChampionshipsListPage as default
};
//# sourceMappingURL=chunk-FA3UCBV6.js.map
