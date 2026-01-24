// Mock user data for Umbrella Academy LMS

import { User, UserType } from '@/types';

export const mockUsers: User[] = [
  // Students
  {
    id: 'user_001',
    name: 'Jane Mukamana',
    email: 'jane.mukamana@student.umbrella.rw',
    role: 'student' as UserType,
    wing: 'kigali-central',
    status: 'active',
    joinDate: '2024-09-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'user_002',
    name: 'Eric Nshimiyimana',
    email: 'eric.nshimiyimana@student.umbrella.rw',
    role: 'student' as UserType,
    wing: 'kigali-central',
    status: 'active',
    joinDate: '2024-08-22',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'user_003',
    name: 'Grace Uwimana',
    email: 'grace.uwimana@student.umbrella.rw',
    role: 'student' as UserType,
    wing: 'northern-wing',
    status: 'active',
    joinDate: '2024-10-01',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'user_004',
    name: 'David Habimana',
    email: 'david.habimana@student.umbrella.rw',
    role: 'student' as UserType,
    wing: 'southern-wing',
    status: 'paused',
    joinDate: '2024-07-10',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },

  // Trainers
  {
    id: 'user_101',
    name: 'Sarah Ingabire',
    email: 'sarah.ingabire@trainer.umbrella.rw',
    role: 'trainer' as UserType,
    wing: 'kigali-central',
    status: 'active',
    joinDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'user_102',
    name: 'James Mutabazi',
    email: 'james.mutabazi@trainer.umbrella.rw',
    role: 'trainer' as UserType,
    wing: 'northern-wing',
    status: 'active',
    joinDate: '2024-02-20',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'user_103',
    name: 'Alice Nyirahabimana',
    email: 'alice.nyirahabimana@trainer.umbrella.rw',
    role: 'trainer' as UserType,
    wing: 'southern-wing',
    status: 'active',
    joinDate: '2024-03-05',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  },

  // Mentors
  {
    id: 'user_201',
    name: 'Dr. Robert Kayitare',
    email: 'robert.kayitare@mentor.umbrella.rw',
    role: 'mentor' as UserType,
    wing: 'kigali-central',
    status: 'active',
    joinDate: '2023-11-10',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'user_202',
    name: 'Prof. Marie Uwimana',
    email: 'marie.uwimana@mentor.umbrella.rw',
    role: 'mentor' as UserType,
    wing: 'northern-wing',
    status: 'active',
    joinDate: '2023-12-01',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },

  // Wing Admins
  {
    id: 'user_301',
    name: 'Emmanuel Nkurunziza',
    email: 'emmanuel.nkurunziza@admin.umbrella.rw',
    role: 'wing-admin' as UserType,
    wing: 'kigali-central',
    status: 'active',
    joinDate: '2023-08-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'user_302',
    name: 'Claudine Mukamana',
    email: 'claudine.mukamana@admin.umbrella.rw',
    role: 'wing-admin' as UserType,
    wing: 'northern-wing',
    status: 'active',
    joinDate: '2023-09-01',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },

  // Umbrella Admin
  {
    id: 'user_401',
    name: 'Patrick Rwigema',
    email: 'patrick.rwigema@umbrella.rw',
    role: 'umbrella-admin' as UserType,
    status: 'active',
    joinDate: '2023-06-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

// Helper functions to get users by role
export const getStudents = () => mockUsers.filter(user => user.role === 'student');
export const getTrainers = () => mockUsers.filter(user => user.role === 'trainer');
export const getMentors = () => mockUsers.filter(user => user.role === 'mentor');
export const getWingAdmins = () => mockUsers.filter(user => user.role === 'wing-admin');
export const getUmbrellaAdmins = () => mockUsers.filter(user => user.role === 'umbrella-admin');

// Get users by wing
export const getUsersByWing = (wingId: string) => mockUsers.filter(user => user.wing === wingId);

// Get user by ID
export const getUserById = (id: string) => mockUsers.find(user => user.id === id);

// Get user by email
export const getUserByEmail = (email: string) => mockUsers.find(user => user.email === email);