
import React from 'react';
import { CheckCircle, MessageSquare, Gavel, Settings, Vote } from 'lucide-react';
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
      title: isRTL ? 'التصويت والحوكمة' : 'Voting & Governance', 
      url: '/governance', 
      icon: Vote 
    },
    { 
      title: isRTL ? 'مناقشات لووميو' : 'Loomio Discussions', 
      url: '/governance?tab=loomio', 
      icon: MessageSquare,
      disabled: true // Will be enabled when Loomio integration is ready
    },
    { 
      title: isRTL ? 'نزاعات ORDA' : 'ORDA Disputes', 
      url: '/arbitration', 
      icon: Gavel 
    },
    { 
      title: isRTL ? 'OpenZeppelin Governor' : 'OpenZeppelin Governor', 
      url: '/governance?tab=openzeppelin', 
      icon: Settings,
      disabled: true // Will be enabled when OpenZeppelin integration is ready
    }
  ];

  return (
    <SidebarSection
      title={isRTL ? '⚖️ الحوكمة والتصويت' : '⚖️ Governance & Voting'}
      items={governanceItems}
      isCollapsed={isCollapsed}
      colorClass="text-purple-600 dark:text-purple-400"
    />
  );
};

export default GovernanceSection;
