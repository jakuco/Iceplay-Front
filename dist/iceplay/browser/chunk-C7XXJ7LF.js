import {
  FileUploadComponent,
  PdfViewerComponent
} from "./chunk-BM64NF7H.js";
import {
  MatSnackBar
} from "./chunk-YMDV4HUG.js";
import {
  ChampionshipService
} from "./chunk-BQKVUEWM.js";
import {
  takeUntilDestroyed
} from "./chunk-RSSJKDFU.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-L3H5PFSS.js";
import {
  MatTooltipModule
} from "./chunk-N35N62WD.js";
import {
  MatTooltip
} from "./chunk-5PCYIOFH.js";
import {
  AuthService
} from "./chunk-CTYH5NZ2.js";
import "./chunk-I4DDBC3P.js";
import "./chunk-VMJIIGHX.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-2C543PJY.js";
import "./chunk-DNCNJ5D2.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-XIJO5SZ4.js";
import "./chunk-TWF5BIFR.js";
import {
  MatIcon,
  MatIconModule,
  NgTemplateOutlet
} from "./chunk-2QF6PXYN.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostListener,
  Injectable,
  Input,
  Output,
  ViewChild,
  computed,
  effect,
  forkJoin,
  inject,
  input,
  map,
  of,
  output,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-HGKGTKMW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/core/services/sport.service.ts
var LS_SPORTS = "iceplay_sports";
var DEFAULT_SPORTS = [
  { id: 1, name: "F\xFAtbol", icon: "sports_soccer" },
  { id: 2, name: "B\xE1squetbol", icon: "sports_basketball" },
  { id: 3, name: "Voleibol", icon: "sports_volleyball" },
  { id: 4, name: "Hockey sobre Hielo", icon: "sports_hockey" },
  { id: 5, name: "B\xE9isbol", icon: "sports_baseball" }
];
var SportService = class _SportService {
  getAll() {
    const raw = localStorage.getItem(LS_SPORTS);
    if (!raw) {
      localStorage.setItem(LS_SPORTS, JSON.stringify(DEFAULT_SPORTS));
      return of(DEFAULT_SPORTS);
    }
    try {
      return of(JSON.parse(raw));
    } catch {
      return of(DEFAULT_SPORTS);
    }
  }
  getById(id) {
    const raw = localStorage.getItem(LS_SPORTS);
    const list = raw ? JSON.parse(raw) : DEFAULT_SPORTS;
    return of(list.find((s) => s.id === id) ?? null);
  }
  static \u0275fac = function SportService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SportService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SportService, factory: _SportService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SportService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/admin/pages/championships/championship-components/championship-header.component.ts
var _c0 = ["fileInput"];
var _c1 = ["nameContainer"];
var _c2 = ["sportWrap"];
var _c3 = ["nameInput"];
var _c4 = ["teamsInput"];
var _c5 = ["playersInput"];
var _c6 = ["locationInput"];
var _forTrack0 = ($index, $item) => $item.socialNetworkId;
var _forTrack1 = ($index, $item) => $item.id;
function ChampionshipHeaderComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 9);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.logoPreview(), \u0275\u0275sanitizeUrl);
  }
}
function ChampionshipHeaderComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "mat-icon", 33);
    \u0275\u0275text(2, "emoji_events");
    \u0275\u0275elementEnd()();
  }
}
function ChampionshipHeaderComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "mat-icon", 34);
    \u0275\u0275text(2, "photo_camera");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 35);
    \u0275\u0275text(4, "Cambiar");
    \u0275\u0275elementEnd()();
  }
}
function ChampionshipHeaderComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 16);
    \u0275\u0275text(1, "edit");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipHeaderComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "p", 36);
    \u0275\u0275text(2, " Edita el nombre e informaci\xF3n del campeonato ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 37);
    \u0275\u0275text(4, " Nombre ");
    \u0275\u0275elementStart(5, "span", 38);
    \u0275\u0275text(6, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "input", 39, 2);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_16_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.nameTemp, $event) || (ctx_r1.nameTemp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown.enter", function ChampionshipHeaderComponent_Conditional_16_Template_input_keydown_enter_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyPopover());
    })("keydown.escape", function ChampionshipHeaderComponent_Conditional_16_Template_input_keydown_escape_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePopover());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "label", 37);
    \u0275\u0275text(10, " Descripci\xF3n ");
    \u0275\u0275elementStart(11, "span", 40);
    \u0275\u0275text(12, "(opcional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "textarea", 41);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_16_Template_textarea_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.descriptionTemp, $event) || (ctx_r1.descriptionTemp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown.escape", function ChampionshipHeaderComponent_Conditional_16_Template_textarea_keydown_escape_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePopover());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 42)(15, "button", 43);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_16_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePopover());
    });
    \u0275\u0275text(16, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 44);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_16_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyPopover());
    });
    \u0275\u0275text(18, "Aplicar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.nameTemp);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.descriptionTemp);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.nameTemp.trim());
  }
}
function ChampionshipHeaderComponent_For_19_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 47);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_For_19_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const link_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startEditSocialLink(link_r5));
    });
    \u0275\u0275elementStart(1, "mat-icon", 48);
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "button", 49);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_For_19_Conditional_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const link_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeSocialLink(link_r5.socialNetworkId));
    });
    \u0275\u0275elementStart(4, "mat-icon", 48);
    \u0275\u0275text(5, "close");
    \u0275\u0275elementEnd()();
  }
}
function ChampionshipHeaderComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "a", 45)(2, "mat-icon", 46);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, ChampionshipHeaderComponent_For_19_Conditional_4_Template, 6, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const link_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", link_r5.brandBg)("border-color", link_r5.brandBorder);
    \u0275\u0275property("href", link_r5.link, \u0275\u0275sanitizeUrl)("matTooltip", link_r5.name);
    \u0275\u0275attribute("aria-label", "Abrir " + link_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(link_r5.icon);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.editable() ? 4 : -1);
  }
}
function ChampionshipHeaderComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startAddSocialLink());
    });
    \u0275\u0275elementStart(1, "mat-icon", 46);
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.availableNetworkOptions().length === 0);
  }
}
function ChampionshipHeaderComponent_Conditional_21_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 59);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_21_For_3_Template_button_click_0_listener() {
      const opt_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.socialNetworkDraft = opt_r9.id);
    });
    \u0275\u0275elementStart(1, "mat-icon", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("background", opt_r9.id === ctx_r1.socialNetworkDraft ? opt_r9.brandBg : "#0f1d35")("border-color", opt_r9.id === ctx_r1.socialNetworkDraft ? opt_r9.brandBorder : "rgba(255,255,255,0.2)")("opacity", opt_r9.id === ctx_r1.socialNetworkDraft ? "1" : "0.75");
    \u0275\u0275property("matTooltip", opt_r9.name);
    \u0275\u0275attribute("aria-label", "Seleccionar " + opt_r9.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r9.icon);
  }
}
function ChampionshipHeaderComponent_Conditional_21_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.socialEditorError());
  }
}
function ChampionshipHeaderComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 20);
    \u0275\u0275repeaterCreate(2, ChampionshipHeaderComponent_Conditional_21_For_3_Template, 3, 9, "button", 51, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label", 52)(5, "span", 53);
    \u0275\u0275text(6, "URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_21_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.socialUrlDraft, $event) || (ctx_r1.socialUrlDraft = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, ChampionshipHeaderComponent_Conditional_21_Conditional_8_Template, 2, 1, "p", 55);
    \u0275\u0275elementStart(9, "div", 56)(10, "button", 57);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_21_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelSocialEditor());
    });
    \u0275\u0275text(11, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 58);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_21_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveSocialDraft());
    });
    \u0275\u0275text(13, "Guardar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.editorNetworkOptions());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.socialUrlDraft);
    \u0275\u0275property("placeholder", ctx_r1.socialUrlPlaceholder());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.socialEditorError() ? 8 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.canSaveSocialDraft());
  }
}
function ChampionshipHeaderComponent_Conditional_23_Conditional_8_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 70);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipHeaderComponent_Conditional_23_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_23_Conditional_8_For_2_Template_button_click_0_listener() {
      const s_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectSport(s_r12));
    });
    \u0275\u0275elementStart(1, "mat-icon", 69);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275conditionalCreate(4, ChampionshipHeaderComponent_Conditional_23_Conditional_8_For_2_Conditional_4_Template, 2, 0, "mat-icon", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("bg-blue-500/12", ctx_r1.data().sportId === s_r12.id)("text-blue-300", ctx_r1.data().sportId === s_r12.id)("font-medium", ctx_r1.data().sportId === s_r12.id);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-blue-400", ctx_r1.data().sportId === s_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r12.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r12.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.data().sportId === s_r12.id ? 4 : -1);
  }
}
function ChampionshipHeaderComponent_Conditional_23_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275repeaterCreate(1, ChampionshipHeaderComponent_Conditional_23_Conditional_8_For_2_Template, 5, 11, "button", 67, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.sports());
  }
}
function ChampionshipHeaderComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21, 3)(2, "button", 60);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_23_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sportDropOpen.set(!ctx_r1.sportDropOpen()));
    });
    \u0275\u0275elementStart(3, "mat-icon", 61);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "mat-icon", 62);
    \u0275\u0275text(7, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, ChampionshipHeaderComponent_Conditional_23_Conditional_8_Template, 3, 0, "div", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 64);
    \u0275\u0275text(10, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 65);
    \u0275\u0275text(12, "Temporada\xA0 ");
    \u0275\u0275elementStart(13, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_23_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.seasonModel, $event) || (ctx_r1.seasonModel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.currentSportIcon());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentSportLabel(), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.sportDropOpen());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.sportDropOpen() ? 8 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.seasonModel);
  }
}
function ChampionshipHeaderComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.currentSportLabel(), " \xB7 Temporada ", ctx_r1.data().season);
  }
}
function ChampionshipHeaderComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 71, 4);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_29_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.teamsModel, $event) || (ctx_r1.teamsModel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function ChampionshipHeaderComponent_Conditional_29_Template_input_blur_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editingTeams.set(false));
    })("keydown.enter", function ChampionshipHeaderComponent_Conditional_29_Template_input_keydown_enter_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editingTeams.set(false));
    })("keydown.escape", function ChampionshipHeaderComponent_Conditional_29_Template_input_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editingTeams.set(false));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 72);
    \u0275\u0275text(3, "equipos m\xE1x.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teamsModel);
  }
}
function ChampionshipHeaderComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_30_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editable() && ctx_r1.startEditTeams());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("cursor-pointer", ctx_r1.editable())("border-b", ctx_r1.editable())("border-dashed", ctx_r1.editable())("border-white/18", ctx_r1.editable())("hover:text-white/85", ctx_r1.editable())("hover:border-white/45", ctx_r1.editable());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.data().currentTeams, "/", ctx_r1.data().maxTeams, " equipos ");
  }
}
function ChampionshipHeaderComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 74, 5);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_34_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.playersModel, $event) || (ctx_r1.playersModel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function ChampionshipHeaderComponent_Conditional_34_Template_input_blur_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editingPlayers.set(false));
    })("keydown.enter", function ChampionshipHeaderComponent_Conditional_34_Template_input_keydown_enter_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editingPlayers.set(false));
    })("keydown.escape", function ChampionshipHeaderComponent_Conditional_34_Template_input_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editingPlayers.set(false));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 72);
    \u0275\u0275text(3, "jugadores m\xE1x. por equipo");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.playersModel);
  }
}
function ChampionshipHeaderComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_35_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editable() && ctx_r1.startEditPlayers());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("cursor-pointer", ctx_r1.editable())("border-b", ctx_r1.editable())("border-dashed", ctx_r1.editable())("border-white/18", ctx_r1.editable())("hover:text-white/85", ctx_r1.editable())("hover:border-white/45", ctx_r1.editable());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.data().maxPlayersPerTeam, " jugadores m\xE1x. por equipo ");
  }
}
function ChampionshipHeaderComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 75, 6);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_39_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.locationModel, $event) || (ctx_r1.locationModel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function ChampionshipHeaderComponent_Conditional_39_Template_input_blur_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editingLocation.set(false));
    })("keydown.enter", function ChampionshipHeaderComponent_Conditional_39_Template_input_keydown_enter_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editingLocation.set(false));
    })("keydown.escape", function ChampionshipHeaderComponent_Conditional_39_Template_input_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editingLocation.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.locationModel);
  }
}
function ChampionshipHeaderComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275listener("click", function ChampionshipHeaderComponent_Conditional_40_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editable() && ctx_r1.startEditLocation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("cursor-pointer", ctx_r1.editable())("border-b", ctx_r1.editable())("border-dashed", ctx_r1.editable())("border-white/18", ctx_r1.editable() && ctx_r1.data().location)("text-white/22", !ctx_r1.data().location)("hover:text-white/85", ctx_r1.editable());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.data().location || "Ciudad, Pa\xEDs");
  }
}
function ChampionshipHeaderComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 76);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_44_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.startDateModel, $event) || (ctx_r1.startDateModel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "span", 77);
    \u0275\u0275text(2, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_44_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.endDateModel, $event) || (ctx_r1.endDateModel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.startDateModel);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.endDateModel);
  }
}
function ChampionshipHeaderComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.dateRangeLabel());
  }
}
function ChampionshipHeaderComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 79);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_49_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.regStartModel, $event) || (ctx_r1.regStartModel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "span", 77);
    \u0275\u0275text(2, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipHeaderComponent_Conditional_49_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.regEndModel, $event) || (ctx_r1.regEndModel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.regStartModel);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.regEndModel);
  }
}
function ChampionshipHeaderComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("text-green-400", ctx_r1.registrationStatus() === "open")("text-amber-300", ctx_r1.registrationStatus() === "upcoming")("text-white/35", ctx_r1.registrationStatus() === "closed" || ctx_r1.registrationStatus() === "none");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.regLabel());
  }
}
var STATUS_META = {
  draft: { label: "Borrador", dot: "bg-slate-400", pill: "bg-slate-500/20  text-slate-300   ring-slate-500/30" },
  registration: { label: "Inscripciones", dot: "bg-blue-400", pill: "bg-blue-500/20   text-blue-300    ring-blue-500/30" },
  active: { label: "Activo", dot: "bg-green-400", pill: "bg-green-500/20  text-green-300   ring-green-500/30" },
  finished: { label: "Finalizado", dot: "bg-slate-500", pill: "bg-slate-500/20  text-slate-400   ring-slate-500/30" },
  cancelled: { label: "Cancelado", dot: "bg-red-400", pill: "bg-red-500/20    text-red-300     ring-red-500/30" }
};
var SOCIAL_NETWORK_OPTIONS = [
  {
    id: 1,
    name: "Facebook",
    icon: "thumb_up",
    placeholder: "https://facebook.com/tu-pagina",
    brandBg: "#1877F2",
    brandBorder: "#3B82F6"
  },
  {
    id: 2,
    name: "Instagram",
    icon: "photo_camera",
    placeholder: "https://instagram.com/tu-cuenta",
    brandBg: "linear-gradient(135deg, #F58529, #DD2A7B 45%, #8134AF 75%, #515BD4)",
    brandBorder: "#DD2A7B"
  },
  {
    id: 3,
    name: "X",
    icon: "close",
    placeholder: "https://x.com/tu-cuenta",
    brandBg: "#111827",
    brandBorder: "#374151"
  },
  {
    id: 4,
    name: "TikTok",
    icon: "music_note",
    placeholder: "https://tiktok.com/@tu-cuenta",
    brandBg: "#111827",
    brandBorder: "#14B8A6"
  },
  {
    id: 5,
    name: "YouTube",
    icon: "smart_display",
    placeholder: "https://youtube.com/@tu-canal",
    brandBg: "#FF0000",
    brandBorder: "#EF4444"
  }
];
var ChampionshipHeaderComponent = class _ChampionshipHeaderComponent {
  // ── Inputs ────────────────────────────────────────────────────
  data = input.required(__spreadValues({}, ngDevMode ? { debugName: "data" } : {}));
  sports = input([], __spreadValues({}, ngDevMode ? { debugName: "sports" } : {}));
  editable = input(false, __spreadValues({}, ngDevMode ? { debugName: "editable" } : {}));
  // ── Outputs ───────────────────────────────────────────────────
  dataChange = output();
  logoSelected = output();
  // ── Template refs ─────────────────────────────────────────────
  fileInputRef = viewChild("fileInput", __spreadValues({}, ngDevMode ? { debugName: "fileInputRef" } : {}));
  nameContainerRef = viewChild("nameContainer", __spreadValues({}, ngDevMode ? { debugName: "nameContainerRef" } : {}));
  sportWrapRef = viewChild("sportWrap", __spreadValues({}, ngDevMode ? { debugName: "sportWrapRef" } : {}));
  nameInputRef = viewChild("nameInput", __spreadValues({}, ngDevMode ? { debugName: "nameInputRef" } : {}));
  teamsInputRef = viewChild("teamsInput", __spreadValues({}, ngDevMode ? { debugName: "teamsInputRef" } : {}));
  playersInputRef = viewChild("playersInput", __spreadValues({}, ngDevMode ? { debugName: "playersInputRef" } : {}));
  locationInputRef = viewChild("locationInput", __spreadValues({}, ngDevMode ? { debugName: "locationInputRef" } : {}));
  // ── UI state ──────────────────────────────────────────────────
  popoverOpen = signal(false, __spreadValues({}, ngDevMode ? { debugName: "popoverOpen" } : {}));
  sportDropOpen = signal(false, __spreadValues({}, ngDevMode ? { debugName: "sportDropOpen" } : {}));
  editingTeams = signal(false, __spreadValues({}, ngDevMode ? { debugName: "editingTeams" } : {}));
  editingPlayers = signal(false, __spreadValues({}, ngDevMode ? { debugName: "editingPlayers" } : {}));
  editingLocation = signal(false, __spreadValues({}, ngDevMode ? { debugName: "editingLocation" } : {}));
  logoPreview = signal(null, __spreadValues({}, ngDevMode ? { debugName: "logoPreview" } : {}));
  socialEditorOpen = signal(false, __spreadValues({}, ngDevMode ? { debugName: "socialEditorOpen" } : {}));
  socialEditorError = signal("", __spreadValues({}, ngDevMode ? { debugName: "socialEditorError" } : {}));
  socialEditingNetworkId = signal(null, __spreadValues({}, ngDevMode ? { debugName: "socialEditingNetworkId" } : {}));
  socialNetworkDraft = 1;
  socialUrlDraft = "";
  // ── Editable field mirrors (ngModel) ──────────────────────────
  // Initialized from data() on first render; changes emitted via dataChange output
  nameTemp = "";
  descriptionTemp = "";
  get seasonModel() {
    return this.data().season;
  }
  set seasonModel(v) {
    this.dataChange.emit({ season: v });
  }
  get teamsModel() {
    return this.data().maxTeams;
  }
  set teamsModel(v) {
    this.dataChange.emit({ maxTeams: +v });
  }
  get playersModel() {
    return this.data().maxPlayersPerTeam;
  }
  set playersModel(v) {
    this.dataChange.emit({ maxPlayersPerTeam: +v });
  }
  get locationModel() {
    return this.data().location;
  }
  set locationModel(v) {
    this.dataChange.emit({ location: v });
  }
  get startDateModel() {
    return this.data().startDate;
  }
  set startDateModel(v) {
    this.dataChange.emit({ startDate: v });
  }
  get endDateModel() {
    return this.data().endDate;
  }
  set endDateModel(v) {
    this.dataChange.emit({ endDate: v });
  }
  get regStartModel() {
    return this.data().registrationStartDate;
  }
  set regStartModel(v) {
    this.dataChange.emit({ registrationStartDate: v });
  }
  get regEndModel() {
    return this.data().registrationEndDate;
  }
  set regEndModel(v) {
    this.dataChange.emit({ registrationEndDate: v });
  }
  // ── Computed ──────────────────────────────────────────────────
  registrationStatus = computed(() => {
    const { registrationStartDate: start, registrationEndDate: end } = this.data();
    if (!start && !end)
      return "none";
    const now = Date.now();
    const s = start ? (/* @__PURE__ */ new Date(start + "T00:00:00")).getTime() : null;
    const e = end ? (/* @__PURE__ */ new Date(end + "T23:59:59")).getTime() : null;
    if (s && now < s)
      return "upcoming";
    if (e && now > e)
      return "closed";
    return "open";
  }, __spreadValues({}, ngDevMode ? { debugName: "registrationStatus" } : {}));
  regLabel = computed(() => {
    const { registrationStartDate: start, registrationEndDate: end } = this.data();
    if (!start && !end)
      return "Inscripciones no configuradas";
    const fmt = (iso) => (/* @__PURE__ */ new Date(iso + "T00:00:00")).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
    if (start && end)
      return `Inscr. ${fmt(start)} \u2192 ${fmt(end)}`;
    if (start)
      return `Inscr. desde ${fmt(start)}`;
    return `Inscr. hasta ${fmt(end)}`;
  }, __spreadValues({}, ngDevMode ? { debugName: "regLabel" } : {}));
  currentSportLabel = computed(() => this.sports().find((s) => s.id === this.data().sportId)?.label ?? "Deporte", __spreadValues({}, ngDevMode ? { debugName: "currentSportLabel" } : {}));
  currentSportIcon = computed(() => this.sports().find((s) => s.id === this.data().sportId)?.icon ?? "sports", __spreadValues({}, ngDevMode ? { debugName: "currentSportIcon" } : {}));
  socialLinksView = computed(() => {
    return this.data().socialLinks.map((link) => {
      const meta = SOCIAL_NETWORK_OPTIONS.find((opt) => opt.id === link.socialNetworkId);
      return __spreadProps(__spreadValues({}, link), {
        name: link.name ?? meta?.name ?? `Red ${link.socialNetworkId}`,
        icon: link.icon ?? meta?.icon ?? "link",
        brandBg: meta?.brandBg ?? "#0f1d35",
        brandBorder: meta?.brandBorder ?? "rgba(255,255,255,0.25)"
      });
    });
  }, __spreadValues({}, ngDevMode ? { debugName: "socialLinksView" } : {}));
  availableNetworkOptions = computed(() => {
    const used = new Set(this.data().socialLinks.map((link) => link.socialNetworkId));
    return SOCIAL_NETWORK_OPTIONS.filter((opt) => !used.has(opt.id));
  }, __spreadValues({}, ngDevMode ? { debugName: "availableNetworkOptions" } : {}));
  editorNetworkOptions = computed(() => {
    const editing = this.socialEditingNetworkId();
    const used = new Set(this.data().socialLinks.filter((link) => link.socialNetworkId !== editing).map((link) => link.socialNetworkId));
    return SOCIAL_NETWORK_OPTIONS.filter((opt) => !used.has(opt.id));
  }, __spreadValues({}, ngDevMode ? { debugName: "editorNetworkOptions" } : {}));
  socialUrlPlaceholder = computed(() => {
    const meta = SOCIAL_NETWORK_OPTIONS.find((opt) => opt.id === this.socialNetworkDraft);
    return meta?.placeholder ?? "https://...";
  }, __spreadValues({}, ngDevMode ? { debugName: "socialUrlPlaceholder" } : {}));
  statusLabel() {
    return STATUS_META[this.data().status].label;
  }
  statusDotClass() {
    return STATUS_META[this.data().status].dot;
  }
  statusPillClass() {
    return STATUS_META[this.data().status].pill;
  }
  // ── Click outside ──────────────────────────────────────────────
  onDocClick(e) {
    const t = e.target;
    if (this.popoverOpen()) {
      const c = this.nameContainerRef()?.nativeElement;
      if (c && !c.contains(t))
        this.closePopover();
    }
    if (this.sportDropOpen()) {
      const w = this.sportWrapRef()?.nativeElement;
      if (w && !w.contains(t))
        this.sportDropOpen.set(false);
    }
  }
  // ── Logo ──────────────────────────────────────────────────────
  triggerLogoUpload() {
    this.fileInputRef()?.nativeElement.click();
  }
  onLogoSelected(event) {
    const file = event.target.files?.[0];
    if (!file)
      return;
    const reader = new FileReader();
    reader.onload = (e) => this.logoPreview.set(e.target?.result);
    reader.readAsDataURL(file);
    this.logoSelected.emit(file);
    event.target.value = "";
  }
  // ── Name popover ──────────────────────────────────────────────
  openPopover() {
    this.nameTemp = this.data().name;
    this.descriptionTemp = this.data().description;
    this.popoverOpen.set(true);
    setTimeout(() => this.nameInputRef()?.nativeElement.focus());
  }
  closePopover() {
    this.popoverOpen.set(false);
  }
  applyPopover() {
    const name = this.nameTemp.trim();
    if (!name)
      return;
    this.dataChange.emit({ name, description: this.descriptionTemp.trim() });
    this.closePopover();
  }
  // ── Sport dropdown ─────────────────────────────────────────────
  selectSport(sport) {
    this.dataChange.emit({ sportId: sport.id });
    this.sportDropOpen.set(false);
  }
  // ── Inline editing ─────────────────────────────────────────────
  startEditTeams() {
    this.editingTeams.set(true);
    setTimeout(() => {
      const el = this.teamsInputRef()?.nativeElement;
      el?.focus();
      el?.select();
    });
  }
  startEditPlayers() {
    this.editingPlayers.set(true);
    setTimeout(() => {
      const el = this.playersInputRef()?.nativeElement;
      el?.focus();
      el?.select();
    });
  }
  startEditLocation() {
    this.editingLocation.set(true);
    setTimeout(() => this.locationInputRef()?.nativeElement.focus());
  }
  // ── Social links ───────────────────────────────────────────────
  startAddSocialLink() {
    const options = this.availableNetworkOptions();
    if (options.length === 0) {
      this.socialEditorError.set("Ya agregaste todas las redes disponibles.");
      return;
    }
    this.socialEditingNetworkId.set(null);
    this.socialNetworkDraft = options[0].id;
    this.socialUrlDraft = "";
    this.socialEditorError.set("");
    this.socialEditorOpen.set(true);
  }
  startEditSocialLink(link) {
    this.socialEditingNetworkId.set(link.socialNetworkId);
    this.socialNetworkDraft = link.socialNetworkId;
    this.socialUrlDraft = link.link;
    this.socialEditorError.set("");
    this.socialEditorOpen.set(true);
  }
  cancelSocialEditor() {
    this.socialEditorOpen.set(false);
    this.socialEditorError.set("");
    this.socialEditingNetworkId.set(null);
    this.socialUrlDraft = "";
  }
  removeSocialLink(socialNetworkId) {
    const next = this.data().socialLinks.filter((link) => link.socialNetworkId !== socialNetworkId);
    this.dataChange.emit({ socialLinks: next });
  }
  canSaveSocialDraft() {
    const url = this.socialUrlDraft.trim();
    if (!this.isValidHttpsUrl(url))
      return false;
    const exists = this.data().socialLinks.some((link) => link.socialNetworkId === this.socialNetworkDraft && link.socialNetworkId !== this.socialEditingNetworkId());
    return !exists;
  }
  saveSocialDraft() {
    const url = this.socialUrlDraft.trim();
    if (!this.isValidHttpsUrl(url)) {
      this.socialEditorError.set("La URL debe ser valida y comenzar con https://");
      return;
    }
    const duplicated = this.data().socialLinks.some((link) => link.socialNetworkId === this.socialNetworkDraft && link.socialNetworkId !== this.socialEditingNetworkId());
    if (duplicated) {
      this.socialEditorError.set("Solo se permite una red por tipo.");
      return;
    }
    const meta = SOCIAL_NETWORK_OPTIONS.find((opt) => opt.id === this.socialNetworkDraft);
    const next = [...this.data().socialLinks];
    const idx = next.findIndex((link) => link.socialNetworkId === this.socialEditingNetworkId());
    const payload = {
      socialNetworkId: this.socialNetworkDraft,
      link: url,
      name: meta?.name,
      icon: meta?.icon
    };
    if (idx >= 0) {
      const existing = next[idx];
      next[idx] = __spreadValues(__spreadValues({}, existing), payload);
    } else {
      next.push(__spreadProps(__spreadValues({}, payload), { id: Date.now() }));
    }
    this.dataChange.emit({ socialLinks: next });
    this.cancelSocialEditor();
  }
  isValidHttpsUrl(value) {
    try {
      const parsed = new URL(value);
      return parsed.protocol === "https:";
    } catch {
      return false;
    }
  }
  // ── Date range label ───────────────────────────────────────────
  dateRangeLabel() {
    const { startDate, endDate } = this.data();
    if (!startDate && !endDate)
      return "Fechas no definidas";
    const fmt = (iso, yr) => (/* @__PURE__ */ new Date(iso + "T00:00:00")).toLocaleDateString("es-ES", __spreadValues({ day: "numeric", month: "short" }, yr ? { year: "numeric" } : {}));
    const s = startDate ? fmt(startDate, false) : "?";
    const e = endDate ? fmt(endDate, true) : "?";
    return `${s} \u2192 ${e}`;
  }
  static \u0275fac = function ChampionshipHeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChampionshipHeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChampionshipHeaderComponent, selectors: [["app-championship-header"]], viewQuery: function ChampionshipHeaderComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.fileInputRef, _c0, 5);
      \u0275\u0275viewQuerySignal(ctx.nameContainerRef, _c1, 5);
      \u0275\u0275viewQuerySignal(ctx.sportWrapRef, _c2, 5);
      \u0275\u0275viewQuerySignal(ctx.nameInputRef, _c3, 5);
      \u0275\u0275viewQuerySignal(ctx.teamsInputRef, _c4, 5);
      \u0275\u0275viewQuerySignal(ctx.playersInputRef, _c5, 5);
      \u0275\u0275viewQuerySignal(ctx.locationInputRef, _c6, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(7);
    }
  }, hostBindings: function ChampionshipHeaderComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function ChampionshipHeaderComponent_click_HostBindingHandler($event) {
        return ctx.onDocClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { data: [1, "data"], sports: [1, "sports"], editable: [1, "editable"] }, outputs: { dataChange: "dataChange", logoSelected: "logoSelected" }, decls: 56, vars: 36, consts: [["fileInput", ""], ["nameContainer", ""], ["nameInput", ""], ["sportWrap", ""], ["teamsInput", ""], ["playersInput", ""], ["locationInput", ""], [1, "relative", "flex", "gap-5", "items-start", "px-7", "pt-6", "pb-5", 2, "background", "radial-gradient(ellipse 55% 90% at 90% 10%, rgba(56,110,229,0.1) 0%, transparent 70%), linear-gradient(165deg, #0c1526 0%, #0f1d35 50%, #0c1728 100%)"], ["matTooltip", "Cambiar logo", 1, "relative", "size-[72px]", "shrink-0", "mt-0.5", "rounded-[14px]", "overflow-hidden", "cursor-pointer", "border", "border-white/10", "bg-white/5", "transition-[border-color]", "hover:border-white/25", "group", 3, "click", "matTooltipDisabled"], ["alt", "Logo", 1, "size-full", "object-cover", 3, "src"], [1, "flex", "size-full", "items-center", "justify-center"], [1, "absolute", "inset-0", "flex", "flex-col", "items-center", "justify-center", "gap-0.5", "bg-black/65", "opacity-0", "transition-opacity", "group-hover:opacity-100", "text-white"], ["type", "file", "accept", "image/*", 1, "sr-only", 3, "change"], [1, "flex", "min-w-0", "flex-1", "flex-col", "gap-1.5"], [1, "relative", "flex", "flex-wrap", "items-center", "gap-2.5"], [1, "m-0", "text-[1.75rem]", "font-bold", "tracking-tight", "leading-tight", "text-white", "inline-flex", "items-center", "gap-1.5", "transition-colors", 3, "click"], [1, "!size-[15px]", "!text-[15px]", "text-white/30", "opacity-0", "group-[]/name:opacity-100", "transition-opacity"], [1, "inline-flex", "items-center", "gap-1.5", "rounded-full", "px-2.5", "py-0.5", "text-[12px]", "font-semibold", "ring-1", "ring-inset"], [1, "size-1.5", "rounded-full"], [1, "absolute", "left-0", "top-[calc(100%+10px)]", "z-50", "w-[380px]", "flex", "flex-col", "gap-2", "rounded-xl", "border", "border-white/10", "bg-[#1a2742]", "p-4", "shadow-[0_24px_64px_rgba(0,0,0,0.55)]"], [1, "flex", "flex-wrap", "items-center", "gap-1.5"], [1, "relative"], ["type", "button", "matTooltip", "Agregar red social", "aria-label", "Agregar red social", 1, "inline-flex", "size-8", "items-center", "justify-center", "rounded-lg", "border", "border-dashed", "border-white/40", "bg-transparent", "text-white/75", "transition-colors", "hover:bg-white/8", "hover:text-white", "disabled:opacity-35", "disabled:cursor-not-allowed", 3, "disabled"], [1, "rounded-lg", "border", "border-blue-400/25", "bg-blue-500/10", "p-2"], [1, "flex", "items-center", "gap-2", "text-[14px]", "text-white/55"], [1, "flex", "flex-wrap", "items-center", "gap-x-4", "gap-y-1", "text-[13px]", "text-white/50"], [1, "inline-flex", "items-center", "gap-1.5"], [1, "!size-3.5", "!text-[14px]", "text-white/28"], [3, "cursor-pointer", "border-b", "border-dashed", "border-white/18", "hover:text-white/85", "hover:border-white/45"], ["placeholder", "Ciudad, Pa\xEDs", 1, "w-36", "bg-transparent", "border-b", "border-dashed", "border-white/28", "text-[13px]", "text-white/70", "outline-none", "focus:border-white/55", 3, "ngModel"], [3, "cursor-pointer", "border-b", "border-dashed", "border-white/18", "text-white/22", "hover:text-white/85"], [1, "!size-3.5", "!text-[14px]"], [3, "text-green-400", "text-amber-300", "text-white/35"], [1, "!size-[34px]", "!text-[34px]", "text-amber-400"], [1, "!size-5", "!text-[20px]"], [1, "text-[11px]", "font-medium"], [1, "m-0", "text-[12px]", "text-white/35"], [1, "text-[10.5px]", "font-semibold", "uppercase", "tracking-[.06em]", "text-white/45"], [1, "text-red-400"], ["placeholder", "Ej: Liga Premier 2024", "maxlength", "100", 1, "w-full", "rounded-lg", "border", "border-white/10", "bg-white/6", "px-3", "py-2", "text-[15px]", "font-semibold", "text-white", "outline-none", "placeholder:text-white/20", "focus:border-blue-500/50", "transition-colors", 3, "ngModelChange", "keydown.enter", "keydown.escape", "ngModel"], [1, "ml-1", "normal-case", "text-[10px]", "font-normal", "text-white/30"], ["placeholder", "Describe brevemente el campeonato...", "rows", "3", 1, "w-full", "resize-y", "rounded-lg", "border", "border-white/10", "bg-white/6", "px-3", "py-2", "text-[14px]", "text-white", "outline-none", "placeholder:text-white/20", "focus:border-blue-500/50", "transition-colors", 3, "ngModelChange", "keydown.escape", "ngModel"], [1, "flex", "justify-end", "gap-2", "mt-1"], ["type", "button", 1, "rounded-md", "bg-white/7", "px-4", "py-1.5", "text-[13px]", "font-medium", "text-white/65", "transition-colors", "hover:bg-white/12", 3, "click"], ["type", "button", 1, "rounded-md", "bg-blue-500", "px-4", "py-1.5", "text-[13px]", "font-medium", "text-white", "transition-colors", "hover:bg-blue-600", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["target", "_blank", "rel", "noopener noreferrer", 1, "inline-flex", "size-8", "items-center", "justify-center", "rounded-lg", "border", "text-white", "no-underline", "transition-transform", "duration-150", "hover:scale-[1.03]", 3, "href", "matTooltip"], [1, "!size-[16px]", "!text-[16px]"], ["type", "button", "aria-label", "Editar red social", 1, "absolute", "-top-1", "-right-1", "inline-flex", "size-3.5", "items-center", "justify-center", "rounded-full", "border", "border-white/30", "bg-[#0f1d35]", "text-white/80", "hover:text-white", 3, "click"], [1, "!size-[9px]", "!text-[9px]"], ["type", "button", "aria-label", "Eliminar red social", 1, "absolute", "-bottom-1", "-right-1", "inline-flex", "size-3.5", "items-center", "justify-center", "rounded-full", "border", "border-red-300/45", "bg-[#2b1520]", "text-red-200", "hover:bg-red-500/20", 3, "click"], ["type", "button", "matTooltip", "Agregar red social", "aria-label", "Agregar red social", 1, "inline-flex", "size-8", "items-center", "justify-center", "rounded-lg", "border", "border-dashed", "border-white/40", "bg-transparent", "text-white/75", "transition-colors", "hover:bg-white/8", "hover:text-white", "disabled:opacity-35", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["type", "button", 1, "inline-flex", "size-8", "items-center", "justify-center", "rounded-lg", "border", "text-white", "transition-colors", 3, "background", "border-color", "opacity", "matTooltip"], [1, "mt-2", "flex", "flex-col", "gap-1"], [1, "text-[11px]", "font-semibold", "uppercase", "tracking-[.05em]", "text-blue-200/85"], ["inputmode", "url", "autocomplete", "off", 1, "rounded-md", "border", "border-white/20", "bg-[#0f1d35]", "px-2", "py-1.5", "text-[12.5px]", "text-white", "outline-none", "placeholder:text-white/30", "focus:border-blue-300", 3, "ngModelChange", "ngModel", "placeholder"], [1, "m-0", "mt-1", "text-[11.5px]", "text-red-200"], [1, "mt-2", "flex", "items-center", "justify-end", "gap-1.5"], ["type", "button", 1, "rounded-md", "border", "border-white/16", "bg-white/7", "px-2.5", "py-1.5", "text-[12px]", "text-white/75", "transition-colors", "hover:bg-white/12", 3, "click"], ["type", "button", 1, "rounded-md", "bg-blue-500", "px-2.5", "py-1.5", "text-[12px]", "font-semibold", "text-white", "transition-colors", "hover:bg-blue-600", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["type", "button", 1, "inline-flex", "size-8", "items-center", "justify-center", "rounded-lg", "border", "text-white", "transition-colors", 3, "click", "matTooltip"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "rounded-md", "border", "border-transparent", "bg-transparent", "px-2", "py-1", "font-medium", "text-white/70", "transition-colors", "hover:border-white/12", "hover:bg-white/7", "hover:text-white", 3, "click"], [1, "!size-4", "!text-[16px]", "text-white/40"], [1, "!size-4", "!text-[16px]", "text-white/35", "transition-transform"], [1, "absolute", "left-0", "top-[calc(100%+6px)]", "z-50", "min-w-[200px]", "rounded-xl", "border", "border-white/10", "bg-[#1a2742]", "p-1", "shadow-[0_16px_48px_rgba(0,0,0,0.55)]"], [1, "text-white/22"], [1, "text-white/40"], ["placeholder", "2024-2025", "maxlength", "20", 1, "w-20", "bg-transparent", "border-b", "border-dashed", "border-white/25", "px-0.5", "text-[14px]", "text-white/70", "outline-none", "focus:border-white/60", "focus:text-white", "placeholder:text-white/18", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "flex", "w-full", "items-center", "gap-2.5", "rounded-lg", "px-3", "py-2", "text-[13px]", "text-white/65", "transition-colors", "hover:bg-white/7", "hover:text-white", 3, "bg-blue-500/12", "text-blue-300", "font-medium"], ["type", "button", 1, "flex", "w-full", "items-center", "gap-2.5", "rounded-lg", "px-3", "py-2", "text-[13px]", "text-white/65", "transition-colors", "hover:bg-white/7", "hover:text-white", 3, "click"], [1, "!size-4", "!text-[16px]", "text-white/35"], [1, "ml-auto", "!size-3.5", "!text-[14px]", "text-blue-400"], ["type", "number", "min", "2", "max", "256", 1, "w-10", "bg-transparent", "border-b", "border-dashed", "border-white/28", "text-[13px]", "text-white/70", "outline-none", "focus:border-white/55", 3, "ngModelChange", "blur", "keydown.enter", "keydown.escape", "ngModel"], [1, "text-white/35"], [3, "click"], ["type", "number", "min", "1", "max", "100", 1, "w-10", "bg-transparent", "border-b", "border-dashed", "border-white/28", "text-[13px]", "text-white/70", "outline-none", "focus:border-white/55", 3, "ngModelChange", "blur", "keydown.enter", "keydown.escape", "ngModel"], ["placeholder", "Ciudad, Pa\xEDs", 1, "w-36", "bg-transparent", "border-b", "border-dashed", "border-white/28", "text-[13px]", "text-white/70", "outline-none", "focus:border-white/55", 3, "ngModelChange", "blur", "keydown.enter", "keydown.escape", "ngModel"], ["type", "date", "title", "Fecha inicio", 1, "bg-transparent", "border-b", "border-dashed", "border-white/22", "text-[13px]", "text-white/65", "outline-none", "focus:border-white/55", "[color-scheme:dark]", "w-30", 3, "ngModelChange", "ngModel"], [1, "text-white/28", "mx-0.5"], ["type", "date", "title", "Fecha fin", 1, "bg-transparent", "border-b", "border-dashed", "border-white/22", "text-[13px]", "text-white/65", "outline-none", "focus:border-white/55", "[color-scheme:dark]", "w-30", 3, "ngModelChange", "ngModel"], ["type", "date", "title", "Inicio inscripciones", "aria-label", "Inicio de inscripciones", 1, "bg-transparent", "border-b", "border-dashed", "border-white/22", "text-[13px]", "text-white/65", "outline-none", "focus:border-white/55", "[color-scheme:dark]", "w-30", 3, "ngModelChange", "ngModel"], ["type", "date", "title", "Fin inscripciones", "aria-label", "Fin de inscripciones", 1, "bg-transparent", "border-b", "border-dashed", "border-white/22", "text-[13px]", "text-white/65", "outline-none", "focus:border-white/55", "[color-scheme:dark]", "w-30", 3, "ngModelChange", "ngModel"]], template: function ChampionshipHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "header", 7)(1, "div", 8);
      \u0275\u0275listener("click", function ChampionshipHeaderComponent_Template_div_click_1_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.editable() && ctx.triggerLogoUpload());
      });
      \u0275\u0275conditionalCreate(2, ChampionshipHeaderComponent_Conditional_2_Template, 1, 1, "img", 9)(3, ChampionshipHeaderComponent_Conditional_3_Template, 3, 0, "div", 10);
      \u0275\u0275conditionalCreate(4, ChampionshipHeaderComponent_Conditional_4_Template, 5, 0, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "input", 12, 0);
      \u0275\u0275listener("change", function ChampionshipHeaderComponent_Template_input_change_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onLogoSelected($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 13)(8, "div", 14, 1)(10, "h1", 15);
      \u0275\u0275listener("click", function ChampionshipHeaderComponent_Template_h1_click_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.editable() && ctx.openPopover());
      });
      \u0275\u0275text(11);
      \u0275\u0275conditionalCreate(12, ChampionshipHeaderComponent_Conditional_12_Template, 2, 0, "mat-icon", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "span", 17);
      \u0275\u0275element(14, "span", 18);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, ChampionshipHeaderComponent_Conditional_16_Template, 19, 3, "div", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 20);
      \u0275\u0275repeaterCreate(18, ChampionshipHeaderComponent_For_19_Template, 5, 9, "div", 21, _forTrack0);
      \u0275\u0275conditionalCreate(20, ChampionshipHeaderComponent_Conditional_20_Template, 3, 1, "button", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, ChampionshipHeaderComponent_Conditional_21_Template, 14, 4, "div", 23);
      \u0275\u0275elementStart(22, "div", 24);
      \u0275\u0275conditionalCreate(23, ChampionshipHeaderComponent_Conditional_23_Template, 14, 6)(24, ChampionshipHeaderComponent_Conditional_24_Template, 2, 2, "span");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 25)(26, "div", 26)(27, "mat-icon", 27);
      \u0275\u0275text(28, "group");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(29, ChampionshipHeaderComponent_Conditional_29_Template, 4, 1)(30, ChampionshipHeaderComponent_Conditional_30_Template, 2, 14, "span", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 26)(32, "mat-icon", 27);
      \u0275\u0275text(33, "person");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(34, ChampionshipHeaderComponent_Conditional_34_Template, 4, 1)(35, ChampionshipHeaderComponent_Conditional_35_Template, 2, 13, "span", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 26)(37, "mat-icon", 27);
      \u0275\u0275text(38, "location_on");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(39, ChampionshipHeaderComponent_Conditional_39_Template, 2, 1, "input", 29)(40, ChampionshipHeaderComponent_Conditional_40_Template, 2, 13, "span", 30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 26)(42, "mat-icon", 27);
      \u0275\u0275text(43, "calendar_today");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(44, ChampionshipHeaderComponent_Conditional_44_Template, 4, 2)(45, ChampionshipHeaderComponent_Conditional_45_Template, 2, 1, "span");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div", 26)(47, "mat-icon", 31);
      \u0275\u0275text(48, "how_to_reg");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(49, ChampionshipHeaderComponent_Conditional_49_Template, 4, 2)(50, ChampionshipHeaderComponent_Conditional_50_Template, 2, 7, "span", 32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "div", 26)(52, "mat-icon", 27);
      \u0275\u0275text(53, "layers");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "span");
      \u0275\u0275text(55);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275classProp("pointer-events-none", !ctx.editable());
      \u0275\u0275property("matTooltipDisabled", !ctx.editable());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.logoPreview() ? 2 : 3);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.editable() ? 4 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275classProp("text-white/25", !ctx.data().name)("cursor-pointer", ctx.editable())("rounded-md", ctx.editable())("hover:bg-white/8", ctx.editable());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.data().name || "Nombre del campeonato", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.editable() && !ctx.popoverOpen() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.statusPillClass());
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.statusDotClass());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.statusLabel(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.popoverOpen() ? 16 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.socialLinksView());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.editable() ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.editable() && ctx.socialEditorOpen() ? 21 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.editable() ? 23 : 24);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.editingTeams() ? 29 : 30);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.editingPlayers() ? 34 : 35);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.editingLocation() ? 39 : 40);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.editable() ? 44 : 45);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("text-green-400", ctx.registrationStatus() === "open")("text-amber-300", ctx.registrationStatus() === "upcoming")("text-white/28", ctx.registrationStatus() === "closed" || ctx.registrationStatus() === "none");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.editable() ? 49 : 50);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.data().phaseCount, " fases");
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, MatIconModule, MatIcon, MatTooltipModule, MatTooltip], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChampionshipHeaderComponent, [{
    type: Component,
    args: [{
      selector: "app-championship-header",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [FormsModule, MatIconModule, MatTooltipModule],
      template: `
<!-- \u2550\u2550 HEADER \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<header
  class="relative flex gap-5 items-start px-7 pt-6 pb-5"
  style="background: radial-gradient(ellipse 55% 90% at 90% 10%, rgba(56,110,229,0.1) 0%, transparent 70%), linear-gradient(165deg, #0c1526 0%, #0f1d35 50%, #0c1728 100%);"
>

  <!-- \u2500\u2500 Logo \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <div
    class="relative size-[72px] shrink-0 mt-0.5 rounded-[14px] overflow-hidden cursor-pointer
           border border-white/10 bg-white/5 transition-[border-color]
           hover:border-white/25 group"
    [class.pointer-events-none]="!editable()"
    (click)="editable() && triggerLogoUpload()"
    matTooltip="Cambiar logo"
    [matTooltipDisabled]="!editable()"
  >
    @if (logoPreview()) {
      <img [src]="logoPreview()" alt="Logo" class="size-full object-cover" />
    } @else {
      <div class="flex size-full items-center justify-center">
        <mat-icon class="!size-[34px] !text-[34px] text-amber-400">emoji_events</mat-icon>
      </div>
    }
    @if (editable()) {
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-0.5
                  bg-black/65 opacity-0 transition-opacity group-hover:opacity-100 text-white">
        <mat-icon class="!size-5 !text-[20px]">photo_camera</mat-icon>
        <span class="text-[11px] font-medium">Cambiar</span>
      </div>
    }
  </div>
  <input #fileInput type="file" accept="image/*" class="sr-only" (change)="onLogoSelected($event)" />

  <!-- \u2500\u2500 Body \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <div class="flex min-w-0 flex-1 flex-col gap-1.5">

    <!-- Row 1 \u2014 Name + status pill -->
    <div class="relative flex flex-wrap items-center gap-2.5" #nameContainer>

      <!-- Name -->
      <h1
        class="m-0 text-[1.75rem] font-bold tracking-tight leading-tight text-white
               inline-flex items-center gap-1.5 transition-colors"
        [class.text-white/25]="!data().name"
        [class.cursor-pointer]="editable()"
        [class.rounded-md]="editable()"
        [class.hover:bg-white/8]="editable()"
        (click)="editable() && openPopover()"
      >
        {{ data().name || 'Nombre del campeonato' }}
        @if (editable() && !popoverOpen()) {
          <mat-icon class="!size-[15px] !text-[15px] text-white/30 opacity-0
                           group-[]/name:opacity-100 transition-opacity">edit</mat-icon>
        }
      </h1>

      <!-- Status pill -->
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5
               text-[12px] font-semibold ring-1 ring-inset"
        [class]="statusPillClass()"
      >
        <span class="size-1.5 rounded-full" [class]="statusDotClass()"></span>
        {{ statusLabel() }}
      </span>

      <!-- \u2500\u2500 Name + description popover \u2500\u2500 -->
      @if (popoverOpen()) {
        <div
          class="absolute left-0 top-[calc(100%+10px)] z-50 w-[380px] flex flex-col gap-2
                 rounded-xl border border-white/10 bg-[#1a2742]
                 p-4 shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
        >
          <p class="m-0 text-[12px] text-white/35">
            Edita el nombre e informaci\xF3n del campeonato
          </p>

          <label class="text-[10.5px] font-semibold uppercase tracking-[.06em] text-white/45">
            Nombre <span class="text-red-400">*</span>
          </label>
          <input
            #nameInput
            class="w-full rounded-lg border border-white/10 bg-white/6 px-3 py-2
                   text-[15px] font-semibold text-white outline-none placeholder:text-white/20
                   focus:border-blue-500/50 transition-colors"
            [(ngModel)]="nameTemp"
            placeholder="Ej: Liga Premier 2024"
            maxlength="100"
            (keydown.enter)="applyPopover()"
            (keydown.escape)="closePopover()"
          />

          <label class="text-[10.5px] font-semibold uppercase tracking-[.06em] text-white/45">
            Descripci\xF3n
            <span class="ml-1 normal-case text-[10px] font-normal text-white/30">(opcional)</span>
          </label>
          <textarea
            class="w-full resize-y rounded-lg border border-white/10 bg-white/6 px-3 py-2
                   text-[14px] text-white outline-none placeholder:text-white/20
                   focus:border-blue-500/50 transition-colors"
            [(ngModel)]="descriptionTemp"
            placeholder="Describe brevemente el campeonato..."
            rows="3"
            (keydown.escape)="closePopover()"
          ></textarea>

          <div class="flex justify-end gap-2 mt-1">
            <button
              class="rounded-md bg-white/7 px-4 py-1.5 text-[13px] font-medium
                     text-white/65 transition-colors hover:bg-white/12"
              (click)="closePopover()" type="button"
            >Cancelar</button>
            <button
              class="rounded-md bg-blue-500 px-4 py-1.5 text-[13px] font-medium text-white
                     transition-colors hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
              [disabled]="!nameTemp.trim()"
              (click)="applyPopover()" type="button"
            >Aplicar</button>
          </div>
        </div>
      }
    </div>

    <!-- Row 1.5 \u2014 Social links compactos (debajo del titulo) -->
    <div class="flex flex-wrap items-center gap-1.5">
      @for (link of socialLinksView(); track link.socialNetworkId) {
        <div class="relative">
          <a
            [href]="link.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex size-8 items-center justify-center rounded-lg border text-white no-underline
                   transition-transform duration-150 hover:scale-[1.03]"
            [style.background]="link.brandBg"
            [style.border-color]="link.brandBorder"
            [matTooltip]="link.name"
            [attr.aria-label]="'Abrir ' + link.name"
          >
            <mat-icon class="!size-[16px] !text-[16px]">{{ link.icon }}</mat-icon>
          </a>

          @if (editable()) {
            <button
              type="button"
              class="absolute -top-1 -right-1 inline-flex size-3.5 items-center justify-center
                     rounded-full border border-white/30 bg-[#0f1d35] text-white/80 hover:text-white"
              (click)="startEditSocialLink(link)"
              aria-label="Editar red social"
            >
              <mat-icon class="!size-[9px] !text-[9px]">edit</mat-icon>
            </button>
            <button
              type="button"
              class="absolute -bottom-1 -right-1 inline-flex size-3.5 items-center justify-center
                     rounded-full border border-red-300/45 bg-[#2b1520] text-red-200 hover:bg-red-500/20"
              (click)="removeSocialLink(link.socialNetworkId)"
              aria-label="Eliminar red social"
            >
              <mat-icon class="!size-[9px] !text-[9px]">close</mat-icon>
            </button>
          }
        </div>
      }

      @if (editable()) {
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-lg border border-dashed border-white/40
                 bg-transparent text-white/75 transition-colors hover:bg-white/8 hover:text-white
                 disabled:opacity-35 disabled:cursor-not-allowed"
          [disabled]="availableNetworkOptions().length === 0"
          (click)="startAddSocialLink()"
          matTooltip="Agregar red social"
          aria-label="Agregar red social"
        >
          <mat-icon class="!size-[16px] !text-[16px]">add</mat-icon>
        </button>
      }
    </div>

    @if (editable() && socialEditorOpen()) {
      <div class="rounded-lg border border-blue-400/25 bg-blue-500/10 p-2">
        <div class="flex flex-wrap items-center gap-1.5">
          @for (opt of editorNetworkOptions(); track opt.id) {
            <button
              type="button"
              class="inline-flex size-8 items-center justify-center rounded-lg border text-white transition-colors"
              [style.background]="opt.id === socialNetworkDraft ? opt.brandBg : '#0f1d35'"
              [style.border-color]="opt.id === socialNetworkDraft ? opt.brandBorder : 'rgba(255,255,255,0.2)'"
              [style.opacity]="opt.id === socialNetworkDraft ? '1' : '0.75'"
              (click)="socialNetworkDraft = opt.id"
              [matTooltip]="opt.name"
              [attr.aria-label]="'Seleccionar ' + opt.name"
            >
              <mat-icon class="!size-[16px] !text-[16px]">{{ opt.icon }}</mat-icon>
            </button>
          }
        </div>

        <label class="mt-2 flex flex-col gap-1">
          <span class="text-[11px] font-semibold uppercase tracking-[.05em] text-blue-200/85">URL</span>
          <input
            class="rounded-md border border-white/20 bg-[#0f1d35] px-2 py-1.5 text-[12.5px] text-white
                   outline-none placeholder:text-white/30 focus:border-blue-300"
            [(ngModel)]="socialUrlDraft"
            [placeholder]="socialUrlPlaceholder()"
            inputmode="url"
            autocomplete="off"
          />
        </label>

        @if (socialEditorError()) {
          <p class="m-0 mt-1 text-[11.5px] text-red-200">{{ socialEditorError() }}</p>
        }

        <div class="mt-2 flex items-center justify-end gap-1.5">
          <button
            type="button"
            class="rounded-md border border-white/16 bg-white/7 px-2.5 py-1.5 text-[12px] text-white/75
                   transition-colors hover:bg-white/12"
            (click)="cancelSocialEditor()"
          >Cancelar</button>
          <button
            type="button"
            class="rounded-md bg-blue-500 px-2.5 py-1.5 text-[12px] font-semibold text-white
                   transition-colors hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
            [disabled]="!canSaveSocialDraft()"
            (click)="saveSocialDraft()"
          >Guardar</button>
        </div>
      </div>
    }

    <!-- Row 2 \u2014 Sport \xB7 Season -->
    <div class="flex items-center gap-2 text-[14px] text-white/55">
      @if (editable()) {

        <!-- Sport custom dropdown -->
        <div class="relative" #sportWrap>
          <button
            class="inline-flex items-center gap-1.5 rounded-md border border-transparent
                   bg-transparent px-2 py-1 font-medium text-white/70
                   transition-colors hover:border-white/12 hover:bg-white/7 hover:text-white"
            type="button"
            (click)="sportDropOpen.set(!sportDropOpen())"
          >
            <mat-icon class="!size-4 !text-[16px] text-white/40">{{ currentSportIcon() }}</mat-icon>
            {{ currentSportLabel() }}
            <mat-icon
              class="!size-4 !text-[16px] text-white/35 transition-transform"
              [class.rotate-180]="sportDropOpen()"
            >expand_more</mat-icon>
          </button>

          @if (sportDropOpen()) {
            <div
              class="absolute left-0 top-[calc(100%+6px)] z-50 min-w-[200px]
                     rounded-xl border border-white/10 bg-[#1a2742]
                     p-1 shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
            >
              @for (s of sports(); track s.id) {
                <button
                  class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2
                         text-[13px] text-white/65 transition-colors
                         hover:bg-white/7 hover:text-white"
                  [class.bg-blue-500/12]="data().sportId === s.id"
                  [class.text-blue-300]="data().sportId === s.id"
                  [class.font-medium]="data().sportId === s.id"
                  type="button"
                  (click)="selectSport(s)"
                >
                  <mat-icon class="!size-4 !text-[16px] text-white/35"
                            [class.text-blue-400]="data().sportId === s.id">{{ s.icon }}</mat-icon>
                  {{ s.label }}
                  @if (data().sportId === s.id) {
                    <mat-icon class="ml-auto !size-3.5 !text-[14px] text-blue-400">check</mat-icon>
                  }
                </button>
              }
            </div>
          }
        </div>

        <span class="text-white/22">\xB7</span>

        <span class="text-white/40">Temporada&nbsp;
          <input
            class="w-20 bg-transparent border-b border-dashed border-white/25 px-0.5
                   text-[14px] text-white/70 outline-none
                   focus:border-white/60 focus:text-white placeholder:text-white/18"
            [(ngModel)]="seasonModel"
            placeholder="2024-2025"
            maxlength="20"
          />
        </span>

      } @else {
        <span>{{ currentSportLabel() }} \xB7 Temporada {{ data().season }}</span>
      }
    </div>

    <!-- Row 3 \u2014 Meta chips -->
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/50">

      <!-- Teams -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon class="!size-3.5 !text-[14px] text-white/28">group</mat-icon>
        @if (editingTeams()) {
          <input
            #teamsInput
            class="w-10 bg-transparent border-b border-dashed border-white/28 text-[13px]
                   text-white/70 outline-none focus:border-white/55"
            type="number" min="2" max="256"
            [(ngModel)]="teamsModel"
            (blur)="editingTeams.set(false)"
            (keydown.enter)="editingTeams.set(false)"
            (keydown.escape)="editingTeams.set(false)"
          />
          <span class="text-white/35">equipos m\xE1x.</span>
        } @else {
          <span
            [class.cursor-pointer]="editable()"
            [class.border-b]="editable()"
            [class.border-dashed]="editable()"
            [class.border-white/18]="editable()"
            [class.hover:text-white/85]="editable()"
            [class.hover:border-white/45]="editable()"
            (click)="editable() && startEditTeams()"
          >
            {{ data().currentTeams }}/{{ data().maxTeams }} equipos
          </span>
        }
      </div>

      <!-- Max players per team -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon class="!size-3.5 !text-[14px] text-white/28">person</mat-icon>
        @if (editingPlayers()) {
          <input
            #playersInput
            class="w-10 bg-transparent border-b border-dashed border-white/28 text-[13px]
                   text-white/70 outline-none focus:border-white/55"
            type="number" min="1" max="100"
            [(ngModel)]="playersModel"
            (blur)="editingPlayers.set(false)"
            (keydown.enter)="editingPlayers.set(false)"
            (keydown.escape)="editingPlayers.set(false)"
          />
          <span class="text-white/35">jugadores m\xE1x. por equipo</span>
        } @else {
          <span
            [class.cursor-pointer]="editable()"
            [class.border-b]="editable()"
            [class.border-dashed]="editable()"
            [class.border-white/18]="editable()"
            [class.hover:text-white/85]="editable()"
            [class.hover:border-white/45]="editable()"
            (click)="editable() && startEditPlayers()"
          >
            {{ data().maxPlayersPerTeam }} jugadores m\xE1x. por equipo
          </span>
        }
      </div>

      <!-- Location -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon class="!size-3.5 !text-[14px] text-white/28">location_on</mat-icon>
        @if (editingLocation()) {
          <input
            #locationInput
            class="w-36 bg-transparent border-b border-dashed border-white/28 text-[13px]
                   text-white/70 outline-none focus:border-white/55"
            [(ngModel)]="locationModel"
            placeholder="Ciudad, Pa\xEDs"
            (blur)="editingLocation.set(false)"
            (keydown.enter)="editingLocation.set(false)"
            (keydown.escape)="editingLocation.set(false)"
          />
        } @else {
          <span
            [class.cursor-pointer]="editable()"
            [class.border-b]="editable()"
            [class.border-dashed]="editable()"
            [class.border-white/18]="editable() && data().location"
            [class.text-white/22]="!data().location"
            [class.hover:text-white/85]="editable()"
            (click)="editable() && startEditLocation()"
          >{{ data().location || 'Ciudad, Pa\xEDs' }}</span>
        }
      </div>

      <!-- Dates -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon class="!size-3.5 !text-[14px] text-white/28">calendar_today</mat-icon>
        @if (editable()) {
          <input
            class="bg-transparent border-b border-dashed border-white/22 text-[13px]
                   text-white/65 outline-none focus:border-white/55 [color-scheme:dark] w-30"
            type="date" [(ngModel)]="startDateModel" title="Fecha inicio"
          />
          <span class="text-white/28 mx-0.5">\u2192</span>
          <input
            class="bg-transparent border-b border-dashed border-white/22 text-[13px]
                   text-white/65 outline-none focus:border-white/55 [color-scheme:dark] w-30"
            type="date" [(ngModel)]="endDateModel" title="Fecha fin"
          />
        } @else {
          <span>{{ dateRangeLabel() }}</span>
        }
      </div>

      <!-- Registration dates -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon
          class="!size-3.5 !text-[14px]"
          [class.text-green-400]="registrationStatus() === 'open'"
          [class.text-amber-300]="registrationStatus() === 'upcoming'"
          [class.text-white/28]="registrationStatus() === 'closed' || registrationStatus() === 'none'"
        >how_to_reg</mat-icon>
        @if (editable()) {
          <input
            class="bg-transparent border-b border-dashed border-white/22 text-[13px]
                   text-white/65 outline-none focus:border-white/55 [color-scheme:dark] w-30"
            type="date" [(ngModel)]="regStartModel" title="Inicio inscripciones"
            aria-label="Inicio de inscripciones"
          />
          <span class="text-white/28 mx-0.5">\u2192</span>
          <input
            class="bg-transparent border-b border-dashed border-white/22 text-[13px]
                   text-white/65 outline-none focus:border-white/55 [color-scheme:dark] w-30"
            type="date" [(ngModel)]="regEndModel" title="Fin inscripciones"
            aria-label="Fin de inscripciones"
          />
        } @else {
          <span
            [class.text-green-400]="registrationStatus() === 'open'"
            [class.text-amber-300]="registrationStatus() === 'upcoming'"
            [class.text-white/35]="registrationStatus() === 'closed' || registrationStatus() === 'none'"
          >{{ regLabel() }}</span>
        }
      </div>

      <!-- Phase count -->
      <div class="inline-flex items-center gap-1.5">
        <mat-icon class="!size-3.5 !text-[14px] text-white/28">layers</mat-icon>
        <span>{{ data().phaseCount }} fases</span>
      </div>

    </div>
  </div>
</header>
  `
    }]
  }], null, { data: [{ type: Input, args: [{ isSignal: true, alias: "data", required: true }] }], sports: [{ type: Input, args: [{ isSignal: true, alias: "sports", required: false }] }], editable: [{ type: Input, args: [{ isSignal: true, alias: "editable", required: false }] }], dataChange: [{ type: Output, args: ["dataChange"] }], logoSelected: [{ type: Output, args: ["logoSelected"] }], fileInputRef: [{ type: ViewChild, args: ["fileInput", { isSignal: true }] }], nameContainerRef: [{ type: ViewChild, args: ["nameContainer", { isSignal: true }] }], sportWrapRef: [{ type: ViewChild, args: ["sportWrap", { isSignal: true }] }], nameInputRef: [{ type: ViewChild, args: ["nameInput", { isSignal: true }] }], teamsInputRef: [{ type: ViewChild, args: ["teamsInput", { isSignal: true }] }], playersInputRef: [{ type: ViewChild, args: ["playersInput", { isSignal: true }] }], locationInputRef: [{ type: ViewChild, args: ["locationInput", { isSignal: true }] }], onDocClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChampionshipHeaderComponent, { className: "ChampionshipHeaderComponent", filePath: "src/app/features/admin/pages/championships/championship-components/championship-header.component.ts", lineNumber: 583 });
})();

// src/app/features/admin/pages/championships/championship-components/phase-card.component.ts
var _c02 = (a0) => ({ label: "PTS. VICTORIA", value: a0 });
var _c12 = (a0) => ({ label: "PTS. EMPATE", value: a0 });
var _c22 = (a0) => ({ label: "PTS. DERROTA", value: a0 });
var _c32 = (a0) => ({ label: "TOTAL RONDAS", value: a0 });
var _c42 = (a0) => ({ label: "FORMATO", value: a0 });
var _c52 = (a0) => ({ label: "3ER LUGAR", value: a0 });
var _c62 = (a0) => ({ label: "RONDAS", value: a0, wide: true });
var _c7 = (a0) => ({ label: "N\xB0 GRUPOS", value: a0 });
var _c8 = (a0) => ({ label: "EQ. POR GRUPO", value: a0 });
var _c9 = (a0) => ({ label: "AVANZAN", value: a0 });
var _c10 = (a0) => ({ label: "PARTIDOS", value: a0 });
var _c11 = (a0) => ({ label: "RONDAS", value: a0 });
var _c122 = (a0) => ({ label: "SISTEMA", value: a0 });
var _c13 = (a0) => ({ label: "CLASIF. DIREC.", value: a0 });
var _c14 = (a0) => ({ label: "PLAYOFF", value: a0 });
function PhaseCardComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "mat-icon", 15);
    \u0275\u0275text(2, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Base ");
    \u0275\u0275elementEnd();
  }
}
function PhaseCardComponent_Case_21_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_21_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_21_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_21_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, PhaseCardComponent_Case_21_ng_container_0_Template, 1, 0, "ng-container", 16)(1, PhaseCardComponent_Case_21_ng_container_1_Template, 1, 0, "ng-container", 16)(2, PhaseCardComponent_Case_21_ng_container_2_Template, 1, 0, "ng-container", 16)(3, PhaseCardComponent_Case_21_ng_container_3_Template, 1, 0, "ng-container", 16);
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_9_0;
    const ctx_r1 = \u0275\u0275nextContext();
    const stat_r3 = \u0275\u0275reference(26);
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(8, _c02, (tmp_3_0 = ctx_r1.phase().league) == null ? null : tmp_3_0.winsPoints));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(10, _c12, (tmp_5_0 = ctx_r1.phase().league) == null ? null : tmp_5_0.drawPoints));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(12, _c22, (tmp_7_0 = ctx_r1.phase().league) == null ? null : tmp_7_0.lossPoints));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(14, _c32, (tmp_9_0 = ctx_r1.phase().league) == null ? null : tmp_9_0.totalRounds));
  }
}
function PhaseCardComponent_Case_22_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_22_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_22_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, PhaseCardComponent_Case_22_ng_container_0_Template, 1, 0, "ng-container", 16)(1, PhaseCardComponent_Case_22_ng_container_1_Template, 1, 0, "ng-container", 16)(2, PhaseCardComponent_Case_22_ng_container_2_Template, 1, 0, "ng-container", 16);
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext();
    const stat_r3 = \u0275\u0275reference(26);
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(6, _c42, ((tmp_3_0 = ctx_r1.phase().knockout) == null ? null : tmp_3_0.legs) === 2 ? "Ida y Vuelta" : "Solo Ida"));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(8, _c52, ((tmp_5_0 = ctx_r1.phase().knockout) == null ? null : tmp_5_0.thirdPlaceMatch) ? "S\xED" : "No"));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(10, _c62, ctx_r1.knockoutRoundsLabel()));
  }
}
function PhaseCardComponent_Case_23_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_23_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_23_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_23_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, PhaseCardComponent_Case_23_ng_container_0_Template, 1, 0, "ng-container", 16)(1, PhaseCardComponent_Case_23_ng_container_1_Template, 1, 0, "ng-container", 16)(2, PhaseCardComponent_Case_23_ng_container_2_Template, 1, 0, "ng-container", 16)(3, PhaseCardComponent_Case_23_ng_container_3_Template, 1, 0, "ng-container", 16);
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_9_0;
    const ctx_r1 = \u0275\u0275nextContext();
    const stat_r3 = \u0275\u0275reference(26);
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(8, _c7, (tmp_3_0 = ctx_r1.phase().groups) == null ? null : tmp_3_0.numGroups));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(10, _c8, (tmp_5_0 = ctx_r1.phase().groups) == null ? null : tmp_5_0.teamsPerGroup));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(12, _c9, (((tmp_7_0 = ctx_r1.phase().groups) == null ? null : tmp_7_0.advancePerGroup) ?? 0) + " por grupo"));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(14, _c10, ((tmp_9_0 = ctx_r1.phase().groups) == null ? null : tmp_9_0.legs) === 2 ? "Ida y Vuelta" : "Solo Ida"));
  }
}
function PhaseCardComponent_Case_24_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_24_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_24_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_24_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function PhaseCardComponent_Case_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, PhaseCardComponent_Case_24_ng_container_0_Template, 1, 0, "ng-container", 16)(1, PhaseCardComponent_Case_24_ng_container_1_Template, 1, 0, "ng-container", 16)(2, PhaseCardComponent_Case_24_ng_container_2_Template, 1, 0, "ng-container", 16)(3, PhaseCardComponent_Case_24_ng_container_3_Template, 1, 0, "ng-container", 16);
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_9_0;
    const ctx_r1 = \u0275\u0275nextContext();
    const stat_r3 = \u0275\u0275reference(26);
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(8, _c11, (tmp_3_0 = ctx_r1.phase().swiss) == null ? null : tmp_3_0.numRounds));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(10, _c122, ctx_r1.swissPairingLabel(((tmp_5_0 = ctx_r1.phase().swiss) == null ? null : tmp_5_0.pairingSystem) ?? "")));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(12, _c13, (tmp_7_0 = ctx_r1.phase().swiss) == null ? null : tmp_7_0.directAdvancedCount));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stat_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(14, _c14, (tmp_9_0 = ctx_r1.phase().swiss) == null ? null : tmp_9_0.playoffCount));
  }
}
function PhaseCardComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const label_r4 = ctx.label;
    const value_r5 = ctx.value;
    const wide_r6 = ctx.wide;
    \u0275\u0275classProp("col-span-2", wide_r6);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", label_r4, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(value_r5);
  }
}
var PhaseType;
(function(PhaseType2) {
  PhaseType2["League"] = "league";
  PhaseType2["Knockout"] = "knockout";
  PhaseType2["Groups"] = "groups";
  PhaseType2["Swiss"] = "swiss";
})(PhaseType || (PhaseType = {}));
var PhaseStatus;
(function(PhaseStatus2) {
  PhaseStatus2["Pending"] = "pending";
  PhaseStatus2["Active"] = "active";
  PhaseStatus2["Finished"] = "finished";
})(PhaseStatus || (PhaseStatus = {}));
var TYPE_META = {
  [PhaseType.League]: { label: "Liga", tw: "bg-blue-100  text-blue-700" },
  [PhaseType.Knockout]: { label: "Eliminatoria", tw: "bg-orange-100 text-orange-700" },
  [PhaseType.Groups]: { label: "Grupos", tw: "bg-purple-100 text-purple-700" },
  [PhaseType.Swiss]: { label: "Suizo", tw: "bg-emerald-100 text-emerald-700" }
};
var STATUS_META2 = {
  [PhaseStatus.Active]: { label: "En Curso", dotTw: "bg-green-500", pillTw: "bg-green-50  text-green-700  ring-green-200" },
  [PhaseStatus.Pending]: { label: "Pendiente", dotTw: "bg-amber-400", pillTw: "bg-amber-50  text-amber-700  ring-amber-200" },
  [PhaseStatus.Finished]: { label: "Finalizado", dotTw: "bg-slate-400", pillTw: "bg-slate-100 text-slate-600  ring-slate-200" }
};
function knockoutRounds(bracketSize) {
  const names = {
    32: "Dieciseisavos",
    16: "Octavos de Final",
    8: "Cuartos de Final",
    4: "Semifinal",
    2: "Final"
  };
  const rounds = [];
  let n = bracketSize;
  while (n >= 2) {
    if (names[n])
      rounds.push(names[n]);
    n = Math.floor(n / 2);
  }
  return rounds.join(", ");
}
function swissPairingLabel(sys) {
  return { dutch: "Holand\xE9s", accelerated: "Acelerado", monrad: "Monrad" }[sys] ?? sys;
}
var PhaseCardComponent = class _PhaseCardComponent {
  // ── Inputs / Outputs ──────────────────────────────────────────
  phase = input.required(__spreadValues({}, ngDevMode ? { debugName: "phase" } : {}));
  locked = input(false, __spreadValues({}, ngDevMode ? { debugName: "locked" } : {}));
  // true = fase base, no eliminable
  configure = output();
  delete = output();
  // ── Exposed helpers for template ──────────────────────────────
  knockoutRoundsLabel = () => knockoutRounds(this.phase().knockout?.bracketSize ?? 8);
  swissPairingLabel = swissPairingLabel;
  typeLabel() {
    return TYPE_META[this.phase().phaseType].label;
  }
  statusLabel() {
    return STATUS_META2[this.phase().status].label;
  }
  typeTagClass() {
    return TYPE_META[this.phase().phaseType].tw;
  }
  statusDotClass() {
    return STATUS_META2[this.phase().status].dotTw;
  }
  statusPillClass() {
    return STATUS_META2[this.phase().status].pillTw;
  }
  activeBorderClass() {
    const s = this.phase().status;
    if (s === PhaseStatus.Active)
      return "border-blue-300 shadow-[inset_3px_0_0_0_#3b82f6]";
    if (s === PhaseStatus.Finished)
      return "border-gray-200";
    return "border-gray-200";
  }
  orderBadgeClass() {
    const s = this.phase().status;
    if (s === PhaseStatus.Active)
      return "border-gray-100 bg-blue-50  text-blue-500";
    if (s === PhaseStatus.Pending)
      return "border-gray-100 bg-amber-50 text-amber-500";
    return "border-gray-100 bg-gray-50 text-gray-400";
  }
  static \u0275fac = function PhaseCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PhaseCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PhaseCardComponent, selectors: [["app-phase-card"]], inputs: { phase: [1, "phase"], locked: [1, "locked"] }, outputs: { configure: "configure", delete: "delete" }, decls: 27, vars: 18, consts: [["stat", ""], [1, "relative", "flex", "rounded-xl", "border", "bg-white", "transition-shadow", "duration-150", "hover:shadow-md"], [1, "flex", "w-12", "min-w-[3rem]", "shrink-0", "items-center", "justify-center", "rounded-l-xl", "border-r", "text-sm", "font-bold"], [1, "flex", "min-w-0", "flex-1", "flex-col", "gap-3", "px-4", "py-3"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "inline-block", "size-2", "shrink-0", "rounded-full"], [1, "text-[15px]", "font-semibold", "text-gray-900"], [1, "rounded-full", "px-2", "py-0.5", "text-[10px]", "font-bold", "uppercase", "tracking-wide"], [1, "inline-flex", "items-center", "gap-1.5", "rounded-full", "px-2.5", "py-0.5", "text-[11px]", "font-semibold", "ring-1", "ring-inset"], [1, "size-1.5", "rounded-full"], ["type", "button", 1, "ml-auto", "inline-flex", "items-center", "gap-1", "rounded-md", "px-2", "py-1", "text-[13px]", "text-gray-400", "transition-colors", "hover:bg-gray-50", "hover:text-gray-700", "active:bg-gray-100", 3, "click"], [1, "!size-[14px]", "!text-[14px]"], [1, "!size-4", "!text-[16px]"], ["title", "Fase base del formato \u2014 no se puede eliminar ni mover por delante de las fases base", 1, "inline-flex", "items-center", "gap-1", "px-2", "py-1", "rounded-md", "bg-gray-100", "text-gray-400", "text-[11px]", "font-medium"], [1, "grid", "grid-cols-2", "gap-2", "sm:grid-cols-4"], [1, "!size-[12px]", "!text-[12px]"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "flex", "flex-col", "gap-1", "rounded-lg", "border", "border-gray-100", "bg-gray-50", "px-3", "py-2.5"], [1, "text-[9px]", "font-bold", "uppercase", "tracking-widest", "text-gray-400"]], template: function PhaseCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
      \u0275\u0275element(5, "span", 5);
      \u0275\u0275elementStart(6, "span", 6);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 7);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 8);
      \u0275\u0275element(11, "span", 9);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 10);
      \u0275\u0275listener("click", function PhaseCardComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.configure.emit(ctx.phase()));
      });
      \u0275\u0275elementStart(14, "mat-icon", 11);
      \u0275\u0275text(15, "edit");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16, " Configurar ");
      \u0275\u0275elementStart(17, "mat-icon", 12);
      \u0275\u0275text(18, "chevron_right");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(19, PhaseCardComponent_Conditional_19_Template, 4, 0, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 14);
      \u0275\u0275conditionalCreate(21, PhaseCardComponent_Case_21_Template, 4, 16)(22, PhaseCardComponent_Case_22_Template, 3, 12)(23, PhaseCardComponent_Case_23_Template, 4, 16)(24, PhaseCardComponent_Case_24_Template, 4, 16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(25, PhaseCardComponent_ng_template_25_Template, 5, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_12_0;
      \u0275\u0275classMap(ctx.activeBorderClass());
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.orderBadgeClass());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.phase().phaseOrder, " ");
      \u0275\u0275advance(3);
      \u0275\u0275classMap(ctx.statusDotClass());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.phase().name, " ");
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.typeTagClass());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.typeLabel(), " ");
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.statusPillClass());
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.statusDotClass());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.statusLabel(), " ");
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.locked() ? 19 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_12_0 = ctx.phase().phaseType) === "league" ? 21 : tmp_12_0 === "knockout" ? 22 : tmp_12_0 === "groups" ? 23 : tmp_12_0 === "swiss" ? 24 : -1);
    }
  }, dependencies: [NgTemplateOutlet, MatIconModule, MatIcon], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PhaseCardComponent, [{
    type: Component,
    args: [{
      selector: "app-phase-card",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgTemplateOutlet, MatIconModule],
      template: `
    <!-- \u2500\u2500 Outer card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
    <div
      class="relative flex rounded-xl border bg-white transition-shadow duration-150 hover:shadow-md"
      [class]="activeBorderClass()"
    >
      <!-- Order badge (left column) -->
      <div
        class="flex w-12 min-w-[3rem] shrink-0 items-center justify-center rounded-l-xl border-r text-sm font-bold"
        [class]="orderBadgeClass()"
      >
        {{ phase().phaseOrder }}
      </div>

      <!-- Body -->
      <div class="flex min-w-0 flex-1 flex-col gap-3 px-4 py-3">

        <!-- \u2500\u2500 Title row \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
        <div class="flex flex-wrap items-center gap-2">

          <!-- Status dot -->
          <span
            class="inline-block size-2 shrink-0 rounded-full"
            [class]="statusDotClass()"
          ></span>

          <!-- Name -->
          <span class="text-[15px] font-semibold text-gray-900">
            {{ phase().name }}
          </span>

          <!-- Type tag -->
          <span
            class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            [class]="typeTagClass()"
          >
            {{ typeLabel() }}
          </span>

          <!-- Status pill -->
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset"
            [class]="statusPillClass()"
          >
            <span class="size-1.5 rounded-full" [class]="statusDotClass()"></span>
            {{ statusLabel() }}
          </span>

          <!-- Configure button -->
          <button
            class="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-[13px] text-gray-400
                   transition-colors hover:bg-gray-50 hover:text-gray-700 active:bg-gray-100"
            (click)="configure.emit(phase())"
            type="button"
          >
            <mat-icon class="!size-[14px] !text-[14px]">edit</mat-icon>
            Configurar
            <mat-icon class="!size-4 !text-[16px]">chevron_right</mat-icon>
          </button>

          <!-- Lock badge for base phases -->
          @if (locked()) {
            <div
              class="inline-flex items-center gap-1 px-2 py-1 rounded-md
                     bg-gray-100 text-gray-400 text-[11px] font-medium"
              title="Fase base del formato \u2014 no se puede eliminar ni mover por delante de las fases base"
            >
              <mat-icon class="!size-[12px] !text-[12px]">lock</mat-icon>
              Base
            </div>
          }
        </div>

        <!-- \u2500\u2500 Stats grid \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">

          @switch (phase().phaseType) {

            @case ('league') {
              <ng-container *ngTemplateOutlet="stat; context: { label: 'PTS. VICTORIA', value: phase().league?.winsPoints  }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'PTS. EMPATE',   value: phase().league?.drawPoints  }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'PTS. DERROTA',  value: phase().league?.lossPoints  }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'TOTAL RONDAS',  value: phase().league?.totalRounds }"></ng-container>
            }

            @case ('knockout') {
              <ng-container *ngTemplateOutlet="stat; context: { label: 'FORMATO',    value: phase().knockout?.legs === 2 ? 'Ida y Vuelta' : 'Solo Ida' }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: '3ER LUGAR',  value: phase().knockout?.thirdPlaceMatch ? 'S\xED' : 'No'           }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'RONDAS', value: knockoutRoundsLabel(), wide: true }"></ng-container>
            }

            @case ('groups') {
              <ng-container *ngTemplateOutlet="stat; context: { label: 'N\xB0 GRUPOS',     value: phase().groups?.numGroups     }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'EQ. POR GRUPO', value: phase().groups?.teamsPerGroup }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'AVANZAN',        value: (phase().groups?.advancePerGroup ?? 0) + ' por grupo' }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'PARTIDOS',       value: phase().groups?.legs === 2 ? 'Ida y Vuelta' : 'Solo Ida' }"></ng-container>
            }

            @case ('swiss') {
              <ng-container *ngTemplateOutlet="stat; context: { label: 'RONDAS',        value: phase().swiss?.numRounds                              }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'SISTEMA',       value: swissPairingLabel(phase().swiss?.pairingSystem ?? '') }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'CLASIF. DIREC.', value: phase().swiss?.directAdvancedCount                   }"></ng-container>
              <ng-container *ngTemplateOutlet="stat; context: { label: 'PLAYOFF',       value: phase().swiss?.playoffCount                           }"></ng-container>
            }

          }
        </div>

      </div>
    </div>

    <!-- \u2500\u2500 Stat cell template \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
    <ng-template #stat let-label="label" let-value="value" let-wide="wide">
      <div
        class="flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
        [class.col-span-2]="wide"
      >
        <span class="text-[9px] font-bold uppercase tracking-widest text-gray-400">
          {{ label }}
        </span>
        <span class="text-[15px] font-semibold text-gray-900">{{ value }}</span>
      </div>
    </ng-template>
  `
    }]
  }], null, { phase: [{ type: Input, args: [{ isSignal: true, alias: "phase", required: true }] }], locked: [{ type: Input, args: [{ isSignal: true, alias: "locked", required: false }] }], configure: [{ type: Output, args: ["configure"] }], delete: [{ type: Output, args: ["delete"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PhaseCardComponent, { className: "PhaseCardComponent", filePath: "src/app/features/admin/pages/championships/championship-components/phase-card.component.ts", lineNumber: 235 });
})();

// src/app/features/admin/pages/championships/championship-components/championship-phases.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function ChampionshipPhasesComponent_Conditional_1_For_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 15);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipPhasesComponent_Conditional_1_For_8_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ph_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ph_r5, " ");
  }
}
function ChampionshipPhasesComponent_Conditional_1_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_1_For_8_Template_button_click_0_listener() {
      const fmt_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectedFormat.set(fmt_r3.id));
    });
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12)(3, "mat-icon", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 14);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ChampionshipPhasesComponent_Conditional_1_For_8_Conditional_7_Template, 2, 0, "mat-icon", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 16);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 17);
    \u0275\u0275repeaterCreate(11, ChampionshipPhasesComponent_Conditional_1_For_8_For_12_Template, 2, 1, "span", 18, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const fmt_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("border-blue-500", ctx_r3.selectedFormat() === fmt_r3.id)("bg-blue-50", ctx_r3.selectedFormat() === fmt_r3.id)("border-gray-200", ctx_r3.selectedFormat() !== fmt_r3.id)("bg-white", ctx_r3.selectedFormat() !== fmt_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-blue-500", ctx_r3.selectedFormat() === fmt_r3.id)("text-white", ctx_r3.selectedFormat() === fmt_r3.id)("bg-gray-100", ctx_r3.selectedFormat() !== fmt_r3.id)("text-gray-500", ctx_r3.selectedFormat() !== fmt_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fmt_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fmt_r3.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.selectedFormat() === fmt_r3.id ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fmt_r3.description);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(fmt_r3.phases);
  }
}
function ChampionshipPhasesComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div")(2, "h2", 3);
    \u0275\u0275text(3, " Selecciona el formato del campeonato ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 4);
    \u0275\u0275text(5, " Esto define las fases base. Puedes agregar fases adicionales despu\xE9s. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 5);
    \u0275\u0275repeaterCreate(7, ChampionshipPhasesComponent_Conditional_1_For_8_Template, 13, 20, "button", 6, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 7)(10, "button", 8);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_1_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.applyFormat());
    });
    \u0275\u0275elementStart(11, "mat-icon", 9);
    \u0275\u0275text(12, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Confirmar formato ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r3.formatOptions);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r3.selectedFormat());
  }
}
function ChampionshipPhasesComponent_Conditional_2_For_23_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 43);
  }
}
function ChampionshipPhasesComponent_Conditional_2_For_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "div", 41);
    \u0275\u0275elementStart(2, "mat-icon", 42);
    \u0275\u0275text(3, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, ChampionshipPhasesComponent_Conditional_2_For_23_Conditional_1_Conditional_4_Template, 1, 0, "div", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_86_r9 = \u0275\u0275nextContext().$index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", "Fase base del formato " + ctx_r3.formatLabel() + " \u2014 no se puede eliminar");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(\u0275$index_86_r9 < ctx_r3.phases().length - 1 ? 4 : -1);
  }
}
function ChampionshipPhasesComponent_Conditional_2_For_23_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "mat-icon", 44);
    \u0275\u0275text(2, "drag_indicator");
    \u0275\u0275elementEnd()();
  }
}
function ChampionshipPhasesComponent_Conditional_2_For_23_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 37);
  }
}
function ChampionshipPhasesComponent_Conditional_2_For_23_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 40);
  }
}
function ChampionshipPhasesComponent_Conditional_2_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275listener("dragstart", function ChampionshipPhasesComponent_Conditional_2_For_23_Template_div_dragstart_0_listener($event) {
      const ph_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onDragStart($event, ph_r8));
    })("dragend", function ChampionshipPhasesComponent_Conditional_2_For_23_Template_div_dragend_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onDragEnd());
    })("dragover", function ChampionshipPhasesComponent_Conditional_2_For_23_Template_div_dragover_0_listener($event) {
      const ph_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onItemDragOver($event, ph_r8));
    });
    \u0275\u0275conditionalCreate(1, ChampionshipPhasesComponent_Conditional_2_For_23_Conditional_1_Template, 5, 2, "div", 34);
    \u0275\u0275elementStart(2, "div", 35);
    \u0275\u0275conditionalCreate(3, ChampionshipPhasesComponent_Conditional_2_For_23_Conditional_3_Template, 3, 0, "div", 36)(4, ChampionshipPhasesComponent_Conditional_2_For_23_Conditional_4_Template, 1, 0, "div", 37);
    \u0275\u0275elementStart(5, "div", 38)(6, "app-phase-card", 39);
    \u0275\u0275listener("configure", function ChampionshipPhasesComponent_Conditional_2_For_23_Template_app_phase_card_configure_6_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.openPhaseDetail($event));
    })("delete", function ChampionshipPhasesComponent_Conditional_2_For_23_Template_app_phase_card_delete_6_listener() {
      const ph_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ph_r8.isBase ? null : ctx_r3.deletePhase(ph_r8.id));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(7, ChampionshipPhasesComponent_Conditional_2_For_23_Conditional_7_Template, 1, 0, "div", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ph_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("opacity-50", ctx_r3.dragState.dragging && ctx_r3.dragState.dragId === ph_r8.id);
    \u0275\u0275property("draggable", !ph_r8.isBase);
    \u0275\u0275attribute("data-phase-id", ph_r8.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ph_r8.isBase ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ph_r8.isBase ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275property("phase", ph_r8)("locked", ph_r8.isBase ?? false);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.dragState.overId === ph_r8.id && ctx_r3.dragState.dragId !== ph_r8.id ? 7 : -1);
  }
}
function ChampionshipPhasesComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 19)(2, "div")(3, "div", 20)(4, "h2", 21);
    \u0275\u0275text(5, "Flujo de Competici\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 22)(7, "mat-icon", 23);
    \u0275\u0275text(8, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 24);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.changeFormat());
    });
    \u0275\u0275text(11, "Cambiar formato");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 25);
    \u0275\u0275text(13, " Arrastra las fases para reordenarlas. Las fases base ");
    \u0275\u0275elementStart(14, "mat-icon", 26);
    \u0275\u0275text(15, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " no se pueden eliminar. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 27);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_2_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addPhase());
    });
    \u0275\u0275elementStart(18, "mat-icon", 9);
    \u0275\u0275text(19, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " Agregar Fase ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 28);
    \u0275\u0275listener("dragover", function ChampionshipPhasesComponent_Conditional_2_Template_div_dragover_21_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onListDragOver($event));
    })("drop", function ChampionshipPhasesComponent_Conditional_2_Template_div_drop_21_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onListDrop($event));
    });
    \u0275\u0275repeaterCreate(22, ChampionshipPhasesComponent_Conditional_2_For_23_Template, 8, 9, "div", 29, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 30)(25, "button", 31);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_2_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.cancel.emit());
    });
    \u0275\u0275text(26, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 32);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_2_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveAll());
    });
    \u0275\u0275elementStart(28, "mat-icon", 9);
    \u0275\u0275text(29, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(30, " Guardar todos los cambios ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r3.formatLabel(), " ");
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r3.phases());
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r3.hasUnsavedChanges());
  }
}
function ChampionshipPhasesComponent_Conditional_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 76);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_3_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deletePhase(ctx_r3.editingPhaseId()));
    });
    \u0275\u0275elementStart(1, "mat-icon", 77);
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Eliminar fase ");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipPhasesComponent_Conditional_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "mat-icon", 78);
    \u0275\u0275text(2, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Fase base \xB7 no eliminable ");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipPhasesComponent_Conditional_3_Case_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 59)(2, "label", 79);
    \u0275\u0275text(3, "Puntos por Victoria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_55_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.winsPoints, $event) || (ctx_r3.phaseForm.winsPoints = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 59)(6, "label", 79);
    \u0275\u0275text(7, "Puntos por Empate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_55_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.drawPoints, $event) || (ctx_r3.phaseForm.drawPoints = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 5)(10, "div", 59)(11, "label", 79);
    \u0275\u0275text(12, "Puntos por Derrota");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_55_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.lossPoints, $event) || (ctx_r3.phaseForm.lossPoints = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 59)(15, "label", 79);
    \u0275\u0275text(16, "Total de Rondas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 81);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_55_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.totalRounds, $event) || (ctx_r3.phaseForm.totalRounds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 5)(19, "div", 59)(20, "label", 79);
    \u0275\u0275text(21, "Partidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_55_Template_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.legs, $event) || (ctx_r3.phaseForm.legs = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(23, "option", 82);
    \u0275\u0275text(24, "Solo Ida");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option", 82);
    \u0275\u0275text(26, "Ida y Vuelta");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 59)(28, "label", 79);
    \u0275\u0275text(29, "Equipos que Avanzan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_55_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.advanceCount, $event) || (ctx_r3.phaseForm.advanceCount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 59)(32, "label", 79);
    \u0275\u0275text(33, "Criterio de Desempate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_55_Template_select_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.tiebreakOrder, $event) || (ctx_r3.phaseForm.tiebreakOrder = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(35, "option", 83);
    \u0275\u0275text(36, "Puntos \u2192 Diferencia \u2192 GF \u2192 H2H \u2192 Azar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 84);
    \u0275\u0275text(38, "Puntos \u2192 Diferencia \u2192 GF \u2192 Azar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 85);
    \u0275\u0275text(40, "Puntos \u2192 H2H \u2192 Diferencia \u2192 GF");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.winsPoints);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.drawPoints);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.lossPoints);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.totalRounds);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.legs);
    \u0275\u0275advance();
    \u0275\u0275property("value", 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.advanceCount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.tiebreakOrder);
  }
}
function ChampionshipPhasesComponent_Conditional_3_Case_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 59)(2, "label", 79);
    \u0275\u0275text(3, "Formato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_56_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.knockoutLegs, $event) || (ctx_r3.phaseForm.knockoutLegs = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "option", 82);
    \u0275\u0275text(6, "Solo Ida");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 82);
    \u0275\u0275text(8, "Ida y Vuelta");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 59)(10, "label", 79);
    \u0275\u0275text(11, "Tama\xF1o del Bracket");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_56_Template_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.bracketSize, $event) || (ctx_r3.phaseForm.bracketSize = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(13, "option", 82);
    \u0275\u0275text(14, "4 equipos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 82);
    \u0275\u0275text(16, "8 equipos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 82);
    \u0275\u0275text(18, "16 equipos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 82);
    \u0275\u0275text(20, "32 equipos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "small", 67);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 5)(24, "div", 59)(25, "label", 79);
    \u0275\u0275text(26, "Desempate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_56_Template_select_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.tieBreak, $event) || (ctx_r3.phaseForm.tieBreak = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(28, "option", 86);
    \u0275\u0275text(29, "Penaltis");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 87);
    \u0275\u0275text(31, "Tiempo Extra + Penaltis");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 88);
    \u0275\u0275text(33, "Gol de Visitante");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 59)(35, "label", 79);
    \u0275\u0275text(36, "Criterio de Sembrado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_56_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.seeding, $event) || (ctx_r3.phaseForm.seeding = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(38, "option", 89);
    \u0275\u0275text(39, "Por clasificaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "option", 90);
    \u0275\u0275text(41, "Aleatorio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "option", 91);
    \u0275\u0275text(43, "Manual");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(44, "div", 5)(45, "div", 92)(46, "label", 79);
    \u0275\u0275text(47, "Partido 3er Lugar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 93);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_3_Case_56_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.phaseForm.thirdPlaceMatch = !ctx_r3.phaseForm.thirdPlaceMatch);
    });
    \u0275\u0275element(49, "span", 94);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 92)(51, "label", 79);
    \u0275\u0275text(52, "Gol Visitante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "button", 93);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_3_Case_56_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.phaseForm.awayGoalsRule = !ctx_r3.phaseForm.awayGoalsRule);
    });
    \u0275\u0275element(54, "span", 94);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.knockoutLegs);
    \u0275\u0275advance();
    \u0275\u0275property("value", 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.bracketSize);
    \u0275\u0275advance();
    \u0275\u0275property("value", 4);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 8);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 16);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 32);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.knockoutRoundsLabel(ctx_r3.phaseForm.bracketSize));
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.tieBreak);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.seeding);
    \u0275\u0275advance(11);
    \u0275\u0275styleProp("background", ctx_r3.phaseForm.thirdPlaceMatch ? "#3b82f6" : "#d1d5db");
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", ctx_r3.phaseForm.thirdPlaceMatch ? "translateX(18px)" : "translateX(2px)");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("background", ctx_r3.phaseForm.awayGoalsRule ? "#3b82f6" : "#d1d5db");
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", ctx_r3.phaseForm.awayGoalsRule ? "translateX(18px)" : "translateX(2px)");
  }
}
function ChampionshipPhasesComponent_Conditional_3_Case_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 59)(2, "label", 79);
    \u0275\u0275text(3, "N\xFAmero de Grupos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 95);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_57_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.numGroups, $event) || (ctx_r3.phaseForm.numGroups = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 59)(6, "label", 79);
    \u0275\u0275text(7, "Equipos por Grupo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 95);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_57_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.teamsPerGroup, $event) || (ctx_r3.phaseForm.teamsPerGroup = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 5)(10, "div", 59)(11, "label", 79);
    \u0275\u0275text(12, "Partidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_57_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.groupLegs, $event) || (ctx_r3.phaseForm.groupLegs = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "option", 82);
    \u0275\u0275text(15, "Solo Ida");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 82);
    \u0275\u0275text(17, "Ida y Vuelta");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 59)(19, "label", 79);
    \u0275\u0275text(20, "Avanzan por Grupo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 81);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_57_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.advancePerGroup, $event) || (ctx_r3.phaseForm.advancePerGroup = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 5)(23, "div", 59)(24, "label", 79);
    \u0275\u0275text(25, "Mejores Terceros");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_57_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.advanceBestThirds, $event) || (ctx_r3.phaseForm.advanceBestThirds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 59)(28, "label", 79);
    \u0275\u0275text(29, "Asignaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_57_Template_select_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.assignment, $event) || (ctx_r3.phaseForm.assignment = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(31, "option", 91);
    \u0275\u0275text(32, "Manual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 90);
    \u0275\u0275text(34, "Aleatoria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 96);
    \u0275\u0275text(36, "Sembrada");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(37, "div", 59)(38, "label", 79);
    \u0275\u0275text(39, "Criterio de Desempate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_57_Template_select_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.groupTiebreakOrder, $event) || (ctx_r3.phaseForm.groupTiebreakOrder = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(41, "option", 83);
    \u0275\u0275text(42, "Puntos \u2192 Diferencia \u2192 GF \u2192 H2H \u2192 Azar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 84);
    \u0275\u0275text(44, "Puntos \u2192 Diferencia \u2192 GF \u2192 Azar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.numGroups);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.teamsPerGroup);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.groupLegs);
    \u0275\u0275advance();
    \u0275\u0275property("value", 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.advancePerGroup);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.advanceBestThirds);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.assignment);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.groupTiebreakOrder);
  }
}
function ChampionshipPhasesComponent_Conditional_3_Case_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 59)(2, "label", 79);
    \u0275\u0275text(3, "N\xFAmero de Rondas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 81);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_58_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.numRounds, $event) || (ctx_r3.phaseForm.numRounds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 59)(6, "label", 79);
    \u0275\u0275text(7, "Sistema de Emparejamiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_58_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.pairingSystem, $event) || (ctx_r3.phaseForm.pairingSystem = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 97);
    \u0275\u0275text(10, "Holand\xE9s (Dutch)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 98);
    \u0275\u0275text(12, "Acelerado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 99);
    \u0275\u0275text(14, "Monrad");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "div", 5)(16, "div", 59)(17, "label", 79);
    \u0275\u0275text(18, "Primera Ronda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_58_Template_select_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.firstRound, $event) || (ctx_r3.phaseForm.firstRound = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(20, "option", 90);
    \u0275\u0275text(21, "Aleatoria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 96);
    \u0275\u0275text(23, "Sembrada por ranking");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 59)(25, "label", 79);
    \u0275\u0275text(26, "Criterio de Desempate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_58_Template_select_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.swissTiebreakOrder, $event) || (ctx_r3.phaseForm.swissTiebreakOrder = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(28, "option", 100);
    \u0275\u0275text(29, "Puntos \u2192 Buchholz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 101);
    \u0275\u0275text(31, "Puntos \u2192 Sonneborn-Berger");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "div", 5)(33, "div", 59)(34, "label", 79);
    \u0275\u0275text(35, "Clasificados Directos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_58_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.directAdvancedCount, $event) || (ctx_r3.phaseForm.directAdvancedCount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 59)(38, "label", 79);
    \u0275\u0275text(39, "Clasificados a Playoff");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Case_58_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.playoffCount, $event) || (ctx_r3.phaseForm.playoffCount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 102)(42, "label", 79);
    \u0275\u0275text(43, "Permitir Revancha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 93);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_3_Case_58_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.phaseForm.allowRematch = !ctx_r3.phaseForm.allowRematch);
    });
    \u0275\u0275element(45, "span", 94);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.numRounds);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.pairingSystem);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.firstRound);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.swissTiebreakOrder);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.directAdvancedCount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.playoffCount);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("background", ctx_r3.phaseForm.allowRematch ? "#3b82f6" : "#d1d5db");
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", ctx_r3.phaseForm.allowRematch ? "translateX(18px)" : "translateX(2px)");
  }
}
function ChampionshipPhasesComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 45)(2, "button", 46);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.cancelEdit());
    });
    \u0275\u0275elementStart(3, "mat-icon", 9);
    \u0275\u0275text(4, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Todas las fases ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 47);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 48);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "div", 49);
    \u0275\u0275conditionalCreate(11, ChampionshipPhasesComponent_Conditional_3_Conditional_11_Template, 4, 0, "button", 50);
    \u0275\u0275conditionalCreate(12, ChampionshipPhasesComponent_Conditional_3_Conditional_12_Template, 4, 0, "div", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 52)(14, "div", 53)(15, "span", 54);
    \u0275\u0275text(16, "\u283F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 55);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 56);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 48);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 57);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 58)(26, "div", 5)(27, "div", 59)(28, "label", 60);
    \u0275\u0275text(29, "Nombre de la Fase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 61);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.name, $event) || (ctx_r3.phaseForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 59)(32, "label", 60);
    \u0275\u0275text(33, "Tipo de Fase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "select", 62);
    \u0275\u0275listener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Template_select_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onTypeChange($event));
    });
    \u0275\u0275elementStart(35, "option", 63);
    \u0275\u0275text(36, "Liga");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 64);
    \u0275\u0275text(38, "Eliminatoria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 65);
    \u0275\u0275text(40, "Grupos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option", 66);
    \u0275\u0275text(42, "Suizo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "small", 67);
    \u0275\u0275text(44, "El cambio de tipo reinicia la configuraci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 68)(46, "label", 60);
    \u0275\u0275text(47, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipPhasesComponent_Conditional_3_Template_select_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.phaseForm.status, $event) || (ctx_r3.phaseForm.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(49, "option", 69);
    \u0275\u0275text(50, "Pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "option", 70);
    \u0275\u0275text(52, "En Curso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "option", 71);
    \u0275\u0275text(54, "Finalizado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(55, ChampionshipPhasesComponent_Conditional_3_Case_55_Template, 41, 9)(56, ChampionshipPhasesComponent_Conditional_3_Case_56_Template, 55, 19)(57, ChampionshipPhasesComponent_Conditional_3_Case_57_Template, 45, 9)(58, ChampionshipPhasesComponent_Conditional_3_Case_58_Template, 46, 10);
    \u0275\u0275elementStart(59, "div", 72)(60, "button", 73);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_3_Template_button_click_60_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.cancelEdit());
    });
    \u0275\u0275text(61, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "button", 74);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_3_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.savePhase());
    });
    \u0275\u0275elementStart(63, "mat-icon", 9);
    \u0275\u0275text(64, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(65, " Guardar Fase ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(66, "div", 30)(67, "button", 73);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_3_Template_button_click_67_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.cancel.emit());
    });
    \u0275\u0275text(68, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "button", 75);
    \u0275\u0275listener("click", function ChampionshipPhasesComponent_Conditional_3_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveAll());
    });
    \u0275\u0275elementStart(70, "mat-icon", 9);
    \u0275\u0275text(71, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(72, " Guardar todos los cambios ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_20_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r3.phaseForm.name || "Nueva Fase", " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.phaseTypeTagClass(ctx_r3.phaseFormType()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.phaseTypeLabel(ctx_r3.phaseFormType()), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r3.isNewPhase() && !ctx_r3.editingPhaseIsBase() ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.editingPhaseIsBase() ? 12 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r3.phaseForm.phaseOrder, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.phaseForm.name || "Nueva Fase", " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.phaseTypeTagClass(ctx_r3.phaseFormType()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.phaseTypeLabel(ctx_r3.phaseFormType()), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-green-50", ctx_r3.phaseForm.status === "active")("text-green-700", ctx_r3.phaseForm.status === "active")("bg-amber-50", ctx_r3.phaseForm.status === "pending")("text-amber-700", ctx_r3.phaseForm.status === "pending")("bg-gray-100", ctx_r3.phaseForm.status === "finished")("text-gray-600", ctx_r3.phaseForm.status === "finished");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.phaseStatusLabel(ctx_r3.phaseForm.status), " ");
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.name);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r3.phaseFormType());
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.phaseForm.status);
    \u0275\u0275advance(7);
    \u0275\u0275conditional((tmp_20_0 = ctx_r3.phaseFormType()) === "league" ? 55 : tmp_20_0 === "knockout" ? 56 : tmp_20_0 === "groups" ? 57 : tmp_20_0 === "swiss" ? 58 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", !ctx_r3.phaseForm.name.trim());
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", !ctx_r3.hasUnsavedChanges());
  }
}
var FORMAT_OPTIONS = [
  {
    id: "league",
    label: "Liga",
    description: "Todos los equipos se enfrentan entre s\xED. El mejor clasificado gana.",
    icon: "emoji_events",
    phases: ["Fase de Liga"]
  },
  {
    id: "groups_knockout",
    label: "Grupos + Eliminatoria",
    description: "Fase de grupos inicial seguida de rondas eliminatorias.",
    icon: "account_tree",
    phases: ["Fase de Grupos", "Fase Eliminatoria"]
  },
  {
    id: "knockout",
    label: "Eliminatoria directa",
    description: "Bracket de eliminaci\xF3n directa desde la primera ronda.",
    icon: "merge",
    phases: ["Fase Eliminatoria"]
  },
  {
    id: "swiss_playoff",
    label: "Suizo + Playoff",
    description: "Rondas suizas clasificatorias seguidas de un playoff final.",
    icon: "swap_vert",
    phases: ["Fase Suiza", "Playoff"]
  }
];
var BASE_PHASES = {
  league: () => [{
    id: 1,
    name: "Fase de Liga",
    phaseType: PhaseType.League,
    phaseOrder: 1,
    status: PhaseStatus.Pending,
    isBase: true,
    league: { winsPoints: 3, drawPoints: 1, lossPoints: 0, totalRounds: 10, legs: 1, tiebreakOrder: "points,diff,gf,h2h,random", advanceCount: 4 }
  }],
  groups_knockout: () => [
    {
      id: 1,
      name: "Fase de Grupos",
      phaseType: PhaseType.Groups,
      phaseOrder: 1,
      status: PhaseStatus.Pending,
      isBase: true,
      groups: { numGroups: 4, teamsPerGroup: 4, legs: 1, advancePerGroup: 2, advanceBestThirds: 0, tiebreakOrder: "points,diff,gf,h2h,random" }
    },
    {
      id: 2,
      name: "Fase Eliminatoria",
      phaseType: PhaseType.Knockout,
      phaseOrder: 2,
      status: PhaseStatus.Pending,
      isBase: true,
      knockout: { legs: 1, bracketSize: 8, thirdPlaceMatch: true, seeding: "ranking", awayGoalsRule: false, tieBreak: "penalties" }
    }
  ],
  knockout: () => [{
    id: 1,
    name: "Fase Eliminatoria",
    phaseType: PhaseType.Knockout,
    phaseOrder: 1,
    status: PhaseStatus.Pending,
    isBase: true,
    knockout: { legs: 1, bracketSize: 8, thirdPlaceMatch: true, seeding: "ranking", awayGoalsRule: false, tieBreak: "penalties" }
  }],
  swiss_playoff: () => [
    {
      id: 1,
      name: "Fase Suiza",
      phaseType: PhaseType.Swiss,
      phaseOrder: 1,
      status: PhaseStatus.Pending,
      isBase: true,
      swiss: { numRounds: 7, pairingSystem: "dutch", firstRound: "random", allowRematch: false, tiebreakOrder: "points,buchholz", directAdvancedCount: 2, playoffCount: 4 }
    },
    {
      id: 2,
      name: "Playoff",
      phaseType: PhaseType.Knockout,
      phaseOrder: 2,
      status: PhaseStatus.Pending,
      isBase: true,
      knockout: { legs: 1, bracketSize: 4, thirdPlaceMatch: false, seeding: "ranking", awayGoalsRule: false, tieBreak: "penalties" }
    }
  ]
};
var _nextPhaseId = 100;
var ChampionshipPhasesComponent = class _ChampionshipPhasesComponent {
  // ── Inputs / Outputs ──────────────────────────────────────────
  /** Fases pre-existentes (modo edición — viene del backend) */
  initialPhases = input([], __spreadValues({}, ngDevMode ? { debugName: "initialPhases" } : {}));
  initialFormat = input(null, __spreadValues({}, ngDevMode ? { debugName: "initialFormat" } : {}));
  phasesChange = output();
  cancel = output();
  save = output();
  // ── Services ──────────────────────────────────────────────────
  snackBar = inject(MatSnackBar);
  cdr = inject(ChangeDetectorRef);
  // ── Static ────────────────────────────────────────────────────
  formatOptions = FORMAT_OPTIONS;
  // ── State ─────────────────────────────────────────────────────
  viewMode = signal("format-picker", __spreadValues({}, ngDevMode ? { debugName: "viewMode" } : {}));
  selectedFormat = signal(null, __spreadValues({}, ngDevMode ? { debugName: "selectedFormat" } : {}));
  activeFormat = signal(null, __spreadValues({}, ngDevMode ? { debugName: "activeFormat" } : {}));
  phases = signal([], __spreadValues({}, ngDevMode ? { debugName: "phases" } : {}));
  originalPhases = signal([], __spreadValues({}, ngDevMode ? { debugName: "originalPhases" } : {}));
  editingPhaseId = signal(null, __spreadValues({}, ngDevMode ? { debugName: "editingPhaseId" } : {}));
  phaseFormType = signal(PhaseType.League, __spreadValues({}, ngDevMode ? { debugName: "phaseFormType" } : {}));
  hasUnsavedChanges = signal(false, __spreadValues({}, ngDevMode ? { debugName: "hasUnsavedChanges" } : {}));
  // Drag state (plain object — not signal, updated via CD)
  dragState = { dragging: false, dragId: null, overId: null };
  // ── Phase form ────────────────────────────────────────────────
  phaseForm = {
    phaseId: null,
    name: "",
    status: PhaseStatus.Pending,
    phaseOrder: 1,
    winsPoints: 3,
    drawPoints: 1,
    lossPoints: 0,
    totalRounds: 10,
    legs: 1,
    tiebreakOrder: "points,diff,gf,h2h,random",
    advanceCount: 4,
    knockoutLegs: 1,
    bracketSize: 8,
    thirdPlaceMatch: false,
    seeding: "ranking",
    awayGoalsRule: false,
    tieBreak: "penalties",
    numGroups: 4,
    teamsPerGroup: 4,
    groupLegs: 1,
    advancePerGroup: 2,
    advanceBestThirds: 0,
    assignment: "manual",
    groupTiebreakOrder: "points,diff,gf,h2h,random",
    numRounds: 7,
    pairingSystem: "dutch",
    firstRound: "random",
    allowRematch: false,
    swissTiebreakOrder: "points,buchholz",
    directAdvancedCount: 2,
    playoffCount: 4
  };
  // ── Computed ──────────────────────────────────────────────────
  isNewPhase = computed(() => !this.phaseForm.phaseId, __spreadValues({}, ngDevMode ? { debugName: "isNewPhase" } : {}));
  editingPhaseIsBase = computed(() => {
    const id = this.editingPhaseId();
    if (!id)
      return false;
    return this.phases().find((p) => p.id === id)?.isBase ?? false;
  }, __spreadValues({}, ngDevMode ? { debugName: "editingPhaseIsBase" } : {}));
  formatLabel = computed(() => FORMAT_OPTIONS.find((f) => f.id === this.activeFormat())?.label ?? "", __spreadValues({}, ngDevMode ? { debugName: "formatLabel" } : {}));
  // ── Lifecycle ─────────────────────────────────────────────────
  ngOnInit() {
    const existing = this.initialPhases();
    if (existing.length > 0) {
      this.phases.set(existing.map((p) => __spreadValues({}, p)));
      this.originalPhases.set(existing.map((p) => __spreadValues({}, p)));
      const fmt = this.initialFormat() ?? this.inferFormat(existing);
      if (fmt) {
        this.activeFormat.set(fmt);
        this.selectedFormat.set(fmt);
      }
      this.viewMode.set("list");
    }
  }
  /** Infiere el formato del campeonato a partir de los tipos de fases existentes. */
  inferFormat(phases) {
    const types = new Set(phases.map((p) => p.phaseType));
    if (types.has(PhaseType.Swiss))
      return "swiss_playoff";
    if (types.has(PhaseType.Groups))
      return "groups_knockout";
    if (types.has(PhaseType.Knockout) && !types.has(PhaseType.League))
      return "knockout";
    if (types.has(PhaseType.League))
      return "league";
    return null;
  }
  // ── Format picker ─────────────────────────────────────────────
  applyFormat() {
    const fmt = this.selectedFormat();
    if (!fmt)
      return;
    this.activeFormat.set(fmt);
    const base = BASE_PHASES[fmt]();
    this.phases.set(base);
    this.originalPhases.set(base.map((p) => __spreadValues({}, p)));
    this.hasUnsavedChanges.set(true);
    this.viewMode.set("list");
    this.phasesChange.emit(this.phases());
  }
  changeFormat() {
    if (this.phases().some((p) => p.status === PhaseStatus.Active)) {
      this.snackBar.open("No puedes cambiar el formato: hay fases en curso.", "Cerrar", { duration: 3500 });
      return;
    }
    this.selectedFormat.set(this.activeFormat());
    this.viewMode.set("format-picker");
  }
  // ── Phase CRUD ────────────────────────────────────────────────
  openPhaseDetail(phase) {
    this.editingPhaseId.set(phase.id);
    this.phaseFormType.set(phase.phaseType);
    Object.assign(this.phaseForm, {
      phaseId: phase.id,
      name: phase.name,
      status: phase.status,
      phaseOrder: phase.phaseOrder
    });
    if (phase.league)
      Object.assign(this.phaseForm, { winsPoints: phase.league.winsPoints, drawPoints: phase.league.drawPoints, lossPoints: phase.league.lossPoints, totalRounds: phase.league.totalRounds, legs: phase.league.legs, tiebreakOrder: phase.league.tiebreakOrder, advanceCount: phase.league.advanceCount });
    if (phase.knockout)
      Object.assign(this.phaseForm, { knockoutLegs: phase.knockout.legs, bracketSize: phase.knockout.bracketSize, thirdPlaceMatch: phase.knockout.thirdPlaceMatch, seeding: phase.knockout.seeding, awayGoalsRule: phase.knockout.awayGoalsRule, tieBreak: phase.knockout.tieBreak });
    if (phase.groups)
      Object.assign(this.phaseForm, { numGroups: phase.groups.numGroups, teamsPerGroup: phase.groups.teamsPerGroup, groupLegs: phase.groups.legs, advancePerGroup: phase.groups.advancePerGroup, advanceBestThirds: phase.groups.advanceBestThirds, groupTiebreakOrder: phase.groups.tiebreakOrder });
    if (phase.swiss)
      Object.assign(this.phaseForm, { numRounds: phase.swiss.numRounds, pairingSystem: phase.swiss.pairingSystem, firstRound: phase.swiss.firstRound, allowRematch: phase.swiss.allowRematch, swissTiebreakOrder: phase.swiss.tiebreakOrder, directAdvancedCount: phase.swiss.directAdvancedCount, playoffCount: phase.swiss.playoffCount });
    this.viewMode.set("detail");
  }
  addPhase() {
    this.editingPhaseId.set(null);
    this.phaseFormType.set(PhaseType.League);
    Object.assign(this.phaseForm, {
      phaseId: null,
      name: "",
      status: PhaseStatus.Pending,
      phaseOrder: this.phases().length + 1,
      winsPoints: 3,
      drawPoints: 1,
      lossPoints: 0,
      totalRounds: 10,
      legs: 1,
      tiebreakOrder: "points,diff,gf,h2h,random",
      advanceCount: 4
    });
    this.viewMode.set("detail");
  }
  savePhase() {
    if (!this.phaseForm.name.trim())
      return;
    const t = this.phaseFormType();
    const existing = this.phases().find((p) => p.id === this.phaseForm.phaseId);
    const phase = __spreadValues(__spreadValues(__spreadValues(__spreadValues({
      id: existing?.id ?? _nextPhaseId++,
      name: this.phaseForm.name,
      phaseType: t,
      phaseOrder: this.phaseForm.phaseOrder,
      status: this.phaseForm.status,
      isBase: existing?.isBase ?? false
    }, t === PhaseType.League && { league: { winsPoints: this.phaseForm.winsPoints, drawPoints: this.phaseForm.drawPoints, lossPoints: this.phaseForm.lossPoints, totalRounds: this.phaseForm.totalRounds, legs: this.phaseForm.legs, tiebreakOrder: this.phaseForm.tiebreakOrder, advanceCount: this.phaseForm.advanceCount } }), t === PhaseType.Knockout && { knockout: { legs: this.phaseForm.knockoutLegs, bracketSize: this.phaseForm.bracketSize, thirdPlaceMatch: this.phaseForm.thirdPlaceMatch, seeding: this.phaseForm.seeding, awayGoalsRule: this.phaseForm.awayGoalsRule, tieBreak: this.phaseForm.tieBreak } }), t === PhaseType.Groups && { groups: { numGroups: this.phaseForm.numGroups, teamsPerGroup: this.phaseForm.teamsPerGroup, legs: this.phaseForm.groupLegs, advancePerGroup: this.phaseForm.advancePerGroup, advanceBestThirds: this.phaseForm.advanceBestThirds, tiebreakOrder: this.phaseForm.groupTiebreakOrder } }), t === PhaseType.Swiss && { swiss: { numRounds: this.phaseForm.numRounds, pairingSystem: this.phaseForm.pairingSystem, firstRound: this.phaseForm.firstRound, allowRematch: this.phaseForm.allowRematch, tiebreakOrder: this.phaseForm.swissTiebreakOrder, directAdvancedCount: this.phaseForm.directAdvancedCount, playoffCount: this.phaseForm.playoffCount } });
    this.phases.update((list) => existing ? list.map((p) => p.id === phase.id ? phase : p) : [...list, phase]);
    this.hasUnsavedChanges.set(true);
    this.phasesChange.emit(this.phases());
    this.viewMode.set("list");
    this.snackBar.open(`Fase "${phase.name}" guardada`, "Cerrar", { duration: 2e3 });
  }
  deletePhase(id) {
    const phase = this.phases().find((p) => p.id === id);
    if (phase?.isBase) {
      this.snackBar.open("Las fases base del formato no se pueden eliminar", "Cerrar", { duration: 3e3 });
      return;
    }
    this.phases.update((list) => list.filter((p) => p.id !== id).map((p, i) => __spreadProps(__spreadValues({}, p), { phaseOrder: i + 1 })));
    this.hasUnsavedChanges.set(true);
    this.phasesChange.emit(this.phases());
    if (this.viewMode() === "detail")
      this.viewMode.set("list");
  }
  cancelEdit() {
    this.viewMode.set("list");
  }
  saveAll() {
    this.save.emit(this.phases());
    this.originalPhases.set(this.phases().map((p) => __spreadValues({}, p)));
    this.hasUnsavedChanges.set(false);
    this.snackBar.open("Cambios guardados", "Cerrar", { duration: 2500 });
  }
  // ── Type change ───────────────────────────────────────────────
  onTypeChange(type) {
    this.phaseFormType.set(type);
    const defaults = {
      [PhaseType.League]: { winsPoints: 3, drawPoints: 1, lossPoints: 0, totalRounds: 10, legs: 1, tiebreakOrder: "points,diff,gf,h2h,random", advanceCount: 4 },
      [PhaseType.Knockout]: { knockoutLegs: 1, bracketSize: 8, thirdPlaceMatch: false, seeding: "ranking", awayGoalsRule: false, tieBreak: "penalties" },
      [PhaseType.Groups]: { numGroups: 4, teamsPerGroup: 4, groupLegs: 1, advancePerGroup: 2, advanceBestThirds: 0, assignment: "manual", groupTiebreakOrder: "points,diff,gf,h2h,random" },
      [PhaseType.Swiss]: { numRounds: 7, pairingSystem: "dutch", firstRound: "random", allowRematch: false, swissTiebreakOrder: "points,buchholz", directAdvancedCount: 2, playoffCount: 4 }
    };
    Object.assign(this.phaseForm, defaults[type]);
    this.cdr.markForCheck();
  }
  // ── Drag & Drop (HTML5 native) ────────────────────────────────
  onDragStart(event, phase) {
    if (phase.isBase) {
      event.preventDefault();
      return;
    }
    this.dragState = { dragging: true, dragId: phase.id, overId: null };
    event.dataTransfer?.setData("text/plain", String(phase.id));
    this.cdr.markForCheck();
  }
  onDragEnd() {
    this.dragState = { dragging: false, dragId: null, overId: null };
    this.cdr.markForCheck();
  }
  onItemDragOver(event, target) {
    event.preventDefault();
    if (this.dragState.dragId === target.id)
      return;
    this.dragState.overId = target.id;
    this.cdr.markForCheck();
  }
  onListDragOver(event) {
    event.preventDefault();
  }
  onListDrop(event) {
    event.preventDefault();
    const dragId = this.dragState.dragId;
    const overId = this.dragState.overId;
    this.dragState = { dragging: false, dragId: null, overId: null };
    if (!dragId || dragId === overId) {
      this.cdr.markForCheck();
      return;
    }
    const list = [...this.phases()];
    const fromIdx = list.findIndex((p) => p.id === dragId);
    const toIdx = overId ? list.findIndex((p) => p.id === overId) : list.length - 1;
    if (fromIdx === -1 || toIdx === -1) {
      this.cdr.markForCheck();
      return;
    }
    const baseCutoff = list.filter((p) => p.isBase).length;
    if (toIdx < baseCutoff) {
      this.cdr.markForCheck();
      return;
    }
    const [moved] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, moved);
    const reordered = list.map((p, i) => __spreadProps(__spreadValues({}, p), { phaseOrder: i + 1 }));
    this.phases.set(reordered);
    this.hasUnsavedChanges.set(true);
    this.phasesChange.emit(reordered);
    this.cdr.markForCheck();
  }
  // ── UI helpers ────────────────────────────────────────────────
  phaseTypeLabel(type) {
    return { league: "Liga", knockout: "Eliminatoria", groups: "Grupos", swiss: "Suizo" }[type] ?? type;
  }
  phaseStatusLabel(status) {
    return { pending: "Pendiente", active: "En Curso", finished: "Finalizado" }[status] ?? status;
  }
  phaseTypeTagClass(type) {
    return {
      league: "bg-blue-100 text-blue-700",
      knockout: "bg-orange-100 text-orange-700",
      groups: "bg-purple-100 text-purple-700",
      swiss: "bg-emerald-100 text-emerald-700"
    }[type] ?? "bg-gray-100 text-gray-600";
  }
  knockoutRoundsLabel(size) {
    const map2 = { 2: "Final", 4: "Semifinal", 8: "Cuartos", 16: "Octavos", 32: "Dieciseisavos" };
    const r = [];
    let n = size;
    while (n >= 2) {
      if (map2[n])
        r.push(map2[n]);
      n = Math.floor(n / 2);
    }
    return r.join(", ");
  }
  static \u0275fac = function ChampionshipPhasesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChampionshipPhasesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChampionshipPhasesComponent, selectors: [["app-championship-phases"]], inputs: { initialPhases: [1, "initialPhases"], initialFormat: [1, "initialFormat"] }, outputs: { phasesChange: "phasesChange", cancel: "cancel", save: "save" }, decls: 4, vars: 3, consts: [[1, "max-w-[960px]", "mx-auto", "px-7", "pt-7", "pb-8"], [1, "flex", "flex-col", "gap-6"], [1, "flex", "flex-col", "gap-5"], [1, "text-[1.05rem]", "font-bold", "text-gray-900", "m-0", "mb-1"], [1, "text-[13px]", "text-gray-500", "m-0"], [1, "grid", "grid-cols-2", "gap-4"], ["type", "button", 1, "flex", "flex-col", "gap-3", "p-5", "rounded-xl", "border-2", "text-left", "cursor-pointer", "transition-all", "hover:border-blue-300", "hover:bg-blue-50/50", "group", 3, "border-blue-500", "bg-blue-50", "border-gray-200", "bg-white"], [1, "flex", "justify-end", "gap-2.5"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-5", "py-2.5", "rounded-lg", "bg-blue-500", "text-white", "text-[13px]", "font-semibold", "border-none", "cursor-pointer", "hover:bg-blue-600", "transition-colors", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "!size-4", "!text-[16px]"], ["type", "button", 1, "flex", "flex-col", "gap-3", "p-5", "rounded-xl", "border-2", "text-left", "cursor-pointer", "transition-all", "hover:border-blue-300", "hover:bg-blue-50/50", "group", 3, "click"], [1, "flex", "items-center", "gap-3"], [1, "size-9", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0", "transition-colors"], [1, "!size-[18px]", "!text-[18px]"], [1, "text-[14px]", "font-bold", "text-gray-900"], [1, "!size-4", "!text-[16px]", "text-blue-500", "ml-auto"], [1, "m-0", "text-[12.5px]", "text-gray-500", "leading-relaxed"], [1, "flex", "flex-wrap", "gap-1.5"], [1, "text-[10.5px]", "font-semibold", "px-2", "py-0.5", "rounded-full", "bg-gray-100", "text-gray-600"], [1, "flex", "items-start", "justify-between", "gap-4"], [1, "flex", "items-center", "gap-2.5"], [1, "text-[1rem]", "font-bold", "text-gray-900", "m-0"], [1, "inline-flex", "items-center", "gap-1", "text-[11px]", "font-semibold", "px-2.5", "py-1", "rounded-full", "bg-blue-100", "text-blue-700", "border", "border-blue-200"], [1, "!size-3", "!text-[12px]"], ["type", "button", "title", "Cambiar formato resetea las fases base", 1, "text-[11px]", "text-gray-400", "underline", "cursor-pointer", "bg-transparent", "border-none", "hover:text-gray-600", "transition-colors", 3, "click"], [1, "text-[13px]", "text-gray-500", "m-0", "mt-0.5"], [1, "!size-3", "!text-[12px]", "text-gray-400", "inline-block", "align-middle"], [1, "inline-flex", "items-center", "gap-1.5", "px-[18px]", "py-2", "rounded-lg", "bg-blue-500", "text-white", "text-[13px]", "font-semibold", "border-none", "cursor-pointer", "hover:bg-blue-600", "transition-colors", "shrink-0", 3, "click"], [1, "flex", "flex-col", "gap-3", 3, "dragover", "drop"], [1, "relative", "transition-opacity", "duration-150", 3, "opacity-50", "draggable"], [1, "flex", "justify-end", "gap-2.5", "pt-4", "border-t", "border-gray-200"], [1, "inline-flex", "items-center", "gap-1.5", "px-[18px]", "py-2", "rounded-lg", "bg-white", "text-gray-700", "text-[13px]", "font-medium", "border", "border-gray-300", "cursor-pointer", "hover:bg-gray-50", 3, "click"], [1, "inline-flex", "items-center", "gap-1.5", "px-[18px]", "py-2", "rounded-lg", "bg-blue-500", "text-white", "text-[13px]", "font-semibold", "border-none", "cursor-pointer", "hover:bg-blue-600", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "relative", "transition-opacity", "duration-150", 3, "dragstart", "dragend", "dragover", "draggable"], [1, "absolute", "-left-6", "top-1/2", "-translate-y-1/2", "flex", "flex-col", "items-center", "gap-0.5", "pointer-events-none"], [1, "flex", "items-start", "gap-2"], ["title", "Arrastra para reordenar", 1, "mt-4", "cursor-grab", "active:cursor-grabbing", "text-gray-300", "hover:text-gray-500", "transition-colors", "select-none", "shrink-0", "py-1"], [1, "w-7", "shrink-0"], [1, "flex-1", "min-w-0"], [3, "configure", "delete", "phase", "locked"], [1, "h-0.5", "bg-blue-400", "rounded-full", "mx-9", "mt-1"], [1, "w-px", "flex-1", "bg-gray-300"], [1, "!size-3.5", "!text-[14px]", "text-gray-300", 3, "title"], [1, "w-px", "h-3", "bg-gray-300"], [1, "!size-5", "!text-[20px]"], [1, "flex", "items-center", "gap-2.5", "flex-wrap"], [1, "inline-flex", "items-center", "gap-1", "text-[13px]", "font-medium", "text-gray-600", "bg-transparent", "border-none", "cursor-pointer", "px-2", "py-1", "rounded-md", "hover:bg-gray-100", "transition-colors", 3, "click"], [1, "text-[15px]", "font-semibold", "text-gray-900"], [1, "rounded-full", "px-2", "py-0.5", "text-[10px]", "font-bold", "uppercase", "tracking-wide"], [1, "flex-1"], [1, "inline-flex", "items-center", "gap-1.5", "px-3.5", "py-1.5", "rounded-lg", "text-[13px]", "font-medium", "text-red-600", "bg-red-50", "border", "border-red-200/60", "cursor-pointer", "hover:bg-red-100", "transition-colors"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-lg", "text-[12px]", "font-medium", "text-gray-400", "bg-gray-100", "border", "border-gray-200"], [1, "bg-white", "border", "border-gray-200", "rounded-xl", "overflow-hidden"], [1, "flex", "items-center", "gap-2.5", "px-4", "py-3", "border-b", "border-gray-100", "bg-gray-50"], [1, "text-gray-300", "text-base", "select-none"], [1, "size-[26px]", "rounded-full", "flex", "items-center", "justify-center", "shrink-0", "text-[12px]", "font-bold", "border-2", "border-gray-300", "text-gray-500"], [1, "text-[14px]", "font-semibold", "text-gray-900"], [1, "text-[11px]", "font-semibold", "px-2", "py-0.5", "rounded-full"], [1, "p-5", "flex", "flex-col", "gap-4"], [1, "flex", "flex-col", "gap-1.5"], [1, "text-[12.5px]", "font-semibold", "text-gray-700"], ["placeholder", "Ej: Fase de Liga", 1, "ph-field", 3, "ngModelChange", "ngModel"], [1, "ph-field", 3, "ngModelChange", "ngModel"], ["value", "league"], ["value", "knockout"], ["value", "groups"], ["value", "swiss"], [1, "text-[11.5px]", "text-gray-400"], [1, "flex", "flex-col", "gap-1.5", "max-w-[320px]"], ["value", "pending"], ["value", "active"], ["value", "finished"], [1, "flex", "justify-end", "gap-2.5", "pt-1.5"], ["type", "button", 1, "btn-ghost-sm", 3, "click"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-2", "rounded-lg", "bg-blue-500", "text-white", "text-[13px]", "font-semibold", "border-none", "cursor-pointer", "hover:bg-blue-600", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-[18px]", "py-2", "rounded-lg", "bg-blue-500", "text-white", "text-[13px]", "font-semibold", "border-none", "cursor-pointer", "hover:bg-blue-600", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "inline-flex", "items-center", "gap-1.5", "px-3.5", "py-1.5", "rounded-lg", "text-[13px]", "font-medium", "text-red-600", "bg-red-50", "border", "border-red-200/60", "cursor-pointer", "hover:bg-red-100", "transition-colors", 3, "click"], [1, "!size-[15px]", "!text-[15px]"], [1, "!size-[14px]", "!text-[14px]"], [1, "ph-label"], ["type", "number", "min", "0", 1, "ph-field", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", 1, "ph-field", 3, "ngModelChange", "ngModel"], [3, "value"], ["value", "points,diff,gf,h2h,random"], ["value", "points,diff,gf,random"], ["value", "points,h2h,diff,gf"], ["value", "penalties"], ["value", "extra_time"], ["value", "away_goals"], ["value", "ranking"], ["value", "random"], ["value", "manual"], [1, "flex", "items-center", "justify-between", "gap-4"], ["type", "button", 1, "ph-toggle", 3, "click"], [1, "ph-thumb"], ["type", "number", "min", "2", 1, "ph-field", 3, "ngModelChange", "ngModel"], ["value", "seeded"], ["value", "dutch"], ["value", "accelerated"], ["value", "monrad"], ["value", "points,buchholz"], ["value", "points,sonneborn"], [1, "flex", "items-center", "justify-between", "gap-4", "max-w-[320px]"]], template: function ChampionshipPhasesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ChampionshipPhasesComponent_Conditional_1_Template, 14, 1, "div", 1);
      \u0275\u0275conditionalCreate(2, ChampionshipPhasesComponent_Conditional_2_Template, 31, 2, "div", 1);
      \u0275\u0275conditionalCreate(3, ChampionshipPhasesComponent_Conditional_3_Template, 73, 30, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewMode() === "format-picker" ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewMode() === "list" ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewMode() === "detail" ? 3 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, MatIconModule, MatIcon, PhaseCardComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.ph-label[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 600;\n  color: #374151;\n}\n.ph-field[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 14px;\n  color: #111827;\n  background: #fff;\n  font-family: inherit;\n  outline: none;\n  transition: border-color 0.15s;\n  width: 100%;\n  box-sizing: border-box;\n  appearance: auto;\n}\n.ph-field[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.ph-toggle[_ngcontent-%COMP%] {\n  position: relative;\n  width: 38px;\n  height: 22px;\n  border-radius: 11px;\n  border: none;\n  cursor: pointer;\n  transition: background 0.2s;\n  padding: 0;\n  shrink-flow: 0;\n  flex-shrink: 0;\n}\n.ph-thumb[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #fff;\n  transition: transform 0.2s;\n  display: block;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n.btn-ghost-sm[_ngcontent-%COMP%] {\n  padding: 8px 18px;\n  border-radius: 8px;\n  background: #fff;\n  color: #374151;\n  font-size: 13px;\n  font-weight: 500;\n  border: 1px solid #d1d5db;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.btn-ghost-sm[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n/*# sourceMappingURL=championship-phases.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChampionshipPhasesComponent, [{
    type: Component,
    args: [{ selector: "app-championship-phases", changeDetection: ChangeDetectionStrategy.OnPush, standalone: true, imports: [FormsModule, MatIconModule, PhaseCardComponent], template: `
<div class="max-w-[960px] mx-auto px-7 pt-7 pb-8">

  <!-- \u2550\u2550 FORMAT PICKER \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  @if (viewMode() === 'format-picker') {
    <div class="flex flex-col gap-6">

      <div>
        <h2 class="text-[1.05rem] font-bold text-gray-900 m-0 mb-1">
          Selecciona el formato del campeonato
        </h2>
        <p class="text-[13px] text-gray-500 m-0">
          Esto define las fases base. Puedes agregar fases adicionales despu\xE9s.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        @for (fmt of formatOptions; track fmt.id) {
          <button
            class="flex flex-col gap-3 p-5 rounded-xl border-2 text-left cursor-pointer
                   transition-all hover:border-blue-300 hover:bg-blue-50/50 group"
            [class.border-blue-500]="selectedFormat() === fmt.id"
            [class.bg-blue-50]="selectedFormat() === fmt.id"
            [class.border-gray-200]="selectedFormat() !== fmt.id"
            [class.bg-white]="selectedFormat() !== fmt.id"
            (click)="selectedFormat.set(fmt.id)"
            type="button"
          >
            <div class="flex items-center gap-3">
              <div
                class="size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                [class.bg-blue-500]="selectedFormat() === fmt.id"
                [class.text-white]="selectedFormat() === fmt.id"
                [class.bg-gray-100]="selectedFormat() !== fmt.id"
                [class.text-gray-500]="selectedFormat() !== fmt.id"
              >
                <mat-icon class="!size-[18px] !text-[18px]">{{ fmt.icon }}</mat-icon>
              </div>
              <span class="text-[14px] font-bold text-gray-900">{{ fmt.label }}</span>
              @if (selectedFormat() === fmt.id) {
                <mat-icon class="!size-4 !text-[16px] text-blue-500 ml-auto">check_circle</mat-icon>
              }
            </div>

            <p class="m-0 text-[12.5px] text-gray-500 leading-relaxed">{{ fmt.description }}</p>

            <!-- Phase preview chips -->
            <div class="flex flex-wrap gap-1.5">
              @for (ph of fmt.phases; track ph) {
                <span class="text-[10.5px] font-semibold px-2 py-0.5 rounded-full
                             bg-gray-100 text-gray-600">
                  {{ ph }}
                </span>
              }
            </div>
          </button>
        }
      </div>

      <div class="flex justify-end gap-2.5">
        <button
          class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-blue-500
                 text-white text-[13px] font-semibold border-none cursor-pointer
                 hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          [disabled]="!selectedFormat()"
          (click)="applyFormat()"
          type="button"
        >
          <mat-icon class="!size-4 !text-[16px]">check</mat-icon>
          Confirmar formato
        </button>
      </div>

    </div>
  }

  <!-- \u2550\u2550 PHASE LIST \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  @if (viewMode() === 'list') {
    <div class="flex flex-col gap-6">

      <!-- Header -->
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h2 class="text-[1rem] font-bold text-gray-900 m-0">Flujo de Competici\xF3n</h2>
            <!-- Format badge -->
            <span class="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1
                         rounded-full bg-blue-100 text-blue-700 border border-blue-200">
              <mat-icon class="!size-3 !text-[12px]">lock</mat-icon>
              {{ formatLabel() }}
            </span>
            <button
              class="text-[11px] text-gray-400 underline cursor-pointer bg-transparent
                     border-none hover:text-gray-600 transition-colors"
              (click)="changeFormat()"
              type="button"
              title="Cambiar formato resetea las fases base"
            >Cambiar formato</button>
          </div>
          <p class="text-[13px] text-gray-500 m-0 mt-0.5">
            Arrastra las fases para reordenarlas. Las fases base
            <mat-icon class="!size-3 !text-[12px] text-gray-400 inline-block align-middle">lock</mat-icon>
            no se pueden eliminar.
          </p>
        </div>
        <button
          class="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg
                 bg-blue-500 text-white text-[13px] font-semibold border-none
                 cursor-pointer hover:bg-blue-600 transition-colors shrink-0"
          (click)="addPhase()"
        >
          <mat-icon class="!size-4 !text-[16px]">add</mat-icon>
          Agregar Fase
        </button>
      </div>

      <!-- Phase list with drag -->
      <div
        class="flex flex-col gap-3"
        (dragover)="onListDragOver($event)"
        (drop)="onListDrop($event)"
      >
        @for (ph of phases(); track ph.id; let idx = $index) {
          <div
            class="relative transition-opacity duration-150"
            [class.opacity-50]="dragState.dragging && dragState.dragId === ph.id"
            [attr.data-phase-id]="ph.id"
            [draggable]="!ph.isBase"
            (dragstart)="onDragStart($event, ph)"
            (dragend)="onDragEnd()"
            (dragover)="onItemDragOver($event, ph)"
          >
            <!-- Lock indicator for base phases -->
            @if (ph.isBase) {
              <div class="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col items-center
                          gap-0.5 pointer-events-none">
                <div class="w-px flex-1 bg-gray-300"></div>
                <mat-icon
                  class="!size-3.5 !text-[14px] text-gray-300"
                  [title]="'Fase base del formato ' + formatLabel() + ' \u2014 no se puede eliminar'"
                >lock</mat-icon>
                @if (idx < phases().length - 1) {
                  <div class="w-px h-3 bg-gray-300"></div>
                }
              </div>
            }

            <!-- Drag handle only for non-base phases -->
            <div class="flex items-start gap-2">
              @if (!ph.isBase) {
                <div
                  class="mt-4 cursor-grab active:cursor-grabbing text-gray-300
                         hover:text-gray-500 transition-colors select-none shrink-0 py-1"
                  title="Arrastra para reordenar"
                >
                  <mat-icon class="!size-5 !text-[20px]">drag_indicator</mat-icon>
                </div>
              } @else {
                <!-- Spacer to align with draggable phases -->
                <div class="w-7 shrink-0"></div>
              }

              <div class="flex-1 min-w-0">
                <app-phase-card
                  [phase]="ph"
                  [locked]="ph.isBase ?? false"
                  (configure)="openPhaseDetail($event)"
                  (delete)="ph.isBase ? null : deletePhase(ph.id)"
                />
              </div>
            </div>

            <!-- Drop indicator -->
            @if (dragState.overId === ph.id && dragState.dragId !== ph.id) {
              <div class="h-0.5 bg-blue-400 rounded-full mx-9 mt-1"></div>
            }
          </div>
        }
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-2.5 pt-4 border-t border-gray-200">
        <button
          class="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg
                 bg-white text-gray-700 text-[13px] font-medium border border-gray-300
                 cursor-pointer hover:bg-gray-50"
          (click)="cancel.emit()"
        >Cancelar</button>
        <button
          class="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg
                 bg-blue-500 text-white text-[13px] font-semibold border-none
                 cursor-pointer hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
          [disabled]="!hasUnsavedChanges()"
          (click)="saveAll()"
        >
          <mat-icon class="!size-4 !text-[16px]">save</mat-icon>
          Guardar todos los cambios
        </button>
      </div>
    </div>
  }

  <!-- \u2550\u2550 PHASE DETAIL / FORM \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  @if (viewMode() === 'detail') {
    <div class="flex flex-col gap-5">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-2.5 flex-wrap">
        <button
          class="inline-flex items-center gap-1 text-[13px] font-medium text-gray-600
                 bg-transparent border-none cursor-pointer px-2 py-1 rounded-md
                 hover:bg-gray-100 transition-colors"
          (click)="cancelEdit()"
        >
          <mat-icon class="!size-4 !text-[16px]">arrow_back</mat-icon>
          Todas las fases
        </button>
        <span class="text-[15px] font-semibold text-gray-900">
          {{ phaseForm.name || 'Nueva Fase' }}
        </span>
        <span class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
              [class]="phaseTypeTagClass(phaseFormType())">
          {{ phaseTypeLabel(phaseFormType()) }}
        </span>
        <div class="flex-1"></div>
        @if (!isNewPhase() && !editingPhaseIsBase()) {
          <button
            class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px]
                   font-medium text-red-600 bg-red-50 border border-red-200/60
                   cursor-pointer hover:bg-red-100 transition-colors"
            (click)="deletePhase(editingPhaseId()!)"
          >
            <mat-icon class="!size-[15px] !text-[15px]">delete</mat-icon>
            Eliminar fase
          </button>
        }
        @if (editingPhaseIsBase()) {
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]
                      font-medium text-gray-400 bg-gray-100 border border-gray-200">
            <mat-icon class="!size-[14px] !text-[14px]">lock</mat-icon>
            Fase base \xB7 no eliminable
          </div>
        }
      </div>

      <!-- Edit card -->
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <!-- Card preview header -->
        <div class="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
          <span class="text-gray-300 text-base select-none">\u283F</span>
          <div class="size-[26px] rounded-full flex items-center justify-center shrink-0
                      text-[12px] font-bold border-2 border-gray-300 text-gray-500">
            {{ phaseForm.phaseOrder }}
          </div>
          <span class="text-[14px] font-semibold text-gray-900">
            {{ phaseForm.name || 'Nueva Fase' }}
          </span>
          <span class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                [class]="phaseTypeTagClass(phaseFormType())">
            {{ phaseTypeLabel(phaseFormType()) }}
          </span>
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                [class.bg-green-50]="phaseForm.status === 'active'"
                [class.text-green-700]="phaseForm.status === 'active'"
                [class.bg-amber-50]="phaseForm.status === 'pending'"
                [class.text-amber-700]="phaseForm.status === 'pending'"
                [class.bg-gray-100]="phaseForm.status === 'finished'"
                [class.text-gray-600]="phaseForm.status === 'finished'">
            {{ phaseStatusLabel(phaseForm.status) }}
          </span>
        </div>

        <!-- Form fields -->
        <div class="p-5 flex flex-col gap-4">

          <!-- Name + Type -->
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-[12.5px] font-semibold text-gray-700">Nombre de la Fase</label>
              <input class="ph-field" [(ngModel)]="phaseForm.name" placeholder="Ej: Fase de Liga" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[12.5px] font-semibold text-gray-700">Tipo de Fase</label>
              <select class="ph-field" [ngModel]="phaseFormType()" (ngModelChange)="onTypeChange($event)">
                <option value="league">Liga</option>
                <option value="knockout">Eliminatoria</option>
                <option value="groups">Grupos</option>
                <option value="swiss">Suizo</option>
              </select>
              <small class="text-[11.5px] text-gray-400">El cambio de tipo reinicia la configuraci\xF3n</small>
            </div>
          </div>

          <!-- Status -->
          <div class="flex flex-col gap-1.5 max-w-[320px]">
            <label class="text-[12.5px] font-semibold text-gray-700">Estado</label>
            <select class="ph-field" [(ngModel)]="phaseForm.status">
              <option value="pending">Pendiente</option>
              <option value="active">En Curso</option>
              <option value="finished">Finalizado</option>
            </select>
          </div>

          <!-- Type-specific config -->
          @switch (phaseFormType()) {

            @case ('league') {
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Puntos por Victoria</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.winsPoints" min="0" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Puntos por Empate</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.drawPoints" min="0" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Puntos por Derrota</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.lossPoints" min="0" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Total de Rondas</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.totalRounds" min="1" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Partidos</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.legs">
                    <option [value]="1">Solo Ida</option><option [value]="2">Ida y Vuelta</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Equipos que Avanzan</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.advanceCount" min="0" />
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="ph-label">Criterio de Desempate</label>
                <select class="ph-field" [(ngModel)]="phaseForm.tiebreakOrder">
                  <option value="points,diff,gf,h2h,random">Puntos \u2192 Diferencia \u2192 GF \u2192 H2H \u2192 Azar</option>
                  <option value="points,diff,gf,random">Puntos \u2192 Diferencia \u2192 GF \u2192 Azar</option>
                  <option value="points,h2h,diff,gf">Puntos \u2192 H2H \u2192 Diferencia \u2192 GF</option>
                </select>
              </div>
            }

            @case ('knockout') {
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Formato</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.knockoutLegs">
                    <option [value]="1">Solo Ida</option><option [value]="2">Ida y Vuelta</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Tama\xF1o del Bracket</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.bracketSize">
                    <option [value]="4">4 equipos</option><option [value]="8">8 equipos</option>
                    <option [value]="16">16 equipos</option><option [value]="32">32 equipos</option>
                  </select>
                  <small class="text-[11.5px] text-gray-400">{{ knockoutRoundsLabel(phaseForm.bracketSize) }}</small>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Desempate</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.tieBreak">
                    <option value="penalties">Penaltis</option>
                    <option value="extra_time">Tiempo Extra + Penaltis</option>
                    <option value="away_goals">Gol de Visitante</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Criterio de Sembrado</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.seeding">
                    <option value="ranking">Por clasificaci\xF3n</option>
                    <option value="random">Aleatorio</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center justify-between gap-4">
                  <label class="ph-label">Partido 3er Lugar</label>
                  <button class="ph-toggle" [style.background]="phaseForm.thirdPlaceMatch ? '#3b82f6' : '#d1d5db'"
                          (click)="phaseForm.thirdPlaceMatch = !phaseForm.thirdPlaceMatch" type="button">
                    <span class="ph-thumb" [style.transform]="phaseForm.thirdPlaceMatch ? 'translateX(18px)' : 'translateX(2px)'"></span>
                  </button>
                </div>
                <div class="flex items-center justify-between gap-4">
                  <label class="ph-label">Gol Visitante</label>
                  <button class="ph-toggle" [style.background]="phaseForm.awayGoalsRule ? '#3b82f6' : '#d1d5db'"
                          (click)="phaseForm.awayGoalsRule = !phaseForm.awayGoalsRule" type="button">
                    <span class="ph-thumb" [style.transform]="phaseForm.awayGoalsRule ? 'translateX(18px)' : 'translateX(2px)'"></span>
                  </button>
                </div>
              </div>
            }

            @case ('groups') {
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">N\xFAmero de Grupos</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.numGroups" min="2" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Equipos por Grupo</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.teamsPerGroup" min="2" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Partidos</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.groupLegs">
                    <option [value]="1">Solo Ida</option><option [value]="2">Ida y Vuelta</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Avanzan por Grupo</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.advancePerGroup" min="1" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Mejores Terceros</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.advanceBestThirds" min="0" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Asignaci\xF3n</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.assignment">
                    <option value="manual">Manual</option>
                    <option value="random">Aleatoria</option>
                    <option value="seeded">Sembrada</option>
                  </select>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="ph-label">Criterio de Desempate</label>
                <select class="ph-field" [(ngModel)]="phaseForm.groupTiebreakOrder">
                  <option value="points,diff,gf,h2h,random">Puntos \u2192 Diferencia \u2192 GF \u2192 H2H \u2192 Azar</option>
                  <option value="points,diff,gf,random">Puntos \u2192 Diferencia \u2192 GF \u2192 Azar</option>
                </select>
              </div>
            }

            @case ('swiss') {
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">N\xFAmero de Rondas</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.numRounds" min="1" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Sistema de Emparejamiento</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.pairingSystem">
                    <option value="dutch">Holand\xE9s (Dutch)</option>
                    <option value="accelerated">Acelerado</option>
                    <option value="monrad">Monrad</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Primera Ronda</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.firstRound">
                    <option value="random">Aleatoria</option>
                    <option value="seeded">Sembrada por ranking</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Criterio de Desempate</label>
                  <select class="ph-field" [(ngModel)]="phaseForm.swissTiebreakOrder">
                    <option value="points,buchholz">Puntos \u2192 Buchholz</option>
                    <option value="points,sonneborn">Puntos \u2192 Sonneborn-Berger</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Clasificados Directos</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.directAdvancedCount" min="0" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="ph-label">Clasificados a Playoff</label>
                  <input class="ph-field" type="number" [(ngModel)]="phaseForm.playoffCount" min="0" />
                </div>
              </div>
              <div class="flex items-center justify-between gap-4 max-w-[320px]">
                <label class="ph-label">Permitir Revancha</label>
                <button class="ph-toggle" [style.background]="phaseForm.allowRematch ? '#3b82f6' : '#d1d5db'"
                        (click)="phaseForm.allowRematch = !phaseForm.allowRematch" type="button">
                  <span class="ph-thumb" [style.transform]="phaseForm.allowRematch ? 'translateX(18px)' : 'translateX(2px)'"></span>
                </button>
              </div>
            }
          }

          <!-- Form footer -->
          <div class="flex justify-end gap-2.5 pt-1.5">
            <button class="btn-ghost-sm" (click)="cancelEdit()" type="button">Cancelar</button>
            <button
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500
                     text-white text-[13px] font-semibold border-none cursor-pointer
                     hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
              [disabled]="!phaseForm.name.trim()"
              (click)="savePhase()"
              type="button"
            >
              <mat-icon class="!size-4 !text-[16px]">save</mat-icon>
              Guardar Fase
            </button>
          </div>
        </div>
      </div>

      <!-- Panel footer -->
      <div class="flex justify-end gap-2.5 pt-4 border-t border-gray-200">
        <button class="btn-ghost-sm" (click)="cancel.emit()" type="button">Cancelar</button>
        <button
          class="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg bg-blue-500
                 text-white text-[13px] font-semibold border-none cursor-pointer
                 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
          [disabled]="!hasUnsavedChanges()"
          (click)="saveAll()"
          type="button"
        >
          <mat-icon class="!size-4 !text-[16px]">save</mat-icon>
          Guardar todos los cambios
        </button>
      </div>
    </div>
  }

</div>
  `, styles: ["/* angular:styles/component:scss;576e709be246184ffbee1490d548172693ae0ac29dba8e9bd9420b4239a69460;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/admin/pages/championships/championship-components/championship-phases.component.ts */\n:host {\n  display: block;\n}\n.ph-label {\n  font-size: 12.5px;\n  font-weight: 600;\n  color: #374151;\n}\n.ph-field {\n  padding: 8px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 14px;\n  color: #111827;\n  background: #fff;\n  font-family: inherit;\n  outline: none;\n  transition: border-color 0.15s;\n  width: 100%;\n  box-sizing: border-box;\n  appearance: auto;\n}\n.ph-field:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.ph-toggle {\n  position: relative;\n  width: 38px;\n  height: 22px;\n  border-radius: 11px;\n  border: none;\n  cursor: pointer;\n  transition: background 0.2s;\n  padding: 0;\n  shrink-flow: 0;\n  flex-shrink: 0;\n}\n.ph-thumb {\n  position: absolute;\n  top: 2px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #fff;\n  transition: transform 0.2s;\n  display: block;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n.btn-ghost-sm {\n  padding: 8px 18px;\n  border-radius: 8px;\n  background: #fff;\n  color: #374151;\n  font-size: 13px;\n  font-weight: 500;\n  border: 1px solid #d1d5db;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.btn-ghost-sm:hover {\n  background: #f9fafb;\n}\n/*# sourceMappingURL=championship-phases.component.css.map */\n"] }]
  }], null, { initialPhases: [{ type: Input, args: [{ isSignal: true, alias: "initialPhases", required: false }] }], initialFormat: [{ type: Input, args: [{ isSignal: true, alias: "initialFormat", required: false }] }], phasesChange: [{ type: Output, args: ["phasesChange"] }], cancel: [{ type: Output, args: ["cancel"] }], save: [{ type: Output, args: ["save"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChampionshipPhasesComponent, { className: "ChampionshipPhasesComponent", filePath: "src/app/features/admin/pages/championships/championship-components/championship-phases.component.ts", lineNumber: 700 });
})();

// src/app/features/admin/pages/championships/championship-components/championship-rules.component.ts
var _forTrack03 = ($index, $item) => $item.category;
var _forTrack12 = ($index, $item) => $item.matchRuleId;
function ChampionshipRulesComponent_For_8_Conditional_3_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function ChampionshipRulesComponent_For_8_Conditional_3_For_2_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const rule_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.resetRule(rule_r3));
    });
    \u0275\u0275elementStart(1, "mat-icon", 26);
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Reset ");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipRulesComponent_For_8_Conditional_3_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rule_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rule_r3.unit, " ");
  }
}
function ChampionshipRulesComponent_For_8_Conditional_3_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rule_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(rule_r3.hint);
  }
}
function ChampionshipRulesComponent_For_8_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "label", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, ChampionshipRulesComponent_For_8_Conditional_3_For_2_Conditional_4_Template, 4, 0, "button", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 21)(6, "input", 22);
    \u0275\u0275listener("ngModelChange", function ChampionshipRulesComponent_For_8_Conditional_3_For_2_Template_input_ngModelChange_6_listener($event) {
      const rule_r3 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.setNumericValue(rule_r3, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ChampionshipRulesComponent_For_8_Conditional_3_For_2_Conditional_7_Template, 2, 1, "span", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, ChampionshipRulesComponent_For_8_Conditional_3_For_2_Conditional_8_Template, 2, 1, "p", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rule_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", rule_r3.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.isModified(rule_r3) ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("box-shadow", ctx_r3.isModified(rule_r3) ? "0 0 0 3px rgba(59,130,246,0.12)" : "none");
    \u0275\u0275classProp("border-gray-300", !ctx_r3.isModified(rule_r3))("border-blue-400", ctx_r3.isModified(rule_r3));
    \u0275\u0275property("min", rule_r3.min ?? 0)("max", rule_r3.max ?? 9999)("ngModel", ctx_r3.getNumericValue(rule_r3));
    \u0275\u0275advance();
    \u0275\u0275conditional(rule_r3.unit ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(rule_r3.hint ? 8 : -1);
  }
}
function ChampionshipRulesComponent_For_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, ChampionshipRulesComponent_For_8_Conditional_3_For_2_Template, 9, 13, "div", 17, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("grid-template-columns", ctx_r3.numericGridCols(group_r5.numeric.length));
    \u0275\u0275advance();
    \u0275\u0275repeater(group_r5.numeric);
  }
}
function ChampionshipRulesComponent_For_8_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28)(2, "span", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 31);
    \u0275\u0275listener("click", function ChampionshipRulesComponent_For_8_Conditional_4_For_2_Template_button_click_6_listener() {
      const rule_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.toggleBool(rule_r7));
    });
    \u0275\u0275element(7, "span", 32);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const rule_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(rule_r7.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rule_r7.description);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r3.getBoolValue(rule_r7) ? "#3b82f6" : "#d1d5db");
    \u0275\u0275attribute("aria-label", rule_r7.label)("aria-checked", ctx_r3.getBoolValue(rule_r7));
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", ctx_r3.getBoolValue(rule_r7) ? "translateX(22px)" : "translateX(4px)");
  }
}
function ChampionshipRulesComponent_For_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, ChampionshipRulesComponent_For_8_Conditional_4_For_2_Template, 8, 8, "div", 27, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(group_r5.boolean);
  }
}
function ChampionshipRulesComponent_For_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "hr", 15);
  }
}
function ChampionshipRulesComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 11)(1, "h3", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, ChampionshipRulesComponent_For_8_Conditional_3_Template, 3, 2, "div", 13);
    \u0275\u0275conditionalCreate(4, ChampionshipRulesComponent_For_8_Conditional_4_Template, 3, 0, "div", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ChampionshipRulesComponent_For_8_Conditional_5_Template, 1, 0, "hr", 15);
  }
  if (rf & 2) {
    const group_r5 = ctx.$implicit;
    const \u0275$index_13_r8 = ctx.$index;
    const \u0275$count_13_r9 = ctx.$count;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", group_r5.categoryLabel, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(group_r5.numeric.length ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(group_r5.boolean.length ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_13_r8 === \u0275$count_13_r9 - 1) ? 5 : -1);
  }
}
function ChampionshipRulesComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.modifiedCount());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.modifiedCount() === 1 ? "regla modificada" : "reglas modificadas", " ");
  }
}
function ChampionshipRulesComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Valores predeterminados del deporte ");
  }
}
var MOCK_RULES_FOOTBALL = [
  // ── Jugadores ──────────────────────────────────────────────
  {
    matchRuleId: 1,
    name: "max_players",
    label: "M\xE1x. Jugadores por Equipo",
    description: "N\xFAmero m\xE1ximo de jugadores que puede inscribir cada equipo.",
    category: "players",
    categoryLabel: "Jugadores",
    valueType: "number",
    defaultValue: 20,
    currentValue: 20,
    isOverridden: false,
    min: 11,
    max: 50
  },
  {
    matchRuleId: 2,
    name: "min_players",
    label: "M\xEDn. Jugadores por Equipo",
    description: "N\xFAmero m\xEDnimo para que el equipo pueda disputar un partido.",
    category: "players",
    categoryLabel: "Jugadores",
    valueType: "number",
    defaultValue: 12,
    currentValue: 12,
    isOverridden: false,
    min: 7,
    max: 11
  },
  {
    matchRuleId: 3,
    name: "max_substitutions",
    label: "Sustituciones M\xE1ximas",
    description: "Cambios permitidos por equipo durante el partido.",
    category: "players",
    categoryLabel: "Jugadores",
    valueType: "number",
    defaultValue: 5,
    currentValue: 5,
    isOverridden: false,
    min: 0,
    max: 11
  },
  // ── Partido ────────────────────────────────────────────────
  {
    matchRuleId: 4,
    name: "match_duration",
    label: "Duraci\xF3n (minutos)",
    description: "Duraci\xF3n de cada per\xEDodo en minutos.",
    category: "match",
    categoryLabel: "Partido",
    valueType: "number",
    defaultValue: 45,
    currentValue: 60,
    isOverridden: true,
    min: 10,
    max: 90,
    unit: "min"
  },
  {
    matchRuleId: 5,
    name: "yellow_cards_suspension",
    label: "Tarjetas Amarillas (susp.)",
    description: "Acumulaci\xF3n de tarjetas amarillas para suspensi\xF3n autom\xE1tica.",
    category: "match",
    categoryLabel: "Partido",
    valueType: "number",
    defaultValue: 3,
    currentValue: 3,
    isOverridden: false,
    min: 1,
    max: 10,
    hint: "Acumulaci\xF3n para suspensi\xF3n"
  },
  {
    matchRuleId: 6,
    name: "red_card_suspension",
    label: "Roja = suspensi\xF3n (partidos)",
    description: "Partidos de suspensi\xF3n autom\xE1tica por tarjeta roja directa.",
    category: "match",
    categoryLabel: "Partido",
    valueType: "number",
    defaultValue: 1,
    currentValue: 1,
    isOverridden: false,
    min: 1,
    max: 10,
    unit: "partidos"
  },
  // ── Opciones adicionales ───────────────────────────────────
  {
    matchRuleId: 7,
    name: "extra_time",
    label: "Tiempo Extra (Overtime)",
    description: "Activar tiempo extra en caso de empate.",
    category: "additional",
    categoryLabel: "Opciones Adicionales",
    valueType: "boolean",
    defaultValue: 0,
    currentValue: 1,
    isOverridden: true
  },
  {
    matchRuleId: 8,
    name: "penalty_shootout",
    label: "Shootout de Penales",
    description: "Resolver el partido con tanda de penales si persiste el empate.",
    category: "additional",
    categoryLabel: "Opciones Adicionales",
    valueType: "boolean",
    defaultValue: 0,
    currentValue: 1,
    isOverridden: true
  },
  {
    matchRuleId: 9,
    name: "allow_guest_players",
    label: "Permitir Jugadores Invitados",
    description: "Jugadores que no pertenecen al equipo pueden participar.",
    category: "additional",
    categoryLabel: "Opciones Adicionales",
    valueType: "boolean",
    defaultValue: 0,
    currentValue: 0,
    isOverridden: false
  }
];
var ChampionshipRulesComponent = class _ChampionshipRulesComponent {
  // ── Inputs / Outputs ──────────────────────────────────────
  /** Reglas recibidas del backend (ya enriquecidas con label y description) */
  initialRules = input([], __spreadValues({}, ngDevMode ? { debugName: "initialRules" } : {}));
  save = output();
  cancel = output();
  // ── Services ──────────────────────────────────────────────
  snackBar = inject(MatSnackBar);
  // ── State ─────────────────────────────────────────────────
  /**
   * Mapa local de overrides: matchRuleId → currentValue.
   * Solo contiene las reglas que el usuario ha modificado en esta sesión.
   */
  overrides = signal(/* @__PURE__ */ new Map(), __spreadValues({}, ngDevMode ? { debugName: "overrides" } : {}));
  /** Copia de trabajo de las reglas — no muta el input */
  rules = signal([], __spreadValues({}, ngDevMode ? { debugName: "rules" } : {}));
  // ── Computed ──────────────────────────────────────────────
  /** Reglas agrupadas por categoría para el template */
  ruleGroups = computed(() => {
    const map2 = /* @__PURE__ */ new Map();
    for (const rule of this.rules()) {
      if (!map2.has(rule.category)) {
        map2.set(rule.category, {
          category: rule.category,
          categoryLabel: rule.categoryLabel,
          numeric: [],
          boolean: []
        });
      }
      const group = map2.get(rule.category);
      if (rule.valueType === "boolean")
        group.boolean.push(rule);
      else
        group.numeric.push(rule);
    }
    return Array.from(map2.values());
  }, __spreadValues({}, ngDevMode ? { debugName: "ruleGroups" } : {}));
  /** Número de reglas con valor distinto al que llegó del backend */
  modifiedCount = computed(() => this.overrides().size, __spreadValues({}, ngDevMode ? { debugName: "modifiedCount" } : {}));
  // ── Lifecycle ─────────────────────────────────────────────
  ngOnInit() {
    const source = this.initialRules().length ? this.initialRules() : MOCK_RULES_FOOTBALL;
    this.rules.set(source.map((r) => __spreadValues({}, r)));
  }
  // ── Value helpers ─────────────────────────────────────────
  /** Grid template columns string based on rule count — avoids Tailwind purge issues */
  numericGridCols(count) {
    if (count >= 3)
      return "repeat(3, minmax(0, 1fr))";
    if (count === 2)
      return "repeat(2, minmax(0, 1fr))";
    return "minmax(0, 1fr)";
  }
  /** Devuelve el valor actual de una regla (override local tiene prioridad) */
  getValue(rule) {
    return this.overrides().get(rule.matchRuleId) ?? rule.currentValue;
  }
  getNumericValue(rule) {
    return this.getValue(rule);
  }
  getBoolValue(rule) {
    return this.getValue(rule) === 1;
  }
  /** Una regla está modificada si su valor local difiere del que vino del backend */
  isModified(rule) {
    return this.overrides().has(rule.matchRuleId) && this.overrides().get(rule.matchRuleId) !== rule.currentValue;
  }
  // ── Mutations ─────────────────────────────────────────────
  setNumericValue(rule, raw) {
    const val = Number(raw);
    if (isNaN(val))
      return;
    const clamped = Math.min(rule.max ?? 9999, Math.max(rule.min ?? 0, val));
    this.overrides.update((m) => {
      const next = new Map(m);
      if (clamped === rule.currentValue)
        next.delete(rule.matchRuleId);
      else
        next.set(rule.matchRuleId, clamped);
      return next;
    });
  }
  toggleBool(rule) {
    const current = this.getValue(rule);
    const next = current === 1 ? 0 : 1;
    this.overrides.update((m) => {
      const map2 = new Map(m);
      if (next === rule.currentValue)
        map2.delete(rule.matchRuleId);
      else
        map2.set(rule.matchRuleId, next);
      return map2;
    });
  }
  resetRule(rule) {
    this.overrides.update((m) => {
      const map2 = new Map(m);
      map2.delete(rule.matchRuleId);
      return map2;
    });
  }
  // ── Save / Cancel ─────────────────────────────────────────
  onSave() {
    if (this.modifiedCount() === 0)
      return;
    const patches = Array.from(this.overrides().entries()).map(([matchRuleId, value]) => ({ matchRuleId, value }));
    this.save.emit(patches);
    this.rules.update((list) => list.map((r) => {
      const override = this.overrides().get(r.matchRuleId);
      if (override === void 0)
        return r;
      return __spreadProps(__spreadValues({}, r), { currentValue: override, isOverridden: override !== r.defaultValue });
    }));
    this.overrides.set(/* @__PURE__ */ new Map());
    this.snackBar.open("Reglas guardadas", "Cerrar", { duration: 2e3 });
  }
  onCancel() {
    this.overrides.set(/* @__PURE__ */ new Map());
    this.cancel.emit();
  }
  static \u0275fac = function ChampionshipRulesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChampionshipRulesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChampionshipRulesComponent, selectors: [["app-championship-rules"]], inputs: { initialRules: [1, "initialRules"] }, outputs: { save: "save", cancel: "cancel" }, decls: 20, vars: 8, consts: [[1, "max-w-[640px]", "mx-auto", "px-7", "pt-7", "pb-8", "flex", "flex-col", "gap-5"], [1, "flex", "items-start", "gap-3", "rounded-xl", "border", "border-blue-100", "bg-blue-50", "px-4", "py-3"], [1, "!size-[18px]", "!text-[18px]", "text-blue-400", "shrink-0", "mt-0.5"], [1, "m-0", "text-[13px]", "text-blue-700", "leading-relaxed"], [1, "flex", "flex-col", "gap-6"], [1, "flex", "items-center", "justify-between", "pt-3", "mt-1", "border-t", "border-gray-100"], [1, "m-0", "text-[12px]", "text-gray-400"], [1, "flex", "gap-2.5"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-[18px]", "py-2", "rounded-lg", "bg-white", "text-gray-700", "text-[13px]", "font-medium", "border", "border-gray-300", "cursor-pointer", "hover:bg-gray-50", "transition-colors", 3, "click"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-[18px]", "py-2", "rounded-lg", "text-[13px]", "font-semibold", "border-none", "cursor-pointer", "transition-colors", 3, "click", "disabled"], [1, "!size-4", "!text-[16px]"], [1, "flex", "flex-col", "gap-4"], [1, "m-0", "text-[11px]", "font-black", "tracking-[.12em]", "uppercase", "text-gray-500"], [1, "grid", "gap-x-4", "gap-y-5", 3, "grid-template-columns"], [1, "rounded-xl", "border", "border-gray-200", "bg-white", "overflow-hidden", "divide-y", "divide-gray-100"], [1, "border-gray-200", "m-0"], [1, "grid", "gap-x-4", "gap-y-5"], [1, "flex", "flex-col", "gap-1.5"], [1, "flex", "items-center", "justify-between", "gap-2", "min-h-[18px]"], [1, "text-[12.5px]", "font-semibold", "text-gray-700", "leading-tight"], ["type", "button", 1, "inline-flex", "items-center", "gap-0.5", "text-[11px]", "font-semibold", "text-blue-500", "hover:text-blue-700", "bg-transparent", "border-none", "cursor-pointer", "p-0", "shrink-0", "transition-colors"], [1, "flex", "items-center", "gap-2"], ["type", "number", 1, "w-full", "min-w-0", "px-3", "py-2", "border", "rounded-lg", "text-[14px]", "font-medium", "text-gray-900", "outline-none", "transition-all", "bg-white", 3, "ngModelChange", "min", "max", "ngModel"], [1, "text-[12px]", "text-gray-400", "whitespace-nowrap", "shrink-0"], [1, "m-0", "text-[11px]", "text-gray-400"], ["type", "button", 1, "inline-flex", "items-center", "gap-0.5", "text-[11px]", "font-semibold", "text-blue-500", "hover:text-blue-700", "bg-transparent", "border-none", "cursor-pointer", "p-0", "shrink-0", "transition-colors", 3, "click"], [1, "!size-3", "!text-[12px]"], [1, "flex", "items-center", "justify-between", "gap-4", "px-4", "py-3.5"], [1, "flex", "flex-col", "gap-0.5"], [1, "text-[13.5px]", "font-semibold", "text-gray-900"], [1, "text-[12px]", "text-gray-400", "leading-snug"], ["type", "button", "role", "switch", 1, "relative", "shrink-0", "w-[44px]", "h-[26px]", "rounded-full", "border-none", "cursor-pointer", "transition-colors", "duration-200", "p-0", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-blue-400", 3, "click"], [1, "absolute", "top-[4px]", "size-[18px]", "rounded-full", "bg-white", "shadow-sm", "transition-transform", "duration-200", "block"], [1, "text-blue-500", "font-semibold"]], template: function ChampionshipRulesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "mat-icon", 2);
      \u0275\u0275text(3, "info_outline");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, " Las reglas se aplican a todos los partidos de este campeonato. Cambiarlas afecta partidos futuros. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4);
      \u0275\u0275repeaterCreate(7, ChampionshipRulesComponent_For_8_Template, 6, 4, null, null, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 5)(10, "p", 6);
      \u0275\u0275conditionalCreate(11, ChampionshipRulesComponent_Conditional_11_Template, 3, 2)(12, ChampionshipRulesComponent_Conditional_12_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 7)(14, "button", 8);
      \u0275\u0275listener("click", function ChampionshipRulesComponent_Template_button_click_14_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(15, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 9);
      \u0275\u0275listener("click", function ChampionshipRulesComponent_Template_button_click_16_listener() {
        return ctx.onSave();
      });
      \u0275\u0275elementStart(17, "mat-icon", 10);
      \u0275\u0275text(18, "save");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " Guardar todos los cambios ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.ruleGroups());
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.modifiedCount() > 0 ? 11 : 12);
      \u0275\u0275advance(5);
      \u0275\u0275styleProp("background", ctx.modifiedCount() > 0 ? "#3b82f6" : "#e5e7eb")("color", ctx.modifiedCount() > 0 ? "#fff" : "#9ca3af")("cursor", ctx.modifiedCount() === 0 ? "not-allowed" : "pointer");
      \u0275\u0275property("disabled", ctx.modifiedCount() === 0);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, MatIconModule, MatIcon], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChampionshipRulesComponent, [{
    type: Component,
    args: [{
      selector: "app-championship-rules",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [FormsModule, MatIconModule],
      template: `
<div class="max-w-[640px] mx-auto px-7 pt-7 pb-8 flex flex-col gap-5">

  <!-- \u2500\u2500 Info banner \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <div class="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
    <mat-icon class="!size-[18px] !text-[18px] text-blue-400 shrink-0 mt-0.5">info_outline</mat-icon>
    <p class="m-0 text-[13px] text-blue-700 leading-relaxed">
      Las reglas se aplican a todos los partidos de este campeonato.
      Cambiarlas afecta partidos futuros.
    </p>
  </div>

  <!-- \u2500\u2500 Rule groups \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <div class="flex flex-col gap-6">
    @for (group of ruleGroups(); track group.category; let last = $last) {

      <section class="flex flex-col gap-4">

        <!-- Category title -->
        <h3 class="m-0 text-[11px] font-black tracking-[.12em] uppercase text-gray-500">
          {{ group.categoryLabel }}
        </h3>

        <!-- Numeric rules grid -->
        @if (group.numeric.length) {
          <div class="grid gap-x-4 gap-y-5"
               [style.grid-template-columns]="numericGridCols(group.numeric.length)">
            @for (rule of group.numeric; track rule.matchRuleId) {
              <div class="flex flex-col gap-1.5">

                <!-- Label row -->
                <div class="flex items-center justify-between gap-2 min-h-[18px]">
                  <label class="text-[12.5px] font-semibold text-gray-700 leading-tight">
                    {{ rule.label }}
                  </label>
                  @if (isModified(rule)) {
                    <button
                      class="inline-flex items-center gap-0.5 text-[11px] font-semibold
                             text-blue-500 hover:text-blue-700 bg-transparent border-none
                             cursor-pointer p-0 shrink-0 transition-colors"
                      (click)="resetRule(rule)"
                      type="button"
                    >
                      <mat-icon class="!size-3 !text-[12px]">refresh</mat-icon>
                      Reset
                    </button>
                  }
                </div>

                <!-- Input + optional unit suffix -->
                <div class="flex items-center gap-2">
                  <input
                    class="w-full min-w-0 px-3 py-2 border rounded-lg text-[14px] font-medium
                           text-gray-900 outline-none transition-all bg-white"
                    [class.border-gray-300]="!isModified(rule)"
                    [class.border-blue-400]="isModified(rule)"
                    [style.box-shadow]="isModified(rule) ? '0 0 0 3px rgba(59,130,246,0.12)' : 'none'"
                    type="number"
                    [min]="rule.min ?? 0"
                    [max]="rule.max ?? 9999"
                    [ngModel]="getNumericValue(rule)"
                    (ngModelChange)="setNumericValue(rule, $event)"
                  />
                  @if (rule.unit) {
                    <span class="text-[12px] text-gray-400 whitespace-nowrap shrink-0">
                      {{ rule.unit }}
                    </span>
                  }
                </div>

                <!-- Hint -->
                @if (rule.hint) {
                  <p class="m-0 text-[11px] text-gray-400">{{ rule.hint }}</p>
                }

              </div>
            }
          </div>
        }

        <!-- Boolean rules card list -->
        @if (group.boolean.length) {
          <div class="rounded-xl border border-gray-200 bg-white overflow-hidden divide-y divide-gray-100">
            @for (rule of group.boolean; track rule.matchRuleId) {
              <div class="flex items-center justify-between gap-4 px-4 py-3.5">
                <div class="flex flex-col gap-0.5">
                  <span class="text-[13.5px] font-semibold text-gray-900">{{ rule.label }}</span>
                  <span class="text-[12px] text-gray-400 leading-snug">{{ rule.description }}</span>
                </div>

                <!-- Toggle (inline style for translate to avoid Tailwind purge) -->
                <button
                  class="relative shrink-0 w-[44px] h-[26px] rounded-full border-none
                         cursor-pointer transition-colors duration-200 p-0
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  [style.background]="getBoolValue(rule) ? '#3b82f6' : '#d1d5db'"
                  (click)="toggleBool(rule)"
                  type="button"
                  [attr.aria-label]="rule.label"
                  [attr.aria-checked]="getBoolValue(rule)"
                  role="switch"
                >
                  <span
                    class="absolute top-[4px] size-[18px] rounded-full bg-white shadow-sm
                           transition-transform duration-200 block"
                    [style.transform]="getBoolValue(rule) ? 'translateX(22px)' : 'translateX(4px)'"
                  ></span>
                </button>
              </div>
            }
          </div>
        }

      </section>

      <!-- Divider \u2014 skip after last group -->
      @if (!last) {
        <hr class="border-gray-200 m-0" />
      }

    }
  </div>

  <!-- \u2500\u2500 Footer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <div class="flex items-center justify-between pt-3 mt-1 border-t border-gray-100">
    <p class="m-0 text-[12px] text-gray-400">
      @if (modifiedCount() > 0) {
        <span class="text-blue-500 font-semibold">{{ modifiedCount() }}</span>
        {{ modifiedCount() === 1 ? 'regla modificada' : 'reglas modificadas' }}
      } @else {
        Valores predeterminados del deporte
      }
    </p>
    <div class="flex gap-2.5">
      <button
        class="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg bg-white
               text-gray-700 text-[13px] font-medium border border-gray-300
               cursor-pointer hover:bg-gray-50 transition-colors"
        (click)="onCancel()"
        type="button"
      >Cancelar</button>
      <button
        class="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg
               text-[13px] font-semibold border-none cursor-pointer transition-colors"
        [style.background]="modifiedCount() > 0 ? '#3b82f6' : '#e5e7eb'"
        [style.color]="modifiedCount() > 0 ? '#fff' : '#9ca3af'"
        [style.cursor]="modifiedCount() === 0 ? 'not-allowed' : 'pointer'"
        [disabled]="modifiedCount() === 0"
        (click)="onSave()"
        type="button"
      >
        <mat-icon class="!size-4 !text-[16px]">save</mat-icon>
        Guardar todos los cambios
      </button>
    </div>
  </div>

</div>
  `
    }]
  }], null, { initialRules: [{ type: Input, args: [{ isSignal: true, alias: "initialRules", required: false }] }], save: [{ type: Output, args: ["save"] }], cancel: [{ type: Output, args: ["cancel"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChampionshipRulesComponent, { className: "ChampionshipRulesComponent", filePath: "src/app/features/admin/pages/championships/championship-components/championship-rules.component.ts", lineNumber: 301 });
})();

// src/app/features/admin/pages/championships/championship-components/player-modal.component.ts
var _forTrack04 = ($index, $item) => $item.id;
function PlayerModalComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 11);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r2.photoUrl(), \u0275\u0275sanitizeUrl);
  }
}
function PlayerModalComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 12);
    \u0275\u0275text(1, "person");
    \u0275\u0275elementEnd();
  }
}
function PlayerModalComponent_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pos_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", pos_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", pos_r4.label, " (", pos_r4.abbreviation, ")");
  }
}
function PlayerModalComponent_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "label", 20);
    \u0275\u0275text(2, " Estado ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function PlayerModalComponent_Conditional_78_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.status, $event) || (ctx_r2.form.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 40);
    \u0275\u0275text(5, "Activo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 41);
    \u0275\u0275text(7, "Suspendido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 42);
    \u0275\u0275text(9, "Lesionado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 43);
    \u0275\u0275text(11, "Inactivo");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.status);
  }
}
function PlayerModalComponent_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "mat-icon", 44);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Completa nombre, apellido y n\xFAmero de camiseta. ");
    \u0275\u0275elementEnd();
  }
}
function PlayerModalComponent_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function PlayerModalComponent_Conditional_81_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDelete());
    });
    \u0275\u0275elementStart(1, "mat-icon", 46);
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Dar de baja ");
    \u0275\u0275elementEnd();
  }
}
function PlayerModalComponent_Conditional_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div");
  }
}
var MOCK_POSITIONS = [
  { id: 1, code: "GK", label: "Portero", abbreviation: "POR" },
  { id: 2, code: "DF", label: "Defensa", abbreviation: "DEF" },
  { id: 3, code: "MF", label: "Mediocampista", abbreviation: "MED" },
  { id: 4, code: "FW", label: "Delantero", abbreviation: "DEL" }
];
var DEFAULT_FORM = (teamId) => ({
  teamId,
  positionId: 1,
  firstName: "",
  lastName: "",
  nickName: "",
  number: null,
  birthDate: "",
  height: null,
  weight: null,
  status: "active",
  photoUrl: null
});
var PlayerModalComponent = class _PlayerModalComponent {
  // ── Inputs ────────────────────────────────────────────────────
  /** Si se pasa un jugador existente → modo edición. Si no → modo creación. */
  player = input(null, __spreadValues({}, ngDevMode ? { debugName: "player" } : {}));
  teamId = input.required(__spreadValues({}, ngDevMode ? { debugName: "teamId" } : {}));
  positions = input(MOCK_POSITIONS, __spreadValues({}, ngDevMode ? { debugName: "positions" } : {}));
  // ── Outputs ───────────────────────────────────────────────────
  saved = output();
  deleted = output();
  // emite el id del jugador
  dismiss = output();
  // ── Services ──────────────────────────────────────────────────
  cdr = inject(ChangeDetectorRef);
  // ── State ─────────────────────────────────────────────────────
  form = DEFAULT_FORM(0);
  showErrors = signal(false, __spreadValues({}, ngDevMode ? { debugName: "showErrors" } : {}));
  photoUrl = signal(null, __spreadValues({}, ngDevMode ? { debugName: "photoUrl" } : {}));
  isEdit = computed(() => !!this.player()?.id, __spreadValues({}, ngDevMode ? { debugName: "isEdit" } : {}));
  get isValid() {
    return this.form.firstName.trim().length > 0 && this.form.lastName.trim().length > 0 && this.form.number !== null;
  }
  // ── Lifecycle ─────────────────────────────────────────────────
  ngOnInit() {
    const p = this.player();
    this.form = p ? __spreadValues({}, p) : DEFAULT_FORM(this.teamId());
    this.photoUrl.set(this.form.photoUrl ?? null);
  }
  // ── Actions ───────────────────────────────────────────────────
  onPhotoSelected(event) {
    const file = event.target.files?.[0];
    if (!file)
      return;
    this.form.photoFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.photoUrl.set(e.target?.result);
      this.form.photoUrl = this.photoUrl();
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }
  onSubmit() {
    this.showErrors.set(true);
    if (!this.isValid)
      return;
    this.saved.emit(__spreadProps(__spreadValues({}, this.form), { photoUrl: this.photoUrl() }));
  }
  onDelete() {
    if (this.form.id !== void 0)
      this.deleted.emit(this.form.id);
  }
  onBackdropClick(e) {
    if (e.target === e.currentTarget)
      this.dismiss.emit();
  }
  static \u0275fac = function PlayerModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlayerModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlayerModalComponent, selectors: [["app-player-modal"]], inputs: { player: [1, "player"], teamId: [1, "teamId"], positions: [1, "positions"] }, outputs: { saved: "saved", deleted: "deleted", dismiss: "dismiss" }, decls: 90, vars: 18, consts: [["photoInput", ""], [1, "fixed", "inset-0", "z-[200]", "flex", "items-center", "justify-center", "p-4", 2, "background", "rgba(0,0,0,0.45)", 3, "click"], [1, "relative", "w-full", "max-w-[520px]", "rounded-2xl", "bg-white", "shadow-2xl", "flex", "flex-col", "max-h-[90vh]", "overflow-hidden", 3, "click"], [1, "flex", "items-center", "justify-between", "px-6", "py-4", "border-b", "border-gray-100"], [1, "text-[16px]", "font-bold", "text-gray-900", "m-0"], [1, "text-[12px]", "text-gray-400", "m-0", "mt-0.5"], ["type", "button", "aria-label", "Cerrar", 1, "size-8", "flex", "items-center", "justify-center", "rounded-lg", "text-gray-400", "hover:bg-gray-100", "hover:text-gray-600", "border-none", "bg-transparent", "cursor-pointer", "transition-colors", 3, "click"], [1, "!size-[18px]", "!text-[18px]"], [1, "flex-1", "overflow-y-auto", "px-6", "py-5", "flex", "flex-col", "gap-5"], [1, "flex", "items-center", "gap-4"], ["type", "button", 1, "size-16", "rounded-full", "flex", "items-center", "justify-center", "text-white", "shrink-0", "cursor-pointer", "relative", "overflow-hidden", "group", "border-none", "p-0", "bg-gray-300", 3, "click"], ["alt", "Foto del jugador", 1, "w-full", "h-full", "object-cover", 3, "src"], [1, "!size-8", "!text-[32px]", "text-gray-500"], [1, "absolute", "inset-0", "bg-black/50", "flex", "items-center", "justify-center", "opacity-0", "group-hover:opacity-100", "transition-opacity", "rounded-full"], [1, "!size-5", "!text-[20px]", "text-white"], ["type", "file", "accept", "image/*", "aria-hidden", "true", 1, "sr-only", 3, "change"], [1, "m-0", "text-[13px]", "font-medium", "text-gray-700"], [1, "m-0", "mt-0.5", "text-[11.5px]", "text-gray-400"], [1, "grid", "grid-cols-2", "gap-4"], [1, "flex", "flex-col", "gap-1.5"], [1, "text-[12px]", "font-semibold", "text-gray-600", "uppercase", "tracking-wide"], [1, "text-red-400"], ["placeholder", "Ej: Juan", "maxlength", "50", 1, "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "text-[14px]", "text-gray-900", "outline-none", "focus:border-blue-400", "focus:ring-2", "focus:ring-blue-400/10", "transition-all", "bg-white", 3, "ngModelChange", "ngModel"], ["placeholder", "Ej: Garc\xEDa", "maxlength", "50", 1, "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "text-[14px]", "text-gray-900", "outline-none", "focus:border-blue-400", "focus:ring-2", "focus:ring-blue-400/10", "transition-all", "bg-white", 3, "ngModelChange", "ngModel"], [1, "text-gray-300", "font-normal", "normal-case", "text-[11px]"], ["placeholder", "Ej: Juancho", "maxlength", "30", 1, "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "text-[14px]", "text-gray-900", "outline-none", "focus:border-blue-400", "focus:ring-2", "focus:ring-blue-400/10", "transition-all", "bg-white", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "Ej: 10", "min", "1", "max", "99", 1, "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "text-[14px]", "text-gray-900", "outline-none", "focus:border-blue-400", "focus:ring-2", "focus:ring-blue-400/10", "transition-all", "bg-white", 3, "ngModelChange", "ngModel"], [1, "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "text-[14px]", "text-gray-900", "outline-none", "cursor-pointer", "focus:border-blue-400", "focus:ring-2", "focus:ring-blue-400/10", "transition-all", "bg-white", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["type", "date", 1, "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "text-[14px]", "text-gray-900", "outline-none", "focus:border-blue-400", "focus:ring-2", "focus:ring-blue-400/10", "transition-all", "bg-white", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "Ej: 175", "min", "100", "max", "230", 1, "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "text-[14px]", "text-gray-900", "outline-none", "focus:border-blue-400", "focus:ring-2", "focus:ring-blue-400/10", "transition-all", "bg-white", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "Ej: 70", "min", "40", "max", "150", 1, "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "text-[14px]", "text-gray-900", "outline-none", "focus:border-blue-400", "focus:ring-2", "focus:ring-blue-400/10", "transition-all", "bg-white", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-2", "rounded-lg", "bg-red-50", "border", "border-red-200", "px-3", "py-2.5", "text-[12.5px]", "text-red-600"], [1, "flex", "items-center", "justify-between", "px-6", "py-4", "border-t", "border-gray-100", "bg-gray-50"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-lg", "text-[12.5px]", "font-medium", "text-red-500", "bg-red-50", "border", "border-red-200/60", "cursor-pointer", "hover:bg-red-100", "transition-colors", "border-none"], [1, "flex", "gap-2.5"], ["type", "button", 1, "inline-flex", "items-center", "px-4", "py-2", "rounded-lg", "bg-white", "text-gray-700", "text-[13px]", "font-medium", "border", "border-gray-300", "cursor-pointer", "hover:bg-gray-50", "transition-colors", 3, "click"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-2", "rounded-lg", "bg-blue-500", "text-white", "text-[13px]", "font-semibold", "border-none", "cursor-pointer", "hover:bg-blue-600", "transition-colors", 3, "click"], [1, "!size-4", "!text-[16px]"], [1, "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "text-[14px]", "text-gray-900", "outline-none", "cursor-pointer", "focus:border-blue-400", "transition-all", "bg-white", 3, "ngModelChange", "ngModel"], ["value", "active"], ["value", "suspended"], ["value", "injured"], ["value", "inactive"], [1, "!size-4", "!text-[16px]", "shrink-0"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-lg", "text-[12.5px]", "font-medium", "text-red-500", "bg-red-50", "border", "border-red-200/60", "cursor-pointer", "hover:bg-red-100", "transition-colors", "border-none", 3, "click"], [1, "!size-[14px]", "!text-[14px]"]], template: function PlayerModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275listener("click", function PlayerModalComponent_Template_div_click_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onBackdropClick($event));
      });
      \u0275\u0275elementStart(1, "div", 2);
      \u0275\u0275listener("click", function PlayerModalComponent_Template_div_click_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(2, "div", 3)(3, "div")(4, "h2", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 5);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 6);
      \u0275\u0275listener("click", function PlayerModalComponent_Template_button_click_8_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.dismiss.emit());
      });
      \u0275\u0275elementStart(9, "mat-icon", 7);
      \u0275\u0275text(10, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "button", 10);
      \u0275\u0275listener("click", function PlayerModalComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        const photoInput_r2 = \u0275\u0275reference(20);
        return \u0275\u0275resetView(photoInput_r2.click());
      });
      \u0275\u0275conditionalCreate(14, PlayerModalComponent_Conditional_14_Template, 1, 1, "img", 11)(15, PlayerModalComponent_Conditional_15_Template, 2, 0, "mat-icon", 12);
      \u0275\u0275elementStart(16, "div", 13)(17, "mat-icon", 14);
      \u0275\u0275text(18, "photo_camera");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "input", 15, 0);
      \u0275\u0275listener("change", function PlayerModalComponent_Template_input_change_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPhotoSelected($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div")(22, "p", 16);
      \u0275\u0275text(23, "Foto del jugador");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "p", 17);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 18)(27, "div", 19)(28, "label", 20);
      \u0275\u0275text(29, " Nombre ");
      \u0275\u0275elementStart(30, "span", 21);
      \u0275\u0275text(31, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "input", 22);
      \u0275\u0275twoWayListener("ngModelChange", function PlayerModalComponent_Template_input_ngModelChange_32_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.firstName, $event) || (ctx.form.firstName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 19)(34, "label", 20);
      \u0275\u0275text(35, " Apellido ");
      \u0275\u0275elementStart(36, "span", 21);
      \u0275\u0275text(37, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "input", 23);
      \u0275\u0275twoWayListener("ngModelChange", function PlayerModalComponent_Template_input_ngModelChange_38_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.lastName, $event) || (ctx.form.lastName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "div", 18)(40, "div", 19)(41, "label", 20);
      \u0275\u0275text(42, " Apodo ");
      \u0275\u0275elementStart(43, "span", 24);
      \u0275\u0275text(44, "(opcional)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "input", 25);
      \u0275\u0275twoWayListener("ngModelChange", function PlayerModalComponent_Template_input_ngModelChange_45_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.nickName, $event) || (ctx.form.nickName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 19)(47, "label", 20);
      \u0275\u0275text(48, " N\xB0 Camiseta ");
      \u0275\u0275elementStart(49, "span", 21);
      \u0275\u0275text(50, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "input", 26);
      \u0275\u0275twoWayListener("ngModelChange", function PlayerModalComponent_Template_input_ngModelChange_51_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.number, $event) || (ctx.form.number = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(52, "div", 18)(53, "div", 19)(54, "label", 20);
      \u0275\u0275text(55, " Posici\xF3n ");
      \u0275\u0275elementStart(56, "span", 21);
      \u0275\u0275text(57, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "select", 27);
      \u0275\u0275twoWayListener("ngModelChange", function PlayerModalComponent_Template_select_ngModelChange_58_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.positionId, $event) || (ctx.form.positionId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275repeaterCreate(59, PlayerModalComponent_For_60_Template, 2, 3, "option", 28, _forTrack04);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "div", 19)(62, "label", 20);
      \u0275\u0275text(63, " Fecha de Nacimiento ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "input", 29);
      \u0275\u0275twoWayListener("ngModelChange", function PlayerModalComponent_Template_input_ngModelChange_64_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.birthDate, $event) || (ctx.form.birthDate = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(65, "div", 18)(66, "div", 19)(67, "label", 20);
      \u0275\u0275text(68, " Altura ");
      \u0275\u0275elementStart(69, "span", 24);
      \u0275\u0275text(70, "(cm)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(71, "input", 30);
      \u0275\u0275twoWayListener("ngModelChange", function PlayerModalComponent_Template_input_ngModelChange_71_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.height, $event) || (ctx.form.height = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(72, "div", 19)(73, "label", 20);
      \u0275\u0275text(74, " Peso ");
      \u0275\u0275elementStart(75, "span", 24);
      \u0275\u0275text(76, "(kg)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(77, "input", 31);
      \u0275\u0275twoWayListener("ngModelChange", function PlayerModalComponent_Template_input_ngModelChange_77_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.weight, $event) || (ctx.form.weight = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(78, PlayerModalComponent_Conditional_78_Template, 12, 1, "div", 19);
      \u0275\u0275conditionalCreate(79, PlayerModalComponent_Conditional_79_Template, 4, 0, "div", 32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "div", 33);
      \u0275\u0275conditionalCreate(81, PlayerModalComponent_Conditional_81_Template, 4, 0, "button", 34)(82, PlayerModalComponent_Conditional_82_Template, 1, 0, "div");
      \u0275\u0275elementStart(83, "div", 35)(84, "button", 36);
      \u0275\u0275listener("click", function PlayerModalComponent_Template_button_click_84_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.dismiss.emit());
      });
      \u0275\u0275text(85, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "button", 37);
      \u0275\u0275listener("click", function PlayerModalComponent_Template_button_click_86_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit());
      });
      \u0275\u0275elementStart(87, "mat-icon", 38);
      \u0275\u0275text(88);
      \u0275\u0275elementEnd();
      \u0275\u0275text(89);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.isEdit() ? "Editar Jugador" : "Inscribir Jugador", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.isEdit() ? "Modifica los datos del jugador" : "Agrega un nuevo jugador al equipo", " ");
      \u0275\u0275advance(6);
      \u0275\u0275attribute("aria-label", ctx.photoUrl() ? "Cambiar foto del jugador" : "Subir foto del jugador");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.photoUrl() ? 14 : 15);
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1(" ", ctx.photoUrl() ? "Haz clic para cambiarla" : "Haz clic para subir una foto (opcional)", " ");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.firstName);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.lastName);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.nickName);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.number);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.positionId);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.positions());
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.birthDate);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.height);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.weight);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEdit() ? 78 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showErrors() && !ctx.isValid ? 79 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isEdit() ? 81 : 82);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.isEdit() ? "save" : "person_add");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isEdit() ? "Guardar cambios" : "Inscribir jugador", " ");
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, MatIconModule, MatIcon], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlayerModalComponent, [{
    type: Component,
    args: [{
      selector: "app-player-modal",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [FormsModule, MatIconModule],
      template: `
<!-- Backdrop -->
<div
  class="fixed inset-0 z-[200] flex items-center justify-center p-4"
  style="background: rgba(0,0,0,0.45);"
  (click)="onBackdropClick($event)"
>
  <!-- Modal panel -->
  <div
    class="relative w-full max-w-[520px] rounded-2xl bg-white shadow-2xl flex flex-col
           max-h-[90vh] overflow-hidden"
    (click)="$event.stopPropagation()"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <div>
        <h2 class="text-[16px] font-bold text-gray-900 m-0">
          {{ isEdit() ? 'Editar Jugador' : 'Inscribir Jugador' }}
        </h2>
        <p class="text-[12px] text-gray-400 m-0 mt-0.5">
          {{ isEdit() ? 'Modifica los datos del jugador' : 'Agrega un nuevo jugador al equipo' }}
        </p>
      </div>
      <button
        class="size-8 flex items-center justify-center rounded-lg text-gray-400
               hover:bg-gray-100 hover:text-gray-600 border-none bg-transparent cursor-pointer
               transition-colors"
        (click)="dismiss.emit()"
        type="button"
        aria-label="Cerrar"
      >
        <mat-icon class="!size-[18px] !text-[18px]">close</mat-icon>
      </button>
    </div>

    <!-- Body -->
    <div class="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

      <!-- Foto del jugador -->
      <div class="flex items-center gap-4">
        <button
          class="size-16 rounded-full flex items-center justify-center text-white
                 shrink-0 cursor-pointer relative overflow-hidden group border-none p-0
                 bg-gray-300"
          type="button"
          (click)="photoInput.click()"
          [attr.aria-label]="photoUrl() ? 'Cambiar foto del jugador' : 'Subir foto del jugador'"
        >
          @if (photoUrl()) {
            <img [src]="photoUrl()!" class="w-full h-full object-cover" alt="Foto del jugador" />
          } @else {
            <mat-icon class="!size-8 !text-[32px] text-gray-500">person</mat-icon>
          }
          <div class="absolute inset-0 bg-black/50 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <mat-icon class="!size-5 !text-[20px] text-white">photo_camera</mat-icon>
          </div>
        </button>
        <input
          #photoInput
          type="file"
          accept="image/*"
          class="sr-only"
          (change)="onPhotoSelected($event)"
          aria-hidden="true"
        />
        <div>
          <p class="m-0 text-[13px] font-medium text-gray-700">Foto del jugador</p>
          <p class="m-0 mt-0.5 text-[11.5px] text-gray-400">
            {{ photoUrl() ? 'Haz clic para cambiarla' : 'Haz clic para subir una foto (opcional)' }}
          </p>
        </div>
      </div>

      <!-- Row: Nombre + Apellido -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Nombre <span class="text-red-400">*</span>
          </label>
          <input
            class="px-3 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-900
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-white"
            [(ngModel)]="form.firstName"
            placeholder="Ej: Juan"
            maxlength="50"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Apellido <span class="text-red-400">*</span>
          </label>
          <input
            class="px-3 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-900
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-white"
            [(ngModel)]="form.lastName"
            placeholder="Ej: Garc\xEDa"
            maxlength="50"
          />
        </div>
      </div>

      <!-- Row: Apodo + N\xFAmero -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Apodo <span class="text-gray-300 font-normal normal-case text-[11px]">(opcional)</span>
          </label>
          <input
            class="px-3 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-900
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-white"
            [(ngModel)]="form.nickName"
            placeholder="Ej: Juancho"
            maxlength="30"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            N\xB0 Camiseta <span class="text-red-400">*</span>
          </label>
          <input
            class="px-3 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-900
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-white"
            type="number"
            [(ngModel)]="form.number"
            placeholder="Ej: 10"
            min="1" max="99"
          />
        </div>
      </div>

      <!-- Row: Posici\xF3n + Fecha de nacimiento -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Posici\xF3n <span class="text-red-400">*</span>
          </label>
          <select
            class="px-3 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-900
                   outline-none cursor-pointer focus:border-blue-400 focus:ring-2
                   focus:ring-blue-400/10 transition-all bg-white"
            [(ngModel)]="form.positionId"
          >
            @for (pos of positions(); track pos.id) {
              <option [ngValue]="pos.id">{{ pos.label }} ({{ pos.abbreviation }})</option>
            }
          </select>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Fecha de Nacimiento
          </label>
          <input
            class="px-3 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-900
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-white"
            type="date"
            [(ngModel)]="form.birthDate"
          />
        </div>
      </div>

      <!-- Row: Altura + Peso -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Altura <span class="text-gray-300 font-normal normal-case text-[11px]">(cm)</span>
          </label>
          <input
            class="px-3 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-900
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-white"
            type="number"
            [(ngModel)]="form.height"
            placeholder="Ej: 175"
            min="100" max="230"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Peso <span class="text-gray-300 font-normal normal-case text-[11px]">(kg)</span>
          </label>
          <input
            class="px-3 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-900
                   outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10
                   transition-all bg-white"
            type="number"
            [(ngModel)]="form.weight"
            placeholder="Ej: 70"
            min="40" max="150"
          />
        </div>
      </div>

      <!-- Estado (solo en edici\xF3n) -->
      @if (isEdit()) {
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Estado
          </label>
          <select
            class="px-3 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-900
                   outline-none cursor-pointer focus:border-blue-400 transition-all bg-white"
            [(ngModel)]="form.status"
          >
            <option value="active">Activo</option>
            <option value="suspended">Suspendido</option>
            <option value="injured">Lesionado</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>
      }

      <!-- Validation error -->
      @if (showErrors() && !isValid) {
        <div class="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200
                    px-3 py-2.5 text-[12.5px] text-red-600">
          <mat-icon class="!size-4 !text-[16px] shrink-0">error_outline</mat-icon>
          Completa nombre, apellido y n\xFAmero de camiseta.
        </div>
      }

    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
      @if (isEdit()) {
        <button
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px]
                 font-medium text-red-500 bg-red-50 border border-red-200/60
                 cursor-pointer hover:bg-red-100 transition-colors border-none"
          (click)="onDelete()"
          type="button"
        >
          <mat-icon class="!size-[14px] !text-[14px]">delete</mat-icon>
          Dar de baja
        </button>
      } @else {
        <div></div>
      }
      <div class="flex gap-2.5">
        <button
          class="inline-flex items-center px-4 py-2 rounded-lg bg-white text-gray-700
                 text-[13px] font-medium border border-gray-300 cursor-pointer
                 hover:bg-gray-50 transition-colors"
          (click)="dismiss.emit()"
          type="button"
        >Cancelar</button>
        <button
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500
                 text-white text-[13px] font-semibold border-none cursor-pointer
                 hover:bg-blue-600 transition-colors"
          (click)="onSubmit()"
          type="button"
        >
          <mat-icon class="!size-4 !text-[16px]">{{ isEdit() ? 'save' : 'person_add' }}</mat-icon>
          {{ isEdit() ? 'Guardar cambios' : 'Inscribir jugador' }}
        </button>
      </div>
    </div>
  </div>
</div>
  `
    }]
  }], null, { player: [{ type: Input, args: [{ isSignal: true, alias: "player", required: false }] }], teamId: [{ type: Input, args: [{ isSignal: true, alias: "teamId", required: true }] }], positions: [{ type: Input, args: [{ isSignal: true, alias: "positions", required: false }] }], saved: [{ type: Output, args: ["saved"] }], deleted: [{ type: Output, args: ["deleted"] }], dismiss: [{ type: Output, args: ["dismiss"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlayerModalComponent, { className: "PlayerModalComponent", filePath: "src/app/features/admin/pages/championships/championship-components/player-modal.component.ts", lineNumber: 345 });
})();

// src/app/core/services/team-import.service.ts
var EXCEL_EXTENSIONS = /* @__PURE__ */ new Set([".xlsx", ".xls", ".csv"]);
var POSITION_MAP = {
  // Portero
  por: "POR",
  portero: "POR",
  goalkeeper: "POR",
  gk: "POR",
  // Defensa
  def: "DEF",
  defensa: "DEF",
  defender: "DEF",
  df: "DEF",
  // Mediocampista
  med: "MED",
  mediocampista: "MED",
  midfielder: "MED",
  mf: "MED",
  mc: "MED",
  // Delantero
  del: "DEL",
  delantero: "DEL",
  forward: "DEL",
  fw: "DEL",
  st: "DEL",
  // Pivot (futsal / básquetbol)
  piv: "PIV",
  pivot: "PIV",
  // Libero (voleibol)
  lib: "LIB",
  libero: "LIB",
  l\u00EDbero: "LIB"
};
var DEFAULT_PRIMARY_COLOR = "#1a56db";
var DEFAULT_SECONDARY_COLOR = "#e74694";
var TeamImportService = class _TeamImportService {
  /**
   * Punto de entrada principal.
   * Recibe todos los archivos arrastrados al drop zone y devuelve
   * un ImportedTeamPayload con preview lista para mostrar al coach.
   */
  async processFiles(files) {
    const fileMap = this.classifyFiles(files);
    const errors = [];
    const warnings = [];
    for (const f of fileMap.unrecognized) {
      warnings.push(`Archivo ignorado: "${f.name}" (formato no reconocido)`);
    }
    if (!fileMap.excel) {
      errors.push({ row: 0, field: "excel", message: "Falta el archivo equipo.xlsx (o .csv)" });
      return this.emptyPayload(fileMap, errors, warnings);
    }
    let teamRow;
    let playerRows;
    try {
      ({ teamRow, playerRows } = await this.parseExcel(fileMap.excel));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push({ row: 0, field: "excel", message: `Error al leer el Excel: ${msg}` });
      return this.emptyPayload(fileMap, errors, warnings, fileMap.excel);
    }
    const teamErrors = [];
    const name = this.str(teamRow["nombre"]);
    if (!name)
      teamErrors.push({ row: 0, field: "nombre", message: "El nombre del equipo es obligatorio" });
    const shortname = this.str(teamRow["nombre_corto"]);
    if (!shortname)
      teamErrors.push({ row: 0, field: "nombre_corto", message: "El nombre corto es obligatorio" });
    const coachName = this.str(teamRow["entrenador"]);
    if (!coachName)
      teamErrors.push({ row: 0, field: "entrenador", message: "El nombre del entrenador es obligatorio" });
    const logoName = this.str(teamRow["logo"]);
    const documentName = this.str(teamRow["documento"]);
    const filesByName = fileMap.filesByName;
    const logoFile = logoName ? filesByName.get(this.normalizeKey(logoName).toLowerCase()) ?? null : null;
    const documentFile = documentName ? filesByName.get(this.normalizeKey(documentName).toLowerCase()) ?? null : null;
    const players = [];
    for (let i = 0; i < playerRows.length; i++) {
      const row = playerRows[i];
      const rowNum = i + 2;
      const pErrors = [];
      const numRaw = row["numero"];
      const number = numRaw !== void 0 && numRaw !== "" ? Number(numRaw) : NaN;
      const lastName = this.str(row["apellido"]);
      const firstName = this.str(row["nombre"]);
      if (isNaN(number) || number < 1 || number > 99) {
        pErrors.push({ row: rowNum, field: "numero", message: `N\xFAmero de camiseta inv\xE1lido: "${numRaw}"` });
      }
      if (!firstName) {
        pErrors.push({ row: rowNum, field: "nombre", message: "El nombre es obligatorio" });
      }
      if (!lastName) {
        pErrors.push({ row: rowNum, field: "apellido", message: "El apellido es obligatorio" });
      }
      const posRaw = this.str(row["posicion"]);
      const position = posRaw ? POSITION_MAP[posRaw.toLowerCase()] ?? posRaw.toUpperCase() : "";
      if (!position) {
        pErrors.push({ row: rowNum, field: "posicion", message: "La posici\xF3n es obligatoria" });
      }
      const birthDate = this.parseDateCell(row["fecha_nacimiento"]);
      const photoName = this.str(row["foto"]);
      const photoFile = photoName ? filesByName.get(this.normalizeKey(photoName).toLowerCase()) ?? null : null;
      const photoFileName = photoFile?.name ?? null;
      players.push({
        number: isNaN(number) ? 0 : number,
        firstName,
        lastName,
        nickName: this.str(row["apodo"]) || null,
        position,
        birthDate,
        height: this.num(row["altura_cm"]),
        weight: this.num(row["peso_kg"]),
        photoFile,
        photoFileName,
        errors: pErrors
      });
    }
    const usedFileNames = /* @__PURE__ */ new Set();
    if (logoFile)
      usedFileNames.add(logoName.toLowerCase());
    if (documentFile)
      usedFileNames.add(documentName.toLowerCase());
    players.forEach((p) => {
      if (p.photoFileName)
        usedFileNames.add(this.normalizeKey(p.photoFileName).toLowerCase());
    });
    for (const [normalizedName] of filesByName) {
      if (!usedFileNames.has(normalizedName)) {
        warnings.push(`Archivo "${normalizedName}" no se usa en el Excel`);
      }
    }
    const allErrors = [
      ...errors,
      ...teamErrors,
      ...players.flatMap((p) => p.errors)
    ];
    const isValid = allErrors.length === 0 && !!name && !!shortname && !!coachName && players.every((p) => p.errors.length === 0);
    return {
      name: name || "",
      shortname: shortname || "",
      coachName: coachName || "",
      coachPhone: this.str(teamRow["telefono_entrenador"]) || null,
      location: this.str(teamRow["ciudad"]) || null,
      primaryColor: this.str(teamRow["color_primario"]) || DEFAULT_PRIMARY_COLOR,
      secondaryColor: this.str(teamRow["color_secundario"]) || DEFAULT_SECONDARY_COLOR,
      logoFile,
      logoFileName: logoFile?.name ?? null,
      documentFile,
      documentFileName: documentFile?.name ?? null,
      excelFile: fileMap.excel,
      players,
      fileMap,
      errors: allErrors,
      warnings,
      isValid
    };
  }
  // ─────────────────────────────────────────────────────────────
  // Clasificación de archivos por nombre
  // ─────────────────────────────────────────────────────────────
  classifyFiles(files) {
    const map2 = {
      excel: null,
      logo: null,
      document: null,
      playerPhotos: /* @__PURE__ */ new Map(),
      unrecognized: []
    };
    const filesByNormalizedName = /* @__PURE__ */ new Map();
    for (const file of files) {
      const name = file.name.toLowerCase();
      const ext = this.getExtension(name);
      const normalizedName = this.getFileNameWithoutExt(name).toLowerCase();
      if (name.startsWith("equipo") && EXCEL_EXTENSIONS.has(ext)) {
        map2.excel = file;
        continue;
      }
      filesByNormalizedName.set(normalizedName, file);
    }
    map2.filesByName = filesByNormalizedName;
    return map2;
  }
  // ─────────────────────────────────────────────────────────────
  // Parser Excel (SheetJS cargado dinámicamente)
  // ─────────────────────────────────────────────────────────────
  async parseExcel(file) {
    const XLSX = await import("./chunk-UXRTU2GD.js");
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
    const isCsv = file.name.toLowerCase().endsWith(".csv");
    if (isCsv) {
      return this.parseCsv(workbook, XLSX);
    }
    const sheetTeam = workbook.Sheets["Equipo"] ?? workbook.Sheets[workbook.SheetNames[0]];
    const sheetPlayers = workbook.Sheets["Jugadores"] ?? workbook.Sheets[workbook.SheetNames[1]];
    if (!sheetTeam) {
      throw new Error('No se encontr\xF3 la hoja "Equipo"');
    }
    const teamRows = XLSX.utils.sheet_to_json(sheetTeam, {
      defval: "",
      raw: false
    });
    if (!teamRows.length) {
      throw new Error('La hoja "Equipo" est\xE1 vac\xEDa');
    }
    const teamRow = this.normalizeRowKeys(teamRows[0]);
    const playerRows = sheetPlayers ? XLSX.utils.sheet_to_json(sheetPlayers, {
      defval: "",
      raw: false
    }).map((r) => this.normalizeRowKeys(r)) : [];
    return { teamRow, playerRows };
  }
  /** Parsea CSV con secciones #EQUIPO y #JUGADORES */
  parseCsv(workbook, XLSX) {
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const allRows = XLSX.utils.sheet_to_csv(sheet).split("\n").map((r) => r.trim()).filter(Boolean);
    let section = "none";
    let teamHeaders = [];
    let playerHeaders = [];
    let teamData = [];
    let playerData = [];
    for (const line of allRows) {
      if (line.toLowerCase().startsWith("#equipo")) {
        section = "equipo";
        continue;
      }
      if (line.toLowerCase().startsWith("#jugadores")) {
        section = "jugadores";
        continue;
      }
      if (!line)
        continue;
      if (section === "equipo") {
        if (!teamHeaders.length) {
          teamHeaders = this.splitCsv(line);
        } else {
          teamData.push(line);
        }
      } else if (section === "jugadores") {
        if (!playerHeaders.length) {
          playerHeaders = this.splitCsv(line);
        } else {
          playerData.push(line);
        }
      }
    }
    if (section === "none") {
      throw new Error("El CSV debe tener secciones #EQUIPO y #JUGADORES");
    }
    const teamRow = teamData.length ? Object.fromEntries(teamHeaders.map((h, i) => [
      this.normalizeKey(h),
      this.splitCsv(teamData[0])[i] ?? ""
    ])) : {};
    const playerRows = playerData.map((line) => {
      const cols = this.splitCsv(line);
      return Object.fromEntries(playerHeaders.map((h, i) => [this.normalizeKey(h), cols[i] ?? ""]));
    });
    return { teamRow, playerRows };
  }
  // ─────────────────────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────────────────────
  /** Normaliza las claves de una fila: trim + lowercase + sin tildes */
  normalizeRowKeys(row) {
    return Object.fromEntries(Object.entries(row).map(([k, v]) => [this.normalizeKey(k), v]));
  }
  /** Convierte "Nombre Corto" → "nombre_corto", quita tildes */
  normalizeKey(str) {
    return (str ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "_");
  }
  getExtension(filename) {
    const idx = filename.lastIndexOf(".");
    return idx >= 0 ? filename.slice(idx) : "";
  }
  getFileNameWithoutExt(filename) {
    const idx = filename.lastIndexOf(".");
    return idx >= 0 ? filename.slice(0, idx) : filename;
  }
  /** Parsea una celda de fecha: Date nativo, YYYY-MM-DD, DD/MM/YYYY o serial Excel */
  parseDateCell(raw) {
    if (!raw || raw === "")
      return null;
    if (raw instanceof Date && !isNaN(raw.getTime())) {
      return raw.toISOString().split("T")[0];
    }
    const str = String(raw).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(str))
      return str;
    const dmy = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dmy)
      return `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
    const serial = Number(str);
    if (!isNaN(serial) && serial > 1e3) {
      const date = new Date((serial - 25569) * 86400 * 1e3);
      if (!isNaN(date.getTime()))
        return date.toISOString().split("T")[0];
    }
    return null;
  }
  str(v) {
    return v != null ? String(v).trim() : "";
  }
  num(v) {
    const n = Number(v);
    return !isNaN(n) && String(v).trim() !== "" ? n : null;
  }
  /** Split CSV respetando campos entre comillas */
  splitCsv(line) {
    const result = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line.charAt(i);
      if (ch === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === "," && !inQuotes) {
        result.push(cur.trim());
        cur = "";
        continue;
      }
      cur += ch;
    }
    result.push(cur.trim());
    return result;
  }
  /** Crea un payload vacío para casos de error temprano */
  emptyPayload(fileMap, errors, warnings, excelFile) {
    return {
      name: "",
      shortname: "",
      coachName: "",
      coachPhone: null,
      location: null,
      primaryColor: DEFAULT_PRIMARY_COLOR,
      secondaryColor: DEFAULT_SECONDARY_COLOR,
      logoFile: null,
      logoFileName: null,
      documentFile: null,
      documentFileName: null,
      excelFile: excelFile ?? null,
      players: [],
      fileMap,
      errors,
      warnings,
      isValid: false
    };
  }
  static \u0275fac = function TeamImportService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeamImportService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TeamImportService, factory: _TeamImportService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeamImportService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/admin/pages/championships/championship-components/championship-teams.component.ts
var _forTrack05 = ($index, $item) => $item.id;
var _forTrack13 = ($index, $item) => $item.fileName;
var _forTrack2 = ($index, $item) => $item.name;
var _forTrack3 = ($index, $item) => $item.number;
var _forTrack4 = ($index, $item) => $item.file;
function ChampionshipTeamsComponent_Conditional_26_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275text(1, "Procesando...");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipTeamsComponent_Conditional_26_Conditional_32_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "mat-icon", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 45);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 46);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("text-blue-400", item_r4.status === "uploading")("text-green-500", item_r4.status === "done")("text-red-400", item_r4.status === "error")("text-amber-400", item_r4.status === "conflict");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.status === "done" ? "check_circle" : item_r4.status === "error" ? "error" : item_r4.status === "conflict" ? "warning" : "hourglass_top", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.fileName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r4.status === "uploading" ? "Procesando..." : item_r4.status === "done" ? item_r4.teamName + " importado" : item_r4.status === "conflict" ? "Conflicto" : item_r4.error, " ");
  }
}
function ChampionshipTeamsComponent_Conditional_26_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275repeaterCreate(1, ChampionshipTeamsComponent_Conditional_26_Conditional_32_For_2_Template, 7, 11, "div", 43, _forTrack13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.importQueue());
  }
}
function ChampionshipTeamsComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 27)(2, "div", 28)(3, "mat-icon", 29);
    \u0275\u0275text(4, " description ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "p", 30);
    \u0275\u0275text(7, " Importa equipos masivamente desde un archivo ");
    \u0275\u0275elementStart(8, "span", 31);
    \u0275\u0275text(9, ".csv");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " o ");
    \u0275\u0275elementStart(11, "span", 31);
    \u0275\u0275text(12, ".xlsx");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 32);
    \u0275\u0275text(15, " Columnas reconocidas: nombre, nombre_corto, entrenador, tel\xE9fono, ciudad, color_primario, color_secundario ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "button", 33);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_26_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.downloadTemplate());
    });
    \u0275\u0275elementStart(17, "mat-icon", 34);
    \u0275\u0275text(18, "download");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " Plantilla CSV ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 35);
    \u0275\u0275listener("dragover", function ChampionshipTeamsComponent_Conditional_26_Template_div_dragover_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragOver($event));
    })("dragleave", function ChampionshipTeamsComponent_Conditional_26_Template_div_dragleave_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isDragOver.set(false));
    })("drop", function ChampionshipTeamsComponent_Conditional_26_Template_div_drop_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDrop($event));
    })("click", function ChampionshipTeamsComponent_Conditional_26_Template_div_click_20_listener() {
      \u0275\u0275restoreView(_r1);
      const importFileInput_r3 = \u0275\u0275reference(22);
      return \u0275\u0275resetView(importFileInput_r3.click());
    });
    \u0275\u0275elementStart(21, "input", 36, 0);
    \u0275\u0275listener("change", function ChampionshipTeamsComponent_Conditional_26_Template_input_change_21_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFilesSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 37)(24, "mat-icon", 38);
    \u0275\u0275text(25, "upload_file");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div")(27, "p", 39);
    \u0275\u0275text(28, "Arrastra Excel + im\xE1genes aqu\xED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "p", 40);
    \u0275\u0275text(30, " Excel + logo (opcional) + fotos de jugadores (opcional) ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(31, ChampionshipTeamsComponent_Conditional_26_Conditional_31_Template, 2, 0, "p", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(32, ChampionshipTeamsComponent_Conditional_26_Conditional_32_Template, 3, 0, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(20);
    \u0275\u0275classProp("border-blue-400", ctx_r1.isDragOver())("bg-blue-50", ctx_r1.isDragOver())("border-gray-300", !ctx_r1.isDragOver())("bg-gray-50", !ctx_r1.isDragOver())("opacity-50", ctx_r1.importState() === "uploading")("pointer-events-none", ctx_r1.importState() === "uploading");
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r1.importState() === "uploading" ? 31 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.importQueue().length ? 32 : -1);
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68)(1, "mat-icon", 71);
    \u0275\u0275text(2, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Logo ");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68)(1, "mat-icon", 71);
    \u0275\u0275text(2, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const team_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.countPlayersWithPhoto(team_r8.players), " fotos ");
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 74);
  }
  if (rf & 2) {
    const team_r8 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.getTeamLogoUrl(team_r8.logoFile), \u0275\u0275sanitizeUrl);
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const team_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" ", (team_r8.shortname || team_r8.name).slice(0, 2).toUpperCase(), " ");
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const team_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(team_r8.coachPhone);
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const team_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(team_r8.location);
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_For_25_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 90)(1, "mat-icon", 71);
    \u0275\u0275text(2, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Foto \u2713 ");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_For_25_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 91);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 85)(1, "td", 87);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 88);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 88);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 89);
    \u0275\u0275conditionalCreate(8, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_For_25_Conditional_8_Template, 4, 0, "span", 90)(9, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_For_25_Conditional_9_Template, 2, 0, "span", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const player_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(player_r9.number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", player_r9.firstName, " ", player_r9.lastName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(player_r9.position);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(player_r9.photoFile ? 8 : 9);
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_26_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 95);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2022 ", err_r10.message);
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_26_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 96);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const team_r8 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", team_r8.errors.length - 3, " m\xE1s...");
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86)(1, "p", 92)(2, "mat-icon", 93);
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ul", 94);
    \u0275\u0275repeaterCreate(6, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_26_For_7_Template, 2, 1, "li", 95, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275conditionalCreate(8, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_26_Conditional_8_Template, 2, 1, "li", 96);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const team_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", team_r8.errors.length, " error(es) ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(team_r8.errors.slice(0, 3));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(team_r8.errors.length > 3 ? 8 : -1);
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "div", 72)(2, "div", 73);
    \u0275\u0275conditionalCreate(3, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_3_Template, 1, 1, "img", 74)(4, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_4_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 75)(6, "p", 76);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_8_Template, 2, 1, "p", 77);
    \u0275\u0275conditionalCreate(9, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_9_Template, 2, 1, "p", 77);
    \u0275\u0275elementStart(10, "div", 78)(11, "div", 79);
    \u0275\u0275element(12, "div", 80);
    \u0275\u0275elementStart(13, "span", 81);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 79);
    \u0275\u0275element(16, "div", 80);
    \u0275\u0275elementStart(17, "span", 81);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(19, "div", 82)(20, "p", 83);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "table", 84)(23, "tbody");
    \u0275\u0275repeaterCreate(24, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_For_25_Template, 10, 5, "tr", 85, _forTrack3);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(26, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Conditional_26_Template, 9, 2, "div", 86);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const team_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", team_r8.primaryColor);
    \u0275\u0275advance();
    \u0275\u0275conditional(team_r8.logoFile ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(team_r8.coachName);
    \u0275\u0275advance();
    \u0275\u0275conditional(team_r8.coachPhone ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(team_r8.location ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", team_r8.primaryColor);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r8.primaryColor);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", team_r8.secondaryColor);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r8.secondaryColor);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Jugadores (", team_r8.players.length, ")");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(team_r8.players);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(team_r8.errors.length > 0 ? 26 : -1);
  }
}
function ChampionshipTeamsComponent_Conditional_27_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58)(1, "div", 64);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_27_For_20_Template_div_click_1_listener() {
      const \u0275$index_146_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleTeamExpand(\u0275$index_146_r7));
    });
    \u0275\u0275elementStart(2, "div", 65)(3, "span", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 67);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_7_Template, 4, 0, "span", 68);
    \u0275\u0275conditionalCreate(8, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_8_Template, 4, 1, "span", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-icon", 69);
    \u0275\u0275text(10, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, ChampionshipTeamsComponent_Conditional_27_For_20_Conditional_11_Template, 27, 14, "div", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const team_r8 = ctx.$implicit;
    const \u0275$index_146_r7 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", team_r8.name, " (", team_r8.shortname, ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", team_r8.players.length, " jugadores");
    \u0275\u0275advance();
    \u0275\u0275conditional(team_r8.logoFile ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasPlayersWithPhoto(team_r8.players) ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", ctx_r1.expandedTeams().has(\u0275$index_146_r7) ? "rotate(180deg)" : "rotate(0)");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.expandedTeams().has(\u0275$index_146_r7) ? 11 : -1);
  }
}
function ChampionshipTeamsComponent_Conditional_27_Conditional_21_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 100)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const error_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(error_r11.file);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(": ", error_r11.message, " ");
  }
}
function ChampionshipTeamsComponent_Conditional_27_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "p", 97)(2, "mat-icon", 98);
    \u0275\u0275text(3, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ul", 99);
    \u0275\u0275repeaterCreate(6, ChampionshipTeamsComponent_Conditional_27_Conditional_21_For_7_Template, 4, 2, "li", 100, _forTrack4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.importErrors().length, " Imagen(es) sin match ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.importErrors());
  }
}
function ChampionshipTeamsComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 47)(2, "div")(3, "h3", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 50);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_27_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelImport());
    });
    \u0275\u0275elementStart(8, "mat-icon", 51);
    \u0275\u0275text(9, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 52)(11, "div", 53)(12, "span", 54);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 54);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 55);
    \u0275\u0275element(17, "div", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 57);
    \u0275\u0275repeaterCreate(19, ChampionshipTeamsComponent_Conditional_27_For_20_Template, 12, 8, "div", 58, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, ChampionshipTeamsComponent_Conditional_27_Conditional_21_Template, 8, 1, "div", 59);
    \u0275\u0275elementStart(22, "div", 60)(23, "button", 61);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_27_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelImport());
    });
    \u0275\u0275text(24, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 62);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_27_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmImportedTeam());
    });
    \u0275\u0275elementStart(26, "mat-icon", 63);
    \u0275\u0275text(27, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Preview: ", ctx_r1.importedTeams().length, " Equipo(s)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.importProgressText());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2(" ", ctx_r1.importProgress().imagesProcessed, "/", ctx_r1.importProgress().totalImages, " im\xE1genes ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.importedTeams().length, " Excel(s) procesado(s) ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.importProgress().totalImages > 0 ? ctx_r1.importProgress().imagesProcessed / ctx_r1.importProgress().totalImages * 100 : 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.importedTeams());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.importErrors().length > 0 ? 21 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.canConfirmImport())("title", !ctx_r1.canConfirmImport() ? "Hay equipos con errores" : "Importar todos los equipos");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Importar ", ctx_r1.importedTeams().length, " Equipo(s) ");
  }
}
function ChampionshipTeamsComponent_Conditional_29_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 102);
    \u0275\u0275text(1, 'Sin resultados para "');
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, '"');
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.searchQuery());
  }
}
function ChampionshipTeamsComponent_Conditional_29_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 102);
    \u0275\u0275text(1, "No hay equipos inscritos a\xFAn.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 103);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_29_Conditional_4_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCreateTeam());
    });
    \u0275\u0275elementStart(3, "mat-icon", 14);
    \u0275\u0275text(4, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Inscribir primer equipo ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isFull());
  }
}
function ChampionshipTeamsComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "mat-icon", 101);
    \u0275\u0275text(2, "group_off");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, ChampionshipTeamsComponent_Conditional_29_Conditional_3_Template, 5, 1, "p", 102)(4, ChampionshipTeamsComponent_Conditional_29_Conditional_4_Template, 6, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.searchQuery() ? 3 : 4);
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 110);
    \u0275\u0275text(1, "INACTIVO");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 120);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_For_31_Conditional_15_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const team_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.viewDocument(team_r14, $event));
    });
    \u0275\u0275elementStart(1, "mat-icon", 121);
    \u0275\u0275text(2, "description");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const team_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("aria-label", "Ver documento de " + team_r14.name);
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_For_14_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 137);
  }
  if (rf & 2) {
    const player_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", player_r18.photoUrl, \u0275\u0275sanitizeUrl);
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_For_14_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const player_r18 = \u0275\u0275nextContext().$implicit;
    const team_r14 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275styleProp("color", team_r14.primaryColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", player_r18.firstName.charAt(0), "", player_r18.lastName.charAt(0), " ");
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_For_14_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 140);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const player_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('"', player_r18.nickName, '"');
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 132)(1, "td", 133)(2, "span", 134);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 133)(5, "div", 135)(6, "div", 136);
    \u0275\u0275conditionalCreate(7, ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_For_14_Conditional_7_Template, 1, 1, "img", 137)(8, ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_For_14_Conditional_8_Template, 2, 4, "span", 138);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 139);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_For_14_Conditional_11_Template, 2, 1, "span", 140);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 141);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 133)(15, "span", 142);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 133)(18, "button", 143);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_For_14_Template_button_click_18_listener() {
      const player_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const team_r14 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEditPlayer(team_r14, player_r18));
    });
    \u0275\u0275elementStart(19, "mat-icon", 144);
    \u0275\u0275text(20, "edit");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const player_r18 = ctx.$implicit;
    const team_r14 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", team_r14.primaryColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", player_r18.number, " ");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", player_r18.photoUrl ? "transparent" : team_r14.secondaryColor);
    \u0275\u0275advance();
    \u0275\u0275conditional(player_r18.photoUrl ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", player_r18.firstName, " ", player_r18.lastName, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(player_r18.nickName ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.positionLabel(player_r18.positionId), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.playerStatusClasses(player_r18.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.playerStatusLabel(player_r18.status));
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 122)(1, "thead")(2, "tr", 128)(3, "th", 129);
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 130);
    \u0275\u0275text(6, "Jugador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 130);
    \u0275\u0275text(8, "Posici\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 130);
    \u0275\u0275text(10, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th", 131);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_For_14_Template, 21, 13, "tr", 132, _forTrack05);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const team_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(13);
    \u0275\u0275repeater(team_r14.players);
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 123)(1, "mat-icon", 145);
    \u0275\u0275text(2, "person_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 146);
    \u0275\u0275text(4, "Sin jugadores inscritos");
    \u0275\u0275elementEnd()();
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 126);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" L\xEDmite de ", ctx_r1.maxPlayersPerTeam(), " jugadores alcanzado ");
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 127);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const team_r14 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", team_r14.players.length, "/", ctx_r1.maxPlayersPerTeam(), " jugadores ");
  }
}
function ChampionshipTeamsComponent_For_31_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 119);
    \u0275\u0275conditionalCreate(1, ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_1_Template, 15, 0, "table", 122)(2, ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_2_Template, 5, 0, "div", 123);
    \u0275\u0275elementStart(3, "div", 124)(4, "button", 125);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_For_31_Conditional_25_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r16);
      const team_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreatePlayer(team_r14));
    });
    \u0275\u0275elementStart(5, "mat-icon", 34);
    \u0275\u0275text(6, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Agregar jugador ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_8_Template, 2, 1, "span", 126)(9, ChampionshipTeamsComponent_For_31_Conditional_25_Conditional_9_Template, 2, 2, "span", 127);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const team_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(team_r14.players.length > 0 ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-blue-600", team_r14.players.length < ctx_r1.maxPlayersPerTeam())("bg-blue-50", team_r14.players.length < ctx_r1.maxPlayersPerTeam())("border-blue-100", team_r14.players.length < ctx_r1.maxPlayersPerTeam())("hover:bg-blue-100", team_r14.players.length < ctx_r1.maxPlayersPerTeam())("cursor-pointer", team_r14.players.length < ctx_r1.maxPlayersPerTeam())("text-gray-400", team_r14.players.length >= ctx_r1.maxPlayersPerTeam())("bg-gray-50", team_r14.players.length >= ctx_r1.maxPlayersPerTeam())("border-gray-200", team_r14.players.length >= ctx_r1.maxPlayersPerTeam())("cursor-not-allowed", team_r14.players.length >= ctx_r1.maxPlayersPerTeam())("opacity-60", team_r14.players.length >= ctx_r1.maxPlayersPerTeam());
    \u0275\u0275property("disabled", team_r14.players.length >= ctx_r1.maxPlayersPerTeam());
    \u0275\u0275attribute("aria-label", team_r14.players.length >= ctx_r1.maxPlayersPerTeam() ? "L\xEDmite de jugadores alcanzado" : "Agregar jugador al equipo " + team_r14.name);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(team_r14.players.length >= ctx_r1.maxPlayersPerTeam() ? 8 : 9);
  }
}
function ChampionshipTeamsComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 104)(1, "div", 105);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_For_31_Template_div_click_1_listener() {
      const team_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleTeam(team_r14.id));
    });
    \u0275\u0275elementStart(2, "div", 106);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 107)(5, "div", 108)(6, "span", 109);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, ChampionshipTeamsComponent_For_31_Conditional_8_Template, 2, 0, "span", 110);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 111);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 112)(12, "span", 113);
    \u0275\u0275element(13, "span", 114);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, ChampionshipTeamsComponent_For_31_Conditional_15_Template, 3, 1, "button", 115);
    \u0275\u0275elementStart(16, "button", 116);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_For_31_Template_button_click_16_listener($event) {
      const team_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEditTeam(team_r14, $event));
    });
    \u0275\u0275elementStart(17, "mat-icon", 34);
    \u0275\u0275text(18, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 117);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_For_31_Template_button_click_20_listener($event) {
      const team_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeTeam(team_r14.id, $event));
    });
    \u0275\u0275elementStart(21, "mat-icon", 34);
    \u0275\u0275text(22, "close");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "mat-icon", 118);
    \u0275\u0275text(24, "expand_more");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(25, ChampionshipTeamsComponent_For_31_Conditional_25_Template, 10, 24, "div", 119);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const team_r14 = ctx.$implicit;
    const \u0275$index_325_r19 = ctx.$index;
    const \u0275$count_325_r20 = ctx.$count;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("border-b", !(\u0275$index_325_r19 === \u0275$count_325_r20 - 1));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", team_r14.primaryColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", team_r14.shortname.slice(0, 2), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(team_r14.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(!team_r14.isActive ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", team_r14.players.length, " jugadores \xB7 ", team_r14.coachName || "\u2014", " \xB7 ", team_r14.location || "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-green-50", team_r14.isActive)("text-green-700", team_r14.isActive)("border-green-200", team_r14.isActive)("bg-gray-50", !team_r14.isActive)("text-gray-500", !team_r14.isActive)("border-gray-200", !team_r14.isActive);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-green-500", team_r14.isActive)("bg-gray-400", !team_r14.isActive);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", team_r14.isActive ? "Activo" : "Inactivo", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(team_r14.documentUrl ? 15 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275styleProp("transform", ctx_r1.expandedTeams().has(team_r14.id) || ctx_r1.playerMatchedTeamIds().has(team_r14.id) ? "rotate(180deg)" : "rotate(0)");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.expandedTeams().has(team_r14.id) || ctx_r1.playerMatchedTeamIds().has(team_r14.id) ? 25 : -1);
  }
}
function ChampionshipTeamsComponent_Conditional_37_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 154);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.teamModal().logoUrl, \u0275\u0275sanitizeUrl);
  }
}
function ChampionshipTeamsComponent_Conditional_37_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", (ctx_r1.teamModal().shortname || ctx_r1.teamModal().name).slice(0, 2).toUpperCase(), " ");
  }
}
function ChampionshipTeamsComponent_Conditional_37_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 178)(1, "mat-icon", 44);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.teamModalError(), " ");
  }
}
function ChampionshipTeamsComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 147);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_37_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTeamModal());
    });
    \u0275\u0275elementStart(1, "div", 148);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_37_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r21);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 149)(3, "h2", 150);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 50);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_37_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTeamModal());
    });
    \u0275\u0275elementStart(6, "mat-icon", 51);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 151)(9, "div", 152)(10, "div", 153);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_37_Template_div_click_10_listener() {
      \u0275\u0275restoreView(_r21);
      const logoFileInput_r22 = \u0275\u0275reference(17);
      return \u0275\u0275resetView(logoFileInput_r22.click());
    });
    \u0275\u0275conditionalCreate(11, ChampionshipTeamsComponent_Conditional_37_Conditional_11_Template, 1, 1, "img", 154)(12, ChampionshipTeamsComponent_Conditional_37_Conditional_12_Template, 1, 1);
    \u0275\u0275elementStart(13, "div", 155)(14, "mat-icon", 156);
    \u0275\u0275text(15, "photo_camera");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "input", 157, 1);
    \u0275\u0275listener("change", function ChampionshipTeamsComponent_Conditional_37_Template_input_change_16_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTeamLogoSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div")(19, "p", 158);
    \u0275\u0275text(20, "Logo del equipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 159);
    \u0275\u0275text(22, "Haz clic en la imagen para cambiarla");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 160)(24, "div", 161)(25, "label", 162);
    \u0275\u0275text(26, " Nombre ");
    \u0275\u0275elementStart(27, "span", 163);
    \u0275\u0275text(28, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "input", 164);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipTeamsComponent_Conditional_37_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.teamModal().name, $event) || (ctx_r1.teamModal().name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 161)(31, "label", 162);
    \u0275\u0275text(32, " Nombre corto ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 165);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipTeamsComponent_Conditional_37_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.teamModal().shortname, $event) || (ctx_r1.teamModal().shortname = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 160)(35, "div", 161)(36, "label", 162);
    \u0275\u0275text(37, " Entrenador ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 166);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipTeamsComponent_Conditional_37_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.teamModal().coachName, $event) || (ctx_r1.teamModal().coachName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 161)(40, "label", 162);
    \u0275\u0275text(41, " Tel\xE9fono coach ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 167);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipTeamsComponent_Conditional_37_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.teamModal().coachPhone, $event) || (ctx_r1.teamModal().coachPhone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "div", 160)(44, "div", 161)(45, "label", 162);
    \u0275\u0275text(46, " Ciudad ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "input", 168);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipTeamsComponent_Conditional_37_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.teamModal().location, $event) || (ctx_r1.teamModal().location = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 161)(49, "label", 162);
    \u0275\u0275text(50, " A\xF1o de fundaci\xF3n ");
    \u0275\u0275elementStart(51, "span", 169);
    \u0275\u0275text(52, "(opcional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "input", 170);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipTeamsComponent_Conditional_37_Template_input_ngModelChange_53_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.teamModal().foundedYear, $event) || (ctx_r1.teamModal().foundedYear = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(54, "div", 161)(55, "label", 162);
    \u0275\u0275text(56, " Estadio / Sede ");
    \u0275\u0275elementStart(57, "span", 169);
    \u0275\u0275text(58, "(opcional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "input", 171);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipTeamsComponent_Conditional_37_Template_input_ngModelChange_59_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.teamModal().homeVenue, $event) || (ctx_r1.teamModal().homeVenue = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div")(61, "label", 172);
    \u0275\u0275text(62, " Colores del equipo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 152)(64, "div", 173)(65, "input", 174);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipTeamsComponent_Conditional_37_Template_input_ngModelChange_65_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.teamModal().primaryColor, $event) || (ctx_r1.teamModal().primaryColor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "span", 175);
    \u0275\u0275text(67, "Principal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 173)(69, "input", 174);
    \u0275\u0275twoWayListener("ngModelChange", function ChampionshipTeamsComponent_Conditional_37_Template_input_ngModelChange_69_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.teamModal().secondaryColor, $event) || (ctx_r1.teamModal().secondaryColor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "span", 175);
    \u0275\u0275text(71, "Secundario");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 176);
    \u0275\u0275element(73, "div", 75)(74, "div", 75);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(75, "div", 161)(76, "label", 162);
    \u0275\u0275text(77, " Documento del equipo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "app-file-upload", 177);
    \u0275\u0275listener("fileChange", function ChampionshipTeamsComponent_Conditional_37_Template_app_file_upload_fileChange_78_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDocumentFileChanged($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(79, ChampionshipTeamsComponent_Conditional_37_Conditional_79_Template, 4, 1, "div", 178);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "div", 179)(81, "button", 180);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_37_Template_button_click_81_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTeamModal());
    });
    \u0275\u0275text(82, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "button", 181);
    \u0275\u0275listener("click", function ChampionshipTeamsComponent_Conditional_37_Template_button_click_83_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitTeamModal());
    });
    \u0275\u0275elementStart(84, "mat-icon", 14);
    \u0275\u0275text(85, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(86);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.teamModal().id ? "Editar Equipo" : "Inscribir Equipo", " ");
    \u0275\u0275advance(6);
    \u0275\u0275styleProp("background", ctx_r1.teamModal().primaryColor);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.teamModal().logoUrl ? 11 : 12);
    \u0275\u0275advance(18);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teamModal().name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teamModal().shortname);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teamModal().coachName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teamModal().coachPhone);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teamModal().location);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teamModal().foundedYear);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teamModal().homeVenue);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teamModal().primaryColor);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teamModal().secondaryColor);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("background", ctx_r1.teamModal().primaryColor);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r1.teamModal().secondaryColor);
    \u0275\u0275advance(4);
    \u0275\u0275property("currentUrl", ctx_r1.teamModal().documentUrl);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.teamModalError() ? 79 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r1.teamModal().id ? "Guardar cambios" : "Inscribir equipo", " ");
  }
}
function ChampionshipTeamsComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-player-modal", 182);
    \u0275\u0275listener("saved", function ChampionshipTeamsComponent_Conditional_38_Template_app_player_modal_saved_0_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPlayerSaved($event));
    })("deleted", function ChampionshipTeamsComponent_Conditional_38_Template_app_player_modal_deleted_0_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPlayerDeleted($event));
    })("dismiss", function ChampionshipTeamsComponent_Conditional_38_Template_app_player_modal_dismiss_0_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.playerModal.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("player", ctx_r1.playerModal().player)("teamId", ctx_r1.playerModal().teamId)("positions", ctx_r1.positions);
  }
}
function ChampionshipTeamsComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-pdf-viewer", 183);
    \u0275\u0275listener("close", function ChampionshipTeamsComponent_Conditional_39_Template_app_pdf_viewer_close_0_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pdfViewerData.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("url", ctx_r1.pdfViewerData().url)("title", ctx_r1.pdfViewerData().title);
  }
}
var DEFAULT_TEAM_FORM = () => ({
  name: "",
  shortname: "",
  coachName: "",
  coachPhone: "",
  location: "",
  foundedYear: null,
  homeVenue: "",
  primaryColor: "#1a56db",
  secondaryColor: "#e74694",
  logoUrl: null,
  documentUrl: null
});
var _nextTeamId = 100;
var _nextPlayerId = 1e3;
var PLAYER_STATUS_META = {
  active: { label: "Activo", classes: "bg-green-50 text-green-700" },
  suspended: { label: "Suspendido", classes: "bg-amber-50 text-amber-700" },
  injured: { label: "Lesionado", classes: "bg-orange-50 text-orange-700" },
  inactive: { label: "Inactivo", classes: "bg-gray-100 text-gray-500" }
};
var CSV_HEADERS = "nombre,nombre_corto,entrenador,telefono_entrenador,ciudad,color_primario,color_secundario";
var ChampionshipTeamsComponent = class _ChampionshipTeamsComponent {
  // ── Inputs / Outputs ──────────────────────────────────────────
  maxTeams = input(16, __spreadValues({}, ngDevMode ? { debugName: "maxTeams" } : {}));
  maxPlayersPerTeam = input(20, __spreadValues({}, ngDevMode ? { debugName: "maxPlayersPerTeam" } : {}));
  initialTeams = input([], __spreadValues({}, ngDevMode ? { debugName: "initialTeams" } : {}));
  positions = MOCK_POSITIONS;
  save = output();
  /** Emite cuando hay cambios locales sin guardar (jugador/equipo añadido, editado o eliminado). */
  dirty = output();
  // ── Services ──────────────────────────────────────────────────
  snackBar = inject(MatSnackBar);
  cdr = inject(ChangeDetectorRef);
  teamImportService = inject(TeamImportService);
  // ── State ─────────────────────────────────────────────────────
  teams = signal([], __spreadValues({}, ngDevMode ? { debugName: "teams" } : {}));
  constructor() {
    effect(() => {
      this.teams.set(this.initialTeams().map((t) => __spreadProps(__spreadValues({}, t), { players: [...t.players] })));
    });
    this.destroyRef.onDestroy(() => {
      this.blobUrls.forEach((u) => URL.revokeObjectURL(u));
    });
  }
  expandedTeams = signal(/* @__PURE__ */ new Set(), __spreadValues({}, ngDevMode ? { debugName: "expandedTeams" } : {}));
  showImport = signal(true, __spreadValues({}, ngDevMode ? { debugName: "showImport" } : {}));
  // visible por defecto — colapsable con el botón Importar
  isDragOver = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isDragOver" } : {}));
  importQueue = signal([], __spreadValues({}, ngDevMode ? { debugName: "importQueue" } : {}));
  conflictDialog = signal(null, __spreadValues({}, ngDevMode ? { debugName: "conflictDialog" } : {}));
  // ── Import masivo ──────────────────────────────────────────
  importedTeams = signal([], __spreadValues({}, ngDevMode ? { debugName: "importedTeams" } : {}));
  // Array de equipos parseados
  importState = signal(null, __spreadValues({}, ngDevMode ? { debugName: "importState" } : {}));
  maxFileSize = signal(5, __spreadValues({}, ngDevMode ? { debugName: "maxFileSize" } : {}));
  // MB — editable
  importProgress = signal({ excels: 0, imagesProcessed: 0, totalImages: 0 }, __spreadValues({}, ngDevMode ? { debugName: "importProgress" } : {}));
  importErrors = signal([], __spreadValues({}, ngDevMode ? { debugName: "importErrors" } : {}));
  expectedImageFiles = signal(/* @__PURE__ */ new Map(), __spreadValues({}, ngDevMode ? { debugName: "expectedImageFiles" } : {}));
  // Mapping: filename → {team, player}
  matchedImages = signal(/* @__PURE__ */ new Map(), __spreadValues({}, ngDevMode ? { debugName: "matchedImages" } : {}));
  // Tracking: matched images
  // ─────────────────────────────────────────────────────────────
  teamModal = signal(null, __spreadValues({}, ngDevMode ? { debugName: "teamModal" } : {}));
  teamModalError = signal("", __spreadValues({}, ngDevMode ? { debugName: "teamModalError" } : {}));
  playerModal = signal(null, __spreadValues({}, ngDevMode ? { debugName: "playerModal" } : {}));
  pdfViewerData = signal(null, __spreadValues({}, ngDevMode ? { debugName: "pdfViewerData" } : {}));
  destroyRef = inject(DestroyRef);
  blobUrls = [];
  searchQuery = signal("", __spreadValues({}, ngDevMode ? { debugName: "searchQuery" } : {}));
  normalize(s) {
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  // ── Computed ──────────────────────────────────────────────────
  filteredTeams = computed(() => {
    const q = this.normalize(this.searchQuery().trim());
    if (!q)
      return this.teams();
    const result = [];
    for (const t of this.teams()) {
      const teamMatch = this.normalize(t.name).includes(q);
      if (teamMatch) {
        result.push(t);
        continue;
      }
      const matchingPlayerIds = new Set(t.players.filter((p) => this.normalize(`${p.firstName} ${p.lastName}`).includes(q)).map((p) => p.id));
      if (matchingPlayerIds.size > 0) {
        const sorted = [
          ...t.players.filter((p) => matchingPlayerIds.has(p.id)),
          ...t.players.filter((p) => !matchingPlayerIds.has(p.id))
        ];
        result.push(__spreadProps(__spreadValues({}, t), { players: sorted }));
      }
    }
    return result;
  }, __spreadValues({}, ngDevMode ? { debugName: "filteredTeams" } : {}));
  // IDs de equipos que aparecen por coincidencia en jugadores (para auto-expandir)
  playerMatchedTeamIds = computed(() => {
    const q = this.normalize(this.searchQuery().trim());
    if (!q)
      return /* @__PURE__ */ new Set();
    const ids = /* @__PURE__ */ new Set();
    for (const t of this.teams()) {
      if (this.normalize(t.name).includes(q))
        continue;
      if (t.players.some((p) => this.normalize(`${p.firstName} ${p.lastName}`).includes(q))) {
        ids.add(t.id);
      }
    }
    return ids;
  }, __spreadValues({}, ngDevMode ? { debugName: "playerMatchedTeamIds" } : {}));
  isFull = computed(() => this.teams().length >= this.maxTeams(), __spreadValues({}, ngDevMode ? { debugName: "isFull" } : {}));
  progressPct = computed(() => Math.min(100, this.teams().length / this.maxTeams() * 100), __spreadValues({}, ngDevMode ? { debugName: "progressPct" } : {}));
  progressColor = computed(() => {
    const p = this.progressPct();
    if (p >= 100)
      return "#ef4444";
    if (p >= 75)
      return "#f59e0b";
    return "#3b82f6";
  }, __spreadValues({}, ngDevMode ? { debugName: "progressColor" } : {}));
  // ── Computed: Import state ───────────────────────────────────
  importIsProcessing = computed(() => this.importState() === "uploading", __spreadValues({}, ngDevMode ? { debugName: "importIsProcessing" } : {}));
  importProgressText = computed(() => {
    const p = this.importProgress();
    return `Procesando ${p.excels} excels + ${p.totalImages} im\xE1genes... (${p.imagesProcessed}/${p.totalImages} completadas)`;
  }, __spreadValues({}, ngDevMode ? { debugName: "importProgressText" } : {}));
  importHasErrors = computed(() => this.importErrors().length > 0, __spreadValues({}, ngDevMode ? { debugName: "importHasErrors" } : {}));
  canConfirmImport = computed(() => this.importedTeams().length > 0 && !this.importIsProcessing() && this.importedTeams().every((team) => team.isValid), __spreadValues({}, ngDevMode ? { debugName: "canConfirmImport" } : {}));
  // ── Import helpers ───────────────────────────────────────────
  toggleTeamExpand(idx) {
    this.expandedTeams.update((s) => {
      const next = new Set(s);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }
  getTeamLogoUrl(logoFile) {
    return logoFile ? URL.createObjectURL(logoFile) : null;
  }
  countPlayersWithPhoto(players) {
    return players.filter((p) => p.photoFile !== void 0).length;
  }
  hasPlayersWithPhoto(players) {
    return players.some((p) => p.photoFile !== void 0);
  }
  cancelImport() {
    for (const url of this.blobUrls) {
      URL.revokeObjectURL(url);
    }
    this.blobUrls = [];
    this.importedTeams.set([]);
    this.importState.set(null);
    this.importProgress.set({ excels: 0, imagesProcessed: 0, totalImages: 0 });
    this.importErrors.set([]);
    this.expectedImageFiles.set(/* @__PURE__ */ new Map());
    this.matchedImages.set(/* @__PURE__ */ new Map());
  }
  // ── Team expand ───────────────────────────────────────────────
  toggleTeam(id) {
    this.expandedTeams.update((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  // ── Team modal ────────────────────────────────────────────────
  openCreateTeam() {
    if (this.isFull()) {
      this.snackBar.open(`L\xEDmite de ${this.maxTeams()} equipos alcanzado`, "Cerrar", { duration: 3e3 });
      return;
    }
    this.teamModal.set(DEFAULT_TEAM_FORM());
    this.teamModalError.set("");
  }
  openEditTeam(team, event) {
    event.stopPropagation();
    this.teamModal.set({
      id: team.id,
      name: team.name,
      shortname: team.shortname,
      coachName: team.coachName,
      coachPhone: team.coachPhone,
      location: team.location,
      foundedYear: team.foundedYear,
      homeVenue: team.homeVenue,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      logoUrl: team.logoUrl,
      documentUrl: team.documentUrl
    });
    this.teamModalError.set("");
  }
  closeTeamModal() {
    this.teamModal.set(null);
  }
  buildUploadFormData(form) {
    const fd = new FormData();
    if (form.logoFile) {
      fd.append("logoUrl", form.logoFile, form.logoFile.name);
    }
    if (form.documentFile) {
      fd.append("documentUrl", form.documentFile, form.documentFile.name);
    }
    return fd;
  }
  logUploadFormData(fd) {
    const fields = [];
    fd.forEach((value, key) => {
      if (value instanceof File) {
        fields.push({ key, name: value.name, type: value.type, size: value.size });
      }
    });
    console.log("Team upload FormData (mock):", fields);
  }
  submitTeamModal() {
    const f = this.teamModal();
    if (!f)
      return;
    if (!f.name.trim()) {
      this.teamModalError.set("El nombre del equipo es requerido.");
      return;
    }
    const uploadFormData = this.buildUploadFormData(f);
    this.logUploadFormData(uploadFormData);
    const filePayload = {
      teamName: f.name,
      logoFile: f.logoFile ? { name: f.logoFile.name, type: f.logoFile.type, size: f.logoFile.size } : null,
      documentFile: f.documentFile ? { name: f.documentFile.name, type: f.documentFile.type, size: f.documentFile.size } : null
    };
    console.log("Team files payload (mock upload):", filePayload);
    if (f.id) {
      if (f.logoUrl?.startsWith("blob:"))
        this.blobUrls.push(f.logoUrl);
      if (f.documentUrl?.startsWith("blob:"))
        this.blobUrls.push(f.documentUrl);
      this.teams.update((list) => list.map((t) => t.id !== f.id ? t : __spreadProps(__spreadValues({}, t), {
        name: f.name,
        shortname: f.shortname,
        coachName: f.coachName,
        coachPhone: f.coachPhone,
        location: f.location,
        foundedYear: f.foundedYear,
        homeVenue: f.homeVenue,
        primaryColor: f.primaryColor,
        secondaryColor: f.secondaryColor,
        logoUrl: f.logoUrl,
        documentUrl: f.documentUrl
      })));
      this.snackBar.open("Equipo actualizado", "Cerrar", { duration: 2e3 });
    } else {
      const slug = f.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const newTeam = {
        id: _nextTeamId++,
        championshipId: 1,
        name: f.name,
        shortname: f.shortname,
        slug,
        logoUrl: f.logoUrl,
        documentUrl: f.documentUrl,
        primaryColor: f.primaryColor,
        secondaryColor: f.secondaryColor,
        location: f.location,
        foundedYear: f.foundedYear,
        homeVenue: f.homeVenue,
        coachName: f.coachName,
        coachPhone: f.coachPhone,
        isActive: true,
        players: []
      };
      this.teams.update((list) => [...list, newTeam]);
      this.snackBar.open(`Equipo "${f.name}" inscrito`, "Cerrar", { duration: 2e3 });
    }
    this.teamModal.set(null);
    this.dirty.emit();
  }
  onDocumentFileChanged(file) {
    const m = this.teamModal();
    if (!m)
      return;
    let documentUrl = null;
    if (file) {
      documentUrl = URL.createObjectURL(file);
    }
    this.teamModal.set(__spreadProps(__spreadValues({}, m), { documentUrl, documentFile: file ?? void 0 }));
  }
  viewDocument(team, event) {
    event.stopPropagation();
    const url = team.documentUrl ?? null;
    if (url)
      this.pdfViewerData.set({ url, title: team.name });
  }
  onTeamLogoSelected(event) {
    const file = event.target.files?.[0];
    if (!file)
      return;
    const logoUrl = URL.createObjectURL(file);
    const m = this.teamModal();
    if (!m)
      return;
    this.teamModal.set(__spreadProps(__spreadValues({}, m), { logoUrl, logoFile: file }));
  }
  removeTeam(id, event) {
    event.stopPropagation();
    this.teams.update((list) => list.filter((t) => t.id !== id));
    this.expandedTeams.update((s) => {
      const n = new Set(s);
      n.delete(id);
      return n;
    });
    this.snackBar.open("Equipo retirado del campeonato", "Cerrar", { duration: 2e3 });
    this.dirty.emit();
  }
  // ── Player modal ──────────────────────────────────────────────
  openCreatePlayer(team) {
    if (team.players.length >= this.maxPlayersPerTeam()) {
      this.snackBar.open(`L\xEDmite de ${this.maxPlayersPerTeam()} jugadores por equipo alcanzado`, "Cerrar", { duration: 3e3 });
      return;
    }
    this.playerModal.set({ player: null, teamId: team.id });
  }
  openEditPlayer(team, player) {
    this.playerModal.set({
      teamId: team.id,
      player: {
        id: player.id,
        teamId: player.teamId,
        positionId: player.positionId,
        firstName: player.firstName,
        lastName: player.lastName,
        nickName: player.nickName ?? "",
        number: player.number,
        birthDate: player.birthDate ?? "",
        height: player.height,
        weight: player.weight,
        status: player.status,
        photoUrl: player.photoUrl,
        photoFile: player.photoFile
      }
    });
  }
  onPlayerSaved(data) {
    this.teams.update((list) => list.map((t) => {
      if (t.id !== data.teamId)
        return t;
      const isEdit = !!data.id;
      const updated = {
        id: data.id ?? _nextPlayerId++,
        teamId: data.teamId,
        positionId: data.positionId,
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName || null,
        number: data.number,
        birthDate: data.birthDate || null,
        height: data.height,
        weight: data.weight,
        status: data.status,
        photoUrl: data.photoUrl ?? null,
        photoFile: data.photoFile
      };
      return __spreadProps(__spreadValues({}, t), {
        players: isEdit ? t.players.map((p) => p.id === updated.id ? updated : p) : [...t.players, updated]
      });
    }));
    this.playerModal.set(null);
    this.dirty.emit();
  }
  onPlayerDeleted(playerId) {
    this.teams.update((list) => list.map((t) => __spreadProps(__spreadValues({}, t), {
      players: t.players.filter((p) => p.id !== playerId)
    })));
    this.playerModal.set(null);
    this.snackBar.open("Jugador dado de baja", "Cerrar", { duration: 2e3 });
    this.dirty.emit();
  }
  // ── Position helpers ──────────────────────────────────────────
  positionLabel(positionId) {
    return this.positions.find((p) => p.id === positionId)?.label ?? "\u2014";
  }
  playerStatusLabel(s) {
    return PLAYER_STATUS_META[s]?.label ?? s;
  }
  playerStatusClasses(s) {
    return PLAYER_STATUS_META[s]?.classes ?? "";
  }
  // ── Import ────────────────────────────────────────────────────
  toggleImport() {
    this.showImport.update((v) => !v);
  }
  onDragOver(e) {
    e.preventDefault();
    this.isDragOver.set(true);
  }
  onDrop(e) {
    e.preventDefault();
    this.isDragOver.set(false);
    const files = Array.from(e.dataTransfer?.files ?? []);
    this._processUploadedFiles(files);
  }
  onFilesSelected(e) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0)
      return;
    this._processUploadedFiles(files);
    e.target.value = "";
  }
  _processUploadedFiles(files) {
    const excelFiles = files.filter((f) => /\.(xlsx|xls|csv)$/i.test(f.name));
    const imageFiles = files.filter((f) => /\.(png|jpg|jpeg|gif|webp)$/i.test(f.name));
    if (excelFiles.length === 0) {
      this.snackBar.open("Debe incluir al menos 1 archivo Excel", "Cerrar", { duration: 3e3 });
      return;
    }
    const validExcels = excelFiles.filter((f) => {
      if (f.size > this.maxFileSize() * 1024 * 1024) {
        this.importErrors.update((e) => [...e, {
          type: "file-size",
          file: f.name,
          message: `Demasiado grande (${(f.size / 1024 / 1024).toFixed(1)} MB > ${this.maxFileSize()} MB)`
        }]);
        return false;
      }
      return true;
    });
    if (validExcels.length === 0) {
      this.snackBar.open("Ning\xFAn Excel v\xE1lido", "Cerrar", { duration: 3e3 });
      return;
    }
    this.importState.set("uploading");
    this.importProgress.set({
      excels: validExcels.length,
      imagesProcessed: 0,
      totalImages: imageFiles.length
    });
    Promise.all(validExcels.map((file) => this.teamImportService.processFiles([file]))).then((payloads) => {
      this.importedTeams.set(payloads);
      const expectedMap = /* @__PURE__ */ new Map();
      payloads.forEach((payload, teamIdx) => {
        const logoKey = `${payload.name}_logo`;
        expectedMap.set(logoKey, { teamIdx, isLogo: true });
        payload.players.forEach((player, playerId) => {
          const photoKey = `${payload.name}_${player.number}_${player.lastName}`;
          expectedMap.set(photoKey, { teamIdx, playerId, isLogo: false });
        });
      });
      this.expectedImageFiles.set(expectedMap);
      if (imageFiles.length > 0) {
        this._matchAndProcessImages(imageFiles, expectedMap);
      } else {
        this.importState.set("preview");
      }
    }).catch((err) => {
      const msg = err instanceof Error ? err.message : String(err);
      this.importErrors.update((e) => [...e, {
        type: "excel-parse",
        file: "unknown",
        message: msg
      }]);
      this.snackBar.open(`Error al procesar excels: ${msg}`, "Cerrar", { duration: 4e3 });
      this.importState.set(null);
    });
  }
  _matchAndProcessImages(imageFiles, expectedMap) {
    let processedCount = 0;
    const matchedImgs = /* @__PURE__ */ new Map();
    const unmatchedErrors = [];
    imageFiles.forEach((file) => {
      const nameWithoutExt = file.name.split(".").slice(0, -1).join(".");
      const matched = expectedMap.get(nameWithoutExt);
      if (matched) {
        if (file.size > 5 * 1024 * 1024) {
          this.importErrors.update((e) => [...e, {
            type: "image-size",
            file: file.name,
            message: `Demasiado grande (${(file.size / 1024 / 1024).toFixed(1)} MB)`
          }]);
        } else {
          const blobUrl = URL.createObjectURL(file);
          this.blobUrls.push(blobUrl);
          matchedImgs.set(nameWithoutExt, file);
          if (matched.isLogo) {
            this.importedTeams.update((teams) => teams.map((t, idx) => idx === matched.teamIdx ? __spreadProps(__spreadValues({}, t), { logoFile: file }) : t));
          } else if (matched.playerId !== void 0) {
            this.importedTeams.update((teams) => teams.map((t, idx) => {
              if (idx !== matched.teamIdx)
                return t;
              return __spreadProps(__spreadValues({}, t), {
                players: t.players.map((p, pIdx) => pIdx === matched.playerId ? __spreadProps(__spreadValues({}, p), { photoFile: file }) : p)
              });
            }));
          }
        }
      } else {
        unmatchedErrors.push(file.name);
      }
      processedCount++;
      this.importProgress.update((p) => __spreadProps(__spreadValues({}, p), { imagesProcessed: processedCount }));
    });
    unmatchedErrors.forEach((name) => {
      this.importErrors.update((e) => [...e, {
        type: "image-not-found",
        file: name,
        message: "No coincide con ning\xFAn equipo/jugador del Excel"
      }]);
    });
    this.matchedImages.set(matchedImgs);
    this.importState.set("preview");
    if (unmatchedErrors.length > 0) {
      this.snackBar.open(`${unmatchedErrors.length} imagen(es) sin match`, "Ver detalles", { duration: 4e3 });
    }
  }
  /**
   * TODO-IMPORT: Reemplaza la simulación de este método con:
   *   this.teamService.importTeam(file).subscribe({
   *     next: (team) => { ... },
   *     error: (err) => { ... }
   *   })
   * El backend devuelve un TeamItem completo con jugadores parseados.
   * El servicio lanzará un 409 si el equipo ya existe → mostrar conflictDialog.
   */
  confirmImportedTeam() {
    const payloads = this.importedTeams();
    if (payloads.length === 0 || payloads.some((p) => p.errors.length > 0)) {
      this.snackBar.open("No se puede confirmar: hay errores", "Cerrar", { duration: 3e3 });
      return;
    }
    const newTeams = [];
    for (const payload of payloads) {
      const slug = payload.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const teamPlayers = payload.players.map((p) => ({
        id: _nextPlayerId++,
        teamId: _nextTeamId,
        // se actualiza después
        firstName: p.firstName,
        lastName: p.lastName,
        nickName: p.nickName,
        number: p.number,
        positionId: MOCK_POSITIONS.find((pos) => pos.code === p.position)?.id ?? 1,
        birthDate: p.birthDate,
        height: p.height,
        weight: p.weight,
        status: "active",
        photoUrl: p.photoFile ? URL.createObjectURL(p.photoFile) : null,
        photoFile: p.photoFile || void 0
      }));
      const logoUrl = payload.logoFile ? URL.createObjectURL(payload.logoFile) : null;
      const documentUrl = payload.documentFile ? URL.createObjectURL(payload.documentFile) : null;
      const newTeam = {
        id: _nextTeamId++,
        championshipId: 1,
        name: payload.name,
        shortname: payload.shortname,
        slug,
        logoUrl,
        documentUrl,
        primaryColor: payload.primaryColor,
        secondaryColor: payload.secondaryColor,
        location: payload.location || "",
        foundedYear: null,
        homeVenue: "",
        coachName: payload.coachName,
        coachPhone: payload.coachPhone || "",
        isActive: true,
        players: teamPlayers
      };
      for (const player of newTeam.players) {
        player.teamId = newTeam.id;
      }
      if (logoUrl)
        this.blobUrls.push(logoUrl);
      if (documentUrl)
        this.blobUrls.push(documentUrl);
      for (const player of newTeam.players) {
        if (player.photoUrl)
          this.blobUrls.push(player.photoUrl);
      }
      newTeams.push(newTeam);
    }
    this.teams.update((t) => [...t, ...newTeams]);
    this.cancelImport();
    this.snackBar.open(`${newTeams.length} equipo(s) importado(s) exitosamente`, "Cerrar", { duration: 3e3 });
  }
  onPlayerPhotosSelected(event) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0)
      return;
    for (const file of files) {
      if (file.size > this.maxFileSize() * 1024 * 1024) {
        this.snackBar.open(`Foto demasiado grande: ${file.name}`, "Cerrar", { duration: 3e3 });
        continue;
      }
    }
  }
  removePlayerPhoto(key) {
  }
  /**
   * TODO-DOWNLOAD: Reemplaza este método con descarga real del backend
   */
  downloadTemplate() {
    const rows = [CSV_HEADERS, "Osos Polares,OSP,Carlos Mendez,+573001234567,Bogot\xE1,#1a56db,#e74694"];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plantilla_equipos.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  static \u0275fac = function ChampionshipTeamsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChampionshipTeamsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChampionshipTeamsComponent, selectors: [["app-championship-teams"]], inputs: { maxTeams: [1, "maxTeams"], maxPlayersPerTeam: [1, "maxPlayersPerTeam"], initialTeams: [1, "initialTeams"] }, outputs: { save: "save", dirty: "dirty" }, decls: 40, vars: 23, consts: [["importFileInput", ""], ["logoFileInput", ""], [1, "max-w-[960px]", "mx-auto", "px-7", "pt-6", "pb-8", "flex", "flex-col", "gap-4"], [1, "flex", "items-center", "gap-3", "flex-wrap"], [1, "inline-flex", "items-center", "gap-2", "px-3", "py-1.5", "rounded-lg", "bg-white", "border", "border-gray-200", "text-[13px]", "font-medium", "text-gray-700", "shrink-0"], [1, "!size-4", "!text-[16px]", "text-gray-400"], [1, "text-gray-900"], [1, "w-16", "h-1.5", "bg-gray-100", "rounded-full", "overflow-hidden"], [1, "h-full", "rounded-full", "transition-all", "duration-300"], [1, "relative", "flex-1", "min-w-[180px]"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "!size-4", "!text-[16px]", "text-gray-400", "pointer-events-none"], ["placeholder", "Buscar equipo...", 1, "w-full", "pl-9", "pr-3", "py-2", "border", "border-gray-200", "rounded-lg", "bg-white", "text-[13px]", "text-gray-900", "outline-none", "focus:border-blue-400", "focus:ring-2", "focus:ring-blue-400/10", "transition-all", "placeholder:text-gray-400", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-2", "ml-auto"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-3.5", "py-2", "rounded-lg", "text-[13px]", "font-medium", "cursor-pointer", "transition-colors", "border", 3, "click"], [1, "!size-4", "!text-[16px]"], [1, "!size-3.5", "!text-[14px]", "transition-transform", "duration-200"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-3.5", "py-2", "rounded-lg", "bg-blue-500", "border-none", "text-white", "text-[13px]", "font-semibold", "cursor-pointer", "hover:bg-blue-600", "transition-colors", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled", "title"], [1, "rounded-xl", "border", "border-gray-200", "bg-white", "p-4", "flex", "flex-col", "gap-3"], [1, "rounded-xl", "border", "border-blue-200", "bg-white", "p-6", "flex", "flex-col", "gap-4"], [1, "rounded-xl", "border", "border-gray-200", "bg-white", "overflow-hidden"], [1, "flex", "flex-col", "items-center", "gap-3", "py-12", "text-center", "text-gray-500"], [1, "border-gray-100", 3, "border-b"], [1, "flex", "justify-end", "pt-3", "border-t", "border-gray-200"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-[18px]", "py-2", "rounded-lg", "bg-blue-500", "text-white", "text-[13px]", "font-semibold", "border-none", "cursor-pointer", "hover:bg-blue-600", "transition-colors", 3, "click"], [1, "fixed", "inset-0", "z-[150]", "flex", "justify-end", 2, "background", "rgba(0,0,0,0.35)"], [3, "player", "teamId", "positions"], [3, "url", "title"], [1, "flex", "items-start", "justify-between", "gap-4", "rounded-lg", "bg-blue-50", "border", "border-blue-100", "px-4", "py-3"], [1, "flex", "items-start", "gap-3"], [1, "!size-[18px]", "!text-[18px]", "text-blue-400", "shrink-0", "mt-0.5"], [1, "m-0", "text-[13px]", "text-blue-800", "font-semibold"], [1, "font-bold"], [1, "m-0", "mt-0.5", "text-[12px]", "text-blue-600"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-lg", "bg-white", "border", "border-blue-200", "text-[12.5px]", "font-medium", "text-blue-600", "cursor-pointer", "hover:bg-blue-50", "transition-colors", "shrink-0", 3, "click"], [1, "!size-[14px]", "!text-[14px]"], [1, "relative", "border-2", "border-dashed", "rounded-xl", "transition-colors", "cursor-pointer", "flex", "flex-col", "items-center", "justify-center", "gap-2", "py-10", "px-6", "text-center", 3, "dragover", "dragleave", "drop", "click"], ["type", "file", "accept", ".csv,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.webp", "multiple", "", 1, "sr-only", 3, "change"], [1, "size-12", "rounded-full", "bg-white", "border", "border-gray-200", "flex", "items-center", "justify-center", "shadow-sm"], [1, "!size-6", "!text-[24px]", "text-gray-400"], [1, "m-0", "text-[14px]", "font-semibold", "text-gray-700"], [1, "m-0", "mt-1", "text-[12px]", "text-gray-400"], [1, "m-0", "text-[12px]", "text-blue-600", "font-medium"], [1, "flex", "flex-col", "gap-2"], [1, "flex", "items-center", "gap-3", "px-3", "py-2.5", "rounded-lg", "bg-gray-50", "border", "border-gray-100", "text-[12.5px]"], [1, "!size-4", "!text-[16px]", "shrink-0"], [1, "flex-1", "truncate", "text-gray-700"], [1, "text-gray-400", "shrink-0"], [1, "flex", "items-center", "justify-between"], [1, "text-[15px]", "font-bold", "text-gray-900", "m-0"], [1, "text-[12px]", "text-gray-500", "m-0", "mt-1"], ["type", "button", 1, "size-8", "flex", "items-center", "justify-center", "rounded-lg", "text-gray-400", "hover:bg-gray-100", "border-none", "bg-transparent", "cursor-pointer", "transition-colors", 3, "click"], [1, "!size-[18px]", "!text-[18px]"], [1, "rounded-lg", "bg-blue-50", "border", "border-blue-100", "p-3"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-[12px]", "font-medium", "text-blue-900"], [1, "h-2", "bg-blue-200", "rounded-full", "overflow-hidden"], [1, "h-full", "bg-blue-500", "transition-all", "duration-300"], [1, "flex", "flex-col", "gap-3", "max-h-96", "overflow-y-auto"], [1, "rounded-lg", "border", "border-gray-200", "overflow-hidden"], [1, "rounded-lg", "bg-amber-50", "border", "border-amber-200", "p-3"], [1, "flex", "justify-end", "gap-3", "pt-2", "border-t", "border-gray-100"], ["type", "button", 1, "px-4", "py-2", "rounded-lg", "bg-white", "border", "border-gray-300", "text-[13px]", "font-medium", "text-gray-600", "cursor-pointer", "hover:bg-gray-50", "transition-colors", 3, "click"], ["type", "button", 1, "px-4", "py-2", "rounded-lg", "bg-blue-500", "border-none", "text-white", "text-[13px]", "font-semibold", "cursor-pointer", "hover:bg-blue-600", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled", "title"], [1, "!size-4", "!text-[16px]", "inline", "mr-1.5"], [1, "bg-gray-50", "p-3", "flex", "items-center", "justify-between", "cursor-pointer", "hover:bg-gray-100", 3, "click"], [1, "flex", "items-center", "gap-2", "flex-1"], [1, "text-[13px]", "font-semibold", "text-gray-900"], [1, "text-[11px]", "text-gray-500"], [1, "inline-flex", "items-center", "gap-0.5", "px-1.5", "py-0.5", "rounded", "bg-green-100", "text-green-700", "text-[10px]", "font-medium"], [1, "!size-5", "!text-[20px]", "text-gray-600", "transition-transform"], [1, "p-4", "border-t", "border-gray-200", "bg-white"], [1, "!size-3", "!text-[12px]"], [1, "flex", "gap-3", "mb-4"], [1, "size-24", "rounded-lg", "flex", "items-center", "justify-center", "text-white", "font-bold", "text-lg", "shrink-0", "shadow-sm", "overflow-hidden"], ["alt", "Logo", 1, "w-full", "h-full", "object-cover", 3, "src"], [1, "flex-1"], [1, "text-[13px]", "font-semibold", "text-gray-900", "m-0"], [1, "text-[12px]", "text-gray-500", "m-0"], [1, "mt-2", "flex", "gap-2"], [1, "flex", "items-center", "gap-1"], [1, "size-3", "rounded"], [1, "text-[10px]", "text-gray-600"], [1, "border-t", "border-gray-100", "pt-3"], [1, "text-[12px]", "font-semibold", "text-gray-900", "m-0", "mb-2"], [1, "w-full", "text-[11px]"], [1, "border-b", "border-gray-100", "last:border-b-0"], [1, "mt-3", "rounded", "bg-red-50", "border", "border-red-200", "p-2"], [1, "px-2", "py-1.5", "font-medium"], [1, "px-2", "py-1.5"], [1, "px-2", "py-1.5", "text-right"], [1, "inline-flex", "items-center", "gap-1", "px-1.5", "py-0.5", "rounded", "bg-green-50", "text-green-700", "text-[9px]"], [1, "text-gray-400"], [1, "text-[11px]", "font-semibold", "text-red-700", "m-0", "mb-1"], [1, "!size-3", "!text-[12px]", "inline"], [1, "list-none", "m-0", "p-0"], [1, "text-[10px]", "text-red-600", "m-0"], [1, "text-[10px]", "text-red-500", "m-0", "font-medium"], [1, "text-[12px]", "font-semibold", "text-amber-700", "m-0", "mb-2"], [1, "!size-4", "!text-[16px]", "inline", "mr-1"], [1, "list-none", "m-0", "p-0", "max-h-24", "overflow-y-auto"], [1, "text-[11px]", "text-amber-600", "m-0", "mb-1", "last:mb-0"], [1, "!size-10", "!text-[40px]", "text-gray-300"], [1, "m-0", "text-[14px]"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-2", "rounded-lg", "bg-blue-500", "text-white", "text-[13px]", "font-semibold", "border-none", "cursor-pointer", "hover:bg-blue-600", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "border-gray-100"], [1, "flex", "items-center", "gap-3", "px-4", "py-3.5", "cursor-pointer", "select-none", "hover:bg-gray-50", "transition-colors", 3, "click"], [1, "size-10", "rounded-lg", "shrink-0", "flex", "items-center", "justify-center", "text-white", "text-[13px]", "font-bold", "shadow-sm"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-2"], [1, "text-[14px]", "font-semibold", "text-gray-900", "truncate"], [1, "text-[10px]", "font-bold", "px-1.5", "py-0.5", "rounded-full", "bg-gray-100", "text-gray-500"], [1, "m-0", "text-[12px]", "text-gray-400", "truncate"], [1, "flex", "items-center", "gap-2", "shrink-0"], [1, "inline-flex", "items-center", "gap-1", "text-[11px]", "font-semibold", "px-2.5", "py-1", "rounded-full", "border"], [1, "size-1.5", "rounded-full"], ["type", "button", "title", "Ver documento", 1, "size-8", "flex", "items-center", "justify-center", "rounded-lg", "border", "border-blue-100", "bg-blue-50", "text-blue-400", "cursor-pointer", "hover:bg-blue-100", "hover:text-blue-600", "transition-colors"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "px-3", "py-1.5", "rounded-lg", "text-[12.5px]", "font-medium", "text-gray-600", "bg-transparent", "border", "border-gray-200", "cursor-pointer", "hover:bg-gray-100", "transition-colors", 3, "click"], ["type", "button", "title", "Retirar equipo", 1, "size-8", "flex", "items-center", "justify-center", "rounded-lg", "border", "border-red-100", "bg-red-50", "text-red-400", "cursor-pointer", "hover:bg-red-100", "hover:text-red-600", "transition-colors", 3, "click"], [1, "!size-4", "!text-[16px]", "text-gray-400", "transition-transform", "duration-200", "ml-1"], [1, "border-t", "border-gray-100", "bg-gray-50"], ["type", "button", "title", "Ver documento", 1, "size-8", "flex", "items-center", "justify-center", "rounded-lg", "border", "border-blue-100", "bg-blue-50", "text-blue-400", "cursor-pointer", "hover:bg-blue-100", "hover:text-blue-600", "transition-colors", 3, "click"], [1, "!size-[15px]", "!text-[15px]"], [1, "w-full", "text-left", "border-collapse"], [1, "flex", "flex-col", "items-center", "gap-2", "py-6", "text-center", "text-gray-400"], [1, "px-4", "py-3", "border-t", "border-gray-100", "flex", "items-center", "gap-3"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-lg", "text-[12.5px]", "font-medium", "border", "transition-colors", 3, "click", "disabled"], [1, "text-[11.5px]", "text-amber-600", "font-medium"], [1, "text-[11.5px]", "text-gray-400"], [1, "border-b", "border-gray-200"], [1, "px-4", "py-2", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-gray-400", "w-12"], [1, "px-4", "py-2", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-gray-400"], [1, "px-4", "py-2", "w-8"], [1, "border-b", "border-gray-100", "hover:bg-white", "transition-colors", "group"], [1, "px-4", "py-2.5"], [1, "inline-flex", "size-7", "items-center", "justify-center", "rounded-full", "text-[12px]", "font-bold", "text-white", "shrink-0"], [1, "flex", "items-center", "gap-2.5"], [1, "size-7", "rounded-full", "overflow-hidden", "shrink-0", "flex", "items-center", "justify-center", "text-[11px]", "font-bold", "text-white"], ["alt", "", 1, "w-full", "h-full", "object-cover", 3, "src"], [3, "color"], [1, "text-[13.5px]", "font-semibold", "text-gray-900"], [1, "text-[11px]", "text-gray-400"], [1, "px-4", "py-2.5", "text-[13px]", "text-gray-600"], [1, "text-[11px]", "font-semibold", "px-2", "py-0.5", "rounded-full"], ["type", "button", "title", "Editar jugador", 1, "size-6", "flex", "items-center", "justify-center", "rounded", "text-gray-400", "bg-transparent", "border-none", "cursor-pointer", "hover:bg-gray-200", "hover:text-gray-600", "transition-colors", "opacity-0", "group-hover:opacity-100", 3, "click"], [1, "!size-3.5", "!text-[14px]"], [1, "!size-8", "!text-[32px]", "text-gray-300"], [1, "m-0", "text-[13px]"], [1, "fixed", "inset-0", "z-[150]", "flex", "justify-end", 2, "background", "rgba(0,0,0,0.35)", 3, "click"], [1, "h-full", "w-full", "max-w-[440px]", "bg-white", "flex", "flex-col", "shadow-2xl", 3, "click"], [1, "flex", "items-center", "justify-between", "px-6", "py-4", "border-b", "border-gray-100"], [1, "text-[16px]", "font-bold", "text-gray-900", "m-0"], [1, "flex-1", "overflow-y-auto", "px-6", "py-5", "flex", "flex-col", "gap-4"], [1, "flex", "items-center", "gap-4"], [1, "size-16", "rounded-xl", "flex", "items-center", "justify-center", "text-white", "font-bold", "text-xl", "shrink-0", "cursor-pointer", "relative", "overflow-hidden", "group", 3, "click"], [1, "w-full", "h-full", "object-cover", 3, "src"], [1, "absolute", "inset-0", "bg-black/50", "flex", "items-center", "justify-center", "opacity-0", "group-hover:opacity-100", "transition-opacity"], [1, "!size-5", "!text-[20px]", "text-white"], ["type", "file", "accept", "image/*", 1, "sr-only", 3, "change"], [1, "m-0", "text-[13px]", "font-medium", "text-gray-700"], [1, "m-0", "mt-0.5", "text-[11.5px]", "text-gray-400"], [1, "grid", "grid-cols-2", "gap-3"], [1, "flex", "flex-col", "gap-1.5"], [1, "text-[12px]", "font-semibold", "text-gray-600", "uppercase", "tracking-wide"], [1, "text-red-400"], ["placeholder", "Ej: Osos Polares", 1, "team-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Ej: OSP", "maxlength", "5", 1, "team-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Nombre del coach", 1, "team-input", 3, "ngModelChange", "ngModel"], ["placeholder", "+57 300...", 1, "team-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Ej: Bogot\xE1", 1, "team-input", 3, "ngModelChange", "ngModel"], [1, "ml-1", "normal-case", "text-[10px]", "font-normal", "text-gray-300"], ["type", "number", "min", "1800", "max", "2100", "placeholder", "Ej: 1995", 1, "team-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Ej: Estadio El Camp\xEDn", 1, "team-input", 3, "ngModelChange", "ngModel"], [1, "text-[12px]", "font-semibold", "text-gray-600", "uppercase", "tracking-wide", "block", "mb-2"], [1, "flex", "flex-col", "items-center", "gap-1.5"], ["type", "color", 1, "w-12", "h-10", "rounded-lg", "border", "border-gray-200", "cursor-pointer", "p-0.5", "bg-white", 3, "ngModelChange", "ngModel"], [1, "text-[10px]", "text-gray-400"], [1, "flex-1", "h-10", "rounded-lg", "overflow-hidden", "flex"], ["label", "PDF", "hint", "PDF \xB7 M\xE1x 50 MB", 3, "fileChange", "currentUrl"], [1, "flex", "items-center", "gap-2", "rounded-lg", "bg-red-50", "border", "border-red-200", "px-3", "py-2.5", "text-[12.5px]", "text-red-600"], [1, "flex", "items-center", "justify-end", "gap-2.5", "px-6", "py-4", "border-t", "border-gray-100", "bg-gray-50"], ["type", "button", 1, "btn-ghost-sm", 3, "click"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-2", "rounded-lg", "bg-blue-500", "text-white", "text-[13px]", "font-semibold", "border-none", "cursor-pointer", "hover:bg-blue-600", "transition-colors", 3, "click"], [3, "saved", "deleted", "dismiss", "player", "teamId", "positions"], [3, "close", "url", "title"]], template: function ChampionshipTeamsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "mat-icon", 5);
      \u0275\u0275text(4, "group");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span")(6, "strong", 6);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275element(10, "div", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 9)(12, "mat-icon", 10);
      \u0275\u0275text(13, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "input", 11);
      \u0275\u0275listener("ngModelChange", function ChampionshipTeamsComponent_Template_input_ngModelChange_14_listener($event) {
        return ctx.searchQuery.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 12)(16, "button", 13);
      \u0275\u0275listener("click", function ChampionshipTeamsComponent_Template_button_click_16_listener() {
        return ctx.toggleImport();
      });
      \u0275\u0275elementStart(17, "mat-icon", 14);
      \u0275\u0275text(18, "upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " Importar ");
      \u0275\u0275elementStart(20, "mat-icon", 15);
      \u0275\u0275text(21, " expand_more ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "button", 16);
      \u0275\u0275listener("click", function ChampionshipTeamsComponent_Template_button_click_22_listener() {
        return ctx.openCreateTeam();
      });
      \u0275\u0275elementStart(23, "mat-icon", 14);
      \u0275\u0275text(24, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(25, " Inscribir ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(26, ChampionshipTeamsComponent_Conditional_26_Template, 33, 14, "div", 17);
      \u0275\u0275conditionalCreate(27, ChampionshipTeamsComponent_Conditional_27_Template, 29, 11, "div", 18);
      \u0275\u0275elementStart(28, "div", 19);
      \u0275\u0275conditionalCreate(29, ChampionshipTeamsComponent_Conditional_29_Template, 5, 1, "div", 20);
      \u0275\u0275repeaterCreate(30, ChampionshipTeamsComponent_For_31_Template, 26, 31, "div", 21, _forTrack05);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div", 22)(33, "button", 23);
      \u0275\u0275listener("click", function ChampionshipTeamsComponent_Template_button_click_33_listener() {
        return ctx.save.emit(ctx.teams());
      });
      \u0275\u0275elementStart(34, "mat-icon", 14);
      \u0275\u0275text(35, "save");
      \u0275\u0275elementEnd();
      \u0275\u0275text(36, " Guardar todos los cambios ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(37, ChampionshipTeamsComponent_Conditional_37_Template, 87, 20, "div", 24);
      \u0275\u0275conditionalCreate(38, ChampionshipTeamsComponent_Conditional_38_Template, 1, 3, "app-player-modal", 25);
      \u0275\u0275conditionalCreate(39, ChampionshipTeamsComponent_Conditional_39_Template, 1, 2, "app-pdf-viewer", 26);
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.teams().length);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("/", ctx.maxTeams());
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.progressPct(), "%")("background", ctx.progressColor());
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.searchQuery());
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("background", ctx.showImport() ? "#3b82f6" : "#fff")("color", ctx.showImport() ? "#fff" : "#374151")("border-color", ctx.showImport() ? "#3b82f6" : "#d1d5db");
      \u0275\u0275advance(4);
      \u0275\u0275styleProp("transform", ctx.showImport() ? "rotate(180deg)" : "rotate(0)");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isFull())("title", ctx.isFull() ? "Se alcanz\xF3 el l\xEDmite de equipos" : "Inscribir nuevo equipo");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.showImport() ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.importState() === "preview" ? 27 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.filteredTeams().length === 0 ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.filteredTeams());
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.teamModal() ? 37 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.playerModal() ? 38 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.pdfViewerData() ? 39 : -1);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, MatIconModule, MatIcon, PlayerModalComponent, FileUploadComponent, PdfViewerComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n}\n.team-input[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 14px;\n  color: #111827;\n  background: #fff;\n  font-family: inherit;\n  outline: none;\n  transition: border-color 0.15s;\n  width: 100%;\n  box-sizing: border-box;\n}\n.team-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.btn-ghost-sm[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 8px;\n  background: #fff;\n  color: #374151;\n  font-size: 13px;\n  font-weight: 500;\n  border: 1px solid #d1d5db;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.btn-ghost-sm[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n/*# sourceMappingURL=championship-teams.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChampionshipTeamsComponent, [{
    type: Component,
    args: [{ selector: "app-championship-teams", changeDetection: ChangeDetectionStrategy.OnPush, standalone: true, imports: [FormsModule, MatIconModule, PlayerModalComponent, FileUploadComponent, PdfViewerComponent], template: `
<div class="max-w-[960px] mx-auto px-7 pt-6 pb-8 flex flex-col gap-4">

  <!-- \u2550\u2550 TOOLBAR \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div class="flex items-center gap-3 flex-wrap">

    <!-- Counter + progress -->
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white
                border border-gray-200 text-[13px] font-medium text-gray-700 shrink-0">
      <mat-icon class="!size-4 !text-[16px] text-gray-400">group</mat-icon>
      <span><strong class="text-gray-900">{{ teams().length }}</strong>/{{ maxTeams() }}</span>
      <div class="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-300"
          [style.width.%]="progressPct()"
          [style.background]="progressColor()"
        ></div>
      </div>
    </div>

    <!-- Search -->
    <div class="relative flex-1 min-w-[180px]">
      <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 !size-4 !text-[16px] text-gray-400
                       pointer-events-none">search</mat-icon>
      <input
        class="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-white text-[13px]
               text-gray-900 outline-none focus:border-blue-400 focus:ring-2
               focus:ring-blue-400/10 transition-all placeholder:text-gray-400"
        [ngModel]="searchQuery()" (ngModelChange)="searchQuery.set($event)"
        placeholder="Buscar equipo..."
      />
    </div>

    <div class="flex items-center gap-2 ml-auto">
      <!-- Importar -->
      <button
        class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px]
               font-medium cursor-pointer transition-colors border"
        [style.background]="showImport() ? '#3b82f6' : '#fff'"
        [style.color]="showImport() ? '#fff' : '#374151'"
        [style.border-color]="showImport() ? '#3b82f6' : '#d1d5db'"
        (click)="toggleImport()"
        type="button"
      >
        <mat-icon class="!size-4 !text-[16px]">upload</mat-icon>
        Importar
        <mat-icon class="!size-3.5 !text-[14px] transition-transform duration-200"
                  [style.transform]="showImport() ? 'rotate(180deg)' : 'rotate(0)'">
          expand_more
        </mat-icon>
      </button>

      <!-- Inscribir -->
      <button
        class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-500 border-none
               text-white text-[13px] font-semibold cursor-pointer hover:bg-blue-600
               transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        [disabled]="isFull()"
        (click)="openCreateTeam()"
        type="button"
        [title]="isFull() ? 'Se alcanz\xF3 el l\xEDmite de equipos' : 'Inscribir nuevo equipo'"
      >
        <mat-icon class="!size-4 !text-[16px]">add</mat-icon>
        Inscribir
      </button>
    </div>
  </div>

  <!-- \u2550\u2550 IMPORT PANEL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  @if (showImport()) {
    <div class="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-3">

      <!-- Info banner -->
      <div class="flex items-start justify-between gap-4 rounded-lg bg-blue-50
                  border border-blue-100 px-4 py-3">
        <div class="flex items-start gap-3">
          <mat-icon class="!size-[18px] !text-[18px] text-blue-400 shrink-0 mt-0.5">
            description
          </mat-icon>
          <div>
            <p class="m-0 text-[13px] text-blue-800 font-semibold">
              Importa equipos masivamente desde un archivo
              <span class="font-bold">.csv</span> o
              <span class="font-bold">.xlsx</span>.
            </p>
            <p class="m-0 mt-0.5 text-[12px] text-blue-600">
              Columnas reconocidas: nombre, nombre_corto, entrenador, tel\xE9fono, ciudad,
              color_primario, color_secundario
            </p>
          </div>
        </div>
        <!-- TODO-DOWNLOAD: reemplazar el m\xE9todo downloadTemplate() con llamada al backend
             cuando el servicio de descarga est\xE9 disponible.
             this.teamService.downloadTemplate().subscribe(blob => saveAs(blob, 'plantilla.csv')) -->
        <button
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border
                 border-blue-200 text-[12.5px] font-medium text-blue-600 cursor-pointer
                 hover:bg-blue-50 transition-colors shrink-0"
          (click)="downloadTemplate()"
          type="button"
        >
          <mat-icon class="!size-[14px] !text-[14px]">download</mat-icon>
          Plantilla CSV
        </button>
      </div>

      <!-- Drop zone -->
      <div
        class="relative border-2 border-dashed rounded-xl transition-colors cursor-pointer
               flex flex-col items-center justify-center gap-2 py-10 px-6 text-center"
        [class.border-blue-400]="isDragOver()"
        [class.bg-blue-50]="isDragOver()"
        [class.border-gray-300]="!isDragOver()"
        [class.bg-gray-50]="!isDragOver()"
        [class.opacity-50]="importState() === 'uploading'"
        [class.pointer-events-none]="importState() === 'uploading'"
        (dragover)="onDragOver($event)"
        (dragleave)="isDragOver.set(false)"
        (drop)="onDrop($event)"
        (click)="importFileInput.click()"
      >
        <input
          #importFileInput
          type="file"
          accept=".csv,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.webp"
          multiple
          class="sr-only"
          (change)="onFilesSelected($event)"
        />
        <div class="size-12 rounded-full bg-white border border-gray-200 flex items-center
                    justify-center shadow-sm">
          <mat-icon class="!size-6 !text-[24px] text-gray-400">upload_file</mat-icon>
        </div>
        <div>
          <p class="m-0 text-[14px] font-semibold text-gray-700">Arrastra Excel + im\xE1genes aqu\xED</p>
          <p class="m-0 mt-1 text-[12px] text-gray-400">
            Excel + logo (opcional) + fotos de jugadores (opcional)
          </p>
        </div>
        @if (importState() === 'uploading') {
          <p class="m-0 text-[12px] text-blue-600 font-medium">Procesando...</p>
        }
      </div>

      <!-- Upload progress list -->
      @if (importQueue().length) {
        <div class="flex flex-col gap-2">
          @for (item of importQueue(); track item.fileName) {
            <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50
                        border border-gray-100 text-[12.5px]">
              <mat-icon class="!size-4 !text-[16px] shrink-0"
                [class.text-blue-400]="item.status === 'uploading'"
                [class.text-green-500]="item.status === 'done'"
                [class.text-red-400]="item.status === 'error'"
                [class.text-amber-400]="item.status === 'conflict'"
              >
                {{ item.status === 'done' ? 'check_circle' :
                   item.status === 'error' ? 'error' :
                   item.status === 'conflict' ? 'warning' : 'hourglass_top' }}
              </mat-icon>
              <span class="flex-1 truncate text-gray-700">{{ item.fileName }}</span>
              <span class="text-gray-400 shrink-0">
                {{ item.status === 'uploading' ? 'Procesando...' :
                   item.status === 'done'      ? item.teamName + ' importado' :
                   item.status === 'conflict'  ? 'Conflicto' : item.error }}
              </span>
            </div>
          }
        </div>
      }
    </div>
  }

  <!-- \u2550\u2550 IMPORT PREVIEW PANEL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  @if (importState() === 'preview') {
    <div class="rounded-xl border border-blue-200 bg-white p-6 flex flex-col gap-4">
      
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-[15px] font-bold text-gray-900 m-0">Preview: {{ importedTeams().length }} Equipo(s)</h3>
          <p class="text-[12px] text-gray-500 m-0 mt-1">{{ importProgressText() }}</p>
        </div>
        <button
          class="size-8 flex items-center justify-center rounded-lg text-gray-400
                 hover:bg-gray-100 border-none bg-transparent cursor-pointer transition-colors"
          (click)="cancelImport()"
          type="button"
        >
          <mat-icon class="!size-[18px] !text-[18px]">close</mat-icon>
        </button>
      </div>

      <!-- Progreso -->
      <div class="rounded-lg bg-blue-50 border border-blue-100 p-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] font-medium text-blue-900">
            {{ importProgress().imagesProcessed }}/{{ importProgress().totalImages }} im\xE1genes
          </span>
          <span class="text-[12px] font-medium text-blue-900">
            {{ importedTeams().length }} Excel(s) procesado(s)
          </span>
        </div>
        <div class="h-2 bg-blue-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-blue-500 transition-all duration-300"
            [style.width.%]="importProgress().totalImages > 0 
              ? (importProgress().imagesProcessed / importProgress().totalImages) * 100 
              : 0"
          ></div>
        </div>
      </div>

      <!-- Teams preview - Acordeones -->
      <div class="flex flex-col gap-3 max-h-96 overflow-y-auto">
        @for (team of importedTeams(); track team.name; let idx = $index) {
          <div class="rounded-lg border border-gray-200 overflow-hidden">
            <!-- Header del acorde\xF3n -->
            <div class="bg-gray-50 p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                 (click)="toggleTeamExpand(idx)">
              <div class="flex items-center gap-2 flex-1">
                <span class="text-[13px] font-semibold text-gray-900">{{ team.name }} ({{ team.shortname }})</span>
                <span class="text-[11px] text-gray-500">{{ team.players.length }} jugadores</span>
                @if (team.logoFile) {
                  <span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-medium">
                    <mat-icon class="!size-3 !text-[12px]">check</mat-icon> Logo
                  </span>
                }
                @if (hasPlayersWithPhoto(team.players)) {
                  <span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-medium">
                    <mat-icon class="!size-3 !text-[12px]">check</mat-icon> 
                    {{ countPlayersWithPhoto(team.players) }} fotos
                  </span>
                }
              </div>
              <mat-icon class="!size-5 !text-[20px] text-gray-600 transition-transform"
                        [style.transform]="expandedTeams().has(idx) ? 'rotate(180deg)' : 'rotate(0)'">
                expand_more
              </mat-icon>
            </div>

            <!-- Contenido del acorde\xF3n -->
            @if (expandedTeams().has(idx)) {
              <div class="p-4 border-t border-gray-200 bg-white">
                <!-- Logo + Datos -->
                <div class="flex gap-3 mb-4">
                  <div class="size-24 rounded-lg flex items-center justify-center text-white font-bold
                              text-lg shrink-0 shadow-sm overflow-hidden"
                       [style.background]="team.primaryColor">
                    @if (team.logoFile) {
                      <img [src]="getTeamLogoUrl(team.logoFile)" class="w-full h-full object-cover" alt="Logo" />
                    } @else {
                      {{ (team.shortname || team.name).slice(0,2).toUpperCase() }}
                    }
                  </div>
                  <div class="flex-1">
                    <p class="text-[13px] font-semibold text-gray-900 m-0">{{ team.coachName }}</p>
                    @if (team.coachPhone) {
                      <p class="text-[12px] text-gray-500 m-0">{{ team.coachPhone }}</p>
                    }
                    @if (team.location) {
                      <p class="text-[12px] text-gray-500 m-0">{{ team.location }}</p>
                    }
                    <div class="mt-2 flex gap-2">
                      <div class="flex items-center gap-1">
                        <div class="size-3 rounded" [style.background]="team.primaryColor"></div>
                        <span class="text-[10px] text-gray-600">{{ team.primaryColor }}</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <div class="size-3 rounded" [style.background]="team.secondaryColor"></div>
                        <span class="text-[10px] text-gray-600">{{ team.secondaryColor }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Tabla de jugadores + fotos -->
                <div class="border-t border-gray-100 pt-3">
                  <p class="text-[12px] font-semibold text-gray-900 m-0 mb-2">Jugadores ({{ team.players.length }})</p>
                  <table class="w-full text-[11px]">
                    <tbody>
                      @for (player of team.players; track player.number) {
                        <tr class="border-b border-gray-100 last:border-b-0">
                          <td class="px-2 py-1.5 font-medium">{{ player.number }}</td>
                          <td class="px-2 py-1.5">{{ player.firstName }} {{ player.lastName }}</td>
                          <td class="px-2 py-1.5">{{ player.position }}</td>
                          <td class="px-2 py-1.5 text-right">
                            @if (player.photoFile) {
                              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[9px]">
                                <mat-icon class="!size-3 !text-[12px]">check</mat-icon> Foto \u2713
                              </span>
                            } @else {
                              <span class="text-gray-400">\u2014</span>
                            }
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>

                <!-- Errores del equipo -->
                @if (team.errors.length > 0) {
                  <div class="mt-3 rounded bg-red-50 border border-red-200 p-2">
                    <p class="text-[11px] font-semibold text-red-700 m-0 mb-1">
                      <mat-icon class="!size-3 !text-[12px] inline">error</mat-icon>
                      {{ team.errors.length }} error(es)
                    </p>
                    <ul class="list-none m-0 p-0">
                      @for (err of team.errors.slice(0, 3); track $index) {
                        <li class="text-[10px] text-red-600 m-0">\u2022 {{ err.message }}</li>
                      }
                      @if (team.errors.length > 3) {
                        <li class="text-[10px] text-red-500 m-0 font-medium">+{{ team.errors.length - 3 }} m\xE1s...</li>
                      }
                    </ul>
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>

      <!-- Errores de im\xE1genes -->
      @if (importErrors().length > 0) {
        <div class="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p class="text-[12px] font-semibold text-amber-700 m-0 mb-2">
            <mat-icon class="!size-4 !text-[16px] inline mr-1">warning</mat-icon>
            {{ importErrors().length }} Imagen(es) sin match
          </p>
          <ul class="list-none m-0 p-0 max-h-24 overflow-y-auto">
            @for (error of importErrors(); track error.file) {
              <li class="text-[11px] text-amber-600 m-0 mb-1 last:mb-0">
                <strong>{{ error.file }}</strong>: {{ error.message }}
              </li>
            }
          </ul>
        </div>
      }

      <!-- Botones de acci\xF3n -->
      <div class="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <button
          class="px-4 py-2 rounded-lg bg-white border border-gray-300 text-[13px]
                 font-medium text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
          (click)="cancelImport()"
          type="button"
        >
          Cancelar
        </button>
        <button
          class="px-4 py-2 rounded-lg bg-blue-500 border-none text-white text-[13px]
                 font-semibold cursor-pointer hover:bg-blue-600 transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
          [disabled]="!canConfirmImport()"
          (click)="confirmImportedTeam()"
          type="button"
          [title]="!canConfirmImport() ? 'Hay equipos con errores' : 'Importar todos los equipos'"
        >
          <mat-icon class="!size-4 !text-[16px] inline mr-1.5">check_circle</mat-icon>
          Importar {{ importedTeams().length }} Equipo(s)
        </button>
      </div>
    </div>
  }

  <!-- \u2550\u2550 TEAMS LIST \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div class="rounded-xl border border-gray-200 bg-white overflow-hidden">

    @if (filteredTeams().length === 0) {
      <div class="flex flex-col items-center gap-3 py-12 text-center text-gray-500">
        <mat-icon class="!size-10 !text-[40px] text-gray-300">group_off</mat-icon>
        @if (searchQuery()) {
          <p class="m-0 text-[14px]">Sin resultados para "<strong>{{ searchQuery() }}</strong>"</p>
        } @else {
          <p class="m-0 text-[14px]">No hay equipos inscritos a\xFAn.</p>
          <button
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500
                   text-white text-[13px] font-semibold border-none cursor-pointer
                   hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
            [disabled]="isFull()"
            (click)="openCreateTeam()"
            type="button"
          >
            <mat-icon class="!size-4 !text-[16px]">add</mat-icon> Inscribir primer equipo
          </button>
        }
      </div>
    }

    @for (team of filteredTeams(); track team.id; let last = $last) {
      <!-- Team row -->
      <div [class.border-b]="!last" class="border-gray-100">

        <!-- \u2500\u2500 Team header (clickeable \u2192 expand) \u2500\u2500 -->
        <div
          class="flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none
                 hover:bg-gray-50 transition-colors"
          (click)="toggleTeam(team.id)"
        >
          <!-- Logo placeholder -->
          <div
            class="size-10 rounded-lg shrink-0 flex items-center justify-center
                   text-white text-[13px] font-bold shadow-sm"
            [style.background]="team.primaryColor"
          >
            {{ team.shortname.slice(0,2) }}
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-[14px] font-semibold text-gray-900 truncate">{{ team.name }}</span>
              @if (!team.isActive) {
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full
                             bg-gray-100 text-gray-500">INACTIVO</span>
              }
            </div>
            <p class="m-0 text-[12px] text-gray-400 truncate">
              {{ team.players.length }} jugadores \xB7 {{ team.coachName || '\u2014' }} \xB7 {{ team.location || '\u2014' }}
            </p>
          </div>

          <!-- Status pill + actions -->
          <div class="flex items-center gap-2 shrink-0">
            <span
              class="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1
                     rounded-full border"
              [class.bg-green-50]="team.isActive"
              [class.text-green-700]="team.isActive"
              [class.border-green-200]="team.isActive"
              [class.bg-gray-50]="!team.isActive"
              [class.text-gray-500]="!team.isActive"
              [class.border-gray-200]="!team.isActive"
            >
              <span
                class="size-1.5 rounded-full"
                [class.bg-green-500]="team.isActive"
                [class.bg-gray-400]="!team.isActive"
              ></span>
              {{ team.isActive ? 'Activo' : 'Inactivo' }}
            </span>

            @if (team.documentUrl) {
              <button
                class="size-8 flex items-center justify-center rounded-lg border border-blue-100
                       bg-blue-50 text-blue-400 cursor-pointer hover:bg-blue-100 hover:text-blue-600
                       transition-colors"
                (click)="viewDocument(team, $event)"
                type="button"
                title="Ver documento"
                [attr.aria-label]="'Ver documento de ' + team.name"
              >
                <mat-icon class="!size-[15px] !text-[15px]">description</mat-icon>
              </button>
            }

            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12.5px]
                     font-medium text-gray-600 bg-transparent border border-gray-200
                     cursor-pointer hover:bg-gray-100 transition-colors"
              (click)="openEditTeam(team, $event)"
              type="button"
            >
              <mat-icon class="!size-[14px] !text-[14px]">edit</mat-icon>
              Editar
            </button>

            <button
              class="size-8 flex items-center justify-center rounded-lg border border-red-100
                     bg-red-50 text-red-400 cursor-pointer hover:bg-red-100 hover:text-red-600
                     transition-colors"
              (click)="removeTeam(team.id, $event)"
              type="button"
              title="Retirar equipo"
            >
              <mat-icon class="!size-[14px] !text-[14px]">close</mat-icon>
            </button>

            <!-- Chevron -->
            <mat-icon
              class="!size-4 !text-[16px] text-gray-400 transition-transform duration-200 ml-1"
              [style.transform]="expandedTeams().has(team.id) || playerMatchedTeamIds().has(team.id) ? 'rotate(180deg)' : 'rotate(0)'"
            >expand_more</mat-icon>
          </div>
        </div>

        <!-- \u2500\u2500 Players expand panel \u2500\u2500 -->
        @if (expandedTeams().has(team.id) || playerMatchedTeamIds().has(team.id)) {
          <div class="border-t border-gray-100 bg-gray-50">

            <!-- Players table -->
            @if (team.players.length > 0) {
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-400 w-12">#</th>
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-400">Jugador</th>
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-400">Posici\xF3n</th>
                    <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-400">Estado</th>
                    <th class="px-4 py-2 w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  @for (player of team.players; track player.id) {
                    <tr class="border-b border-gray-100 hover:bg-white transition-colors group">
                      <td class="px-4 py-2.5">
                        <span class="inline-flex size-7 items-center justify-center rounded-full
                                     text-[12px] font-bold text-white shrink-0"
                              [style.background]="team.primaryColor">
                          {{ player.number }}
                        </span>
                      </td>
                      <td class="px-4 py-2.5">
                        <div class="flex items-center gap-2.5">
                          <div
                            class="size-7 rounded-full overflow-hidden shrink-0 flex items-center
                                   justify-center text-[11px] font-bold text-white"
                            [style.background]="player.photoUrl ? 'transparent' : team.secondaryColor"
                          >
                            @if (player.photoUrl) {
                              <img [src]="player.photoUrl" class="w-full h-full object-cover" alt="" />
                            } @else {
                              <span [style.color]="team.primaryColor">
                                {{ player.firstName.charAt(0) }}{{ player.lastName.charAt(0) }}
                              </span>
                            }
                          </div>
                          <span class="text-[13.5px] font-semibold text-gray-900">
                            {{ player.firstName }} {{ player.lastName }}
                          </span>
                          @if (player.nickName) {
                            <span class="text-[11px] text-gray-400">"{{ player.nickName }}"</span>
                          }
                        </div>
                      </td>
                      <td class="px-4 py-2.5 text-[13px] text-gray-600">
                        {{ positionLabel(player.positionId) }}
                      </td>
                      <td class="px-4 py-2.5">
                        <span
                          class="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          [class]="playerStatusClasses(player.status)"
                        >{{ playerStatusLabel(player.status) }}</span>
                      </td>
                      <td class="px-4 py-2.5">
                        <button
                          class="size-6 flex items-center justify-center rounded text-gray-400
                                 bg-transparent border-none cursor-pointer hover:bg-gray-200
                                 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                          (click)="openEditPlayer(team, player)"
                          type="button"
                          title="Editar jugador"
                        >
                          <mat-icon class="!size-3.5 !text-[14px]">edit</mat-icon>
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            } @else {
              <div class="flex flex-col items-center gap-2 py-6 text-center text-gray-400">
                <mat-icon class="!size-8 !text-[32px] text-gray-300">person_off</mat-icon>
                <p class="m-0 text-[13px]">Sin jugadores inscritos</p>
              </div>
            }

            <!-- Add player button -->
            <div class="px-4 py-3 border-t border-gray-100 flex items-center gap-3">
              <button
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px]
                       font-medium border transition-colors"
                [class.text-blue-600]="team.players.length < maxPlayersPerTeam()"
                [class.bg-blue-50]="team.players.length < maxPlayersPerTeam()"
                [class.border-blue-100]="team.players.length < maxPlayersPerTeam()"
                [class.hover:bg-blue-100]="team.players.length < maxPlayersPerTeam()"
                [class.cursor-pointer]="team.players.length < maxPlayersPerTeam()"
                [class.text-gray-400]="team.players.length >= maxPlayersPerTeam()"
                [class.bg-gray-50]="team.players.length >= maxPlayersPerTeam()"
                [class.border-gray-200]="team.players.length >= maxPlayersPerTeam()"
                [class.cursor-not-allowed]="team.players.length >= maxPlayersPerTeam()"
                [class.opacity-60]="team.players.length >= maxPlayersPerTeam()"
                (click)="openCreatePlayer(team)"
                [disabled]="team.players.length >= maxPlayersPerTeam()"
                type="button"
                [attr.aria-label]="team.players.length >= maxPlayersPerTeam()
                  ? 'L\xEDmite de jugadores alcanzado'
                  : 'Agregar jugador al equipo ' + team.name"
              >
                <mat-icon class="!size-[14px] !text-[14px]">person_add</mat-icon>
                Agregar jugador
              </button>
              @if (team.players.length >= maxPlayersPerTeam()) {
                <span class="text-[11.5px] text-amber-600 font-medium">
                  L\xEDmite de {{ maxPlayersPerTeam() }} jugadores alcanzado
                </span>
              } @else {
                <span class="text-[11.5px] text-gray-400">
                  {{ team.players.length }}/{{ maxPlayersPerTeam() }} jugadores
                </span>
              }
            </div>
          </div>
        }
      </div>
    }
  </div>

  <!-- \u2550\u2550 FOOTER \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div class="flex justify-end pt-3 border-t border-gray-200">
    <button
      class="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg bg-blue-500
             text-white text-[13px] font-semibold border-none cursor-pointer
             hover:bg-blue-600 transition-colors"
      (click)="save.emit(teams())"
      type="button"
    >
      <mat-icon class="!size-4 !text-[16px]">save</mat-icon>
      Guardar todos los cambios
    </button>
  </div>

</div>

<!-- \u2550\u2550 TEAM MODAL (drawer lateral) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
@if (teamModal()) {
  <div
    class="fixed inset-0 z-[150] flex justify-end"
    style="background: rgba(0,0,0,0.35);"
    (click)="closeTeamModal()"
  >
    <div
      class="h-full w-full max-w-[440px] bg-white flex flex-col shadow-2xl"
      (click)="$event.stopPropagation()"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 class="text-[16px] font-bold text-gray-900 m-0">
          {{ teamModal()!.id ? 'Editar Equipo' : 'Inscribir Equipo' }}
        </h2>
        <button
          class="size-8 flex items-center justify-center rounded-lg text-gray-400
                 hover:bg-gray-100 border-none bg-transparent cursor-pointer transition-colors"
          (click)="closeTeamModal()" type="button"
        >
          <mat-icon class="!size-[18px] !text-[18px]">close</mat-icon>
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">

        <!-- Logo preview + upload -->
        <div class="flex items-center gap-4">
          <div
            class="size-16 rounded-xl flex items-center justify-center text-white font-bold
                   text-xl shrink-0 cursor-pointer relative overflow-hidden group"
            [style.background]="teamModal()!.primaryColor"
            (click)="logoFileInput.click()"
          >
            @if (teamModal()!.logoUrl) {
              <img [src]="teamModal()!.logoUrl" class="w-full h-full object-cover" />
            } @else {
              {{ (teamModal()!.shortname || teamModal()!.name).slice(0,2).toUpperCase() }}
            }
            <div class="absolute inset-0 bg-black/50 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity">
              <mat-icon class="!size-5 !text-[20px] text-white">photo_camera</mat-icon>
            </div>
          </div>
          <input #logoFileInput type="file" accept="image/*" class="sr-only"
                 (change)="onTeamLogoSelected($event)" />
          <div>
            <p class="m-0 text-[13px] font-medium text-gray-700">Logo del equipo</p>
            <p class="m-0 mt-0.5 text-[11.5px] text-gray-400">Haz clic en la imagen para cambiarla</p>
          </div>
        </div>

        <!-- Nombre + Nombre corto -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Nombre <span class="text-red-400">*</span>
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.name" placeholder="Ej: Osos Polares" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Nombre corto
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.shortname"
                   placeholder="Ej: OSP" maxlength="5" />
          </div>
        </div>

        <!-- Coach + Tel\xE9fono -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Entrenador
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.coachName" placeholder="Nombre del coach" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Tel\xE9fono coach
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.coachPhone" placeholder="+57 300..." />
          </div>
        </div>

        <!-- Ciudad + A\xF1o fundaci\xF3n -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Ciudad
            </label>
            <input class="team-input" [(ngModel)]="teamModal()!.location" placeholder="Ej: Bogot\xE1" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              A\xF1o de fundaci\xF3n
              <span class="ml-1 normal-case text-[10px] font-normal text-gray-300">(opcional)</span>
            </label>
            <input class="team-input" type="number" min="1800" max="2100"
                   [(ngModel)]="teamModal()!.foundedYear" placeholder="Ej: 1995" />
          </div>
        </div>

        <!-- Estadio / Sede -->
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Estadio / Sede
            <span class="ml-1 normal-case text-[10px] font-normal text-gray-300">(opcional)</span>
          </label>
          <input class="team-input" [(ngModel)]="teamModal()!.homeVenue"
                 placeholder="Ej: Estadio El Camp\xEDn" />
        </div>

        <!-- Colores -->
        <div>
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide block mb-2">
            Colores del equipo
          </label>
          <div class="flex items-center gap-4">
            <div class="flex flex-col items-center gap-1.5">
              <input
                type="color"
                class="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white"
                [(ngModel)]="teamModal()!.primaryColor"
              />
              <span class="text-[10px] text-gray-400">Principal</span>
            </div>
            <div class="flex flex-col items-center gap-1.5">
              <input
                type="color"
                class="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white"
                [(ngModel)]="teamModal()!.secondaryColor"
              />
              <span class="text-[10px] text-gray-400">Secundario</span>
            </div>
            <!-- Preview -->
            <div class="flex-1 h-10 rounded-lg overflow-hidden flex">
              <div class="flex-1" [style.background]="teamModal()!.primaryColor"></div>
              <div class="flex-1" [style.background]="teamModal()!.secondaryColor"></div>
            </div>
          </div>
        </div>

        <!-- Documento del equipo -->
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
            Documento del equipo
          </label>
          <app-file-upload
            [currentUrl]="teamModal()!.documentUrl"
            label="PDF"
            hint="PDF \xB7 M\xE1x 50 MB"
            (fileChange)="onDocumentFileChanged($event)"
          />
        </div>

        <!-- Validation error -->
        @if (teamModalError()) {
          <div class="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200
                      px-3 py-2.5 text-[12.5px] text-red-600">
            <mat-icon class="!size-4 !text-[16px] shrink-0">error_outline</mat-icon>
            {{ teamModalError() }}
          </div>
        }
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-gray-100 bg-gray-50">
        <button class="btn-ghost-sm" (click)="closeTeamModal()" type="button">Cancelar</button>
        <button
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500 text-white
                 text-[13px] font-semibold border-none cursor-pointer hover:bg-blue-600
                 transition-colors"
          (click)="submitTeamModal()"
          type="button"
        >
          <mat-icon class="!size-4 !text-[16px]">save</mat-icon>
          {{ teamModal()!.id ? 'Guardar cambios' : 'Inscribir equipo' }}
        </button>
      </div>
    </div>
  </div>
}

<!-- \u2550\u2550 PLAYER MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
@if (playerModal()) {
  <app-player-modal
    [player]="playerModal()!.player"
    [teamId]="playerModal()!.teamId"
    [positions]="positions"
    (saved)="onPlayerSaved($event)"
    (deleted)="onPlayerDeleted($event)"
    (dismiss)="playerModal.set(null)"
  />
}

<!-- \u2550\u2550 PDF VIEWER \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
@if (pdfViewerData()) {
  <app-pdf-viewer
    [url]="pdfViewerData()!.url"
    [title]="pdfViewerData()!.title"
    (close)="pdfViewerData.set(null)"
  />
}
  `, styles: ["/* angular:styles/component:scss;501c34ead7aebda1a81172c4def873f525be2977a6eb0ac031977baead3ca037;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/admin/pages/championships/championship-components/championship-teams.component.ts */\n:host {\n  display: block;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n}\n.team-input {\n  padding: 8px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 14px;\n  color: #111827;\n  background: #fff;\n  font-family: inherit;\n  outline: none;\n  transition: border-color 0.15s;\n  width: 100%;\n  box-sizing: border-box;\n}\n.team-input:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.btn-ghost-sm {\n  padding: 8px 16px;\n  border-radius: 8px;\n  background: #fff;\n  color: #374151;\n  font-size: 13px;\n  font-weight: 500;\n  border: 1px solid #d1d5db;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.btn-ghost-sm:hover {\n  background: #f9fafb;\n}\n/*# sourceMappingURL=championship-teams.component.css.map */\n"] }]
  }], () => [], { maxTeams: [{ type: Input, args: [{ isSignal: true, alias: "maxTeams", required: false }] }], maxPlayersPerTeam: [{ type: Input, args: [{ isSignal: true, alias: "maxPlayersPerTeam", required: false }] }], initialTeams: [{ type: Input, args: [{ isSignal: true, alias: "initialTeams", required: false }] }], save: [{ type: Output, args: ["save"] }], dirty: [{ type: Output, args: ["dirty"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChampionshipTeamsComponent, { className: "ChampionshipTeamsComponent", filePath: "src/app/features/admin/pages/championships/championship-components/championship-teams.component.ts", lineNumber: 990 });
})();

// src/app/features/admin/pages/championships/championship-form.page.ts
var _forTrack06 = ($index, $item) => $item.id;
function ChampionshipFormPage_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 5);
  }
  if (rf & 2) {
    \u0275\u0275property("diameter", 16);
  }
}
function ChampionshipFormPage_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.actionIcon());
  }
}
function ChampionshipFormPage_For_14_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("bg-gray-200", ctx_r0.activeNavTab() !== tab_r3.id)("text-gray-500", ctx_r0.activeNavTab() !== tab_r3.id)("bg-blue-100", ctx_r0.activeNavTab() === tab_r3.id)("text-blue-700", ctx_r0.activeNavTab() === tab_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r3.count);
  }
}
function ChampionshipFormPage_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function ChampionshipFormPage_For_14_Template_button_click_0_listener() {
      const tab_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeNavTab.set(tab_r3.id));
    });
    \u0275\u0275elementStart(1, "mat-icon", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275conditionalCreate(4, ChampionshipFormPage_For_14_Conditional_4_Template, 2, 9, "span", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("color", ctx_r0.activeNavTab() === tab_r3.id ? "#3b82f6" : "#9ca3af")("border-bottom-color", ctx_r0.activeNavTab() === tab_r3.id ? "#3b82f6" : "transparent");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r3.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r3.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r3.count !== null ? 4 : -1);
  }
}
function ChampionshipFormPage_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-championship-phases", 19);
    \u0275\u0275listener("phasesChange", function ChampionshipFormPage_Conditional_16_Template_app_championship_phases_phasesChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPhasesChange($event));
    })("save", function ChampionshipFormPage_Conditional_16_Template_app_championship_phases_save_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPhasesSave($event));
    })("cancel", function ChampionshipFormPage_Conditional_16_Template_app_championship_phases_cancel_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPhasesCancel());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("initialPhases", ctx_r0.phases())("initialFormat", ctx_r0.activeFormat());
  }
}
function ChampionshipFormPage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-championship-rules", 20);
    \u0275\u0275listener("save", function ChampionshipFormPage_Conditional_17_Template_app_championship_rules_save_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onRulesSave($event));
    })("cancel", function ChampionshipFormPage_Conditional_17_Template_app_championship_rules_cancel_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeNavTab.set("fases"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("initialRules", ctx_r0.championshipRules());
  }
}
function ChampionshipFormPage_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-championship-teams", 21);
    \u0275\u0275listener("save", function ChampionshipFormPage_Conditional_18_Template_app_championship_teams_save_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onTeamsSave($event));
    })("dirty", function ChampionshipFormPage_Conditional_18_Template_app_championship_teams_dirty_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.isDirty.set(true));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("maxTeams", ctx_r0.headerData().maxTeams)("maxPlayersPerTeam", ctx_r0.headerData().maxPlayersPerTeam)("initialTeams", ctx_r0.teamsData());
  }
}
var ChampionshipFormPage = class _ChampionshipFormPage {
  // ── Services ──────────────────────────────────────────────────
  router = inject(Router);
  route = inject(ActivatedRoute);
  championshipSvc = inject(ChampionshipService);
  sportSvc = inject(SportService);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  // ── Page state ─────────────────────────────────────────────────
  pageMode = signal("create", __spreadValues({}, ngDevMode ? { debugName: "pageMode" } : {}));
  isSaving = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isSaving" } : {}));
  isDirty = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isDirty" } : {}));
  activeNavTab = signal("fases", __spreadValues({}, ngDevMode ? { debugName: "activeNavTab" } : {}));
  championshipId = signal(null, __spreadValues({}, ngDevMode ? { debugName: "championshipId" } : {}));
  logoFile = null;
  // ── Sports (cargados del servicio) ─────────────────────────────
  sports = signal([], __spreadValues({}, ngDevMode ? { debugName: "sports" } : {}));
  // ── Header data ────────────────────────────────────────────────
  headerData = signal({
    name: "",
    description: "",
    sportId: 1,
    season: "2024-2025",
    location: "",
    startDate: "",
    endDate: "",
    registrationStartDate: "",
    registrationEndDate: "",
    maxTeams: 16,
    currentTeams: 0,
    maxPlayersPerTeam: 20,
    phaseCount: 0,
    status: "draft",
    logoUrl: null,
    socialLinks: []
  }, __spreadValues({}, ngDevMode ? { debugName: "headerData" } : {}));
  // ── Phase state ─────────────────────────────────────────────────
  phases = signal([], __spreadValues({}, ngDevMode ? { debugName: "phases" } : {}));
  activeFormat = signal(null, __spreadValues({}, ngDevMode ? { debugName: "activeFormat" } : {}));
  // ── Rules state ─────────────────────────────────────────────────
  championshipRules = signal([], __spreadValues({}, ngDevMode ? { debugName: "championshipRules" } : {}));
  // ── Teams state ──────────────────────────────────────────────────
  teamsData = signal([], __spreadValues({}, ngDevMode ? { debugName: "teamsData" } : {}));
  // ── Nav tabs (computed — count reacciona a cambios) ─────────────
  navTabs = computed(() => [
    { id: "fases", label: "Fases", icon: "layers", count: this.phases().length || null },
    { id: "reglas", label: "Reglas", icon: "gavel", count: null },
    { id: "equipos", label: "Equipos", icon: "group", count: this.headerData().currentTeams || null }
  ], __spreadValues({}, ngDevMode ? { debugName: "navTabs" } : {}));
  // ── Computed ───────────────────────────────────────────────────
  isEditable = computed(() => this.pageMode() !== "view", __spreadValues({}, ngDevMode ? { debugName: "isEditable" } : {}));
  actionLabel = computed(() => {
    if (this.isSaving())
      return this.pageMode() === "create" ? "Creando..." : "Guardando...";
    if (this.pageMode() === "create")
      return "Crear Campeonato";
    if (this.pageMode() === "edit")
      return "Guardar Cambios";
    return "Editar";
  }, __spreadValues({}, ngDevMode ? { debugName: "actionLabel" } : {}));
  actionIcon = computed(() => this.pageMode() === "view" ? "edit" : this.pageMode() === "create" ? "add_circle" : "save", __spreadValues({}, ngDevMode ? { debugName: "actionIcon" } : {}));
  // ── Constructor — persist active tab in sessionStorage ─────────
  constructor() {
    effect(() => {
      const id = this.championshipId() ?? "new";
      sessionStorage.setItem(`championship_tab_${id}`, this.activeNavTab());
    });
  }
  // ── Lifecycle ──────────────────────────────────────────────────
  ngOnInit() {
    this.sportSvc.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((list) => {
      this.sports.set(list.map((s) => ({ id: Number(s.id), label: s.name, icon: s.icon })));
      this.cdr.markForCheck();
    });
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.championshipId.set(id);
        this.pageMode.set("view");
        this.loadChampionship(id);
      } else {
        this.pageMode.set("create");
        this.loadDefaultRules(Number(this.headerData().sportId));
      }
      const savedTab = sessionStorage.getItem(`championship_tab_${id ?? "new"}`);
      if (savedTab)
        this.activeNavTab.set(savedTab);
    });
  }
  // ── Header ─────────────────────────────────────────────────────
  onHeaderChange(patch) {
    this.headerData.update((d) => __spreadValues(__spreadValues({}, d), patch));
    this.isDirty.set(true);
  }
  onLogoFile(file) {
    this.logoFile = file;
    this.isDirty.set(true);
  }
  // ── Phases ─────────────────────────────────────────────────────
  onPhasesChange(phases) {
    this.phases.set(phases);
    this.headerData.update((d) => __spreadProps(__spreadValues({}, d), { phaseCount: phases.length }));
    this.isDirty.set(true);
  }
  onPhasesSave(phases) {
    this.onPhasesChange(phases);
    const id = this.championshipId();
    if (!id) {
      this.snackBar.open("Fases guardadas", "Cerrar", { duration: 2e3 });
      return;
    }
    const dtos = phases.map((p) => ({
      name: p.name,
      phaseType: p.phaseType,
      phaseOrder: p.phaseOrder
    }));
    this.championshipSvc.savePhases(id, dtos).subscribe({
      next: () => this.snackBar.open("Fases guardadas", "Cerrar", { duration: 2e3 }),
      error: () => this.snackBar.open("Error al guardar fases", "Cerrar", { duration: 3e3 })
    });
  }
  onPhasesCancel() {
  }
  // ── Rules ──────────────────────────────────────────────────────
  onRulesSave(patches) {
    const id = this.championshipId();
    if (!id)
      return;
    const dtos = patches.map((p) => ({ matchRuleId: p.matchRuleId, sportId: this.headerData().sportId, value: p.value }));
    this.championshipSvc.updateRules(id, dtos).subscribe({
      next: () => this.snackBar.open("Reglas guardadas", "Cerrar", { duration: 2e3 }),
      error: () => this.snackBar.open("Error al guardar reglas", "Cerrar", { duration: 3e3 })
    });
  }
  // ── Teams ──────────────────────────────────────────────────────
  onTeamsSave(teams) {
    const id = this.championshipId();
    if (!id) {
      this.teamsData.set(teams);
      this.headerData.update((d) => __spreadProps(__spreadValues({}, d), { currentTeams: teams.filter((t) => t.isActive).length }));
      return;
    }
    const dtos = teams.map((t) => ({
      name: t.name,
      shortname: t.shortname,
      slug: t.slug,
      logoUrl: t.logoUrl ?? void 0,
      documentUrl: t.documentUrl ?? void 0,
      primaryColor: t.primaryColor ?? void 0,
      secondaryColor: t.secondaryColor ?? void 0,
      location: t.location ?? void 0,
      foundedYear: t.foundedYear ?? void 0,
      homeVenue: t.homeVenue || void 0,
      coachName: t.coachName ?? void 0,
      coachPhone: t.coachPhone ?? void 0,
      players: t.players
    }));
    this.championshipSvc.saveTeams(id, dtos).subscribe({
      next: (saved) => {
        this.isDirty.set(false);
        this.headerData.update((d) => __spreadProps(__spreadValues({}, d), { currentTeams: saved.filter((t) => t.isActive).length }));
        this.snackBar.open("Equipos guardados", "Cerrar", { duration: 2e3 });
      },
      error: () => this.snackBar.open("Error al guardar equipos", "Cerrar", { duration: 3e3 })
    });
  }
  // ── Action button ──────────────────────────────────────────────
  onActionClick() {
    if (this.pageMode() === "view") {
      this.pageMode.set("edit");
      return;
    }
    this.save();
  }
  buildChampionshipLogoFormData() {
    const fd = new FormData();
    if (this.logoFile) {
      fd.append("logo", this.logoFile, this.logoFile.name);
    }
    return fd;
  }
  logChampionshipLogoFormData(fd) {
    const fields = [];
    fd.forEach((value, key) => {
      if (value instanceof File) {
        fields.push({ key, name: value.name, type: value.type, size: value.size });
      }
    });
    console.log("Championship logo FormData (mock):", fields);
  }
  save() {
    const hd = this.headerData();
    if (!hd.name.trim()) {
      this.snackBar.open("El nombre del campeonato es requerido", "Cerrar", { duration: 3e3 });
      return;
    }
    const user = this.authService.currentUser();
    if (!user?.organizationId) {
      this.snackBar.open("Organizaci\xF3n no disponible", "Cerrar", { duration: 3e3 });
      return;
    }
    const logoFormData = this.buildChampionshipLogoFormData();
    this.logChampionshipLogoFormData(logoFormData);
    this.isSaving.set(true);
    if (this.pageMode() === "edit" && this.championshipId()) {
      const socialDtos = this.toSocialLinkDtos(hd.socialLinks);
      const dto = {
        name: hd.name,
        slug: this.toSlug(hd.name),
        description: hd.description || void 0,
        season: hd.season,
        startDate: hd.startDate ? new Date(hd.startDate) : void 0,
        endDate: hd.endDate ? new Date(hd.endDate) : void 0,
        registrationStartDate: hd.registrationStartDate ? new Date(hd.registrationStartDate) : null,
        registrationEndDate: hd.registrationEndDate ? new Date(hd.registrationEndDate) : null,
        maxTeams: hd.maxTeams,
        maxPlayersPerTeam: hd.maxPlayersPerTeam
      };
      forkJoin([
        this.championshipSvc.update(this.championshipId(), dto),
        this.championshipSvc.saveSocialLinks(this.championshipId(), socialDtos)
      ]).subscribe({
        next: () => {
          this.isDirty.set(false);
          this.snackBar.open("Campeonato actualizado", "Cerrar", { duration: 3e3 });
          this.pageMode.set("view");
          this.isSaving.set(false);
        },
        error: () => {
          this.snackBar.open("Error al actualizar", "Cerrar", { duration: 3e3 });
          this.isSaving.set(false);
        }
      });
    } else {
      const dto = {
        organizationId: +user.organizationId,
        sportId: hd.sportId,
        name: hd.name,
        slug: this.toSlug(hd.name),
        season: hd.season || String((/* @__PURE__ */ new Date()).getFullYear()),
        description: hd.description || void 0,
        startDate: hd.startDate ? new Date(hd.startDate) : void 0,
        endDate: hd.endDate ? new Date(hd.endDate) : void 0,
        registrationStartDate: hd.registrationStartDate ? new Date(hd.registrationStartDate) : void 0,
        registrationEndDate: hd.registrationEndDate ? new Date(hd.registrationEndDate) : void 0,
        maxTeams: hd.maxTeams,
        maxPlayersPerTeam: hd.maxPlayersPerTeam
      };
      this.championshipSvc.create(dto).subscribe({
        next: (c) => {
          const newId = String(c.id);
          this.saveAllSections(newId).subscribe({
            next: () => {
              this.isDirty.set(false);
              this.snackBar.open("Campeonato creado", "Cerrar", { duration: 3e3 });
              this.router.navigate(["/admin/championships", newId]);
            },
            error: () => {
              this.isDirty.set(false);
              this.snackBar.open("Campeonato creado. Algunas secciones no pudieron guardarse.", "Cerrar", { duration: 4e3 });
              this.router.navigate(["/admin/championships", newId]);
            }
          });
        },
        error: () => {
          this.snackBar.open("Error al crear", "Cerrar", { duration: 3e3 });
          this.isSaving.set(false);
        }
      });
    }
  }
  /** Guarda fases y equipos pendientes para un championship ya existente. */
  saveAllSections(id) {
    const saves = [];
    if (this.phases().length > 0) {
      const dtos = this.phases().map((p) => ({
        name: p.name,
        phaseType: p.phaseType,
        phaseOrder: p.phaseOrder
      }));
      saves.push(this.championshipSvc.savePhases(id, dtos));
    }
    if (this.teamsData().length > 0) {
      const dtos = this.teamsData().map((t) => ({
        name: t.name,
        shortname: t.shortname,
        slug: t.slug,
        logoUrl: t.logoUrl ?? void 0,
        documentUrl: t.documentUrl ?? void 0,
        primaryColor: t.primaryColor ?? void 0,
        secondaryColor: t.secondaryColor ?? void 0,
        location: t.location ?? void 0,
        foundedYear: t.foundedYear ?? void 0,
        homeVenue: t.homeVenue || void 0,
        coachName: t.coachName ?? void 0,
        coachPhone: t.coachPhone ?? void 0,
        players: t.players
      }));
      saves.push(this.championshipSvc.saveTeams(id, dtos));
    }
    const socialDtos = this.toSocialLinkDtos(this.headerData().socialLinks);
    saves.push(this.championshipSvc.saveSocialLinks(id, socialDtos));
    return saves.length > 0 ? forkJoin(saves).pipe(map(() => void 0)) : of(void 0);
  }
  loadDefaultRules(_sportId) {
    const defaults = MOCK_RULES_FOOTBALL.map((r) => __spreadProps(__spreadValues({}, r), {
      currentValue: r.defaultValue,
      isOverridden: false
    }));
    this.championshipRules.set(defaults);
    this.cdr.markForCheck();
  }
  loadChampionship(id) {
    this.championshipSvc.getById(id).subscribe({
      next: (c) => {
        this.headerData.set({
          name: c.name,
          description: c.description ?? "",
          sportId: Number(c.sportId),
          season: c.season,
          location: "",
          startDate: c.startDate ? this.toIsoDate(c.startDate) : "",
          endDate: c.endDate ? this.toIsoDate(c.endDate) : "",
          registrationStartDate: c.registrationStartDate ? this.toIsoDate(c.registrationStartDate) : "",
          registrationEndDate: c.registrationEndDate ? this.toIsoDate(c.registrationEndDate) : "",
          maxTeams: c.maxTeams,
          currentTeams: 0,
          maxPlayersPerTeam: c.maxPlayersPerTeam ?? 20,
          phaseCount: this.phases().length,
          status: c.status ?? "active",
          logoUrl: c.logo ?? null,
          socialLinks: (c.socialLinks ?? []).map((link) => ({
            id: Number(link.id),
            socialNetworkId: Number(link.socialNetworkId),
            link: link.link,
            name: link.socialNetwork?.name,
            icon: link.socialNetwork?.icon
          }))
        });
        this.championshipSvc.getRules(id).subscribe((rulesResp) => {
          const overrides = new Map(rulesResp.rules.map((r) => [r.matchRuleId, r]));
          const merged = MOCK_RULES_FOOTBALL.map((meta) => {
            const saved = overrides.get(meta.matchRuleId);
            return saved ? __spreadProps(__spreadValues({}, meta), { currentValue: saved.currentValue, isOverridden: saved.isOverridden }) : __spreadProps(__spreadValues({}, meta), { currentValue: meta.defaultValue, isOverridden: false });
          });
          this.championshipRules.set(merged);
          this.cdr.markForCheck();
        });
        this.championshipSvc.getPhases(id).subscribe((phasesFromSvc) => {
          const mapped = phasesFromSvc.map((p) => ({
            id: Number(p.id),
            name: p.name,
            phaseType: p.phaseType,
            phaseOrder: p.phaseOrder,
            status: p.status,
            league: p.leagueConfig ? { winsPoints: 3, drawPoints: 1, lossPoints: 0, totalRounds: p.leagueConfig.advanceCount, legs: p.leagueConfig.legs, advanceCount: p.leagueConfig.advanceCount, tiebreakOrder: p.leagueConfig.tiebreakOrder } : void 0,
            knockout: p.knockoutConfig ? { legs: p.knockoutConfig.legs, bracketSize: 0, thirdPlaceMatch: p.knockoutConfig.thirdPlaceMatch, seeding: p.knockoutConfig.seeding, awayGoalsRule: p.knockoutConfig.awayGoalsRule, tieBreak: p.knockoutConfig.tieBreak } : void 0,
            groups: p.groupsConfig ? { numGroups: p.groupsConfig.numGroups, teamsPerGroup: p.groupsConfig.teamsPerGroup, legs: p.groupsConfig.legs, advancePerGroup: p.groupsConfig.advancePerGroup, advanceBestThirds: p.groupsConfig.advanceBestThirds, tiebreakOrder: p.groupsConfig.tiebreakOrder } : void 0,
            swiss: p.swissConfig ? { numRounds: p.swissConfig.numRounds, pairingSystem: p.swissConfig.pairingSystem, firstRound: p.swissConfig.firstRound, allowRematch: p.swissConfig.allowRematch, tiebreakOrder: p.swissConfig.tiebreakOrder, directAdvancedCount: p.swissConfig.directAdvancedCount, playoffCount: p.swissConfig.playoffCount } : void 0
          }));
          this.phases.set(mapped);
          this.activeFormat.set(this.inferFormat(mapped));
          this.headerData.update((d) => __spreadProps(__spreadValues({}, d), { phaseCount: mapped.length }));
        });
        this.championshipSvc.getTeams(id).subscribe((profiles) => {
          const mapped = profiles.map((p) => ({
            id: Number(p.id),
            championshipId: Number(p.championshipId),
            name: p.name,
            shortname: p.shortname,
            slug: p.slug,
            logoUrl: p.logoUrl,
            documentUrl: p.documentUrl ?? null,
            primaryColor: p.primaryColor ?? "#1a56db",
            secondaryColor: p.secondaryColor ?? "#e5e7eb",
            location: p.location ?? "",
            foundedYear: p.foundedYear ?? null,
            homeVenue: p.homeVenue ?? "",
            coachName: p.coachName ?? "",
            coachPhone: p.coachPhone ?? "",
            isActive: p.isActive,
            players: (p.players ?? []).map((pl) => ({
              id: Number(pl.id),
              teamId: Number(pl.teamId),
              positionId: Number(pl.positionId),
              firstName: pl.firstName,
              lastName: pl.lastName,
              nickName: pl.nickName ?? null,
              number: pl.number,
              birthDate: pl.birthDate ? String(pl.birthDate) : null,
              height: pl.height ?? null,
              weight: pl.weight ?? null,
              status: pl.status ?? "active",
              photoUrl: pl.photoUrl ?? null
            }))
          }));
          this.teamsData.set(mapped);
          this.headerData.update((d) => __spreadProps(__spreadValues({}, d), { currentTeams: mapped.filter((t) => t.isActive).length }));
        });
        this.cdr.markForCheck();
      },
      error: () => {
        this.snackBar.open("Error al cargar el campeonato", "Cerrar", { duration: 3e3 });
        this.router.navigate(["/admin/championships"]);
      }
    });
  }
  // ── Helpers ────────────────────────────────────────────────────
  inferFormat(phases) {
    const types = new Set(phases.map((p) => p.phaseType));
    if (types.has(PhaseType.Swiss))
      return "swiss_playoff";
    if (types.has(PhaseType.Groups))
      return "groups_knockout";
    if (types.has(PhaseType.Knockout) && !types.has(PhaseType.League))
      return "knockout";
    if (types.has(PhaseType.League))
      return "league";
    return null;
  }
  toSlug = (n) => n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  toIsoDate = (d) => (d instanceof Date ? d : new Date(d)).toISOString().split("T")[0];
  toSocialLinkDtos(links) {
    const mapByNetwork = /* @__PURE__ */ new Map();
    for (const item of links) {
      const url = item.link.trim();
      if (!this.isHttpsUrl(url))
        continue;
      const socialNetworkId = Number(item.socialNetworkId);
      if (!mapByNetwork.has(socialNetworkId)) {
        mapByNetwork.set(socialNetworkId, { socialNetworkId, link: url });
      }
    }
    return Array.from(mapByNetwork.values());
  }
  isHttpsUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "https:";
    } catch {
      return false;
    }
  }
  static \u0275fac = function ChampionshipFormPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChampionshipFormPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChampionshipFormPage, selectors: [["app-championship-form"]], decls: 19, vars: 19, consts: [[1, "min-h-screen", "flex", "flex-col", "bg-[#f0f2f5]"], [1, "sticky", "top-0", "z-50", "flex", "items-center", "justify-between", "h-[52px]", "px-7", "bg-[#080f1c]", "border-b", "border-white/[0.06]"], ["routerLink", "/admin/championships", 1, "inline-flex", "items-center", "gap-1.5", "text-[13px]", "font-medium", "text-white/50", "no-underline", "transition-colors", "hover:text-white/90"], [1, "!size-[18px]", "!text-[18px]"], [1, "inline-flex", "items-center", "gap-1.5", "h-[34px]", "px-[18px]", "rounded-lg", "text-[13px]", "font-semibold", "cursor-pointer", "border-none", "transition-colors", 3, "click", "disabled"], [3, "diameter"], [1, "!size-4", "!text-[16px]"], [3, "dataChange", "logoSelected", "data", "sports", "editable"], [1, "h-px", "bg-white/[0.08]"], [1, "flex", "px-7", "bg-white", "border-b", "border-gray-200"], [1, "relative", "bottom-[-1px]", "inline-flex", "items-center", "gap-1.5", "h-[46px]", "px-[18px]", "text-[12px]", "font-bold", "tracking-[.06em]", "uppercase", "bg-transparent", "border-none", "border-b-2", "cursor-pointer", "transition-colors", 3, "color", "border-bottom-color"], [1, "flex-1"], [3, "initialPhases", "initialFormat"], [3, "initialRules"], [3, "maxTeams", "maxPlayersPerTeam", "initialTeams"], [1, "relative", "bottom-[-1px]", "inline-flex", "items-center", "gap-1.5", "h-[46px]", "px-[18px]", "text-[12px]", "font-bold", "tracking-[.06em]", "uppercase", "bg-transparent", "border-none", "border-b-2", "cursor-pointer", "transition-colors", 3, "click"], [1, "!size-[15px]", "!text-[15px]"], [1, "inline-flex", "items-center", "justify-center", "min-w-[18px]", "h-[18px]", "px-1.5", "rounded-full", "text-[10px]", "font-bold", 3, "bg-gray-200", "text-gray-500", "bg-blue-100", "text-blue-700"], [1, "inline-flex", "items-center", "justify-center", "min-w-[18px]", "h-[18px]", "px-1.5", "rounded-full", "text-[10px]", "font-bold"], [3, "phasesChange", "save", "cancel", "initialPhases", "initialFormat"], [3, "save", "cancel", "initialRules"], [3, "save", "dirty", "maxTeams", "maxPlayersPerTeam", "initialTeams"]], template: function ChampionshipFormPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "a", 2)(3, "mat-icon", 3);
      \u0275\u0275text(4, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " Campeonatos ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 4);
      \u0275\u0275listener("click", function ChampionshipFormPage_Template_button_click_6_listener() {
        return ctx.onActionClick();
      });
      \u0275\u0275conditionalCreate(7, ChampionshipFormPage_Conditional_7_Template, 1, 1, "mat-spinner", 5)(8, ChampionshipFormPage_Conditional_8_Template, 2, 1, "mat-icon", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "app-championship-header", 7);
      \u0275\u0275listener("dataChange", function ChampionshipFormPage_Template_app_championship_header_dataChange_10_listener($event) {
        return ctx.onHeaderChange($event);
      })("logoSelected", function ChampionshipFormPage_Template_app_championship_header_logoSelected_10_listener($event) {
        return ctx.onLogoFile($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(11, "div", 8);
      \u0275\u0275elementStart(12, "div", 9);
      \u0275\u0275repeaterCreate(13, ChampionshipFormPage_For_14_Template, 5, 7, "button", 10, _forTrack06);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 11);
      \u0275\u0275conditionalCreate(16, ChampionshipFormPage_Conditional_16_Template, 1, 2, "app-championship-phases", 12);
      \u0275\u0275conditionalCreate(17, ChampionshipFormPage_Conditional_17_Template, 1, 1, "app-championship-rules", 13);
      \u0275\u0275conditionalCreate(18, ChampionshipFormPage_Conditional_18_Template, 1, 3, "app-championship-teams", 14);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275styleProp("background", ctx.isEditable() ? "#3b82f6" : "rgba(255,255,255,0.07)")("color", ctx.isEditable() ? "#fff" : "rgba(255,255,255,0.8)")("border", ctx.isEditable() ? "none" : "1px solid rgba(255,255,255,0.15)")("opacity", ctx.isSaving() ? "0.5" : "1")("cursor", ctx.isSaving() ? "not-allowed" : "pointer");
      \u0275\u0275property("disabled", ctx.isSaving());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSaving() ? 7 : 8);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.actionLabel(), " ");
      \u0275\u0275advance();
      \u0275\u0275property("data", ctx.headerData())("sports", ctx.sports())("editable", ctx.isEditable());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.navTabs());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.activeNavTab() === "fases" ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeNavTab() === "reglas" ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeNavTab() === "equipos" ? 18 : -1);
    }
  }, dependencies: [
    RouterLink,
    MatIconModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    ChampionshipHeaderComponent,
    ChampionshipPhasesComponent,
    ChampionshipRulesComponent,
    ChampionshipTeamsComponent
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChampionshipFormPage, [{
    type: Component,
    args: [{
      selector: "app-championship-form",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [
        RouterLink,
        MatIconModule,
        MatProgressSpinnerModule,
        ChampionshipHeaderComponent,
        ChampionshipPhasesComponent,
        ChampionshipRulesComponent,
        ChampionshipTeamsComponent
      ],
      template: `
<div class="min-h-screen flex flex-col bg-[#f0f2f5]">

  <!-- \u2550\u2550 TOPBAR \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <nav class="sticky top-0 z-50 flex items-center justify-between h-[52px] px-7
              bg-[#080f1c] border-b border-white/[0.06]">

    <a class="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/50
              no-underline transition-colors hover:text-white/90"
       routerLink="/admin/championships">
      <mat-icon class="!size-[18px] !text-[18px]">arrow_back</mat-icon>
      Campeonatos
    </a>

    <button
      class="inline-flex items-center gap-1.5 h-[34px] px-[18px] rounded-lg
             text-[13px] font-semibold cursor-pointer border-none transition-colors"
      [style.background]="isEditable() ? '#3b82f6' : 'rgba(255,255,255,0.07)'"
      [style.color]="isEditable() ? '#fff' : 'rgba(255,255,255,0.8)'"
      [style.border]="isEditable() ? 'none' : '1px solid rgba(255,255,255,0.15)'"
      [style.opacity]="isSaving() ? '0.5' : '1'"
      [style.cursor]="isSaving() ? 'not-allowed' : 'pointer'"
      [disabled]="isSaving()"
      (click)="onActionClick()"
    >
      @if (isSaving()) {
        <mat-spinner [diameter]="16" />
      } @else {
        <mat-icon class="!size-4 !text-[16px]">{{ actionIcon() }}</mat-icon>
      }
      {{ actionLabel() }}
    </button>
  </nav>

  <!-- \u2550\u2550 HEADER \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <app-championship-header
    [data]="headerData()"
    [sports]="sports()"
    [editable]="isEditable()"
    (dataChange)="onHeaderChange($event)"
    (logoSelected)="onLogoFile($event)"
  />

  <div class="h-px bg-white/[0.08]"></div>

  <!-- \u2550\u2550 NAV TABS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div class="flex px-7 bg-white border-b border-gray-200">
    @for (tab of navTabs(); track tab.id) {
      <button
        class="relative bottom-[-1px] inline-flex items-center gap-1.5 h-[46px] px-[18px]
               text-[12px] font-bold tracking-[.06em] uppercase bg-transparent
               border-none border-b-2 cursor-pointer transition-colors"
        [style.color]="activeNavTab() === tab.id ? '#3b82f6' : '#9ca3af'"
        [style.border-bottom-color]="activeNavTab() === tab.id ? '#3b82f6' : 'transparent'"
        (click)="activeNavTab.set(tab.id)"
      >
        <mat-icon class="!size-[15px] !text-[15px]">{{ tab.icon }}</mat-icon>
        {{ tab.label }}
        @if (tab.count !== null) {
          <span
            class="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5
                   rounded-full text-[10px] font-bold"
            [class.bg-gray-200]="activeNavTab() !== tab.id"
            [class.text-gray-500]="activeNavTab() !== tab.id"
            [class.bg-blue-100]="activeNavTab() === tab.id"
            [class.text-blue-700]="activeNavTab() === tab.id"
          >{{ tab.count }}</span>
        }
      </button>
    }
  </div>

  <!-- \u2550\u2550 TAB CONTENT \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div class="flex-1">

    @if (activeNavTab() === 'fases') {
      <app-championship-phases
        [initialPhases]="phases()"
        [initialFormat]="activeFormat()"
        (phasesChange)="onPhasesChange($event)"
        (save)="onPhasesSave($event)"
        (cancel)="onPhasesCancel()"
      />
    }

    @if (activeNavTab() === 'reglas') {
      <app-championship-rules
        [initialRules]="championshipRules()"
        (save)="onRulesSave($event)"
        (cancel)="activeNavTab.set('fases')"
      />
    }

    @if (activeNavTab() === 'equipos') {
      <app-championship-teams
        [maxTeams]="headerData().maxTeams"
        [maxPlayersPerTeam]="headerData().maxPlayersPerTeam"
        [initialTeams]="teamsData()"
        (save)="onTeamsSave($event)"
        (dirty)="isDirty.set(true)"
      />
    }

  </div>
</div>
  `
    }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChampionshipFormPage, { className: "ChampionshipFormPage", filePath: "src/app/features/admin/pages/championships/championship-form.page.ts", lineNumber: 188 });
})();
export {
  ChampionshipFormPage as default
};
//# sourceMappingURL=chunk-C7XXJ7LF.js.map
