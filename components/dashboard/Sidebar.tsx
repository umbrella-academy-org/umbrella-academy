'use client';

import { useState, useEffect } from 'react';
import { Home, Calendar, Map, Bell, Video, CreditCard, HelpCircle, MessageSquare, X, Settings, Menu } from 'lucide-react';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

interface SidebarProps {
  activeItem?: string;
}

export default function Sidebar({ activeItem = 'Home' }: SidebarProps) {
  const [currentActive, setCurrentActive] = useState(activeItem);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useNavigationWithLoading();

  // Update current active when prop changes
  useEffect(() => {
    setCurrentActive(activeItem);
  }, [activeItem]);

  const sidebarItems: SidebarItem[] = [
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Home',
      href: '/dashboard/student',
      active: true
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
    }
  ];

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
        <div className="p-4 lg:p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-600 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 lg:w-6 lg:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm lg:text-base">Umbrella Academy</div>
              <div className="text-xs lg:text-sm text-gray-400">Student</div>
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
                  className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors text-sm lg:text-base ${
                    currentActive === item.label
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
                    strokeDasharray="80, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-yellow-600">80%</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="font-semibold text-white">8 Months</div>
                <div className="text-sm text-gray-400 mt-1">
                  You can renew your plan at anytime before expiry
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sm text-gray-400">Plans</span>
                  <a 
                    href="/dashboard/student/subscription/renew"
                    className="text-sm text-yellow-600 hover:text-yellow-500"
                  >
                    Renew Plan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 lg:p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-xs lg:text-sm font-medium text-white">OR</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white text-sm lg:text-base truncate">Olivia Rhye</div>
              <div className="text-xs lg:text-sm text-gray-400 truncate">olivia@umbrellaacademy.com</div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}