'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { MessageSquare, AlertCircle, CheckCircle, Clock, User, Star, Filter, Search, Eye, MessageCircle } from 'lucide-react';

interface FeedbackItem {
  id: string;
  type: 'feedback' | 'support' | 'complaint' | 'suggestion';
  userId: string;
  userName: string;
  userRole: 'student' | 'trainer' | 'mentor' | 'field-admin';
  userAvatar: string;
  subject: string;
  message: string;
  rating?: number;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  submittedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  adminResponse?: string;
  attachments?: string[];
}

export default function UmbrellaAdminFeedbackSupportPage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminResponse, setAdminResponse] = useState('');

  const feedbackItems: FeedbackItem[] = [
    {
      id: 'fb-1',
      type: 'feedback',
      userId: 'user-1',
      userName: 'Alice Johnson',
      userRole: 'student',
      userAvatar: 'AJ',
      subject: 'Excellent Training Experience',
      message: 'I wanted to share my positive experience with the Full Stack Development program. My trainer Sarah was incredibly knowledgeable and patient. The curriculum was well-structured and the hands-on projects really helped me understand the concepts. The video call quality was excellent and the platform is very user-friendly.',
      rating: 5,
      category: 'Training Quality',
      priority: 'low',
      status: 'resolved',
      submittedAt: '2024-01-28T14:30:00Z',
      resolvedAt: '2024-01-29T09:15:00Z',
      assignedTo: 'Admin Team',
      adminResponse: 'Thank you for your wonderful feedback! We\'re thrilled to hear about your positive experience with Sarah and our program. We\'ll share your comments with the team.'
    },
    {
      id: 'fb-2',
      type: 'support',
      userId: 'user-2',
      userName: 'Bob Smith',
      userRole: 'trainer',
      userAvatar: 'BS',
      subject: 'Technical Issue with Video Calls',
      message: 'I\'ve been experiencing frequent disconnections during live sessions with my students. This has happened 3 times this week, affecting the quality of training. The issue seems to occur after about 45 minutes into the session. My internet connection is stable, so I suspect it might be a platform issue.',
      category: 'Technical Support',
      priority: 'high',
      status: 'in-progress',
      submittedAt: '2024-01-29T10:45:00Z',
      assignedTo: 'Technical Team'
    },
    {
      id: 'fb-3',
      type: 'complaint',
      userId: 'user-3',
      userName: 'Carol Davis',
      userRole: 'student',
      userAvatar: 'CD',
      subject: 'Trainer Availability Issues',
      message: 'My assigned trainer has cancelled our last 2 sessions with very short notice (less than 2 hours). This is affecting my learning progress and I\'m falling behind on my roadmap. I understand emergencies happen, but this is becoming a pattern. I would like to request a different trainer or at least better communication.',
      category: 'Service Quality',
      priority: 'medium',
      status: 'open',
      submittedAt: '2024-01-29T16:20:00Z'
    },
    {
      id: 'fb-4',
      type: 'suggestion',
      userId: 'user-4',
      userName: 'Dr. Emily Rodriguez',
      userRole: 'mentor',
      userAvatar: 'ER',
      subject: 'Mobile App for Better Accessibility',
      message: 'I suggest developing a mobile application for the platform. Many of our students and trainers are often on the go, and having mobile access would greatly improve engagement. Features could include session scheduling, progress tracking, and basic communication tools.',
      category: 'Platform Enhancement',
      priority: 'low',
      status: 'open',
      submittedAt: '2024-01-28T11:15:00Z'
    },
    {
      id: 'fb-5',
      type: 'support',
      userId: 'user-5',
      userName: 'James Wilson',
      userRole: 'field-admin',
      userAvatar: 'JW',
      subject: 'Mentor Report Export Issues',
      message: 'I\'m unable to export mentor reports to PDF format. The export button appears to work but no file is generated. This is affecting my ability to share reports with upper management. I\'ve tried different browsers with the same result.',
      category: 'Technical Support',
      priority: 'medium',
      status: 'open',
      submittedAt: '2024-01-29T13:30:00Z'
    },
    {
      id: 'fb-6',
      type: 'feedback',
      userId: 'user-6',
      userName: 'Maria Garcia',
      userRole: 'trainer',
      userAvatar: 'MG',
      subject: 'Great Platform Features',
      message: 'I love the new report generation feature! It makes documenting student progress so much easier. The templates are comprehensive and the submission process is smooth. This has saved me hours of work each week.',
      rating: 4,
      category: 'Platform Features',
      priority: 'low',
      status: 'resolved',
      submittedAt: '2024-01-27T09:45:00Z',
      resolvedAt: '2024-01-27T14:20:00Z',
      adminResponse: 'We\'re so glad you\'re finding the report generation feature helpful! Your feedback motivates us to continue improving our platform.'
    }
  ];

  const filteredItems = feedbackItems.filter(item => {
    const typeMatch = filterType === 'all' || item.type === filterType;
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || item.priority === filterPriority;
    const searchMatch = searchQuery === '' ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatch && statusMatch && priorityMatch && searchMatch;
  });

  const selectedItemData = feedbackItems.find(item => item.id === selectedItem);

  const handleStatusUpdate = (itemId: string, newStatus: 'in-progress' | 'resolved' | 'closed') => {
    console.log(`Updating item ${itemId} status to ${newStatus}`);
    // Handle status update logic
  };

  const handleAssignTo = (itemId: string, assignee: string) => {
    console.log(`Assigning item ${itemId} to ${assignee}`);
    // Handle assignment logic
  };

  const handleAddResponse = (itemId: string) => {
    console.log(`Adding response to item ${itemId}:`, adminResponse);
    // Handle adding admin response
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-gray-500';
      case 'trainer': return 'bg-gray-500';
      case 'mentor': return 'bg-gray-500';
      case 'field-admin': return 'bg-gray-500';
      default: return 'bg-gray-500';
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
  const totalItems = feedbackItems.length;
  const openItems = feedbackItems.filter(item => item.status === 'open').length;
  const urgentItems = feedbackItems.filter(item => item.priority === 'urgent').length;
  const avgRating = feedbackItems
    .filter(item => item.rating)
    .reduce((sum, item) => sum + (item.rating || 0), 0) /
    feedbackItems.filter(item => item.rating).length;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Feedback & Support" userType="umbrella-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Feedback & Support</h1>
              <p className="text-sm text-gray-500">Manage user feedback, support requests, and platform suggestions.</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                    <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
                  </div>
                  <Star className="w-8 h-8 text-gray-500" />
                </div>
              </div>
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
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      />
                    </div>

                    {/* Filters */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedItem === item.id ? 'bg-gray-50 border-r-4 border-gray-600' : ''
                          }`}
                        onClick={() => setSelectedItem(item.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 ${getRoleColor(item.userRole)} rounded-full flex items-center justify-center text-white font-semibold text-xs`}>
                              {item.userAvatar}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">{item.userName}</h4>
                              <p className="text-xs text-gray-500 capitalize">{item.userRole}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                        </div>

                        <h5 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">{item.subject}</h5>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{item.message}</p>

                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                            <span className="text-xs text-gray-500">{formatDate(item.submittedAt)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
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
                          <div className={`w-12 h-12 ${getRoleColor(selectedItemData.userRole)} rounded-full flex items-center justify-center text-white font-semibold`}>
                            {selectedItemData.userAvatar}
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900">{selectedItemData.userName}</h2>
                            <p className="text-gray-600 capitalize">{selectedItemData.userRole}</p>
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
                              onClick={() => handleStatusUpdate(selectedItemData.id, 'in-progress')}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                            >
                              <Clock className="w-4 h-4" />
                              Start Progress
                            </button>
                          )}
                          {selectedItemData.status === 'in-progress' && (
                            <button
                              onClick={() => handleStatusUpdate(selectedItemData.id, 'resolved')}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
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
                          <span className="font-medium">Submitted:</span> {formatDate(selectedItemData.submittedAt)}
                        </div>
                        {selectedItemData.assignedTo && (
                          <div>
                            <span className="font-medium">Assigned to:</span> {selectedItemData.assignedTo}
                          </div>
                        )}
                        {selectedItemData.resolvedAt && (
                          <div>
                            <span className="font-medium">Resolved:</span> {formatDate(selectedItemData.resolvedAt)}
                          </div>
                        )}
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
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                          />
                          <button
                            onClick={() => handleAddResponse(selectedItemData.id)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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