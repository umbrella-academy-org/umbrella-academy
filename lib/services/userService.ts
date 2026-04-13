// User management service - Data access layer for user operations

import { User, StudentUser, TrainerUser } from '@/types';
import {
  mockUsers,
  getStudents,
  getTrainers,
  getUserById,
  getUserByEmail,
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
      default:
        return [];
    }
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
   * Get available trainers
   */
  static async getAvailableTrainers(): Promise<TrainerUser[]> {
    const trainers = getTrainers();
    return trainers.filter(trainer =>
      trainer.status === 'active' &&
      trainer.isActive
    );
  }

  /**
   * Search users by name or email
   */
  static async searchUsers(query: string): Promise<User[]> {
    const searchQuery = query.toLowerCase();
    return mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
    );
  }

  /**
   * Validate user registration data
   */
  static async validateRegistration(email: string): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];

    const existingUser = getUserByEmail(email);
    if (existingUser) {
      errors.push('Email already registered');
    }

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
