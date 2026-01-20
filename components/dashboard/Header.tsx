'use client';

import { Home, Search, Grid3X3, Bell } from 'lucide-react';

interface HeaderProps {
  breadcrumb?: string;
  userType?: 'student' | 'trainer' | 'mentor';
  actions?: React.ReactNode;
}

export default function Header({ breadcrumb = 'Home', userType = 'student', actions }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm">
          <Home className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 truncate">{breadcrumb}</span>
        </nav>

        {/* Actions or Default Header Items */}
        {actions ? (
          <div className="flex items-center gap-2 lg:gap-4">
            {actions}
          </div>
        ) : (
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search - Hidden on mobile */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent focus:bg-white text-gray-900 placeholder:text-gray-500 text-sm"
              />
              <Search className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Search icon for mobile */}
            <button className="sm:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Grid3X3 className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Bell Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-orange-400 rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-white text-xs lg:text-sm font-medium">
                  {userType === 'trainer' ? 'J' : userType === 'mentor' ? 'M' : 'O'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}