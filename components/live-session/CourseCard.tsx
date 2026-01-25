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
    <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:border-yellow-200 transition-all duration-500">
      {/* Subtle Background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl group-hover:bg-yellow-100 transition-colors duration-500"></div>

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        {/* Course Discovery Image */}
        <div className="w-full md:w-48 h-36 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex-shrink-0 overflow-hidden relative shadow-lg">
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
            <h4 className="text-white text-sm font-black text-center uppercase tracking-tighter leading-tight decoration-yellow-600 decoration-2 underline-offset-4 underline">
              Programming & Development
            </h4>
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex justify-between">
            <span className="text-[8px] font-black text-yellow-600 uppercase bg-black/60 px-1.5 py-0.5 rounded">Core Track</span>
            <div className="flex -space-x-1">
              {[1, 2].map(i => <div key={i} className="w-3 h-3 rounded-full border border-black bg-gray-600"></div>)}
            </div>
          </div>
        </div>

        {/* Course Details Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-3 h-3 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                ))}
                <span className="text-[10px] font-bold text-gray-400 ml-1">4.5 (1.2k Reviews)</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-none mb-2">Programming & Development</h3>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-xs font-bold text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors">
                Overview
              </button>
              <a
                href="/dashboard/student/live-session/call"
                className="px-6 py-3 bg-yellow-600 text-white text-xs font-bold rounded-xl hover:bg-yellow-700 hover:shadow-lg hover:shadow-yellow-600/20 transition-all duration-300 active:scale-95"
              >
                Join Live Sync
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
            Dive deep into software architecture, algorithmic logic, and modern framework ecosystems guided by industry veterans.
          </p>

          {/* Combined Mentor Section */}
          <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 group/mentor backdrop-blur-sm transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 to-yellow-600 flex items-center justify-center p-0.5 shadow-sm">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-gray-900" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900 leading-none">{user?.name || 'Demi Wilkinson'}</p>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              </div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1 tracking-tight">{user?.expertise || 'Expert in Software Engineering'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}