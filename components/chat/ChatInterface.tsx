'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Paperclip, MoreVertical, Phone, Video, Search as SearchIcon, Smile, AlertCircle, MessageSquare } from 'lucide-react';
import { messageService, socketService } from '@/services';
import type { ChatMessage } from '@/services/messages';
import { useAuth } from '@/contexts/AuthContext';
import { useUsers } from '@/contexts/UserContext';
import type { BaseUser } from '@/types';

interface DisplayMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    isMe: boolean;
    failed?: boolean;
}

function formatTime(iso: string): string {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatInterface({ userType }: { userType: string }) {
    const { user } = useAuth();
    const { users, isLoading: contactsLoading } = useUsers();
    const [activeContact, setActiveContact] = useState<BaseUser | null>(null);
    const [messages, setMessages] = useState<DisplayMessage[]>([]);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Filter contacts from users (exclude current user)
    const contacts = users.filter(u => u._id !== user?._id);

    // Connect socket and listen for incoming messages
    useEffect(() => {
        socketService.connect();

        const handleIncoming = (data: { message: Record<string, unknown> }) => {
            const msg = data.message as unknown as ChatMessage;
            setActiveContact((current) => {
                if (!current) return current;
                const isFromActiveContact =
                    msg.senderId === current._id ||
                    msg.recipientId === current._id;
                if (isFromActiveContact) {
                   console.log(messages.some(m => m.id === msg._id), 'Duplicate message?');
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: msg._id,
                            senderId: msg.senderId,
                            text: msg.text,
                            timestamp: formatTime(msg.createdAt),
                            isMe: msg.senderId === user?._id,
                        },
                    ]);
                }
                return current;
            });
        };

        socketService.onMessage(handleIncoming);
        return () => {
            socketService.removeMessageListener(handleIncoming);
        };
    }, [user?._id]);

    // Fetch messages when a contact is selected
    const handleSelectContact = useCallback(async (contact: BaseUser) => {
        setActiveContact(contact);
        setMessagesLoading(true);
        try {
            const res = await messageService.getMessages(contact._id);
            if (res.success && res.data) {
                setMessages(
                    res.data.map((m) => ({
                        id: m._id,
                        senderId: m.senderId,
                        text: m.text,
                        timestamp: formatTime(m.createdAt),
                        isMe: m.senderId === user?._id,
                    }))
                );
            }
        } catch {
            setMessages([]);
        } finally {
            setMessagesLoading(false);
        }
    }, [user?._id]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !activeContact) return;

        const text = message.trim();
        const tempId = `temp-${Date.now()}`;

        // Optimistic append
        const optimistic: DisplayMessage = {
            id: tempId,
            senderId: user?._id ?? 'me',
            text,
            timestamp: formatTime(new Date().toISOString()),
            isMe: true,
        };
        setMessages((prev) => [...prev, optimistic]);
        setMessage('');

        try {
            socketService.sendMessage(activeContact._id, text);
        } catch {
            // Mark as failed, restore text
            setMessages((prev) =>
                prev.map((m) => (m.id === tempId ? { ...m, failed: true } : m))
            );
            setMessage(text);
        }
    };

    return (
        <div className="flex h-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
            {/* Sidebar - Contact List */}
            <div className="w-full md:w-80 border-r border-gray-100 flex flex-col">
                <div className="p-6 border-b border-gray-50">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-yellow-600 outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {contactsLoading ? (
                        <div className="p-4 space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 animate-pulse">
                                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                                        <div className="h-2 bg-gray-200 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : contacts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                            <MessageSquare className="w-10 h-10 text-gray-300 mb-3" />
                            <p className="text-sm text-gray-500 font-medium">No contacts yet</p>
                            <p className="text-xs text-gray-400 mt-1">Your conversations will appear here</p>
                        </div>
                    ) : (
                        contacts.map((contact) => {
                            const displayName = `${contact.firstName} ${contact.lastName}`;
                            return (
                                <button
                                    key={contact._id}
                                    onClick={() => handleSelectContact(contact)}
                                    className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-all border-l-4 ${activeContact?._id === contact._id ? 'bg-gray-50 border-yellow-600' : 'border-transparent'}`}
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shadow-sm">
                                            <span className="text-yellow-700 font-bold text-sm">
                                                {contact.firstName[0]}{contact.lastName[0]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <h4 className="font-semibold text-gray-900 text-sm truncate">{displayName}</h4>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate capitalize">
                                            {contact.role}
                                        </p>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50/10">
                {activeContact ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                        <span className="text-yellow-700 font-bold text-xs">
                                            {activeContact.firstName[0]}{activeContact.lastName[0]}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">
                                        {activeContact.firstName} {activeContact.lastName}
                                    </h3>
                                    <p className="text-[10px] text-gray-500 font-medium capitalize">{activeContact.role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button type="button" className="p-2 text-gray-400 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg">
                                    <Phone className="w-5 h-5" />
                                </button>
                                <button type="button" className="p-2 text-gray-400 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg">
                                    <Video className="w-5 h-5" />
                                </button>
                                <button type="button" className="p-2 text-gray-400 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messagesLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'} animate-pulse`}>
                                            <div className="h-10 bg-gray-200 rounded-2xl w-48" />
                                        </div>
                                    ))}
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <p className="text-sm text-gray-400">No messages yet. Say hello!</p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                        <div className={`max-w-[70%] group ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                            <div className={`px-4 py-3 rounded-2xl text-sm shadow-sm flex items-center gap-2 ${msg.isMe
                                                ? msg.failed
                                                    ? 'bg-red-100 text-red-800 border border-red-200 rounded-tr-none'
                                                    : 'bg-yellow-600 text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                                {msg.failed && (
                                                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" aria-label="Failed to send" />
                                                )}
                                            </div>
                                            <p className={`text-[10px] text-gray-400 font-medium mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                                                {msg.failed ? 'Failed to send' : msg.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-white border-t border-gray-100 relative z-10">
                            <form onSubmit={handleSend} className="flex items-center gap-3">
                                <button type="button" className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-yellow-600 outline-none transition-all text-sm pr-10"
                                    />
                                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!message.trim()}
                                    className="w-11 h-11 bg-yellow-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-gray-600/20 hover:bg-yellow-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/10">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-600">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Select a conversation</h3>
                        <p className="text-sm text-gray-500 max-w-xs">Send messages to your trainers, students or mentors. Start by selecting a contact from the list on the left.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
