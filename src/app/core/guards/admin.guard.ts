import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { from, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 ** Guard that checks if user has admin or super_admin role.
 *? Waits for session bootstrap so the role is available on F5 / direct URL.
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return from(authService.ensureBootstrapped()).pipe(
    map(() => {
      if (authService.isAdmin() || authService.isSuperAdmin()) {
        return true;
      }
      return router.createUrlTree(['/']);
    }),
  );
};

// export const adminGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   if (authService.isAdmin() || authService.isSuperAdmin()) {
//     return true;
//   }
//   return router.createUrlTree(['/']);
// };