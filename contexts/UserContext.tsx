'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType } from '@/types';
import { 
  mockUsers, 
  getStudents, 
  getTrainers, 
  getMentors, 
  getWingAdmins,
  getUsersByWing,
  getUserById 
} from '@/data';
import { useAuth } from './AuthContext';

interface UserContextType {
  users: User[];
  students: User[];
  trainers: User[];
  mentors: User[];
  wingAdmins: User[];
  isLoading: boolean;
  error: string | null;
  getUsersByRole: (role: UserType) => User[];
  getUsersByWingId: (wingId: string) => User[];
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
      } else if (currentUser.role === 'wing-admin') {
        // Wing admin can see users in their wing
        filteredUsers = mockUsers.filter(user => 
          user.wing === currentUser.wing || user.role === 'umbrella-admin'
        );
      } else if (currentUser.role === 'mentor') {
        // Mentors can see students and trainers in their wing
        filteredUsers = mockUsers.filter(user => 
          user.wing === currentUser.wing && 
          ['student', 'trainer'].includes(user.role)
        );
      } else if (currentUser.role === 'trainer') {
        // Trainers can see students in their wing
        filteredUsers = mockUsers.filter(user => 
          user.wing === currentUser.wing && user.role === 'student'
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
  const wingAdmins = users.filter(user => user.role === 'wing-admin');

  const getUsersByRole = (role: UserType): User[] => {
    return users.filter(user => user.role === role);
  };

  const getUsersByWingId = (wingId: string): User[] => {
    // Check permission
    if (!hasPermission('view_wing_analytics') && currentUser?.wing !== wingId) {
      return [];
    }
    return users.filter(user => user.wing === wingId);
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
    wingAdmins,
    isLoading,
    error,
    getUsersByRole,
    getUsersByWingId,
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