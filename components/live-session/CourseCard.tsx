'use client';

import { Star, User } from 'lucide-react';

interface CourseCardProps {
  user?: {
    name?: string;
    expertise?: string;
  };
  userType?: 'student' | 'trainer';
}

export default function CourseCard({ user, userType = 'student' }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:border-gray-200 transition-all duration-500">
      {/* Subtle Background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl group-hover:bg-gray-100 transition-colors duration-500"></div>

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        {/* Course Discovery Image */}
        <div className="w-full md:w-48 h-36 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex-shrink-0 overflow-hidden relative shadow-lg">
          <div className="absolute inset-0 bg-amber-600/40 flex items-center justify-center p-4">
            <h4 className="text-white text-sm font-semibold text-center italic leading-tight decoration-gray-600 decoration-2 underline-offset-4 underline">
              Programming & Development
            </h4>
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex justify-between">
            <span className="text-[10px] font-medium text-gray-500 bg-amber-600/60 px-2 py-0.5 rounded">Core Track</span>
            <div className="flex -space-x-1">
              {[1, 2].map(i => <div key={i} className="w-4 h-4 rounded-full border border-amber-600 bg-amber-600 shadow-sm"></div>)}
            </div>
          </div>
        </div>

        {/* Course Details Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold text-amber-900   mb-2">Programming & Development</h3>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-sm font-medium text-gray-500 hover:text-amber-900 transition-colors">
                Overview
              </button>
              <a
                href="/post-signup/live-session/call"
                className="px-6 py-3 bg-amber-600 text-white text-sm  rounded-lg hover:bg-amber-700 transition-all duration-300 active:scale-95 shadow-sm"
              >
                Join Live Sync
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Dive deep into software architecture, algorithmic logic, and modern framework ecosystems guided by industry veterans.
          </p>

          {/* Combined Trainer Section */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100 group/mentor transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center p-0.5 shadow-sm">
              <div className="w-full h-full bg-white rounded-md flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-amber-900" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-amber-900">{user?.name || 'Demi Wilkinson'}</p>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{user?.expertise || 'Expert in Software Engineering'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}