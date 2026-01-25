'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import AssignmentHeader from '@/components/trainer/AssignmentHeader';
import AssignmentCourse from '@/components/trainer/AssignmentCourse';
import AssignmentTabs from '@/components/trainer/AssignmentTabs';
import AssignmentList from '@/components/trainer/AssignmentList';
import AssignmentStats from '@/components/trainer/AssignmentStats';
import AssignmentCalendarSection from '@/components/trainer/AssignmentCalendarSection';
import LearningMaterials from '@/components/trainer/LearningMaterials';
import VideoTutorials from '@/components/trainer/VideoTutorials';

export default function TrainerAssignmentPage() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Assignment" userType="trainer" />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-fullmx-auto space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Assignment Header */}
            <AssignmentHeader />

            {/* Main Assignment Management Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {/* Left Column - Course and Assignments */}
              <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
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
              <div className="lg:col-span-1 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Assignment Stats */}
                <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                  <AssignmentStats />
                </div>
              </div>
            </div>

            {/* Additional Assignment Sections */}
            {/* Assignments Calendar Section */}
            <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
              <AssignmentCalendarSection />
            </div>

            {/* Learning Materials Section */}
            <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
              <LearningMaterials />
            </div>

            {/* Video Tutorials Section */}
            <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
              <VideoTutorials />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}