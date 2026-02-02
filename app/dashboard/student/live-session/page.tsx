'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import LiveSessionHeader from '@/components/live-session/LiveSessionHeader';
import CourseCard from '@/components/live-session/CourseCard';
import SessionTabs from '@/components/live-session/SessionTabs';
import SessionCalendar from '@/components/live-session/SessionCalendar';
import SessionStats from '@/components/live-session/SessionStats';
import UpcomingSessionsModal from '@/components/live-session/UpcomingSessionsModal';

import SessionList from '@/components/live-session/SessionList';

export default function LiveSessionPage() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [selectedDateRange, setSelectedDateRange] = useState('Today');
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Live Session" userType="student" />

      {/* Main Content - Scrollable */}
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
        {/* Live Session Content - Scrollable */}
        <main className="flex overflow-auto bg-gray-50/30">
          <div className="w-full mx-auto p-4 lg:p-8">
            {/* Live Session Header */}
            <LiveSessionHeader />

            {/* Main Content Layout */}
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Primary Content (List) */}
              <div className="flex-1 space-y-6">
                {/* Course Card Summary */}
                <CourseCard userType="student" />

                {/* Session Navigation & List Container */}
                <div className="space-y-4">
                  <SessionTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />

                  <SessionList activeTab={activeTab} />
                </div>
              </div>

              {/* Sidebar Content (Calendar & Stats) */}
              <div className="xl:w-96 space-y-6">
                {/* Session Stats */}
                <SessionStats onUpcomingClick={() => setShowUpcomingModal(true)} />

                {/* Session Calendar */}
                <SessionCalendar
                  selectedDateRange={selectedDateRange}
                  onDateRangeChange={setSelectedDateRange}
                />
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