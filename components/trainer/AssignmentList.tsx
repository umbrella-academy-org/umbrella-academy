'use client';

import { FileText, Clock, User, Paperclip, Eye, MessageSquare, CheckCircle } from 'lucide-react';

interface AssignmentListProps {
  activeTab: string;
}

export default function AssignmentList({ activeTab }: AssignmentListProps) {
  const assignments = {
    pending: [
      {
        id: 1,
        title: 'React Hooks Implementation',
        student: 'Sarah Johnson',
        course: 'Advanced React',
        submittedAt: '2 hours ago',
        dueDate: 'Jan 25, 2026',
        attachments: 3,
        grade: null,
        status: 'submitted'
      },
      {
        id: 2,
        title: 'Component State Management',
        student: 'Mike Chen',
        course: 'Advanced React',
        submittedAt: '5 hours ago',
        dueDate: 'Jan 25, 2026',
        attachments: 2,
        grade: null,
        status: 'submitted'
      },
      {
        id: 3,
        title: 'API Integration Project',
        student: 'Emily Davis',
        course: 'Full Stack Development',
        submittedAt: '1 day ago',
        dueDate: 'Jan 24, 2026',
        attachments: 4,
        grade: null,
        status: 'submitted'
      }
    ],
    completed: [
      {
        id: 4,
        title: 'JavaScript Fundamentals Quiz',
        student: 'Alex Rodriguez',
        course: 'JavaScript Fundamentals',
        submittedAt: '3 days ago',
        dueDate: 'Jan 22, 2026',
        attachments: 1,
        grade: 95,
        status: 'graded'
      },
      {
        id: 5,
        title: 'CSS Grid Layout',
        student: 'Lisa Wang',
        course: 'Web Development',
        submittedAt: '5 days ago',
        dueDate: 'Jan 20, 2026',
        attachments: 2,
        grade: 88,
        status: 'graded'
      }
    ],
    overdue: [
      {
        id: 6,
        title: 'Database Design Project',
        student: 'John Smith',
        course: 'Backend Development',
        submittedAt: null,
        dueDate: 'Jan 18, 2026',
        attachments: 0,
        grade: null,
        status: 'overdue'
      }
    ],
    draft: [
      {
        id: 7,
        title: 'Advanced React Patterns',
        student: null,
        course: 'Advanced React',
        submittedAt: null,
        dueDate: 'Jan 30, 2026',
        attachments: 0,
        grade: null,
        status: 'draft'
      }
    ]
  };

  const currentAssignments = assignments[activeTab as keyof typeof assignments] || [];

  const getStatusBadge = (status: string, grade?: number | null) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Submitted</span>;
      case 'graded':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Graded ({grade}%)</span>;
      case 'overdue':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Overdue</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Draft</span>;
      default:
        return null;
    }
  };

  if (currentAssignments.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeTab} assignments
          </h3>
          <p className="text-gray-600">
            {activeTab === 'draft' 
              ? 'Create your first assignment to get started.'
              : `No assignments in ${activeTab} status at the moment.`
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="divide-y divide-gray-200">
        {currentAssignments.map((assignment, index) => (
          <div 
            key={assignment.id}
            className="p-6 hover:bg-gray-50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {assignment.title}
                  </h3>
                  {getStatusBadge(assignment.status, assignment.grade)}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  {assignment.student && (
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {assignment.student}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {assignment.course}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Due: {assignment.dueDate}
                  </div>
                  {assignment.attachments > 0 && (
                    <div className="flex items-center gap-1">
                      <Paperclip className="w-4 h-4" />
                      {assignment.attachments} files
                    </div>
                  )}
                </div>

                {assignment.submittedAt && (
                  <p className="text-sm text-gray-600">
                    Submitted {assignment.submittedAt}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                {assignment.status === 'submitted' && (
                  <>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                      Review
                    </button>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      Grade
                    </button>
                  </>
                )}
                
                {assignment.status === 'graded' && (
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                )}

                {assignment.status === 'overdue' && (
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Contact
                  </button>
                )}

                {assignment.status === 'draft' && (
                  <>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                      Publish
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Assignment Progress for submitted items */}
            {assignment.status === 'submitted' && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-700 font-medium">Awaiting Review</span>
                  <span className="text-gray-600">Priority: Normal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full w-1/3" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}