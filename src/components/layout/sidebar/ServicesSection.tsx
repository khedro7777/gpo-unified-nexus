
import React from 'react';
import { Star, BarChart3, Building, Factory } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SidebarSection from './SidebarSection';

interface ServicesSectionProps {
  isCollapsed: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isCollapsed }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

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

  return (
    <SidebarSection
      title={isRTL ? '🏢 الخدمات والأعمال' : '🏢 Services & Business'}
      items={servicesItems}
      isCollapsed={isCollapsed}
      colorClass="text-green-600"
    />
  );
};

export default ServicesSection;
