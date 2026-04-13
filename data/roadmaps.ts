// Mock roadmap data for Umbrella Academy LMS

import { Roadmap, StudentRoadmap, RoadmapPhase, Session, RoadmapCollaboration } from '@/types';
import { mockSubscriptions } from './transactions';

// Helper function to auto-generate sessions based on student availability
const generateSessions = (phaseTitle: string, estimatedHours: number, studentAvailableHours: number, sessionDuration: number): Session[] => {
  const numberOfSessions = Math.ceil(estimatedHours / sessionDuration);
  const sessions: Session[] = [];
  
  for (let i = 0; i < numberOfSessions; i++) {
    const actualDuration = i === numberOfSessions - 1 
      ? estimatedHours - (i * sessionDuration) // Last session gets remaining hours
      : sessionDuration;
    
    sessions.push({
      id: `session_${phaseTitle.toLowerCase().replace(/\s+/g, '_')}_${i + 1}`,
      title: `${phaseTitle} - Session ${i + 1}`,
      description: `Learning session ${i + 1} for ${phaseTitle}`,
      duration: actualDuration,
      status: i === 0 ? 'pending' : 'pending',
      materials: [
        `material_${i + 1}_1`,
        `material_${i + 1}_2`
      ],
      objectives: [
        `Complete objective ${i + 1}.1`,
        `Complete objective ${i + 1}.2`
      ]
    });
  }
  
  return sessions;
};

