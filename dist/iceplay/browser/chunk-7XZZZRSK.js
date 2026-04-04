import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatNativeDateModule,
  _MatInternalFormField
} from "./chunk-KNFDFUB5.js";
import {
  MatTooltipModule
} from "./chunk-NCLKHHOL.js";
import {
  MatTooltip
} from "./chunk-VHW6UJNI.js";
import {
  MatMenuModule
} from "./chunk-URAQ4NZC.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-LDVW6DKV.js";
import {
  MatOption
} from "./chunk-H27O3CUM.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-GQ2HD7F2.js";
import {
  MatFormFieldModule
} from "./chunk-YLNDQWGO.js";
import "./chunk-K6FV3QT6.js";
import "./chunk-DXQNO7KC.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-DRXFEHG3.js";
import {
  UniqueSelectionDispatcher
} from "./chunk-OXFAHERR.js";
import "./chunk-LDEMS5LB.js";
import {
  MatFormField,
  MatLabel,
  MatSuffix
} from "./chunk-QFWQXRDF.js";
import {
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-YBE5VDY6.js";
import {
  CdkPortalOutlet,
  PortalModule,
  TemplatePortal
} from "./chunk-WFKBK73W.js";
import "./chunk-Q5IAYNPB.js";
import {
  ENTER,
  FocusKeyManager,
  FocusMonitor,
  MatButton,
  MatButtonModule,
  MatFabButton,
  MatIconButton,
  MatRipple,
  SPACE,
  _IdGenerator,
  _StructuralStylesLoader,
  _animationsDisabled,
  hasModifierKey
} from "./chunk-AE6CM25K.js";
import {
  BidiModule,
  DatePipe,
  MatIcon,
  MatIconModule,
  _CdkPrivateStyleLoader
} from "./chunk-YOLGDFC3.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  Directive,
  EMPTY,
  ElementRef,
  EventEmitter,
  HostAttributeToken,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Output,
  QueryList,
  Renderer2,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  filter,
  forwardRef,
  inject,
  merge,
  numberAttribute,
  setClassMetadata,
  signal,
  startWith,
  take,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-F7WKCRHW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// node_modules/@angular/cdk/fesm2022/accordion.mjs
var CDK_ACCORDION = new InjectionToken("CdkAccordion");
var CdkAccordion = class _CdkAccordion {
  _stateChanges = new Subject();
  _openCloseAllActions = new Subject();
  id = inject(_IdGenerator).getId("cdk-accordion-");
  multi = false;
  openAll() {
    if (this.multi) {
      this._openCloseAllActions.next(true);
    }
  }
  closeAll() {
    this._openCloseAllActions.next(false);
  }
  ngOnChanges(changes) {
    this._stateChanges.next(changes);
  }
  ngOnDestroy() {
    this._stateChanges.complete();
    this._openCloseAllActions.complete();
  }
  static \u0275fac = function CdkAccordion_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkAccordion)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkAccordion,
    selectors: [["cdk-accordion"], ["", "cdkAccordion", ""]],
    inputs: {
      multi: [2, "multi", "multi", booleanAttribute]
    },
    exportAs: ["cdkAccordion"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_ACCORDION,
      useExisting: _CdkAccordion
    }]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAccordion, [{
    type: Directive,
    args: [{
      selector: "cdk-accordion, [cdkAccordion]",
      exportAs: "cdkAccordion",
      providers: [{
        provide: CDK_ACCORDION,
        useExisting: CdkAccordion
      }]
    }]
  }], null, {
    multi: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkAccordionItem = class _CdkAccordionItem {
  accordion = inject(CDK_ACCORDION, {
    optional: true,
    skipSelf: true
  });
  _changeDetectorRef = inject(ChangeDetectorRef);
  _expansionDispatcher = inject(UniqueSelectionDispatcher);
  _openCloseAllSubscription = Subscription.EMPTY;
  closed = new EventEmitter();
  opened = new EventEmitter();
  destroyed = new EventEmitter();
  expandedChange = new EventEmitter();
  id = inject(_IdGenerator).getId("cdk-accordion-child-");
  get expanded() {
    return this._expanded;
  }
  set expanded(expanded) {
    if (this._expanded !== expanded) {
      this._expanded = expanded;
      this.expandedChange.emit(expanded);
      if (expanded) {
        this.opened.emit();
        const accordionId = this.accordion ? this.accordion.id : this.id;
        this._expansionDispatcher.notify(this.id, accordionId);
      } else {
        this.closed.emit();
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  _expanded = false;
  get disabled() {
    return this._disabled();
  }
  set disabled(value) {
    this._disabled.set(value);
  }
  _disabled = signal(false, ...ngDevMode ? [{
    debugName: "_disabled"
  }] : []);
  _removeUniqueSelectionListener = () => {
  };
  constructor() {
  }
  ngOnInit() {
    this._removeUniqueSelectionListener = this._expansionDispatcher.listen((id, accordionId) => {
      if (this.accordion && !this.accordion.multi && this.accordion.id === accordionId && this.id !== id) {
        this.expanded = false;
      }
    });
    if (this.accordion) {
      this._openCloseAllSubscription = this._subscribeToOpenCloseAllActions();
    }
  }
  ngOnDestroy() {
    this.opened.complete();
    this.closed.complete();
    this.destroyed.emit();
    this.destroyed.complete();
    this._removeUniqueSelectionListener();
    this._openCloseAllSubscription.unsubscribe();
  }
  toggle() {
    if (!this.disabled) {
      this.expanded = !this.expanded;
    }
  }
  close() {
    if (!this.disabled) {
      this.expanded = false;
    }
  }
  open() {
    if (!this.disabled) {
      this.expanded = true;
    }
  }
  _subscribeToOpenCloseAllActions() {
    return this.accordion._openCloseAllActions.subscribe((expanded) => {
      if (!this.disabled) {
        this.expanded = expanded;
      }
    });
  }
  static \u0275fac = function CdkAccordionItem_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkAccordionItem)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkAccordionItem,
    selectors: [["cdk-accordion-item"], ["", "cdkAccordionItem", ""]],
    inputs: {
      expanded: [2, "expanded", "expanded", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      closed: "closed",
      opened: "opened",
      destroyed: "destroyed",
      expandedChange: "expandedChange"
    },
    exportAs: ["cdkAccordionItem"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_ACCORDION,
      useValue: void 0
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAccordionItem, [{
    type: Directive,
    args: [{
      selector: "cdk-accordion-item, [cdkAccordionItem]",
      exportAs: "cdkAccordionItem",
      providers: [{
        provide: CDK_ACCORDION,
        useValue: void 0
      }]
    }]
  }], () => [], {
    closed: [{
      type: Output
    }],
    opened: [{
      type: Output
    }],
    destroyed: [{
      type: Output
    }],
    expandedChange: [{
      type: Output
    }],
    expanded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkAccordionModule = class _CdkAccordionModule {
  static \u0275fac = function CdkAccordionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkAccordionModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CdkAccordionModule,
    imports: [CdkAccordion, CdkAccordionItem],
    exports: [CdkAccordion, CdkAccordionItem]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAccordionModule, [{
    type: NgModule,
    args: [{
      imports: [CdkAccordion, CdkAccordionItem],
      exports: [CdkAccordion, CdkAccordionItem]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/expansion.mjs
var _c0 = ["body"];
var _c1 = ["bodyWrapper"];
var _c2 = [[["mat-expansion-panel-header"]], "*", [["mat-action-row"]]];
var _c3 = ["mat-expansion-panel-header", "*", "mat-action-row"];
function MatExpansionPanel_ng_template_7_Template(rf, ctx) {
}
var _c4 = [[["mat-panel-title"]], [["mat-panel-description"]], "*"];
var _c5 = ["mat-panel-title", "mat-panel-description", "*"];
function MatExpansionPanelHeader_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 1);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 2);
    \u0275\u0275domElement(2, "path", 3);
    \u0275\u0275domElementEnd()();
  }
}
var MAT_ACCORDION = new InjectionToken("MAT_ACCORDION");
var MAT_EXPANSION_PANEL = new InjectionToken("MAT_EXPANSION_PANEL");
var MatExpansionPanelContent = class _MatExpansionPanelContent {
  _template = inject(TemplateRef);
  _expansionPanel = inject(MAT_EXPANSION_PANEL, {
    optional: true
  });
  constructor() {
  }
  static \u0275fac = function MatExpansionPanelContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanelContent)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatExpansionPanelContent,
    selectors: [["ng-template", "matExpansionPanelContent", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelContent, [{
    type: Directive,
    args: [{
      selector: "ng-template[matExpansionPanelContent]"
    }]
  }], () => [], null);
})();
var MAT_EXPANSION_PANEL_DEFAULT_OPTIONS = new InjectionToken("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS");
var MatExpansionPanel = class _MatExpansionPanel extends CdkAccordionItem {
  _viewContainerRef = inject(ViewContainerRef);
  _animationsDisabled = _animationsDisabled();
  _document = inject(DOCUMENT);
  _ngZone = inject(NgZone);
  _elementRef = inject(ElementRef);
  _renderer = inject(Renderer2);
  _cleanupTransitionEnd;
  get hideToggle() {
    return this._hideToggle || this.accordion && this.accordion.hideToggle;
  }
  set hideToggle(value) {
    this._hideToggle = value;
  }
  _hideToggle = false;
  get togglePosition() {
    return this._togglePosition || this.accordion && this.accordion.togglePosition;
  }
  set togglePosition(value) {
    this._togglePosition = value;
  }
  _togglePosition;
  afterExpand = new EventEmitter();
  afterCollapse = new EventEmitter();
  _inputChanges = new Subject();
  accordion = inject(MAT_ACCORDION, {
    optional: true,
    skipSelf: true
  });
  _lazyContent;
  _body;
  _bodyWrapper;
  _portal;
  _headerId = inject(_IdGenerator).getId("mat-expansion-panel-header-");
  constructor() {
    super();
    const defaultOptions = inject(MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, {
      optional: true
    });
    this._expansionDispatcher = inject(UniqueSelectionDispatcher);
    if (defaultOptions) {
      this.hideToggle = defaultOptions.hideToggle;
    }
  }
  _hasSpacing() {
    if (this.accordion) {
      return this.expanded && this.accordion.displayMode === "default";
    }
    return false;
  }
  _getExpandedState() {
    return this.expanded ? "expanded" : "collapsed";
  }
  toggle() {
    this.expanded = !this.expanded;
  }
  close() {
    this.expanded = false;
  }
  open() {
    this.expanded = true;
  }
  ngAfterContentInit() {
    if (this._lazyContent && this._lazyContent._expansionPanel === this) {
      this.opened.pipe(startWith(null), filter(() => this.expanded && !this._portal), take(1)).subscribe(() => {
        this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
      });
    }
    this._setupAnimationEvents();
  }
  ngOnChanges(changes) {
    this._inputChanges.next(changes);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._cleanupTransitionEnd?.();
    this._inputChanges.complete();
  }
  _containsFocus() {
    if (this._body) {
      const focusedElement = this._document.activeElement;
      const bodyElement = this._body.nativeElement;
      return focusedElement === bodyElement || bodyElement.contains(focusedElement);
    }
    return false;
  }
  _transitionEndListener = ({
    target,
    propertyName
  }) => {
    if (target === this._bodyWrapper?.nativeElement && propertyName === "grid-template-rows") {
      this._ngZone.run(() => {
        if (this.expanded) {
          this.afterExpand.emit();
        } else {
          this.afterCollapse.emit();
        }
      });
    }
  };
  _setupAnimationEvents() {
    this._ngZone.runOutsideAngular(() => {
      if (this._animationsDisabled) {
        this.opened.subscribe(() => this._ngZone.run(() => this.afterExpand.emit()));
        this.closed.subscribe(() => this._ngZone.run(() => this.afterCollapse.emit()));
      } else {
        setTimeout(() => {
          const element = this._elementRef.nativeElement;
          this._cleanupTransitionEnd = this._renderer.listen(element, "transitionend", this._transitionEndListener);
          element.classList.add("mat-expansion-panel-animations-enabled");
        }, 200);
      }
    });
  }
  static \u0275fac = function MatExpansionPanel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanel)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatExpansionPanel,
    selectors: [["mat-expansion-panel"]],
    contentQueries: function MatExpansionPanel_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatExpansionPanelContent, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lazyContent = _t.first);
      }
    },
    viewQuery: function MatExpansionPanel_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._body = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._bodyWrapper = _t.first);
      }
    },
    hostAttrs: [1, "mat-expansion-panel"],
    hostVars: 4,
    hostBindings: function MatExpansionPanel_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-expanded", ctx.expanded)("mat-expansion-panel-spacing", ctx._hasSpacing());
      }
    },
    inputs: {
      hideToggle: [2, "hideToggle", "hideToggle", booleanAttribute],
      togglePosition: "togglePosition"
    },
    outputs: {
      afterExpand: "afterExpand",
      afterCollapse: "afterCollapse"
    },
    exportAs: ["matExpansionPanel"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_ACCORDION,
      useValue: void 0
    }, {
      provide: MAT_EXPANSION_PANEL,
      useExisting: _MatExpansionPanel
    }]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c3,
    decls: 9,
    vars: 4,
    consts: [["bodyWrapper", ""], ["body", ""], [1, "mat-expansion-panel-content-wrapper"], ["role", "region", 1, "mat-expansion-panel-content", 3, "id"], [1, "mat-expansion-panel-body"], [3, "cdkPortalOutlet"]],
    template: function MatExpansionPanel_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c2);
        \u0275\u0275projection(0);
        \u0275\u0275elementStart(1, "div", 2, 0)(3, "div", 3, 1)(5, "div", 4);
        \u0275\u0275projection(6, 1);
        \u0275\u0275template(7, MatExpansionPanel_ng_template_7_Template, 0, 0, "ng-template", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275projection(8, 2);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275attribute("inert", ctx.expanded ? null : "");
        \u0275\u0275advance(2);
        \u0275\u0275property("id", ctx.id);
        \u0275\u0275attribute("aria-labelledby", ctx._headerId);
        \u0275\u0275advance(4);
        \u0275\u0275property("cdkPortalOutlet", ctx._portal);
      }
    },
    dependencies: [CdkPortalOutlet],
    styles: [".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;overflow:hidden;position:relative;background:var(--mat-expansion-container-background-color, var(--mat-sys-surface));color:var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));border-radius:var(--mat-expansion-container-shape, 12px)}.mat-expansion-panel.mat-expansion-panel-animations-enabled{transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:var(--mat-expansion-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:var(--mat-expansion-container-shape, 12px);border-top-left-radius:var(--mat-expansion-container-shape, 12px)}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:var(--mat-expansion-container-shape, 12px);border-bottom-left-radius:var(--mat-expansion-container-shape, 12px)}@media(forced-colors: active){.mat-expansion-panel{outline:solid 1px}}.mat-expansion-panel-content-wrapper{display:grid;grid-template-rows:0fr;grid-template-columns:100%}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper{transition:grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{grid-template-rows:1fr}@supports not (grid-template-rows: 0fr){.mat-expansion-panel-content-wrapper{height:0}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{height:auto}}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible;min-height:0;visibility:hidden;font-family:var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));line-height:var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));letter-spacing:var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content{transition:visibility 190ms linear}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper>.mat-expansion-panel-content{visibility:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px;border-top-color:var(--mat-expansion-actions-divider-color, var(--mat-sys-outline))}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanel, [{
    type: Component,
    args: [{
      selector: "mat-expansion-panel",
      exportAs: "matExpansionPanel",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MAT_ACCORDION,
        useValue: void 0
      }, {
        provide: MAT_EXPANSION_PANEL,
        useExisting: MatExpansionPanel
      }],
      host: {
        "class": "mat-expansion-panel",
        "[class.mat-expanded]": "expanded",
        "[class.mat-expansion-panel-spacing]": "_hasSpacing()"
      },
      imports: [CdkPortalOutlet],
      template: `<ng-content select="mat-expansion-panel-header"></ng-content>
<div class="mat-expansion-panel-content-wrapper" [attr.inert]="expanded ? null : ''" #bodyWrapper>
  <div class="mat-expansion-panel-content"
       role="region"
       [attr.aria-labelledby]="_headerId"
       [id]="id"
       #body>
    <div class="mat-expansion-panel-body">
      <ng-content></ng-content>
      <ng-template [cdkPortalOutlet]="_portal"></ng-template>
    </div>
    <ng-content select="mat-action-row"></ng-content>
  </div>
</div>
`,
      styles: [".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;overflow:hidden;position:relative;background:var(--mat-expansion-container-background-color, var(--mat-sys-surface));color:var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));border-radius:var(--mat-expansion-container-shape, 12px)}.mat-expansion-panel.mat-expansion-panel-animations-enabled{transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:var(--mat-expansion-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:var(--mat-expansion-container-shape, 12px);border-top-left-radius:var(--mat-expansion-container-shape, 12px)}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:var(--mat-expansion-container-shape, 12px);border-bottom-left-radius:var(--mat-expansion-container-shape, 12px)}@media(forced-colors: active){.mat-expansion-panel{outline:solid 1px}}.mat-expansion-panel-content-wrapper{display:grid;grid-template-rows:0fr;grid-template-columns:100%}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper{transition:grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{grid-template-rows:1fr}@supports not (grid-template-rows: 0fr){.mat-expansion-panel-content-wrapper{height:0}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{height:auto}}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible;min-height:0;visibility:hidden;font-family:var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));line-height:var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));letter-spacing:var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content{transition:visibility 190ms linear}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper>.mat-expansion-panel-content{visibility:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px;border-top-color:var(--mat-expansion-actions-divider-color, var(--mat-sys-outline))}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}\n"]
    }]
  }], () => [], {
    hideToggle: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    togglePosition: [{
      type: Input
    }],
    afterExpand: [{
      type: Output
    }],
    afterCollapse: [{
      type: Output
    }],
    _lazyContent: [{
      type: ContentChild,
      args: [MatExpansionPanelContent]
    }],
    _body: [{
      type: ViewChild,
      args: ["body"]
    }],
    _bodyWrapper: [{
      type: ViewChild,
      args: ["bodyWrapper"]
    }]
  });
})();
var MatExpansionPanelActionRow = class _MatExpansionPanelActionRow {
  static \u0275fac = function MatExpansionPanelActionRow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanelActionRow)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatExpansionPanelActionRow,
    selectors: [["mat-action-row"]],
    hostAttrs: [1, "mat-action-row"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelActionRow, [{
    type: Directive,
    args: [{
      selector: "mat-action-row",
      host: {
        class: "mat-action-row"
      }
    }]
  }], null, null);
})();
var MatExpansionPanelHeader = class _MatExpansionPanelHeader {
  panel = inject(MatExpansionPanel, {
    host: true
  });
  _element = inject(ElementRef);
  _focusMonitor = inject(FocusMonitor);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _parentChangeSubscription = Subscription.EMPTY;
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const panel = this.panel;
    const defaultOptions = inject(MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, {
      optional: true
    });
    const tabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    const accordionHideToggleChange = panel.accordion ? panel.accordion._stateChanges.pipe(filter((changes) => !!(changes["hideToggle"] || changes["togglePosition"]))) : EMPTY;
    this.tabIndex = parseInt(tabIndex || "") || 0;
    this._parentChangeSubscription = merge(panel.opened, panel.closed, accordionHideToggleChange, panel._inputChanges.pipe(filter((changes) => {
      return !!(changes["hideToggle"] || changes["disabled"] || changes["togglePosition"]);
    }))).subscribe(() => this._changeDetectorRef.markForCheck());
    panel.closed.pipe(filter(() => panel._containsFocus())).subscribe(() => this._focusMonitor.focusVia(this._element, "program"));
    if (defaultOptions) {
      this.expandedHeight = defaultOptions.expandedHeight;
      this.collapsedHeight = defaultOptions.collapsedHeight;
    }
  }
  expandedHeight;
  collapsedHeight;
  tabIndex = 0;
  get disabled() {
    return this.panel.disabled;
  }
  _toggle() {
    if (!this.disabled) {
      this.panel.toggle();
    }
  }
  _isExpanded() {
    return this.panel.expanded;
  }
  _getExpandedState() {
    return this.panel._getExpandedState();
  }
  _getPanelId() {
    return this.panel.id;
  }
  _getTogglePosition() {
    return this.panel.togglePosition;
  }
  _showToggle() {
    return !this.panel.hideToggle && !this.panel.disabled;
  }
  _getHeaderHeight() {
    const isExpanded = this._isExpanded();
    if (isExpanded && this.expandedHeight) {
      return this.expandedHeight;
    } else if (!isExpanded && this.collapsedHeight) {
      return this.collapsedHeight;
    }
    return null;
  }
  _keydown(event) {
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this._toggle();
        }
        break;
      default:
        if (this.panel.accordion) {
          this.panel.accordion._handleHeaderKeydown(event);
        }
        return;
    }
  }
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._element, origin, options);
    } else {
      this._element.nativeElement.focus(options);
    }
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._element).subscribe((origin) => {
      if (origin && this.panel.accordion) {
        this.panel.accordion._handleHeaderFocus(this);
      }
    });
  }
  ngOnDestroy() {
    this._parentChangeSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._element);
  }
  static \u0275fac = function MatExpansionPanelHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanelHeader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatExpansionPanelHeader,
    selectors: [["mat-expansion-panel-header"]],
    hostAttrs: ["role", "button", 1, "mat-expansion-panel-header", "mat-focus-indicator"],
    hostVars: 13,
    hostBindings: function MatExpansionPanelHeader_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function MatExpansionPanelHeader_click_HostBindingHandler() {
          return ctx._toggle();
        })("keydown", function MatExpansionPanelHeader_keydown_HostBindingHandler($event) {
          return ctx._keydown($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("id", ctx.panel._headerId)("tabindex", ctx.disabled ? -1 : ctx.tabIndex)("aria-controls", ctx._getPanelId())("aria-expanded", ctx._isExpanded())("aria-disabled", ctx.panel.disabled);
        \u0275\u0275styleProp("height", ctx._getHeaderHeight());
        \u0275\u0275classProp("mat-expanded", ctx._isExpanded())("mat-expansion-toggle-indicator-after", ctx._getTogglePosition() === "after")("mat-expansion-toggle-indicator-before", ctx._getTogglePosition() === "before");
      }
    },
    inputs: {
      expandedHeight: "expandedHeight",
      collapsedHeight: "collapsedHeight",
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)]
    },
    ngContentSelectors: _c5,
    decls: 5,
    vars: 3,
    consts: [[1, "mat-content"], [1, "mat-expansion-indicator"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 -960 960 960", "aria-hidden", "true", "focusable", "false"], ["d", "M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"]],
    template: function MatExpansionPanelHeader_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c4);
        \u0275\u0275domElementStart(0, "span", 0);
        \u0275\u0275projection(1);
        \u0275\u0275projection(2, 1);
        \u0275\u0275projection(3, 2);
        \u0275\u0275domElementEnd();
        \u0275\u0275conditionalCreate(4, MatExpansionPanelHeader_Conditional_4_Template, 3, 0, "span", 1);
      }
      if (rf & 2) {
        \u0275\u0275classProp("mat-content-hide-toggle", !ctx._showToggle());
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx._showToggle() ? 4 : -1);
      }
    },
    styles: ['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;height:var(--mat-expansion-header-collapsed-state-height, 48px);font-family:var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));font-size:var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));font-weight:var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));line-height:var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));letter-spacing:var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-header{transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header::before{border-radius:inherit}.mat-expansion-panel-header.mat-expanded{height:var(--mat-expansion-header-expanded-state-height, 64px)}.mat-expansion-panel-header[aria-disabled=true]{color:var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}@media(hover: none){.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-container-background-color, var(--mat-sys-surface))}}.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused{background:var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent))}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title{color:var(--mat-expansion-header-text-color, var(--mat-sys-on-surface))}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description{color:inherit}.mat-expansion-panel-header-description{flex-grow:2;color:var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant))}.mat-expansion-panel-animations-enabled .mat-expansion-indicator{transition:transform 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator{transform:rotate(180deg)}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";padding:3px;transform:rotate(45deg);vertical-align:middle;color:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-legacy-header-indicator-display, none)}.mat-expansion-indicator svg{width:24px;height:24px;margin:0 -8px;vertical-align:middle;fill:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-header-indicator-display, inline-block)}@media(forced-colors: active){.mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelHeader, [{
    type: Component,
    args: [{
      selector: "mat-expansion-panel-header",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-expansion-panel-header mat-focus-indicator",
        "role": "button",
        "[attr.id]": "panel._headerId",
        "[attr.tabindex]": "disabled ? -1 : tabIndex",
        "[attr.aria-controls]": "_getPanelId()",
        "[attr.aria-expanded]": "_isExpanded()",
        "[attr.aria-disabled]": "panel.disabled",
        "[class.mat-expanded]": "_isExpanded()",
        "[class.mat-expansion-toggle-indicator-after]": `_getTogglePosition() === 'after'`,
        "[class.mat-expansion-toggle-indicator-before]": `_getTogglePosition() === 'before'`,
        "[style.height]": "_getHeaderHeight()",
        "(click)": "_toggle()",
        "(keydown)": "_keydown($event)"
      },
      template: '<span class="mat-content" [class.mat-content-hide-toggle]="!_showToggle()">\n  <ng-content select="mat-panel-title"></ng-content>\n  <ng-content select="mat-panel-description"></ng-content>\n  <ng-content></ng-content>\n</span>\n\n@if (_showToggle()) {\n  <span class="mat-expansion-indicator">\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      viewBox="0 -960 960 960"\n      aria-hidden="true"\n      focusable="false">\n      <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/>\n    </svg>\n  </span>\n}\n',
      styles: ['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;height:var(--mat-expansion-header-collapsed-state-height, 48px);font-family:var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));font-size:var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));font-weight:var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));line-height:var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));letter-spacing:var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-header{transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header::before{border-radius:inherit}.mat-expansion-panel-header.mat-expanded{height:var(--mat-expansion-header-expanded-state-height, 64px)}.mat-expansion-panel-header[aria-disabled=true]{color:var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}@media(hover: none){.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-container-background-color, var(--mat-sys-surface))}}.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused{background:var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent))}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title{color:var(--mat-expansion-header-text-color, var(--mat-sys-on-surface))}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description{color:inherit}.mat-expansion-panel-header-description{flex-grow:2;color:var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant))}.mat-expansion-panel-animations-enabled .mat-expansion-indicator{transition:transform 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator{transform:rotate(180deg)}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";padding:3px;transform:rotate(45deg);vertical-align:middle;color:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-legacy-header-indicator-display, none)}.mat-expansion-indicator svg{width:24px;height:24px;margin:0 -8px;vertical-align:middle;fill:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-header-indicator-display, inline-block)}@media(forced-colors: active){.mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}}\n']
    }]
  }], () => [], {
    expandedHeight: [{
      type: Input
    }],
    collapsedHeight: [{
      type: Input
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }]
  });
})();
var MatExpansionPanelDescription = class _MatExpansionPanelDescription {
  static \u0275fac = function MatExpansionPanelDescription_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanelDescription)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatExpansionPanelDescription,
    selectors: [["mat-panel-description"]],
    hostAttrs: [1, "mat-expansion-panel-header-description"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelDescription, [{
    type: Directive,
    args: [{
      selector: "mat-panel-description",
      host: {
        class: "mat-expansion-panel-header-description"
      }
    }]
  }], null, null);
})();
var MatExpansionPanelTitle = class _MatExpansionPanelTitle {
  static \u0275fac = function MatExpansionPanelTitle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanelTitle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatExpansionPanelTitle,
    selectors: [["mat-panel-title"]],
    hostAttrs: [1, "mat-expansion-panel-header-title"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelTitle, [{
    type: Directive,
    args: [{
      selector: "mat-panel-title",
      host: {
        class: "mat-expansion-panel-header-title"
      }
    }]
  }], null, null);
})();
var MatAccordion = class _MatAccordion extends CdkAccordion {
  _keyManager;
  _ownHeaders = new QueryList();
  _headers;
  hideToggle = false;
  displayMode = "default";
  togglePosition = "after";
  ngAfterContentInit() {
    this._headers.changes.pipe(startWith(this._headers)).subscribe((headers) => {
      this._ownHeaders.reset(headers.filter((header) => header.panel.accordion === this));
      this._ownHeaders.notifyOnChanges();
    });
    this._keyManager = new FocusKeyManager(this._ownHeaders).withWrap().withHomeAndEnd();
  }
  _handleHeaderKeydown(event) {
    this._keyManager.onKeydown(event);
  }
  _handleHeaderFocus(header) {
    this._keyManager.updateActiveItem(header);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._keyManager?.destroy();
    this._ownHeaders.destroy();
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatAccordion_BaseFactory;
    return function MatAccordion_Factory(__ngFactoryType__) {
      return (\u0275MatAccordion_BaseFactory || (\u0275MatAccordion_BaseFactory = \u0275\u0275getInheritedFactory(_MatAccordion)))(__ngFactoryType__ || _MatAccordion);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatAccordion,
    selectors: [["mat-accordion"]],
    contentQueries: function MatAccordion_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatExpansionPanelHeader, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._headers = _t);
      }
    },
    hostAttrs: [1, "mat-accordion"],
    hostVars: 2,
    hostBindings: function MatAccordion_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-accordion-multi", ctx.multi);
      }
    },
    inputs: {
      hideToggle: [2, "hideToggle", "hideToggle", booleanAttribute],
      displayMode: "displayMode",
      togglePosition: "togglePosition"
    },
    exportAs: ["matAccordion"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_ACCORDION,
      useExisting: _MatAccordion
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAccordion, [{
    type: Directive,
    args: [{
      selector: "mat-accordion",
      exportAs: "matAccordion",
      providers: [{
        provide: MAT_ACCORDION,
        useExisting: MatAccordion
      }],
      host: {
        class: "mat-accordion",
        "[class.mat-accordion-multi]": "this.multi"
      }
    }]
  }], null, {
    _headers: [{
      type: ContentChildren,
      args: [MatExpansionPanelHeader, {
        descendants: true
      }]
    }],
    hideToggle: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    displayMode: [{
      type: Input
    }],
    togglePosition: [{
      type: Input
    }]
  });
})();
var MatExpansionModule = class _MatExpansionModule {
  static \u0275fac = function MatExpansionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatExpansionModule,
    imports: [CdkAccordionModule, PortalModule, MatAccordion, MatExpansionPanel, MatExpansionPanelActionRow, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelContent],
    exports: [BidiModule, MatAccordion, MatExpansionPanel, MatExpansionPanelActionRow, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelContent]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [CdkAccordionModule, PortalModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionModule, [{
    type: NgModule,
    args: [{
      imports: [CdkAccordionModule, PortalModule, MatAccordion, MatExpansionPanel, MatExpansionPanelActionRow, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelContent],
      exports: [BidiModule, MatAccordion, MatExpansionPanel, MatExpansionPanelActionRow, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelContent]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/slide-toggle.mjs
var _c02 = ["switch"];
var _c12 = ["*"];
function MatSlideToggle_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13);
    \u0275\u0275element(2, "path", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "svg", 15);
    \u0275\u0275element(4, "path", 16);
    \u0275\u0275elementEnd()();
  }
}
var MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken("mat-slide-toggle-default-options", {
  providedIn: "root",
  factory: () => ({
    disableToggleValue: false,
    hideIcon: false,
    disabledInteractive: false
  })
});
var MatSlideToggleChange = class {
  source;
  checked;
  constructor(source, checked) {
    this.source = source;
    this.checked = checked;
  }
};
var MatSlideToggle = class _MatSlideToggle {
  _elementRef = inject(ElementRef);
  _focusMonitor = inject(FocusMonitor);
  _changeDetectorRef = inject(ChangeDetectorRef);
  defaults = inject(MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS);
  _onChange = (_) => {
  };
  _onTouched = () => {
  };
  _validatorOnChange = () => {
  };
  _uniqueId;
  _checked = false;
  _createChangeEvent(isChecked) {
    return new MatSlideToggleChange(this, isChecked);
  }
  _labelId;
  get buttonId() {
    return `${this.id || this._uniqueId}-button`;
  }
  _switchElement;
  focus() {
    this._switchElement.nativeElement.focus();
  }
  _noopAnimations = _animationsDisabled();
  _focused;
  name = null;
  id;
  labelPosition = "after";
  ariaLabel = null;
  ariaLabelledby = null;
  ariaDescribedby;
  required;
  color;
  disabled = false;
  disableRipple = false;
  tabIndex = 0;
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = value;
    this._changeDetectorRef.markForCheck();
  }
  hideIcon;
  disabledInteractive;
  change = new EventEmitter();
  toggleChange = new EventEmitter();
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const tabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    const defaults = this.defaults;
    this.tabIndex = tabIndex == null ? 0 : parseInt(tabIndex) || 0;
    this.color = defaults.color || "accent";
    this.id = this._uniqueId = inject(_IdGenerator).getId("mat-mdc-slide-toggle-");
    this.hideIcon = defaults.hideIcon ?? false;
    this.disabledInteractive = defaults.disabledInteractive ?? false;
    this._labelId = this._uniqueId + "-label";
  }
  ngAfterContentInit() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe((focusOrigin) => {
      if (focusOrigin === "keyboard" || focusOrigin === "program") {
        this._focused = true;
        this._changeDetectorRef.markForCheck();
      } else if (!focusOrigin) {
        Promise.resolve().then(() => {
          this._focused = false;
          this._onTouched();
          this._changeDetectorRef.markForCheck();
        });
      }
    });
  }
  ngOnChanges(changes) {
    if (changes["required"]) {
      this._validatorOnChange();
    }
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  writeValue(value) {
    this.checked = !!value;
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  validate(control) {
    return this.required && control.value !== true ? {
      "required": true
    } : null;
  }
  registerOnValidatorChange(fn) {
    this._validatorOnChange = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }
  toggle() {
    this.checked = !this.checked;
    this._onChange(this.checked);
  }
  _emitChangeEvent() {
    this._onChange(this.checked);
    this.change.emit(this._createChangeEvent(this.checked));
  }
  _handleClick() {
    if (!this.disabled) {
      this.toggleChange.emit();
      if (!this.defaults.disableToggleValue) {
        this.checked = !this.checked;
        this._onChange(this.checked);
        this.change.emit(new MatSlideToggleChange(this, this.checked));
      }
    }
  }
  _getAriaLabelledBy() {
    if (this.ariaLabelledby) {
      return this.ariaLabelledby;
    }
    return this.ariaLabel ? null : this._labelId;
  }
  static \u0275fac = function MatSlideToggle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSlideToggle)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatSlideToggle,
    selectors: [["mat-slide-toggle"]],
    viewQuery: function MatSlideToggle_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c02, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._switchElement = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-slide-toggle"],
    hostVars: 13,
    hostBindings: function MatSlideToggle_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275domProperty("id", ctx.id);
        \u0275\u0275attribute("tabindex", null)("aria-label", null)("name", null)("aria-labelledby", null);
        \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
        \u0275\u0275classProp("mat-mdc-slide-toggle-focused", ctx._focused)("mat-mdc-slide-toggle-checked", ctx.checked)("_mat-animation-noopable", ctx._noopAnimations);
      }
    },
    inputs: {
      name: "name",
      id: "id",
      labelPosition: "labelPosition",
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      ariaDescribedby: [0, "aria-describedby", "ariaDescribedby"],
      required: [2, "required", "required", booleanAttribute],
      color: "color",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
      checked: [2, "checked", "checked", booleanAttribute],
      hideIcon: [2, "hideIcon", "hideIcon", booleanAttribute],
      disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
    },
    outputs: {
      change: "change",
      toggleChange: "toggleChange"
    },
    exportAs: ["matSlideToggle"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _MatSlideToggle),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: _MatSlideToggle,
      multi: true
    }]), \u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c12,
    decls: 14,
    vars: 27,
    consts: [["switch", ""], ["mat-internal-form-field", "", 3, "labelPosition"], ["role", "switch", "type", "button", 1, "mdc-switch", 3, "click", "tabIndex", "disabled"], [1, "mat-mdc-slide-toggle-touch-target"], [1, "mdc-switch__track"], [1, "mdc-switch__handle-track"], [1, "mdc-switch__handle"], [1, "mdc-switch__shadow"], [1, "mdc-elevation-overlay"], [1, "mdc-switch__ripple"], ["mat-ripple", "", 1, "mat-mdc-slide-toggle-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mdc-switch__icons"], [1, "mdc-label", 3, "click", "for"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--on"], ["d", "M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--off"], ["d", "M20 13H4v-2h16v2z"]],
    template: function MatSlideToggle_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 1)(1, "button", 2, 0);
        \u0275\u0275listener("click", function MatSlideToggle_Template_button_click_1_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handleClick());
        });
        \u0275\u0275element(3, "div", 3)(4, "span", 4);
        \u0275\u0275elementStart(5, "span", 5)(6, "span", 6)(7, "span", 7);
        \u0275\u0275element(8, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "span", 9);
        \u0275\u0275element(10, "span", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(11, MatSlideToggle_Conditional_11_Template, 5, 0, "span", 11);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "label", 12);
        \u0275\u0275listener("click", function MatSlideToggle_Template_label_click_12_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView($event.stopPropagation());
        });
        \u0275\u0275projection(13);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const switch_r2 = \u0275\u0275reference(2);
        \u0275\u0275property("labelPosition", ctx.labelPosition);
        \u0275\u0275advance();
        \u0275\u0275classProp("mdc-switch--selected", ctx.checked)("mdc-switch--unselected", !ctx.checked)("mdc-switch--checked", ctx.checked)("mdc-switch--disabled", ctx.disabled)("mat-mdc-slide-toggle-disabled-interactive", ctx.disabledInteractive);
        \u0275\u0275property("tabIndex", ctx.disabled && !ctx.disabledInteractive ? -1 : ctx.tabIndex)("disabled", ctx.disabled && !ctx.disabledInteractive);
        \u0275\u0275attribute("id", ctx.buttonId)("name", ctx.name)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx._getAriaLabelledBy())("aria-describedby", ctx.ariaDescribedby)("aria-required", ctx.required || null)("aria-checked", ctx.checked)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null);
        \u0275\u0275advance(9);
        \u0275\u0275property("matRippleTrigger", switch_r2)("matRippleDisabled", ctx.disableRipple || ctx.disabled)("matRippleCentered", true);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.hideIcon ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("for", ctx.buttonId);
        \u0275\u0275attribute("id", ctx._labelId);
      }
    },
    dependencies: [MatRipple, _MatInternalFormField],
    styles: ['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative;width:var(--mat-slide-toggle-track-width, 52px)}.mdc-switch.mdc-switch--disabled{cursor:default;pointer-events:none}.mdc-switch.mat-mdc-slide-toggle-disabled-interactive{pointer-events:auto}.mdc-switch__track{overflow:hidden;position:relative;width:100%;height:var(--mat-slide-toggle-track-height, 32px);border-radius:var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full))}.mdc-switch--disabled.mdc-switch .mdc-switch__track{opacity:var(--mat-slide-toggle-disabled-track-opacity, 0.12)}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%;border-width:var(--mat-slide-toggle-track-outline-width, 2px);border-color:var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline))}.mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track::after{border-width:var(--mat-slide-toggle-selected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-selected-track-outline-color, transparent)}.mdc-switch--disabled .mdc-switch__track::before,.mdc-switch--disabled .mdc-switch__track::after{border-width:var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface))}@media(forced-colors: active){.mdc-switch__track{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0);background:var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before,.mdc-switch.mdc-switch--disabled .mdc-switch__track::before{background:var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch__track::after{transform:translateX(-100%);background:var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary))}[dir=rtl] .mdc-switch__track::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::after{transform:translateX(0)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after,.mdc-switch.mdc-switch--disabled .mdc-switch__track::after{background:var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface))}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0);width:calc(100% - var(--mat-slide-toggle-handle-width))}[dir=rtl] .mdc-switch__handle-track{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto;transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1);width:var(--mat-slide-toggle-handle-width);height:var(--mat-slide-toggle-handle-height);border-radius:var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full))}[dir=rtl] .mdc-switch__handle{left:auto;right:0}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-slide-toggle-unselected-handle-size, 16px);height:var(--mat-slide-toggle-unselected-handle-size, 16px);margin:var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-slide-toggle-selected-handle-size, 24px);height:var(--mat-slide-toggle-selected-handle-size, 24px);margin:var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-slide-toggle-with-icon-handle-size, 24px);height:var(--mat-slide-toggle-with-icon-handle-size, 24px)}.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-slide-toggle-pressed-handle-size, 28px);height:var(--mat-slide-toggle-pressed-handle-size, 28px)}.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px)}.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-selected-handle-opacity, 1)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38)}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media(forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary))}.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after,.mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface))}.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline))}.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface))}.mdc-switch__handle::before{background:var(--mat-slide-toggle-handle-surface-color)}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-handle-elevation-shadow)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow,.mdc-switch.mdc-switch--disabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-disabled-handle-elevation-shadow)}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1;width:var(--mat-slide-toggle-state-layer-size, 40px);height:var(--mat-slide-toggle-state-layer-size, 40px)}.mdc-switch__ripple::after{content:"";opacity:0}.mdc-switch--disabled .mdc-switch__ripple::after{display:none}.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after{display:block}.mdc-switch:hover .mdc-switch__ripple::after{transition:75ms opacity cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after,.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch__icons{position:relative;height:100%;width:100%;z-index:1;transform:translateZ(0)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38)}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--unselected .mdc-switch__icon{width:var(--mat-slide-toggle-unselected-icon-size, 16px);height:var(--mat-slide-toggle-unselected-icon-size, 16px);fill:var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__icon{width:var(--mat-slide-toggle-selected-icon-size, 16px);height:var(--mat-slide-toggle-selected-icon-size, 16px);fill:var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container))}.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface))}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{-webkit-user-select:none;user-select:none;display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-internal-form-field{color:var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));font-family:var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));line-height:var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));letter-spacing:var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));font-weight:var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight))}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-slide-toggle-touch-target{position:absolute;top:50%;left:50%;height:var(--mat-slide-toggle-touch-target-size, 48px);width:100%;transform:translate(-50%, -50%);display:var(--mat-slide-toggle-touch-target-display, block)}[dir=rtl] .mat-mdc-slide-toggle-touch-target{left:auto;right:50%;transform:translate(50%, -50%)}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggle, [{
    type: Component,
    args: [{
      selector: "mat-slide-toggle",
      host: {
        "class": "mat-mdc-slide-toggle",
        "[id]": "id",
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.name]": "null",
        "[attr.aria-labelledby]": "null",
        "[class.mat-mdc-slide-toggle-focused]": "_focused",
        "[class.mat-mdc-slide-toggle-checked]": "checked",
        "[class._mat-animation-noopable]": "_noopAnimations",
        "[class]": 'color ? "mat-" + color : ""'
      },
      exportAs: "matSlideToggle",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MatSlideToggle),
        multi: true
      }, {
        provide: NG_VALIDATORS,
        useExisting: MatSlideToggle,
        multi: true
      }],
      imports: [MatRipple, _MatInternalFormField],
      template: `<div mat-internal-form-field [labelPosition]="labelPosition">
  <button
    class="mdc-switch"
    role="switch"
    type="button"
    [class.mdc-switch--selected]="checked"
    [class.mdc-switch--unselected]="!checked"
    [class.mdc-switch--checked]="checked"
    [class.mdc-switch--disabled]="disabled"
    [class.mat-mdc-slide-toggle-disabled-interactive]="disabledInteractive"
    [tabIndex]="disabled && !disabledInteractive ? -1 : tabIndex"
    [disabled]="disabled && !disabledInteractive"
    [attr.id]="buttonId"
    [attr.name]="name"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="_getAriaLabelledBy()"
    [attr.aria-describedby]="ariaDescribedby"
    [attr.aria-required]="required || null"
    [attr.aria-checked]="checked"
    [attr.aria-disabled]="disabled && disabledInteractive ? 'true' : null"
    (click)="_handleClick()"
    #switch>
    <div class="mat-mdc-slide-toggle-touch-target"></div>
    <span class="mdc-switch__track"></span>
    <span class="mdc-switch__handle-track">
      <span class="mdc-switch__handle">
        <span class="mdc-switch__shadow">
          <span class="mdc-elevation-overlay"></span>
        </span>
        <span class="mdc-switch__ripple">
          <span class="mat-mdc-slide-toggle-ripple mat-focus-indicator" mat-ripple
            [matRippleTrigger]="switch"
            [matRippleDisabled]="disableRipple || disabled"
            [matRippleCentered]="true"></span>
        </span>
        @if (!hideIcon) {
          <span class="mdc-switch__icons">
            <svg
              class="mdc-switch__icon mdc-switch__icon--on"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
            </svg>
            <svg
              class="mdc-switch__icon mdc-switch__icon--off"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M20 13H4v-2h16v2z" />
            </svg>
          </span>
        }
      </span>
    </span>
  </button>

  <!--
    Clicking on the label will trigger another click event from the button.
    Stop propagation here so other listeners further up in the DOM don't execute twice.
  -->
  <label class="mdc-label" [for]="buttonId" [attr.id]="_labelId" (click)="$event.stopPropagation()">
    <ng-content></ng-content>
  </label>
</div>
`,
      styles: ['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative;width:var(--mat-slide-toggle-track-width, 52px)}.mdc-switch.mdc-switch--disabled{cursor:default;pointer-events:none}.mdc-switch.mat-mdc-slide-toggle-disabled-interactive{pointer-events:auto}.mdc-switch__track{overflow:hidden;position:relative;width:100%;height:var(--mat-slide-toggle-track-height, 32px);border-radius:var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full))}.mdc-switch--disabled.mdc-switch .mdc-switch__track{opacity:var(--mat-slide-toggle-disabled-track-opacity, 0.12)}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%;border-width:var(--mat-slide-toggle-track-outline-width, 2px);border-color:var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline))}.mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track::after{border-width:var(--mat-slide-toggle-selected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-selected-track-outline-color, transparent)}.mdc-switch--disabled .mdc-switch__track::before,.mdc-switch--disabled .mdc-switch__track::after{border-width:var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface))}@media(forced-colors: active){.mdc-switch__track{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0);background:var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before,.mdc-switch.mdc-switch--disabled .mdc-switch__track::before{background:var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch__track::after{transform:translateX(-100%);background:var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary))}[dir=rtl] .mdc-switch__track::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::after{transform:translateX(0)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after,.mdc-switch.mdc-switch--disabled .mdc-switch__track::after{background:var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface))}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0);width:calc(100% - var(--mat-slide-toggle-handle-width))}[dir=rtl] .mdc-switch__handle-track{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto;transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1);width:var(--mat-slide-toggle-handle-width);height:var(--mat-slide-toggle-handle-height);border-radius:var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full))}[dir=rtl] .mdc-switch__handle{left:auto;right:0}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-slide-toggle-unselected-handle-size, 16px);height:var(--mat-slide-toggle-unselected-handle-size, 16px);margin:var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-slide-toggle-selected-handle-size, 24px);height:var(--mat-slide-toggle-selected-handle-size, 24px);margin:var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-slide-toggle-with-icon-handle-size, 24px);height:var(--mat-slide-toggle-with-icon-handle-size, 24px)}.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-slide-toggle-pressed-handle-size, 28px);height:var(--mat-slide-toggle-pressed-handle-size, 28px)}.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px)}.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-selected-handle-opacity, 1)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38)}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media(forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary))}.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after,.mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface))}.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline))}.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface))}.mdc-switch__handle::before{background:var(--mat-slide-toggle-handle-surface-color)}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-handle-elevation-shadow)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow,.mdc-switch.mdc-switch--disabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-disabled-handle-elevation-shadow)}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1;width:var(--mat-slide-toggle-state-layer-size, 40px);height:var(--mat-slide-toggle-state-layer-size, 40px)}.mdc-switch__ripple::after{content:"";opacity:0}.mdc-switch--disabled .mdc-switch__ripple::after{display:none}.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after{display:block}.mdc-switch:hover .mdc-switch__ripple::after{transition:75ms opacity cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after,.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch__icons{position:relative;height:100%;width:100%;z-index:1;transform:translateZ(0)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38)}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--unselected .mdc-switch__icon{width:var(--mat-slide-toggle-unselected-icon-size, 16px);height:var(--mat-slide-toggle-unselected-icon-size, 16px);fill:var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__icon{width:var(--mat-slide-toggle-selected-icon-size, 16px);height:var(--mat-slide-toggle-selected-icon-size, 16px);fill:var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container))}.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface))}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{-webkit-user-select:none;user-select:none;display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-internal-form-field{color:var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));font-family:var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));line-height:var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));letter-spacing:var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));font-weight:var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight))}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-slide-toggle-touch-target{position:absolute;top:50%;left:50%;height:var(--mat-slide-toggle-touch-target-size, 48px);width:100%;transform:translate(-50%, -50%);display:var(--mat-slide-toggle-touch-target-display, block)}[dir=rtl] .mat-mdc-slide-toggle-touch-target{left:auto;right:50%;transform:translate(50%, -50%)}\n']
    }]
  }], () => [], {
    _switchElement: [{
      type: ViewChild,
      args: ["switch"]
    }],
    name: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    ariaDescribedby: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }],
    checked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    change: [{
      type: Output
    }],
    toggleChange: [{
      type: Output
    }]
  });
})();
var MatSlideToggleModule = class _MatSlideToggleModule {
  static \u0275fac = function MatSlideToggleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSlideToggleModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatSlideToggleModule,
    imports: [MatSlideToggle],
    exports: [MatSlideToggle, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatSlideToggle, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggleModule, [{
    type: NgModule,
    args: [{
      imports: [MatSlideToggle],
      exports: [MatSlideToggle, BidiModule]
    }]
  }], null, null);
})();

