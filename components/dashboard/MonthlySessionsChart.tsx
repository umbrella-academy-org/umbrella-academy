'use client';

import { MoreHorizontal } from 'lucide-react';
import { UserType } from '@/types';

interface MonthlySessionsChartProps {
  userType: UserType;
}

export default function MonthlySessionsChart({ userType }: MonthlySessionsChartProps) {
  // Generate chart data based on user type
  const getChartData = () => {
    switch (userType) {
      case 'trainer':
        return [
          { day: 'Mon', sessions: 3 },
          { day: 'Tue', sessions: 2 },
          { day: 'Wed', sessions: 4 },
          { day: 'Thu', sessions: 1 },
          { day: 'Fri', sessions: 3 },
          { day: 'Sat', sessions: 2 },
          { day: 'Sun', sessions: 0 }
        ];
      case 'mentor':
        return [
          { day: 'Mon', sessions: 2 },
          { day: 'Tue', sessions: 3 },
          { day: 'Wed', sessions: 1 },
          { day: 'Thu', sessions: 4 },
          { day: 'Fri', sessions: 2 },
          { day: 'Sat', sessions: 1 },
          { day: 'Sun', sessions: 0 }
        ];
      case 'student':
        return [
          { day: 'Mon', sessions: 1 },
          { day: 'Tue', sessions: 1 },
          { day: 'Wed', sessions: 2 },
          { day: 'Thu', sessions: 1 },
          { day: 'Fri', sessions: 2 },
          { day: 'Sat', sessions: 1 },
          { day: 'Sun', sessions: 0 }
        ];
      case 'field-admin':
        return [
          { day: 'Mon', sessions: 15 },
          { day: 'Tue', sessions: 18 },
          { day: 'Wed', sessions: 12 },
          { day: 'Thu', sessions: 22 },
          { day: 'Fri', sessions: 16 },
          { day: 'Sat', sessions: 8 },
          { day: 'Sun', sessions: 5 }
        ];
      case 'umbrella-admin':
        return [
          { day: 'Mon', sessions: 45 },
          { day: 'Tue', sessions: 52 },
          { day: 'Wed', sessions: 38 },
          { day: 'Thu', sessions: 61 },
          { day: 'Fri', sessions: 48 },
          { day: 'Sat', sessions: 25 },
          { day: 'Sun', sessions: 18 }
        ];
      default:
        return [
          { day: 'Mon', sessions: 3 },
          { day: 'Tue', sessions: 2 },
          { day: 'Wed', sessions: 2 },
          { day: 'Thu', sessions: 4 },
          { day: 'Fri', sessions: 5 },
          { day: 'Sat', sessions: 5 },
          { day: 'Sun', sessions: 4 }
        ];
    }
  };

  const chartData = getChartData();
  const maxSessions = Math.max(...chartData.map(d => d.sessions));

  const getTitle = () => {
    switch (userType) {
      case 'trainer':
        return 'Training Sessions';
      case 'mentor':
        return 'Mentoring Sessions';
      case 'student':
        return 'Learning Sessions';
      case 'field-admin':
        return 'Field Activities';
      case 'umbrella-admin':
        return 'System Activities';
      default:
        return 'Monthly Sessions';
    }
  };

  const getDescription = () => {
    switch (userType) {
      case 'trainer':
        return 'Track your training sessions with students over time';
      case 'mentor':
        return 'Monitor your mentoring activities and student interactions';
      case 'student':
        return 'View your learning sessions and study time';
      case 'field-admin':
        return 'Track field-wide activities and performance metrics';
      case 'umbrella-admin':
        return 'Monitor system-wide activities across all fields';
      default:
        return 'Track how you interact with sessions over time';
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div>
          <h3 className="text-sm lg:text-base font-semibold text-gray-900">{getTitle()}</h3>
          <p className="text-xs text-gray-500 mt-1">{getDescription()}</p>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Chart Container */}
      <div className="w-full">
        {/* Chart Grid */}
        <div className="flex">
          {/* Y-axis */}
          <div className="flex flex-col justify-between h-32 lg:h-40 text-xs text-gray-500 pr-3 lg:pr-4">
            <span>5</span>
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="flex-1">
            <div className="flex items-end justify-between h-32 lg:h-40 border-l border-b border-gray-200 px-2">
              {chartData.map((data, index) => (
                <div key={data.day} className="flex flex-col items-center flex-1">
                  {/* Bar */}
                  <div className="flex justify-center mb-2 w-full">
                    <div
                      className="bg-gray-500 rounded-t-sm transition-all duration-300 hover:bg-yellow-600"
                      style={{
                        width: '16px',
                        height: `${Math.max((data.sessions / maxSessions) * 100, 8)}px`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between px-2 mt-2">
              {chartData.map((data) => (
                <div key={data.day} className="flex-1 text-center">
                  <span className="text-xs text-gray-500">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend and Date */}
        <div className="flex items-center justify-between mt-4 lg:mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Session Completed</span>
          </div>
          <span className="text-xs text-gray-500">January</span>
        </div>
      </div>
    </div>
  );
}