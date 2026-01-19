'use client';

import { CheckCircle, Clock } from 'lucide-react';

export default function CompletionStats() {
  return (
    <div className="space-y-4">
      {/* Completed Phases */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Completed Phases</p>
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900">5</div>
      </div>

      {/* Pending Phases */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Pending Phases</p>
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900">3</div>
      </div>
    </div>
  );
}