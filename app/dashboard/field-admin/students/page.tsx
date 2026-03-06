'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import StudentsTable from '@/components/wing-admin/StudentsTable';


export default function FieldAdminStudentsPage() {
  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      trainer: 'John Smith',
      status: 'active',
      progress: 75,
      lastSession: '2024-01-22'
    },
    {
      id: 2,
      name: 'Bob Wilson',
      email: 'bob@example.com',
      trainer: 'Sarah Johnson',
      status: 'active',
      progress: 45,
      lastSession: '2024-01-21'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@example.com',
      trainer: 'Mike Wilson',
      status: 'paused',
      progress: 30,
      lastSession: '2024-01-15'
    }
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Student Activity" userType="field-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-amber-900 mb-2">Student Activity</h1>
              <p className="text-gray-600">Monitor student learning progress and engagement</p>
            </div>

            <StudentsTable students={students} />
          </div>
        </main>
      </div>
    </div>
  );
}