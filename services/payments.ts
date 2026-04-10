import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import { Payment } from '@/types';

export interface InitiatePaymentData {
  fieldId: string;
  amount: number;
  phoneNumber: string;
}

class PaymentService {
  async initiatePayment(data: InitiatePaymentData): Promise<{ success: boolean; data: Payment }> {
    return apiClient.post<{ success: boolean; data: Payment }>(API_ENDPOINTS.PAYMENTS, data);
  }

  async getMyPayments(): Promise<{ success: boolean; data: Payment[] }> {
    return apiClient.get<{ success: boolean; data: Payment[] }>(API_ENDPOINTS.PAYMENTS);
  }
}

export const paymentService = new PaymentService();
