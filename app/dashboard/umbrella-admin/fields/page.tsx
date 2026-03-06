'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import FieldsTable from '@/components/umbrella-admin/FieldsTable';
import { Building2, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function UmbrellaAdminFieldsPage() {
  const fields = [
    {
      id: 1,
      name: 'Programming Field',
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
      name: 'Design Field',
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
      name: 'Marketing Field',
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
      name: 'Data Science Field',
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
      name: 'Business Field',
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
  const totalFields = fields.length;
  const activeFields = fields.filter(f => f.status === 'active').length;
  const totalStudents = fields.reduce((sum, f) => sum + f.students, 0);
  const totalRevenue = fields.reduce((sum, f) => sum + f.revenue, 0);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Fields" userType="umbrella-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-amber-900 mb-2">Fields Management</h1>
              <p className="text-gray-600">Monitor and manage all fields across the system</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Fields</p>
                    <p className="text-2xl font-bold text-amber-900">{totalFields}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Fields</p>
                    <p className="text-2xl font-bold text-amber-900">{activeFields}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-amber-900">{totalStudents.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-amber-900">RWF {totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-gray-500" />
                </div>
              </div>
            </div>

            <FieldsTable fields={fields} />
          </div>
        </main>
      </div>
    </div>
  );
}