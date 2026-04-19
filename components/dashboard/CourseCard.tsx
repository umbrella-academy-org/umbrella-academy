'use client';

import { Play, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';
import { Roadmap } from '@/types/roadmap';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

// Minimal interface for CourseCard to avoid type conflicts
interface CourseCardRoadmap {
  roadmap: {
    title: string;
    description: string;
    progress: {
      overallProgress: number;
      completedPhases: number;
      totalPhases: number;
    };
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
  };
  studentId: string;
  status: string;
  enrolledAt: string;
}

interface CourseCardProps {
  activeRoadmap?: CourseCardRoadmap;
}

export default function CourseCard({ activeRoadmap }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { navigate } = useNavigationWithLoading();

  // If no active roadmap, show placeholder
  if (!activeRoadmap) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Roadmap</h3>
          <p className="text-gray-500 mb-4">Start your learning journey today</p>
          <button
            onClick={() => navigate('/post-signup/roadmap')}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
          >
            Browse Roadmaps
          </button>
        </div>
      </div>
    );
  }

  const { roadmap } = activeRoadmap;
  const progress = roadmap.progress.overallProgress;
  const completedPhases = roadmap.progress.completedPhases;
  const totalPhases = roadmap.progress.totalPhases;

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100  animate-fade-in hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        {/* Roadmap Image */}
        <div className="w-20 h-16 sm:w-24 sm:h-18 bg-linear-to-br from-gray-900 to-gray-700 rounded-lg overflow-hidden shrink-0 relative group cursor-pointer">
          <div className="absolute inset-0 bg-yellow-600 bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110 animate-pulse-glow' : ''
              }`}>
              <Play className="w-3 h-3 text-white fill-current" />
            </div>
          </div>
          {/* Code-like overlay with animation */}
          <div className="absolute top-1 left-1 right-1">
            <div className="space-y-1">
              <div className={`h-0.5 bg-gray-300 rounded w-3/4 opacity-60 transition-all duration-500 ${isHovered ? 'animate-shimmer' : ''
                }`}></div>
              <div className={`h-0.5 bg-gray-300 rounded w-1/2 opacity-60 transition-all duration-700 ${isHovered ? 'animate-shimmer' : ''
                }`} style={{ animationDelay: '0.2s' }}></div>
              <div className={`h-0.5 bg-gray-300 rounded w-2/3 opacity-60 transition-all duration-900 ${isHovered ? 'animate-shimmer' : ''
                }`} style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>

        {/* Roadmap Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 truncate group-hover:text-gray-600 transition-colors">
                {roadmap.title}
              </h3>
              <p className="text-xs text-gray-500 mb-1">
                Enrolled: {new Date(activeRoadmap.enrolledAt).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${activeRoadmap.status === 'active'
                  ? 'bg-gray-100 text-gray-700 animate-pulse'
                  : activeRoadmap.status === 'paused'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-gray-100 text-gray-700'
                  }`}>
                  ● {activeRoadmap.status.charAt(0).toUpperCase() + activeRoadmap.status.slice(1)}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 transition-all duration-200 ${i < Math.floor(roadmap.difficulty === 'beginner' ? 3 : roadmap.difficulty === 'intermediate' ? 4 : 5) ? 'text-gray-400 fill-current' : 'text-gray-300'
                        }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">{roadmap.difficulty}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3 truncate">{roadmap.tags.join(', ')}</p>
            </div>

            {/* Progress */}
            <div className="text-right shrink-0">
              <div className={`text-lg sm:text-xl font-bold text-gray-900 mb-1 transition-all duration-300 ${isHovered ? 'scale-110 text-gray-600' : ''
                }`}>
                {Math.round(progress)}%
              </div>
              <p className="text-xs text-gray-500 mb-2 whitespace-nowrap">
                {completedPhases} Out of {totalPhases} Phases
              </p>
              <button
                onClick={() => navigate('/post-signup/roadmap')}
                className="px-3 py-1 bg-yellow-600 text-white text-xs font-medium rounded hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105 focus:ring-2 focus:ring-gray-300"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span className="hover:text-gray-800 transition-colors">Roadmap Progress</span>
              <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''
                }`} />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-linear-to-r from-gray-500 to-gray-600 h-1.5 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progress}%` }}
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
        </div>
      </div>
    </div>
  );
}