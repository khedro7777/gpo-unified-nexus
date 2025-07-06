
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
      title: isRTL ? 'جميع المجموعات' : 'All Groups', 
      url: '/groups', 
      icon: Users 
    },
    { 
      title: isRTL ? 'مجموعاتي' : 'My Groups', 
      url: '/my-groups', 
      icon: ShoppingCart 
    },
    { 
      title: isRTL ? 'مجموعات الشراء' : 'Buying Groups', 
      url: '/groups?type=purchasing', 
      icon: ShoppingCart 
    },
    { 
      title: isRTL ? 'مجموعات التسويق' : 'Marketing Groups', 
      url: '/groups?type=marketing', 
      icon: TrendingUp 
    },
    { 
      title: isRTL ? 'إنشاء مجموعة' : 'Create Group', 
      url: '/create-group', 
      icon: Plus 
    },
    { 
      title: isRTL ? 'العروض المرسلة' : 'Sent Offers', 
      url: '/offers/sent', 
      icon: FileCheck 
    },
    { 
      title: isRTL ? 'العروض المستلمة' : 'Received Offers', 
      url: '/offers/received', 
      icon: Package 
    }
  ];

  return (
    <SidebarSection
      title={isRTL ? '🛒 المجموعات والتعاون' : '🛒 Groups & Cooperation'}
      items={buyingGroupItems}
      isCollapsed={isCollapsed}
      colorClass="text-blue-900 dark:text-blue-300 font-bold"
    />
  );
};

export default BuyingGroupSection;
