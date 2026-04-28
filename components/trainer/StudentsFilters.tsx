'use client';

import { Search, Filter, Download } from 'lucide-react';

interface StudentsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export default function StudentsFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange
}: StudentsFiltersProps) {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending Verification' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 p-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 placeholder:text-gray-500 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Status Filter */}
          <div className="relative">
            <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg pl-9 pr-8 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedStatus !== 'all' || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-600">Active filters:</span>
          
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
              Search: "{searchQuery}"
              <button 
                onClick={() => onSearchChange('')}
                className="ml-1 hover:text-gray-900"
              >
                ×
              </button>
            </span>
          )}
          
          {selectedStatus !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
              Status: {statusOptions.find(opt => opt.value === selectedStatus)?.label}
              <button 
                onClick={() => onStatusChange('all')}
                className="ml-1 hover:text-gray-900"
              >
                ×
              </button>
            </span>
          )}
          
          <button 
            onClick={() => {
              onSearchChange('');
              onStatusChange('all');
            }}
            className="text-xs text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}