'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, CheckCircle } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function StudentAvailabilityPage() {
    const router = useRouter();
    const [hoursPerDay, setHoursPerDay] = useState('2');
    const [timeSlots, setTimeSlots] = useState<string[]>([]);

    const availableSlots = [
        { id: 'morning', label: 'Morning', time: '8:00 AM - 12:00 PM' },
        { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 5:00 PM' },
        { id: 'evening', label: 'Evening', time: '5:00 PM - 9:00 PM' },
        { id: 'night', label: 'Night', time: '9:00 PM - 12:00 AM' },
    ];

    const toggleSlot = (id: string) => {
        setTimeSlots(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        if (timeSlots.length === 0) {
            alert('Please select at least one time slot');
            return;
        }
        console.log('Availability:', { hoursPerDay, timeSlots });
        // Store availability data
        localStorage.setItem('availabilitySet', 'true');
        localStorage.setItem('availabilityData', JSON.stringify({ hoursPerDay, timeSlots }));
        router.push('/post-signup/choose-trainer');
    };

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Roadmap" userType="student" />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-auto flex items-center justify-center bg-gray-50">
                    <div className=" w-full p-8">
                        {/* Go back button */}
                        <button
                            onClick={() => router.push('/dashboard/student')}
                            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
                        >
                            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-xs font-black uppercase">Go back</span>
                        </button>

                        <div className="text-center">
                            {/* Logo */}
                            <div className="mb-8">
                                <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-600/20 mx-auto">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                                Your Availability
                            </h1>
                            <p className="text-gray-500 mb-8 text-center">
                                How many hours can you dedicate to learning each day?
                            </p>

                            {/* Form */}
                            <form onSubmit={handleContinue} className="w-full space-y-6">
                                {/* Hours per Day */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Daily Commitment (Hours)
                                    </label>
                                    <div className="grid grid-cols-5 gap-3">
                                        {['1', '2', '4', '6', '8+'].map((h) => (
                                            <button
                                                key={h}
                                                type="button"
                                                onClick={() => setHoursPerDay(h)}
                                                className={`py-3 rounded-lg text-sm font-medium transition-all border ${hoursPerDay === h
                                                    ? 'border-yellow-600 bg-yellow-50 text-yellow-600'
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
                                        Preferred Time Windows
                                    </label>
                                    <div className="space-y-3">
                                        {availableSlots.map((slot) => (
                                            <button
                                                key={slot.id}
                                                type="button"
                                                onClick={() => toggleSlot(slot.id)}
                                                className={`w-full flex items-center gap-4 p-4 border rounded-lg transition-all ${timeSlots.includes(slot.id)
                                                    ? 'border-yellow-600 bg-yellow-50'
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
                                                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                                >
                                    Continue to Wing Selection
                                </button>

                                {/* Progress dots */}
                                <div className="flex justify-center gap-2 pt-4">
                                    <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                </div>
                            </form>

                            {/* Footer */}
                            <div className="text-sm text-gray-500 text-center mt-8">
                                © Umbrella Academy 2025
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}