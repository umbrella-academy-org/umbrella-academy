import { Payment } from "./payment";
import { Trainer, UserRole } from "./user";

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  ORIENTATION_BOOKED = 'orientation_booked',
  SUBSCRIBED = 'subscribed',
  LOST = 'lost'
}

export interface SalesLead {
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  signupDate: Date;
  status: LeadStatus;
  lastContactedAt: Date | null;
  notes: string;
}

export interface SalesDashboardData {
  totalFreeSignups: number;
  conversionRate: number;
  leads: SalesLead[];
}

/**
 * Admin Dashboard Data (Section 17)
 */
export interface AdminDashboardData {
  totalUsers: Record<UserRole, number>;
  pendingTrainerApplications: Trainer[];
  activeSubscriptions: number;
  monthlyRevenue: number;
  recentPayments: Payment[];
}