'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { guardianService } from '@/services/guardian';
import { useRoadmaps } from '@/contexts/RoadmapContext';
import { UserRole, Student, Roadmap, RoadmapStepStatus, ProjectStatus } from '@/types';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import {
  Users,
  Map,
  CheckCircle,
  Clock,
  Award,
  Wallet,
  Calendar,
  ChevronRight,
  Eye,
  FileText,
  AlertCircle,
  UserCircle,
  GraduationCap,
  Folder
} from 'lucide-react';

interface StudentWithDetails extends Student {
  roadmap?: Roadmap;
  progress?: number;
}

export default function GuardianDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { navigate } = useNavigationWithLoading();
  const { studentRoadmaps } = useRoadmaps();
  
  const [students, setStudents] = useState<StudentWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentWithDetails | null>(null);

  // Fetch linked students
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchStudents = async () => {
      try {
        const response = await guardianService.getLinkedStudents();
        if (response.success && response.data) {
          // Enrich students with roadmap data
          const enrichedStudents = response.data.map(student => {
            const roadmap = studentRoadmaps.find(r => r.studentId === student._id);
            const milestones = roadmap?.milestones || [];
            const completedMilestones = milestones.filter(m => m.status === RoadmapStepStatus.COMPLETED).length;
            const progress = milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0;
            
            return {
              ...student,
              roadmap,
              progress
            };
          });
          setStudents(enrichedStudents);
          if (enrichedStudents.length > 0) {
            setSelectedStudent(enrichedStudents[0]);
          }
        } else {
          setError(response.message || 'Failed to load students');
        }
      } catch {
        setError('An error occurred while loading students');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [isAuthenticated, studentRoadmaps]);

  // Redirect if not guardian
  useEffect(() => {
    if (user && user.role !== UserRole.GUARDIAN) {
      navigate('/dashboard/student');
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeItem="Dashboard" userType={UserRole.GUARDIAN} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-yellow-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const getSubscriptionStatus = (student: StudentWithDetails) => {
    if (!student.hasActiveSubscription) {
      return { label: 'Inactive', color: 'text-red-600', bg: 'bg-red-50' };
    }
    if (student.subscriptionExpiryDate) {
      const daysLeft = Math.ceil((new Date(student.subscriptionExpiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 6) return { label: `${daysLeft} days left`, color: 'text-red-600', bg: 'bg-red-50' };
      if (daysLeft <= 19) return { label: `${daysLeft} days left`, color: 'text-yellow-600', bg: 'bg-yellow-50' };
      return { label: 'Active', color: 'text-green-600', bg: 'bg-green-50' };
    }
    return { label: 'Active', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const getMilestoneStatusIcon = (status: RoadmapStepStatus) => {
    switch (status) {
      case RoadmapStepStatus.COMPLETED:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case RoadmapStepStatus.PENDING_APPROVAL:
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case RoadmapStepStatus.ACTIVE:
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Dashboard" userType={UserRole.GUARDIAN} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900">
                Welcome, {user?.firstName || 'Guardian'}
              </h1>
              <p className="text-gray-600 mt-1">
                Monitor your linked students&apos; learning progress and achievements
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {students.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No Students Linked</h2>
                <p className="text-gray-600">
                  You don&apos;t have any students linked to your account yet.
                  Students can add you as a guardian during registration.
                </p>
              </div>
            ) : (
              <>
                {/* Student Selector (if multiple students) */}
                {students.length > 1 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Student
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {students.map((student) => (
                        <button
                          key={student._id}
                          onClick={() => setSelectedStudent(student)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                            selectedStudent?._id === student._id
                              ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-yellow-300'
                          }`}
                        >
                          <UserCircle className="w-5 h-5" />
                          <span className="font-medium">{student.firstName} {student.lastName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedStudent && (
                  <>
                    {/* Student Overview Card */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-8 h-8 text-yellow-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                              {selectedStudent.firstName} {selectedStudent.lastName}
                            </h2>
                            <p className="text-gray-600">{selectedStudent.email}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSubscriptionStatus(selectedStudent).bg} ${getSubscriptionStatus(selectedStudent).color}`}>
                          {getSubscriptionStatus(selectedStudent).label}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Map className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-600">Progress</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{selectedStudent.progress}%</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-600">Milestones</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            {selectedStudent.roadmap?.milestones?.filter(m => m.status === RoadmapStepStatus.COMPLETED).length || 0}
                            <span className="text-sm font-normal text-gray-500"> / {selectedStudent.roadmap?.milestones?.length || 0}</span>
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-gray-600">Certificates</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            {selectedStudent.roadmap?.milestones?.filter(m => m.status === RoadmapStepStatus.COMPLETED).length || 0}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Folder className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-gray-600">Projects</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            {selectedStudent.roadmap?.milestones?.reduce((count, m) => 
                              count + (m.completedProjectIds?.length || 0), 0
                            ) || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Milestones Section */}
                    {selectedStudent.roadmap && selectedStudent.roadmap.milestones.length > 0 && (
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                        <div className="p-4 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Map className="w-5 h-5 text-yellow-600" />
                            Learning Roadmap: {selectedStudent.roadmap.title}
                          </h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {selectedStudent.roadmap.milestones.map((milestone, index) => (
                            <div key={index} className="p-4 flex items-center gap-4">
                              <div className="flex-shrink-0">
                                {getMilestoneStatusIcon(milestone.status)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                                <p className="text-sm text-gray-600 line-clamp-1">{milestone.description}</p>
                                {milestone.status === RoadmapStepStatus.COMPLETED && milestone.trainerFeedback && (
                                  <p className="text-sm text-green-600 mt-1">
                                    Trainer: &quot;{milestone.trainerFeedback}&quot;
                                  </p>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {milestone.status === RoadmapStepStatus.COMPLETED ? (
                                  <span className="text-green-600 font-medium">Completed</span>
                                ) : milestone.status === RoadmapStepStatus.PENDING_APPROVAL ? (
                                  <span className="text-yellow-600 font-medium">Pending Approval</span>
                                ) : milestone.status === RoadmapStepStatus.ACTIVE ? (
                                  <span className="text-blue-600 font-medium">In Progress</span>
                                ) : (
                                  <span className="text-gray-400">Locked</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Subscription Info */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-yellow-600" />
                        Subscription Status
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Orientation Payment</span>
                          <span className={`font-medium ${selectedStudent.hasPaidOrientation ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedStudent.hasPaidOrientation ? 'Paid' : 'Not Paid'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Active Subscription</span>
                          <span className={`font-medium ${selectedStudent.hasActiveSubscription ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedStudent.hasActiveSubscription ? 'Yes' : 'No'}
                          </span>
                        </div>
                        {selectedStudent.subscriptionExpiryDate && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Subscription Expires</span>
                            <span className="font-medium text-gray-900">
                              {new Date(selectedStudent.subscriptionExpiryDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
