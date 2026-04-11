'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType } from '@/types';
import { authService, RegisterRequest, RegisterStudentRequest, RegisterTrainerRequest, RegisterMentorRequest } from '@/services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean | string>;
  register: (data: RegisterRequest) => Promise<{ success: boolean; pending?: boolean; error?: string }>;
  logout: () => void;
  hasRole: (role: UserType) => boolean;
  hasPermission: (permission: string) => boolean;
  canAccessField: (fieldId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await authService.checkToken();
          if (response.success && response.user) {
            setUser(response.user);
          }
        }
      } catch {
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean | string> => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.success && response.user) {
        setUser(response.user);
        return true;
      }
      return false;
    } catch (err: unknown) {
      // Propagate the backend error message so useLogin can surface it
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
      return message;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<{ success: boolean; pending?: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (data.role === 'student') {
        const response = await authService.registerStudent(data as unknown as RegisterStudentRequest);
        if (response.success && response.user) {
          setUser(response.user);
          return { success: true };
        }
        return { success: false, error: 'Registration failed' };
      } else if (data.role === 'trainer') {
        const response = await authService.registerTrainer(data as unknown as RegisterTrainerRequest);
        if (response.success && response.pending) {
          // Trainer is not logged in — pending approval
          return { success: true, pending: true };
        }
        return { success: false, error: 'Registration failed' };
      } else if (data.role === 'mentor') {
        const response = await authService.registerMentor(data as unknown as RegisterMentorRequest);
        if (response.success && response.user) {
          setUser(response.user);
          return { success: true };
        }
        return { success: false, error: 'Registration failed' };
      } else {
        // field-admin / umbrella-admin — use generic register
        const response = await authService.register(data);
        if (response.success && response.user) {
          setUser(response.user);
          return { success: true };
        }
        return { success: false, error: 'Registration failed' };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore
    } finally {
      setUser(null);
    }
  };

  const hasRole = (role: UserType): boolean => user?.role === role;

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    const permissions: Record<UserType, string[]> = {
      'student': ['view_own_roadmap', 'view_own_sessions', 'view_own_subscription'],
      'trainer': ['view_students', 'manage_sessions', 'view_wallet', 'create_assignments'],
      'mentor': ['view_all_students', 'approve_roadmaps', 'manage_courses', 'view_analytics'],
      'field-admin': ['manage_field', 'view_field_analytics', 'manage_trainers', 'view_field_wallet'],
      'umbrella-admin': ['manage_system', 'view_all_analytics', 'manage_fields', 'system_settings'],
    };
    return permissions[user.role]?.includes(permission) ?? false;
  };

  const canAccessField = (fieldId: string): boolean => {
    if (!user) return false;
    if (user.role === 'umbrella-admin') return true;
    return user.fieldId === fieldId;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, hasRole, hasPermission, canAccessField }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
