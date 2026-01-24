// Mock course data for Umbrella Academy LMS

import { Course, Phase, Lesson, LiveSession, Material, Assignment, Mentor, CourseProgress } from '@/types';

// Mock mentors
export const mockMentors: Mentor[] = [
  {
    id: 'mentor_001',
    name: 'Dr. Robert Kayitare',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    expertise: ['Web Development', 'JavaScript', 'React', 'Node.js'],
    rating: 4.8,
    totalStudents: 24
  },
  {
    id: 'mentor_002',
    name: 'Prof. Marie Uwimana',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    expertise: ['Data Science', 'Python', 'Machine Learning', 'Statistics'],
    rating: 4.9,
    totalStudents: 18
  },
  {
    id: 'mentor_003',
    name: 'Eng. Samuel Nkurunziza',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    expertise: ['Mobile Development', 'Flutter', 'React Native', 'iOS'],
    rating: 4.7,
    totalStudents: 15
  }
];

// Mock materials
const mockMaterials: Material[] = [
  {
    id: 'mat_001',
    title: 'HTML Fundamentals Guide',
    type: 'pdf',
    url: '/materials/html-fundamentals.pdf'
  },
  {
    id: 'mat_002',
    title: 'CSS Styling Basics',
    type: 'video',
    url: '/materials/css-basics-video.mp4'
  },
  {
    id: 'mat_003',
    title: 'JavaScript Documentation',
    type: 'link',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    id: 'mat_004',
    title: 'React Component Examples',
    type: 'code',
    url: '/materials/react-examples.zip'
  }
];

// Mock assignments
const mockAssignments: Assignment[] = [
  {
    id: 'assign_001',
    title: 'Build a Personal Portfolio',
    description: 'Create a responsive personal portfolio website using HTML, CSS, and JavaScript',
    dueDate: '2024-12-15',
    status: 'pending',
    grade: undefined
  },
  {
    id: 'assign_002',
    title: 'Todo App with React',
    description: 'Build a fully functional todo application using React hooks and local storage',
    dueDate: '2024-12-20',
    status: 'submitted',
    grade: 85
  },
  {
    id: 'assign_003',
    title: 'API Integration Project',
    description: 'Create a weather app that fetches data from a public API',
    dueDate: '2024-12-25',
    status: 'graded',
    grade: 92
  }
];

// Mock live sessions
const mockLiveSessions: LiveSession[] = [
  {
    id: 'session_001',
    title: 'Introduction to Web Development',
    description: 'Overview of web technologies and development environment setup',
    scheduledDate: '2024-12-10T14:00:00Z',
    duration: 90,
    status: 'completed',
    meetingLink: 'https://meet.umbrella.rw/session_001',
    recordingUrl: 'https://recordings.umbrella.rw/session_001.mp4',
    mentorId: 'mentor_001',
    mentorName: 'Dr. Robert Kayitare',
    mentorAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    participants: 12,
    maxParticipants: 15,
    materials: [mockMaterials[0], mockMaterials[1]]
  },
  {
    id: 'session_002',
    title: 'JavaScript Fundamentals',
    description: 'Variables, functions, and control structures in JavaScript',
    scheduledDate: '2024-12-12T14:00:00Z',
    duration: 120,
    status: 'scheduled',
    meetingLink: 'https://meet.umbrella.rw/session_002',
    mentorId: 'mentor_001',
    mentorName: 'Dr. Robert Kayitare',
    mentorAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    participants: 0,
    maxParticipants: 15,
    materials: [mockMaterials[2]]
  },
  {
    id: 'session_003',
    title: 'React Components Deep Dive',
    description: 'Understanding React components, props, and state management',
    scheduledDate: '2024-12-15T14:00:00Z',
    duration: 150,
    status: 'scheduled',
    meetingLink: 'https://meet.umbrella.rw/session_003',
    mentorId: 'mentor_001',
    mentorName: 'Dr. Robert Kayitare',
    mentorAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    participants: 0,
    maxParticipants: 15,
    materials: [mockMaterials[3]]
  }
];

