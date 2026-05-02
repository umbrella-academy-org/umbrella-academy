'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, Award, Zap, Briefcase, Activity, Server, Database, Lock, ChevronRight, Fingerprint, Key, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts';
import { UserRole } from '@/types';

export default function UmbrellaAdminProfilePage() {
    const { user } = useAuth();

    const name = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Super Admin';
    const email = user?.email || 'admin@dreamize.rw';
    const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'January 2025';

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            <Sidebar activeItem="Profile" userType={UserRole.ADMIN} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-5 sticky top-0 z-10">
                  <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Identity Management</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[12px] font-medium text-slate-400 italic">User Profile</span>
                      </div>
                      <h1 className="text-2xl font-bold text-slate-900">Personnel Dossier</h1>
                    </div>

                    <div className="flex items-center gap-3">
                       <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-[13px] hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center gap-2 group">
                          <Edit2 size={16} className="text-primary group-hover:rotate-12 transition-transform" />
                          Update Credentials
                       </button>
                    </div>
                  </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto space-y-8">
                        
                        {/* Profile Hero Card */}
                        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden relative">
                           {/* Stylized Banner */}
                           <div className="h-48 bg-slate-900 relative overflow-hidden">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,184,0,0.15),transparent)]" />
                              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                 <div className="absolute top-10 left-10 w-32 h-32 bg-primary blur-3xl rounded-full" />
                                 <div className="absolute bottom-10 right-20 w-64 h-64 bg-primary blur-[100px] rounded-full" />
                              </div>
                              <div className="absolute bottom-4 right-8 flex items-center gap-2">
                                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Encrypted Connection Active</span>
                              </div>
                           </div>

                           <div className="px-12 pb-12 relative">
                              <div className="flex flex-col md:flex-row items-end -mt-16 gap-8">
                                 <div className="relative group">
                                    <div className="w-40 h-40 rounded-[32px] bg-white p-2 shadow-2xl shadow-slate-900/10 transition-transform duration-500 hover:scale-[1.02]">
                                       <div className="w-full h-full bg-slate-900 rounded-[24px] flex items-center justify-center text-primary text-5xl font-black">
                                          {name.split(' ').map(n => n[0]).join('')}
                                       </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary border-4 border-white rounded-2xl flex items-center justify-center shadow-xl rotate-3">
                                       <ShieldCheck className="w-6 h-6 text-slate-900" />
                                    </div>
                                 </div>

                                 <div className="flex-1 pb-2">
                                    <div className="flex items-center gap-4 mb-2">
                                       <h2 className="text-4xl font-black text-slate-900 tracking-tight">{name}</h2>
                                       <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-900/10">ROOT_ADMIN</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold text-[13px] uppercase tracking-wider">
                                       <div className="flex items-center gap-2">
                                          <Mail size={16} className="text-primary" />
                                          {email}
                                       </div>
                                       <div className="flex items-center gap-2">
                                          <Calendar size={16} className="text-primary" />
                                          Joined {joinDate}
                                       </div>
                                       <div className="flex items-center gap-2">
                                          <Globe size={16} className="text-primary" />
                                          Kigali, RW
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                           {/* Access Tiers */}
                           <div className="lg:col-span-2 space-y-8">
                              <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
                                 <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Security Clearance</h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-slate-900 rounded-[32px] text-white shadow-xl shadow-slate-900/10 relative overflow-hidden group/card">
                                       <div className="relative z-10">
                                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Current Authorization</p>
                                          <h4 className="text-3xl font-black mb-2 text-white group-hover/card:text-primary transition-colors">Level 10 Master</h4>
                                          <p className="text-xs text-slate-400 font-medium italic flex items-center gap-2">
                                             <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(255,184,0,0.8)]" />
                                             Full System Decryption Enabled
                                          </p>
                                       </div>
                                       <Fingerprint className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 group-hover/card:text-primary/5 transition-colors" />
                                    </div>

                                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative group/status overflow-hidden">
                                       <div className="relative z-10">
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Identity Integrity</p>
                                          <h4 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Verified</h4>
                                          <p className="text-xs text-slate-500 font-medium italic">Biometric profile fully synchronized</p>
                                       </div>
                                       <ShieldCheck className="absolute bottom-4 right-4 w-12 h-12 text-slate-200/50 transform group-hover/status:scale-110 group-hover/status:text-primary/20 transition-all duration-700" />
                                    </div>
                                 </div>
                              </div>

                              <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                                 <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Access Log & Metadata</h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-[24px] border border-transparent hover:border-primary/20 transition-all group">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Primary Identity Hash</label>
                                       <p className="text-slate-900 font-black text-sm truncate group-hover:text-primary transition-colors">{user?._id || 'sha256_root_umbrella_master'}</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-[24px] border border-transparent hover:border-primary/20 transition-all group">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">System Uptime Contribution</label>
                                       <p className="text-slate-900 font-black text-sm group-hover:text-primary transition-colors">1,248 Productive Hours</p>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Sidebar Actions */}
                           <div className="space-y-8">
                              <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
                                 <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-tight">Control Panel</h3>
                                 <div className="space-y-3">
                                    <ProfileControl icon={<Key className="w-5 h-5" />} label="Security Keys" />
                                    <ProfileControl icon={<Bell className="w-5 h-5" />} label="System Alerts" />
                                    <ProfileControl icon={<Activity className="w-5 h-5" />} label="Activity Audit" />
                                 </div>
                              </div>

                              <div className="p-10 bg-slate-900 rounded-[40px] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-[60px] group-hover:bg-primary/20 transition-colors" />
                                 <div className="relative z-10">
                                    <h4 className="text-xl font-black mb-3 text-white">System Protocol Hub</h4>
                                    <p className="text-slate-400 text-xs font-medium mb-8 leading-relaxed italic">Access high-security overrides and administrative command line tools.</p>
                                    <button className="w-full py-4 bg-white/10 hover:bg-primary hover:text-slate-900 border border-white/10 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-3 group/btn">
                                       Launch Console
                                       <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="py-10 text-center">
                           <p className="text-slate-400 text-[11px] font-bold tracking-[0.4em] uppercase italic">© Dreamize Africa 2025 • Admin Personnel Protocol</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function ProfileControl({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-slate-900 transition-all">
                    {icon}
                </div>
                <span className="text-[13px] font-black text-slate-600 uppercase tracking-tight group-hover:text-slate-900">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
        </button>
    );
}
