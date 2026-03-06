'use client';

import { Play, CheckCircle, Lock, Clock, Video, BookOpen, Award } from 'lucide-react';
import { sampleStudentRoadmap } from '@/lib/data/roadmap-sample';
import { RoadmapPhase, Session } from '@/types';

export default function CurrentLessons() {
  const { roadmap } = sampleStudentRoadmap;
  const currentPhase = roadmap.phases.find((p: RoadmapPhase) => p.status === 'active');
  const currentSession = currentPhase?.sessions.find((s: Session) => s.status === 'in-progress') || currentPhase?.sessions[0];
  
  if (!currentPhase || !currentSession) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="text-center py-6">
          <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-amber-900 mb-1">No Active Session</h3>
          <p className="text-xs text-gray-500">Start a session to see your progress here</p>
        </div>
      </div>
    );
  }

  const getSessionStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: CheckCircle,
          statusText: 'Completed'
        };
      case 'in-progress':
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: Play,
          statusText: 'In Progress'
        };
      case 'scheduled':
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: Clock,
          statusText: 'Scheduled'
        };
      default: // pending
        return {
          color: 'text-gray-400',
          bgColor: 'bg-gray-100',
          icon: Lock,
          statusText: 'Pending'
        };
    }
  };

  const statusConfig = getSessionStatusConfig(currentSession.status);
  const StatusIcon = statusConfig.icon;

  // Get next sessions in the phase
  const nextSessions = currentPhase.sessions
    .filter((session: Session) => session.status === 'pending')
    .slice(0, 2);

  // Calculate session progress
  const completedSessions = currentPhase.sessions.filter(s => s.status === 'completed').length;
  const totalSessions = currentPhase.sessions.length;
  const phaseProgress = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-amber-900">Current Session</h3>
        <p className="text-sm text-gray-500">{currentPhase.title}</p>
      </div>

      {/* Current Session Card */}
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
              <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-amber-900 mb-1">{currentSession.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{currentSession.description}</p>
              
              {/* Session Details */}
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{currentSession.duration}h</span>
                </div>
                {currentSession.liveSessionId && (
                  <div className="flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    <span>Live Session</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSession.status === 'completed' ? 'bg-amber-600' : 
                      currentSession.status === 'in-progress' ? 'bg-amber-600' : 'bg-gray-400'
                    }`}
                    style={{ width: currentSession.status === 'completed' ? '100%' : currentSession.status === 'in-progress' ? '50%' : '0%' }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {currentSession.status === 'completed' ? '100%' : currentSession.status === 'in-progress' ? '50%' : '0%'}
                </span>
              </div>
            </div>
          </div>
          
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}>
            {statusConfig.statusText}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-3">
          {currentSession.status === 'in-progress' && (
            <button className="flex-1 px-3 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors">
              Continue Session
            </button>
          )}
          {currentSession.status === 'pending' && (
            <button className="flex-1 px-3 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors">
              Start Session
            </button>
          )}
          {currentSession.liveSessionId && (
            <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Join Live Session
            </button>
          )}
        </div>
      </div>

      {/* Next Sessions Preview */}
      {nextSessions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-amber-900 mb-3">Coming Next</h4>
          <div className="space-y-2">
            {nextSessions.map((session: Session) => {
              const nextStatusConfig = getSessionStatusConfig(session.status);
              const NextIcon = nextStatusConfig.icon;
              
              return (
                <div key={session.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className={`p-1.5 rounded ${nextStatusConfig.bgColor}`}>
                    <NextIcon className={`w-3 h-3 ${nextStatusConfig.color}`} />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-medium text-amber-900">{session.title}</h5>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{session.duration}h</span>
                      {session.liveSessionId && (
                        <>
                          <span>•</span>
                          <span>Live Session</span>
                        </>
                      )}
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
          <span className="text-xs text-gray-600">{phaseProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-amber-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${phaseProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}