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
    <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${activeTab === tab.id
                ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/20'
                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <div className="flex items-center gap-2">
              {tab.label}
              {tab.count && (
                <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold ${activeTab === tab.id ? 'bg-yellow-700 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="pr-4 hidden md:block">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-none">Session Status</p>
      </div>
    </div>

  );
}