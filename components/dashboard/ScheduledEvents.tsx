'use client';

import { Bell, ChevronRight, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { UserType } from '@/types';
import { useRoadmaps } from '@/contexts';

interface ScheduledEventsProps {
  userType: UserType;
}

export default function ScheduledEvents({ userType }: ScheduledEventsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { getUpcomingLiveSessions, isLoading } = useRoadmaps();

  const upcomingEvents = getUpcomingLiveSessions();

  const getTitle = () => {
    switch (userType) {
      case 'trainer':
        return 'Training Schedule';
      case 'student':
        return 'Upcoming Classes';
      case 'admin':
        return 'System Events';
      default:
        return 'Scheduled Events';
    }
  };

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100  hover:shadow-lg transition-all duration-300 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-gray-100 rounded-lg transition-all duration-300 ${isHovered ? 'scale-110 animate-pulse-glow' : ''
            }`}>
            <Bell className={`w-4 h-4 text-gray-600 transition-all duration-300 ${isHovered ? 'animate-bounce-subtle' : ''
              }`} />
          </div>
          <div>
            <h3 className={`text-sm sm:text-base font-semibold text-gray-900 transition-colors duration-200 ${isHovered ? 'text-gray-600' : ''
              }`}>
              {getTitle()}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>2/12/2024</span>
            </div>
          </div>
        </div>
        <button className={`text-gray-600 hover:text-gray-700 text-xs font-medium flex items-center gap-1 transition-all duration-200 ${isHovered ? 'transform translate-x-1' : ''
          }`}>
          <span className="hidden sm:inline">Full calendar view</span>
          <span className="sm:hidden">View all</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Today's Events Preview */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-600 mb-2">Today's Schedule</h4>
        {isLoading ? (
          <>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg animate-pulse">
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </>
        ) : upcomingEvents.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">No events scheduled for today.</p>
        ) : (
          upcomingEvents.map((session, index) => (
            <div
              key={session.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 animate-slide-up cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-2 h-2 rounded-full bg-yellow-600 group-hover:scale-150 transition-transform duration-200"></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate group-hover:text-gray-600 transition-colors">
                  {session.title}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(session.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 interactive-button">
            View Calendar
          </button>
        </div>
      </div>

      {/* Notification Indicator */}
      {isHovered && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-600 rounded-full animate-pulse-glow">
          <div className="absolute inset-0 bg-yellow-600 rounded-full animate-ping"></div>
        </div>
      )}
    </div>
  );
}