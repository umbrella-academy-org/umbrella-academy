import { useState } from 'react';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';
import { FeedbackTicket } from '@/types/admin';

interface UseFeedbackReturn {
  isLoading: boolean;
  error: string | null;
  updateTicketStatus: (id: string, status: FeedbackTicket['status']) => Promise<void>;
  addAdminResponse: (id: string, response: string) => Promise<void>;
}

export function useFeedback(): UseFeedbackReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTicketStatus = async (id: string, status: FeedbackTicket['status']): Promise<void> => {
    try {
      setIsLoading(true);
      await apiClient.patch(API_ENDPOINTS.ADMIN_FEEDBACK_BY_ID(id), { status });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const addAdminResponse = async (id: string, response: string): Promise<void> => {
    try {
      setIsLoading(true);
      await apiClient.post(API_ENDPOINTS.ADMIN_FEEDBACK_RESPONSE(id), { response });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateTicketStatus, addAdminResponse };
}
