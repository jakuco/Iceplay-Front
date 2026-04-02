
export interface AuthLoginResponse {
  user: unknown;
  //** Presente en login “completo”; si falta, a veces viene `token`. */
  accessToken?: string;
  token?: string;
}

export interface AuthRefreshResponse {
  user: unknown;
  accessToken: string;
}
