'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import StudentsHeader from '@/components/trainer/StudentsHeader';
import StudentsFilters from '@/components/trainer/StudentsFilters';
import StudentsTable from '@/components/trainer/StudentsTable';

export default function MentorStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="My Students" userType="trainer" />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Students Header */}
            <StudentsHeader />

            {/* Students Filters */}
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <StudentsFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                selectedCourse={selectedCourse}
                onCourseChange={setSelectedCourse}
              />
            </div>

            {/* Students Table */}
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <StudentsTable
                searchQuery={searchQuery}
                selectedStatus={selectedStatus}
                selectedCourse={selectedCourse}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}