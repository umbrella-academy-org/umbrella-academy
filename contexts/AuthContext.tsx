'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth';
import { BaseUser, OnboardingChecklist, StudentRegister, Trainer, UserRole, Guardian, GuardianInviteState } from '@/types';
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
  handleDashboardRedirect: () => void;
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
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('auth_token');

      if (storedUser && token) {
        const parsedUser: BaseUser = JSON.parse(storedUser);

        // 1. Check if email is verified
        if (!parsedUser.isVerified) {
          // Redirect to verification page
          localStorage.setItem('userEmail', parsedUser.email);
          await authService.sendOtp(parsedUser.email);
          setIsLoading(false);
          router.push('/auth/verify');
          return;
        }

        // 2. Check trainer approval status
        if (parsedUser.role === UserRole.TRAINER) {
          const trainer = parsedUser as Trainer;
          if (trainer.approvalStatus === 'pending') {
            setIsLoading(false);
            router.push('/auth/pending-approval');
            return;
          }
        }

        // 3. Check guardian invite state
        if (parsedUser.role === UserRole.GUARDIAN) {
          const guardian = parsedUser as Guardian;
          if (guardian.inviteState === GuardianInviteState.INVITED) {
            // Guardian needs to set password - but they should have done this via email link
            // If they're here, something went wrong - clear session
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            setIsLoading(false);
            router.push('/auth/login');
            return;
          }
        }

        // All checks passed - restore session
        setUser(parsedUser);
        setIsAuthenticated(true);

        // Fetch student onboarding checklist if needed
        if (parsedUser.role === UserRole.STUDENT) {
          try {
            const response = await authService.getOnboardingChecklist();
            if (response.success && response.data) {
              setOnboardingChecklist(response.data);
            }
          } catch {
            // Silently fail - not critical
          }
        }
      }
      setIsLoading(false);
    }
    checkSession();
  }, []);

  const handleDashboardRedirect = () => {
    if (user) {
      const dashboardRoutes: Record<string, string> = {
        'student': '/dashboard/student',
        'trainer': '/dashboard/trainer',
        'admin': '/dashboard/admin',
        'guardian': '/dashboard/guardian',
        'sales_manager': '/dashboard/sales'
      };
      router.push(dashboardRoutes[user.role]);
    }
  }

  // Separate effect to handle user changes (like login/logout)
  useEffect(() => {
    if (user) {
      // User changed - handle any side effects here
      if (user.role === UserRole.STUDENT) {
        authService.getOnboardingChecklist().then(response => {
          if (response.success && response.data) {
            setOnboardingChecklist(response.data);
          }
        });
      }
    }
  }, [user?._id]);



  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.success && response.data) {
        const userData = response.data.user;

        // Clear any previous errors
        setError(null);

        // Check if trainer is pending approval
        if (userData.role === UserRole.TRAINER) {
          const trainer = userData as Trainer;
          if (trainer.approvalStatus === 'pending') {
            localStorage.setItem('auth_token', response.data.token);
            localStorage.setItem('user', JSON.stringify(userData));
            setIsLoading(false);
            router.push(`/auth/pending-approval`);
            return;
          }
        }

        // Check if guardian needs to set password (invited state)
        if (userData.role === UserRole.GUARDIAN) {
          const guardian = userData as Guardian;
          if (guardian.inviteState === GuardianInviteState.INVITED) {
            // Don't store auth data - they need to use the invite link
            setIsLoading(false);
            router.push('/auth/login');
            setError('Please use the invitation email link to set up your account.');
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
        } else if (response.message.includes('pending approval')) {
          router.push('/auth/pending-approval');
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
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('auth_token', response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
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
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('auth_token', response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        router.push("/auth/verify")
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore API errors
    } finally {
      // Clear all auth state
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('userEmail');
    }
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
      onboardingChecklist,
      handleDashboardRedirect
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
