'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TransactionsTable from '@/components/umbrella-admin/TransactionsTable';

import { TrendingUp, DollarSign, CreditCard, PieChart } from 'lucide-react';

export default function UmbrellaAdminFinancialPage() {
  const transactions = [
    { id: 1, description: 'Student Payment - Alice Johnson', field: 'Programming', amount: 500, umbrellaShare: 325, date: '2024-01-22' },
    { id: 2, description: 'Student Payment - Bob Wilson', field: 'Design', amount: 450, umbrellaShare: 292.5, date: '2024-01-22' },
    { id: 3, description: 'Student Payment - Carol Davis', field: 'Marketing', amount: 400, umbrellaShare: 260, date: '2024-01-21' },
    { id: 4, description: 'Student Payment - David Wilson', field: 'Data Science', amount: 550, umbrellaShare: 357.5, date: '2024-01-21' },
    { id: 5, description: 'Student Payment - Eva Martinez', field: 'Business', amount: 380, umbrellaShare: 247, date: '2024-01-20' }
  ];
  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Financial" userType="umbrella-admin" />

      <div className="flex-1 flex flex-col overflow-y-scroll lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-amber-900 mb-2">Financial Overview</h1>
              <p className="text-gray-600">Monitor system-wide financial performance</p>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-100 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold">RWF 67,845,000</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-gray-200" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Umbrella Share (65%)</p>
                    <p className="text-2xl font-bold text-amber-900">RWF 44,100,000</p>
                  </div>
                  <PieChart className="w-8 h-8 text-gray-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Fields Share (35%)</p>
                    <p className="text-2xl font-bold text-amber-900">RWF 23,745,000</p>
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
            </div>

            {/* Field Revenue Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-amber-900">Revenue by Field</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { name: 'Programming Field', revenue: 12450, share: 27.5, growth: '+15%' },
                    { name: 'Design Field', revenue: 10230, share: 22.6, growth: '+8%' },
                    { name: 'Marketing Field', revenue: 9180, share: 20.3, growth: '+12%' },
                    { name: 'Data Science Field', revenue: 7890, share: 17.4, growth: '+18%' },
                    { name: 'Business Field', revenue: 5480, share: 12.1, growth: '+5%' }
                  ].map((field, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-amber-900">{field.name}</div>
                        <div className="text-sm text-gray-500">{field.share}% of total revenue</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-amber-900">RWF {field.revenue.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{field.growth}</div>
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-amber-600 h-2 rounded-full"
                            style={{ width: `${field.share * 4}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-amber-900">Recent Transactions</h3>
              </div>
              <div className="p-6">
                <TransactionsTable transactions={transactions} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}