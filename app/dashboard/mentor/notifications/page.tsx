'use client';

import Sidebar from '@/components/dashboard/Sidebar';


import MentorActivityFeed from '@/components/notifications/MentorActivityFeed';
import MentorNotificationStats from '@/components/notifications/MentorNotificationStats';

export default function MentorNotificationsPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Notifications" userType="mentor" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0 overflow-hidden">

        {/* notifications Content - Scrollable */}
        <main className="flex-1 overflow-auto bg-gray-50/30">
          <div className="max-w-fullmx-auto p-4 lg:p-8 space-y-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-amber-900     mb-2">Mentor Hub</h1>
                <p className="text-sm font-medium text-gray-500">Monitor your students' success and manage administrative requests.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-5 py-2.5 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 shadow-lg shadow-gray-600/20 transition-all active:scale-95">
                  Mark All Read
                </button>
                <button className="p-2.5 bg-white border border-gray-200 text-gray-400 rounded-lg hover:text-amber-900 shadow-sm transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="gray" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
              </div>
            </div>

            {/* Specialized Performance Stats */}
            <MentorNotificationStats />

            {/* Main Feed Container */}
            <div className="grid grid-cols-1 gap-8">
              <MentorActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}