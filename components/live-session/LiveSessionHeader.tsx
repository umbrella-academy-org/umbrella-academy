'use client';

import { Plus } from 'lucide-react';

export default function LiveSessionHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Live Sessions</h1>
        <p className="text-gray-600 mt-1">Manage your mentorship sessions, deadlines, and learning activities in one place.</p>
      </div>
      
      <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center gap-2">
        <Plus className="w-4 h-4" />
        New Session
      </button>
    </div>
  );
}