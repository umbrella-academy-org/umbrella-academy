import { useState } from 'react';
import { User, UserType, ApiResponse } from '@/types';
import { useUsers } from '@/contexts';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';

interface CreateUserData {
  email: string;
  password: string;
  role: UserType;
  firstName: string;
  lastName: string;
  fieldId?: string;
}

interface UseCreateUserReturn {
  createUser: (data: CreateUserData) => Promise<User | null>;
  isLoading: boolean;
  error: string | null;
}

export function useCreateUser(): UseCreateUserReturn {
  const { refreshUsers } = useUsers();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (data: CreateUserData): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<ApiResponse<User>>(API_ENDPOINTS.USERS, data);
      await refreshUsers();
      return response.data ?? null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser,
    isLoading,
    error,
  };
}
