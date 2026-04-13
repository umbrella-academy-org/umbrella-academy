import { useState } from 'react';
import { Roadmap } from '@/types';
import { useRoadmaps, useAuth } from '@/contexts';

interface CreateRoadmapData {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
  tags: string[];
  studentId: string;
  trainerId?: string;
}

interface UseCreateRoadmapReturn {
  createRoadmap: (data: CreateRoadmapData) => Promise<Roadmap | null>;
  isLoading: boolean;
  error: string | null;
}

export function useCreateRoadmap(): UseCreateRoadmapReturn {
  const { refreshRoadmaps } = useRoadmaps();
  const { hasPermission } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRoadmap = async (data: CreateRoadmapData): Promise<Roadmap | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check permissions
      if (!hasPermission('manage_roadmaps') && !hasPermission('manage_system')) {
        throw new Error('Insufficient permissions to create roadmaps');
      }

      // Validate required fields
      if (!data.title.trim()) {
        throw new Error('Roadmap title is required');
      }
      if (!data.description.trim()) {
        throw new Error('Roadmap description is required');
      }
      if (data.estimatedDuration <= 0) {
        throw new Error('Roadmap duration must be greater than 0');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Create new roadmap object
      const newRoadmap: Roadmap = {
        id: `roadmap_${Date.now()}`,
        title: data.title,
        description: data.description,
        studentId: data.studentId,
        trainerId: data.trainerId,
        status: 'draft',
        createdAt: new Date().toISOString().split('T')[0],
        estimatedDuration: data.estimatedDuration,
        phases: [],
        tags: data.tags,
        difficulty: data.difficulty,
        progress: {
          overallProgress: 0,
          completedPhases: 0,
          totalPhases: 0,
          completedSessions: 0,
          totalSessions: 0,
          hoursCompleted: 0,
          totalEstimatedHours: 0
        }
      };

      // In a real app, this would make an API call
      console.log('Creating roadmap:', newRoadmap);

      // Refresh roadmaps list
      await refreshRoadmaps();

      return newRoadmap;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create roadmap';
      setError(errorMessage);
      console.error('Create roadmap error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createRoadmap,
    isLoading,
    error
  };
}

// Keep the old export name for backward compatibility
export const useCreateCourse = useCreateRoadmap;