import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import type { ApiResponse } from '@/types';

export interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'error';
  timestamp: string;
}

export interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
}

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface SystemData {
  metrics: SystemMetric[];
  alerts: SystemAlert[];
  services: ServiceStatus[];
  stats: SystemStats;
}

class SystemService {
  async getSystemData(): Promise<ApiResponse<SystemData>> {
    return apiClient.get<SystemData>(API_ENDPOINTS.SYSTEM);
  }

  async getDatabaseStatus(): Promise<ApiResponse<{ status: string; latency: number }>> {
    return apiClient.get<{ status: string; latency: number }>(API_ENDPOINTS.SYSTEM_DATABASE);
  }

  async getMemoryStatus(): Promise<ApiResponse<{ used: number; total: number; percentage: number }>> {
    return apiClient.get<{ used: number; total: number; percentage: number }>(API_ENDPOINTS.SYSTEM_MEMORY);
  }
}

export const systemService = new SystemService();