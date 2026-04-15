'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TransactionsTable from '@/components/umbrella-admin/TransactionsTable';
import { useFinancial } from '@/contexts/FinancialContext';

import { TrendingUp, DollarSign, CreditCard, PieChart } from 'lucide-react';

const UMBRELLA_SHARE = 0.65;

function StatSkeleton() {
  return (
    <div className="rounded-lg p-6 bg-gray-100 animate-pulse h-28" />
  );
}

export default function UmbrellaAdminFinancialPage() {
  const { getTotalBalance, getUserTransactions, isLoading } = useFinancial();

  const totalRevenue = getTotalBalance();
  const umbrellaShare = totalRevenue * UMBRELLA_SHARE;

  const rawTransactions = getUserTransactions();
  const transactions = rawTransactions.map((t, idx) => ({
    id: idx + 1,
    description: t.description,
    field: '—',
    amount: t.amount,
    umbrellaShare: Math.round(t.amount * UMBRELLA_SHARE * 100) / 100,
    date: t.date,
  }));

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Financial" userType={UserRole.ADMIN} />

      <div className="flex-1 flex flex-col overflow-y-scroll lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Financial Overview</h1>
              <p className="text-gray-600">Monitor system-wide financial performance</p>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {isLoading ? (
                <>
                  <StatSkeleton />
                  <StatSkeleton />
                  <StatSkeleton />
                  <StatSkeleton />
                </>
              ) : (
                <>
                  <div className="bg-linear-to-r from-gray-500 to-gray-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-100 text-sm">Total Revenue</p>
                        <p className="text-3xl font-bold">RWF {totalRevenue.toLocaleString()}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-gray-200" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Academy Share (65%)</p>
                        <p className="text-2xl font-bold text-gray-900">RWF {umbrellaShare.toLocaleString()}</p>
                      </div>
                      <PieChart className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Processing Fee (10%)</p>
                        <p className="text-2xl font-bold text-gray-900">RWF {Math.round(totalRevenue * 0.1).toLocaleString()}</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Growth Rate</p>
                        <p className="text-2xl font-bold text-gray-600">+12.5%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              </div>
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
                    ))}
                  </div>
                ) : transactions.length === 0 ? (
                  <p className="text-gray-500 text-sm">No transactions yet.</p>
                ) : (
                  <TransactionsTable transactions={transactions} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
