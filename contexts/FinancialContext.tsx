'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { financialService, type Wallet, type Transaction, type Subscription } from '@/services/financial';
import { useAuth } from './AuthContext';

interface FinancialContextType {
  wallets: Wallet[];
  transactions: Transaction[];
  subscriptions: Subscription[];
  userWallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
  getWalletByOwnerIdFromContext: (ownerId: string) => Wallet | undefined;
  getUserTransactions: () => Transaction[];
  getUserSubscriptions: () => Subscription[];
  getTotalBalance: () => number;
  getMonthlyRevenue: () => number;
  refreshFinancialData: () => Promise<void>;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export function FinancialProvider({ children }: { children: React.ReactNode }) {
  const { user: currentUser } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [subscriptions] = useState<Subscription[]>([]);
  const [userWallet, setUserWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFinancialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!currentUser) {
        setWallets([]);
        setTransactions([]);
        setUserWallet(null);
        return;
      }

      if (currentUser.role === 'student') {
        // Fetch payment history
        const paymentsRes = await financialService.getMyPayments();
        const payments = paymentsRes.data ?? [];
        // Convert payments to transactions format
        const paymentTransactions: Transaction[] = payments.map(p => ({
          id: p.id,
          walletId: '',
          type: 'payment',
          amount: p.amount,
          status: p.status === 'success' ? 'completed' : p.status,
          description: `${p.type} payment`,
          date: p.paidAt,
          reference: p.transactionRef,
        }));
        setTransactions(paymentTransactions);
        setWallets([]);
        setUserWallet(null);
      } else {
        setWallets([]);
        setTransactions([]);
        setUserWallet(null);
      }
    } catch {
      setError('Failed to load financial data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadFinancialData();
    } else {
      setWallets([]);
      setTransactions([]);
      setUserWallet(null);
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const getWalletByOwnerIdFromContext = (ownerId: string) => wallets.find(w => w.ownerId === ownerId);

  const getUserTransactions = () => {
    if (!currentUser) return [];
    if (currentUser.role === 'trainer') return userWallet?.transactions ?? [];
    return transactions;
  };

  const getUserSubscriptions = () => subscriptions;

  const getTotalBalance = () => {
    if (!currentUser) return 0;
    if (currentUser.role === 'admin') return wallets.reduce((sum, w) => sum + w.balance, 0);
    return userWallet?.balance ?? 0;
  };

  const getMonthlyRevenue = () => {
    const now = new Date();
    return transactions
      .filter(t => {
        const d = new Date(t.date);
        return t.type === 'payment' && t.status === 'completed' &&
          d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <FinancialContext.Provider value={{
      wallets, transactions, subscriptions, userWallet,
      isLoading, error,
      getWalletByOwnerIdFromContext, getUserTransactions,
      getUserSubscriptions, getTotalBalance, getMonthlyRevenue,
      refreshFinancialData: loadFinancialData,
    }}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (!context) throw new Error('useFinancial must be used within a FinancialProvider');
  return context;
}
