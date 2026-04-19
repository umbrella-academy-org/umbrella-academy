'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BaseUser, Trainer, Student, Guardian } from '@/types/user';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';
import { useAuth } from './AuthContext';

// Simple payment interface for admin context
interface AdminPayment {
  _id: string;
  userId: string;
  amount: number;
  type: 'orientation' | 'subscription';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
}

interface AdminContextType {
  // Users
  users: BaseUser[];
  usersLoading: boolean;
  usersError: string | null;
  refreshUsers: () => Promise<void>;
  // Trainers
  trainers: Trainer[];
  pendingTrainers: Trainer[];
  trainersLoading: boolean;
  trainersError: string | null;
  refreshTrainers: () => Promise<void>;
  // Payments
  payments: AdminPayment[];
  paymentsLoading: boolean;
  paymentsError: string | null;
  refreshPayments: () => Promise<void>;
  // Analytics
  analytics: {
    totalUsers: number;
    totalTrainers: number;
    totalStudents: number;
    totalRevenue: number;
    pendingTrainers: number;
  } | null;
  analyticsLoading: boolean;
  analyticsError: string | null;
  refreshAnalytics: () => Promise<void>;
  // Feedback
  tickets: any[];
  ticketsLoading: boolean;
  ticketsError: string | null;
  refreshTickets: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [users, setUsers] = useState<BaseUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [pendingTrainers, setPendingTrainers] = useState<Trainer[]>([]);
  const [trainersLoading, setTrainersLoading] = useState(false);
  const [trainersError, setTrainersError] = useState<string | null>(null);

  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [paymentsError, setPaymentsError] = useState<string | null>(null);

  const [analytics, setAnalytics] = useState<{
    totalUsers: number;
    totalTrainers: number;
    totalStudents: number;
    totalRevenue: number;
    pendingTrainers: number;
  } | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  const [tickets, setTickets] = useState<any[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin';

  const refreshUsers = async () => {
    if (!isAdmin) return;
    setUsersLoading(true);
    try {
      const res = await apiClient.get<{ success: boolean; data: BaseUser[] }>(API_ENDPOINTS.USERS);
      setUsers(res.data?.data ?? []);
      setUsersError(null);
    } catch (error) {
      setUsersError('Failed to fetch users');
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  const refreshTrainers = async () => {
    if (!isAdmin) return;
    setTrainersLoading(true);
    try {
      // Get all trainers and filter for pending ones
      const trainersRes = await apiClient.get<{ success: boolean; data: Trainer[] }>(API_ENDPOINTS.USERS_TRAINERS);
      const allTrainers = trainersRes.data?.data ?? [];
      setTrainers(allTrainers);
      
      // Filter pending trainers
      const pendingTrainers = allTrainers.filter(trainer => trainer.approvalStatus === 'pending');
      setPendingTrainers(pendingTrainers);
      
      setTrainersError(null);
    } catch (err) {
      setTrainersError(err instanceof Error ? err.message : 'Failed to load trainers');
      setTrainers([]);
      setPendingTrainers([]);
    } finally {
      setTrainersLoading(false);
    }
  };

  const refreshPayments = async () => {
    if (!isAdmin) return;
    setPaymentsLoading(true);
    try {
      // For now, use mock data since payments endpoint might not exist
      const mockPayments: AdminPayment[] = [
        {
          _id: '1',
          userId: 'user1',
          amount: 50000,
          type: 'orientation',
          status: 'completed',
          createdAt: new Date().toISOString(),
        },
        {
          _id: '2',
          userId: 'user2',
          amount: 100000,
          type: 'subscription',
          status: 'pending',
          createdAt: new Date().toISOString(),
        }
      ];
      setPayments(mockPayments);
      setPaymentsError(null);
    } catch (err) {
      setPaymentsError(err instanceof Error ? err.message : 'Failed to load payments');
      setPayments([]);
    } finally {
      setPaymentsLoading(false);
    }
  };

  const refreshAnalytics = async () => {
    if (!isAdmin) return;
    setAnalyticsLoading(true);
    try {
      // Calculate analytics from current data
      const analyticsData = {
        totalUsers: users.length,
        totalTrainers: trainers.length,
        totalStudents: users.filter(u => u.role === 'student').length,
        totalRevenue: payments.reduce((sum, p) => p.status === 'completed' ? sum + p.amount : sum, 0),
        pendingTrainers: pendingTrainers.length,
      };
      setAnalytics(analyticsData);
      setAnalyticsError(null);
    } catch (err) {
      setAnalyticsError(err instanceof Error ? err.message : 'Failed to load analytics');
      setAnalytics(null);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const refreshTickets = async () => {
    if (!isAdmin) return;
    setTicketsLoading(true);
    try {
      // For now, use mock data since feedback endpoint might not exist
      const mockTickets = [
        {
          _id: '1',
          userId: 'user1',
          subject: 'Login Issue',
          message: 'User cannot login to their account',
          status: 'open',
          createdAt: new Date().toISOString(),
        }
      ];
      setTickets(mockTickets);
      setTicketsError(null);
    } catch (err) {
      setTicketsError(err instanceof Error ? err.message : 'Failed to load tickets');
      setTickets([]);
    } finally {
      setTicketsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    refreshUsers();
    refreshTrainers();
    refreshPayments();
    refreshAnalytics();
    refreshTickets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AdminContext.Provider value={{
      users, usersLoading, usersError, refreshUsers,
      trainers, pendingTrainers, trainersLoading, trainersError, refreshTrainers,
      payments, paymentsLoading, paymentsError, refreshPayments,
      analytics, analyticsLoading, analyticsError, refreshAnalytics,
      tickets, ticketsLoading, ticketsError, refreshTickets,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdminContext must be used within an AdminProvider');
  return context;
}
