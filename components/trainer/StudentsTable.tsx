'use client';

import { useState, useMemo } from 'react';
import { Mail, Calendar, Eye, CheckCircle, XCircle, AlertCircle, GraduationCap } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';
import { useUsers } from '@/contexts/UserContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRoadmaps } from '@/contexts/RoadmapContext';
import { Student } from '@/types';
import { RoadmapStepStatus } from '@/types/roadmap';
import StudentDetailModal from './StudentDetailModal';

interface StudentsTableProps {
  searchQuery: string;
  selectedStatus: string;
}

// Status badge component
const StatusBadge = ({ isActive, isVerified }: { isActive: boolean; isVerified: boolean }) => {
  if (!isActive) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle className="w-3 h-3 mr-1" />
        Inactive
      </span>
    );
  }
  if (!isVerified) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <AlertCircle className="w-3 h-3 mr-1" />
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
      <CheckCircle className="w-3 h-3 mr-1" />
      Active
    </span>
  );
};

export default function StudentsTable({ searchQuery, selectedStatus }: StudentsTableProps) {
  const [selectedStudents, setSelectedStudents] = useState<Record<string, unknown>[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const { students, isLoading } = useUsers();
  const { user } = useAuth();
  const { roadmaps, getRoadmapByIdFromContext } = useRoadmaps();

  // Filter students assigned to current trainer
  const myStudents = useMemo(() => {
    if (!user) return [];
    return students.filter(student => student.assignedTrainerId === user._id);
  }, [students, user]);

  // Filter students based on search and status
  const filteredStudents = useMemo(() => {
    return myStudents.filter(student => {
      const studentName = `${student.firstName} ${student.lastName}`;
      const matchesSearch = searchQuery === '' ||
        studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter logic
      let matchesStatus = true;
      if (selectedStatus === 'active') {
        matchesStatus = student.isActive && student.isVerified;
      } else if (selectedStatus === 'inactive') {
        matchesStatus = !student.isActive;
      } else if (selectedStatus === 'pending') {
        matchesStatus = student.isActive && !student.isVerified;
      }

      return matchesSearch && matchesStatus;
    });
  }, [myStudents, searchQuery, selectedStatus]);

  // Calculate progress from roadmap
  const getStudentProgress = (student: Student): number => {
    if (!student.currentRoadmapId) return 0;
    const roadmap = getRoadmapByIdFromContext(student.currentRoadmapId);
    if (!roadmap || !roadmap.milestones || roadmap.milestones.length === 0) return 0;
    const completed = roadmap.milestones.filter(m => m.status === RoadmapStepStatus.COMPLETED).length;
    return Math.round((completed / roadmap.milestones.length) * 100);
  };

  // Get student's roadmap
  const getStudentRoadmap = (student: Student) => {
    if (!student.currentRoadmapId) return undefined;
    return getRoadmapByIdFromContext(student.currentRoadmapId);
  };

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  // Empty state
  if (filteredStudents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {myStudents.length === 0 ? 'No students assigned' : 'No students match your search'}
        </h3>
        <p className="text-gray-500">
          {myStudents.length === 0 
            ? 'Students assigned to you will appear here' 
            : 'Try adjusting your search or filters'}
        </p>
      </div>
    );
  }

  // Transform data for DataTable
  const tableData = filteredStudents.map(student => {
    const studentName = `${student.firstName} ${student.lastName}`;
    const avatar = getInitials(student.firstName, student.lastName);
    const joinDate = student.createdAt;
    const progress = getStudentProgress(student);
    const roadmap = getStudentRoadmap(student);

    return {
      id: student._id,
      student: (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {avatar}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{studentName}</div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {student.email}
            </div>
          </div>
        </div>
      ),
      roadmap: (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {roadmap?.title || 'No roadmap assigned'}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Joined {new Date(joinDate).toLocaleDateString()}
          </div>
        </div>
      ),
      status: (
        <StatusBadge isActive={student.isActive} isVerified={student.isVerified} />
      ),
      subscription: (
        <div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            student.hasActiveSubscription ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {student.hasActiveSubscription ? 'Active' : 'Inactive'}
          </span>
          <div className="text-xs text-gray-500 mt-1">
            {student.hasPaidOrientation ? 'Orientation paid' : 'Orientation pending'}
          </div>
        </div>
      ),
      progress: (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900 w-10">{progress}%</span>
        </div>
      ),
      actions: (
        <button
          onClick={() => handleViewDetails(student)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          View Details
        </button>
      ),
      _original: student
    };
  });

  const columns = [
    { key: 'student', label: 'Student', sortable: true, filterable: true, searchable: true },
    { key: 'roadmap', label: 'Roadmap', sortable: true, filterable: true, searchable: true },
    { key: 'status', label: 'Status', sortable: true, filterable: true, searchable: false },
    { key: 'subscription', label: 'Subscription', sortable: true, filterable: true, searchable: false },
    { key: 'progress', label: 'Progress', sortable: true, filterable: false, searchable: false },
    { key: 'actions', label: 'Actions', sortable: false, filterable: false, searchable: false }
  ];

  const handleSelectionChange = (selectedItems: Record<string, unknown>[]) => {
    setSelectedStudents(selectedItems);
  };

  const handleFilterChange = (filters: Record<string, unknown>) => {
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
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredStudents.length} of {myStudents.length} assigned students
      </div>

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

      {/* Student Detail Modal */}
      {showDetailModal && selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          roadmap={getStudentRoadmap(selectedStudent)}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
}

// Helper function
const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};
