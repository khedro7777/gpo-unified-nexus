
import React from 'react';
import { Bell, Calendar, Terminal, Wrench, HelpCircle, Zap } from 'lucide-react';
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
      title: isRTL ? 'التقويم والمواعيد' : 'Calendar & Schedules', 
      url: '/dashboard?tab=calendar', 
      icon: Calendar 
    },
    { 
      title: isRTL ? 'صندوق MCP الذكي' : 'Smart MCP Box', 
      url: '/dashboard?tab=mcp', 
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
      title: isRTL ? 'الدعم الفني' : 'Technical Support', 
      url: '/support', 
      icon: HelpCircle 
    }
  ];

  return (
    <SidebarSection
      title={isRTL ? '🔧 أدوات مساعدة' : '🔧 Helper Tools'}
      items={helperItems}
      isCollapsed={isCollapsed}
      colorClass="text-orange-600 dark:text-orange-400"
    />
  );
};

export default HelperToolsSection;
