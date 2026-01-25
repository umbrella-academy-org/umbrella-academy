import { useState } from 'react';
import { User, UserType } from '@/types';
import { useUsers, useAuth } from '@/contexts';

interface CreateUserData {
  name: string;
  email: string;
  role: UserType;
  wing?: string;
}

interface UseCreateUserReturn {
  createUser: (data: CreateUserData) => Promise<User | null>;
  isLoading: boolean;
  error: string | null;
}

export function useCreateUser(): UseCreateUserReturn {
  const { refreshUsers } = useUsers();
  const { hasPermission } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (data: CreateUserData): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check permissions
      if (!hasPermission('manage_wing') && !hasPermission('manage_system')) {
        throw new Error('Insufficient permissions to create users');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('Invalid email format');
      }

      // Create user with proper type handling
      let newUser: User;
      
      if (data.role === 'student') {
        newUser = {
          id: `user_${Date.now()}`,
          name: data.name,
          email: data.email,
          role: 'student',
          wing: data.wing,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
          availability: {
            weeklyAvailableHours: 10,
            preferredSessionDuration: 2,
            preferredTimeSlots: ['evening'],
            preferredDays: ['monday', 'wednesday', 'friday']
          },
          learningPreferences: {
            pace: 'medium',
            style: 'mixed'
          }
        };
      } else if (data.role === 'trainer') {
        newUser = {
          id: `user_${Date.now()}`,
          name: data.name,
          email: data.email,
          role: 'trainer',
          wing: data.wing,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
          availability: {
            weeklyAvailableHours: 20,
            maxStudentsPerSession: 5,
            preferredSessionDuration: 2,
            availableTimeSlots: ['morning', 'afternoon'],
            availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
          },
          expertise: ['General Training'],
          experience: {
            yearsOfExperience: 2,
            specializations: ['Beginner Training']
          }
        };
      } else if (data.role === 'mentor') {
        newUser = {
          id: `user_${Date.now()}`,
          name: data.name,
          email: data.email,
          role: 'mentor',
          wing: data.wing,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
          expertise: ['General Mentoring'],
          experience: {
            yearsOfExperience: 3,
            specializations: ['Student Guidance']
          }
        };
      } else {
        // Admin users
        newUser = {
          id: `user_${Date.now()}`,
          name: data.name,
          email: data.email,
          role: data.role,
          wing: data.wing,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
          permissions: data.role === 'umbrella-admin' ? ['manage_system', 'manage_wing', 'manage_users'] : ['manage_wing', 'manage_users']
        };
      }

      // In a real app, this would make an API call
      console.log('Creating user:', newUser);

      // Refresh users list
      await refreshUsers();

      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      console.error('Create user error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser,
    isLoading,
    error
  };
}