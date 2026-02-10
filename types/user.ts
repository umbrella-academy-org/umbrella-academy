import { Wallet } from './payment';

export type UserType = 'student' | 'trainer' | 'mentor' | 'field-admin' | 'umbrella-admin';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserType;
  fieldId: string; // Required - every user must belong to exactly one field
  field: string; // Field identifier for compatibility
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
  fieldId: string; // Required field assignment
  field: string; // Field identifier for compatibility
  availability: {
    weeklyAvailableHours: number;
    preferredSessionDuration: number; // in hours
    preferredTimeSlots: ('morning' | 'afternoon' | 'evening')[];
    preferredDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  };
  // Progress tracking from admin dashboard
  progress?: number;
  lastSession?: string;
  roadmapId?: string; // ID for easier lookup
  learningPreferences: {
    pace: 'slow' | 'medium' | 'fast';
    style: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  };
}

export interface TrainerUser extends BaseUser {
  role: 'trainer';
  fieldId: string; // Required field assignment
  field: string; // Field identifier for compatibility
  availability: {
    weeklyAvailableHours: number;
    maxStudentsPerSession: number;
    preferredSessionDuration: number; // in hours
    availableTimeSlots: ('morning' | 'afternoon' | 'evening')[];
    availableDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  };
  expertise: string[]; // Areas of expertise
  experience: {
    yearsOfExperience: number;
    specializations: string[];

  };
  // Capacity and wallet from admin dashboard
  capacity?: number; // hours per week
  assigned?: number; // current students
  available?: number; // available slots
  rating?: number;
  totalSessions?: number;
  wallet?: Wallet;
}

export interface MentorUser extends BaseUser {
  role: 'mentor';
  fieldId: string; // Required field assignment
  field: string; // Field identifier for compatibility
  expertise: string[];
  experience: {
    yearsOfExperience: number;
    specializations: string[];
  };
}

export interface AdminUser extends Omit<BaseUser, 'fieldId' | 'field'> {
  role: 'field-admin' | 'umbrella-admin';
  fieldId?: string; // Optional for umbrella-admin, required for field-admin
  field?: string; // Field identifier for compatibility
  permissions: string[];
}

export type User = StudentUser | TrainerUser | MentorUser | AdminUser;