'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Calendar } from 'lucide-react';

interface CalendarGridProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function CalendarGrid({ selectedDate, onDateSelect }: CalendarGridProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const hasSession = (date: Date | null) => {
    if (!date) return false;
    // Mock data - in real app, this would check against actual sessions
    const sessionsData = [5, 12, 18, 25, 28];
    return sessionsData.includes(date.getDate());
  };

  const getSessionsForDate = (date: Date | null) => {
    if (!date || !hasSession(date)) return [];
    
    // Mock session data
    return [
      {
        id: 1,
        title: 'React Fundamentals',
        time: '10:00 AM',
        students: 8,
        type: 'live'
      },
      {
        id: 2,
        title: 'JavaScript Advanced',
        time: '2:00 PM',
        students: 12,
        type: 'recorded'
      }
    ];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-amber-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div key={index} className="min-h-[80px] p-1">
              {date && (
                <button
                  onClick={() => onDateSelect(date)}
                  className={`w-full h-full p-2 rounded-lg text-left transition-all duration-200 hover:bg-gray-50 ${
                    isSelected(date)
                      ? 'bg-amber-600 text-white'
                      : isToday(date)
                        ? 'bg-gray-100 text-gray-800'
                        : 'text-amber-900'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{date.getDate()}</div>
                  {hasSession(date) && (
                    <div className="space-y-1">
                      {getSessionsForDate(date).slice(0, 2).map((session) => (
                        <div
                          key={session.id}
                          className={`text-xs p-1 rounded ${
                            isSelected(date)
                              ? 'bg-gray-700 text-gray-100'
                              : session.type === 'live'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="font-medium truncate">{session.title}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{session.time}</span>
                          </div>
                        </div>
                      ))}
                      {getSessionsForDate(date).length > 2 && (
                        <div className={`text-xs ${isSelected(date) ? 'text-gray-200' : 'text-gray-600'}`}>
                          +{getSessionsForDate(date).length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="border-t border-gray-200 p-6">
          <h3 className="font-semibold text-amber-900 mb-4">
            Sessions for {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          
          {hasSession(selectedDate) ? (
            <div className="space-y-3">
              {getSessionsForDate(selectedDate).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-amber-900">{session.title}</div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {session.students} students
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      session.type === 'live' 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {session.type}
                    </span>
                    <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No sessions scheduled for this date</p>
              <button className="mt-2 text-gray-600 hover:text-gray-700 text-sm font-medium">
                Schedule a session
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}