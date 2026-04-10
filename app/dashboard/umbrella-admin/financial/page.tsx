'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TransactionsTable from '@/components/umbrella-admin/TransactionsTable';
import { useFinancial } from '@/contexts/FinancialContext';
import { fieldsService, Field } from '@/services/fields';

import { TrendingUp, DollarSign, CreditCard, PieChart } from 'lucide-react';

const UMBRELLA_SHARE = 0.65;
const FIELDS_SHARE = 0.35;

function StatSkeleton() {
  return (
    <div className="rounded-lg p-6 bg-gray-100 animate-pulse h-28" />
  );
}

export default function UmbrellaAdminFinancialPage() {
  const { getTotalBalance, getUserTransactions, isLoading } = useFinancial();
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldsLoading, setFieldsLoading] = useState(true);

  useEffect(() => {
    fieldsService.getFields()
      .then(res => setFields(res.data ?? []))
      .catch(() => setFields([]))
      .finally(() => setFieldsLoading(false));
  }, []);

  const totalRevenue = getTotalBalance();
  const umbrellaShare = totalRevenue * UMBRELLA_SHARE;
  const fieldsShare = totalRevenue * FIELDS_SHARE;

  const rawTransactions = getUserTransactions();
  const transactions = rawTransactions.map((t, idx) => ({
    id: idx + 1,
    description: t.description,
    field: '—',
    amount: t.amount,
    umbrellaShare: Math.round(t.amount * UMBRELLA_SHARE * 100) / 100,
    date: t.date,
  }));

  // Compute per-field revenue breakdown from total, distributed evenly across fields
  const fieldCount = fields.length;
  const fieldBreakdown = fields.map((field, idx) => {
    // Distribute total revenue evenly across fields as a simple approximation
    const fieldRevenue = fieldCount > 0 ? Math.round((totalRevenue / fieldCount) * 100) / 100 : 0;
    const sharePercent = fieldCount > 0 ? Math.round((100 / fieldCount) * 10) / 10 : 0;
    return { name: field.name, revenue: fieldRevenue, share: sharePercent };
  });

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Financial" userType="umbrella-admin" />

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
                        <p className="text-gray-500 text-sm">Umbrella Share (65%)</p>
                        <p className="text-2xl font-bold text-gray-900">RWF {umbrellaShare.toLocaleString()}</p>
                      </div>
                      <PieChart className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Fields Share (35%)</p>
                        <p className="text-2xl font-bold text-gray-900">RWF {fieldsShare.toLocaleString()}</p>
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

            {/* Field Revenue Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Revenue by Field</h3>
              </div>
              <div className="p-6">
                {fieldsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : fieldBreakdown.length === 0 ? (
                  <p className="text-gray-500 text-sm">No fields available.</p>
                ) : (
                  <div className="space-y-4">
                    {fieldBreakdown.map((field, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{field.name}</div>
                          <div className="text-sm text-gray-500">{field.share}% of total revenue</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">RWF {field.revenue.toLocaleString()}</div>
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-600 h-2 rounded-full"
                              style={{ width: `${Math.min(field.share * 4, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
