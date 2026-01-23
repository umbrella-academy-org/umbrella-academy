'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Server, Database, Wifi, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function UmbrellaAdminSystemPage() {
  const systemMetrics = [
    { name: 'Server Uptime', value: '99.8%', status: 'healthy', icon: Server },
    { name: 'Database Performance', value: '95ms', status: 'healthy', icon: Database },
    { name: 'Network Latency', value: '12ms', status: 'healthy', icon: Wifi },
    { name: 'Security Status', value: 'Secure', status: 'healthy', icon: Shield }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'High memory usage on server-02',
      time: '2 minutes ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      time: '1 hour ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'success',
      message: 'Database backup completed',
      time: '3 hours ago',
      severity: 'low'
    }
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="System Health" userType="umbrella-admin" />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header breadcrumb="System Health" />
        
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">System Health</h1>
              <p className="text-gray-600">Monitor system performance and health metrics</p>
            </div>

            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {systemMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{metric.name}</p>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        metric.status === 'healthy' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          metric.status === 'healthy' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Service Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Service Status</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { name: 'Authentication Service', status: 'operational' },
                      { name: 'Payment Processing', status: 'operational' },
                      { name: 'Video Conferencing', status: 'operational' },
                      { name: 'File Storage', status: 'degraded' },
                      { name: 'Email Service', status: 'operational' }
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">{service.name}</span>
                        <div className="flex items-center gap-2">
                          {service.status === 'operational' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            service.status === 'operational' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {service.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === 'warning' ? 'bg-yellow-500' :
                          alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* System Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
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