'use client';

import { useState } from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';

interface Transaction {
  id: number;
  description: string;
  field: string;
  amount: number;
  umbrellaShare: number;
  date: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [selectedTransactions, setSelectedTransactions] = useState<any[]>([]);

  // Transform data for DataTable
  const tableData = transactions.map(transaction => ({
    id: transaction.id,
    transaction: (
      <div>
        <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
        <div className="text-sm text-gray-500">ID: {transaction.id}</div>
      </div>
    ),
    field: (transaction as any).field || (transaction as any).wing,
    amount: (
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-900">RWF {transaction.amount.toLocaleString()}</span>
      </div>
    ),
    umbrellaShare: (
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-600">RWF {transaction.umbrellaShare.toLocaleString()}</span>
      </div>
    ),
    date: (
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-900">{transaction.date}</span>
      </div>
    ),
    // Store original data for filtering
    _original: transaction
  }));

  const columns = [
    { key: 'transaction', label: 'Transaction', sortable: true, filterable: true, searchable: true },
    { key: 'field', label: 'Field', sortable: true, filterable: true, searchable: true },
    { key: 'amount', label: 'Amount', sortable: true, filterable: false, searchable: false },
    { key: 'umbrellaShare', label: 'Umbrella Share', sortable: true, filterable: false, searchable: false },
    { key: 'date', label: 'Date', sortable: true, filterable: false, searchable: false }
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
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors">
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