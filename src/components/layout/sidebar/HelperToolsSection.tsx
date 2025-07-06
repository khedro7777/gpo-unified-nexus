
import React from 'react';
import { Bell, Calendar, Terminal, Wrench, HelpCircle, Zap, BookOpen, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import SidebarSection from './SidebarSection';

interface HelperToolsSectionProps {
  isCollapsed: boolean;
}

const HelperToolsSection: React.FC<HelperToolsSectionProps> = ({ isCollapsed }) => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  if (!user) return null;

  const helperItems = [
    { 
      title: isRTL ? 'صندوق MCP الذكي' : 'Smart MCP Box', 
      url: '/mcp', 
      icon: Terminal 
    },
    { 
      title: isRTL ? 'الوضع اليدوي' : 'Manual Mode', 
      url: '/dashboard?mode=manual', 
      icon: Wrench 
    },
    { 
      title: isRTL ? 'الأتمتة الذكية' : 'Smart Automation', 
      url: '/dashboard?mode=auto', 
      icon: Zap 
    },
    { 
      title: isRTL ? 'من نحن' : 'About Us', 
      url: '/about', 
      icon: BookOpen 
    },
    { 
      title: isRTL ? 'كيف يعمل' : 'How It Works', 
      url: '/how-it-works', 
      icon: HelpCircle 
    },
    { 
      title: isRTL ? 'مهمتنا' : 'Our Mission', 
      url: '/mission', 
      icon: Users 
    },
    { 
      title: isRTL ? 'الخدمات' : 'Services Overview', 
      url: '/services', 
      icon: Bell 
    },
    { 
      title: isRTL ? 'الدعم الفني' : 'Technical Support', 
      url: '/support', 
      icon: HelpCircle 
    }
  ];

  return (
    <SidebarSection
      title={isRTL ? '🔧 أدوات وصفحات مساعدة' : '🔧 Helper Tools & Pages'}
      items={helperItems}
      isCollapsed={isCollapsed}
      colorClass="text-blue-900 dark:text-blue-300 font-bold"
    />
  );
};

export default HelperToolsSection;
