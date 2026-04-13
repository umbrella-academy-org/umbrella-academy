// Admin and organizational type definitions

import { User } from './user';

// Feedback/support ticket
export interface FeedbackTicket {
  _id: string;
  type: 'feedback' | 'support' | 'complaint' | 'suggestion';
  userId: string;
  userName: string;
  userRole: 'student' | 'trainer';
  subject: string;
  message: string;
  rating?: number;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  submittedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}

// Platform-wide analytics
export interface AdminAnalytics {
  usersByRole: {
    student: number;
    trainer: number;
  };
  totalRevenue: number;
  monthlyRevenue: number;
  activeRoadmaps: number;
  completedSessions: number;
}

// Payment filter params
export interface PaymentFilters {
  status?: 'pending' | 'completed' | 'failed';
  from?: string; // ISO date string
  to?: string;   // ISO date string
}
