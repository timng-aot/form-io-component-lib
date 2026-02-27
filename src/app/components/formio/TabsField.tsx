import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsFieldProps {
  tabs: Tab[];
}

export function TabsField({ tabs }: TabsFieldProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Tab bar with gray background */}
      <div className="flex bg-muted px-1 pt-1">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              idx === activeIndex
                ? 'bg-white text-foreground rounded-t-md'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Content area */}
      <div className="border-t bg-white p-4">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
}
