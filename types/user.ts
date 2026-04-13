import { Wallet } from './payment';

export type UserType = 'student' | 'trainer' | 'admin';

export interface Availability {
  weeklyAvailableHours?: number;
  preferredTimeSlots?: string[];
  preferredDays?: string[];
}

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserType;
  status: 'active' | 'inactive' | 'suspended' | 'paused';
  joinDate: string;
  avatar?: string;
  profileData: {
    bio?: string;
    skills?: string[];
    experience?: string;
  };
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

export interface StudentUser extends BaseUser {
  role: 'student';
  availability: {
    weeklyAvailableHours: number;
    preferredSessionDuration: number;
    preferredTimeSlots: ('morning' | 'afternoon' | 'evening')[];
    preferredDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  };
  progress?: number;
  lastSession?: string;
  roadmapId?: string;
  learningPreferences: {
    pace: 'slow' | 'medium' | 'fast';
    style: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  };
}

export interface TrainerUser extends BaseUser {
  role: 'trainer';
  availability: {
    weeklyAvailableHours: number;
    maxStudentsPerSession: number;
    preferredSessionDuration: number;
    availableTimeSlots: ('morning' | 'afternoon' | 'evening')[];
    availableDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  };
  expertise: string[];
  experience: {
    yearsOfExperience: number;
    specializations: string[];
  };
  capacity?: number;
  assigned?: number;
  available?: number;
  rating?: number;
  totalSessions?: number;
  wallet?: Wallet;
}

export interface AdminUser extends BaseUser {
  role: 'admin';
  permissions: string[];
}

export type User = StudentUser | TrainerUser | AdminUser;
