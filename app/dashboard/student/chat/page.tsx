'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import Sidebar from '@/components/dashboard/Sidebar';
import ChatInterface from '@/components/chat/ChatInterface';

function ChatPageContent() {
    const searchParams = useSearchParams();
    const roadmap = searchParams.get('roadmap');

    return (
        <>
            {roadmap && (
                <div className="fixed right-0 w-fit z-50 p-4 bg-transparent">
                    <Link href="/post-signup/roadmap">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-2xl hover:bg-yellow-700">
                            Return to Roadmap Creation
                        </button>
                    </Link>
                </div>
            )}
            <ChatInterface userType="student" />
        </>
    );
}

export default function StudentChatPage() {
    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Chat" userType="student" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 overflow-hidden bg-gray-50/30 relative">
                    <Suspense fallback={<ChatInterface userType="student" />}>
                        <ChatPageContent />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}
