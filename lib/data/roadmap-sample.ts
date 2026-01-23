import { StudentRoadmap, Course, Phase, Lesson, LiveSession } from '@/types';

// Sample live sessions
const sampleLiveSessions: LiveSession[] = [
  {
    id: 'ls-1',
    title: 'JavaScript Fundamentals - Variables & Data Types',
    description: 'Interactive session covering JavaScript variables, data types, and basic operations',
    scheduledDate: '2024-01-25T10:00:00Z',
    duration: 60,
    status: 'scheduled',
    meetingLink: 'https://meet.example.com/js-fundamentals-1',
    mentorId: 'mentor-1',
    mentorName: 'John Smith',
    mentorAvatar: '/mentors/john-smith.jpg',
    participants: 12,
    maxParticipants: 20,
    materials: [
      {
        id: 'mat-1',
        title: 'JavaScript Variables Cheat Sheet',
        type: 'pdf',
        url: '/materials/js-variables-cheat-sheet.pdf'
      }
    ]
  },
  {
    id: 'ls-2',
    title: 'JavaScript Functions Deep Dive',
    description: 'Advanced concepts in JavaScript functions, closures, and scope',
    scheduledDate: '2024-01-27T14:00:00Z',
    duration: 90,
    status: 'scheduled',
    meetingLink: 'https://meet.example.com/js-functions',
    mentorId: 'mentor-1',
    mentorName: 'John Smith',
    participants: 8,
    maxParticipants: 15
  },
  {
    id: 'ls-3',
    title: 'DOM Manipulation Workshop',
    description: 'Hands-on workshop for DOM manipulation and event handling',
    scheduledDate: '2024-01-30T16:00:00Z',
    duration: 120,
    status: 'scheduled',
    mentorId: 'mentor-1',
    mentorName: 'John Smith',
    participants: 15,
    maxParticipants: 20
  }
];

// Sample lessons
const sampleLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Introduction to JavaScript',
    description: 'Learn the basics of JavaScript programming language',
    order: 1,
    estimatedDuration: 120,
    status: 'completed',
    completedAt: '2024-01-20T10:00:00Z',
    progress: 100,
    type: 'theory',
    content: {
      videoUrl: 'https://video.example.com/js-intro',
      materials: [
        {
          id: 'mat-intro-1',
          title: 'JavaScript Introduction Guide',
          type: 'pdf',
          url: '/materials/js-intro-guide.pdf'
        }
      ]
    },
    liveSessions: [sampleLiveSessions[0]]
  },
  {
    id: 'lesson-2',
    title: 'Variables and Data Types',
    description: 'Understanding JavaScript variables, data types, and operators',
    order: 2,
    estimatedDuration: 90,
    status: 'in-progress',
    progress: 60,
    type: 'practical',
    content: {
      assignments: [
        {
          id: 'assign-1',
          title: 'Variable Declaration Exercise',
          description: 'Create variables of different data types',
          dueDate: '2024-01-28T23:59:59Z',
          status: 'pending'
        }
      ]
    },
    liveSessions: [sampleLiveSessions[0]]
  },
  {
    id: 'lesson-3',
    title: 'Functions and Scope',
    description: 'Master JavaScript functions, parameters, and scope concepts',
    order: 3,
    estimatedDuration: 150,
    status: 'available',
    progress: 0,
    type: 'theory',
    liveSessions: [sampleLiveSessions[1]],
    prerequisites: ['lesson-2']
  },
  {
    id: 'lesson-4',
    title: 'DOM Manipulation',
    description: 'Learn to interact with HTML elements using JavaScript',
    order: 4,
    estimatedDuration: 180,
    status: 'locked',
    progress: 0,
    type: 'practical',
    liveSessions: [sampleLiveSessions[2]],
    prerequisites: ['lesson-3']
  }
];

// Sample phases
const samplePhases: Phase[] = [
  {
    id: 'phase-1',
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts of JavaScript programming',
    order: 1,
    estimatedDuration: 4,
    status: 'in-progress',
    startedAt: '2024-01-15T00:00:00Z',
    progress: 65,
    lessons: sampleLessons,
    requirements: {
      minimumLessonsCompleted: 3,
      minimumGrade: 70
    },
    milestones: [
      {
        id: 'milestone-1',
        title: 'Complete Basic Syntax',
        description: 'Understand variables, data types, and basic operations',
        completed: true,
        completedAt: '2024-01-20T10:00:00Z'
      },
      {
        id: 'milestone-2',
        title: 'Build First Interactive Page',
        description: 'Create a webpage with JavaScript interactions',
        completed: false
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'Advanced JavaScript Concepts',
    description: 'Dive deeper into advanced JavaScript features and patterns',
    order: 2,
    estimatedDuration: 6,
    status: 'locked',
    progress: 0,
    lessons: [], // Would contain advanced lessons
    requirements: {
      minimumLessonsCompleted: 4,
      minimumGrade: 75
    }
  },
  {
    id: 'phase-3',
    title: 'Web Development Projects',
    description: 'Apply your skills in real-world web development projects',
    order: 3,
    estimatedDuration: 8,
    status: 'locked',
    progress: 0,
    lessons: [], // Would contain project-based lessons
    requirements: {
      minimumLessonsCompleted: 6,
      minimumGrade: 80
    }
  }
];

// Sample course
export const sampleCourse: Course = {
  id: 'course-1',
  title: 'Full-Stack Web Development with JavaScript',
  description: 'Complete web development course covering frontend and backend technologies',
  category: 'Programming & Development',
  level: 'beginner',
  estimatedDuration: 18,
  rating: 4.5,
  totalStudents: 1247,
  thumbnail: '/courses/fullstack-js.jpg',
  tags: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Web Development'],
  skills: ['Frontend Development', 'Backend Development', 'Database Design', 'API Development'],
  mentor: {
    id: 'mentor-1',
    name: 'John Smith',
    avatar: '/mentors/john-smith.jpg',
    expertise: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    rating: 4.8,
    totalStudents: 3420
  },
  phases: samplePhases,
  progress: {
    currentPhaseId: 'phase-1',
    currentLessonId: 'lesson-2',
    overallProgress: 22,
    completedPhases: 0,
    totalPhases: 3,
    completedLessons: 1,
    totalLessons: 4,
    totalLiveSessions: 3,
    attendedLiveSessions: 0,
    missedLiveSessions: 0
  }
};

// Sample student roadmap
export const sampleStudentRoadmap: StudentRoadmap = {
  id: 'roadmap-1',
  studentId: 'student-1',
  courseId: 'course-1',
  course: sampleCourse,
  enrolledAt: '2024-01-10T00:00:00Z',
  startedAt: '2024-01-15T00:00:00Z',
  expectedCompletionDate: '2024-07-15T00:00:00Z',
  status: 'active',
  subscription: {
    planId: 'basic-yearly',
    planName: 'Basic Plan',
    amount: 50,
    currency: 'RWF',
    billingCycle: 'yearly',
    startDate: '2024-01-10T00:00:00Z',
    endDate: '2025-01-10T00:00:00Z',
    status: 'active',
    autoRenew: true
  },
  lastAccessedAt: '2024-01-23T14:30:00Z',
  currentActivity: {
    type: 'lesson',
    id: 'lesson-2',
    title: 'Variables and Data Types'
  },
  notifications: {
    upcomingLiveSessions: sampleLiveSessions.filter(session => session.status === 'scheduled'),
    overdueAssignments: [],
    newContent: []
  }
};