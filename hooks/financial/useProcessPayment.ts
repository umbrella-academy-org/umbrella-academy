import { useState } from 'react';
import { Transaction } from '@/types';
import { useFinancial, useAuth } from '@/contexts';

interface PaymentData {
  amount: number;
  description: string;
  planId?: string;
}

interface UseProcessPaymentReturn {
  processPayment: (data: PaymentData) => Promise<Transaction | null>;
  isLoading: boolean;
  error: string | null;
}

export function useProcessPayment(): UseProcessPaymentReturn {
  const { refreshFinancialData } = useFinancial();
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (data: PaymentData): Promise<Transaction | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Only students can process payments for subscriptions
      if (currentUser?.role !== 'student') {
        throw new Error('Only students can process subscription payments');
      }

      // Validate payment data
      if (data.amount <= 0) {
        throw new Error('Payment amount must be greater than 0');
      }
      if (!data.description.trim()) {
        throw new Error('Payment description is required');
      }

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate payment gateway response (90% success rate)
      const isSuccessful = Math.random() > 0.1;
      
      if (!isSuccessful) {
        throw new Error('Payment processing failed. Please try again.');
      }

      // Create payment transaction
      const paymentTransaction: Transaction = {
        id: `pay_${Date.now()}`,
        type: 'payment',
        description: data.description,
        amount: data.amount,
        currency: 'RWF',
        date: new Date().toISOString(),
        status: 'completed',
        reference: `PAY-${currentUser.id}-${Date.now()}`
      };

      // In a real app, this would make an API call to process payment
      console.log('Processing payment:', paymentTransaction);

      // Refresh financial data
      await refreshFinancialData();

      return paymentTransaction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment processing failed';
      setError(errorMessage);
      console.error('Process payment error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    processPayment,
    isLoading,
    error
  };
}