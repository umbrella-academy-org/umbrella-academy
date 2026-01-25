'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import ChatInterface from '@/components/chat/ChatInterface';

export default function MentorChatPage() {
    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Chat" userType="mentor" />

            <div className="flex-1 flex flex-col min-w-0">
                <Header breadcrumb="Chat" userType="mentor" />

                <main className="flex-1 p-4 lg:p-8 overflow-hidden bg-gray-50/30">
                    <ChatInterface userType="mentor" />
                </main>
            </div>
        </div>
    );
}
