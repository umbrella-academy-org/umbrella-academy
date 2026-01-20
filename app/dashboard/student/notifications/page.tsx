'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import NotificationsHeader from '@/components/notifications/NotificationsHeader';
import NotificationsFilters from '@/components/notifications/NotificationsFilters';
import ActivityFeed from '@/components/notifications/ActivityFeed';
import ActivityDetails from '@/components/notifications/ActivityDetails';

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All time', 'US, ALL +4']);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Notifications" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header breadcrumb="Notifications" />

        {/* Notifications Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Notifications Header */}
            <NotificationsHeader />

            {/* Filters */}
            <NotificationsFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedFilters={selectedFilters}
              onFiltersChange={setSelectedFilters}
            />

            {/* Main Notifications Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-3 lg:gap-4 mt-4 lg:mt-6">
              {/* Left Column - Activity Feed (3 columns on xl) */}
              <div className="xl:col-span-3">
                <ActivityFeed
                  searchQuery={searchQuery}
                  selectedActivity={selectedActivity}
                  onActivitySelect={setSelectedActivity}
                />
              </div>

              {/* Right Column - Activity Details (2 columns on xl) */}
              <div className="xl:col-span-2">
                <ActivityDetails selectedActivity={selectedActivity} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}