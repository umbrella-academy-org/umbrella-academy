'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import MonthlySessionsChart from '@/components/dashboard/MonthlySessionsChart';
import TotalRoadmaps from '@/components/dashboard/TotalRoadmaps';
import ScheduledEvents from '@/components/dashboard/ScheduledEvents';
import Calendar from '@/components/dashboard/Calendar';
import { useAuth, useRoadmaps, useUsers, useFinancial } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { Users, GraduationCap, DollarSign, TrendingUp, Settings, Eye, Wallet } from 'lucide-react';

export default function FieldAdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { studentRoadmaps, isLoading: roadmapsLoading } = useRoadmaps();
  const { users, isLoading: usersLoading } = useUsers();
  const { userWallet } = useFinancial();
  const { navigate } = useNavigationWithLoading();
  const [selectedDateRange, setSelectedDateRange] = useState('This month');

  // Redirect if not authenticated or not a field admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'field-admin') {
      // Redirect to appropriate dashboard based on role
      const dashboardRoutes = {
        'student': '/dashboard/student',
        'trainer': '/dashboard/trainer',
        'umbrella-admin': '/dashboard/umbrella-admin'
      };
      navigate(dashboardRoutes[user.role as keyof typeof dashboardRoutes] || '/');
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 h-64 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if user is not authenticated or not a field admin
  if (!user || user.role !== 'field-admin') {
    return null;
  }

  // Get field-specific data
  const fieldUsers = users.filter(u => u.fieldId === user.fieldId);
  const fieldStudents = fieldUsers.filter(u => u.role === 'student');
  const fieldTrainers = fieldUsers.filter(u => u.role === 'trainer');

  const fieldRoadmaps = studentRoadmaps.filter(roadmap =>
    fieldStudents.some(student => student.id === roadmap.studentId)
  );

  const activeRoadmaps = fieldRoadmaps.filter(r => r.status === 'active');
  const completedRoadmaps = fieldRoadmaps.filter(r => r.status === 'completed');

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Home" userType="field-admin" />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-full mx-auto">
            {/* Welcome Section */}
            <div className="mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                Welcome back, {user.name.split(' ')[0]} 👑
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage and oversee your field operations and performance.
              </p>
            </div>

            {/* Field Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
              <div className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100  hover:shadow-lg transition-all duration-300 animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Students</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900">{fieldStudents.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100  hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Trainers</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900">{fieldTrainers.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100  hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Field Wallet</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900">
                      {(userWallet?.balance || 0).toLocaleString()} RWF
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100  hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Active Roadmaps</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900">{activeRoadmaps.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Field Overview Chart */}
                <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <MonthlySessionsChart userType="field-admin" />
                </div>

                {/* Field Roadmaps Overview */}
                <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                  <TotalRoadmaps
                    roadmaps={fieldRoadmaps}
                    userType="field-admin"
                  />
                </div>

                {/* Calendar */}
                <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
                  <Calendar
                    selectedDateRange={selectedDateRange}
                    onDateRangeChange={setSelectedDateRange}
                    userType="field-admin"
                  />
                </div>
              </div>

              {/* Right Column - Sidebar Content */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 animate-slide-up" style={{ animationDelay: '700ms' }}>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/dashboard/field-admin/trainers')}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-4 h-4 text-gray-500 group-hover:text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">Manage Trainers</div>
                          <div className="text-xs text-gray-500">View trainer capacity & assignments</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/dashboard/field-admin/students')}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Eye className="w-4 h-4 text-gray-500 group-hover:text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">Student Activity</div>
                          <div className="text-xs text-gray-500">Monitor learning progress</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/dashboard/field-admin/wallet')}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-4 h-4 text-gray-500 group-hover:text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">Field Wallet</div>
                          <div className="text-xs text-gray-500">Manage field finances</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Scheduled Events */}
                <div className="animate-slide-up" style={{ animationDelay: '800ms' }}>
                  <ScheduledEvents userType="field-admin" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}