'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType } from '@/types';
import {
  mockUsers,
  getFieldAdmins,
  getUsersByField,
  getUserById
} from '@/data';
import { useAuth } from './AuthContext';

interface UserContextType {
  users: User[];
  students: User[];
  trainers: User[];
  mentors: User[];
  fieldAdmins: User[];
  isLoading: boolean;
  error: string | null;
  getUsersByRole: (role: UserType) => User[];
  getUsersByFieldId: (fieldId: string) => User[];
  getUserByIdFromContext: (id: string) => User | undefined;
  refreshUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: currentUser, hasPermission } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load users based on current user's permissions
  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredUsers: User[] = [];

      if (!currentUser) {
        filteredUsers = [];
      } else if (currentUser.role === 'umbrella-admin') {
        // Umbrella admin can see all users
        filteredUsers = mockUsers;
      } else if (currentUser.role === 'field-admin') {
        // Field admin can see users in their field
        filteredUsers = mockUsers.filter(user =>
          user.fieldId === currentUser.fieldId || user.role === 'umbrella-admin'
        );
      } else if (currentUser.role === 'mentor') {
        // Mentors can see students and trainers in their field
        filteredUsers = mockUsers.filter(user =>
          user.fieldId === currentUser.fieldId &&
          ['student', 'trainer'].includes(user.role)
        );
      } else if (currentUser.role === 'trainer') {
        // Trainers can see students in their field
        filteredUsers = mockUsers.filter(user =>
          user.fieldId === currentUser.fieldId && user.role === 'student'
        );
      } else {
        // Students can only see themselves
        filteredUsers = [currentUser];
      }

      setUsers(filteredUsers);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadUsers();
    } else {
      setUsers([]);
      setIsLoading(false);
    }
  }, [currentUser]);

  // Derived data
  const students = users.filter(user => user.role === 'student');
  const trainers = users.filter(user => user.role === 'trainer');
  const mentors = users.filter(user => user.role === 'mentor');
  const fieldAdmins = users.filter(user => user.role === 'field-admin');

  const getUsersByRole = (role: UserType): User[] => {
    return users.filter(user => user.role === role);
  };

  const getUsersByFieldId = (fieldId: string): User[] => {
    // Check permission
    if (!hasPermission('view_field_analytics') && currentUser?.fieldId !== fieldId) {
      return [];
    }
    return users.filter(user => user.fieldId === fieldId);
  };

  const getUserByIdFromContext = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };

  const refreshUsers = async () => {
    await loadUsers();
  };

  const value: UserContextType = {
    users,
    students,
    trainers,
    mentors,
    fieldAdmins,
    isLoading,
    error,
    getUsersByRole,
    getUsersByFieldId,
    getUserByIdFromContext,
    refreshUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}