// Mock lessons
const mockLessons: Lesson[] = [
  {
    id: 'lesson_001',
    title: 'HTML Basics',
    description: 'Learn the fundamentals of HTML markup language',
    order: 1,
    estimatedDuration: 180, // 3 hours
    status: 'completed',
    completedAt: '2024-11-15T10:30:00Z',
    progress: 100,
    type: 'theory',
    content: {
      videoUrl: '/videos/html-basics.mp4',
      materials: [mockMaterials[0]],
      assignments: [mockAssignments[0]]
    },
    liveSessions: [mockLiveSessions[0]],
    prerequisites: []
  },
  {
    id: 'lesson_002',
    title: 'CSS Styling',
    description: 'Master CSS for beautiful web page styling',
    order: 2,
    estimatedDuration: 240, // 4 hours
    status: 'completed',
    completedAt: '2024-11-20T16:45:00Z',
    progress: 100,
    type: 'practical',
    content: {
      videoUrl: '/videos/css-styling.mp4',
      materials: [mockMaterials[1]],
      assignments: []
    },
    liveSessions: [],
    prerequisites: ['lesson_001']
  },
  {
    id: 'lesson_003',
    title: 'JavaScript Fundamentals',
    description: 'Introduction to JavaScript programming',
    order: 3,
    estimatedDuration: 300, // 5 hours
    status: 'in-progress',
    progress: 65,
    type: 'theory',
    content: {
      videoUrl: '/videos/javascript-fundamentals.mp4',
      materials: [mockMaterials[2]],
      assignments: [mockAssignments[1]]
    },
    liveSessions: [mockLiveSessions[1]],
    prerequisites: ['lesson_001', 'lesson_002']
  },
  {
    id: 'lesson_004',
    title: 'React Introduction',
    description: 'Getting started with React library',
    order: 4,
    estimatedDuration: 360, // 6 hours
    status: 'available',
    progress: 0,
    type: 'practical',
    content: {
      videoUrl: '/videos/react-introduction.mp4',
      materials: [mockMaterials[3]],
      assignments: [mockAssignments[2]]
    },
    liveSessions: [mockLiveSessions[2]],
    prerequisites: ['lesson_003']
  },
  {
    id: 'lesson_005',
    title: 'Advanced React Patterns',
    description: 'Learn advanced React concepts and patterns',
    order: 5,
    estimatedDuration: 420, // 7 hours
    status: 'locked',
    progress: 0,
    type: 'project',
    content: {
      videoUrl: '/videos/advanced-react.mp4',
      materials: [],
      assignments: []
    },
    liveSessions: [],
    prerequisites: ['lesson_004']
  }
];

// Mock phases
const mockPhases: Phase[] = [
  {
    id: 'phase_001',
    title: 'Foundation Phase',
    description: 'Learn the basics of web development',
    order: 1,
    estimatedDuration: 4, // 4 weeks
    status: 'completed',
    startedAt: '2024-11-01T00:00:00Z',
    completedAt: '2024-11-28T23:59:59Z',
    progress: 100,
    lessons: [mockLessons[0], mockLessons[1]],
    requirements: {
      minimumLessonsCompleted: 2,
      minimumGrade: 70,
      requiredAssignments: ['assign_001']
    },
    milestones: [
      {
        id: 'milestone_001',
        title: 'First Website Built',
        description: 'Successfully created and deployed your first website',
        completed: true,
        completedAt: '2024-11-28T15:30:00Z'
      }
    ]
  },
  {
    id: 'phase_002',
    title: 'Interactive Development',
    description: 'Add interactivity with JavaScript',
    order: 2,
    estimatedDuration: 6, // 6 weeks
    status: 'in-progress',
    startedAt: '2024-11-29T00:00:00Z',
    progress: 45,
    lessons: [mockLessons[2]],
    requirements: {
      minimumLessonsCompleted: 1,
      minimumGrade: 75,
      requiredAssignments: ['assign_002']
    },
    milestones: [
      {
        id: 'milestone_002',
        title: 'JavaScript Mastery',
        description: 'Demonstrate proficiency in JavaScript fundamentals',
        completed: false
      }
    ]
  },
  {
    id: 'phase_003',
    title: 'Modern Framework Development',
    description: 'Build applications with React',
    order: 3,
    estimatedDuration: 8, // 8 weeks
    status: 'available',
    progress: 0,
    lessons: [mockLessons[3], mockLessons[4]],
    requirements: {
      minimumLessonsCompleted: 2,
      minimumGrade: 80,
      requiredAssignments: ['assign_003']
    },
    milestones: [
      {
        id: 'milestone_003',
        title: 'React Developer',
        description: 'Build and deploy a full React application',
        completed: false
      }
    ]
  }
];

