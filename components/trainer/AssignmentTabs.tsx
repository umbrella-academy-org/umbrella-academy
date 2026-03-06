'use client';

interface AssignmentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AssignmentTabs({ activeTab, onTabChange }: AssignmentTabsProps) {
  const tabs = [
    { id: 'pending', label: 'Pending Review', count: 8, color: 'text-gray-600 bg-gray-100' },
    { id: 'completed', label: 'Completed', count: 24, color: 'text-gray-600 bg-gray-100' },
    { id: 'overdue', label: 'Overdue', count: 3, color: 'text-gray-600 bg-gray-100' },
    { id: 'draft', label: 'Draft', count: 5, color: 'text-gray-600 bg-gray-100' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-yellow-600 text-gray-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tab.label}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${tab.color}`}>
                  {tab.count}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Actions */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
              <option>All Courses</option>
              <option>Advanced React</option>
              <option>JavaScript Fundamentals</option>
              <option>Node.js Backend</option>
            </select>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
              <option>Sort by Due Date</option>
              <option>Sort by Submission Date</option>
              <option>Sort by Student Name</option>
              <option>Sort by Grade</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search assignments..."
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}