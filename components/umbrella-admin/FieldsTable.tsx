'use client';

import { useState } from 'react';
import { Building2, Users, DollarSign } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';

interface Field {
  id: number;
  name: string;
  code: string;
  admin: string;
  students: number;
  trainers: number;
  revenue: number;
  status: string;
}

interface FieldsTableProps {
  fields: Field[];
}

export default function FieldsTable({ fields }: FieldsTableProps) {
  const [selectedFields, setSelectedFields] = useState<any[]>([]);

  // Transform data for DataTable
  const tableData = fields.map(field => ({
    id: field.id,
    field: (
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{field.name}</div>
          <div className="text-sm text-gray-500">{field.code}</div>
        </div>
      </div>
    ),
    administrator: field.admin,
    students: (
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-900">{field.students}</span>
      </div>
    ),
    trainers: (
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-900">{field.trainers}</span>
      </div>
    ),
    revenue: (
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-green-500" />
        <span className="text-sm font-medium text-gray-900">RWF {field.revenue.toLocaleString()}</span>
      </div>
    ),
    status: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${field.status === 'active'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
        }`}>
        {field.status}
      </span>
    ),
    actions: (
      <div className="text-sm font-medium">
        <button className="text-yellow-600 hover:text-yellow-700 mr-3">
          View Details
        </button>
        <button className="text-gray-600 hover:text-gray-700">
          Settings
        </button>
      </div>
    ),
    // Store original data for filtering
    _original: field
  }));

  const columns = [
    { key: 'field', label: 'Field', sortable: true, filterable: true, searchable: true },
    { key: 'administrator', label: 'Administrator', sortable: true, filterable: true, searchable: true },
    { key: 'students', label: 'Students', sortable: true, filterable: false, searchable: false },
    { key: 'trainers', label: 'Trainers', sortable: true, filterable: false, searchable: false },
    { key: 'revenue', label: 'Revenue', sortable: true, filterable: false, searchable: false },
    { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false },
    { key: 'actions', label: 'Actions', sortable: false, filterable: false, searchable: false }
  ];

  const handleSelectionChange = (selectedItems: any[]) => {
    setSelectedFields(selectedItems);
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
      {selectedFields.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-yellow-800">
              {selectedFields.length} field{selectedFields.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Export Data
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