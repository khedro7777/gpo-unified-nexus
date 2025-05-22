
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
      "flex items-center w-full py-2 px-3 rounded-md transition-colors",
      isActive(path) 
        ? "bg-primary/10 text-primary font-medium" 
        : "hover:bg-muted text-muted-foreground hover:text-foreground"
    );
  };

  return (
    <Sidebar 
      className={cn(
        "fixed top-16 bottom-0 z-10 hidden md:flex flex-col border-l transition-all duration-300 bg-white",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent className="py-2 px-3">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className={getNavLinkClass("/")}>
                    <Home className="h-5 w-5 ml-2" />
                    {!isCollapsed && <span>الصفحة الرئيسية</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/groups" className={getNavLinkClass("/groups")}>
                    <Users className="h-5 w-5 ml-2" />
                    {!isCollapsed && <span>المجموعات</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/offers" className={getNavLinkClass("/offers")}>
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    {!isCollapsed && <span>العروض</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            الإدارة
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/governance" className={getNavLinkClass("/governance")}>
                    <FileText className="h-5 w-5 ml-2" />
                    {!isCollapsed && <span>الحوكمة</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dao" className={getNavLinkClass("/dao")}>
                    <Building className="h-5 w-5 ml-2" />
                    {!isCollapsed && <span>DAO</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/legal" className={getNavLinkClass("/legal")}>
                    <Gavel className="h-5 w-5 ml-2" />
                    {!isCollapsed && <span>القانونية</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/tools" className={getNavLinkClass("/tools")}>
                    <Wrench className="h-5 w-5 ml-2" />
                    {!isCollapsed && <span>الأدوات</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            المستخدم
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/wallet" className={getNavLinkClass("/wallet")}>
                    <Wallet className="h-5 w-5 ml-2" />
                    {!isCollapsed && <span>المحفظة</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/profile" className={getNavLinkClass("/profile")}>
                    <Settings className="h-5 w-5 ml-2" />
                    {!isCollapsed && <span>الإعدادات</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={logout} 
                    className="flex items-center w-full py-2 px-3 rounded-md transition-colors text-red-500 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5 ml-2" />
                    {!isCollapsed && <span>تسجيل الخروج</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default NewSidebar;
