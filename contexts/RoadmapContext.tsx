'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Roadmap, StudentRoadmap, LiveSession } from '@/types';
import {
  mockRoadmaps,
  mockStudentRoadmaps,
  getRoadmapById,
  getRoadmapsByStudent,
  mockLiveSessions
} from '@/data';
import { useAuth } from './AuthContext';

interface RoadmapContextType {
  roadmaps: Roadmap[];
  studentRoadmaps: StudentRoadmap[];
  liveSessions: LiveSession[];
  isLoading: boolean;
  error: string | null;
  getRoadmapByIdFromContext: (id: string) => Roadmap | undefined;
  getStudentRoadmapsByStudentId: (studentId: string) => StudentRoadmap[];
  getStudentRoadmaps: () => StudentRoadmap[];
  getUpcomingLiveSessions: () => LiveSession[];
  refreshRoadmaps: () => Promise<void>;
  refreshStudentRoadmaps: () => Promise<void>;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export function RoadmapProvider({ children }: { children: React.ReactNode }) {
  const { user: currentUser, hasPermission } = useAuth();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [studentRoadmaps, setStudentRoadmaps] = useState<StudentRoadmap[]>([]);
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load roadmaps based on user permissions
  const loadRoadmaps = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!currentUser) {
        setRoadmaps([]);
        return;
      }

      let filteredRoadmaps: Roadmap[] = [];

      if (currentUser.role === 'student') {
        // Students can only see their own roadmaps
        filteredRoadmaps = mockRoadmaps.filter(roadmap =>
          roadmap.studentId === currentUser.id
        );
      } else if (currentUser.role === 'trainer') {
        // Trainers can see roadmaps they helped create or are assigned to
        filteredRoadmaps = mockRoadmaps.filter(roadmap =>
          roadmap.trainerId === currentUser.id
        );
      } else if (currentUser.role === 'mentor') {
        // Mentors can see roadmaps they need to approve or have approved
        filteredRoadmaps = mockRoadmaps.filter(roadmap =>
          roadmap.mentorId === currentUser.id
        );
      } else if (currentUser.role === 'field-admin') {
        // Field admins can see roadmaps of students in their field
        filteredRoadmaps = mockRoadmaps; // Would filter by field
      } else if (currentUser.role === 'umbrella-admin') {
        // Umbrella admin can see all roadmaps
        filteredRoadmaps = mockRoadmaps;
      }

      setRoadmaps(filteredRoadmaps);
    } catch (err) {
      setError('Failed to load roadmaps');
      console.error('Error loading roadmaps:', err);
    }
  };

  // Load student roadmaps (enrollment records) based on user permissions
  const loadStudentRoadmaps = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!currentUser) {
        setStudentRoadmaps([]);
        return;
      }

      let filteredStudentRoadmaps: StudentRoadmap[] = [];

      if (currentUser.role === 'student') {
        // Students can only see their own enrollment records
        filteredStudentRoadmaps = mockStudentRoadmaps.filter(roadmap =>
          roadmap.studentId === currentUser.id
        );
      } else if (currentUser.role === 'trainer') {
        // Trainers can see student roadmaps they're involved with
        filteredStudentRoadmaps = mockStudentRoadmaps.filter(roadmap =>
          roadmap.roadmap.trainerId === currentUser.id
        );
      } else if (currentUser.role === 'mentor') {
        // Mentors can see student roadmaps they need to approve or have approved
        filteredStudentRoadmaps = mockStudentRoadmaps.filter(roadmap =>
          roadmap.roadmap.mentorId === currentUser.id
        );
      } else if (currentUser.role === 'field-admin') {
        // Field admins can see student roadmaps in their field
        filteredStudentRoadmaps = mockStudentRoadmaps; // Would filter by field
      } else if (currentUser.role === 'umbrella-admin') {
        // Umbrella admin can see all student roadmaps
        filteredStudentRoadmaps = mockStudentRoadmaps;
      }

      setStudentRoadmaps(filteredStudentRoadmaps);

      // Load live sessions from mock data
      setLiveSessions(mockLiveSessions || []);

    } catch (err) {
      setError('Failed to load student roadmaps');
      console.error('Error loading student roadmaps:', err);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await Promise.all([loadRoadmaps(), loadStudentRoadmaps()]);
    } catch (err) {
      setError('Failed to load roadmap data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadData();
    } else {
      setRoadmaps([]);
      setStudentRoadmaps([]);
      setLiveSessions([]);
      setIsLoading(false);
    }
  }, [currentUser]);

  const getRoadmapByIdFromContext = (id: string): Roadmap | undefined => {
    return roadmaps.find(roadmap => roadmap.id === id);
  };

  const getStudentRoadmapsByStudentId = (studentId: string): StudentRoadmap[] => {
    return studentRoadmaps.filter(roadmap => roadmap.studentId === studentId);
  };

  const getStudentRoadmaps = (): StudentRoadmap[] => {
    if (currentUser?.role === 'student') {
      return studentRoadmaps.filter(roadmap => roadmap.studentId === currentUser.id);
    }
    return studentRoadmaps;
  };

  const getUpcomingLiveSessions = (): LiveSession[] => {
    return liveSessions.filter(session =>
      session.status === 'scheduled' &&
      new Date(session.scheduledAt) > new Date()
    );
  };

  const refreshRoadmaps = async () => {
    await loadRoadmaps();
  };

  const refreshStudentRoadmaps = async () => {
    await loadStudentRoadmaps();
  };

  const value: RoadmapContextType = {
    roadmaps,
    studentRoadmaps,
    liveSessions,
    isLoading,
    error,
    getRoadmapByIdFromContext,
    getStudentRoadmapsByStudentId,
    getStudentRoadmaps,
    getUpcomingLiveSessions,
    refreshRoadmaps,
    refreshStudentRoadmaps
  };

  return (
    <RoadmapContext.Provider value={value}>
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmaps() {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmaps must be used within a RoadmapProvider');
  }
  return context;
}