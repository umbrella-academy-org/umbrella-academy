'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TrainersTable from '@/components/wing-admin/TrainersTable';


export default function WingAdminTrainersPage() {
  const trainers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      capacity: 20,
      assigned: 15,
      available: 5,
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      capacity: 25,
      assigned: 22,
      available: 3,
      status: 'active'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@example.com',
      capacity: 18,
      assigned: 18,
      available: 0,
      status: 'full'
    }
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Trainers" userType="wing-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Trainer Management</h1>
              <p className="text-gray-600">Monitor trainer capacity and assignments</p>
            </div>

            <TrainersTable trainers={trainers} />
          </div>
        </main>
      </div>
    </div>
  );
}