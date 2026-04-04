import { Injectable, signal, inject, computed } from '@angular/core';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ApiEndpoints } from '@core/constants/endpoints.const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  private _currentUser = signal<User | null>(null);
  private _token = signal<string | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // Public signals
  user = this._currentUser.asReadonly();
  private _tokenSignal = this._token.asReadonly();

  // Alias for backward compatibility
  get currentUser() {
    return this.user;
  }

  // Public methods
  token() {
    return this._tokenSignal();
  }

  // Computed signals
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

  // ✅ Constructor — restaura sesión al recargar la página
  constructor() {
    this.restoreSession();
  }

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

  getDefaultRoute() {
    return this._getDefaultRoute();
  }

  // ✅ Login conectado al backend real
  async login(credentials: { email: string; password?: string }): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.api.post<{ user: any; token: string }>(ApiEndpoints.AUTH.LOGIN, {
          email: credentials.email,
          password: credentials.password,
        })
      );

      // Mapear nombre del back ("John Doe") a firstName/lastName del front
      const backUser = response.user;
      console.log('👤 backUser completo:', backUser);
      console.log('🎭 role recibido:', backUser.role, typeof backUser.role);
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

      console.log('✅ role mapeado:', user.role); // 👈 agrega esto

      // Persistir sesión en localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(user));

      this._token.set(response.token);
      this._currentUser.set(user);

      // Redirigir según rol
      if (user.role === 'super_admin') {
        this.router.navigate(['/super-admin']);
      } else {
        this.router.navigate(['/admin/dashboard']);
      }


    } catch (err: any) {
      const errorMessage =
        err?.error?.message ?? err?.message ?? 'Error al iniciar sesión';
      this.error.set(errorMessage);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  // ✅ Logout limpia localStorage también
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser.set(null);
    this._token.set(null);
    this.router.navigate(['/auth/login']);
  }

  clearError() {
    this.error.set(null);
  }

  // ✅ Restaurar sesión desde localStorage al recargar
  private restoreSession(): void {
    const token = localStorage.getItem('token');
    const raw = localStorage.getItem('user');
    if (token && raw) {
      try {
        this._token.set(token);
        this._currentUser.set(JSON.parse(raw));
        return;
      } catch {
        // Si el JSON está corrupto, limpiar
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    // 🔴 MOCK — usuario administrador por defecto (sin backend de auth)
    const mockUser: User = {
      id: 'mock-user-1',
      email: 'admin@iceplay.dev',
      firstName: 'Admin',
      lastName: 'Mock',
      role: 'admin',
      organizationId: '1',
      isActive: true,
      createdAt: new Date(),
    };
    this._token.set('mock-token');
    this._currentUser.set(mockUser);

    // 🟢 BACKEND — eliminar el bloque MOCK de arriba cuando el login esté activo
  }

  // ✅ Mapear roles numéricos del back a strings del front
  // El back guarda: 1 = admin, 2 = super_admin (ajusta si es diferente)
  private mapRole(roles: number): User['role'] {
    //if (!Array.isArray(roles)) return 'admin';
    if (roles === 1) return 'super_admin';
    if (roles === 2) return 'admin';
    return 'admin';
  }
}
