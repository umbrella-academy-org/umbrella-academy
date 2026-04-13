// Mock user data for Umbrella Academy LMS

import { User, StudentUser, TrainerUser, AdminUser } from '@/types';

export const mockUsers: User[] = [
  // Students
  {
    id: 'user_001',
    name: 'Jane Mukamana',
    email: 'jane.mukamana@student.umbrella.rw',
    role: 'student',
    fieldId: 'software-engineering', // Updated to match field IDs
    status: 'active',
    joinDate: '2024-09-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    profileData: {
      bio: 'Aspiring full-stack developer passionate about creating innovative web solutions',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      experience: 'Beginner level with 6 months of self-study'
    },
    createdAt: new Date('2024-09-15'),
    lastLogin: new Date('2024-12-09'),
    isActive: true,
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
    fieldId: 'software-engineering',
    status: 'active',
    joinDate: '2024-08-22',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    profileData: {
      bio: 'Mobile app developer interested in cross-platform solutions',
      skills: ['React Native', 'Flutter', 'Firebase'],
      experience: 'Intermediate level with 1 year of experience'
    },
    createdAt: new Date('2024-08-22'),
    lastLogin: new Date('2024-12-08'),
    isActive: true,
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
    fieldId: 'ux-innovation',
    status: 'active',
    joinDate: '2024-10-01',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    profileData: {
      bio: 'Business analyst focusing on digital transformation strategies',
      skills: ['Business Analysis', 'Project Management', 'Data Analytics'],
      experience: 'Advanced level with 3 years of corporate experience'
    },
    createdAt: new Date('2024-10-01'),
    lastLogin: new Date('2024-12-09'),
    isActive: true,
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
    fieldId: 'ai-intelligence',
    status: 'paused',
    joinDate: '2024-07-10',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    profileData: {
      bio: 'Hotel management student specializing in customer service excellence',
      skills: ['Customer Service', 'Event Planning', 'Hotel Operations'],
      experience: 'Beginner level with internship experience'
    },
    createdAt: new Date('2024-07-10'),
    lastLogin: new Date('2024-11-15'),
    isActive: false,
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
    fieldId: 'software-engineering',
    status: 'active',
    joinDate: '2023-03-15',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    profileData: {
      bio: 'Senior full-stack developer with expertise in modern web technologies',
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS'],
      experience: '5 years of professional development and 2 years of training experience'
    },
    createdAt: new Date('2023-03-15'),
    lastLogin: new Date('2024-12-09'),
    isActive: true,
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
    fieldId: 'ai-intelligence',
    status: 'active',
    joinDate: '2023-01-20',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    profileData: {
      bio: 'Data scientist and AI specialist with extensive machine learning experience',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Machine Learning'],
      experience: '7 years in data science and 3 years in training and mentorship'
    },
    createdAt: new Date('2023-01-20'),
    lastLogin: new Date('2024-12-08'),
    isActive: true,
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

  // Trainers (continued)
  {
    id: 'user_201',
    name: 'David Nkurunziza',
    email: 'david.nkurunziza@trainer.umbrella.rw',
    role: 'trainer',
    fieldId: 'software-engineering',
    status: 'active',
    joinDate: '2022-06-10',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    profileData: {
      bio: 'Senior software architect and technical leader with extensive training experience',
      skills: ['Software Architecture', 'System Design', 'Team Leadership', 'Technical Strategy'],
      experience: '10 years in software development and 5 years in technical leadership'
    },
    createdAt: new Date('2022-06-10'),
    lastLogin: new Date('2024-12-09'),
    isActive: true,
    availability: {
      weeklyAvailableHours: 30,
      maxStudentsPerSession: 8,
      preferredSessionDuration: 2,
      availableTimeSlots: ['morning', 'afternoon'],
      availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    expertise: ['Software Architecture', 'Project Management', 'Team Leadership'],
    experience: {
      yearsOfExperience: 10,
      specializations: ['Software Architecture', 'Technical Leadership', 'Training']
    }
  } as TrainerUser,
  {
    id: 'user_202',
    name: 'Alice Mukamazimpaka',
    email: 'alice.mukamazimpaka@trainer.umbrella.rw',
    role: 'trainer',
    fieldId: 'ux-innovation',
    status: 'active',
    joinDate: '2022-08-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    profileData: {
      bio: 'UX/UI design expert and product strategist with a passion for user-centered design',
      skills: ['UX/UI Design', 'Product Strategy', 'Design Thinking', 'User Research'],
      experience: '8 years in design and product management with leadership experience'
    },
    createdAt: new Date('2022-08-15'),
    lastLogin: new Date('2024-12-08'),
    isActive: true,
    availability: {
      weeklyAvailableHours: 25,
      maxStudentsPerSession: 6,
      preferredSessionDuration: 2,
      availableTimeSlots: ['morning', 'afternoon', 'evening'],
      availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    expertise: ['UX/UI Design', 'Product Management', 'Design Thinking'],
    experience: {
      yearsOfExperience: 8,
      specializations: ['User Experience Design', 'Product Strategy', 'Design Leadership']
    }
  } as TrainerUser,

  // Field Admins
  {
    id: 'user_301',
    name: 'Marie Uwimana',
    email: 'marie.uwimana@admin.umbrella.rw',
    role: 'field-admin',
    fieldId: 'software-engineering',
    status: 'active',
    joinDate: '2022-01-15',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    profileData: {
      bio: 'Experienced administrator specializing in tech field operations and team management',
      skills: ['Team Management', 'Operations', 'Strategic Planning', 'Performance Analysis'],
      experience: '12 years in educational administration and technology sector management'
    },
    createdAt: new Date('2022-01-15'),
    lastLogin: new Date('2024-12-09'),
    isActive: true,
    permissions: ['manage_field', 'view_reports', 'manage_trainers', 'manage_students']
  } as AdminUser,
  {
    id: 'user_302',
    name: 'Paul Kagame Jr',
    email: 'paul.kagame@admin.umbrella.rw',
    role: 'field-admin',
    fieldId: 'ux-innovation',
    status: 'active',
    joinDate: '2022-02-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    profileData: {
      bio: 'Business operations expert with extensive experience in corporate training and development',
      skills: ['Business Operations', 'Corporate Training', 'Strategic Development', 'Team Leadership'],
      experience: '15 years in business management and educational program development'
    },
    createdAt: new Date('2022-02-20'),
    lastLogin: new Date('2024-12-08'),
    isActive: true,
    permissions: ['manage_field', 'view_reports', 'manage_trainers', 'manage_students']
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
    profileData: {
      bio: 'System administrator overseeing all field operations and platform management',
      skills: ['System Administration', 'Platform Management', 'Data Analytics', 'Strategic Oversight'],
      experience: '20 years in educational technology and system administration'
    },
    createdAt: new Date('2022-01-01'),
    lastLogin: new Date('2024-12-09'),
    isActive: true,
    permissions: ['manage_system', 'manage_fields', 'manage_users', 'view_all_reports', 'financial_management']
  } as AdminUser
];

