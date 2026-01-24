'use client';

import { ChevronRight, Clock, CheckCircle, Target } from 'lucide-react';
import { useState } from 'react';
import { StudentRoadmap } from '@/types';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

interface CurrentPhaseProps {
  activeRoadmap?: StudentRoadmap;
}

export default function CurrentPhase({ activeRoadmap }: CurrentPhaseProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { navigate } = useNavigationWithLoading();

  // If no active roadmap, show placeholder
  if (!activeRoadmap) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="text-center py-6">
          <Target className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 mb-2">No Active Phase</h3>
          <p className="text-xs text-gray-500 mb-4">Start a course to see your current phase</p>
          <button 
            onClick={() => navigate('/dashboard/student/roadmap')}
            className="px-3 py-2 bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const { course } = activeRoadmap;
  const currentPhase = course.phases.find(phase => 
    phase.id === course.progress.currentPhaseId
  ) || course.phases.find(phase => phase.status === 'in-progress') || course.phases[0];

  if (!currentPhase) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="text-center py-6">
          <Target className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Course Not Started</h3>
          <p className="text-xs text-gray-500">Begin your learning journey</p>
        </div>
      </div>
    );
  }

  const phaseIndex = course.phases.findIndex(p => p.id === currentPhase.id);
  const totalPhases = course.phases.length;

  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 interactive-card animate-fade-in hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
          Current Phase
        </h3>
        <ChevronRight className={`w-4 h-4 text-gray-400 transition-all duration-200 ${
          isHovered ? 'translate-x-1 text-yellow-600' : ''
        }`} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className={`w-4 h-4 text-yellow-600 transition-all duration-300 ${
            isHovered ? 'animate-pulse-glow' : ''
          }`} />
          <p className="text-sm font-medium text-gray-900">{currentPhase.title}</p>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock className="w-3 h-3" />
          <span>
            Estimated completion in {currentPhase.estimatedDuration} weeks
          </span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${currentPhase.progress}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-shimmer"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span className="font-medium">{Math.round(currentPhase.progress)}% Complete</span>
          <span>Phase {phaseIndex + 1} of {totalPhases}</span>
        </div>

        {/* Milestones */}
        {currentPhase.milestones && currentPhase.milestones.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-xs font-medium text-gray-700 mb-2">Phase Milestones</h4>
            <div className="space-y-1">
              {currentPhase.milestones.map((milestone, index) => (
                <div 
                  key={milestone.id}
                  className={`flex items-center gap-2 text-xs transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className={`w-3 h-3 transition-all duration-200 ${
                    milestone.completed 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                  <span className={`${
                    milestone.completed 
                      ? 'text-gray-600 line-through' 
                      : 'text-gray-900'
                  }`}>
                    {milestone.title}
                  </span>
                  {!milestone.completed && index === 0 && (
                    <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full animate-pulse">
                      Current
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lessons Progress */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Lessons</h4>
          <div className="text-xs text-gray-600">
            {currentPhase.lessons.filter(l => l.status === 'completed').length} of {currentPhase.lessons.length} lessons completed
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => navigate('/dashboard/student/roadmap')}
          className="w-full mt-3 px-3 py-2 bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105 focus:ring-2 focus:ring-yellow-300"
        >
          View Phase Details
        </button>
      </div>
    </div>
  );
}