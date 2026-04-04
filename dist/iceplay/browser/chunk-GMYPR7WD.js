import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-F7WKCRHW.js";
import "./chunk-VUJOFXKG.js";

// src/app/features/user/page/championship-detail.page.ts
var ChampionshipDetailPage = class _ChampionshipDetailPage {
  static \u0275fac = function ChampionshipDetailPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChampionshipDetailPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChampionshipDetailPage, selectors: [["app-championship-detail"]], decls: 3, vars: 0, consts: [[1, "page-container"]], template: function ChampionshipDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2, "Championship Detail");
      \u0275\u0275domElementEnd()();
    }
  }, styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n/*# sourceMappingURL=championship-detail.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChampionshipDetailPage, [{
    type: Component,
    args: [{ selector: "app-championship-detail", changeDetection: ChangeDetectionStrategy.OnPush, imports: [], template: `
    <div class="page-container">
      <h1>Championship Detail</h1>
    </div>
  `, styles: ["/* angular:styles/component:scss;803215ca79e7141a0a4f21c6beec3899714504a093d0912ef28c2fef286984fb;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/user/page/championship-detail.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n/*# sourceMappingURL=championship-detail.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChampionshipDetailPage, { className: "ChampionshipDetailPage", filePath: "src/app/features/user/page/championship-detail.page.ts", lineNumber: 20 });
})();
export {
  ChampionshipDetailPage as default
};
//# sourceMappingURL=chunk-GMYPR7WD.js.map
