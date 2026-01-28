// User-related type definitions

// User-related type definitions

export type UserType = 'student' | 'trainer' | 'mentor' | 'wing-admin' | 'umbrella-admin';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserType;
  wingId: string; // Required - every user must belong to exactly one wing
  wing: string; // Wing identifier for compatibility
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
  wingId: string; // Required wing assignment
  wing: string; // Wing identifier for compatibility
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
  wingId: string; // Required wing assignment
  wing: string; // Wing identifier for compatibility
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
  wingId: string; // Required wing assignment
  wing: string; // Wing identifier for compatibility
  expertise: string[];
  experience: {
    yearsOfExperience: number;
    specializations: string[];
  };
}

export interface AdminUser extends Omit<BaseUser, 'wingId' | 'wing'> {
  role: 'wing-admin' | 'umbrella-admin';
  wingId?: string; // Optional for umbrella-admin, required for wing-admin
  wing?: string; // Wing identifier for compatibility
  permissions: string[];
}

export type User = StudentUser | TrainerUser | MentorUser | AdminUser;