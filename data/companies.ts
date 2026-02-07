import { Company } from '@/types';

export const mockCompanies: Company[] = [
    // Software Engineering Field
    {
        id: 'comp-se-1',
        name: 'Nexus Systems',
        website: 'https://nexus-systems.tech',
        achievements: [
            'Cloud Architecture Excellence 2024',
            'Top 10 Managed Service Providers',
            'Pioneers in Zero-Trust Development'
        ],
        teachingFocus: [
            'Microservices Architecture',
            'Cloud-Native Development',
            'Advanced DevOps Pipelines',
            'Distributed Databases'
        ],
        images: [
            '/auth/login/image.png',

        ],
        description: 'A global leader in enterprise-grade software infrastructure, focusing on high-availability systems and cloud-native transformations.',
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
        }
    },
    {
        id: 'comp-se-2',
        name: 'Velocity Lab',
        website: 'https://velocitylab.io',
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
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop'
        ],
        description: 'An innovation-first laboratory specializing in rapid product cycles and high-performance user applications.',
        fieldId: 'software-engineering',
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

    // UX & Product Innovation Field
    {
        id: 'comp-ux-1',
        name: 'Prism Design',
        website: 'https://prismdesign.agency',
        achievements: [
            'Red Dot Design Award 2024',
            'Best User Experience Agency',
            'Leading Mobile App Design Hub'
        ],
        teachingFocus: [
            'Emotional Design',
            'Motion Systems',
            'Psychological UX Research',
            'Accessibility Standards'
        ],
        images: [
            'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522071823991-b1ae5e33d07e?q=80&w=2071&auto=format&fit=crop'
        ],
        description: 'A premium design agency transforming how humans interact with digital products through sensory-driven UX.',
        fieldId: 'ux-innovation',
        isActive: true,
        createdAt: new Date('2023-02-20'),
        rating: 4.9,
        successRate: 97,
        featured: true,
        stats: {
            alumni: 320,
            hiringRate: 95,
            partnerSince: '2023'
        }
    },
    {
        id: 'comp-ux-2',
        name: 'Aura Studio',
        website: 'https://aurastudio.design',
        achievements: [
            'Innovation in Motion Design',
            'Top 5 UX Research Hubs',
            'Future of Interaction Award'
        ],
        teachingFocus: [
            'Product Strategy',
            'Interaction Design',
            'Prototyping High-Fi',
            'Design Thinking Elite'
        ],
        images: [
            'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop'
        ],
        description: 'Studio focused on the future of digital interactions, combining minimal aesthetics with maximal functionality.',
        fieldId: 'ux-innovation',
        isActive: true,
        createdAt: new Date('2023-06-12'),
        rating: 4.8,
        successRate: 93,
        stats: {
            alumni: 150,
            hiringRate: 90,
            partnerSince: '2024'
        }
    },

    // AI & Data Intelligence Field
    {
        id: 'comp-ai-1',
        name: 'Neural Core',
        website: 'https://neuralcore.ai',
        achievements: [
            'AI Breakthrough Award 2024',
            'Most Ethical AI Implementation',
            'Data Science Excellence Center'
        ],
        teachingFocus: [
            'Deep Learning Models',
            'Natural Language Processing',
            'Big Data Engineering',
            'AI Ethics & Governance'
        ],
        images: [
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop'
        ],
        description: 'An AI research powerhouse building the next generation of neural systems for complex industrial automation.',
        fieldId: 'ai-intelligence',
        isActive: true,
        createdAt: new Date('2023-03-05'),
        rating: 5.0,
        successRate: 99,
        featured: true,
        stats: {
            alumni: 210,
            hiringRate: 98,
            partnerSince: '2023'
        }
    },
    {
        id: 'comp-ai-2',
        name: 'DataPulse Solutions',
        website: 'https://datapulse.tech',
        achievements: [
            'Fastest Predictive Model 2023',
            'Top Data Engineering Firm',
            'Innovative ML Pipeline Award'
        ],
        teachingFocus: [
            'Predictive Analytics',
            'Computer Vision',
            'Data Lifecycle Management',
            'MLOps Best Practices'
        ],
        images: [
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop'
        ],
        description: 'Data-centric firm specializing in real-time predictive modeling and large-scale data integrity.',
        fieldId: 'ai-intelligence',
        isActive: true,
        createdAt: new Date('2023-08-18'),
        rating: 4.8,
        successRate: 95,
        stats: {
            alumni: 180,
            hiringRate: 94,
            partnerSince: '2023'
        }
    },

    // Cyber Resilience Field
    {
        id: 'comp-sec-1',
        name: 'Iron Aegis',
        website: 'https://ironaegis.com',
        achievements: [
            'Global Security Leader 2024',
            'Zero-Leach Certification',
            'Best Cyber Defense Infrastructure'
        ],
        teachingFocus: [
            'Offensive Security',
            'Advanced Cryptography',
            'Incident Response',
            'Network Forensics'
        ],
        images: [
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop'
        ],
        description: 'Elite defensive group protecting critical national infrastructure and major financial institutions worldwide.',
        fieldId: 'cyber-resilience',
        isActive: true,
        createdAt: new Date('2023-04-01'),
        rating: 4.9,
        successRate: 96,
        featured: true,
        stats: {
            alumni: 120,
            hiringRate: 97,
            partnerSince: '2023'
        }
    },
    {
        id: 'comp-sec-2',
        name: 'Cryptic Guard',
        website: 'https://crypticguard.security',
        achievements: [
            'Innovation in Blockchain Sec',
            'Top Penetration Testing Firm',
            'Most Secure Cloud Service'
        ],
        teachingFocus: [
            'Cloud Security Posture',
            'Ethical Hacking Ops',
            'Compliance & Governance',
            'Security Automation'
        ],
        images: [
            'https://images.unsplash.com/photo-1510511459019-5dee667ffb9c?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'
        ],
        description: 'Modern security firm focused on cloud-native protection and the offensive-defensive balance of web technologies.',
        fieldId: 'cyber-resilience',
        isActive: true,
        createdAt: new Date('2023-09-22'),
        rating: 4.7,
        successRate: 92,
        stats: {
            alumni: 95,
            hiringRate: 91,
            partnerSince: '2024'
        }
    }
];
