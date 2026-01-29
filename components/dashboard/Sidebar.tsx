'use client';

import { useState, useEffect } from 'react';
import { Home, Calendar, Map, Bell, Video, CreditCard, HelpCircle, MessageSquare, X, Settings, Menu, User, LogOut, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { useAuth } from '@/contexts';
import { SidebarProps, SidebarItem, UserType } from '@/types';

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
    const hasSelectedWing = localStorage.getItem('selectedWing');
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
        id: 'wing',
        label: 'Choose Your Wing',
        completed: !!hasSelectedWing,
        href: '/post-signup/choose-wing',
        description: 'Select your industry focus'
      },
      {
        id: 'payment',
        label: 'Complete Payment',
        completed: !!hasCompletedPayment,
        href: '/post-signup/payment',
        description: 'Pay for wing access'
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
      case 'wing-admin':
        return [
          {
            icon: <Home className="w-5 h-5" />,
            label: 'Home',
            href: '/dashboard/wing-admin'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Profile',
            href: '/dashboard/wing-admin/profile'
          },
          {
            icon: <MessageSquare className="w-5 h-5" />,
            label: 'Chat',
            href: '/dashboard/wing-admin/chat'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Mentors',
            href: '/dashboard/wing-admin/mentors'
          },
          {
            icon: <User className="w-5 h-5" />,
            label: 'Trainers',
            href: '/dashboard/wing-admin/trainers'
          },
          {
            icon: <AlertCircle className="w-5 h-5" />,
            label: 'Mentor Reports',
            href: '/dashboard/wing-admin/mentor-reports'
          },
          {
            icon: <Calendar className="w-5 h-5" />,
            label: 'Student Activity',
            href: '/dashboard/wing-admin/students'
          },
          {
            icon: <CreditCard className="w-5 h-5" />,
            label: 'Wing Wallet',
            href: '/dashboard/wing-admin/wallet'
          },
          {
            icon: <Settings className="w-5 h-5" />,
            label: 'Settings',
            href: '/dashboard/wing-admin/settings'
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
            label: 'Wings',
            href: '/dashboard/umbrella-admin/wings'
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
      case 'wing-admin':
        return {
          displayName: 'Wing Admin',
          progressLabel: '24 Students',
          progressValue: 85,
          renewLabel: 'Manage Wing',
          renewHref: '/dashboard/wing-admin/settings'
        };
      case 'umbrella-admin':
        return {
          displayName: 'System Admin',
          progressLabel: '5 Wings',
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
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col h-screen overflow-y-scroll
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="p-4 lg:p-8 border-b border-gray-800/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#D1A02C] rounded-lg flex items-center justify-center shadow-lg shadow-black/20 flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-bold text-lg text-white leading-tight truncate">Umbrella Academy</div>
              <div className="text-xs font-medium text-gray-400 mt-0.5 uppercase  ">{userInfo.displayName}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4">
          <ul className="space-y-1 lg:space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors text-sm lg:text-base ${currentActive === item.label
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Progress Circle - Hidden on mobile */}
        <div className="hidden lg:block p-6 border-t border-gray-800">
          <div className="relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-4">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#EAB308"
                    strokeWidth="2"
                    strokeDasharray={`${userInfo.progressValue}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-yellow-600">{userInfo.progressValue}%</span>
                </div>
              </div>

              <div className="text-center">
                <div className="font-semibold text-white">{userInfo.progressLabel}</div>
                <div className="text-sm text-gray-400 mt-1">
                  {userType === 'student'
                    ? 'You can renew your plan at anytime before expiry'
                    : userType === 'trainer'
                      ? 'Current training capacity this month'
                      : 'Active students under your mentorship'
                  }
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sm text-gray-400">
                    {userType === 'student' ? 'Plans' : 'Manage'}
                  </span>
                  <a
                    href={userInfo.renewHref}
                    className="text-sm text-yellow-600 hover:text-yellow-500"
                  >
                    {userInfo.renewLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                    localStorage.removeItem('selectedWing');
                    localStorage.removeItem('paymentCompleted');
                    localStorage.removeItem('hasRoadmap');
                    localStorage.setItem('isNewUser', 'true');
                  }
                }}
                className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  devNewUserMode 
                    ? 'bg-yellow-600 text-white' 
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
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-white">Finish Setting Your Account</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">Complete your profile setup to start learning</p>
                <button
                  onClick={() => navigate('/post-signup/availability')}
                  className="w-full bg-yellow-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-yellow-700 transition-colors"
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
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-600 rounded-full flex items-center justify-center">
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
                className="text-gray-400 hover:text-red-400 p-1"
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