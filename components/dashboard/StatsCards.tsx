'use client';

import { User, Calendar, Video, BarChart3 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts';
import { statsService } from '@/services';
import type { StatsResponse } from '@/services';

interface StatCard {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-7 bg-gray-200 rounded w-1/2 mb-1" />
              <div className="h-2 bg-gray-200 rounded w-1/3" />
            </div>
            <div className="p-1.5 lg:p-2 rounded-lg bg-gray-100 w-9 h-9" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StatsCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await statsService.getMyStats();
      if (response.success) {
        setStats(response.data);
      } else {
        setError('Failed to load stats.');
      }
    } catch {
      setError('Failed to load stats. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="col-span-2 lg:col-span-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={fetchStats}
            className="ml-4 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Build stat cards based on role
  const role = user?.role;
  let statCards: StatCard[] = [];

  if (role === 'student' && stats?.student) {
    const s = stats.student;
    statCards = [
      {
        icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Roadmap Progress',
        value: `${Math.round(s.roadmapProgress)}%`,
        color: 'text-yellow-600',
        trend: s.roadmapProgress > 50 ? '+Good' : 'Start',
        trendDirection: s.roadmapProgress > 50 ? 'up' : 'down',
      },
      {
        icon: <User className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Active Roadmaps',
        value: s.activeRoadmaps,
        color: 'text-green-600',
        trend: s.activeRoadmaps > 0 ? 'Active' : 'None',
        trendDirection: s.activeRoadmaps > 0 ? 'up' : 'down',
      },
      {
        icon: <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Completed Sessions',
        value: s.completedSessions,
        color: 'text-blue-600',
        trend: s.completedSessions > 0 ? `${s.completedSessions} done` : '0 done',
        trendDirection: s.completedSessions > 0 ? 'up' : 'down',
      },
      {
        icon: <Video className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Upcoming Sessions',
        value: s.upcomingSessions,
        color: 'text-purple-600',
        trend: s.upcomingSessions > 0 ? 'Scheduled' : 'None',
        trendDirection: s.upcomingSessions > 0 ? 'up' : 'down',
      },
    ];
  } else if (role === 'trainer' && stats?.trainer) {
    const s = stats.trainer;
    statCards = [
      {
        icon: <User className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Assigned Students',
        value: s.assignedStudents,
        color: 'text-green-600',
      },
      {
        icon: <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Sessions Conducted',
        value: s.totalSessionsConducted,
        color: 'text-blue-600',
      },
      {
        icon: <Video className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Upcoming Sessions',
        value: s.upcomingSessions,
        color: 'text-purple-600',
      },
      {
        icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Wallet Balance',
        value: `RWF ${s.walletBalance.toLocaleString()}`,
        color: 'text-yellow-600',
      },
    ];
  } else if (role === 'field-admin' && stats?.['field-admin']) {
    const s = stats['field-admin'];
    statCards = [
      {
        icon: <User className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Total Students',
        value: s.totalStudents,
        color: 'text-green-600',
      },
      {
        icon: <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Total Trainers',
        value: s.totalTrainers,
        color: 'text-blue-600',
      },
      {
        icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Active Roadmaps',
        value: s.activeRoadmaps,
        color: 'text-yellow-600',
      },
      {
        icon: <Video className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Field Revenue',
        value: `RWF ${s.totalFieldRevenue.toLocaleString()}`,
        color: 'text-purple-600',
      },
    ];
  } else if (role === 'umbrella-admin' && stats?.['umbrella-admin']) {
    const s = stats['umbrella-admin'];
    statCards = [
      {
        icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Active Roadmaps',
        value: s.activeRoadmaps,
        color: 'text-yellow-600',
      },
      {
        icon: <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Completed Sessions',
        value: s.completedSessions,
        color: 'text-blue-600',
      },
      {
        icon: <Video className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: 'Total Revenue',
        value: `RWF ${s.totalRevenue.toLocaleString()}`,
        color: 'text-green-600',
      },
    ];
  }

  // Fallback: no data for this role
  if (statCards.length === 0) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {[
          { icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />, title: 'Roadmap Progress', value: '0%', color: 'text-yellow-600' },
          { icon: <User className="w-5 h-5 lg:w-6 lg:h-6" />, title: 'Active Roadmaps', value: 0, color: 'text-green-600' },
          { icon: <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />, title: 'Completed Sessions', value: 0, color: 'text-blue-600' },
          { icon: <Video className="w-5 h-5 lg:w-6 lg:h-6" />, title: 'Upcoming Sessions', value: 0, color: 'text-purple-600' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-400 mb-1">{stat.title}</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-400">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">No data available</p>
              </div>
              <div className={`p-1.5 lg:p-2 rounded-lg bg-gray-50 ${stat.color}`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100 cursor-pointer group animate-slide-up"
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
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                      stat.trendDirection === 'up'
                        ? 'text-green-700 bg-green-100'
                        : 'text-orange-700 bg-orange-100'
                    } animate-pulse-glow`}
                  >
                    {stat.trend}
                  </span>
                )}
              </div>
            </div>
            <div
              className={`p-1.5 lg:p-2 rounded-lg bg-gray-50 ${stat.color} group-hover:scale-110 transition-all duration-300 ${
                hoveredCard === index ? 'animate-bounce-subtle' : ''
              }`}
            >
              {stat.icon}
            </div>
          </div>

          {/* Progress bar animation */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className={`h-1 rounded-full transition-all duration-1000 ease-out ${stat.color.replace('text-', 'bg-')}`}
              style={{
                width: hoveredCard === index ? '100%' : '0%',
                transitionDelay: hoveredCard === index ? '200ms' : '0ms',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
