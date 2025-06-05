
import React from 'react';
import { ShoppingCart, Package, TrendingUp, FileCheck, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SidebarSection from './SidebarSection';

interface BuyingGroupSectionProps {
  isCollapsed: boolean;
}

const BuyingGroupSection: React.FC<BuyingGroupSectionProps> = ({ isCollapsed }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

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

  return (
    <SidebarSection
      title={isRTL ? '🛒 الشراء التعاوني' : '🛒 Cooperative Buying'}
      items={buyingGroupItems}
      isCollapsed={isCollapsed}
      colorClass="text-primary"
    />
  );
};

export default BuyingGroupSection;
