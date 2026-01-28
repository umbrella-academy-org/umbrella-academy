// Enhanced wing data for Umbrella Academy LMS with company structure

import { Wing, Company } from '@/types';

// Sample companies for different wings
export const mockCompanies: Company[] = [
  // Tech Companies Wing
  {
    id: 'company_001',
    name: 'TechCorp Rwanda',
    website: 'https://techcorp.rw',
    achievements: ['ISO 27001 Certified', 'Best Tech Company 2023', '500+ Successful Projects'],
    teachingFocus: ['Full Stack Development', 'Cloud Computing', 'DevOps', 'Mobile Development'],
    images: ['/companies/techcorp-1.jpg', '/companies/techcorp-2.jpg'],
    description: 'Leading technology company specializing in enterprise software solutions and digital transformation.',
    wingId: 'tech-companies',
    isActive: true,
    createdAt: new Date('2022-01-15')
  },
  {
    id: 'company_002',
    name: 'InnovateLab',
    website: 'https://innovatelab.rw',
    achievements: ['Innovation Award 2023', 'Top Startup Incubator', '200+ Startups Launched'],
    teachingFocus: ['AI/ML', 'Data Science', 'Blockchain', 'IoT Development'],
    images: ['/companies/innovatelab-1.jpg', '/companies/innovatelab-2.jpg'],
    description: 'Innovation hub focused on emerging technologies and startup development.',
    wingId: 'tech-companies',
    isActive: true,
    createdAt: new Date('2022-03-20')
  },
  
  // Business Companies Wing
  {
    id: 'company_003',
    name: 'BusinessPro Solutions',
    website: 'https://businesspro.rw',
    achievements: ['Business Excellence Award', '1000+ Clients Served', 'Regional Expansion'],
    teachingFocus: ['Business Strategy', 'Project Management', 'Digital Marketing', 'Finance'],
    images: ['/companies/businesspro-1.jpg', '/companies/businesspro-2.jpg'],
    description: 'Comprehensive business consulting and training solutions for enterprises.',
    wingId: 'business-companies',
    isActive: true,
    createdAt: new Date('2022-02-10')
  },
  {
    id: 'company_004',
    name: 'MarketMasters',
    website: 'https://marketmasters.rw',
    achievements: ['Marketing Agency of the Year', '300% Client Growth', 'Digital Innovation Leader'],
    teachingFocus: ['Digital Marketing', 'Brand Management', 'Social Media Strategy', 'Analytics'],
    images: ['/companies/marketmasters-1.jpg', '/companies/marketmasters-2.jpg'],
    description: 'Premier marketing agency specializing in digital transformation and brand building.',
    wingId: 'business-companies',
    isActive: true,
    createdAt: new Date('2022-04-05')
  },
  
  // Hotels Wing
  {
    id: 'company_005',
    name: 'Luxury Hotels Rwanda',
    website: 'https://luxuryhotels.rw',
    achievements: ['5-Star Rating', 'Hospitality Excellence Award', '95% Guest Satisfaction'],
    teachingFocus: ['Hotel Management', 'Customer Service', 'Event Planning', 'Tourism'],
    images: ['/companies/luxuryhotels-1.jpg', '/companies/luxuryhotels-2.jpg'],
    description: 'Premium hospitality group offering world-class accommodation and service training.',
    wingId: 'hotels',
    isActive: true,
    createdAt: new Date('2022-01-25')
  },
  {
    id: 'company_006',
    name: 'EcoLodge Network',
    website: 'https://ecolodge.rw',
    achievements: ['Sustainable Tourism Award', 'Eco-Certified', 'Community Impact Leader'],
    teachingFocus: ['Sustainable Tourism', 'Eco-Management', 'Cultural Heritage', 'Conservation'],
    images: ['/companies/ecolodge-1.jpg', '/companies/ecolodge-2.jpg'],
    description: 'Sustainable hospitality network focused on eco-tourism and community development.',
    wingId: 'hotels',
    isActive: true,
    createdAt: new Date('2022-05-15')
  }
];

