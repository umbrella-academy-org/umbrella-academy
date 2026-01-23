'use client';

import { useState } from 'react';
import { Video, Clock, Users, Calendar, Download, ExternalLink, Play, CheckCircle, X, AlertCircle } from 'lucide-react';
import { LiveSession, Phase, Lesson } from '@/types';
import { sampleStudentRoadmap } from '@/lib/data/roadmap-sample';

interface LiveSessionDetailsProps {
  selectedPhaseId?: string;
  selectedLessonId?: string;
}

export default function LiveSessionDetails({ selectedPhaseId, selectedLessonId }: LiveSessionDetailsProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'missed'>('upcoming');

  // Get all live sessions from the selected phase or lesson
  const getAllLiveSessions = (): LiveSession[] => {
    const course = sampleStudentRoadmap.course;
    
    if (selectedLessonId) {
      // Find the specific lesson and return its live sessions
      for (const phase of course.phases) {
        const lesson = phase.lessons.find((l: Lesson) => l.id === selectedLessonId);
        if (lesson) {
          return lesson.liveSessions;
        }
      }
    } else if (selectedPhaseId) {
      // Get all live sessions from the selected phase
      const phase = course.phases.find((p: Phase) => p.id === selectedPhaseId);
      if (phase) {
        return phase.lessons.flatMap((lesson: Lesson) => lesson.liveSessions);
      }
    }
    
    // Default: return all upcoming live sessions from current phase
    const currentPhase = course.phases.find((p: Phase) => p.id === course.progress.currentPhaseId);
    if (currentPhase) {
      return currentPhase.lessons.flatMap((lesson: Lesson) => lesson.liveSessions);
    }
    
    return [];
  };

  const allSessions = getAllLiveSessions();
  
  const upcomingSessions = allSessions.filter(session => session.status === 'scheduled');
  const completedSessions = allSessions.filter(session => session.status === 'completed');
  const missedSessions = allSessions.filter(session => session.status === 'missed');

  const getActiveSessionsList = () => {
    switch (activeTab) {
      case 'completed':
        return completedSessions;
      case 'missed':
        return missedSessions;
      default:
        return upcomingSessions;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays > 0 && diffDays <= 7) {
      return `${date.toLocaleDateString('en-US', { weekday: 'long' })} at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getSessionStatusConfig = (status: LiveSession['status']) => {
    switch (status) {
      case 'completed':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: CheckCircle,
          actionText: 'View Recording'
        };
      case 'scheduled':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: Video,
          actionText: 'Join Session'
        };
      case 'cancelled':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: X,
          actionText: 'Cancelled'
        };
      default: // missed
        return {
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          icon: AlertCircle,
          actionText: 'View Recording'
        };
    }
  };

  if (allSessions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="text-center py-8">
          <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Live Sessions</h3>
          <p className="text-sm text-gray-500">
            {selectedLessonId 
              ? 'This lesson doesn\'t have any live sessions scheduled.'
              : selectedPhaseId 
                ? 'This phase doesn\'t have any live sessions scheduled.'
                : 'Select a phase or lesson to view live sessions.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Sessions</h3>
        <p className="text-sm text-gray-500">
          {selectedLessonId 
            ? 'Sessions for selected lesson'
            : selectedPhaseId 
              ? 'Sessions for selected phase'
              : 'Upcoming sessions from current phase'
          }
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'upcoming'
              ? 'border-yellow-600 text-yellow-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Upcoming ({upcomingSessions.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'completed'
              ? 'border-yellow-600 text-yellow-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Completed ({completedSessions.length})
        </button>
        <button
          onClick={() => setActiveTab('missed')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'missed'
              ? 'border-yellow-600 text-yellow-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Missed ({missedSessions.length})
        </button>
      </div>

      {/* Session List */}
      <div className="space-y-4">
        {getActiveSessionsList().map((session) => {
          const statusConfig = getSessionStatusConfig(session.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
                    <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{session.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                    
                    {/* Session Details */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(session.scheduledDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{session.duration} min</span>
                      </div>
                      {session.participants && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{session.participants}/{session.maxParticipants} participants</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}>
                    {session.status}
                  </span>
                  {session.status === 'scheduled' && session.meetingLink && (
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      <ExternalLink className="w-3 h-3" />
                      Join
                    </button>
                  )}
                  {session.status === 'completed' && session.recordingUrl && (
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors">
                      <Play className="w-3 h-3" />
                      Recording
                    </button>
                  )}
                </div>
              </div>

              {/* Materials */}
              {session.materials && session.materials.length > 0 && (
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <h5 className="text-xs font-medium text-gray-700 mb-2">Session Materials</h5>
                  <div className="flex flex-wrap gap-2">
                    {session.materials.map((material) => (
                      <a
                        key={material.id}
                        href={material.url}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        {material.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Mentor Info */}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {session.mentorName.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">with {session.mentorName}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {getActiveSessionsList().length === 0 && (
        <div className="text-center py-8">
          <Video className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-500">
            No {activeTab} sessions found
          </p>
        </div>
      )}
    </div>
  );
}