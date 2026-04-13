'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { IPayment } from '@/hooks/admin/usePayments';
import { FeedbackTicket, AdminAnalytics } from '@/types/admin';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';
import { useAuth } from './AuthContext';

interface AdminContextType {
  // Users
  users: User[];
  usersLoading: boolean;
  usersError: string | null;
  refreshUsers: () => Promise<void>;
  // Trainers
  trainers: User[];
  pendingTrainers: User[];
  trainersLoading: boolean;
  trainersError: string | null;
  refreshTrainers: () => Promise<void>;
  // Payments
  payments: IPayment[];
  paymentsLoading: boolean;
  paymentsError: string | null;
  refreshPayments: () => Promise<void>;
  // Analytics
  analytics: AdminAnalytics | null;
  analyticsLoading: boolean;
  analyticsError: string | null;
  refreshAnalytics: () => Promise<void>;
  // Feedback
  tickets: FeedbackTicket[];
  ticketsLoading: boolean;
  ticketsError: string | null;
  refreshTickets: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  const [trainers, setTrainers] = useState<User[]>([]);
  const [pendingTrainers, setPendingTrainers] = useState<User[]>([]);
  const [trainersLoading, setTrainersLoading] = useState(false);
  const [trainersError, setTrainersError] = useState<string | null>(null);

  const [payments, setPayments] = useState<IPayment[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [paymentsError, setPaymentsError] = useState<string | null>(null);

  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  const [tickets, setTickets] = useState<FeedbackTicket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin';

  const refreshUsers = async () => {
    if (!isAdmin) return;
    setUsersLoading(true);
    try {
      const res = await apiClient.get<{ success: boolean; data: User[] }>(API_ENDPOINTS.USERS);
      setUsers(res.data ?? []);
      setUsersError(null);
    } catch (err) {
      setUsersError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setUsersLoading(false);
    }
  };

  const refreshTrainers = async () => {
    if (!isAdmin) return;
    setTrainersLoading(true);
    try {
      const params: Record<string, string> = { role: 'trainer' };
      const [trainersRes, pendingRes] = await Promise.all([
        apiClient.get<{ success: boolean; data: User[] }>(API_ENDPOINTS.USERS, params),
        apiClient.get<{ success: boolean; data: User[] }>(API_ENDPOINTS.TRAINERS_PENDING),
      ]);
      setTrainers(trainersRes.data ?? []);
      setPendingTrainers(pendingRes.data ?? []);
      setTrainersError(null);
    } catch (err) {
      setTrainersError(err instanceof Error ? err.message : 'Failed to load trainers');
    } finally {
      setTrainersLoading(false);
    }
  };

  const refreshPayments = async () => {
    if (!isAdmin) return;
    setPaymentsLoading(true);
    try {
      const res = await apiClient.get<{ success: boolean; data: IPayment[] }>(API_ENDPOINTS.PAYMENTS);
      setPayments(res.data ?? []);
      setPaymentsError(null);
    } catch (err) {
      setPaymentsError(err instanceof Error ? err.message : 'Failed to load payments');
    } finally {
      setPaymentsLoading(false);
    }
  };

  const refreshAnalytics = async () => {
    if (!isAdmin) return;
    setAnalyticsLoading(true);
    try {
      const res = await apiClient.get<{ success: boolean; data: AdminAnalytics }>(API_ENDPOINTS.ADMIN_ANALYTICS);
      setAnalytics(res.data ?? null);
      setAnalyticsError(null);
    } catch (err) {
      setAnalyticsError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const refreshTickets = async () => {
    if (!isAdmin) return;
    setTicketsLoading(true);
    try {
      const res = await apiClient.get<{ success: boolean; data: FeedbackTicket[] }>(API_ENDPOINTS.ADMIN_FEEDBACK);
      setTickets(res.data ?? []);
      setTicketsError(null);
    } catch (err) {
      setTicketsError(err instanceof Error ? err.message : 'Failed to load tickets');
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
