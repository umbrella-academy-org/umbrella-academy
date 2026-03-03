'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import StatsCards from '@/components/dashboard/StatsCards';
import MonthlySessionsChart from '@/components/dashboard/MonthlySessionsChart';
import CourseCard from '@/components/dashboard/CourseCard';
import CurrentPhase from '@/components/dashboard/CurrentPhase';
import ScheduledEvents from '@/components/dashboard/ScheduledEvents';
import Calendar from '@/components/dashboard/Calendar';
import LiveSessions from '@/components/dashboard/LiveSessions';
import { useAuth, useRoadmaps } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

export default function StudentDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { studentRoadmaps, isLoading: roadmapsLoading } = useRoadmaps();
  const { navigate } = useNavigationWithLoading();
  const [selectedDateRange, setSelectedDateRange] = useState('Today');

  // Check if dev mode is enabled from sidebar
  const [isNewUserMode, setIsNewUserMode] = useState(false);

  useEffect(() => {
    const checkDevMode = () => {
      // Listen for dev mode changes from sidebar
      const devModeEvent = (event: CustomEvent) => {
        setIsNewUserMode(event.detail.isDevMode);
      };

      window.addEventListener('devModeChanged', devModeEvent as EventListener);

      // Check initial state
      const initialDevMode = localStorage.getItem('devNewUserMode') === 'true';
      setIsNewUserMode(initialDevMode);

      return () => {
        window.removeEventListener('devModeChanged', devModeEvent as EventListener);
      };
    };

    checkDevMode();
  }, []);

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
        'field-admin': '/dashboard/field-admin',
        'umbrella-admin': '/dashboard/umbrella-admin'
      };
      navigate(dashboardRoutes[user.role as keyof typeof dashboardRoutes] || '/');
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  // Show loading while checking auth or loading data
  if (authLoading || roadmapsLoading) {
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

  // Get student's active roadmap (empty if new user mode)
  const activeRoadmap = isNewUserMode ? null : studentRoadmaps.find(roadmap =>
    roadmap.studentId === user.id && roadmap.status === 'active'
  );

  // New User Mode - Show empty state with setup prompt
  if (isNewUserMode) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar activeItem="Home" userType="student" />

        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <main className="flex-1 overflow-auto">
            <div className="p-3 lg:p-4">
              {/* Welcome Section */}
              <div className="mb-4 lg:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7" />
                      </svg>
                      Welcome back, {user.name.split(' ')[0]}
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm lg:text-base">Learn with ease</p>
                  </div>
                </div>
              </div>

              {/* Setup Prompt Banner */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Finish Setting Up Your Account</h3>
                    <p className="text-gray-600 mb-4">
                      Complete your profile setup to unlock your personalized learning experience, connect with trainers, and start your roadmap.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => navigate('/post-signup/availability')}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                      >
                        Complete Setup
                      </button>
                      <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Empty State Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 lg:gap-4 mb-6">
                {[
                  { label: 'Learning Progress', value: '0%', icon: 'BookOpen' },
                  { label: 'Completed Sessions', value: '0', icon: 'Target' },
                  { label: 'Active Roadmaps', value: '0', icon: 'Map' },
                  { label: 'Field Status', value: 'Not Selected', icon: 'Building' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {stat.icon === 'BookOpen' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                          {stat.icon === 'Target' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                          {stat.icon === 'Map' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />}
                          {stat.icon === 'Building' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State Content */}
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-3 lg:gap-4">
                <div className="xl:col-span-3 space-y-3 lg:space-y-4">
                  {/* Empty Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
                    <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500">No learning data yet</p>
                        <p className="text-sm text-gray-400">Complete setup to start tracking progress</p>
                      </div>
                    </div>
                  </div>

                  {/* Empty Course Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Course</h3>
                    <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-gray-500">No active course</p>
                        <p className="text-sm text-gray-400">Set up your roadmap to get started</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="xl:col-span-2 space-y-3 lg:space-y-4">
                  {/* Empty Phase */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Phase</h3>
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-500">No active phase</p>
                    </div>
                  </div>

                  {/* Empty Events */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                    <div className="text-center py-8">
                      <p className="text-gray-500">No scheduled events</p>
                    </div>
                  </div>

                  {/* Empty Sessions */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Sessions</h3>
                    <div className="text-center py-8">
                      <p className="text-gray-500">No live sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Home" userType="student" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Dashboard Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Welcome Section */}
            <div className="mb-4 lg:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7" />
                    </svg>
                    Welcome back, {user.name.split(' ')[0]}
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
                    onClick={() => navigate('/post-signup/roadmap')}
                    className="px-4 lg:px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm lg:text-base"
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
                <CourseCard activeRoadmap={activeRoadmap || undefined} />

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
                <CurrentPhase activeRoadmap={activeRoadmap || undefined} />

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