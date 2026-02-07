// Enhanced field data for Umbrella Academy LMS with company structure
import { Field, Company } from '@/types';
import { mockCompanies } from './companies';

export const mockFields: Field[] = [
    {
        id: 'software-engineering',
        name: 'Software Engineering',
        description: 'Master the art of building scalable enterprise systems. From cloud-native architecture to full-stack mastery, gain the technical edge needed to lead in the modern tech landscape.',
        industry: 'Technology',
        companies: mockCompanies.filter(c => c.fieldId === 'software-engineering'),
        mentors: [],
        trainers: [],
        selectionTrainers: {
            total: 32,
            available: 24,
            topTrainers: [
                { name: 'Dr. Sarah Chen', avatar: 'SC', specialization: 'Distributed Systems', rating: 4.9 },
                { name: 'Marcus Rodriguez', avatar: 'MR', specialization: 'Cloud Architecture', rating: 4.8 }
            ]
        },
        specializations: ['Distributed Systems', 'Cloud Native', 'DevOps Elite', 'Full-stack JS'],
        students: [],
        revenueShare: 65,
        totalRevenue: 2850000,
        createdAt: new Date('2023-01-01'),
        isActive: true,
        code: 'SOFT',
        status: 'active',
        icon: '🚀',
        rating: 4.9,
        successRate: 98,
        studentsCount: 2450,
        mentorsCount: 12,
        averageCompletionTime: '6-9 months',
        monthlyPrice: 85000
    },
    {
        id: 'ux-innovation',
        name: 'UX & Product Innovation',
        description: 'Go beyond interfaces. Design immersive digital ecosystems using psychology-driven UX, motion design, and strategic product thinking that users love.',
        industry: 'Design',
        companies: mockCompanies.filter(c => c.fieldId === 'ux-innovation'),
        mentors: [],
        trainers: [],
        selectionTrainers: {
            total: 22,
            available: 15,
            topTrainers: [
                { name: 'Elena Frost', avatar: 'EF', specialization: 'Interaction Design', rating: 4.9 },
                { name: 'David Okafor', avatar: 'DO', specialization: 'User Research', rating: 4.7 }
            ]
        },
        specializations: ['Behavioral UX', 'Motion Systems', 'Product Strategy', 'Design Ops'],
        students: [],
        revenueShare: 65,
        totalRevenue: 1920000,
        createdAt: new Date('2023-01-01'),
        isActive: true,
        code: 'UXPI',
        status: 'active',
        icon: '🎨',
        rating: 4.8,
        successRate: 95,
        studentsCount: 1820,
        mentorsCount: 10,
        averageCompletionTime: '5-7 months',
        monthlyPrice: 72000
    },
    {
        id: 'ai-intelligence',
        name: 'AI & Data Intelligence',
        description: 'Harness the power of neural networks and big data. Build intelligent systems that predict, automate, and solve complex global challenges at scale.',
        industry: 'Artificial Intelligence',
        companies: mockCompanies.filter(c => c.fieldId === 'ai-intelligence'),
        mentors: [],
        trainers: [],
        selectionTrainers: {
            total: 28,
            available: 18,
            topTrainers: [
                { name: 'Prof. Julian Voss', avatar: 'JV', specialization: 'Deep Learning', rating: 5.0 },
                { name: 'Ami Tanaka', avatar: 'AT', specialization: 'NLP Systems', rating: 4.8 }
            ]
        },
        specializations: ['Machine Learning', 'Neural Networks', 'Big Data Ops', 'Ethical AI'],
        students: [],
        revenueShare: 65,
        totalRevenue: 3450000,
        createdAt: new Date('2023-01-01'),
        isActive: true,
        code: 'AIDI',
        status: 'active',
        icon: '🧠',
        rating: 4.9,
        successRate: 92,
        studentsCount: 1560,
        mentorsCount: 15,
        averageCompletionTime: '8-12 months',
        monthlyPrice: 95000
    },
    {
        id: 'cyber-resilience',
        name: 'Cyber Resilience & Trust',
        description: 'Defend the digital frontier. Master offensive security, advanced cryptography, and zero-trust architectures to protect global infrastructure from emerging threats.',
        industry: 'Cybersecurity',
        companies: mockCompanies.filter(c => c.fieldId === 'cyber-resilience'),
        mentors: [],
        trainers: [],
        selectionTrainers: {
            total: 18,
            available: 12,
            topTrainers: [
                { name: 'Sam "Viper" Wright', avatar: 'SW', specialization: 'Ethical Hacking', rating: 4.9 },
                { name: 'Lisa Ray', avatar: 'LR', specialization: 'Cryptography', rating: 4.8 }
            ]
        },
        specializations: ['Penetration Testing', 'Risk Governance', 'Network Defense', 'Cloud Security'],
        students: [],
        revenueShare: 65,
        totalRevenue: 1680000,
        createdAt: new Date('2023-01-01'),
        isActive: true,
        code: 'CYBR',
        status: 'active',
        icon: '🛡️',
        rating: 4.7,
        successRate: 89,
        studentsCount: 980,
        mentorsCount: 8,
        averageCompletionTime: '7-10 months',
        monthlyPrice: 78000
    }
];

// Helper functions
export const getFieldById = (id: string): Field | undefined =>
    mockFields.find(field => field.id === id);

export const getFieldByCode = (code: string): Field | undefined =>
    mockFields.find(field => field.code === code);

export const getActiveFields = (): Field[] =>
    mockFields.filter(field => field.isActive);

export const createField = (fieldData: Omit<Field, 'id' | 'createdAt'>): Field => {
    const newField: Field = {
        ...fieldData,
        id: `field_${Date.now()}`,
        createdAt: new Date()
    };
    mockFields.push(newField);
    return newField;
};

export const updateField = (id: string, updates: Partial<Field>): Field | null => {
    const fieldIndex = mockFields.findIndex(field => field.id === id);
    if (fieldIndex === -1) return null;

    mockFields[fieldIndex] = { ...mockFields[fieldIndex], ...updates };
    return mockFields[fieldIndex];
};

export const deleteField = (id: string): boolean => {
    const fieldIndex = mockFields.findIndex(field => field.id === id);
    if (fieldIndex === -1) return false;

    mockFields.splice(fieldIndex, 1);
    return true;
};

export const getCompaniesByField = (fieldId: string): Company[] =>
    mockCompanies.filter(company => company.fieldId === fieldId && company.isActive);

export const getCompanyById = (id: string): Company | undefined =>
    mockCompanies.find(company => company.id === id);

export const getTotalStudents = (): number =>
    mockFields.reduce((total, field) => total + field.studentsCount, 0);

export const getTotalTrainers = (): number =>
    mockFields.reduce((total, field) => total + (field.selectionTrainers?.total || 0), 0);

export const getTotalRevenue = (): number =>
    mockFields.reduce((total, field) => total + field.totalRevenue, 0);
