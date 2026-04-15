import { Student, BaseUser } from '@/types';
import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import { ApiResponse } from '@/types/api';

class UserService {
  async getStudent(): Promise<ApiResponse<Student>> {
    return apiClient.get<Student>(API_ENDPOINTS.USERS_ME);
  }

  async updateProfile(data: Partial<BaseUser>): Promise<ApiResponse<BaseUser>> {
    return apiClient.put<BaseUser>(API_ENDPOINTS.USER_PROFILE, data);
  }

  async getUsers(): Promise<ApiResponse<BaseUser[]>> {
    return apiClient.get<BaseUser[]>(API_ENDPOINTS.USERS);
  }

  async updateUserStatus(id: string, status: 'active' | 'inactive' | 'suspended'): Promise<ApiResponse<BaseUser>> {
    return apiClient.put<BaseUser>(API_ENDPOINTS.USER_STATUS(id), { status });
  }
}

export const userService = new UserService();
