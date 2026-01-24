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
       
      </div>
    </div>
  );
}