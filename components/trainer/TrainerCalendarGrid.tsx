'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Users } from 'lucide-react';

interface TrainerCalendarGridProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  viewMode: 'month' | 'week' | 'day';
  onViewModeChange: (mode: 'month' | 'week' | 'day') => void;
}

interface Session {
  id: string;
  title: string;
  time: string;
  duration: string;
  student: string;
  type: 'individual' | 'group';
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function TrainerCalendarGrid({
  selectedDate,
  onDateSelect,
  viewMode,
  onViewModeChange
}: TrainerCalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  // Mock session data
  const sessions: Session[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      time: '09:00',
      duration: '1h',
      student: 'Alice Johnson',
      type: 'individual',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'JavaScript Advanced',
      time: '14:00',
      duration: '1.5h',
      student: 'Bob Smith',
      type: 'individual',
      status: 'confirmed'
    },
    {
      id: '3',
      title: 'Group Study Session',
      time: '16:00',
      duration: '2h',
      student: '5 Students',
      type: 'group',
      status: 'pending'
    }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const isCurrentMonth = currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();

    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${prevMonthDays - i}`}
          className="min-h-[120px] p-2 border border-gray-200 bg-gray-50"
        >
          <span className="text-sm text-gray-400">{prevMonthDays - i}</span>
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      const isSelected = selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      // Mock sessions for certain days
      const daySessions = day === 15 ? sessions : day === 20 ? [sessions[0]] : [];

      days.push(
        <div
          key={day}
          onClick={() => onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`min-h-[120px] p-2 border border-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${isSelected ? 'bg-gray-50 border-gray-300' : 'bg-white'
            } ${isToday ? 'ring-2 ring-gray-500' : ''}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${isToday ? 'text-gray-600' : isSelected ? 'text-gray-600' : 'text-amber-900'
              }`}>
              {day}
            </span>
            {daySessions.length > 0 && (
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <Plus className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sessions */}
          <div className="space-y-1">
            {daySessions.slice(0, 3).map((session, index) => (
              <div
                key={session.id}
                className={`text-xs p-1.5 rounded text-white truncate ${session.status === 'confirmed'
                  ? 'bg-gray-500'
                  : session.status === 'pending'
                    ? 'bg-gray-500'
                    : 'bg-gray-500'
                  }`}
              >
                <div className="flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{session.time}</span>
                </div>
                <div className="font-medium truncate">{session.title}</div>
              </div>
            ))}
            {daySessions.length > 3 && (
              <div className="text-xs text-gray-500 text-center">
                +{daySessions.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    // Next month's leading days
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="min-h-[120px] p-2 border border-gray-200 bg-gray-50"
        >
          <span className="text-sm text-gray-400">{day}</span>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-amber-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['month', 'week', 'day'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${viewMode === mode
                  ? 'bg-white text-amber-900 shadow-sm'
                  : 'text-gray-600 hover:text-amber-900'
                  }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          <button className="px-3 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-all duration-200 interactive-button">
            <Plus className="w-4 h-4 mr-1" />
            Add Session
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            <span className="text-gray-600">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            <span className="text-gray-600">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            <span className="text-gray-600">Cancelled</span>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Click on any day to schedule a session
        </div>
      </div>
    </div>
  );
}