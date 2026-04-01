import { Injectable, signal, inject, computed } from '@angular/core';
import { ApiService } from './api.service';
import { firstValueFrom, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  private _currentUser = signal<User | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);


  //* Access token signal
  private _accessToken = signal<string | null>(null);

  //* Set access token
  setAccessToken(token: string | null) {
    this._accessToken.set(token);
  }

  //* Get access token (readonly signal)
  getAccessToken() {
    return this._accessToken.asReadonly();
  }

  //* Public signals
  user = this._currentUser.asReadonly();
  // private _tokenSignal = this._token.asReadonly();

  // Alias for backward compatibility
  get currentUser() {
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
  private _getDefaultRoute = computed(() => {
    const user = this._currentUser();
    if (!user) return '/auth/login';
    if (user.role === 'super_admin') return '/super-admin';
    return '/admin/dashboard';
  });

  // Public methods that return computed signals
  //* Constructor - restore session on page reload
  // constructor() {
  //   this.restoreSession();
  // }

  // Public methods that return computed signals
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

  //* Login
  async login(credentials: { email: string; password?: string }): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.api.post<{ user: any; accessToken?: string; token?: string }>(
          'auth/login',
          { email: credentials.email, password: credentials.password },
          { withCredentials: true },
        ).pipe(
          tap((res) => {
            const t = res.accessToken ?? res.token;
            if (t) this.setAccessToken(t);
          }),
        ),
      );

      const accessToken = response.accessToken ?? response.token;
      if (!accessToken) {
        throw new Error('El servidor no devolvió token de acceso');
      }

      const backUser = response.user;
      const [firstName, ...rest] = (backUser.name as string).split(' ');
      const lastName = rest.join(' ');

      const user: User = {
        ...backUser,
        firstName,
        lastName,
        role: this.mapRole(backUser.role),
        createdAt: new Date(backUser.createdAt ?? Date.now()),
        lastLoginAt: backUser.lastLoginAt
          ? new Date(backUser.lastLoginAt)
          : undefined,
      };

      this._accessToken.set(accessToken);
      this._currentUser.set(user);
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

  //* Map role
  //? The back saves: 1 = admin, 2 = super_admin (adjust if different)
  private mapRole(roles: number): User['role'] {
    if (roles === 1) return 'super_admin';
    if (roles === 2) return 'admin';
    return 'admin';
  }

  //* Get default route
  getDefaultRoute() {
    const user = this._currentUser();
    if (!user) return '/auth/login';
    if (user.role === 'super_admin') return '/super-admin';
    return '/admin/dashboard';
  }

  //* Logout 
  async logout() {
    await firstValueFrom(
      this.api.post('auth/logout', {}, { withCredentials: true }).pipe(
        tap(() => {
          this.setAccessToken(null);
        }),
      ),
    );

    this._currentUser.set(null);
    this._accessToken.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  clearError() {
    this.error.set(null);
  }

  //* Restore session from localStorage on page reload
  async restoreSession(): Promise<void> {
    const response = await firstValueFrom(this.api.post<{ user: any; accessToken: string }>('auth/refresh', {}, { withCredentials: true }));
    // const token = localStorage.getItem('token');//! ESTO NO SE DEBE HACER, SE DEBE SOLO GUARDAR EN MEMORIA (RAM) 
    // const raw = localStorage.getItem('user');
    this.setAccessToken(response.accessToken);
    this._currentUser.set(response.user);
  }
}
