// User-related type definitions

export type UserType = 'student' | 'trainer' | 'mentor' | 'wing-admin' | 'umbrella-admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserType;
  wing?: string;
  status: 'active' | 'inactive' | 'suspended' | 'paused';
  joinDate: string;
  avatar?: string;
}