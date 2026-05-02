'use client';

  import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/contexts';
import { Booking, BookingStatus } from '@/types/booking';
import { UserRole } from '@/types/user';
import { Calendar, Clock, MapPin, Video, User } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';

export default function StudentCalendarPage() {
  const { user } = useAuth();
  const { studentBookings: sessions,loading } = useBooking();

  console.log(sessions)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSessionStatus = (session: Booking) => {
    const now = new Date();
    const sessionTime = new Date(session.requestedTime);

    if (sessionTime < now) {
      return { text: 'Completed', color: 'bg-gray-100 text-gray-700' };
    } else {
      const hoursUntil = Math.floor((sessionTime.getTime() - now.getTime()) / (1000 * 60 * 60));
      if (hoursUntil <= 24) {
        return { text: 'Today', color: 'bg-green-100 text-green-700' };
      } else if (hoursUntil <= 72) {
        return { text: 'This Week', color: 'bg-blue-100 text-blue-700' };
      } else {
        return { text: 'Upcoming', color: 'bg-yellow-100 text-yellow-700' };
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#FDF9F2]">
        <Sidebar activeItem="Sessions & Calendar" userType={UserRole.STUDENT} />
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-slate-100 animate-pulse"></div>
          <div className="flex-1 p-8 space-y-6">
            <div className="h-8 bg-slate-200 rounded-xl animate-pulse"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-[32px] animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FDF9F2]">
      <Sidebar activeItem="Sessions & Calendar" userType={UserRole.STUDENT} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-playfair font-semibold text-slate-900">My Sessions</h1>
              <p className="text-slate-500 font-light">Your approved mentorship sessions</p>
            </div>
            <div className="text-sm text-slate-500">
              {sessions.length} session{sessions.length !== 1 ? 's' : ''} scheduled
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-playfair font-semibold text-slate-900 mb-2">No Sessions Yet</h3>
              <p className="text-slate-500 font-light">
                Your approved mentorship sessions will appear here once you book and complete your orientation.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {sessions.map((session) => {
                const status = getSessionStatus(session);
                return (
                  <div key={session.id} className="bg-white border border-slate-100 rounded-[32px] p-6 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Session Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Video className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-playfair font-semibold text-slate-900">Mentorship Session</h3>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                              {status.text}
                            </div>
                          </div>
                        </div>

                        {/* Session Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <div>
                              <span className="text-sm text-slate-600 font-light">{formatDate(session.requestedTime)}</span>
                              <span className="text-sm font-medium text-slate-900 ml-1">{formatTime(session.requestedTime)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-600 font-light">Duration: {session.sessionDuration} minutes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-600 font-light">
                              {session.sessionFormat === 'online' ? 'Online Session' : 'In-Person'}
                            </span>
                          </div>
                        </div>

                        {/* Learning Goals */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Learning Goals</h4>
                          <p className="text-sm text-slate-600 font-light bg-slate-50 rounded-xl p-3">
                            {session.learningGoals}
                          </p>
                        </div>

                        {/* Session Details */}
                        {session.status === BookingStatus.APPROVED && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-slate-700 mb-2">Session Details</h4>
                              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                                <p className="text-sm text-slate-700 font-light mb-2">{session.approvalNotes}</p>
                                {session.sessionLocation && (
                                  <div className="mt-3 pt-3 border-t border-primary/20">
                                    <p className="text-sm font-medium text-primary mb-1">Meeting Link:</p>
                                    <a
                                      href={session.sessionLocation}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-primary hover:text-primary/80 underline"
                                    >
                                      {session.sessionLocation}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>

                            {session.preparationRequirements && (
                              <div>
                                <h4 className="text-sm font-medium text-slate-700 mb-2">Preparation Required</h4>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                  <p className="text-sm text-slate-700 font-light">{session.preparationRequirements}</p>
                                </div>
                              </div>
                            )}

                            {session.nextSteps && (
                              <div>
                                <h4 className="text-sm font-medium text-slate-700 mb-2">Next Steps</h4>
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                  <p className="text-sm text-slate-700 font-light">{session.nextSteps}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="ml-4">
                        {session.status === BookingStatus.APPROVED && new Date(session.requestedTime) > new Date() && (
                          <button className="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors">
                            Join Session
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}