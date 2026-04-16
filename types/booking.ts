
export enum BookingStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface StudentBookingRequest {
  trainerId: string;
  requestedTime: Date;
  learningGoals: string;
}

export interface Booking  {
  id: string;
  studentId: string;
  trainerId: string;
  requestedTime: Date;
  learningGoals: string;
  status: BookingStatus;
  rejectionReason?: string;
  approvedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
