// Centralized data exports for Umbrella Academy LMS

// User data
export * from './users';

// Wing data
export { mockWings, getWingById, getWingByCode, getActiveWings, getTotalStudents, getTotalTrainers } from './wings';
export { getTotalRevenue as getWingsTotalRevenue } from './wings';

// Course data
export * from './courses';

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
  getTotalWingRevenue,
  getUmbrellaRevenue
} from './transactions';
export { getTotalRevenue as getTransactionsTotalRevenue } from './transactions';

// Roadmap data
export * from './roadmaps';

// System monitoring data
export * from './system';

// Combined data helpers
import { mockUsers } from './users';
import { mockWings } from './wings';
import { mockCourses } from './courses';
import { mockStudentRoadmaps } from './roadmaps';
import { mockSystemStats } from './system';

export const getDashboardStats = () => ({
  totalUsers: mockUsers.length,
  totalStudents: mockUsers.filter(u => u.role === 'student').length,
  totalTrainers: mockUsers.filter(u => u.role === 'trainer').length,
  totalMentors: mockUsers.filter(u => u.role === 'mentor').length,
  totalWings: mockWings.length,
  activeWings: mockWings.filter(w => w.status === 'active').length,
  totalCourses: mockCourses.length,
  activeRoadmaps: mockStudentRoadmaps.filter(r => r.status === 'active').length,
  totalRevenue: mockWings.reduce((sum, wing) => sum + wing.revenue, 0),
  systemHealth: mockSystemStats.systemUptime
});

export const getWingDashboardStats = (wingId: string) => {
  const wing = mockWings.find(w => w.id === wingId);
  const wingUsers = mockUsers.filter(u => u.wing === wingId);
  const wingRoadmaps = mockStudentRoadmaps.filter(r => 
    mockUsers.find(u => u.id === r.studentId)?.wing === wingId
  );
  
  return {
    wingName: wing?.name || 'Unknown Wing',
    totalStudents: wingUsers.filter(u => u.role === 'student').length,
    totalTrainers: wingUsers.filter(u => u.role === 'trainer').length,
    activeRoadmaps: wingRoadmaps.filter(r => r.status === 'active').length,
    wingRevenue: wing?.revenue || 0,
    wingStatus: wing?.status || 'inactive'
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
  const mentorCourses = mockCourses.filter(c => c.mentor.id === mentorId);
  const mentorStudents = mockStudentRoadmaps.filter(r => 
    mentorCourses.some(c => c.id === r.courseId)
  );
  
  return {
    totalCourses: mentorCourses.length,
    totalStudents: mentorStudents.length,
    activeStudents: mentorStudents.filter(r => r.status === 'active').length,
    averageProgress: mentorStudents.reduce((sum, r) => sum + r.course.progress.overallProgress, 0) / mentorStudents.length || 0,
    pendingApprovals: 3, // Mock data
    monthlyRevenue: 450000 // RWF
  };
};