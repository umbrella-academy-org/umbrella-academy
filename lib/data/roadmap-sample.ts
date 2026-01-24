import { StudentRoadmap, Roadmap, RoadmapPhase, Session, LiveSession } from '@/types';

// Sample live sessions
const sampleLiveSessions: LiveSession[] = [
  {
    id: 'ls-1',
    title: 'JavaScript Fundamentals - Variables & Data Types',
    description: 'Interactive session covering JavaScript variables, data types, and basic operations',
    trainerId: 'user_101',
    trainerName: 'Sarah Ingabire',
    trainerAvatar: '/trainers/sarah-ingabire.jpg',
    studentIds: ['user_001'],
    roadmapId: 'roadmap_001',
    sessionId: 'session_frontend_fundamentals_1',
    scheduledAt: '2024-01-25T10:00:00Z',
    duration: 2,
    status: 'scheduled',
    meetingLink: 'https://meet.example.com/js-fundamentals-1',
    materials: [
      {
        id: 'mat-1',
        title: 'JavaScript Variables Cheat Sheet',
        type: 'document',
        url: '/materials/js-variables-cheat-sheet.pdf',
        description: 'Comprehensive guide to JavaScript variables',
        uploadedAt: '2024-01-20T00:00:00Z',
        uploadedBy: 'user_101'
      }
    ],
    objectives: [
      'Understand JavaScript variable declaration',
      'Learn about different data types',
      'Practice variable manipulation'
    ],
    maxParticipants: 20,
    actualParticipants: 12
  },
  {
    id: 'ls-2',
    title: 'JavaScript Functions Deep Dive',
    description: 'Advanced concepts in JavaScript functions, closures, and scope',
    trainerId: 'user_101',
    trainerName: 'Sarah Ingabire',
    studentIds: ['user_001'],
    roadmapId: 'roadmap_001',
    sessionId: 'session_frontend_fundamentals_5',
    scheduledAt: '2024-01-27T14:00:00Z',
    duration: 1.5,
    status: 'scheduled',
    meetingLink: 'https://meet.example.com/js-functions',
    materials: [],
    objectives: [
      'Master function declarations and expressions',
      'Understand closures and scope',
      'Practice advanced function patterns'
    ],
    maxParticipants: 15,
    actualParticipants: 8
  }
];

// Sample sessions (auto-generated based on student availability)
const sampleSessions: Session[] = [
  {
    id: 'session_frontend_fundamentals_1',
    title: 'Frontend Fundamentals - Session 1',
    description: 'Introduction to HTML5 semantic elements',
    duration: 2,
    status: 'completed',
    completedAt: '2024-01-20T10:00:00Z',
    liveSessionId: 'ls-1',
    materials: ['/materials/html5-guide.pdf', '/materials/semantic-elements.pdf'],
    objectives: [
      'Understand HTML5 semantic structure',
      'Learn about document structure',
      'Practice creating semantic HTML'
    ]
  },
  {
    id: 'session_frontend_fundamentals_2',
    title: 'Frontend Fundamentals - Session 2',
    description: 'CSS Grid and Flexbox fundamentals',
    duration: 2,
    status: 'in-progress',
    materials: ['/materials/css-grid-guide.pdf', '/materials/flexbox-cheatsheet.pdf'],
    objectives: [
      'Master CSS Grid layout',
      'Understand Flexbox properties',
      'Build responsive layouts'
    ]
  },
  {
    id: 'session_frontend_fundamentals_3',
    title: 'Frontend Fundamentals - Session 3',
    description: 'JavaScript ES6+ features',
    duration: 2,
    status: 'pending',
    materials: ['/materials/es6-features.pdf'],
    objectives: [
      'Learn arrow functions and destructuring',
      'Understand template literals',
      'Practice modern JavaScript syntax'
    ]
  }
];

// Sample roadmap phases
const samplePhases: RoadmapPhase[] = [
  {
    id: 'phase_001_1',
    title: 'Frontend Fundamentals',
    description: 'Learn HTML, CSS, and JavaScript basics',
    objectives: [
      'Master HTML5 semantic elements',
      'Understand CSS Grid and Flexbox',
      'Learn JavaScript ES6+ features'
    ],
    estimatedHours: 60,
    status: 'active',
    sessions: sampleSessions,
    order: 1
  },
  {
    id: 'phase_001_2',
    title: 'React Development',
    description: 'Build modern web applications with React',
    objectives: [
      'Understand React components and JSX',
      'Master state management with hooks',
      'Build responsive user interfaces'
    ],
    estimatedHours: 80,
    status: 'pending',
    sessions: [], // Would be populated with React sessions
    prerequisites: ['phase_001_1'],
    order: 2
  }
];

// Sample roadmap
export const sampleRoadmap: Roadmap = {
  id: 'roadmap_001',
  title: 'Full Stack Web Development Journey',
  description: 'A comprehensive roadmap to become a full-stack web developer using modern technologies',
  studentId: 'user_001',
  trainerId: 'user_101',
  mentorId: 'user_201',
  status: 'active',
  createdAt: '2024-09-20',
  approvedAt: '2024-09-22',
  startedAt: '2024-09-25',
  estimatedDuration: 24,
  phases: samplePhases,
  tags: ['web-development', 'javascript', 'react', 'node.js'],
  difficulty: 'intermediate',
  collaborationId: 'collab_001',
  approvalNotes: 'Excellent roadmap structure. Well-defined objectives and realistic timeline.',
  progress: {
    overallProgress: 25,
    completedPhases: 0,
    totalPhases: 2,
    completedSessions: 1,
    totalSessions: 3,
    hoursCompleted: 2,
    totalEstimatedHours: 140
  }
};

// Sample student roadmap
export const sampleStudentRoadmap: StudentRoadmap = {
  id: 'student_roadmap_001',
  studentId: 'user_001',
  roadmapId: 'roadmap_001',
  roadmap: sampleRoadmap,
  enrolledAt: '2024-09-25',
  startedAt: '2024-09-25',
  expectedCompletionDate: '2025-03-25',
  status: 'active',
  subscription: {
    userId: 'user_001',
    planId: 'basic-yearly',
    planName: 'Basic Plan',
    amount: 50000,
    currency: 'RWF',
    billingCycle: 'yearly',
    startDate: '2024-09-25',
    endDate: '2025-09-25',
    status: 'active',
    autoRenew: true,
    paymentMethod: 'mobile_money',
    createdAt: '2024-09-25',
    updatedAt: '2024-09-25'
  },
  lastAccessedAt: '2024-12-20',
  currentActivity: {
    type: 'session',
    id: 'session_frontend_fundamentals_2',
    title: 'Frontend Fundamentals - Session 2'
  },
  notifications: {
    upcomingSessions: sampleSessions.filter(session => session.status === 'pending'),
    overdueAssignments: [],
    newContent: []
  }
};