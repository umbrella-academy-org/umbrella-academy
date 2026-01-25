'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import RoadmapBuilder from '@/components/roadmap/RoadmapBuilder';
import { useRoadmap } from '@/lib/hooks/useRoadmap';

export default function CreateRoadmapPage() {
  const router = useRouter();
  const { createRoadmap } = useRoadmap();

  const handleRoadmapSave = (roadmapData: {
    goal: string;
    phases: any[];
    totalEstimatedWeeks: number;
  }) => {
    // Create a mock roadmap based on student input
    const newRoadmap = {
      id: `roadmap-${Date.now()}`,
      studentId: 'current-student',
      roadmapId: `roadmap-${Date.now()}`,
      roadmap: {
        id: `roadmap-${Date.now()}`,
        title: roadmapData.goal,
        description: `Custom learning path: ${roadmapData.goal}`,
        studentId: 'current-student',
        status: 'draft' as const,
        createdAt: new Date().toISOString(),
        estimatedDuration: roadmapData.totalEstimatedWeeks,
        phases: roadmapData.phases.map((phase, index) => ({
          id: `phase-${index + 1}`,
          title: phase.title,
          description: phase.description,
          objectives: [`Learn ${phase.title}`, `Master ${phase.title} concepts`],
          estimatedHours: phase.estimatedWeeks * 10, // Assume 10 hours per week
          status: index === 0 ? 'active' as const : 'pending' as const,
          sessions: [
            {
              id: `session-${index + 1}-1`,
              title: `${phase.title} - Getting Started`,
              description: `Introduction to ${phase.title}`,
              duration: 2, // 2 hours
              status: 'pending' as const,
              materials: [],
              objectives: [`Understand ${phase.title} basics`],
            }
          ],
          order: index + 1,
        })),
        tags: ['Custom', 'Self-Paced'],
        difficulty: 'beginner' as const,
        progress: {
          overallProgress: 0,
          completedPhases: 0,
          totalPhases: roadmapData.phases.length,
          completedSessions: 0,
          totalSessions: roadmapData.phases.length,
          hoursCompleted: 0,
          totalEstimatedHours: roadmapData.totalEstimatedWeeks * 10,
        },
      },
      enrolledAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      expectedCompletionDate: new Date(Date.now() + roadmapData.totalEstimatedWeeks * 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active' as const,
      subscription: {
        planId: 'custom-plan',
        planName: 'Custom Learning Plan',
        amount: 0,
        currency: 'RWF' as const,
        billingCycle: 'yearly' as const,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active' as const,
        autoRenew: false
      },
      lastAccessedAt: new Date().toISOString(),
      currentActivity: {
        type: 'session' as const,
        id: 'session-1-1',
        title: `${roadmapData.phases[0]?.title} - Getting Started`
      },
      notifications: {
        upcomingSessions: [],
        overdueAssignments: [],
        newContent: []
      }
    };

    // Save the roadmap
    createRoadmap(newRoadmap);
    
    // Redirect to the main roadmap page
    router.push('/dashboard/student/roadmap');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Roadmap" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header breadcrumb="Create Roadmap" />

        {/* Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <RoadmapBuilder onSave={handleRoadmapSave} />
          </div>
        </main>
      </div>
    </div>
  );
}