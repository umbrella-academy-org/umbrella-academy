// Umbrella Academy API Configuration

export const BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH_REGISTER: '/api/auth/register',
  AUTH_REGISTER_STUDENT: '/api/auth/register/student',
  AUTH_REGISTER_TRAINER: '/api/auth/register/trainer',
  AUTH_REGISTER_MENTOR: '/api/auth/register/mentor',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_SEND_OTP: '/api/auth/send-otp',
  AUTH_VERIFY_OTP: '/api/auth/verify-otp',
  AUTH_RESEND_OTP: '/api/auth/resend-otp',
  AUTH_FORGOT_PASSWORD: '/api/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/api/auth/reset-password',
  AUTH_APPROVE_TRAINER: (id: string) => `/api/auth/trainers/${id}/approve`,
  AUTH_APPROVE_MENTOR: (id: string) => `/api/auth/mentors/${id}/approve`,
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
  SYSTEM: '/api/system',
  FIELD_TRAINERS: (id: string) => `/api/fields/${id}/trainers`,
  FIELD_MENTORS: (id: string) => `/api/fields/${id}/mentors`,
  FIELD_COMPANIES: (id: string) => `/api/fields/${id}/companies`,
  NEGOTIATION: {
    BY_ID: (id: string) => `/api/negotiations/${id}`,
    SET_AGREED_PRICE: (id: string) => `/api/negotiations/${id}/agreed-price`,
    BUYER: '/api/negotiations/buyer',
    SELLER: '/api/negotiations/seller',
  },
  ORDER: {
    BY_ID: (id: string) => `/api/orders/${id}`,
  },
  FILES: {
    UPLOAD_AVATAR: '/api/files/avatar',
    UPLOAD_MESSAGE: '/api/files/message',
    UPLOAD_GENERIC: '/api/files/upload',
  },
};

export const SOCKET_EVENTS = {
  SEND_MESSAGE: 'send_message',
  MESSAGE_RECEIVED: 'message_received',
  NEW_NOTIFICATION: 'new_notification',
};
