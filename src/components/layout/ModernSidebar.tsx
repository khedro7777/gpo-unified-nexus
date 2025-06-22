
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
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <div className="p-2">
        <SidebarTrigger className="mb-4" />
      </div>
      
      <SidebarContent className="px-2">
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
