'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Roadmap, StudentRoadmap, LiveSession } from '@/types';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';
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
  const { user: currentUser } = useAuth();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [studentRoadmaps, setStudentRoadmaps] = useState<StudentRoadmap[]>([]);
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRoadmaps = async () => {
    try {
      const response = await apiClient.get<{ success: boolean; data: Roadmap[] }>(API_ENDPOINTS.ROADMAPS);
      setRoadmaps(response.data ?? []);
    } catch {
      setError('Failed to load roadmaps');
    }
  };

  const loadStudentRoadmaps = async () => {
    try {
      const response = await apiClient.get<{ success: boolean; data: StudentRoadmap[] }>(API_ENDPOINTS.ROADMAPS);
      setStudentRoadmaps(response.data ?? []);
    } catch {
      setError('Failed to load student roadmaps');
    }
  };

  const loadLiveSessions = async () => {
    try {
      const response = await apiClient.get<{ success: boolean; data: LiveSession[] }>(API_ENDPOINTS.SESSIONS);
      setLiveSessions(response.data ?? []);
    } catch {
      setError('Failed to load sessions');
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await Promise.all([loadRoadmaps(), loadStudentRoadmaps(), loadLiveSessions()]);
    } catch {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const getRoadmapByIdFromContext = (id: string) => roadmaps.find(r => r.id === id);

  const getStudentRoadmapsByStudentId = (studentId: string) =>
    studentRoadmaps.filter(r => r.studentId === studentId);

  const getStudentRoadmaps = () => {
    if (currentUser?.role === 'student') {
      return studentRoadmaps.filter(r => r.studentId === currentUser.id);
    }
    return studentRoadmaps;
  };

  const getUpcomingLiveSessions = () =>
    liveSessions.filter(s => s.status === 'scheduled' && new Date(s.scheduledAt) > new Date());

  return (
    <RoadmapContext.Provider value={{
      roadmaps, studentRoadmaps, liveSessions, isLoading, error,
      getRoadmapByIdFromContext, getStudentRoadmapsByStudentId,
      getStudentRoadmaps, getUpcomingLiveSessions,
      refreshRoadmaps: loadRoadmaps,
      refreshStudentRoadmaps: loadStudentRoadmaps,
    }}>
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmaps() {
  const context = useContext(RoadmapContext);
  if (!context) throw new Error('useRoadmaps must be used within a RoadmapProvider');
  return context;
}
