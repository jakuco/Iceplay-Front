import {
  RouterLink
} from "./chunk-OUAXBHXP.js";
import {
  MatButtonModule,
  MatIconButton
} from "./chunk-T2MKQVTJ.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-AAICBOD7.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-HGKGTKMW.js";
import "./chunk-VUJOFXKG.js";

// src/app/features/super-admin/pages/announcements/announcement-form.page.ts
var AnnouncementFormPage = class _AnnouncementFormPage {
  static \u0275fac = function AnnouncementFormPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnnouncementFormPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnnouncementFormPage, selectors: [["app-announcement-form"]], decls: 11, vars: 0, consts: [[1, "page-container"], [1, "page-header"], [1, "flex", "items-center", "gap-3"], ["matIconButton", "", "routerLink", "/super-admin/announcements"], [1, "page-title"], [1, "content-card"], [1, "text-secondary"]], template: function AnnouncementFormPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "a", 3)(4, "mat-icon");
      \u0275\u0275text(5, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h1", 4);
      \u0275\u0275text(7, "Nuevo Anuncio");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "div", 5)(9, "p", 6);
      \u0275\u0275text(10, "Formulario de anuncio (en desarrollo)");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [RouterLink, MatIconModule, MatIcon, MatButtonModule, MatIconButton], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.content-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n/*# sourceMappingURL=announcement-form.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnnouncementFormPage, [{
    type: Component,
    args: [{ selector: "app-announcement-form", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, MatIconModule, MatButtonModule], template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/super-admin/announcements">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <h1 class="page-title">Nuevo Anuncio</h1>
        </div>
      </header>
      <div class="content-card">
        <p class="text-secondary">Formulario de anuncio (en desarrollo)</p>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;9a225c41a04a284007a3ff48b27adb259b8e53bdd576b5ab75915d5ebaf704b6;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/super-admin/pages/announcements/announcement-form.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.page-header {\n  margin-bottom: 1.5rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.content-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n/*# sourceMappingURL=announcement-form.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnnouncementFormPage, { className: "AnnouncementFormPage", filePath: "src/app/features/super-admin/pages/announcements/announcement-form.page.ts", lineNumber: 46 });
})();
export {
  AnnouncementFormPage as default
};
//# sourceMappingURL=chunk-IRRSGEVQ.js.map
