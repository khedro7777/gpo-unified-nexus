
import React from 'react';
import { Bell, Calendar, Terminal, Wrench, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SidebarSection from './SidebarSection';

interface HelperToolsSectionProps {
  isCollapsed: boolean;
}

const HelperToolsSection: React.FC<HelperToolsSectionProps> = ({ isCollapsed }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

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

  return (
    <SidebarSection
      title={isRTL ? '🔧 أدوات مساعدة' : '🔧 Helper Tools'}
      items={helperItems}
      isCollapsed={isCollapsed}
      colorClass="text-purple-600"
    />
  );
};

export default HelperToolsSection;
