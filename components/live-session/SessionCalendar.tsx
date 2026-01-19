'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SessionCalendarProps {
  selectedDateRange: string;
  onDateRangeChange: (range: string) => void;
}

export default function SessionCalendar({ selectedDateRange, onDateRangeChange }: SessionCalendarProps) {
  const dateRanges = [
    'Today', 'Yesterday', 'This week', 'Last week', 
    'This month', 'Last month', 'This year', 'Last year', 'All time'
  ];

  const calendarDays = [
    { day: 26, isOtherMonth: true },
    { day: 27, isOtherMonth: true },
    { day: 28, isOtherMonth: true },
    { day: 29, isOtherMonth: true },
    { day: 30, isOtherMonth: true },
    { day: 31, isOtherMonth: true },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true, isToday: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true, hasSession: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isOtherMonth: true },
    { day: 2, isOtherMonth: true },
    { day: 3, isOtherMonth: true },
    { day: 4, isOtherMonth: true },
    { day: 5, isOtherMonth: true }
  ];

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Date Range Selector */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Date</h3>
          <div className="space-y-2">
            {dateRanges.map((range) => (
              <button
                key={range}
                onClick={() => onDateRangeChange(range)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedDateRange === range
                    ? 'bg-yellow-50 text-yellow-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">January 2024</h3>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => (
              <button
                key={index}
                className={`aspect-square text-sm flex items-center justify-center rounded-lg transition-colors relative ${
                  date.isOtherMonth
                    ? 'text-gray-300'
                    : date.isToday
                    ? 'bg-yellow-600 text-white font-medium'
                    : date.hasSession
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {date.day}
                {date.hasSession && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Date Range Display */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Today</span>
              <span className="text-gray-900 font-medium">Jan 6, 20... — Jan 12, ...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}