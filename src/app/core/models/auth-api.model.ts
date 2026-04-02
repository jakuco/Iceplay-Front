/**
 * Contrato JSON de login (sesión completa: access + cookie refreshToken).
 * El back puede enviar también `token` (JWT genérico).
 */
export interface AuthLoginResponse {
  user: unknown;
  accessToken?: string;
  token?: string;
}

/** Contrato JSON de POST /auth/refresh. */
export interface AuthRefreshResponse {
  user: unknown;
  accessToken: string;
}
