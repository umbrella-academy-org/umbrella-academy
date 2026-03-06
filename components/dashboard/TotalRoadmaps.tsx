'use client';

import { Play, ChevronRight, Users, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { StudentRoadmap, UserType } from '@/types';

interface TotalRoadmapsProps {
  roadmaps: StudentRoadmap[];
  userType: UserType;
}

export default function TotalRoadmaps({ roadmaps, userType }: TotalRoadmapsProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate roadmap statistics
  const totalRoadmaps = roadmaps.length;
  const completedRoadmaps = roadmaps.filter(r => r.status === 'completed').length;
  const activeRoadmaps = roadmaps.filter(r => r.status === 'active').length;
  const pendingRoadmaps = roadmaps.filter(r => r.status === 'enrolled').length;
  
  // Calculate overall progress
  const overallProgress = totalRoadmaps > 0 
    ? Math.round(roadmaps.reduce((sum, r) => sum + r.roadmap.progress.overallProgress, 0) / totalRoadmaps)
    : 0;

  // Get the most recent or active roadmap for display
  const featuredRoadmap = roadmaps.find(r => r.status === 'active') || roadmaps[0];
  
  // Get roadmap info if roadmap exists
  const roadmapInfo = featuredRoadmap ? {
    title: featuredRoadmap.roadmap.title,
    description: featuredRoadmap.roadmap.description,
    totalPhases: featuredRoadmap.roadmap.phases.length,
    completedPhases: featuredRoadmap.roadmap.phases.filter(p => p.status === 'completed').length,
    estimatedDuration: `${featuredRoadmap.roadmap.estimatedDuration} weeks`,
    studentsCount: roadmaps.filter(r => r.roadmapId === featuredRoadmap.roadmapId).length
  } : null;

  if (!featuredRoadmap || !roadmapInfo) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Roadmaps Available</h3>
          <p className="text-sm text-gray-600 mb-4">
            {userType === 'trainer' 
              ? 'No student roadmaps assigned to you yet.'
              : 'Start your learning journey by creating a roadmap.'
            }
          </p>
          <button className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
            {userType === 'trainer' ? 'View All Students' : 'Create Roadmap'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100  hover:shadow-lg transition-all duration-300 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        {/* Course Image */}
        <div className="w-32 h-24 sm:w-40 sm:h-28 bg-linear-to-br from-gray-900 to-gray-700 rounded-lg overflow-hidden shrink-0 relative group cursor-pointer">
          <div className="absolute inset-0 bg-yellow-600 bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
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
              <div className={`h-1 bg-gray-300 rounded w-3/4 opacity-60 transition-all duration-500 ${
                isHovered ? 'animate-shimmer' : ''
              }`}></div>
              <div className={`h-1 bg-gray-300 rounded w-1/2 opacity-60 transition-all duration-700 ${
                isHovered ? 'animate-shimmer' : ''
              }`} style={{ animationDelay: '0.2s' }}></div>
              <div className={`h-1 bg-gray-300 rounded w-2/3 opacity-60 transition-all duration-900 ${
                isHovered ? 'animate-shimmer' : ''
              }`} style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          
          {/* Roadmap Label */}
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-yellow-600 bg-opacity-50 rounded px-2 py-1">
              <p className="text-white text-xs font-medium truncate">{roadmapInfo.title}</p>
            </div>
          </div>
        </div>

        {/* Roadmap Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-lg font-semibold text-gray-900 transition-colors duration-200 ${
                  isHovered ? 'text-gray-600' : ''
                }`}>
                  {userType === 'trainer' ? 'Student Roadmaps' : 'My Roadmaps'}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full animate-pulse ${
                  activeRoadmaps > 0 
                    ? 'bg-gray-100 text-gray-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  ● {activeRoadmaps > 0 ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 truncate">
                {roadmapInfo.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">
                      {userType === 'trainer' ? 'Students' : 'Phases'}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {userType === 'trainer' 
                        ? `${roadmapInfo.studentsCount}/${roadmapInfo.studentsCount + 2}` 
                        : `${roadmapInfo.completedPhases}/${roadmapInfo.totalPhases}`
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-semibold text-gray-900">{roadmapInfo.estimatedDuration}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="text-right shrink-0">
              <div className={`text-2xl font-bold text-gray-900 mb-1 transition-all duration-300 ${
                isHovered ? 'scale-110 text-gray-600' : ''
              }`}>
                {overallProgress}%
              </div>
              <p className="text-xs text-gray-500 mb-2 whitespace-nowrap">
                {completedRoadmaps} of {totalRoadmaps} Roadmaps Completed
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 interactive-button">
                  View All
                </button>
                <button className="px-3 py-1.5 bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105 focus:ring-2 focus:ring-gray-300">
                  {userType === 'trainer' ? 'Manage' : 'Continue'}
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span className="hover:text-gray-800 transition-colors">Overall Progress</span>
              <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                isHovered ? 'translate-x-1' : ''
              }`} />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-linear-to-r from-gray-500 to-gray-600 h-2 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: isHovered ? `${overallProgress}%` : `${Math.max(overallProgress - 10, 0)}%` }}
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
              <CheckCircle className="w-3 h-3 text-yellow-600" />
              <span className="text-gray-600">{completedRoadmaps} Completed</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">{activeRoadmaps} Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
              <span className="text-gray-600">{pendingRoadmaps} Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}