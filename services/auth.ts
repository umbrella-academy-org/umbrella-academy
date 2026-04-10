import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import { User } from '@/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'trainer' | 'mentor' | 'field-admin' | 'umbrella-admin';
  fieldId?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH_LOGIN, { email, password });
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    return response;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH_REGISTER, data);
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    return response;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH_LOGOUT);
    } catch {
      // ignore errors on logout
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  async checkToken(): Promise<{ success: boolean; user: User }> {
    return apiClient.get<{ success: boolean; user: User }>(API_ENDPOINTS.USERS_ME);
  }
}

export const authService = new AuthService();
