import { useState } from 'react';
import { Course, CourseLevel } from '@/types';
import { useCourses, useAuth } from '@/contexts';

interface CreateCourseData {
  title: string;
  description: string;
  category: string;
  level: CourseLevel;
  estimatedDuration: number;
  tags: string[];
  skills: string[];
  mentorId: string;
}

interface UseCreateCourseReturn {
  createCourse: (data: CreateCourseData) => Promise<Course | null>;
  isLoading: boolean;
  error: string | null;
}

export function useCreateCourse(): UseCreateCourseReturn {
  const { refreshCourses } = useCourses();
  const { hasPermission } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCourse = async (data: CreateCourseData): Promise<Course | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check permissions
      if (!hasPermission('manage_courses') && !hasPermission('manage_system')) {
        throw new Error('Insufficient permissions to create courses');
      }

      // Validate required fields
      if (!data.title.trim()) {
        throw new Error('Course title is required');
      }
      if (!data.description.trim()) {
        throw new Error('Course description is required');
      }
      if (data.estimatedDuration <= 0) {
        throw new Error('Course duration must be greater than 0');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Create new course object
      const newCourse: Course = {
        id: `course_${Date.now()}`,
        title: data.title,
        description: data.description,
        category: data.category,
        level: data.level,
        estimatedDuration: data.estimatedDuration,
        rating: 0,
        totalStudents: 0,
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
        tags: data.tags,
        skills: data.skills,
        mentor: {
          id: data.mentorId,
          name: 'New Mentor', // Would be fetched from mentor data
          expertise: data.skills,
          rating: 0,
          totalStudents: 0
        },
        phases: [],
        progress: {
          currentPhaseId: undefined,
          currentLessonId: undefined,
          overallProgress: 0,
          completedPhases: 0,
          totalPhases: 0,
          completedLessons: 0,
          totalLessons: 0,
          totalLiveSessions: 0,
          attendedLiveSessions: 0,
          missedLiveSessions: 0
        }
      };

      // In a real app, this would make an API call
      console.log('Creating course:', newCourse);

      // Refresh courses list
      await refreshCourses();

      return newCourse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create course';
      setError(errorMessage);
      console.error('Create course error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCourse,
    isLoading,
    error
  };
}