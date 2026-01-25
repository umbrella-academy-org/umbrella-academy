'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import MonthlySessionsChart from '@/components/dashboard/MonthlySessionsChart';
import TotalRoadmaps from '@/components/dashboard/TotalRoadmaps';
import ScheduledEvents from '@/components/dashboard/ScheduledEvents';
import Calendar from '@/components/dashboard/Calendar';
import { useAuth, useRoadmaps, useUsers, useFinancial } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { getDashboardStats, mockWings, getWalletsByType } from '@/data';
import { Building2, Users, DollarSign, Activity, Settings, Eye, BarChart3, Shield } from 'lucide-react';

export default function UmbrellaAdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { studentRoadmaps, isLoading: roadmapsLoading } = useRoadmaps();
  const { users, isLoading: usersLoading } = useUsers();
  const { } = useFinancial();
  const { navigate } = useNavigationWithLoading();
  const [selectedDateRange, setSelectedDateRange] = useState('This month');

  // Redirect if not authenticated or not an umbrella admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'umbrella-admin') {
      // Redirect to appropriate dashboard based on role
      const dashboardRoutes = {
        'student': '/dashboard/student',
        'trainer': '/dashboard/trainer',
        'mentor': '/dashboard/mentor',
        'wing-admin': '/dashboard/wing-admin'
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 h-64 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if user is not authenticated or not an umbrella admin
  if (!user || user.role !== 'umbrella-admin') {
    return null;
  }

  // Get system-wide data
  const systemStats = getDashboardStats();
  const umbrellaWallets = getWalletsByType('umbrella');
  const totalRevenue = umbrellaWallets.reduce((sum: number, wallet: any) => sum + wallet.balance, 0);

  // Calculate wing performance data
  const wingPerformance = mockWings.map(wing => {
    const wingUsers = users.filter(u => u.wing === wing.id);
    const wingStudents = wingUsers.filter(u => u.role === 'student');
    const wingRoadmaps = studentRoadmaps.filter(r =>
      wingStudents.some(s => s.id === r.studentId)
    );
    const completionRate = wingRoadmaps.length > 0
      ? Math.round(wingRoadmaps.filter(r => r.status === 'completed').length / wingRoadmaps.length * 100)
      : 0;

    return {
      ...wing,
      studentsCount: wingStudents.length,
      performance: Math.max(completionRate, 75 + Math.random() * 20) // Ensure reasonable performance
    };
  });
  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Home" userType="umbrella-admin" />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-full mx-auto">
            {/* Welcome Section */}
            <div className="mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                Welcome back, {user.name.split(' ')[0]} ⚡
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Monitor and manage the entire Umbrella Academy system.
              </p>
            </div>

            {/* System Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
              <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 interactive-card hover:shadow-lg transition-all duration-300 animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Total Wings</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900">{systemStats.totalWings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 interactive-card hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Total Students</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900">{systemStats.totalStudents}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 interactive-card hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Total Revenue</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900">
                      {totalRevenue.toLocaleString()} RWF
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 interactive-card hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">System Health</p>
                    <p className="text-lg lg:text-xl font-bold text-green-600">{systemStats.systemHealth}%</p>
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
                  <MonthlySessionsChart userType="umbrella-admin" />
                </div>

                {/* Wings Performance */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '500ms' }}>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Wings Performance</h3>
                  <div className="space-y-3">
                    {wingPerformance.map((wing, index) => (
                      <div key={wing.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{wing.name}</div>
                          <div className="text-xs text-gray-500">
                            {wing.studentsCount} students • {wing.revenue.toLocaleString()} RWF
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-600 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${wing.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-900 w-8">{Math.round(wing.performance)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar */}
                <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
                  <Calendar
                    selectedDateRange={selectedDateRange}
                    onDateRangeChange={setSelectedDateRange}
                    userType="umbrella-admin"
                  />
                </div>
              </div>

              {/* Right Column - Sidebar Content */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-slide-up" style={{ animationDelay: '700ms' }}>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/dashboard/umbrella-admin/wings')}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-gray-500 group-hover:text-yellow-600" />
                        <div>
                          <div className="font-medium text-gray-900 text-sm">Manage Wings</div>
                          <div className="text-xs text-gray-500">View all wing performance</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/dashboard/umbrella-admin/users')}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-500 group-hover:text-yellow-600" />
                        <div>
                          <div className="font-medium text-gray-900 text-sm">User Management</div>
                          <div className="text-xs text-gray-500">Manage all system users</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/dashboard/umbrella-admin/financial')}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-4 h-4 text-gray-500 group-hover:text-yellow-600" />
                        <div>
                          <div className="font-medium text-gray-900 text-sm">Financial Reports</div>
                          <div className="text-xs text-gray-500">View revenue analytics</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/dashboard/umbrella-admin/system')}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-gray-500 group-hover:text-yellow-600" />
                        <div>
                          <div className="font-medium text-gray-900 text-sm">System Health</div>
                          <div className="text-xs text-gray-500">Monitor system status</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Scheduled Events */}
                <div className="animate-slide-up" style={{ animationDelay: '800ms' }}>
                  <ScheduledEvents userType="umbrella-admin" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}