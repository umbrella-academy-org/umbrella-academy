'use client';

import { TrendingUp, Clock, Users, BookOpen } from 'lucide-react';

export default function ActivityStats() {
  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: 'Weekly Performance',
      value: '92%',
      subtitle: 'Average completion rate',
      trend: '+5% from last week',
      trendType: 'positive' as const,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: 'Time Efficiency',
      value: '4.2h',
      subtitle: 'Average session duration',
      trend: '-0.3h from target',
      trendType: 'neutral' as const,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: 'Student Engagement',
      value: '87%',
      subtitle: 'Active participation rate',
      trend: '+12% this month',
      trendType: 'positive' as const,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-orange-600" />,
      title: 'Course Progress',
      value: '15/18',
      subtitle: 'Modules completed',
      trend: '3 modules remaining',
      trendType: 'neutral' as const,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Activity Statistics</h2>
        <div className="flex items-center gap-2">
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div 
            key={stat.title}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-6 hover:shadow-md transition-all duration-200 transform hover:scale-105`}
            style={{ animationDelay: `${300 + index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              {stat.icon}
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{stat.title}</h3>
              <p className="text-sm text-gray-600">{stat.subtitle}</p>
              <div className={`text-xs font-medium ${
                stat.trendType === 'positive' 
                  ? 'text-green-600' 
                  : 'text-gray-600'
              }`}>
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}