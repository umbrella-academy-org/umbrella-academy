'use client';

import { X, Play } from 'lucide-react';

export default function CalendarInfo() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">What is included in your Smart Calendar?</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">Check out the new dashboard view. Maybe now, load faster.</p>
      
      {/* Video Thumbnail */}
      <div className="relative rounded-lg overflow-hidden mb-4">
        <img 
          src="/api/placeholder/300/180" 
          alt="Calendar tutorial video"
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <button className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
            <Play className="w-6 h-6 text-gray-800 ml-1" />
          </button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
          Dismiss
        </button>
        <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
          What's new?
        </button>
      </div>
    </div>
  );
}