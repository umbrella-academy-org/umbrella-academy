'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Plus } from 'lucide-react';

interface SessionSchedulerProps {
  selectedDate: Date;
}

export default function SessionScheduler({ selectedDate }: SessionSchedulerProps) {
  const [sessionType, setSessionType] = useState<'individual' | 'group'>('individual');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [student, setStudent] = useState('');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const students = [
    'Alice Johnson',
    'Bob Smith', 
    'Carol Davis',
    'David Wilson',
    'Eva Martinez'
  ];

  const handleSchedule = () => {
    if (!selectedTime || !student) return;
    
    // Handle session scheduling logic here
    console.log('Scheduling session:', {
      date: selectedDate,
      time: selectedTime,
      duration,
      student,
      type: sessionType
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Schedule Session</h3>
      </div>

      {/* Selected Date */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-sm font-medium text-gray-800">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Session Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Type
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setSessionType('individual')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              sessionType === 'individual'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <User className="w-4 h-4 mx-auto mb-1" />
            Individual
          </button>
          <button
            onClick={() => setSessionType('group')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              sessionType === 'group'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex justify-center mb-1">
              <User className="w-4 h-4" />
              <User className="w-4 h-4 -ml-2" />
            </div>
            Group
          </button>
        </div>
      </div>

      {/* Time Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Clock className="w-4 h-4 inline mr-1" />
          Time Slot
        </label>
        <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-2 py-1.5 text-xs font-medium rounded transition-all duration-200 ${
                selectedTime === time
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duration (minutes)
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-sm"
        >
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="90">1.5 hours</option>
          <option value="120">2 hours</option>
        </select>
      </div>

      {/* Student Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {sessionType === 'individual' ? 'Select Student' : 'Session Title'}
        </label>
        {sessionType === 'individual' ? (
          <select
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-sm"
          >
            <option value="">Choose a student...</option>
            {students.map((studentName) => (
              <option key={studentName} value={studentName}>
                {studentName}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            placeholder="e.g., React Fundamentals Group Session"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-sm"
          />
        )}
      </div>

      {/* Schedule Button */}
      <button
        onClick={handleSchedule}
        disabled={!selectedTime || !student}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 interactive-button"
      >
        <Plus className="w-4 h-4" />
        Schedule Session
      </button>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs font-medium text-gray-600 mb-2">Quick Actions</div>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            📅 View availability
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            🔄 Recurring sessions
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            ⚙️ Session settings
          </button>
        </div>
      </div>
    </div>
  );
}