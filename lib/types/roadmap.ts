// Roadmap data types for Umbrella Academy

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  scheduledDate: string;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'missed';
  meetingLink?: string;
  recordingUrl?: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar?: string;
  participants?: number;
  maxParticipants?: number;
  materials?: {
    id: string;
    title: string;
    type: 'pdf' | 'video' | 'link' | 'code';
    url: string;
  }[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedDuration: number; // in minutes
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  completedAt?: string;
  progress: number; // 0-100
  type: 'theory' | 'practical' | 'project' | 'assessment';
  
  // Content
  content?: {
    videoUrl?: string;
    materials?: {
      id: string;
      title: string;
      type: 'pdf' | 'video' | 'link' | 'code';
      url: string;
    }[];
    assignments?: {
      id: string;
      title: string;
      description: string;
      dueDate?: string;
      status: 'pending' | 'submitted' | 'graded';
      grade?: number;
    }[];
  };
  
  // Live sessions for this lesson
  liveSessions: LiveSession[];
  
  // Prerequisites
  prerequisites?: string[]; // lesson IDs
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedDuration: number; // in weeks
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
  progress: number; // 0-100
  
  // Lessons in this phase
  lessons: Lesson[];
  
  // Phase requirements
  requirements?: {
    minimumLessonsCompleted: number;
    minimumGrade?: number;
    requiredAssignments?: string[];
  };
  
  // Milestones
  milestones?: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    completedAt?: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in weeks
  rating: number;
  totalStudents: number;
  
  // Course metadata
  thumbnail?: string;
  tags: string[];
  skills: string[];
  
  // Mentor information
  mentor: {
    id: string;
    name: string;
    avatar?: string;
    expertise: string[];
    rating: number;
    totalStudents: number;
  };
  
  // Course structure
  phases: Phase[];
  
  // Progress tracking
  progress: {
    currentPhaseId?: string;
    currentLessonId?: string;
    overallProgress: number; // 0-100
    completedPhases: number;
    totalPhases: number;
    completedLessons: number;
    totalLessons: number;
    totalLiveSessions: number;
    attendedLiveSessions: number;
    missedLiveSessions: number;
  };
}

export interface StudentRoadmap {
  id: string;
  studentId: string;
  courseId: string;
  course: Course;
  enrolledAt: string;
  startedAt?: string;
  expectedCompletionDate?: string;
  actualCompletionDate?: string;
  status: 'enrolled' | 'active' | 'paused' | 'completed' | 'cancelled';
  
  // Payment information
  subscription: {
    planId: string;
    planName: string;
    amount: number;
    currency: string;
    billingCycle: 'monthly' | 'yearly';
    startDate: string;
    endDate: string;
    status: 'active' | 'cancelled' | 'expired';
    autoRenew: boolean;
  };
  
  // Progress tracking
  lastAccessedAt?: string;
  currentActivity?: {
    type: 'lesson' | 'live-session' | 'assignment';
    id: string;
    title: string;
  };
  
  // Notifications
  notifications: {
    upcomingLiveSessions: LiveSession[];
    overdueAssignments: any[];
    newContent: any[];
  };
}

// Utility types for components
export type PhaseStatus = Phase['status'];
export type LessonStatus = Lesson['status'];
export type LiveSessionStatus = LiveSession['status'];
export type CourseLevel = Course['level'];
export type RoadmapStatus = StudentRoadmap['status'];