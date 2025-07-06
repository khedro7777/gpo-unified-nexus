
import React from 'react';
import { CheckCircle, MessageSquare, Gavel, Settings, Vote, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import SidebarSection from './SidebarSection';

interface GovernanceSectionProps {
  isCollapsed: boolean;
}

const GovernanceSection: React.FC<GovernanceSectionProps> = ({ isCollapsed }) => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  if (!user) return null;

  const governanceItems = [
    { 
      title: isRTL ? 'الحوكمة العامة' : 'Governance', 
      url: '/governance', 
      icon: Vote 
    },
    { 
      title: isRTL ? 'التصويت والاقتراحات' : 'Voting & Proposals', 
      url: '/governance/voting', 
      icon: CheckCircle 
    },
    { 
      title: isRTL ? 'مناقشات الحوكمة' : 'Governance Discussions', 
      url: '/governance/deliberation', 
      icon: MessageSquare 
    },
    { 
      title: isRTL ? 'إدارة DAO' : 'DAO Management', 
      url: '/dao', 
      icon: Building 
    },
    { 
      title: isRTL ? 'أعضاء DAO' : 'DAO Members', 
      url: '/dao/members', 
      icon: MessageSquare 
    },
    { 
      title: isRTL ? 'مشاريع DAO' : 'DAO Projects', 
      url: '/dao/projects', 
      icon: Settings 
    },
    { 
      title: isRTL ? 'نزاعات ORDA' : 'ORDA Disputes', 
      url: '/disputes', 
      icon: Gavel 
    }
  ];

  return (
    <SidebarSection
      title={isRTL ? '⚖️ الحوكمة والتصويت' : '⚖️ Governance & Voting'}
      items={governanceItems}
      isCollapsed={isCollapsed}
      colorClass="text-blue-900 dark:text-blue-300 font-bold"
    />
  );
};

export default GovernanceSection;
