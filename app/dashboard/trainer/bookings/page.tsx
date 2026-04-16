'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useBooking } from '@/contexts/BookingContext';
import { useUsers } from '@/contexts';
import { BookingStatus, Booking } from '@/types/booking';
import { UserRole } from '@/types/user';
import { Calendar, Clock, User, MessageSquare, CheckCircle, XCircle, AlertCircle, Filter, Search, RefreshCw } from 'lucide-react';

export default function TrainerBookingsPage() {
  const { 
    trainerPendingBookings, 
    trainerAllBookings, 
    loading, 
    error, 
    approveBooking, 
    rejectBooking, 
    refreshBookings 
  } = useBooking();
  const { students } = useUsers();
  
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [rejectingBooking, setRejectingBooking] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown Student';
  };

  const getStudentEmail = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student?.email || 'unknown@example.com';
  };

  const handleApprove = async (bookingId: string) => {
    try {
      await approveBooking(bookingId);
    } catch (err) {
      console.error('Failed to approve booking:', err);
    }
  };

  const handleReject = async () => {
    if (!rejectingBooking || !rejectionReason.trim()) return;
    
    try {
      await rejectBooking(rejectingBooking, rejectionReason.trim());
      setShowRejectModal(false);
      setRejectingBooking(null);
      setRejectionReason('');
    } catch (err) {
      console.error('Failed to reject booking:', err);
    }
  };

  const openRejectModal = (bookingId: string) => {
    setRejectingBooking(bookingId);
    setShowRejectModal(true);
    setRejectionReason('');
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setRejectingBooking(null);
    setRejectionReason('');
  };

  const filteredBookings = (activeTab === 'pending' ? trainerPendingBookings : trainerAllBookings).filter(booking => {
    const matchesSearch = getStudentName(booking.studentId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getStudentEmail(booking.studentId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case BookingStatus.APPROVED:
        return 'bg-green-100 text-green-800 border-green-200';
      case BookingStatus.REJECTED:
        return 'bg-red-100 text-red-800 border-red-200';
      case BookingStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case BookingStatus.CANCELLED:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar activeItem="Bookings" userType={UserRole.TRAINER} />
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-gray-100 animate-pulse"></div>
          <div className="flex-1 p-6 space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Bookings" userType={UserRole.TRAINER} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
              <p className="text-gray-500">Manage student booking requests</p>
            </div>
            <button
              onClick={refreshBookings}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex gap-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('pending')}
                className={`pb-3 px-1 font-medium text-sm transition-colors ${
                  activeTab === 'pending'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Pending ({trainerPendingBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-3 px-1 font-medium text-sm transition-colors ${
                  activeTab === 'all'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All Bookings ({trainerAllBookings.length})
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by student name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            {activeTab === 'all' && (
              <div className="sm:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'all')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value={BookingStatus.PENDING}>Pending</option>
                    <option value={BookingStatus.APPROVED}>Approved</option>
                    <option value={BookingStatus.REJECTED}>Rejected</option>
                    <option value={BookingStatus.COMPLETED}>Completed</option>
                    <option value={BookingStatus.CANCELLED}>Cancelled</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your filters' 
                    : activeTab === 'pending' 
                    ? 'No pending booking requests' 
                    : 'No bookings yet'}
                </p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Student Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{getStudentName(booking.studentId)}</h3>
                          <p className="text-sm text-gray-500">{getStudentEmail(booking.studentId)}</p>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {formatDate(booking.requestedTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </div>
                        </div>
                      </div>

                      {/* Learning Goals */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">Learning Goals</span>
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                          {booking.learningGoals}
                        </p>
                      </div>

                      {/* Rejection Reason */}
                      {booking.status === BookingStatus.REJECTED && booking.rejectionReason && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium text-red-700">Rejection Reason</span>
                          </div>
                          <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
                            {booking.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="ml-4">
                      {booking.status === BookingStatus.PENDING && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleApprove(booking.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => openRejectModal(booking.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reject Booking Request</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting this booking request. This will be shared with the student.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={closeRejectModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
