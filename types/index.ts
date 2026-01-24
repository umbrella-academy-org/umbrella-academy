// Centralized type exports for Umbrella Academy LMS

// User types
export * from './user';

// Course and learning types
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
export type PhaseStatus = 'locked' | 'available' | 'in-progress' | 'completed';
export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';
export type LiveSessionStatus = 'scheduled' | 'completed' | 'cancelled' | 'missed';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type RoadmapStatus = 'enrolled' | 'active' | 'paused' | 'completed' | 'cancelled';