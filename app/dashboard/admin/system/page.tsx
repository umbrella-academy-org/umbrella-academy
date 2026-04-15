'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import { useSystem } from '@/contexts/SystemContext';
import { Server, Database, Wifi, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  'Server Uptime': Server,
  'Database Performance': Database,
  'Network Latency': Wifi,
  'Security Status': Shield,
};

function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${diffSec} second${diffSec !== 1 ? 's' : ''} ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? 's' : ''} ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
}

function isISOString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}T/.test(value);
}

export default function UmbrellaAdminSystemPage() {
  const { metrics, alerts, services, isLoading, error, refreshSystemData } = useSystem();

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="System Health" userType={UserRole.ADMIN} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">System Health</h1>
              <p className="text-gray-600">Monitor system performance and health metrics</p>
            </div>

            {/* Error state */}
            {error !== null && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={refreshSystemData}
                  className="ml-4 px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-pulse">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="h-3 w-24 bg-gray-200 rounded" />
                          <div className="h-6 w-16 bg-gray-200 rounded" />
                        </div>
                        <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                      </div>
                    </div>
                  ))
                : metrics.map((metric, index) => {
                    const Icon = ICON_MAP[metric.name] ?? Server;
                    return (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-500 text-sm">{metric.name}</p>
                            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                          </div>
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100">
                            <Icon className="w-6 h-6 text-gray-600" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Service Status */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Service Status</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">{service.name}</span>
                        <div className="flex items-center gap-2">
                          {service.status === 'operational' ? (
                            <CheckCircle className="w-4 h-4 text-gray-500" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                            {service.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {alerts.length === 0 ? (
                      <p className="text-sm text-gray-500">No recent alerts</p>
                    ) : (
                      alerts.map((alert) => (
                        <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            alert.type === 'warning' ? 'bg-yellow-500' :
                            alert.type === 'error' ? 'bg-red-500' :
                            alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {isISOString(alert.time) ? formatRelativeTime(alert.time) : alert.time}
                            </p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                            {alert.severity}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* System Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">System Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="font-medium text-gray-900">Run System Diagnostics</div>
                    <div className="text-sm text-gray-500 mt-1">Check all system components</div>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="font-medium text-gray-900">Schedule Maintenance</div>
                    <div className="text-sm text-gray-500 mt-1">Plan system maintenance window</div>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="font-medium text-gray-900">View Logs</div>
                    <div className="text-sm text-gray-500 mt-1">Access system logs and reports</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
