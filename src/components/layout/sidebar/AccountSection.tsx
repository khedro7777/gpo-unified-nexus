
import React from 'react';
import { User, Users, Wallet, CreditCard, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SidebarSection from './SidebarSection';

interface AccountSectionProps {
  isCollapsed: boolean;
}

const AccountSection: React.FC<AccountSectionProps> = ({ isCollapsed }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const accountItems = [
    { 
      title: isRTL ? 'ملفي الشخصي' : 'My Profile', 
      url: '/profile', 
      icon: User 
    },
    { 
      title: isRTL ? 'مجموعاتي' : 'My Groups', 
      url: '/my-groups', 
      icon: Users 
    },
    { 
      title: isRTL ? 'المحفظة والمدفوعات' : 'Wallet & Payments', 
      url: '/wallet', 
      icon: Wallet 
    },
    { 
      title: isRTL ? 'الاشتراكات' : 'Subscriptions', 
      url: '/subscriptions', 
      icon: CreditCard 
    },
    { 
      title: isRTL ? 'الفواتير والإيصالات' : 'Invoices & Receipts', 
      url: '/invoices', 
      icon: FileText 
    }
  ];

  return (
    <SidebarSection
      title={isRTL ? '👤 إدارة حسابي' : '👤 My Account'}
      items={accountItems}
      isCollapsed={isCollapsed}
      colorClass="text-orange-600"
    />
  );
};

export default AccountSection;
