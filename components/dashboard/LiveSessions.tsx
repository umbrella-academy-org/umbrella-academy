'use client';

import { Monitor, Video, Clock, Play } from 'lucide-react';
import { useState } from 'react';
import { UserType } from '@/types';
import { useRoadmaps } from '@/contexts';

interface LiveSessionsProps {
  userType: UserType;
}

export default function LiveSessions({ userType }: LiveSessionsProps) {
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);
  const { getUpcomingLiveSessions, isLoading } = useRoadmaps();

  const sessions = getUpcomingLiveSessions();

  const getTitle = () => {
    switch (userType) {
      case 'trainer':
        return 'Training Sessions';
      case 'mentor':
        return 'Mentoring Sessions';
      case 'student':
        return 'Live Sessions';
      default:
        return 'Live Sessions';
    }
  };

  // Derive badge variant from session status
  const getStatusVariant = (status: string): 'info' | 'warning' | 'success' => {
    switch (status) {
      case 'live':
        return 'success';
      case 'scheduled':
        return 'info';
      default:
        return 'warning';
    }
  };

  const getStatusIcon = (variant: 'info' | 'warning' | 'success', isHovered: boolean) => {
    const baseClasses = "w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300";

    switch (variant) {
      case 'info':
        return (
          <div className={`${baseClasses} bg-gray-100 ${isHovered ? 'bg-gray-200 scale-110 animate-pulse-glow' : ''}`}>
            <Monitor className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
          </div>
        );
      case 'warning':
        return (
          <div className={`${baseClasses} bg-gray-100 ${isHovered ? 'bg-gray-200 scale-110 animate-pulse-glow' : ''}`}>
            <Video className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} bg-gray-100 ${isHovered ? 'bg-gray-200 scale-110 animate-pulse-glow' : ''}`}>
            <Play className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
          </div>
        );
    }
  };

  const getStatusBadge = (variant: 'info' | 'warning' | 'success') => {
    switch (variant) {
      case 'info':
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full animate-pulse">
            ● Live Soon
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full animate-pulse">
            ● Scheduled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full animate-pulse">
            ● Available
          </span>
        );
    }
  };

  const formatScheduledAt = (scheduledAt: string) => {
    const date = new Date(scheduledAt);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
    if (diffHrs > 0) return `in ${diffHrs}hr${diffHrs !== 1 ? 's' : ''}`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-gray-900">{getTitle()}</h3>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
          {sessions.length} Active Today
        </span>
      </div>

      {isLoading ? (
        <>
          {[0, 1].map((i) => (
            <div key={i} className="bg-white rounded-lg p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 animate-pulse">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-200 shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : sessions.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">No upcoming sessions.</p>
      ) : (
        sessions.map((session, index) => {
          const variant = getStatusVariant(session.status);
          return (
            <div
              key={session.id}
              className="bg-white rounded-lg p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 group hover:border-gray-200 transition-all duration-500 relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredSession(session.id)}
              onMouseLeave={() => setHoveredSession(null)}
            >
              {/* Subtle Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-2xl"></div>

              <div className="flex flex-col sm:flex-row gap-5 relative z-10">
                {/* Session Icon / Status */}
                <div className="shrink-0">
                  {getStatusIcon(variant, hoveredSession === session.id)}
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400">
                        Track Phase {index + 1}
                      </span>
                      {getStatusBadge(variant)}
                    </div>

                    <div className={`px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold rounded-md flex items-center gap-1.5 border border-gray-100 transition-transform duration-300 ${hoveredSession === session.id ? 'scale-105' : ''}`}>
                      <Clock className="w-3 h-3" />
                      <span className="whitespace-nowrap">{formatScheduledAt(session.scheduledAt)}</span>
                    </div>
                  </div>

                  <h3 className={`text-base font-semibold text-gray-900 mb-2 transition-colors duration-300 ${hoveredSession === session.id ? 'text-gray-600' : ''}`}>
                    {session.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-2">
                    {session.description ?? ''}
                  </p>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3">
                      <button className="text-xs text-gray-400 hover:text-gray-900 transition-colors duration-300">
                        View Details
                      </button>
                    </div>

                    <button className={`flex items-center gap-2 px-5 py-2.5 bg-yellow-600 text-white text-xs rounded-lg hover:bg-yellow-700 transition-all duration-300 shadow-lg shadow-gray-600/20 active:scale-95 ${hoveredSession === session.id ? 'translate-x-1' : ''}`}>
                      <Play className="w-3 h-3 fill-current" />
                      Join Session
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Progress for 'Live Soon' */}
              {variant === 'info' && (
                <div className="mt-5 pt-4 border-t border-gray-100/60">
                  <div className="flex items-center justify-between text-[10px] mb-2 font-bold">
                    <span className="text-gray-500">Connection window opens in</span>
                    <span className="text-gray-900 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 font-mono">01:45:22</span>
                  </div>
                  <div className="w-full bg-gray-50 rounded-full h-1 overflow-hidden border border-gray-100">
                    <div className="bg-linear-to-r from-gray-500 to-gray-500 h-1 rounded-full animate-shimmer" style={{ width: '75%' }}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
