import api from './client';
import type { AuthResponse, LoginRequest, RegisterRequest, OauthLoginRequest } from '../types';

export const login = (data: LoginRequest) =>
  api.post<AuthResponse>('/auth/login', data).then((r) => r.data);

export const register = (data: RegisterRequest) =>
  api.post<AuthResponse>('/auth/register', data).then((r) => r.data);

export const oauthLogin = (data: OauthLoginRequest) =>
  api.post<AuthResponse>('/auth/firebase', data).then((r) => r.data);
