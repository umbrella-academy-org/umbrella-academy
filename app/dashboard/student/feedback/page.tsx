'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import { MessageSquare, Star, Send, CheckCircle2 } from 'lucide-react';

export default function StudentFeedbackPage() {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [category, setCategory] = useState('Learning Experience');
    const [submitted, setSubmitted] = useState(false);

    const categories = [
        'Learning Experience',
        'Platform Interface',
        'Trainer Performance',
        'Course Content',
        'Technical Support',
        'Other'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => {
            setSubmitted(true);
        }, 500);
    };

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Feedback" userType="student" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Feedback</h1>
                            <p className="text-gray-500">Your thoughts help us improve. Share your experience with us.</p>
                        </div>

                        {submitted ? (
                            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center animate-fade-in shadow-sm">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Thank you for your feedback!</h2>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                    We've received your message and will use it to make Umbrella Academy even better.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all font-medium"
                                >
                                    Send another feedback
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Category Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-4">What is this feedback about?</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {categories.map((c) => (
                                                <button
                                                    key={c}
                                                    type="button"
                                                    onClick={() => setCategory(c)}
                                                    className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${category === c
                                                        ? 'border-yellow-600 bg-yellow-50 text-yellow-600 shadow-sm'
                                                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Star Rating */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Overall Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className="transition-transform active:scale-90"
                                                >
                                                    <Star
                                                        className={`w-8 h-8 ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-200'
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Feedback Textarea */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Feedback</label>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Tell us what's on your mind..."
                                            className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 h-40 resize-none transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 px-8 py-3.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all font-semibold shadow-md active:scale-95"
                                        >
                                            <Send className="w-4 h-4" />
                                            Submit Feedback
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Previous Feedback Summary (Optional/Mock) */}
                        {!submitted && (
                            <div className="mt-8 p-6 bg-yellow-50/50 rounded-xl border border-yellow-100 flex items-start gap-4">
                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 text-yellow-600">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-yellow-800">Why your feedback matters?</h4>
                                    <p className="text-sm text-yellow-700/80 mt-1 leading-relaxed">
                                        We read every single piece of feedback. It's the primary way we prioritize new features and improvements to ensure your learning experience is world-class.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
