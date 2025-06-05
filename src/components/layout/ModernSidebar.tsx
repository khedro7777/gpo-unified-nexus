
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { 
  Home, 
  Users, 
  Briefcase, 
  FileText, 
  Wallet, 
  Bell, 
  Gavel, 
  Settings, 
  MessageSquare,
  Building,
  BarChart3,
  ShoppingCart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ModernSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isCollapsed = state === 'collapsed';
  
  const mainItems = [
    { 
      title: isRTL ? 'لوحة التحكم' : 'Dashboard', 
      url: '/dashboard', 
      icon: Home 
    },
    { 
      title: isRTL ? 'مجموعاتي' : 'My Groups', 
      url: '/my-groups', 
      icon: Users 
    },
    { 
      title: isRTL ? 'العروض' : 'Offers', 
      url: '/offers', 
      icon: Briefcase 
    },
    { 
      title: isRTL ? 'الأعمال الحرة' : 'Freelance', 
      url: '/freelance', 
      icon: FileText 
    },
    { 
      title: isRTL ? 'المحفظة' : 'Wallet', 
      url: '/wallet', 
      icon: Wallet 
    },
    { 
      title: isRTL ? 'الفواتير' : 'Invoices', 
      url: '/invoices', 
      icon: FileText 
    },
    { 
      title: isRTL ? 'الإشعارات' : 'Notifications', 
      url: '/notifications', 
      icon: Bell 
    }
  ];

  const servicesItems = [
    { 
      title: isRTL ? 'تحكيم النزاعات' : 'Arbitration', 
      url: '/arbitration', 
      icon: Gavel 
    },
    { 
      title: isRTL ? 'الدعم' : 'Support', 
      url: '/support', 
      icon: MessageSquare 
    },
    { 
      title: isRTL ? 'صندوق MCP' : 'MCP Box', 
      url: '/mcp', 
      icon: Settings 
    }
  ];

  const smartGateways = [
    { 
      title: isRTL ? 'الشراء التعاوني' : 'Group Buying', 
      url: '/create-group/purchasing', 
      icon: ShoppingCart 
    },
    { 
      title: isRTL ? 'التسويق الجماعي' : 'Marketing', 
      url: '/create-group/marketing', 
      icon: BarChart3 
    },
    { 
      title: isRTL ? 'تأسيس الشركات' : 'Company Formation', 
      url: '/company-incorporation', 
      icon: Building 
    }
  ];

  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <div className="p-2">
        <SidebarTrigger className="mb-4" />
      </div>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            {isRTL ? 'الرئيسية' : 'Main'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            {isRTL ? 'البوابات الذكية' : 'Smart Gateways'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {smartGateways.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            {isRTL ? 'الخدمات' : 'Services'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {servicesItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ModernSidebar;
