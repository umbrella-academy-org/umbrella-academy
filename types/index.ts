// Centralized type exports for Umbrella Academy LMS

// User types
export * from './user';

// Live session and learning activity types
export * from './course';

// Payment and subscription types
export * from './payment';

// Roadmap types
export * from './roadmap';

// Admin and organizational types
export * from './admin';

// System monitoring types
export * from './system';

// Component props types
export * from './components';

// Form component types
export * from './forms';

// Utility types
export type SessionStatus = 'pending' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export type LiveSessionStatus = 'scheduled' | 'live' | 'completed' | 'cancelled';
export type RoadmapStatus = 'draft' | 'pending-approval' | 'approved' | 'active' | 'paused' | 'completed' | 'rejected';
export type StudentRoadmapStatus = 'enrolled' | 'active' | 'paused' | 'completed' | 'cancelled';
export type PhaseStatus = 'pending' | 'active' | 'completed';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';