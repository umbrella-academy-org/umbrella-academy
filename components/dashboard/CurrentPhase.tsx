'use client';

import { ChevronRight, Clock, CheckCircle, Target } from 'lucide-react';
import { useState } from 'react';

export default function CurrentPhase() {
  const [isHovered, setIsHovered] = useState(false);

  const milestones = [
    { name: 'Setup Environment', completed: true },
    { name: 'Core Development', completed: true },
    { name: 'Testing Phase', completed: false, current: true },
    { name: 'Deployment', completed: false }
  ];

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
          <p className="text-sm font-medium text-gray-900">Fund Processing</p>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock className="w-3 h-3" />
          <span>Estimated completion in 2 weeks</span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: isHovered ? '65%' : '60%' }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-shimmer"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span className="font-medium">60% Complete</span>
          <span>Phase 2 of 3</span>
        </div>

        {/* Milestones */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Phase Milestones</h4>
          <div className="space-y-1">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 text-xs transition-all duration-300 animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className={`w-3 h-3 transition-all duration-200 ${
                  milestone.completed 
                    ? 'text-green-500' 
                    : milestone.current 
                      ? 'text-yellow-600 animate-pulse' 
                      : 'text-gray-300'
                }`} />
                <span className={`${
                  milestone.completed 
                    ? 'text-gray-600 line-through' 
                    : milestone.current 
                      ? 'text-gray-900 font-medium' 
                      : 'text-gray-400'
                }`}>
                  {milestone.name}
                </span>
                {milestone.current && (
                  <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full animate-pulse">
                    Current
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-3 px-3 py-2 bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105 focus:ring-2 focus:ring-yellow-300">
          View Phase Details
        </button>
      </div>
    </div>
  );
}