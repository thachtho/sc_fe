import http from './http';

interface ILoginResponse {
  refresh_token: string;
}

export const login = (auth: { nickname: string; password: string }) =>
  http.post<ILoginResponse>(`/auth/login`, auth);
export const getRefreshToken = (refreshToken: string) =>
  http.post(`/auth/refresh-token`, { refreshToken });
