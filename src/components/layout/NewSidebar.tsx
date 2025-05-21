
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { 
  User, Home, Wallet, FileText, Settings, Users, MessageSquare, 
  Bell, ChevronsLeft, ChevronsRight, File, CheckCircle, Mail
} from 'lucide-react';

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
                  "w-full justify-start gap-x-3 rounded-md p-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground",
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

interface NewSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const NewSidebar: React.FC<NewSidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { onExpand, onCollapse } = useSidebar();
  const { role } = useAuth();

  const handleToggleSidebar = () => {
    if (isCollapsed) {
      onExpand();
      setIsCollapsed(false);
    } else {
      onCollapse();
      setIsCollapsed(true);
    }
  };

  // Base navigation items for all users
  const baseNavigation = [
    { icon: Home, label: "الرئيسية", href: "/" },
    { icon: User, label: "ملفي الشخصي", href: "/profile" },
    { icon: Users, label: "مجموعاتي", href: "/my-groups" },
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
    { icon: Mail, label: "الدعم", href: "/support" },
    { icon: Settings, label: "الإعدادات", href: "/settings" },
  ];

  // Combine navigation items based on user role
  let navigation = [...baseNavigation];
  if (role && roleSpecificNavigation[role]) {
    navigation = [...navigation, ...roleSpecificNavigation[role]];
  }
  navigation = [...navigation, ...commonNavigation];

  return (
    <div className={`flex h-full border-r flex-col fixed z-[999] ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-background`}>
      <div className="px-4 py-6">
        <Link to="/">
          <div className="flex items-center font-semibold">
            {!isCollapsed && <img src="/logo.png" alt="Logo" className="h-8 mr-2" />}
            <span className="text-2xl">GPO</span>
          </div>
        </Link>
      </div>
      
      <ul className="mt-2 space-y-2 px-2 flex-1">
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
      
      <div className="mt-auto mb-4 px-4">
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
                <span>{isCollapsed ? "توسيع" : "طي"}</span>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default NewSidebar;
