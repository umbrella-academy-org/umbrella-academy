'use client';

import { TrendingUp, Clock, Users, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

export default function AssignmentStats() {
  const stats = [
    {
      icon: <FileText className="w-5 h-5 text-gray-600" />,
      title: 'Total Assignments',
      value: '42',
      change: '+3 this week',
      changeType: 'positive' as const,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-gray-600" />,
      title: 'Completed',
      value: '35',
      change: '83% completion rate',
      changeType: 'positive' as const,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      icon: <Clock className="w-5 h-5 text-gray-600" />,
      title: 'Pending Review',
      value: '8',
      change: 'Avg 2.3 days',
      changeType: 'neutral' as const,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-gray-600" />,
      title: 'Overdue',
      value: '3',
      change: '-2 from last week',
      changeType: 'positive' as const,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Assignment graded',
      student: 'Sarah Johnson',
      assignment: 'React Hooks Implementation',
      time: '2 hours ago',
      grade: 95
    },
    {
      id: 2,
      action: 'New submission',
      student: 'Mike Chen',
      assignment: 'Component State Management',
      time: '5 hours ago',
      grade: null
    },
    {
      id: 3,
      action: 'Assignment created',
      student: null,
      assignment: 'Advanced React Patterns',
      time: '1 day ago',
      grade: null
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.title}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-4 hover:shadow-md transition-all duration-200 animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              {stat.icon}
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900 text-sm">{stat.title}</h3>
              <div className={`text-xs font-medium ${
                stat.changeType === 'positive' 
                  ? 'text-gray-600' 
                  : 'text-gray-600'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grade Distribution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
        
        <div className="space-y-3">
          {[
            { grade: 'A (90-100%)', count: 12, percentage: 35, color: 'bg-gray-500' },
            { grade: 'B (80-89%)', count: 15, percentage: 44, color: 'bg-gray-500' },
            { grade: 'C (70-79%)', count: 6, percentage: 18, color: 'bg-gray-500' },
            { grade: 'D (60-69%)', count: 1, percentage: 3, color: 'bg-gray-500' },
            { grade: 'F (0-59%)', count: 0, percentage: 0, color: 'bg-gray-500' }
          ].map((item) => (
            <div key={item.grade} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-gray-700">{item.grade}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 w-8 text-right">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div 
              key={activity.id}
              className="flex items-start gap-3 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.action}</span>
                  {activity.student && (
                    <>
                      {' by '}
                      <span className="font-medium">{activity.student}</span>
                    </>
                  )}
                </p>
                <p className="text-sm text-gray-600 truncate">{activity.assignment}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  {activity.grade && (
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {activity.grade}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Create Assignment</div>
                <div className="text-sm text-gray-600">Add a new assignment</div>
              </div>
            </div>
          </button>
          
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">View Analytics</div>
                <div className="text-sm text-gray-600">Assignment performance</div>
              </div>
            </div>
          </button>
          
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Bulk Actions</div>
                <div className="text-sm text-gray-600">Grade multiple assignments</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}