// src/app/features/matches/pages/live-match-logger/live-match-logger.ts
var _forTrack0 = ($index, $item) => $item.id;
function LiveMatchLogger_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section")(1, "h2", 31);
    \u0275\u0275text(2, "Quick Actions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 35)(4, "button", 36);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_14_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateMatchStatus("live"));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "play_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Start Match ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 36);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_14_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateMatchStatus("finished"));
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "sports_score");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " End Match ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 36);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_14_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateMatchStatus("cancelled"));
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " Cancel Match ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 36);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_14_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateMatchStatus("postponed"));
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " Postpone Match ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 36);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_14_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearAllEvents());
    });
    \u0275\u0275elementStart(21, "mat-icon");
    \u0275\u0275text(22, "clear_all");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " Clear Events ");
    \u0275\u0275elementEnd()()();
  }
}
function LiveMatchLogger_Conditional_30_For_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60)(1, "div", 61)(2, "span", 62);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 63);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_30_For_69_Template_button_click_4_listener() {
      const player_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removePlayer("home", player_r5.id));
    });
    \u0275\u0275elementStart(5, "mat-icon", 64);
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "mat-form-field", 65)(8, "mat-label");
    \u0275\u0275text(9, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 50);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_For_69_Template_input_change_10_listener($event) {
      const player_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updatePlayer("home", player_r5.id, "name", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 66)(12, "mat-form-field", 67)(13, "mat-label");
    \u0275\u0275text(14, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 68);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_For_69_Template_input_change_15_listener($event) {
      const player_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updatePlayer("home", player_r5.id, "number", +$event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "mat-form-field", 69)(17, "mat-label");
    \u0275\u0275text(18, "Position");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "mat-select", 40);
    \u0275\u0275listener("selectionChange", function LiveMatchLogger_Conditional_30_For_69_Template_mat_select_selectionChange_19_listener($event) {
      const player_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updatePlayer("home", player_r5.id, "position", $event.value));
    });
    \u0275\u0275elementStart(20, "mat-option", 70);
    \u0275\u0275text(21, "GK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-option", 71);
    \u0275\u0275text(23, "DEF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-option", 72);
    \u0275\u0275text(25, "MID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "mat-option", 73);
    \u0275\u0275text(27, "FWD");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const player_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", player_r5.number);
    \u0275\u0275advance(7);
    \u0275\u0275property("value", player_r5.name);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", player_r5.number);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", player_r5.position);
  }
}
function LiveMatchLogger_Conditional_30_For_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60)(1, "div", 61)(2, "span", 62);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 74);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_30_For_96_Template_button_click_4_listener() {
      const player_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removePlayer("away", player_r7.id));
    });
    \u0275\u0275elementStart(5, "mat-icon", 64);
    \u0275\u0275text(6, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "mat-form-field", 65)(8, "mat-label");
    \u0275\u0275text(9, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 50);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_For_96_Template_input_change_10_listener($event) {
      const player_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updatePlayer("away", player_r7.id, "name", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 66)(12, "mat-form-field", 67)(13, "mat-label");
    \u0275\u0275text(14, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 68);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_For_96_Template_input_change_15_listener($event) {
      const player_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updatePlayer("away", player_r7.id, "number", +$event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "mat-form-field", 69)(17, "mat-label");
    \u0275\u0275text(18, "Position");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "mat-select", 40);
    \u0275\u0275listener("selectionChange", function LiveMatchLogger_Conditional_30_For_96_Template_mat_select_selectionChange_19_listener($event) {
      const player_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updatePlayer("away", player_r7.id, "position", $event.value));
    });
    \u0275\u0275elementStart(20, "mat-option", 70);
    \u0275\u0275text(21, "GK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-option", 71);
    \u0275\u0275text(23, "DEF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-option", 72);
    \u0275\u0275text(25, "MID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "mat-option", 73);
    \u0275\u0275text(27, "FWD");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const player_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", player_r7.number);
    \u0275\u0275advance(7);
    \u0275\u0275property("value", player_r7.name);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", player_r7.number);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", player_r7.position);
  }
}
function LiveMatchLogger_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-accordion")(1, "mat-expansion-panel")(2, "mat-expansion-panel-header")(3, "mat-panel-title")(4, "mat-icon", 37);
    \u0275\u0275text(5, "settings");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Match Settings ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 38)(8, "mat-form-field", 39)(9, "mat-label");
    \u0275\u0275text(10, "Match Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-select", 40);
    \u0275\u0275listener("selectionChange", function LiveMatchLogger_Conditional_30_Template_mat_select_selectionChange_11_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateMatchStatus($event.value));
    });
    \u0275\u0275elementStart(12, "mat-option", 41);
    \u0275\u0275text(13, "Scheduled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-option", 42);
    \u0275\u0275text(15, "Live");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-option", 43);
    \u0275\u0275text(17, "Finished");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-option", 44);
    \u0275\u0275text(19, "Rescheduled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "mat-option", 45);
    \u0275\u0275text(21, "Postponed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-option", 46);
    \u0275\u0275text(23, "Cancelled");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "mat-form-field", 39)(25, "mat-label");
    \u0275\u0275text(26, "Match Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 47);
    \u0275\u0275listener("dateChange", function LiveMatchLogger_Conditional_30_Template_input_dateChange_27_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateMatchDate($event.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "mat-datepicker-toggle", 48)(29, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "mat-form-field", 39)(32, "mat-label");
    \u0275\u0275text(33, "Match Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 49);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_Template_input_change_34_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateMatchTime($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "mat-form-field", 39)(36, "mat-label");
    \u0275\u0275text(37, "Venue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 50);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_Template_input_change_38_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateVenue($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "mat-form-field", 39)(40, "mat-label");
    \u0275\u0275text(41, "League");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 50);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_Template_input_change_42_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateLeague($event.target.value));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(43, "mat-expansion-panel")(44, "mat-expansion-panel-header")(45, "mat-panel-title")(46, "mat-icon", 37);
    \u0275\u0275text(47, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 51)(50, "div", 52)(51, "mat-form-field", 53)(52, "mat-label");
    \u0275\u0275text(53, "Team Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "input", 50);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_Template_input_change_54_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateTeamName("home", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "mat-form-field", 54)(56, "mat-label");
    \u0275\u0275text(57, "Score");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "input", 55);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_Template_input_change_58_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateTeamScore("home", +$event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(59, "mat-divider", 56);
    \u0275\u0275elementStart(60, "div", 57)(61, "h4", 58);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "button", 36);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_30_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addPlayer("home"));
    });
    \u0275\u0275elementStart(64, "mat-icon");
    \u0275\u0275text(65, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(66, " Add Player ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 59);
    \u0275\u0275repeaterCreate(68, LiveMatchLogger_Conditional_30_For_69_Template, 28, 4, "div", 60, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(70, "mat-expansion-panel")(71, "mat-expansion-panel-header")(72, "mat-panel-title")(73, "mat-icon", 37);
    \u0275\u0275text(74, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 51)(77, "div", 52)(78, "mat-form-field", 53)(79, "mat-label");
    \u0275\u0275text(80, "Team Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "input", 50);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_Template_input_change_81_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateTeamName("away", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(82, "mat-form-field", 54)(83, "mat-label");
    \u0275\u0275text(84, "Score");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "input", 55);
    \u0275\u0275listener("change", function LiveMatchLogger_Conditional_30_Template_input_change_85_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateTeamScore("away", +$event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(86, "mat-divider", 56);
    \u0275\u0275elementStart(87, "div", 57)(88, "h4", 58);
    \u0275\u0275text(89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "button", 36);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_30_Template_button_click_90_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addPlayer("away"));
    });
    \u0275\u0275elementStart(91, "mat-icon");
    \u0275\u0275text(92, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(93, " Add Player ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(94, "div", 59);
    \u0275\u0275repeaterCreate(95, LiveMatchLogger_Conditional_30_For_96_Template, 28, 4, "div", 60, _forTrack0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const datePicker_r8 = \u0275\u0275reference(30);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275property("value", ctx_r1.matchInfo().status);
    \u0275\u0275advance(16);
    \u0275\u0275property("matDatepicker", datePicker_r8)("value", ctx_r1.matchInfo().date);
    \u0275\u0275advance();
    \u0275\u0275property("for", datePicker_r8);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.matchInfo().time);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.matchInfo().venue);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.matchInfo().league);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.homeTeam().name, " (Home) ");
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.homeTeam().name);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.homeTeam().score);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Players (", ctx_r1.homeTeam().players.length, ")");
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.homeTeam().players);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r1.awayTeam().name, " (Away) ");
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.awayTeam().name);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.awayTeam().score);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Players (", ctx_r1.awayTeam().players.length, ")");
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.awayTeam().players);
  }
}
function LiveMatchLogger_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 75);
    \u0275\u0275element(2, "span", 76)(3, "span", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 78);
    \u0275\u0275text(5, "Live");
    \u0275\u0275elementEnd()();
  }
}
function LiveMatchLogger_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "span", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap("status-" + ctx_r1.matchInfo().status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(ctx_r1.matchInfo().status), " ");
  }
}
function LiveMatchLogger_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "input", 79, 1);
    \u0275\u0275listener("input", function LiveMatchLogger_Conditional_44_Template_input_input_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editMinutes = +$event.target.value);
    })("keydown.enter", function LiveMatchLogger_Conditional_44_Template_input_keydown_enter_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveTime());
    })("keydown.escape", function LiveMatchLogger_Conditional_44_Template_input_keydown_escape_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelTimeEdit());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 80);
    \u0275\u0275text(4, ":");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 81);
    \u0275\u0275listener("input", function LiveMatchLogger_Conditional_44_Template_input_input_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editSeconds = +$event.target.value);
    })("keydown.enter", function LiveMatchLogger_Conditional_44_Template_input_keydown_enter_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveTime());
    })("keydown.escape", function LiveMatchLogger_Conditional_44_Template_input_keydown_escape_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelTimeEdit());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 82)(7, "button", 83);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_44_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveTime());
    });
    \u0275\u0275elementStart(8, "mat-icon", 64);
    \u0275\u0275text(9, "check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 84);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_44_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelTimeEdit());
    });
    \u0275\u0275elementStart(11, "mat-icon", 64);
    \u0275\u0275text(12, "close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.editMinutes);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.editSeconds);
  }
}
function LiveMatchLogger_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 85);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_45_Template_p_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startTimeEdit());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formattedTime(), " ");
  }
}
function LiveMatchLogger_Conditional_46_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_46_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pauseTimer());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "pause");
    \u0275\u0275elementEnd()();
  }
}
function LiveMatchLogger_Conditional_46_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 89);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_46_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startTimer());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "play_arrow");
    \u0275\u0275elementEnd()();
  }
}
function LiveMatchLogger_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275conditionalCreate(1, LiveMatchLogger_Conditional_46_Conditional_1_Template, 3, 0, "button", 86)(2, LiveMatchLogger_Conditional_46_Conditional_2_Template, 3, 0, "button", 87);
    \u0275\u0275elementStart(3, "button", 88);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_46_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetTimer());
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "restart_alt");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isRunning() ? 1 : 2);
  }
}
function LiveMatchLogger_Conditional_56_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 94)(1, "div")(2, "p", 95);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 96);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 97)(7, "button", 98);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_56_For_9_Template_button_click_7_listener() {
      const player_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logEvent("goal", player_r15, ctx_r1.homeTeam()));
    });
    \u0275\u0275text(8, " Goal ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 99);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_56_For_9_Template_button_click_9_listener() {
      const player_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logEvent("assist", player_r15, ctx_r1.homeTeam()));
    });
    \u0275\u0275text(10, " Assist ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 100);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_56_For_9_Template_button_click_11_listener() {
      const player_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logEvent("yellow_card", player_r15, ctx_r1.homeTeam()));
    });
    \u0275\u0275text(12, " Yellow ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 101);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_56_For_9_Template_button_click_13_listener() {
      const player_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logEvent("red_card", player_r15, ctx_r1.homeTeam()));
    });
    \u0275\u0275text(14, " Red ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const player_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("#", player_r15.number, " ", player_r15.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getPositionLabel(player_r15.position));
  }
}
function LiveMatchLogger_Conditional_56_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 94)(1, "div")(2, "p", 95);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 96);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 97)(7, "button", 98);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_56_For_15_Template_button_click_7_listener() {
      const player_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logEvent("goal", player_r17, ctx_r1.awayTeam()));
    });
    \u0275\u0275text(8, " Goal ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 99);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_56_For_15_Template_button_click_9_listener() {
      const player_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logEvent("assist", player_r17, ctx_r1.awayTeam()));
    });
    \u0275\u0275text(10, " Assist ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 100);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_56_For_15_Template_button_click_11_listener() {
      const player_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logEvent("yellow_card", player_r17, ctx_r1.awayTeam()));
    });
    \u0275\u0275text(12, " Yellow ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 101);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_56_For_15_Template_button_click_13_listener() {
      const player_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logEvent("red_card", player_r17, ctx_r1.awayTeam()));
    });
    \u0275\u0275text(14, " Red ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const player_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("#", player_r17.number, " ", player_r17.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getPositionLabel(player_r17.position));
  }
}
function LiveMatchLogger_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section")(1, "h2", 31);
    \u0275\u0275text(2, "Team Lineups & Actions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 90)(4, "div", 91)(5, "h3", 92);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 93);
    \u0275\u0275repeaterCreate(8, LiveMatchLogger_Conditional_56_For_9_Template, 15, 3, "div", 94, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 91)(11, "h3", 92);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 93);
    \u0275\u0275repeaterCreate(14, LiveMatchLogger_Conditional_56_For_15_Template, 15, 3, "div", 94, _forTrack0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.homeTeam().name);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.homeTeam().players);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.awayTeam().name);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.awayTeam().players);
  }
}
function LiveMatchLogger_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "mat-icon", 102);
    \u0275\u0275text(2, "sports_soccer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No events logged yet. Start the match and log events!");
    \u0275\u0275elementEnd()();
  }
}
function LiveMatchLogger_Conditional_62_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 110);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 111)(4, "span", 112)(5, "mat-icon", 113);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 114);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 115);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 116)(13, "button", 117);
    \u0275\u0275listener("click", function LiveMatchLogger_Conditional_62_For_16_Template_button_click_13_listener() {
      const event_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeEvent(event_r19.id));
    });
    \u0275\u0275elementStart(14, "mat-icon", 118);
    \u0275\u0275text(15, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const event_r19 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", event_r19.time, " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r1.getEventColor(event_r19.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getEventIcon(event_r19.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEventLabel(event_r19.type), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" #", event_r19.player.number, " ", event_r19.player.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", event_r19.team.name, " ");
  }
}
function LiveMatchLogger_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "table", 103)(2, "thead")(3, "tr", 104)(4, "th", 105);
    \u0275\u0275text(5, " Time ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 106);
    \u0275\u0275text(7, " Event ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 107);
    \u0275\u0275text(9, " Player ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 107);
    \u0275\u0275text(11, " Team ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 108);
    \u0275\u0275text(13, " Actions ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody", 109);
    \u0275\u0275repeaterCreate(15, LiveMatchLogger_Conditional_62_For_16_Template, 16, 8, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r1.events());
  }
}
var LiveMatchLogger = class _LiveMatchLogger {
  timerInterval = null;
  showAdminPanel = false;
  // Time editing
  isEditingTime = false;
  editMinutes = 0;
  editSeconds = 0;
  // Undo/Redo history
  MAX_HISTORY = 50;
  undoStack = [];
  redoStack = [];
  canUndo = signal(false, __spreadValues({}, ngDevMode ? { debugName: "canUndo" } : {}));
  canRedo = signal(false, __spreadValues({}, ngDevMode ? { debugName: "canRedo" } : {}));
  elapsedSeconds = signal(0, __spreadValues({}, ngDevMode ? { debugName: "elapsedSeconds" } : {}));
  isRunning = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isRunning" } : {}));
  events = signal([], __spreadValues({}, ngDevMode ? { debugName: "events" } : {}));
  matchInfo = signal({
    date: /* @__PURE__ */ new Date(),
    time: "20:00",
    venue: "Old Trafford",
    league: "Premier League",
    status: "scheduled"
  }, __spreadValues({}, ngDevMode ? { debugName: "matchInfo" } : {}));
  homeTeam = signal({
    id: "home",
    name: "Manchester United",
    score: 0,
    logo: "https://api.sofascore.app/api/v1/team/35/image",
    players: [
      { id: "h1", number: 7, name: "B. Fernandes", position: "MID", teamId: "home" },
      { id: "h2", number: 10, name: "M. Rashford", position: "FWD", teamId: "home" },
      { id: "h3", number: 1, name: "A. Onana", position: "GK", teamId: "home" },
      { id: "h4", number: 6, name: "L. Mart\xEDnez", position: "DEF", teamId: "home" },
      { id: "h5", number: 5, name: "H. Maguire", position: "DEF", teamId: "home" }
    ]
  }, __spreadValues({}, ngDevMode ? { debugName: "homeTeam" } : {}));
  awayTeam = signal({
    id: "away",
    name: "Liverpool",
    score: 0,
    logo: "https://api.sofascore.app/api/v1/team/44/image",
    players: [
      { id: "a1", number: 4, name: "V. van Dijk", position: "DEF", teamId: "away" },
      { id: "a2", number: 11, name: "M. Salah", position: "FWD", teamId: "away" },
      { id: "a3", number: 1, name: "Alisson B.", position: "GK", teamId: "away" },
      { id: "a4", number: 66, name: "T. Alexander-Arnold", position: "DEF", teamId: "away" },
      { id: "a5", number: 9, name: "D. N\xFA\xF1ez", position: "FWD", teamId: "away" }
    ]
  }, __spreadValues({}, ngDevMode ? { debugName: "awayTeam" } : {}));
  formattedTime = computed(() => {
    const minutes = Math.floor(this.elapsedSeconds() / 60);
    const seconds = this.elapsedSeconds() % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, __spreadValues({}, ngDevMode ? { debugName: "formattedTime" } : {}));
  ngOnInit() {
  }
  ngOnDestroy() {
    this.stopTimer();
  }
  // ============ Timer Controls ============
  startTimer() {
    if (this.timerInterval)
      return;
    if (this.matchInfo().status === "scheduled") {
      this.updateMatchStatus("live");
    }
    this.isRunning.set(true);
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds.update((s) => s + 1);
    }, 1e3);
  }
  pauseTimer() {
    this.stopTimer();
    this.isRunning.set(false);
  }
  resetTimer() {
    this.stopTimer();
    this.isRunning.set(false);
    this.elapsedSeconds.set(0);
  }
  startTimeEdit() {
    this.pauseTimer();
    const totalSeconds = this.elapsedSeconds();
    this.editMinutes = Math.floor(totalSeconds / 60);
    this.editSeconds = totalSeconds % 60;
    this.isEditingTime = true;
  }
  saveTime() {
    this.saveToHistory();
    const minutes = Math.max(0, this.editMinutes);
    const seconds = Math.min(59, Math.max(0, this.editSeconds));
    this.elapsedSeconds.set(minutes * 60 + seconds);
    this.isEditingTime = false;
  }
  cancelTimeEdit() {
    this.isEditingTime = false;
  }
  // ============ Undo/Redo ============
  saveToHistory() {
    const state = {
      homeTeam: JSON.parse(JSON.stringify(this.homeTeam())),
      awayTeam: JSON.parse(JSON.stringify(this.awayTeam())),
      events: JSON.parse(JSON.stringify(this.events())),
      elapsedSeconds: this.elapsedSeconds(),
      matchInfo: JSON.parse(JSON.stringify(this.matchInfo()))
    };
    this.undoStack.push(state);
    if (this.undoStack.length > this.MAX_HISTORY) {
      this.undoStack.shift();
    }
    this.redoStack = [];
    this.updateHistorySignals();
  }
  undo() {
    if (this.undoStack.length === 0)
      return;
    const currentState = {
      homeTeam: JSON.parse(JSON.stringify(this.homeTeam())),
      awayTeam: JSON.parse(JSON.stringify(this.awayTeam())),
      events: JSON.parse(JSON.stringify(this.events())),
      elapsedSeconds: this.elapsedSeconds(),
      matchInfo: JSON.parse(JSON.stringify(this.matchInfo()))
    };
    this.redoStack.push(currentState);
    const previousState = this.undoStack.pop();
    this.restoreState(previousState);
    this.updateHistorySignals();
  }
  redo() {
    if (this.redoStack.length === 0)
      return;
    const currentState = {
      homeTeam: JSON.parse(JSON.stringify(this.homeTeam())),
      awayTeam: JSON.parse(JSON.stringify(this.awayTeam())),
      events: JSON.parse(JSON.stringify(this.events())),
      elapsedSeconds: this.elapsedSeconds(),
      matchInfo: JSON.parse(JSON.stringify(this.matchInfo()))
    };
    this.undoStack.push(currentState);
    const nextState = this.redoStack.pop();
    this.restoreState(nextState);
    this.updateHistorySignals();
  }
  restoreState(state) {
    this.homeTeam.set(state.homeTeam);
    this.awayTeam.set(state.awayTeam);
    this.events.set(state.events);
    this.elapsedSeconds.set(state.elapsedSeconds);
    this.matchInfo.set(__spreadProps(__spreadValues({}, state.matchInfo), {
      date: new Date(state.matchInfo.date)
    }));
  }
  updateHistorySignals() {
    this.canUndo.set(this.undoStack.length > 0);
    this.canRedo.set(this.redoStack.length > 0);
  }
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
  // ============ Match Info Updates ============
  updateMatchStatus(status) {
    this.saveToHistory();
    this.matchInfo.update((info) => __spreadProps(__spreadValues({}, info), { status }));
    if (status === "finished" || status === "cancelled" || status === "postponed") {
      this.pauseTimer();
    }
  }
  updateMatchDate(date) {
    if (date) {
      this.saveToHistory();
      this.matchInfo.update((info) => __spreadProps(__spreadValues({}, info), { date }));
    }
  }
  updateMatchTime(time) {
    this.saveToHistory();
    this.matchInfo.update((info) => __spreadProps(__spreadValues({}, info), { time }));
  }
  updateVenue(venue) {
    this.saveToHistory();
    this.matchInfo.update((info) => __spreadProps(__spreadValues({}, info), { venue }));
  }
  updateLeague(league) {
    this.saveToHistory();
    this.matchInfo.update((info) => __spreadProps(__spreadValues({}, info), { league }));
  }
  // ============ Team Updates ============
  updateTeamName(teamId, name) {
    this.saveToHistory();
    const teamSignal = teamId === "home" ? this.homeTeam : this.awayTeam;
    teamSignal.update((team) => __spreadProps(__spreadValues({}, team), { name }));
  }
  updateTeamScore(teamId, score) {
    this.saveToHistory();
    const teamSignal = teamId === "home" ? this.homeTeam : this.awayTeam;
    teamSignal.update((team) => __spreadProps(__spreadValues({}, team), { score: Math.max(0, score) }));
  }
  // ============ Player Management ============
  addPlayer(teamId) {
    this.saveToHistory();
    const teamSignal = teamId === "home" ? this.homeTeam : this.awayTeam;
    const newPlayer = {
      id: crypto.randomUUID(),
      number: this.getNextPlayerNumber(teamSignal()),
      name: "New Player",
      position: "MID",
      teamId
    };
    teamSignal.update((team) => __spreadProps(__spreadValues({}, team), {
      players: [newPlayer, ...team.players]
      // Add at beginning
    }));
  }
  removePlayer(teamId, playerId) {
    this.saveToHistory();
    const teamSignal = teamId === "home" ? this.homeTeam : this.awayTeam;
    teamSignal.update((team) => __spreadProps(__spreadValues({}, team), {
      players: team.players.filter((p) => p.id !== playerId)
    }));
  }
  updatePlayer(teamId, playerId, field, value) {
    this.saveToHistory();
    const teamSignal = teamId === "home" ? this.homeTeam : this.awayTeam;
    teamSignal.update((team) => __spreadProps(__spreadValues({}, team), {
      players: team.players.map((p) => p.id === playerId ? __spreadProps(__spreadValues({}, p), { [field]: value }) : p)
    }));
  }
  getNextPlayerNumber(team) {
    const usedNumbers = team.players.map((p) => p.number);
    for (let i = 1; i <= 99; i++) {
      if (!usedNumbers.includes(i))
        return i;
    }
    return 99;
  }
  // ============ Event Logging ============
  logEvent(type, player, team) {
    this.saveToHistory();
    const event = {
      id: crypto.randomUUID(),
      time: this.formattedTime(),
      type,
      player,
      team
    };
    this.events.update((events) => [event, ...events]);
    if (type === "goal") {
      if (team.id === "home") {
        this.homeTeam.update((t) => __spreadProps(__spreadValues({}, t), { score: t.score + 1 }));
      } else {
        this.awayTeam.update((t) => __spreadProps(__spreadValues({}, t), { score: t.score + 1 }));
      }
    }
  }
  removeEvent(eventId) {
    this.saveToHistory();
    const event = this.events().find((e) => e.id === eventId);
    if (event?.type === "goal") {
      if (event.team.id === "home") {
        this.homeTeam.update((t) => __spreadProps(__spreadValues({}, t), { score: Math.max(0, t.score - 1) }));
      } else {
        this.awayTeam.update((t) => __spreadProps(__spreadValues({}, t), { score: Math.max(0, t.score - 1) }));
      }
    }
    this.events.update((events) => events.filter((e) => e.id !== eventId));
  }
  clearAllEvents() {
    this.saveToHistory();
    this.events.set([]);
    this.homeTeam.update((t) => __spreadProps(__spreadValues({}, t), { score: 0 }));
    this.awayTeam.update((t) => __spreadProps(__spreadValues({}, t), { score: 0 }));
  }
  // ============ UI Helpers ============
  getStatusLabel(status) {
    const labels = {
      scheduled: "Scheduled",
      live: "Live",
      finished: "Finished",
      rescheduled: "Rescheduled",
      postponed: "Postponed",
      cancelled: "Cancelled"
    };
    return labels[status];
  }
  getPositionLabel(position) {
    const labels = {
      GK: "Goalkeeper",
      DEF: "Defender",
      MID: "Midfielder",
      FWD: "Forward"
    };
    return labels[position] || position;
  }
  getEventIcon(type) {
    const icons = {
      goal: "sports_soccer",
      assist: "sync_alt",
      yellow_card: "square",
      red_card: "square",
      substitution: "swap_horiz"
    };
    return icons[type];
  }
  getEventColor(type) {
    const colors = {
      goal: "#4ade80",
      assist: "#60a5fa",
      yellow_card: "#facc15",
      red_card: "#f87171",
      substitution: "#a78bfa"
    };
    return colors[type];
  }
  getEventLabel(type) {
    const labels = {
      goal: "Goal",
      assist: "Assist",
      yellow_card: "Yellow Card",
      red_card: "Red Card",
      substitution: "Substitution"
    };
    return labels[type];
  }
  static \u0275fac = function LiveMatchLogger_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LiveMatchLogger)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LiveMatchLogger, selectors: [["app-live-match-logger"]], decls: 63, vars: 28, consts: [["datePicker", ""], ["minutesInput", ""], [1, "flex", "min-h-full", "flex-col", "gap-6", "p-4", "md:p-6"], [1, "flex", "items-center", "justify-between", "gap-4"], [1, "text-2xl", "font-bold"], [1, "flex", "items-center", "gap-2"], [1, "mr-4", "flex", "items-center", "gap-1"], ["matIconButton", "", "matTooltip", "Undo (Ctrl+Z)", 1, "undo-btn", 3, "click", "disabled"], ["matIconButton", "", "matTooltip", "Redo (Ctrl+Y)", 1, "redo-btn", 3, "click", "disabled"], ["color", "primary", 3, "ngModelChange", "ngModel"], [1, "card", "flex", "flex-wrap", "items-center", "justify-between", "gap-4", "rounded-xl", "p-4"], [1, "flex", "items-center", "gap-3"], [1, "text-secondary"], [1, "text-secondary", "text-sm"], [1, "font-medium"], [1, "status-chip"], [1, "score-header"], [1, "card", "flex", "min-w-[140px]", "flex-1", "flex-col", "items-center", "gap-3", "rounded-xl", "p-4", "sm:flex-row", "md:p-6"], [1, "h-14", "w-14", "sm:h-16", "sm:w-16", 3, "alt", "src"], [1, "text-center", "sm:text-left"], [1, "text-secondary", "text-sm", "font-medium"], [1, "text-lg", "font-bold", "md:text-xl"], [1, "text-primary", "text-3xl", "font-black", "md:text-4xl"], [1, "timer-card", "rounded-xl", "p-4"], [1, "flex", "items-center", "justify-center", "gap-2"], [1, "flex", "justify-center"], [1, "time-edit-container"], ["title", "Click to edit time", 1, "time-display", "my-2", "text-center", "font-mono", "text-3xl", "font-bold", "md:text-4xl"], [1, "timer-controls"], [1, "card", "flex", "min-w-[140px]", "flex-1", "flex-col-reverse", "items-center", "justify-end", "gap-3", "rounded-xl", "p-4", "sm:flex-row", "md:p-6"], [1, "text-center", "sm:text-right"], [1, "mb-4", "px-2", "text-xl", "font-bold"], [1, "card", "overflow-hidden", "rounded-xl", "border", "border-(--mat-sys-outline-variant)"], [1, "text-secondary", "p-8", "text-center"], [1, "overflow-x-auto"], [1, "flex", "flex-wrap", "gap-3"], ["matButton", "outlined", 3, "click"], [1, "mr-2"], [1, "grid", "grid-cols-1", "gap-4", "py-4", "md:grid-cols-2", "lg:grid-cols-3"], ["appearance", "outline"], [3, "selectionChange", "value"], ["value", "scheduled"], ["value", "live"], ["value", "finished"], ["value", "rescheduled"], ["value", "postponed"], ["value", "cancelled"], ["matInput", "", 3, "dateChange", "matDatepicker", "value"], ["matIconSuffix", "", 3, "for"], ["matInput", "", "type", "time", 3, "change", "value"], ["matInput", "", 3, "change", "value"], [1, "py-4"], [1, "mb-4", "flex", "flex-wrap", "gap-4"], ["appearance", "outline", 1, "min-w-[200px]", "flex-1"], ["appearance", "outline", 1, "w-24"], ["matInput", "", "type", "number", "min", "0", 3, "change", "value"], [1, "my-4!"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "font-semibold"], [1, "players-grid"], [1, "player-card"], [1, "player-card-header"], [1, "player-number"], ["matIconButton", "", "color", "warn", 3, "click"], [1, "text-lg!"], ["appearance", "outline", 1, "w-full"], [1, "flex", "flex-col", "gap-2"], ["appearance", "outline", 1, "w-20"], ["matInput", "", "type", "number", 3, "change", "value"], ["appearance", "outline", 1, "flex-1"], ["value", "GK"], ["value", "DEF"], ["value", "MID"], ["value", "FWD"], ["matIconButton", "", "color", "warn", 1, "h-8!", "w-8!", 3, "click"], [1, "relative", "flex", "h-3", "w-3"], [1, "absolute", "inline-flex", "h-full", "w-full", "animate-ping", "rounded-full", "bg-green-400", "opacity-75"], [1, "relative", "inline-flex", "h-3", "w-3", "rounded-full", "bg-green-500"], [1, "text-primary", "text-sm", "font-semibold", "uppercase"], ["type", "number", "min", "0", "max", "999", 1, "time-input", 3, "input", "keydown.enter", "keydown.escape", "value"], [1, "time-edit-separator"], ["type", "number", "min", "0", "max", "59", 1, "time-input", 3, "input", "keydown.enter", "keydown.escape", "value"], [1, "time-edit-actions"], ["matIconButton", "", "color", "primary", 1, "h-8!", "w-8!", 3, "click"], ["matIconButton", "", 1, "h-8!", "w-8!", 3, "click"], ["title", "Click to edit time", 1, "time-display", "my-2", "text-center", "font-mono", "text-3xl", "font-bold", "md:text-4xl", 3, "click"], ["matIconButton", ""], ["matFab", "mini"], ["matIconButton", "", 3, "click"], ["matFab", "mini", 3, "click"], [1, "grid", "grid-cols-1", "gap-4", "lg:grid-cols-2"], [1, "card", "rounded-xl", "border", "border-(--mat-sys-outline-variant)", "p-4"], [1, "mb-3", "px-2", "text-lg", "font-semibold"], [1, "space-y-1"], [1, "player-row", "grid", "grid-cols-[1fr_auto]", "items-center", "gap-2", "rounded-lg", "p-2"], [1, "text-sm", "md:text-base"], [1, "text-secondary", "text-xs"], [1, "flex", "flex-wrap", "items-center", "gap-1", "md:gap-2"], [1, "action-btn", "goal", 3, "click"], [1, "action-btn", "assist", 3, "click"], [1, "action-btn", "yellow", 3, "click"], [1, "action-btn", "red", 3, "click"], [1, "mb-2", "text-5xl!", "opacity-50"], [1, "w-full"], [1, "table-header"], [1, "w-24", "px-4", "py-3", "text-left", "text-xs", "font-medium", "tracking-wider", "uppercase"], [1, "w-32", "px-4", "py-3", "text-left", "text-xs", "font-medium", "tracking-wider", "uppercase"], [1, "px-4", "py-3", "text-left", "text-xs", "font-medium", "tracking-wider", "uppercase"], [1, "w-20", "px-4", "py-3", "text-right", "text-xs", "font-medium", "tracking-wider", "uppercase"], [1, "divide-y", "divide-(--mat-sys-outline-variant)"], [1, "text-secondary", "px-4", "py-3", "font-mono", "text-sm", "whitespace-nowrap"], [1, "px-4", "py-3", "whitespace-nowrap"], [1, "inline-flex", "items-center", "gap-2", "text-sm", "font-semibold"], [1, "text-base!"], [1, "px-4", "py-3", "text-sm", "whitespace-nowrap"], [1, "text-secondary", "px-4", "py-3", "text-sm", "whitespace-nowrap"], [1, "px-4", "py-3", "text-right", "whitespace-nowrap"], ["matIconButton", "", "aria-label", "Remove event", 1, "h-8!", "w-8!", 3, "click"], [1, "text-lg!", "text-red-400"]], template: function LiveMatchLogger_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1", 4);
      \u0275\u0275text(3, "Match Control Panel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 5)(5, "div", 6)(6, "button", 7);
      \u0275\u0275listener("click", function LiveMatchLogger_Template_button_click_6_listener() {
        return ctx.undo();
      });
      \u0275\u0275elementStart(7, "mat-icon");
      \u0275\u0275text(8, "undo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 8);
      \u0275\u0275listener("click", function LiveMatchLogger_Template_button_click_9_listener() {
        return ctx.redo();
      });
      \u0275\u0275elementStart(10, "mat-icon");
      \u0275\u0275text(11, "redo");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "mat-slide-toggle", 9);
      \u0275\u0275twoWayListener("ngModelChange", function LiveMatchLogger_Template_mat_slide_toggle_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.showAdminPanel, $event) || (ctx.showAdminPanel = $event);
        return $event;
      });
      \u0275\u0275text(13, " Admin Mode ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(14, LiveMatchLogger_Conditional_14_Template, 24, 0, "section");
      \u0275\u0275elementStart(15, "div", 10)(16, "div", 11)(17, "mat-icon", 12);
      \u0275\u0275text(18, "event");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div")(20, "p", 13);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "p", 14);
      \u0275\u0275text(23);
      \u0275\u0275pipe(24, "date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "p", 13);
      \u0275\u0275text(26);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 5)(28, "span", 15);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(30, LiveMatchLogger_Conditional_30_Template, 97, 15, "mat-accordion");
      \u0275\u0275elementStart(31, "div", 16)(32, "div", 17);
      \u0275\u0275element(33, "img", 18);
      \u0275\u0275elementStart(34, "div", 19)(35, "p", 20);
      \u0275\u0275text(36, "Home");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "p", 21);
      \u0275\u0275text(38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "p", 22);
      \u0275\u0275text(40);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 23);
      \u0275\u0275conditionalCreate(42, LiveMatchLogger_Conditional_42_Template, 6, 0, "div", 24)(43, LiveMatchLogger_Conditional_43_Template, 3, 3, "div", 25);
      \u0275\u0275conditionalCreate(44, LiveMatchLogger_Conditional_44_Template, 13, 2, "div", 26)(45, LiveMatchLogger_Conditional_45_Template, 2, 1, "p", 27);
      \u0275\u0275conditionalCreate(46, LiveMatchLogger_Conditional_46_Template, 6, 1, "div", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "div", 29)(48, "div", 30)(49, "p", 20);
      \u0275\u0275text(50, "Away");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "p", 21);
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "p", 22);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(55, "img", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(56, LiveMatchLogger_Conditional_56_Template, 16, 2, "section");
      \u0275\u0275elementStart(57, "section")(58, "h2", 31);
      \u0275\u0275text(59, "Event Log");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 32);
      \u0275\u0275conditionalCreate(61, LiveMatchLogger_Conditional_61_Template, 5, 0, "div", 33)(62, LiveMatchLogger_Conditional_62_Template, 17, 0, "div", 34);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", !ctx.canUndo());
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", !ctx.canRedo());
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.showAdminPanel);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showAdminPanel ? 14 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.matchInfo().league);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(24, 25, ctx.matchInfo().date, "fullDate"), " \u2022 ", ctx.matchInfo().time, " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.matchInfo().venue);
      \u0275\u0275advance(2);
      \u0275\u0275classMap("status-" + ctx.matchInfo().status);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getStatusLabel(ctx.matchInfo().status), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAdminPanel ? 30 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("alt", ctx.homeTeam().name + " Logo")("src", ctx.homeTeam().logo, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.homeTeam().name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.homeTeam().score);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.matchInfo().status === "live" ? 42 : 43);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isEditingTime ? 44 : 45);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.matchInfo().status === "live" || ctx.matchInfo().status === "scheduled" ? 46 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.awayTeam().name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.awayTeam().score);
      \u0275\u0275advance();
      \u0275\u0275property("alt", ctx.awayTeam().name + " Logo")("src", ctx.awayTeam().logo, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.matchInfo().status === "live" ? 56 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.events().length === 0 ? 61 : 62);
    }
  }, dependencies: [
    FormsModule,
    NgControlStatus,
    NgModel,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatFabButton,
    MatMenuModule,
    MatSelectModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatSelect,
    MatOption,
    MatInputModule,
    MatInput,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatDividerModule,
    MatDivider,
    MatExpansionModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatSlideToggleModule,
    MatSlideToggle,
    MatTooltipModule,
    MatTooltip,
    DatePipe
  ], styles: ["\n\n.card[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-surface-container);\n}\n.score-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n@media (min-width: 768px) {\n  .score-header[_ngcontent-%COMP%] {\n    flex-direction: row;\n  }\n}\n.score-card[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n@media (min-width: 768px) {\n  .score-card[_ngcontent-%COMP%] {\n    flex: 1;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n  }\n  .score-card[_ngcontent-%COMP%]:last-child {\n    align-items: flex-end;\n  }\n}\n.timer-card[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 10%, transparent);\n}\n@media (min-width: 768px) {\n  .timer-card[_ngcontent-%COMP%] {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n  }\n}\n.timer-controls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n}\n.time-display[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 4px 12px;\n  border-radius: 8px;\n  transition: background-color 0.2s;\n}\n.time-display[_ngcontent-%COMP%]:hover {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);\n}\n.time-edit-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  margin: 8px 0;\n}\n.time-input[_ngcontent-%COMP%] {\n  width: 60px;\n  padding: 8px;\n  font-size: 24px;\n  font-weight: bold;\n  font-family: monospace;\n  text-align: center;\n  border: 2px solid var(--mat-sys-primary);\n  border-radius: 8px;\n  background: var(--mat-sys-surface);\n  color: var(--mat-sys-on-surface);\n}\n.time-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--mat-sys-primary);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--mat-sys-primary) 25%, transparent);\n}\n.time-input[_ngcontent-%COMP%] {\n}\n.time-input[_ngcontent-%COMP%]::-webkit-outer-spin-button, \n.time-input[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.time-input[_ngcontent-%COMP%] {\n  -moz-appearance: textfield;\n}\n.time-edit-separator[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  color: var(--mat-sys-on-surface);\n}\n.time-edit-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin-left: 8px;\n}\n.undo-btn[_ngcontent-%COMP%]:not(:disabled), \n.redo-btn[_ngcontent-%COMP%]:not(:disabled) {\n  color: var(--mat-sys-primary);\n}\n.undo-btn[_ngcontent-%COMP%]:disabled, \n.redo-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n}\n.table-header[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-surface-container-high);\n  color: var(--mat-sys-on-surface-variant);\n}\n.player-row[_ngcontent-%COMP%]:hover {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 8%, transparent);\n}\n.player-edit-row[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-surface-container-low);\n}\n.players-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  gap: 16px;\n}\n@media (min-width: 640px) {\n  .players-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (min-width: 1024px) {\n  .players-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n.player-card[_ngcontent-%COMP%] {\n  background-color: var(--mat-sys-surface-container);\n  border: 1px solid var(--mat-sys-outline-variant);\n  border-radius: 12px;\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.player-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--mat-sys-primary);\n  box-shadow: 0 2px 8px color-mix(in srgb, var(--mat-sys-primary) 20%, transparent);\n}\n.player-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.player-number[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: bold;\n  color: var(--mat-sys-primary);\n}\n.status-chip[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.status-chip.status-scheduled[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #3b82f6 20%, transparent);\n  color: #60a5fa;\n}\n.status-chip.status-live[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #22c55e 20%, transparent);\n  color: #4ade80;\n}\n.status-chip.status-finished[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #6b7280 20%, transparent);\n  color: #9ca3af;\n}\n.status-chip.status-rescheduled[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #f59e0b 20%, transparent);\n  color: #fbbf24;\n}\n.status-chip.status-postponed[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #8b5cf6 20%, transparent);\n  color: #a78bfa;\n}\n.status-chip.status-cancelled[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #ef4444 20%, transparent);\n  color: #f87171;\n}\n.action-btn[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  font-size: 11px;\n  font-weight: 600;\n  border-radius: 6px;\n  transition: all 0.15s ease;\n}\n.action-btn.goal[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #22c55e 20%, transparent);\n  color: #4ade80;\n}\n.action-btn.goal[_ngcontent-%COMP%]:hover {\n  background-color: color-mix(in srgb, #22c55e 30%, transparent);\n}\n.action-btn.assist[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #3b82f6 20%, transparent);\n  color: #60a5fa;\n}\n.action-btn.assist[_ngcontent-%COMP%]:hover {\n  background-color: color-mix(in srgb, #3b82f6 30%, transparent);\n}\n.action-btn.yellow[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #eab308 20%, transparent);\n  color: #facc15;\n}\n.action-btn.yellow[_ngcontent-%COMP%]:hover {\n  background-color: color-mix(in srgb, #eab308 30%, transparent);\n}\n.action-btn.red[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #ef4444 20%, transparent);\n  color: #f87171;\n}\n.action-btn.red[_ngcontent-%COMP%]:hover {\n  background-color: color-mix(in srgb, #ef4444 30%, transparent);\n}\nmat-form-field[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n/*# sourceMappingURL=live-match-logger.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LiveMatchLogger, [{
    type: Component,
    args: [{ selector: "app-live-match-logger", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      DatePipe,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatSelectModule,
      MatInputModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatDividerModule,
      MatExpansionModule,
      MatSlideToggleModule,
      MatTooltipModule
    ], template: `
    <div class="flex min-h-full flex-col gap-6 p-4 md:p-6">
      <!-- Header with Undo/Redo -->
      <div class="flex items-center justify-between gap-4">
        <h1 class="text-2xl font-bold">Match Control Panel</h1>

        <div class="flex items-center gap-2">
          <!-- Undo/Redo Buttons -->
          <div class="mr-4 flex items-center gap-1">
            <button
              matIconButton
              (click)="undo()"
              [disabled]="!canUndo()"
              matTooltip="Undo (Ctrl+Z)"
              class="undo-btn"
            >
              <mat-icon>undo</mat-icon>
            </button>
            <button
              matIconButton
              (click)="redo()"
              [disabled]="!canRedo()"
              matTooltip="Redo (Ctrl+Y)"
              class="redo-btn"
            >
              <mat-icon>redo</mat-icon>
            </button>
          </div>

          <mat-slide-toggle [(ngModel)]="showAdminPanel" color="primary">
            Admin Mode
          </mat-slide-toggle>
        </div>
      </div>

      <!-- Quick Actions (Admin) -->
      @if (showAdminPanel) {
        <section>
          <h2 class="mb-4 px-2 text-xl font-bold">Quick Actions</h2>
          <div class="flex flex-wrap gap-3">
            <button matButton="outlined" (click)="updateMatchStatus('live')">
              <mat-icon>play_circle</mat-icon> Start Match
            </button>
            <button matButton="outlined" (click)="updateMatchStatus('finished')">
              <mat-icon>sports_score</mat-icon> End Match
            </button>
            <button matButton="outlined" (click)="updateMatchStatus('cancelled')">
              <mat-icon>cancel</mat-icon> Cancel Match
            </button>
            <button matButton="outlined" (click)="updateMatchStatus('postponed')">
              <mat-icon>schedule</mat-icon> Postpone Match
            </button>
            <button matButton="outlined" (click)="clearAllEvents()">
              <mat-icon>clear_all</mat-icon> Clear Events
            </button>
          </div>
        </section>
      }

      <!-- Match Info Banner -->
      <div class="card flex flex-wrap items-center justify-between gap-4 rounded-xl p-4">
        <div class="flex items-center gap-3">
          <mat-icon class="text-secondary">event</mat-icon>
          <div>
            <p class="text-secondary text-sm">{{ matchInfo().league }}</p>
            <p class="font-medium">
              {{ matchInfo().date | date: 'fullDate' }} \u2022 {{ matchInfo().time }}
            </p>
            <p class="text-secondary text-sm">{{ matchInfo().venue }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="status-chip" [class]="'status-' + matchInfo().status">
            {{ getStatusLabel(matchInfo().status) }}
          </span>
        </div>
      </div>

      <!-- Admin Panel -->
      @if (showAdminPanel) {
        <mat-accordion>
          <!-- Match Settings -->
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon class="mr-2">settings</mat-icon>
                Match Settings
              </mat-panel-title>
            </mat-expansion-panel-header>

            <div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
              <mat-form-field appearance="outline">
                <mat-label>Match Status</mat-label>
                <mat-select
                  [value]="matchInfo().status"
                  (selectionChange)="updateMatchStatus($event.value)"
                >
                  <mat-option value="scheduled">Scheduled</mat-option>
                  <mat-option value="live">Live</mat-option>
                  <mat-option value="finished">Finished</mat-option>
                  <mat-option value="rescheduled">Rescheduled</mat-option>
                  <mat-option value="postponed">Postponed</mat-option>
                  <mat-option value="cancelled">Cancelled</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Match Date</mat-label>
                <input
                  matInput
                  [matDatepicker]="datePicker"
                  [value]="matchInfo().date"
                  (dateChange)="updateMatchDate($event.value)"
                />
                <mat-datepicker-toggle matIconSuffix [for]="datePicker" />
                <mat-datepicker #datePicker />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Match Time</mat-label>
                <input
                  matInput
                  type="time"
                  [value]="matchInfo().time"
                  (change)="updateMatchTime($any($event.target).value)"
                />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Venue</mat-label>
                <input
                  matInput
                  [value]="matchInfo().venue"
                  (change)="updateVenue($any($event.target).value)"
                />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>League</mat-label>
                <input
                  matInput
                  [value]="matchInfo().league"
                  (change)="updateLeague($any($event.target).value)"
                />
              </mat-form-field>
            </div>
          </mat-expansion-panel>

          <!-- Home Team Management -->
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon class="mr-2">groups</mat-icon>
                {{ homeTeam().name }} (Home)
              </mat-panel-title>
              <!-- <mat-panel-description>
                {{ homeTeam().players.length }} players
              </mat-panel-description> -->
            </mat-expansion-panel-header>

            <div class="py-4">
              <div class="mb-4 flex flex-wrap gap-4">
                <mat-form-field appearance="outline" class="min-w-[200px] flex-1">
                  <mat-label>Team Name</mat-label>
                  <input
                    matInput
                    [value]="homeTeam().name"
                    (change)="updateTeamName('home', $any($event.target).value)"
                  />
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-24">
                  <mat-label>Score</mat-label>
                  <input
                    matInput
                    type="number"
                    min="0"
                    [value]="homeTeam().score"
                    (change)="updateTeamScore('home', +$any($event.target).value)"
                  />
                </mat-form-field>
              </div>

              <mat-divider class="my-4!" />

              <div class="mb-4 flex items-center justify-between">
                <h4 class="font-semibold">Players ({{ homeTeam().players.length }})</h4>
                <button matButton="outlined" (click)="addPlayer('home')">
                  <mat-icon>add</mat-icon> Add Player
                </button>
              </div>

              <div class="players-grid">
                @for (player of homeTeam().players; track player.id) {
                  <div class="player-card">
                    <div class="player-card-header">
                      <span class="player-number">#{{ player.number }}</span>
                      <button matIconButton color="warn" (click)="removePlayer('home', player.id)">
                        <mat-icon class="text-lg!">delete</mat-icon>
                      </button>
                    </div>
                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Name</mat-label>
                      <input
                        matInput
                        [value]="player.name"
                        (change)="
                          updatePlayer('home', player.id, 'name', $any($event.target).value)
                        "
                      />
                    </mat-form-field>
                    <div class="flex flex-col gap-2">
                      <mat-form-field appearance="outline" class="w-20">
                        <mat-label>#</mat-label>
                        <input
                          matInput
                          type="number"
                          [value]="player.number"
                          (change)="
                            updatePlayer('home', player.id, 'number', +$any($event.target).value)
                          "
                        />
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="flex-1">
                        <mat-label>Position</mat-label>
                        <mat-select
                          [value]="player.position"
                          (selectionChange)="
                            updatePlayer('home', player.id, 'position', $event.value)
                          "
                        >
                          <mat-option value="GK">GK</mat-option>
                          <mat-option value="DEF">DEF</mat-option>
                          <mat-option value="MID">MID</mat-option>
                          <mat-option value="FWD">FWD</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>
                }
              </div>
            </div>
          </mat-expansion-panel>

          <!-- Away Team Management -->
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon class="mr-2">groups</mat-icon>
                {{ awayTeam().name }} (Away)
              </mat-panel-title>
              <!-- <mat-panel-description>
                {{ awayTeam().players.length }} players
              </mat-panel-description> -->
            </mat-expansion-panel-header>

            <div class="py-4">
              <div class="mb-4 flex flex-wrap gap-4">
                <mat-form-field appearance="outline" class="min-w-[200px] flex-1">
                  <mat-label>Team Name</mat-label>
                  <input
                    matInput
                    [value]="awayTeam().name"
                    (change)="updateTeamName('away', $any($event.target).value)"
                  />
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-24">
                  <mat-label>Score</mat-label>
                  <input
                    matInput
                    type="number"
                    min="0"
                    [value]="awayTeam().score"
                    (change)="updateTeamScore('away', +$any($event.target).value)"
                  />
                </mat-form-field>
              </div>

              <mat-divider class="my-4!" />

              <div class="mb-4 flex items-center justify-between">
                <h4 class="font-semibold">Players ({{ awayTeam().players.length }})</h4>
                <button matButton="outlined" (click)="addPlayer('away')">
                  <mat-icon>add</mat-icon> Add Player
                </button>
              </div>

              <div class="players-grid">
                @for (player of awayTeam().players; track player.id) {
                  <div class="player-card">
                    <div class="player-card-header">
                      <span class="player-number">#{{ player.number }}</span>
                      <button
                        matIconButton
                        color="warn"
                        (click)="removePlayer('away', player.id)"
                        class="h-8! w-8!"
                      >
                        <mat-icon class="text-lg!">close</mat-icon>
                      </button>
                    </div>
                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Name</mat-label>
                      <input
                        matInput
                        [value]="player.name"
                        (change)="
                          updatePlayer('away', player.id, 'name', $any($event.target).value)
                        "
                      />
                    </mat-form-field>
                    <div class="flex flex-col gap-2">
                      <mat-form-field appearance="outline" class="w-20">
                        <mat-label>#</mat-label>
                        <input
                          matInput
                          type="number"
                          [value]="player.number"
                          (change)="
                            updatePlayer('away', player.id, 'number', +$any($event.target).value)
                          "
                        />
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="flex-1">
                        <mat-label>Position</mat-label>
                        <mat-select
                          [value]="player.position"
                          (selectionChange)="
                            updatePlayer('away', player.id, 'position', $event.value)
                          "
                        >
                          <mat-option value="GK">GK</mat-option>
                          <mat-option value="DEF">DEF</mat-option>
                          <mat-option value="MID">MID</mat-option>
                          <mat-option value="FWD">FWD</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>
                }
              </div>
            </div>
          </mat-expansion-panel>
        </mat-accordion>
      }

      <!-- Score Header -->
      <div class="score-header">
        <!-- Home Team Score -->
        <!-- <div class="score-card card rounded-xl p-4">
          <p class="text-secondary text-sm font-medium">{{ homeTeam().name }}</p>
          <p class="text-4xl md:text-5xl font-bold">{{ homeTeam().score }}</p>
        </div> -->
        <div
          class="card flex min-w-[140px] flex-1 flex-col items-center gap-3 rounded-xl p-4 sm:flex-row md:p-6"
        >
          <img
            class="h-14 w-14 sm:h-16 sm:w-16"
            [alt]="homeTeam().name + ' Logo'"
            [src]="homeTeam().logo"
          />
          <div class="text-center sm:text-left">
            <p class="text-secondary text-sm font-medium">Home</p>
            <p class="text-lg font-bold md:text-xl">{{ homeTeam().name }}</p>
            <p class="text-primary text-3xl font-black md:text-4xl">{{ homeTeam().score }}</p>
          </div>
        </div>

        <!-- Timer -->
        <div class="timer-card rounded-xl p-4">
          @if (matchInfo().status === 'live') {
            <div class="flex items-center justify-center gap-2">
              <span class="relative flex h-3 w-3">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
                ></span>
                <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>
              <p class="text-primary text-sm font-semibold uppercase">Live</p>
            </div>
          } @else {
            <div class="flex justify-center">
              <span class="status-chip" [class]="'status-' + matchInfo().status">
                {{ getStatusLabel(matchInfo().status) }}
              </span>
            </div>
          }
          <!-- Editable Time Display -->
          @if (isEditingTime) {
            <div class="time-edit-container">
              <input
                type="number"
                min="0"
                max="999"
                class="time-input"
                [value]="editMinutes"
                (input)="editMinutes = +$any($event.target).value"
                (keydown.enter)="saveTime()"
                (keydown.escape)="cancelTimeEdit()"
                #minutesInput
              />
              <span class="time-edit-separator">:</span>
              <input
                type="number"
                min="0"
                max="59"
                class="time-input"
                [value]="editSeconds"
                (input)="editSeconds = +$any($event.target).value"
                (keydown.enter)="saveTime()"
                (keydown.escape)="cancelTimeEdit()"
              />
              <div class="time-edit-actions">
                <button matIconButton color="primary" (click)="saveTime()" class="h-8! w-8!">
                  <mat-icon class="text-lg!">check</mat-icon>
                </button>
                <button matIconButton (click)="cancelTimeEdit()" class="h-8! w-8!">
                  <mat-icon class="text-lg!">close</mat-icon>
                </button>
              </div>
            </div>
          } @else {
            <p
              class="time-display my-2 text-center font-mono text-3xl font-bold md:text-4xl"
              (click)="startTimeEdit()"
              title="Click to edit time"
            >
              {{ formattedTime() }}
            </p>
          }
          @if (matchInfo().status === 'live' || matchInfo().status === 'scheduled') {
            <div class="timer-controls">
              @if (isRunning()) {
                <button matIconButton (click)="pauseTimer()">
                  <mat-icon>pause</mat-icon>
                </button>
              } @else {
                <button matFab="mini" (click)="startTimer()">
                  <mat-icon>play_arrow</mat-icon>
                </button>
              }
              <button matIconButton (click)="resetTimer()">
                <mat-icon>restart_alt</mat-icon>
              </button>
            </div>
          }
        </div>

        <!-- Away Team Score -->
        <!-- <div class="score-card card rounded-xl p-4">
          <p class="text-secondary text-sm font-medium text-right md:text-left">{{ awayTeam().name }}</p>
          <p class="text-4xl md:text-5xl font-bold">{{ awayTeam().score }}</p>
        </div> -->
        <div
          class="card flex min-w-[140px] flex-1 flex-col-reverse items-center justify-end gap-3 rounded-xl p-4 sm:flex-row md:p-6"
        >
          <div class="text-center sm:text-right">
            <p class="text-secondary text-sm font-medium">Away</p>
            <p class="text-lg font-bold md:text-xl">{{ awayTeam().name }}</p>
            <p class="text-primary text-3xl font-black md:text-4xl">{{ awayTeam().score }}</p>
          </div>
          <img
            class="h-14 w-14 sm:h-16 sm:w-16"
            [alt]="awayTeam().name + ' Logo'"
            [src]="awayTeam().logo"
          />
        </div>
      </div>

      <!-- Team Lineups & Actions -->
      @if (matchInfo().status === 'live') {
        <section>
          <h2 class="mb-4 px-2 text-xl font-bold">Team Lineups & Actions</h2>
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <!-- Home Team -->
            <div class="card rounded-xl border border-(--mat-sys-outline-variant) p-4">
              <h3 class="mb-3 px-2 text-lg font-semibold">{{ homeTeam().name }}</h3>
              <div class="space-y-1">
                @for (player of homeTeam().players; track player.id) {
                  <div
                    class="player-row grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg p-2"
                  >
                    <div>
                      <p class="text-sm md:text-base">#{{ player.number }} {{ player.name }}</p>
                      <p class="text-secondary text-xs">{{ getPositionLabel(player.position) }}</p>
                    </div>
                    <div class="flex flex-wrap items-center gap-1 md:gap-2">
                      <button
                        class="action-btn goal"
                        (click)="logEvent('goal', player, homeTeam())"
                      >
                        Goal
                      </button>
                      <button
                        class="action-btn assist"
                        (click)="logEvent('assist', player, homeTeam())"
                      >
                        Assist
                      </button>
                      <button
                        class="action-btn yellow"
                        (click)="logEvent('yellow_card', player, homeTeam())"
                      >
                        Yellow
                      </button>
                      <button
                        class="action-btn red"
                        (click)="logEvent('red_card', player, homeTeam())"
                      >
                        Red
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Away Team -->
            <div class="card rounded-xl border border-(--mat-sys-outline-variant) p-4">
              <h3 class="mb-3 px-2 text-lg font-semibold">{{ awayTeam().name }}</h3>
              <div class="space-y-1">
                @for (player of awayTeam().players; track player.id) {
                  <div
                    class="player-row grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg p-2"
                  >
                    <div>
                      <p class="text-sm md:text-base">#{{ player.number }} {{ player.name }}</p>
                      <p class="text-secondary text-xs">{{ getPositionLabel(player.position) }}</p>
                    </div>
                    <div class="flex flex-wrap items-center gap-1 md:gap-2">
                      <button
                        class="action-btn goal"
                        (click)="logEvent('goal', player, awayTeam())"
                      >
                        Goal
                      </button>
                      <button
                        class="action-btn assist"
                        (click)="logEvent('assist', player, awayTeam())"
                      >
                        Assist
                      </button>
                      <button
                        class="action-btn yellow"
                        (click)="logEvent('yellow_card', player, awayTeam())"
                      >
                        Yellow
                      </button>
                      <button
                        class="action-btn red"
                        (click)="logEvent('red_card', player, awayTeam())"
                      >
                        Red
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
      }

      <!-- Live Event Log -->
      <section>
        <h2 class="mb-4 px-2 text-xl font-bold">Event Log</h2>
        <div class="card overflow-hidden rounded-xl border border-(--mat-sys-outline-variant)">
          @if (events().length === 0) {
            <div class="text-secondary p-8 text-center">
              <mat-icon class="mb-2 text-5xl! opacity-50">sports_soccer</mat-icon>
              <p>No events logged yet. Start the match and log events!</p>
            </div>
          } @else {
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="table-header">
                    <th
                      class="w-24 px-4 py-3 text-left text-xs font-medium tracking-wider uppercase"
                    >
                      Time
                    </th>
                    <th
                      class="w-32 px-4 py-3 text-left text-xs font-medium tracking-wider uppercase"
                    >
                      Event
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                      Player
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                      Team
                    </th>
                    <th
                      class="w-20 px-4 py-3 text-right text-xs font-medium tracking-wider uppercase"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-(--mat-sys-outline-variant)">
                  @for (event of events(); track event.id) {
                    <tr>
                      <td class="text-secondary px-4 py-3 font-mono text-sm whitespace-nowrap">
                        {{ event.time }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span
                          class="inline-flex items-center gap-2 text-sm font-semibold"
                          [style.color]="getEventColor(event.type)"
                        >
                          <mat-icon class="text-base!">{{ getEventIcon(event.type) }}</mat-icon>
                          {{ getEventLabel(event.type) }}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm whitespace-nowrap">
                        #{{ event.player.number }} {{ event.player.name }}
                      </td>
                      <td class="text-secondary px-4 py-3 text-sm whitespace-nowrap">
                        {{ event.team.name }}
                      </td>
                      <td class="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          matIconButton
                          class="h-8! w-8!"
                          (click)="removeEvent(event.id)"
                          aria-label="Remove event"
                        >
                          <mat-icon class="text-lg! text-red-400">delete</mat-icon>
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </section>
    </div>
  `, styles: ["/* angular:styles/component:scss;8c6b4aed6da1ba33bbf700afe6d98490cf013f306dfd8b71d396c949a39888ca;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/matches/pages/live-match-logger/live-match-logger.ts */\n.card {\n  background-color: var(--mat-sys-surface-container);\n}\n.score-header {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n@media (min-width: 768px) {\n  .score-header {\n    flex-direction: row;\n  }\n}\n.score-card {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n@media (min-width: 768px) {\n  .score-card {\n    flex: 1;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n  }\n  .score-card:last-child {\n    align-items: flex-end;\n  }\n}\n.timer-card {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 10%, transparent);\n}\n@media (min-width: 768px) {\n  .timer-card {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n  }\n}\n.timer-controls {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n}\n.time-display {\n  cursor: pointer;\n  padding: 4px 12px;\n  border-radius: 8px;\n  transition: background-color 0.2s;\n}\n.time-display:hover {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);\n}\n.time-edit-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  margin: 8px 0;\n}\n.time-input {\n  width: 60px;\n  padding: 8px;\n  font-size: 24px;\n  font-weight: bold;\n  font-family: monospace;\n  text-align: center;\n  border: 2px solid var(--mat-sys-primary);\n  border-radius: 8px;\n  background: var(--mat-sys-surface);\n  color: var(--mat-sys-on-surface);\n}\n.time-input:focus {\n  outline: none;\n  border-color: var(--mat-sys-primary);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--mat-sys-primary) 25%, transparent);\n}\n.time-input {\n}\n.time-input::-webkit-outer-spin-button,\n.time-input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.time-input {\n  -moz-appearance: textfield;\n}\n.time-edit-separator {\n  font-size: 24px;\n  font-weight: bold;\n  color: var(--mat-sys-on-surface);\n}\n.time-edit-actions {\n  display: flex;\n  gap: 4px;\n  margin-left: 8px;\n}\n.undo-btn:not(:disabled),\n.redo-btn:not(:disabled) {\n  color: var(--mat-sys-primary);\n}\n.undo-btn:disabled,\n.redo-btn:disabled {\n  opacity: 0.4;\n}\n.table-header {\n  background-color: var(--mat-sys-surface-container-high);\n  color: var(--mat-sys-on-surface-variant);\n}\n.player-row:hover {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 8%, transparent);\n}\n.player-edit-row {\n  background-color: var(--mat-sys-surface-container-low);\n}\n.players-grid {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  gap: 16px;\n}\n@media (min-width: 640px) {\n  .players-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (min-width: 1024px) {\n  .players-grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n.player-card {\n  background-color: var(--mat-sys-surface-container);\n  border: 1px solid var(--mat-sys-outline-variant);\n  border-radius: 12px;\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.player-card:hover {\n  border-color: var(--mat-sys-primary);\n  box-shadow: 0 2px 8px color-mix(in srgb, var(--mat-sys-primary) 20%, transparent);\n}\n.player-card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.player-number {\n  font-size: 18px;\n  font-weight: bold;\n  color: var(--mat-sys-primary);\n}\n.status-chip {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.status-chip.status-scheduled {\n  background-color: color-mix(in srgb, #3b82f6 20%, transparent);\n  color: #60a5fa;\n}\n.status-chip.status-live {\n  background-color: color-mix(in srgb, #22c55e 20%, transparent);\n  color: #4ade80;\n}\n.status-chip.status-finished {\n  background-color: color-mix(in srgb, #6b7280 20%, transparent);\n  color: #9ca3af;\n}\n.status-chip.status-rescheduled {\n  background-color: color-mix(in srgb, #f59e0b 20%, transparent);\n  color: #fbbf24;\n}\n.status-chip.status-postponed {\n  background-color: color-mix(in srgb, #8b5cf6 20%, transparent);\n  color: #a78bfa;\n}\n.status-chip.status-cancelled {\n  background-color: color-mix(in srgb, #ef4444 20%, transparent);\n  color: #f87171;\n}\n.action-btn {\n  padding: 4px 10px;\n  font-size: 11px;\n  font-weight: 600;\n  border-radius: 6px;\n  transition: all 0.15s ease;\n}\n.action-btn.goal {\n  background-color: color-mix(in srgb, #22c55e 20%, transparent);\n  color: #4ade80;\n}\n.action-btn.goal:hover {\n  background-color: color-mix(in srgb, #22c55e 30%, transparent);\n}\n.action-btn.assist {\n  background-color: color-mix(in srgb, #3b82f6 20%, transparent);\n  color: #60a5fa;\n}\n.action-btn.assist:hover {\n  background-color: color-mix(in srgb, #3b82f6 30%, transparent);\n}\n.action-btn.yellow {\n  background-color: color-mix(in srgb, #eab308 20%, transparent);\n  color: #facc15;\n}\n.action-btn.yellow:hover {\n  background-color: color-mix(in srgb, #eab308 30%, transparent);\n}\n.action-btn.red {\n  background-color: color-mix(in srgb, #ef4444 20%, transparent);\n  color: #f87171;\n}\n.action-btn.red:hover {\n  background-color: color-mix(in srgb, #ef4444 30%, transparent);\n}\nmat-form-field {\n  font-size: 14px;\n}\n/*# sourceMappingURL=live-match-logger.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LiveMatchLogger, { className: "LiveMatchLogger", filePath: "src/app/features/matches/pages/live-match-logger/live-match-logger.ts", lineNumber: 986 });
})();
export {
  LiveMatchLogger as default
};
//# sourceMappingURL=chunk-7XZZZRSK.js.map
