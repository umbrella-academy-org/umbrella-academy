'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import { HelpCircle, Search, Mail, MessageCircle, FileText, ChevronRight, ExternalLink } from 'lucide-react';

export default function StudentSupportPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            question: "How do I schedule a sync session?",
            answer: "Go to your Smart Calendar and click '+ Add Activity' or navigate to the Live Session page to see your trainer's available slots."
        },
        {
            question: "What happens if I miss a live session?",
            answer: "Recordings of your live sessions are usually available 24 hours after the meeting in your Dashboard's 'Recent Lessons' section."
        },
        {
            question: "How do I update my roadmap?",
            answer: "Your roadmap can only be modified with your trainer's approval. Click on the Roadmap tab and select 'Request Adjustment'."
        },
        {
            question: "Can I switch my field after starting?",
            answer: "Field changes require administrative review. Please contact support via the email link below to initiate this process."
        }
    ];

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Support" userType="student" />

            <div className="flex-1 flex flex-col ">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-full mx-auto">
                        {/* Hero Section */}
                        <div className="mb-12">
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Support Center</h1>
                            <p className="text-gray-500 mb-8">How can we help you today? Search our knowledge base or contact us.</p>

                            <div className="relative max-w-2xl">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search articles, topics, help..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent shadow-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Support Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600 mb-4 group-hover:bg-gray-600 group-hover:text-white transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                                <p className="text-sm text-gray-500 mb-4 leading-relaxed">Response within 24 hours from our operations team.</p>
                                <a href="mailto:support@umbrellaacademy.rw" className="text-sm font-semibold text-gray-600 flex items-center gap-1 hover:gap-2 transition-all">
                                    Send Email <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600 mb-4 group-hover:bg-gray-600 group-hover:text-white transition-colors">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Community Discord</h3>
                                <p className="text-sm text-gray-500 mb-4 leading-relaxed">Join 1,000+ students and mentors in our community.</p>
                                <button className="text-sm font-semibold text-gray-600 flex items-center gap-1 hover:gap-2 transition-all">
                                    Join Chat <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600 mb-4 group-hover:bg-gray-600 group-hover:text-white transition-colors">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">User Manual</h3>
                                <p className="text-sm text-gray-500 mb-4 leading-relaxed">Deep dive into how everything works at the Academy.</p>
                                <button className="text-sm font-semibold text-gray-600 flex items-center gap-1 hover:gap-2 transition-all">
                                    Browse Docs <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                            <HelpCircle className="w-4 h-4 text-gray-600" />
                                            {faq.question}
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed pl-6">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}