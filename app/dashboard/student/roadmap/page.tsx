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
import LiveSessionDetails from '@/components/roadmap/LiveSessionDetails';
import NoRoadmapState from '@/components/roadmap/NoRoadmapState';
import { useRoadmap } from '@/lib/hooks/useRoadmap';

export default function RoadmapPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('Today');
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | undefined>();
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>();
  
  const { roadmap, isLoading, hasRoadmap } = useRoadmap();

  const handlePhaseSelect = (phaseId: string) => {
    setSelectedPhaseId(phaseId);
    setSelectedLessonId(undefined); // Clear lesson selection when phase changes
  };

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLessonId(lessonId);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar activeItem="Roadmap" />
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <Header breadcrumb="Roadmap" />
          <main className="flex-1 overflow-auto flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your roadmap...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // No roadmap state
  if (!hasRoadmap) {
    return <NoRoadmapState />;
  }

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

                {/* Enhanced Roadmap Phases with Live Sessions */}
                <RoadmapPhases 
                  onPhaseSelect={handlePhaseSelect}
                  onLessonSelect={handleLessonSelect}
                  selectedPhaseId={selectedPhaseId}
                />

                {/* Calendar Section */}
                <CalendarSection
                  selectedDateRange={selectedDateRange}
                  onDateRangeChange={setSelectedDateRange}
                />
              </div>

              {/* Right Column - Stats and Live Sessions (2 columns on xl) */}
              <div className="xl:col-span-2 space-y-3 lg:space-y-4">
                {/* Completion Stats */}
                <CompletionStats />

                {/* Current Lessons - Updated to show current lesson info */}
                <CurrentLessons />

                {/* Live Session Details - New component replacing LiveSessionNotifications */}
                <LiveSessionDetails 
                  selectedPhaseId={selectedPhaseId}
                  selectedSessionId={selectedLessonId}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}