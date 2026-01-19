'use client';

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
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              {getStatusIcon(session.status)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900">Live Session</h4>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{session.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{session.description}</p>
                <div className="flex items-center gap-4">
                  <button className="text-gray-600 hover:text-gray-900 font-medium">
                    {session.actions.secondary}
                  </button>
                  <button className="px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors">
                    {session.actions.primary}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 ml-4">
              <div className="text-right">
                <div className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full flex items-center gap-1">
                  {session.time}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}