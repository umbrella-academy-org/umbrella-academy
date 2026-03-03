'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarGridProps {
  selectedDateRange: string;
  onDateRangeChange: (range: string) => void;
}

export default function CalendarGrid({ selectedDateRange, onDateRangeChange }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024

  const dateRanges = [
    'Today',
    'Yesterday',
    'This week',
    'Last week',
    'This month',
    'Last month',
    'This year',
    'Last year',
    'All time'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <button
          key={`prev-${prevMonthDays - i}`}
          className="w-10 h-10 text-xs text-gray-300 flex items-center justify-center cursor-default"
        >
          {prevMonthDays - i}
        </button>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === 6 || day === 12;
      const hasLiveSession = [6, 12, 18, 24].includes(day);

      days.push(
        <button
          key={day}
          className={`w-10 h-10 text-sm rounded-lg transition-all flex flex-col items-center justify-center relative ${isSelected
            ? 'bg-gray-600 text-white font-bold shadow-lg shadow-gray-600/20 active:scale-95'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-600'
            }`}
        >
          <span>{day}</span>
          {hasLiveSession && (
            <span className={`w-1 h-1 rounded-full absolute bottom-1.5 ${isSelected ? 'bg-white' : 'bg-gray-500'
              }`}></span>
          )}
        </button>
      );
    }

    // Next month's leading days
    const remainingCells = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className="w-10 h-10 text-xs text-gray-300 flex items-center justify-center cursor-default"
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      {/* Left side - Date Range Selector */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="space-y-3">
            {dateRanges.map((range) => (
              <button
                key={range}
                onClick={() => onDateRangeChange(range)}
                className={`block w-full text-left text-sm transition-colors ${selectedDateRange === range
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Calendar */}
        <div>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <h4 className="text-base font-medium text-gray-600">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h4>

            <button
              onClick={() => navigateMonth('next')}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="mb-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}