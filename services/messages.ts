import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import type { ApiResponse } from '@/types';

export interface ChatContactEntry {
  contact: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: string;
  };
  lastMessage: {
    _id: string;
    text: string;
    createdAt: string;
    senderId: string;
    recipientId: string;
    isRead: boolean;
  } | null;
  lastMessageAt: string | null;
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
  async getContacts(): Promise<ApiResponse<ChatContactEntry[]>> {
    return apiClient.get<ChatContactEntry[]>(API_ENDPOINTS.CHAT_CONTACTS);
  }

  async getMessages(contactId: string): Promise<ApiResponse<ChatMessage[]>> {
    return apiClient.get<ChatMessage[]>(API_ENDPOINTS.CHAT_MESSAGES(contactId));
  }
}

export const messageService = new MessageService();
