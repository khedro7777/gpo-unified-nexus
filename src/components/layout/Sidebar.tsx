
import React from 'react';
import { Home, LayoutDashboard, Settings, Users, Wallet, ScrollText, Scale, Brain, ChevronsLeft, ChevronsRight, Building, Network } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isCollapsed: boolean;
}

const NavItem = ({ icon: Icon, label, href, isCollapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li>
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger asChild>
            <Link to={href}>
              <Button 
                variant="ghost" 
                className={cn(
                  "justify-start gap-x-3 rounded-md p-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground",
                  isCollapsed && "w-9 h-9 p-0 justify-center"
                )}
              >
                <Icon className="h-4 w-4" />
                {!isCollapsed && <span>{label}</span>}
              </Button>
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right" align="center">
              <p className="font-semibold size-2">{label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </li>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const { onExpand, onCollapse } = useSidebar();

  const handleToggleSidebar = () => {
    if (isCollapsed) {
      onExpand();
      setIsCollapsed(false);
    } else {
      onCollapse();
      setIsCollapsed(true);
    }
  };

  const navigation = [
    { icon: Home, label: "الرئيسية", href: "/" },
    { icon: LayoutDashboard, label: "نظرة عامة", href: "/dashboard" },
    { icon: Users, label: "المجموعات", href: "/groups" },
    { icon: Wallet, label: "المحفظة", href: "/wallet" },
    { icon: ScrollText, label: "الخدمات", href: "/services" },
    { icon: Scale, label: "القانون", href: "/legal" },
    { icon: Brain, label: "الأدوات", href: "/tools" },
    { icon: Building, label: "منظمة DAO", href: "/dao" },
    { icon: Network, label: "الحوكمة", href: "/governance" },
    { icon: Settings, label: "الإعدادات", href: "/settings" }
  ];

  return (
    <div className={`flex h-full border-r flex-col fixed z-[999] ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <div className="px-4 py-6">
        <Link to="/">
          <div className="flex items-center font-semibold">
            {!isCollapsed && <img src="/logo.png" alt="Logo" className="h-8 mr-2" />}
            <span className="text-2xl">GPO</span>
          </div>
        </Link>
      </div>
      <ul className="mt-2">
        {navigation.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </ul>
      <div className="mt-auto mb-2 px-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleToggleSidebar} 
                variant="ghost" 
                size="sm" 
                className="w-full justify-center"
              >
                {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <span>Expand</span>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
