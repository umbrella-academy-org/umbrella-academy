'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import AddActivityForm from '@/components/calendar/AddActivityForm';
import CalendarInfo from '@/components/calendar/CalendarInfo';
import ActivityStats from '@/components/calendar/ActivityStats';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import UpcomingActivities from '@/components/calendar/UpcomingActivities';
import LiveSessionNotifications from '@/components/calendar/LiveSessionNotifications';

export default function SmartCalendarPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('Today');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Smart Calendar" />
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Calendar Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-4">
            {/* Calendar Header */}
            <CalendarHeader />

            {/* Main Calendar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-6">
              {/* Left Column - Forms and Calendar (3 columns) */}
              <div className="lg:col-span-3 space-y-4">
                {/* Add Activity Form */}
                <AddActivityForm />
                
                {/* Activity Stats */}
                <ActivityStats />
                
                {/* Calendar Grid */}
                <CalendarGrid 
                  selectedDateRange={selectedDateRange}
                  onDateRangeChange={setSelectedDateRange}
                />
              </div>

              {/* Right Column - Info and Activities (2 columns) */}
              <div className="lg:col-span-2 space-y-4">
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