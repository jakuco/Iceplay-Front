import {
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-ZXHHQFWT.js";
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
  Input,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/super-admin/pages/organizations/organization-detail.page.ts
var OrganizationDetailPage = class _OrganizationDetailPage {
  id = input.required(__spreadValues({}, ngDevMode ? { debugName: "id" } : {}));
  static \u0275fac = function OrganizationDetailPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrganizationDetailPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrganizationDetailPage, selectors: [["app-organization-detail"]], inputs: { id: [1, "id"] }, decls: 25, vars: 1, consts: [[1, "page-container"], [1, "page-header"], [1, "flex", "items-center", "gap-3"], ["matIconButton", "", "routerLink", "/super-admin/organizations"], [1, "page-title"], ["matButton", "outlined"], ["label", "Informaci\xF3n"], [1, "tab-content"], [1, "text-secondary"], ["label", "Administradores"], ["label", "Campeonatos"]], template: function OrganizationDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "a", 3)(4, "mat-icon");
      \u0275\u0275text(5, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h1", 4);
      \u0275\u0275text(7, "Detalle de Organizaci\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 5)(9, "mat-icon");
      \u0275\u0275text(10, "edit");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Editar ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-tab-group")(13, "mat-tab", 6)(14, "div", 7)(15, "p", 8);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "mat-tab", 9)(18, "div", 7)(19, "p", 8);
      \u0275\u0275text(20, "Lista de administradores...");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "mat-tab", 10)(22, "div", 7)(23, "p", 8);
      \u0275\u0275text(24, "Campeonatos de esta organizaci\xF3n...");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate1("Informaci\xF3n de la organizaci\xF3n ID: ", ctx.id());
    }
  }, dependencies: [RouterLink, MatIconModule, MatIcon, MatButtonModule, MatButton, MatIconButton, MatTabsModule, MatTab, MatTabGroup], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  background: var(--mat-sys-surface-container);\n  border-radius: 0 0 12px 12px;\n  min-height: 200px;\n}\n/*# sourceMappingURL=organization-detail.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrganizationDetailPage, [{
    type: Component,
    args: [{ selector: "app-organization-detail", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, MatIconModule, MatButtonModule, MatTabsModule], template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/super-admin/organizations">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <h1 class="page-title">Detalle de Organizaci\xF3n</h1>
        </div>
        <button matButton="outlined">
          <mat-icon>edit</mat-icon>
          Editar
        </button>
      </header>

      <mat-tab-group>
        <mat-tab label="Informaci\xF3n">
          <div class="tab-content">
            <p class="text-secondary">Informaci\xF3n de la organizaci\xF3n ID: {{ id() }}</p>
          </div>
        </mat-tab>
        <mat-tab label="Administradores">
          <div class="tab-content">
            <p class="text-secondary">Lista de administradores...</p>
          </div>
        </mat-tab>
        <mat-tab label="Campeonatos">
          <div class="tab-content">
            <p class="text-secondary">Campeonatos de esta organizaci\xF3n...</p>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `, styles: ["/* angular:styles/component:scss;f649ea8dadd284046764cda3002b2ddafeb48b316365bfc5a0693d9f5ad344d0;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/super-admin/pages/organizations/organization-detail.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.tab-content {\n  padding: 1.5rem;\n  background: var(--mat-sys-surface-container);\n  border-radius: 0 0 12px 12px;\n  min-height: 200px;\n}\n/*# sourceMappingURL=organization-detail.page.css.map */\n"] }]
  }], null, { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrganizationDetailPage, { className: "OrganizationDetailPage", filePath: "src/app/features/super-admin/pages/organizations/organization-detail.page.ts", lineNumber: 70 });
})();
export {
  OrganizationDetailPage as default
};
//# sourceMappingURL=chunk-ZLGLQ5AU.js.map
