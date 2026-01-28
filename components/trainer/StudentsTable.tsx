'use client';

import { useState, useMemo } from 'react';
import { MoreHorizontal, Mail, Phone, Calendar, TrendingUp, TrendingDown, Eye, Edit, Trash2, Users } from 'lucide-react';

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
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);

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

  const getStatusBadge = (status: Student['status']) => {
    const statusConfig = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      completed: 'bg-blue-100 text-blue-800',
      paused: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status]}`}>
        ● {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTrendIcon = (trend: Student['trend']) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-red-500" />;
    return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '300ms' }}>
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <span className="text-sm font-medium text-gray-900">
              {filteredStudents.length} students
              {selectedStudents.length > 0 && ` (${selectedStudents.length} selected)`}
            </span>
          </div>
          
          {selectedStudents.length > 0 && (
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Send Message
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                Remove Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student, index) => (
              <tr 
                key={student.id} 
                className="hover:bg-gray-50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={(e) => handleSelectStudent(student.id, e.target.checked)}
                      className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    />
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.course}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {new Date(student.joinDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(student.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{student.progress}%</span>
                    {getTrendIcon(student.trend)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {student.sessionsCompleted}/{student.totalSessions}
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.round((student.sessionsCompleted / student.totalSessions) * 100)}% complete
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.lastActivity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative">
                    <button
                      onClick={() => setShowActions(showActions === student.id ? null : student.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    
                    {showActions === student.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Eye className="w-4 h-4" />
                            View Profile
                          </button>
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Edit className="w-4 h-4" />
                            Edit Student
                          </button>
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Mail className="w-4 h-4" />
                            Send Message
                          </button>
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Phone className="w-4 h-4" />
                            Schedule Call
                          </button>
                          <hr className="my-1" />
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                            Remove Student
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || selectedStatus !== 'all' || selectedCourse !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first student'
            }
          </p>
          <button className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
            Add Student
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredStudents.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{' '}
              <span className="font-medium">{filteredStudents.length}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}