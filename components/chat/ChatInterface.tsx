'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Search as SearchIcon, Smile, User } from 'lucide-react';

interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    isMe: boolean;
}

interface ChatContact {
    id: string;
    name: string;
    role: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unreadCount?: number;
    online?: boolean;
}

export default function ChatInterface({ userType }: { userType: string }) {
    const [activeChat, setActiveChat] = useState<ChatContact | null>(null);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const contacts: ChatContact[] = [
        {
            id: '1',
            name: 'Demi Wilkinson',
            role: 'Trainer',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
            lastMessage: 'The new roadmap looks great! Let\'s discuss...',
            time: '12:45 PM',
            unreadCount: 2,
            online: true
        },
        {
            id: '2',
            name: 'Sarah Ingabire',
            role: 'Student',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
            lastMessage: 'Is the session still on for 4 PM?',
            time: '11:20 AM',
            online: true
        },
        {
            id: '3',
            name: 'Dr. Alex Rodriguez',
            role: 'Mentor',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
            lastMessage: 'I have approved your trainer application.',
            time: 'Yesterday',
        },
        {
            id: '4',
            name: 'Gabin Tuyishime',
            role: 'Student',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
            lastMessage: 'Thanks for the feedback on my project.',
            time: 'Monday',
        }
    ];

    const mockMessages: Message[] = [
        { id: '1', senderId: '2', text: 'Hey, are we still meeting today?', timestamp: '11:20 AM', isMe: false },
        { id: '2', senderId: 'me', text: 'Yes, definitely! Does 4 PM work for you?', timestamp: '11:22 AM', isMe: true },
        { id: '3', senderId: '2', text: 'Perfect. I have prepared the questions we talked about.', timestamp: '11:25 AM', isMe: false },
        { id: '4', senderId: 'me', text: 'Excellent. See you then!', timestamp: '11:30 AM', isMe: true },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeChat]);

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
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-yellow-600 outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {contacts.map((contact) => (
                        <button
                            key={contact.id}
                            onClick={() => setActiveChat(contact)}
                            className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-all border-l-4 ${activeChat?.id === contact.id ? 'bg-yellow-50 border-yellow-600' : 'border-transparent'
                                }`}
                        >
                            <div className="relative">
                                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                {contact.online && (
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h4 className="font-semibold text-gray-900 text-sm truncate">{contact.name}</h4>
                                    <span className="text-[10px] text-gray-400 font-medium">{contact.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                                    {contact.unreadCount && (
                                        <span className="bg-yellow-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                                            {contact.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50/10">
                {activeChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                                    {activeChat.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">{activeChat.name}</h3>
                                    <p className="text-[10px] text-gray-500 font-medium uppercase  ">{activeChat.role} • {activeChat.online ? 'Online' : 'Away'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg">
                                    <Phone className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg">
                                    <Video className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {mockMessages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                    <div className={`max-w-[70%] group ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-3 rounded-2xl text-sm shadow-sm ${msg.isMe
                                            ? 'bg-yellow-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <p className={`text-[10px] text-gray-400 font-medium mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-white border-t border-gray-100 relative z-10">
                            <form
                                onSubmit={(e) => { e.preventDefault(); setMessage(''); }}
                                className="flex items-center gap-3"
                            >
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
                                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-600 transition-all">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    className="w-11 h-11 bg-yellow-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-yellow-600/20 hover:bg-yellow-700 transition-all active:scale-95"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/10">
                        <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6 text-yellow-600">
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
