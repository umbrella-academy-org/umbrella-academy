'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { MessageSquare, AlertCircle, CheckCircle, Clock, Star, Search, MessageCircle, RefreshCw } from 'lucide-react';
import { useAdminContext } from '@/contexts';
import { useFeedback } from '@/hooks/admin';
import { FeedbackTicket } from '@/types/admin';

export default function UmbrellaAdminFeedbackSupportPage() {
  const { tickets, ticketsLoading, ticketsError, refreshTickets } = useAdminContext();
  const { updateTicketStatus, addAdminResponse } = useFeedback();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminResponse, setAdminResponse] = useState('');

  const filteredItems = tickets.filter(item => {
    const typeMatch = filterType === 'all' || item.type === filterType;
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || item.priority === filterPriority;
    const searchMatch = searchQuery === '' ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatch && statusMatch && priorityMatch && searchMatch;
  });

  const selectedItemData = tickets.find(item => item._id === selectedItem);

  const handleStatusUpdate = async (itemId: string, newStatus: FeedbackTicket['status']) => {
    await updateTicketStatus(itemId, newStatus);
    await refreshTickets();
  };

  const handleAddResponse = async (itemId: string) => {
    if (!adminResponse.trim()) return;
    await addAdminResponse(itemId, adminResponse);
    await refreshTickets();
    setAdminResponse('');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feedback': return 'bg-gray-100 text-gray-800';
      case 'support': return 'bg-gray-100 text-gray-800';
      case 'complaint': return 'bg-gray-100 text-gray-800';
      case 'suggestion': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-gray-100 text-gray-800';
      case 'resolved': return 'bg-gray-100 text-gray-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-gray-100 text-gray-800';
      case 'high': return 'bg-gray-100 text-gray-800';
      case 'urgent': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-gray-400 fill-current' : 'text-gray-200'}`} />
        ))}
      </div>
    );
  };

  // Calculate summary stats
  const totalItems = tickets.length;
  const openItems = tickets.filter(item => item.status === 'open').length;
  const urgentItems = tickets.filter(item => item.priority === 'urgent').length;
  const ratedTickets = tickets.filter(item => item.rating);
  const avgRating = ratedTickets.length > 0
    ? ratedTickets.reduce((sum, item) => sum + (item.rating || 0), 0) / ratedTickets.length
    : 0;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Feedback & Support" userType="admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Feedback & Support</h1>
              <p className="text-sm text-gray-500">Manage user feedback, support requests, and platform suggestions.</p>
            </div>

            {/* Error state */}
            {ticketsError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{ticketsError}</span>
                </div>
                <button
                  onClick={refreshTickets}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {ticketsLoading ? (
                <>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
                      <div className="h-8 bg-gray-200 rounded w-12" />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Items</p>
                        <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Open Items</p>
                        <p className="text-2xl font-bold text-gray-900">{openItems}</p>
                      </div>
                      <Clock className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Urgent Items</p>
                        <p className="text-2xl font-bold text-gray-900">{urgentItems}</p>
                      </div>
                      <AlertCircle className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                        <p className="text-2xl font-bold text-gray-900">{ratedTickets.length > 0 ? avgRating.toFixed(1) : '—'}</p>
                      </div>
                      <Star className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Items ({filteredItems.length})</h3>

                    {/* Search */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search items..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      />
                    </div>

                    {/* Filters */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        >
                          <option value="all">All Types</option>
                          <option value="feedback">Feedback</option>
                          <option value="support">Support</option>
                          <option value="complaint">Complaint</option>
                          <option value="suggestion">Suggestion</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        >
                          <option value="all">All Status</option>
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Priority</label>
                        <select
                          value={filterPriority}
                          onChange={(e) => setFilterPriority(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        >
                          <option value="all">All Priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {ticketsLoading ? (
                      [...Array(4)].map((_, i) => (
                        <div key={i} className="p-4 animate-pulse">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full" />
                            <div className="flex-1">
                              <div className="h-3 bg-gray-200 rounded w-24 mb-1" />
                              <div className="h-2 bg-gray-200 rounded w-16" />
                            </div>
                          </div>
                          <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                          <div className="h-2 bg-gray-200 rounded w-3/4" />
                        </div>
                      ))
                    ) : filteredItems.length === 0 ? (
                      <div className="p-8 text-center">
                        <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No items found</p>
                      </div>
                    ) : (
                      filteredItems.map((item) => (
                        <div
                          key={item._id}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedItem === item._id ? 'bg-gray-50 border-r-4 border-yellow-600' : ''}`}
                          onClick={() => setSelectedItem(item._id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                {item.subject.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 text-sm">{item.subject}</h4>
                                <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                          </div>

                          <p className="text-xs text-gray-600 line-clamp-2 mb-2">{item.message}</p>

                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(item.type)}`}>
                              {item.type}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                              <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Item Details */}
              <div className="lg:col-span-2">
                {selectedItemData ? (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {selectedItemData.subject.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900">{selectedItemData.subject}</h2>
                            <p className="text-gray-600 capitalize">{selectedItemData.category}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedItemData.type)}`}>
                                {selectedItemData.type.charAt(0).toUpperCase() + selectedItemData.type.slice(1)}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedItemData.priority)}`}>
                                {selectedItemData.priority.charAt(0).toUpperCase() + selectedItemData.priority.slice(1)} Priority
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedItemData.status === 'open' && (
                            <button
                              onClick={() => handleStatusUpdate(selectedItemData._id, 'in-progress')}
                              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                            >
                              <Clock className="w-4 h-4" />
                              Start Progress
                            </button>
                          )}
                          {selectedItemData.status === 'in-progress' && (
                            <button
                              onClick={() => handleStatusUpdate(selectedItemData._id, 'resolved')}
                              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark Resolved
                            </button>
                          )}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedItemData.status)}`}>
                            {selectedItemData.status.charAt(0).toUpperCase() + selectedItemData.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Category:</span> {selectedItemData.category}
                        </div>
                        <div>
                          <span className="font-medium">Submitted:</span> {formatDate(selectedItemData.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{selectedItemData.subject}</h3>
                        {selectedItemData.rating && (
                          <div className="flex items-center gap-2 mb-3">
                            {renderStars(selectedItemData.rating)}
                            <span className="text-sm text-gray-600">({selectedItemData.rating}/5)</span>
                          </div>
                        )}
                        <p className="text-gray-700 leading-relaxed">{selectedItemData.message}</p>
                      </div>

                      {/* Admin Response */}
                      <div className="border-t pt-6">
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                          <MessageCircle className="w-5 h-5 text-gray-500" />
                          Admin Response
                        </h3>
                        {selectedItemData.adminResponse ? (
                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                            <p className="text-gray-800">{selectedItemData.adminResponse}</p>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm mb-4">No response yet.</p>
                        )}

                        <div className="flex gap-3">
                          <textarea
                            value={adminResponse}
                            onChange={(e) => setAdminResponse(e.target.value)}
                            placeholder="Write your response..."
                            rows={3}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                          />
                          <button
                            onClick={() => handleAddResponse(selectedItemData._id)}
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                            disabled={!adminResponse.trim()}
                          >
                            Send Response
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <MessageSquare className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Item</h3>
                    <p className="text-gray-600">Choose a feedback or support item from the list to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
