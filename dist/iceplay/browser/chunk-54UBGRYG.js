import {
  ApiService
} from "./chunk-DYTKA3GQ.js";
import {
  Router
} from "./chunk-ORPODLRN.js";
import {
  Injectable,
  computed,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-F7WKCRHW.js";
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
  /** Una vez por carga: intento silencioso POST /auth/refresh (cookie httpOnly). */
  bootstrapPromise = null;
  /** Mutex para varios 401 en paralelo durante rotación de refresh. */
  rotatePromise = null;
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
  /**
   * Espera el primer intento de sesión vía cookie `refreshToken` (F5 / entrada directa a URL).
   * No lanza: si no hay cookie o 403, quedas anónimo.
   */
  ensureBootstrapped() {
    if (!this.bootstrapPromise) {
      this.bootstrapPromise = this.fetchRefreshAndApplySession().catch(() => {
      });
    }
    return this.bootstrapPromise;
  }
  /**
   * POST /auth/refresh con credenciales; mutex si varias peticiones disparan 401 a la vez.
   */
  rotateAccessToken() {
    if (!this.rotatePromise) {
      this.rotatePromise = this.fetchRefreshAndApplySession().finally(() => {
        this.rotatePromise = null;
      });
    }
    return this.rotatePromise;
  }
  /** Llama al back y aplica accessToken + user en memoria. */
  async fetchRefreshAndApplySession() {
    const response = await firstValueFrom(this.api.post("auth/refresh", {}, { withCredentials: true }));
    const accessToken = response.accessToken;
    if (!accessToken) {
      throw new Error("Refresh sin accessToken");
    }
    this.applySession(accessToken, response.user);
  }
  applySession(accessToken, rawUser) {
    const user = this.mapUserFromBackend(rawUser);
    this._accessToken.set(accessToken);
    this._currentUser.set(user);
  }
  mapUserFromBackend(raw) {
    if (!raw || typeof raw !== "object") {
      throw new Error("Respuesta de usuario inv\xE1lida");
    }
    const backUser = raw;
    const nameStr = typeof backUser["name"] === "string" ? backUser["name"] : "";
    const parts = nameStr.trim().split(/\s+/).filter(Boolean);
    const firstName = typeof backUser["firstName"] === "string" ? backUser["firstName"] : parts[0] ?? "";
    const lastName = typeof backUser["lastName"] === "string" ? backUser["lastName"] : parts.slice(1).join(" ");
    const roleRaw = backUser["role"];
    let role = "admin";
    if (roleRaw === "super_admin" || roleRaw === "admin") {
      role = roleRaw;
    } else {
      const n = typeof roleRaw === "number" ? roleRaw : Number(roleRaw);
      role = Number.isFinite(n) ? this.mapRole(n) : "admin";
    }
    const base = raw;
    return __spreadProps(__spreadValues({}, base), {
      firstName,
      lastName,
      role,
      createdAt: new Date(backUser["createdAt"] ?? Date.now()),
      lastLoginAt: backUser["lastLoginAt"] ? new Date(backUser["lastLoginAt"]) : void 0,
      email: String(backUser["email"] ?? base.email),
      isActive: Boolean(backUser["isActive"] ?? base.isActive ?? true)
    });
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
        throw new Error("El servidor no devolvi\xF3 accessToken");
      }
      this.applySession(accessToken, response.user);
      this.bootstrapPromise = Promise.resolve();
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
    await firstValueFrom(this.api.post("auth/logout", {}, { withCredentials: true }).pipe(tap(() => this.setAccessToken(null))));
    this._currentUser.set(null);
    this._accessToken.set(null);
    this.bootstrapPromise = null;
    this.rotatePromise = null;
    await this.router.navigate(["/auth/login"]);
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
//# sourceMappingURL=chunk-54UBGRYG.js.map
