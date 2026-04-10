import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';

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
  async getContacts(): Promise<{ success: boolean; data: ChatContactEntry[] }> {
    return apiClient.get<{ success: boolean; data: ChatContactEntry[] }>(API_ENDPOINTS.CHAT_CONTACTS);
  }

  async getMessages(contactId: string): Promise<{ success: boolean; data: ChatMessage[] }> {
    return apiClient.get<{ success: boolean; data: ChatMessage[] }>(API_ENDPOINTS.CHAT_MESSAGES(contactId));
  }
}

export const messageService = new MessageService();
