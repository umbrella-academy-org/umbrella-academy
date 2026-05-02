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
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar activeItem="Students" userType={UserRole.TRAINER} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Consistent with Premium Theme */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-5 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto">
             <StudentsHeader />
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                <StudentsFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedStatus={selectedStatus}
                  onStatusChange={setSelectedStatus}
                />

                <div className="mt-8">
                    <StudentsTable
                      searchQuery={searchQuery}
                      selectedStatus={selectedStatus}
                    />
                </div>
            </div>
            
            <div className="text-center py-8">
               <p className="text-slate-400 text-[11px] font-bold tracking-[0.3em] uppercase italic">© Dreamize Trainer Network 2025 • Student Directory</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
