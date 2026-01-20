'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function MentorNotificationsPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeItem="Notifications" userType="mentor" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          breadcrumb="Notifications" 
          userType="mentor"
        />
        
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Notifications</h1>
              <p className="text-gray-600">Your notifications will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}