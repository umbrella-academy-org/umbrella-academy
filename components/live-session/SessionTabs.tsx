'use client';

interface SessionTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SessionTabs({ activeTab, onTabChange }: SessionTabsProps) {
  const tabs = [
    { id: 'Upcoming', label: 'Upcoming', count: 5 },
    { id: 'Attended', label: 'Attended', count: null },
    { id: 'Cancelled', label: 'Cancelled', count: null },
    { id: 'Missed', label: 'Missed', count: null }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-yellow-600 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.label}
              {tab.count && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}