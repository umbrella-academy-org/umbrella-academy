// Roadmap and student learning journey type definitions

import { Subscription } from './payment';

export interface Session {
  id: string;
  title: string;
  description: string;
  duration: number; // in hours
  scheduledAt?: string;
  completedAt?: string;
  status: 'pending' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  liveSessionId?: string; // Link to actual live session
  materials: string[]; // URLs or file paths
  objectives: string[];
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  estimatedHours: number;
  status: 'pending' | 'active' | 'completed';
  sessions: Session[]; // Auto-generated based on student availability
  prerequisites?: string[]; // Phase IDs that must be completed first
  order: number;
}

export interface RoadmapCollaboration {
  id: string;
  roadmapId: string;
  collaborators: {
    studentId: string;
    trainerId: string;
  };
  createdAt: string;
  lastEditedAt: string;
  editHistory: {
    timestamp: string;
    userId: string;
    action: 'created' | 'updated' | 'added_phase' | 'removed_phase' | 'updated_phase';
    details: string;
  }[];
  status: 'active' | 'completed';
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  studentId: string;
  trainerId?: string; // Trainer who helped create it
  status: 'draft' | 'pending-approval' | 'approved' | 'active' | 'paused' | 'completed' | 'rejected';
  createdAt: string;
  approvedAt?: string;
  startedAt?: string;
  completedAt?: string;
  estimatedDuration: number;
  phases: RoadmapPhase[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  collaborationId?: string;
  approvalNotes?: string;
  progress: {
    overallProgress: number; // 0-100
    completedPhases: number;
    totalPhases: number;
    completedSessions: number;
    totalSessions: number;
    hoursCompleted: number;
    totalEstimatedHours: number;
  };
}

export interface StudentRoadmap {
  id: string;
  studentId: string;
  roadmapId: string;
  roadmap: Roadmap;
  enrolledAt: string;
  startedAt?: string;
  expectedCompletionDate?: string;
  actualCompletionDate?: string;
  status: 'enrolled' | 'active' | 'paused' | 'completed' | 'cancelled';
  subscription: Subscription;
  lastAccessedAt?: string;
  currentActivity?: {
    type: 'session' | 'live-session';
    id: string;
    title: string;
  };
  notifications: {
    upcomingSessions: Session[];
    overdueAssignments: string[];
    newContent: string[];
  };
}