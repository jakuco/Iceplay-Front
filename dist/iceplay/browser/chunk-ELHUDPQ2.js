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
} from "./chunk-BTC4VTXD.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-URAQ4NZC.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-SX2GLNSI.js";
import "./chunk-OXFAHERR.js";
import "./chunk-LDEMS5LB.js";
import "./chunk-QFWQXRDF.js";
import "./chunk-YBE5VDY6.js";
import "./chunk-WFKBK73W.js";
import "./chunk-Q5IAYNPB.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-AE6CM25K.js";
import {
  RouterLink
} from "./chunk-ORPODLRN.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-YOLGDFC3.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-F7WKCRHW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/super-admin/pages/organizations/organizations-list.page.ts
var _c0 = (a0) => ["/super-admin/organizations", a0];
function OrganizationsListPage_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Organizaci\xF3n");
    \u0275\u0275elementEnd();
  }
}
function OrganizationsListPage_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19)(1, "div", 20)(2, "div", 21);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "span", 22);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const org_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(org_r1.name.charAt(0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(org_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(org_r1.country);
  }
}
function OrganizationsListPage_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Contacto");
    \u0275\u0275elementEnd();
  }
}
function OrganizationsListPage_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const org_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(org_r2.contactEmail);
  }
}
function OrganizationsListPage_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Admins");
    \u0275\u0275elementEnd();
  }
}
function OrganizationsListPage_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const org_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(org_r3.adminsCount);
  }
}
function OrganizationsListPage_th_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Campeonatos");
    \u0275\u0275elementEnd();
  }
}
function OrganizationsListPage_td_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const org_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(org_r4.championshipsCount);
  }
}
function OrganizationsListPage_th_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function OrganizationsListPage_td_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const org_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(org_r5.isActive ? "status-active" : "status-inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", org_r5.isActive ? "Activa" : "Inactiva", " ");
  }
}
function OrganizationsListPage_th_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 18);
  }
}
function OrganizationsListPage_td_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19)(1, "button", 24)(2, "mat-icon");
    \u0275\u0275text(3, "more_vert");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-menu", null, 0)(6, "a", 25)(7, "mat-icon");
    \u0275\u0275text(8, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " Ver detalles ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 26)(11, "mat-icon");
    \u0275\u0275text(12, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 26)(15, "mat-icon");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const org_r6 = ctx.$implicit;
    const menu_r7 = \u0275\u0275reference(5);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r7);
    \u0275\u0275advance(5);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c0, org_r6.id));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(org_r6.isActive ? "block" : "check_circle");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", org_r6.isActive ? "Desactivar" : "Activar", " ");
  }
}
function OrganizationsListPage_tr_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 27);
  }
}
function OrganizationsListPage_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 28);
  }
}
var OrganizationsListPage = class _OrganizationsListPage {
  displayedColumns = ["name", "contact", "admins", "championships", "status", "actions"];
  organizations = signal([
    {
      id: "1",
      name: "Liga Deportiva Quito Norte",
      country: "Ecuador",
      contactEmail: "admin@ligaquito.com",
      adminsCount: 2,
      championshipsCount: 4,
      isActive: true,
      createdAt: "2024-06-01"
    },
    {
      id: "2",
      name: "Federaci\xF3n Baloncesto Guayaquil",
      country: "Ecuador",
      contactEmail: "admin@febg.com",
      adminsCount: 3,
      championshipsCount: 2,
      isActive: true,
      createdAt: "2024-08-15"
    },
    {
      id: "3",
      name: "Club Deportivo Los Andes",
      country: "Colombia",
      contactEmail: "info@losandes.com",
      adminsCount: 1,
      championshipsCount: 1,
      isActive: false,
      createdAt: "2024-09-20"
    }
  ], __spreadValues({}, ngDevMode ? { debugName: "organizations" } : {}));
  static \u0275fac = function OrganizationsListPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrganizationsListPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrganizationsListPage, selectors: [["app-organizations-list"]], decls: 33, vars: 3, consts: [["menu", "matMenu"], [1, "page-container"], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["matButton", "filled", "routerLink", "/super-admin/organizations/new"], [1, "content-card"], ["mat-table", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "contact"], ["matColumnDef", "admins"], ["matColumnDef", "championships"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "flex", "items-center", "gap-3"], [1, "org-avatar"], [1, "font-medium"], [1, "text-secondary", "block", "text-sm"], ["matIconButton", "", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "routerLink"], ["mat-menu-item", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function OrganizationsListPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "div")(3, "h1", 3);
      \u0275\u0275text(4, "Organizaciones");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Gestiona todas las organizaciones del sistema");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 5)(8, "mat-icon");
      \u0275\u0275text(9, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " Nueva Organizaci\xF3n ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 6)(12, "table", 7);
      \u0275\u0275elementContainerStart(13, 8);
      \u0275\u0275template(14, OrganizationsListPage_th_14_Template, 2, 0, "th", 9)(15, OrganizationsListPage_td_15_Template, 9, 3, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(16, 11);
      \u0275\u0275template(17, OrganizationsListPage_th_17_Template, 2, 0, "th", 9)(18, OrganizationsListPage_td_18_Template, 2, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(19, 12);
      \u0275\u0275template(20, OrganizationsListPage_th_20_Template, 2, 0, "th", 9)(21, OrganizationsListPage_td_21_Template, 2, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(22, 13);
      \u0275\u0275template(23, OrganizationsListPage_th_23_Template, 2, 0, "th", 9)(24, OrganizationsListPage_td_24_Template, 2, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(25, 14);
      \u0275\u0275template(26, OrganizationsListPage_th_26_Template, 2, 0, "th", 9)(27, OrganizationsListPage_td_27_Template, 3, 3, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(28, 15);
      \u0275\u0275template(29, OrganizationsListPage_th_29_Template, 1, 0, "th", 9)(30, OrganizationsListPage_td_30_Template, 18, 6, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(31, OrganizationsListPage_tr_31_Template, 1, 0, "tr", 16)(32, OrganizationsListPage_tr_32_Template, 1, 0, "tr", 17);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275property("dataSource", ctx.organizations());
      \u0275\u0275advance(19);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
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
    MatChip,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.content-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.org-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  background: var(--mat-sys-primary);\n  color: var(--mat-sys-on-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n}\n.status-active[_ngcontent-%COMP%] {\n  --mat-chip-label-text-color: #22c55e;\n  --mat-chip-elevated-container-color: rgba(34, 197, 94, 0.15);\n}\n.status-inactive[_ngcontent-%COMP%] {\n  --mat-chip-label-text-color: #ef4444;\n  --mat-chip-elevated-container-color: rgba(239, 68, 68, 0.15);\n}\n/*# sourceMappingURL=organizations-list.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrganizationsListPage, [{
    type: Component,
    args: [{ selector: "app-organizations-list", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      RouterLink,
      MatIconModule,
      MatButtonModule,
      MatTableModule,
      MatChipsModule,
      MatMenuModule
    ], template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1 class="page-title">Organizaciones</h1>
          <p class="page-subtitle">Gestiona todas las organizaciones del sistema</p>
        </div>
        <button matButton="filled" routerLink="/super-admin/organizations/new">
          <mat-icon>add</mat-icon>
          Nueva Organizaci\xF3n
        </button>
      </header>

      <div class="content-card">
        <table mat-table [dataSource]="organizations()" class="w-full">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Organizaci\xF3n</th>
            <td mat-cell *matCellDef="let org">
              <div class="flex items-center gap-3">
                <div class="org-avatar">{{ org.name.charAt(0) }}</div>
                <div>
                  <span class="font-medium">{{ org.name }}</span>
                  <span class="text-secondary block text-sm">{{ org.country }}</span>
                </div>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="contact">
            <th mat-header-cell *matHeaderCellDef>Contacto</th>
            <td mat-cell *matCellDef="let org">{{ org.contactEmail }}</td>
          </ng-container>

          <ng-container matColumnDef="admins">
            <th mat-header-cell *matHeaderCellDef>Admins</th>
            <td mat-cell *matCellDef="let org">{{ org.adminsCount }}</td>
          </ng-container>

          <ng-container matColumnDef="championships">
            <th mat-header-cell *matHeaderCellDef>Campeonatos</th>
            <td mat-cell *matCellDef="let org">{{ org.championshipsCount }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Estado</th>
            <td mat-cell *matCellDef="let org">
              <mat-chip [class]="org.isActive ? 'status-active' : 'status-inactive'">
                {{ org.isActive ? 'Activa' : 'Inactiva' }}
              </mat-chip>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let org">
              <button matIconButton [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <a mat-menu-item [routerLink]="['/super-admin/organizations', org.id]">
                  <mat-icon>visibility</mat-icon>
                  Ver detalles
                </a>
                <button mat-menu-item>
                  <mat-icon>edit</mat-icon>
                  Editar
                </button>
                <button mat-menu-item>
                  <mat-icon>{{ org.isActive ? 'block' : 'check_circle' }}</mat-icon>
                  {{ org.isActive ? 'Desactivar' : 'Activar' }}
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;56bbde6cba43b89013ce3cadcafe7e20be541ecf52adbdf22cd34fbb33e41fc7;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/super-admin/pages/organizations/organizations-list.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.content-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.org-avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  background: var(--mat-sys-primary);\n  color: var(--mat-sys-on-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n}\n.status-active {\n  --mat-chip-label-text-color: #22c55e;\n  --mat-chip-elevated-container-color: rgba(34, 197, 94, 0.15);\n}\n.status-inactive {\n  --mat-chip-label-text-color: #ef4444;\n  --mat-chip-elevated-container-color: rgba(239, 68, 68, 0.15);\n}\n/*# sourceMappingURL=organizations-list.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrganizationsListPage, { className: "OrganizationsListPage", filePath: "src/app/features/super-admin/pages/organizations/organizations-list.page.ts", lineNumber: 161 });
})();
export {
  OrganizationsListPage as default
};
//# sourceMappingURL=chunk-ELHUDPQ2.js.map
