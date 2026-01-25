// Live session and learning activity type definitions

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  trainerId: string;
  trainerName: string;
  trainerAvatar?: string;
  studentIds: string[];
  roadmapId?: string; // Optional link to roadmap
  sessionId?: string; // Optional link to roadmap session
  scheduledAt: string;
  duration: number; // in hours
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  meetingLink?: string;
  recordingUrl?: string;
  materials: Material[];
  objectives: string[];
  maxParticipants: number;
  actualParticipants?: number;
  feedback?: SessionFeedback[];
}

export interface Material {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'presentation' | 'code';
  url: string;
  description?: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface SessionFeedback {
  id: string;
  sessionId: string;
  studentId: string;
  rating: number; // 1-5
  comment?: string;
  submittedAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  roadmapId: string;
  phaseId: string;
  sessionId?: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'reviewed' | 'completed';
  submissionUrl?: string;
  feedback?: string;
  grade?: number;
}