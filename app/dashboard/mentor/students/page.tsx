'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import StudentsHeader from '@/components/trainer/StudentsHeader';
import StudentsFilters from '@/components/trainer/StudentsFilters';
import StudentsTable from '@/components/trainer/StudentsTable';

export default function MentorStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeItem="My Students" userType="mentor" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          breadcrumb="My Students" 
          userType="mentor"
          actions={
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="px-3 py-2 border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 interactive-button">
                Export Students
              </button>
              <button className="px-3 py-2 bg-yellow-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105">
                Add Student
              </button>
            </div>
          }
        />
        
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