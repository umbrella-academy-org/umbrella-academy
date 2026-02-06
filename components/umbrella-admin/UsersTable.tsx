'use client';

import { useState } from 'react';
import { User, Shield, GraduationCap, Users } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';

interface UsersTableProps {
  selectedTab: string;
  data: any[];
}

export default function UsersTable({ selectedTab, data }: UsersTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  // Transform data based on selected tab
  const getTableData = () => {
    return data.map(user => {
      const baseData = {
        id: user.id,
        _original: user
      };

      switch (selectedTab) {
        case 'students':
          return {
            ...baseData,
            student: (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            ),
            rollNo: user.rollNo || 'N/A',
            contact: user.phone || 'N/A',
            field: user.fieldName || user.field || user.wingName || user.wing || 'Unassigned',
            trainer: user.trainerName || 'Unassigned',
            status: (
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                  user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                }`}>
                {user.status}
              </span>
            ),
            actions: (
              <div className="text-sm font-medium">
                <button className="text-yellow-600 hover:text-yellow-700 mr-3">View</button>
                <button className="text-gray-600 hover:text-gray-700">Edit</button>
              </div>
            )
          };

        case 'trainers':
          return {
            ...baseData,
            trainer: (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            ),
            field: user.fieldName || user.field || user.wingName || user.wing || 'Unassigned',
            specialization: user.specialization || 'General',
            capacity: `${user.capacity || user.students || 0} students`,
            experience: `${user.experience || 0}`,
            status: (
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                  user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                }`}>
                {user.status}
              </span>
            ),
            actions: (
              <div className="text-sm font-medium">
                <button className="text-yellow-600 hover:text-yellow-700 mr-3">View</button>
                <button className="text-gray-600 hover:text-gray-700">Edit</button>
              </div>
            )
          };

        case 'mentors':
          return {
            ...baseData,
            mentor: (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            ),
            field: user.fieldName || user.field || user.wingName || user.wing || 'Unassigned',
            expertise: user.expertise || user.specialization || 'General',
            students: `${user.studentCount || user.students || 0}/${user.maxStudents || 25}`,
            experience: `${user.experience || 0}`,
            status: (
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                  user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                }`}>
                {user.status}
              </span>
            ),
            actions: (
              <div className="text-sm font-medium">
                <button className="text-yellow-600 hover:text-yellow-700 mr-3">View</button>
                <button className="text-gray-600 hover:text-gray-700">Edit</button>
              </div>
            )
          };

        case 'admins':
          return {
            ...baseData,
            administrator: (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            ),
            field: user.fieldName || user.field || user.wingName || user.wing || 'All Fields',
            role: user.role || 'Admin',
            permissions: user.permissions || 'Standard',
            joinDate: user.joinDate || 'N/A',
            status: (
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                  user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                }`}>
                {user.status}
              </span>
            ),
            actions: (
              <div className="text-sm font-medium">
                <button className="text-yellow-600 hover:text-yellow-700 mr-3">View</button>
                <button className="text-gray-600 hover:text-gray-700">Edit</button>
              </div>
            )
          };

        default:
          return baseData;
      }
    });
  };

  // Get columns based on selected tab
  const getColumns = () => {
    switch (selectedTab) {
      case 'students':
        return [
          { key: 'student', label: 'Student', sortable: true, filterable: true, searchable: true },
          { key: 'rollNo', label: 'Roll No.', sortable: true, filterable: false, searchable: true },
          { key: 'contact', label: 'Contact', sortable: false, filterable: false, searchable: true },
          { key: 'field', label: 'Field', sortable: true, filterable: true, searchable: true },
          { key: 'trainer', label: 'Trainer', sortable: true, filterable: true, searchable: true },
          { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false },
          { key: 'actions', label: 'Actions', sortable: false, filterable: false, searchable: false }
        ];

      case 'trainers':
        return [
          { key: 'trainer', label: 'Trainer', sortable: true, filterable: true, searchable: true },
          { key: 'field', label: 'Field', sortable: true, filterable: true, searchable: true },
          { key: 'specialization', label: 'Specialization', sortable: true, filterable: true, searchable: true },
          { key: 'capacity', label: 'Capacity', sortable: true, filterable: false, searchable: false },
          { key: 'experience', label: 'Experience', sortable: true, filterable: false, searchable: false },
          { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false },
          { key: 'actions', label: 'Actions', sortable: false, filterable: false, searchable: false }
        ];

      case 'mentors':
        return [
          { key: 'mentor', label: 'Mentor', sortable: true, filterable: true, searchable: true },
          { key: 'field', label: 'Field', sortable: true, filterable: true, searchable: true },
          { key: 'expertise', label: 'Expertise', sortable: true, filterable: true, searchable: true },
          { key: 'students', label: 'Students', sortable: true, filterable: false, searchable: false },
          { key: 'experience', label: 'Experience', sortable: true, filterable: false, searchable: false },
          { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false },
          { key: 'actions', label: 'Actions', sortable: false, filterable: false, searchable: false }
        ];

      case 'admins':
        return [
          { key: 'administrator', label: 'Administrator', sortable: true, filterable: true, searchable: true },
          { key: 'field', label: 'Field', sortable: true, filterable: true, searchable: true },
          { key: 'role', label: 'Role', sortable: true, filterable: true, searchable: true },
          { key: 'permissions', label: 'Permissions', sortable: true, filterable: true, searchable: false },
          { key: 'joinDate', label: 'Join Date', sortable: true, filterable: false, searchable: false },
          { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false },
          { key: 'actions', label: 'Actions', sortable: false, filterable: false, searchable: false }
        ];

      default:
        return [];
    }
  };

  const handleSelectionChange = (selectedItems: any[]) => {
    setSelectedUsers(selectedItems);
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
      {selectedUsers.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-yellow-800">
              {selectedUsers.length} {selectedTab.slice(0, -1)}{selectedUsers.length > 1 ? 's' : ''} selected
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
        data={getTableData()}
        columns={getColumns()}
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