
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { 
  User, Home, Wallet, FileText, Settings, Users, MessageSquare, 
  Bell, ChevronsLeft, ChevronsRight, File, CheckCircle, Mail,
  LayoutDashboard, Scale, Brain, Building, Network
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const NavItem = ({ icon: Icon, label, href, isActive }: NavItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
        <Link to={href} className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

interface NewSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const NewSidebar: React.FC<NewSidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const { role } = useAuth();
  const { toggleSidebar } = useSidebar();

  const handleToggleSidebar = () => {
    toggleSidebar();
    setIsCollapsed(!isCollapsed);
  };

  // Base navigation items for all users
  const baseNavigation = [
    { icon: Home, label: "الرئيسية", href: "/" },
    { icon: User, label: "ملفي الشخصي", href: "/profile" },
    { icon: Users, label: "مجموعاتي", href: "/my-groups" },
    { icon: LayoutDashboard, label: "نظرة عامة", href: "/dashboard" },
  ];

  // Role specific navigation items
  const roleSpecificNavigation = {
    freelancer: [
      { icon: FileText, label: "وظائفي", href: "/my-jobs" },
    ],
    buyer: [
      { icon: CheckCircle, label: "العروض المستلمة", href: "/received-offers" },
    ],
    supplier: [
      { icon: File, label: "العروض المرسلة", href: "/sent-offers" },
    ],
    founder: [
      { icon: CheckCircle, label: "طلبات التأسيس", href: "/formation-requests" },
    ],
  };

  // Common navigation items for all authenticated users
  const commonNavigation = [
    { icon: Wallet, label: "المحفظة", href: "/wallet" },
    { icon: FileText, label: "الفواتير", href: "/invoices" },
    { icon: Bell, label: "الإشعارات", href: "/notifications" },
    { icon: MessageSquare, label: "نزاعات ORDA", href: "/disputes" },
    { icon: Scale, label: "القانون", href: "/legal" },
    { icon: Brain, label: "الأدوات", href: "/tools" },
    { icon: Building, label: "منظمة DAO", href: "/dao" },
    { icon: Network, label: "الحوكمة", href: "/governance" },
    { icon: Mail, label: "الدعم", href: "/support" },
    { icon: Settings, label: "الإعدادات", href: "/settings" },
  ];

  // Combine navigation items based on user role
  let navigationItems = [...baseNavigation];
  if (role && roleSpecificNavigation[role]) {
    navigationItems = [...navigationItems, ...roleSpecificNavigation[role]];
  }
  navigationItems = [...navigationItems, ...commonNavigation];

  return (
    <Sidebar
      className={cn("transition-all duration-300", isCollapsed ? "w-16" : "w-64")}
      collapsible={isCollapsed ? "icon" : "none"}
    >
      <SidebarHeader className="py-4">
        <Link to="/" className="flex items-center justify-center gap-2">
          {!isCollapsed && <img src="/logo.png" alt="Logo" className="h-8" />}
          <span className={cn("text-2xl font-bold", isCollapsed && "hidden")}>GPO</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarMenu>
          {navigationItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <Button 
          onClick={handleToggleSidebar} 
          variant="ghost" 
          size="sm" 
          className="w-full justify-center"
        >
          {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default NewSidebar;
