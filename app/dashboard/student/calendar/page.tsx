'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarInfo from '@/components/calendar/CalendarInfo';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import UpcomingSessions from '@/components/calendar/UpcomingSessions';
import LiveSessionNotifications from '@/components/calendar/LiveSessionNotifications';

export default function SmartCalendarPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('Today');

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Smart Calendar" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header />

        {/* Calendar Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Calendar Header */}
            <CalendarHeader />

            {/* Main Calendar Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-3 lg:gap-4 mt-4 lg:mt-6">
              {/* Left Column - Forms and Calendar (3 columns on xl) */}
              <div className="xl:col-span-3 space-y-3 lg:space-y-4">
                {/* Add Activity Form */}

                {/* Calendar Grid */}
                <CalendarGrid
                  selectedDateRange={selectedDateRange}
                  onDateRangeChange={setSelectedDateRange}
                />
              </div>

              {/* Right Column - Info and Activities (2 columns on xl) */}
              <div className="xl:col-span-2 space-y-3 lg:space-y-4">
                {/* Calendar Info */}
                <CalendarInfo />

                {/* Upcoming Activities */}
                <UpcomingActivities />

                {/* Live Session Notifications */}
                <LiveSessionNotifications />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}