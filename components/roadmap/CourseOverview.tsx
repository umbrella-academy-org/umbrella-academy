'use client';

import { Play, Star, User } from 'lucide-react';

export default function CourseOverview() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:border-gray-200 transition-all duration-500">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl group-hover:bg-gray-100 transition-colors duration-500"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        {/* Course Discovery */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center shadow-lg shadow-gray-600/20 transform group-hover:scale-105 transition-transform duration-500">
            <Play className="w-8 h-8 text-white fill-current" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold   rounded-md">
                Active Roadmap
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-gray-400 fill-current' : 'text-gray-200'}`} />
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-amber-900   mb-1">Programming & Development</h3>
            <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"></span>
              Full Stack Engineering Track
            </p>
          </div>
        </div>

        {/* Mentor Section */}
        <div className="flex items-center gap-4 bg-gray-50 px-5 py-3 rounded-lg border border-gray-100 group/mentor hover:bg-white hover:shadow-md transition-all duration-300">
          <div className="text-right">
            <p className="text-[10px] text-gray-400  font-bold   mb-0.5">Your Mentor</p>
            <p className="text-sm font-bold text-amber-900   mb-1">Demi Wilkinson</p>
            <p className="text-[11px] text-gray-500 font-medium">Principal Engineer</p>
          </div>

          <div className="relative">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-white">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-700" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}