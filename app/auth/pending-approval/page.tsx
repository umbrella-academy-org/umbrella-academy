'use client';

import { useRouter, } from 'next/navigation';
import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';
import { Clock, Mail, MessageSquare, LogOut, ArrowLeft, Hourglass } from 'lucide-react';
import { useAuth } from '@/contexts';

export default function PendingApprovalContent() {
    const router = useRouter();
    const { logout, user } = useAuth();


    const email = user?.email ? user.email : 'your email address';

    const handleLogout = async () => {
        await logout();
        router.push('/auth/login');
    };

    const handleBackToLogin = () => {
        router.push('/auth/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left side - Content */}
            <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-auto h-screen">
                <div className="flex flex-col flex-1 max-w-md mx-auto w-full justify-center">
                    {/* Logo */}
                    <div className="mb-8 text-center">
                        <Logo size="lg" />
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Hourglass className="w-12 h-12 text-yellow-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
                        Application Under Review
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-center mb-8">
                        Your trainer application is currently being reviewed by our team.
                    </p>

                    {/* Status Card */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                            <span className="font-medium text-yellow-800">Pending Approval</span>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 mt-0.5 text-gray-500" />
                                <span>Review typically takes <strong>1-3 business days</strong></span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Mail className="w-4 h-4 mt-0.5 text-gray-500" />
                                <span>You&apos;ll receive an email at <strong>{email}</strong> once approved</span>
                            </div>
                        </div>
                    </div>

                    {/* What to Expect */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">1</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Document Review</p>
                                    <p className="text-sm text-gray-600">Our team verifies your credentials and experience</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-gray-600 text-xs font-bold">2</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Background Check</p>
                                    <p className="text-sm text-gray-600">We conduct a quick background verification</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-gray-600 text-xs font-bold">3</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Approval & Onboarding</p>
                                    <p className="text-sm text-gray-600">Once approved, you&apos;ll get access to all trainer features</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Support */}
                    <div className="text-center mb-8">
                        <p className="text-sm text-gray-600 mb-3">
                            Have questions about your application?
                        </p>
                        <button className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium">
                            <MessageSquare className="w-4 h-4" />
                            Contact Support
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleBackToLogin}
                            className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-sm text-gray-500 text-center">
                    © Dreamize 2025
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block flex-1 relative overflow-hidden">
                <Image
                    src="/real/image.jpeg"
                    alt="Dreamize Africa"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-lg font-medium">Join our community of expert trainers</p>
                    <p className="text-white/80">Empowering the next generation of African tech talent</p>
                </div>
            </div>
        </div>
    );
}
