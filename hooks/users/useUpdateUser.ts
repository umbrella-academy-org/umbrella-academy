import { useState } from 'react';
import { User } from '@/types';
import { useUsers, useAuth } from '@/contexts';

interface UpdateUserData {
  id: string;
  name?: string;
  email?: string;
  status?: 'active' | 'inactive' | 'suspended' | 'paused';
  wing?: string;
}

interface UseUpdateUserReturn {
  updateUser: (data: UpdateUserData) => Promise<User | null>;
  isLoading: boolean;
  error: string | null;
}

export function useUpdateUser(): UseUpdateUserReturn {
  const { refreshUsers, getUserByIdFromContext } = useUsers();
  const { hasPermission, user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (data: UpdateUserData): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check permissions
      const canManageUsers = hasPermission('manage_wing') || hasPermission('manage_system');
      const isOwnProfile = currentUser?.id === data.id;
      
      if (!canManageUsers && !isOwnProfile) {
        throw new Error('Insufficient permissions to update user');
      }

      // Get existing user
      const existingUser = getUserByIdFromContext(data.id);
      if (!existingUser) {
        throw new Error('User not found');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Validate email if provided
      if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          throw new Error('Invalid email format');
        }
      }

      // Create updated user object
      const updatedUser: User = {
        ...existingUser,
        ...data,
        id: existingUser.id // Ensure ID doesn't change
      };

      // In a real app, this would make an API call
      console.log('Updating user:', updatedUser);

      // Refresh users list
      await refreshUsers();

      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      console.error('Update user error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUser,
    isLoading,
    error
  };
}