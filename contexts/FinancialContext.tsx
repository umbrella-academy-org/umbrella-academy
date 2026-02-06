'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Wallet, Transaction, Subscription } from '@/types';
import {
  mockWallets,
  mockTransactions,
  mockSubscriptions,
  getWalletByOwnerId,
  getWalletsByType,
  getTransactionsByType
} from '@/data';
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
  const { user: currentUser, hasPermission } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [userWallet, setUserWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFinancialData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      if (!currentUser) {
        setWallets([]);
        setTransactions([]);
        setSubscriptions([]);
        setUserWallet(null);
        return;
      }

      let filteredWallets: Wallet[] = [];
      let filteredTransactions: Transaction[] = [];
      let filteredSubscriptions: Subscription[] = [];

      if (currentUser.role === 'umbrella-admin') {
        // Umbrella admin can see all financial data
        filteredWallets = mockWallets;
        filteredTransactions = mockTransactions;
        filteredSubscriptions = mockSubscriptions;
      } else if (currentUser.role === 'field-admin') {
        // Field admin can see field wallet and related transactions
        filteredWallets = mockWallets.filter(wallet =>
          wallet.ownerId === currentUser.fieldId || wallet.ownerType === 'umbrella'
        );
        filteredTransactions = mockTransactions.filter(transaction =>
          transaction.reference?.includes(currentUser.fieldId || '') ||
          transaction.type === 'income'
        );
        filteredSubscriptions = mockSubscriptions; // Can see all subscriptions for analytics
      } else if (currentUser.role === 'trainer') {
        // Trainers can see their own wallet and transactions
        const trainerWallet = mockWallets.find(wallet => wallet.ownerId === currentUser.id);
        filteredWallets = trainerWallet ? [trainerWallet] : [];
        filteredTransactions = trainerWallet?.transactions || [];
        filteredSubscriptions = []; // Trainers don't need subscription data
      } else if (currentUser.role === 'mentor') {
        // Mentors can see revenue analytics but not detailed transactions
        filteredWallets = [];
        filteredTransactions = mockTransactions.filter(t => t.type === 'income');
        filteredSubscriptions = mockSubscriptions; // For analytics
      } else if (currentUser.role === 'student') {
        // Students can see their subscription info only
        filteredWallets = [];
        filteredTransactions = mockTransactions.filter(t =>
          t.type === 'payment' && t.reference?.includes('PAY')
        );
        filteredSubscriptions = mockSubscriptions.filter(sub => sub.planId === 'plan_basic'); // Mock: student's subscription
      }

      setWallets(filteredWallets);
      setTransactions(filteredTransactions);
      setSubscriptions(filteredSubscriptions);

      // Set user's personal wallet
      const personalWallet = mockWallets.find(wallet => wallet.ownerId === currentUser.id);
      setUserWallet(personalWallet || null);

    } catch (err) {
      setError('Failed to load financial data');
      console.error('Error loading financial data:', err);
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
      setSubscriptions([]);
      setUserWallet(null);
      setIsLoading(false);
    }
  }, [currentUser]);

  const getWalletByOwnerIdFromContext = (ownerId: string): Wallet | undefined => {
    return wallets.find(wallet => wallet.ownerId === ownerId);
  };

  const getUserTransactions = (): Transaction[] => {
    if (!currentUser) return [];

    if (currentUser.role === 'trainer') {
      return userWallet?.transactions || [];
    } else if (currentUser.role === 'student') {
      return transactions.filter(t => t.type === 'payment');
    }

    return transactions;
  };

  const getUserSubscriptions = (): Subscription[] => {
    if (currentUser?.role === 'student') {
      return subscriptions;
    }
    return [];
  };

  const getTotalBalance = (): number => {
    if (!currentUser) return 0;

    if (currentUser.role === 'umbrella-admin') {
      return wallets.reduce((total, wallet) => total + wallet.balance, 0);
    } else if (currentUser.role === 'field-admin') {
      const fieldWallet = wallets.find(w => w.ownerId === currentUser.fieldId);
      return fieldWallet?.balance || 0;
    } else if (currentUser.role === 'trainer') {
      return userWallet?.balance || 0;
    }

    return 0;
  };

  const getMonthlyRevenue = (): number => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return transactions
      .filter(t => {
        const transactionDate = new Date(t.date);
        return t.type === 'payment' &&
          t.status === 'completed' &&
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear;
      })
      .reduce((total, t) => total + t.amount, 0);
  };

  const refreshFinancialData = async () => {
    await loadFinancialData();
  };

  const value: FinancialContextType = {
    wallets,
    transactions,
    subscriptions,
    userWallet,
    isLoading,
    error,
    getWalletByOwnerIdFromContext,
    getUserTransactions,
    getUserSubscriptions,
    getTotalBalance,
    getMonthlyRevenue,
    refreshFinancialData
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
}