import {
  MatSelect,
  MatSelectModule
} from "./chunk-FITOHSH5.js";
import {
  MatOption
} from "./chunk-S3XQPSX3.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-AOS46ZGJ.js";
import {
  MatFormFieldModule
} from "./chunk-VRVKNUOO.js";
import "./chunk-7ZWBAUSJ.js";
import "./chunk-42GIDBWK.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-3AVQKCYA.js";
import "./chunk-I2HRK3GA.js";
import "./chunk-GJ7RVCNK.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel
} from "./chunk-PMJ65NA4.js";
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
} from "./chunk-M3WFE2HV.js";
import "./chunk-P774KGLL.js";
import "./chunk-BTLIOYON.js";
import {
  Router,
  RouterLink
} from "./chunk-OUAXBHXP.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-T2MKQVTJ.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-AAICBOD7.js";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-HGKGTKMW.js";
import "./chunk-VUJOFXKG.js";

// src/app/features/super-admin/pages/organizations/organization-form.page.ts
function OrganizationFormPage_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "El nombre es requerido");
    \u0275\u0275elementEnd();
  }
}
function OrganizationFormPage_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Ingresa un email v\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function OrganizationFormPage_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "El nombre es requerido");
    \u0275\u0275elementEnd();
  }
}
function OrganizationFormPage_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "El apellido es requerido");
    \u0275\u0275elementEnd();
  }
}
function OrganizationFormPage_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "El email es requerido");
    \u0275\u0275elementEnd();
  }
}
function OrganizationFormPage_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Ingresa un email v\xE1lido");
    \u0275\u0275elementEnd();
  }
}
var OrganizationFormPage = class _OrganizationFormPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  form = this.fb.nonNullable.group({
    name: ["", Validators.required],
    country: ["Ecuador", Validators.required],
    city: [""],
    contactEmail: ["", [Validators.required, Validators.email]],
    adminFirstName: ["", Validators.required],
    adminLastName: ["", Validators.required],
    adminEmail: ["", [Validators.required, Validators.email]]
  });
  onSubmit() {
    if (this.form.valid) {
      console.log("Form submitted:", this.form.getRawValue());
      this.router.navigate(["/super-admin/organizations"]);
    }
  }
  static \u0275fac = function OrganizationFormPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrganizationFormPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrganizationFormPage, selectors: [["app-organization-form"]], decls: 74, vars: 7, consts: [[1, "page-container"], [1, "page-header"], [1, "flex", "items-center", "gap-3"], ["matIconButton", "", "routerLink", "/super-admin/organizations"], [1, "page-title"], [1, "page-subtitle"], [1, "form-card", 3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "section-title"], [1, "form-grid"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "name", "placeholder", "Ej: Liga Deportiva Norte"], ["appearance", "outline"], ["formControlName", "country"], ["value", "Ecuador"], ["value", "Colombia"], ["value", "Peru"], ["value", "Mexico"], ["matInput", "", "formControlName", "city"], ["matInput", "", "type", "email", "formControlName", "contactEmail"], [1, "section-description"], ["matInput", "", "formControlName", "adminFirstName"], ["matInput", "", "formControlName", "adminLastName"], ["matInput", "", "type", "email", "formControlName", "adminEmail"], [1, "form-actions"], ["matButton", "outlined", "type", "button", "routerLink", "/super-admin/organizations"], ["matButton", "filled", "type", "submit", 3, "disabled"]], template: function OrganizationFormPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "a", 3)(4, "mat-icon");
      \u0275\u0275text(5, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 4);
      \u0275\u0275text(8, "Nueva Organizaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 5);
      \u0275\u0275text(10, "Crear organizaci\xF3n y su primer administrador");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(11, "form", 6);
      \u0275\u0275listener("ngSubmit", function OrganizationFormPage_Template_form_ngSubmit_11_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(12, "div", 7)(13, "h2", 8);
      \u0275\u0275text(14, "Informaci\xF3n de la Organizaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 9)(16, "mat-form-field", 10)(17, "mat-label");
      \u0275\u0275text(18, "Nombre de la Organizaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "input", 11);
      \u0275\u0275conditionalCreate(20, OrganizationFormPage_Conditional_20_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-form-field", 12)(22, "mat-label");
      \u0275\u0275text(23, "Pa\xEDs");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "mat-select", 13)(25, "mat-option", 14);
      \u0275\u0275text(26, "Ecuador");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "mat-option", 15);
      \u0275\u0275text(28, "Colombia");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "mat-option", 16);
      \u0275\u0275text(30, "Per\xFA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "mat-option", 17);
      \u0275\u0275text(32, "M\xE9xico");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "mat-form-field", 12)(34, "mat-label");
      \u0275\u0275text(35, "Ciudad");
      \u0275\u0275elementEnd();
      \u0275\u0275element(36, "input", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "mat-form-field", 10)(38, "mat-label");
      \u0275\u0275text(39, "Email de Contacto");
      \u0275\u0275elementEnd();
      \u0275\u0275element(40, "input", 19);
      \u0275\u0275conditionalCreate(41, OrganizationFormPage_Conditional_41_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(42, "mat-divider");
      \u0275\u0275elementStart(43, "div", 7)(44, "h2", 8);
      \u0275\u0275text(45, "Primer Administrador");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p", 20);
      \u0275\u0275text(47, " Se crear\xE1 un usuario administrador con acceso a esta organizaci\xF3n ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 9)(49, "mat-form-field", 12)(50, "mat-label");
      \u0275\u0275text(51, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275element(52, "input", 21);
      \u0275\u0275conditionalCreate(53, OrganizationFormPage_Conditional_53_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "mat-form-field", 12)(55, "mat-label");
      \u0275\u0275text(56, "Apellido");
      \u0275\u0275elementEnd();
      \u0275\u0275element(57, "input", 22);
      \u0275\u0275conditionalCreate(58, OrganizationFormPage_Conditional_58_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "mat-form-field", 10)(60, "mat-label");
      \u0275\u0275text(61, "Email del Administrador");
      \u0275\u0275elementEnd();
      \u0275\u0275element(62, "input", 23);
      \u0275\u0275conditionalCreate(63, OrganizationFormPage_Conditional_63_Template, 2, 0, "mat-error")(64, OrganizationFormPage_Conditional_64_Template, 2, 0, "mat-error");
      \u0275\u0275elementStart(65, "mat-hint");
      \u0275\u0275text(66, "Se enviar\xE1 una invitaci\xF3n a este correo");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(67, "div", 24)(68, "button", 25);
      \u0275\u0275text(69, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "button", 26)(71, "mat-icon");
      \u0275\u0275text(72, "save");
      \u0275\u0275elementEnd();
      \u0275\u0275text(73, " Crear Organizaci\xF3n ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.form.controls.name.hasError("required") ? 20 : -1);
      \u0275\u0275advance(21);
      \u0275\u0275conditional(ctx.form.controls.contactEmail.hasError("email") ? 41 : -1);
      \u0275\u0275advance(12);
      \u0275\u0275conditional(ctx.form.controls.adminFirstName.hasError("required") ? 53 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.form.controls.adminLastName.hasError("required") ? 58 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.form.controls.adminEmail.hasError("required") ? 63 : ctx.form.controls.adminEmail.hasError("email") ? 64 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.form.invalid);
    }
  }, dependencies: [
    RouterLink,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatError,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatDividerModule,
    MatDivider
  ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n.form-section[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 0.5rem;\n  color: var(--mat-sys-primary);\n}\n.section-description[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0 0 1rem;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid var(--mat-sys-outline-variant);\n  margin-top: 1rem;\n}\n@media (max-width: 600px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=organization-form.page.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrganizationFormPage, [{
    type: Component,
    args: [{ selector: "app-organization-form", changeDetection: ChangeDetectionStrategy.OnPush, imports: [
      RouterLink,
      ReactiveFormsModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDividerModule
    ], template: `
    <div class="page-container">
      <header class="page-header">
        <div class="flex items-center gap-3">
          <a matIconButton routerLink="/super-admin/organizations">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <div>
            <h1 class="page-title">Nueva Organizaci\xF3n</h1>
            <p class="page-subtitle">Crear organizaci\xF3n y su primer administrador</p>
          </div>
        </div>
      </header>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-card">
        <div class="form-section">
          <h2 class="section-title">Informaci\xF3n de la Organizaci\xF3n</h2>

          <div class="form-grid">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre de la Organizaci\xF3n</mat-label>
              <input matInput formControlName="name" placeholder="Ej: Liga Deportiva Norte" />
              @if (form.controls.name.hasError('required')) {
                <mat-error>El nombre es requerido</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Pa\xEDs</mat-label>
              <mat-select formControlName="country">
                <mat-option value="Ecuador">Ecuador</mat-option>
                <mat-option value="Colombia">Colombia</mat-option>
                <mat-option value="Peru">Per\xFA</mat-option>
                <mat-option value="Mexico">M\xE9xico</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Ciudad</mat-label>
              <input matInput formControlName="city" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email de Contacto</mat-label>
              <input matInput type="email" formControlName="contactEmail" />
              @if (form.controls.contactEmail.hasError('email')) {
                <mat-error>Ingresa un email v\xE1lido</mat-error>
              }
            </mat-form-field>
          </div>
        </div>

        <mat-divider />

        <div class="form-section">
          <h2 class="section-title">Primer Administrador</h2>
          <p class="section-description">
            Se crear\xE1 un usuario administrador con acceso a esta organizaci\xF3n
          </p>

          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="adminFirstName" />
              @if (form.controls.adminFirstName.hasError('required')) {
                <mat-error>El nombre es requerido</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Apellido</mat-label>
              <input matInput formControlName="adminLastName" />
              @if (form.controls.adminLastName.hasError('required')) {
                <mat-error>El apellido es requerido</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email del Administrador</mat-label>
              <input matInput type="email" formControlName="adminEmail" />
              @if (form.controls.adminEmail.hasError('required')) {
                <mat-error>El email es requerido</mat-error>
              } @else if (form.controls.adminEmail.hasError('email')) {
                <mat-error>Ingresa un email v\xE1lido</mat-error>
              }
              <mat-hint>Se enviar\xE1 una invitaci\xF3n a este correo</mat-hint>
            </mat-form-field>
          </div>
        </div>

        <div class="form-actions">
          <button matButton="outlined" type="button" routerLink="/super-admin/organizations">Cancelar</button>
          <button matButton="filled" type="submit" [disabled]="form.invalid">
            <mat-icon>save</mat-icon>
            Crear Organizaci\xF3n
          </button>
        </div>
      </form>
    </div>
  `, styles: ["/* angular:styles/component:scss;252c1adf057f6e14e5bcee2cdf8a6ebe857eac2f812e9ca933b1504cb6c316fd;D:/Fropen/Iceplay/Iceplay-Front/src/app/features/super-admin/pages/organizations/organization-form.page.ts */\n.page-container {\n  padding: 1.5rem;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.page-header {\n  margin-bottom: 1.5rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.page-subtitle {\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0.25rem 0 0;\n}\n.form-card {\n  background: var(--mat-sys-surface-container);\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n.form-section {\n  padding: 1rem 0;\n}\n.section-title {\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 0.5rem;\n  color: var(--mat-sys-primary);\n}\n.section-description {\n  font-size: 0.875rem;\n  color: var(--mat-sys-on-surface-variant);\n  margin: 0 0 1rem;\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.full-width {\n  grid-column: 1/-1;\n}\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid var(--mat-sys-outline-variant);\n  margin-top: 1rem;\n}\n@media (max-width: 600px) {\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=organization-form.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrganizationFormPage, { className: "OrganizationFormPage", filePath: "src/app/features/super-admin/pages/organizations/organization-form.page.ts", lineNumber: 184 });
})();
export {
  OrganizationFormPage as default
};
//# sourceMappingURL=chunk-RFGC73R6.js.map
