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
  Zap,
  Star,
  Compass,
  CheckCircle,
  Clock,
  ChevronRight,
  Sparkles
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

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#F8FAFC]">
        <Sidebar activeItem="Home" userType={UserRole.TRAINER} />
        <div className="flex-1 flex flex-col">
          <div className="h-20 bg-white border-b border-slate-100 animate-pulse"></div>
          <div className="flex-1 p-8 space-y-8">
            <div className="h-10 w-64 bg-slate-100 rounded-xl animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-50 rounded-[40px] animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      label: 'Mentees', 
      value: trainerStudents.length, 
      icon: Users, 
      color: 'text-blue-500', 
      bg: 'bg-blue-50' 
    },
    { 
      label: 'Active Paths', 
      value: activeRoadmaps.length, 
      icon: Compass, 
      color: 'text-primary', 
      bg: 'bg-primary/5' 
    },
    { 
      label: 'Submissions', 
      value: pendingProjects, 
      icon: Zap, 
      color: 'text-orange-500', 
      bg: 'bg-orange-50' 
    },
    { 
      label: 'Earnings', 
      value: `${(userWallet?.balance || 0).toLocaleString()}`, 
      suffix: ' RWF',
      icon: Wallet, 
      color: 'text-green-500', 
      bg: 'bg-green-50' 
    },
  ];

  const quickActions = [
    {
      icon: Compass,
      title: 'Roadmap Architect',
      description: 'Design & refine student learning paths',
      href: '/dashboard/trainer/roadmaps',
      color: 'bg-slate-900',
    },
    {
      icon: Award,
      title: 'Project Review',
      description: 'Audit and grade student submissions',
      href: '/dashboard/trainer/projects',
      color: 'bg-orange-600',
    },
    {
      icon: Users,
      title: 'Mentee Directory',
      description: 'Track student progress & analytics',
      href: '/dashboard/trainer/students',
      color: 'bg-blue-600',
    },
    {
      icon: CalendarCheck,
      title: 'Session Manager',
      description: 'Manage orientations & call bookings',
      href: '/dashboard/trainer/bookings',
      color: 'bg-indigo-600',
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
                <span className="text-[12px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                   <Star size={10} className="fill-primary" /> Verified Expert
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Trainer Command
              </h1>
            </div>

            <div className="flex items-center gap-4">
               <div className="text-right hidden md:block">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Status</p>
                  <p className="text-sm font-black text-slate-900">Elite Mentor</p>
               </div>
               <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-primary shadow-xl shadow-slate-900/10 transition-transform hover:scale-105 cursor-pointer">
                  <TrendingUp size={24} />
               </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero Banner */}
            <div className="mb-10 bg-slate-900 rounded-[40px] p-12 relative overflow-hidden group shadow-2xl shadow-slate-900/10">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full -ml-16 -mb-16" />
               
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-3 mb-4">
                       <Sparkles className="text-primary w-5 h-5" />
                       <span className="text-primary text-[11px] font-bold uppercase tracking-[0.3em]">Knowledge Architect</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                       Good Morning, <br />
                       <span className="text-primary">{user.firstName} {user.lastName}</span>
                    </h2>
                    <p className="text-slate-400 font-medium max-w-lg leading-relaxed text-[15px] italic">
                      "Empowering {trainerStudents.length} high-potential students through strategic mentorship and pedagogical excellence."
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex flex-col gap-3">
                     <button className="w-full py-4 bg-primary text-slate-900 rounded-2xl font-black text-[14px] hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group/btn">
                        New Roadmap Architecture
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Queue Status</p>
                           <p className="text-white font-black text-sm">{pendingProjects} Pending Audits</p>
                        </div>
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                           <Clock className="text-slate-400 w-5 h-5" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                    <CheckCircle className="text-slate-50 w-8 h-8 group-hover:text-primary/10 transition-colors" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                     <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                     {stat.suffix && <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stat.suffix}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Management Matrix */}
            <div className="mb-12">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                    <Zap className="text-primary" />
                    Management Matrix
                  </h2>
                  <div className="h-px bg-slate-100 flex-1 ml-6" />
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {quickActions.map((action) => (
                   <button
                     key={action.title}
                     onClick={() => navigate(action.href)}
                     className="bg-white border border-slate-100 p-8 rounded-[40px] text-left hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
                   >
                     <div className={`w-14 h-14 ${action.color} rounded-[20px] flex items-center justify-center mb-6 shadow-xl shadow-black/5 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                        <action.icon className="w-7 h-7 text-white" />
                     </div>
                     <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{action.title}</h3>
                     <p className="text-[13px] text-slate-500 font-medium leading-relaxed italic">{action.description}</p>
                     
                     <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[11px] font-black text-primary uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                           Open Console <ChevronRight size={14} />
                        </div>
                        <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                           <ArrowRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                        </div>
                     </div>
                   </button>
                 ))}
               </div>
            </div>

            {/* Recent Schedule / Activity Widget */}
            <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-10">
               <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-white rounded-[28px] shadow-sm flex items-center justify-center text-primary border border-slate-100 relative">
                     <CalendarCheck size={40} />
                     <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-4 border-slate-50 text-[10px] font-bold text-slate-900">
                        1
                     </div>
                  </div>
                  <div>
                     <p className="text-[11px] font-bold text-primary uppercase tracking-[0.3em] mb-1">Next Session</p>
                     <h4 className="text-2xl font-black text-slate-900">Orientation Call: Student Alpha</h4>
                     <p className="text-slate-400 text-sm font-medium italic mt-1">Scheduled for Today at 14:00 CAT • Virtual Boardroom 04</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 w-full lg:w-auto">
                  <button className="flex-1 lg:flex-none px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                     Join Call
                  </button>
                  <button className="flex-1 lg:flex-none px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all">
                     Reschedule
                  </button>
               </div>
            </div>

            <div className="mt-16 text-center">
               <p className="text-slate-300 text-[12px] font-black tracking-[0.4em] uppercase italic">© Dreamize Trainer OS v4.2.0-platinum</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}