// Payment and subscription-related type definitions

export type Currency = 'RWF';

export interface Subscription {
  planId: string;
  planName: string;
  amount: number;
  currency: Currency;
  billingCycle: 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  status: 'active' | 'cancelled' | 'expired';
  autoRenew: boolean;
}

export interface Transaction {
  id: string;
  type: 'income' | 'withdrawal' | 'payment';
  description: string;
  amount: number;
  currency: Currency;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  reference?: string;
}

export interface Wallet {
  id: string;
  ownerId: string;
  ownerType: 'trainer' | 'wing' | 'umbrella';
  balance: number;
  currency: Currency;
  transactions: Transaction[];
}