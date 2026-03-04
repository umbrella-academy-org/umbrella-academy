'use client';

import { Filter, Download } from 'lucide-react';

export default function SmartCalendarHeader() {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900   mb-1">
            Smart Calendar
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Orchestrate your teaching schedule and monitor roadmap execution in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-gray-600 text-xs font-bold    rounded-lg hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 shadow-sm">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-gray-600 text-xs font-bold    rounded-lg hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Quick Action Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1.5 bg-gray-50/50  backdrop-blur-sm">
        {[
          { label: 'Sessions This Week', value: '24' },
          { label: 'Total Sync Hours', value: '48h' },
          { label: 'Active Students', value: '18' },
          { label: 'Roadmap Depth', value: '94%' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100/50">
            <div className="text-xl font-black text-gray-900  ">{stat.value}</div>
            <div className="text-[10px] font-bold text-gray-400    mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}