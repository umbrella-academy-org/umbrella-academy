'use client';

import { useState } from 'react';
import { Code, CheckCircle, ArrowRight, Lock, Play, Clock, Users, ChevronDown, ChevronRight, Video, BookOpen, FileText, Award, Target, Calendar, X, GraduationCap } from 'lucide-react';
import { RoadmapPhase, Session, LiveSession } from '@/types';
import { sampleStudentRoadmap } from '@/lib/data/roadmap-sample';

interface RoadmapPhasesProps {
  onPhaseSelect?: (phaseId: string) => void;
  onLessonSelect?: (lessonId: string) => void;
  selectedPhaseId?: string;
  selectedLessonId?: string;
}

export default function RoadmapPhases({ onPhaseSelect, onLessonSelect, selectedPhaseId, selectedLessonId }: RoadmapPhasesProps) {
  const [expandedPhases, setExpandedPhases] = useState<string[]>([]);
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);

  // Get phases from sample data
  const phases = sampleStudentRoadmap.roadmap.phases;

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

  const getPhaseStatusConfig = (status: RoadmapPhase['status']) => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-gray-100 border-gray-200',
          iconColor: 'text-gray-600',
          progressColor: 'bg-gray-500',
          icon: Play
        };
      case 'completed':
        return {
          color: 'bg-gray-100 border-gray-200',
          iconColor: 'text-gray-600',
          progressColor: 'bg-gray-500',
          icon: CheckCircle
        };
      default: // pending
        return {
          color: 'bg-gray-100 border-gray-200',
          iconColor: 'text-gray-400',
          progressColor: 'bg-gray-400',
          icon: Lock
        };
    }
  };

  const getSessionStatusConfig = (status: Session['status']) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-gray-50 border-gray-200',
          iconColor: 'text-gray-600',
          icon: CheckCircle
        };
      case 'in-progress':
        return {
          color: 'bg-gray-50 border-gray-200',
          iconColor: 'text-gray-600',
          icon: Play
        };
      case 'scheduled':
        return {
          color: 'bg-gray-50 border-gray-200',
          iconColor: 'text-gray-600',
          icon: Calendar
        };
      case 'cancelled':
        return {
          color: 'bg-gray-50 border-gray-200',
          iconColor: 'text-gray-600',
          icon: X
        };
      default: // pending
        return {
          color: 'bg-gray-50 border-gray-200',
          iconColor: 'text-gray-400',
          icon: Clock
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-amber-900">Learning Phases</h3>
        <div className="text-sm text-gray-500">
          {phases.filter(p => p.status === 'completed').length} of {phases.length} completed
        </div>
      </div>

      <div className="space-y-4">
        {phases.map((phase: RoadmapPhase) => {
          const statusConfig = getPhaseStatusConfig(phase.status);
          const StatusIcon = statusConfig.icon;
          const isExpanded = expandedPhases.includes(phase.id);
          const isSelected = selectedPhaseId === phase.id;

          return (
            <div key={phase.id} className={`border-2 rounded-lg transition-all duration-200 ${statusConfig.color} ${isSelected ? 'ring-2 ring-gray-600 ring-opacity-50' : ''}`}>
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
                      <h4 className="font-medium text-amber-900">{phase.title}</h4>
                      <p className="text-sm text-gray-600">{phase.sessions.length} Sessions • {phase.estimatedHours} hours</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-amber-900">
                      {phase.sessions.filter(s => s.status === 'completed').length}/{phase.sessions.length}
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${statusConfig.progressColor}`}
                        style={{ 
                          width: `${phase.sessions.length > 0 ? (phase.sessions.filter(s => s.status === 'completed').length / phase.sessions.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase Content - Sessions */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-white bg-opacity-50">
                  <div className="p-4 space-y-3">
                    {phase.sessions.map((session: Session) => {
                      const sessionConfig = getSessionStatusConfig(session.status);
                      const SessionIcon = sessionConfig.icon;
                      const isSessionExpanded = expandedLessons.includes(session.id);

                      return (
                        <div key={session.id} className={`border rounded-lg ${sessionConfig.color}`}>
                          {/* Session Header */}
                          <div 
                            className="p-3 cursor-pointer hover:bg-opacity-80 transition-colors"
                            onClick={() => {
                              toggleLessonExpansion(session.id);
                              onLessonSelect?.(session.id);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  {isSessionExpanded ? (
                                    <ChevronDown className="w-3 h-3 text-gray-500" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3 text-gray-500" />
                                  )}
                                  <SessionIcon className={`w-4 h-4 ${sessionConfig.iconColor}`} />
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-amber-900">{session.title}</h5>
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Clock className="w-3 h-3" />
                                    <span>{session.duration} hours</span>
                                    <span>•</span>
                                    <span className="capitalize">{session.status}</span>
                                    {session.materials.length > 0 && (
                                      <>
                                        <span>•</span>
                                        <BookOpen className="w-3 h-3" />
                                        <span>{session.materials.length} material{session.materials.length > 1 ? 's' : ''}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs font-medium text-gray-700">
                                  {session.status === 'completed' ? '100%' : session.status === 'in-progress' ? '50%' : '0%'}
                                </div>
                                <div className="w-12 bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div 
                                    className={`h-1.5 rounded-full transition-all duration-300 ${sessionConfig.iconColor.replace('text-', 'bg-')}`}
                                    style={{ 
                                      width: session.status === 'completed' ? '100%' : session.status === 'in-progress' ? '50%' : '0%'
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Session Details */}
                          {isSessionExpanded && (
                            <div className="border-t border-gray-100 p-3 bg-white bg-opacity-50">
                              <div className="space-y-2">
                                <p className="text-xs text-gray-600">{session.description}</p>
                                
                                {session.objectives.length > 0 && (
                                  <div>
                                    <h6 className="text-xs font-medium text-gray-700 mb-1">Objectives:</h6>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                      {session.objectives.map((objective, index) => (
                                        <li key={index} className="flex items-start gap-1">
                                          <Target className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                                          {objective}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {session.materials.length > 0 && (
                                  <div>
                                    <h6 className="text-xs font-medium text-gray-700 mb-1">Materials:</h6>
                                    <div className="flex flex-wrap gap-1">
                                      {session.materials.map((material, index) => (
                                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                          {material}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {phase.sessions.length === 0 && (
                      <div className="text-center py-6 text-gray-500">
                        <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">No sessions available for this phase</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {phases.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-amber-900 mb-2">No Phases Available</h3>
          <p className="text-sm">This roadmap doesn't have any phases yet.</p>
        </div>
      )}
    </div>
  );
}