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

// Enhanced Payment Models for Wing-Based System

export interface Payment {
  id: string;
  studentId: string;
  wingId: string;
  amount: number;
  currency: Currency;
  paymentMethod: 'momo'; // Only MoMo payments allowed
  momoTransactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  revenueDistribution: RevenueDistribution;
  createdAt: Date;
  processedAt?: Date;
}

export interface RevenueDistribution {
  wingShare: number; // 65%
  academyShare: number; // 25%
  processingFee: number; // 10%
  wingId: string;
  transactionId: string;
}

export interface MoMoPaymentData {
  phoneNumber: string;
  amount: number;
  currency: Currency;
  reference: string;
  description: string;
}

// Payment Processing Interface Props
export interface PaymentProcessorProps {
  amount: number;
  wingId: string;
  studentId: string;
  paymentMethod: 'momo';
  momoDetails: MoMoPaymentData;
}