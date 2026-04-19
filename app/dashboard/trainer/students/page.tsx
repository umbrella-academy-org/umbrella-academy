'use client';

import { useState, useMemo } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserRole } from '@/types/user';
import StudentsHeader from '@/components/trainer/StudentsHeader';
import StudentsFilters from '@/components/trainer/StudentsFilters';
import StudentsTable from '@/components/trainer/StudentsTable';
import { useUsers, useAuth, useRoadmaps } from '@/hooks';

export default function TrainerStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const { students } = useUsers();
  const { user } = useAuth();
  const { studentRoadmaps } = useRoadmaps();

  const filteredStudents = useMemo(() => {
    if (!user) return [];
    return students;
  }, [students, user, studentRoadmaps]);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="My Students" userType={UserRole.TRAINER} />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-fullmx-auto space-y-4 sm:space-y-6 lg:space-y-8">
            <StudentsHeader students={filteredStudents} />

            <StudentsFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
            />

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
