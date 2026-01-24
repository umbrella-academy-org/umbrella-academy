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

      // Simulate user creation
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email,
        role: data.role,
        wing: data.wing,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
      };

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