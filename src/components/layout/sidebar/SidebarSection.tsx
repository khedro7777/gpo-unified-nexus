
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
          : `${colorClass} dark:text-gray-300 font-semibold text-sm px-2 py-1`
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
                          ? 'bg-primary text-primary-foreground shadow-sm font-medium dark:bg-primary dark:text-primary-foreground' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`
                  }
                  onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
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
