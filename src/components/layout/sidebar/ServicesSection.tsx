
import React from 'react';
import { 
  Briefcase, 
  Store, 
  Building, 
  TrendingUp, 
  Gavel, 
  FileText 
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
      url: '/company-incorporation', 
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
    }
  ];

  return (
    <SidebarSection
      title={isRTL ? '🔧 الخدمات' : '🔧 Services'}
      items={servicesItems}
      isCollapsed={isCollapsed}
      colorClass="text-green-600 dark:text-green-400"
    />
  );
};

export default ServicesSection;
