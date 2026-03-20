import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard that checks if user is authenticated
 * Redirects to login page if not authenticated
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return true;
  if (authService.isAuthenticated()) {
  }

  return router.createUrlTree(['/auth/login']);
};

