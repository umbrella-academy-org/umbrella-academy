'use client';

import { Users, CheckCircle, DollarSign, Star, Bell } from 'lucide-react';
import { useState } from 'react';
import { Transaction } from '@/services/financial';

interface TrainerStatsCardsProps {
  studentsCount: number;
  activeRoadmaps: number;
  walletBalance: number;
  recentTransactions: Transaction[];
}

interface StatCard {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subtitle?: string;
}

export default function TrainerStatsCards({ 
  studentsCount, 
  activeRoadmaps, 
  walletBalance, 
  recentTransactions 
}: TrainerStatsCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Calculate completed sessions from recent transactions
  const completedSessions = recentTransactions.filter(t => 
    t.type === 'payment' && t.status === 'completed'
  ).length;

  // Calculate monthly earnings from recent transactions
  const monthlyEarnings = recentTransactions
    .filter(t => t.type === 'payment' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  // Mock rating data (in real app, would come from student feedback)
  const averageRating = 4.8;
  const totalRatings = studentsCount * 2; // Assume 2 ratings per student

  const stats: StatCard[] = [
    {
      icon: <Users className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Active Students',
      value: studentsCount,
      color: 'text-gray-600',
      trend: studentsCount > 0 ? `+${Math.min(studentsCount, 2)} this month` : 'No students yet',
      trendDirection: studentsCount > 0 ? 'up' : 'down',
      subtitle: 'Currently enrolled'
    },
    {
      icon: <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Active Roadmaps',
      value: activeRoadmaps,
      color: 'text-gray-600',
      trend: activeRoadmaps > 0 ? `${activeRoadmaps} in progress` : 'No active roadmaps',
      trendDirection: activeRoadmaps > 0 ? 'up' : 'down',
      subtitle: 'Student roadmaps'
    },
    {
      icon: <DollarSign className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Wallet Balance',
      value: walletBalance.toLocaleString(),
      color: 'text-gray-600',
      trend: monthlyEarnings > 0 ? `+${monthlyEarnings.toLocaleString()} earned` : 'No earnings yet',
      trendDirection: monthlyEarnings > 0 ? 'up' : 'down',
      subtitle: 'RWF available'
    },
    {
      icon: <Star className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Average Rating',
      value: averageRating.toFixed(1),
      color: 'text-gray-600',
      trend: `${totalRatings} reviews`,
      trendDirection: 'up',
      subtitle: 'Student feedback'
    },
    {
      icon: <Bell className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: 'Completed Sessions',
      value: completedSessions + 18, // Add mock completed sessions
      color: 'text-gray-600',
      trend: completedSessions > 0 ? `+${completedSessions} recent` : 'No recent sessions',
      trendDirection: completedSessions > 0 ? 'up' : 'down',
      subtitle: 'Total sessions done'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100  cursor-pointer group animate-slide-up hover:shadow-lg transition-all duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex flex-col gap-2">
            {/* Icon and Title */}
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg bg-gray-50 ${stat.color} group-hover:scale-110 transition-all duration-300 ${
                hoveredCard === index ? 'animate-pulse-glow' : ''
              }`}>
                {stat.icon}
              </div>
              {stat.trend && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trendDirection === 'up' 
                    ? 'text-gray-700 bg-gray-100' 
                    : 'text-gray-700 bg-gray-100'
                } transition-all duration-300 ${
                  hoveredCard === index ? 'animate-pulse scale-105' : ''
                }`}>
                  {stat.trend}
                </span>
              )}
            </div>

            {/* Value and Title */}
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1 group-hover:text-gray-800 transition-colors">
                {stat.title}
              </p>
              <div className="flex items-baseline gap-1">
                <p className={`text-lg lg:text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform ${
                  hoveredCard === index ? stat.color : ''
                }`}>
                  {stat.value}
                </p>
                {stat.title === 'Earnings' && (
                  <span className="text-xs text-gray-500 font-medium">RWF</span>
                )}
              </div>
              {stat.subtitle && (
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              )}
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