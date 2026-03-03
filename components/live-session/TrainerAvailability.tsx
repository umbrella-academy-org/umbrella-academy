'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Video } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Trainer {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  avatar: string;
  fieldId: string;
}

interface TrainerAvailabilityProps {
  onBookSession: (trainerId: string, timeSlot: string) => void;
}

export default function TrainerAvailability({ onBookSession }: TrainerAvailabilityProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Mock data - in real app, would filter by user's field
  const trainers: Trainer[] = [
    {
      id: 'trainer1',
      name: 'Sarah Johnson',
      expertise: ['Software Engineering', 'AI/ML', 'Cloud Computing'],
      rating: 4.9,
      avatar: '/avatars/sarah.jpg',
      fieldId: 'tech'
    },
    {
      id: 'trainer2',
      name: 'Michael Chen',
      expertise: ['Product Management', 'DevOps', 'System Design'],
      rating: 4.8,
      avatar: '/avatars/michael.jpg',
      fieldId: 'tech'
    }
  ];

  const timeSlots: TimeSlot[] = [
    { id: '09:00', time: '9:00 AM', available: true },
    { id: '10:00', time: '10:00 AM', available: false },
    { id: '11:00', time: '11:00 AM', available: true },
    { id: '14:00', time: '2:00 PM', available: true },
    { id: '15:00', time: '3:00 PM', available: true },
    { id: '16:00', time: '4:00 PM', available: false }
  ];

  const handleBookSession = () => {
    if (selectedTrainer && selectedTimeSlot) {
      onBookSession(selectedTrainer, selectedTimeSlot);
      localStorage.setItem('hasBookedSession', 'true');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Book Live Session</h3>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
      </div>

      {/* Trainer Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose Trainer
        </label>
        <div className="space-y-3">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTrainer === trainer.id
                  ? 'border-gray-600 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => setSelectedTrainer(trainer.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{trainer.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>★ {trainer.rating}</span>
                    <span>•</span>
                    <span>{trainer.expertise.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      {selectedTrainer && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Available Time Slots
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => setSelectedTimeSlot(slot.id)}
                className={`p-3 border rounded-lg text-sm font-medium transition-colors ${!slot.available
                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : selectedTimeSlot === slot.id
                      ? 'border-gray-600 bg-gray-50 text-gray-600'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  {slot.time}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Book Button */}
      {selectedTrainer && selectedTimeSlot && (
        <button
          onClick={handleBookSession}
          className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <Video className="w-4 h-4" />
          Book Live Session
        </button>
      )}
    </div>
  );
}