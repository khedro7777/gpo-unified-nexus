
import React from 'react';
import { ShoppingCart, Package, TrendingUp, FileCheck, Users, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import SidebarSection from './SidebarSection';

interface BuyingGroupSectionProps {
  isCollapsed: boolean;
}

const BuyingGroupSection: React.FC<BuyingGroupSectionProps> = ({ isCollapsed }) => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  if (!user) return null;

  const buyingGroupItems = [
    { 
      title: isRTL ? 'مجموعات الشراء النشطة' : 'Active Buying Groups', 
      url: '/groups?filter=purchasing', 
      icon: ShoppingCart 
    },
    { 
      title: isRTL ? 'إنشاء مجموعة شراء' : 'Create Buying Group', 
      url: '/create-group/purchasing', 
      icon: Plus 
    },
    { 
      title: isRTL ? 'طلبات التسعير' : 'Price Requests', 
      url: '/groups?filter=price-requests', 
      icon: TrendingUp 
    },
    { 
      title: isRTL ? 'عروض الموردين' : 'Supplier Offers', 
      url: '/offers?type=supplier', 
      icon: FileCheck 
    },
    { 
      title: isRTL ? 'المفاوضات الجماعية' : 'Group Negotiations', 
      url: '/groups?phase=negotiation', 
      icon: Users 
    }
  ];

  return (
    <SidebarSection
      title={isRTL ? '🛒 الشراء التعاوني' : '🛒 Cooperative Buying'}
      items={buyingGroupItems}
      isCollapsed={isCollapsed}
      colorClass="text-primary dark:text-primary"
    />
  );
};

export default BuyingGroupSection;
