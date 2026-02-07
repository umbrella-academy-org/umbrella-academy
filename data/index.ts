// Centralized data exports for Umbrella Academy LMS

// User data
export * from './users';

// Field data (formerly Wing)
export { mockFields, getFieldById, getFieldByCode, getActiveFields, getTotalStudents, getTotalTrainers } from './fields';
export { getTotalRevenue as getFieldsTotalRevenue } from './fields';

// Roadmap data (replaces course data)
export * from './courses'; // Keep for live sessions
export * from './roadmaps';

// Transaction and wallet data
export {
  mockTransactions,
  mockWallets,
  mockSubscriptions,
  getWalletByOwnerId,
  getWalletsByType,
  getTransactionsByType,
  getTransactionsByStatus,
  getSubscriptionsByStatus,
  getTotalTrainerPayouts,
  getTotalFieldRevenue,
  getUmbrellaRevenue
} from './transactions';
export { getTotalRevenue as getTransactionsTotalRevenue } from './transactions';

// Roadmap data
export * from './roadmaps';

// System monitoring data
export * from './system';

// Combined data helpers
import { mockUsers } from './users';
import { mockFields } from './fields';
import { mockRoadmaps, mockStudentRoadmaps } from './roadmaps';
import { mockSystemStats } from './system';

export const getDashboardStats = () => ({
  totalUsers: mockUsers.length,
  totalStudents: mockUsers.filter(u => u.role === 'student').length,
  totalTrainers: mockUsers.filter(u => u.role === 'trainer').length,
  totalMentors: mockUsers.filter(u => u.role === 'mentor').length,
  totalFields: mockFields.length,
  activeFields: mockFields.filter(f => f.status === 'active').length,
  totalRoadmaps: mockRoadmaps.length,
  activeRoadmaps: mockStudentRoadmaps.filter(r => r.status === 'active').length,
  totalRevenue: mockFields.reduce((sum, field) => sum + field.totalRevenue, 0),
  systemHealth: mockSystemStats.systemUptime
});

export const getFieldDashboardStats = (fieldId: string) => {
  const field = mockFields.find(f => f.id === fieldId);
  const fieldUsers = mockUsers.filter(u => u.fieldId === fieldId);
  const fieldRoadmaps = mockStudentRoadmaps.filter(r =>
    mockUsers.find(u => u.id === r.studentId)?.fieldId === fieldId
  );

  return {
    fieldName: field?.name || 'Unknown Field',
    totalStudents: fieldUsers.filter(u => u.role === 'student').length,
    totalTrainers: fieldUsers.filter(u => u.role === 'trainer').length,
    activeRoadmaps: fieldRoadmaps.filter(r => r.status === 'active').length,
    fieldRevenue: field?.totalRevenue || 0,
    fieldStatus: field?.status || 'inactive'
  };
};

export const getTrainerDashboardStats = (trainerId: string) => {
  const trainerStudents = mockUsers.filter(u => u.role === 'student'); // In real app, filter by trainerId
  const trainerRoadmaps = mockStudentRoadmaps.filter(r => r.status === 'active'); // In real app, filter by trainer

  return {
    totalStudents: trainerStudents.length,
    activeRoadmaps: trainerRoadmaps.length,
    completedSessions: 24, // Mock data
    upcomingSessions: 6, // Mock data
    monthlyEarnings: 180000, // RWF
    studentSatisfaction: 4.8
  };
};

export const getMentorDashboardStats = (mentorId: string) => {
  const mentorRoadmaps = mockRoadmaps.filter(r => r.mentorId === mentorId);
  const mentorStudentRoadmaps = mockStudentRoadmaps.filter(r =>
    r.roadmap.mentorId === mentorId
  );

  return {
    totalRoadmaps: mentorRoadmaps.length,
    totalStudents: mentorStudentRoadmaps.length,
    activeStudents: mentorStudentRoadmaps.filter(r => r.status === 'active').length,
    averageProgress: mentorStudentRoadmaps.reduce((sum, r) => sum + r.roadmap.progress.overallProgress, 0) / mentorStudentRoadmaps.length || 0,
    pendingApprovals: mentorRoadmaps.filter(r => r.status === 'pending-approval').length,
    monthlyRevenue: 450000 // RWF
  };
};