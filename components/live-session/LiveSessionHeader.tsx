'use client';

import { Plus } from 'lucide-react';

export default function LiveSessionHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Live Sessions</h1>
        <p className="text-sm text-gray-500">Connect with your trainers and peers in real-time learning environments.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
              <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-[10px] font-bold text-white">
                {String.fromCharCode(64 + i)}
              </div>
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
            +12
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500">Active Now</p>
      </div>
    </div>
  );
}