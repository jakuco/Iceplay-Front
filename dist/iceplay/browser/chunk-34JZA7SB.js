import {
  ChampionshipService
} from "./chunk-OV3LMQTO.js";
import "./chunk-Z53GGAOI.js";
import "./chunk-DYTKA3GQ.js";
import {
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-JQQIU6QV.js";
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
  Input,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-F7WKCRHW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/admin/pages/championships/championship-detail.page.ts
var _c0 = (a0) => ["/admin/championships", a0, "edit"];
var ChampionshipDetailPage = class _ChampionshipDetailPage {
  championshipSvc = inject(ChampionshipService);
  id = input.required(__spreadValues({}, ngDevMode ? { debugName: "id" } : {}));
  championshipName = signal("Campeonato", __spreadValues({}, ngDevMode ? { debugName: "championshipName" } : {}));
  ngOnInit() {
    this.championshipSvc.getById(this.id()).subscribe({
      next: (c) => this.championshipName.set(c.name),
      error: () => {
      }
    });
  }
  static \u0275fac = function ChampionshipDetailPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChampionshipDetailPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChampionshipDetailPage, selectors: [["app-championship-detail"]], inputs: { id: [1, "id"] }, decls: 36, vars: 5, consts: [[1, "page-container"], [1, "page-header"], [1, "flex", "items-center", "gap-3"], ["matIconButton", "", "routerLink", "/admin/championships"], [1, "page-title"], [1, "page-subtitle"], ["matButton", "outlined", 3, "routerLink"], ["label", "Resumen"], [1, "tab-content"], [1, "text-secondary"], ["label", "Equipos"], ["label", "Fixture"], ["label", "Tabla"], ["label", "Estad\xEDsticas"]], template: function ChampionshipDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "a", 3)(4, "mat-icon");
      \u0275\u0275text(5, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 4);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 5);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "a", 6)(12, "mat-icon");
      \u0275\u0275text(13, "edit");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, " Editar ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "mat-tab-group")(16, "mat-tab", 7)(17, "div", 8)(18, "p", 9);
      \u0275\u0275text(19, "Informaci\xF3n general del campeonato...");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "mat-tab", 10)(21, "div", 8)(22, "p", 9);
      \u0275\u0275text(23, "Lista de equipos participantes...");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "mat-tab", 11)(25, "div", 8)(26, "p", 9);
      \u0275\u0275text(27, "Calendario de partidos...");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "mat-tab", 12)(29, "div", 8)(30, "p", 9);
      \u0275\u0275text(31, "Tabla de posiciones...");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "mat-tab", 13)(33, "div", 8)(34, "p", 9);
      \u0275\u0275text(35, "Estad\xEDsticas del campeonato...");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.championshipName());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Campeonato ID: ", ctx.id());
      \u0275\u0275advance();
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c0, ctx.id()));
    }
  }, dependencies: [RouterLink, MatIconModule, MatIcon, MatButtonModule, MatButton, MatIconButton, MatTabsModule, MatTab, MatTabGroup], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.5rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  background: var(--mat-sys-surface-container);\n  border-radius: 0 0 12px 12px;\n  min-height: 300px;\n}\n/*# sourceMappingURL=championship-detail.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChampionshipDetailPage, [{
    type: Component,
    args: [{ selector: "app-championship-detail", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, MatIconModule, MatButtonModule, MatTabsModule], template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/admin/championships">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <div>
            <h1 class="page-title">{{ championshipName() }}</h1>
            <p class="page-subtitle">Campeonato ID: {{ id() }}</p>
          </div>
        </div>
        <a matButton="outlined" [routerLink]="['/admin/championships', id(), 'edit']">
          <mat-icon>edit</mat-icon>
          Editar
        </a>
      </header>

      <mat-tab-group>
        <mat-tab label="Resumen">
          <div class="tab-content">
            <p class="text-secondary">Informaci\xF3n general del campeonato...</p>
          </div>
        </mat-tab>
        <mat-tab label="Equipos">
          <div class="tab-content">
            <p class="text-secondary">Lista de equipos participantes...</p>
          </div>
        </mat-tab>
        <mat-tab label="Fixture">
          <div class="tab-content">
            <p class="text-secondary">Calendario de partidos...</p>
          </div>
        </mat-tab>
        <mat-tab label="Tabla">
          <div class="tab-content">
            <p class="text-secondary">Tabla de posiciones...</p>
          </div>
        </mat-tab>
        <mat-tab label="Estad\xEDsticas">
          <div class="tab-content">
            <p class="text-secondary">Estad\xEDsticas del campeonato...</p>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `, styles: ["/* angular:styles/component:scss;fb6d66d0d876930ff6be0b0557b1ace19af745f9b35bc5a911fd571d3bc74e96;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/admin/pages/championships/championship-detail.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.5rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.tab-content {\n  padding: 1.5rem;\n  background: var(--mat-sys-surface-container);\n  border-radius: 0 0 12px 12px;\n  min-height: 300px;\n}\n/*# sourceMappingURL=championship-detail.page.css.map */\n"] }]
  }], null, { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChampionshipDetailPage, { className: "ChampionshipDetailPage", filePath: "src/app/features/admin/pages/championships/championship-detail.page.ts", lineNumber: 92 });
})();
export {
  ChampionshipDetailPage as default
};
//# sourceMappingURL=chunk-34JZA7SB.js.map
