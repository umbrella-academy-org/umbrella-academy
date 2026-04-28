'use client';

import { useMemo } from 'react';
import { Users, TrendingUp, Clock, Star, GraduationCap, CheckCircle } from 'lucide-react';
import { useUsers } from '@/contexts/UserContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRoadmaps } from '@/contexts/RoadmapContext';
import { RoadmapStepStatus } from '@/types/roadmap';

export default function StudentsHeader() {
  const { students, isLoading } = useUsers();
  const { user } = useAuth();
  const { roadmaps } = useRoadmaps();

  // Get students assigned to current trainer
  const myStudents = useMemo(() => {
    if (!user) return [];
    return students.filter(student => student.assignedTrainerId === user._id);
  }, [students, user]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = myStudents.length;
    const active = myStudents.filter(s => s.isActive && s.isVerified).length;
    const pending = myStudents.filter(s => s.isActive && !s.isVerified).length;
    const withSubscription = myStudents.filter(s => s.hasActiveSubscription).length;

    // Calculate average progress from roadmaps
    let totalProgress = 0;
    let studentsWithRoadmap = 0;

    myStudents.forEach(student => {
      if (student.currentRoadmapId) {
        const roadmap = roadmaps.find(r => r.id === student.currentRoadmapId);
        if (roadmap && roadmap.milestones && roadmap.milestones.length > 0) {
          const completed = roadmap.milestones.filter(m => m.status === RoadmapStepStatus.COMPLETED).length;
          totalProgress += (completed / roadmap.milestones.length) * 100;
          studentsWithRoadmap++;
        }
      }
    });

    const avgProgress = studentsWithRoadmap > 0 ? Math.round(totalProgress / studentsWithRoadmap) : 0;

    return {
      total,
      active,
      pending,
      withSubscription,
      avgProgress
    };
  }, [myStudents, roadmaps]);

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
        <div className="h-5 bg-gray-200 rounded w-64 mb-6 animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Total Students',
      value: String(stats.total),
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      label: 'Active Students',
      value: String(stats.active),
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Avg. Progress',
      value: `${stats.avgProgress}%`,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: <Star className="w-5 h-5" />,
      label: 'With Subscription',
      value: String(stats.withSubscription),
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="mb-6 animate-fade-in">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          My Students
        </h1>
        <p className="text-gray-600">
          Manage and track your assigned students&apos; progress and performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}