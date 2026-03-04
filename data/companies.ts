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
        name: 'Greenland Film and Television School',
        website: 'https://www.greenlandpictures.rw',
        achievements: [
            'Award-winning filmmakers on staff',
            'Professional equipment access',
            'Industry connections with production companies'
        ],
        teachingFocus: [
            'Professional Filmmaking & Video Production',
            'Graphic Design & Photography',
            'Cinematography & Directing',
            'Post-Production & Editing'
        ],
        images: [
             '/real/greenlandlogo.jpeg',
        ],
        description: 'Learn by Doing - Transform Your Passion into a Profession. We nurture creativity, technical expertise, and professional discipline through hands-on learning in filmmaking, design, and visual storytelling.',
        fieldId: 'media-production-and-storytelling',
        isActive: true,
        createdAt: new Date('2023-05-15'),
        rating: 4.7,
        successRate: 94,
        stats: {
            alumni: 280,
            hiringRate: 92,
            partnerSince: '2023'
        },
        programDetails: {
            curriculum: 'Each student engages in hands-on projects to apply every concept practically, covering all stages of film and media production.',
            duration: {
                minimum: '3 months (Basic/Short Film Level)',
                extended: '6 months for Advanced Skills, 1 year for Professional Mastery'
            },
            schedule: {
                days: 'Morning Shift: 08:00-10:00, Mid-Morning: 10:30-12:30, Weekend: 08:00-16:00',
                flexibility: 'Flexible schedules with multiple shift options to accommodate different lifestyles'
            },
            projects: [
                'Full short-film production with team collaboration',
                'Branding projects combining design and photography',
                'Portfolio development with industry-ready projects and showreels',
                'Practical assignments with professional feedback'
            ]
        },
        pricing: {
            tuition: 'Filmmaking: 300,000 RWF | Videography: 250,000 RWF | Graphic Design & Photography: 200,000 RWF',
            includes: [
                'Course materials',
                'Mentorship & guidance from industry professionals',
                'Refreshments',
                'Certification upon completion',
                'Professional equipment access (cameras, lighting, editing tools)'
            ]
        },
        whyChoose: [
            'Hands-On Learning – Focused on practical skills from day one',
            'Industry Mentorship – Learn directly from award-winning filmmakers and professionals',
            'Professional Equipment Access – Use advanced cameras, lighting, and editing tools',
            'Collaborative Learning – Work in teams to simulate real production environments',
            'Portfolio Development – Graduate with industry-ready projects and showreels',
            'Career Opportunities – Build connections with production companies and creative agencies',
            'Small Class Sizes – Filmmaking: 10 students per shift, Design & Photography: 6 students per shift'
        ]
    },

 
];
