'use client';

import Sidebar from '@/components/dashboard/Sidebar';

import ChatInterface from '@/components/chat/ChatInterface';

export default function WingAdminChatPage() {
    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Chat" userType="wing-admin" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-hidden bg-gray-50/30">
                    <ChatInterface userType="wing-admin" />
                </main>
            </div>
        </div>
    );
}
