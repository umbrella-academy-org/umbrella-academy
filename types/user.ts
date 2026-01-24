// User-related type definitions

export type UserType = 'student' | 'trainer' | 'mentor' | 'wing-admin' | 'umbrella-admin';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserType;
  wing?: string;
  status: 'active' | 'inactive' | 'suspended' | 'paused';
  joinDate: string;
  avatar?: string;
}

export interface StudentUser extends BaseUser {
  role: 'student';
  availability: {
    weeklyAvailableHours: number;
    preferredSessionDuration: number; // in hours
    preferredTimeSlots: ('morning' | 'afternoon' | 'evening')[];
    preferredDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  };
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
    preferredSessionDuration: number; // in hours
    availableTimeSlots: ('morning' | 'afternoon' | 'evening')[];
    availableDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  };
  expertise: string[]; // Areas of expertise
  experience: {
    yearsOfExperience: number;
    specializations: string[];
  };
}

export interface MentorUser extends BaseUser {
  role: 'mentor';
  expertise: string[];
  experience: {
    yearsOfExperience: number;
    specializations: string[];
  };
}

export interface AdminUser extends BaseUser {
  role: 'wing-admin' | 'umbrella-admin';
  permissions: string[];
}

export type User = StudentUser | TrainerUser | MentorUser | AdminUser;