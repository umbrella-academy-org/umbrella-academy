import { useState } from 'react';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';
import { Payment } from '@/types';

// IPayment is the backend-shaped payment object
export interface IPayment {
  _id: string;
  studentId: string;
  fieldId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  momoTransactionId?: string;
  createdAt: string;
  processedAt?: string;
}

interface UsePaymentsReturn {
  isLoading: boolean;
  error: string | null;
  getPaymentDetails: (id: string) => Promise<IPayment | null>;
  filterByStatus: (payments: IPayment[], status: string) => IPayment[];
  filterByField: (payments: IPayment[], fieldId: string) => IPayment[];
}

export function usePayments(): UsePaymentsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPaymentDetails = async (id: string): Promise<IPayment | null> => {
    try {
      setIsLoading(true);
      const res = await apiClient.get<{ data: IPayment }>(API_ENDPOINTS.PAYMENTS + '/' + id);
      setError(null);
      return res.data ?? null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const filterByStatus = (payments: IPayment[], status: string): IPayment[] => {
    return payments.filter((p) => p.status === status);
  };

  const filterByField = (payments: IPayment[], fieldId: string): IPayment[] => {
    return payments.filter((p) => p.fieldId === fieldId);
  };

  return { isLoading, error, getPaymentDetails, filterByStatus, filterByField };
}
