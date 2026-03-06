'use client';

import { User, Calendar, Video, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { useAuth, useRoadmaps } from '@/contexts';

interface StatCard {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

export default function StatsCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { user } = useAuth();
  const { studentRoadmaps } = useRoadmaps();

  // Get student's active roadmap
  const activeStudentRoadmap = studentRoadmaps.find(roadmap => 
    roadmap.studentId === user?.id && roadmap.status === 'active'
  );

  // Calculate stats based on real data
  const totalPhases = activeStudentRoadmap?.roadmap.progress.totalPhases || 0;
  const completedPhases = activeStudentRoadmap?.roadmap.progress.completedPhases || 0;
  const totalSessions = activeStudentRoadmap?.roadmap.progress.totalSessions || 0;
  const completedSessions = activeStudentRoadmap?.roadmap.progress.completedSessions || 0;
  const totalHours = activeStudentRoadmap?.roadmap.progress.totalEstimatedHours || 0;
  const completedHours = activeStudentRoadmap?.roadmap.progress.hoursCompleted || 0;
  const overallProgress = activeStudentRoadmap?.roadmap.progress.overallProgress || 0;

  // Calculate trends (mock calculation for demo)
  const phaseCompletionRate = totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0;
  const sessionCompletionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
  const hoursCompletionRate = totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0;

  const stats: StatCard[] = [
    {
      icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Roadmap Progress',
      value: `${Math.round(overallProgress)}%`,
      color: 'text-gray-600',
      trend: overallProgress > 50 ? '+Good' : 'Start',
      trendDirection: overallProgress > 50 ? 'up' : 'down'
    },
    {
      icon: <User className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Phases Complete',
      value: `${completedPhases}/${totalPhases}`,
      color: 'text-gray-600',
      trend: phaseCompletionRate > 0 ? `${phaseCompletionRate}%` : '0%',
      trendDirection: phaseCompletionRate > 50 ? 'up' : 'down'
    },
    {
      icon: <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Sessions Done',
      value: `${completedSessions}/${totalSessions}`,
      color: 'text-gray-600',
      trend: sessionCompletionRate > 0 ? `${sessionCompletionRate}%` : '0%',
      trendDirection: sessionCompletionRate > 50 ? 'up' : 'down'
    },
    {
      icon: <Video className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Hours Completed',
      value: `${completedHours}/${totalHours}h`,
      color: 'text-gray-600',
      trend: hoursCompletionRate > 0 ? `${hoursCompletionRate}%` : '0%',
      trendDirection: hoursCompletionRate > 80 ? 'up' : 'down'
    }
  ];

  // If no active roadmap, show placeholder stats
  if (!activeStudentRoadmap) {
    const placeholderStats: StatCard[] = [
      {
        icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Roadmap Progress',
        value: '0%',
        color: 'text-gray-400'
      },
      {
        icon: <User className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Phases Complete',
        value: '0/0',
        color: 'text-gray-400'
      },
      {
        icon: <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Sessions Done',
        value: '0/0',
        color: 'text-gray-400'
      },
      {
        icon: <Video className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Hours Completed',
        value: '0/0h',
        color: 'text-gray-400'
      }
    ];

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {placeholderStats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-lg lg:text-2xl font-bold text-gray-400">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-1">No active roadmap</p>
              </div>
              <div className="p-1.5 lg:p-2 rounded-lg bg-gray-50 text-gray-400">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100  cursor-pointer group animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-600 mb-1 group-hover:text-gray-800 transition-colors">
                {stat.title}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-lg lg:text-2xl font-bold text-amber-900 group-hover:scale-105 transition-transform">
                  {stat.value}
                </p>
                {stat.trend && (
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                    stat.trendDirection === 'up' 
                      ? 'text-gray-700 bg-gray-100' 
                      : 'text-gray-700 bg-gray-100'
                  } animate-pulse-glow`}>
                    {stat.trend}
                  </span>
                )}
              </div>
            </div>
            <div className={`p-1.5 lg:p-2 rounded-lg bg-gray-50 ${stat.color} group-hover:scale-110 transition-all duration-300 ${
              hoveredCard === index ? 'animate-bounce-subtle' : ''
            }`}>
              {stat.icon}
            </div>
          </div>
          
          {/* Progress bar animation */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className={`h-1 rounded-full transition-all duration-1000 ease-out ${
                stat.color.replace('text-', 'bg-')
              }`}
              style={{ 
                width: hoveredCard === index ? '100%' : '0%',
                transitionDelay: hoveredCard === index ? '200ms' : '0ms'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}