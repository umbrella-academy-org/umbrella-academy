// Mock wing data for Umbrella Academy LMS

import { Wing } from '@/types';

export const mockWings: Wing[] = [
  {
    id: 'kigali-central',
    name: 'Kigali Central Wing',
    code: 'KGL-C',
    adminId: 'user_301',
    adminName: 'Emmanuel Nkurunziza',
    students: 45,
    trainers: 8,
    revenue: 2850000, // RWF
    status: 'active',
    settings: {
      maxStudentsPerTrainer: 6,
      minHoursPerWeek: 20,
      wingSharePercentage: 15,
      bankAccount: 'BK-001-2024-KGL'
    }
  },
  {
    id: 'northern-wing',
    name: 'Northern Province Wing',
    code: 'NTH-P',
    adminId: 'user_302',
    adminName: 'Claudine Mukamana',
    students: 32,
    trainers: 6,
    revenue: 1920000, // RWF
    status: 'active',
    settings: {
      maxStudentsPerTrainer: 5,
      minHoursPerWeek: 18,
      wingSharePercentage: 15,
      bankAccount: 'BK-002-2024-NTH'
    }
  },
  {
    id: 'southern-wing',
    name: 'Southern Province Wing',
    code: 'STH-P',
    adminId: 'user_303',
    adminName: 'Jean Baptiste Nzeyimana',
    students: 28,
    trainers: 5,
    revenue: 1680000, // RWF
    status: 'active',
    settings: {
      maxStudentsPerTrainer: 6,
      minHoursPerWeek: 16,
      wingSharePercentage: 15,
      bankAccount: 'BK-003-2024-STH'
    }
  },
  {
    id: 'eastern-wing',
    name: 'Eastern Province Wing',
    code: 'EST-P',
    adminId: 'user_304',
    adminName: 'Immaculee Uwimana',
    students: 22,
    trainers: 4,
    revenue: 1320000, // RWF
    status: 'maintenance',
    settings: {
      maxStudentsPerTrainer: 5,
      minHoursPerWeek: 15,
      wingSharePercentage: 15,
      bankAccount: 'BK-004-2024-EST'
    }
  },
  {
    id: 'western-wing',
    name: 'Western Province Wing',
    code: 'WST-P',
    adminId: 'user_305',
    adminName: 'Faustin Ntawukuriryayo',
    students: 18,
    trainers: 3,
    revenue: 1080000, // RWF
    status: 'active',
    settings: {
      maxStudentsPerTrainer: 6,
      minHoursPerWeek: 14,
      wingSharePercentage: 15,
      bankAccount: 'BK-005-2024-WST'
    }
  }
];

// Helper functions
export const getWingById = (id: string) => mockWings.find(wing => wing.id === id);
export const getWingByCode = (code: string) => mockWings.find(wing => wing.code === code);
export const getActiveWings = () => mockWings.filter(wing => wing.status === 'active');
export const getTotalStudents = () => mockWings.reduce((total, wing) => total + wing.students, 0);
export const getTotalTrainers = () => mockWings.reduce((total, wing) => total + wing.trainers, 0);
export const getTotalRevenue = () => mockWings.reduce((total, wing) => total + wing.revenue, 0);