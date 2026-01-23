'use client';

import { Play, CheckCircle, Lock, Clock, Video, BookOpen, Award } from 'lucide-react';
import { sampleStudentRoadmap } from '@/lib/data/roadmap-sample';
import { Phase, Lesson } from '@/types';

export default function CurrentLessons() {
  const { course } = sampleStudentRoadmap;
  const currentPhase = course.phases.find((p: Phase) => p.id === course.progress.currentPhaseId);
  const currentLesson = currentPhase?.lessons.find((l: Lesson) => l.id === course.progress.currentLessonId);
  
  if (!currentPhase || !currentLesson) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="text-center py-6">
          <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No Active Lesson</h3>
          <p className="text-xs text-gray-500">Start a lesson to see your progress here</p>
        </div>
      </div>
    );
  }

  const getLessonStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: CheckCircle,
          statusText: 'Completed'
        };
      case 'in-progress':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: Play,
          statusText: 'In Progress'
        };
      case 'available':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: BookOpen,
          statusText: 'Available'
        };
      default: // locked
        return {
          color: 'text-gray-400',
          bgColor: 'bg-gray-100',
          icon: Lock,
          statusText: 'Locked'
        };
    }
  };

  const statusConfig = getLessonStatusConfig(currentLesson.status);
  const StatusIcon = statusConfig.icon;

  // Get next lessons in the phase
  const nextLessons = currentPhase.lessons
    .filter((lesson: Lesson) => lesson.order > currentLesson.order)
    .slice(0, 2);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Current Lesson</h3>
        <p className="text-sm text-gray-500">{currentPhase.title}</p>
      </div>

      {/* Current Lesson Card */}
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
              <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 mb-1">{currentLesson.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{currentLesson.description}</p>
              
              {/* Lesson Details */}
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{currentLesson.estimatedDuration} min</span>
                </div>
                <span className="capitalize">{currentLesson.type}</span>
                {currentLesson.liveSessions.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    <span>{currentLesson.liveSessions.length} session{currentLesson.liveSessions.length > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${statusConfig.color.replace('text-', 'bg-')}`}
                    style={{ width: `${currentLesson.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-700">{currentLesson.progress}%</span>
              </div>
            </div>
          </div>
          
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}>
            {statusConfig.statusText}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-3">
          {currentLesson.status === 'in-progress' && (
            <button className="flex-1 px-3 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
              Continue Learning
            </button>
          )}
          {currentLesson.status === 'available' && (
            <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Start Lesson
            </button>
          )}
          {currentLesson.liveSessions.length > 0 && (
            <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              View Sessions
            </button>
          )}
        </div>
      </div>

      {/* Next Lessons Preview */}
      {nextLessons.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Coming Next</h4>
          <div className="space-y-2">
            {nextLessons.map((lesson: Lesson) => {
              const nextStatusConfig = getLessonStatusConfig(lesson.status);
              const NextIcon = nextStatusConfig.icon;
              
              return (
                <div key={lesson.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className={`p-1.5 rounded ${nextStatusConfig.bgColor}`}>
                    <NextIcon className={`w-3 h-3 ${nextStatusConfig.color}`} />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-medium text-gray-900">{lesson.title}</h5>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.estimatedDuration} min</span>
                      <span>•</span>
                      <span className="capitalize">{lesson.type}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${nextStatusConfig.bgColor} ${nextStatusConfig.color}`}>
                    {nextStatusConfig.statusText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Phase Progress */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-700">Phase Progress</span>
          <span className="text-xs text-gray-600">{currentPhase.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-yellow-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${currentPhase.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}