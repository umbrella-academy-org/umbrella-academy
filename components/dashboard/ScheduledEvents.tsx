'use client';

import { Bell, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ScheduledEvents() {
  const [isHovered, setIsHovered] = useState(false);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Standup Meeting',
      time: '09:00 AM',
      type: 'meeting',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Code Review Session',
      time: '02:30 PM',
      type: 'review',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Client Presentation',
      time: '04:00 PM',
      type: 'presentation',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 interactive-card hover:shadow-lg transition-all duration-300 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-yellow-100 rounded-lg transition-all duration-300 ${
            isHovered ? 'scale-110 animate-pulse-glow' : ''
          }`}>
            <Bell className={`w-4 h-4 text-yellow-600 transition-all duration-300 ${
              isHovered ? 'animate-bounce-subtle' : ''
            }`} />
          </div>
          <div>
            <h3 className={`text-sm sm:text-base font-semibold text-gray-900 transition-colors duration-200 ${
              isHovered ? 'text-yellow-600' : ''
            }`}>
              Scheduled Events
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>2/12/2024</span>
            </div>
          </div>
        </div>
        <button className={`text-yellow-600 hover:text-yellow-700 text-xs font-medium flex items-center gap-1 transition-all duration-200 ${
          isHovered ? 'transform translate-x-1' : ''
        }`}>
          <span className="hidden sm:inline">Full calendar view</span>
          <span className="sm:hidden">View all</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Today's Events Preview */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-600 mb-2">Today's Schedule</h4>
        {upcomingEvents.map((event, index) => (
          <div 
            key={event.id}
            className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 animate-slide-up cursor-pointer group`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-2 h-2 rounded-full ${event.color} group-hover:scale-150 transition-transform duration-200`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate group-hover:text-yellow-600 transition-colors">
                {event.title}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{event.time}</span>
              </div>
            </div>
            <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 interactive-button transform hover:scale-105 focus:ring-2 focus:ring-yellow-300">
            Add Event
          </button>
          <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 interactive-button">
            View Calendar
          </button>
        </div>
      </div>

      {/* Notification Indicator */}
      {isHovered && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse-glow">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
        </div>
      )}
    </div>
  );
}