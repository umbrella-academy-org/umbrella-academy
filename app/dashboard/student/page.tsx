'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import StatsCards from '@/components/dashboard/StatsCards';
import MonthlySessionsChart from '@/components/dashboard/MonthlySessionsChart';
import CourseCard from '@/components/dashboard/CourseCard';
import CurrentPhase from '@/components/dashboard/CurrentPhase';
import ScheduledEvents from '@/components/dashboard/ScheduledEvents';
import Calendar from '@/components/dashboard/Calendar';
import LiveSessions from '@/components/dashboard/LiveSessions';

export default function StudentDashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState('Today');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Home" />
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-4">
            {/* Welcome Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    Welcome back, Jane 👋
                  </h1>
                  <p className="text-gray-500 mt-1">Learn with ease</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate a Report
                  </button>
                  <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-6">
              {/* Left Column - Charts and Course (3 columns) */}
              <div className="lg:col-span-3 space-y-4">
                {/* Monthly Sessions Chart */}
                <MonthlySessionsChart />
                
                {/* Course Card */}
                <CourseCard />
                
                {/* Calendar - Moved below charts */}
                <Calendar 
                  selectedDateRange={selectedDateRange}
                  onDateRangeChange={setSelectedDateRange}
                />
              </div>

              {/* Right Column - Sidebar Content (2 columns) */}
              <div className="lg:col-span-2 space-y-4">
                {/* Current Phase */}
                <CurrentPhase />
                
                {/* Scheduled Events */}
                <ScheduledEvents />
                
                {/* Live Sessions */}
                <LiveSessions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}