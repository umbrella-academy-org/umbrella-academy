'use client';

import { Search, X, Filter } from 'lucide-react';

interface NotificationsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

export default function NotificationsFilters({
  searchQuery,
  onSearchChange,
  selectedFilters,
  onFiltersChange
}: NotificationsFiltersProps) {
  const removeFilter = (filterToRemove: string) => {
    onFiltersChange(selectedFilters.filter(filter => filter !== filterToRemove));
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mt-6">
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent focus:bg-white text-gray-900 placeholder:text-gray-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Active Filters */}
        <div className="flex items-center gap-2">
          {selectedFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              <span>{filter}</span>
              <button
                onClick={() => removeFilter(filter)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* More Filters Button */}
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" />
            More filters
          </button>
        </div>
      </div>
    </div>
  );
}