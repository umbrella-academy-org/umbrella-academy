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
        const parsedUser = JSON.parse(user);
        setUser(parsedUser);
        setIsAuthenticated(true);
        if (parsedUser.role === UserRole.STUDENT) {
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

  // Separate effect to handle user changes (like login/logout)
  useEffect(() => {
    if (user) {
      // User changed - handle any side effects here
      if (user.role === UserRole.STUDENT && !onboardingChecklist) {
        authService.getOnboardingChecklist().then(response => {
          if (response.success && response.data) {
            setOnboardingChecklist(response.data);
          }
        });
      }
    }
  }, [user?._id]); // Only re-run when user ID changes, not the entire object



  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.success && response.data) {
        const userData = response.data.user;
        
        // Check if trainer is pending approval
        if (userData.role === UserRole.TRAINER) {
          const trainer = userData as Trainer;
          if (trainer.approvalStatus === 'pending') {
            // Don't log in pending trainers, redirect to pending approval page
            router.push(`/auth/pending-approval?email=${encodeURIComponent(email)}`);
            setIsLoading(false);
            return;
          }
        }
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
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
      if (response.success && response.data) {
        setUser(response.data.user);
        router.push("/auth/verify")
      }
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
      if (response.success && response.data) {
        setUser(response.data.user);
        router.push("/auth/verify")
      }
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
