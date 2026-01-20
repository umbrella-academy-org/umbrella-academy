'use client';

import { Star, User } from 'lucide-react';

export default function CourseCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex gap-4">
        {/* Course Image */}
        <div className="w-32 h-24 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex-shrink-0 overflow-hidden">
          <div className="w-full h-full bg-black/20 flex items-center justify-center">
            <div className="text-white text-xs font-medium text-center px-2">
              Programming & Development
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Programming & Development</h3>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            Learn to build software, websites, and apps.
          </p>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            This course provides students to software development through practice coding problem solving and real-world application building. Learners gain hands-on experience while being guided by a verified mentor.
          </p>

          {/* Rating and Mentor */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <span className="text-sm font-medium text-gray-700">4.5</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Details
              </button>
              <a
                href="/dashboard/student/live-session/call"
                className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-700 transition-colors"
              >
                Select
              </a>
            </div>
          </div>

          {/* Mentor Info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">Mentor:</div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Demi Wilkinson</div>
                  <div className="text-xs text-gray-500">Expert in Software Engineering</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}