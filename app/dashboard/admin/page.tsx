'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import MonthlySessionsChart from '@/components/dashboard/MonthlySessionsChart';
import ScheduledEvents from '@/components/dashboard/ScheduledEvents';
import Calendar from '@/components/dashboard/Calendar';
import { useAuth, useRoadmaps, useUsers, useFinancial } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { Users, DollarSign, Activity, BarChart3, Shield } from 'lucide-react';

export default function UmbrellaAdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { isLoading: roadmapsLoading } = useRoadmaps();
  const { students, isLoading: usersLoading } = useUsers();
  const { getTotalBalance, isLoading: financialLoading } = useFinancial();
  const { navigate } = useNavigationWithLoading();
  const [selectedDateRange, setSelectedDateRange] = useState('This month');

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'admin') {
      const dashboardRoutes: Record<string, string> = {
        'student': '/dashboard/student',
        'trainer': '/dashboard/trainer',
      };
      navigate(dashboardRoutes[user.role] || '/');
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  const isLoading = authLoading || roadmapsLoading || usersLoading || financialLoading;

  if (isLoading) {
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

  if (!user || user.role !== 'admin') {
    return null;
  }

  const totalRevenue = getTotalBalance();
  const totalStudents = students.length;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Home" userType={UserRole.ADMIN} />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-full mx-auto">
            {/* Welcome Section */}
            <div className="mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                Welcome back, {user.firstName + " " + user.lastName.split(' ')[0]} ⚡
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Monitor and manage the entire Dreamize system.
              </p>
            </div>

            {/* System Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
              <div className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Total Students</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900">{totalStudents}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Total Revenue</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900">
                      {totalRevenue.toLocaleString()} RWF
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Activity className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">System Health</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-600">—</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* System Overview Chart */}
                <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <MonthlySessionsChart userType={UserRole.ADMIN} />
                </div>

                {/* Calendar */}
                <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                  <Calendar
                    selectedDateRange={selectedDateRange}
                    onDateRangeChange={setSelectedDateRange}
                    userType={UserRole.ADMIN}
                  />
                </div>
              </div>

              {/* Right Column - Sidebar Content */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 animate-slide-up" style={{ animationDelay: '600ms' }}>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/dashboard/admin/users')}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-500 group-hover:text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900 text-sm">User Management</div>
                          <div className="text-xs text-gray-500">Manage all system users</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/dashboard/admin/financial')}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-4 h-4 text-gray-500 group-hover:text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900 text-sm">Financial Reports</div>
                          <div className="text-xs text-gray-500">View revenue analytics</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/dashboard/admin/system')}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-gray-500 group-hover:text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900 text-sm">System Health</div>
                          <div className="text-xs text-gray-500">Monitor system status</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Scheduled Events */}
                <div className="animate-slide-up" style={{ animationDelay: '700ms' }}>
                  <ScheduledEvents userType={UserRole.ADMIN} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
