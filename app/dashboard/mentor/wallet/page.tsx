'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft, Download, Award } from 'lucide-react';
import { useFinancial } from '@/contexts';
import { Transaction } from '@/types';

function computeNextPayoutDate(): string {
  const now = new Date();
  // Next payout is on the 23rd of the current or next month
  const payoutDay = 23;
  const next = new Date(now.getFullYear(), now.getMonth(), payoutDay);
  if (next <= now) {
    next.setMonth(next.getMonth() + 1);
  }
  return next.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const formatAmount = (t: Transaction): string => {
  const sign = t.type === 'withdrawal' ? '-' : '+';
  return `${sign}RWF ${t.amount.toLocaleString()}`;
};

const getTransactionIcon = (type: Transaction['type']) => {
  if (type === 'withdrawal') {
    return <ArrowUpRight className="w-4 h-4 text-gray-600" />;
  }
  return <ArrowDownLeft className="w-4 h-4 text-gray-600" />;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">✓ Completed</span>;
    case 'pending':
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">⏳ Pending</span>;
    case 'failed':
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">✗ Failed</span>;
    default:
      return null;
  }
};

export default function MentorWalletPage() {
  const { getUserTransactions, getTotalBalance, getMonthlyRevenue, userWallet, isLoading } = useFinancial();
  const transactions = getUserTransactions();
  const currentBalance = getTotalBalance();
  const monthlyEarnings = getMonthlyRevenue();
  const nextPayoutDate = computeNextPayoutDate();
  const nextPayoutDate = computeNextPayoutDate();

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
              <div className="bg-linear-to-br from-gray-500 to-gray-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Current Balance</h3>
                  <DollarSign className="w-8 h-8 opacity-80" />
                </div>
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-9 bg-gray-300 rounded w-40 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold mb-2">RWF {currentBalance.toLocaleString()}</div>
                    <div className="text-gray-100 text-sm">Available for withdrawal</div>
                  </>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
                  <TrendingUp className="w-8 h-8 text-gray-500" />
                </div>
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-9 bg-gray-200 rounded w-40 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-gray-900 mb-2">RWF {monthlyEarnings.toLocaleString()}</div>
                    <div className="text-gray-600 text-sm">Monthly earnings</div>
                  </>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Wallet Balance</h3>
                  <Award className="w-8 h-8 text-gray-500" />
                </div>
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-9 bg-gray-200 rounded w-40 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-gray-900 mb-2">RWF {(userWallet?.balance ?? 0).toLocaleString()}</div>
                    <div className="text-gray-600 text-sm">Wallet total</div>
                  </>
                )}
              </div>
            </div>

            {/* Withdrawal Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Withdrawal</h3>
                  <p className="text-sm text-gray-600">Next payout: {nextPayoutDate}</p>
                </div>
                <button className="px-6 py-2.5 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                  Request Withdrawal
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '90%' }}></div>
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
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {isLoading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <tr key={i}>
                          <td className="py-4 px-6">
                            <div className="animate-pulse flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-200 rounded"></div>
                              <div className="h-4 bg-gray-200 rounded w-32"></div>
                            </div>
                          </td>
                          <td className="py-4 px-6"><div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div></td>
                          <td className="py-4 px-6"><div className="animate-pulse h-4 bg-gray-200 rounded w-20"></div></td>
                          <td className="py-4 px-6"><div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div></td>
                          <td className="py-4 px-6"><div className="animate-pulse h-4 bg-gray-200 rounded w-16"></div></td>
                        </tr>
                      ))
                    ) : transactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 px-6 text-center text-sm text-gray-500">
                          No transactions yet.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0">
                                {getTransactionIcon(transaction.type)}
                              </div>
                              <span className="text-sm text-gray-900 font-medium">{transaction.description}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-4 px-6">{getStatusBadge(transaction.status)}</td>
                          <td className="py-4 px-6">
                            <span className="text-sm font-medium text-gray-600">
                              {formatAmount(transaction)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            {transaction.reference ? (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Award className="w-3 h-3" />
                                {transaction.reference}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
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
