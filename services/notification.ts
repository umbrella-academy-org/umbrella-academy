import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';

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
  async getNotifications(): Promise<{ success: boolean; data: Notification[] }> {
    return apiClient.get<{ success: boolean; data: Notification[] }>(API_ENDPOINTS.NOTIFICATIONS);
  }

  async markAsRead(id: string): Promise<{ success: boolean; data: Notification }> {
    return apiClient.put<{ success: boolean; data: Notification }>(API_ENDPOINTS.NOTIFICATION_BY_ID(id));
  }
}

export const notificationService = new NotificationService();
