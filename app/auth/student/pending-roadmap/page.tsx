'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Clock, FileCheck } from 'lucide-react';

export default function StudentRoadmapPendingPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen">
            {/* Left side - Content */}
            <div className="flex flex-[2] flex-col justify-between p-8 bg-white">
                <div className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto w-full text-center">
                    {/* Logo */}
                    <div className="mb-8">
                        <div className="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                            </svg>
                        </div>
                    </div>

                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <FileCheck className="w-10 h-10 text-gray-600" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                        Roadmap Awaiting Approval
                    </h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Great job creating your learning roadmap! Our experts are now reviewing it to ensure it provides the most effective path for your goals.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 w-full mb-8 text-left border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2  ">Next Steps</h3>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 flex-shrink-0"></div>
                                <span>A trainer will review your proposed learning phases.</span>
                            </li>
                            <li className="flex gap-3 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 flex-shrink-0"></div>
                                <span>You will be notified once it's approved or if adjustments are suggested.</span>
                            </li>
                            <li className="flex gap-3 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 flex-shrink-0"></div>
                                <span>Once approved, your dashboard will be fully activated.</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={() => router.push('/dashboard/student')}
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                    >
                        Go to Dashboard
                    </button>
                </div>

                {/* Footer */}
                <div className="text-sm text-gray-500 text-center">
                    © Dreamize 2025
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block flex-[1] relative overflow-hidden">
                <Image
                    src="/auth/login/image.png"
                    alt="Roadmap approval background"
                    fill
                    className="object-cover object-center scale-105"
                    priority
                    quality={100}
                />
            </div>
        </div>
    );
}