// Mock roadmaps
export const mockRoadmaps: Roadmap[] = [
  {
    id: 'roadmap_001',
    title: 'Full Web Development Journey',
    description: 'A comprehensive roadmap to become a full-stack web developer using modern technologies',
    studentId: 'user_001',
    trainerId: 'user_101',
    status: 'active',
    createdAt: '2024-09-20',
    approvedAt: '2024-09-22',
    startedAt: '2024-09-25',
    estimatedDuration: 24,
    phases: [
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
        sessions: generateSessions('Frontend Fundamentals', 60, 20, 2), // Based on Jane's availability
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
        sessions: generateSessions('React Development', 80, 20, 2),
        prerequisites: ['phase_001_1'],
        order: 2
      },
      {
        id: 'phase_001_3',
        title: 'Backend Development',
        description: 'Server-side development with Node.js',
        objectives: [
          'Build REST APIs with Express.js',
          'Implement authentication and authorization',
          'Work with databases'
        ],
        estimatedHours: 70,
        status: 'pending',
        sessions: generateSessions('Backend Development', 70, 20, 2),
        prerequisites: ['phase_001_2'],
        order: 3
      }
    ],
    tags: ['web-development', 'javascript', 'react', 'node.js'],
    difficulty: 'intermediate',
    collaborationId: 'collab_001',
    approvalNotes: 'Excellent roadmap structure. Well-defined objectives and realistic timeline.',
    progress: {
      overallProgress: 25,
      completedPhases: 0,
      totalPhases: 3,
      completedSessions: 8,
      totalSessions: 105, // Total sessions across all phases
      hoursCompleted: 16,
      totalEstimatedHours: 210
    }
  },
  {
    id: 'roadmap_002',
    title: 'Data Science Mastery Path',
    description: 'Complete journey from data analysis basics to machine learning implementation',
    studentId: 'user_002',
    trainerId: 'user_102',
    status: 'approved',
    createdAt: '2024-08-25',
    approvedAt: '2024-08-28',
    startedAt: '2024-09-01',
    estimatedDuration: 20,
    phases: [
      {
        id: 'phase_002_1',
        title: 'Python Programming',
        description: 'Master Python for data science',
        objectives: [
          'Learn Python syntax and data structures',
          'Understand object-oriented programming',
          'Work with Python libraries'
        ],
        estimatedHours: 45,
        status: 'completed',
        sessions: generateSessions('Python Programming', 45, 15, 1.5), // Based on Eric's availability
        order: 1
      },
      {
        id: 'phase_002_2',
        title: 'Data Analysis & Visualization',
        description: 'Analyze and visualize data using pandas and matplotlib',
        objectives: [
          'Master pandas for data manipulation',
          'Create compelling visualizations',
          'Perform statistical analysis'
        ],
        estimatedHours: 50,
        status: 'active',
        sessions: generateSessions('Data Analysis & Visualization', 50, 15, 1.5),
        prerequisites: ['phase_002_1'],
        order: 2
      },
      {
        id: 'phase_002_3',
        title: 'Machine Learning',
        description: 'Build and deploy machine learning models',
        objectives: [
          'Understand ML algorithms',
          'Build predictive models',
          'Deploy models to production'
        ],
        estimatedHours: 65,
        status: 'pending',
        sessions: generateSessions('Machine Learning', 65, 15, 1.5),
        prerequisites: ['phase_002_2'],
        order: 3
      }
    ],
    tags: ['data-science', 'python', 'machine-learning', 'analytics'],
    difficulty: 'advanced',
    collaborationId: 'collab_002',
    approvalNotes: 'Strong technical roadmap with practical applications.',
    progress: {
      overallProgress: 60,
      completedPhases: 1,
      totalPhases: 3,
      completedSessions: 30,
      totalSessions: 107,
      hoursCompleted: 45,
      totalEstimatedHours: 160
    }
  },
  {
    id: 'roadmap_003',
    title: 'UX/UI Design Fundamentals',
    description: 'Learn user experience and interface design principles',
    studentId: 'user_003',
    trainerId: 'user_101',
    status: 'pending-approval',
    createdAt: '2024-10-05',
    estimatedDuration: 16,
    phases: [
      {
        id: 'phase_003_1',
        title: 'Design Thinking',
        description: 'Understand user-centered design process',
        objectives: [
          'Learn design thinking methodology',
          'Conduct user research',
          'Create user personas and journey maps'
        ],
        estimatedHours: 40,
        status: 'pending',
        sessions: generateSessions('Design Thinking', 40, 25, 3), // Based on Grace's availability
        order: 1
      },
      {
        id: 'phase_003_2',
        title: 'Visual Design',
        description: 'Master visual design principles and tools',
        objectives: [
          'Understand color theory and typography',
          'Learn design tools (Figma, Adobe XD)',
          'Create visual design systems'
        ],
        estimatedHours: 50,
        status: 'pending',
        sessions: generateSessions('Visual Design', 50, 25, 3),
        prerequisites: ['phase_003_1'],
        order: 2
      }
    ],
    tags: ['ux-design', 'ui-design', 'figma', 'user-research'],
    difficulty: 'beginner',
    collaborationId: 'collab_003',
    progress: {
      overallProgress: 0,
      completedPhases: 0,
      totalPhases: 2,
      completedSessions: 0,
      totalSessions: 30,
      hoursCompleted: 0,
      totalEstimatedHours: 90
    }
  }
];

