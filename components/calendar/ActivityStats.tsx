'use client';

import { Calendar, Clock, Users, Target } from 'lucide-react';

export default function ActivityStats() {
  const stats = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Today's Activity",
      value: "Javascript Env Setup",
      status: "In Progress",
      color: "text-gray-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Remaining For Mentorship",
      value: "8 Months",
      progress: 75,
      color: "text-gray-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Attendance Score",
      value: "30/40",
      color: "text-gray-600"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Missed Sessions",
      value: "2",
      color: "text-gray-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-medium text-gray-600 mb-1">{stat.title}</p>
            <p className="text-lg font-bold text-gray-900 mb-2">{stat.value}</p>
            
            {stat.status && (
              <span className="text-xs text-gray-600 font-medium">{stat.status}</span>
            )}
            
            {stat.progress && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{stat.progress}%</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}