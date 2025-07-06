
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
  badge?: string | number;
  disabled?: boolean;
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
      <SidebarGroupLabel className={
        isCollapsed 
          ? 'sr-only' 
          : `${colorClass} text-sm px-2 py-1 mb-2`
      }>
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild disabled={item.disabled}>
                <NavLink 
                  to={item.url} 
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm relative ${
                      item.disabled 
                        ? 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600'
                        : isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md font-semibold' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-sm'
                    }`
                  }
                  onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2 font-medium">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
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
