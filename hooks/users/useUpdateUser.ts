import { useState } from 'react';
import { User, UserType, ApiResponse } from '@/types';
import { useUsers } from '@/contexts';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';

interface UpdateUserData {
  name?: string;
  email?: string;
  role?: UserType;
  status?: 'active' | 'inactive' | 'suspended' | 'paused';
  fieldId?: string;
  field?: string;
}

interface UseUpdateUserReturn {
  updateUser: (id: string, data: UpdateUserData) => Promise<User | null>;
  isLoading: boolean;
  error: string | null;
}

export function useUpdateUser(): UseUpdateUserReturn {
  const { refreshUsers } = useUsers();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (id: string, data: UpdateUserData): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.put<ApiResponse<User>>(API_ENDPOINTS.USER_BY_ID(id), data);
      await refreshUsers();
      return response.data ?? null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUser,
    isLoading,
    error,
  };
}
