'use client';

import { Home, Search, Grid3X3, Bell } from 'lucide-react';

interface HeaderProps {
  breadcrumb?: string;
}

export default function Header({ breadcrumb = 'Home' }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm">
          <Home className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{breadcrumb}</span>
        </nav>

        {/* Right side - Search, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent focus:bg-white text-gray-900 placeholder:text-gray-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Grid3X3 className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Bell Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-6 h-6" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-400 rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-white text-sm font-medium">J</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}