'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { UserType } from '@/types';

interface CalendarProps {
  selectedDateRange: string;
  onDateRangeChange: (range: string) => void;
  userType: UserType;
}

export default function Calendar({ selectedDateRange, onDateRangeChange, userType }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

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
  const today = new Date();
  const isCurrentMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

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
          className="w-7 h-7 sm:w-8 sm:h-8 text-xs text-gray-400 hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          {prevMonthDays - i}
        </button>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      const isSelected = day === 6 || day === 12; // Highlight days 6 and 12 as selected
      const hasEvent = day === 11 || day === 24; // Small dots for events
      
      days.push(
        <button
          key={day}
          onMouseEnter={() => setHoveredDay(day)}
          onMouseLeave={() => setHoveredDay(null)}
          className={`w-7 h-7 sm:w-8 sm:h-8 text-xs rounded-full transition-all duration-200 flex items-center justify-center relative transform hover:scale-110 ${
            isSelected
              ? 'bg-amber-600 text-white font-medium shadow-lg animate-pulse-glow'
              : isToday
                ? 'bg-gray-100 text-gray-600 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
          } ${hoveredDay === day ? 'shadow-md' : ''}`}
        >
          {day}
          {hasEvent && !isSelected && (
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full transition-all duration-200 ${
              hoveredDay === day ? 'animate-pulse scale-150' : ''
            }`}></div>
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
          className="w-7 h-7 sm:w-8 sm:h-8 text-xs text-gray-400 hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100  animate-fade-in">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Left side - Date Range Selector */}
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-2 mb-3 lg:hidden">
            <CalendarIcon className="w-4 h-4 text-gray-600" />
            <h4 className="text-sm font-medium text-amber-900">Quick Select</h4>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-1 gap-1 sm:gap-2 lg:space-y-3">
            {dateRanges.map((range, index) => (
              <button
                key={range}
                onClick={() => onDateRangeChange(range)}
                className={`text-left text-xs sm:text-sm transition-all duration-200 p-2 sm:p-1 rounded-lg animate-slide-up ${
                  selectedDateRange === range
                    ? 'text-gray-600 font-medium bg-gray-50 transform scale-105'
                    : 'text-gray-600 hover:text-amber-900 hover:bg-gray-50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Calendar */}
        <div className="order-1 lg:order-2">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <h4 className="text-sm sm:text-base font-medium text-gray-600 animate-fade-in">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h4>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="mb-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
                <div 
                  key={day} 
                  className="text-center text-xs font-medium text-gray-500 py-1 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
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
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 transition-all duration-200 interactive-button">
              Today
            </button>
            <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 transition-all duration-200 interactive-button">
              Jan 6, 20...
            </button>
            <span className="text-gray-400 text-xs">—</span>
            <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 transition-all duration-200 interactive-button">
              Jan 12,...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}