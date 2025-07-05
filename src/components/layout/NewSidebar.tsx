
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
  Factory,
  Building2,
  CheckCircle,
  Store,
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
      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full text-right",
      isActive(path) 
        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md" 
        : "text-gray-900 dark:text-gray-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-sm"
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

  const companyMenuItems = [
    { name: 'تأسيس الشركات', path: '/company-formation', icon: Factory },
    { name: 'إدارة الشركة', path: '/company-management', icon: Building2 },
    { name: 'الحوكمة والتصويت', path: '/governance', icon: Award },
    { name: 'إدارة DAO', path: '/dao', icon: Building },
  ];

  const systemMenuItems = [
    { name: 'بوابة الاستثمار', path: '/investment', icon: Building },
    { name: 'شبكة الموردين', path: '/suppliers', icon: Store },
    { name: 'نزاعات ORDA', path: '/disputes', icon: Gavel },
    { name: 'العقود', path: '/contracts', icon: FileText },
    { name: 'الدعم', path: '/support', icon: MessageSquare },
    { name: 'صندوق MCP', path: '/mcp', icon: Wrench },
    { name: 'الأدوات القانونية', path: '/legal', icon: FileText },
    { name: 'أدوات التكامل', path: '/tools', icon: Settings },
  ];

  return (
    <Sidebar 
      className={cn(
        "fixed top-16 bottom-0 z-10 hidden md:flex flex-col border-r border-gray-200 dark:border-gray-700 transition-all duration-300 bg-white dark:bg-gray-900 shadow-lg",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent className="py-4 px-2 bg-white dark:bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-xs font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-3 px-3",
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
                      {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-xs font-semibold text-purple-900 dark:text-purple-300 uppercase tracking-wider mb-3 px-3 mt-6",
            isCollapsed ? "sr-only" : ""
          )}>
            إدارة الشركات
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {companyMenuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className={getNavLinkClass(item.path)}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-xs font-semibold text-teal-900 dark:text-teal-300 uppercase tracking-wider mb-3 px-3 mt-6",
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
                      {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-600">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button 
                  onClick={logout} 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full text-right text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 hover:text-red-700 dark:hover:text-red-300 hover:shadow-sm"
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">تسجيل الخروج</span>}
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
