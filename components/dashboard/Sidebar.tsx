'use client';

import React, { useState, useEffect } from 'react';
import { Home, Calendar, CalendarCheck, CreditCard, MessageSquare, X, Settings, Menu, User, LogOut, Lock, Users, Award, BookOpen, Ticket, Server, UserCheck } from 'lucide-react';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { useAuth } from '@/contexts';
import { SidebarProps, SidebarItem } from '@/types';
import { Logo } from '../ui/Logo';
import { BASE_URL } from '@/services';

export default function Sidebar({ activeItem = 'Home', userType }: SidebarProps) {
  const [currentActive, setCurrentActive] = useState(activeItem);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useNavigationWithLoading();
  const { user, logout } = useAuth();

  const currentUserType = user?.role || userType || 'student';
  const userName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User';
  const userEmail = user?.email || 'user@dreamize.rw';
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase();

  useEffect(() => {
    setCurrentActive(activeItem);
  }, [activeItem]);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  const getNavigationItems = (): SidebarItem[] => {
    switch (currentUserType) {
      case 'guardian':
        return [
          { icon: <Home className="w-5 h-5" />, label: 'Dashboard', href: '/dashboard/guardian', active: true },
          { icon: <User className="w-5 h-5" />, label: 'Profile', href: '/dashboard/guardian/profile' },
          { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '/dashboard/guardian/settings' },
        ];
      case 'trainer':
        return [
          { icon: <Home className="w-5 h-5" />, label: 'Home', href: '/dashboard/trainer', active: true },
          { icon: <Users className="w-5 h-5" />, label: 'Students', href: '/dashboard/trainer/students' },
          { icon: <BookOpen className="w-5 h-5" />, label: 'Roadmaps', href: '/dashboard/trainer/roadmaps' },
          { icon: <Award className="w-5 h-5" />, label: 'Projects', href: '/dashboard/trainer/projects' },
          { icon: <CalendarCheck className="w-5 h-5" />, label: 'Bookings', href: '/dashboard/trainer/bookings' },
          { icon: <MessageSquare className="w-5 h-5" />, label: 'Chat', href: '/dashboard/trainer/chat' },
          { icon: <User className="w-5 h-5" />, label: 'Profile', href: '/dashboard/trainer/profile' },
        ];
      case 'admin':
        return [
          { icon: <Home className="w-5 h-5" />, label: 'Dashboard', href: '/dashboard/admin', active: true },
          { icon: <Users className="w-5 h-5" />, label: 'Users', href: '/dashboard/admin/users' },
          { icon: <Ticket className="w-5 h-5" />, label: 'Promo Codes', href: '/dashboard/admin/promo-codes' },
          { icon: <MessageSquare className="w-5 h-5" />, label: 'Chat', href: '/dashboard/admin/chat' },
          { icon: <UserCheck className="w-5 h-5" />, label: 'Trainer approval', href: '/dashboard/admin/trainer-approvals' },
          { icon: <UserCheck className="w-5 h-5" />, label: 'Roadmap approval', href: '/dashboard/admin/roadmap-approvals' },
          { icon: <CreditCard className="w-5 h-5" />, label: 'Payments', href: '/dashboard/admin/payments' },
          { icon: <Server className="w-5 h-5" />, label: 'Server', href: '/dashboard/admin/system' },
          { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '/dashboard/admin/settings' },
          { icon: <User className="w-5 h-5" />, label: 'Profile', href: '/dashboard/admin/profile' },
        ];
      case 'sales_manager':
        return [
          { icon: <Home className="w-5 h-5" />, label: 'Dashboard', href: '/dashboard/sales', active: true },
          { icon: <Users className="w-5 h-5" />, label: 'Leads', href: '/dashboard/sales/leads' },
          { icon: <User className="w-5 h-5" />, label: 'Profile', href: '/dashboard/sales/profile' },
        ];
      default:
        return [
          { icon: <Home className="w-5 h-5" />, label: 'Home', href: '/dashboard/student', active: true },
          { icon: <BookOpen className="w-5 h-5" />, label: 'My Roadmap', href: '/dashboard/student/roadmap' },
          { icon: <Award className="w-5 h-5" />, label: 'Projects', href: '/dashboard/student/projects' },
          { icon: <User className="w-5 h-5" />, label: 'Portfolio', href: '/dashboard/student/portfolio' },
          { icon: <Calendar className="w-5 h-5" />, label: 'Calendar', href: '/dashboard/student/calendar' },
          { icon: <Award className="w-5 h-5" />, label: 'Certificates', href: '/dashboard/student/certificates' },
          { icon: <User className="w-5 h-5" />, label: 'Profile', href: '/dashboard/student/profile' },
          { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '/dashboard/student/settings' },
          { icon: <MessageSquare className="w-5 h-5" />, label: 'Chat', href: '/dashboard/student/chat' },
          { icon: <CreditCard className="w-5 h-5" />, label: 'Subscription', href: '/dashboard/student/subscription' },
        ];
    }
  };

  const sidebarItems = getNavigationItems();

  const handleNavigation = (item: SidebarItem) => {
    setCurrentActive(item.label);
    setIsMobileMenuOpen(false);
    navigate(item.href);
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0A0A0A] border-r border-white/5 text-white flex flex-col h-screen
        transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:transform-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 lg:p-8 border-b border-white/5 cursor-pointer"
          onClick={() => navigate(`/dashboard/${currentUserType}`)}>
          <Logo size="md" />
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <div key={item.label} className="relative group">
              <button
                onClick={() => !item.disabled && handleNavigation(item)}
                disabled={item.disabled}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden
                  ${item.disabled
                    ? 'opacity-40 cursor-not-allowed'
                    : currentActive === item.label
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {currentActive === item.label && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[0_0_10px_rgba(205,164,41,0.5)]" />
                )}

                {item.icon && React.isValidElement(item.icon) && React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                  className: `w-5 h-5 transition-all duration-300 ${currentActive === item.label
                    ? 'text-primary scale-110'
                    : 'group-hover:text-white group-hover:scale-110'
                    }`
                })}

                <span className="flex-1 text-[14px] tracking-wide">{item.label}</span>

                {item.disabled && <Lock className="w-3.5 h-3.5 text-slate-500" />}
              </button>
            </div>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={BASE_URL + user.profilePicture}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[14px] font-bold text-white">{userInitials}</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0A0A0A] rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-[14px] truncate leading-tight">{userName}</div>
              <div className="text-[12px] text-slate-500 truncate mt-0.5">{userEmail}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={() => navigate(`/dashboard/${currentUserType}/settings`)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all text-[12px] font-medium"
            >
              <Settings className="w-3.5 h-3.5" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-10 h-10 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}