'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import CoursesHeader from '@/components/trainer/CoursesHeader';
import FeaturedCourse from '@/components/trainer/FeaturedCourse';
import CourseModules from '@/components/trainer/CourseModules';
import CoursesCalendar from '@/components/trainer/CoursesCalendar';
import LiveSessionsPanel from '@/components/trainer/LiveSessionsPanel';

export default function TrainerCoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState('programming-development');

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Courses" userType="trainer" />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <Header 
          breadcrumb="Courses" 
          userType="trainer"
          actions={
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="px-3 py-2 bg-yellow-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105">
                Add Activity
              </button>
            </div>
          }
        />
        
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Courses Header */}
            <CoursesHeader />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Left Column - Course Content */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Featured Course */}
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <FeaturedCourse 
                    selectedCourse={selectedCourse}
                    onCourseSelect={setSelectedCourse}
                  />
                </div>

                {/* Course Modules */}
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <CourseModules selectedCourse={selectedCourse} />
                </div>
              </div>

              {/* Right Column - Calendar and Sessions */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Calendar */}
                <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                  <CoursesCalendar />
                </div>

                {/* Live Sessions */}
                <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                  <LiveSessionsPanel />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}