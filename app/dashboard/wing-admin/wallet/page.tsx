'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import WalletTransactionsTable from '@/components/wing-admin/WalletTransactionsTable';

import { CreditCard, TrendingUp, Download, ArrowUpRight } from 'lucide-react';

export default function WingAdminWalletPage() {
  const transactions = [
    {
      id: 1,
      type: 'income',
      description: 'Student Payment - Alice Johnson',
      amount: 175.00,
      date: '2024-01-22',
      status: 'completed'
    },
    {
      id: 2,
      type: 'withdrawal',
      description: 'Withdrawal to Bank Account',
      amount: -500.00,
      date: '2024-01-20',
      status: 'completed'
    },
    {
      id: 3,
      type: 'income',
      description: 'Student Payment - Bob Wilson',
      amount: 175.00,
      date: '2024-01-19',
      status: 'completed'
    }
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Wing Wallet" userType="wing-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Wing Wallet</h1>
              <p className="text-gray-600">Manage wing finances and withdrawals</p>
            </div>

            {/* Wallet Balance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Available Balance</p>
                    <p className="text-3xl font-bold">RWF 3,675,000</p>
                  </div>
                  <CreditCard className="w-8 h-8 text-yellow-200" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">RWF 1,837,500</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Withdrawn</p>
                    <p className="text-2xl font-bold text-gray-900">RWF 13,125,000</p>
                  </div>
                  <Download className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mb-6">
              <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                Request Withdrawal
              </button>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
              </div>
              <div className="p-6">
                <WalletTransactionsTable transactions={transactions} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}