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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 group transition-all duration-300 ${stat.clickable ? 'cursor-pointer hover:border-yellow-200 hover:shadow-lg hover:shadow-yellow-600/5' : ''
            }`}
          onClick={stat.clickable ? onUpcomingClick : undefined}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900   mb-1">{stat.value}</div>
              <div className="text-[11px] font-medium text-gray-500">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
}