'use client';

import { Video, Clock, Users, Bell, Calendar, Play } from 'lucide-react';

export default function LiveSessionNotifications() {
  const upcomingSessions = [
    {
      id: 1,
      title: 'React Hooks Deep Dive',
      time: '10:00 AM',
      duration: '2 hours',
      students: 12,
      status: 'starting-soon',
      course: 'Advanced React',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      time: '2:00 PM',
      duration: '1.5 hours',
      students: 8,
      status: 'scheduled',
      course: 'Web Development',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      title: 'Node.js Backend Setup',
      time: '4:30 PM',
      duration: '2.5 hours',
      students: 15,
      status: 'scheduled',
      course: 'Full Stack Development',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: 'session-reminder',
      message: 'React Hooks session starts in 15 minutes',
      time: '5 min ago',
      icon: <Bell className="w-4 h-4 text-gray-600" />
    },
    {
      id: 2,
      type: 'student-joined',
      message: '3 new students joined your JavaScript course',
      time: '1 hour ago',
      icon: <Users className="w-4 h-4 text-gray-600" />
    },
    {
      id: 3,
      type: 'session-completed',
      message: 'CSS Grid session completed successfully',
      time: '2 hours ago',
      icon: <Video className="w-4 h-4 text-gray-600" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'starting-soon':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'scheduled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Sessions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Today's Sessions</h2>
            <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
              View All
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {upcomingSessions.map((session, index) => (
            <div 
              key={session.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{session.title}</h3>
                    <p className="text-sm text-gray-600">{session.course}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(session.status)}`}>
                  {session.status === 'starting-soon' ? 'Starting Soon' : 'Scheduled'}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {session.time}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {session.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {session.students} students
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">+{session.students - 3} more</span>
                </div>
                
                {session.status === 'starting-soon' ? (
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                    <Play className="w-4 h-4" />
                    Start Session
                  </button>
                ) : (
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
              Mark All Read
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {recentNotifications.map((notification, index) => (
            <div 
              key={notification.id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-shrink-0 mt-1">
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200">
          <button className="w-full text-center text-sm text-gray-600 hover:text-gray-700 font-medium">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
}