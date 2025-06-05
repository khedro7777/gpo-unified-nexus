
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
  ShoppingCart,
  Package,
  TrendingUp,
  FileText, 
  Wallet, 
  Bell, 
  Gavel, 
  Settings, 
  MessageSquare,
  Building,
  BarChart3,
  Factory,
  HelpCircle,
  Terminal,
  Wrench,
  Heart,
  Star,
  CheckCircle,
  Calendar,
  CreditCard,
  FileCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ModernSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isCollapsed = state === 'collapsed';
  
  // الشراء التعاوني - Cooperative Buying
  const buyingGroupItems = [
    { 
      title: isRTL ? 'مجموعات الشراء النشطة' : 'Active Buying Groups', 
      url: '/groups', 
      icon: ShoppingCart 
    },
    { 
      title: isRTL ? 'إنشاء مجموعة شراء' : 'Create Buying Group', 
      url: '/create-group/purchasing', 
      icon: Package 
    },
    { 
      title: isRTL ? 'طلبات التسعير' : 'Price Requests', 
      url: '/price-requests', 
      icon: TrendingUp 
    },
    { 
      title: isRTL ? 'عروض الموردين' : 'Supplier Offers', 
      url: '/supplier-offers', 
      icon: FileCheck 
    },
    { 
      title: isRTL ? 'المفاوضات الجماعية' : 'Group Negotiations', 
      url: '/negotiations', 
      icon: Users 
    }
  ];

  // إدارة حسابي - My Account Management
  const accountItems = [
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
      title: isRTL ? 'المحفظة والمدفوعات' : 'Wallet & Payments', 
      url: '/wallet', 
      icon: Wallet 
    },
    { 
      title: isRTL ? 'الاشتراكات' : 'Subscriptions', 
      url: '/subscriptions', 
      icon: CreditCard 
    },
    { 
      title: isRTL ? 'الفواتير والإيصالات' : 'Invoices & Receipts', 
      url: '/invoices', 
      icon: FileText 
    }
  ];

  // الخدمات والأعمال - Services & Business
  const servicesItems = [
    { 
      title: isRTL ? 'وظائف المستقلين' : 'Freelance Jobs', 
      url: '/freelance', 
      icon: Star 
    },
    { 
      title: isRTL ? 'التسويق التعاوني' : 'Cooperative Marketing', 
      url: '/create-group/marketing', 
      icon: BarChart3 
    },
    { 
      title: isRTL ? 'تأسيس الشركات' : 'Company Formation', 
      url: '/company-incorporation', 
      icon: Building 
    },
    { 
      title: isRTL ? 'المصانع والموردين' : 'Factories & Suppliers', 
      url: '/suppliers', 
      icon: Factory 
    }
  ];

  // أدوات النظام والحوكمة - System Tools & Governance
  const governanceItems = [
    { 
      title: isRTL ? 'التصويت والحوكمة' : 'Voting & Governance', 
      url: '/governance', 
      icon: CheckCircle 
    },
    { 
      title: isRTL ? 'مناقشات لووميو' : 'Loomio Discussions', 
      url: '/loomio', 
      icon: MessageSquare 
    },
    { 
      title: isRTL ? 'نزاعات ORDA' : 'ORDA Disputes', 
      url: '/arbitration', 
      icon: Gavel 
    },
    { 
      title: isRTL ? 'OpenZeppelin Governor' : 'OpenZeppelin Governor', 
      url: '/openzeppelin', 
      icon: Settings 
    }
  ];

  // أدوات مساعدة - Helper Tools
  const helperItems = [
    { 
      title: isRTL ? 'الإشعارات' : 'Notifications', 
      url: '/notifications', 
      icon: Bell 
    },
    { 
      title: isRTL ? 'التقويم والمواعيد' : 'Calendar & Schedules', 
      url: '/calendar', 
      icon: Calendar 
    },
    { 
      title: isRTL ? 'صندوق MCP الذكي' : 'Smart MCP Box', 
      url: '/mcp', 
      icon: Terminal 
    },
    { 
      title: isRTL ? 'الوضع اليدوي' : 'Manual Mode', 
      url: '/manual-mode', 
      icon: Wrench 
    },
    { 
      title: isRTL ? 'الدعم الفني' : 'Technical Support', 
      url: '/support', 
      icon: HelpCircle 
    }
  ];

  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <div className="p-2">
        <SidebarTrigger className="mb-4" />
      </div>
      
      <SidebarContent className="px-2">
        {/* مجموعات الشراء التعاوني */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : 'text-primary font-semibold'}>
            {isRTL ? '🛒 الشراء التعاوني' : '🛒 Cooperative Buying'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {buyingGroupItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground shadow-sm' 
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

        {/* إدارة الحساب */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : 'text-orange-600 font-semibold'}>
            {isRTL ? '👤 إدارة حسابي' : '👤 My Account'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-orange-100 text-orange-700 shadow-sm' 
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

        {/* الخدمات والأعمال */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : 'text-green-600 font-semibold'}>
            {isRTL ? '🏢 الخدمات والأعمال' : '🏢 Services & Business'}
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
                            ? 'bg-green-100 text-green-700 shadow-sm' 
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

        {/* أدوات الحوكمة */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : 'text-blue-600 font-semibold'}>
            {isRTL ? '⚖️ الحوكمة والتصويت' : '⚖️ Governance & Voting'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {governanceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-blue-100 text-blue-700 shadow-sm' 
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

        {/* أدوات مساعدة */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : 'text-purple-600 font-semibold'}>
            {isRTL ? '🔧 أدوات مساعدة' : '🔧 Helper Tools'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {helperItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-purple-100 text-purple-700 shadow-sm' 
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
