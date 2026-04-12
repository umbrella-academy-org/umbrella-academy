import { useState } from 'react';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';

interface UseMentorsReturn {
  isLoading: boolean;
  error: string | null;
  approveMentor: (id: string) => Promise<void>;
  rejectMentor: (id: string) => Promise<void>;
  deleteMentor: (id: string) => Promise<void>;
}

export function useMentors(): UseMentorsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const approveMentor = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      await apiClient.post(API_ENDPOINTS.AUTH_APPROVE_MENTOR(id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const rejectMentor = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      await apiClient.post(API_ENDPOINTS.AUTH_REJECT_MENTOR(id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMentor = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      await apiClient.delete(API_ENDPOINTS.USER_BY_ID(id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, approveMentor, rejectMentor, deleteMentor };
}
