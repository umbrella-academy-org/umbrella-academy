import { useState } from 'react';
import { useUsers } from '@/contexts';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';

interface UseDeleteUserReturn {
  deleteUser: (userId: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export function useDeleteUser(): UseDeleteUserReturn {
  const { refreshUsers } = useUsers();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.delete(API_ENDPOINTS.USER_BY_ID(userId));
      await refreshUsers();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteUser,
    isLoading,
    error,
  };
}
