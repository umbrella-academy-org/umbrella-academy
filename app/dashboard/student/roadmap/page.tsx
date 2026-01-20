'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import RoadmapHeader from '@/components/roadmap/RoadmapHeader';
import CourseOverview from '@/components/roadmap/CourseOverview';
import RoadmapPhases from '@/components/roadmap/RoadmapPhases';
import CompletionStats from '@/components/roadmap/CompletionStats';
import CurrentLessons from '@/components/roadmap/CurrentLessons';
import CalendarSection from '@/components/roadmap/CalendarSection';
import LiveSessionNotifications from '@/components/roadmap/LiveSessionNotifications';

export default function RoadmapPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('Today');

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Roadmap" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header breadcrumb="Roadmap" />

        {/* Roadmap Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Roadmap Header */}
            <RoadmapHeader />

            {/* Main Roadmap Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-3 lg:gap-4 mt-4 lg:mt-6">
              {/* Left Column - Course and Phases (3 columns on xl) */}
              <div className="xl:col-span-3 space-y-3 lg:space-y-4">
                {/* Course Overview */}
                <CourseOverview />

                {/* Roadmap Phases */}
                <RoadmapPhases />

                {/* Calendar Section */}
                <CalendarSection
                  selectedDateRange={selectedDateRange}
                  onDateRangeChange={setSelectedDateRange}
                />
              </div>

              {/* Right Column - Stats and Activities (2 columns on xl) */}
              <div className="xl:col-span-2 space-y-3 lg:space-y-4">
                {/* Completion Stats */}
                <CompletionStats />

                {/* Current Lessons */}
                <CurrentLessons />

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