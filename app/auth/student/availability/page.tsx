'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Calendar, CheckCircle } from 'lucide-react';

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
        router.push('/auth/student/choose-wing');
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Left side - Form */}
            <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
                <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
                    {/* Go back button */}
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-xs font-black uppercase tracking-widest">Go back</span>
                    </button>

                    <div className="flex flex-col items-center justify-center flex-1">
                        {/* Logo */}
                        <div className="mb-8">
                            <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-600/20">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 text-center uppercase">
                            Your Availability
                        </h1>
                        <p className="text-sm font-bold text-gray-400 mb-10 text-center uppercase tracking-widest">
                            How many hours can you dedicate to learning?
                        </p>

                        {/* Form */}
                        <form onSubmit={handleContinue} className="w-full space-y-8">
                            {/* Hours per Day */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                                    Daily Commitment (Hours)
                                </label>
                                <div className="grid grid-cols-5 gap-3">
                                    {['1', '2', '4', '6', '8+'].map((h) => (
                                        <button
                                            key={h}
                                            type="button"
                                            onClick={() => setHoursPerDay(h)}
                                            className={`py-4 rounded-xl text-sm font-black transition-all border-2 ${hoursPerDay === h
                                                    ? 'border-yellow-600 bg-yellow-50 text-yellow-600 shadow-md scale-105'
                                                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
                                                }`}
                                        >
                                            {h}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                                    Preferred Time Windows
                                </label>
                                <div className="space-y-3">
                                    {availableSlots.map((slot) => (
                                        <button
                                            key={slot.id}
                                            type="button"
                                            onClick={() => toggleSlot(slot.id)}
                                            className={`w-full flex items-center gap-4 p-4 border-2 rounded-2xl transition-all ${timeSlots.includes(slot.id)
                                                    ? 'border-yellow-600 bg-yellow-50 shadow-sm'
                                                    : 'border-gray-100 bg-white hover:border-gray-200'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${timeSlots.includes(slot.id) ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className={`text-sm font-black uppercase tracking-tight ${timeSlots.includes(slot.id) ? 'text-gray-900' : 'text-gray-500'
                                                    }`}>
                                                    {slot.label}
                                                </p>
                                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{slot.time}</p>
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
                                className="w-full bg-yellow-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20 active:scale-95"
                            >
                                Continue
                            </button>

                            {/* Progress dots */}
                            <div className="flex justify-center gap-2 pt-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className={`h-1.5 rounded-full transition-all ${i === 4 ? 'w-8 bg-yellow-600' : 'w-2 bg-gray-200'}`}></div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center mt-8">
                    © Dreamize 2025
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block flex-[1] relative overflow-hidden">
                <Image
                    src="/auth/login/image.png"
                    alt="Abstract design"
                    fill
                    className="object-cover object-center scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-yellow-600/10 mix-blend-multiply"></div>
            </div>
        </div>
    );
}
