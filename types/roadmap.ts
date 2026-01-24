// Roadmap and student learning journey type definitions

import { Course } from './course';
import { Subscription } from './payment';
import { LiveSession, Assignment, Material } from './course';

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
  subscription: Subscription;
  lastAccessedAt?: string;
  currentActivity?: {
    type: 'lesson' | 'live-session' | 'assignment';
    id: string;
    title: string;
  };
  notifications: {
    upcomingLiveSessions: LiveSession[];
    overdueAssignments: Assignment[];
    newContent: Material[];
  };
}