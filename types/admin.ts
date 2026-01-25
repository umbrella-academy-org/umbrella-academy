// Admin and organizational type definitions

import { Wallet } from './payment';
import { StudentRoadmap } from './roadmap';

export interface Wing {
  id: string;
  name: string;
  code: string;
  adminId: string;
  adminName: string;
  students: number;
  trainers: number;
  revenue: number;
  status: 'active' | 'maintenance' | 'inactive';
  settings: {
    maxStudentsPerTrainer: number;
    minHoursPerWeek: number;
    wingSharePercentage: number;
    bankAccount?: string;
  };
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