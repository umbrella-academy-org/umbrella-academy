'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { DollarSign, TrendingUp, Download, ArrowUpRight, ArrowDownLeft, Building2 } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'withdrawal' | 'fee';
  description: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'processing';
}

export default function WingAdminWalletPage() {
  const [currentBalance] = useState(3675000);
  const [monthlyIncome] = useState(1837500);
  const [totalWithdrawn] = useState(13125000);

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      description: 'Student Enrollment Fee',
      amount: '+RWF 175,000',
      date: 'Jan 22, 2026',
      status: 'completed'
    },
    {
      id: '2',
      type: 'withdrawal',
      description: 'Wing Operations Withdrawal',
      amount: '-RWF 500,000',
      date: 'Jan 20, 2026',
      status: 'completed'
    },
    {
      id: '3',
      type: 'income',
      description: 'Training Session Revenue',
      amount: '+RWF 125,000',
      date: 'Jan 19, 2026',
      status: 'completed'
    },
    {
      id: '4',
      type: 'fee',
      description: 'Platform Commission',
      amount: '-RWF 25,000',
      date: 'Jan 18, 2026',
      status: 'completed'
    },
    {
      id: '5',
      type: 'income',
      description: 'Subscription Revenue',
      amount: '+RWF 350,000',
      date: 'Jan 17, 2026',
      status: 'pending'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      case 'fee':
        return <ArrowUpRight className="w-4 h-4 text-orange-600" />;
      default:
        return <ArrowDownLeft className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">✓ Completed</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">⏳ Pending</span>;
      case 'processing':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">🔄 Processing</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Wallet" userType="wing-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Wing Wallet</h1>
              <p className="text-sm text-gray-500">Manage your wing's finances and withdrawals</p>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Wing Balance</h3>
                  <DollarSign className="w-8 h-8 opacity-80" />
                </div>
                <div className="text-3xl font-bold mb-2">RWF {currentBalance.toLocaleString()}</div>
                <div className="text-blue-100 text-sm">Available for operations</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">RWF {monthlyIncome.toLocaleString()}</div>
                <div className="text-green-600 text-sm">+18% vs last month</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Withdrawn</h3>
                  <Download className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">RWF {totalWithdrawn.toLocaleString()}</div>
                <div className="text-purple-600 text-sm">All time withdrawals</div>
              </div>
            </div>

            {/* Withdrawal Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Wing Operations</h3>
                  <p className="text-sm text-gray-600">Manage wing finances and operational expenses</p>
                </div>
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Request Withdrawal
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <p className="text-sm text-gray-600 mt-1">Wing revenue and operational expenses</p>
                </div>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Transaction</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Amount</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                              transaction.type === 'income' ? 'bg-green-100' :
                              transaction.type === 'withdrawal' ? 'bg-red-100' : 'bg-orange-100'
                            }`}>
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <span className="text-sm text-gray-900 font-medium">{transaction.description}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">{transaction.date}</td>
                        <td className="py-4 px-6">{getStatusBadge(transaction.status)}</td>
                        <td className="py-4 px-6">
                          <span className={`text-sm font-medium ${
                            transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.amount}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building2 className="w-3 h-3" />
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}