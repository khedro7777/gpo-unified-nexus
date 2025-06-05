
import React from 'react';
import { CheckCircle, MessageSquare, Gavel, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SidebarSection from './SidebarSection';

interface GovernanceSectionProps {
  isCollapsed: boolean;
}

const GovernanceSection: React.FC<GovernanceSectionProps> = ({ isCollapsed }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

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

  return (
    <SidebarSection
      title={isRTL ? '⚖️ الحوكمة والتصويت' : '⚖️ Governance & Voting'}
      items={governanceItems}
      isCollapsed={isCollapsed}
      colorClass="text-blue-600"
    />
  );
};

export default GovernanceSection;
