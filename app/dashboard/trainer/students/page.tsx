'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserRole } from '@/types/user';
import StudentsHeader from '@/components/trainer/StudentsHeader';
import StudentsFilters from '@/components/trainer/StudentsFilters';
import StudentsTable from '@/components/trainer/StudentsTable';

export default function TrainerStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="My Students" userType={UserRole.TRAINER} />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <StudentsHeader />

            <StudentsFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />

            <StudentsTable
              searchQuery={searchQuery}
              selectedStatus={selectedStatus}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
