'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

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
        <Header breadcrumb="Wings" />
        
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Wings Management</h1>
              <p className="text-gray-600">Monitor and manage all wings across the system</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wing
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Administrator
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trainers
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {wings.map((wing) => (
                      <tr key={wing.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{wing.name}</div>
                            <div className="text-sm text-gray-500">{wing.code}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {wing.admin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {wing.students}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {wing.trainers}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          RWF {wing.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            wing.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {wing.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-yellow-600 hover:text-yellow-700 mr-3">
                            View Details
                          </button>
                          <button className="text-gray-600 hover:text-gray-700">
                            Settings
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}