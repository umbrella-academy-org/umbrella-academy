'use client';

import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function CalendarStats() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Sessions Today',
      value: '4',
      change: '+1 vs yesterday',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Hours Scheduled',
      value: '6.5',
      change: '+2.5 this week',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Students Today',
      value: '8',
      change: '+3 new bookings',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      label: 'Completion Rate',
      value: '95%',
      change: '+5% improvement',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 interactive-card hover:shadow-lg transition-all duration-300 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${stat.color} transition-all duration-300 ${
              hoveredCard === index ? 'scale-110' : ''
            }`}>
              {stat.icon}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-medium text-gray-600 mb-1">
              {stat.label}
            </p>
            <p className={`text-xl lg:text-2xl font-bold text-gray-900 mb-1 transition-all duration-300 ${
              hoveredCard === index ? 'scale-105' : ''
            }`}>
              {stat.value}
            </p>
            <p className="text-xs text-green-600 font-medium">
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}