'use client';

import { MoreHorizontal, FileText, Video } from 'lucide-react';

interface ActivityFeedProps {
  searchQuery: string;
  selectedActivity: string | null;
  onActivitySelect: (activityId: string) => void;
}

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  action: string;
  target: string;
  time: string;
  type: 'file' | 'video' | 'comment' | 'invite';
  fileSize?: string;
  isOnline?: boolean;
}

export default function ActivityFeed({ searchQuery, selectedActivity, onActivitySelect }: ActivityFeedProps) {
  const activities: Activity[] = [
    {
      id: '1',
      user: { name: 'Phoenix Baker', avatar: '', initials: 'PB' },
      action: 'Added a file to',
      target: 'Introduction To JavaScript',
      time: 'just now',
      type: 'file',
      isOnline: true
    },
    {
      id: '2',
      user: { name: 'Phoenix Baker', avatar: '', initials: 'PB' },
      action: 'Added a file to',
      target: 'Introduction To JavaScript',
      time: 'just now',
      type: 'file',
      fileSize: '720 KB',
      isOnline: true
    },
    {
      id: '3',
      user: { name: 'Lana Steiner', avatar: '', initials: 'LS' },
      action: 'Invited Alicia Hester to the team',
      target: '',
      time: '2 mins ago',
      type: 'invite',
      isOnline: true
    },
    {
      id: '4',
      user: { name: 'Demi Wilkinson', avatar: '', initials: 'DW' },
      action: 'Invited Alicia Hester to the team',
      target: '',
      time: '2 mins ago',
      type: 'invite',
      isOnline: true
    },
    {
      id: '5',
      user: { name: 'Candice Wu', avatar: '', initials: 'CW' },
      action: 'Commented in',
      target: 'Marketing site redesign',
      time: '3 hours ago',
      type: 'comment',
      isOnline: true
    },
    {
      id: '6',
      user: { name: 'Candice Wu', avatar: '', initials: 'CW' },
      action: 'Was added to',
      target: 'Marketing site redesign',
      time: '3 hours ago',
      type: 'comment',
      isOnline: true
    },
    {
      id: '7',
      user: { name: 'Drew Cano', avatar: '', initials: 'DC' },
      action: 'Created the project',
      target: 'Marketing site redesign',
      time: '12 hours ago',
      type: 'comment',
      isOnline: true
    },
    {
      id: '8',
      user: { name: 'Koray Okumus', avatar: '', initials: 'KO' },
      action: 'Sent you a file',
      target: '',
      time: '4:15pm 20 Jan 2023',
      type: 'video',
      fileSize: '6.5 MB',
      isOnline: true
    },
    {
      id: '9',
      user: { name: 'Koray Okumus', avatar: '', initials: 'KO' },
      action: 'Sent you a message',
      target: '',
      time: '4:15pm 20 Jan 2023',
      type: 'comment',
      isOnline: true
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'file':
        return <FileText className="w-4 h-4 text-gray-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getFileTypeColor = (type: Activity['type']) => {
    switch (type) {
      case 'file':
        return 'bg-gray-100 text-gray-700';
      case 'video':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent activity</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              selectedActivity === activity.id ? 'bg-gray-50 border border-gray-200' : 'hover:bg-gray-50'
            }`}
            onClick={() => onActivitySelect(activity.id)}
          >
            {/* User Avatar */}
            <div className="relative">
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">{activity.user.initials}</span>
              </div>
              {activity.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-gray-600 ml-1">{activity.action}</span>
                    {activity.target && (
                      <span className="text-gray-600 ml-1 font-medium">{activity.target}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>

                  {/* File attachment */}
                  {(activity.type === 'file' || activity.type === 'video') && activity.fileSize && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getFileTypeColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                        {activity.type === 'file' ? 'Tech requirements.pdf' : 'Prototype draft 03.mp4'}
                      </div>
                      <span className="text-xs text-gray-500">{activity.fileSize}</span>
                    </div>
                  )}

                  {/* Message preview for Koray's message */}
                  {activity.id === '9' && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                      <span className="text-gray-600">@olivia</span> This is starting to look really good!
                      <br />I'll polish it up a bit and send it.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}