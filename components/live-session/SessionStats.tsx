'use client';

import { Clock, Calendar, X } from 'lucide-react';

interface SessionStatsProps {
  onUpcomingClick: () => void;
}

export default function SessionStats({ onUpcomingClick }: SessionStatsProps) {
  const stats = [
    {
      label: 'Upcoming Sessions',
      value: '12',
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      bgColor: 'bg-blue-50',
      clickable: true
    },
    {
      label: 'Missed',
      value: '2',
      icon: <Calendar className="w-5 h-5 text-red-600" />,
      bgColor: 'bg-red-50',
      clickable: false
    }
  ];

  return (
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${
            stat.clickable ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
          }`}
          onClick={stat.clickable ? onUpcomingClick : undefined}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}