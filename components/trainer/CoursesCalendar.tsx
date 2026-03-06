'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function CoursesCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 12)); // January 12, 2024

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

  const days = getDaysInMonth(currentDate);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date(2024, 0, 12); // January 12, 2024 as "today"
    return date.toDateString() === today.toDateString();
  };

  const hasEvent = (date: Date | null) => {
    if (!date) return false;
    // Mock events on specific dates
    const eventDates = [6, 12, 18, 25];
    return eventDates.includes(date.getDate());
  };

  const timeRanges = [
    { label: 'Today', active: true },
    { label: 'Yesterday', active: false },
    { label: 'This week', active: false },
    { label: 'Last week', active: false },
    { label: 'This month', active: false },
    { label: 'Last month', active: false },
    { label: 'This year', active: false },
    { label: 'Last year', active: false },
    { label: 'All time', active: false }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-amber-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-600 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div key={index} className="aspect-square">
              {date && (
                <button
                  className={`w-full h-full text-xs rounded transition-colors ${
                    isToday(date)
                      ? 'bg-amber-600 text-white font-medium'
                      : hasEvent(date)
                        ? 'bg-gray-100 text-gray-800 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {date.getDate()}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="p-4">
        <div className="space-y-1">
          {timeRanges.map((range) => (
            <button
              key={range.label}
              className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                range.active
                  ? 'bg-gray-100 text-gray-800 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Date Range Display */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Jan 6, 2024</span>
            <span className="text-gray-400">—</span>
            <span className="text-gray-600">Jan 12, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}