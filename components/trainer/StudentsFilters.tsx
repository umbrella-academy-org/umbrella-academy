'use client';

import { Search, Filter, Download } from 'lucide-react';

interface StudentsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedCourse: string;
  onCourseChange: (course: string) => void;
}

export default function StudentsFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedCourse,
  onCourseChange
}: StudentsFiltersProps) {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'completed', label: 'Completed' },
    { value: 'paused', label: 'Paused' }
  ];

  const courseOptions = [
    { value: 'all', label: 'All Courses' },
    { value: 'programming', label: 'Programming & Development' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'marketing', label: 'Digital Marketing' }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students by name, email, or course..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-500 text-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent cursor-pointer"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Course Filter */}
          <div className="relative">
            <select
              value={selectedCourse}
              onChange={(e) => onCourseChange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent cursor-pointer"
            >
              {courseOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 interactive-button whitespace-nowrap">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedStatus !== 'all' || selectedCourse !== 'all' || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-600">Active filters:</span>
          
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              Search: "{searchQuery}"
              <button 
                onClick={() => onSearchChange('')}
                className="ml-1 hover:text-yellow-900"
              >
                ×
              </button>
            </span>
          )}
          
          {selectedStatus !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              Status: {statusOptions.find(opt => opt.value === selectedStatus)?.label}
              <button 
                onClick={() => onStatusChange('all')}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          
          {selectedCourse !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Course: {courseOptions.find(opt => opt.value === selectedCourse)?.label}
              <button 
                onClick={() => onCourseChange('all')}
                className="ml-1 hover:text-green-900"
              >
                ×
              </button>
            </span>
          )}
          
          <button 
            onClick={() => {
              onSearchChange('');
              onStatusChange('all');
              onCourseChange('all');
            }}
            className="text-xs text-gray-500 hover:text-gray-700 font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}