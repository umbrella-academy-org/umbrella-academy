'use client';

import { Monitor, Video, Clock, X, Users, Play } from 'lucide-react';
import { useState } from 'react';
import { UserType } from '@/types';

interface LiveSession {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'success' | 'info' | 'warning';
  actions: {
    primary: string;
    secondary: string;
  };
}

interface LiveSessionsProps {
  userType: UserType;
}

export default function LiveSessions({ userType }: LiveSessionsProps) {
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);

  // Generate sessions based on user type
  const getSessions = (): LiveSession[] => {
    switch (userType) {
      case 'trainer':
        return [
          {
            id: '1',
            title: 'React Fundamentals Training',
            description: 'Teaching React basics to new students including components, props, and state management.',
            time: 'in 2hrs',
            status: 'info',
            actions: {
              primary: 'Start Session',
              secondary: 'Prepare Materials'
            }
          },
          {
            id: '2',
            title: 'JavaScript Debugging Workshop',
            description: 'Interactive session on debugging techniques and tools for JavaScript development.',
            time: 'in 4hrs',
            status: 'warning',
            actions: {
              primary: 'Set Reminder',
              secondary: 'View Students'
            }
          }
        ];
      case 'mentor':
        return [
          {
            id: '1',
            title: 'Student Progress Review',
            description: 'One-on-one mentoring session to review student progress and provide guidance.',
            time: 'in 1hr',
            status: 'success',
            actions: {
              primary: 'Join Call',
              secondary: 'View Roadmap'
            }
          },
          {
            id: '2',
            title: 'Career Guidance Session',
            description: 'Group mentoring session focused on career development and industry insights.',
            time: 'in 3hrs',
            status: 'info',
            actions: {
              primary: 'Prepare Session',
              secondary: 'View Agenda'
            }
          }
        ];
      case 'student':
        return [
          {
            id: '1',
            title: 'JavaScript Logic & Flow Control',
            description: 'Interactive workshop on complex conditions, loops, and functional logic in JS.',
            time: 'in 2hrs',
            status: 'info',
            actions: {
              primary: 'Join Session',
              secondary: 'View Exercises'
            }
          },
          {
            id: '2',
            title: 'Weekly Engineering Sync',
            description: 'Direct call with your active mentor to review roadmap progress and resolve blockers.',
            time: 'in 5hrs',
            status: 'success',
            actions: {
              primary: 'Enter Call',
              secondary: 'View Roadmap'
            }
          }
        ];
      default:
        return [
          {
            id: '1',
            title: 'React Advanced Patterns Workshop',
            description: 'Deep dive into advanced React patterns including render props, compound components, and custom hooks.',
            time: 'in 2hrs',
            status: 'info',
            actions: {
              primary: 'Join Session',
              secondary: 'View Details'
            }
          },
          {
            id: '2',
            title: 'JavaScript Performance Optimization',
            description: 'Learn techniques to optimize JavaScript performance, memory management, and bundle size reduction.',
            time: 'in 4hrs',
            status: 'warning',
            actions: {
              primary: 'Set Reminder',
              secondary: 'View Details'
            }
          }
        ];
    }
  };

  const sessions = getSessions();

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

  const getStatusIcon = (status: LiveSession['status'], isHovered: boolean) => {
    const baseClasses = "w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300";

    switch (status) {
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

  const getStatusBadge = (status: LiveSession['status']) => {
    switch (status) {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-gray-900  ">{getTitle()}</h3>
        <span className="text-[10px] font-bold text-gray-400    bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
          2 Active Today
        </span>
      </div>

      {sessions.map((session, index) => (
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
              {getStatusIcon(session.status, hoveredSession === session.id)}
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400   ">
                    Track Phase {index + 1}
                  </span>
                  {getStatusBadge(session.status)}
                </div>

                <div className={`px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold rounded-md flex items-center gap-1.5 border border-gray-100 transition-transform duration-300 ${hoveredSession === session.id ? 'scale-105' : ''
                  }`}>
                  <Clock className="w-3 h-3" />
                  <span className="whitespace-nowrap   er">{session.time}</span>
                </div>
              </div>

              <h3 className={`text-base font-semibold text-gray-900 mb-2 transition-colors duration-300 ${hoveredSession === session.id ? 'text-gray-600' : ''
                }`}>
                {session.title}
              </h3>

              <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-2">
                {session.description}
              </p>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                  <button className="text-xs text-gray-400 hover:text-gray-900    transition-colors duration-300">
                    {session.actions.secondary}
                  </button>
                </div>

                <button className={`flex items-center gap-2 px-5 py-2.5 bg-yellow-600 text-white text-xs rounded-lg hover:bg-yellow-700 transition-all duration-300 shadow-lg shadow-gray-600/20 active:scale-95 ${hoveredSession === session.id ? 'translate-x-1' : ''
                  }`}>
                  <Play className="w-3 h-3 fill-current" />
                  {session.actions.primary}
                </button>
              </div>
            </div>
          </div>


          {/* Activity Progress for 'Live Soon' */}
          {session.status === 'info' && (
            <div className="mt-5 pt-4 border-t border-gray-100/60">
              <div className="flex items-center justify-between text-[10px] mb-2 font-bold  ">
                <span className="text-gray-500   ">Connection window opens in</span>
                <span className="text-gray-900 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 font-mono">01:45:22</span>
              </div>
              <div className="w-full bg-gray-50 rounded-full h-1 overflow-hidden border border-gray-100">
                <div className="bg-linear-to-r from-gray-500 to-gray-500 h-1 rounded-full animate-shimmer" style={{ width: '75%' }}></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}