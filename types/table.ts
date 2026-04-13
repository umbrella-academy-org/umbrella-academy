// Table management interface definitions for trainer management system

export interface DataTableProps {
  data: any[];
  columns: TableColumn[];
  hasCheckboxes: boolean;
  hasFilters: boolean;
  hasSearch: boolean;
  onSelectionChange: (selectedItems: any[]) => void;
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
  render?: (value: any, row: any) => React.ReactNode;
}

export interface FilterCriteria {
  [key: string]: {
    type: 'text' | 'select' | 'date' | 'number';
    value: any;
    operator: 'equals' | 'contains' | 'greater' | 'less' | 'between';
  };
}

export interface TableSelection {
  selectedItems: any[];
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