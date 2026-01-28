'use client';

import { useState } from 'react';
import DataTable from '@/components/ui/DataTable';

interface Trainer {
  id: number;
  name: string;
  email: string;
  capacity: number;
  assigned: number;
  available: number;
  status: string;
}

interface TrainersTableProps {
  trainers: Trainer[];
}

export default function TrainersTable({ trainers }: TrainersTableProps) {
  const [selectedTrainers, setSelectedTrainers] = useState<any[]>([]);

  // Transform data for DataTable
  const tableData = trainers.map(trainer => ({
    id: trainer.id,
    trainer: (
      <div>
        <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
        <div className="text-sm text-gray-500">{trainer.email}</div>
      </div>
    ),
    capacity: `${trainer.capacity} hours/week`,
    assigned: `${trainer.assigned} students`,
    available: `${trainer.available} slots`,
    status: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        trainer.status === 'active'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {trainer.status}
      </span>
    ),
    actions: (
      <button className="text-yellow-600 hover:text-yellow-700">
        View Details
      </button>
    ),
    // Store original data for filtering
    _original: trainer
  }));

  const columns = [
    { key: 'trainer', label: 'Trainer', sortable: true, filterable: true, searchable: true },
    { key: 'capacity', label: 'Capacity', sortable: true, filterable: false, searchable: false },
    { key: 'assigned', label: 'Assigned', sortable: true, filterable: false, searchable: false },
    { key: 'available', label: 'Available', sortable: true, filterable: false, searchable: false },
    { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false },
    { key: 'actions', label: 'Actions', sortable: false, filterable: false, searchable: false }
  ];

  const handleSelectionChange = (selectedItems: any[]) => {
    setSelectedTrainers(selectedItems);
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
      {selectedTrainers.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-yellow-800">
              {selectedTrainers.length} trainer{selectedTrainers.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Send Message
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                Suspend Selected
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