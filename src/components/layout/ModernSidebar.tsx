
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
    <Sidebar className={`bg-white border-r border-gray-200 ${isCollapsed ? "w-16" : "w-64"}`} collapsible="icon">
      <div className="p-2 border-b border-gray-200">
        <SidebarTrigger className="mb-2 text-gray-600 hover:text-gray-900" />
        {!isCollapsed && (
          <div className="text-center py-2">
            <h2 className="text-lg font-bold text-gray-900">القائمة الرئيسية</h2>
            <p className="text-sm text-gray-500">GPO Smart Platform</p>
          </div>
        )}
      </div>
      
      <SidebarContent className="px-2 py-4 bg-white">
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
