
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabSystemProps {
  tabs: Tab[];
  onCloseTab?: (id: string) => void;
  onAddTab?: () => void;
}

const TabSystem: React.FC<TabSystemProps> = ({ 
  tabs, 
  onCloseTab = () => {}, 
  onAddTab = () => {} 
}) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "flex items-center px-4 py-2 border-r border-border cursor-pointer group",
              activeTabId === tab.id 
                ? "bg-background" 
                : "bg-muted/30 hover:bg-muted/50"
            )}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            <span className="text-sm">{tab.title}</span>
            <button 
              className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-muted/70 rounded-full p-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button 
          className="px-3 py-2 border-r border-border bg-muted/30 hover:bg-muted/50 text-sm"
          onClick={onAddTab}
        >
          +
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {tabs.find(tab => tab.id === activeTabId)?.content || (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No tabs open
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSystem;
