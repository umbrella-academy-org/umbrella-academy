// Centralized type definitions for Umbrella Academy LMS

// ============================================================================
// USER TYPES
// ============================================================================

export type UserType = 'student' | 'trainer' | 'mentor' | 'wing-admin' | 'umbrella-admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserType;
  wing?: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  avatar?: string;
}

// ============================================================================
// ROADMAP TYPES
// ============================================================================

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

// ============================================================================
// SUBSCRIPTION & PAYMENT TYPES
// ============================================================================

export interface Subscription {
  planId: string;
  planName: string;
  amount: number;
  currency: 'RWF'; // Rwandan Francs
  billingCycle: 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  status: 'active' | 'cancelled' | 'expired';
  autoRenew: boolean;
}

export interface Transaction {
  id: string;
  type: 'income' | 'withdrawal' | 'payment';
  description: string;
  amount: number;
  currency: 'RWF';
  date: string;
  status: 'pending' | 'completed' | 'failed';
  reference?: string;
}

export interface Wallet {
  id: string;
  ownerId: string;
  ownerType: 'trainer' | 'wing' | 'umbrella';
  balance: number;
  currency: 'RWF';
  transactions: Transaction[];
}

// ============================================================================
// ROADMAP & STUDENT TYPES
// ============================================================================

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

// ============================================================================
// ADMIN TYPES
// ============================================================================

export interface Wing {
  id: string;
  name: string;
  code: string;
  adminId: string;
  adminName: string;
  students: number;
  trainers: number;
  revenue: number;
  status: 'active' | 'maintenance' | 'inactive';
  settings: {
    maxStudentsPerTrainer: number;
    minHoursPerWeek: number;
    wingSharePercentage: number;
    bankAccount?: string;
  };
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  wingId: string;
  capacity: number; // hours per week
  assigned: number; // current students
  available: number; // available slots
  status: 'active' | 'full' | 'inactive';
  rating?: number;
  totalSessions?: number;
  wallet: Wallet;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  wingId: string;
  trainerId?: string;
  trainerName?: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  lastSession?: string;
  roadmap?: StudentRoadmap;
}

// ============================================================================
// SYSTEM TYPES
// ============================================================================

export interface SystemMetric {
  name: string;
  value: string;
  status: 'healthy' | 'warning' | 'error';
  icon: string;
}

export interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  time: string;
  severity: 'low' | 'medium' | 'high';
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
  badge?: string;
}

export interface SidebarProps {
  activeItem?: string;
  userType?: UserType;
}

export interface RoadmapBuilderProps {
  onSave: (roadmapData: {
    goal: string;
    phases: Phase[];
    totalEstimatedWeeks: number;
  }) => void;
}

export interface FormError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: FormError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'date' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type PhaseStatus = Phase['status'];
export type LessonStatus = Lesson['status'];
export type LiveSessionStatus = LiveSession['status'];
export type CourseLevel = Course['level'];
export type RoadmapStatus = StudentRoadmap['status'];
export type Currency = 'RWF';