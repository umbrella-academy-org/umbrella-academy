// Reporting and support system type definitions

export interface StudentReport {
  id: string;
  trainerId: string;
  studentId: string;
  mentorId: string;
  wingId: string;
  reportType: 'progress' | 'roadmap_update' | 'session_summary';
  content: {
    achievements: string[];
    challenges: string[];
    nextSteps: string[];
    roadmapProgress: number; // percentage
  };
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: Date;
  reviewedAt?: Date;
  mentorFeedback?: string;
  createdAt: Date;
}

export interface SupportTicket {
  id: string;
  userId: string;
  wingId: string;
  wingAdminId?: string;
  title: string;
  description: string;
  category: 'technical' | 'billing' | 'content' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface ReportApprovalWorkflow {
  reportId: string;
  mentorId: string;
  action: 'approve' | 'reject' | 'request_changes';
  feedback?: string;
  timestamp: Date;
}

export interface SupportTicketUpdate {
  ticketId: string;
  updatedBy: string;
  updateType: 'status_change' | 'assignment' | 'comment' | 'resolution';
  details: string;
  timestamp: Date;
}