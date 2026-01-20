'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import AssignmentHeader from '@/components/trainer/AssignmentHeader';
import AssignmentCourse from '@/components/trainer/AssignmentCourse';
import AssignmentTabs from '@/components/trainer/AssignmentTabs';
import AssignmentList from '@/components/trainer/AssignmentList';
import AssignmentStats from '@/components/trainer/AssignmentStats';

export default function TrainerAssignmentPage() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Assignment" userType="trainer" />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <Header 
          breadcrumb="Assignments" 
          userType="trainer"
          actions={
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="px-3 py-2 bg-yellow-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105">
                Submit Assignment
              </button>
            </div>
          }
        />
        
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Assignment Header */}
            <AssignmentHeader />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
              {/* Left Column - Course and Assignments */}
              <div className="xl:col-span-3 space-y-4 lg:space-y-6">
                {/* Course Card */}
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <AssignmentCourse />
                </div>

                {/* Assignment Tabs */}
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <AssignmentTabs 
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                </div>

                {/* Assignment List */}
                <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <AssignmentList activeTab={activeTab} />
                </div>
              </div>

              {/* Right Column - Stats */}
              <div className="xl:col-span-1 space-y-4 lg:space-y-6">
                {/* Assignment Stats */}
                <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                  <AssignmentStats />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}