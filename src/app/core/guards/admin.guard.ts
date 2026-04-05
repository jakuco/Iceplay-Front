import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { from, map } from 'rxjs';

/**
 * Guard that checks if user has admin or super_admin role
 * Redirects to home page if not authorized
 */
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return from(auth.ensureBootstrapped()).pipe(
    map(() => {
      if (auth.isAdmin() || auth.isSuperAdmin()) {
        console.log("Admin is logged in");
        return true;
      }

      return router.createUrlTree(['/']);
    }),
  );

};