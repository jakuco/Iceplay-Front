import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenavModule,
  MatToolbarModule,
  ThemeService
} from "./chunk-QLOEP5MP.js";
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
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-N73HKLCH.js";
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatListModule,
  MatNavList
} from "./chunk-DRU5KYA4.js";
import "./chunk-7MBHIBBN.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-KLQVA5RB.js";
import "./chunk-UVODHWP6.js";
import "./chunk-VMJIIGHX.js";
import "./chunk-2C543PJY.js";
import "./chunk-DNCNJ5D2.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-XIJO5SZ4.js";
import {
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
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/super-admin/layouts/super-admin-layout.ts
var _c0 = () => ({ exact: true });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.route;
function SuperAdminLayout_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function SuperAdminLayout_For_19_Template_button_click_0_listener() {
      const theme_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.themeService.setTheme(theme_r4.key));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const theme_r4 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active-theme", ctx_r4.themeService.theme() === theme_r4.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(theme_r4.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(theme_r4.name);
  }
}
function SuperAdminLayout_For_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 30);
    \u0275\u0275listener("click", function SuperAdminLayout_For_47_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onNavClick());
    });
    \u0275\u0275elementStart(1, "mat-icon", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 32);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r7.route)("routerLinkActiveOptions", \u0275\u0275pureFunction0(4, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.label);
  }
}
var SuperAdminLayout = class _SuperAdminLayout {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  sidenavOpened = signal(true, __spreadValues({}, ngDevMode ? { debugName: "sidenavOpened" } : {}));
  sidenavMode = signal("side", __spreadValues({}, ngDevMode ? { debugName: "sidenavMode" } : {}));
  navItems = [
    { icon: "dashboard", label: "Dashboard", route: "/super-admin/dashboard" },
    { icon: "business", label: "Organizaciones", route: "/super-admin/organizations" },
    { icon: "campaign", label: "Anuncios", route: "/super-admin/announcements" },
    { icon: "people", label: "Administradores", route: "/super-admin/admins" },
    { icon: "analytics", label: "Reportes", route: "/super-admin/reports" },
    { icon: "settings", label: "Configuraci\xF3n", route: "/super-admin/settings" }
  ];
  constructor() {
    this.checkScreenSize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => this.checkScreenSize());
    }
  }
  checkScreenSize() {
    if (typeof window !== "undefined") {
      const isSmall = window.innerWidth < 1024;
      this.sidenavMode.set(isSmall ? "over" : "side");
      this.sidenavOpened.set(!isSmall);
    }
  }
  onNavClick() {
    if (this.sidenavMode() === "over") {
      this.sidenavOpened.set(false);
    }
  }
  static \u0275fac = function SuperAdminLayout_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SuperAdminLayout)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SuperAdminLayout, selectors: [["app-super-admin-layout"]], decls: 61, vars: 10, consts: [["themeMenu", "matMenu"], ["userMenu", "matMenu"], ["sidenav", ""], [1, "layout-wrapper"], [1, "top-header"], [1, "header-brand"], ["matIconButton", "", "aria-label", "Toggle menu", 3, "click"], ["routerLink", "/super-admin", 1, "logo"], [1, "ice"], [1, "badge", "super"], [1, "header-actions"], ["matIconButton", "", "matTooltip", "Cambiar tema", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "active-theme"], ["matIconButton", "", "matTooltip", "Mi cuenta", 3, "matMenuTriggerFor"], [1, "header-avatar", "super"], [1, "menu-header"], ["mat-menu-item", "", "routerLink", "/"], ["mat-menu-item", "", 3, "click"], [1, "sidenav-container"], [1, "sidenav", 3, "openedChange", "mode", "opened"], [1, "nav-list"], ["mat-list-item", "", "routerLinkActive", "active", 3, "routerLink", "routerLinkActiveOptions"], [1, "sidenav-footer"], [1, "user-info"], [1, "avatar", "super"], [1, "user-details"], [1, "user-name"], [1, "user-role"], [1, "content"], [1, "main-content"], ["mat-list-item", "", "routerLinkActive", "active", 3, "click", "routerLink", "routerLinkActiveOptions"], ["matListItemIcon", ""], ["matListItemTitle", ""]], template: function SuperAdminLayout_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 3)(1, "header", 4)(2, "div", 5)(3, "button", 6);
      \u0275\u0275listener("click", function SuperAdminLayout_Template_button_click_3_listener() {
        \u0275\u0275restoreView(_r1);
        const sidenav_r2 = \u0275\u0275reference(44);
        return \u0275\u0275resetView(sidenav_r2.toggle());
      });
      \u0275\u0275elementStart(4, "mat-icon");
      \u0275\u0275text(5, "menu");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "a", 7)(7, "span", 8);
      \u0275\u0275text(8, "ICE");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, "PLAY ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 9);
      \u0275\u0275text(11, "Fropen");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 10)(13, "button", 11)(14, "mat-icon");
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "mat-menu", null, 0);
      \u0275\u0275repeaterCreate(18, SuperAdminLayout_For_19_Template, 5, 4, "button", 12, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "button", 13)(21, "div", 14);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "mat-menu", null, 1)(25, "div", 15)(26, "strong");
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "span");
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(30, "mat-divider");
      \u0275\u0275elementStart(31, "a", 16)(32, "mat-icon");
      \u0275\u0275text(33, "public");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span");
      \u0275\u0275text(35, "Ver sitio p\xFAblico");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(36, "mat-divider");
      \u0275\u0275elementStart(37, "button", 17);
      \u0275\u0275listener("click", function SuperAdminLayout_Template_button_click_37_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.authService.logout());
      });
      \u0275\u0275elementStart(38, "mat-icon");
      \u0275\u0275text(39, "logout");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span");
      \u0275\u0275text(41, "Cerrar sesi\xF3n");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(42, "mat-sidenav-container", 18)(43, "mat-sidenav", 19, 2);
      \u0275\u0275listener("openedChange", function SuperAdminLayout_Template_mat_sidenav_openedChange_43_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.sidenavOpened.set($event));
      });
      \u0275\u0275elementStart(45, "mat-nav-list", 20);
      \u0275\u0275repeaterCreate(46, SuperAdminLayout_For_47_Template, 5, 5, "a", 21, _forTrack1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 22);
      \u0275\u0275element(49, "mat-divider");
      \u0275\u0275elementStart(50, "div", 23)(51, "div", 24);
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "div", 25)(54, "span", 26);
      \u0275\u0275text(55);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "span", 27);
      \u0275\u0275text(57, "Super Administrador");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(58, "mat-sidenav-content", 28)(59, "main", 29);
      \u0275\u0275element(60, "router-outlet");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_9_0;
      const themeMenu_r8 = \u0275\u0275reference(17);
      const userMenu_r9 = \u0275\u0275reference(24);
      \u0275\u0275advance(13);
      \u0275\u0275property("matMenuTriggerFor", themeMenu_r8);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.themeService.themeConfig().icon);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.themeService.availableThemes);
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", userMenu_r9);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.authService.userInitials());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.authService.userFullName());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate((tmp_9_0 = ctx.authService.user()) == null ? null : tmp_9_0.email);
      \u0275\u0275advance(14);
      \u0275\u0275property("mode", ctx.sidenavMode())("opened", ctx.sidenavOpened());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.navItems);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.authService.userInitials());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.authService.userFullName());
    }
  }, dependencies: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbarModule,
    MatListModule,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatDivider,
    MatListItemTitle,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatIconButton,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDividerModule,
    MatTooltipModule,
    MatTooltip
  ], styles: ["\n\n.layout-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n}\n.top-header[_ngcontent-%COMP%] {\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 0.5rem;\n  background: var(--mat-sys-surface-container);\n  flex-shrink: 0;\n  z-index: 1000;\n}\n.header-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.header-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.75rem;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.header-avatar.super[_ngcontent-%COMP%] {\n  background: var(--mat-sys-tertiary);\n  color: var(--mat-sys-on-tertiary);\n}\n.logo[_ngcontent-%COMP%] {\n  font-family: var(--iceplay-wordmark-font-family);\n  font-style: var(--iceplay-wordmark-font-style);\n  font-weight: var(--iceplay-wordmark-font-weight);\n  font-size: 1.25rem;\n  letter-spacing: 0.09em;\n  text-decoration: none;\n  color: inherit;\n}\n.logo[_ngcontent-%COMP%]   .ice[_ngcontent-%COMP%] {\n  color: #7dd3fc;\n  text-shadow: 0 0 10px rgba(125, 211, 252, 0.5);\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.5625rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  padding: 0.2rem 0.5rem;\n  border-radius: 4px;\n}\n.badge.super[_ngcontent-%COMP%] {\n  background: var(--mat-sys-tertiary);\n  color: var(--mat-sys-on-tertiary);\n}\n.fropen-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  padding-left: 0.5rem;\n  border-left: 1px solid var(--mat-sys-outline-variant);\n}\n.sidenav-container[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: hidden;\n}\n.sidenav[_ngcontent-%COMP%] {\n  width: 240px;\n  background: var(--mat-sys-surface-container);\n  border-radius: 0;\n}\n  .mat-drawer-inner-container {\n  border-radius: 0 !important;\n}\n.nav-list[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n}\n.nav-list[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  margin-bottom: 2px;\n}\n.nav-list[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);\n  color: var(--mat-sys-primary);\n}\n.nav-list[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--mat-sys-tertiary);\n}\n  .nav-list .mat-mdc-list-item:not(.active) {\n  background: transparent !important;\n}\n  .nav-list .mat-mdc-list-item:not(.active)::before, \n  .nav-list .mat-mdc-list-item:not(.active)::after, \n  .nav-list .mat-mdc-list-item:not(.active) .mat-mdc-focus-indicator::before, \n  .nav-list .mat-mdc-list-item:not(.active) .mdc-list-item__ripple::before, \n  .nav-list .mat-mdc-list-item:not(.active) .mat-ripple-element, \n  .nav-list .mat-mdc-list-item:not(.active) .mdc-list-item__start::before, \n  .nav-list .mat-mdc-list-item:not(.active) .mdc-list-item__end::before {\n  background: transparent !important;\n  opacity: 0 !important;\n}\n  .nav-list .mat-mdc-list-item:not(.active) {\n}\n  .nav-list .mat-mdc-list-item:not(.active):focus, \n  .nav-list .mat-mdc-list-item:not(.active):hover, \n  .nav-list .mat-mdc-list-item:not(.active):active, \n  .nav-list .mat-mdc-list-item:not(.active).cdk-focused, \n  .nav-list .mat-mdc-list-item:not(.active).cdk-keyboard-focused, \n  .nav-list .mat-mdc-list-item:not(.active).cdk-program-focused, \n  .nav-list .mat-mdc-list-item:not(.active).mat-mdc-list-item-interactive:focus, \n  .nav-list .mat-mdc-list-item:not(.active).mat-mdc-list-item-interactive:hover {\n  background: transparent !important;\n}\n  .nav-list .mat-mdc-list-item:not(.active):focus::before, \n  .nav-list .mat-mdc-list-item:not(.active):hover::before, \n  .nav-list .mat-mdc-list-item:not(.active):active::before, \n  .nav-list .mat-mdc-list-item:not(.active).cdk-focused::before, \n  .nav-list .mat-mdc-list-item:not(.active).cdk-keyboard-focused::before, \n  .nav-list .mat-mdc-list-item:not(.active).cdk-program-focused::before, \n  .nav-list .mat-mdc-list-item:not(.active).mat-mdc-list-item-interactive:focus::before, \n  .nav-list .mat-mdc-list-item:not(.active).mat-mdc-list-item-interactive:hover::before {\n  opacity: 0 !important;\n}\n  .nav-list .mat-mdc-list-item.active {\n  background: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent) !important;\n}\n  .nav-list .mat-mdc-list-item.active .mdc-list-item__primary-text {\n  color: var(--mat-sys-primary) !important;\n}\n  .nav-list .mat-mdc-list-item.active .mat-icon {\n  color: var(--mat-sys-primary) !important;\n}\n.sidenav-footer[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: var(--mat-sys-surface-container);\n}\n.user-info[_ngcontent-%COMP%] {\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.8rem;\n}\n.avatar.super[_ngcontent-%COMP%] {\n  background: var(--mat-sys-tertiary);\n  color: var(--mat-sys-on-tertiary);\n}\n.user-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 0.875rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: var(--mat-sys-surface);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n}\n.menu-header[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.menu-header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.menu-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.active-theme[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);\n}\n/*# sourceMappingURL=super-admin-layout.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SuperAdminLayout, [{
    type: Component,
    args: [{ selector: "app-super-admin-layout", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatDividerModule,
      MatTooltipModule
    ], template: `
    <div class="layout-wrapper">
      <!-- Top Header Bar (spans full width) -->
      <header class="top-header">
        <div class="header-brand">
          <button matIconButton (click)="sidenav.toggle()" aria-label="Toggle menu">
            <mat-icon>menu</mat-icon>
          </button>
          <a routerLink="/super-admin" class="logo"> <span class="ice">ICE</span>PLAY </a>
          <span class="badge super">Fropen</span>
          <!-- <span class="fropen-label">Fropen</span> -->
        </div>
        <div class="header-actions">
          <!-- Theme Toggle -->
          <button matIconButton [matMenuTriggerFor]="themeMenu" matTooltip="Cambiar tema">
            <mat-icon>{{ themeService.themeConfig().icon }}</mat-icon>
          </button>
          <mat-menu #themeMenu="matMenu">
            @for (theme of themeService.availableThemes; track theme.key) {
              <button
                mat-menu-item
                (click)="themeService.setTheme(theme.key)"
                [class.active-theme]="themeService.theme() === theme.key"
              >
                <mat-icon>{{ theme.icon }}</mat-icon>
                <span>{{ theme.name }}</span>
              </button>
            }
          </mat-menu>

          <!-- User Menu -->
          <button matIconButton [matMenuTriggerFor]="userMenu" matTooltip="Mi cuenta">
            <div class="header-avatar super">{{ authService.userInitials() }}</div>
          </button>
          <mat-menu #userMenu="matMenu">
            <div class="menu-header">
              <strong>{{ authService.userFullName() }}</strong>
              <span>{{ authService.user()?.email }}</span>
            </div>
            <mat-divider />
            <a mat-menu-item routerLink="/">
              <mat-icon>public</mat-icon>
              <span>Ver sitio p\xFAblico</span>
            </a>
            <mat-divider />
            <button mat-menu-item (click)="authService.logout()">
              <mat-icon>logout</mat-icon>
              <span>Cerrar sesi\xF3n</span>
            </button>
          </mat-menu>
        </div>
      </header>

      <!-- Body: Sidenav + Content -->
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav
          #sidenav
          [mode]="sidenavMode()"
          [opened]="sidenavOpened()"
          (openedChange)="sidenavOpened.set($event)"
          class="sidenav"
        >
          <!-- Navigation -->
          <mat-nav-list class="nav-list">
            @for (item of navItems; track item.route) {
              <a
                mat-list-item
                [routerLink]="item.route"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="onNavClick()"
              >
                <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                <span matListItemTitle>{{ item.label }}</span>
              </a>
            }
          </mat-nav-list>

          <div class="sidenav-footer">
            <mat-divider />
            <div class="user-info">
              <div class="avatar super">{{ authService.userInitials() }}</div>
              <div class="user-details">
                <span class="user-name">{{ authService.userFullName() }}</span>
                <span class="user-role">Super Administrador</span>
              </div>
            </div>
          </div>
        </mat-sidenav>

        <!-- Main Content -->
        <mat-sidenav-content class="content">
          <main class="main-content">
            <router-outlet />
          </main>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `, styles: ["/* angular:styles/component:scss;c0f609e594231333f25e110982ca3dd05a638cda4f60c7cc416f5e6eb6e6affe;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/super-admin/layouts/super-admin-layout.ts */\n.layout-wrapper {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n}\n.top-header {\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 0.5rem;\n  background: var(--mat-sys-surface-container);\n  flex-shrink: 0;\n  z-index: 1000;\n}\n.header-brand {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.header-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.75rem;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.header-avatar.super {\n  background: var(--mat-sys-tertiary);\n  color: var(--mat-sys-on-tertiary);\n}\n.logo {\n  font-family: var(--iceplay-wordmark-font-family);\n  font-style: var(--iceplay-wordmark-font-style);\n  font-weight: var(--iceplay-wordmark-font-weight);\n  font-size: 1.25rem;\n  letter-spacing: 0.09em;\n  text-decoration: none;\n  color: inherit;\n}\n.logo .ice {\n  color: #7dd3fc;\n  text-shadow: 0 0 10px rgba(125, 211, 252, 0.5);\n}\n.badge {\n  font-size: 0.5625rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  padding: 0.2rem 0.5rem;\n  border-radius: 4px;\n}\n.badge.super {\n  background: var(--mat-sys-tertiary);\n  color: var(--mat-sys-on-tertiary);\n}\n.fropen-label {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  padding-left: 0.5rem;\n  border-left: 1px solid var(--mat-sys-outline-variant);\n}\n.sidenav-container {\n  flex: 1;\n  overflow: hidden;\n}\n.sidenav {\n  width: 240px;\n  background: var(--mat-sys-surface-container);\n  border-radius: 0;\n}\n::ng-deep .mat-drawer-inner-container {\n  border-radius: 0 !important;\n}\n.nav-list {\n  padding: 0.5rem;\n}\n.nav-list a {\n  border-radius: 8px;\n  margin-bottom: 2px;\n}\n.nav-list a.active {\n  background: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);\n  color: var(--mat-sys-primary);\n}\n.nav-list a.active mat-icon {\n  color: var(--mat-sys-tertiary);\n}\n::ng-deep .nav-list .mat-mdc-list-item:not(.active) {\n  background: transparent !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item:not(.active)::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active)::after,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active) .mat-mdc-focus-indicator::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active) .mdc-list-item__ripple::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active) .mat-ripple-element,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active) .mdc-list-item__start::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active) .mdc-list-item__end::before {\n  background: transparent !important;\n  opacity: 0 !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item:not(.active) {\n}\n::ng-deep .nav-list .mat-mdc-list-item:not(.active):focus,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active):hover,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active):active,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active).cdk-focused,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active).cdk-keyboard-focused,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active).cdk-program-focused,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active).mat-mdc-list-item-interactive:focus,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active).mat-mdc-list-item-interactive:hover {\n  background: transparent !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item:not(.active):focus::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active):hover::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active):active::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active).cdk-focused::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active).cdk-keyboard-focused::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active).cdk-program-focused::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active).mat-mdc-list-item-interactive:focus::before,\n::ng-deep .nav-list .mat-mdc-list-item:not(.active).mat-mdc-list-item-interactive:hover::before {\n  opacity: 0 !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item.active {\n  background: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent) !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item.active .mdc-list-item__primary-text {\n  color: var(--mat-sys-primary) !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item.active .mat-icon {\n  color: var(--mat-sys-primary) !important;\n}\n.sidenav-footer {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: var(--mat-sys-surface-container);\n}\n.user-info {\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.8rem;\n}\n.avatar.super {\n  background: var(--mat-sys-tertiary);\n  color: var(--mat-sys-on-tertiary);\n}\n.user-details {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.user-name {\n  font-weight: 500;\n  font-size: 0.875rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-role {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.content {\n  display: flex;\n  flex-direction: column;\n  background: var(--mat-sys-surface);\n}\n.main-content {\n  flex: 1;\n  overflow-y: auto;\n}\n.menu-header {\n  padding: 0.75rem 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.menu-header strong {\n  font-size: 0.875rem;\n}\n.menu-header span {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n.active-theme {\n  background: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);\n}\n/*# sourceMappingURL=super-admin-layout.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SuperAdminLayout, { className: "SuperAdminLayout", filePath: "src/app/features/super-admin/layouts/super-admin-layout.ts", lineNumber: 386 });
})();
export {
  SuperAdminLayout as default
};
//# sourceMappingURL=chunk-2FIHNOG7.js.map
