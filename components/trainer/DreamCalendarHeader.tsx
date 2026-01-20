'use client';

import { Calendar, Plus, Filter, Download } from 'lucide-react';

export default function DreamCalendarHeader() {
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
            Dream Calendar
          </h1>
          <p className="text-gray-600">
            Manage your teaching schedule and track student progress efficiently.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-200 transform hover:scale-105">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Activity</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">24</div>
          <div className="text-sm text-gray-600">Sessions This Week</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">48h</div>
          <div className="text-sm text-gray-600">Total Hours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">18</div>
          <div className="text-sm text-gray-600">Active Students</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">94%</div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
      </div>
    </div>
  );
}