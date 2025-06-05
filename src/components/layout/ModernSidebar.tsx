
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
  User,
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
  ShoppingCart,
  HelpCircle,
  Terminal,
  Wrench
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ModernSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isCollapsed = state === 'collapsed';
  
  const clientDashboardItems = [
    { 
      title: isRTL ? 'ملفي الشخصي' : 'My Profile', 
      url: '/profile', 
      icon: User 
    },
    { 
      title: isRTL ? 'مجموعاتي' : 'My Groups', 
      url: '/my-groups', 
      icon: Users 
    },
    { 
      title: isRTL ? 'العروض المرسلة/المستلمة' : 'Offers Sent/Received', 
      url: '/offers', 
      icon: Briefcase 
    },
    { 
      title: isRTL ? 'وظائف المستقلين' : 'Freelance Jobs', 
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
    },
    { 
      title: isRTL ? 'نزاعات ORDA' : 'ORDA Disputes', 
      url: '/arbitration', 
      icon: Gavel 
    },
    { 
      title: isRTL ? 'الدعم' : 'Support', 
      url: '/support', 
      icon: HelpCircle 
    },
    { 
      title: isRTL ? 'صندوق MCP' : 'MCP Prompt Box', 
      url: '/mcp', 
      icon: MessageSquare 
    },
    { 
      title: isRTL ? 'وضع التنفيذ اليدوي' : 'Manual Execution Mode', 
      url: '/manual-mode', 
      icon: Wrench 
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
      title: isRTL ? 'المستقلون' : 'Freelancers', 
      url: '/freelance', 
      icon: Users 
    },
    { 
      title: isRTL ? 'تأسيس الشركات' : 'Entity Formation', 
      url: '/company-incorporation', 
      icon: Building 
    }
  ];

  const systemServices = [
    { 
      title: isRTL ? 'لوميو للتصويت' : 'Loomio Voting', 
      url: '/loomio', 
      icon: Users 
    },
    { 
      title: isRTL ? 'حوكمة Snapshot' : 'Snapshot Governance', 
      url: '/governance', 
      icon: Settings 
    },
    { 
      title: isRTL ? 'OpenZeppelin Governor' : 'OpenZeppelin Governor', 
      url: '/openzeppelin', 
      icon: Building 
    },
    { 
      title: isRTL ? 'إدارة المحتوى Strapi' : 'Strapi CMS', 
      url: '/admin-access', 
      icon: Terminal 
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
            {isRTL ? 'منطقة العميل' : 'Client Dashboard'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {clientDashboardItems.map((item) => (
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
            {isRTL ? 'الأنظمة المدمجة' : 'Integrated Systems'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemServices.map((item) => (
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
