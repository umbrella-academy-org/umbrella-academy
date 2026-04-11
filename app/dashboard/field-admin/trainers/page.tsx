'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TrainersTable from '@/components/wing-admin/TrainersTable';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import { authService } from '@/services/auth';

export default function FieldAdminTrainersPage() {
  const [trainers, setTrainers] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      capacity: 20,
      assigned: 15,
      available: 5,
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      capacity: 25,
      assigned: 22,
      available: 3,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      capacity: 18,
      assigned: 18,
      available: 0,
      status: 'pending'
    }
  ]);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleApproveTrainer = async (trainerId: string) => {
    setApprovingId(trainerId);
    setError(null);
    try {
      await authService.approveTrainer(trainerId);
      setTrainers(prev =>
        prev.map(t => t.id === trainerId ? { ...t, status: 'active' } : t)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve trainer');
    } finally {
      setApprovingId(null);
    }
  };

  // Calculate summary stats
  const totalTrainers = trainers.length;
  const activeTrainers = trainers.filter(t => t.status === 'active').length;
  const totalCapacity = trainers.reduce((sum, t) => sum + t.capacity, 0);
  const totalAssigned = trainers.reduce((sum, t) => sum + t.assigned, 0);
  const utilizationRate = Math.round((totalAssigned / totalCapacity) * 100);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Trainers" userType="field-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Trainer Management</h1>
              <p className="text-gray-600">Monitor trainer capacity and assignments</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Trainers</p>
                    <p className="text-2xl font-bold text-gray-900">{totalTrainers}</p>
                  </div>
                  <Users className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Trainers</p>
                    <p className="text-2xl font-bold text-gray-900">{activeTrainers}</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Capacity</p>
                    <p className="text-2xl font-bold text-gray-900">{totalCapacity}</p>
                  </div>
                  <UserX className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Utilization Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{utilizationRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-gray-500" />
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}
            <TrainersTable trainers={trainers} onApprove={handleApproveTrainer} approvingId={approvingId} />
          </div>
        </main>
      </div>
    </div>
  );
}