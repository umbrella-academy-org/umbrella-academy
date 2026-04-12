'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType } from '@/types';
import { userService } from '@/services/users';
import { useAuth } from './AuthContext';

interface UserContextType {
  users: User[];
  students: User[];
  trainers: User[];
  companyAdmins: User[];
  isLoading: boolean;
  error: string | null;
  getUsersByRole: (role: UserType) => User[];
  getUsersByFieldId: (fieldId: string) => User[];
  getUserByIdFromContext: (id: string) => User | undefined;
  refreshUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userService.getUsers();
      setUsers(response.data ?? []);
    } catch {
      setError('Failed to load users');
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const students = users.filter(u => u.role === 'student');
  const trainers = users.filter(u => u.role === 'trainer');
  const companyAdmins = users.filter(u => u.role === 'company-admin');

  const getUsersByRole = (role: UserType) => users.filter(u => u.role === role);
  const getUsersByFieldId = (fieldId: string) => users.filter(u => u.fieldId === fieldId);
  const getUserByIdFromContext = (id: string) => users.find(u => u.id === id);

  return (
    <UserContext.Provider value={{
      users, students, trainers, companyAdmins,
      isLoading, error,
      getUsersByRole, getUsersByFieldId, getUserByIdFromContext,
      refreshUsers: loadUsers,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUsers must be used within a UserProvider');
  return context;
}
