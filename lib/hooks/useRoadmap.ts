'use client';

import { useState, useEffect } from 'react';
import { StudentRoadmap } from '@/types';
import { sampleStudentRoadmap } from '@/lib/data/roadmap-sample';

// Simple hook to manage roadmap state
// In a real app, this would connect to your backend API
export function useRoadmap() {
  const [roadmap, setRoadmap] = useState<StudentRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading roadmap data
    const loadRoadmap = async () => {
      try {
        setIsLoading(true);
        
        // Check if user has a roadmap (simulate API call)
        const hasRoadmap = localStorage.getItem('hasRoadmap') === 'true';
        
        if (hasRoadmap) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          setRoadmap(sampleStudentRoadmap);
        } else {
          setRoadmap(null);
        }
      } catch (err) {
        setError('Failed to load roadmap');
      } finally {
        setIsLoading(false);
      }
    };

    loadRoadmap();
  }, []);

  const createRoadmap = (newRoadmap: StudentRoadmap) => {
    setRoadmap(newRoadmap);
    localStorage.setItem('hasRoadmap', 'true');
  };

  const updateRoadmapProgress = (updates: Partial<StudentRoadmap>) => {
    if (roadmap) {
      setRoadmap({ ...roadmap, ...updates });
    }
  };

  return {
    roadmap,
    isLoading,
    error,
    createRoadmap,
    updateRoadmapProgress,
    hasRoadmap: roadmap !== null
  };
}