// Helper functions to get users by role
export const getStudents = (): StudentUser[] =>
  mockUsers.filter(user => user.role === 'student') as StudentUser[];

export const getTrainers = (): TrainerUser[] =>
  mockUsers.filter(user => user.role === 'trainer') as TrainerUser[];

export const getFieldAdmins = (): AdminUser[] =>
  mockUsers.filter(user => user.role === 'field-admin') as AdminUser[];

export const getUmbrellaAdmins = (): AdminUser[] =>
  mockUsers.filter(user => user.role === 'umbrella-admin') as AdminUser[];

// Get users by field - core functionality for field-based organization
export const getUsersByField = (fieldId: string): User[] =>
  mockUsers.filter(user => user.fieldId === fieldId);

export const getStudentsByField = (fieldId: string): StudentUser[] =>
  mockUsers.filter(user => user.role === 'student' && user.fieldId === fieldId) as StudentUser[];

export const getTrainersByField = (fieldId: string): TrainerUser[] =>
  mockUsers.filter(user => user.role === 'trainer' && user.fieldId === fieldId) as TrainerUser[];

// Get user by ID
export const getUserById = (id: string): User | undefined =>
  mockUsers.find(user => user.id === id);

// Get user by email
export const getUserByEmail = (email: string): User | undefined =>
  mockUsers.find(user => user.email === email);

// Field assignment functions
export const assignUserToField = (userId: string, fieldId: string): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex === -1) return false;

  mockUsers[userIndex].fieldId = fieldId;
  return true;
};

// Validate field-based access control
export const validateFieldAccess = (userId: string, resourceFieldId: string): boolean => {
  const user = getUserById(userId);
  if (!user) return false;

  // Umbrella admins have access to all fields
  if (user.role === 'umbrella-admin') return true;

  // All other users can only access resources in their field
  return user.fieldId === resourceFieldId;
};