'use client';

import { Users, TrendingUp, Clock, Star } from 'lucide-react';

export default function StudentsHeader() {
  const stats = [
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Total Students',
      value: '24',
      change: '+3 this month',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Active Students',
      value: '18',
      change: '+2 this week',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Avg. Progress',
      value: '67%',
      change: '+5% vs last month',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: <Star className="w-5 h-5" />,
      label: 'Completion Rate',
      value: '89%',
      change: '+12% improvement',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="mb-6 animate-fade-in">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          My Students
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage and track your students' progress and performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 interactive-card hover:shadow-lg transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">
                {stat.label}
              </p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-green-600 font-medium">
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}