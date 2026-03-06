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
    <div className=" border border-gray-100 flex items-center justify-between overflow-x-auto">
      <div className="flex items-center gap-1 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === tab.id
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-gray-500 hover:text-amber-900 hover:bg-gray-50'
              }`}
          >
            <div className="flex items-center gap-2">
              {tab.label}
              {tab.count && (
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${activeTab === tab.id ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="pr-4 hidden md:block">
        <p className="text-xs font-semibold text-gray-400    ">Session Status</p>
      </div>
    </div>

  );
}