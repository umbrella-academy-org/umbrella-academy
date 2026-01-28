'use client';

import { Calendar } from 'lucide-react';

export default function CalendarHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900  ">Smart Calendar</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Your centralized schedule for sessions, milestones, and deadlines.</p>
        </div>

      </div>
    </div>
  );
}