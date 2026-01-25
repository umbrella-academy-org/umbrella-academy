'use client';

import { Home, Search, Grid3X3, Bell, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

interface HeaderProps {
  breadcrumb?: string;
  userType?: 'student' | 'trainer' | 'mentor' | 'wing-admin' | 'umbrella-admin';
  actions?: React.ReactNode;
}

export default function Header({ breadcrumb = 'Home', userType, actions }: HeaderProps) {
  const { user, logout } = useAuth();
  const { navigate } = useNavigationWithLoading();

  // Use user data from context, fallback to prop
  const currentUserType = user?.role || userType || 'student';
  const userName = user?.name || 'User';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };
  return (
    <header className="bg-white px-4 lg:px-8 py-3 lg:py-5 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 text-sm">
          <button
            onClick={() => navigate('/dashboard/' + currentUserType)}
            className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-gray-900"
          >
            <Home className="w-5 h-5" />
          </button>
          <span className="text-gray-300 text-lg">›</span>
          <div className="px-4 py-1.5 bg-gray-50/80 rounded-full border border-gray-100/50">
            <span className="text-gray-500 font-medium text-xs tracking-tight">{breadcrumb}</span>
          </div>
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 lg:gap-6">
        {actions ? (
          actions
        ) : (
          <>
            {/* Chat & Notifications */}
            <div className="flex items-center gap-2 lg:gap-5">
              {/* Chat Icon with Badge */}
              <button
                onClick={() => navigate('/dashboard/' + currentUserType + '/chat')}
                className="relative w-11 h-11 flex items-center justify-center rounded-xl border border-gray-100 hover:bg-gray-50 transition-all group"
              >
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-red-100">
                  2
                </div>
                <svg
                  className="w-5 h-5 text-gray-500 group-hover:text-yellow-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>

              {/* Bell Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
            </div>

            {/* Profile */}
            <button
              onClick={() => navigate('/dashboard/' + currentUserType + '/profile')}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-50 shadow-sm hover:border-yellow-200 transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
          </>
        )}
      </div>
    </header>
  );
}