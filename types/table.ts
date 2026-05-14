// Table management interface definitions for trainer management system

import type { ReactNode } from "react";

export type DataTableRow = Record<string, unknown> & { id?: string | number };

export interface DataTableProps {
  data: DataTableRow[];
  columns: TableColumn[];
  hasCheckboxes: boolean;
  hasFilters: boolean;
  hasSearch: boolean;
  onSelectionChange: (selectedItems: DataTableRow[]) => void;
  onFilterChange: (filters: FilterCriteria) => void;
  onSearchChange: (searchQuery: string) => void;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
  filterable: boolean;
  searchable: boolean;
  width?: string;
  render?: (value: unknown, row: DataTableRow) => ReactNode;
}

export interface FilterCriteria {
  [key: string]: {
    type: 'text' | 'select' | 'date' | 'number';
    value: unknown;
    operator: 'equals' | 'contains' | 'greater' | 'less' | 'between';
  };
}

export interface TableSelection {
  selectedItems: DataTableRow[];
  isAllSelected: boolean;
  isPartiallySelected: boolean;
}

export interface TableSortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

export interface TablePaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}