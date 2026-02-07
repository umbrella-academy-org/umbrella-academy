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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-full -mr-12 -mt-12 opacity-50 blur-2xl group-hover:bg-yellow-100 transition-colors duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-gray-900    ">Schedule</h3>
          <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-lg border border-gray-100">
            <button className="p-1 hover:bg-white hover:shadow-sm rounded transition-all">
              <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <span className="text-[11px] font-semibold text-gray-500 px-1">Jan 2024</span>
            <button className="p-1 hover:bg-white hover:shadow-sm rounded transition-all">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Date Filter Pills */}
        <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none no-scrollbar">
          {dateRanges.map((range) => (
            <button
              key={range}
              onClick={() => onDateRangeChange(range)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold transition-all border ${selectedDateRange === range
                ? 'bg-yellow-600 text-white border-yellow-600 shadow-md'
                : 'bg-white text-gray-500 border-gray-100 hover:border-yellow-200'
                }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="mt-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-[10px] font-semibold text-gray-400   py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => (
              <button
                key={index}
                className={`w-full aspect-square text-xs font-medium rounded-lg flex flex-col items-center justify-center transition-all relative ${date.isOtherMonth
                  ? 'text-gray-200 cursor-not-allowed opacity-40'
                  : date.isToday
                    ? 'bg-yellow-600 text-white shadow-md'
                    : date.hasSession
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
                  }`}
              >
                <span>{date.day}</span>
                {date.hasSession && (
                  <span className={`w-1 h-1 rounded-full absolute bottom-1.5 ${date.isToday ? 'bg-yellow-200' : 'bg-yellow-600'
                    }`}></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Footer Info */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-[11px] font-medium text-gray-500">Sessions</span>
          </div>
          <button className="text-[11px] font-semibold text-yellow-600 hover:underline decoration-2 underline-offset-4">
            Full View
          </button>
        </div>
      </div>
    </div>

  );
}