import {
  toSignal
} from "./chunk-RSSJKDFU.js";
import {
  MAT_OPTGROUP,
  MAT_OPTION_PARENT_COMPONENT,
  MatOption,
  MatOptionModule,
  MatOptionSelectionChange,
  _countGroupLabelsBeforeOption,
  _getOptionScrollPosition
} from "./chunk-S3XQPSX3.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-AOS46ZGJ.js";
import {
  MatFormFieldModule
} from "./chunk-VRVKNUOO.js";
import {
  OverlayConfig,
  OverlayModule,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy
} from "./chunk-GJ7RVCNK.js";
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-PMJ65NA4.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  ReactiveFormsModule
} from "./chunk-M3WFE2HV.js";
import {
  CdkScrollableModule,
  TemplatePortal,
  ViewportRuler
} from "./chunk-P774KGLL.js";
import {
  ActiveDescendantKeyManager,
  BreakpointObserver,
  Breakpoints,
  DOWN_ARROW,
  ENTER,
  ESCAPE,
  MatButtonModule,
  MatIconButton,
  Platform,
  TAB,
  UP_ARROW,
  _IdGenerator,
  _animationsDisabled,
  _getEventTarget,
  _getFocusedElementPierceShadowDom,
  addAriaReferencedId,
  coerceArray,
  hasModifierKey,
  removeAriaReferencedId
} from "./chunk-T2MKQVTJ.js";
import {
  BidiModule,
  Directionality,
  MatIcon,
  MatIconModule,
  NgOptimizedImage
} from "./chunk-AAICBOD7.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Observable,
  Output,
  Renderer2,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  debounce,
  defer,
  delay,
  distinctUntilChanged,
  effect,
  filter,
  forwardRef,
  inject,
  input,
  map,
  merge,
  of,
  output,
  setClassMetadata,
  startWith,
  switchMap,
  take,
  tap,
  timer,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/shared/ui/spinner/spinner.component.ts
