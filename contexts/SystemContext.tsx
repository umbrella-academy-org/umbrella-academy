'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SystemMetric, SystemAlert, ServiceStatus } from '@/types';
import {
  mockSystemMetrics,
  mockSystemAlerts,
  mockSystemStats,
} from '@/data';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';
import { useAuth } from './AuthContext';

interface SystemContextType {
  metrics: SystemMetric[];
  alerts: SystemAlert[];
  services: ServiceStatus[];
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
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [systemStats, setSystemStats] = useState(mockSystemStats);
  const [healthScore, setHealthScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSystemData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!currentUser) {
        setMetrics([]);
        setAlerts([]);
        setServices([]);
        setHealthScore(0);
        return;
      }

      // Only umbrella admins and field admins can see system data
      if (!hasPermission('manage_system') && !hasPermission('view_field_analytics')) {
        setMetrics([]);
        setAlerts([]);
        setServices([]);
        setHealthScore(0);
        return;
      }

      const response = await apiClient.get<{
        success: boolean;
        data: {
          metrics: SystemMetric[];
          alerts: SystemAlert[];
          services: ServiceStatus[];
        };
      }>(API_ENDPOINTS.SYSTEM);

      let fetchedMetrics = response.data.metrics;
      let fetchedAlerts = response.data.alerts;
      const fetchedServices = response.data.services;

      // Field admins see a limited subset
      if (currentUser.role === 'field-admin') {
        fetchedMetrics = fetchedMetrics.filter(metric =>
          ['Active Users', 'API Response Time', 'Video Streaming', 'Payment Gateway'].includes(metric.name)
        );
        fetchedAlerts = fetchedAlerts.filter(alert =>
          alert.severity !== 'high' || alert.type !== 'error'
        );
      }

      setMetrics(fetchedMetrics);
      setAlerts(fetchedAlerts);
      setServices(fetchedServices);
      setSystemStats(mockSystemStats);

      // Compute health score: percentage of metrics with status === 'healthy'
      const total = fetchedMetrics.length;
      const healthy = fetchedMetrics.filter(m => m.status === 'healthy').length;
      setHealthScore(total > 0 ? Math.round((healthy / total) * 100) : 0);

    } catch (err) {
      console.error('Error loading system data:', err);
      setError('Failed to load system data');

      // Fall back to mock data
      let filteredMetrics: SystemMetric[] = [];
      let filteredAlerts: SystemAlert[] = [];

      if (currentUser?.role === 'umbrella-admin') {
        filteredMetrics = mockSystemMetrics;
        filteredAlerts = mockSystemAlerts;
      } else if (currentUser?.role === 'field-admin') {
        filteredMetrics = mockSystemMetrics.filter(metric =>
          ['Active Users', 'API Response Time', 'Video Streaming', 'Payment Gateway'].includes(metric.name)
        );
        filteredAlerts = mockSystemAlerts.filter(alert =>
          alert.severity !== 'high' || alert.type !== 'error'
        );
      }

      setMetrics(filteredMetrics);
      setAlerts(filteredAlerts);
      setServices([]);
      setSystemStats(mockSystemStats);

      const total = filteredMetrics.length;
      const healthy = filteredMetrics.filter(m => m.status === 'healthy').length;
      setHealthScore(total > 0 ? Math.round((healthy / total) * 100) : 0);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, hasPermission]);

  useEffect(() => {
    if (currentUser) {
      loadSystemData();

      // Re-fetch every 30 seconds for real-time system monitoring
      const interval = setInterval(() => {
        loadSystemData();
      }, 30000);

      return () => clearInterval(interval);
    } else {
      setMetrics([]);
      setAlerts([]);
      setServices([]);
      setHealthScore(0);
      setIsLoading(false);
    }
  }, [currentUser, loadSystemData]);

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
    services,
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
