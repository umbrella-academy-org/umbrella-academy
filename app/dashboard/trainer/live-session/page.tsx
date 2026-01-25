'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import LiveSessionHeader from '@/components/live-session/LiveSessionHeader';
import CourseCard from '@/components/live-session/CourseCard';
import SessionTabs from '@/components/live-session/SessionTabs';
import SessionCalendar from '@/components/live-session/SessionCalendar';
import SessionStats from '@/components/live-session/SessionStats';
import UpcomingSessionsModal from '@/components/live-session/UpcomingSessionsModal';

export default function LiveSessionPage() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [selectedDateRange, setSelectedDateRange] = useState('Today');
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Live Session" userType='trainer' />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Live Session Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Live Session Header */}
            <LiveSessionHeader />

            {/* Main Live Session Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-3 lg:gap-4 mt-4 lg:mt-6">
              {/* Left Column - Course and Calendar (3 columns on xl) */}
              <div className="xl:col-span-3 space-y-3 lg:space-y-4">
                {/* Course Card */}
                <CourseCard userType="trainer" />

                {/* Session Tabs */}
                <SessionTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {/* Session Calendar */}
                <SessionCalendar
                  selectedDateRange={selectedDateRange}
                  onDateRangeChange={setSelectedDateRange}
                />
              </div>

              {/* Right Column - Stats and Upcoming (2 columns on xl) */}
              <div className="xl:col-span-2 space-y-3 lg:space-y-4">
                {/* Session Stats */}
                <SessionStats onUpcomingClick={() => setShowUpcomingModal(true)} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Upcoming Sessions Modal */}
      {showUpcomingModal && (
        <UpcomingSessionsModal onClose={() => setShowUpcomingModal(false)} />
      )}
    </div>
  );
}