var SpinnerComponent = class _SpinnerComponent {
  size = input("md", __spreadValues({}, ngDevMode ? { debugName: "size" } : {}));
  static \u0275fac = function SpinnerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SpinnerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SpinnerComponent, selectors: [["ui-spinner"]], inputs: { size: [1, "size"] }, decls: 3, vars: 2, consts: [["viewBox", "0 0 24 24", "fill", "none"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", 1, "spinner-track"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-dasharray", "60", 1, "spinner-indicator"]], template: function SpinnerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "circle", 1)(2, "circle", 2);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap("spinner spinner-" + ctx.size());
    }
  }, styles: ["\n\n.spinner[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_rotate 1s linear infinite;\n}\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n.spinner-md[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n}\n.spinner-track[_ngcontent-%COMP%] {\n  opacity: 0.25;\n}\n.spinner-indicator[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_dash 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_rotate {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_dash {\n  0% {\n    stroke-dashoffset: 60;\n  }\n  50% {\n    stroke-dashoffset: 15;\n  }\n  100% {\n    stroke-dashoffset: 60;\n  }\n}\n/*# sourceMappingURL=spinner.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpinnerComponent, [{
    type: Component,
    args: [{ selector: "ui-spinner", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <svg [class]="'spinner spinner-' + size()" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        class="spinner-track"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="60"
        class="spinner-indicator"
      />
    </svg>
  `, styles: ["/* angular:styles/component:scss;b76dac9a2af33440a350962dadf3fd503957be0d463f9197f1a8286cb39a1070;D:/Fropen/Iceplay/Iceplay-Front/src/app/shared/ui/spinner/spinner.component.ts */\n.spinner {\n  animation: rotate 1s linear infinite;\n}\n.spinner-sm {\n  width: 16px;\n  height: 16px;\n}\n.spinner-md {\n  width: 24px;\n  height: 24px;\n}\n.spinner-lg {\n  width: 40px;\n  height: 40px;\n}\n.spinner-track {\n  opacity: 0.25;\n}\n.spinner-indicator {\n  animation: dash 1.5s ease-in-out infinite;\n}\n@keyframes rotate {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes dash {\n  0% {\n    stroke-dashoffset: 60;\n  }\n  50% {\n    stroke-dashoffset: 15;\n  }\n  100% {\n    stroke-dashoffset: 60;\n  }\n}\n/*# sourceMappingURL=spinner.component.css.map */\n"] }]
  }], null, { size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SpinnerComponent, { className: "SpinnerComponent", filePath: "src/app/shared/ui/spinner/spinner.component.ts", lineNumber: 74 });
})();

// src/app/shared/ui/button/button.component.ts
var _c0 = ["*"];
function ButtonComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ui-spinner", 1);
  }
}
var ButtonComponent = class _ButtonComponent {
  variant = input("primary", __spreadValues({}, ngDevMode ? { debugName: "variant" } : {}));
  size = input("md", __spreadValues({}, ngDevMode ? { debugName: "size" } : {}));
  type = input("button", __spreadValues({}, ngDevMode ? { debugName: "type" } : {}));
  disabled = input(false, __spreadValues({}, ngDevMode ? { debugName: "disabled" } : {}));
  loading = input(false, __spreadValues({}, ngDevMode ? { debugName: "loading" } : {}));
  clicked = output();
  buttonClasses() {
    return `btn btn-${this.variant()} btn-${this.size()}`;
  }
  handleClick(event) {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
  static \u0275fac = function ButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ButtonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ButtonComponent, selectors: [["ui-button"]], inputs: { variant: [1, "variant"], size: [1, "size"], type: [1, "type"], disabled: [1, "disabled"], loading: [1, "loading"] }, outputs: { clicked: "clicked" }, ngContentSelectors: _c0, decls: 3, vars: 5, consts: [[3, "click", "type", "disabled"], ["size", "sm"]], template: function ButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "button", 0);
      \u0275\u0275listener("click", function ButtonComponent_Template_button_click_0_listener($event) {
        return ctx.handleClick($event);
      });
      \u0275\u0275conditionalCreate(1, ButtonComponent_Conditional_1_Template, 1, 0, "ui-spinner", 1);
      \u0275\u0275projection(2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.buttonClasses());
      \u0275\u0275property("type", ctx.type())("disabled", ctx.disabled() || ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : -1);
    }
  }, dependencies: [SpinnerComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: inline-block;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-weight: 500;\n  border-radius: 0.5rem;\n  border: none;\n  transition: all 0.2s ease;\n  cursor: pointer;\n  font-family: inherit;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--ui-color-primary, #3b82f6);\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--ui-color-primary-dark, #2563eb);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: var(--ui-color-secondary, #e5e7eb);\n  color: var(--ui-color-text, #1f2937);\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--ui-color-secondary-dark, #d1d5db);\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: var(--ui-color-danger, #ef4444);\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--ui-color-danger-dark, #dc2626);\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--ui-color-text, #1f2937);\n}\n.btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--ui-color-hover, #f3f4f6);\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.875rem;\n  font-size: 0.875rem;\n}\n.btn-md[_ngcontent-%COMP%] {\n  padding: 0.5rem 1.25rem;\n  font-size: 1rem;\n}\n.btn-lg[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.75rem;\n  font-size: 1.125rem;\n}\n/*# sourceMappingURL=button.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonComponent, [{
    type: Component,
    args: [{ selector: "ui-button", changeDetection: ChangeDetectionStrategy.OnPush, imports: [SpinnerComponent], template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [class]="buttonClasses()"
      (click)="handleClick($event)"
    >
      @if (loading()) {
        <ui-spinner size="sm" />
      }
      <ng-content />
    </button>
  `, styles: ["/* angular:styles/component:scss;134d2485251d57bab3958e48b8fdf36c01e6aa50ef94f8a14004a5978b72ecdc;D:/Fropen/Iceplay/Iceplay-Front/src/app/shared/ui/button/button.component.ts */\n:host {\n  display: inline-block;\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-weight: 500;\n  border-radius: 0.5rem;\n  border: none;\n  transition: all 0.2s ease;\n  cursor: pointer;\n  font-family: inherit;\n}\n.btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-primary {\n  background: var(--ui-color-primary, #3b82f6);\n  color: white;\n}\n.btn-primary:hover:not(:disabled) {\n  background: var(--ui-color-primary-dark, #2563eb);\n}\n.btn-secondary {\n  background: var(--ui-color-secondary, #e5e7eb);\n  color: var(--ui-color-text, #1f2937);\n}\n.btn-secondary:hover:not(:disabled) {\n  background: var(--ui-color-secondary-dark, #d1d5db);\n}\n.btn-danger {\n  background: var(--ui-color-danger, #ef4444);\n  color: white;\n}\n.btn-danger:hover:not(:disabled) {\n  background: var(--ui-color-danger-dark, #dc2626);\n}\n.btn-ghost {\n  background: transparent;\n  color: var(--ui-color-text, #1f2937);\n}\n.btn-ghost:hover:not(:disabled) {\n  background: var(--ui-color-hover, #f3f4f6);\n}\n.btn-sm {\n  padding: 0.375rem 0.875rem;\n  font-size: 0.875rem;\n}\n.btn-md {\n  padding: 0.5rem 1.25rem;\n  font-size: 1rem;\n}\n.btn-lg {\n  padding: 0.75rem 1.75rem;\n  font-size: 1.125rem;\n}\n/*# sourceMappingURL=button.component.css.map */\n"] }]
  }], null, { variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], type: [{ type: Input, args: [{ isSignal: true, alias: "type", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], loading: [{ type: Input, args: [{ isSignal: true, alias: "loading", required: false }] }], clicked: [{ type: Output, args: ["clicked"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ButtonComponent, { className: "ButtonComponent", filePath: "src/app/shared/ui/button/button.component.ts", lineNumber: 93 });
})();

// src/app/shared/ui/card/card.component.ts
var _c02 = [[["", "card-header", ""]], "*", [["", "card-footer", ""]]];
var _c1 = ["[card-header]", "*", "[card-footer]"];
var CardComponent = class _CardComponent {
  variant = input("elevated", __spreadValues({}, ngDevMode ? { debugName: "variant" } : {}));
  clickable = input(false, __spreadValues({}, ngDevMode ? { debugName: "clickable" } : {}));
  cardClasses() {
    const classes = ["card"];
    if (this.variant() !== "flat") {
      classes.push(`card-${this.variant()}`);
    }
    if (this.clickable()) {
      classes.push("card-clickable");
    }
    return classes.join(" ");
  }
  static \u0275fac = function CardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CardComponent, selectors: [["ui-card"]], inputs: { variant: [1, "variant"], clickable: [1, "clickable"] }, ngContentSelectors: _c1, decls: 7, vars: 2, consts: [[1, "card-header"], [1, "card-body"], [1, "card-footer"]], template: function CardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c02);
      \u0275\u0275domElementStart(0, "article")(1, "header", 0);
      \u0275\u0275projection(2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "div", 1);
      \u0275\u0275projection(4, 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "footer", 2);
      \u0275\u0275projection(6, 2);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.cardClasses());
    }
  }, styles: ["\n\n.card[_ngcontent-%COMP%] {\n  background: var(--ui-color-surface, #ffffff);\n  border-radius: 1rem;\n  overflow: hidden;\n}\n.card-elevated[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.card-outlined[_ngcontent-%COMP%] {\n  box-shadow: none;\n  border: 1px solid var(--ui-color-border, #e5e7eb);\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid var(--ui-color-border, #e5e7eb);\n  font-weight: 600;\n  font-size: 1.125rem;\n}\n.card-header[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.card-footer[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid var(--ui-color-border, #e5e7eb);\n  background: var(--ui-color-surface-variant, #f9fafb);\n  display: flex;\n  gap: 0.75rem;\n  justify-content: flex-end;\n}\n.card-footer[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.card-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.card-clickable[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n}\n/*# sourceMappingURL=card.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardComponent, [{
    type: Component,
    args: [{ selector: "ui-card", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <article [class]="cardClasses()">
      <header class="card-header">
        <ng-content select="[card-header]" />
      </header>

      <div class="card-body">
        <ng-content />
      </div>

      <footer class="card-footer">
        <ng-content select="[card-footer]" />
      </footer>
    </article>
  `, styles: ["/* angular:styles/component:scss;63de9a39fca07145625c706d0fa77c1b3ba61ccdfa2a5696e12fed114e102c67;D:/Fropen/Iceplay/Iceplay-Front/src/app/shared/ui/card/card.component.ts */\n.card {\n  background: var(--ui-color-surface, #ffffff);\n  border-radius: 1rem;\n  overflow: hidden;\n}\n.card-elevated {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.card-outlined {\n  box-shadow: none;\n  border: 1px solid var(--ui-color-border, #e5e7eb);\n}\n.card-header {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid var(--ui-color-border, #e5e7eb);\n  font-weight: 600;\n  font-size: 1.125rem;\n}\n.card-header:empty {\n  display: none;\n}\n.card-body {\n  padding: 1.5rem;\n}\n.card-footer {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid var(--ui-color-border, #e5e7eb);\n  background: var(--ui-color-surface-variant, #f9fafb);\n  display: flex;\n  gap: 0.75rem;\n  justify-content: flex-end;\n}\n.card-footer:empty {\n  display: none;\n}\n.card-clickable {\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.card-clickable:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n}\n/*# sourceMappingURL=card.component.css.map */\n"] }]
  }], null, { variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], clickable: [{ type: Input, args: [{ isSignal: true, alias: "clickable", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CardComponent, { className: "CardComponent", filePath: "src/app/shared/ui/card/card.component.ts", lineNumber: 78 });
})();

// src/app/shared/ui/avatar/avatar.component.ts
function AvatarComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngSrc", ctx_r0.src())("alt", ctx_r0.alt())("width", ctx_r0.dimensions().size)("height", ctx_r0.dimensions().size);
  }
}
function AvatarComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.initials());
  }
}
function AvatarComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap("avatar-status status-" + ctx_r0.status());
  }
}
var AvatarComponent = class _AvatarComponent {
  src = input(null, __spreadValues({}, ngDevMode ? { debugName: "src" } : {}));
  alt = input("Avatar", __spreadValues({}, ngDevMode ? { debugName: "alt" } : {}));
  name = input("", __spreadValues({}, ngDevMode ? { debugName: "name" } : {}));
  size = input("md", __spreadValues({}, ngDevMode ? { debugName: "size" } : {}));
  status = input(null, __spreadValues({}, ngDevMode ? { debugName: "status" } : {}));
  initials = computed(() => {
    const fullName = this.name();
    if (!fullName)
      return "?";
    const parts = fullName.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  }, __spreadValues({}, ngDevMode ? { debugName: "initials" } : {}));
  dimensions = computed(() => {
    const sizes = {
      xs: 24,
      sm: 32,
      md: 40,
      lg: 56,
      xl: 80
    };
    return { size: sizes[this.size()] };
  }, __spreadValues({}, ngDevMode ? { debugName: "dimensions" } : {}));
  avatarClasses() {
    return `avatar avatar-${this.size()}`;
  }
  static \u0275fac = function AvatarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AvatarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AvatarComponent, selectors: [["ui-avatar"]], inputs: { src: [1, "src"], alt: [1, "alt"], name: [1, "name"], size: [1, "size"], status: [1, "status"] }, decls: 5, vars: 4, consts: [[1, "avatar-content"], [1, "avatar-image", 3, "ngSrc", "alt", "width", "height"], [1, "avatar-initials"], [3, "class"]], template: function AvatarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div")(1, "div", 0);
      \u0275\u0275conditionalCreate(2, AvatarComponent_Conditional_2_Template, 1, 4, "img", 1)(3, AvatarComponent_Conditional_3_Template, 2, 1, "span", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, AvatarComponent_Conditional_4_Template, 1, 2, "span", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.avatarClasses());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.src() ? 2 : 3);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.status() ? 4 : -1);
    }
  }, dependencies: [NgOptimizedImage], styles: ["\n\n[_nghost-%COMP%] {\n  display: inline-block;\n}\n.avatar[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.avatar-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: var(--mat-sys-primary);\n  color: var(--mat-sys-on-primary);\n  font-weight: 600;\n  overflow: hidden;\n}\n.avatar-xs[_ngcontent-%COMP%]   .avatar-content[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  font-size: 0.625rem;\n}\n.avatar-sm[_ngcontent-%COMP%]   .avatar-content[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  font-size: 0.75rem;\n}\n.avatar-md[_ngcontent-%COMP%]   .avatar-content[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  font-size: 0.875rem;\n}\n.avatar-lg[_ngcontent-%COMP%]   .avatar-content[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  font-size: 1.125rem;\n}\n.avatar-xl[_ngcontent-%COMP%]   .avatar-content[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  font-size: 1.5rem;\n}\n.avatar-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.avatar-initials[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.avatar-status[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 25%;\n  height: 25%;\n  min-width: 10px;\n  min-height: 10px;\n  border-radius: 50%;\n  border: 2px solid white;\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);\n  z-index: 1;\n}\n.status-online[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.status-offline[_ngcontent-%COMP%] {\n  background: #9ca3af;\n}\n.status-busy[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.status-away[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n/*# sourceMappingURL=avatar.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarComponent, [{
    type: Component,
    args: [{ selector: "ui-avatar", changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgOptimizedImage], template: `
    <div [class]="avatarClasses()">
      <div class="avatar-content">
        @if (src()) {
          <img
            [ngSrc]="src()!"
            [alt]="alt()"
            [width]="dimensions().size"
            [height]="dimensions().size"
            class="avatar-image"
          />
        } @else {
          <span class="avatar-initials">{{ initials() }}</span>
        }
      </div>

      @if (status()) {
        <span [class]="'avatar-status status-' + status()"></span>
      }
    </div>
  `, styles: ["/* angular:styles/component:scss;771cbd7a75b01b40b1ac27082989074859aa7c11282000be426991f575840400;D:/Fropen/Iceplay/Iceplay-Front/src/app/shared/ui/avatar/avatar.component.ts */\n:host {\n  display: inline-block;\n}\n.avatar {\n  position: relative;\n  display: inline-block;\n}\n.avatar-content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: var(--mat-sys-primary);\n  color: var(--mat-sys-on-primary);\n  font-weight: 600;\n  overflow: hidden;\n}\n.avatar-xs .avatar-content {\n  width: 24px;\n  height: 24px;\n  font-size: 0.625rem;\n}\n.avatar-sm .avatar-content {\n  width: 32px;\n  height: 32px;\n  font-size: 0.75rem;\n}\n.avatar-md .avatar-content {\n  width: 40px;\n  height: 40px;\n  font-size: 0.875rem;\n}\n.avatar-lg .avatar-content {\n  width: 56px;\n  height: 56px;\n  font-size: 1.125rem;\n}\n.avatar-xl .avatar-content {\n  width: 80px;\n  height: 80px;\n  font-size: 1.5rem;\n}\n.avatar-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.avatar-initials {\n  text-transform: uppercase;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.avatar-status {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 25%;\n  height: 25%;\n  min-width: 10px;\n  min-height: 10px;\n  border-radius: 50%;\n  border: 2px solid white;\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);\n  z-index: 1;\n}\n.status-online {\n  background: #22c55e;\n}\n.status-offline {\n  background: #9ca3af;\n}\n.status-busy {\n  background: #ef4444;\n}\n.status-away {\n  background: #f59e0b;\n}\n/*# sourceMappingURL=avatar.component.css.map */\n"] }]
  }], null, { src: [{ type: Input, args: [{ isSignal: true, alias: "src", required: false }] }], alt: [{ type: Input, args: [{ isSignal: true, alias: "alt", required: false }] }], name: [{ type: Input, args: [{ isSignal: true, alias: "name", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], status: [{ type: Input, args: [{ isSignal: true, alias: "status", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AvatarComponent, { className: "AvatarComponent", filePath: "src/app/shared/ui/avatar/avatar.component.ts", lineNumber: 117 });
})();

// src/app/shared/ui/badge/badge.component.ts
var _c03 = ["*"];
var BadgeComponent = class _BadgeComponent {
  variant = input("default", __spreadValues({}, ngDevMode ? { debugName: "variant" } : {}));
  static \u0275fac = function BadgeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BadgeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BadgeComponent, selectors: [["ui-badge"]], inputs: { variant: [1, "variant"] }, ngContentSelectors: _c03, decls: 2, vars: 2, template: function BadgeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "span");
      \u0275\u0275projection(1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap("badge badge-" + ctx.variant());
    }
  }, styles: ["\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.625rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n  border-radius: 9999px;\n  white-space: nowrap;\n}\n.badge-default[_ngcontent-%COMP%] {\n  background: #e5e7eb;\n  color: #374151;\n}\n.badge-success[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.badge-warning[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.badge-danger[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.badge-info[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n/*# sourceMappingURL=badge.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeComponent, [{
    type: Component,
    args: [{ selector: "ui-badge", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <span [class]="'badge badge-' + variant()">
      <ng-content />
    </span>
  `, styles: ["/* angular:styles/component:scss;db19c740d9183d585f987bd3858c338935d433e69709f6d573bd5e0196ecc4ca;D:/Fropen/Iceplay/Iceplay-Front/src/app/shared/ui/badge/badge.component.ts */\n.badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.625rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n  border-radius: 9999px;\n  white-space: nowrap;\n}\n.badge-default {\n  background: #e5e7eb;\n  color: #374151;\n}\n.badge-success {\n  background: #d1fae5;\n  color: #065f46;\n}\n.badge-warning {\n  background: #fef3c7;\n  color: #92400e;\n}\n.badge-danger {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.badge-info {\n  background: #dbeafe;\n  color: #1e40af;\n}\n/*# sourceMappingURL=badge.component.css.map */\n"] }]
  }], null, { variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BadgeComponent, { className: "BadgeComponent", filePath: "src/app/shared/ui/badge/badge.component.ts", lineNumber: 50 });
})();

