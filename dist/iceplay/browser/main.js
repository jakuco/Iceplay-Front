import {
  toSignal
} from "./chunk-7Z6AS4NN.js";
import {
  I18nService,
  TranslatePipe
} from "./chunk-GT3UWJGO.js";
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
  MatToolbar,
  ThemeService
} from "./chunk-VA2U2E6L.js";
import "./chunk-NCLKHHOL.js";
import {
  MatTooltip
} from "./chunk-VHW6UJNI.js";
import {
  AuthService
} from "./chunk-54UBGRYG.js";
import "./chunk-DYTKA3GQ.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-URAQ4NZC.js";
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatNavList
} from "./chunk-K6FV3QT6.js";
import "./chunk-DXQNO7KC.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-DRXFEHG3.js";
import "./chunk-OXFAHERR.js";
import "./chunk-LDEMS5LB.js";
import "./chunk-YBE5VDY6.js";
import "./chunk-WFKBK73W.js";
import {
  MatButtonModule,
  MatIconButton
} from "./chunk-AE6CM25K.js";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  provideRouter,
  withComponentInputBinding
} from "./chunk-ORPODLRN.js";
import {
  HttpContextToken,
  MatIcon,
  MatIconModule,
  bootstrapApplication,
  provideHttpClient,
  withInterceptors
} from "./chunk-YOLGDFC3.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  catchError,
  computed,
  effect,
  filter,
  from,
  inject,
  map,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  setClassMetadata,
  signal,
  switchMap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-F7WKCRHW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/core/guards/auth.guard.ts
var authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return from(auth.ensureBootstrapped()).pipe(map(() => auth.isAuthenticated() ? true : router.createUrlTree(["/auth/login"])));
};

// src/app/core/guards/admin.guard.ts
var adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAdmin() || authService.isSuperAdmin()) {
    return true;
  }
  return router.createUrlTree(["/"]);
};

// src/app/core/guards/super-admin.guard.ts
var superAdminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isSuperAdmin()) {
    return true;
  }
  if (authService.isAdmin()) {
    return router.createUrlTree(["/admin"]);
  }
  return router.createUrlTree(["/"]);
};

// src/app/core/guards/public.guard.ts
var publicGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  console.log("publicGuard");
  return from(auth.ensureBootstrapped()).pipe(map(() => {
    if (!auth.isAuthenticated()) {
      return true;
    }
    return router.createUrlTree([auth.getDefaultRoute()]);
  }));
};

// src/app/app.routes.ts
var routes = [
  //* Auth routes (login) - only for non-authenticated users
  {
    path: "auth",
    canActivate: [publicGuard],
    loadChildren: () => import("./chunk-C7FM7EIE.js")
  },
  //* Super Admin routes - requires super_admin role
  {
    path: "super-admin",
    canActivate: [authGuard, superAdminGuard],
    loadChildren: () => import("./chunk-3EMXAQIG.js")
  },
  //* Admin routes - requires admin or super_admin role
  {
    path: "admin",
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import("./chunk-DH4QSZCC.js")
  },
  //* Public routes (existing)
  // {
  //   path: 'team/:teamId',
  //   pathMatch: 'full',
  //   loadComponent: () => import("./features/team/pages/details/team-details.page")
  // },
  {
    path: "match/:matchId",
    loadComponent: () => import("./chunk-6FNKXDWP.js"),
    title: "Match Details"
  },
  {
    path: "live-match",
    loadComponent: () => import("./chunk-7XZZZRSK.js"),
    title: "Live Match Logger"
  },
  {
    path: "matches",
    loadComponent: () => import("./chunk-7ED75M2H.js"),
    title: "Matches"
  },
  {
    path: "team/:id",
    loadComponent: () => import("./chunk-K3ZIY4JM.js"),
    title: "Team Detail"
  },
  {
    path: "player/:id",
    loadComponent: () => import("./chunk-B7S5DTUL.js"),
    title: "Player Detail"
  },
  {
    path: "championship/:id",
    loadComponent: () => import("./chunk-GMYPR7WD.js"),
    title: "Championship Detail"
  },
  {
    path: "ui-showcase",
    loadComponent: () => import("./chunk-M7LQRKFC.js").then((m) => m.UiShowcasePage),
    title: "UI Showcase - IcePlay"
  },
  {
    path: "cup/:cupName",
    loadComponent: () => import("./chunk-QEZHBB27.js"),
    title: "Cup Overview - IcePlay"
  },
  //* Catch-all redirect
  {
    path: "**",
    redirectTo: "matches"
  }
];

