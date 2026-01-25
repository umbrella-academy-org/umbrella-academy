'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import TrainerStatsCards from '@/components/dashboard/TrainerStatsCards';
import MonthlySessionsChart from '@/components/dashboard/MonthlySessionsChart';
import TotalRoadmaps from '@/components/dashboard/TotalRoadmaps';
import ScheduledEvents from '@/components/dashboard/ScheduledEvents';
import Calendar from '@/components/dashboard/Calendar';
import LiveSessions from '@/components/dashboard/LiveSessions';
import { useAuth, useRoadmaps, useUsers, useFinancial } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

export default function MentorDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { roadmaps, studentRoadmaps, isLoading: roadmapsLoading } = useRoadmaps();
  const { students, isLoading: usersLoading } = useUsers();
  const { userWallet, getUserTransactions } = useFinancial();
  const { navigate } = useNavigationWithLoading();
  const [selectedDateRange, setSelectedDateRange] = useState('This month');

  // Redirect if not authenticated or not a mentor
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'mentor') {
      // Redirect to appropriate dashboard based on role
      const dashboardRoutes = {
        'student': '/dashboard/student',
        'trainer': '/dashboard/trainer',
        'wing-admin': '/dashboard/wing-admin',
        'umbrella-admin': '/dashboard/umbrella-admin'
      };
      navigate(dashboardRoutes[user.role] || '/');
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  // Show loading while checking auth or loading data
  if (authLoading || roadmapsLoading || usersLoading) {
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
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3 space-y-4">
                <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if user is not authenticated or not a mentor
  if (!user || user.role !== 'mentor') {
    return null;
  }

  // Get mentor-specific data
  const mentorRoadmaps = roadmaps.filter(roadmap => roadmap.mentorId === user.id);
  const mentorStudentRoadmaps = studentRoadmaps.filter(roadmap =>
    roadmap.roadmap.mentorId === user.id
  );
  const mentorStudents = students.filter(student =>
    mentorStudentRoadmaps.some(roadmap => roadmap.studentId === student.id)
  );

  const recentTransactions = getUserTransactions().slice(0, 5);
  const activeRoadmaps = mentorStudentRoadmaps.filter(roadmap => roadmap.status === 'active');
  const pendingApprovals = mentorRoadmaps.filter(roadmap => roadmap.status === 'pending-approval').length;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Home" userType="mentor" />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="w-full mx-auto">
            {/* Welcome Section */}
            <div className="mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                Welcome back, {user.name.split(' ')[0]} 👋
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Guide and mentor your students through their learning journey.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <TrainerStatsCards
                studentsCount={mentorStudents.length}
                activeRoadmaps={activeRoadmaps.length}
                walletBalance={userWallet?.balance || 0}
                recentTransactions={recentTransactions}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Monthly Sessions Chart */}
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <MonthlySessionsChart userType="mentor" />
                </div>

                {/* Total Roadmaps */}
                <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <TotalRoadmaps
                    roadmaps={mentorStudentRoadmaps}
                    userType="mentor"
                  />
                </div>

                {/* Calendar */}
                <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <Calendar
                    selectedDateRange={selectedDateRange}
                    onDateRangeChange={setSelectedDateRange}
                    userType="mentor"
                  />
                </div>
              </div>

              {/* Right Column - Sidebar Content */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Scheduled Events */}
                <div className="animate-slide-up" style={{ animationDelay: '500ms' }}>
                  <ScheduledEvents userType="mentor" />
                </div>

                {/* Live Sessions */}
                <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
                  <LiveSessions userType="mentor" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}