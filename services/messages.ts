import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';

export interface ChatContact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface ChatMessage {
  _id: string;
  senderId: string;
  recipientId: string;
  text: string;
  isRead: boolean;
  createdAt: string;
}

class MessageService {
  async getContacts(): Promise<{ success: boolean; data: ChatContact[] }> {
    return apiClient.get<{ success: boolean; data: ChatContact[] }>(API_ENDPOINTS.CHAT_CONTACTS);
  }

  async getMessages(contactId: string): Promise<{ success: boolean; data: ChatMessage[] }> {
    return apiClient.get<{ success: boolean; data: ChatMessage[] }>(API_ENDPOINTS.CHAT_MESSAGES(contactId));
  }
}

export const messageService = new MessageService();
