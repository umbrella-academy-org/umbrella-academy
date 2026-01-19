'use client';

import { ChevronRight, Clock } from 'lucide-react';

export default function CurrentPhase() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">Current Phase</h3>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
      
      <div className="space-y-2">
        <div>
          <p className="text-sm font-medium text-gray-900">Fund Processing</p>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock className="w-3 h-3" />
          <span>Estimated completion in 2 weeks</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '60%' }}></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>60% Complete</span>
          <span>Phase 2 of 3</span>
        </div>
      </div>
    </div>
  );
}