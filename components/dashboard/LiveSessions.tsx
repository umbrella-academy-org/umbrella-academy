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
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquam pariatur ipsum dolor.',
      time: 'in 2hrs',
      status: 'success',
      actions: {
        primary: 'Attend',
        secondary: 'View Details'
      }
    },
    {
      id: '2', 
      title: 'Successfully updated profile',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquam pariatur ipsum dolor.',
      time: 'in 2hrs',
      status: 'info',
      actions: {
        primary: 'Attend',
        secondary: 'View Details'
      }
    },
    {
      id: '3',
      title: 'Successfully updated profile', 
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquam pariatur ipsum dolor.',
      time: 'in 2hrs',
      status: 'success',
      actions: {
        primary: 'Attend',
        secondary: 'View Details'
      }
    }
  ];

  const getStatusColor = (status: LiveSession['status']) => {
    switch (status) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: LiveSession['status']) => {
    switch (status) {
      case 'success':
        return (
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Live Session</h3>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`border-l-4 rounded-lg p-4 ${getStatusColor(session.status)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {getStatusIcon(session.status)}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{session.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                  <div className="flex items-center gap-3">
                    <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                      {session.actions.secondary}
                    </button>
                    <button className="px-3 py-1 bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-700 transition-colors">
                      {session.actions.primary}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <span className="text-sm text-gray-500">{session.time}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}