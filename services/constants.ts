// Umbrella Academy API Configuration

export const BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  USERS_ME: '/api/users/me',
  USERS: '/api/users',
  USER_STATUS: (id: string) => `/api/users/${id}/status`,
  USER_PROFILE: '/api/users/profile',
  ROADMAPS: '/api/roadmaps',
  ROADMAP_BY_ID: (id: string) => `/api/roadmaps/${id}`,
  ROADMAP_SUBMIT: (id: string) => `/api/roadmaps/${id}/submit`,
  ROADMAP_APPROVE: (id: string) => `/api/roadmaps/${id}/approve`,
  SESSIONS: '/api/sessions',
  SESSION_BY_ID: (id: string) => `/api/sessions/${id}`,
  CHAT_CONTACTS: '/api/chat/contacts',
  CHAT_MESSAGES: (contactId: string) => `/api/chat/messages/${contactId}`,
  PAYMENTS: '/api/payments',
  PAYMENT_CONFIRM: (id: string) => `/api/payments/${id}/confirm`,
  WALLET_ME: '/api/wallet/me',
  WALLET: '/api/wallet',
  STATS_ME: '/api/stats/me',
  NOTIFICATIONS: '/api/notifications',
  NOTIFICATION_BY_ID: (id: string) => `/api/notifications/${id}`,
  FIELDS: '/api/fields',
  FIELD_TRAINERS: (id: string) => `/api/fields/${id}/trainers`,
  FIELD_MENTORS: (id: string) => `/api/fields/${id}/mentors`,
  FIELD_COMPANIES: (id: string) => `/api/fields/${id}/companies`,
};

export const SOCKET_EVENTS = {
  SEND_MESSAGE: 'send_message',
  MESSAGE_RECEIVED: 'message_received',
  NEW_NOTIFICATION: 'new_notification',
};
