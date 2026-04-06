import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { from, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Rutas solo para anónimos (p. ej. login): respeta sesión restaurada por cookie.
 */
export const publicGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  console.log("publicGuard");
  

  //TODO: FIXME ESTE GUARD HACE LA PETICION DEL REFRESH  EN EL LOGIN Y SI ESTA LOGUEADO REDIRIGE A LA RUTA DEFAULT
  return from(auth.ensureBootstrapped()).pipe(
    map(() => {
      if (!auth.isAuthenticated()) {
        return true;
      }
      return router.createUrlTree([auth.getDefaultRoute()]);
    }),
  );
};
