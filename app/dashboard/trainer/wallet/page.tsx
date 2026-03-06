'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownLeft, Download, User } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'bonus';
  description: string;
  student?: string;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'processing';
}

export default function TrainerWalletPage() {
  const [currentBalance] = useState(245000);
  const [monthlyEarnings] = useState(45000);
  const [totalEarned] = useState(890000);

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'earning',
      description: 'Session Payment',
      student: 'Alice Johnson',
      date: 'Jan 18, 2026',
      amount: '+RWF 2,500',
      status: 'completed'
    },
    {
      id: '2',
      type: 'withdrawal',
      description: 'Bank Transfer',
      date: 'Jan 15, 2026',
      amount: '-RWF 50,000',
      status: 'completed'
    },
    {
      id: '3',
      type: 'earning',
      description: 'Session Payment',
      student: 'Bob Smith',
      date: 'Jan 17, 2026',
      amount: '+RWF 2,500',
      status: 'completed'
    },
    {
      id: '4',
      type: 'bonus',
      description: 'Performance Bonus',
      date: 'Jan 16, 2026',
      amount: '+RWF 5,000',
      status: 'completed'
    },
    {
      id: '5',
      type: 'earning',
      description: 'Session Payment',
      student: 'Carol Davis',
      date: 'Jan 16, 2026',
      amount: '+RWF 2,500',
      status: 'pending'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning':
        return <ArrowDownLeft className="w-4 h-4 text-gray-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-gray-600" />;
      case 'bonus':
        return <ArrowDownLeft className="w-4 h-4 text-gray-600" />;
      default:
        return <ArrowDownLeft className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">✓ Completed</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">⏳ Pending</span>;
      case 'processing':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">🔄 Processing</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Wallet" userType="trainer" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Wallet</h1>
              <p className="text-sm text-gray-500">Track your earnings and manage withdrawals</p>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Current Balance</h3>
                  <DollarSign className="w-8 h-8 opacity-80" />
                </div>
                <div className="text-3xl font-bold mb-2">RWF {currentBalance.toLocaleString()}</div>
                <div className="text-gray-100 text-sm">Available for withdrawal</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
                  <TrendingUp className="w-8 h-8 text-gray-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">RWF {monthlyEarnings.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">+15% vs last month</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Earned</h3>
                  <Calendar className="w-8 h-8 text-gray-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">RWF {totalEarned.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">All time earnings</div>
              </div>
            </div>

            {/* Withdrawal Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Withdrawal</h3>
                  <p className="text-sm text-gray-600">Next payout in 5 days (Jan 25, 2026)</p>
                </div>
                <button className="px-6 py-2.5 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                  Request Withdrawal
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <p className="text-sm text-gray-600 mt-1">Your latest earnings and withdrawals</p>
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
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Student</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                              transaction.type === 'earning' ? 'bg-gray-100' :
                              transaction.type === 'withdrawal' ? 'bg-gray-100' : 'bg-gray-100'
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
                            transaction.amount.startsWith('+') ? 'text-gray-600' : 'text-gray-600'
                          }`}>
                            {transaction.amount}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {transaction.student ? (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <User className="w-3 h-3" />
                              {transaction.student}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
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