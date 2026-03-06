'use client';

import { Calendar, Clock, Users, Target } from 'lucide-react';

export default function CalendarInfo() {
  const calendarStats = [
    {
      icon: <Calendar className="w-5 h-5 text-gray-600" />,
      label: 'Total Sessions',
      value: '24',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      icon: <Clock className="w-5 h-5 text-gray-600" />,
      label: 'Hours Taught',
      value: '48h',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      icon: <Users className="w-5 h-5 text-gray-600" />,
      label: 'Active Students',
      value: '18',
      change: '+3',
      changeType: 'positive' as const
    },
    {
      icon: <Target className="w-5 h-5 text-gray-600" />,
      label: 'Completion Rate',
      value: '94%',
      change: '+2%',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Calendar Overview</h2>
        <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
          View Details
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {calendarStats.map((stat, index) => (
          <div 
            key={stat.label}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3 mb-2">
              {stat.icon}
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">{stat.value}</span>
              <span className={`text-xs font-medium ${
                stat.changeType === 'positive' ? 'text-gray-600' : 'text-gray-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">This Month Progress</span>
          <span className="font-medium text-gray-900">78% Complete</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
            style={{ width: '78%' }}
          />
        </div>
      </div>
    </div>
  );
}