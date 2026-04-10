import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import { User } from '@/types';

class UserService {
  async getMe(): Promise<{ success: boolean; user: User }> {
    return apiClient.get<{ success: boolean; user: User }>(API_ENDPOINTS.USERS_ME);
  }

  async updateProfile(data: Partial<User>): Promise<{ success: boolean; user: User }> {
    return apiClient.put<{ success: boolean; user: User }>(API_ENDPOINTS.USER_PROFILE, data);
  }

  async getUsers(): Promise<{ success: boolean; users: User[] }> {
    return apiClient.get<{ success: boolean; users: User[] }>(API_ENDPOINTS.USERS);
  }

  async updateUserStatus(id: string, status: 'active' | 'inactive' | 'suspended'): Promise<{ success: boolean; user: User }> {
    return apiClient.put<{ success: boolean; user: User }>(API_ENDPOINTS.USER_STATUS(id), { status });
  }
}

export const userService = new UserService();