export const mockWings: Wing[] = [
  {
    id: 'tech-companies',
    name: 'Tech Companies Wing',
    description: 'Technology sector companies specializing in software development, AI, and digital innovation',
    industry: 'Technology',
    companies: mockCompanies.filter(c => c.wingId === 'tech-companies'),
    mentors: [], // Will be populated from user data
    trainers: [], // Will be populated from user data
    students: [], // Will be populated from user data
    revenueShare: 65, // 65% to wing
    totalRevenue: 2850000,
    revenue: 2850000, // Alias for compatibility
    createdAt: new Date('2022-01-01'),
    isActive: true,
    // Legacy compatibility
    code: 'TECH',
    adminId: 'user_301',
    adminName: 'Emmanuel Nkurunziza',
    status: 'active',
    settings: {
      maxStudentsPerTrainer: 6,
      minHoursPerWeek: 20,
      wingSharePercentage: 65,
      bankAccount: 'BK-001-2024-TECH'
    }
  },
  {
    id: 'business-companies',
    name: 'Business Companies Wing',
    description: 'Business sector companies focusing on consulting, marketing, and enterprise solutions',
    industry: 'Business',
    companies: mockCompanies.filter(c => c.wingId === 'business-companies'),
    mentors: [],
    trainers: [],
    students: [],
    revenueShare: 65,
    totalRevenue: 1920000,
    revenue: 1920000, // Alias for compatibility
    createdAt: new Date('2022-01-01'),
    isActive: true,
    // Legacy compatibility
    code: 'BIZ',
    adminId: 'user_302',
    adminName: 'Claudine Mukamana',
    status: 'active',
    settings: {
      maxStudentsPerTrainer: 5,
      minHoursPerWeek: 18,
      wingSharePercentage: 65,
      bankAccount: 'BK-002-2024-BIZ'
    }
  },
  {
    id: 'hotels',
    name: 'Hotels Wing',
    description: 'Hospitality sector companies specializing in hotel management and tourism services',
    industry: 'Hospitality',
    companies: mockCompanies.filter(c => c.wingId === 'hotels'),
    mentors: [],
    trainers: [],
    students: [],
    revenueShare: 65,
    totalRevenue: 1680000,
    revenue: 1680000, // Alias for compatibility
    createdAt: new Date('2022-01-01'),
    isActive: true,
    // Legacy compatibility
    code: 'HTL',
    adminId: 'user_303',
    adminName: 'Jean Baptiste Nzeyimana',
    status: 'active',
    settings: {
      maxStudentsPerTrainer: 6,
      minHoursPerWeek: 16,
      wingSharePercentage: 65,
      bankAccount: 'BK-003-2024-HTL'
    }
  }
];

// Helper functions
export const getWingById = (id: string): Wing | undefined => 
  mockWings.find(wing => wing.id === id);

export const getWingByCode = (code: string): Wing | undefined => 
  mockWings.find(wing => wing.code === code);

export const getActiveWings = (): Wing[] => 
  mockWings.filter(wing => wing.isActive);

export const getCompaniesByWing = (wingId: string): Company[] => 
  mockCompanies.filter(company => company.wingId === wingId && company.isActive);

export const getCompanyById = (id: string): Company | undefined => 
  mockCompanies.find(company => company.id === id);

export const getAllCompanies = (): Company[] => 
  mockCompanies.filter(company => company.isActive);

export const getTotalStudents = (): number => 
  mockWings.reduce((total, wing) => total + wing.students.length, 0);

export const getTotalTrainers = (): number => 
  mockWings.reduce((total, wing) => total + wing.trainers.length, 0);

export const getTotalRevenue = (): number => 
  mockWings.reduce((total, wing) => total + wing.totalRevenue, 0);

// Wing management functions
export const createWing = (wingData: Omit<Wing, 'id' | 'createdAt'>): Wing => {
  const newWing: Wing = {
    ...wingData,
    id: `wing_${Date.now()}`,
    createdAt: new Date()
  };
  mockWings.push(newWing);
  return newWing;
};

export const updateWing = (id: string, updates: Partial<Wing>): Wing | null => {
  const wingIndex = mockWings.findIndex(wing => wing.id === id);
  if (wingIndex === -1) return null;
  
  mockWings[wingIndex] = { ...mockWings[wingIndex], ...updates };
  return mockWings[wingIndex];
};

export const deleteWing = (id: string): boolean => {
  const wingIndex = mockWings.findIndex(wing => wing.id === id);
  if (wingIndex === -1) return false;
  
  mockWings.splice(wingIndex, 1);
  return true;
};