// src/app/shared/ui/skeleton/skeleton.component.ts
var SkeletonComponent = class _SkeletonComponent {
  width = input("100%", __spreadValues({}, ngDevMode ? { debugName: "width" } : {}));
  height = input("1rem", __spreadValues({}, ngDevMode ? { debugName: "height" } : {}));
  variant = input("rect", __spreadValues({}, ngDevMode ? { debugName: "variant" } : {}));
  static \u0275fac = function SkeletonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SkeletonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SkeletonComponent, selectors: [["ui-skeleton"]], inputs: { width: [1, "width"], height: [1, "height"], variant: [1, "variant"] }, decls: 1, vars: 8, consts: [[1, "skeleton"]], template: function SkeletonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275styleProp("width", ctx.width())("height", ctx.height());
      \u0275\u0275classProp("skeleton-circle", ctx.variant() === "circle")("skeleton-text", ctx.variant() === "text");
    }
  }, styles: ["\n\n.skeleton[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--ui-skeleton, #e5e7eb) 25%,\n      var(--ui-skeleton-highlight, #f3f4f6) 50%,\n      var(--ui-skeleton, #e5e7eb) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n  border-radius: 0.25rem;\n}\n.skeleton-circle[_ngcontent-%COMP%] {\n  border-radius: 50%;\n}\n.skeleton-text[_ngcontent-%COMP%] {\n  height: 1em;\n  border-radius: 0.125rem;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/*# sourceMappingURL=skeleton.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SkeletonComponent, [{
    type: Component,
    args: [{ selector: "ui-skeleton", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div
      class="skeleton"
      [style.width]="width()"
      [style.height]="height()"
      [class.skeleton-circle]="variant() === 'circle'"
      [class.skeleton-text]="variant() === 'text'"
    ></div>
  `, styles: ["/* angular:styles/component:scss;b4e55a84f9aa716d5bac48a7d0befee5263904eeb45fccfe709c5876598f9f33;D:/Fropen/Iceplay/Iceplay-Front/src/app/shared/ui/skeleton/skeleton.component.ts */\n.skeleton {\n  background:\n    linear-gradient(\n      90deg,\n      var(--ui-skeleton, #e5e7eb) 25%,\n      var(--ui-skeleton-highlight, #f3f4f6) 50%,\n      var(--ui-skeleton, #e5e7eb) 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n  border-radius: 0.25rem;\n}\n.skeleton-circle {\n  border-radius: 50%;\n}\n.skeleton-text {\n  height: 1em;\n  border-radius: 0.125rem;\n}\n@keyframes shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/*# sourceMappingURL=skeleton.component.css.map */\n"] }]
  }], null, { width: [{ type: Input, args: [{ isSignal: true, alias: "width", required: false }] }], height: [{ type: Input, args: [{ isSignal: true, alias: "height", required: false }] }], variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SkeletonComponent, { className: "SkeletonComponent", filePath: "src/app/shared/ui/skeleton/skeleton.component.ts", lineNumber: 47 });
})();

// node_modules/@angular/material/fesm2022/autocomplete.mjs
var _c04 = ["panel"];
var _c12 = ["*"];
function MatAutocomplete_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1, 0);
    \u0275\u0275projection(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const formFieldId_r1 = ctx.id;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1._classList);
    \u0275\u0275classProp("mat-mdc-autocomplete-visible", ctx_r1.showPanel)("mat-mdc-autocomplete-hidden", !ctx_r1.showPanel)("mat-autocomplete-panel-animations-enabled", !ctx_r1._animationsDisabled)("mat-primary", ctx_r1._color === "primary")("mat-accent", ctx_r1._color === "accent")("mat-warn", ctx_r1._color === "warn");
    \u0275\u0275domProperty("id", ctx_r1.id);
    \u0275\u0275attribute("aria-label", ctx_r1.ariaLabel || null)("aria-labelledby", ctx_r1._getPanelAriaLabelledby(formFieldId_r1));
  }
}
var MatAutocompleteSelectedEvent = class {
  source;
  option;
  constructor(source, option) {
    this.source = source;
    this.option = option;
  }
};
var MAT_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken("mat-autocomplete-default-options", {
  providedIn: "root",
  factory: () => ({
    autoActiveFirstOption: false,
    autoSelectActiveOption: false,
    hideSingleSelectionIndicator: false,
    requireSelection: false,
    hasBackdrop: false
  })
});
var MatAutocomplete = class _MatAutocomplete {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _defaults = inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS);
  _animationsDisabled = _animationsDisabled();
  _activeOptionChanges = Subscription.EMPTY;
  _keyManager;
  showPanel = false;
  get isOpen() {
    return this._isOpen && this.showPanel;
  }
  _isOpen = false;
  _latestOpeningTrigger;
  _setColor(value) {
    this._color = value;
    this._changeDetectorRef.markForCheck();
  }
  _color;
  template;
  panel;
  options;
  optionGroups;
  ariaLabel;
  ariaLabelledby;
  displayWith = null;
  autoActiveFirstOption;
  autoSelectActiveOption;
  requireSelection;
  panelWidth;
  disableRipple;
  optionSelected = new EventEmitter();
  opened = new EventEmitter();
  closed = new EventEmitter();
  optionActivated = new EventEmitter();
  set classList(value) {
    this._classList = value;
    this._elementRef.nativeElement.className = "";
  }
  _classList;
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = value;
    this._syncParentProperties();
  }
  _hideSingleSelectionIndicator;
  _syncParentProperties() {
    if (this.options) {
      for (const option of this.options) {
        option._changeDetectorRef.markForCheck();
      }
    }
  }
  id = inject(_IdGenerator).getId("mat-autocomplete-");
  inertGroups;
  constructor() {
    const platform = inject(Platform);
    this.inertGroups = platform?.SAFARI || false;
    this.autoActiveFirstOption = !!this._defaults.autoActiveFirstOption;
    this.autoSelectActiveOption = !!this._defaults.autoSelectActiveOption;
    this.requireSelection = !!this._defaults.requireSelection;
    this._hideSingleSelectionIndicator = this._defaults.hideSingleSelectionIndicator ?? false;
  }
  ngAfterContentInit() {
    this._keyManager = new ActiveDescendantKeyManager(this.options).withWrap().skipPredicate(this._skipPredicate);
    this._activeOptionChanges = this._keyManager.change.subscribe((index) => {
      if (this.isOpen) {
        this.optionActivated.emit({
          source: this,
          option: this.options.toArray()[index] || null
        });
      }
    });
    this._setVisibility();
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._activeOptionChanges.unsubscribe();
  }
  _setScrollTop(scrollTop) {
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }
  _getScrollTop() {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }
  _setVisibility() {
    this.showPanel = !!this.options?.length;
    this._changeDetectorRef.markForCheck();
  }
  _emitSelectEvent(option) {
    const event = new MatAutocompleteSelectedEvent(this, option);
    this.optionSelected.emit(event);
  }
  _getPanelAriaLabelledby(labelId) {
    if (this.ariaLabel) {
      return null;
    }
    const labelExpression = labelId ? labelId + " " : "";
    return this.ariaLabelledby ? labelExpression + this.ariaLabelledby : labelId;
  }
  _skipPredicate() {
    return false;
  }
  static \u0275fac = function MatAutocomplete_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocomplete)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatAutocomplete,
    selectors: [["mat-autocomplete"]],
    contentQueries: function MatAutocomplete_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatOption, 5);
        \u0275\u0275contentQuery(dirIndex, MAT_OPTGROUP, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.options = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.optionGroups = _t);
      }
    },
    viewQuery: function MatAutocomplete_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(TemplateRef, 7);
        \u0275\u0275viewQuery(_c04, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.template = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.panel = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-autocomplete"],
    inputs: {
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      displayWith: "displayWith",
      autoActiveFirstOption: [2, "autoActiveFirstOption", "autoActiveFirstOption", booleanAttribute],
      autoSelectActiveOption: [2, "autoSelectActiveOption", "autoSelectActiveOption", booleanAttribute],
      requireSelection: [2, "requireSelection", "requireSelection", booleanAttribute],
      panelWidth: "panelWidth",
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      classList: [0, "class", "classList"],
      hideSingleSelectionIndicator: [2, "hideSingleSelectionIndicator", "hideSingleSelectionIndicator", booleanAttribute]
    },
    outputs: {
      optionSelected: "optionSelected",
      opened: "opened",
      closed: "closed",
      optionActivated: "optionActivated"
    },
    exportAs: ["matAutocomplete"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_OPTION_PARENT_COMPONENT,
      useExisting: _MatAutocomplete
    }])],
    ngContentSelectors: _c12,
    decls: 1,
    vars: 0,
    consts: [["panel", ""], ["role", "listbox", 1, "mat-mdc-autocomplete-panel", "mdc-menu-surface", "mdc-menu-surface--open", 3, "id"]],
    template: function MatAutocomplete_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domTemplate(0, MatAutocomplete_ng_template_0_Template, 3, 17, "ng-template");
      }
    },
    styles: ["div.mat-mdc-autocomplete-panel{width:100%;max-height:256px;visibility:hidden;transform-origin:center top;overflow:auto;padding:8px 0;box-sizing:border-box;position:relative;border-radius:var(--mat-autocomplete-container-shape, var(--mat-sys-corner-extra-small));box-shadow:var(--mat-autocomplete-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));background-color:var(--mat-autocomplete-background-color, var(--mat-sys-surface-container))}@media(forced-colors: active){div.mat-mdc-autocomplete-panel{outline:solid 1px}}.cdk-overlay-pane:not(.mat-mdc-autocomplete-panel-above) div.mat-mdc-autocomplete-panel{border-top-left-radius:0;border-top-right-radius:0}.mat-mdc-autocomplete-panel-above div.mat-mdc-autocomplete-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:center bottom}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-visible{visibility:visible}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-hidden,.cdk-overlay-pane:has(>.mat-mdc-autocomplete-hidden){visibility:hidden;pointer-events:none}@keyframes _mat-autocomplete-enter{from{opacity:0;transform:scaleY(0.8)}to{opacity:1;transform:none}}.mat-autocomplete-panel-animations-enabled{animation:_mat-autocomplete-enter 120ms cubic-bezier(0, 0, 0.2, 1)}mat-autocomplete{display:none}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocomplete, [{
    type: Component,
    args: [{
      selector: "mat-autocomplete",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      exportAs: "matAutocomplete",
      host: {
        "class": "mat-mdc-autocomplete"
      },
      providers: [{
        provide: MAT_OPTION_PARENT_COMPONENT,
        useExisting: MatAutocomplete
      }],
      template: `<ng-template let-formFieldId="id">
  <div
    class="mat-mdc-autocomplete-panel mdc-menu-surface mdc-menu-surface--open"
    role="listbox"
    [id]="id"
    [class]="_classList"
    [class.mat-mdc-autocomplete-visible]="showPanel"
    [class.mat-mdc-autocomplete-hidden]="!showPanel"
    [class.mat-autocomplete-panel-animations-enabled]="!_animationsDisabled"
    [class.mat-primary]="_color === 'primary'"
    [class.mat-accent]="_color === 'accent'"
    [class.mat-warn]="_color === 'warn'"
    [attr.aria-label]="ariaLabel || null"
    [attr.aria-labelledby]="_getPanelAriaLabelledby(formFieldId)"
    #panel>
    <ng-content></ng-content>
  </div>
</ng-template>
`,
      styles: ["div.mat-mdc-autocomplete-panel{width:100%;max-height:256px;visibility:hidden;transform-origin:center top;overflow:auto;padding:8px 0;box-sizing:border-box;position:relative;border-radius:var(--mat-autocomplete-container-shape, var(--mat-sys-corner-extra-small));box-shadow:var(--mat-autocomplete-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));background-color:var(--mat-autocomplete-background-color, var(--mat-sys-surface-container))}@media(forced-colors: active){div.mat-mdc-autocomplete-panel{outline:solid 1px}}.cdk-overlay-pane:not(.mat-mdc-autocomplete-panel-above) div.mat-mdc-autocomplete-panel{border-top-left-radius:0;border-top-right-radius:0}.mat-mdc-autocomplete-panel-above div.mat-mdc-autocomplete-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:center bottom}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-visible{visibility:visible}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-hidden,.cdk-overlay-pane:has(>.mat-mdc-autocomplete-hidden){visibility:hidden;pointer-events:none}@keyframes _mat-autocomplete-enter{from{opacity:0;transform:scaleY(0.8)}to{opacity:1;transform:none}}.mat-autocomplete-panel-animations-enabled{animation:_mat-autocomplete-enter 120ms cubic-bezier(0, 0, 0.2, 1)}mat-autocomplete{display:none}\n"]
    }]
  }], () => [], {
    template: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    panel: [{
      type: ViewChild,
      args: ["panel"]
    }],
    options: [{
      type: ContentChildren,
      args: [MatOption, {
        descendants: true
      }]
    }],
    optionGroups: [{
      type: ContentChildren,
      args: [MAT_OPTGROUP, {
        descendants: true
      }]
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    displayWith: [{
      type: Input
    }],
    autoActiveFirstOption: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autoSelectActiveOption: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    requireSelection: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    panelWidth: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    optionSelected: [{
      type: Output
    }],
    opened: [{
      type: Output
    }],
    closed: [{
      type: Output
    }],
    optionActivated: [{
      type: Output
    }],
    classList: [{
      type: Input,
      args: ["class"]
    }],
    hideSingleSelectionIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatAutocompleteOrigin = class _MatAutocompleteOrigin {
  elementRef = inject(ElementRef);
  constructor() {
  }
  static \u0275fac = function MatAutocompleteOrigin_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocompleteOrigin)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatAutocompleteOrigin,
    selectors: [["", "matAutocompleteOrigin", ""]],
    exportAs: ["matAutocompleteOrigin"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocompleteOrigin, [{
    type: Directive,
    args: [{
      selector: "[matAutocompleteOrigin]",
      exportAs: "matAutocompleteOrigin"
    }]
  }], () => [], null);
})();
var MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatAutocompleteTrigger),
  multi: true
};
function getMatAutocompleteMissingPanelError() {
  return Error("Attempting to open an undefined instance of `mat-autocomplete`. Make sure that the id passed to the `matAutocomplete` is correct and that you're attempting to open it after the ngAfterContentInit hook.");
}
var MAT_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken("mat-autocomplete-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector);
  }
});
var MatAutocompleteTrigger = class _MatAutocompleteTrigger {
  _environmentInjector = inject(EnvironmentInjector);
  _element = inject(ElementRef);
  _injector = inject(Injector);
  _viewContainerRef = inject(ViewContainerRef);
  _zone = inject(NgZone);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _dir = inject(Directionality, {
    optional: true
  });
  _formField = inject(MAT_FORM_FIELD, {
    optional: true,
    host: true
  });
  _viewportRuler = inject(ViewportRuler);
  _scrollStrategy = inject(MAT_AUTOCOMPLETE_SCROLL_STRATEGY);
  _renderer = inject(Renderer2);
  _animationsDisabled = _animationsDisabled();
  _defaults = inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, {
    optional: true
  });
  _overlayRef;
  _portal;
  _componentDestroyed = false;
  _initialized = new Subject();
  _keydownSubscription;
  _outsideClickSubscription;
  _cleanupWindowBlur;
  _previousValue;
  _valueOnAttach;
  _valueOnLastKeydown;
  _positionStrategy;
  _manuallyFloatingLabel = false;
  _closingActionsSubscription;
  _viewportSubscription = Subscription.EMPTY;
  _breakpointObserver = inject(BreakpointObserver);
  _handsetLandscapeSubscription = Subscription.EMPTY;
  _canOpenOnNextFocus = true;
  _valueBeforeAutoSelection;
  _pendingAutoselectedOption;
  _closeKeyEventStream = new Subject();
  _overlayPanelClass = coerceArray(this._defaults?.overlayPanelClass || []);
  _windowBlurHandler = () => {
    this._canOpenOnNextFocus = this.panelOpen || !this._hasFocus();
  };
  _onChange = () => {
  };
  _onTouched = () => {
  };
  autocomplete;
  position = "auto";
  connectedTo;
  autocompleteAttribute = "off";
  autocompleteDisabled;
  constructor() {
  }
  _aboveClass = "mat-mdc-autocomplete-panel-above";
  ngAfterViewInit() {
    this._initialized.next();
    this._initialized.complete();
    this._cleanupWindowBlur = this._renderer.listen("window", "blur", this._windowBlurHandler);
  }
  ngOnChanges(changes) {
    if (changes["position"] && this._positionStrategy) {
      this._setStrategyPositions(this._positionStrategy);
      if (this.panelOpen) {
        this._overlayRef.updatePosition();
      }
    }
  }
  ngOnDestroy() {
    this._cleanupWindowBlur?.();
    this._handsetLandscapeSubscription.unsubscribe();
    this._viewportSubscription.unsubscribe();
    this._componentDestroyed = true;
    this._destroyPanel();
    this._closeKeyEventStream.complete();
    this._clearFromModal();
  }
  get panelOpen() {
    return this._overlayAttached && this.autocomplete.showPanel;
  }
  _overlayAttached = false;
  openPanel() {
    this._openPanelInternal();
  }
  closePanel() {
    this._resetLabel();
    if (!this._overlayAttached) {
      return;
    }
    if (this.panelOpen) {
      this._zone.run(() => {
        this.autocomplete.closed.emit();
      });
    }
    if (this.autocomplete._latestOpeningTrigger === this) {
      this.autocomplete._isOpen = false;
      this.autocomplete._latestOpeningTrigger = null;
    }
    this._overlayAttached = false;
    this._pendingAutoselectedOption = null;
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
      this._closingActionsSubscription.unsubscribe();
    }
    this._updatePanelState();
    if (!this._componentDestroyed) {
      this._changeDetectorRef.detectChanges();
    }
    if (this._trackedModal) {
      removeAriaReferencedId(this._trackedModal, "aria-owns", this.autocomplete.id);
    }
  }
  updatePosition() {
    if (this._overlayAttached) {
      this._overlayRef.updatePosition();
    }
  }
  get panelClosingActions() {
    return merge(this.optionSelections, this.autocomplete._keyManager.tabOut.pipe(filter(() => this._overlayAttached)), this._closeKeyEventStream, this._getOutsideClickStream(), this._overlayRef ? this._overlayRef.detachments().pipe(filter(() => this._overlayAttached)) : of()).pipe(map((event) => event instanceof MatOptionSelectionChange ? event : null));
  }
  optionSelections = defer(() => {
    const options = this.autocomplete ? this.autocomplete.options : null;
    if (options) {
      return options.changes.pipe(startWith(options), switchMap(() => merge(...options.map((option) => option.onSelectionChange))));
    }
    return this._initialized.pipe(switchMap(() => this.optionSelections));
  });
  get activeOption() {
    if (this.autocomplete && this.autocomplete._keyManager) {
      return this.autocomplete._keyManager.activeItem;
    }
    return null;
  }
  _getOutsideClickStream() {
    return new Observable((observer) => {
      const listener = (event) => {
        const clickTarget = _getEventTarget(event);
        const formField = this._formField ? this._formField.getConnectedOverlayOrigin().nativeElement : null;
        const customOrigin = this.connectedTo ? this.connectedTo.elementRef.nativeElement : null;
        if (this._overlayAttached && clickTarget !== this._element.nativeElement && !this._hasFocus() && (!formField || !formField.contains(clickTarget)) && (!customOrigin || !customOrigin.contains(clickTarget)) && !!this._overlayRef && !this._overlayRef.overlayElement.contains(clickTarget)) {
          observer.next(event);
        }
      };
      const cleanups = [this._renderer.listen("document", "click", listener), this._renderer.listen("document", "auxclick", listener), this._renderer.listen("document", "touchend", listener)];
      return () => {
        cleanups.forEach((current) => current());
      };
    });
  }
  writeValue(value) {
    Promise.resolve(null).then(() => this._assignOptionValue(value));
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._element.nativeElement.disabled = isDisabled;
  }
  _handleKeydown(e) {
    const event = e;
    const keyCode = event.keyCode;
    const hasModifier = hasModifierKey(event);
    if (keyCode === ESCAPE && !hasModifier) {
      event.preventDefault();
    }
    this._valueOnLastKeydown = this._element.nativeElement.value;
    if (this.activeOption && keyCode === ENTER && this.panelOpen && !hasModifier) {
      this.activeOption._selectViaInteraction();
      this._resetActiveItem();
      event.preventDefault();
    } else if (this.autocomplete) {
      const prevActiveItem = this.autocomplete._keyManager.activeItem;
      const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
      if (keyCode === TAB || isArrowKey && !hasModifier && this.panelOpen) {
        this.autocomplete._keyManager.onKeydown(event);
      } else if (isArrowKey && this._canOpen()) {
        this._openPanelInternal(this._valueOnLastKeydown);
      }
      if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
        this._scrollToOption(this.autocomplete._keyManager.activeItemIndex || 0);
        if (this.autocomplete.autoSelectActiveOption && this.activeOption) {
          if (!this._pendingAutoselectedOption) {
            this._valueBeforeAutoSelection = this._valueOnLastKeydown;
          }
          this._pendingAutoselectedOption = this.activeOption;
          this._assignOptionValue(this.activeOption.value);
        }
      }
    }
  }
  _handleInput(event) {
    let target = event.target;
    let value = target.value;
    if (target.type === "number") {
      value = value == "" ? null : parseFloat(value);
    }
    if (this._previousValue !== value) {
      this._previousValue = value;
      this._pendingAutoselectedOption = null;
      if (!this.autocomplete || !this.autocomplete.requireSelection) {
        this._onChange(value);
      }
      if (!value) {
        this._clearPreviousSelectedOption(null, false);
      } else if (this.panelOpen && !this.autocomplete.requireSelection) {
        const selectedOption = this.autocomplete.options?.find((option) => option.selected);
        if (selectedOption) {
          const display = this._getDisplayValue(selectedOption.value);
          if (value !== display) {
            selectedOption.deselect(false);
          }
        }
      }
      if (this._canOpen() && this._hasFocus()) {
        const valueOnAttach = this._valueOnLastKeydown ?? this._element.nativeElement.value;
        this._valueOnLastKeydown = null;
        this._openPanelInternal(valueOnAttach);
      }
    }
  }
  _handleFocus() {
    if (!this._canOpenOnNextFocus) {
      this._canOpenOnNextFocus = true;
    } else if (this._canOpen()) {
      this._previousValue = this._element.nativeElement.value;
      this._attachOverlay(this._previousValue);
      this._floatLabel(true);
    }
  }
  _handleClick() {
    if (this._canOpen() && !this.panelOpen) {
      this._openPanelInternal();
    }
  }
  _hasFocus() {
    return _getFocusedElementPierceShadowDom() === this._element.nativeElement;
  }
  _floatLabel(shouldAnimate = false) {
    if (this._formField && this._formField.floatLabel === "auto") {
      if (shouldAnimate) {
        this._formField._animateAndLockLabel();
      } else {
        this._formField.floatLabel = "always";
      }
      this._manuallyFloatingLabel = true;
    }
  }
  _resetLabel() {
    if (this._manuallyFloatingLabel) {
      if (this._formField) {
        this._formField.floatLabel = "auto";
      }
      this._manuallyFloatingLabel = false;
    }
  }
  _subscribeToClosingActions() {
    const initialRender = new Observable((subscriber) => {
      afterNextRender(() => {
        subscriber.next();
      }, {
        injector: this._environmentInjector
      });
    });
    const optionChanges = this.autocomplete.options?.changes.pipe(tap(() => this._positionStrategy.reapplyLastPosition()), delay(0)) ?? of();
    return merge(initialRender, optionChanges).pipe(switchMap(() => this._zone.run(() => {
      const wasOpen = this.panelOpen;
      this._resetActiveItem();
      this._updatePanelState();
      this._changeDetectorRef.detectChanges();
      if (this.panelOpen) {
        this._overlayRef.updatePosition();
      }
      if (wasOpen !== this.panelOpen) {
        if (this.panelOpen) {
          this._emitOpened();
        } else {
          this.autocomplete.closed.emit();
        }
      }
      return this.panelClosingActions;
    })), take(1)).subscribe((event) => this._setValueAndClose(event));
  }
  _emitOpened() {
    this.autocomplete.opened.emit();
  }
  _destroyPanel() {
    if (this._overlayRef) {
      this.closePanel();
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }
  _getDisplayValue(value) {
    const autocomplete = this.autocomplete;
    return autocomplete && autocomplete.displayWith ? autocomplete.displayWith(value) : value;
  }
  _assignOptionValue(value) {
    const toDisplay = this._getDisplayValue(value);
    if (value == null) {
      this._clearPreviousSelectedOption(null, false);
    }
    this._updateNativeInputValue(toDisplay != null ? toDisplay : "");
  }
  _updateNativeInputValue(value) {
    if (this._formField) {
      this._formField._control.value = value;
    } else {
      this._element.nativeElement.value = value;
    }
    this._previousValue = value;
  }
  _setValueAndClose(event) {
    const panel = this.autocomplete;
    const toSelect = event ? event.source : this._pendingAutoselectedOption;
    if (toSelect) {
      this._clearPreviousSelectedOption(toSelect);
      this._assignOptionValue(toSelect.value);
      this._onChange(toSelect.value);
      panel._emitSelectEvent(toSelect);
      this._element.nativeElement.focus();
    } else if (panel.requireSelection && this._element.nativeElement.value !== this._valueOnAttach) {
      this._clearPreviousSelectedOption(null);
      this._assignOptionValue(null);
      this._onChange(null);
    }
    this.closePanel();
  }
  _clearPreviousSelectedOption(skip, emitEvent) {
    this.autocomplete?.options?.forEach((option) => {
      if (option !== skip && option.selected) {
        option.deselect(emitEvent);
      }
    });
  }
  _openPanelInternal(valueOnAttach = this._element.nativeElement.value) {
    this._attachOverlay(valueOnAttach);
    this._floatLabel();
    if (this._trackedModal) {
      const panelId = this.autocomplete.id;
      addAriaReferencedId(this._trackedModal, "aria-owns", panelId);
    }
  }
  _attachOverlay(valueOnAttach) {
    if (!this.autocomplete && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatAutocompleteMissingPanelError();
    }
    let overlayRef = this._overlayRef;
    if (!overlayRef) {
      this._portal = new TemplatePortal(this.autocomplete.template, this._viewContainerRef, {
        id: this._formField?.getLabelId()
      });
      overlayRef = createOverlayRef(this._injector, this._getOverlayConfig());
      this._overlayRef = overlayRef;
      this._viewportSubscription = this._viewportRuler.change().subscribe(() => {
        if (this.panelOpen && overlayRef) {
          overlayRef.updateSize({
            width: this._getPanelWidth()
          });
        }
      });
      this._handsetLandscapeSubscription = this._breakpointObserver.observe(Breakpoints.HandsetLandscape).subscribe((result) => {
        const isHandsetLandscape = result.matches;
        if (isHandsetLandscape) {
          this._positionStrategy.withFlexibleDimensions(true).withGrowAfterOpen(true).withViewportMargin(8);
        } else {
          this._positionStrategy.withFlexibleDimensions(false).withGrowAfterOpen(false).withViewportMargin(0);
        }
      });
    } else {
      this._positionStrategy.setOrigin(this._getConnectedElement());
      overlayRef.updateSize({
        width: this._getPanelWidth()
      });
    }
    if (overlayRef && !overlayRef.hasAttached()) {
      overlayRef.attach(this._portal);
      this._valueOnAttach = valueOnAttach;
      this._valueOnLastKeydown = null;
      this._closingActionsSubscription = this._subscribeToClosingActions();
    }
    const wasOpen = this.panelOpen;
    this.autocomplete._isOpen = this._overlayAttached = true;
    this.autocomplete._latestOpeningTrigger = this;
    this.autocomplete._setColor(this._formField?.color);
    this._updatePanelState();
    this._applyModalPanelOwnership();
    if (this.panelOpen && wasOpen !== this.panelOpen) {
      this._emitOpened();
    }
  }
  _handlePanelKeydown = (event) => {
    if (event.keyCode === ESCAPE && !hasModifierKey(event) || event.keyCode === UP_ARROW && hasModifierKey(event, "altKey")) {
      if (this._pendingAutoselectedOption) {
        this._updateNativeInputValue(this._valueBeforeAutoSelection ?? "");
        this._pendingAutoselectedOption = null;
      }
      this._closeKeyEventStream.next();
      this._resetActiveItem();
      event.stopPropagation();
      event.preventDefault();
    }
  };
  _updatePanelState() {
    this.autocomplete._setVisibility();
    if (this.panelOpen) {
      const overlayRef = this._overlayRef;
      if (!this._keydownSubscription) {
        this._keydownSubscription = overlayRef.keydownEvents().subscribe(this._handlePanelKeydown);
      }
      if (!this._outsideClickSubscription) {
        this._outsideClickSubscription = overlayRef.outsidePointerEvents().subscribe();
      }
    } else {
      this._keydownSubscription?.unsubscribe();
      this._outsideClickSubscription?.unsubscribe();
      this._keydownSubscription = this._outsideClickSubscription = null;
    }
  }
  _getOverlayConfig() {
    return new OverlayConfig({
      positionStrategy: this._getOverlayPosition(),
      scrollStrategy: this._scrollStrategy(),
      width: this._getPanelWidth(),
      direction: this._dir ?? void 0,
      hasBackdrop: this._defaults?.hasBackdrop,
      backdropClass: this._defaults?.backdropClass || "cdk-overlay-transparent-backdrop",
      panelClass: this._overlayPanelClass,
      disableAnimations: this._animationsDisabled
    });
  }
  _getOverlayPosition() {
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this._getConnectedElement()).withFlexibleDimensions(false).withPush(false).withPopoverLocation("inline");
    this._setStrategyPositions(strategy);
    this._positionStrategy = strategy;
    return strategy;
  }
  _setStrategyPositions(positionStrategy) {
    const belowPositions = [{
      originX: "start",
      originY: "bottom",
      overlayX: "start",
      overlayY: "top"
    }, {
      originX: "end",
      originY: "bottom",
      overlayX: "end",
      overlayY: "top"
    }];
    const panelClass = this._aboveClass;
    const abovePositions = [{
      originX: "start",
      originY: "top",
      overlayX: "start",
      overlayY: "bottom",
      panelClass
    }, {
      originX: "end",
      originY: "top",
      overlayX: "end",
      overlayY: "bottom",
      panelClass
    }];
    let positions;
    if (this.position === "above") {
      positions = abovePositions;
    } else if (this.position === "below") {
      positions = belowPositions;
    } else {
      positions = [...belowPositions, ...abovePositions];
    }
    positionStrategy.withPositions(positions);
  }
  _getConnectedElement() {
    if (this.connectedTo) {
      return this.connectedTo.elementRef;
    }
    return this._formField ? this._formField.getConnectedOverlayOrigin() : this._element;
  }
  _getPanelWidth() {
    return this.autocomplete.panelWidth || this._getHostWidth();
  }
  _getHostWidth() {
    return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
  }
  _resetActiveItem() {
    const autocomplete = this.autocomplete;
    if (autocomplete.autoActiveFirstOption) {
      let firstEnabledOptionIndex = -1;
      for (let index = 0; index < autocomplete.options.length; index++) {
        const option = autocomplete.options.get(index);
        if (!option.disabled) {
          firstEnabledOptionIndex = index;
          break;
        }
      }
      autocomplete._keyManager.setActiveItem(firstEnabledOptionIndex);
    } else {
      autocomplete._keyManager.setActiveItem(-1);
    }
  }
  _canOpen() {
    const element = this._element.nativeElement;
    return !element.readOnly && !element.disabled && !this.autocompleteDisabled;
  }
  _scrollToOption(index) {
    const autocomplete = this.autocomplete;
    const labelCount = _countGroupLabelsBeforeOption(index, autocomplete.options, autocomplete.optionGroups);
    if (index === 0 && labelCount === 1) {
      autocomplete._setScrollTop(0);
    } else if (autocomplete.panel) {
      const option = autocomplete.options.toArray()[index];
      if (option) {
        const element = option._getHostElement();
        const newScrollPosition = _getOptionScrollPosition(element.offsetTop, element.offsetHeight, autocomplete._getScrollTop(), autocomplete.panel.nativeElement.offsetHeight);
        autocomplete._setScrollTop(newScrollPosition);
      }
    }
  }
  _trackedModal = null;
  _applyModalPanelOwnership() {
    const modal = this._element.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');
    if (!modal) {
      return;
    }
    const panelId = this.autocomplete.id;
    if (this._trackedModal) {
      removeAriaReferencedId(this._trackedModal, "aria-owns", panelId);
    }
    addAriaReferencedId(modal, "aria-owns", panelId);
    this._trackedModal = modal;
  }
  _clearFromModal() {
    if (this._trackedModal) {
      const panelId = this.autocomplete.id;
      removeAriaReferencedId(this._trackedModal, "aria-owns", panelId);
      this._trackedModal = null;
    }
  }
  static \u0275fac = function MatAutocompleteTrigger_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocompleteTrigger)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatAutocompleteTrigger,
    selectors: [["input", "matAutocomplete", ""], ["textarea", "matAutocomplete", ""]],
    hostAttrs: [1, "mat-mdc-autocomplete-trigger"],
    hostVars: 7,
    hostBindings: function MatAutocompleteTrigger_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("focusin", function MatAutocompleteTrigger_focusin_HostBindingHandler() {
          return ctx._handleFocus();
        })("blur", function MatAutocompleteTrigger_blur_HostBindingHandler() {
          return ctx._onTouched();
        })("input", function MatAutocompleteTrigger_input_HostBindingHandler($event) {
          return ctx._handleInput($event);
        })("keydown", function MatAutocompleteTrigger_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        })("click", function MatAutocompleteTrigger_click_HostBindingHandler() {
          return ctx._handleClick();
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("autocomplete", ctx.autocompleteAttribute)("role", ctx.autocompleteDisabled ? null : "combobox")("aria-autocomplete", ctx.autocompleteDisabled ? null : "list")("aria-activedescendant", ctx.panelOpen && ctx.activeOption ? ctx.activeOption.id : null)("aria-expanded", ctx.autocompleteDisabled ? null : ctx.panelOpen.toString())("aria-controls", ctx.autocompleteDisabled || !ctx.panelOpen ? null : ctx.autocomplete == null ? null : ctx.autocomplete.id)("aria-haspopup", ctx.autocompleteDisabled ? null : "listbox");
      }
    },
    inputs: {
      autocomplete: [0, "matAutocomplete", "autocomplete"],
      position: [0, "matAutocompletePosition", "position"],
      connectedTo: [0, "matAutocompleteConnectedTo", "connectedTo"],
      autocompleteAttribute: [0, "autocomplete", "autocompleteAttribute"],
      autocompleteDisabled: [2, "matAutocompleteDisabled", "autocompleteDisabled", booleanAttribute]
    },
    exportAs: ["matAutocompleteTrigger"],
    features: [\u0275\u0275ProvidersFeature([MAT_AUTOCOMPLETE_VALUE_ACCESSOR]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocompleteTrigger, [{
    type: Directive,
    args: [{
      selector: `input[matAutocomplete], textarea[matAutocomplete]`,
      host: {
        "class": "mat-mdc-autocomplete-trigger",
        "[attr.autocomplete]": "autocompleteAttribute",
        "[attr.role]": 'autocompleteDisabled ? null : "combobox"',
        "[attr.aria-autocomplete]": 'autocompleteDisabled ? null : "list"',
        "[attr.aria-activedescendant]": "(panelOpen && activeOption) ? activeOption.id : null",
        "[attr.aria-expanded]": "autocompleteDisabled ? null : panelOpen.toString()",
        "[attr.aria-controls]": "(autocompleteDisabled || !panelOpen) ? null : autocomplete?.id",
        "[attr.aria-haspopup]": 'autocompleteDisabled ? null : "listbox"',
        "(focusin)": "_handleFocus()",
        "(blur)": "_onTouched()",
        "(input)": "_handleInput($event)",
        "(keydown)": "_handleKeydown($event)",
        "(click)": "_handleClick()"
      },
      exportAs: "matAutocompleteTrigger",
      providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
    }]
  }], () => [], {
    autocomplete: [{
      type: Input,
      args: ["matAutocomplete"]
    }],
    position: [{
      type: Input,
      args: ["matAutocompletePosition"]
    }],
    connectedTo: [{
      type: Input,
      args: ["matAutocompleteConnectedTo"]
    }],
    autocompleteAttribute: [{
      type: Input,
      args: ["autocomplete"]
    }],
    autocompleteDisabled: [{
      type: Input,
      args: [{
        alias: "matAutocompleteDisabled",
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatAutocompleteModule = class _MatAutocompleteModule {
  static \u0275fac = function MatAutocompleteModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocompleteModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatAutocompleteModule,
    imports: [OverlayModule, MatOptionModule, MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
    exports: [CdkScrollableModule, MatAutocomplete, MatOptionModule, BidiModule, MatAutocompleteTrigger, MatAutocompleteOrigin]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [OverlayModule, MatOptionModule, CdkScrollableModule, MatOptionModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocompleteModule, [{
    type: NgModule,
    args: [{
      imports: [OverlayModule, MatOptionModule, MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
      exports: [CdkScrollableModule, MatAutocomplete, MatOptionModule, BidiModule, MatAutocompleteTrigger, MatAutocompleteOrigin]
    }]
  }], null, null);
})();

// src/app/shared/ui/search-autocomplete/search-autocomplete.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SearchAutocompleteComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function SearchAutocompleteComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clear());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r2.clearLabel());
  }
}
function SearchAutocompleteComponent_For_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.subtitle);
  }
}
function SearchAutocompleteComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 6)(1, "span", 9);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, SearchAutocompleteComponent_For_10_Conditional_3_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275property("value", item_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r4.subtitle ? 3 : -1);
  }
}
function SearchAutocompleteComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.noResultsText());
  }
}
var SearchAutocompleteComponent = class _SearchAutocompleteComponent {
  /** Source list (in-memory filter). */
  items = input.required(__spreadValues({}, ngDevMode ? { debugName: "items" } : {}));
  label = input("Buscar", __spreadValues({}, ngDevMode ? { debugName: "label" } : {}));
  placeholder = input("", __spreadValues({}, ngDevMode ? { debugName: "placeholder" } : {}));
  /** Pause in ms before applying the filter / opening the panel with results. */
  debounceMs = input(500, __spreadValues({}, ngDevMode ? { debugName: "debounceMs" } : {}));
  noResultsText = input("Sin coincidencias", __spreadValues({}, ngDevMode ? { debugName: "noResultsText" } : {}));
  clearLabel = input("Limpiar b\xFAsqueda", __spreadValues({}, ngDevMode ? { debugName: "clearLabel" } : {}));
  disabled = input(false, __spreadValues({}, ngDevMode ? { debugName: "disabled" } : {}));
  /** When true, applies `max-width` for form layouts; when false, only `width: 100%` of the parent. */
  constrainWidth = input(true, __spreadValues({}, ngDevMode ? { debugName: "constrainWidth" } : {}));
  selected = output();
  inputCtrl = new FormControl("", { nonNullable: true });
  /** Text in the input for the clear button (no debounce). */
  searchText = toSignal(this.inputCtrl.valueChanges.pipe(startWith(this.inputCtrl.value), map((v) => this.rawToFilterText(v))), { initialValue: "" });
  /** Debounced query for filtering (panel stays closed until there is text here). */
  queryDebounced = toSignal(this.inputCtrl.valueChanges.pipe(startWith(this.inputCtrl.value), map((v) => this.rawToFilterText(v)), debounce(() => timer(this.debounceMs())), distinctUntilChanged()), { initialValue: "" });
  filteredItems = computed(() => {
    const q = this.queryDebounced().trim().toLowerCase();
    if (!q) {
      return [];
    }
    const list = this.items();
    return list.filter((i) => i.label.toLowerCase().includes(q) || (i.subtitle ?? "").toLowerCase().includes(q));
  }, __spreadValues({}, ngDevMode ? { debugName: "filteredItems" } : {}));
  displayWith = (value) => {
    if (value == null || value === "") {
      return "";
    }
    const byId = this.items().find((i) => i.id === value);
    if (byId) {
      return byId.label;
    }
    return value;
  };
  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.inputCtrl.disable({ emitEvent: false });
      } else {
        this.inputCtrl.enable({ emitEvent: false });
      }
    });
  }
  onOptionSelected(event) {
    const id = event.option.value;
    const item = this.items().find((i) => i.id === id);
    if (item) {
      this.selected.emit(item);
      this.inputCtrl.setValue(id);
    }
  }
  clear() {
    this.inputCtrl.setValue("");
  }
  /** Text used for filtering: free typing, or the item label when the value is a known id. */
  rawToFilterText(raw) {
    if (raw == null || raw === "") {
      return "";
    }
    const byId = this.items().find((i) => i.id === raw);
    if (byId) {
      return byId.label;
    }
    return raw;
  }
  static \u0275fac = function SearchAutocompleteComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SearchAutocompleteComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SearchAutocompleteComponent, selectors: [["ui-search-autocomplete"]], inputs: { items: [1, "items"], label: [1, "label"], placeholder: [1, "placeholder"], debounceMs: [1, "debounceMs"], noResultsText: [1, "noResultsText"], clearLabel: [1, "clearLabel"], disabled: [1, "disabled"], constrainWidth: [1, "constrainWidth"] }, outputs: { selected: "selected" }, decls: 12, vars: 10, consts: [["auto", "matAutocomplete"], ["appearance", "outline", 1, "field"], ["matInput", "", "type", "text", 3, "placeholder", "formControl", "matAutocomplete", "matAutocompleteDisabled"], ["matPrefix", "", "aria-hidden", "true"], ["type", "button", "matIconButton", "", "matSuffix", ""], ["autoActiveFirstOption", "", 3, "optionSelected", "displayWith"], [3, "value"], ["disabled", ""], ["type", "button", "matIconButton", "", "matSuffix", "", 3, "click"], [1, "ac-main"], [1, "ac-sub"]], template: function SearchAutocompleteComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-form-field", 1)(1, "mat-label");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "input", 2);
      \u0275\u0275elementStart(4, "mat-icon", 3);
      \u0275\u0275text(5, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, SearchAutocompleteComponent_Conditional_6_Template, 3, 1, "button", 4);
      \u0275\u0275elementStart(7, "mat-autocomplete", 5, 0);
      \u0275\u0275listener("optionSelected", function SearchAutocompleteComponent_Template_mat_autocomplete_optionSelected_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onOptionSelected($event));
      });
      \u0275\u0275repeaterCreate(9, SearchAutocompleteComponent_For_10_Template, 4, 3, "mat-option", 6, _forTrack0);
      \u0275\u0275conditionalCreate(11, SearchAutocompleteComponent_Conditional_11_Template, 2, 1, "mat-option", 7);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const auto_r5 = \u0275\u0275reference(8);
      \u0275\u0275classProp("field-constrain", ctx.constrainWidth());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.label());
      \u0275\u0275advance();
      \u0275\u0275property("placeholder", ctx.placeholder())("formControl", ctx.inputCtrl)("matAutocomplete", auto_r5)("matAutocompleteDisabled", ctx.disabled());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.searchText().length > 0 ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayWith);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filteredItems());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.filteredItems().length === 0 && ctx.queryDebounced().trim().length > 0 ? 11 : -1);
    }
  }, dependencies: [ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, FormControlDirective, MatFormFieldModule, MatFormField, MatLabel, MatPrefix, MatSuffix, MatInputModule, MatInput, MatIconModule, MatIcon, MatButtonModule, MatIconButton, MatAutocompleteModule, MatAutocomplete, MatOption, MatAutocompleteTrigger], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.field-constrain[_ngcontent-%COMP%] {\n  max-width: 28rem;\n}\n.ac-main[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.ac-sub[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  color: var(--ui-color-text-secondary, #6b7280);\n}\n/*# sourceMappingURL=search-autocomplete.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SearchAutocompleteComponent, [{
    type: Component,
    args: [{ selector: "ui-search-autocomplete", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      MatAutocompleteModule
    ], template: `
    <mat-form-field appearance="outline" class="field" [class.field-constrain]="constrainWidth()">
      <mat-label>{{ label() }}</mat-label>
      <input
        matInput
        type="text"
        [placeholder]="placeholder()"
        [formControl]="inputCtrl"
        [matAutocomplete]="auto"
        [matAutocompleteDisabled]="disabled()"
      />
      <mat-icon matPrefix aria-hidden="true">search</mat-icon>
      @if (searchText().length > 0) {
        <button
          type="button"
          matIconButton
          matSuffix
          (click)="clear()"
          [attr.aria-label]="clearLabel()"
        >
          <mat-icon>close</mat-icon>
        </button>
      }
      <mat-autocomplete
        #auto="matAutocomplete"
        autoActiveFirstOption
        [displayWith]="displayWith"
        (optionSelected)="onOptionSelected($event)"
      >
        @for (item of filteredItems(); track item.id) {
          <mat-option [value]="item.id">
            <span class="ac-main">{{ item.label }}</span>
            @if (item.subtitle) {
              <span class="ac-sub">{{ item.subtitle }}</span>
            }
          </mat-option>
        }
        @if (filteredItems().length === 0 && queryDebounced().trim().length > 0) {
          <mat-option disabled>{{ noResultsText() }}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  `, styles: ["/* angular:styles/component:scss;4e45553c84d0b479f957641e7179c35895ddbcfeb4cc711c0a99af14e71d5380;D:/Fropen/Iceplay/Iceplay-Front/src/app/shared/ui/search-autocomplete/search-autocomplete.component.ts */\n:host {\n  display: block;\n}\n.field {\n  width: 100%;\n}\n.field-constrain {\n  max-width: 28rem;\n}\n.ac-main {\n  font-weight: 500;\n}\n.ac-sub {\n  display: block;\n  font-size: 0.75rem;\n  color: var(--ui-color-text-secondary, #6b7280);\n}\n/*# sourceMappingURL=search-autocomplete.component.css.map */\n"] }]
  }], () => [], { items: [{ type: Input, args: [{ isSignal: true, alias: "items", required: true }] }], label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: false }] }], placeholder: [{ type: Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], debounceMs: [{ type: Input, args: [{ isSignal: true, alias: "debounceMs", required: false }] }], noResultsText: [{ type: Input, args: [{ isSignal: true, alias: "noResultsText", required: false }] }], clearLabel: [{ type: Input, args: [{ isSignal: true, alias: "clearLabel", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], constrainWidth: [{ type: Input, args: [{ isSignal: true, alias: "constrainWidth", required: false }] }], selected: [{ type: Output, args: ["selected"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SearchAutocompleteComponent, { className: "SearchAutocompleteComponent", filePath: "src/app/shared/ui/search-autocomplete/search-autocomplete.component.ts", lineNumber: 99 });
})();

export {
  SpinnerComponent,
  ButtonComponent,
  CardComponent,
  AvatarComponent,
  BadgeComponent,
  SkeletonComponent,
  SearchAutocompleteComponent
};
//# sourceMappingURL=chunk-VZY5NTRS.js.map
