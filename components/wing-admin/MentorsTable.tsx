'use client';

import { useState } from 'react';
import { User, Star } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';

interface Mentor {
  id: number;
  name: string;
  email: string;
  expertise: string[];
  maxStudents: number;
  currentStudents: number;
  rating: number;
  status: string;
  joinDate: string;
  approvedRoadmaps: number;
  approvedTrainers: number;
}

interface MentorsTableProps {
  mentors: Mentor[];
}

export default function MentorsTable({ mentors }: MentorsTableProps) {
  const [selectedMentors, setSelectedMentors] = useState<any[]>([]);

  // Transform data for DataTable
  const tableData = mentors.map(mentor => ({
    id: mentor.id,
    mentor: (
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
          <User className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <div className="text-sm font-medium text-amber-900">{mentor.name}</div>
          <div className="text-sm text-gray-500">{mentor.email}</div>
        </div>
      </div>
    ),
    expertise: (
      <div className="flex flex-wrap gap-1">
        {mentor.expertise.slice(0, 2).map((skill, index) => (
          <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            {skill}
          </span>
        ))}
        {mentor.expertise.length > 2 && (
          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            +{mentor.expertise.length - 2}
          </span>
        )}
      </div>
    ),
    students: (
      <div>
        <div className="text-sm text-amber-900">
          {mentor.currentStudents}/{mentor.maxStudents}
        </div>
        <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
          <div
            className="bg-amber-600 h-1.5 rounded-full"
            style={{ width: `${(mentor.currentStudents / mentor.maxStudents) * 100}%` }}
          />
        </div>
      </div>
    ),
    performance: (
      <div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-gray-500 fill-current" />
          <span className="text-sm font-medium text-amber-900">{mentor.rating}</span>
        </div>
        <div className="text-xs text-gray-500">
          {mentor.approvedRoadmaps} roadmaps • {mentor.approvedTrainers} trainers
        </div>
      </div>
    ),
    status: (
      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
        {mentor.status}
      </span>
    ),
    actions: (
      <div className="text-sm font-medium">
        <button className="text-gray-600 hover:text-gray-700 mr-3">
          View Details
        </button>
        <button className="text-gray-600 hover:text-gray-700">
          Edit
        </button>
      </div>
    ),
    // Store original data for filtering
    _original: mentor
  }));

  const columns = [
    { key: 'mentor', label: 'Mentor', sortable: true, filterable: true, searchable: true },
    { key: 'expertise', label: 'Expertise', sortable: false, filterable: true, searchable: true },
    { key: 'students', label: 'Students', sortable: true, filterable: false, searchable: false },
    { key: 'performance', label: 'Performance', sortable: true, filterable: false, searchable: false },
    { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false },
    { key: 'actions', label: 'Actions', sortable: false, filterable: false, searchable: false }
  ];

  const handleSelectionChange = (selectedItems: any[]) => {
    setSelectedMentors(selectedItems);
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
      {selectedMentors.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">
              {selectedMentors.length} mentor{selectedMentors.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Send Message
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors">
                Deactivate Selected
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