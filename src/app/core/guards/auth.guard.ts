import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { from, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Espera a que termine el intento inicial con cookie `refreshToken` antes de decidir.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return from(auth.ensureBootstrapped()).pipe(
    map(() =>
      auth.isAuthenticated()
        ? true
        : router.createUrlTree(['/auth/login']),
    ),
  );
};
