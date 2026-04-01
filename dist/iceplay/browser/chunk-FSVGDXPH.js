import {
  ApiService
} from "./chunk-MEYU7MSQ.js";
import {
  Router
} from "./chunk-OUAXBHXP.js";
import {
  Injectable,
  computed,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-HGKGTKMW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-VUJOFXKG.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  api = inject(ApiService);
  router = inject(Router);
  _currentUser = signal(null, __spreadValues({}, ngDevMode ? { debugName: "_currentUser" } : {}));
  isLoading = signal(false, __spreadValues({}, ngDevMode ? { debugName: "isLoading" } : {}));
  error = signal(null, __spreadValues({}, ngDevMode ? { debugName: "error" } : {}));
  _accessToken = signal(null, __spreadValues({}, ngDevMode ? { debugName: "_accessToken" } : {}));
  setAccessToken(token) {
    this._accessToken.set(token);
  }
  getAccessToken() {
    return this._accessToken.asReadonly();
  }
  user = this._currentUser.asReadonly();
  get currentUser() {
    return this.user;
  }
  token() {
  }
  _isAuthenticated = computed(() => this._currentUser() !== null, __spreadValues({}, ngDevMode ? { debugName: "_isAuthenticated" } : {}));
  _isAdmin = computed(() => {
    const user = this._currentUser();
    return user?.role === "admin";
  }, __spreadValues({}, ngDevMode ? { debugName: "_isAdmin" } : {}));
  _isSuperAdmin = computed(() => {
    const user = this._currentUser();
    return user?.role === "super_admin";
  }, __spreadValues({}, ngDevMode ? { debugName: "_isSuperAdmin" } : {}));
  _userFullName = computed(() => {
    const user = this._currentUser();
    if (!user)
      return "";
    return `${user.firstName} ${user.lastName}`.trim();
  }, __spreadValues({}, ngDevMode ? { debugName: "_userFullName" } : {}));
  _userInitials = computed(() => {
    const user = this._currentUser();
    if (!user)
      return "";
    const first = user.firstName?.charAt(0).toUpperCase() || "";
    const last = user.lastName?.charAt(0).toUpperCase() || "";
    return first + last || user.email.charAt(0).toUpperCase();
  }, __spreadValues({}, ngDevMode ? { debugName: "_userInitials" } : {}));
  _getDefaultRoute = computed(() => {
    const user = this._currentUser();
    if (!user)
      return "/auth/login";
    if (user.role === "super_admin")
      return "/super-admin";
    return "/admin/dashboard";
  }, __spreadValues({}, ngDevMode ? { debugName: "_getDefaultRoute" } : {}));
  isAuthenticated() {
    return this._isAuthenticated();
  }
  isAdmin() {
    return this._isAdmin();
  }
  isSuperAdmin() {
    return this._isSuperAdmin();
  }
  userFullName() {
    return this._userFullName();
  }
  userInitials() {
    return this._userInitials();
  }
  async login(credentials) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await firstValueFrom(this.api.post("auth/login", { email: credentials.email, password: credentials.password }, { withCredentials: true }).pipe(tap((res) => {
        const t = res.accessToken ?? res.token;
        if (t)
          this.setAccessToken(t);
      })));
      const accessToken = response.accessToken ?? response.token;
      if (!accessToken) {
        throw new Error("El servidor no devolvi\xF3 token de acceso");
      }
      const backUser = response.user;
      const [firstName, ...rest] = backUser.name.split(" ");
      const lastName = rest.join(" ");
      const user = __spreadProps(__spreadValues({}, backUser), {
        firstName,
        lastName,
        role: this.mapRole(backUser.role),
        createdAt: new Date(backUser.createdAt ?? Date.now()),
        lastLoginAt: backUser.lastLoginAt ? new Date(backUser.lastLoginAt) : void 0
      });
      this._accessToken.set(accessToken);
      this._currentUser.set(user);
      this.router.navigate([this.getDefaultRoute()]);
    } catch (err) {
      const errorMessage = err?.error?.message ?? err?.message ?? "Error al iniciar sesi\xF3n";
      this.error.set(errorMessage);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }
  mapRole(roles) {
    if (roles === 1)
      return "super_admin";
    if (roles === 2)
      return "admin";
    return "admin";
  }
  getDefaultRoute() {
    const user = this._currentUser();
    if (!user)
      return "/auth/login";
    if (user.role === "super_admin")
      return "/super-admin";
    return "/admin/dashboard";
  }
  async logout() {
    await firstValueFrom(this.api.post("auth/logout", {}, { withCredentials: true }).pipe(tap(() => {
      this.setAccessToken(null);
    })));
    this._currentUser.set(null);
    this._accessToken.set(null);
    this.router.navigate(["/auth/login"]);
  }
  clearError() {
    this.error.set(null);
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-FSVGDXPH.js.map
