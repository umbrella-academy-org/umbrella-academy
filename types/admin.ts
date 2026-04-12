// Admin and organizational type definitions

import { Wallet } from './payment';
import { StudentRoadmap } from './roadmap';
import { StudentUser, TrainerUser, User } from './user';

// Enhanced Field interface for field-based organizational hierarchy
export interface Field {
  id: string;
  name: string;
  description: string;
  industry: string;
  companies: Company[];
  mentors: User[];
  trainers: TrainerUser[];
  selectionTrainers?: {
    total: number;
    available: number;
    topTrainers: {
      name: string;
      avatar: string;
      specialization: string;
      rating: number;
    }[];
  };
  specializations: string[];
  students: StudentUser[];
  revenueShare: number; // 65% for fields
  totalRevenue: number;
  revenue?: number; // Alias for totalRevenue for compatibility
  createdAt: Date;
  isActive: boolean;
  icon: string;
  rating: number;
  successRate: number;
  studentsCount: number;
  mentorsCount: number;
  averageCompletionTime: string;
  monthlyPrice: number;
  // Legacy fields for backward compatibility
  code?: string;
  adminId?: string;
  adminName?: string;
  status?: 'active' | 'maintenance' | 'inactive';
  settings?: {
    maxStudentsPerTrainer: number;
    minHoursPerWeek: number;
    fieldSharePercentage?: number;
    bankAccount?: string;
  };
}

// Company interface for field-based structure
export interface Company {
  id: string;
  name: string;
  website: string;
  achievements: string[];
  teachingFocus: string[];
  images: string[];
  description: string;
  fieldId: string;
  isActive: boolean;
  createdAt: Date;
  rating: number;
  successRate: number;
  featured?: boolean;
  stats?: {
    alumni: number;
    hiringRate: number;
    partnerSince: string;
  };
  programDetails?: {
    curriculum: string;
    duration: {
      minimum: string;
      extended: string;
    };
    schedule: {
      days: string;
      flexibility: string;
    };
    projects: string[];
  };
  pricing?: {
    tuition: string;
    includes: string[];
  };
  whyChoose?: string[];
  courses: Course[];
}

export interface Course {
  id: string;
  name: string;
  price: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  description: string;
}

// Enriched field for admin view (GET /api/admin/fields)
export interface AdminField {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  monthlyPrice: number;
  isActive: boolean;
  studentsCount: number;
  trainersCount: number;
  mentorsCount: number;
  totalRevenue: number;
  adminUser?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Feedback/support ticket
export interface FeedbackTicket {
  _id: string;
  type: 'feedback' | 'support' | 'complaint' | 'suggestion';
  userId: string;
  userName: string;
  userRole: 'student' | 'trainer' | 'mentor' | 'field-admin';
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
    mentor: number;
    fieldAdmin: number;
  };
  totalRevenue: number;
  monthlyRevenue: number;
  activeRoadmaps: number;
  completedSessions: number;
  fieldBreakdowns: Array<{
    fieldId: string;
    fieldName: string;
    students: number;
    revenue: number;
    completionRate: number;
  }>;
}

// Payment filter params
export interface PaymentFilters {
  fieldId?: string;
  status?: 'pending' | 'completed' | 'failed';
  from?: string; // ISO date string
  to?: string;   // ISO date string
}

// Company for admin view (GET /api/companies/all)
export interface AdminCompany {
  _id: string;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  fields: string[];
  mentorId?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  isActive: boolean;
  createdAt: string;
  studentsCount: number;
  trainersCount: number;
  mentorsCount: number;
}
