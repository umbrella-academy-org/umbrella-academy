'use client';

import { X, Play } from 'lucide-react';

export default function CalendarInfo() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Learning Status</h3>
          <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md tracking-wider">
            On Track
          </span>
        </div>

        <div className="space-y-6">
          {/* Active Goal */}
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold   mb-1.5">Current Track</p>
            <h4 className="text-base font-bold text-gray-900 mb-2">Programming & Development</h4>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-gray-500 font-medium">Goal Progress</span>
              <span className="text-yellow-600 font-bold">65%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-yellow-600 h-1.5 rounded-full transition-all duration-1000"
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase   mb-1">Sessions</p>
              <p className="text-lg font-bold text-gray-900">12/18</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase   mb-1">Avg. Grade</p>
              <p className="text-lg font-bold text-gray-900">8.5</p>
            </div>
          </div>

          {/* Mentor Mention */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center border border-white shadow-sm">
              <span className="text-xs font-bold text-yellow-700">DW</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase   leading-none mb-1">Mentor</p>
              <p className="text-sm font-bold text-gray-900">Demi Wilkinson</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-6 py-3 bg-yellow-600 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-gray-200">
          View Full Roadmap
        </button>
      </div>
    </div>
  );
}