// src/app/core/interceptors/auth.interceptor.ts
var retriedAfterRefresh = new HttpContextToken(() => false);
var skipBearerAndRefreshOn401 = /\/auth\/(login|refresh|logout)(?:\?|#|$)/i;
var authInterceptor = (req, next) => {
  if (skipBearerAndRefreshOn401.test(req.url)) {
    return next(req);
  }
  const auth = inject(AuthService);
  const token = auth.getAccessToken()();
  const reqWithAuth = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(reqWithAuth).pipe(catchError((err) => {
    if (err.status !== 401 || req.context.get(retriedAfterRefresh)) {
      return throwError(() => err);
    }
    return from(auth.rotateAccessToken()).pipe(switchMap(() => {
      const nextToken = auth.getAccessToken()();
      if (!nextToken) {
        return throwError(() => err);
      }
      return next(req.clone({
        setHeaders: { Authorization: `Bearer ${nextToken}` },
        context: req.context.set(retriedAfterRefresh, true)
      }));
    }), catchError(() => throwError(() => err)));
  }));
};

// src/app/app.config.ts
function kickOffAuthBootstrap() {
  console.log("kickOffAuthBootstrap");
  void inject(AuthService).ensureBootstrapped();
}
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(kickOffAuthBootstrap)
  ]
};

