'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import SmartCalendarHeader from '@/components/trainer/SmartCalendarHeader';
import AddActivityForm from '@/components/trainer/AddActivityForm';
import CalendarInfo from '@/components/trainer/CalendarInfo';
import ActivityStats from '@/components/calendar/ActivityStats';
import CalendarGrid from '@/components/trainer/CalendarGrid';
import LiveSessionNotifications from '@/components/trainer/LiveSessionNotifications';

export default function MentorCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Schedule" userType="mentor" />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          breadcrumb="Schedule"
          userType="mentor"
          actions={
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="px-3 py-2 bg-yellow-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105">
                + Add Activity
              </button>
            </div>
          }
        />

        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Smart Calendar Header */}
            <SmartCalendarHeader />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
              {/* Add Activity Form */}
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <AddActivityForm />
              </div>

              {/* Calendar Info */}
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CalendarInfo />
              </div>
            </div>

            {/* Activity Stats */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <ActivityStats />
            </div>

            {/* Calendar and Live Sessions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Calendar Grid */}
              <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CalendarGrid
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              </div>

              {/* Live Session Notifications */}
              <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <LiveSessionNotifications />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}