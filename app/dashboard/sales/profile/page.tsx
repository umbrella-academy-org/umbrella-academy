'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import { User, Mail, Calendar, Phone, MapPin, Edit2, ChevronRight, Key, Bell, Activity, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '@/contexts';
import { UserRole } from '@/types';

export default function SalesManagerProfilePage() {
    const { user } = useAuth();

    const name = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Sales Manager';
    const email = user?.email || 'sales@dreamize.rw';
    const phone = user?.phoneNumber || '+250 788 000 000';
    const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'January 2025';

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            <Sidebar activeItem="Profile" userType={UserRole.SALES_MANAGER} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-5 sticky top-0 z-10">
                  <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Sales Management</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[12px] font-medium text-slate-400 italic">User Profile</span>
                      </div>
                      <h1 className="text-2xl font-playfair font-bold text-slate-900">Profile</h1>
                    </div>

                    <div className="flex items-center gap-3">
                       <button className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center gap-2 group">
                          <Edit2 size={16} className="text-primary group-hover:rotate-12 transition-transform" />
                          Edit Profile
                       </button>
                    </div>
                  </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto space-y-8">
                        
                        {/* Profile Hero Card */}
                        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden relative">
                           {/* Stylized Banner */}
                           <div className="h-40 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
                              <div className="absolute bottom-4 right-8 flex items-center gap-2">
                                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                 <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest italic">Active Sales Representative</span>
                              </div>
                           </div>

                           <div className="px-8 pb-8 relative">
                              <div className="flex flex-col md:flex-row items-end -mt-12 gap-6">
                                 <div className="relative group">
                                    <div className="w-32 h-32 rounded-[24px] bg-white p-2 shadow-2xl shadow-slate-900/10 transition-transform duration-500 hover:scale-[1.02]">
                                       <div className="w-full h-full bg-blue-600 rounded-[20px] flex items-center justify-center text-white text-4xl font-black">
                                          {name.split(' ').map(n => n[0]).join('')}
                                       </div>
                                    </div>
                                 </div>

                                 <div className="flex-1 pb-2">
                                    <div className="flex items-center gap-4 mb-2">
                                       <h2 className="text-3xl font-playfair font-black text-slate-900 tracking-tight">{name}</h2>
                                       <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/10">SALES_MANAGER</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold text-[13px] uppercase tracking-wider">
                                       <div className="flex items-center gap-2">
                                          <Mail size={16} className="text-primary" />
                                          {email}
                                       </div>
                                       <div className="flex items-center gap-2">
                                          <Phone size={16} className="text-primary" />
                                          {phone}
                                       </div>
                                       <div className="flex items-center gap-2">
                                          <Calendar size={16} className="text-primary" />
                                          Joined {joinDate}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                           {/* Main Info */}
                           <div className="lg:col-span-2 space-y-8">
                              <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                                 <h3 className="text-xl font-playfair font-bold text-slate-900 mb-6">Contact Information</h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-slate-50 rounded-[20px] border border-transparent hover:border-primary/20 transition-all group">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Email Address</label>
                                       <p className="text-slate-900 font-black text-sm truncate group-hover:text-primary transition-colors">{email}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-[20px] border border-transparent hover:border-primary/20 transition-all group">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                                       <p className="text-slate-900 font-black text-sm group-hover:text-primary transition-colors">{phone}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-[20px] border border-transparent hover:border-primary/20 transition-all group">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Location</label>
                                       <p className="text-slate-900 font-black text-sm group-hover:text-primary transition-colors">Kigali, Rwanda</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-[20px] border border-transparent hover:border-primary/20 transition-all group">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Member Since</label>
                                       <p className="text-slate-900 font-black text-sm group-hover:text-primary transition-colors">{joinDate}</p>
                                    </div>
                                 </div>
                              </div>

                              <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                                 <h3 className="text-xl font-playfair font-bold text-slate-900 mb-6">Account Details</h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-slate-50 rounded-[20px] border border-transparent hover:border-primary/20 transition-all group">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">User ID</label>
                                       <p className="text-slate-900 font-black text-sm truncate group-hover:text-primary transition-colors">{user?._id || 'N/A'}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-[20px] border border-transparent hover:border-primary/20 transition-all group">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Account Status</label>
                                       <p className="text-green-600 font-black text-sm">Active</p>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Sidebar Actions */}
                           <div className="space-y-8">
                              <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
                                 <h3 className="text-lg font-playfair font-bold text-slate-900 mb-6">Quick Actions</h3>
                                 <div className="space-y-3">
                                    <ProfileControl icon={<Key className="w-5 h-5" />} label="Change Password" />
                                    <ProfileControl icon={<Bell className="w-5 h-5" />} label="Notifications" />
                                    <ProfileControl icon={<Activity className="w-5 h-5" />} label="Activity Log" />
                                 </div>
                              </div>

                              <div className="p-8 bg-blue-600 rounded-[32px] text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
                                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-[60px] group-hover:bg-white/20 transition-colors" />
                                 <div className="relative z-10">
                                    <h4 className="text-xl font-playfair font-black mb-3 text-white">Sales Dashboard</h4>
                                    <p className="text-blue-100 text-xs font-medium mb-6 leading-relaxed italic">View your leads and conversion metrics.</p>
                                    <button className="w-full py-3 bg-white/10 hover:bg-white hover:text-blue-600 border border-white/10 rounded-full font-black text-sm transition-all flex items-center justify-center gap-3 group/btn">
                                       Go to Dashboard
                                       <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="py-10 text-center">
                           <p className="text-slate-400 text-[11px] font-bold tracking-[0.4em] uppercase italic">© Dreamize Africa 2025 • Sales Management System</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function ProfileControl({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
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
