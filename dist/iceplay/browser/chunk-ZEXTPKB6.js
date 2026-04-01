import {
  RouterLink
} from "./chunk-OUAXBHXP.js";
import {
  MatButton,
  MatButtonModule
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

// src/app/features/super-admin/pages/announcements/announcements-list.page.ts
var AnnouncementsListPage = class _AnnouncementsListPage {
  static \u0275fac = function AnnouncementsListPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnnouncementsListPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnnouncementsListPage, selectors: [["app-announcements-list"]], decls: 14, vars: 0, consts: [[1, "page-container"], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["matButton", "filled", "routerLink", "/super-admin/announcements/new"], [1, "content-card"], [1, "text-secondary", "text-center", "py-8"]], template: function AnnouncementsListPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, "Anuncios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Gestiona los anuncios del sistema");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 4)(8, "mat-icon");
      \u0275\u0275text(9, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " Nuevo Anuncio ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 5)(12, "p", 6);
      \u0275\u0275text(13, "Lista de anuncios (en desarrollo)");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [RouterLink, MatIconModule, MatIcon, MatButtonModule, MatButton], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.content-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n/*# sourceMappingURL=announcements-list.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnnouncementsListPage, [{
    type: Component,
    args: [{ selector: "app-announcements-list", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, MatIconModule, MatButtonModule], template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1 class="page-title">Anuncios</h1>
          <p class="page-subtitle">Gestiona los anuncios del sistema</p>
        </div>
        <button matButton="filled" routerLink="/super-admin/announcements/new">
          <mat-icon>add</mat-icon>
          Nuevo Anuncio
        </button>
      </header>
      <div class="content-card">
        <p class="text-secondary text-center py-8">Lista de anuncios (en desarrollo)</p>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;0b4fbdc3f33b84ef61c45a420b70ec18199bd6cc69fe25bb03823797e9e4993d;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/super-admin/pages/announcements/announcements-list.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.content-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 2rem;\n}\n/*# sourceMappingURL=announcements-list.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnnouncementsListPage, { className: "AnnouncementsListPage", filePath: "src/app/features/super-admin/pages/announcements/announcements-list.page.ts", lineNumber: 35 });
})();
export {
  AnnouncementsListPage as default
};
//# sourceMappingURL=chunk-ZEXTPKB6.js.map
