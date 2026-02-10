import { OnboardingSession } from '@/types';

// Mock session data
export const mockOnboardingSessions: OnboardingSession[] = [
    {
        id: 'session_001',
        trainerId: 'user_101',
        studentId: 'user_001',
        fieldId: 'tech-companies',
        scheduledAt: new Date('2024-12-10T10:00:00Z'),
        status: 'scheduled',
        duration: 120, // 2 hours in minutes
        createdAt: new Date('2024-12-09T15:30:00Z')
    },
    {
        id: 'session_002',
        trainerId: 'user_102',
        studentId: 'user_002',
        fieldId: 'tech-companies',
        scheduledAt: new Date('2024-12-09T14:00:00Z'),
        status: 'completed',
        duration: 90,
        notes: 'Completed roadmap creation for mobile development track',
        roadmapData: {
            studentGoals: ['Learn React Native', 'Build mobile apps', 'Understand cross-platform development'],
            learningPath: [
                {
                    id: 'module_001',
                    title: 'React Native Fundamentals',
                    description: 'Introduction to React Native development',
                    estimatedHours: 40,
                    prerequisites: ['JavaScript', 'React'],
                    resources: [
                        {
                            id: 'resource_001',
                            title: 'React Native Documentation',
                            type: 'document',
                            url: 'https://reactnative.dev/docs/getting-started',
                            description: 'Official React Native documentation'
                        }
                    ],
                    order: 1
                }
            ],
            timeline: [
                {
                    id: 'timeline_001',
                    moduleId: 'module_001',
                    startDate: new Date('2024-12-15'),
                    endDate: new Date('2025-01-15'),
                    milestones: ['Setup development environment', 'Build first app', 'Deploy to simulator'],
                    status: 'pending'
                }
            ],
            assessmentCriteria: ['Build functional mobile app', 'Demonstrate navigation', 'Implement state management']
        },
        createdAt: new Date('2024-12-08T10:00:00Z')
    }
];

export const getOnboardingSessionById = (id: string) => mockOnboardingSessions.find(s => s.id === id);
export const getOnboardingSessionsByTrainer = (trainerId: string) => mockOnboardingSessions.filter(s => s.trainerId === trainerId);
export const getOnboardingSessionsByStudent = (studentId: string) => mockOnboardingSessions.filter(s => s.studentId === studentId);
export const getOnboardingSessionsByField = (fieldId: string) => mockOnboardingSessions.filter(s => s.fieldId === fieldId);
