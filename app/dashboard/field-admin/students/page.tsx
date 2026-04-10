'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import StudentsTable from '@/components/wing-admin/StudentsTable';
import { useAuth } from '@/contexts/AuthContext';
import { useUsers } from '@/contexts/UserContext';

export default function FieldAdminStudentsPage() {
  const { user } = useAuth();
  const { getUsersByFieldId, isLoading } = useUsers();

  const fieldStudents = user?.fieldId
    ? getUsersByFieldId(user.fieldId).filter(u => u.role === 'student')
    : [];

  const students = fieldStudents.map((s, index) => ({
    id: index + 1,
    name: s.name,
    email: s.email,
    trainer: (s as { trainerId?: string }).trainerId ?? '—',
    status: s.status,
    progress: (s as { progress?: number }).progress ?? 0,
    lastSession: (s as { lastSession?: string }).lastSession ?? '—',
  }));

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Student Activity" userType="field-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Student Activity</h1>
              <p className="text-gray-600">Monitor student learning progress and engagement</p>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : students.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-gray-500 text-lg font-medium">No students found</p>
                <p className="text-gray-400 text-sm mt-1">There are no students enrolled in your field yet.</p>
              </div>
            ) : (
              <StudentsTable students={students} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