// Mock collaboration sessions
export const mockCollaborations: RoadmapCollaboration[] = [
  {
    id: 'collab_001',
    roadmapId: 'roadmap_001',
    collaborators: {
      studentId: 'user_001',
      trainerId: 'user_101'
    },
    createdAt: '2024-09-20',
    lastEditedAt: '2024-09-21',
    editHistory: [
      {
        timestamp: '2024-09-20T10:00:00Z',
        userId: 'user_001',
        action: 'created',
        details: 'Created initial roadmap structure'
      },
      {
        timestamp: '2024-09-20T14:30:00Z',
        userId: 'user_101',
        action: 'added_phase',
        details: 'Added Backend Development phase'
      },
      {
        timestamp: '2024-09-21T09:15:00Z',
        userId: 'user_001',
        action: 'updated_phase',
        details: 'Updated Frontend Fundamentals objectives'
      }
    ],
    status: 'completed'
  },
  {
    id: 'collab_002',
    roadmapId: 'roadmap_002',
    collaborators: {
      studentId: 'user_002',
      trainerId: 'user_102'
    },
    createdAt: '2024-08-25',
    lastEditedAt: '2024-08-27',
    editHistory: [
      {
        timestamp: '2024-08-25T11:00:00Z',
        userId: 'user_002',
        action: 'created',
        details: 'Created data science roadmap'
      },
      {
        timestamp: '2024-08-26T16:00:00Z',
        userId: 'user_102',
        action: 'updated_phase',
        details: 'Enhanced Machine Learning phase with practical projects'
      }
    ],
    status: 'completed'
  },
  {
    id: 'collab_003',
    roadmapId: 'roadmap_003',
    collaborators: {
      studentId: 'user_003',
      trainerId: 'user_101'
    },
    createdAt: '2024-10-05',
    lastEditedAt: '2024-10-06',
    editHistory: [
      {
        timestamp: '2024-10-05T13:00:00Z',
        userId: 'user_003',
        action: 'created',
        details: 'Created UX/UI design roadmap'
      },
      {
        timestamp: '2024-10-06T10:30:00Z',
        userId: 'user_101',
        action: 'updated_phase',
        details: 'Added practical design exercises'
      }
    ],
    status: 'active'
  }
];

// Mock student roadmaps (enrollment records)
export const mockStudentRoadmaps: StudentRoadmap[] = [
  {
    id: 'student_roadmap_001',
    studentId: 'user_001',
    roadmapId: 'roadmap_001',
    roadmap: mockRoadmaps[0],
    enrolledAt: '2024-09-25',
    startedAt: '2024-09-25',
    expectedCompletionDate: '2025-03-25',
    status: 'active',
    subscription: mockSubscriptions[0],
    lastAccessedAt: '2024-12-20',
    currentActivity: {
      type: 'session',
      id: 'session_frontend_fundamentals_9',
      title: 'Frontend Fundamentals - Session 9'
    },
    notifications: {
      upcomingSessions: [],
      overdueAssignments: [],
      newContent: []
    }
  },
  {
    id: 'student_roadmap_002',
    studentId: 'user_002',
    roadmapId: 'roadmap_002',
    roadmap: mockRoadmaps[1],
    enrolledAt: '2024-09-01',
    startedAt: '2024-09-01',
    expectedCompletionDate: '2025-01-01',
    status: 'active',
    subscription: mockSubscriptions[1],
    lastAccessedAt: '2024-12-19',
    currentActivity: {
      type: 'session',
      id: 'session_data_analysis_&_visualization_10',
      title: 'Data Analysis & Visualization - Session 10'
    },
    notifications: {
      upcomingSessions: [],
      overdueAssignments: [],
      newContent: []
    }
  },
  {
    id: 'student_roadmap_003',
    studentId: 'user_003',
    roadmapId: 'roadmap_003',
    roadmap: mockRoadmaps[2],
    enrolledAt: '2024-10-10',
    status: 'enrolled',
    subscription: mockSubscriptions[2],
    lastAccessedAt: '2024-10-10',
    notifications: {
      upcomingSessions: [],
      overdueAssignments: [],
      newContent: []
    }
  }
];

// Helper functions
export const getRoadmapById = (id: string) => mockRoadmaps.find(roadmap => roadmap.id === id);
export const getRoadmapsByStudent = (studentId: string) => mockRoadmaps.filter(roadmap => roadmap.studentId === studentId);
export const getRoadmapsByTrainer = (trainerId: string) => mockRoadmaps.filter(roadmap => roadmap.trainerId === trainerId);
export const getRoadmapsByStatus = (status: string) => mockRoadmaps.filter(roadmap => roadmap.status === status);
export const getCollaborationByRoadmap = (roadmapId: string) => mockCollaborations.find(collab => collab.roadmapId === roadmapId);
export const getStudentRoadmapByStudent = (studentId: string) => mockStudentRoadmaps.filter(sr => sr.studentId === studentId);