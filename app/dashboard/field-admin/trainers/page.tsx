'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TrainersTable from '@/components/wing-admin/TrainersTable';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import { useAdminContext } from '@/contexts';
import { useTrainers } from '@/hooks/admin';

export default function FieldAdminTrainersPage() {
  const {
    trainers,
    pendingTrainers,
    trainersLoading,
    trainersError,
    refreshTrainers,
  } = useAdminContext();

  const { approveTrainer, rejectTrainer, deleteTrainer } = useTrainers();

  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const handleApproveTrainer = async (trainerId: string) => {
    setApprovingId(trainerId);
    setMutationError(null);
    try {
      await approveTrainer(trainerId);
      await refreshTrainers();
    } catch (err) {
      setMutationError(err instanceof Error ? err.message : 'Failed to approve trainer');
    } finally {
      setApprovingId(null);
    }
  };

  const handleRejectTrainer = async (trainerId: string) => {
    setMutationError(null);
    try {
      await rejectTrainer(trainerId);
      await refreshTrainers();
    } catch (err) {
      setMutationError(err instanceof Error ? err.message : 'Failed to reject trainer');
    }
  };

  const handleDeleteTrainer = async (trainerId: string) => {
    setMutationError(null);
    try {
      await deleteTrainer(trainerId);
      await refreshTrainers();
    } catch (err) {
      setMutationError(err instanceof Error ? err.message : 'Failed to delete trainer');
    }
  };

  // Calculate summary stats from real data
  const allTrainers = [...trainers, ...pendingTrainers];
  const totalTrainers = allTrainers.length;
  const activeTrainers = trainers.filter(t => t.status === 'active').length;
  const totalCapacity = allTrainers.reduce((sum, t) => sum + (('capacity' in t ? t.capacity : 0) ?? 0), 0);
  const totalAssigned = allTrainers.reduce((sum, t) => sum + (('assigned' in t ? t.assigned : 0) ?? 0), 0);
  const utilizationRate = totalCapacity > 0 ? Math.round((totalAssigned / totalCapacity) * 100) : 0;

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

            {/* Loading state */}
            {trainersLoading && (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            )}

            {/* Error state */}
            {!trainersLoading && trainersError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                <span className="text-sm text-red-700">{trainersError}</span>
                <button
                  onClick={refreshTrainers}
                  className="ml-4 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Mutation error */}
            {mutationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {mutationError}
              </div>
            )}

            {/* Empty state */}
            {!trainersLoading && !trainersError && allTrainers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Users className="w-12 h-12 mb-3 text-gray-300" />
                <p className="text-base font-medium">No trainers found</p>
                <p className="text-sm mt-1">Trainers assigned to your field will appear here.</p>
              </div>
            )}

            {/* Table */}
            {!trainersLoading && !trainersError && allTrainers.length > 0 && (
              <TrainersTable
                trainers={allTrainers.map(t => ({
                  id: t.id,
                  name: t.name,
                  email: t.email,
                  capacity: ('capacity' in t ? t.capacity : 0) ?? 0,
                  assigned: ('assigned' in t ? t.assigned : 0) ?? 0,
                  available: ('available' in t ? t.available : 0) ?? 0,
                  status: t.status,
                }))}
                onApprove={handleApproveTrainer}
                approvingId={approvingId}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
