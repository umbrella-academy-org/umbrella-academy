'use client';

import { FileText, RotateCcw } from 'lucide-react';

export default function SubscriptionHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Plans & Subscription</h1>
        <p className="text-gray-600 mt-1">Manage All Registered Family Plans here</p>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          <FileText className="w-4 h-4" />
          Generate a Report
        </button>
        <a
          href="/dashboard/student/subscription/renew"
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Renew Plan
        </a>
      </div>
    </div>
  );
}