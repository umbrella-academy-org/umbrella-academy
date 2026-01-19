'use client';

import { Play, ChevronRight } from 'lucide-react';

export default function CourseCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start gap-3">
        {/* Course Image */}
        <div className="w-24 h-18 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg overflow-hidden flex-shrink-0 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
              <Play className="w-3 h-3 text-white fill-current" />
            </div>
          </div>
          {/* Code-like overlay */}
          <div className="absolute top-1 left-1 right-1">
            <div className="space-y-1">
              <div className="h-0.5 bg-blue-300 rounded w-3/4 opacity-60"></div>
              <div className="h-0.5 bg-green-300 rounded w-1/2 opacity-60"></div>
              <div className="h-0.5 bg-yellow-300 rounded w-2/3 opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Winmax Rwanda</h3>
              <p className="text-xs text-gray-500 mb-1">31 September, 2025</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  ● Active
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">Programming & Development</p>
            </div>
            
            {/* Progress */}
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900 mb-1">75%</div>
              <p className="text-xs text-gray-500 mb-2">2 Out of 3 Phases Finished</p>
              <button className="px-3 py-1 bg-yellow-600 text-white text-xs font-medium rounded hover:bg-yellow-700 transition-colors">
                Continue
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Phases Details</span>
              <ChevronRight className="w-3 h-3" />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-yellow-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}