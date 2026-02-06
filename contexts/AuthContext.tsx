'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType } from '@/types';
import { getUserByEmail } from '@/data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: UserType) => boolean;
  hasPermission: (permission: string) => boolean;
  canAccessField: (fieldId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate checking localStorage or session
        const savedUser = localStorage.getItem('umbrella_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          const foundUser = getUserByEmail(userData.email);
          if (foundUser) {
            setUser(foundUser);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user by email (password validation would be done on backend)
      const foundUser = getUserByEmail(email);

      if (foundUser && foundUser.status === 'active') {
        setUser(foundUser);
        localStorage.setItem('umbrella_user', JSON.stringify({ email: foundUser.email }));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('umbrella_user');
  };

  const hasRole = (role: UserType): boolean => {
    return user?.role === role;
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    // Define role-based permissions
    const permissions: Record<UserType, string[]> = {
      'student': ['view_own_roadmap', 'view_own_sessions', 'view_own_subscription'],
      'trainer': ['view_students', 'manage_sessions', 'view_wallet', 'create_assignments'],
      'mentor': ['view_all_students', 'approve_roadmaps', 'manage_courses', 'view_analytics'],
      'field-admin': ['manage_field', 'view_field_analytics', 'manage_trainers', 'view_field_wallet'],
      'umbrella-admin': ['manage_system', 'view_all_analytics', 'manage_fields', 'system_settings']
    };

    return permissions[user.role]?.includes(permission) || false;
  };

  const canAccessField = (fieldId: string): boolean => {
    if (!user) return false;

    // Umbrella admin can access all fields
    if (user.role === 'umbrella-admin') return true;

    // Others can only access their own field
    return user.fieldId === fieldId;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasRole,
    hasPermission,
    canAccessField
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}