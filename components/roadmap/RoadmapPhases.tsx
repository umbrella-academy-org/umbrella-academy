'use client';

import { useState } from 'react';
import { Code, CheckCircle, ArrowRight, Lock, Play, Clock, Users, ChevronDown, ChevronRight, Video, BookOpen, FileText, Award } from 'lucide-react';
import { Phase, Lesson, LiveSession } from '@/lib/types/roadmap';
import { sampleStudentRoadmap } from '@/lib/data/roadmap-sample';

interface RoadmapPhasesProps {
  onPhaseSelect?: (phaseId: string) => void;
  onLessonSelect?: (lessonId: string) => void;
  selectedPhaseId?: string;
}

export default function RoadmapPhases({ onPhaseSelect, onLessonSelect, selectedPhaseId }: RoadmapPhasesProps) {
  const [expandedPhases, setExpandedPhases] = useState<string[]>([sampleStudentRoadmap.course.progress.currentPhaseId || '']);
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);

  const phases = sampleStudentRoadmap.course.phases;

  const togglePhaseExpansion = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const toggleLessonExpansion = (lessonId: string) => {
    setExpandedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const getPhaseStatusConfig = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-green-100 border-green-200',
          iconColor: 'text-green-600',
          progressColor: 'bg-green-500',
          icon: CheckCircle
        };
      case 'in-progress':
        return {
          color: 'bg-blue-100 border-blue-200',
          iconColor: 'text-blue-600',
          progressColor: 'bg-blue-500',
          icon: Play
        };
      case 'available':
        return {
          color: 'bg-yellow-100 border-yellow-200',
          iconColor: 'text-yellow-600',
          progressColor: 'bg-yellow-500',
          icon: Code
        };
      default: // locked
        return {
          color: 'bg-gray-100 border-gray-200',
          iconColor: 'text-gray-400',
          progressColor: 'bg-gray-400',
          icon: Lock
        };
    }
  };

  const getLessonStatusConfig = (status: Lesson['status']) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600',
          icon: CheckCircle
        };
      case 'in-progress':
        return {
          color: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600',
          icon: Play
        };
      case 'available':
        return {
          color: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600',
          icon: BookOpen
        };
      default: // locked
        return {
          color: 'bg-gray-50 border-gray-200',
          iconColor: 'text-gray-400',
          icon: Lock
        };
    }
  };

  const getLiveSessionStatusConfig = (status: LiveSession['status']) => {
    switch (status) {
      case 'completed':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: CheckCircle
        };
      case 'scheduled':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: Video
        };
      case 'cancelled':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: Video
        };
      default: // missed
        return {
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          icon: Video
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Roadmap Phases</h3>
        <p className="text-sm text-gray-500">Expand phases to view lessons and their live sessions</p>
      </div>

      <div className="space-y-4">
        {phases.map((phase) => {
          const statusConfig = getPhaseStatusConfig(phase.status);
          const StatusIcon = statusConfig.icon;
          const isExpanded = expandedPhases.includes(phase.id);
          const isSelected = selectedPhaseId === phase.id;

          return (
            <div key={phase.id} className={`border-2 rounded-lg transition-all duration-200 ${statusConfig.color} ${isSelected ? 'ring-2 ring-yellow-600 ring-opacity-50' : ''}`}>
              {/* Phase Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-opacity-80 transition-colors"
                onClick={() => {
                  togglePhaseExpansion(phase.id);
                  onPhaseSelect?.(phase.id);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                      <StatusIcon className={`w-5 h-5 ${statusConfig.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{phase.title}</h4>
                      <p className="text-sm text-gray-600">{phase.lessons.length} Lessons • {phase.estimatedDuration} weeks</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{phase.progress}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${statusConfig.progressColor}`}
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase Content - Lessons */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-white bg-opacity-50">
                  <div className="p-4 space-y-3">
                    {phase.lessons.map((lesson) => {
                      const lessonConfig = getLessonStatusConfig(lesson.status);
                      const LessonIcon = lessonConfig.icon;
                      const isLessonExpanded = expandedLessons.includes(lesson.id);

                      return (
                        <div key={lesson.id} className={`border rounded-lg ${lessonConfig.color}`}>
                          {/* Lesson Header */}
                          <div 
                            className="p-3 cursor-pointer hover:bg-opacity-80 transition-colors"
                            onClick={() => {
                              toggleLessonExpansion(lesson.id);
                              onLessonSelect?.(lesson.id);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  {isLessonExpanded ? (
                                    <ChevronDown className="w-3 h-3 text-gray-500" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3 text-gray-500" />
                                  )}
                                  <LessonIcon className={`w-4 h-4 ${lessonConfig.iconColor}`} />
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900">{lesson.title}</h5>
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Clock className="w-3 h-3" />
                                    <span>{lesson.estimatedDuration} min</span>
                                    <span>•</span>
                                    <span className="capitalize">{lesson.type}</span>
                                    {lesson.liveSessions.length > 0 && (
                                      <>
                                        <span>•</span>
                                        <Video className="w-3 h-3" />
                                        <span>{lesson.liveSessions.length} session{lesson.liveSessions.length > 1 ? 's' : ''}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs font-medium text-gray-700">{lesson.progress}%</div>
                                <div className="w-12 bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div 
                                    className={`h-1.5 rounded-full transition-all duration-300 ${lessonConfig.iconColor.replace('text-', 'bg-')}`}
                                    style={{ width: `${lesson.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Lesson Content - Live Sessions */}
                          {isLessonExpanded && lesson.liveSessions.length > 0 && (
                            <div className="border-t border-gray-200 bg-white bg-opacity-70">
                              <div className="p-3 space-y-2">
                                <h6 className="text-xs font-medium text-gray-700 mb-2">Live Sessions</h6>
                                {lesson.liveSessions.map((session) => {
                                  const sessionConfig = getLiveSessionStatusConfig(session.status);
                                  const SessionIcon = sessionConfig.icon;

                                  return (
                                    <div key={session.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-100 hover:shadow-sm transition-shadow">
                                      <div className="flex items-center gap-2">
                                        <div className={`p-1 rounded ${sessionConfig.bgColor}`}>
                                          <SessionIcon className={`w-3 h-3 ${sessionConfig.color}`} />
                                        </div>
                                        <div>
                                          <div className="text-xs font-medium text-gray-900">{session.title}</div>
                                          <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <span>{formatDate(session.scheduledDate)}</span>
                                            <span>•</span>
                                            <Clock className="w-3 h-3" />
                                            <span>{session.duration} min</span>
                                            {session.participants && (
                                              <>
                                                <span>•</span>
                                                <Users className="w-3 h-3" />
                                                <span>{session.participants}/{session.maxParticipants}</span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${sessionConfig.bgColor} ${sessionConfig.color}`}>
                                          {session.status}
                                        </span>
                                        {session.status === 'scheduled' && (
                                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium ml-2">
                                            Join
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Show message if no live sessions */}
                          {isLessonExpanded && lesson.liveSessions.length === 0 && (
                            <div className="border-t border-gray-200 bg-white bg-opacity-70">
                              <div className="p-3 text-center">
                                <p className="text-xs text-gray-500">No live sessions scheduled for this lesson</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}