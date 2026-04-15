'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import { UserRole } from '@/types';

import ChatInterface from '@/components/chat/ChatInterface';

export default function UmbrellaAdminChatPage() {
    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Chat" userType={UserRole.ADMIN} />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 overflow-hidden bg-gray-50/30">
                    <ChatInterface userType={UserRole.ADMIN} />
                </main>
            </div>
        </div>
    );
}
