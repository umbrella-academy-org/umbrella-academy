import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import { Payment } from '@/types';
import { ApiResponse } from '@/types/api';

export interface InitiatePaymentData {
  fieldId: string;
  amount: number;
  phoneNumber: string;
}

class PaymentService {
  async initiatePayment(data: InitiatePaymentData): Promise<ApiResponse<Payment>> {
    return apiClient.post<Payment>(API_ENDPOINTS.PAYMENTS, data);
  }

  async getMyPayments(): Promise<ApiResponse<Payment[]>> {
    return apiClient.get<Payment[]>(API_ENDPOINTS.PAYMENTS);
  }
}

export const paymentService = new PaymentService();