// src/app/layouts/header/components/header-actions/header-actions.ts
var _forTrack0 = ($index, $item) => $item.key;
function HeaderActions_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 3)(1, "mat-icon");
    \u0275\u0275text(2, "admin_panel_settings");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", ctx_r0.authService.getDefaultRoute());
  }
}
function HeaderActions_For_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 11);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function HeaderActions_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function HeaderActions_For_8_Template_button_click_0_listener() {
      const theme_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.themeService.setTheme(theme_r3.key));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, HeaderActions_For_8_Conditional_5_Template, 2, 0, "mat-icon", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const theme_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active-theme", ctx_r0.themeService.theme() === theme_r3.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(theme_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(theme_r3.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.themeService.theme() === theme_r3.key ? 5 : -1);
  }
}
function HeaderActions_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.authService.userInitials());
  }
}
function HeaderActions_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "person_outline");
    \u0275\u0275elementEnd();
  }
}
function HeaderActions_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 9)(1, "mat-icon");
    \u0275\u0275text(2, "login");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Iniciar sesi\xF3n");
    \u0275\u0275elementEnd()();
  }
}
function HeaderActions_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "mat-divider");
    \u0275\u0275elementStart(6, "a", 14)(7, "mat-icon");
    \u0275\u0275text(8, "dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Panel de Control");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(11, "mat-divider");
    \u0275\u0275elementStart(12, "button", 10);
    \u0275\u0275listener("click", function HeaderActions_Conditional_15_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.authService.logout());
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "logout");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Cerrar sesi\xF3n");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.authService.userFullName());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.authService.isSuperAdmin() ? "Super Admin" : "Administrador", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", ctx_r0.authService.getDefaultRoute());
  }
}
var HeaderActions = class _HeaderActions {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  static \u0275fac = function HeaderActions_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderActions)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderActions, selectors: [["app-header-actions"]], decls: 16, vars: 6, consts: [["themeMenu", "matMenu"], ["userMenu", "matMenu"], [1, "flex", "items-center", "gap-1"], ["matIconButton", "", "aria-label", "Panel de Administraci\xF3n", 3, "routerLink"], ["matIconButton", "", "aria-label", "Cambiar tema", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "active-theme"], ["matIconButton", "", "aria-label", "Men\xFA de usuario", 3, "matMenuTriggerFor"], [1, "user-avatar"], ["xPosition", "before"], ["mat-menu-item", "", "routerLink", "/auth/login"], ["mat-menu-item", "", 3, "click"], [1, "check-icon"], [1, "menu-header"], [1, "user-role"], ["mat-menu-item", "", 3, "routerLink"]], template: function HeaderActions_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2);
      \u0275\u0275conditionalCreate(1, HeaderActions_Conditional_1_Template, 3, 1, "button", 3);
      \u0275\u0275elementStart(2, "button", 4)(3, "mat-icon");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "mat-menu", null, 0);
      \u0275\u0275repeaterCreate(7, HeaderActions_For_8_Template, 6, 5, "button", 5, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 6);
      \u0275\u0275conditionalCreate(10, HeaderActions_Conditional_10_Template, 2, 1, "div", 7)(11, HeaderActions_Conditional_11_Template, 2, 0, "mat-icon");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "mat-menu", 8, 1);
      \u0275\u0275conditionalCreate(14, HeaderActions_Conditional_14_Template, 5, 0, "a", 9)(15, HeaderActions_Conditional_15_Template, 17, 3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const themeMenu_r5 = \u0275\u0275reference(6);
      const userMenu_r6 = \u0275\u0275reference(13);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.authService.isAuthenticated() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("matMenuTriggerFor", themeMenu_r5);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.themeService.themeConfig().icon);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.themeService.availableThemes);
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", userMenu_r6);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.authService.isAuthenticated() ? 10 : 11);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.authService.isAuthenticated() ? 14 : 15);
    }
  }, dependencies: [MatButtonModule, MatIconButton, MatIconModule, MatIcon, MatMenuModule, MatMenu, MatMenuItem, MatMenuTrigger, MatDividerModule, MatDivider, RouterLink], styles: ["\n\n.active-theme[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);\n}\n.check-icon[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: var(--mat-sys-primary);\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--mat-sys-primary);\n  color: var(--mat-sys-on-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.75rem;\n}\n.menu-header[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n}\n.menu-header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.menu-header[_ngcontent-%COMP%]   .user-role[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n/*# sourceMappingURL=header-actions.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderActions, [{
    type: Component,
    args: [{ selector: "app-header-actions", changeDetection: ChangeDetectionStrategy.OnPush, imports: [MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, RouterLink], template: `
    <div class="flex items-center gap-1">
      <!-- Admin Panel Link (only for authenticated users) -->
      @if (authService.isAuthenticated()) {
        <button
          matIconButton
          [routerLink]="authService.getDefaultRoute()"
          aria-label="Panel de Administraci\xF3n"
        >
          <mat-icon>admin_panel_settings</mat-icon>
        </button>
      }

      <!-- Theme Toggle -->
      <button matIconButton [matMenuTriggerFor]="themeMenu" aria-label="Cambiar tema">
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
            @if (themeService.theme() === theme.key) {
              <mat-icon class="check-icon">check</mat-icon>
            }
          </button>
        }
      </mat-menu>

      <!-- User Menu -->
      <button matIconButton [matMenuTriggerFor]="userMenu" aria-label="Men\xFA de usuario">
        @if (authService.isAuthenticated()) {
          <div class="user-avatar">{{ authService.userInitials() }}</div>
        } @else {
          <mat-icon>person_outline</mat-icon>
        }
      </button>

      <mat-menu #userMenu="matMenu" xPosition="before">
        @if (!authService.isAuthenticated()) {
          <a mat-menu-item routerLink="/auth/login">
            <mat-icon>login</mat-icon>
            <span>Iniciar sesi\xF3n</span>
          </a>
        } @else {
          <div class="menu-header">
            <strong>{{ authService.userFullName() }}</strong>
            <span class="user-role">
              {{ authService.isSuperAdmin() ? 'Super Admin' : 'Administrador' }}
            </span>
          </div>
          <mat-divider />
          <a mat-menu-item [routerLink]="authService.getDefaultRoute()">
            <mat-icon>dashboard</mat-icon>
            <span>Panel de Control</span>
          </a>
          <mat-divider />
          <button mat-menu-item (click)="authService.logout()">
            <mat-icon>logout</mat-icon>
            <span>Cerrar sesi\xF3n</span>
          </button>
        }
      </mat-menu>
    </div>
  `, styles: ["/* angular:styles/component:scss;42dafed1c714f7f9a468465e3e09803e8407ce4621cc9f6e6be39c1b7df5c5e6;D:/Fropen/Iceplay/Iceplay-Front/src/app/layouts/header/components/header-actions/header-actions.ts */\n.active-theme {\n  background-color: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);\n}\n.check-icon {\n  margin-left: auto;\n  color: var(--mat-sys-primary);\n}\n.user-avatar {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--mat-sys-primary);\n  color: var(--mat-sys-on-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.75rem;\n}\n.menu-header {\n  padding: 0.75rem 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n}\n.menu-header strong {\n  font-size: 0.875rem;\n}\n.menu-header .user-role {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n}\n/*# sourceMappingURL=header-actions.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderActions, { className: "HeaderActions", filePath: "src/app/layouts/header/components/header-actions/header-actions.ts", lineNumber: 123 });
})();

// src/app/layouts/header/components/language-selector/language-selector.ts
var _forTrack02 = ($index, $item) => $item.code;
function LanguageSelectorComponent_For_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 4);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function LanguageSelectorComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function LanguageSelectorComponent_For_7_Template_button_click_0_listener() {
      const lang_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.i18nService.setLanguage(lang_r2.code));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, LanguageSelectorComponent_For_7_Conditional_5_Template, 2, 0, "mat-icon", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lang_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active-lang", ctx_r2.i18nService.language() === lang_r2.code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lang_r2.flag);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lang_r2.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.i18nService.language() === lang_r2.code ? 5 : -1);
  }
}
var LanguageSelectorComponent = class _LanguageSelectorComponent {
  i18nService = inject(I18nService);
  static \u0275fac = function LanguageSelectorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LanguageSelectorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LanguageSelectorComponent, selectors: [["app-language-selector"]], decls: 8, vars: 4, consts: [["langMenu", "matMenu"], ["matIconButton", "", "aria-label", "Cambiar idioma", 3, "matMenuTriggerFor", "matTooltip"], ["mat-menu-item", "", 3, "active-lang"], ["mat-menu-item", "", 3, "click"], [1, "check-icon"]], template: function LanguageSelectorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "button", 1);
      \u0275\u0275pipe(1, "translate");
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "language");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "mat-menu", null, 0);
      \u0275\u0275repeaterCreate(6, LanguageSelectorComponent_For_7_Template, 6, 5, "button", 2, _forTrack02);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const langMenu_r4 = \u0275\u0275reference(5);
      \u0275\u0275property("matMenuTriggerFor", langMenu_r4)("matTooltip", \u0275\u0275pipeBind1(1, 2, "header.changeLanguage"));
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.i18nService.availableLanguages);
    }
  }, dependencies: [MatIcon, MatIconButton, MatMenu, MatMenuItem, MatMenuTrigger, MatTooltip, TranslatePipe], styles: ["\n\n.active-lang[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);\n}\n.check-icon[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 1.25rem;\n  width: 1.25rem;\n  height: 1.25rem;\n}\n/*# sourceMappingURL=language-selector.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LanguageSelectorComponent, [{
    type: Component,
    args: [{ selector: "app-language-selector", changeDetection: ChangeDetectionStrategy.OnPush, imports: [MatIcon, MatIconButton, MatMenu, MatMenuItem, MatMenuTrigger, MatTooltip, TranslatePipe], template: `
    <button
      matIconButton
      [matMenuTriggerFor]="langMenu"
      [matTooltip]="'header.changeLanguage' | translate"
      aria-label="Cambiar idioma"
    >
      <mat-icon>language</mat-icon>
    </button>
    <mat-menu #langMenu="matMenu">
      @for (lang of i18nService.availableLanguages; track lang.code) {
        <button
          mat-menu-item
          (click)="i18nService.setLanguage(lang.code)"
          [class.active-lang]="i18nService.language() === lang.code"
        >
          <span>{{ lang.flag }}</span>
          <span>{{ lang.label }}</span>
          @if (i18nService.language() === lang.code) {
            <mat-icon class="check-icon">check</mat-icon>
          }
        </button>
      }
    </mat-menu>
  `, styles: ["/* angular:styles/component:scss;9ab953af294814c06029009a84a42ec25cc4d15d63a27aeac7ef0d9f1fc87a84;D:/Fropen/Iceplay/Iceplay-Front/src/app/layouts/header/components/language-selector/language-selector.ts */\n.active-lang {\n  background: color-mix(in srgb, var(--mat-sys-primary) 15%, transparent);\n}\n.check-icon {\n  margin-left: auto;\n  font-size: 1.25rem;\n  width: 1.25rem;\n  height: 1.25rem;\n}\n/*# sourceMappingURL=language-selector.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LanguageSelectorComponent, { className: "LanguageSelectorComponent", filePath: "src/app/layouts/header/components/language-selector/language-selector.ts", lineNumber: 55 });
})();

// src/app/core/services/sidenav.service.ts
var SidenavService = class _SidenavService {
  _opened = signal(false, __spreadValues({}, ngDevMode ? { debugName: "_opened" } : {}));
  _mode = signal("over", __spreadValues({}, ngDevMode ? { debugName: "_mode" } : {}));
  /** Read-only signal for sidenav open state */
  opened = this._opened.asReadonly();
  /** Read-only signal for sidenav mode */
  mode = this._mode.asReadonly();
  /** Computed signal combining state for templates */
  isOverlay = computed(() => this._mode() === "over", __spreadValues({}, ngDevMode ? { debugName: "isOverlay" } : {}));
  open() {
    this._opened.set(true);
  }
  close() {
    this._opened.set(false);
  }
  toggle() {
    this._opened.update((opened) => !opened);
  }
  setMode(mode) {
    this._mode.set(mode);
  }
  /** Update mode based on screen width - call from components that need responsive behavior */
  updateModeForScreenWidth(width, breakpoint = 1024) {
    const newMode = width < breakpoint ? "over" : "side";
    this._mode.set(newMode);
    if (newMode === "over") {
      this._opened.set(false);
    } else {
      this._opened.set(true);
    }
  }
  static \u0275fac = function SidenavService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidenavService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SidenavService, factory: _SidenavService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidenavService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/layouts/header/header.ts
var Header = class _Header {
  sidenavService = inject(SidenavService);
  static \u0275fac = function Header_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Header)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Header, selectors: [["app-header"]], decls: 17, vars: 3, consts: [[1, "px-2!", "shadow-md", "sm:px-4!"], ["matIconButton", "", 1, "menu-button", 3, "click"], ["routerLink", "/", 1, "logo"], [1, "hidden", "sm:inline"], [1, "ice"], [1, "sm:hidden"], [1, "flex-1"]], template: function Header_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-toolbar", 0)(1, "button", 1);
      \u0275\u0275pipe(2, "translate");
      \u0275\u0275listener("click", function Header_Template_button_click_1_listener() {
        return ctx.sidenavService.toggle();
      });
      \u0275\u0275elementStart(3, "mat-icon");
      \u0275\u0275text(4, "menu");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "a", 2)(6, "span", 3)(7, "span", 4);
      \u0275\u0275text(8, "ICE");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, "PLAY");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 5)(11, "span", 4);
      \u0275\u0275text(12, "I");
      \u0275\u0275elementEnd();
      \u0275\u0275text(13, "P");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(14, "span", 6)(15, "app-language-selector")(16, "app-header-actions");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(2, 1, "header.openSportsMenu"));
    }
  }, dependencies: [MatToolbar, MatIconButton, MatIcon, HeaderActions, LanguageSelectorComponent, RouterLink, TranslatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n}\n  mat-toolbar {\n  background: var(--mat-sys-surface-container) !important;\n  color: var(--mat-sys-on-secondary-container) !important;\n}\n.menu-button[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.logo[_ngcontent-%COMP%] {\n  font-family: var(--iceplay-wordmark-font-family);\n  font-style: var(--iceplay-wordmark-font-style);\n  font-weight: var(--iceplay-wordmark-font-weight);\n  font-size: 1.25rem;\n  letter-spacing: 0.09em;\n  color: inherit;\n  text-decoration: none;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  transition: opacity 0.2s ease;\n}\n.logo[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n@media (min-width: 640px) {\n  .logo[_ngcontent-%COMP%] {\n    margin-left: 0.75rem;\n    font-size: 1.5rem;\n  }\n}\n.logo[_ngcontent-%COMP%]   .ice[_ngcontent-%COMP%] {\n  color: #7dd3fc;\n  text-shadow: 0 0 10px rgba(125, 211, 252, 0.5);\n}\n/*# sourceMappingURL=header.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Header, [{
    type: Component,
    args: [{ selector: "app-header", changeDetection: ChangeDetectionStrategy.OnPush, imports: [MatToolbar, MatIconButton, MatIcon, HeaderActions, LanguageSelectorComponent, RouterLink, TranslatePipe], template: `
    <mat-toolbar class="px-2! shadow-md sm:px-4!">
      <!-- Menu button to open sports sidenav -->
      <button
        matIconButton
        [attr.aria-label]="'header.openSportsMenu' | translate"
        (click)="sidenavService.toggle()"
        class="menu-button"
      >
        <mat-icon>menu</mat-icon>
      </button>

      <!-- Logo -->
      <a class="logo" routerLink="/">
        <span class="hidden sm:inline"><span class="ice">ICE</span>PLAY</span>
        <span class="sm:hidden"><span class="ice">I</span>P</span>
      </a>

      <span class="flex-1"></span>

      <app-language-selector />

      <app-header-actions />
    </mat-toolbar>
  `, styles: ["/* angular:styles/component:scss;21c026370bbcf1e03c11a2d5fd1396ec022164972a50556ccb0709d876291e24;D:/Fropen/Iceplay/Iceplay-Front/src/app/layouts/header/header.ts */\n:host {\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n}\n::ng-deep mat-toolbar {\n  background: var(--mat-sys-surface-container) !important;\n  color: var(--mat-sys-on-secondary-container) !important;\n}\n.menu-button {\n  margin-right: 0.5rem;\n}\n.logo {\n  font-family: var(--iceplay-wordmark-font-family);\n  font-style: var(--iceplay-wordmark-font-style);\n  font-weight: var(--iceplay-wordmark-font-weight);\n  font-size: 1.25rem;\n  letter-spacing: 0.09em;\n  color: inherit;\n  text-decoration: none;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  transition: opacity 0.2s ease;\n}\n.logo:hover {\n  opacity: 0.8;\n}\n@media (min-width: 640px) {\n  .logo {\n    margin-left: 0.75rem;\n    font-size: 1.5rem;\n  }\n}\n.logo .ice {\n  color: #7dd3fc;\n  text-shadow: 0 0 10px rgba(125, 211, 252, 0.5);\n}\n/*# sourceMappingURL=header.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Header, { className: "Header", filePath: "src/app/layouts/header/header.ts", lineNumber: 84 });
})();

// src/app/layouts/sport-sidenav/sport-sidenav.component.ts
var _forTrack03 = ($index, $item) => $item.sport;
function SportSidenavComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 10);
    \u0275\u0275listener("click", function SportSidenavComponent_For_9_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onNavClick());
    });
    \u0275\u0275elementStart(1, "mat-icon", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r4.route);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 3, "sports." + item_r4.sport));
  }
}
var SportSidenavComponent = class _SportSidenavComponent {
  sidenavService = inject(SidenavService);
  i18nService = inject(I18nService);
  cdr = inject(ChangeDetectorRef);
  /** Navigation items for available sports */
  sportNavItems = [
    { sport: "football", icon: "sports_soccer", route: "/matches" },
    { sport: "basketball", icon: "sports_basketball", route: "/matches2" },
    { sport: "volleyball", icon: "sports_volleyball", route: "/matches3" }
  ];
  constructor() {
    this.checkScreenSize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => this.checkScreenSize());
    }
    effect(() => {
      this.i18nService.translations();
      this.i18nService.language();
      this.cdr.markForCheck();
    });
  }
  checkScreenSize() {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      this.sidenavService.updateModeForScreenWidth(width);
    }
  }
  onNavClick() {
    if (this.sidenavService.isOverlay()) {
      this.sidenavService.close();
    }
  }
  static \u0275fac = function SportSidenavComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SportSidenavComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SportSidenavComponent, selectors: [["sport-sidenav"]], decls: 20, vars: 8, consts: [["sidenav", ""], [1, "sidenav-container"], [1, "sidenav", 3, "closedStart", "mode", "opened"], [1, "sidenav-header"], [1, "header-title"], [1, "nav-list"], ["mat-list-item", "", "routerLinkActive", "active", 3, "routerLink"], [1, "sidenav-footer"], [1, "footer-content"], [1, "content"], ["mat-list-item", "", "routerLinkActive", "active", 3, "click", "routerLink"], ["matListItemIcon", ""], ["matListItemTitle", ""]], template: function SportSidenavComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-sidenav-container", 1)(1, "mat-sidenav", 2, 0);
      \u0275\u0275listener("closedStart", function SportSidenavComponent_Template_mat_sidenav_closedStart_1_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.sidenavService.close());
      });
      \u0275\u0275elementStart(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-nav-list", 5);
      \u0275\u0275repeaterCreate(8, SportSidenavComponent_For_9_Template, 6, 5, "a", 6, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7);
      \u0275\u0275element(11, "mat-divider");
      \u0275\u0275elementStart(12, "div", 8)(13, "mat-icon");
      \u0275\u0275text(14, "sports");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span");
      \u0275\u0275text(16);
      \u0275\u0275pipe(17, "translate");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(18, "mat-sidenav-content", 9);
      \u0275\u0275element(19, "router-outlet");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("mode", ctx.sidenavService.mode())("opened", ctx.sidenavService.opened());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 4, "common.sports"));
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.sportNavItems);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 6, "sidenav.footer"));
    }
  }, dependencies: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatIcon,
    MatDivider,
    TranslatePipe
  ], styles: ["\n\n.sidenav-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: transparent;\n}\n.sidenav-container[_ngcontent-%COMP%]   .mat-sidenav-content[_ngcontent-%COMP%] {\n  background: transparent;\n}\n.sidenav[_ngcontent-%COMP%] {\n  width: 260px;\n  background: var(--mat-sys-surface-container);\n  border-radius: 0;\n}\n  .mat-drawer-inner-container {\n  border-radius: 0 !important;\n}\n.sidenav-header[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid var(--mat-sys-outline-variant);\n}\n.header-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--mat-sys-on-surface);\n  letter-spacing: 0.025em;\n}\n.nav-list[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n}\n.nav-list[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  margin-bottom: 2px;\n}\n.nav-list[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--mat-sys-primary) 20%, transparent);\n  color: var(--mat-sys-primary);\n}\n.nav-list[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--mat-sys-primary);\n}\n  .nav-list .mat-mdc-list-item {\n}\n  .nav-list .mat-mdc-list-item::before, \n  .nav-list .mat-mdc-list-item .mat-mdc-focus-indicator::before, \n  .nav-list .mat-mdc-list-item .mdc-list-item__ripple::before {\n  display: none !important;\n}\n  .nav-list .mat-mdc-list-item:not(.active) {\n  background: transparent;\n  transition: background-color 0.2s ease;\n}\n  .nav-list .mat-mdc-list-item:not(.active):hover {\n  background: color-mix(in srgb, var(--mat-sys-on-surface) 8%, transparent) !important;\n}\n  .nav-list .mat-mdc-list-item:not(.active):focus-visible {\n  outline: 2px solid var(--mat-sys-primary);\n  outline-offset: -2px;\n}\n  .nav-list .mat-mdc-list-item.active {\n  background: color-mix(in srgb, var(--mat-sys-primary) 20%, transparent) !important;\n}\n  .nav-list .mat-mdc-list-item.active .mdc-list-item__primary-text {\n  color: var(--mat-sys-primary) !important;\n}\n  .nav-list .mat-mdc-list-item.active .mat-icon {\n  color: var(--mat-sys-primary) !important;\n}\n  .nav-list .mat-mdc-list-item.active:hover {\n  background: color-mix(in srgb, var(--mat-sys-primary) 25%, transparent) !important;\n}\n.sidenav-footer[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: var(--mat-sys-surface-container);\n}\n.footer-content[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.875rem;\n}\n.footer-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  width: 1.25rem;\n  height: 1.25rem;\n}\n.content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: var(--mat-sys-surface);\n}\n/*# sourceMappingURL=sport-sidenav.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SportSidenavComponent, [{
    type: Component,
    args: [{ selector: "sport-sidenav", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      MatSidenav,
      MatSidenavContainer,
      MatSidenavContent,
      MatNavList,
      MatListItem,
      MatListItemIcon,
      MatListItemTitle,
      MatIcon,
      MatDivider,
      TranslatePipe
    ], template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #sidenav
        class="sidenav"
        [mode]="sidenavService.mode()"
        [opened]="sidenavService.opened()"
        (closedStart)="sidenavService.close()"
      >
        <div class="sidenav-header">
          <span class="header-title">{{ 'common.sports' | translate }}</span>
        </div>

        <mat-nav-list class="nav-list">
          @for (item of sportNavItems; track item.sport) {
            <a
              mat-list-item
              [routerLink]="item.route"
              routerLinkActive="active"
              (click)="onNavClick()"
            >
              <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
              <span matListItemTitle>{{ 'sports.' + item.sport | translate }}</span>
            </a>
          }
        </mat-nav-list>

        <div class="sidenav-footer">
          <mat-divider />
          <div class="footer-content">
            <mat-icon>sports</mat-icon>
            <span>{{ 'sidenav.footer' | translate }}</span>
          </div>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="content">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `, styles: ["/* angular:styles/component:scss;a218569a03febf2a2a80ef08951917db22514ecf3a6a59dfcdcc510a6a56b8f8;D:/Fropen/Iceplay/Iceplay-Front/src/app/layouts/sport-sidenav/sport-sidenav.component.ts */\n.sidenav-container {\n  min-height: 100vh;\n  background: transparent;\n}\n.sidenav-container .mat-sidenav-content {\n  background: transparent;\n}\n.sidenav {\n  width: 260px;\n  background: var(--mat-sys-surface-container);\n  border-radius: 0;\n}\n::ng-deep .mat-drawer-inner-container {\n  border-radius: 0 !important;\n}\n.sidenav-header {\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid var(--mat-sys-outline-variant);\n}\n.header-title {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--mat-sys-on-surface);\n  letter-spacing: 0.025em;\n}\n.nav-list {\n  padding: 0.5rem;\n}\n.nav-list a {\n  border-radius: 8px;\n  margin-bottom: 2px;\n}\n.nav-list a.active {\n  background: color-mix(in srgb, var(--mat-sys-primary) 20%, transparent);\n  color: var(--mat-sys-primary);\n}\n.nav-list a.active mat-icon {\n  color: var(--mat-sys-primary);\n}\n::ng-deep .nav-list .mat-mdc-list-item {\n}\n::ng-deep .nav-list .mat-mdc-list-item::before,\n::ng-deep .nav-list .mat-mdc-list-item .mat-mdc-focus-indicator::before,\n::ng-deep .nav-list .mat-mdc-list-item .mdc-list-item__ripple::before {\n  display: none !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item:not(.active) {\n  background: transparent;\n  transition: background-color 0.2s ease;\n}\n::ng-deep .nav-list .mat-mdc-list-item:not(.active):hover {\n  background: color-mix(in srgb, var(--mat-sys-on-surface) 8%, transparent) !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item:not(.active):focus-visible {\n  outline: 2px solid var(--mat-sys-primary);\n  outline-offset: -2px;\n}\n::ng-deep .nav-list .mat-mdc-list-item.active {\n  background: color-mix(in srgb, var(--mat-sys-primary) 20%, transparent) !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item.active .mdc-list-item__primary-text {\n  color: var(--mat-sys-primary) !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item.active .mat-icon {\n  color: var(--mat-sys-primary) !important;\n}\n::ng-deep .nav-list .mat-mdc-list-item.active:hover {\n  background: color-mix(in srgb, var(--mat-sys-primary) 25%, transparent) !important;\n}\n.sidenav-footer {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: var(--mat-sys-surface-container);\n}\n.footer-content {\n  padding: 1rem 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  font-size: 0.875rem;\n}\n.footer-content mat-icon {\n  font-size: 1.25rem;\n  width: 1.25rem;\n  height: 1.25rem;\n}\n.content {\n  display: flex;\n  flex-direction: column;\n  background: var(--mat-sys-surface);\n}\n/*# sourceMappingURL=sport-sidenav.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SportSidenavComponent, { className: "SportSidenavComponent", filePath: "src/app/layouts/sport-sidenav/sport-sidenav.component.ts", lineNumber: 207 });
})();

// src/app/app.ts
function App_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-header")(1, "sport-sidenav");
  }
}
function App_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "router-outlet");
  }
}
var App = class _App {
  router = inject(Router);
  //* Track current URL reactively 
  currentUrl = toSignal(this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map((event) => event.urlAfterRedirects)), { initialValue: this.router.url });
  //* Public routes show main header + sport sidenav layout 
  isPublicRoute = computed(() => {
    const url = this.currentUrl();
    return !url.startsWith("/auth") && !url.startsWith("/admin") && !url.startsWith("/super-admin");
  }, __spreadValues({}, ngDevMode ? { debugName: "isPublicRoute" } : {}));
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 2, vars: 1, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, App_Conditional_0_Template, 2, 0)(1, App_Conditional_1_Template, 1, 0, "router-outlet");
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isPublicRoute() ? 0 : 1);
    }
  }, dependencies: [RouterOutlet, Header, SportSidenavComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background: var(--mat-sys-surface);\n}\n/*# sourceMappingURL=app.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterOutlet, Header, SportSidenavComponent], template: `
    @if (isPublicRoute()) {
      <app-header />
      <sport-sidenav />
    } @else {
      <!-- Admin/SuperAdmin/Auth routes have their own layouts -->
      <router-outlet />
    }
  `, styles: ["/* angular:styles/component:scss;0909fcd59cab679857f1d65b8812baffe328bbcf301cc0550afc9c31ce7fe3ce;D:/Fropen/Iceplay/Iceplay-Front/src/app/app.ts */\n:host {\n  display: block;\n  min-height: 100vh;\n  background: var(--mat-sys-surface);\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 29 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
