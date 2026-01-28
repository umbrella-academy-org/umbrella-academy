'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import WingsTable from '@/components/umbrella-admin/WingsTable';


export default function UmbrellaAdminWingsPage() {
  const wings = [
    {
      id: 1,
      name: 'Programming Wing',
      code: 'PROG-001',
      admin: 'John Smith',
      students: 324,
      trainers: 12,
      revenue: 12450,
      status: 'active'
    },
    {
      id: 2,
      name: 'Design Wing',
      code: 'DESIGN-002',
      admin: 'Sarah Johnson',
      students: 287,
      trainers: 10,
      revenue: 10230,
      status: 'active'
    },
    {
      id: 3,
      name: 'Marketing Wing',
      code: 'MARK-003',
      admin: 'Mike Wilson',
      students: 256,
      trainers: 9,
      revenue: 9180,
      status: 'active'
    },
    {
      id: 4,
      name: 'Data Science Wing',
      code: 'DATA-004',
      admin: 'Emily Davis',
      students: 198,
      trainers: 7,
      revenue: 7890,
      status: 'active'
    },
    {
      id: 5,
      name: 'Business Wing',
      code: 'BIZ-005',
      admin: 'David Brown',
      students: 182,
      trainers: 6,
      revenue: 5480,
      status: 'maintenance'
    }
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Wings" userType="umbrella-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Wings Management</h1>
              <p className="text-gray-600">Monitor and manage all wings across the system</p>
            </div>

            <WingsTable wings={wings} />
          </div>
        </main>
      </div>
    </div>
  );
}