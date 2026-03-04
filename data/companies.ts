import { Company } from '@/types';

export const mockCompanies: Company[] = [
    
    {
        id: 'comp-se-1',
        name: 'DREAMIZE Africa',
        website: 'https://dreamizeafrica.com',
        achievements: [
            'Cloud Architecture Excellence 2024',
            'Top 10 Managed Service Providers',
            'Pioneers in Zero-Trust Development'
        ],
        teachingFocus: [
            'Embedded Systems & Robotics',
            'Software Engineering',
            'Cybersecurity',
            'Machine Learning & Artificial Intelligence (AI)'
        ],
        images: [
            '/real/dreamizelogo.jpeg',

        ],
        description: 'Our mission is to provide high-quality, hands-on technology education tailored to each student’s goals and pace.',
        fieldId: 'software-engineering',
        isActive: true,
        createdAt: new Date('2023-01-10'),
        rating: 4.9,
        successRate: 98,
        featured: true,
        stats: {
            alumni: 450,
            hiringRate: 96,
            partnerSince: '2023'
        },
        programDetails: {
            curriculum: 'Each student receives a custom learning roadmap, structured to build skills progressively.',
            duration: {
                minimum: '4 months',
                extended: 'Extended learning based on progress and student goals'
            },
            schedule: {
                days: 'Monday to Friday',
                flexibility: 'Hours are flexible, coordinated between the student and assigned mentors'
            },
            projects: [
                'All programs include real-world projects to practice what you learn',
                'Students get continuous feedback from mentors and trainers'
            ]
        },
        pricing: {
            tuition: '100,000 RWF per month',
            includes: [
                'Full access to learning materials',
                'Mentorship support',
                'Personalized progress tracking',
                'Project guidance and feedback'
            ]
        },
        whyChoose: [
            'High-Quality Mentorship – Each student is assigned mentors and trainers',
            'Career-Oriented – Roadmaps are designed to prepare students for industry opportunities'
        ]
    },
    {
        id: 'comp-se-2',
        name: 'Greenland Film and television school',
        website: 'https://www.greenlandpictures.rw',
        achievements: [
            'Agile Transformation Award',
            'Open Source Contributor of the Year',
            'Fastest Scaling Tech Startup 2023'
        ],
        teachingFocus: [
            'Rapid Prototyping',
            'Test-Driven Development',
            'Modern Frontend Frameworks',
            'Mobile App Scale'
        ],
        images: [
             '/real/greenlandlogo.jpeg',
        ],
        description: 'An innovation-first laboratory specializing in rapid product cycles and high-performance user applications.',
        fieldId: 'media-production-and-storytelling',
        isActive: true,
        createdAt: new Date('2023-05-15'),
        rating: 4.7,
        successRate: 94,
        stats: {
            alumni: 280,
            hiringRate: 92,
            partnerSince: '2023'
        }
    },

 
];
