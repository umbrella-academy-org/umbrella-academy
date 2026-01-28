// Admin and organizational type definitions

import { Wallet } from './payment';
import { StudentRoadmap } from './roadmap';
import { User } from './user';

// Enhanced Wing interface for wing-based organizational hierarchy
export interface Wing {
  id: string;
  name: string;
  description: string;
  industry: string;
  companies: Company[];
  mentors: User[];
  trainers: User[];
  students: User[];
  revenueShare: number; // 65% for wings
  totalRevenue: number;
  revenue?: number; // Alias for totalRevenue for compatibility
  createdAt: Date;
  isActive: boolean;
  // Legacy fields for backward compatibility
  code?: string;
  adminId?: string;
  adminName?: string;
  status?: 'active' | 'maintenance' | 'inactive';
  settings?: {
    maxStudentsPerTrainer: number;
    minHoursPerWeek: number;
    wingSharePercentage: number;
    bankAccount?: string;
  };
}

// Company interface for wing-based structure
export interface Company {
  id: string;
  name: string;
  website: string;
  achievements: string[];
  teachingFocus: string[];
  images: string[];
  description: string;
  wingId: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  wingId: string;
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
  wingId: string;
  trainerId?: string;
  trainerName?: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  lastSession?: string;
  roadmap?: StudentRoadmap;
}