import { AuthResponse } from '@/types/auth';
import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import { ApiResponse,  OnboardingChecklist,  Student, StudentRegister, Trainer } from '@/types';

export interface LoginRequest {
  email: string;
  password: string;
}


class AuthService {
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH_LOGIN, { email, password });
    return response;
  }

  async registerStudent(data: Partial<StudentRegister>): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH_REGISTER_STUDENT, data);
    if (response.data) localStorage.setItem('auth_token', response.data.token);
    return response;
  }

  async registerTrainer(data: Partial<Trainer>): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH_REGISTER_TRAINER, data);
    if (response.data) localStorage.setItem('auth_token', response.data.token);
    return response;
  }

  async sendOtp(email: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH_SEND_OTP, { email });
  }

  async verifyOtp(email: string, otp: string): Promise<ApiResponse<{ success: boolean; verified: boolean }>> {
    return apiClient.post<{ success: boolean; verified: boolean }>(API_ENDPOINTS.AUTH_VERIFY_OTP, { email, otp });
  }

  async resendOtp(email: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH_RESEND_OTP, { email });
  }

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH_FORGOT_PASSWORD, { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH_RESET_PASSWORD, { token, newPassword });
  }


  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH_LOGOUT);
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  async getOnboardingChecklist(): Promise<ApiResponse<OnboardingChecklist>> {
    return apiClient.get<OnboardingChecklist>(API_ENDPOINTS.AUTH_ONBOARDING_CHECKLIST);
  }

}

export const authService = new AuthService();
