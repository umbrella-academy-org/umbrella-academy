'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Edit } from 'lucide-react';

interface CalendarSectionProps {
  selectedDateRange: string;
  onDateRangeChange: (range: string) => void;
}

export default function CalendarSection({ selectedDateRange, onDateRangeChange }: CalendarSectionProps) {
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
          className="w-8 h-8 text-xs text-gray-400 hover:bg-gray-100 rounded-full flex items-center justify-center"
        >
          {prevMonthDays - i}
        </button>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === 6 || day === 12; // Highlight days 6 and 12 as selected
      
      days.push(
        <button
          key={day}
          className={`w-8 h-8 text-xs rounded-full transition-colors flex items-center justify-center ${
            isSelected
              ? 'bg-gray-600 text-white font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }
    
    // Next month's leading days
    const remainingCells = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className="w-8 h-8 text-xs text-gray-400 hover:bg-gray-100 rounded-full flex items-center justify-center"
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="space-y-4">
      {/* Upcoming Activity */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <h3 className="text-base font-semibold text-gray-900">12 January, 2024</h3>
              <p className="text-xs text-gray-500">2 Activities Pending</p>
            </div>
          </div>
          <button className="text-gray-600 hover:text-gray-700 text-xs font-medium flex items-center gap-1">
            Edit
            <Edit className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => onDateRangeChange(range)}
                  className={`block w-full text-left text-sm transition-colors ${
                    selectedDateRange === range
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

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

            {/* Date Range Display */}
            <div className="flex items-center justify-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
                Today
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
                Jan 6, 20...
              </button>
              <span className="text-gray-400 text-xs">—</span>
              <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
                Jan 12,...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}