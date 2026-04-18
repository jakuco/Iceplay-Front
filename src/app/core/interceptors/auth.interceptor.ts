import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService } from '../services/auth.service';

const retriedAfterRefresh = new HttpContextToken<boolean>(() => false);

const skipBearerAndRefreshOn401 = /\/auth\/(login|refresh|logout)(?:\?|#|$)/i;

function isApiRequest(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url.startsWith(environment.baseUrl);
  }
  return true;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isApiRequest(req.url)) {
    return next(req);
  }

  if (skipBearerAndRefreshOn401.test(req.url)) {
    return next(req);
  }

  const auth = inject(AuthService);
  const token = auth.getAccessToken()();
  const reqWithAuth = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(reqWithAuth).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401 || req.context.get(retriedAfterRefresh)) {
        return throwError(() => err);
      }

      return from(auth.rotateAccessToken()).pipe(
        switchMap(() => {
          const nextToken = auth.getAccessToken()();
          if (!nextToken) {
            return throwError(() => err);
          }
          return next(
            req.clone({
              setHeaders: { Authorization: `Bearer ${nextToken}` },
              context: req.context.set(retriedAfterRefresh, true),
            }),
          );
        }),
        catchError(() => throwError(() => err)),
      );
    }),
  );
};
