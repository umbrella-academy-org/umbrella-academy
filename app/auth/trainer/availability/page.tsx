'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, CheckCircle } from 'lucide-react';

export default function MentorAvailabilityPage() {
    const router = useRouter();
    const [hoursPerDay, setHoursPerDay] = useState('4');
    const [timeSlots, setTimeSlots] = useState<string[]>([]);

    const availableSlots = [
        { id: 'morning', label: 'Morning Sync', time: '8:00 AM - 12:00 PM' },
        { id: 'afternoon', label: 'Afternoon Sync', time: '12:00 PM - 5:00 PM' },
        { id: 'evening', label: 'Evening Sync', time: '5:00 PM - 9:00 PM' },
        { id: 'night', label: 'Flexible / Late Night', time: '9:00 PM - 12:00 AM' },
    ];

    const toggleSlot = (id: string) => {
        setTimeSlots(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        if (timeSlots.length === 0) {
            alert('Please select your teaching availability');
            return;
        }
        console.log('Mentor Availability:', { hoursPerDay, timeSlots });
        router.push('/auth/trainer/upload-proofs');
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Left side - Form */}
            <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
                <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-xs font-black   ">Go back</span>
                    </button>

                    <div className="flex flex-col items-center justify-center flex-1">
                        <div className="mb-8">
                            <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-600/20">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
                            Trainer Capacity
                        </h1>
                        <p className="text-gray-500 mb-8 text-center">
                            How many hours can you dedicate to mentoring students?
                        </p>

                        {/* Form */}
                        <form onSubmit={handleContinue} className="w-full space-y-6">
                            {/* Hours per Week */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Weekly Commitment (Hours)
                                </label>
                                <div className="grid grid-cols-5 gap-3">
                                    {['2', '4', '8', '12', '20+'].map((h) => (
                                        <button
                                            key={h}
                                            type="button"
                                            onClick={() => setHoursPerDay(h)}
                                            className={`py-3 rounded-lg text-sm font-medium transition-all border ${hoursPerDay === h
                                                ? 'border-yellow-600 bg-gray-50 text-gray-600'
                                                : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                                                }`}
                                        >
                                            {h}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Sync Windows
                                </label>
                                <div className="space-y-3">
                                    {availableSlots.map((slot) => (
                                        <button
                                            key={slot.id}
                                            type="button"
                                            onClick={() => toggleSlot(slot.id)}
                                            className={`w-full flex items-center gap-4 p-4 border rounded-lg transition-all ${timeSlots.includes(slot.id)
                                                ? 'border-yellow-600 bg-gray-50'
                                                : 'border-gray-300 bg-white hover:border-gray-400'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${timeSlots.includes(slot.id) ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className={`text-sm font-semibold ${timeSlots.includes(slot.id) ? 'text-gray-900' : 'text-gray-700'
                                                    }`}>
                                                    {slot.label}
                                                </p>
                                                <p className="text-xs text-gray-500">{slot.time}</p>
                                            </div>
                                            {timeSlots.includes(slot.id) && (
                                                <CheckCircle className="w-5 h-5 text-gray-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                            >
                                Continue
                            </button>

                            {/* Progress dots */}
                            <div className="flex justify-center gap-2 pt-4">
                                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-sm text-gray-500 text-center">
                    © Dreamize 2025
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block flex-[1] relative overflow-hidden">
                <Image
                    src="/real/image.jpeg"
                    alt="Mentor background"
                    fill
                    className="object-cover object-center scale-105"
                    priority
                    quality={100}
                />
            </div>
        </div>
    );
}
