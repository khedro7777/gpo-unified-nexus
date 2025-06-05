
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';

interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface SidebarSectionProps {
  title: string;
  items: SidebarItem[];
  isCollapsed: boolean;
  colorClass: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ 
  title, 
  items, 
  isCollapsed, 
  colorClass 
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={isCollapsed ? 'sr-only' : `${colorClass} font-semibold`}>
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink 
                  to={item.url} 
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive 
                        ? `bg-${colorClass.split('-')[1]}-100 text-${colorClass.split('-')[1]}-700 shadow-sm` 
                        : 'hover:bg-muted'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm">{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarSection;
