
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Home,
  Users,
  ShoppingCart,
  FileText,
  Building,
  Award,
  Gavel,
  Wrench,
  Wallet,
  Settings,
  LogOut,
  User,
  Bell,
  MessageSquare,
  Briefcase,
} from 'lucide-react';

interface NewSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const NewSidebar = ({ isCollapsed, setIsCollapsed }: NewSidebarProps) => {
  const location = useLocation();
  const { logout, role } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const getNavLinkClass = (path: string) => {
    return cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full text-right",
      isActive(path) 
        ? "bg-primary text-primary-foreground font-medium shadow-sm" 
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    );
  };

  const mainMenuItems = [
    { name: 'الصفحة الرئيسية', path: '/', icon: Home },
    { name: 'ملفي الشخصي', path: '/profile', icon: User },
    { name: 'مجموعاتي', path: '/groups', icon: Users },
    { name: 'العروض المرسلة/المستلمة', path: '/offers', icon: ShoppingCart },
    { name: 'وظائف المستقلين', path: '/freelance', icon: Briefcase },
    { name: 'المحفظة', path: '/wallet', icon: Wallet },
    { name: 'الفواتير', path: '/invoices', icon: FileText },
    { name: 'الإشعارات', path: '/notifications', icon: Bell },
  ];

  const systemMenuItems = [
    { name: 'نزاعات ORDA', path: '/disputes', icon: Gavel },
    { name: 'الدعم', path: '/support', icon: MessageSquare },
    { name: 'صندوق MCP', path: '/mcp', icon: Wrench },
    { name: 'وضع التنفيذ اليدوي', path: '/manual', icon: Settings },
  ];

  return (
    <Sidebar 
      className={cn(
        "fixed top-16 bottom-0 z-10 hidden md:flex flex-col border-r border-gray-200 transition-all duration-300 bg-white shadow-sm",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent className="py-4 px-2 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3",
            isCollapsed ? "sr-only" : ""
          )}>
            القائمة الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className={getNavLinkClass(item.path)}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm">{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3 mt-6",
            isCollapsed ? "sr-only" : ""
          )}>
            أدوات النظام
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {systemMenuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className={getNavLinkClass(item.path)}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm">{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button 
                  onClick={logout} 
                  className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full text-right text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm">تسجيل الخروج</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default NewSidebar;
