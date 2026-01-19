'use client';

import { Monitor, Video, Clock, X } from 'lucide-react';

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

export default function LiveSessions() {
  const sessions: LiveSession[] = [
    {
      id: '1',
      title: 'Successfully updated profile',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquid pariatur, ipsum dolor.',
      time: 'in 2hrs',
      status: 'info',
      actions: {
        primary: 'Attend',
        secondary: 'View Details'
      }
    },
    {
      id: '2', 
      title: 'Successfully updated profile',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquid pariatur, ipsum dolor.',
      time: 'in 2hrs',
      status: 'warning',
      actions: {
        primary: 'Attend',
        secondary: 'View Details'
      }
    },
    {
      id: '3',
      title: 'Successfully updated profile', 
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquid pariatur, ipsum dolor.',
      time: 'in 2hrs',
      status: 'info',
      actions: {
        primary: 'Attend',
        secondary: 'View Details'
      }
    }
  ];

  const getStatusIcon = (status: LiveSession['status']) => {
    switch (status) {
      case 'info':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Monitor className="w-5 h-5 text-blue-600" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Video className="w-5 h-5 text-red-600" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Monitor className="w-5 h-5 text-blue-600" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1">
              {getStatusIcon(session.status)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900">Live Session</h4>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{session.title}</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{session.description}</p>
                <div className="flex items-center gap-3">
                  <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                    {session.actions.secondary}
                  </button>
                  <button className="px-3 py-1 bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-700 transition-colors">
                    {session.actions.primary}
                  </button>
                </div>
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
        </div>
      ))}
    </div>
  );
}