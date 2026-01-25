'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

import MentorActivityFeed from '@/components/notifications/MentorActivityFeed';
import MentorNotificationStats from '@/components/notifications/MentorNotificationStats';

export default function MentorNotificationsPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Notifications" userType="mentor" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0 overflow-hidden">
        {/* Header */}
        <Header
          breadcrumb="Mentorship Alerts"
          userType="mentor"
        />

        {/* notifications Content - Scrollable */}
        <main className="flex-1 overflow-auto bg-gray-50/30">
          <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">Mentor Hub</h1>
                <p className="text-sm font-medium text-gray-500">Monitor your students' success and manage administrative requests.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-5 py-2.5 bg-yellow-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-yellow-700 shadow-lg shadow-yellow-600/20 transition-all active:scale-95">
                  Mark All Read
                </button>
                <button className="p-2.5 bg-white border border-gray-100 text-gray-400 rounded-xl hover:text-gray-900 shadow-sm transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
              </div>
            </div>

            {/* Specialized Performance Stats */}
            <MentorNotificationStats />

            {/* Main Feed Container */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Activity Feed (Primary) */}
              <div className="xl:col-span-2">
                <MentorActivityFeed />
              </div>

              {/* Side Metadata (Real-time Suggestions) */}
              <div className="space-y-6">
                <div className="bg-gradient-to-tr from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10">
                    <h3 className="text-xl font-black tracking-tight mb-2">Mentor Insight</h3>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6 italic opacity-80">"Roadmap approvals are currently 40% faster this month. Students show high engagement with Feedback Loops."</p>
                    <button className="w-full py-4 bg-yellow-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-yellow-700 transition-all shadow-lg shadow-yellow-600/20">
                      Download Report
                    </button>
                  </div>
                  {/* Background design */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-600 rounded-full -mr-24 -mt-24 opacity-10 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600 rounded-full -ml-16 -mb-16 opacity-10 blur-3xl"></div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Support Directives</h3>
                  <div className="space-y-4">
                    {[
                      'Prioritize Jane\'s Roadmap (Urgent)',
                      'Complete Session Review for Eric',
                      'Reply to Mentoring Sync Request'
                    ].map((task, i) => (
                      <div key={i} className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 group-hover:scale-150 transition-transform"></div>
                        <span className="text-xs font-bold text-gray-700 group-hover:text-yellow-600 transition-colors">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}