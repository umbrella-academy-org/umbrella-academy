'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import WingsTable from '@/components/umbrella-admin/WingsTable';
import { Building2, Users, DollarSign, TrendingUp } from 'lucide-react';

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
      status: 'active',
      company: 'TechCorp Inc.'
    },
    {
      id: 2,
      name: 'Design Wing',
      code: 'DESIGN-002',
      admin: 'Sarah Johnson',
      students: 287,
      trainers: 10,
      revenue: 10230,
      status: 'active',
      company: 'Creative Solutions Ltd.'
    },
    {
      id: 3,
      name: 'Marketing Wing',
      code: 'MARK-003',
      admin: 'Mike Wilson',
      students: 256,
      trainers: 9,
      revenue: 9180,
      status: 'active',
      company: 'Marketing Pro LLC'
    },
    {
      id: 4,
      name: 'Data Science Wing',
      code: 'DATA-004',
      admin: 'Emily Davis',
      students: 198,
      trainers: 7,
      revenue: 7890,
      status: 'active',
      company: 'DataTech Solutions'
    },
    {
      id: 5,
      name: 'Business Wing',
      code: 'BIZ-005',
      admin: 'David Brown',
      students: 182,
      trainers: 6,
      revenue: 5480,
      status: 'maintenance',
      company: 'Business Excellence Corp.'
    }
  ];

  // Calculate summary stats
  const totalWings = wings.length;
  const activeWings = wings.filter(w => w.status === 'active').length;
  const totalStudents = wings.reduce((sum, w) => sum + w.students, 0);
  const totalRevenue = wings.reduce((sum, w) => sum + w.revenue, 0);

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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Wings</p>
                    <p className="text-2xl font-bold text-gray-900">{totalWings}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Wings</p>
                    <p className="text-2xl font-bold text-gray-900">{activeWings}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">RWF {totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            <WingsTable wings={wings} />
          </div>
        </main>
      </div>
    </div>
  );
}