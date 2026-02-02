'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownLeft, Download, Award } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'bonus';
  description: string;
  wing?: string;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'processing';
}

export default function MentorWalletPage() {
  const [currentBalance] = useState(485000);
  const [monthlyEarnings] = useState(85000);
  const [totalEarned] = useState(1650000);

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'earning',
      description: 'Mentorship Fee',
      wing: 'Programming Wing',
      date: 'Jan 18, 2026',
      amount: '+RWF 15,000',
      status: 'completed'
    },
    {
      id: '2',
      type: 'withdrawal',
      description: 'Bank Transfer',
      date: 'Jan 15, 2026',
      amount: '-RWF 100,000',
      status: 'completed'
    },
    {
      id: '3',
      type: 'earning',
      description: 'Trainer Approval Fee',
      wing: 'Design Wing',
      date: 'Jan 17, 2026',
      amount: '+RWF 5,000',
      status: 'completed'
    },
    {
      id: '4',
      type: 'bonus',
      description: 'Excellence Bonus',
      date: 'Jan 16, 2026',
      amount: '+RWF 25,000',
      status: 'completed'
    },
    {
      id: '5',
      type: 'earning',
      description: 'Roadmap Review Fee',
      wing: 'Programming Wing',
      date: 'Jan 16, 2026',
      amount: '+RWF 8,000',
      status: 'pending'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      case 'bonus':
        return <ArrowDownLeft className="w-4 h-4 text-yellow-600" />;
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
      <Sidebar activeItem="Wallet" userType="mentor" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Wallet</h1>
              <p className="text-sm text-gray-500">Track your mentorship earnings and manage withdrawals</p>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Current Balance</h3>
                  <DollarSign className="w-8 h-8 opacity-80" />
                </div>
                <div className="text-3xl font-bold mb-2">RWF {currentBalance.toLocaleString()}</div>
                <div className="text-purple-100 text-sm">Available for withdrawal</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">RWF {monthlyEarnings.toLocaleString()}</div>
                <div className="text-green-600 text-sm">+22% vs last month</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Earned</h3>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">RWF {totalEarned.toLocaleString()}</div>
                <div className="text-blue-600 text-sm">All time earnings</div>
              </div>
            </div>

            {/* Withdrawal Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Withdrawal</h3>
                  <p className="text-sm text-gray-600">Next payout in 3 days (Jan 23, 2026)</p>
                </div>
                <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Request Withdrawal
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <p className="text-sm text-gray-600 mt-1">Your latest mentorship earnings and withdrawals</p>
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
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Wing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                              transaction.type === 'earning' ? 'bg-green-100' :
                              transaction.type === 'withdrawal' ? 'bg-red-100' : 'bg-yellow-100'
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
                          {transaction.wing ? (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Award className="w-3 h-3" />
                              {transaction.wing}
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