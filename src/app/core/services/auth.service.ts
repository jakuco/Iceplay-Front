import { Injectable, signal, inject, computed } from '@angular/core';
import { ApiService } from './api.service';
import { firstValueFrom, tap } from 'rxjs';
import { Router } from '@angular/router';
import type {
  AuthLoginResponse,
  AuthRefreshResponse,
} from '../models/auth-api.model';
import { User } from '../models/user.model';
import { ApiEndpoints } from '@core/constants/endpoints.const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  private _currentUser = signal<User | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  private _accessToken = signal<string | null>(null);

  /** Una vez por carga: intento silencioso POST /auth/refresh (cookie httpOnly). */
  private bootstrapPromise: Promise<void> | null = null;

  /** Mutex para varios 401 en paralelo durante rotación de refresh. */
  private rotatePromise: Promise<void> | null = null;

  setAccessToken(token: string | null) {
    this._accessToken.set(token);
  }

  getAccessToken() {
    return this._accessToken.asReadonly();
  }

  user = this._currentUser.asReadonly();

  get currentUser() {
    console.log('Obteniendo usuario actual:', this._currentUser());
    return this.user;
  }

  private _isAuthenticated = computed(() => this._currentUser() !== null);

  private _isAdmin = computed(() => {
    const user = this._currentUser();
    return user?.role === 'admin';
  });

  private _isSuperAdmin = computed(() => {
    const user = this._currentUser();
    return user?.role === 'super_admin';
  });

  private _userFullName = computed(() => {
    const user = this._currentUser();
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`.trim();
  });

  private _userInitials = computed(() => {
    const user = this._currentUser();
    if (!user) return '';
    const first = user.firstName?.charAt(0).toUpperCase() || '';
    const last = user.lastName?.charAt(0).toUpperCase() || '';
    return first + last || user.email.charAt(0).toUpperCase();
  });

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
   * Espera el primer intento de sesión vía cookie `refreshToken`
   * (F5 / entrada directa a URL).
   * No lanza: si no hay cookie o 403, quedas anónimo.
   */
  ensureBootstrapped(): Promise<void> {
    if (!this.bootstrapPromise) {
      this.bootstrapPromise = this.fetchRefreshAndApplySession().catch(() => {
        // sin sesión
      });
    }
    return this.bootstrapPromise;
  }

  /**
   * POST /auth/refresh con credenciales; mutex si varias peticiones
   * disparan 401 a la vez.
   */
  rotateAccessToken(): Promise<void> {
    if (!this.rotatePromise) {
      this.rotatePromise = this.fetchRefreshAndApplySession().finally(() => {
        this.rotatePromise = null;
      });
    }
    return this.rotatePromise;
  }

  /** Llama al back y aplica accessToken + user en memoria. */
  private async fetchRefreshAndApplySession(): Promise<void> {
    const response = await firstValueFrom(
      this.api.post<AuthRefreshResponse>(
        ApiEndpoints.AUTH.REFRESH,
        {},
        { withCredentials: true }
      )
    );

    const accessToken = response.accessToken;
    if (!accessToken) {
      throw new Error('Refresh sin accessToken');
    }

    this.applySession(accessToken, response.user);
  }

  private applySession(accessToken: string, rawUser: unknown): void {
    const user = this.mapUserFromBackend(rawUser);
    this._accessToken.set(accessToken);
    this._currentUser.set(user);
  }

  private mapUserFromBackend(raw: unknown): User {
    if (!raw || typeof raw !== 'object') {
      throw new Error('Respuesta de usuario inválida');
    }

    const backUser = raw as Record<string, unknown>;

    const nameStr =
      typeof backUser['name'] === 'string' ? backUser['name'] : '';

    const parts = nameStr.trim().split(/\s+/).filter(Boolean);

    const firstName =
      typeof backUser['firstName'] === 'string'
        ? backUser['firstName']
        : (parts[0] ?? '');

    const lastName =
      typeof backUser['lastName'] === 'string'
        ? backUser['lastName']
        : parts.slice(1).join(' ');

    const roleRaw = backUser['role'];
    let role: User['role'] = 'admin';

    if (roleRaw === 'super_admin' || roleRaw === 'admin') {
      role = roleRaw;
    } else {
      const n = typeof roleRaw === 'number' ? roleRaw : Number(roleRaw);
      role = Number.isFinite(n) ? this.mapRole(n) : 'admin';
    }

    const base = raw as User;

    return {
      ...base,
      firstName,
      lastName,
      role,
      createdAt: new Date(
        (backUser['createdAt'] as string | number | Date | undefined) ??
        Date.now()
      ),
      lastLoginAt: backUser['lastLoginAt']
        ? new Date(backUser['lastLoginAt'] as string | number | Date)
        : undefined,
      email: String(backUser['email'] ?? base.email),
      isActive: Boolean(backUser['isActive'] ?? base.isActive ?? true),
    };
  }

  async login(credentials: { email: string; password?: string }): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.api
          .post<AuthLoginResponse>(
            ApiEndpoints.AUTH.LOGIN,
            {
              email: credentials.email,
              password: credentials.password,
            },
            { withCredentials: true }
          )
          .pipe(
            tap((res) => {
              const t = res.accessToken ?? res.token;
              if (t) this.setAccessToken(t);
            })
          )
      );

      const accessToken = response.accessToken ?? response.token;
      if (!accessToken) {
        throw new Error('El servidor no devolvió accessToken');
      }

      this.applySession(accessToken, response.user);
      this.bootstrapPromise = Promise.resolve();
      this.router.navigate([this.getDefaultRoute()]);
    } catch (err: unknown) {
      const errorMessage =
        (err as { error?: { message?: string }; message?: string })?.error
          ?.message ??
        (err as { message?: string })?.message ??
        'Error al iniciar sesión';

      this.error.set(errorMessage);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  private mapRole(roles: number): User['role'] {
    if (roles === 1) return 'super_admin';
    if (roles === 2) return 'admin';
    return 'admin';
  }

  getDefaultRoute() {
    const user = this._currentUser();
    if (!user) return '/auth/login';
    if (user.role === 'super_admin') return '/super-admin';
    return '/admin/dashboard';
  }

  async logout(): Promise<void> {
    await firstValueFrom(
      this.api.post(ApiEndpoints.AUTH.LOGOUT, {}, { withCredentials: true }).pipe(
        tap(() => this.setAccessToken(null))
      )
    );

    this._currentUser.set(null);
    this._accessToken.set(null);
    this.bootstrapPromise = null;
    this.rotatePromise = null;

    await this.router.navigate(['/auth/login']);
  }

  clearError() {
    this.error.set(null);
  }
}