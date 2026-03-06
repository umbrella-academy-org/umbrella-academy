'use client';

import { Search, Filter, Star } from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedFilters,
  onFiltersChange
}: SearchAndFiltersProps) {
  return (
    <div className="mt-6">
      {/* Description */}
      <p className="text-gray-600 mb-4">Search more than 1,000 Caregivers around you</p>
      
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent focus:bg-white text-amber-900 placeholder:text-gray-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter by Law
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <Star className="w-4 h-4" />
            All Ratings
          </button>
        </div>
      </div>
    </div>
  );
}