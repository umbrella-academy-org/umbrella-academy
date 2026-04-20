'use client';

import React, { useState, useEffect } from 'react';
import { Home, Calendar, CalendarCheck, Map, Bell, Video, CreditCard, HelpCircle, MessageSquare, X, Settings, Menu, User, LogOut, AlertCircle, CheckCircle, Flame, BookOpen, Award, Lock, Users, Tag, UserCheck, BarChart3, MapPin } from 'lucide-react';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { useAuth } from '@/contexts';
import { SidebarProps, SidebarItem } from '@/types';
import { Logo } from '../ui/Logo';
import { OnboardingChecklist } from '@/types';

export default function Sidebar({ activeItem = 'Home', userType }: SidebarProps) {
  const [currentActive, setCurrentActive] = useState(activeItem);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNewUserGuide, setShowNewUserGuide] = useState(false);
  const { onboardingChecklist } = useAuth()


  const { navigate } = useNavigationWithLoading();
  const { user, logout } = useAuth();

  // Use user data from context, fallback to prop
  const currentUserType = user?.role || userType || 'student';
  const userName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User';
  const userEmail = user?.email || 'user@dreamize.rw';
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase();

  // Get completion status for new user steps
  const getNewUserSteps = () => {
    const hasAvailability = localStorage.getItem('availabilitySet');
    const hasSelectedField = localStorage.getItem('selectedField');
    const hasCompletedPayment = localStorage.getItem('paymentCompleted');
    const hasCreatedRoadmap = localStorage.getItem('hasRoadmap');

    return [
      {
        id: 'availability',
        label: 'Set Availability',
        completed: !!hasAvailability,
        href: '/post-signup/availability',
        description: 'Choose your learning hours'
      },
      {
        id: 'field',
        label: 'Choose Your Field',
        completed: !!hasSelectedField,
        href: '/post-signup/choose-field',
        description: 'Select your industry focus'
      },
      {
        id: 'payment',
        label: 'Complete Payment',
        completed: !!hasCompletedPayment,
        href: '/post-signup/payment',
        description: 'Pay for field access'
      },
      {
        id: 'roadmap',
        label: 'Create Learning Roadmap',
        completed: !!hasCreatedRoadmap,
        href: '/post-signup/roadmap',
        description: 'Plan your learning journey'
      }
    ];
  };


  // Update current active when prop changes
  useEffect(() => {
    setCurrentActive(activeItem);
  }, [activeItem]);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  // Define navigation items based on user type
  const getNavigationItems = (): SidebarItem[] => {
    switch (currentUserType) {
      case 'trainer':
        return [
          {
            icon: <Home className="w-5 h-5" />,
            label: 'Home',
            href: '/dashboard/trainer',
            active: true
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Profile',
            href: '/dashboard/trainer/profile'
          },
          {
            icon: <MessageSquare className="w-5 h-5" />,
            label: 'Chat',
            href: '/dashboard/trainer/chat'
          },
          {
            icon: <BookOpen className="w-5 h-5" />,
            label: 'Roadmaps',
            href: '/dashboard/trainer/calendar'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'My Students',
            href: '/dashboard/trainer/students'
          },
          {
            icon: <CalendarCheck className="w-5 h-5" />,
            label: 'Bookings',
            href: '/dashboard/trainer/bookings'
          },
          {
            icon: <Video className="w-5 h-5" />,
            label: 'Live Session',
            href: '/dashboard/trainer/live-session'
          },
          {
            icon: <AlertCircle className="w-5 h-5" />,
            label: 'Reports',
            href: '/dashboard/trainer/reports'
          },
          {
            icon: <CreditCard className="w-5 h-5" />,
            label: 'Wallet',
            href: '/dashboard/trainer/wallet'
          },
          {
            icon: <Settings className="w-5 h-5" />,
            label: 'Settings',
            href: '/dashboard/trainer/settings'
          },
        ];
      case 'admin':
        return [
          {
            icon: <Home className="w-5 h-5" />,
            label: 'Dashboard',
            href: '/dashboard/admin'
          },
          {
            icon: <Users className="w-5 h-5" />,
            label: 'Users',
            href: '/dashboard/admin/users'
          },
          {
            icon: <CreditCard className="w-5 h-5" />,
            label: 'Payments',
            href: '/dashboard/admin/payments'
          },
          {
            icon: <Tag className="w-5 h-5" />,
            label: 'Promo Codes',
            href: '/dashboard/admin/promo-codes'
          },
          {
            icon: <UserCheck className="w-5 h-5" />,
            label: 'Trainer Approvals',
            href: '/dashboard/admin/trainer-approvals'
          },
          {
            icon: <BarChart3 className="w-5 h-5" />,
            label: 'Reports',
            href: '/dashboard/admin/reports'
          },
          {
            icon: <MapPin className="w-5 h-5" />,
            label: 'Roadmap Approvals',
            href: '/dashboard/admin/roadmap-approvals'
          }
        ];
      default: // student
        const studentItems = [
          {
            icon: <BookOpen className="w-5 h-5" />,
            label: 'My Roadmap',
            href: '/dashboard/student/roadmap',
            disabled: !(onboardingChecklist?.roadmapReceived || false),
            disabledReason: 'Complete orientation session to unlock'
          },
          {
            icon: <Calendar className="w-5 h-5" />,
            label: 'Sessions & Calendar',
            href: '/dashboard/student/calendar',
            disabled: !(onboardingChecklist?.orientationBooked || false),
            disabledReason: 'Book orientation session to unlock'
          },
          {
            icon: <Award className="w-5 h-5" />,
            label: 'Certificates',
            href: '/dashboard/student/certificates',
            disabled: !(onboardingChecklist?.learningStarted || false),
            disabledReason: 'Start learning to unlock'
          },
          {
            icon: <Award className="w-5 h-5" />,
            label: 'Portfolio',
            href: '/dashboard/student/portfolio',
            disabled: !(onboardingChecklist?.learningStarted || false),
            disabledReason: 'Start learning to unlock'
          },
          {
            icon: <MessageSquare className="w-5 h-5" />,
            label: 'Chat',
            href: '/dashboard/student/chat',
            disabled: !(onboardingChecklist?.orientationBooked || false),
            disabledReason: 'Book orientation session to unlock'
          },
          {
            icon: <CreditCard className="w-5 h-5" />,
            label: 'Subscription',
            href: '/dashboard/student/subscription',
            disabled: false,
            disabledReason: ''
          },
          {
            icon: <Settings className="w-5 h-5" />,
            label: 'Settings',
            href: '/dashboard/student/settings',
            disabled: false,
            disabledReason: ''
          }
        ];
        return studentItems;
    }
  };

  const sidebarItems = getNavigationItems();

  // Get user type display info
  const getUserTypeInfo = () => {
    switch (currentUserType) {
      case 'trainer':
        return {
          displayName: 'Trainer',
          progressLabel: '80% Capacity',
          progressValue: 80,
          renewLabel: 'Manage Schedule',
          renewHref: '/dashboard/trainer/schedule'
        };
      case 'admin':
        return {
          displayName: 'System Admin',
          progressLabel: '5 Fields',
          progressValue: 95,
          renewLabel: 'System Health',
          renewHref: '/dashboard/admin/system'
        };
      default:
        return {
          displayName: 'Student',
          progressLabel: '8 Months',
          progressValue: 80,
          renewLabel: 'Renew Plan',
          renewHref: '/post-signup/subscription/renew'
        };
    }
  };

  const userInfo = getUserTypeInfo();

  const handleNavigation = (item: SidebarItem) => {
    setCurrentActive(item.label);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
    navigate(item.href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 pb-20 bg-gray-900 text-white flex flex-col h-screen overflow-y-scroll
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="p-4 lg:p-8 border-b border-gray-800/50">
          <Logo variant="dark" subTitle={userInfo.displayName} showBackground={false} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.label} className="relative group">
              <button
                onClick={() => !item.disabled && handleNavigation(item)}
                disabled={item.disabled}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group
                  ${item.disabled
                    ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    : currentActive === item.label
                      ? 'bg-yellow-500/10 text-yellow-500 font-medium border-l-4 border-yellow-500'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                `}
                title={item.disabled ? item.disabledReason : ''}
              >
                {/* Assuming item.icon is a React component, we can clone it to add props */}
                {item.icon && React.cloneElement(item.icon, {
                  className: `w-5 h-5 ${item.disabled
                    ? 'text-gray-500'
                    : currentActive === item.label
                      ? 'text-yellow-500'
                      : 'group-hover:scale-110 transition-transform'
                    }`
                })}
                <span className="flex-1">{item.label}</span>
                {item.disabled && (
                  <Lock className="w-4 h-4 text-gray-500 ml-auto" />
                )}
                {/* Add badge if needed, based on original structure */}
                {/* {item.badge && (
                  <span className="bg-yellow-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {item.badge}
                  </span>
                )} */}
              </button>

              {/* Tooltip for disabled items */}
              {item.disabled && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.disabledReason}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Learning Progress Info (Student only) */}
        {currentUserType === 'student' && (
          <div className="mx-4 my-6 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={175.9}
                    strokeDashoffset={175.9 * (1 - userInfo.progressValue / 100)}
                    className="text-yellow-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-yellow-500">{userInfo.progressValue}%</span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span>3 Day Streak</span>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-medium text-white mb-0.5">
                    {userInfo.progressLabel}
                  </span>
                  <a
                    href={userInfo.renewHref}
                    className="text-sm text-yellow-500 hover:text-yellow-500"
                  >
                    {userInfo.renewLabel}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Monthly Target</span>
                <span className="text-white font-medium">12/15 hrs</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div className="bg-yellow-500 h-full w-[80%]" />
              </div>
            </div>
          </div>
        )}
        
        {/* User Profile */}
        <div className="p-3 lg:p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-xs lg:text-sm font-medium text-white">{userInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white text-sm lg:text-base truncate">{userName}</div>
              <div className="text-xs lg:text-sm text-gray-400 truncate">{userEmail}</div>
            </div>
            <div className="flex items-center gap-1">
              <button className="text-gray-400 hover:text-white p-1">
                <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-gray-400 p-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}