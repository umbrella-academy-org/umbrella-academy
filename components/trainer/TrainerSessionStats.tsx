'use client';

import { TrendingUp, Clock, Users, BookOpen } from 'lucide-react';

export default function TrainerSessionStats() {
  const stats = [
    {
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      title: 'Session Delivery',
      value: '92%',
      subtitle: 'Success rate',
      trend: '+5% from last week',
      trendType: 'positive' as const,
      bgColor: 'bg-green-50/50',
      borderColor: 'border-green-100'
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      title: 'Teaching Time',
      value: '4.2h',
      subtitle: 'Daily average',
      trend: '-0.3h from target',
      trendType: 'neutral' as const,
      bgColor: 'bg-blue-50/50',
      borderColor: 'border-blue-100'
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      title: 'Student Engagement',
      value: '87%',
      subtitle: 'Active participants',
      trend: '+12% this month',
      trendType: 'positive' as const,
      bgColor: 'bg-purple-50/50',
      borderColor: 'border-purple-100'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-orange-600" />,
      title: 'Roadmap Progress',
      value: '15/18',
      subtitle: 'Assigned tracks',
      trend: '3 tracks pending',
      trendType: 'neutral' as const,
      bgColor: 'bg-orange-50/50',
      borderColor: 'border-orange-100'
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-lg font-bold text-gray-900  ">Session Performance</h2>
        <div className="flex items-center gap-2">
          <select className="text-[10px] font-bold uppercase   bg-white border border-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-sm">
            <option>Current Week</option>
            <option>This Month</option>
            <option>Last Quarter</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-2xl p-5 hover:shadow-lg hover:shadow-yellow-600/5 transition-all duration-300 group`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-gray-900  ">{stat.value}</div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase  ">{stat.title}</h3>
              <p className="text-sm font-semibold text-gray-900">{stat.subtitle}</p>
              <div className={`text-[10px] font-bold flex items-center gap-1 mt-2 ${stat.trendType === 'positive'
                ? 'text-green-600'
                : 'text-gray-400'
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