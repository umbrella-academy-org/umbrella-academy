import { BaseUser } from "./user";

export type RoadmapStatus = 'draft' | 'pending-approval' | 'approved' | 'active' | 'paused' | 'completed' | 'rejected';
export type PhaseStatus = 'pending' | 'active' | 'completed';
export type SessionStatus = 'pending' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export enum BookingStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed'
}

export enum RoadmapStepStatus {
  LOCKED = 'locked',
  ACTIVE = 'active',
  PENDING_APPROVAL = 'pending-approval',
  COMPLETED = 'completed'
}

export interface OrientationBooking {
  id: string;
  studentId: string;
  trainerId: string;
  requestedTime: Date;
  alternativeTime?: Date;
  learningGoals: string;
  status: BookingStatus;
  rejectionReason?: string;
  meetingLink?: string;
  createdAt: Date;
}

export interface StudentBookingRequest {
  trainerId: string;
  requestedTime: Date;
  learningGoals: string;
}

export interface Milestone {
  title: string;
  description: string;
  skillsToLearn: string[];
  tasks: string[];
  requiredProjects: string[];
  estimatedDurationDays: number;
  order: number;
  status: RoadmapStepStatus;
  completedAt: Date | null;
  trainerFeedback?: string;
}

export interface Roadmap {
  id: string;
  student: BaseUser;
  trainer: BaseUser;
  title: string;
  status: RoadmapStatus;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  milestones: Milestone[];
  createdAt: Date;
  updatedAt: Date;
}

