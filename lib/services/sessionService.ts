// Live session management service - Data access layer for session operations

import { OnboardingSession, RoadmapFormData } from '@/types';
import { mockOnboardingSessions as mockSessions } from '@/data/onboarding-sessions';

export class SessionService {
  /**
   * Get all sessions
   */
  static async getAllSessions(): Promise<OnboardingSession[]> {
    return mockSessions;
  }

  /**
   * Get session by ID
   */
  static async getSessionById(id: string): Promise<OnboardingSession | null> {
    return mockSessions.find(session => session.id === id) || null;
  }

  /**
   * Get sessions by trainer ID
   */
  static async getSessionsByTrainer(trainerId: string): Promise<OnboardingSession[]> {
    return mockSessions.filter(session => session.trainerId === trainerId);
  }

  /**
   * Get sessions by student ID
   */
  static async getSessionsByStudent(studentId: string): Promise<OnboardingSession[]> {
    return mockSessions.filter(session => session.studentId === studentId);
  }

  /**
   * Get sessions by field ID
   */
  static async getSessionsByField(fieldId: string): Promise<OnboardingSession[]> {
    return mockSessions.filter(session => session.fieldId === fieldId);
  }

  /**
   * Create a new live session
   */
  static async createSession(sessionData: Omit<OnboardingSession, 'id' | 'createdAt' | 'status'>): Promise<OnboardingSession> {
    const newSession: OnboardingSession = {
      ...sessionData,
      id: `session_${Date.now()}`,
      status: 'scheduled',
      createdAt: new Date()
    };

    mockSessions.push(newSession);
    return newSession;
  }

  /**
   * Update session information
   */
  static async updateSession(id: string, updates: Partial<OnboardingSession>): Promise<OnboardingSession | null> {
    const sessionIndex = mockSessions.findIndex(session => session.id === id);
    if (sessionIndex === -1) return null;

    mockSessions[sessionIndex] = { ...mockSessions[sessionIndex], ...updates };
    return mockSessions[sessionIndex];
  }

  /**
   * Start a live session
   */
  static async startSession(id: string, screenSharingUrl?: string): Promise<OnboardingSession | null> {
    const session = await this.updateSession(id, {
      status: 'in_progress',
      screenSharingUrl
    });
    return session;
  }

  /**
   * Complete a live session with roadmap data
   */
  static async completeSession(
    id: string,
    roadmapData: RoadmapFormData,
    notes?: string
  ): Promise<OnboardingSession | null> {
    const session = await this.updateSession(id, {
      status: 'completed',
      roadmapData,
      notes
    });
    return session;
  }

  /**
   * Cancel a live session
   */
  static async cancelSession(id: string, reason?: string): Promise<OnboardingSession | null> {
    const session = await this.updateSession(id, {
      status: 'cancelled',
      notes: reason
    });
    return session;
  }

  /**
   * Get available time slots for a trainer
   */
  static async getAvailableTimeSlots(
    trainerId: string,
    date: Date
  ): Promise<Array<{ start: Date; end: Date; available: boolean }>> {
    // Mock implementation - in real app, this would check trainer availability and existing bookings
    const timeSlots = [];
    const baseDate = new Date(date);
    baseDate.setHours(9, 0, 0, 0); // Start at 9 AM

    for (let i = 0; i < 8; i++) { // 8 time slots (9 AM to 5 PM)
      const start = new Date(baseDate);
      start.setHours(9 + i);

      const end = new Date(start);
      end.setHours(start.getHours() + 1);

      // Check if slot is already booked
      const isBooked = mockSessions.some(session =>
        session.trainerId === trainerId &&
        session.scheduledAt.getTime() === start.getTime() &&
        session.status !== 'cancelled'
      );

      timeSlots.push({
        start,
        end,
        available: !isBooked
      });
    }

    return timeSlots;
  }

  /**
   * Book a live session
   */
  static async bookSession(
    trainerId: string,
    studentId: string,
    fieldId: string,
    scheduledAt: Date,
    duration: number = 120
  ): Promise<OnboardingSession | null> {
    // Check if trainer is available at the requested time
    const availableSlots = await this.getAvailableTimeSlots(trainerId, scheduledAt);
    const requestedHour = scheduledAt.getHours();
    const isAvailable = availableSlots.some(slot =>
      slot.start.getHours() === requestedHour && slot.available
    );

    if (!isAvailable) {
      return null; // Trainer not available
    }

    return this.createSession({
      trainerId,
      studentId,
      fieldId,
      scheduledAt,
      duration
    });
  }

  /**
   * Get session statistics for a field
   */
  static async getFieldSessionStatistics(fieldId: string): Promise<{
    totalSessions: number;
    scheduledSessions: number;
    completedSessions: number;
    cancelledSessions: number;
    inProgressSessions: number;
    averageDuration: number;
  }> {
    const sessions = mockSessions.filter(session => session.fieldId === fieldId);

    const completedSessions = sessions.filter(s => s.status === 'completed');
    const averageDuration = completedSessions.length > 0
      ? completedSessions.reduce((sum, s) => sum + s.duration, 0) / completedSessions.length
      : 0;

    return {
      totalSessions: sessions.length,
      scheduledSessions: sessions.filter(s => s.status === 'scheduled').length,
      completedSessions: completedSessions.length,
      cancelledSessions: sessions.filter(s => s.status === 'cancelled').length,
      inProgressSessions: sessions.filter(s => s.status === 'in_progress').length,
      averageDuration
    };
  }

  /**
   * Get upcoming sessions for a user
   */
  static async getUpcomingSessions(userId: string, role: 'trainer' | 'student'): Promise<OnboardingSession[]> {
    const now = new Date();
    const sessions = mockSessions.filter(session => {
      const isUserSession = role === 'trainer'
        ? session.trainerId === userId
        : session.studentId === userId;

      return isUserSession &&
        session.scheduledAt > now &&
        session.status === 'scheduled';
    });

    return sessions.sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
  }
}