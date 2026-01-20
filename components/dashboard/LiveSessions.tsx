'use client';

import { Monitor, Video, Clock, X, Users, Play } from 'lucide-react';
import { useState } from 'react';

interface LiveSession {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'success' | 'info' | 'warning';
  participants?: number;
  actions: {
    primary: string;
    secondary: string;
  };
}

export default function LiveSessions() {
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);

  const sessions: LiveSession[] = [
    {
      id: '1',
      title: 'React Advanced Patterns Workshop',
      description: 'Deep dive into advanced React patterns including render props, compound components, and custom hooks.',
      time: 'in 2hrs',
      status: 'info',
      participants: 24,
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
      participants: 18,
      actions: {
        primary: 'Set Reminder',
        secondary: 'View Details'
      }
    },
    {
      id: '3',
      title: 'Node.js Microservices Architecture', 
      description: 'Building scalable microservices with Node.js, Docker, and Kubernetes deployment strategies.',
      time: 'Tomorrow',
      status: 'info',
      participants: 32,
      actions: {
        primary: 'Register',
        secondary: 'View Details'
      }
    }
  ];

  const getStatusIcon = (status: LiveSession['status'], isHovered: boolean) => {
    const baseClasses = "w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300";
    
    switch (status) {
      case 'info':
        return (
          <div className={`${baseClasses} bg-blue-100 ${isHovered ? 'bg-blue-200 scale-110 animate-pulse-glow' : ''}`}>
            <Monitor className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
          </div>
        );
      case 'warning':
        return (
          <div className={`${baseClasses} bg-orange-100 ${isHovered ? 'bg-orange-200 scale-110 animate-pulse-glow' : ''}`}>
            <Video className={`w-5 h-5 sm:w-6 sm:h-6 text-orange-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} bg-green-100 ${isHovered ? 'bg-green-200 scale-110 animate-pulse-glow' : ''}`}>
            <Play className={`w-5 h-5 sm:w-6 sm:h-6 text-green-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
          </div>
        );
    }
  };

  const getStatusBadge = (status: LiveSession['status']) => {
    switch (status) {
      case 'info':
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full animate-pulse">
            ● Live Soon
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full animate-pulse">
            ● Scheduled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full animate-pulse">
            ● Available
          </span>
        );
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {sessions.map((session, index) => (
        <div
          key={session.id}
          className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 interactive-card hover:shadow-lg transition-all duration-300 animate-slide-up"
          style={{ animationDelay: `${index * 150}ms` }}
          onMouseEnter={() => setHoveredSession(session.id)}
          onMouseLeave={() => setHoveredSession(null)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {getStatusIcon(session.status, hoveredSession === session.id)}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-600">Live Session</h4>
                  {getStatusBadge(session.status)}
                </div>
                <h3 className={`text-sm sm:text-base font-semibold text-gray-900 mb-2 transition-all duration-200 ${
                  hoveredSession === session.id ? 'text-yellow-600' : ''
                }`}>
                  {session.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                  {session.description}
                </p>
                
                {/* Participants and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  {session.participants && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      <span>{session.participants} participants</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
                      {session.actions.secondary}
                    </button>
                    <button className={`px-3 py-1.5 bg-yellow-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105 focus:ring-2 focus:ring-yellow-300 ${
                      hoveredSession === session.id ? 'animate-pulse-glow' : ''
                    }`}>
                      {session.actions.primary}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Time and Close */}
            <div className="flex flex-col items-end gap-2 ml-2 sm:ml-3 flex-shrink-0">
              <div className={`px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-200 ${
                hoveredSession === session.id ? 'scale-105 animate-pulse' : ''
              }`}>
                <Clock className="w-3 h-3" />
                <span className="whitespace-nowrap">{session.time}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress indicator for live sessions */}
          {session.status === 'info' && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Session starts in</span>
                <span>2:00:00</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full animate-shimmer" style={{ width: '75%' }}></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}