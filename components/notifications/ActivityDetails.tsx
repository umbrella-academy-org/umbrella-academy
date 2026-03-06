'use client';

import { Bell, Download, FileText } from 'lucide-react';

interface ActivityDetailsProps {
  selectedActivity: string | null;
}

export default function ActivityDetails({ selectedActivity }: ActivityDetailsProps) {
  if (!selectedActivity) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 h-fit">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-amber-900 mb-2">Activity Details</h3>
          <p className="text-sm text-gray-600">Select an activity on the left panel and view it's details below.</p>
        </div>
      </div>
    );
  }

  // Mock activity details based on selected activity
  const getActivityDetails = () => {
    switch (selectedActivity) {
      case '1':
      case '2':
        return {
          user: 'Phoenix Baker',
          action: 'Added a file to Introduction To JavaScript',
          file: {
            name: 'Tech requirements.pdf',
            size: '720 KB',
            type: 'PDF'
          }
        };
      default:
        return {
          user: 'Phoenix Baker',
          action: 'Added a file to Introduction To JavaScript',
          file: {
            name: 'Tech requirements.pdf',
            size: '720 KB',
            type: 'PDF'
          }
        };
    }
  };

  const details = getActivityDetails();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 h-fit">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">PB</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-amber-900">{details.user}</h3>
          <p className="text-sm text-gray-600">just now</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-amber-900 mb-4">{details.action}</p>
      </div>

      {/* File Details */}
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-amber-900">{details.file.name}</h4>
              <p className="text-xs text-gray-500">{details.file.size}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-amber-900 font-medium">
          All course files
          <span className="text-gray-400">→</span>
        </button>
        
        <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}