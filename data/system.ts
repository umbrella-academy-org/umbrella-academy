// Mock system monitoring data for Umbrella Academy LMS

import { SystemMetric, SystemAlert } from '@/types';

export const mockSystemMetrics: SystemMetric[] = [
  {
    name: 'Server Uptime',
    value: '99.9%',
    status: 'healthy',
    icon: '🟢'
  },
  {
    name: 'Database Performance',
    value: '45ms',
    status: 'healthy',
    icon: '💾'
  },
  {
    name: 'Active Users',
    value: '1,247',
    status: 'healthy',
    icon: '👥'
  },
  {
    name: 'Memory Usage',
    value: '78%',
    status: 'warning',
    icon: '⚠️'
  },
  {
    name: 'Storage Space',
    value: '2.4TB / 5TB',
    status: 'healthy',
    icon: '💿'
  },
  {
    name: 'API Response Time',
    value: '120ms',
    status: 'healthy',
    icon: '⚡'
  },
  {
    name: 'Video Streaming',
    value: 'Operational',
    status: 'healthy',
    icon: '📹'
  },
  {
    name: 'Payment Gateway',
    value: 'Connected',
    status: 'healthy',
    icon: '💳'
  },
  {
    name: 'Email Service',
    value: '99.5%',
    status: 'healthy',
    icon: '📧'
  },
  {
    name: 'Backup Status',
    value: '2 hours ago',
    status: 'warning',
    icon: '💾'
  },
  {
    name: 'SSL Certificate',
    value: '89 days left',
    status: 'healthy',
    icon: '🔒'
  },
  {
    name: 'CDN Performance',
    value: '98.7%',
    status: 'healthy',
    icon: '🌐'
  }
];

export const mockSystemAlerts: SystemAlert[] = [
  {
    id: 'alert_001',
    type: 'warning',
    message: 'Memory usage has exceeded 75% threshold on server-02',
    time: '2024-12-09T14:30:00Z',
    severity: 'medium'
  },
  {
    id: 'alert_002',
    type: 'info',
    message: 'Scheduled maintenance completed successfully',
    time: '2024-12-09T12:00:00Z',
    severity: 'low'
  },
  {
    id: 'alert_003',
    type: 'success',
    message: 'Database backup completed - 2.1GB archived',
    time: '2024-12-09T11:45:00Z',
    severity: 'low'
  },
  {
    id: 'alert_004',
    type: 'warning',
    message: 'High number of concurrent live sessions detected',
    time: '2024-12-09T10:15:00Z',
    severity: 'medium'
  },
  {
    id: 'alert_005',
    type: 'error',
    message: 'Payment processing failed for 3 transactions',
    time: '2024-12-09T09:30:00Z',
    severity: 'high'
  },
  {
    id: 'alert_006',
    type: 'info',
    message: 'New course "Advanced React Patterns" published',
    time: '2024-12-09T08:00:00Z',
    severity: 'low'
  },
  {
    id: 'alert_007',
    type: 'success',
    message: 'SSL certificate renewed successfully',
    time: '2024-12-08T22:00:00Z',
    severity: 'low'
  },
  {
    id: 'alert_008',
    type: 'warning',
    message: 'Unusual login activity detected from IP 192.168.1.100',
    time: '2024-12-08T20:45:00Z',
    severity: 'high'
  },
  {
    id: 'alert_009',
    type: 'info',
    message: 'Weekly system report generated and sent to administrators',
    time: '2024-12-08T18:00:00Z',
    severity: 'low'
  },
  {
    id: 'alert_010',
    type: 'success',
    message: 'CDN cache cleared and refreshed',
    time: '2024-12-08T16:30:00Z',
    severity: 'low'
  }
];

// System statistics
export const mockSystemStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalCourses: 24,
  activeCourses: 18,
  totalWings: 5,
  activeWings: 4,
  totalRevenue: 8950000, // RWF
  monthlyRevenue: 2850000, // RWF
  totalLiveSessions: 156,
  completedSessions: 134,
  upcomingSessions: 22,
  systemUptime: 99.9,
  averageResponseTime: 120, // ms
  storageUsed: 2.4, // TB
  storageTotal: 5.0, // TB
  bandwidthUsed: 1.2, // TB this month
  bandwidthLimit: 10.0 // TB per month
};

// Helper functions
export const getHealthyMetrics = () => 
  mockSystemMetrics.filter(metric => metric.status === 'healthy');

export const getWarningMetrics = () => 
  mockSystemMetrics.filter(metric => metric.status === 'warning');

export const getErrorMetrics = () => 
  mockSystemMetrics.filter(metric => metric.status === 'error');

export const getAlertsByType = (type: 'info' | 'warning' | 'error' | 'success') => 
  mockSystemAlerts.filter(alert => alert.type === type);

export const getAlertsBySeverity = (severity: 'low' | 'medium' | 'high') => 
  mockSystemAlerts.filter(alert => alert.severity === severity);

export const getRecentAlerts = (hours: number = 24) => {
  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  return mockSystemAlerts.filter(alert => new Date(alert.time) > cutoffTime);
};

export const getCriticalAlerts = () => 
  mockSystemAlerts.filter(alert => 
    alert.type === 'error' || (alert.type === 'warning' && alert.severity === 'high')
  );

export const getSystemHealthScore = () => {
  const totalMetrics = mockSystemMetrics.length;
  const healthyMetrics = getHealthyMetrics().length;
  const warningMetrics = getWarningMetrics().length;
  const errorMetrics = getErrorMetrics().length;
  
  // Calculate weighted score (healthy = 1, warning = 0.5, error = 0)
  const score = (healthyMetrics + warningMetrics * 0.5) / totalMetrics;
  return Math.round(score * 100);
};