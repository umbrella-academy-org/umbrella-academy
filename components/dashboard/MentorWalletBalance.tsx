'use client';

import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

export default function MentorWalletBalance() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Balance</h3>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">RWF 180,000</div>
            <div className="text-sm text-gray-500">Available for withdrawal</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">This Month</span>
            </div>
            <div className="text-xl font-bold text-gray-900">RWF 35,000</div>
            <div className="text-xs text-gray-700">+12% vs last month</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">Total Earned</span>
            </div>
            <div className="text-xl font-bold text-gray-900">RWF 650,000</div>
            <div className="text-xs text-gray-700">All time earnings</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Next payout in 3 days</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Jan 23, 2026
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gray-600 h-2 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>

        <button className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
          Request Withdrawal
        </button>
      </div>
    </div>
  );
}