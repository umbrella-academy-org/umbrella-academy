'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SystemMetric, SystemAlert } from '@/types';
import {
  mockSystemMetrics,
  mockSystemAlerts,
  mockSystemStats,
  getHealthyMetrics,
  getWarningMetrics,
  getErrorMetrics,
  getRecentAlerts,
  getCriticalAlerts,
  getSystemHealthScore
} from '@/data';
import { useAuth } from './AuthContext';

interface SystemContextType {
  metrics: SystemMetric[];
  alerts: SystemAlert[];
  systemStats: typeof mockSystemStats;
  healthScore: number;
  isLoading: boolean;
  error: string | null;
  getHealthyMetricsFromContext: () => SystemMetric[];
  getWarningMetricsFromContext: () => SystemMetric[];
  getErrorMetricsFromContext: () => SystemMetric[];
  getRecentAlertsFromContext: (hours?: number) => SystemAlert[];
  getCriticalAlertsFromContext: () => SystemAlert[];
  refreshSystemData: () => Promise<void>;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const { user: currentUser, hasPermission } = useAuth();
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [systemStats, setSystemStats] = useState(mockSystemStats);
  const [healthScore, setHealthScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSystemData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      if (!currentUser) {
        setMetrics([]);
        setAlerts([]);
        setHealthScore(0);
        return;
      }

      // Only umbrella admins and field admins can see system data
      if (!hasPermission('manage_system') && !hasPermission('view_field_analytics')) {
        setMetrics([]);
        setAlerts([]);
        setHealthScore(0);
        return;
      }

      let filteredMetrics: SystemMetric[] = [];
      let filteredAlerts: SystemAlert[] = [];

      if (currentUser.role === 'umbrella-admin') {
        // Umbrella admin can see all system metrics and alerts
        filteredMetrics = mockSystemMetrics;
        filteredAlerts = mockSystemAlerts;
      } else if (currentUser.role === 'field-admin') {
        // Field admin can see limited system metrics
        filteredMetrics = mockSystemMetrics.filter(metric =>
          ['Active Users', 'API Response Time', 'Video Streaming', 'Payment Gateway'].includes(metric.name)
        );
        filteredAlerts = mockSystemAlerts.filter(alert =>
          alert.severity !== 'high' || alert.type !== 'error'
        );
      }

      setMetrics(filteredMetrics);
      setAlerts(filteredAlerts);
      setSystemStats(mockSystemStats);
      setHealthScore(getSystemHealthScore());

    } catch (err) {
      setError('Failed to load system data');
      console.error('Error loading system data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadSystemData();

      // Set up real-time updates for system monitoring
      const interval = setInterval(() => {
        if (hasPermission('manage_system')) {
          // Simulate real-time metric updates
          setHealthScore(getSystemHealthScore());
        }
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    } else {
      setMetrics([]);
      setAlerts([]);
      setHealthScore(0);
      setIsLoading(false);
    }
  }, [currentUser]);

  const getHealthyMetricsFromContext = (): SystemMetric[] => {
    return metrics.filter(metric => metric.status === 'healthy');
  };

  const getWarningMetricsFromContext = (): SystemMetric[] => {
    return metrics.filter(metric => metric.status === 'warning');
  };

  const getErrorMetricsFromContext = (): SystemMetric[] => {
    return metrics.filter(metric => metric.status === 'error');
  };

  const getRecentAlertsFromContext = (hours: number = 24): SystemAlert[] => {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    return alerts.filter(alert => new Date(alert.time) > cutoffTime);
  };

  const getCriticalAlertsFromContext = (): SystemAlert[] => {
    return alerts.filter(alert =>
      alert.type === 'error' || (alert.type === 'warning' && alert.severity === 'high')
    );
  };

  const refreshSystemData = async () => {
    await loadSystemData();
  };

  const value: SystemContextType = {
    metrics,
    alerts,
    systemStats,
    healthScore,
    isLoading,
    error,
    getHealthyMetricsFromContext,
    getWarningMetricsFromContext,
    getErrorMetricsFromContext,
    getRecentAlertsFromContext,
    getCriticalAlertsFromContext,
    refreshSystemData
  };

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
}