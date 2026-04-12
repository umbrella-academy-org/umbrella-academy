import { useState } from 'react';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';
import { User, UserType } from '@/types';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'paused';

export interface CreateUserData {
  email: string;
  password: string;
  role: UserType;
  firstName: string;
  lastName: string;
  fieldId?: string;
}

interface UseUsersReturn {
  isLoading: boolean;
  error: string | null;
  createUser: (data: CreateUserData) => Promise<User | null>;
  updateUser: (id: string, data: Partial<User>) => Promise<User | null>;
  deleteUser: (id: string) => Promise<boolean>;
  updateUserStatus: (id: string, status: UserStatus) => Promise<void>;
  filterByRole: (users: User[], role: UserType) => User[];
}

export function useUsers(): UseUsersReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (data: CreateUserData): Promise<User | null> => {
    try {
      setIsLoading(true);
      const res = await apiClient.post<{ data: User }>(API_ENDPOINTS.USERS, data);
      setError(null);
      return res.data ?? null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, data: Partial<User>): Promise<User | null> => {
    try {
      setIsLoading(true);
      const res = await apiClient.put<{ data: User }>(API_ENDPOINTS.USER_BY_ID(id), data);
      setError(null);
      return res.data ?? null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await apiClient.delete(API_ENDPOINTS.USER_BY_ID(id));
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserStatus = async (id: string, status: UserStatus): Promise<void> => {
    try {
      setIsLoading(true);
      await apiClient.put(API_ENDPOINTS.USER_STATUS(id), { status });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const filterByRole = (users: User[], role: UserType): User[] => {
    return users.filter((u) => u.role === role);
  };

  return { isLoading, error, createUser, updateUser, deleteUser, updateUserStatus, filterByRole };
}
