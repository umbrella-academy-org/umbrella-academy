'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import StatsCards from '@/components/dashboard/StatsCards';

export default function UmbrellaAdminDashboard() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Home" userType="umbrella-admin" />
      
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
                    System Administrator Dashboard ⚡
                  </h1>
                  <p className="text-gray-500 mt-1 text-sm lg:text-base">Monitor entire Umbrella Academy system</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:gap-3">
                  <button className="px-4 lg:px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors text-sm lg:text-base">
                    System Settings
                  </button>
                </div>
              </div>
            </div>

            {/* System Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Wings</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-blue-600 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active Students</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">RWF 67,845,000</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-yellow-600 rounded-lg"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">System Health</p>
                    <p className="text-2xl font-bold text-green-600">98%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wings Overview */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 lg:gap-4 mt-4 lg:mt-6">
              {/* Wings Performance */}
              <div className="xl:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Wings Performance</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Programming Wing', students: 324, revenue: 'RWF 18,675,000', performance: 95 },
                    { name: 'Design Wing', students: 287, revenue: 'RWF 15,345,000', performance: 92 },
                    { name: 'Marketing Wing', students: 256, revenue: 'RWF 13,770,000', performance: 88 },
                    { name: 'Data Science Wing', students: 198, revenue: 'RWF 11,835,000', performance: 90 },
                    { name: 'Business Wing', students: 182, revenue: 'RWF 8,220,000', performance: 85 }
                  ].map((wing, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{wing.name}</div>
                        <div className="text-sm text-gray-500">{wing.students} students • {wing.revenue}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-600 h-2 rounded-full" 
                            style={{ width: `${wing.performance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-10">{wing.performance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-900">Manage Wings</div>
                    <div className="text-sm text-gray-500">View all wing performance</div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-900">User Management</div>
                    <div className="text-sm text-gray-500">Manage all system users</div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-900">Financial Reports</div>
                    <div className="text-sm text-gray-500">View revenue analytics</div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-900">System Health</div>
                    <div className="text-sm text-gray-500">Monitor system status</div>
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