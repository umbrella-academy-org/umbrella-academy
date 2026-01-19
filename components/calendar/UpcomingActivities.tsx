'use client';

import { Calendar, Edit } from 'lucide-react';

export default function UpcomingActivities() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">12 January, 2024</h3>
            <p className="text-xs text-gray-500">2 Activities Pending</p>
          </div>
        </div>
        <button className="text-yellow-600 hover:text-yellow-700 text-xs font-medium flex items-center gap-1">
          Edit
          <Edit className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}