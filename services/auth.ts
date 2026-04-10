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

// Backend returns _id, firstName, lastName — map to our User shape
interface BackendUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  fieldId?: string;
  status: string;
}

interface BackendAuthResponse {
  success: boolean;
  token: string;
  user: BackendUser;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

function mapBackendUser(u: BackendUser): User {
  return {
    id: u._id,
    name: `${u.firstName} ${u.lastName}`,
    email: u.email,
    role: u.role as User['role'],
    fieldId: u.fieldId,
    status: (u.status as User['status']) ?? 'active',
    joinDate: new Date().toISOString(),
  } as User;
}

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<BackendAuthResponse>(API_ENDPOINTS.AUTH_LOGIN, { email, password });
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    return { success: response.success, token: response.token, user: mapBackendUser(response.user) };
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<BackendAuthResponse>(API_ENDPOINTS.AUTH_REGISTER, data);
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    return { success: response.success, token: response.token, user: mapBackendUser(response.user) };
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
    const response = await apiClient.get<{ success: boolean; user: BackendUser }>(API_ENDPOINTS.USERS_ME);
    return { success: response.success, user: mapBackendUser(response.user) };
  }
}

export const authService = new AuthService();
