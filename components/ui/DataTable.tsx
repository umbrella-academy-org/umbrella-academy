'use client';

import { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
  filterable: boolean;
  searchable: boolean;
  width?: string;
}

interface FilterCriteria {
  [key: string]: {
    type: 'text' | 'select' | 'date' | 'number';
    value: any;
    operator: 'equals' | 'contains' | 'greater' | 'less' | 'between';
  };
}

interface DataTableProps {
  data: any[];
  columns: TableColumn[];
  hasCheckboxes: boolean;
  hasFilters: boolean;
  hasSearch: boolean;
  onSelectionChange: (selectedItems: any[]) => void;
  onFilterChange: (filters: FilterCriteria) => void;
  onSearchChange: (searchQuery: string) => void;
}

export default function DataTable({
  data,
  columns,
  hasCheckboxes,
  hasFilters,
  hasSearch,
  onSelectionChange,
  onFilterChange,
  onSearchChange
}: DataTableProps) {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleItemSelect = (item: any, checked: boolean) => {
    let newSelection;
    if (checked) {
      newSelection = [...selectedItems, item];
    } else {
      newSelection = selectedItems.filter(selected => selected.id !== item.id);
    }
    setSelectedItems(newSelection);
    onSelectionChange(newSelection);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? [...data] : [];
    setSelectedItems(newSelection);
    onSelectionChange(newSelection);
  };

  // Apply search and sorting
  let processedData = [...data];
  if (searchQuery) {
    processedData = processedData.filter(item =>
      columns.some(column => {
        if (column.searchable) {
          const value = item[column.key];
          return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
  }

  if (sortConfig) {
    processedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {hasSearch && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {hasCheckboxes && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-600"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortConfig?.key === column.key && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {processedData.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {hasCheckboxes && (
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.some(selected => selected.id === item.id)}
                      onChange={(e) => handleItemSelect(item, e.target.checked)}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-600"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-4 text-sm text-gray-900">
                    {item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {processedData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data found
        </div>
      )}
    </div>
  );
}