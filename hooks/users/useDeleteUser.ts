import { useState } from 'react';
import { useUsers, useAuth } from '@/contexts';

interface UseDeleteUserReturn {
  deleteUser: (userId: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export function useDeleteUser(): UseDeleteUserReturn {
  const { refreshUsers, getUserByIdFromContext } = useUsers();
  const { hasPermission } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check permissions - only system admins can delete users
      if (!hasPermission('manage_system')) {
        throw new Error('Insufficient permissions to delete users');
      }

      // Get existing user
      const existingUser = getUserByIdFromContext(userId);
      if (!existingUser) {
        throw new Error('User not found');
      }

      // Prevent deletion of umbrella admins
      if (existingUser.role === 'umbrella-admin') {
        throw new Error('Cannot delete umbrella admin users');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would make an API call
      console.log('Deleting user:', userId);

      // Refresh users list
      await refreshUsers();

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      console.error('Delete user error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteUser,
    isLoading,
    error
  };
}