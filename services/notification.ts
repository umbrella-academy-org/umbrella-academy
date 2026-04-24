import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import type { ApiResponse } from '@/types';

export interface Notification {
  _id: string;
  userId: string;
  type: 'roadmap-submitted' | 'roadmap-approved' | 'roadmap-rejected' | 'session-scheduled' | 'payment-completed';
  title: string;
  message: string;
  isRead: boolean;
  relatedId?: string;
  createdAt: string;
}

class NotificationService {
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    return apiClient.get<Notification[]>(API_ENDPOINTS.NOTIFICATIONS);
  }

  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    return apiClient.put<Notification>(API_ENDPOINTS.NOTIFICATION_BY_ID(id));
  }
}

export const notificationService = new NotificationService();
