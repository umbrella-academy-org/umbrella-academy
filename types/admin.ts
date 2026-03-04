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
}
