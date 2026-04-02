import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-L3H5PFSS.js";
import {
  AuthService
} from "./chunk-CTYH5NZ2.js";
import "./chunk-I4DDBC3P.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-PEDZOI7R.js";
import {
  MatFormFieldModule
} from "./chunk-5LOHSV5W.js";
import {
  MatError,
  MatFormField,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-A4ZOVHWZ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-2C543PJY.js";
import "./chunk-BTLIOYON.js";
import {
  RouterLink
} from "./chunk-XIJO5SZ4.js";
import {
  MatButton,
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
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HGKGTKMW.js";
import {
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/features/auth/pages/login/login.page.ts
function LoginPage_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx);
  }
}
function LoginPage_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "El correo es requerido");
    \u0275\u0275elementEnd();
  }
}
function LoginPage_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Ingresa un correo v\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function LoginPage_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "La contrase\xF1a es requerida");
    \u0275\u0275elementEnd();
  }
}
function LoginPage_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "M\xEDnimo 6 caracteres");
    \u0275\u0275elementEnd();
  }
}
function LoginPage_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 14)(1, "span", 23);
    \u0275\u0275element(2, "mat-spinner", 24);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Ingresando...");
    \u0275\u0275elementEnd()()();
  }
}
function LoginPage_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 15)(1, "span", 23)(2, "mat-icon");
    \u0275\u0275text(3, "login");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Ingresar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r0.loginForm.invalid);
  }
}
var LoginPage = class _LoginPage {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  hidePassword = signal(true, __spreadValues({}, ngDevMode ? { debugName: "hidePassword" } : {}));
  currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  loginForm = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });
  async onSubmit() {
    if (this.loginForm.invalid)
      return;
    const { email, password } = this.loginForm.getRawValue();
    await this.authService.login({ email, password });
  }
  fillDemoCredentials(email, password) {
    this.loginForm.patchValue({ email, password });
    this.authService.clearError();
  }
  static \u0275fac = function LoginPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginPage, selectors: [["app-login-page"]], decls: 55, vars: 9, consts: [[1, "login-container"], [1, "login-card"], ["routerLink", "/matches", "aria-label", "Volver al inicio", 1, "back-home-btn"], [1, "logo-section", "mt-9"], [1, "logo"], [1, "ice"], [1, "subtitle"], [1, "error-banner"], [1, "login-form", 3, "ngSubmit", "formGroup"], ["appearance", "outline"], ["matInput", "", "type", "email", "formControlName", "email", "placeholder", "admin@ejemplo.com", "autocomplete", "email"], ["matPrefix", ""], ["matInput", "", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "current-password", 3, "type"], ["type", "button", "matIconButton", "", "matSuffix", "", 3, "click"], ["matButton", "filled", "type", "submit", "disabled", "", 1, "submit-btn"], ["matButton", "filled", "type", "submit", 1, "submit-btn", 3, "disabled"], [1, "demo-section"], [1, "demo-title"], [1, "demo-credentials"], ["type", "button", 1, "demo-btn", 3, "click"], [1, "demo-role"], [1, "demo-email"], [1, "footer-text"], [1, "btn-content"], ["diameter", "20"]], template: function LoginPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2)(3, "mat-icon");
      \u0275\u0275text(4, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span");
      \u0275\u0275text(6, "Volver al inicio");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 3)(8, "h1", 4)(9, "span", 5);
      \u0275\u0275text(10, "ICE");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, "PLAY");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 6);
      \u0275\u0275text(13, "Panel de Administraci\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(14, LoginPage_Conditional_14_Template, 5, 1, "div", 7);
      \u0275\u0275elementStart(15, "form", 8);
      \u0275\u0275listener("ngSubmit", function LoginPage_Template_form_ngSubmit_15_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(16, "mat-form-field", 9)(17, "mat-label");
      \u0275\u0275text(18, "Correo electr\xF3nico");
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "input", 10);
      \u0275\u0275elementStart(20, "mat-icon", 11);
      \u0275\u0275text(21, "email");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(22, LoginPage_Conditional_22_Template, 2, 0, "mat-error")(23, LoginPage_Conditional_23_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "mat-form-field", 9)(25, "mat-label");
      \u0275\u0275text(26, "Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "input", 12);
      \u0275\u0275elementStart(28, "mat-icon", 11);
      \u0275\u0275text(29, "lock");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "button", 13);
      \u0275\u0275listener("click", function LoginPage_Template_button_click_30_listener() {
        return ctx.hidePassword.set(!ctx.hidePassword());
      });
      \u0275\u0275elementStart(31, "mat-icon");
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(33, LoginPage_Conditional_33_Template, 2, 0, "mat-error")(34, LoginPage_Conditional_34_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(35, LoginPage_Conditional_35_Template, 5, 0, "button", 14)(36, LoginPage_Conditional_36_Template, 6, 1, "button", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 16)(38, "p", 17);
      \u0275\u0275text(39, "Credenciales de demostraci\xF3n:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div", 18)(41, "button", 19);
      \u0275\u0275listener("click", function LoginPage_Template_button_click_41_listener() {
        return ctx.fillDemoCredentials("super@fropen.com", "admin123");
      });
      \u0275\u0275elementStart(42, "span", 20);
      \u0275\u0275text(43, "Super Admin");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "span", 21);
      \u0275\u0275text(45, "super@fropen.com");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "button", 19);
      \u0275\u0275listener("click", function LoginPage_Template_button_click_46_listener() {
        return ctx.fillDemoCredentials("admin@ligaquito.com", "admin123");
      });
      \u0275\u0275elementStart(47, "span", 20);
      \u0275\u0275text(48, "Admin");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "span", 21);
      \u0275\u0275text(50, "admin@ligaquito.com");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(51, "p", 22);
      \u0275\u0275text(52, " Acceso exclusivo para administradores autorizados. ");
      \u0275\u0275element(53, "br");
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(14);
      \u0275\u0275conditional((tmp_0_0 = ctx.authService.error()) ? 14 : -1, tmp_0_0);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.loginForm.controls.email.hasError("required") ? 22 : ctx.loginForm.controls.email.hasError("email") ? 23 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("type", ctx.hidePassword() ? "password" : "text");
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-label", ctx.hidePassword() ? "Mostrar contrase\xF1a" : "Ocultar contrase\xF1a");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.hidePassword() ? "visibility_off" : "visibility");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loginForm.controls.password.hasError("required") ? 33 : ctx.loginForm.controls.password.hasError("minlength") ? 34 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.authService.isLoading() ? 35 : 36);
      \u0275\u0275advance(19);
      \u0275\u0275textInterpolate1(" \xA9 ", ctx.currentYear, " IcePlay by Fropen ");
    }
  }, dependencies: [
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    RouterLink,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatPrefix,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], styles: ["\n\n.login-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      var(--mat-sys-surface) 0%,\n      var(--mat-sys-surface-container) 100%);\n}\n.login-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  background: var(--mat-sys-surface-container);\n  border-radius: 16px;\n  padding: 2.5rem;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);\n  position: relative;\n}\n.back-home-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.5rem;\n  margin-bottom: 5rem;\n  color: var(--mat-sys-on-surface-variant);\n  text-decoration: none;\n  font-size: 0.875rem;\n  border-radius: 8px;\n  transition: all 0.2s;\n  position: absolute;\n  top: 1rem;\n  left: 1rem;\n}\n.back-home-btn[_ngcontent-%COMP%]:hover {\n  color: var(--mat-sys-primary);\n}\n.back-home-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.logo-section[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.logo[_ngcontent-%COMP%] {\n  font-family: var(--iceplay-wordmark-font-family);\n  font-style: var(--iceplay-wordmark-font-style);\n  font-weight: var(--iceplay-wordmark-font-weight);\n  font-size: 2.5rem;\n  letter-spacing: 0.09em;\n  margin: 0;\n}\n.logo[_ngcontent-%COMP%]   .ice[_ngcontent-%COMP%] {\n  color: #7dd3fc;\n  text-shadow: 0 0 20px rgba(125, 211, 252, 0.5);\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 1rem 0 0;\n  font-size: 0.875rem;\n}\n.error-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 8px;\n  color: #f87171;\n  margin-bottom: 1.5rem;\n  font-size: 0.875rem;\n}\n.error-banner[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.login-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n  .mat-mdc-form-field-icon-suffix {\n  padding: 0 4px 0 0 !important;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  height: 48px;\n  font-size: 1rem;\n  width: 100%;\n}\n.btn-content[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  margin: 1rem 0;\n}\n.btn-content[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.btn-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  flex-shrink: 0;\n}\n.demo-section[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid var(--mat-sys-outline-variant);\n}\n.demo-title[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  text-align: center;\n  margin: 0 0 0.75rem;\n}\n.demo-credentials[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.demo-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  background: var(--mat-sys-surface-container-high);\n  border: 1px solid var(--mat-sys-outline-variant);\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.demo-btn[_ngcontent-%COMP%]:hover {\n  background: var(--mat-sys-surface-container-highest);\n  border-color: var(--mat-sys-primary);\n}\n.demo-btn[_ngcontent-%COMP%]   .demo-role[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 0.8125rem;\n  color: var(--mat-sys-primary);\n}\n.demo-btn[_ngcontent-%COMP%]   .demo-email[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  font-family: monospace;\n}\n.footer-text[_ngcontent-%COMP%] {\n  margin: 1.5rem 0 0;\n  text-align: center;\n  font-size: 0.75rem;\n  color: var(--mat-sys-outline);\n  line-height: 1.5;\n}\n/*# sourceMappingURL=login.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginPage, [{
    type: Component,
    args: [{ selector: "app-login-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      ReactiveFormsModule,
      RouterLink,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatProgressSpinnerModule
    ], template: `
    <div class="login-container">
      <div class="login-card">
        <!-- Back to Home Button -->
        <a routerLink="/matches" class="back-home-btn" aria-label="Volver al inicio">
          <mat-icon>arrow_back</mat-icon>
          <span>Volver al inicio</span>
        </a>

        <!-- Logo -->
        <div class="logo-section mt-9">
          <h1 class="logo"><span class="ice">ICE</span>PLAY</h1>
          <p class="subtitle">Panel de Administraci\xF3n</p>
        </div>

        <!-- Error Message -->
        @if (authService.error(); as error) {
          <div class="error-banner">
            <mat-icon>error_outline</mat-icon>
            <span>{{ error }}</span>
          </div>
        }

        <!-- Login Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <mat-form-field appearance="outline">
            <mat-label>Correo electr\xF3nico</mat-label>
            <input
              matInput
              type="email"
              formControlName="email"
              placeholder="admin@ejemplo.com"
              autocomplete="email"
            />
            <mat-icon matPrefix>email</mat-icon>
            @if (loginForm.controls.email.hasError('required')) {
              <mat-error>El correo es requerido</mat-error>
            } @else if (loginForm.controls.email.hasError('email')) {
              <mat-error>Ingresa un correo v\xE1lido</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Contrase\xF1a</mat-label>
            <input
              matInput
              [type]="hidePassword() ? 'password' : 'text'"
              formControlName="password"
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              autocomplete="current-password"
            />
            <mat-icon matPrefix>lock</mat-icon>
            <button
              type="button"
              matIconButton
              matSuffix
              (click)="hidePassword.set(!hidePassword())"
              [attr.aria-label]="hidePassword() ? 'Mostrar contrase\xF1a' : 'Ocultar contrase\xF1a'"
            >
              <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            @if (loginForm.controls.password.hasError('required')) {
              <mat-error>La contrase\xF1a es requerida</mat-error>
            } @else if (loginForm.controls.password.hasError('minlength')) {
              <mat-error>M\xEDnimo 6 caracteres</mat-error>
            }
          </mat-form-field>

          @if (authService.isLoading()) {
            <button matButton="filled" type="submit" class="submit-btn" disabled>
              <span class="btn-content">
                <mat-spinner diameter="20" />
                <span>Ingresando...</span>
              </span>
            </button>
          } @else {
            <button
              matButton="filled"
              type="submit"
              class="submit-btn"
              [disabled]="loginForm.invalid"
            >
              <span class="btn-content">
                <mat-icon>login</mat-icon>
                <span>Ingresar</span>
              </span>
            </button>
          }
        </form>

        <!-- Demo Credentials -->
        <div class="demo-section">
          <p class="demo-title">Credenciales de demostraci\xF3n:</p>
          <div class="demo-credentials">
            <button
              type="button"
              class="demo-btn"
              (click)="fillDemoCredentials('super@fropen.com', 'admin123')"
            >
              <span class="demo-role">Super Admin</span>
              <span class="demo-email">super&#64;fropen.com</span>
            </button>
            <button
              type="button"
              class="demo-btn"
              (click)="fillDemoCredentials('admin@ligaquito.com', 'admin123')"
            >
              <span class="demo-role">Admin</span>
              <span class="demo-email">admin&#64;ligaquito.com</span>
            </button>
          </div>
        </div>

        <!-- Footer -->
        <p class="footer-text">
          Acceso exclusivo para administradores autorizados.
          <br />
          \xA9 {{ currentYear }} IcePlay by Fropen
        </p>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;c4ce580a622d941e7f69a35734e988458ac2c3f824217190b28ed840fedd618c;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/auth/pages/login/login.page.ts */\n.login-container {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      var(--mat-sys-surface) 0%,\n      var(--mat-sys-surface-container) 100%);\n}\n.login-card {\n  width: 100%;\n  max-width: 420px;\n  background: var(--mat-sys-surface-container);\n  border-radius: 16px;\n  padding: 2.5rem;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);\n  position: relative;\n}\n.back-home-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.5rem;\n  margin-bottom: 5rem;\n  color: var(--mat-sys-on-surface-variant);\n  text-decoration: none;\n  font-size: 0.875rem;\n  border-radius: 8px;\n  transition: all 0.2s;\n  position: absolute;\n  top: 1rem;\n  left: 1rem;\n}\n.back-home-btn:hover {\n  color: var(--mat-sys-primary);\n}\n.back-home-btn mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.logo-section {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.logo {\n  font-family: var(--iceplay-wordmark-font-family);\n  font-style: var(--iceplay-wordmark-font-style);\n  font-weight: var(--iceplay-wordmark-font-weight);\n  font-size: 2.5rem;\n  letter-spacing: 0.09em;\n  margin: 0;\n}\n.logo .ice {\n  color: #7dd3fc;\n  text-shadow: 0 0 20px rgba(125, 211, 252, 0.5);\n}\n.subtitle {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 1rem 0 0;\n  font-size: 0.875rem;\n}\n.error-banner {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 8px;\n  color: #f87171;\n  margin-bottom: 1.5rem;\n  font-size: 0.875rem;\n}\n.error-banner mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.login-form {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.login-form mat-form-field {\n  width: 100%;\n}\n::ng-deep .mat-mdc-form-field-icon-suffix {\n  padding: 0 4px 0 0 !important;\n}\n.submit-btn {\n  margin-top: 0.5rem;\n  height: 48px;\n  font-size: 1rem;\n  width: 100%;\n}\n.btn-content {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  margin: 1rem 0;\n}\n.btn-content mat-spinner {\n  flex-shrink: 0;\n}\n.btn-content mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  flex-shrink: 0;\n}\n.demo-section {\n  margin-top: 2rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid var(--mat-sys-outline-variant);\n}\n.demo-title {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  text-align: center;\n  margin: 0 0 0.75rem;\n}\n.demo-credentials {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.demo-btn {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  background: var(--mat-sys-surface-container-high);\n  border: 1px solid var(--mat-sys-outline-variant);\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.demo-btn:hover {\n  background: var(--mat-sys-surface-container-highest);\n  border-color: var(--mat-sys-primary);\n}\n.demo-btn .demo-role {\n  font-weight: 600;\n  font-size: 0.8125rem;\n  color: var(--mat-sys-primary);\n}\n.demo-btn .demo-email {\n  font-size: 0.75rem;\n  color: var(--mat-sys-on-surface-variant);\n  font-family: monospace;\n}\n.footer-text {\n  margin: 1.5rem 0 0;\n  text-align: center;\n  font-size: 0.75rem;\n  color: var(--mat-sys-outline);\n  line-height: 1.5;\n}\n/*# sourceMappingURL=login.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginPage, { className: "LoginPage", filePath: "src/app/features/auth/pages/login/login.page.ts", lineNumber: 338 });
})();
export {
  LoginPage as default
};
//# sourceMappingURL=chunk-BPJQG2HR.js.map
