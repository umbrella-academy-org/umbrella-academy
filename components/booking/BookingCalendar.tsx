'use client';

import { useState } from 'react';
import { X, Calendar, Clock, User, CheckCircle, MessageSquare } from 'lucide-react';
import { useUsers } from '@/contexts';
import { Trainer } from '@/types';

interface BookingCalendarProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function BookingCalendar({ onClose, onSuccess }: BookingCalendarProps) {
  const { trainers } = useUsers()
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [learningGoals, setLearningGoals] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStep, setBookingStep] = useState<'select' | 'confirm' | 'submitting' | 'success'>('select');



  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false }
  ];

  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingStep('submitting');

    // Simulate booking submission
    setTimeout(() => {
      setBookingStep('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 3000);
  };

  const handleClose = () => {
    if (bookingStep !== 'submitting') {
      onClose();
    }
  };

  const canProceed = selectedTrainer && selectedDate && selectedTime && learningGoals.trim();

  if (bookingStep === 'submitting') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-md w-full mx-4 p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Orientation Session</h3>
          <p className="text-gray-500">Please wait while we book your session...</p>
        </div>
      </div>
    );
  }

  if (bookingStep === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-md w-full mx-4 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Session Booked Successfully!</h3>
            <p className="text-gray-500 mb-4">Your orientation session has been scheduled</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">Trainer: {selectedTrainer?.firstName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">Date: {selectedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">Time: {selectedTime}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onSuccess}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mt-6"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Book Orientation Session</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {bookingStep === 'select' && (
            <div className="space-y-6">
              {/* Step 1: Select Mentor */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Choose Your Mentor</h3>
                <div className="space-y-3">
                  {trainers.map((trainer) => (
                    <button
                      key={trainer.id}
                      onClick={() => setSelectedTrainer(trainer)}
                      className={`w-full p-4 border rounded-lg text-left transition-colors ${selectedTrainer?.id === trainer.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{trainer.firstName}</h4>
                          <p className="text-sm text-gray-500">{trainer.experience.specializations}</p>
                        </div>
                        {selectedTrainer?.id === trainer.id && (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Date */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Select Date</h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 border rounded-lg text-center transition-colors ${selectedDate === date
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="font-medium text-gray-900">
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Select Time */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Select Time</h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 border rounded-lg text-center transition-colors ${!slot.available
                        ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : selectedTime === slot.time
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="font-medium">{slot.time}</div>
                      {!slot.available && (
                        <div className="text-xs text-red-500">Booked</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Learning Goals */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Your Learning Goals</h3>
                <textarea
                  value={learningGoals}
                  onChange={(e) => setLearningGoals(e.target.value)}
                  placeholder="Tell your mentor what you want to learn and achieve..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This helps your mentor prepare for your session
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setBookingStep('confirm')}
                  disabled={!canProceed}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Confirmation
                </button>
              </div>
            </div>
          )}

          {bookingStep === 'confirm' && (
            <div className="space-y-6">
              <h3 className="font-medium text-gray-900">Confirm Your Booking</h3>

              {/* Booking Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Trainer</p>
                      <p className="text-sm text-gray-600">{selectedTrainer?.firstName}</p>
                      <p className="text-sm text-gray-500">{selectedTrainer?.experience.specializations}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Date & Time</p>
                      <p className="text-sm text-gray-600">{selectedDate} at {selectedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Learning Goals</p>
                      <p className="text-sm text-gray-600">{learningGoals}</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">
                    <strong>Important:</strong> Your mentor will review your request and confirm the session. You'll receive a notification once confirmed.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingStep('select')}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Book Session
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
