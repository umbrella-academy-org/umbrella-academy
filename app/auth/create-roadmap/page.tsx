'use client';

import { useRouter } from 'next/navigation';
import RoadmapBuilder from '@/components/roadmap/RoadmapBuilder';
import { useRoadmap } from '@/lib/hooks/useRoadmap';

export default function AuthCreateRoadmapPage() {
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
      courseId: 'custom-course',
      course: {
        id: 'custom-course',
        title: roadmapData.goal,
        description: `Custom learning path: ${roadmapData.goal}`,
        category: 'Custom Learning',
        level: 'beginner' as const,
        estimatedDuration: roadmapData.totalEstimatedWeeks,
        rating: 5,
        totalStudents: 1,
        thumbnail: '',
        tags: ['Custom', 'Self-Paced'],
        skills: [],
        mentor: {
          id: 'mentor-1',
          name: 'Your Mentor',
          avatar: '',
          expertise: ['Custom Learning'],
          rating: 5,
          totalStudents: 1
        },
        phases: roadmapData.phases.map((phase, index) => ({
          id: `phase-${index + 1}`,
          title: phase.title,
          description: phase.description,
          order: phase.order,
          estimatedDuration: phase.estimatedWeeks,
          status: index === 0 ? 'available' as const : 'locked' as const,
          progress: 0,
          lessons: [
            {
              id: `lesson-${index + 1}-1`,
              title: `${phase.title} - Getting Started`,
              description: `Introduction to ${phase.title}`,
              order: 1,
              estimatedDuration: 60,
              status: index === 0 ? 'available' as const : 'locked' as const,
              progress: 0,
              type: 'theory' as const,
              liveSessions: [],
              content: {}
            }
          ]
        })),
        progress: {
          currentPhaseId: 'phase-1',
          currentLessonId: 'lesson-1-1',
          overallProgress: 0,
          completedPhases: 0,
          totalPhases: roadmapData.phases.length,
          completedLessons: 0,
          totalLessons: roadmapData.phases.length,
          totalLiveSessions: 0,
          attendedLiveSessions: 0,
          missedLiveSessions: 0
        }
      },
      enrolledAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      expectedCompletionDate: new Date(Date.now() + roadmapData.totalEstimatedWeeks * 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active' as const,
      subscription: {
        planId: 'custom-plan',
        planName: 'Custom Learning Plan',
        amount: 0,
        currency: 'USD',
        billingC