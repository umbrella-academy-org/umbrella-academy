// Course and learning-related type definitions

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'code';
  url: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

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
  materials?: Material[];
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
  content?: {
    videoUrl?: string;
    materials?: Material[];
    assignments?: Assignment[];
  };
  liveSessions: LiveSession[];
  prerequisites?: string[]; // lesson IDs
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
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
  lessons: Lesson[];
  requirements?: {
    minimumLessonsCompleted: number;
    minimumGrade?: number;
    requiredAssignments?: string[];
  };
  milestones?: Milestone[];
}

export interface Mentor {
  id: string;
  name: string;
  avatar?: string;
  expertise: string[];
  rating: number;
  totalStudents: number;
}

export interface CourseProgress {
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
  thumbnail?: string;
  tags: string[];
  skills: string[];
  mentor: Mentor;
  phases: Phase[];
  progress: CourseProgress;
}