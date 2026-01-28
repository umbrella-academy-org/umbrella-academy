// Wing management service - Data access layer for wing operations

import { Wing, Company, User } from '@/types';
import { 
  mockWings, 
  mockCompanies, 
  getWingById, 
  getActiveWings, 
  getCompaniesByWing,
  getCompanyById,
  createWing,
  updateWing,
  deleteWing
} from '@/data/wings';
import { 
  getUsersByWing, 
  getStudentsByWing, 
  getTrainersByWing, 
  getMentorsByWing,
  assignUserToWing,
  validateWingAccess
} from '@/data/users';

export class WingService {
  /**
   * Get all wings with populated user data
   */
  static async getAllWings(): Promise<Wing[]> {
    return mockWings.map(wing => ({
      ...wing,
      students: getStudentsByWing(wing.id),
      trainers: getTrainersByWing(wing.id),
      mentors: getMentorsByWing(wing.id)
    }));
  }

  /**
   * Get active wings only
   */
  static async getActiveWings(): Promise<Wing[]> {
    const activeWings = getActiveWings();
    return activeWings.map(wing => ({
      ...wing,
      students: getStudentsByWing(wing.id),
      trainers: getTrainersByWing(wing.id),
      mentors: getMentorsByWing(wing.id)
    }));
  }

  /**
   * Get wing by ID with populated user data
   */
  static async getWingById(id: string): Promise<Wing | null> {
    const wing = getWingById(id);
    if (!wing) return null;

    return {
      ...wing,
      students: getStudentsByWing(wing.id),
      trainers: getTrainersByWing(wing.id),
      mentors: getMentorsByWing(wing.id)
    };
  }

  /**
   * Get companies by wing ID
   */
  static async getCompaniesByWing(wingId: string): Promise<Company[]> {
    return getCompaniesByWing(wingId);
  }

  /**
   * Get company by ID
   */
  static async getCompanyById(id: string): Promise<Company | null> {
    return getCompanyById(id) || null;
  }

  /**
   * Create a new wing
   */
  static async createWing(wingData: Omit<Wing, 'id' | 'createdAt' | 'students' | 'trainers' | 'mentors'>): Promise<Wing> {
    const newWing = createWing({
      ...wingData,
      students: [],
      trainers: [],
      mentors: []
    });
    return newWing;
  }

  /**
   * Update wing information
   */
  static async updateWing(id: string, updates: Partial<Wing>): Promise<Wing | null> {
    return updateWing(id, updates);
  }

  /**
   * Delete wing (soft delete by setting isActive to false)
   */
  static async deleteWing(id: string): Promise<boolean> {
    const wing = getWingById(id);
    if (!wing) return false;

    return updateWing(id, { isActive: false }) !== null;
  }

  /**
   * Assign user to wing
   */
  static async assignUserToWing(userId: string, wingId: string): Promise<boolean> {
    // Validate wing exists
    const wing = getWingById(wingId);
    if (!wing || !wing.isActive) return false;

    return assignUserToWing(userId, wingId);
  }

  /**
   * Validate user has access to wing resources
   */
  static async validateWingAccess(userId: string, resourceWingId: string): Promise<boolean> {
    return validateWingAccess(userId, resourceWingId);
  }

  /**
   * Get wing statistics
   */
  static async getWingStatistics(wingId: string): Promise<{
    totalStudents: number;
    totalTrainers: number;
    totalMentors: number;
    totalRevenue: number;
    activeCompanies: number;
  } | null> {
    const wing = await this.getWingById(wingId);
    if (!wing) return null;

    return {
      totalStudents: wing.students.length,
      totalTrainers: wing.trainers.length,
      totalMentors: wing.mentors.length,
      totalRevenue: wing.totalRevenue,
      activeCompanies: wing.companies.filter(c => c.isActive).length
    };
  }

  /**
   * Get all wings with basic info for selection UI
   */
  static async getWingsForSelection(): Promise<Array<{
    id: string;
    name: string;
    description: string;
    industry: string;
    companiesCount: number;
    isActive: boolean;
  }>> {
    const wings = getActiveWings();
    return wings.map(wing => ({
      id: wing.id,
      name: wing.name,
      description: wing.description,
      industry: wing.industry,
      companiesCount: wing.companies.length,
      isActive: wing.isActive
    }));
  }
}