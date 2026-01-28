// User management service - Data access layer for user operations

import { User, StudentUser, TrainerUser, MentorUser, AdminUser } from '@/types';
import { 
  mockUsers,
  getStudents,
  getTrainers,
  getMentors,
  getWingAdmins,
  getUmbrellaAdmins,
  getUsersByWing,
  getStudentsByWing,
  getTrainersByWing,
  getMentorsByWing,
  getUserById,
  getUserByEmail,
  assignUserToWing,
  validateWingAccess
} from '@/data/users';

export class UserService {
  /**
   * Get all users
   */
  static async getAllUsers(): Promise<User[]> {
    return mockUsers;
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<User | null> {
    return getUserById(id) || null;
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    return getUserByEmail(email) || null;
  }

  /**
   * Get users by role
   */
  static async getUsersByRole(role: User['role']): Promise<User[]> {
    switch (role) {
      case 'student':
        return getStudents();
      case 'trainer':
        return getTrainers();
      case 'mentor':
        return getMentors();
      case 'wing-admin':
        return getWingAdmins();
      case 'umbrella-admin':
        return getUmbrellaAdmins();
      default:
        return [];
    }
  }

  /**
   * Get users by wing ID
   */
  static async getUsersByWing(wingId: string): Promise<User[]> {
    return getUsersByWing(wingId);
  }

  /**
   * Get students by wing ID
   */
  static async getStudentsByWing(wingId: string): Promise<StudentUser[]> {
    return getStudentsByWing(wingId);
  }

  /**
   * Get trainers by wing ID
   */
  static async getTrainersByWing(wingId: string): Promise<TrainerUser[]> {
    return getTrainersByWing(wingId);
  }

  /**
   * Get mentors by wing ID
   */
  static async getMentorsByWing(wingId: string): Promise<MentorUser[]> {
    return getMentorsByWing(wingId);
  }

  /**
   * Create a new user
   */
  static async createUser(userData: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'isActive'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true
    } as User;

    mockUsers.push(newUser);
    return newUser;
  }

  /**
   * Update user information
   */
  static async updateUser(id: string, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    const currentUser = mockUsers[userIndex];
    const updatedUser = { ...currentUser, ...updates } as User;
    mockUsers[userIndex] = updatedUser;
    return updatedUser;
  }

  /**
   * Delete user (soft delete by setting isActive to false)
   */
  static async deleteUser(id: string): Promise<boolean> {
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    mockUsers[userIndex].isActive = false;
    mockUsers[userIndex].status = 'inactive';
    return true;
  }

  /**
   * Assign user to wing
   */
  static async assignUserToWing(userId: string, wingId: string): Promise<boolean> {
    return assignUserToWing(userId, wingId);
  }

  /**
   * Validate wing-based access control
   */
  static async validateWingAccess(userId: string, resourceWingId: string): Promise<boolean> {
    return validateWingAccess(userId, resourceWingId);
  }

  /**
   * Get available trainers for a wing
   */
  static async getAvailableTrainers(wingId: string): Promise<TrainerUser[]> {
    const trainers = getTrainersByWing(wingId);
    return trainers.filter(trainer => 
      trainer.status === 'active' && 
      trainer.isActive
    );
  }

  /**
   * Search users by name or email
   */
  static async searchUsers(query: string, wingId?: string): Promise<User[]> {
    let users = mockUsers;
    
    // Filter by wing if specified
    if (wingId) {
      users = getUsersByWing(wingId);
    }

    // Search by name or email
    const searchQuery = query.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
    );
  }

  /**
   * Get user statistics for a wing
   */
  static async getWingUserStatistics(wingId: string): Promise<{
    totalUsers: number;
    students: number;
    trainers: number;
    mentors: number;
    activeUsers: number;
    inactiveUsers: number;
  }> {
    const users = getUsersByWing(wingId);
    
    return {
      totalUsers: users.length,
      students: users.filter(u => u.role === 'student').length,
      trainers: users.filter(u => u.role === 'trainer').length,
      mentors: users.filter(u => u.role === 'mentor').length,
      activeUsers: users.filter(u => u.isActive && u.status === 'active').length,
      inactiveUsers: users.filter(u => !u.isActive || u.status !== 'active').length
    };
  }

  /**
   * Validate user registration data
   */
  static async validateRegistration(email: string, wingId?: string): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];

    // Check if email already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      errors.push('Email already registered');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}