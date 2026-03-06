'use client';

import { FileText, Banknote } from 'lucide-react';

export default function WalletHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">My Wallet 💰</h1>
        <p className="text-gray-600 mt-1">Track your earnings, manage withdrawals, and view payment history</p>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center gap-2">
          <Banknote className="w-4 h-4" />
          Request Withdrawal
        </button>
      </div>
    </div>
  );
}