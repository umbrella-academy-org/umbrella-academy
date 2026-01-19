'use client';

import { Play, Star, User } from 'lucide-react';

export default function CourseOverview() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start gap-4">
        {/* Course Image */}
        <div className="w-32 h-24 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg overflow-hidden flex-shrink-0 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-current" />
            </div>
          </div>
          {/* Code-like overlay */}
          <div className="absolute top-2 left-2 right-2">
            <div className="space-y-1">
              <div className="h-1 bg-blue-300 rounded w-3/4 opacity-60"></div>
              <div className="h-1 bg-green-300 rounded w-1/2 opacity-60"></div>
              <div className="h-1 bg-yellow-300 rounded w-2/3 opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Programming & Development</h3>
          <p className="text-sm text-gray-600 mb-3">Learn to build software, websites, and apps.</p>
          <p className="text-xs text-gray-500 mb-4">
            This course introduces students to software development through hands-on coding, problem-solving, and real-world 
            application building. Learners gain hands-on experience while being guided by a skilled mentor.
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
              <Star className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-sm text-gray-600">4.5</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Details
            </button>
            <button className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
              Select
            </button>
          </div>
        </div>

        {/* Mentor Info */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Mentor</p>
          <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mb-2 mx-auto">
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-900">Demi Wilkinson</p>
          <p className="text-xs text-gray-500">Product & Software Engineering</p>
        </div>
      </div>
    </div>
  );
}