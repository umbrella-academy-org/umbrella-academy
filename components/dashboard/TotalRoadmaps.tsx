'use client';

import { Play, ChevronRight, Users, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function TotalRoadmaps() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 interactive-card hover:shadow-lg transition-all duration-300 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        {/* Course Image */}
        <div className="w-32 h-24 sm:w-40 sm:h-28 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg overflow-hidden flex-shrink-0 relative group cursor-pointer">
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'scale-110 animate-pulse-glow' : ''
            }`}>
              <Play className="w-4 h-4 text-white fill-current" />
            </div>
          </div>
          {/* Code-like overlay with animation */}
          <div className="absolute top-2 left-2 right-2">
            <div className="space-y-1">
              <div className={`h-1 bg-blue-300 rounded w-3/4 opacity-60 transition-all duration-500 ${
                isHovered ? 'animate-shimmer' : ''
              }`}></div>
              <div className={`h-1 bg-green-300 rounded w-1/2 opacity-60 transition-all duration-700 ${
                isHovered ? 'animate-shimmer' : ''
              }`} style={{ animationDelay: '0.2s' }}></div>
              <div className={`h-1 bg-yellow-300 rounded w-2/3 opacity-60 transition-all duration-900 ${
                isHovered ? 'animate-shimmer' : ''
              }`} style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          
          {/* Course Label */}
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-black bg-opacity-50 rounded px-2 py-1">
              <p className="text-white text-xs font-medium">Programming & Development</p>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-lg font-semibold text-gray-900 transition-colors duration-200 ${
                  isHovered ? 'text-yellow-600' : ''
                }`}>
                  Total Roadmaps
                </h3>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full animate-pulse">
                  ● Active
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                22 September, 2023
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Students</p>
                    <p className="text-sm font-semibold text-gray-900">8/10</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-semibold text-gray-900">6 months</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="text-right flex-shrink-0">
              <div className={`text-2xl font-bold text-gray-900 mb-1 transition-all duration-300 ${
                isHovered ? 'scale-110 text-yellow-600' : ''
              }`}>
                75%
              </div>
              <p className="text-xs text-gray-500 mb-2 whitespace-nowrap">5 out of 8 Roadmaps Completed</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 interactive-button">
                  View All
                </button>
                <button className="px-3 py-1.5 bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105 focus:ring-2 focus:ring-yellow-300">
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span className="hover:text-gray-800 transition-colors">Roadmap Progress</span>
              <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                isHovered ? 'translate-x-1' : ''
              }`} />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: isHovered ? '75%' : '60%' }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-shimmer"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Started</span>
              <span>In Progress</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Milestones */}
          <div className="mt-4 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span className="text-gray-600">5 Completed</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-orange-500" />
              <span className="text-gray-600">2 In Progress</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
              <span className="text-gray-600">1 Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}