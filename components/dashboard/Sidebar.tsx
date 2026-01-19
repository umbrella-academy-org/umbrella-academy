'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Calendar, Map, Bell, Video, CreditCard, HelpCircle, MessageSquare, X, Settings } from 'lucide-react';

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
  const router = useRouter();

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
    router.push(item.href);
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen overflow-y-scroll">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <div>
            <div className="font-semibold">Umbrella Academy</div>
            <div className="text-sm text-gray-400">Student</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
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

      {/* Progress Circle */}
      <div className="p-6 border-t border-gray-800">
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
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">OR</span>
          </div>
          <div className="flex-1">
            <div className="font-medium text-white">Olivia Rhye</div>
            <div className="text-sm text-gray-400">olivia@untitledui.com</div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}