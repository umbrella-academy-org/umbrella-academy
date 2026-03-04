'use client';

import { Trophy, Target, Clock, CheckCircle } from 'lucide-react';
import { sampleStudentRoadmap } from '@/lib/data/roadmap-sample';

export default function CompletionStats() {
  const { roadmap, subscription } = sampleStudentRoadmap;
  const progress = roadmap.progress;
  
  // Calculate time-based stats
  const enrolledDate = new Date(sampleStudentRoadmap.enrolledAt);
  const now = new Date();
  const daysEnrolled = Math.floor((now.getTime() - enrolledDate.getTime()) / (1000 * 60 * 60 * 24));
  const weeksEnrolled = Math.floor(daysEnrolled / 7);
  
  // Calculate expected completion
  const expectedCompletionDate = sampleStudentRoadmap.expectedCompletionDate 
    ? new Date(sampleStudentRoadmap.expectedCompletionDate)
    : null;
  const weeksRemaining = expectedCompletionDate 
    ? Math.ceil((expectedCompletionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 7))
    : 0;

  const stats = [
    {
      icon: CheckCircle,
      label: 'Completed',
      value: progress.completedPhases,
      total: progress.totalPhases,
      suffix: 'phases',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      icon: Target,
      label: 'In Progress',
      value: progress.totalPhases - progress.completedPhases - (progress.totalPhases - progress.completedPhases - 1),
      total: progress.totalPhases,
      suffix: 'phase',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      icon: Clock,
      label: 'Time Spent',
      value: weeksEnrolled,
      total: roadmap.estimatedDuration,
      suffix: 'weeks',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      icon: Trophy,
      label: 'Sessions Done',
      value: progress.completedSessions,
      total: progress.totalSessions,
      suffix: 'sessions',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Overview</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Overall completion</p>
          <span className="text-sm font-medium text-gray-900">{progress.overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-gray-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress.overallProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const percentage = stat.total > 0 ? Math.round((stat.value / stat.total) * 100) : 0;
          
          return (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
                {stat.total && <span className="text-sm text-gray-500">/{stat.total}</span>}
              </div>
              <div className="text-xs text-gray-600 mb-2">{stat.suffix}</div>
              <div className="text-xs font-medium text-gray-900">{stat.label}</div>
              {stat.total > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${stat.color.replace('text-', 'bg-')}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm font-medium text-gray-900">{progress.completedSessions}</div>
            <div className="text-xs text-gray-500">Sessions Attended</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              {weeksRemaining > 0 ? `${weeksRemaining} weeks` : 'Completed'}
            </div>
            <div className="text-xs text-gray-500">Time Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
}