// Mock course progress
const mockCourseProgress: CourseProgress = {
  currentPhaseId: 'phase_002',
  currentLessonId: 'lesson_003',
  overallProgress: 48,
  completedPhases: 1,
  totalPhases: 3,
  completedLessons: 2,
  totalLessons: 5,
  totalLiveSessions: 3,
  attendedLiveSessions: 1,
  missedLiveSessions: 0
};

// Mock courses
export const mockCourses: Course[] = [
  {
    id: 'course_001',
    title: 'Full Stack Web Development',
    description: 'Complete web development course covering frontend and backend technologies',
    category: 'Web Development',
    level: 'beginner',
    estimatedDuration: 18, // 18 weeks
    rating: 4.8,
    totalStudents: 156,
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    skills: ['Frontend Development', 'Backend Development', 'Database Management', 'API Development'],
    mentor: mockMentors[0],
    phases: mockPhases,
    progress: mockCourseProgress
  },
  {
    id: 'course_002',
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and machine learning with Python',
    category: 'Data Science',
    level: 'intermediate',
    estimatedDuration: 16, // 16 weeks
    rating: 4.9,
    totalStudents: 89,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'TensorFlow'],
    skills: ['Data Analysis', 'Data Visualization', 'Machine Learning', 'Statistical Analysis'],
    mentor: mockMentors[1],
    phases: [], // Would be populated with data science specific phases
    progress: {
      currentPhaseId: undefined,
      currentLessonId: undefined,
      overallProgress: 0,
      completedPhases: 0,
      totalPhases: 4,
      completedLessons: 0,
      totalLessons: 12,
      totalLiveSessions: 8,
      attendedLiveSessions: 0,
      missedLiveSessions: 0
    }
  },
  {
    id: 'course_003',
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile applications with Flutter and React Native',
    category: 'Mobile Development',
    level: 'intermediate',
    estimatedDuration: 14, // 14 weeks
    rating: 4.7,
    totalStudents: 67,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    tags: ['Flutter', 'React Native', 'Dart', 'JavaScript', 'iOS', 'Android'],
    skills: ['Mobile Development', 'Cross-platform Development', 'UI/UX Design', 'App Store Deployment'],
    mentor: mockMentors[2],
    phases: [], // Would be populated with mobile development specific phases
    progress: {
      currentPhaseId: undefined,
      currentLessonId: undefined,
      overallProgress: 0,
      completedPhases: 0,
      totalPhases: 3,
      completedLessons: 0,
      totalLessons: 10,
      totalLiveSessions: 6,
      attendedLiveSessions: 0,
      missedLiveSessions: 0
    }
  }
];

// Helper functions
export const getCourseById = (id: string) => mockCourses.find(course => course.id === id);
export const getCoursesByCategory = (category: string) => mockCourses.filter(course => course.category === category);
export const getCoursesByLevel = (level: string) => mockCourses.filter(course => course.level === level);
export const getMentorById = (id: string) => mockMentors.find(mentor => mentor.id === id);

// Export live sessions
export { mockLiveSessions };