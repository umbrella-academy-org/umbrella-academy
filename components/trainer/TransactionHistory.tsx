'use client';

import { Download, ArrowUpRight, ArrowDownLeft, User, Calendar } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'bonus';
  description: string;
  student?: string;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'processing';
}

export default function TransactionHistory() {
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
      status: 'completed'
    },
    {
      id: '6',
      type: 'earning',
      description: 'Session Payment',
      student: 'David Wilson',
      date: 'Jan 15, 2026',
      amount: '+RWF 2,500',
      status: 'pending'
    },
    {
      id: '7',
      type: 'earning',
      description: 'Session Payment',
      student: 'Eva Brown',
      date: 'Jan 14, 2026',
      amount: '+RWF 2,500',
      status: 'completed'
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
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            ✓ Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            ⏳ Pending
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            🔄 Processing
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-amber-900">Transaction History</h3>
          <p className="text-sm text-gray-600 mt-1">Track all your earnings and withdrawals</p>
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:text-amber-900 font-medium text-sm">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Transaction</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-1">
                  Date
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M6 8L2 4h8L6 8z"/>
                    </svg>
                  </button>
                </div>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Student</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                      transaction.type === 'earning' ? 'bg-gray-100' :
                      transaction.type === 'withdrawal' ? 'bg-gray-100' : 'bg-gray-100'
                    }`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <span className="text-sm text-amber-900 font-medium">{transaction.description}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-3 h-3" />
                    {transaction.date}
                  </div>
                </td>
                <td className="py-4 px-4">
                  {getStatusBadge(transaction.status)}
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-medium ${
                    transaction.amount.startsWith('+') ? 'text-gray-600' : 'text-gray-600'
                  }`}>
                    {transaction.amount}
                  </span>
                </td>
                <td className="py-4 px-4">
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
  );
}