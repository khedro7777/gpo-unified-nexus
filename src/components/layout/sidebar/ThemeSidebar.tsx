
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import AccountSection from './AccountSection';
import BuyingGroupSection from './BuyingGroupSection';
import ServicesSection from './ServicesSection';
import GovernanceSection from './GovernanceSection';
import HelperToolsSection from './HelperToolsSection';
import { Button } from '@/components/ui/button';
import { Moon, Sun, User, LogOut } from 'lucide-react';

const ThemeSidebar = () => {
  const { state: sidebarState } = useSidebar();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const isCollapsed = sidebarState === 'collapsed';

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Sidebar className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <SidebarHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GPO</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">Smart Platform</span>
            </div>
          )}
          <SidebarTrigger className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        {user && (
          <>
            <AccountSection isCollapsed={isCollapsed} />
            <BuyingGroupSection isCollapsed={isCollapsed} />
            <ServicesSection isCollapsed={isCollapsed} />
            <GovernanceSection isCollapsed={isCollapsed} />
            <HelperToolsSection isCollapsed={isCollapsed} />
          </>
        )}
        
        {!user && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-600 dark:text-gray-300">
              {!isCollapsed ? 'Authentication' : ''}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/login" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <User className="h-4 w-4" />
                      {!isCollapsed && <span>تسجيل الدخول</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!isCollapsed && <span className="ml-2">{theme === 'dark' ? 'Light' : 'Dark'}</span>}
          </Button>
          
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout()}
              className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">خروج</span>}
            </Button>
          )}
        </div>
        
        {user && !isCollapsed && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 truncate">
            {user.email}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default ThemeSidebar;
