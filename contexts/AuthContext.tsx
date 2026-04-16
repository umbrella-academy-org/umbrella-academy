'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth';
import { BaseUser, OnboardingChecklist, Student, StudentRegister, Trainer, UserRole } from '@/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  error: string | null;
  user: BaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerStudent: (data: Partial<StudentRegister>) => Promise<void>;
  registerTrainer: (data: Partial<Trainer>) => Promise<void>;
  logout: () => void;
  onboardingChecklist: OnboardingChecklist
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<BaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const [onboardingChecklist, setOnboardingChecklist] = useState<OnboardingChecklist>({
    accountCreated: false,
    bookingPayed: false,
    subscriptionPayed: false,
    orientationBooked: false,
    roadmapReceived: false,
    learningStarted: false
  })

  useEffect(() => {
    const checkSession = async () => {
      const user = localStorage.getItem('user');
      if (user) {
        setUser(JSON.parse(user));
        setIsAuthenticated(true);
        if (JSON.parse(user).role === UserRole.STUDENT) {
          const response = await authService.getOnboardingChecklist();
          if (response.success && response.data) {
            setOnboardingChecklist(response.data);
          }
        }
      }
      setIsLoading(false);
    }
    checkSession();
  }, []);



  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      else {
        setError(response.message);
        if (response.message.includes('not verified')) {
          localStorage.setItem('userEmail', email);
          authService.sendOtp(email);
          router.push('/auth/verify');
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const registerStudent = async (data: Partial<StudentRegister>): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.registerStudent(data);
      if (response.success && response.data) { setUser(response.data.user); }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const registerTrainer = async (data: Partial<Trainer>): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.registerTrainer(data);
      if (response.success && response.data) { setUser(response.data.user); }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try { await authService.logout(); } catch { /* ignore */ } finally { setUser(null); }
  };


  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      registerStudent,
      registerTrainer,
      logout,
      error,
      onboardingChecklist
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
