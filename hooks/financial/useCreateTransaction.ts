import { useState } from 'react';
import { Transaction } from '@/types';
import { useFinancial, useAuth } from '@/contexts';

interface CreateTransactionData {
  type: 'income' | 'withdrawal' | 'payment';
  description: string;
  amount: number;
  reference?: string;
}

interface UseCreateTransactionReturn {
  createTransaction: (data: CreateTransactionData) => Promise<Transaction | null>;
  isLoading: boolean;
  error: string | null;
}

export function useCreateTransaction(): UseCreateTransactionReturn {
  const { refreshFinancialData } = useFinancial();
  const { hasPermission, user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTransaction = async (data: CreateTransactionData): Promise<Transaction | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check permissions based on transaction type
      const canCreateTransaction = 
        hasPermission('manage_system') || 
        hasPermission('view_wallet') ||
        (data.type === 'payment' && currentUser?.role === 'student');

      if (!canCreateTransaction) {
        throw new Error('Insufficient permissions to create transaction');
      }

      // Validate transaction data
      if (data.amount <= 0) {
        throw new Error('Transaction amount must be greater than 0');
      }
      if (!data.description.trim()) {
        throw new Error('Transaction description is required');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new transaction
      const newTransaction: Transaction = {
        id: `txn_${Date.now()}`,
        type: data.type,
        description: data.description,
        amount: data.amount,
        currency: 'RWF',
        date: new Date().toISOString(),
        status: 'pending',
        reference: data.reference || `${data.type.toUpperCase()}-${Date.now()}`
      };

      // In a real app, this would make an API call
      console.log('Creating transaction:', newTransaction);

      // Refresh financial data
      await refreshFinancialData();

      return newTransaction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create transaction';
      setError(errorMessage);
      console.error('Create transaction error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTransaction,
    isLoading,
    error
  };
}