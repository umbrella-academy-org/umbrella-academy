// Mock live session data for Umbrella Academy LMS

import { LiveSession, Material, Assignment } from '@/types';

// Mock materials
const mockMaterials: Material[] = [
  {
    id: 'mat_001',
    title: 'HTML Fundamentals Guide',
    type: 'document',
    url: '/materials/html-fundamentals.pdf',
    description: 'Complete guide to HTML fundamentals',
    uploadedAt: '2024-01-01T00:00:00Z',
    uploadedBy: 'user_101'
  },
  {
    id: 'mat_002',
    title: 'CSS Styling Basics',
    type: 'video',
    url: '/materials/css-basics-video.mp4',
    description: 'Video tutorial on CSS basics',
    uploadedAt: '2024-01-02T00:00:00Z',
    uploadedBy: 'user_101'
  },
  {
    id: 'mat_003',
    title: 'JavaScript Documentation',
    type: 'link',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    description: 'Official JavaScript documentation',
    uploadedAt: '2024-01-03T00:00:00Z',
    uploadedBy: 'user_101'
  },
  {
    id: 'mat_004',
    title: 'React Component Examples',
    type: 'code',
    url: '/materials/react-examples.zip',
    description: 'Collection of React component examples',
    uploadedAt: '2024-01-04T00:00:00Z',
    uploadedBy: 'user_101'
  }
];

// Mock assignments
const mockAssignments: Assignment[] = [
  {
    id: 'assign_001',
    title: 'Build a Personal Portfolio',
    description: 'Create a responsive personal portfolio website using HTML, CSS, and JavaScript',
    roadmapId: 'roadmap_001',
    phaseId: 'phase_001_1',
    dueDate: '2024-12-15',
    status: 'pending'
  },
  {
    id: 'assign_002',
    title: 'Todo App with React',
    description: 'Build a fully functional todo application using React hooks and local storage',
    roadmapId: 'roadmap_001',
    phaseId: 'phase_001_2',
    dueDate: '2024-12-20',
    status: 'submitted',
    grade: 85
  },
  {
    id: 'assign_003',
    title: 'API Integration Project',
    description: 'Create a weather app that fetches data from a public API',
    roadmapId: 'roadmap_001',
    phaseId: 'phase_001_2',
    dueDate: '2024-12-25',
    status: 'completed',
    grade: 92
  }
];

// Mock live sessions
export const mockLiveSessions: LiveSession[] = [
  {
    id: 'session_001',
    title: 'Introduction to Web Development',
    description: 'Overview of web technologies and development environment setup',
    trainerId: 'trainer_001',
    trainerName: 'Dr. Robert Kayitare',
    trainerAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    studentIds: ['student_001', 'student_002', 'student_003'],
    roadmapId: 'roadmap_001',
    sessionId: 'session_001_1',
    scheduledAt: '2024-12-10T14:00:00Z',
    duration: 1.5, // 1.5 hours
    status: 'completed',
    meetingLink: 'https://meet.umbrella.rw/session_001',
    recordingUrl: 'https://recordings.umbrella.rw/session_001.mp4',
    materials: [mockMaterials[0], mockMaterials[1]],
    objectives: ['Understand web development basics', 'Set up development environment'],
    maxParticipants: 15,
    actualParticipants: 12,
    feedback: [
      {
        id: 'feedback_001',
        sessionId: 'session_001',
        studentId: 'student_001',
        rating: 5,
        comment: 'Excellent introduction to web development!',
        submittedAt: '2024-12-10T16:00:00Z'
      }
    ]
  },
  {
    id: 'session_002',
    title: 'JavaScript Fundamentals',
    description: 'Variables, functions, and control structures in JavaScript',
    trainerId: 'trainer_001',
    trainerName: 'Dr. Robert Kayitare',
    trainerAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    studentIds: ['student_001', 'student_002'],
    roadmapId: 'roadmap_001',
    sessionId: 'session_001_2',
    scheduledAt: '2024-12-12T14:00:00Z',
    duration: 2, // 2 hours
    status: 'scheduled',
    meetingLink: 'https://meet.umbrella.rw/session_002',
    materials: [mockMaterials[2]],
    objectives: ['Master JavaScript basics', 'Practice coding exercises'],
    maxParticipants: 15,
    actualParticipants: 0
  },
  {
    id: 'session_003',
    title: 'React Components Deep Dive',
    description: 'Understanding React components, props, and state management',
    trainerId: 'trainer_001',
    trainerName: 'Dr. Robert Kayitare',
    trainerAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    studentIds: ['student_001'],
    roadmapId: 'roadmap_001',
    sessionId: 'session_001_3',
    scheduledAt: '2024-12-15T14:00:00Z',
    duration: 2.5, // 2.5 hours
    status: 'scheduled',
    meetingLink: 'https://meet.umbrella.rw/session_003',
    materials: [mockMaterials[3]],
    objectives: ['Understand React components', 'Build interactive UIs'],
    maxParticipants: 15,
    actualParticipants: 0
  }
];

// Helper functions
export const getLiveSessionById = (id: string) => mockLiveSessions.find(session => session.id === id);
export const getLiveSessionsByRoadmap = (roadmapId: string) => mockLiveSessions.filter(session => session.roadmapId === roadmapId);
export const getLiveSessionsByTrainer = (trainerId: string) => mockLiveSessions.filter(session => session.trainerId === trainerId);

// Export materials and assignments for use in other components
export { mockMaterials, mockAssignments };