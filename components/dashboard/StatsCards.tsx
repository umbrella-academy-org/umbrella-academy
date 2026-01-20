'use client';

import { User, Calendar, Video, BarChart3 } from 'lucide-react';

interface StatCard {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}

export default function StatsCards() {
  const stats: StatCard[] = [
    {
      icon: <User className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Total Phases',
      value: 8,
      color: 'text-yellow-600'
    },
    {
      icon: <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Total Months',
      value: 4,
      color: 'text-green-600'
    },
    {
      icon: <Video className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Total Sessions',
      value: 3,
      color: 'text-orange-600'
    },
    {
      icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Overall',
      value: 12,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-1.5 lg:p-2 rounded-lg bg-gray-50 ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}