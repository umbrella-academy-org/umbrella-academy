'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Paperclip, Eye } from 'lucide-react';

export default function AssignmentCalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 12)); // January 2024

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const timeRanges = [
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
    const today = new Date(2024, 0, 12);
    return date.toDateString() === today.toDateString();
  };

  const hasAssignment = (date: Date | null) => {
    if (!date) return false;
    const assignmentDates = [6, 12];
    return assignmentDates.includes(date.getDate());
  };

  const assignments = [
    {
      id: 1,
      title: 'Node.js Design Patterns',
      activity: 'Activity 26 May 2024',
      expiry: 'Expiry 28 Jun 2024',
      description: 'Create a RESTful API using Node.js and Express to manage a simple bookstore system.',
      attachments: 3,
      status: 'pending'
    },
    {
      id: 2,
      title: 'Node.js Design Patterns',
      activity: 'Activity 26 May 2024',
      expiry: 'Expiry 28 Jun 2024',
      description: 'Create a RESTful API using Node.js and Express to manage a simple bookstore system.',
      attachments: 3,
      status: 'pending'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Assignments</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Time Ranges and Calendar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Time Range Selector */}
          <div className="space-y-1">
            {timeRanges.map((range, index) => (
              <button
                key={range}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  index === 0
                    ? 'bg-gray-100 text-gray-800 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Mini Calendar */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-1 hover:bg-gray-100 rounded"
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
                          ? 'bg-gray-600 text-white font-medium'
                          : hasAssignment(date)
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

            {/* Date Range */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Jan 6, 2024</span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-600">Jan 12, 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Assignment Cards */}
        <div className="lg:col-span-3 space-y-4">
          {assignments.map((assignment, index) => (
            <div 
              key={assignment.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>{assignment.activity}</span>
                      <span>{assignment.expiry}</span>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                  Pending
                </span>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {assignment.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Paperclip className="w-4 h-4" />
                  <span>Attached Documents:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                      <FileText className="w-3 h-3 text-gray-600" />
                    </div>
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                      <FileText className="w-3 h-3 text-gray-600" />
                    </div>
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                      <FileText className="w-3 h-3 text-gray-600" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    Submissions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}