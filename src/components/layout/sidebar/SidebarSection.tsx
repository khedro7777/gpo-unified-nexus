
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
      <SidebarGroupLabel className={isCollapsed ? 'sr-only' : `${colorClass} dark:text-gray-300 font-semibold text-sm`}>
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
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-sm font-medium' 
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
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
