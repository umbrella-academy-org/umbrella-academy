'use client';

import { useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth, useRoadmaps, useUsers, useFinancial } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { 
  Users, 
  Map, 
  Folder, 
  CalendarCheck, 
  MessageSquare, 
  Wallet,
  ArrowRight,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { UserRole } from '@/types';

export default function TrainerDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { studentRoadmaps, isLoading: roadmapsLoading } = useRoadmaps();
  const { students, isLoading: usersLoading } = useUsers();
  const { userWallet, isLoading: financialLoading } = useFinancial();
  const { navigate } = useNavigationWithLoading();

  // Redirect if not authenticated or not a trainer
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'trainer') {
      const dashboardRoutes: Record<string, string> = {
        'student': '/dashboard/student',
        'admin': '/dashboard/admin',
      };
      navigate(dashboardRoutes[user.role] || '/');
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  const isLoading = authLoading || roadmapsLoading || usersLoading || financialLoading;

  // Show loading while checking auth or loading data
  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#F8FAFC]">
        <Sidebar activeItem="Home" userType={UserRole.TRAINER} />
        <div className="flex-1 flex flex-col">
          <div className="h-20 bg-white border-b border-slate-100 animate-pulse"></div>
          <div className="flex-1 p-8 space-y-8">
            <div className="h-10 w-64 bg-slate-100 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-50 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if user is not authenticated or not a trainer
  if (!user || user.role !== 'trainer') {
    return null;
  }

  // Get trainer-specific data
  const trainerStudents = students.filter(student =>
    studentRoadmaps.some(r => r.trainerId._id === user._id && r.studentId._id === student._id)
  );

  const trainerRoadmaps = studentRoadmaps.filter(r => r.trainerId._id === user._id);
  const activeRoadmaps = trainerRoadmaps.filter(r => r.status === 'active');
  const pendingProjects = trainerRoadmaps.reduce((count, roadmap) => {
    return count + (roadmap.milestones?.filter(m => 
      m.status === 'pending-approval'
    ).length || 0);
  }, 0);

  const stats = [
    { 
      label: 'Total Students', 
      value: trainerStudents.length, 
      icon: Users, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10' 
    },
    { 
      label: 'Active Roadmaps', 
      value: activeRoadmaps.length, 
      icon: Map, 
      color: 'text-primary', 
      bg: 'bg-primary/10' 
    },
    { 
      label: 'Pending Tasks', 
      value: pendingProjects, 
      icon: Zap, 
      color: 'text-orange-500', 
      bg: 'bg-orange-500/10' 
    },
    { 
      label: 'Wallet Balance', 
      value: `${userWallet?.balance?.toLocaleString() || 0} RWF`, 
      icon: Wallet, 
      color: 'text-green-500', 
      bg: 'bg-green-500/10' 
    },
  ];

  const quickActions = [
    {
      icon: Map,
      title: 'Roadmaps',
      description: 'Manage student paths',
      href: '/dashboard/trainer/roadmaps',
      gradient: 'from-primary to-primary/80',
    },
    {
      icon: Award,
      title: 'Projects',
      description: 'Review submissions',
      href: '/dashboard/trainer/projects',
      gradient: 'from-orange-500 to-orange-400',
    },
    {
      icon: Users,
      title: 'Students',
      description: 'View mentee list',
      href: '/dashboard/trainer/students',
      gradient: 'from-blue-500 to-blue-400',
    },
    {
      icon: CalendarCheck,
      title: 'Bookings',
      description: 'Orientation calls',
      href: '/dashboard/trainer/bookings',
      gradient: 'from-indigo-500 to-indigo-400',
    }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar activeItem="Home" userType={UserRole.TRAINER} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-5 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Trainer Portal</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                Trainer Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-4">
               <div className="text-right hidden md:block">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Global Rank</p>
                  <p className="text-sm font-bold text-slate-900">Elite Mentor</p>
               </div>
               <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-primary shadow-lg shadow-slate-900/10">
                  <TrendingUp size={20} />
               </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Welcome Banner */}
            <div className="mb-10 bg-slate-900 rounded-[32px] p-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32" />
               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user.firstName}</h2>
                    <p className="text-slate-400 font-light max-w-md">
                      You are currently mentoring <span className="text-white font-bold">{trainerStudents.length} students</span>. Your expertise is shaping the next generation of African talent.
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-[14px] hover:bg-primary/90 transition-all flex items-center gap-2 self-start md:self-auto">
                    View Recent Activity
                    <ArrowRight size={18} />
                  </button>
               </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-[13px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
                      <p className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Navigation - Grid */}
            <div className="mb-12">
               <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 Management Controls
                 <div className="h-px bg-slate-100 flex-1 ml-4" />
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {quickActions.map((action) => (
                   <button
                     key={action.title}
                     onClick={() => navigate(action.href)}
                     className="bg-white border border-slate-100 p-6 rounded-[32px] text-left hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
                   >
                     <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-black/5`}>
                        <action.icon className="w-6 h-6 text-white" />
                     </div>
                     <h3 className="text-lg font-bold text-slate-900 mb-1">{action.title}</h3>
                     <p className="text-sm text-slate-500 font-light leading-snug">{action.description}</p>
                     
                     <div className="mt-4 flex items-center gap-1 text-[12px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        ACCESS PANEL <ArrowRight size={14} />
                     </div>
                   </button>
                 ))}
                 
                 {/* Chat Widget Quick Access */}
                 <button
                    onClick={() => navigate('/dashboard/trainer/chat')}
                    className="lg:col-span-1 bg-slate-900 rounded-[32px] p-6 relative overflow-hidden group border border-slate-800"
                 >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                    <div className="relative z-10">
                       <MessageSquare size={32} className="text-primary mb-4" />
                       <h3 className="text-white font-bold">Mentee Chat</h3>
                       <p className="text-slate-500 text-sm mt-1">2 New Messages</p>
                    </div>
                 </button>
               </div>
            </div>

            <div className="text-center py-8">
               <p className="text-slate-400 text-[13px] font-medium tracking-widest uppercase italic">© Dreamize Trainer Network 2025</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}