'use client';

import { Video, Clock, X, Eye } from 'lucide-react';

export default function LiveSessionsPanel() {
  const liveSessions = [
    {
      id: 1,
      title: 'JavaScript Env Setup',
      description: 'Setting up development environment for JavaScript projects. Learn about Node.js installation and package management.',
      time: '10:30 AM',
      date: 'Jan 12, 2024',
      status: 'live',
      attendees: 24,
      maxAttendees: 30
    },
    {
      id: 2,
      title: 'Assignment On CS',
      description: 'Computer Science fundamentals assignment review. Covering algorithms, data structures, and problem-solving techniques.',
      time: '2:00 PM',
      date: 'Jan 12, 2024',
      status: 'upcoming',
      attendees: 18,
      maxAttendees: 25
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'live') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
          Live Session
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
        <Clock className="w-3 h-3" />
        Upcoming
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Live Sessions</h3>
      </div>

      <div className="p-4 space-y-4">
        {liveSessions.map((session, index) => (
          <div 
            key={session.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-900 text-sm">
                  {session.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(session.status)}
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              {session.description}
            </p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {session.time}
                </div>
                <div>
                  {session.attendees}/{session.maxAttendees} attendees
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Eye className="w-3 h-3" />
                  View Details
                </button>
                {session.status === 'live' ? (
                  <button className="flex items-center gap-1 px-3 py-1 text-xs text-white bg-gray-600 rounded hover:bg-gray-700 transition-colors">
                    <Video className="w-3 h-3" />
                    Join Live
                  </button>
                ) : (
                  <button className="flex items-center gap-1 px-3 py-1 text-xs text-white bg-gray-600 rounded hover:bg-gray-700 transition-colors">
                    Attend
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar for Live Sessions */}
            {session.status === 'live' && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Session Progress</span>
                  <span className="text-gray-900 font-medium">45 min remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full transition-all duration-500" style={{ width: '60%' }} />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Session Button */}
        <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-600 hover:text-gray-600 transition-colors">
          <div className="flex items-center justify-center gap-2">
            <Video className="w-5 h-5" />
            <span className="font-medium">Schedule New Session</span>
          </div>
        </button>
      </div>
    </div>
  );
}