import { useState } from 'react';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';

interface UseTrainersReturn {
  isLoading: boolean;
  error: string | null;
  approveTrainer: (id: string) => Promise<void>;
  rejectTrainer: (id: string) => Promise<void>;
  deleteTrainer: (id: string) => Promise<void>;
}

export function useTrainers(): UseTrainersReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const approveTrainer = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      await apiClient.post(API_ENDPOINTS.AUTH_APPROVE_TRAINER(id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const rejectTrainer = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      await apiClient.post(API_ENDPOINTS.AUTH_REJECT_TRAINER(id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTrainer = async (id: string): Promise<void> => {
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

  return { isLoading, error, approveTrainer, rejectTrainer, deleteTrainer };
}
