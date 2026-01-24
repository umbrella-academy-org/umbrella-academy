'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import StatsCards from '@/components/dashboard/StatsCards';
import MonthlySessionsChart from '@/components/dashboard/MonthlySessionsChart';
import CourseCard from '@/components/dashboard/CourseCard';
import CurrentPhase from '@/components/dashboard/CurrentPhase';
import ScheduledEvents from '@/components/dashboard/ScheduledEvents';
import Calendar from '@/components/dashboard/Calendar';
import LiveSessions from '@/components/dashboard/LiveSessions';
import { useAuth, useCourses } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

export default function StudentDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { roadmaps, isLoading: coursesLoading } = useCourses();
  const { navigate } = useNavigationWithLoading();
  const [selectedDateRange, setSelectedDateRange] = useState('Today');

  // Redirect if not authenticated or not a student
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    
    if (!authLoading && user && user.role !== 'student') {
      // Redirect to appropriate dashboard based on role
      const dashboardRoutes = {
        'trainer': '/dashboard/trainer',
        'mentor': '/dashboard/mentor',
        'wing-admin': '/dashboard/wing-admin',
        'umbrella-admin': '/dashboard/umbrella-admin'
      };
      navigate(dashboardRoutes[user.role] || '/');
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  // Show loading while checking auth or loading data
  if (authLoading || coursesLoading) {
    return (
      <div className="flex h-screen bg-white">
        <div className="w-64 bg-gray-900 animate-pulse"></div>
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-gray-100 animate-pulse"></div>
          <div className="flex-1 p-6 space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
              <div className="xl:col-span-3 space-y-4">
                <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="xl:col-span-2 space-y-4">
                <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if user is not authenticated or not a student
  if (!user || user.role !== 'student') {
    return null;
  }

  // Get student's active roadmap
  const activeRoadmap = roadmaps.find(roadmap => 
    roadmap.studentId === user.id && roadmap.status === 'active'
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Home" userType="student" />
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header 
          breadcrumb="Home"
          userType="student"
        />
        
        {/* Dashboard Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Welcome Section */}
            <div className="mb-4 lg:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    Welcome back, {user.name.split(' ')[0]} 👋
                  </h1>
                  <p className="text-gray-500 mt-1 text-sm lg:text-base">Learn with ease</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:gap-3">
                  <button className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Generate a Report</span>
                    <span className="sm:hidden">Report</span>
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/student/roadmap')}
                    className="px-4 lg:px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors text-sm lg:text-base"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-3 lg:gap-4 mt-4 lg:mt-6">
              {/* Left Column - Charts and Course (3 columns on xl) */}
              <div className="xl:col-span-3 space-y-3 lg:space-y-4">
                {/* Monthly Sessions Chart */}
                <MonthlySessionsChart userType="student" />
                
                {/* Course Card */}
                <CourseCard activeRoadmap={activeRoadmap} />
                
                {/* Calendar - Moved below charts */}
                <Calendar 
                  selectedDateRange={selectedDateRange}
                  onDateRangeChange={setSelectedDateRange}
                  userType="student"
                />
              </div>

              {/* Right Column - Sidebar Content (2 columns on xl) */}
              <div className="xl:col-span-2 space-y-3 lg:space-y-4">
                {/* Current Phase */}
                <CurrentPhase activeRoadmap={activeRoadmap} />
                
                {/* Scheduled Events */}
                <ScheduledEvents userType="student" />
                
                {/* Live Sessions */}
                <LiveSessions userType="student" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}