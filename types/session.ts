// Live session and collaborative roadmap creation type definitions

export interface CollaborativeSession {
  id: string;
  trainerId: string;
  studentId: string;
  wingId: string;
  scheduledAt: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  screenSharingUrl?: string;
  roadmapData?: RoadmapFormData;
  duration: number; // in minutes
  notes?: string;
  createdAt: Date;
}

export interface RoadmapFormData {
  studentGoals: string[];
  learningPath: LearningModule[];
  timeline: TimelineItem[];
  assessmentCriteria: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  prerequisites: string[];
  resources: LearningResource[];
  order: number;
}

export interface TimelineItem {
  id: string;
  moduleId: string;
  startDate: Date;
  endDate: Date;
  milestones: string[];
  status: 'pending' | 'active' | 'completed';
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'video' | 'document' | 'exercise' | 'project';
  url: string;
  description?: string;
}

// Live Session Interface Props
export interface LiveSessionProps {
  sessionId: string;
  trainerId: string;
  studentId: string;
  screenSharingEnabled: boolean;
  roadmapForm: RoadmapFormData;
}