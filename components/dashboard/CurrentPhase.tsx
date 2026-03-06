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
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="text-center py-6">
          <Target className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 mb-2">No Active Phase</h3>
          <p className="text-xs text-gray-500 mb-4">Start a roadmap to see your current phase</p>
          <button 
            onClick={() => navigate('/post-signup/roadmap')}
            className="px-3 py-2 bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Browse Roadmaps
          </button>
        </div>
      </div>
    );
  }

  const { roadmap } = activeRoadmap;
  const currentPhase = roadmap.phases.find(phase => 
    phase.status === 'active'
  ) || roadmap.phases.find(phase => phase.status === 'pending') || roadmap.phases[0];

  if (!currentPhase) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="text-center py-6">
          <Target className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Roadmap Not Started</h3>
          <p className="text-xs text-gray-500">Begin your learning journey</p>
        </div>
      </div>
    );
  }

  const phaseIndex = roadmap.phases.findIndex(p => p.id === currentPhase.id);
  const totalPhases = roadmap.phases.length;

  // Calculate phase progress based on completed sessions
  const totalSessions = currentPhase.sessions.length;
  const completedSessions = currentPhase.sessions.filter(s => s.status === 'completed').length;
  const phaseProgress = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;

  return (
    <div 
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100  animate-fade-in hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
          Current Phase
        </h3>
        <ChevronRight className={`w-4 h-4 text-gray-400 transition-all duration-200 ${
          isHovered ? 'translate-x-1 text-gray-600' : ''
        }`} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className={`w-4 h-4 text-gray-600 transition-all duration-300 ${
            isHovered ? 'animate-pulse-glow' : ''
          }`} />
          <p className="text-sm font-medium text-gray-900">{currentPhase.title}</p>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock className="w-3 h-3" />
          <span>
            Estimated: {currentPhase.estimatedHours} hours
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
          <div 
            className="bg-linear-to-r from-gray-500 to-gray-600 h-2 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${phaseProgress}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-shimmer"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span className="font-medium">{Math.round(phaseProgress)}% Complete</span>
          <span>Phase {phaseIndex + 1} of {totalPhases}</span>
        </div>

        {/* Sessions Progress */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Sessions</h4>
          <div className="text-xs text-gray-600">
            {completedSessions} of {totalSessions} sessions completed
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => navigate('/post-signup/roadmap')}
          className="w-full mt-3 px-3 py-2 bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105 focus:ring-2 focus:ring-gray-300"
        >
          View Phase Details
        </button>
      </div>
    </div>
  );
}