'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import StatsCards from '@/components/dashboard/StatsCards';

export default function WingAdminDashboard() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Home" userType="wing-admin" />
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Welcome Section */}
            <div className="mb-4 lg:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    Wing Administrator Dashboard 👑
                  </h1>
                  <p className="text-gray-500 mt-1 text-sm lg:text-base">Manage your wing operations</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:gap-3">
                  <button className="px-4 lg:px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors text-sm lg:text-base">
                    Wing Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Wing Overview */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 lg:gap-4 mt-4 lg:mt-6">
              {/* Wing Stats */}
              <div className="xl:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Wing Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-blue-600">Active Students</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-sm text-green-600">Active Trainers</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">RWF 3,675,000</div>
                    <div className="text-sm text-yellow-600">Wing Wallet</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">96%</div>
                    <div className="text-sm text-purple-600">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-900">Manage Trainers</div>
                    <div className="text-sm text-gray-500">View trainer capacity & assignments</div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-900">Student Activity</div>
                    <div className="text-sm text-gray-500">Monitor learning progress</div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-900">Wing Wallet</div>
                    <div className="text-sm text-gray-500">Manage wing finances</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}