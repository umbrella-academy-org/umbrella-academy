// Admin and organizational type definitions

import { Wallet } from './payment';
import { StudentRoadmap } from './roadmap';
import { User } from './user';

// Enhanced Field interface for field-based organizational hierarchy
export interface Field {
  id: string;
  name: string;
  description: string;
  industry: string;
  companies: Company[];
  mentors: User[];
  trainers: User[];
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
  students: User[];
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
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  fieldId: string;
  capacity: number; // hours per week
  assigned: number; // current students
  available: number; // available slots
  status: 'active' | 'full' | 'inactive';
  rating?: number;
  totalSessions?: number;
  wallet: Wallet;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  fieldId: string;
  trainerId?: string;
  trainerName?: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  lastSession?: string;
  roadmap?: StudentRoadmap;
}