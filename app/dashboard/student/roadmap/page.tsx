'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth, useRoadmaps } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

export default function StudentRoadmapPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { studentRoadmaps, isLoading: roadmapsLoading } = useRoadmaps();
  const { navigate } = useNavigationWithLoading();

  // Redirect if not authenticated or not a student
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'student') {
      const dashboardRoutes: Record<string, string> = {
        'trainer': '/dashboard/trainer',
        'mentor': '/dashboard/mentor',
        'field-admin': '/dashboard/field-admin',
        'umbrella-admin': '/dashboard/umbrella-admin'
      };
      navigate(dashboardRoutes[user.role] || '/');
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  if (authLoading || roadmapsLoading) {
    return (
      <div className="flex h-screen bg-white">
        <div className="w-64 bg-black animate-pulse"></div>
        <div className="flex-1 p-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'student') {
    return null;
  }

  const activeRoadmap = studentRoadmaps.find(roadmap =>
    roadmap.studentId === user.id && roadmap.status === 'active'
  );

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Roadmap" userType="student" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">My Learning Roadmap</h1>
            <p className="text-gray-600 mt-1">Track your progress and plan your learning journey</p>
          </div>

          {activeRoadmap ? (
            <div className="space-y-6">
              {/* Roadmap Header */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{activeRoadmap.roadmap.title}</h2>
                    <p className="text-gray-600 mt-1">{activeRoadmap.roadmap.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-sm text-gray-500">Duration: {activeRoadmap.roadmap.estimatedDuration} weeks</span>
                      <span className="text-sm text-gray-500">Progress: {activeRoadmap.roadmap.progress.overallProgress}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Current Phase</h3>
                  <p className="text-2xl font-bold text-gray-600">Phase 2</p>
                  <p className="text-sm text-gray-600">Intermediate Concepts</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Completed Lessons</h3>
                  <p className="text-2xl font-bold text-gray-600">{activeRoadmap.roadmap.progress.completedSessions}/{activeRoadmap.roadmap.progress.totalSessions}</p>
                  <p className="text-sm text-gray-600">{Math.round((activeRoadmap.roadmap.progress.completedSessions / activeRoadmap.roadmap.progress.totalSessions) * 100)}% Complete</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Next Session</h3>
                  <p className="text-2xl font-bold text-gray-600">Tomorrow</p>
                  <p className="text-sm text-gray-600">2:00 PM - 3:00 PM</p>
                </div>
              </div>

              {/* Roadmap Phases */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Phases</h3>
                <div className="space-y-4">
                  {activeRoadmap.roadmap.phases?.map((phase, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{phase.title}</h4>
                          <p className="text-sm text-gray-600">{phase.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">{phase.status === 'completed' ? 100 : phase.status === 'active' ? 50 : 0}%</span>
                          <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                            <div
                              className="h-2 bg-yellow-600 rounded-full"
                              style={{ width: `${phase.status === 'completed' ? 100 : phase.status === 'active' ? 50 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Roadmap</h3>
              <p className="text-gray-600 mb-4">Create your learning roadmap to get started</p>
              <button
                onClick={() => navigate('/dashboard/student/roadmap/create')}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Create Roadmap
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}