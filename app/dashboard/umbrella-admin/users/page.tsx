'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function UmbrellaAdminUsersPage() {
  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'student',
      wing: 'Programming Wing',
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'trainer',
      wing: 'Programming Wing',
      status: 'active',
      joinDate: '2023-12-01'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'wing-admin',
      wing: 'Design Wing',
      status: 'active',
      joinDate: '2023-11-15'
    },
    {
      id: 4,
      name: 'Mike Wilson',
      email: 'mike@example.com',
      role: 'mentor',
      wing: 'Programming Wing',
      status: 'active',
      joinDate: '2023-10-20'
    }
  ];

  const getRoleBadge = (role: string) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      trainer: 'bg-green-100 text-green-800',
      mentor: 'bg-purple-100 text-purple-800',
      'wing-admin': 'bg-yellow-100 text-yellow-800',
      'umbrella-admin': 'bg-red-100 text-red-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Users" userType="umbrella-admin" />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header breadcrumb="Users" />
        
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">User Management</h1>
              <p className="text-gray-600">Manage all users across the system</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wing
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
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
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.wing}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-yellow-600 hover:text-yellow-700 mr-3">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            Suspend
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