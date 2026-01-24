// Mock transaction and wallet data for Umbrella Academy LMS

import { Transaction, Wallet, Subscription } from '@/types';

// Mock transactions
export const mockTransactions: Transaction[] = [
  // Student payments
  {
    id: 'txn_001',
    type: 'payment',
    description: 'Monthly subscription - Full Stack Web Development',
    amount: 25000, // RWF
    currency: 'RWF',
    date: '2024-12-01T09:00:00Z',
    status: 'completed',
    reference: 'PAY-001-2024-12'
  },
  {
    id: 'txn_002',
    type: 'payment',
    description: 'Monthly subscription - Data Science with Python',
    amount: 30000, // RWF
    currency: 'RWF',
    date: '2024-12-01T10:15:00Z',
    status: 'completed',
    reference: 'PAY-002-2024-12'
  },
  {
    id: 'txn_003',
    type: 'payment',
    description: 'Monthly subscription - Mobile App Development',
    amount: 28000, // RWF
    currency: 'RWF',
    date: '2024-12-01T11:30:00Z',
    status: 'pending',
    reference: 'PAY-003-2024-12'
  },

  // Trainer income
  {
    id: 'txn_101',
    type: 'income',
    description: 'Training sessions - November 2024',
    amount: 180000, // RWF
    currency: 'RWF',
    date: '2024-12-01T14:00:00Z',
    status: 'completed',
    reference: 'INC-101-2024-11'
  },
  {
    id: 'txn_102',
    type: 'income',
    description: 'Bonus for excellent student feedback',
    amount: 50000, // RWF
    currency: 'RWF',
    date: '2024-12-05T16:30:00Z',
    status: 'completed',
    reference: 'BON-102-2024-12'
  },

  // Trainer withdrawals
  {
    id: 'txn_103',
    type: 'withdrawal',
    description: 'Bank transfer to BK Account ***1234',
    amount: 150000, // RWF
    currency: 'RWF',
    date: '2024-12-03T12:00:00Z',
    status: 'completed',
    reference: 'WTH-103-2024-12'
  },

  // Wing revenue
  {
    id: 'txn_201',
    type: 'income',
    description: 'Wing share - November 2024',
    amount: 427500, // RWF (15% of total revenue)
    currency: 'RWF',
    date: '2024-12-01T18:00:00Z',
    status: 'completed',
    reference: 'WNG-201-2024-11'
  },

  // Umbrella revenue
  {
    id: 'txn_301',
    type: 'income',
    description: 'Platform revenue - November 2024',
    amount: 1282500, // RWF (45% of total revenue)
    currency: 'RWF',
    date: '2024-12-01T20:00:00Z',
    status: 'completed',
    reference: 'UMB-301-2024-11'
  }
];

// Mock wallets
export const mockWallets: Wallet[] = [
  // Trainer wallets
  {
    id: 'wallet_101',
    ownerId: 'user_101', // Sarah Ingabire
    ownerType: 'trainer',
    balance: 230000, // RWF
    currency: 'RWF',
    transactions: [
      mockTransactions.find(t => t.id === 'txn_101')!,
      mockTransactions.find(t => t.id === 'txn_102')!,
      mockTransactions.find(t => t.id === 'txn_103')!
    ]
  },
  {
    id: 'wallet_102',
    ownerId: 'user_102', // James Mutabazi
    ownerType: 'trainer',
    balance: 195000, // RWF
    currency: 'RWF',
    transactions: []
  },
  {
    id: 'wallet_103',
    ownerId: 'user_103', // Alice Nyirahabimana
    ownerType: 'trainer',
    balance: 165000, // RWF
    currency: 'RWF',
    transactions: []
  },

  // Wing wallets
  {
    id: 'wallet_201',
    ownerId: 'kigali-central',
    ownerType: 'wing',
    balance: 427500, // RWF
    currency: 'RWF',
    transactions: [
      mockTransactions.find(t => t.id === 'txn_201')!
    ]
  },
  {
    id: 'wallet_202',
    ownerId: 'northern-wing',
    ownerType: 'wing',
    balance: 288000, // RWF
    currency: 'RWF',
    transactions: []
  },
  {
    id: 'wallet_203',
    ownerId: 'southern-wing',
    ownerType: 'wing',
    balance: 252000, // RWF
    currency: 'RWF',
    transactions: []
  },

  // Umbrella wallet
  {
    id: 'wallet_301',
    ownerId: 'umbrella-admin',
    ownerType: 'umbrella',
    balance: 5680000, // RWF
    currency: 'RWF',
    transactions: [
      mockTransactions.find(t => t.id === 'txn_301')!
    ]
  }
];

// Mock subscriptions
export const mockSubscriptions: Subscription[] = [
  {
    planId: 'plan_basic',
    planName: 'Basic Learning Plan',
    amount: 25000, // RWF
    currency: 'RWF',
    billingCycle: 'monthly',
    startDate: '2024-11-01',
    endDate: '2024-12-01',
    status: 'active',
    autoRenew: true
  },
  {
    planId: 'plan_premium',
    planName: 'Premium Learning Plan',
    amount: 30000, // RWF
    currency: 'RWF',
    billingCycle: 'monthly',
    startDate: '2024-10-15',
    endDate: '2024-11-15',
    status: 'active',
    autoRenew: true
  },
  {
    planId: 'plan_pro',
    planName: 'Professional Learning Plan',
    amount: 28000, // RWF
    currency: 'RWF',
    billingCycle: 'monthly',
    startDate: '2024-11-20',
    endDate: '2024-12-20',
    status: 'active',
    autoRenew: false
  },
  {
    planId: 'plan_annual',
    planName: 'Annual Learning Plan',
    amount: 300000, // RWF (equivalent to 12 months at 25k)
    currency: 'RWF',
    billingCycle: 'yearly',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    status: 'active',
    autoRenew: true
  }
];

// Helper functions
export const getWalletByOwnerId = (ownerId: string) => 
  mockWallets.find(wallet => wallet.ownerId === ownerId);

export const getWalletsByType = (ownerType: 'trainer' | 'wing' | 'umbrella') => 
  mockWallets.filter(wallet => wallet.ownerType === ownerType);

export const getTransactionsByType = (type: 'income' | 'withdrawal' | 'payment') => 
  mockTransactions.filter(transaction => transaction.type === type);

export const getTransactionsByStatus = (status: 'pending' | 'completed' | 'failed') => 
  mockTransactions.filter(transaction => transaction.status === status);

export const getSubscriptionsByStatus = (status: 'active' | 'cancelled' | 'expired') => 
  mockSubscriptions.filter(subscription => subscription.status === status);

export const getTotalRevenue = () => 
  mockTransactions
    .filter(t => t.type === 'payment' && t.status === 'completed')
    .reduce((total, t) => total + t.amount, 0);

export const getTotalTrainerPayouts = () => 
  mockTransactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((total, t) => total + t.amount, 0);

export const getTotalWingRevenue = () => 
  mockWallets
    .filter(w => w.ownerType === 'wing')
    .reduce((total, w) => total + w.balance, 0);

export const getUmbrellaRevenue = () => 
  mockWallets
    .find(w => w.ownerType === 'umbrella')?.balance || 0;