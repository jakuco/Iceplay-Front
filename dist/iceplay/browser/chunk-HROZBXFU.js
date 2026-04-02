import {
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  CardComponent,
  SearchAutocompleteComponent,
  SkeletonComponent,
  SpinnerComponent
} from "./chunk-O42ALIVU.js";
import "./chunk-BM64NF7H.js";
import "./chunk-RSSJKDFU.js";
import "./chunk-Y2WVIPA7.js";
import "./chunk-PT2DXUCN.js";
import "./chunk-PEDZOI7R.js";
import "./chunk-5LOHSV5W.js";
import "./chunk-7MBHIBBN.js";
import "./chunk-UVODHWP6.js";
import "./chunk-VMJIIGHX.js";
import "./chunk-A4ZOVHWZ.js";
import "./chunk-2C543PJY.js";
import "./chunk-DNCNJ5D2.js";
import "./chunk-BTLIOYON.js";
import "./chunk-TWF5BIFR.js";
import "./chunk-2QF6PXYN.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/ui-dumb/pages/ui-showcase.page.ts
var _c0 = () => [1, 2, 3];
function UiShowcasePage_Conditional_56_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pick_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", pick_r1.subtitle);
  }
}
function UiShowcasePage_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " Seleccionado: ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, UiShowcasePage_Conditional_56_Conditional_4_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pick_r1 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(pick_r1.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(pick_r1.subtitle ? 4 : -1);
  }
}
function UiShowcasePage_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, "Escribe y pausa para ver sugerencias; elige una opci\xF3n.");
    \u0275\u0275elementEnd();
  }
}
function UiShowcasePage_For_216_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275element(1, "ui-skeleton", 72);
    \u0275\u0275elementStart(2, "div", 73);
    \u0275\u0275element(3, "ui-skeleton", 74)(4, "ui-skeleton", 75);
    \u0275\u0275elementEnd()();
  }
}
var UiShowcasePage = class _UiShowcasePage {
  fruitItems = [
    { id: "1", label: "Inter", subtitle: "Equipo de f\xFAtbol" },
    { id: "2", label: "Barca", subtitle: "Equipo de f\xFAtbol" },
    { id: "3", label: "Madrid", subtitle: "Equipo de f\xFAtbol" },
    { id: "4", label: "Atl\xE9tico de Madrid", subtitle: "Equipo de f\xFAtbol" },
    { id: "5", label: "Valencia", subtitle: "Equipo de f\xFAtbol" },
    { id: "6", label: "Sevilla", subtitle: "Equipo de f\xFAtbol" }
  ];
  lastFruitSelection = signal(null, __spreadValues({}, ngDevMode ? { debugName: "lastFruitSelection" } : {}));
  onFruitSelected(item) {
    this.lastFruitSelection.set(item);
  }
  isLoading = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isLoading" } : {}));
  simulateLoading() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2e3);
  }
  static \u0275fac = function UiShowcasePage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UiShowcasePage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UiShowcasePage, selectors: [["app-ui-showcase"]], decls: 265, vars: 8, consts: [[1, "showcase"], [1, "showcase-header"], [1, "section"], [1, "subsection"], [1, "component-row"], ["variant", "primary"], ["variant", "secondary"], ["variant", "danger"], ["variant", "ghost"], [1, "component-row", "align-center"], ["size", "sm"], ["size", "md"], ["size", "lg"], [3, "disabled"], [3, "loading"], [3, "clicked", "loading"], [1, "section-intro"], ["label", "Buscar frutas", "placeholder", "Escribe para filtrar\u2026", 3, "selected", "items", "debounceMs"], ["role", "status", 1, "search-meta", "text-secondary"], [1, "search-meta", "text-secondary"], [1, "cards-grid"], ["variant", "elevated"], ["card-header", ""], ["card-footer", ""], ["variant", "ghost", "size", "sm"], ["variant", "primary", "size", "sm"], ["variant", "outlined"], ["variant", "secondary", "size", "sm"], ["variant", "flat"], ["variant", "elevated", 3, "clickable"], ["name", "Ana L\xF3pez", "size", "xs"], ["name", "Ana L\xF3pez", "size", "sm"], ["name", "Ana L\xF3pez", "size", "md"], ["name", "Ana L\xF3pez", "size", "lg"], ["name", "Ana L\xF3pez", "size", "xl"], [1, "avatar-group"], ["name", "Carlos Garc\xEDa", "size", "lg", "status", "online"], ["name", "Mar\xEDa Rodr\xEDguez", "size", "lg", "status", "away"], ["name", "Pedro S\xE1nchez", "size", "lg", "status", "busy"], ["name", "Laura Mart\xEDnez", "size", "lg", "status", "offline"], ["name", "John", "size", "lg"], ["name", "Mar\xEDa Garc\xEDa", "size", "lg"], ["name", "Juan Carlos L\xF3pez", "size", "lg"], ["name", "", "size", "lg"], ["variant", "default"], ["variant", "success"], ["variant", "warning"], ["variant", "info"], [1, "spinner-demo"], [1, "component-row", "align-center", "colored-spinners"], [1, "spinner-demo", 2, "color", "#3b82f6"], [1, "spinner-demo", 2, "color", "#22c55e"], [1, "spinner-demo", 2, "color", "#ef4444"], [1, "skeleton-demo"], ["variant", "rect", "width", "100%", "height", "100px"], ["variant", "circle", "width", "60px", "height", "60px"], ["variant", "text", "width", "80%"], ["variant", "text", "width", "60%"], [1, "skeleton-card"], ["variant", "circle", "width", "56px", "height", "56px"], [1, "skeleton-content"], ["variant", "text", "width", "70%", "height", "1.25rem"], ["variant", "text", "width", "50%", "height", "0.875rem"], ["variant", "text", "width", "90%", "height", "0.875rem"], [1, "skeleton-list"], [1, "skeleton-list-item"], [1, "user-profile"], ["name", "Mar\xEDa Garc\xEDa", "size", "xl", "status", "online"], [1, "user-info"], [1, "user-badges"], [1, "server-status"], [1, "status-item"], ["variant", "circle", "width", "40px", "height", "40px"], [1, "skeleton-list-content"], ["variant", "text", "width", "60%", "height", "1rem"], ["variant", "text", "width", "40%", "height", "0.75rem"]], template: function UiShowcasePage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1");
      \u0275\u0275text(3, "UI Components Showcase");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5, "Design System para IcePlay");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "section", 2)(7, "h2");
      \u0275\u0275text(8, "Buttons");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 3)(10, "h3");
      \u0275\u0275text(11, "Variantes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 4)(13, "ui-button", 5);
      \u0275\u0275text(14, "Primary");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "ui-button", 6);
      \u0275\u0275text(16, "Secondary");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "ui-button", 7);
      \u0275\u0275text(18, "Danger");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "ui-button", 8);
      \u0275\u0275text(20, "Ghost");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "div", 3)(22, "h3");
      \u0275\u0275text(23, "Tama\xF1os");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 9)(25, "ui-button", 10);
      \u0275\u0275text(26, "Small");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "ui-button", 11);
      \u0275\u0275text(28, "Medium");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "ui-button", 12);
      \u0275\u0275text(30, "Large");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 3)(32, "h3");
      \u0275\u0275text(33, "Estados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 4)(35, "ui-button", 13);
      \u0275\u0275text(36, "Disabled");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "ui-button", 14);
      \u0275\u0275text(38, "Loading");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "ui-button", 15);
      \u0275\u0275listener("clicked", function UiShowcasePage_Template_ui_button_clicked_39_listener() {
        return ctx.simulateLoading();
      });
      \u0275\u0275text(40, " Click me ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(41, "section", 2)(42, "h2");
      \u0275\u0275text(43, "B\xFAsqueda con sugerencias (");
      \u0275\u0275elementStart(44, "code");
      \u0275\u0275text(45, "ui-search-autocomplete");
      \u0275\u0275elementEnd();
      \u0275\u0275text(46, ")");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "p", 16);
      \u0275\u0275text(48, " Autocomplete con debounce, panel solo tras escribir, y lista mock. Reutilizable con ");
      \u0275\u0275elementStart(49, "code");
      \u0275\u0275text(50, "[items]");
      \u0275\u0275elementEnd();
      \u0275\u0275text(51, " y ");
      \u0275\u0275elementStart(52, "code");
      \u0275\u0275text(53, "(selected)");
      \u0275\u0275elementEnd();
      \u0275\u0275text(54, ". ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "ui-search-autocomplete", 17);
      \u0275\u0275listener("selected", function UiShowcasePage_Template_ui_search_autocomplete_selected_55_listener($event) {
        return ctx.onFruitSelected($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(56, UiShowcasePage_Conditional_56_Template, 5, 2, "p", 18)(57, UiShowcasePage_Conditional_57_Template, 2, 0, "p", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "section", 2)(59, "h2");
      \u0275\u0275text(60, "Cards");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "div", 20)(62, "ui-card", 21)(63, "span", 22);
      \u0275\u0275text(64, "Elevated Card");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "p");
      \u0275\u0275text(66, "Esta es una card con sombra elevada. Perfecta para destacar contenido importante.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "div", 23)(68, "ui-button", 24);
      \u0275\u0275text(69, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "ui-button", 25);
      \u0275\u0275text(71, "Aceptar");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(72, "ui-card", 26)(73, "span", 22);
      \u0275\u0275text(74, "Outlined Card");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "p");
      \u0275\u0275text(76, "Card con borde. Ideal para listas y contenido secundario.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "div", 23)(78, "ui-button", 27);
      \u0275\u0275text(79, "Ver m\xE1s");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(80, "ui-card", 28)(81, "span", 22);
      \u0275\u0275text(82, "Flat Card");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "p");
      \u0275\u0275text(84, "Card sin sombra ni borde. \xDAtil para fondos con color.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(85, "ui-card", 29)(86, "span", 22);
      \u0275\u0275text(87, "Clickable Card \u2728");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "p");
      \u0275\u0275text(89, "Esta card tiene efecto hover. Pasa el mouse para ver la animaci\xF3n.");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(90, "section", 2)(91, "h2");
      \u0275\u0275text(92, "Avatars");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "div", 3)(94, "h3");
      \u0275\u0275text(95, "Tama\xF1os");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(96, "div", 9);
      \u0275\u0275element(97, "ui-avatar", 30)(98, "ui-avatar", 31)(99, "ui-avatar", 32)(100, "ui-avatar", 33)(101, "ui-avatar", 34);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(102, "div", 3)(103, "h3");
      \u0275\u0275text(104, "Con Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "div", 9)(106, "div", 35);
      \u0275\u0275element(107, "ui-avatar", 36);
      \u0275\u0275elementStart(108, "span");
      \u0275\u0275text(109, "Online");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(110, "div", 35);
      \u0275\u0275element(111, "ui-avatar", 37);
      \u0275\u0275elementStart(112, "span");
      \u0275\u0275text(113, "Away");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(114, "div", 35);
      \u0275\u0275element(115, "ui-avatar", 38);
      \u0275\u0275elementStart(116, "span");
      \u0275\u0275text(117, "Busy");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(118, "div", 35);
      \u0275\u0275element(119, "ui-avatar", 39);
      \u0275\u0275elementStart(120, "span");
      \u0275\u0275text(121, "Offline");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(122, "div", 3)(123, "h3");
      \u0275\u0275text(124, "Iniciales Autom\xE1ticas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(125, "div", 9);
      \u0275\u0275element(126, "ui-avatar", 40)(127, "ui-avatar", 41)(128, "ui-avatar", 42)(129, "ui-avatar", 43);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(130, "section", 2)(131, "h2");
      \u0275\u0275text(132, "Badges");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(133, "div", 4)(134, "ui-badge", 44);
      \u0275\u0275text(135, "Default");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(136, "ui-badge", 45);
      \u0275\u0275text(137, "Success");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(138, "ui-badge", 46);
      \u0275\u0275text(139, "Warning");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(140, "ui-badge", 7);
      \u0275\u0275text(141, "Danger");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(142, "ui-badge", 47);
      \u0275\u0275text(143, "Info");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(144, "div", 3)(145, "h3");
      \u0275\u0275text(146, "Ejemplos de Uso");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(147, "div", 4)(148, "ui-badge", 45);
      \u0275\u0275text(149, "\u2713 Activo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(150, "ui-badge", 7);
      \u0275\u0275text(151, "\u2717 Eliminado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(152, "ui-badge", 46);
      \u0275\u0275text(153, "\u23F3 Pendiente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(154, "ui-badge", 47);
      \u0275\u0275text(155, "\u{1F195} Nuevo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(156, "ui-badge", 44);
      \u0275\u0275text(157, "v2.0.0");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(158, "section", 2)(159, "h2");
      \u0275\u0275text(160, "Spinners");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(161, "div", 9)(162, "div", 48);
      \u0275\u0275element(163, "ui-spinner", 10);
      \u0275\u0275elementStart(164, "span");
      \u0275\u0275text(165, "Small");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(166, "div", 48);
      \u0275\u0275element(167, "ui-spinner", 11);
      \u0275\u0275elementStart(168, "span");
      \u0275\u0275text(169, "Medium");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(170, "div", 48);
      \u0275\u0275element(171, "ui-spinner", 12);
      \u0275\u0275elementStart(172, "span");
      \u0275\u0275text(173, "Large");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(174, "div", 3)(175, "h3");
      \u0275\u0275text(176, "Con Color");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(177, "div", 49)(178, "div", 50);
      \u0275\u0275element(179, "ui-spinner", 12);
      \u0275\u0275elementStart(180, "span");
      \u0275\u0275text(181, "Primary");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(182, "div", 51);
      \u0275\u0275element(183, "ui-spinner", 12);
      \u0275\u0275elementStart(184, "span");
      \u0275\u0275text(185, "Success");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(186, "div", 52);
      \u0275\u0275element(187, "ui-spinner", 12);
      \u0275\u0275elementStart(188, "span");
      \u0275\u0275text(189, "Danger");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(190, "section", 2)(191, "h2");
      \u0275\u0275text(192, "Skeletons");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(193, "div", 3)(194, "h3");
      \u0275\u0275text(195, "Formas B\xE1sicas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(196, "div", 53);
      \u0275\u0275element(197, "ui-skeleton", 54)(198, "ui-skeleton", 55)(199, "ui-skeleton", 56)(200, "ui-skeleton", 57);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(201, "div", 3)(202, "h3");
      \u0275\u0275text(203, "Ejemplo: Card Skeleton");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(204, "ui-card", 26)(205, "div", 58);
      \u0275\u0275element(206, "ui-skeleton", 59);
      \u0275\u0275elementStart(207, "div", 60);
      \u0275\u0275element(208, "ui-skeleton", 61)(209, "ui-skeleton", 62)(210, "ui-skeleton", 63);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(211, "div", 3)(212, "h3");
      \u0275\u0275text(213, "Ejemplo: Lista Skeleton");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(214, "div", 64);
      \u0275\u0275repeaterCreate(215, UiShowcasePage_For_216_Template, 5, 0, "div", 65, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(217, "section", 2)(218, "h2");
      \u0275\u0275text(219, "Ejemplos Combinados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(220, "div", 20)(221, "ui-card", 21)(222, "span", 22);
      \u0275\u0275text(223, "Perfil de Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(224, "div", 66);
      \u0275\u0275element(225, "ui-avatar", 67);
      \u0275\u0275elementStart(226, "div", 68)(227, "h4");
      \u0275\u0275text(228, "Mar\xEDa Garc\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(229, "p");
      \u0275\u0275text(230, "Desarrolladora Frontend");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(231, "div", 69)(232, "ui-badge", 45);
      \u0275\u0275text(233, "Pro");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(234, "ui-badge", 47);
      \u0275\u0275text(235, "Angular");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(236, "div", 23)(237, "ui-button", 24);
      \u0275\u0275text(238, "Mensaje");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(239, "ui-button", 25);
      \u0275\u0275text(240, "Seguir");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(241, "ui-card", 21)(242, "span", 22);
      \u0275\u0275text(243, "Estado del Servidor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(244, "div", 70)(245, "div", 71)(246, "span");
      \u0275\u0275text(247, "API Gateway");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(248, "ui-badge", 45);
      \u0275\u0275text(249, "Operativo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(250, "div", 71)(251, "span");
      \u0275\u0275text(252, "Base de Datos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(253, "ui-badge", 45);
      \u0275\u0275text(254, "Operativo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(255, "div", 71)(256, "span");
      \u0275\u0275text(257, "Cache");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(258, "ui-badge", 46);
      \u0275\u0275text(259, "Degradado");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(260, "div", 71)(261, "span");
      \u0275\u0275text(262, "CDN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(263, "ui-badge", 7);
      \u0275\u0275text(264, "Offline");
      \u0275\u0275elementEnd()()()()()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      \u0275\u0275advance(35);
      \u0275\u0275property("disabled", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("loading", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("loading", ctx.isLoading());
      \u0275\u0275advance(16);
      \u0275\u0275property("items", ctx.fruitItems)("debounceMs", 300);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_5_0 = ctx.lastFruitSelection()) ? 56 : 57, tmp_5_0);
      \u0275\u0275advance(29);
      \u0275\u0275property("clickable", true);
      \u0275\u0275advance(130);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(7, _c0));
    }
  }, dependencies: [
    ButtonComponent,
    CardComponent,
    AvatarComponent,
    BadgeComponent,
    SpinnerComponent,
    SkeletonComponent,
    SearchAutocompleteComponent
  ], styles: ["\n\n.showcase[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.showcase-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 3rem;\n  padding-bottom: 2rem;\n  border-bottom: 1px solid var(--ui-color-border, #e5e7eb);\n}\n.showcase-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin: 0 0 1rem 0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n}\n.showcase-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--ui-color-text-secondary, #6b7280);\n  margin: 0;\n  font-size: 1.125rem;\n}\n.section[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n  padding: 2rem;\n  background: var(--ui-color-surface, #ffffff);\n  border-radius: 1rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 1.5rem 0;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--ui-color-text, #1f2937);\n}\n.section-intro[_ngcontent-%COMP%] {\n  margin: -0.5rem 0 1.25rem 0;\n  font-size: 0.9375rem;\n  color: var(--ui-color-text-secondary, #6b7280);\n  line-height: 1.5;\n}\n.section-intro[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  padding: 0.1rem 0.35rem;\n  border-radius: 0.25rem;\n  background: var(--ui-color-surface-variant, #f3f4f6);\n}\n.search-meta[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0 0;\n  font-size: 0.875rem;\n}\n.text-secondary[_ngcontent-%COMP%] {\n  color: var(--ui-color-text-secondary, #6b7280);\n}\n.subsection[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding-top: 1.5rem;\n  border-top: 1px dashed var(--ui-color-border, #e5e7eb);\n}\n.subsection[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--ui-color-text-secondary, #6b7280);\n}\n.component-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.component-row.align-center[_ngcontent-%COMP%] {\n  align-items: center;\n}\n.cards-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}\n.avatar-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n.avatar-group[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--ui-color-text-secondary, #6b7280);\n}\n.spinner-demo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1rem;\n}\n.spinner-demo[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--ui-color-text-secondary, #6b7280);\n}\n.skeleton-demo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n  background: var(--ui-color-surface-variant, #f9fafb);\n  border-radius: 0.5rem;\n}\n.skeleton-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: flex-start;\n}\n.skeleton-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.skeleton-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.skeleton-list-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  padding: 0.75rem;\n  background: var(--ui-color-surface-variant, #f9fafb);\n  border-radius: 0.5rem;\n}\n.skeleton-list-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.user-profile[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n  align-items: center;\n}\n.user-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.user-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem 0;\n  color: var(--ui-color-text-secondary, #6b7280);\n  font-size: 0.875rem;\n}\n.user-badges[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.server-status[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.status-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--ui-color-border, #e5e7eb);\n}\n.status-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.status-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  font-weight: 500;\n}\n.colored-spinners[_ngcontent-%COMP%] {\n  background: var(--ui-color-surface-variant, #f9fafb);\n  padding: 1rem;\n  border-radius: 0.5rem;\n}\n/*# sourceMappingURL=ui-showcase.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UiShowcasePage, [{
    type: Component,
    args: [{ selector: "app-ui-showcase", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      ButtonComponent,
      CardComponent,
      AvatarComponent,
      BadgeComponent,
      SpinnerComponent,
      SkeletonComponent,
      SearchAutocompleteComponent
    ], template: `
    <div class="showcase">
      <header class="showcase-header">
        <h1>UI Components Showcase</h1>
        <p>Design System para IcePlay</p>
      </header>

      <!-- BUTTONS SECTION -->
      <section class="section">
        <h2>Buttons</h2>

        <div class="subsection">
          <h3>Variantes</h3>
          <div class="component-row">
            <ui-button variant="primary">Primary</ui-button>
            <ui-button variant="secondary">Secondary</ui-button>
            <ui-button variant="danger">Danger</ui-button>
            <ui-button variant="ghost">Ghost</ui-button>
          </div>
        </div>

        <div class="subsection">
          <h3>Tama\xF1os</h3>
          <div class="component-row align-center">
            <ui-button size="sm">Small</ui-button>
            <ui-button size="md">Medium</ui-button>
            <ui-button size="lg">Large</ui-button>
          </div>
        </div>

        <div class="subsection">
          <h3>Estados</h3>
          <div class="component-row">
            <ui-button [disabled]="true">Disabled</ui-button>
            <ui-button [loading]="true">Loading</ui-button>
            <ui-button [loading]="isLoading()" (clicked)="simulateLoading()"> Click me </ui-button>
          </div>
        </div>
      </section>

      <!-- REUSABLE: SEARCH AUTocomplete -->
      <section class="section">
        <h2>B\xFAsqueda con sugerencias (<code>ui-search-autocomplete</code>)</h2>
        <p class="section-intro">
          Autocomplete con debounce, panel solo tras escribir, y lista mock. Reutilizable con
          <code>[items]</code> y <code>(selected)</code>.
        </p>

        <ui-search-autocomplete
          [items]="fruitItems"
          label="Buscar frutas"
          placeholder="Escribe para filtrar\u2026"
          [debounceMs]="300"
          (selected)="onFruitSelected($event)"
        />

        @if (lastFruitSelection(); as pick) {
          <p class="search-meta text-secondary" role="status">
            Seleccionado: <strong>{{ pick.label }}</strong>
            @if (pick.subtitle) {
              <span> \u2014 {{ pick.subtitle }}</span>
            }
          </p>
        } @else {
          <p class="search-meta text-secondary">Escribe y pausa para ver sugerencias; elige una opci\xF3n.</p>
        }
      </section>

      <!-- CARDS SECTION -->
      <section class="section">
        <h2>Cards</h2>

        <div class="cards-grid">
          <ui-card variant="elevated">
            <span card-header>Elevated Card</span>
            <p>Esta es una card con sombra elevada. Perfecta para destacar contenido importante.</p>
            <div card-footer>
              <ui-button variant="ghost" size="sm">Cancelar</ui-button>
              <ui-button variant="primary" size="sm">Aceptar</ui-button>
            </div>
          </ui-card>

          <ui-card variant="outlined">
            <span card-header>Outlined Card</span>
            <p>Card con borde. Ideal para listas y contenido secundario.</p>
            <div card-footer>
              <ui-button variant="secondary" size="sm">Ver m\xE1s</ui-button>
            </div>
          </ui-card>

          <ui-card variant="flat">
            <span card-header>Flat Card</span>
            <p>Card sin sombra ni borde. \xDAtil para fondos con color.</p>
          </ui-card>

          <ui-card variant="elevated" [clickable]="true">
            <span card-header>Clickable Card \u2728</span>
            <p>Esta card tiene efecto hover. Pasa el mouse para ver la animaci\xF3n.</p>
          </ui-card>
        </div>
      </section>

      <!-- AVATARS SECTION -->
      <section class="section">
        <h2>Avatars</h2>

        <div class="subsection">
          <h3>Tama\xF1os</h3>
          <div class="component-row align-center">
            <ui-avatar name="Ana L\xF3pez" size="xs" />
            <ui-avatar name="Ana L\xF3pez" size="sm" />
            <ui-avatar name="Ana L\xF3pez" size="md" />
            <ui-avatar name="Ana L\xF3pez" size="lg" />
            <ui-avatar name="Ana L\xF3pez" size="xl" />
          </div>
        </div>

        <div class="subsection">
          <h3>Con Estado</h3>
          <div class="component-row align-center">
            <div class="avatar-group">
              <ui-avatar name="Carlos Garc\xEDa" size="lg" status="online" />
              <span>Online</span>
            </div>
            <div class="avatar-group">
              <ui-avatar name="Mar\xEDa Rodr\xEDguez" size="lg" status="away" />
              <span>Away</span>
            </div>
            <div class="avatar-group">
              <ui-avatar name="Pedro S\xE1nchez" size="lg" status="busy" />
              <span>Busy</span>
            </div>
            <div class="avatar-group">
              <ui-avatar name="Laura Mart\xEDnez" size="lg" status="offline" />
              <span>Offline</span>
            </div>
          </div>
        </div>

        <div class="subsection">
          <h3>Iniciales Autom\xE1ticas</h3>
          <div class="component-row align-center">
            <ui-avatar name="John" size="lg" />
            <ui-avatar name="Mar\xEDa Garc\xEDa" size="lg" />
            <ui-avatar name="Juan Carlos L\xF3pez" size="lg" />
            <ui-avatar name="" size="lg" />
          </div>
        </div>
      </section>

      <!-- BADGES SECTION -->
      <section class="section">
        <h2>Badges</h2>

        <div class="component-row">
          <ui-badge variant="default">Default</ui-badge>
          <ui-badge variant="success">Success</ui-badge>
          <ui-badge variant="warning">Warning</ui-badge>
          <ui-badge variant="danger">Danger</ui-badge>
          <ui-badge variant="info">Info</ui-badge>
        </div>

        <div class="subsection">
          <h3>Ejemplos de Uso</h3>
          <div class="component-row">
            <ui-badge variant="success">\u2713 Activo</ui-badge>
            <ui-badge variant="danger">\u2717 Eliminado</ui-badge>
            <ui-badge variant="warning">\u23F3 Pendiente</ui-badge>
            <ui-badge variant="info">\u{1F195} Nuevo</ui-badge>
            <ui-badge variant="default">v2.0.0</ui-badge>
          </div>
        </div>
      </section>

      <!-- SPINNERS SECTION -->
      <section class="section">
        <h2>Spinners</h2>

        <div class="component-row align-center">
          <div class="spinner-demo">
            <ui-spinner size="sm" />
            <span>Small</span>
          </div>
          <div class="spinner-demo">
            <ui-spinner size="md" />
            <span>Medium</span>
          </div>
          <div class="spinner-demo">
            <ui-spinner size="lg" />
            <span>Large</span>
          </div>
        </div>

        <div class="subsection">
          <h3>Con Color</h3>
          <div class="component-row align-center colored-spinners">
            <div class="spinner-demo" style="color: #3b82f6">
              <ui-spinner size="lg" />
              <span>Primary</span>
            </div>
            <div class="spinner-demo" style="color: #22c55e">
              <ui-spinner size="lg" />
              <span>Success</span>
            </div>
            <div class="spinner-demo" style="color: #ef4444">
              <ui-spinner size="lg" />
              <span>Danger</span>
            </div>
          </div>
        </div>
      </section>

      <!-- SKELETONS SECTION -->
      <section class="section">
        <h2>Skeletons</h2>

        <div class="subsection">
          <h3>Formas B\xE1sicas</h3>
          <div class="skeleton-demo">
            <ui-skeleton variant="rect" width="100%" height="100px" />
            <ui-skeleton variant="circle" width="60px" height="60px" />
            <ui-skeleton variant="text" width="80%" />
            <ui-skeleton variant="text" width="60%" />
          </div>
        </div>

        <div class="subsection">
          <h3>Ejemplo: Card Skeleton</h3>
          <ui-card variant="outlined">
            <div class="skeleton-card">
              <ui-skeleton variant="circle" width="56px" height="56px" />
              <div class="skeleton-content">
                <ui-skeleton variant="text" width="70%" height="1.25rem" />
                <ui-skeleton variant="text" width="50%" height="0.875rem" />
                <ui-skeleton variant="text" width="90%" height="0.875rem" />
              </div>
            </div>
          </ui-card>
        </div>

        <div class="subsection">
          <h3>Ejemplo: Lista Skeleton</h3>
          <div class="skeleton-list">
            @for (i of [1, 2, 3]; track i) {
              <div class="skeleton-list-item">
                <ui-skeleton variant="circle" width="40px" height="40px" />
                <div class="skeleton-list-content">
                  <ui-skeleton variant="text" width="60%" height="1rem" />
                  <ui-skeleton variant="text" width="40%" height="0.75rem" />
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- COMBINED EXAMPLES -->
      <section class="section">
        <h2>Ejemplos Combinados</h2>

        <div class="cards-grid">
          <ui-card variant="elevated">
            <span card-header>Perfil de Usuario</span>
            <div class="user-profile">
              <ui-avatar name="Mar\xEDa Garc\xEDa" size="xl" status="online" />
              <div class="user-info">
                <h4>Mar\xEDa Garc\xEDa</h4>
                <p>Desarrolladora Frontend</p>
                <div class="user-badges">
                  <ui-badge variant="success">Pro</ui-badge>
                  <ui-badge variant="info">Angular</ui-badge>
                </div>
              </div>
            </div>
            <div card-footer>
              <ui-button variant="ghost" size="sm">Mensaje</ui-button>
              <ui-button variant="primary" size="sm">Seguir</ui-button>
            </div>
          </ui-card>

          <ui-card variant="elevated">
            <span card-header>Estado del Servidor</span>
            <div class="server-status">
              <div class="status-item">
                <span>API Gateway</span>
                <ui-badge variant="success">Operativo</ui-badge>
              </div>
              <div class="status-item">
                <span>Base de Datos</span>
                <ui-badge variant="success">Operativo</ui-badge>
              </div>
              <div class="status-item">
                <span>Cache</span>
                <ui-badge variant="warning">Degradado</ui-badge>
              </div>
              <div class="status-item">
                <span>CDN</span>
                <ui-badge variant="danger">Offline</ui-badge>
              </div>
            </div>
          </ui-card>
        </div>
      </section>
    </div>
  `, styles: ["/* angular:styles/component:scss;ddb39489aaa9c846cc08952afd8f8330723d781186580812bdd6c0ed1792ea72;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/ui-dumb/pages/ui-showcase.page.ts */\n.showcase {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.showcase-header {\n  text-align: center;\n  margin-bottom: 3rem;\n  padding-bottom: 2rem;\n  border-bottom: 1px solid var(--ui-color-border, #e5e7eb);\n}\n.showcase-header h1 {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin: 0 0 1rem 0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n}\n.showcase-header p {\n  color: var(--ui-color-text-secondary, #6b7280);\n  margin: 0;\n  font-size: 1.125rem;\n}\n.section {\n  margin-bottom: 3rem;\n  padding: 2rem;\n  background: var(--ui-color-surface, #ffffff);\n  border-radius: 1rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.section h2 {\n  margin: 0 0 1.5rem 0;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--ui-color-text, #1f2937);\n}\n.section-intro {\n  margin: -0.5rem 0 1.25rem 0;\n  font-size: 0.9375rem;\n  color: var(--ui-color-text-secondary, #6b7280);\n  line-height: 1.5;\n}\n.section-intro code {\n  font-size: 0.8125rem;\n  padding: 0.1rem 0.35rem;\n  border-radius: 0.25rem;\n  background: var(--ui-color-surface-variant, #f3f4f6);\n}\n.search-meta {\n  margin: 0.5rem 0 0 0;\n  font-size: 0.875rem;\n}\n.text-secondary {\n  color: var(--ui-color-text-secondary, #6b7280);\n}\n.subsection {\n  margin-top: 1.5rem;\n  padding-top: 1.5rem;\n  border-top: 1px dashed var(--ui-color-border, #e5e7eb);\n}\n.subsection h3 {\n  margin: 0 0 1rem 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--ui-color-text-secondary, #6b7280);\n}\n.component-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.component-row.align-center {\n  align-items: center;\n}\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}\n.avatar-group {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n.avatar-group span {\n  font-size: 0.875rem;\n  color: var(--ui-color-text-secondary, #6b7280);\n}\n.spinner-demo {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1rem;\n}\n.spinner-demo span {\n  font-size: 0.875rem;\n  color: var(--ui-color-text-secondary, #6b7280);\n}\n.skeleton-demo {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n  background: var(--ui-color-surface-variant, #f9fafb);\n  border-radius: 0.5rem;\n}\n.skeleton-card {\n  display: flex;\n  gap: 1rem;\n  align-items: flex-start;\n}\n.skeleton-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.skeleton-list {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.skeleton-list-item {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  padding: 0.75rem;\n  background: var(--ui-color-surface-variant, #f9fafb);\n  border-radius: 0.5rem;\n}\n.skeleton-list-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.user-profile {\n  display: flex;\n  gap: 1.5rem;\n  align-items: center;\n}\n.user-info h4 {\n  margin: 0 0 0.25rem 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.user-info p {\n  margin: 0 0 0.75rem 0;\n  color: var(--ui-color-text-secondary, #6b7280);\n  font-size: 0.875rem;\n}\n.user-badges {\n  display: flex;\n  gap: 0.5rem;\n}\n.server-status {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.status-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--ui-color-border, #e5e7eb);\n}\n.status-item:last-child {\n  border-bottom: none;\n}\n.status-item span:first-child {\n  font-weight: 500;\n}\n.colored-spinners {\n  background: var(--ui-color-surface-variant, #f9fafb);\n  padding: 1rem;\n  border-radius: 0.5rem;\n}\n/*# sourceMappingURL=ui-showcase.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UiShowcasePage, { className: "UiShowcasePage", filePath: "src/app/features/ui-dumb/pages/ui-showcase.page.ts", lineNumber: 553 });
})();
export {
  UiShowcasePage
};
//# sourceMappingURL=chunk-HROZBXFU.js.map
