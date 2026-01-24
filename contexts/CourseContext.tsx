'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, StudentRoadmap, LiveSession } from '@/types';
import { 
  mockCourses, 
  mockStudentRoadmaps,
  getCourseById,
  getRoadmapByStudentId,
  getActiveRoadmaps 
} from '@/data';
import { useAuth } from './AuthContext';

interface CourseContextType {
  courses: Course[];
  roadmaps: StudentRoadmap[];
  liveSessions: LiveSession[];
  isLoading: boolean;
  error: string | null;
  getCourseByIdFromContext: (id: string) => Course | undefined;
  getRoadmapByStudentIdFromContext: (studentId: string) => StudentRoadmap | undefined;
  getStudentRoadmaps: () => StudentRoadmap[];
  getUpcomingLiveSessions: () => LiveSession[];
  refreshCourses: () => Promise<void>;
  refreshRoadmaps: () => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const { user: currentUser, hasPermission } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [roadmaps, setRoadmaps] = useState<StudentRoadmap[]>([]);
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load courses based on user permissions
  const loadCourses = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!currentUser) {
        setCourses([]);
        return;
      }

      // All authenticated users can see courses
      setCourses(mockCourses);
    } catch (err) {
      setError('Failed to load courses');
      console.error('Error loading courses:', err);
    }
  };

  // Load roadmaps based on user permissions
  const loadRoadmaps = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!currentUser) {
        setRoadmaps([]);
        return;
      }

      let filteredRoadmaps: StudentRoadmap[] = [];

      if (currentUser.role === 'student') {
        // Students can only see their own roadmaps
        filteredRoadmaps = mockStudentRoadmaps.filter(roadmap => 
          roadmap.studentId === currentUser.id
        );
      } else if (currentUser.role === 'trainer') {
        // Trainers can see roadmaps of students in their wing
        // In a real app, this would be filtered by assigned students
        filteredRoadmaps = mockStudentRoadmaps.filter(roadmap => {
          // Get student info and check if they're in the same wing
          const student = mockStudentRoadmaps.find(r => r.studentId === roadmap.studentId);
          return true; // For now, show all - would filter by assigned students
        });
      } else if (currentUser.role === 'mentor') {
        // Mentors can see roadmaps for courses they mentor
        const mentorCourseIds = mockCourses
          .filter(course => course.mentor.id === currentUser.id)
          .map(course => course.id);
        
        filteredRoadmaps = mockStudentRoadmaps.filter(roadmap => 
          mentorCourseIds.includes(roadmap.courseId)
        );
      } else if (currentUser.role === 'wing-admin') {
        // Wing admins can see roadmaps of students in their wing
        filteredRoadmaps = mockStudentRoadmaps; // Would filter by wing
      } else if (currentUser.role === 'umbrella-admin') {
        // Umbrella admin can see all roadmaps
        filteredRoadmaps = mockStudentRoadmaps;
      }

      setRoadmaps(filteredRoadmaps);

      // Extract live sessions from roadmaps
      const allLiveSessions: LiveSession[] = [];
      filteredRoadmaps.forEach(roadmap => {
        allLiveSessions.push(...roadmap.notifications.upcomingLiveSessions);
      });
      setLiveSessions(allLiveSessions);

    } catch (err) {
      setError('Failed to load roadmaps');
      console.error('Error loading roadmaps:', err);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await Promise.all([loadCourses(), loadRoadmaps()]);
    } catch (err) {
      setError('Failed to load course data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadData();
    } else {
      setCourses([]);
      setRoadmaps([]);
      setLiveSessions([]);
      setIsLoading(false);
    }
  }, [currentUser]);

  const getCourseByIdFromContext = (id: string): Course | undefined => {
    return courses.find(course => course.id === id);
  };

  const getRoadmapByStudentIdFromContext = (studentId: string): StudentRoadmap | undefined => {
    return roadmaps.find(roadmap => roadmap.studentId === studentId);
  };

  const getStudentRoadmaps = (): StudentRoadmap[] => {
    if (currentUser?.role === 'student') {
      return roadmaps.filter(roadmap => roadmap.studentId === currentUser.id);
    }
    return roadmaps;
  };

  const getUpcomingLiveSessions = (): LiveSession[] => {
    return liveSessions.filter(session => 
      session.status === 'scheduled' && 
      new Date(session.scheduledDate) > new Date()
    );
  };

  const refreshCourses = async () => {
    await loadCourses();
  };

  const refreshRoadmaps = async () => {
    await loadRoadmaps();
  };

  const value: CourseContextType = {
    courses,
    roadmaps,
    liveSessions,
    isLoading,
    error,
    getCourseByIdFromContext,
    getRoadmapByStudentIdFromContext,
    getStudentRoadmaps,
    getUpcomingLiveSessions,
    refreshCourses,
    refreshRoadmaps
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}