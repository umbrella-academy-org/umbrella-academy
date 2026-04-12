'use client';

import React, { useState, useEffect } from 'react';
import { Home, Calendar, Map, Bell, Video, CreditCard, HelpCircle, MessageSquare, X, Settings, Menu, User, LogOut, AlertCircle, CheckCircle, Flame } from 'lucide-react';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { useAuth } from '@/contexts';
import { SidebarProps, SidebarItem } from '@/types';
import { Logo } from '../ui/Logo';

export default function Sidebar({ activeItem = 'Home', userType }: SidebarProps) {
  const [currentActive, setCurrentActive] = useState(activeItem);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showNewUserGuide, setShowNewUserGuide] = useState(false);
  // Dev toggle for new user simulation (for development only)
  const [devNewUserMode, setDevNewUserMode] = useState(false);

  // Initialize dev mode from localStorage
  useEffect(() => {
    const savedDevMode = localStorage.getItem('devNewUserMode') === 'true';
    setDevNewUserMode(savedDevMode);
  }, []);
  const { navigate } = useNavigationWithLoading();
  const { user, logout } = useAuth();

  // Use user data from context, fallback to prop
  const currentUserType = user?.role || userType || 'student';
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@umbrella.rw';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

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

  // Check if user is new and what steps they've completed
  useEffect(() => {
    const newUserFlag = localStorage.getItem('isNewUser');
    const hasCreatedRoadmap = localStorage.getItem('hasRoadmap');

    if ((newUserFlag === 'true' || devNewUserMode) && currentUserType === 'student') {
      setIsNewUser(true);
      setShowNewUserGuide(!hasCreatedRoadmap);
    } else {
      setIsNewUser(false);
      setShowNewUserGuide(false);
    }
  }, [currentUserType, devNewUserMode]);

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
            icon: <Calendar className="w-5 h-5" />,
            label: 'Smart Calendar',
            href: '/dashboard/trainer/calendar'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'My Students',
            href: '/dashboard/trainer/students'
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
      case 'mentor':
        return [
          {
            icon: <Home className="w-5 h-5" />,
            label: 'Home',
            href: '/dashboard/mentor',
            active: true
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Profile',
            href: '/dashboard/mentor/profile'
          },
          {
            icon: <MessageSquare className="w-5 h-5" />,
            label: 'Chat',
            href: '/dashboard/mentor/chat'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'My Students',
            href: '/dashboard/mentor/students'
          },
          {
            icon: <CheckCircle className="w-5 h-5" />,
            label: 'Trainer Approvals',
            href: '/dashboard/mentor/trainer-approvals'
          },
          {
            icon: <AlertCircle className="w-5 h-5" />,
            label: 'Trainer Reports',
            href: '/dashboard/mentor/reports'
          },
          {
            icon: <AlertCircle className="w-5 h-5" />,
            label: 'Mentor Reports',
            href: '/dashboard/mentor/mentor-reports'
          },
          {
            icon: <Map className="w-5 h-5" />,
            label: 'Roadmap Approvals',
            href: '/dashboard/mentor/roadmap-approvals'
          },
          {
            icon: <Bell className="w-5 h-5" />,
            label: 'Notifications',
            href: '/dashboard/mentor/notifications'
          },
          {
            icon: <CreditCard className="w-5 h-5" />,
            label: 'Wallet',
            href: '/dashboard/mentor/wallet'
          },
          {
            icon: <HelpCircle className="w-5 h-5" />,
            label: 'Support',
            href: '/dashboard/mentor/support'
          },
          {
            icon: <Settings className="w-5 h-5" />,
            label: 'Settings',
            href: '/dashboard/mentor/settings'
          }
        ];
      case 'field-admin':
        return [
          {
            icon: <Home className="w-5 h-5" />,
            label: 'Home',
            href: '/dashboard/field-admin'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Profile',
            href: '/dashboard/field-admin/profile'
          },
          {
            icon: <MessageSquare className="w-5 h-5" />,
            label: 'Chat',
            href: '/dashboard/field-admin/chat'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Mentors',
            href: '/dashboard/field-admin/mentors'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Trainers',
            href: '/dashboard/field-admin/trainers'
          },
          {
            icon: <AlertCircle className="w-5 h-5" />,
            label: 'Mentor Reports',
            href: '/dashboard/field-admin/mentor-reports'
          },
          {
            icon: <Calendar className="w-5 h-5" />,
            label: 'Student Activity',
            href: '/dashboard/field-admin/students'
          },
          {
            icon: <CreditCard className="w-5 h-5" />,
            label: 'Field Wallet',
            href: '/dashboard/field-admin/wallet'
          },
          {
            icon: <Settings className="w-5 h-5" />,
            label: 'Settings',
            href: '/dashboard/field-admin/settings'
          }
        ];
      case 'umbrella-admin':
        return [
          {
            icon: <Home className="w-5 h-5" />,
            label: 'Home',
            href: '/dashboard/umbrella-admin'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Profile',
            href: '/dashboard/umbrella-admin/profile'
          },
          {
            icon: <MessageSquare className="w-5 h-5" />,
            label: 'Chat',
            href: '/dashboard/umbrella-admin/chat'
          },
          {
            icon: <Map className="w-5 h-5" />,
            label: 'Companies',
            href: '/dashboard/umbrella-admin/companies'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Users',
            href: '/dashboard/umbrella-admin/users'
          },
          {
            icon: <HelpCircle className="w-5 h-5" />,
            label: 'Feedback & Support',
            href: '/dashboard/umbrella-admin/feedback-support'
          },
          {
            icon: <CreditCard className="w-5 h-5" />,
            label: 'Financial',
            href: '/dashboard/umbrella-admin/financial'
          },
          {
            icon: <Bell className="w-5 h-5" />,
            label: 'System Health',
            href: '/dashboard/umbrella-admin/system'
          },
          {
            icon: <Settings className="w-5 h-5" />,
            label: 'Settings',
            href: '/dashboard/umbrella-admin/settings'
          }
        ];
      default: // student
        return [
          {
            icon: <Home className="w-5 h-5" />,
            label: 'Home',
            href: '/dashboard/student',
            active: true
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Profile',
            href: '/dashboard/student/profile'
          },
          {
            icon: <MessageSquare className="w-5 h-5" />,
            label: 'Chat',
            href: '/dashboard/student/chat'
          },
          {
            icon: <Calendar className="w-5 h-5" />,
            label: 'Smart Calendar',
            href: '/dashboard/student/calendar'
          },
          {
            icon: <Map className="w-5 h-5" />,
            label: 'Roadmap',
            href: '/dashboard/student/roadmap'
          },
          {
            icon: <Bell className="w-5 h-5" />,
            label: 'Notifications',
            href: '/dashboard/student/notifications'
          },
          {
            icon: <Video className="w-5 h-5" />,
            label: 'Live Session',
            href: '/dashboard/student/live-session'
          },
          {
            icon: <CreditCard className="w-5 h-5" />,
            label: 'Subscription',
            href: '/dashboard/student/subscription'
          },
          {
            icon: <HelpCircle className="w-5 h-5" />,
            label: 'Support',
            href: '/dashboard/student/support'
          },
          {
            icon: <MessageSquare className="w-5 h-5" />,
            label: 'Feedback',
            href: '/dashboard/student/feedback'
          },
          {
            icon: <Settings className="w-5 h-5" />,
            label: 'Settings',
            href: '/dashboard/student/settings'
          }
        ];
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
      case 'mentor':
        return {
          displayName: 'Mentor',
          progressLabel: '12 Students',
          progressValue: 75,
          renewLabel: 'View Students',
          renewHref: '/dashboard/mentor/students'
        };
      case 'field-admin':
        return {
          displayName: 'Field Admin',
          progressLabel: '24 Students',
          progressValue: 85,
          renewLabel: 'Manage Field',
          renewHref: '/dashboard/field-admin/settings'
        };
      case 'umbrella-admin':
        return {
          displayName: 'System Admin',
          progressLabel: '5 Fields',
          progressValue: 95,
          renewLabel: 'System Health',
          renewHref: '/dashboard/umbrella-admin/system'
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
            <button
              key={item.label}
              onClick={() => handleNavigation(item)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group
                ${currentActive === item.label
                  ? 'bg-yellow-500/10 text-yellow-500 font-medium border-l-4 border-yellow-500'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
              `}
            >
              {/* Assuming item.icon is a React component, we can clone it to add props */}
              {item.icon && React.cloneElement(item.icon, {
                className: `w-5 h-5 ${currentActive === item.label ? 'text-yellow-500' : 'group-hover:scale-110 transition-transform'}`
              })}
              <span className="flex-1">{item.label}</span>
              {/* Add badge if needed, based on original structure */}
              {/* {item.badge && (
                <span className="bg-yellow-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {item.badge}
                </span>
              )} */}
            </button>
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

        {/* Dev Toggle & New User Guide */}
        {currentUserType === 'student' && (
          <div className="p-3 lg:p-4 border-t border-gray-800">
            {/* Dev Toggle */}
            <div className="mb-4">
              <button
                onClick={() => {
                  const newDevMode = !devNewUserMode;
                  setDevNewUserMode(newDevMode);

                  // Store in localStorage
                  localStorage.setItem('devNewUserMode', newDevMode.toString());

                  // Dispatch event for student dashboard to listen
                  window.dispatchEvent(new CustomEvent('devModeChanged', {
                    detail: { isDevMode: newDevMode }
                  }));

                  if (newDevMode) {
                    // Reset all progress when enabling dev mode
                    localStorage.removeItem('availabilitySet');
                    localStorage.removeItem('selectedField');
                    localStorage.removeItem('paymentCompleted');
                    localStorage.removeItem('hasRoadmap');
                    localStorage.setItem('isNewUser', 'true');
                  }
                }}
                className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors ${devNewUserMode
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
              >
                DEV: {devNewUserMode ? 'New User Mode ON' : 'New User Mode OFF'}
              </button>
            </div>

            {/* New User Guide */}
            {showNewUserGuide && (
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-white">Finish Setting Your Account</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">Complete your profile setup to start learning</p>
                <button
                  onClick={() => navigate('/post-signup/availability')}
                  className="w-full bg-yellow-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-yellow-700 transition-colors"
                >
                  Continue Setup
                </button>
              </div>
            )}
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