'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import TrainerStatsCards from '@/components/dashboard/TrainerStatsCards';
import MonthlySessionsChart from '@/components/dashboard/MonthlySessionsChart';
import TotalRoadmaps from '@/components/dashboard/TotalRoadmaps';
import TrainingCapacity from '@/components/dashboard/TrainingCapacity';
import ScheduledEvents from '@/components/dashboard/ScheduledEvents';
import Calendar from '@/components/dashboard/Calendar';
import LiveSessions from '@/components/dashboard/LiveSessions';

export default function TrainerDashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState('This month');

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeItem="Home" userType="trainer" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          breadcrumb="Home" 
          userType="trainer"
          actions={
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button className="px-3 py-2 border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 interactive-button">
                Generate a Report
              </button>
              <button className="px-3 py-2 bg-yellow-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105">
                Schedule a Session
              </button>
            </div>
          }
        />
        
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                Welcome back, Jane 👋
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Track, manage and forecast your students.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <TrainerStatsCards />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Monthly Sessions Chart */}
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <MonthlySessionsChart />
                </div>

                {/* Total Roadmaps */}
                <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <TotalRoadmaps />
                </div>

                {/* Calendar */}
                <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <Calendar 
                    selectedDateRange={selectedDateRange}
                    onDateRangeChange={setSelectedDateRange}
                  />
                </div>
              </div>

              {/* Right Column - Sidebar Content */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Training Capacity */}
                <div className="animate-slide-up" style={{ animationDelay: '500ms' }}>
                  <TrainingCapacity />
                </div>

                {/* Scheduled Events */}
                <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
                  <ScheduledEvents />
                </div>

                {/* Live Sessions */}
                <div className="animate-slide-up" style={{ animationDelay: '700ms' }}>
                  <LiveSessions />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}