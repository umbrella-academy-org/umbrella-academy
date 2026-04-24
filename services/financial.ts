import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import type { ApiResponse } from '@/types';

export interface Transaction {
  id: string;
  walletId: string;
  type: 'payment' | 'withdrawal' | 'refund' | 'transfer';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  date: string;
  reference?: string;
}

export interface Wallet {
  id: string;
  ownerId: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  studentId: string;
  type: 'orientation' | 'subscription';
  amount: number;
  status: 'pending' | 'success' | 'failed';
  transactionRef: string;
  paidAt: string;
}

class FinancialService {
  async getMyWallet(): Promise<ApiResponse<Wallet>> {
    return apiClient.get<Wallet>(API_ENDPOINTS.WALLET_ME);
  }

  async getAllWallets(): Promise<ApiResponse<Wallet[]>> {
    return apiClient.get<Wallet[]>(API_ENDPOINTS.WALLET);
  }

  async getMyPayments(): Promise<ApiResponse<Payment[]>> {
    return apiClient.get<Payment[]>(API_ENDPOINTS.STATS_ME);
  }
}

export const financialService = new FinancialService();
