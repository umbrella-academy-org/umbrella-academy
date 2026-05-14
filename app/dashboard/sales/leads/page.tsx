'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import {
  Users, Phone, Mail, Calendar, Search, Filter, Download,
  CheckCircle, XCircle, AlertCircle, UserCircle, Clock
} from 'lucide-react';
import { useAuth, useUsers } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { UserRole } from '@/types/user';

export default function SalesManagerLeadsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { students, isLoading: usersLoading } = useUsers();
  const { navigate } = useNavigationWithLoading();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'free' | 'paid'>('free');

  // Redirect if not authenticated or not a sales manager
  if (!authLoading && !isAuthenticated) {
    navigate('/auth/login');
  }

  if (!authLoading && user && user.role !== 'sales_manager') {
    const dashboardRoutes: Record<string, string> = {
      'student': '/dashboard/student',
      'trainer': '/dashboard/trainer',
      'admin': '/dashboard/admin',
      'guardian': '/dashboard/guardian',
    };
    navigate(dashboardRoutes[user.role] || '/');
  }

  const getFilteredLeads = () => {
    let filtered = students || [];
    
    // Filter by payment status
    if (statusFilter === 'free') {
      filtered = filtered.filter(s => !s.hasPaidOrientation);
    } else if (statusFilter === 'paid') {
      filtered = filtered.filter(s => s.hasPaidOrientation);
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.firstName.toLowerCase().includes(query) ||
        s.lastName.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.phoneNumber?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const filteredLeads = getFilteredLeads();
  const totalLeads = students?.filter(s => !s.hasPaidOrientation).length || 0;
  const paidStudents = students?.filter(s => s.hasPaidOrientation).length || 0;

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getAvatarColor = (hasPaid: boolean) => {
    return hasPaid ? 'bg-green-500' : 'bg-blue-500';
  };

  const StatusBadge = ({ hasPaid }: { hasPaid: boolean }) => {
    if (hasPaid) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-green-50 text-green-600 border border-green-100">
          <CheckCircle className="w-3 h-3 mr-1.5" />
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
        <Clock className="w-3 h-3 mr-1.5" />
        Free Lead
      </span>
    );
  };

  if (authLoading || usersLoading) {
    return (
      <div className="flex min-h-screen lg:h-screen bg-[#F8FAFC]">
        <Sidebar activeItem="Leads" userType={UserRole.SALES_MANAGER} />
        <div className="flex-1 flex flex-col">
          <div className="h-20 bg-white border-b border-slate-100 animate-pulse"></div>
          <div className="flex-1 p-8">
            <div className="h-12 w-64 bg-slate-100 rounded-xl animate-pulse mb-8"></div>
            <div className="bg-white rounded-[40px] border border-slate-100 p-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'sales_manager') {
    return null;
  }

  return (
    <div className="flex min-h-screen lg:h-screen bg-[#F8FAFC]">
      <Sidebar activeItem="Leads" userType={UserRole.SALES_MANAGER} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Sales Management</span>
                <span className="text-slate-300">•</span>
                <span className="text-[12px] font-medium text-slate-400 italic">Lead Directory</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Student Leads</h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
                <Download size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { label: 'Free Leads', value: totalLeads, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Converted', value: paidStudents, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                   <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                   </div>
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Content Container */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              
              {/* Search & Filter Header */}
              <div className="p-8 border-b border-slate-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Search */}
                  <div className="relative group flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search by name, email, or phone..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  {/* Filter */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl border-none">
                    <Filter size={16} className="text-slate-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === 'all' || v === 'free' || v === 'paid') {
                          setStatusFilter(v);
                        }
                      }}
                      className="bg-transparent border-none text-sm font-bold text-slate-600 focus:ring-0 cursor-pointer"
                    >
                      <option value="all">All Students</option>
                      <option value="free">Free Leads</option>
                      <option value="paid">Paid Students</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="overflow-x-auto">
                {filteredLeads.length === 0 ? (
                  <div className="p-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                      <Users size={40} className="text-slate-200" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Leads Found</h3>
                    <p className="text-slate-500 font-light">Adjust your search or filter criteria.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Student Identity</th>
                        <th className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Contact Details</th>
                        <th className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Registration Date</th>
                        <th className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredLeads.map((lead) => (
                        <tr key={lead._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                          <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-black/5 transition-transform group-hover:scale-110 ${getAvatarColor(lead.hasPaidOrientation)}`}>
                                {getInitials(lead.firstName, lead.lastName)}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                                  {lead.firstName} {lead.lastName}
                                </div>
                                <div className="text-[13px] text-slate-500 font-light">{lead.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-[13px] text-slate-600 font-medium">
                                <Phone size={14} className="text-slate-400" />
                                {lead.phoneNumber || 'N/A'}
                              </div>
                              <div className="flex items-center gap-2 text-[13px] text-slate-600 font-medium">
                                <Mail size={14} className="text-slate-400" />
                                {lead.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                            <div className="flex items-center gap-2 text-[13px] text-slate-600 font-medium">
                              <Calendar size={14} className="text-slate-400" />
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                            <StatusBadge hasPaid={lead.hasPaidOrientation} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Footer Info */}
              <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                 <p className="text-xs text-slate-400 font-medium italic">Showing {filteredLeads.length} of {students?.length || 0} total students</p>
              </div>
            </div>

            <div className="mt-12 text-center">
               <p className="text-slate-400 text-[11px] font-bold tracking-[0.3em] uppercase italic">© Dreamize Africa 2025 • Sales Lead Management</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
