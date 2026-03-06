'use client';

import { Users, Clock, Star, BookOpen } from 'lucide-react';

export default function EarningsStats() {
  const stats = [
    {
      icon: <Users className="w-5 h-5 text-gray-600" />,
      label: 'Active Students',
      value: '24',
      change: '+3 this month',
      changeType: 'positive'
    },
    {
      icon: <Clock className="w-5 h-5 text-gray-600" />,
      label: 'Hours Taught',
      value: '156',
      change: '+12 this month',
      changeType: 'positive'
    },
    {
      icon: <Star className="w-5 h-5 text-gray-600" />,
      label: 'Avg Rating',
      value: '4.8',
      change: '+0.2 this month',
      changeType: 'positive'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-gray-600" />,
      label: 'Sessions',
      value: '89',
      change: '+7 this month',
      changeType: 'positive'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-amber-900 mb-4">Earnings Overview</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="text-sm font-medium text-gray-700">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-amber-900 mb-1">{stat.value}</div>
            <div className={`text-xs ${stat.changeType === 'positive' ? 'text-gray-600' : 'text-gray-600'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Hourly Rate</span>
          <span className="font-medium text-amber-900">RWF 2,500/hour</span>
        </div>
      </div>
    </div>
  );
}