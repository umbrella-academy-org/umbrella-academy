'use client';

import { User, Calendar, Video, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface StatCard {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

export default function StatsCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats: StatCard[] = [
    {
      icon: <User className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Total Phases',
      value: 8,
      color: 'text-yellow-600',
      trend: '+12%',
      trendDirection: 'up'
    },
    {
      icon: <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Total Months',
      value: 4,
      color: 'text-green-600',
      trend: '+8%',
      trendDirection: 'up'
    },
    {
      icon: <Video className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Total Sessions',
      value: 3,
      color: 'text-orange-600',
      trend: '+25%',
      trendDirection: 'up'
    },
    {
      icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Overall',
      value: 12,
      color: 'text-red-600',
      trend: '+15%',
      trendDirection: 'up'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 interactive-card cursor-pointer group animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-600 mb-1 group-hover:text-gray-800 transition-colors">
                {stat.title}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-lg lg:text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform">
                  {stat.value}
                </p>
                {stat.trend && (
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                    stat.trendDirection === 'up' 
                      ? 'text-green-700 bg-green-100' 
                      : 'text-red-700 bg-red-100'
                  } animate-pulse-glow`}>
                    {stat.trend}
                  </span>
                )}
              </div>
            </div>
            <div className={`p-1.5 lg:p-2 rounded-lg bg-gray-50 ${stat.color} group-hover:scale-110 transition-all duration-300 ${
              hoveredCard === index ? 'animate-bounce-subtle' : ''
            }`}>
              {stat.icon}
            </div>
          </div>
          
          {/* Progress bar animation */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className={`h-1 rounded-full transition-all duration-1000 ease-out ${
                stat.color.replace('text-', 'bg-')
              }`}
              style={{ 
                width: hoveredCard === index ? '100%' : '0%',
                transitionDelay: hoveredCard === index ? '200ms' : '0ms'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}