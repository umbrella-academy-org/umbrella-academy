'use client';

import { useRouter } from 'next/navigation';

import RoadmapBuilder from '@/components/roadmap/RoadmapBuilder';
import { useRoadmap } from '@/lib/hooks/useRoadmap';
import Image from 'next/image';

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

    // Redirect to the pending approval page
    router.push('/auth/student/pending-roadmap');
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-900 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="flex flex-col items-center flex-1">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-amber-900 mb-2">
              Create Your Roadmap
            </h1>
            <p className="text-gray-500 mb-8 text-center max-w-md">
              Customize your learning journey by setting goals and breaking them into achievable phases.
            </p>

            {/* Roadmap Builder Component */}
            <div className="w-full">
              <RoadmapBuilder onSave={handleRoadmapSave} />
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 py-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-8 h-2 bg-amber-600 rounded-full"></div>
              ))}
              <div className="w-8 h-2 bg-amber-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 text-center">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/real/image.jpeg"
          alt="Abstract design"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}