import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';

export interface StatsResponse {
  student?: { activeRoadmaps: number; completedSessions: number; upcomingSessions: number; roadmapProgress: number };
  trainer?: { assignedStudents: number; totalSessionsConducted: number; upcomingSessions: number; walletBalance: number };
  admin?: { totalUsersByRole: Record<string, number>; totalRevenue: number; activeRoadmaps: number; completedSessions: number };
}

class StatsService {
  async getMyStats(): Promise<{ success: boolean; data: StatsResponse }> {
    return apiClient.get<{ success: boolean; data: StatsResponse }>(API_ENDPOINTS.STATS_ME);
  }
}

export const statsService = new StatsService();
