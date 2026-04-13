// Centralized data exports for Dreamize LMS

// User data
export * from './users';

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
export * from './payments';
export * from './onboarding-sessions';

// Combined data helpers
import { mockUsers } from './users';
import { mockRoadmaps, mockStudentRoadmaps } from './roadmaps';
import { mockSystemStats } from './system';

export const getDashboardStats = () => ({
  totalUsers: mockUsers.length,
  totalStudents: mockUsers.filter(u => u.role === 'student').length,
  totalTrainers: mockUsers.filter(u => u.role === 'trainer').length,
  totalRoadmaps: mockRoadmaps.length,
  activeRoadmaps: mockStudentRoadmaps.filter(r => r.status === 'active').length,
  systemHealth: mockSystemStats.systemUptime
});

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

export const getTrainerDashboardStatsByRoadmap = (trainerId: string) => {
  const trainerRoadmaps = mockRoadmaps.filter(r => r.trainerId === trainerId);
  const trainerStudentRoadmaps = mockStudentRoadmaps.filter(r =>
    r.roadmap.trainerId === trainerId
  );

  return {
    totalRoadmaps: trainerRoadmaps.length,
    totalStudents: trainerStudentRoadmaps.length,
    activeStudents: trainerStudentRoadmaps.filter(r => r.status === 'active').length,
    averageProgress: trainerStudentRoadmaps.reduce((sum, r) => sum + r.roadmap.progress.overallProgress, 0) / trainerStudentRoadmaps.length || 0,
    pendingApprovals: trainerRoadmaps.filter(r => r.status === 'pending-approval').length,
    monthlyRevenue: 450000 // RWF
  };
};