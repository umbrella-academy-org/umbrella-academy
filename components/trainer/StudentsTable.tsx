'use client';

import { useState, useMemo } from 'react';
import { Mail, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';
import StudentReportForm from '@/components/trainer/StudentReportForm';
import { useUsers } from '@/contexts/UserContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRoadmaps } from '@/contexts/RoadmapContext';
import { User } from '@/types';

interface StudentsTableProps {
  searchQuery: string;
  selectedStatus: string;
  selectedCourse: string;
}

export default function StudentsTable({ searchQuery, selectedStatus, selectedCourse }: StudentsTableProps) {
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  const { students, isLoading } = useUsers();
  const { user } = useAuth();
  const { studentRoadmaps } = useRoadmaps();

  // Filter students by role
  const filteredByRole = useMemo(() => {
    if (!user) return [];
    if (user.role === 'trainer') {
      return students.filter(s => s.fieldId === user.fieldId);
    }
    if (user.role === 'mentor') {
      const myStudentIds = new Set(
        studentRoadmaps
          .filter(r => r.roadmap.mentorId === user.id)
          .map(r => r.studentId)
      );
      return students.filter(s => myStudentIds.has(s.id));
    }
    return students;
  }, [students, user, studentRoadmaps]);

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return filteredByRole.filter(student => {
      const course = student.fieldId ?? 'N/A';
      const matchesSearch = searchQuery === '' ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;

      const matchesCourse = selectedCourse === 'all' ||
        course.toLowerCase().includes(selectedCourse.replace('-', ' '));

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [filteredByRole, searchQuery, selectedStatus, selectedCourse]);

  const handleCreateReport = (student: User) => {
    setSelectedStudent(student);
    setShowReportForm(true);
  };

  const handleReportSubmit = (report: any) => {
    console.log('Report submitted:', report);
    alert('Report submitted successfully! It will be sent to the mentor for review.');
    setShowReportForm(false);
    setSelectedStudent(null);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-lg" />
        ))}
      </div>
    );
  }

  // Empty state
  if (filteredStudents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No students assigned yet.
      </div>
    );
  }

  // Transform data for DataTable
  const tableData = filteredStudents.map(student => {
    const avatar = student.name.slice(0, 2).toUpperCase();
    const course = student.fieldId ?? 'N/A';
    const joinDate = student.joinDate ?? 'N/A';
    const progress = 0;
    const sessionsCompleted = 0;
    const totalSessions = 0;
    const lastActivity = 'N/A';
    const trend: 'up' | 'down' | 'stable' = 'stable';

    return {
      id: student.id,
      student: (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {avatar}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{student.name}</div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {student.email}
            </div>
          </div>
        </div>
      ),
      course: (
        <div>
          <div className="text-sm text-gray-900">{course}</div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Joined {joinDate !== 'N/A' ? new Date(joinDate).toLocaleDateString() : 'N/A'}
          </div>
        </div>
      ),
      status: (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          ● {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </span>
      ),
      progress: (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
            <div
              className="bg-linear-to-r from-gray-500 to-gray-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900">{progress}%</span>
          {trend === 'up' ? <TrendingUp className="w-3 h-3 text-gray-500" /> :
            trend === 'down' ? <TrendingDown className="w-3 h-3 text-gray-500" /> :
              <div className="w-3 h-3 bg-gray-400 rounded-full" />}
        </div>
      ),
      sessions: (
        <div>
          <div className="text-sm text-gray-900">
            {sessionsCompleted}/{totalSessions}
          </div>
          <div className="text-sm text-gray-500">
            {totalSessions > 0 ? Math.round((sessionsCompleted / totalSessions) * 100) : 0}% complete
          </div>
        </div>
      ),
      lastActivity,
      actions: (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCreateReport(student)}
            className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
          >
            Create Report
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
            View Details
          </button>
        </div>
      ),
      _original: student
    };
  });

  const columns = [
    { key: 'student', label: 'Student', sortable: true, filterable: true, searchable: true },
    { key: 'course', label: 'Course', sortable: true, filterable: true, searchable: true },
    { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false },
    { key: 'progress', label: 'Progress', sortable: true, filterable: false, searchable: false },
    { key: 'sessions', label: 'Sessions', sortable: true, filterable: false, searchable: false },
    { key: 'lastActivity', label: 'Last Activity', sortable: true, filterable: false, searchable: true },
    { key: 'actions', label: 'Actions', sortable: false, filterable: false, searchable: false }
  ];

  const handleSelectionChange = (selectedItems: any[]) => {
    setSelectedStudents(selectedItems);
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters:', filters);
  };

  const handleSearchChange = (searchQuery: string) => {
    console.log('Search:', searchQuery);
  };

  return (
    <div className="space-y-6">
      {/* Selected Actions */}
      {selectedStudents.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">
              {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Send Message
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors">
                Remove Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DataTable */}
      <DataTable
        data={tableData}
        columns={columns}
        hasCheckboxes={true}
        hasFilters={true}
        hasSearch={true}
        onSelectionChange={handleSelectionChange}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      {/* Report Form Modal */}
      {showReportForm && selectedStudent && (
        <StudentReportForm
          studentId={selectedStudent.id}
          studentName={selectedStudent.name}
          onSubmit={handleReportSubmit}
          onCancel={() => {
            setShowReportForm(false);
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
}
