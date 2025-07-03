
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import BuyingGroupSection from './sidebar/BuyingGroupSection';
import AccountSection from './sidebar/AccountSection';
import ServicesSection from './sidebar/ServicesSection';
import GovernanceSection from './sidebar/GovernanceSection';
import HelperToolsSection from './sidebar/HelperToolsSection';

const ModernSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  
  return (
    <Sidebar className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${isCollapsed ? "w-16" : "w-64"}`} collapsible="icon">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
        <SidebarTrigger className="mb-2 text-white hover:bg-white/20 hover:text-white" />
        {!isCollapsed && (
          <div className="text-center py-2">
            <h2 className="text-lg font-bold text-white">القائمة الرئيسية</h2>
            <p className="text-sm text-blue-100">GPO Smart Platform</p>
          </div>
        )}
      </div>
      
      <SidebarContent className="px-2 py-4 bg-white dark:bg-gray-900">
        <BuyingGroupSection isCollapsed={isCollapsed} />
        <AccountSection isCollapsed={isCollapsed} />
        <ServicesSection isCollapsed={isCollapsed} />
        <GovernanceSection isCollapsed={isCollapsed} />
        <HelperToolsSection isCollapsed={isCollapsed} />
      </SidebarContent>
    </Sidebar>
  );
};

export default ModernSidebar;
