// User management service - Data access layer for user operations

import { User, StudentUser, TrainerUser, MentorUser, AdminUser } from '@/types';
import {
  mockUsers,
  getStudents,
  getTrainers,
  getMentors,
  getFieldAdmins,
  getUmbrellaAdmins,
  getUsersByField,
  getStudentsByField,
  getTrainersByField,
  getMentorsByField,
  getUserById,
  getUserByEmail,
  assignUserToField,
  validateFieldAccess
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
      case 'field-admin':
        return getFieldAdmins();
      case 'umbrella-admin':
        return getUmbrellaAdmins();
      default:
        return [];
    }
  }

  /**
   * Get users by field ID
   */
  static async getUsersByField(fieldId: string): Promise<User[]> {
    return getUsersByField(fieldId);
  }

  /**
   * Get students by field ID
   */
  static async getStudentsByField(fieldId: string): Promise<StudentUser[]> {
    return getStudentsByField(fieldId);
  }

  /**
   * Get trainers by field ID
   */
  static async getTrainersByField(fieldId: string): Promise<TrainerUser[]> {
    return getTrainersByField(fieldId);
  }

  /**
   * Get mentors by field ID
   */
  static async getMentorsByField(fieldId: string): Promise<MentorUser[]> {
    return getMentorsByField(fieldId);
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
   * Assign user to field
   */
  static async assignUserToField(userId: string, fieldId: string): Promise<boolean> {
    return assignUserToField(userId, fieldId);
  }

  /**
   * Validate field-based access control
   */
  static async validateFieldAccess(userId: string, resourceFieldId: string): Promise<boolean> {
    return validateFieldAccess(userId, resourceFieldId);
  }

  /**
   * Get available trainers for a field
   */
  static async getAvailableTrainers(fieldId: string): Promise<TrainerUser[]> {
    const trainers = getTrainersByField(fieldId);
    return trainers.filter(trainer =>
      trainer.status === 'active' &&
      trainer.isActive
    );
  }

  /**
   * Search users by name or email
   */
  static async searchUsers(query: string, fieldId?: string): Promise<User[]> {
    let users = mockUsers;

    // Filter by field if specified
    if (fieldId) {
      users = getUsersByField(fieldId);
    }

    // Search by name or email
    const searchQuery = query.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
    );
  }

  /**
   * Get user statistics for a field
   */
  static async getFieldUserStatistics(fieldId: string): Promise<{
    totalUsers: number;
    students: number;
    trainers: number;
    mentors: number;
    activeUsers: number;
    inactiveUsers: number;
  }> {
    const users = getUsersByField(fieldId);

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
  static async validateRegistration(email: string, fieldId?: string): Promise<{
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