import {
  MatIconModule
} from "./chunk-2QF6PXYN.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-HGKGTKMW.js";
import "./chunk-VUJOFXKG.js";

// src/app/features/super-admin/pages/reports/reports.page.ts
var ReportsPage = class _ReportsPage {
  static \u0275fac = function ReportsPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReportsPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportsPage, selectors: [["app-reports"]], decls: 9, vars: 0, consts: [[1, "page-container"], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "content-card"], [1, "text-secondary", "text-center", "py-8"]], template: function ReportsPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "header", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Reportes");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "p", 3);
      \u0275\u0275text(5, "Reportes y m\xE9tricas del sistema");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "div", 4)(7, "p", 5);
      \u0275\u0275text(8, "Reportes y m\xE9tricas (en desarrollo)");
      \u0275\u0275domElementEnd()()();
    }
  }, dependencies: [MatIconModule], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.content-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n/*# sourceMappingURL=reports.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportsPage, [{
    type: Component,
    args: [{ selector: "app-reports", changeDetection: ChangeDetectionStrategy.OnPush, imports: [MatIconModule], template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Reportes</h1>
        <p class="page-subtitle">Reportes y m\xE9tricas del sistema</p>
      </header>
      <div class="content-card">
        <p class="text-secondary text-center py-8">Reportes y m\xE9tricas (en desarrollo)</p>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;9c84e3e0035872287a7da3c62be02f562647bddc78c9b7b7a10a679d6a92b424;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/super-admin/pages/reports/reports.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header {\n  margin-bottom: 1.5rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.content-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n/*# sourceMappingURL=reports.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportsPage, { className: "ReportsPage", filePath: "src/app/features/super-admin/pages/reports/reports.page.ts", lineNumber: 27 });
})();
export {
  ReportsPage as default
};
//# sourceMappingURL=chunk-AMKR673N.js.map
