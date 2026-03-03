'use client';

import { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';

interface WalletTransaction {
  id: number;
  type: 'income' | 'withdrawal';
  description: string;
  amount: number; // Can be negative for withdrawals
  date: string;
  status: string;
}

interface WalletTransactionsTableProps {
  transactions: WalletTransaction[];
}

export default function WalletTransactionsTable({ transactions }: WalletTransactionsTableProps) {
  const [selectedTransactions, setSelectedTransactions] = useState<any[]>([]);

  // Transform data for DataTable
  const tableData = transactions.map(transaction => ({
    id: transaction.id,
    description: (
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
          transaction.type === 'income' ? 'bg-gray-100' : 'bg-gray-100'
        }`}>
          {transaction.type === 'income' ? 
            <ArrowDownLeft className="w-4 h-4 text-gray-600" /> : 
            <ArrowUpRight className="w-4 h-4 text-gray-600" />
          }
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
          <div className="text-sm text-gray-500 capitalize">{transaction.type}</div>
        </div>
      </div>
    ),
    amount: (
      <div className={`text-sm font-medium ${
        transaction.amount >= 0 ? 'text-gray-600' : 'text-gray-600'
      }`}>
        {transaction.amount >= 0 ? '+' : ''}RWF {transaction.amount.toLocaleString()}
      </div>
    ),
    date: (
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-900">{transaction.date}</span>
      </div>
    ),
    status: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        transaction.status === 'completed' ? 'bg-gray-100 text-gray-800' :
        transaction.status === 'pending' ? 'bg-gray-100 text-gray-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {transaction.status}
      </span>
    ),
    // Store original data for filtering
    _original: transaction
  }));

  const columns = [
    { key: 'description', label: 'Description', sortable: true, filterable: true, searchable: true },
    { key: 'amount', label: 'Amount', sortable: true, filterable: false, searchable: false },
    { key: 'date', label: 'Date', sortable: true, filterable: false, searchable: false },
    { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false }
  ];

  const handleSelectionChange = (selectedItems: any[]) => {
    setSelectedTransactions(selectedItems);
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters:', filters);
  };

  const handleSearchChange = (searchQuery: string) => {
    console.log('Search:', searchQuery);
  };

  return (
    <div className="space-y-4">
      {/* Selected Actions */}
      {selectedTransactions.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">
              {selectedTransactions.length} transaction{selectedTransactions.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Export Selected
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DataTable */}
      <DataTable
        data={tableData}
        columns={columns}
        hasCheckboxes={true}
        hasFilters={true}
        hasSearch={true}
        onSelectionChange={handleSelectionChange}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
}