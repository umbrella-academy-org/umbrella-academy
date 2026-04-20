'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth, useUsers, useFinancial } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { Users, DollarSign, UserCheck, Tag, BarChart3 } from 'lucide-react';
import { UserRole } from '@/types/user';

export default function UmbrellaAdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { students, trainers, isLoading: usersLoading } = useUsers();
  const { getTotalBalance, isLoading: financialLoading } = useFinancial();
  const { navigate } = useNavigationWithLoading();

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
  }, [authLoading, isAuthenticated, user]);

  const isLoading = authLoading || usersLoading || financialLoading;

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
  const totalStudents = students?.length || 0;
  const totalTrainers = trainers?.length || 0;
  const pendingTrainers = trainers?.filter(t => t.status === 'pending').length || 0;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Dashboard" userType={UserRole.ADMIN} />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-full mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage users, payments, and system operations.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Trainers</p>
                    <p className="text-2xl font-bold text-gray-900">{totalTrainers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending Approvals</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingTrainers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString()} RWF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                </div>
                <p className="text-gray-600 mb-4">Manage all system users and their roles.</p>
                <button
                  onClick={() => navigate('/dashboard/admin/users')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Manage Users
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Payments</h3>
                </div>
                <p className="text-gray-600 mb-4">View payment history and transactions.</p>
                <button
                  onClick={() => navigate('/dashboard/admin/payments')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Payments
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Promo Codes</h3>
                </div>
                <p className="text-gray-600 mb-4">Create and manage discount codes.</p>
                <button
                  onClick={() => navigate('/dashboard/admin/promo-codes')}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Manage Codes
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Trainer Approvals</h3>
                </div>
                <p className="text-gray-600 mb-4">Review and approve trainer applications.</p>
                <button
                  onClick={() => navigate('/dashboard/admin/trainer-approvals')}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Review Applications
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
                </div>
                <p className="text-gray-600 mb-4">View system analytics and reports.</p>
                <button
                  onClick={() => navigate('/dashboard/admin/reports')}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
