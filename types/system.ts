// System monitoring and alert type definitions

export interface SystemMetric {
  name: string;
  value: string;
  status: 'healthy' | 'warning' | 'error';
  icon: string;
}

export interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  time: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
}
