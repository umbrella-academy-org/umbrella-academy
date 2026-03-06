'use client';

import { Clock, User, Video, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface Session {
  id: string;
  title: string;
  student: string;
  time: string;
  duration: string;
  type: 'individual' | 'group';
  status: 'upcoming' | 'live' | 'completed';
  avatar: string;
}

export default function UpcomingSessions() {
  const [showActions, setShowActions] = useState<string | null>(null);

  const sessions: Session[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      student: 'Alice Johnson',
      time: '09:00 AM',
      duration: '1h',
      type: 'individual',
      status: 'upcoming',
      avatar: 'AJ'
    },
    {
      id: '2',
      title: 'JavaScript Advanced',
      student: 'Bob Smith',
      time: '02:00 PM',
      duration: '1.5h',
      type: 'individual',
      status: 'upcoming',
      avatar: 'BS'
    },
    {
      id: '3',
      title: 'Group Study Session',
      student: '5 Students',
      time: '04:00 PM',
      duration: '2h',
      type: 'group',
      status: 'live',
      avatar: 'GS'
    },
    {
      id: '4',
      title: 'UI/UX Design Basics',
      student: 'Carol Davis',
      time: '06:00 PM',
      duration: '1h',
      type: 'individual',
      status: 'upcoming',
      avatar: 'CD'
    }
  ];

  const getStatusBadge = (status: Session['status']) => {
    switch (status) {
      case 'live':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 animate-pulse">
            ● Live
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            ● Upcoming
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            ● Completed
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Today's Sessions</h3>
        <span className="text-sm text-gray-500">{sessions.length} sessions</span>
      </div>

      <div className="space-y-3">
        {sessions.map((session, index) => (
          <div 
            key={session.id}
            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  session.type === 'group' 
                    ? 'bg-gray-500' 
                    : 'bg-gradient-to-br from-gray-400 to-gray-600'
                }`}>
                  {session.avatar}
                </div>

                {/* Session Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {session.title}
                    </h4>
                    {getStatusBadge(session.status)}
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <User className="w-3 h-3" />
                    <span>{session.student}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{session.time}</span>
                    </div>
                    <span>•</span>
                    <span>{session.duration}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="relative">
                <button
                  onClick={() => setShowActions(showActions === session.id ? null : session.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {showActions === session.id && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      {session.status === 'live' ? (
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                          <Video className="w-4 h-4" />
                          Join Session
                        </button>
                      ) : (
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                          <Video className="w-4 h-4" />
                          Start Session
                        </button>
                      )}
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Clock className="w-4 h-4" />
                        Reschedule
                      </button>
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                        <span className="w-4 h-4 text-center">✕</span>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              {session.status === 'live' ? (
                <button className="flex-1 px-3 py-1.5 bg-yellow-600 text-white text-xs font-medium rounded hover:bg-yellow-700 transition-colors">
                  Join Live Session
                </button>
              ) : (
                <>
                  <button className="flex-1 px-3 py-1.5 bg-yellow-600 text-white text-xs font-medium rounded hover:bg-yellow-700 transition-colors">
                    Start Session
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                    Message
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Session Button */}
      <button className="w-full mt-4 px-4 py-2.5 border-2 border-dashed border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:border-gray-400 hover:text-gray-600 transition-all duration-200">
        + Schedule New Session
      </button>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">4</div>
            <div className="text-xs text-gray-500">Today</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-500">This Week</div>
          </div>
        </div>
      </div>
    </div>
  );
}