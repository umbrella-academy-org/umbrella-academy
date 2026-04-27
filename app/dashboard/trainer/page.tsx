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
  User
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
      <div className="flex h-screen bg-white">
        <div className="w-64 bg-gray-900 animate-pulse"></div>
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-gray-100 animate-pulse"></div>
          <div className="flex-1 p-6 space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
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
      label: 'My Students', 
      value: trainerStudents.length, 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      label: 'Active Roadmaps', 
      value: activeRoadmaps.length, 
      icon: Map, 
      color: 'text-green-600', 
      bg: 'bg-green-100' 
    },
    { 
      label: 'Pending Approvals', 
      value: pendingProjects, 
      icon: Folder, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100' 
    },
    { 
      label: 'Wallet Balance', 
      value: `${userWallet?.balance?.toLocaleString() || 0} RWF`, 
      icon: Wallet, 
      color: 'text-purple-600', 
      bg: 'bg-purple-100' 
    },
  ];

  const quickActions = [
    {
      icon: Map,
      title: 'Roadmaps',
      description: 'Manage student roadmaps and milestones',
      href: '/dashboard/trainer/roadmaps',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: Folder,
      title: 'Projects',
      description: 'Review and approve student projects',
      href: '/dashboard/trainer/projects',
      color: 'bg-yellow-600 hover:bg-yellow-700',
    },
    {
      icon: Users,
      title: 'My Students',
      description: 'View all your assigned students',
      href: '/dashboard/trainer/students',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: CalendarCheck,
      title: 'Bookings',
      description: 'Manage orientation bookings',
      href: '/dashboard/trainer/bookings',
      color: 'bg-indigo-600 hover:bg-indigo-700',
    },
    {
      icon: MessageSquare,
      title: 'Chat',
      description: 'Message students and staff',
      href: '/dashboard/trainer/chat',
      color: 'bg-pink-600 hover:bg-pink-700',
    },
    {
      icon: User,
      title: 'Profile',
      description: 'Update your profile settings',
      href: '/dashboard/trainer/profile',
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Home" userType={UserRole.TRAINER} />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-full mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Welcome back, {user.firstName} {user.lastName?.split(' ')[0]}
              </h1>
              <p className="text-gray-600">
                Guide, mentor and support your students on their learning journey.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action) => (
                <div key={action.title} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <action.icon className="w-6 h-6 text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{action.description}</p>
                  <button
                    onClick={() => navigate(action.href)}
                    className={`w-full px-4 py-2 text-white rounded-lg transition-colors ${action.color}`}
                  >
                    Go to {action.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}