'use client';

import { Bell, ChevronRight } from 'lucide-react';

export default function ScheduledEvents() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-400" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">Scheduled Events</h3>
            <p className="text-xs text-gray-500">2/12/2024</p>
          </div>
        </div>
        <button className="text-yellow-600 hover:text-yellow-700 text-xs font-medium flex items-center gap-1">
          Full calendar view
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}