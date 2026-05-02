'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth, useUsers, useFinancial } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { Users, DollarSign, UserCheck, Tag, BarChart3, ArrowRight, Settings, ShieldCheck, Activity, Globe, Zap, Clock } from 'lucide-react';
import { UserRole } from '@/types/user';

export default function UmbrellaAdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { students, trainers, isLoading: usersLoading } = useUsers();
  const { getTotalBalance, isLoading: financialLoading } = useFinancial();
  const { navigate } = useNavigationWithLoading();

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'admin') {
      const dashboardRoutes: Record<string, string> = {
        'student': '/dashboard/student',
        'trainer': '/dashboard/trainer',
      };
      navigate(dashboardRoutes[user.role] || '/');
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  const isLoading = authLoading || usersLoading || financialLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#F8FAFC]">
        <Sidebar activeItem="Dashboard" userType={UserRole.ADMIN} />
        <div className="flex-1 flex flex-col">
          <div className="h-20 bg-white border-b border-slate-100 animate-pulse"></div>
          <div className="flex-1 p-8 space-y-8">
            <div className="h-12 w-64 bg-slate-100 rounded-xl animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-50 rounded-[32px] animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const totalRevenue = getTotalBalance();
  const totalStudents = students?.length || 0;
  const totalTrainers = trainers?.length || 0;
  const pendingTrainers = trainers?.filter(t => t.approvalStatus === 'pending').length || 0;

  const stats = [
    { label: 'Active Students', value: totalStudents, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Elite Trainers', value: totalTrainers, icon: UserCheck, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Pending Apps', value: pendingTrainers, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Net Revenue', value: `${(totalRevenue / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-primary', bg: 'bg-primary/5' },
  ];

  const managementGrid = [
    { title: 'User Management', desc: 'Control permissions & roles', icon: Users, href: '/dashboard/admin/users', color: 'bg-blue-600' },
    { title: 'Financial Records', desc: 'Track all transactions', icon: DollarSign, href: '/dashboard/admin/payments', color: 'bg-green-600' },
    { title: 'Promo Engine', desc: 'Manage discount campaigns', icon: Tag, href: '/dashboard/admin/promo-codes', color: 'bg-purple-600' },
    { title: 'Trainer Review', desc: 'Verify onboarding apps', icon: ShieldCheck, href: '/dashboard/admin/trainer-approvals', color: 'bg-orange-500' },
    { title: 'Analytics Center', desc: 'System-wide performance', icon: BarChart3, href: '/dashboard/admin/reports', color: 'bg-indigo-600' },
    { title: 'System Config', desc: 'Environment variables & settings', icon: Settings, href: '/dashboard/admin/system', color: 'bg-slate-900' },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar activeItem="Dashboard" userType={UserRole.ADMIN} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-5 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Admin Level 10
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                Command Center
              </h1>
            </div>

            <div className="flex items-center gap-4">
               <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-2xl">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-bold text-slate-600">SYSTEM: OPTIMAL</span>
               </div>
               <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-primary">
                  <Globe size={20} className="animate-spin-slow" />
               </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Real-time Revenue Card */}
            <div className="mb-10 bg-slate-900 rounded-[40px] p-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110" />
               
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                     <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-3">Revenue Performance</p>
                     <h2 className="text-5xl font-black text-white mb-4">
                        {totalRevenue.toLocaleString()} <span className="text-2xl font-light text-slate-500">RWF</span>
                     </h2>
                     <p className="text-slate-400 font-light max-w-md leading-relaxed">
                        Aggregate revenue generated through orientation fees and monthly subscriptions across all student tiers.
                     </p>
                  </div>
                  <div className="lg:col-span-5 flex flex-col gap-3">
                     <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                        Detailed Financial Audit
                        <ArrowRight size={18} />
                     </button>
                     <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-all">
                        Payout Management
                     </button>
                  </div>
               </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                   <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                   </div>
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Admin Management Grid */}
            <div className="mb-12">
               <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                 System Management
                 <div className="h-px bg-slate-100 flex-1 ml-4" />
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {managementGrid.map((action) => (
                   <button
                     key={action.title}
                     onClick={() => navigate(action.href)}
                     className="bg-white border border-slate-100 p-8 rounded-[40px] text-left hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
                   >
                     <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 ${action.color} rounded-[20px] flex items-center justify-center shadow-lg shadow-black/5`}>
                           <action.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <ArrowRight size={20} className="text-slate-900" />
                        </div>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2">{action.title}</h3>
                     <p className="text-sm text-slate-500 font-light leading-relaxed">{action.desc}</p>
                   </button>
                 ))}
               </div>
            </div>

            {/* Infrastructure Widget */}
            <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-primary border border-slate-100">
                     <Zap size={32} />
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-slate-900">Infrastructure Health</h4>
                     <p className="text-slate-500 text-sm font-light italic">All services are operating at maximum efficiency. 99.9% uptime maintained.</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Instances</p>
                     <p className="text-lg font-black text-slate-900">14 Nodes</p>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Latency</p>
                     <p className="text-lg font-black text-slate-900 text-green-500">24ms</p>
                  </div>
               </div>
            </div>

            <div className="mt-16 text-center">
               <p className="text-slate-400 text-[12px] font-bold tracking-[0.4em] uppercase italic">Umbrella Academy Administrative OS v4.0.0-gold</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
