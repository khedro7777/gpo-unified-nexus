
import React from 'react';
import { 
  Briefcase, 
  Store, 
  Building, 
  TrendingUp, 
  Gavel, 
  FileText,
  HelpCircle,
  Wrench
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import SidebarSection from './SidebarSection';

interface ServicesSectionProps {
  isCollapsed: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isCollapsed }) => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  if (!user) return null;

  const servicesItems = [
    { 
      title: isRTL ? 'المستقلون' : 'Freelancers', 
      url: '/freelance', 
      icon: Briefcase 
    },
    { 
      title: isRTL ? 'الموردون' : 'Suppliers', 
      url: '/suppliers', 
      icon: Store 
    },
    { 
      title: isRTL ? 'تأسيس الشركات' : 'Company Formation', 
      url: '/company-formation', 
      icon: Building 
    },
    { 
      title: isRTL ? 'إدارة الشركات' : 'Company Management', 
      url: '/company-management', 
      icon: Building 
    },
    { 
      title: isRTL ? 'بوابة الاستثمار' : 'Investment Gateway', 
      url: '/investment', 
      icon: TrendingUp 
    },
    { 
      title: isRTL ? 'التحكيم والتوثيق' : 'Arbitration', 
      url: '/arbitration', 
      icon: Gavel 
    },
    { 
      title: isRTL ? 'إدارة الوثائق' : 'Documents', 
      url: '/documents', 
      icon: FileText 
    },
    { 
      title: isRTL ? 'الأدوات القانونية' : 'Legal Tools', 
      url: '/legal', 
      icon: FileText 
    },
    { 
      title: isRTL ? 'الأدوات المساعدة' : 'Tools', 
      url: '/tools', 
      icon: Wrench 
    },
    { 
      title: isRTL ? 'الدعم' : 'Support', 
      url: '/support', 
      icon: HelpCircle 
    }
  ];

  return (
    <SidebarSection
      title={isRTL ? '🔧 الخدمات المتقدمة' : '🔧 Advanced Services'}
      items={servicesItems}
      isCollapsed={isCollapsed}
      colorClass="text-blue-900 dark:text-blue-300 font-bold"
    />
  );
};

export default ServicesSection;
