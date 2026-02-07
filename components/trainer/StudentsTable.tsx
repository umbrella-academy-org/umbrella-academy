'use client';

import { useState, useMemo } from 'react';
import { Mail, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';
import StudentReportForm from '@/components/trainer/StudentReportForm';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  status: 'active' | 'inactive' | 'completed' | 'paused';
  progress: number;
  joinDate: string;
  lastActivity: string;
  sessionsCompleted: number;
  totalSessions: number;
  avatar: string;
  trend: 'up' | 'down' | 'stable';
}

interface StudentsTableProps {
  searchQuery: string;
  selectedStatus: string;
  selectedCourse: string;
}

export default function StudentsTable({ searchQuery, selectedStatus, selectedCourse }: StudentsTableProps) {
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mock student data
  const students: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      phone: '+1 (555) 123-4567',
      course: 'Programming & Development',
      status: 'active',
      progress: 75,
      joinDate: '2024-01-15',
      lastActivity: '2 hours ago',
      sessionsCompleted: 12,
      totalSessions: 16,
      avatar: 'AJ',
      trend: 'up'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@email.com',
      phone: '+1 (555) 234-5678',
      course: 'UI/UX Design',
      status: 'active',
      progress: 45,
      joinDate: '2024-02-01',
      lastActivity: '1 day ago',
      sessionsCompleted: 8,
      totalSessions: 18,
      avatar: 'BS',
      trend: 'stable'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol.davis@email.com',
      phone: '+1 (555) 345-6789',
      course: 'Data Science',
      status: 'completed',
      progress: 100,
      joinDate: '2023-11-10',
      lastActivity: '1 week ago',
      sessionsCompleted: 20,
      totalSessions: 20,
      avatar: 'CD',
      trend: 'up'
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 456-7890',
      course: 'Programming & Development',
      status: 'paused',
      progress: 30,
      joinDate: '2024-01-20',
      lastActivity: '2 weeks ago',
      sessionsCompleted: 5,
      totalSessions: 16,
      avatar: 'DW',
      trend: 'down'
    },
    {
      id: '5',
      name: 'Eva Martinez',
      email: 'eva.martinez@email.com',
      phone: '+1 (555) 567-8901',
      course: 'Digital Marketing',
      status: 'active',
      progress: 60,
      joinDate: '2024-01-05',
      lastActivity: '3 hours ago',
      sessionsCompleted: 9,
      totalSessions: 15,
      avatar: 'EM',
      trend: 'up'
    }
  ];

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = searchQuery === '' ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.course.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;

      const matchesCourse = selectedCourse === 'all' ||
        student.course.toLowerCase().includes(selectedCourse.replace('-', ' '));

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [students, searchQuery, selectedStatus, selectedCourse]);

  // Stats for cards
  const totalStudents = filteredStudents.length;
  const activeStudents = filteredStudents.filter(s => s.status === 'active').length;
  const avgProgress = filteredStudents.reduce((acc, s) => acc + s.progress, 0) / filteredStudents.length || 0;
  const pendingReports = 3; // Mock data

  const handleCreateReport = (student: Student) => {
    setSelectedStudent(student);
    setShowReportForm(true);
  };

  const handleReportSubmit = (report: any) => {
    console.log('Report submitted:', report);
    alert('Report submitted successfully! It will be sent to the mentor for review.');
    setShowReportForm(false);
    setSelectedStudent(null);
  };

  // Transform data for DataTable
  const tableData = filteredStudents.map(student => ({
    id: student.id,
    student: (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
          {student.avatar}
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
        <div className="text-sm text-gray-900">{student.course}</div>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Joined {new Date(student.joinDate).toLocaleDateString()}
        </div>
      </div>
    ),
    status: (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${student.status === 'active' ? 'bg-green-100 text-green-800' :
        student.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
          student.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
        }`}>
        ● {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
      </span>
    ),
    progress: (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
          <div
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${student.progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-900">{student.progress}%</span>
        {student.trend === 'up' ? <TrendingUp className="w-3 h-3 text-green-500" /> :
          student.trend === 'down' ? <TrendingDown className="w-3 h-3 text-red-500" /> :
            <div className="w-3 h-3 bg-gray-400 rounded-full" />}
      </div>
    ),
    sessions: (
      <div>
        <div className="text-sm text-gray-900">
          {student.sessionsCompleted}/{student.totalSessions}
        </div>
        <div className="text-sm text-gray-500">
          {Math.round((student.sessionsCompleted / student.totalSessions) * 100)}% complete
        </div>
      </div>
    ),
    lastActivity: student.lastActivity,
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
    // Store original data for filtering
    _original: student
  }));

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
    // Handle additional filtering if needed
    console.log('Filters:', filters);
  };

  const handleSearchChange = (searchQuery: string) => {
    // Handle search if needed
    console.log('Search:', searchQuery);
  };

  return (
    <div className="space-y-6">
      {/* Selected Actions */}
      {selectedStudents.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-yellow-800">
              {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Send Message
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
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