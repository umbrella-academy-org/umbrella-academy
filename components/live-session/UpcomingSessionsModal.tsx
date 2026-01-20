'use client';

import { X, Clock, Calendar } from 'lucide-react';

interface UpcomingSessionsModalProps {
  onClose: () => void;
}

interface UpcomingSession {
  id: string;
  title: string;
  description: string;
  time: string;
  canJoin: boolean;
}

export default function UpcomingSessionsModal({ onClose }: UpcomingSessionsModalProps) {
  const upcomingSessions: UpcomingSession[] = [
    {
      id: '1',
      title: 'Introduction to JavaScript',
      description: 'Learn ipsum dolor sit amet consectetur adipiscing elit. Aliquid pariatur, ipsum dolor.',
      time: 'in 2hrs',
      canJoin: false
    },
    {
      id: '2',
      title: 'Introduction to JavaScript',
      description: 'Learn ipsum dolor sit amet consectetur adipiscing elit. Aliquid pariatur, ipsum dolor.',
      time: 'in 2hrs',
      canJoin: false
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Live Sessions</h2>
            <p className="text-sm text-gray-600 mt-1">Collaborate and study face to face.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">Live Session</h4>
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">{session.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{session.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-3">
                  <div className="text-right">
                    <div className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full flex items-center gap-1">
                      {session.time}
                      <Clock className="w-3 h-3" />
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  disabled={!session.canJoin}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                    session.canJoin
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {session.canJoin ? 'Join' : "I won't be able to join"}
                </button>
                <a 
                  href="/dashboard/student/live-session/call"
                  className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Join
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}