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
  ownerType: 'trainer' | 'field' | 'umbrella';
  balance: number;
  currency: Currency;
  transactions: Transaction[];
}

// Enhanced Payment Models for Field-Based System

export interface Payment {
  id: string;
  studentId: string;
  fieldId: string;
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
  fieldShare: number; // 65%
  academyShare: number; // 25%
  processingFee: number; // 10%
  fieldId: string;
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
  fieldId: string;
  studentId: string;
  paymentMethod: 'momo';
  momoDetails: MoMoPaymentData;
}