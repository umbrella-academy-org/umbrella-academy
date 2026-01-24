import { useState } from 'react';
import { SystemAlert } from '@/types';
import { useSystem, useAuth } from '@/contexts';

interface CreateAlertData {
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  severity: 'low' | 'medium' | 'high';
}

interface UseCreateAlertReturn {
  createAlert: (data: CreateAlertData) => Promise<SystemAlert | null>;
  isLoading: boolean;
  error: string | null;
}

export function useCreateAlert(): UseCreateAlertReturn {
  const { refreshSystemData } = useSystem();
  const { hasPermission } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAlert = async (data: CreateAlertData): Promise<SystemAlert | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check permissions - only system admins can create alerts
      if (!hasPermission('manage_system')) {
        throw new Error('Insufficient permissions to create system alerts');
      }

      // Validate alert data
      if (!data.message.trim()) {
        throw new Error('Alert message is required');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create new alert
      const newAlert: SystemAlert = {
        id: `alert_${Date.now()}`,
        type: data.type,
        message: data.message,
        time: new Date().toISOString(),
        severity: data.severity
      };

      // In a real app, this would make an API call
      console.log('Creating system alert:', newAlert);

      // Refresh system data
      await refreshSystemData();

      return newAlert;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create alert';
      setError(errorMessage);
      console.error('Create alert error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createAlert,
    isLoading,
    error
  };
}