'use client';

import { useState } from 'react';
import DataTable from '@/components/ui/DataTable';

interface Student {
  id: number;
  name: string;
  email: string;
  trainer: string;
  status: string;
  progress: number;
  lastSession: string;
}

interface StudentsTableProps {
  students: Student[];
}

export default function StudentsTable({ students }: StudentsTableProps) {
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);

  // Transform data for DataTable
  const tableData = students.map(student => ({
    id: student.id,
    student: (
      <div>
        <div className="text-sm font-medium text-amber-900">{student.name}</div>
        <div className="text-sm text-gray-500">{student.email}</div>
      </div>
    ),
    trainer: student.trainer,
    progress: (
      <div className="flex items-center">
        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
          <div
            className="bg-amber-600 h-2 rounded-full"
            style={{ width: `${student.progress}%` }}
          />
        </div>
        <span className="text-sm text-amber-900">{student.progress}%</span>
      </div>
    ),
    lastSession: student.lastSession,
    status: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        student.status === 'active'
          ? 'bg-gray-100 text-gray-800'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {student.status}
      </span>
    ),
    actions: (
      <button className="text-gray-600 hover:text-gray-700">
        View Details
      </button>
    ),
    // Store original data for filtering
    _original: student
  }));

  const columns = [
    { key: 'student', label: 'Student', sortable: true, filterable: true, searchable: true },
    { key: 'trainer', label: 'Trainer', sortable: true, filterable: true, searchable: true },
    { key: 'progress', label: 'Progress', sortable: true, filterable: false, searchable: false },
    { key: 'lastSession', label: 'Last Session', sortable: true, filterable: false, searchable: false },
    { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false },
    { key: 'actions', label: 'Actions', sortable: false, filterable: false, searchable: false }
  ];

  const handleSelectionChange = (selectedItems: any[]) => {
    setSelectedStudents(selectedItems);
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
      {selectedStudents.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">
              {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Send Message
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors">
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