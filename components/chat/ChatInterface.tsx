'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Paperclip, MoreVertical, Phone, Video, Search as SearchIcon, Smile, AlertCircle, MessageSquare, User, Circle, Shield, ArrowRight, X } from 'lucide-react';
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
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const contacts = users.filter(u => 
        u._id !== user?._id && 
        (`${u.firstName} ${u.lastName}`).toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            setMessages((prev) =>
                prev.map((m) => (m.id === tempId ? { ...m, failed: true } : m))
            );
            setMessage(text);
        }
    };

    return (
        <div className="flex h-full bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[600px] relative">
            {/* Sidebar - Contact List */}
            <div className="w-full md:w-96 border-r border-slate-100 flex flex-col bg-[#FDFDFF]">
                <div className="p-8 border-b border-slate-50">
                    <div className="flex items-center justify-between mb-6">
                       <h2 className="text-2xl font-black text-slate-900 tracking-tight">Messages</h2>
                       <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                          <MessageSquare size={18} />
                       </div>
                    </div>
                    <div className="relative group">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-[13px] font-medium"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {contactsLoading ? (
                        <div className="p-6 space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-4 animate-pulse">
                                    <div className="w-14 h-14 rounded-[20px] bg-slate-100" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                                        <div className="h-3 bg-slate-50 rounded-lg w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : contacts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center mb-4">
                               <MessageSquare className="w-8 h-8 text-slate-200" />
                            </div>
                            <p className="text-[14px] text-slate-900 font-black uppercase tracking-widest">No Transmissions</p>
                            <p className="text-xs text-slate-400 mt-2 font-medium italic">Initiate a connection to begin</p>
                        </div>
                    ) : (
                        <div className="p-4 space-y-1">
                          {contacts.map((contact) => {
                              const displayName = `${contact.firstName} ${contact.lastName}`;
                              const isActive = activeContact?._id === contact._id;
                              return (
                                  <button
                                      key={contact._id}
                                      onClick={() => handleSelectContact(contact)}
                                      className={`w-full flex items-center gap-4 p-4 rounded-[24px] transition-all relative group ${isActive ? 'bg-slate-900 shadow-xl shadow-slate-900/10' : 'hover:bg-slate-50'}`}
                                  >
                                      <div className="relative">
                                          <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center text-lg font-black transition-transform group-hover:scale-105 ${isActive ? 'bg-primary text-slate-900' : 'bg-slate-100 text-slate-400'}`}>
                                              {contact.firstName[0]}{contact.lastName[0]}
                                          </div>
                                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center p-0.5 shadow-sm">
                                             <Circle className="w-full h-full fill-green-500 text-green-500" />
                                          </div>
                                      </div>
                                      <div className="flex-1 text-left min-w-0">
                                          <div className="flex justify-between items-center mb-0.5">
                                              <h4 className={`font-black text-[14px] truncate transition-colors ${isActive ? 'text-white' : 'text-slate-900'}`}>{displayName}</h4>
                                          </div>
                                          <div className="flex items-center gap-2">
                                             <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${isActive ? 'bg-white/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                                                 {contact.role}
                                             </span>
                                          </div>
                                      </div>
                                      {isActive && (
                                         <div className="absolute right-4 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                      )}
                                  </button>
                              );
                          })}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {activeContact ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-6 bg-white/80 backdrop-blur-md border-b border-slate-50 flex items-center justify-between shadow-sm relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-[18px] bg-slate-900 flex items-center justify-center text-primary font-black text-sm shadow-lg">
                                        {activeContact.firstName[0]}{activeContact.lastName[0]}
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center p-0.5">
                                       <div className="w-full h-full bg-green-500 rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 text-[15px] tracking-tight">
                                        {activeContact.firstName} {activeContact.lastName}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                       <Shield size={10} className="text-primary" />
                                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{activeContact.role} Profile</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button type="button" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-50 rounded-xl">
                                    <Phone className="w-4 h-4" />
                                </button>
                                <button type="button" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-50 rounded-xl">
                                    <Video className="w-4 h-4" />
                                </button>
                                <div className="w-px h-6 bg-slate-100 mx-1" />
                                <button type="button" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-50 rounded-xl">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/30">
                            {messagesLoading ? (
                                <div className="space-y-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'} animate-pulse`}>
                                            <div className="h-12 bg-white rounded-[24px] w-64 shadow-sm" />
                                        </div>
                                    ))}
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                       <Smile size={32} className="text-slate-300" />
                                    </div>
                                    <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Secure Channel Established</p>
                                    <p className="text-xs text-slate-300 mt-2 italic">Waiting for initial transmission...</p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                        <div className={`max-w-[75%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                            <div className={`px-6 py-4 rounded-[28px] text-[14px] font-medium leading-relaxed shadow-sm transition-all hover:shadow-md ${msg.isMe
                                                ? msg.failed
                                                    ? 'bg-red-50 text-red-900 border border-red-100 rounded-tr-none'
                                                    : 'bg-slate-900 text-white rounded-tr-none'
                                                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                                {msg.failed && (
                                                    <AlertCircle className="w-4 h-4 text-red-500 inline ml-2 align-middle" />
                                                )}
                                            </div>
                                            <div className={`flex items-center gap-2 mt-2 px-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                                               <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                                                  {msg.failed ? 'Failed to Sync' : msg.timestamp}
                                               </span>
                                               {!msg.failed && msg.isMe && <div className="w-1 h-1 bg-primary rounded-full" />}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-8 bg-white border-t border-slate-50 relative z-10">
                            <form onSubmit={handleSend} className="flex items-center gap-4 bg-slate-50 p-2 rounded-[32px] border border-slate-100/50 focus-within:border-primary/20 focus-within:bg-white transition-all shadow-sm">
                                <button type="button" className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:bg-white rounded-full">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Secure message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-2 py-3 bg-transparent outline-none text-[14px] font-medium placeholder:text-slate-300"
                                    />
                                </div>
                                <button type="button" className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-primary transition-all">
                                    <Smile className="w-5 h-5" />
                                </button>
                                <button
                                    type="submit"
                                    disabled={!message.trim()}
                                    className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed group"
                                >
                                    <Send className="w-5 h-5 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-slate-50/10 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.03)_0%,transparent_70%)]" />
                        <div className="relative z-10">
                           <div className="w-24 h-24 bg-white border border-slate-100 rounded-[40px] shadow-xl shadow-slate-200/50 flex items-center justify-center mb-8 mx-auto">
                              <MessageSquare className="w-10 h-10 text-primary" />
                           </div>
                           <h3 className="text-3xl font-black text-slate-900 mb-3">Communication Hub</h3>
                           <p className="text-slate-400 text-sm font-medium max-w-sm mx-auto leading-relaxed italic">
                              Select a secure frequency from the personnel directory to initiate an encrypted data transmission.
                           </p>
                           <div className="mt-8 flex items-center justify-center gap-6">
                              <div className="flex flex-col items-center gap-1">
                                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                 <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Socket: Connected</span>
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                 <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_rgba(255,184,0,0.5)]" />
                                 <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Encryption: AES-256</span>
                              </div>
                           </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
