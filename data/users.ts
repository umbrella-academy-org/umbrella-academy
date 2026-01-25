// Mock user data for Umbrella Academy LMS

import { User, StudentUser, TrainerUser, MentorUser, AdminUser } from '@/types';

export const mockUsers: User[] = [
  // Students
  {
    id: 'user_001',
    name: 'Jane Mukamana',
    email: 'jane.mukamana@student.umbrella.rw',
    role: 'student',
    wing: 'kigali-central',
    status: 'active',
    joinDate: '2024-09-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    availability: {
      weeklyAvailableHours: 20,
      preferredSessionDuration: 2,
      preferredTimeSlots: ['morning', 'evening'],
      preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    learningPreferences: {
      pace: 'medium',
      style: 'visual'
    }
  } as StudentUser,
  {
    id: 'user_002',
    name: 'Eric Nshimiyimana',
    email: 'eric.nshimiyimana@student.umbrella.rw',
    role: 'student',
    wing: 'kigali-central',
    status: 'active',
    joinDate: '2024-08-22',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    availability: {
      weeklyAvailableHours: 15,
      preferredSessionDuration: 1.5,
      preferredTimeSlots: ['afternoon', 'evening'],
      preferredDays: ['monday', 'wednesday', 'friday', 'saturday']
    },
    learningPreferences: {
      pace: 'fast',
      style: 'kinesthetic'
    }
  } as StudentUser,
  {
    id: 'user_003',
    name: 'Grace Uwimana',
    email: 'grace.uwimana@student.umbrella.rw',
    role: 'student',
    wing: 'northern-wing',
    status: 'active',
    joinDate: '2024-10-01',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    availability: {
      weeklyAvailableHours: 25,
      preferredSessionDuration: 3,
      preferredTimeSlots: ['morning', 'afternoon'],
      preferredDays: ['tuesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    learningPreferences: {
      pace: 'slow',
      style: 'auditory'
    }
  } as StudentUser,
  {
    id: 'user_004',
    name: 'David Habimana',
    email: 'david.habimana@student.umbrella.rw',
    role: 'student',
    wing: 'southern-wing',
    status: 'paused',
    joinDate: '2024-07-10',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    availability: {
      weeklyAvailableHours: 10,
      preferredSessionDuration: 2,
      preferredTimeSlots: ['evening'],
      preferredDays: ['saturday', 'sunday']
    },
    learningPreferences: {
      pace: 'medium',
      style: 'mixed'
    }
  } as StudentUser,

  // Trainers
  {
    id: 'user_101',
    name: 'Sarah Ingabire',
    email: 'sarah.ingabire@trainer.umbrella.rw',
    role: 'trainer',
    wing: 'kigali-central',
    status: 'active',
    joinDate: '2023-03-15',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    availability: {
      weeklyAvailableHours: 40,
      maxStudentsPerSession: 8,
      preferredSessionDuration: 2,
      availableTimeSlots: ['morning', 'afternoon', 'evening'],
      availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    expertise: ['JavaScript', 'React', 'Node.js', 'Web Development'],
    experience: {
      yearsOfExperience: 5,
      specializations: ['Frontend Development', 'Full Stack Development']
    }
  } as TrainerUser,
  {
    id: 'user_102',
    name: 'Jean Baptiste Nzeyimana',
    email: 'jean.nzeyimana@trainer.umbrella.rw',
    role: 'trainer',
    wing: 'northern-wing',
    status: 'active',
    joinDate: '2023-01-20',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    availability: {
      weeklyAvailableHours: 35,
      maxStudentsPerSession: 6,
      preferredSessionDuration: 3,
      availableTimeSlots: ['morning', 'afternoon'],
      availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    },
    expertise: ['Python', 'Data Science', 'Machine Learning', 'AI'],
    experience: {
      yearsOfExperience: 7,
      specializations: ['Data Science', 'Machine Learning', 'AI Development']
    }
  } as TrainerUser,

  // Mentors
  {
    id: 'user_201',
    name: 'David Nkurunziza',
    email: 'david.nkurunziza@mentor.umbrella.rw',
    role: 'mentor',
    wing: 'kigali-central',
    status: 'active',
    joinDate: '2022-06-10',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    expertise: ['Software Architecture', 'Project Management', 'Team Leadership'],
    experience: {
      yearsOfExperience: 10,
      specializations: ['Software Architecture', 'Technical Leadership', 'Mentoring']
    }
  } as MentorUser,
  {
    id: 'user_202',
    name: 'Alice Mukamazimpaka',
    email: 'alice.mukamazimpaka@mentor.umbrella.rw',
    role: 'mentor',
    wing: 'southern-wing',
    status: 'active',
    joinDate: '2022-08-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    expertise: ['UX/UI Design', 'Product Management', 'Design Thinking'],
    experience: {
      yearsOfExperience: 8,
      specializations: ['User Experience Design', 'Product Strategy', 'Design Leadership']
    }
  } as MentorUser,

  // Wing Admins
  {
    id: 'user_301',
    name: 'Marie Uwimana',
    email: 'marie.uwimana@admin.umbrella.rw',
    role: 'wing-admin',
    wing: 'kigali-central',
    status: 'active',
    joinDate: '2022-01-15',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    permissions: ['manage_wing', 'view_reports', 'manage_trainers', 'manage_students']
  } as AdminUser,
  {
    id: 'user_302',
    name: 'Paul Kagame Jr',
    email: 'paul.kagame@admin.umbrella.rw',
    role: 'wing-admin',
    wing: 'northern-wing',
    status: 'active',
    joinDate: '2022-02-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    permissions: ['manage_wing', 'view_reports', 'manage_trainers', 'manage_students']
  } as AdminUser,

  // Umbrella Admin
  {
    id: 'user_401',
    name: 'System Administrator',
    email: 'admin@umbrella.rw',
    role: 'umbrella-admin',
    status: 'active',
    joinDate: '2022-01-01',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    permissions: ['manage_system', 'manage_wings', 'manage_users', 'view_all_reports', 'financial_management']
  } as AdminUser
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