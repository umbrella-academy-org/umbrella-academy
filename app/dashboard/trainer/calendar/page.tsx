'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import SmartCalendarHeader from '@/components/trainer/SmartCalendarHeader';
import TrainerSessionStats from '@/components/trainer/TrainerSessionStats';
import CalendarGrid from '@/components/trainer/CalendarGrid';
import LiveSessionNotifications from '@/components/trainer/LiveSessionNotifications';

export default function TrainerCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Smart Calendar" userType="trainer" />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">

        <main className="flex-1 overflow-auto bg-gray-50/30">
          <div className="max-w-fullmx-auto p-4 lg:p-8 space-y-8">
            {/* Header with Quick Stats */}
            <SmartCalendarHeader />

            {/* Detailed Performance Metrics */}
            <TrainerSessionStats />

            {/* Calendar and Real-time Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar Grid - Core Scheduling */}
              <div className="lg:col-span-2 space-y-6">
                <CalendarGrid
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              </div>

              {/* Sidebar - Notifications & Feed */}
              <div className="lg:col-span-1">
                <LiveSessionNotifications />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}