'use client';

import { Users, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TrainingCapacityProps {
  assignedStudents: number;
  maxCapacity: number;
  weeklyHours: number;
}

export default function TrainingCapacity({ assignedStudents, maxCapacity, weeklyHours }: TrainingCapacityProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Mock weekly schedule data based on props
  const capacityData = [
    { day: 'Mon', sessions: Math.min(Math.floor(assignedStudents * 0.2), 4), capacity: 4 },
    { day: 'Tue', sessions: Math.min(Math.floor(assignedStudents * 0.15), 4), capacity: 4 },
    { day: 'Wed', sessions: Math.min(Math.floor(assignedStudents * 0.25), 4), capacity: 4 },
    { day: 'Thu', sessions: Math.min(Math.floor(assignedStudents * 0.1), 4), capacity: 4 },
    { day: 'Fri', sessions: Math.min(Math.floor(assignedStudents * 0.2), 4), capacity: 4 },
    { day: 'Sat', sessions: Math.min(Math.floor(assignedStudents * 0.1), 4), capacity: 4 },
    { day: 'Sun', sessions: 0, capacity: 4 }
  ];

  const totalSessions = capacityData.reduce((sum, day) => sum + day.sessions, 0);
  const totalCapacity = capacityData.reduce((sum, day) => sum + day.capacity, 0);
  const utilizationRate = totalCapacity > 0 ? Math.round((totalSessions / totalCapacity) * 100) : 0;
  const averageSessionsPerDay = totalSessions > 0 ? (totalSessions / 7).toFixed(1) : '0.0';
  const weeklyGrowth = Math.max(0, assignedStudents - 3); // Mock growth calculation

  return (
    <div 
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100  hover:shadow-lg transition-all duration-300 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-gray-100 rounded-lg transition-all duration-300 ${
            isHovered ? 'scale-110 animate-pulse-glow' : ''
          }`}>
            <Users className={`w-5 h-5 text-gray-600 transition-all duration-300 ${
              isHovered ? 'scale-110' : ''
            }`} />
          </div>
          <div>
            <h3 className={`text-sm sm:text-base font-semibold text-gray-900 transition-colors duration-200 ${
              isHovered ? 'text-gray-600' : ''
            }`}>
              Training Capacity
            </h3>
            <p className="text-xs text-gray-500">Weekly overview</p>
          </div>
        </div>
        <ChevronRight className={`w-4 h-4 text-gray-400 transition-all duration-200 ${
          isHovered ? 'translate-x-1 text-gray-600' : ''
        }`} />
      </div>

      {/* Capacity Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className={`text-xl font-bold text-gray-900 transition-all duration-300 ${
            isHovered ? 'scale-110 text-gray-600' : ''
          }`}>
            {assignedStudents}/{maxCapacity}
          </div>
          <p className="text-xs text-gray-600 mt-1">Students Assigned</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className={`text-xl font-bold text-gray-900 transition-all duration-300 ${
            isHovered ? 'scale-110 text-gray-600' : ''
          }`}>
            {utilizationRate}%
          </div>
          <p className="text-xs text-gray-600 mt-1">Utilization Rate</p>
        </div>
      </div>

      {/* Weekly Capacity Chart */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-gray-700 mb-3">This Week's Schedule</h4>
        <div className="space-y-2">
          {capacityData.map((day, index) => (
            <div 
              key={day.day}
              className={`flex items-center gap-3 animate-slide-up`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-8 text-xs font-medium text-gray-600">{day.day}</div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                      day.sessions === day.capacity 
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600' 
                        : day.sessions > day.capacity * 0.7
                          ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                          : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}
                    style={{ 
                      width: `${(day.sessions / day.capacity) * 100}%`,
                      transitionDelay: isHovered ? `${index * 100}ms` : '0ms'
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 w-12 text-right">
                  {day.sessions}/{day.capacity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-gray-500" />
          <span>+{weeklyGrowth} students vs last week</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-gray-500" />
          <span>Avg: {averageSessionsPerDay} sessions/day</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 interactive-button">
          View Schedule
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-600 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 interactive-button transform hover:scale-105 focus:ring-2 focus:ring-gray-300">
          Add Session
        </button>
      </div>

      {/* Capacity Legend */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-600">Busy</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-600">Full</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}