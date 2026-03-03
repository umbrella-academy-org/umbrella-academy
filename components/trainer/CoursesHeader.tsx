'use client';

import { BookOpen, Users, TrendingUp, Clock } from 'lucide-react';

export default function CoursesHeader() {
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
            Course & Modules
          </h1>
          <p className="text-gray-600">
            Manage your course content, modules, and track student progress.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        <button className="pb-4 border-b-2 border-gray-600 text-gray-600 font-medium">
          Courses
        </button>
        <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
          Modules
        </button>
        <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
          Analytics
        </button>
      </div>
    </div>
  );
}