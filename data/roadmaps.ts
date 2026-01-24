// Mock roadmap data for Umbrella Academy LMS

import { StudentRoadmap } from '@/types';
import { mockCourses } from './courses';
import { mockSubscriptions } from './transactions';

export const mockStudentRoadmaps: StudentRoadmap[] = [
  {
    id: 'roadmap_001',
    studentId: 'user_001', // Jane Mukamana
    courseId: 'course_001',
    course: mockCourses[0], // Full Stack Web Development
    enrolledAt: '2024-11-01T00:00:00Z',
    startedAt: '2024-11-01T09:00:00Z',
    expectedCompletionDate: '2025-04-15T23:59:59Z',
    status: 'active',
    subscription: mockSubscriptions[0],
    lastAccessedAt: '2024-12-09T14:30:00Z',
    currentActivity: {
      type: 'lesson',
      id: 'lesson_003',
      title: 'JavaScript Fundamentals'
    },
    notifications: {
      upcomingLiveSessions: [
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
          maxParticipants: 15
        }
      ],
      overdueAssignments: [],
      newContent: [
        {
          id: 'mat_005',
          title: 'Advanced JavaScript Concepts',
          type: 'pdf',
          url: '/materials/advanced-js.pdf'
        }
      ]
    }
  },
  {
    id: 'roadmap_002',
    studentId: 'user_002', // Eric Nshimiyimana
    courseId: 'course_002',
    course: mockCourses[1], // Data Science with Python
    enrolledAt: '2024-10-15T00:00:00Z',
    startedAt: '2024-10-20T10:00:00Z',
    expectedCompletionDate: '2025-02-28T23:59:59Z',
    status: 'active',
    subscription: mockSubscriptions[1],
    lastAccessedAt: '2024-12-08T16:45:00Z',
    currentActivity: {
      type: 'assignment',
      id: 'assign_ds_001',
      title: 'Data Analysis Project'
    },
    notifications: {
      upcomingLiveSessions: [
        {
          id: 'session_ds_001',
          title: 'Introduction to Pandas',
          description: 'Data manipulation and analysis with Pandas library',
          scheduledDate: '2024-12-14T15:00:00Z',
          duration: 90,
          status: 'scheduled',
          meetingLink: 'https://meet.umbrella.rw/session_ds_001',
          mentorId: 'mentor_002',
          mentorName: 'Prof. Marie Uwimana',
          mentorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
          participants: 0,
          maxParticipants: 12
        }
      ],
      overdueAssignments: [
        {
          id: 'assign_ds_001',
          title: 'Data Analysis Project',
          description: 'Analyze a dataset using Python and create visualizations',
          dueDate: '2024-12-08',
          status: 'pending'
        }
      ],
      newContent: []
    }
  },
  {
    id: 'roadmap_003',
    studentId: 'user_003', // Grace Uwimana
    courseId: 'course_003',
    course: mockCourses[2], // Mobile App Development
    enrolledAt: '2024-11-20T00:00:00Z',
    startedAt: '2024-11-25T11:00:00Z',
    expectedCompletionDate: '2025-03-20T23:59:59Z',
    status: 'active',
    subscription: mockSubscriptions[2],
    lastAccessedAt: '2024-12-09T12:15:00Z',
    currentActivity: {
      type: 'live-session',
      id: 'session_mobile_001',
      title: 'Flutter Setup and First App'
    },
    notifications: {
      upcomingLiveSessions: [
        {
          id: 'session_mobile_001',
          title: 'Flutter Setup and First App',
          description: 'Setting up Flutter development environment and creating your first app',
          scheduledDate: '2024-12-11T13:00:00Z',
          duration: 120,
          status: 'scheduled',
          meetingLink: 'https://meet.umbrella.rw/session_mobile_001',
          mentorId: 'mentor_003',
          mentorName: 'Eng. Samuel Nkurunziza',
          mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          participants: 0,
          maxParticipants: 10
        }
      ],
      overdueAssignments: [],
      newContent: [
        {
          id: 'mat_mobile_001',
          title: 'Flutter Installation Guide',
          type: 'pdf',
          url: '/materials/flutter-setup.pdf'
        },
        {
          id: 'mat_mobile_002',
          title: 'Dart Language Basics',
          type: 'video',
          url: '/materials/dart-basics.mp4'
        }
      ]
    }
  },
  {
    id: 'roadmap_004',
    studentId: 'user_004', // David Habimana
    courseId: 'course_001',
    course: mockCourses[0], // Full Stack Web Development
    enrolledAt: '2024-07-10T00:00:00Z',
    startedAt: '2024-07-15T09:00:00Z',
    expectedCompletionDate: '2024-12-31T23:59:59Z',
    status: 'paused',
    subscription: {
      ...mockSubscriptions[3],
      status: 'cancelled'
    },
    lastAccessedAt: '2024-11-20T10:00:00Z',
    currentActivity: {
      type: 'lesson',
      id: 'lesson_002',
      title: 'CSS Styling'
    },
    notifications: {
      upcomingLiveSessions: [],
      overdueAssignments: [
        {
          id: 'assign_001',
          title: 'Build a Personal Portfolio',
          description: 'Create a responsive personal portfolio website using HTML, CSS, and JavaScript',
          dueDate: '2024-11-15',
          status: 'pending'
        }
      ],
      newContent: []
    }
  }
];

// Helper functions
export const getRoadmapByStudentId = (studentId: string) => 
  mockStudentRoadmaps.find(roadmap => roadmap.studentId === studentId);

export const getRoadmapsByCourseId = (courseId: string) => 
  mockStudentRoadmaps.filter(roadmap => roadmap.courseId === courseId);

export const getRoadmapsByStatus = (status: 'enrolled' | 'active' | 'paused' | 'completed' | 'cancelled') => 
  mockStudentRoadmaps.filter(roadmap => roadmap.status === status);

export const getActiveRoadmaps = () => 
  mockStudentRoadmaps.filter(roadmap => roadmap.status === 'active');

export const getStudentsWithOverdueAssignments = () => 
  mockStudentRoadmaps.filter(roadmap => roadmap.notifications.overdueAssignments.length > 0);

export const getStudentsWithUpcomingSessions = () => 
  mockStudentRoadmaps.filter(roadmap => roadmap.notifications.upcomingLiveSessions.length > 0);

export const getTotalActiveStudents = () => 
  mockStudentRoadmaps.filter(roadmap => roadmap.status === 'active').length;

export const getAverageProgress = () => {
  const activeRoadmaps = getActiveRoadmaps();
  if (activeRoadmaps.length === 0) return 0;
  
  const totalProgress = activeRoadmaps.reduce((sum, roadmap) => sum + roadmap.course.progress.overallProgress, 0);
  return Math.round(totalProgress / activeRoadmaps.length);
};