'use client';

import { Plus } from 'lucide-react';

export default function CalendarHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dream Calendar</h1>
          <p className="text-gray-500 mt-1">Manage your mentorship sessions, deadlines, and learning sessions in one place</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Activity
        </button>
      </div>
    </div>
  );
}