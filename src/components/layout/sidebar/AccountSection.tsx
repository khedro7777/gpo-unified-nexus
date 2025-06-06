
import React from 'react';
import { User, Wallet, Bell, FileText, Settings } from 'lucide-react';
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
      title: isRTL ? 'الملف الشخصي' : 'Profile', 
      url: '/profile', 
      icon: User 
    },
    { 
      title: isRTL ? 'المحفظة' : 'Wallet', 
      url: '/wallet', 
      icon: Wallet 
    },
    { 
      title: isRTL ? 'الإشعارات' : 'Notifications', 
      url: '/notifications', 
      icon: Bell 
    },
    { 
      title: isRTL ? 'العقود' : 'Contracts', 
      url: '/contracts', 
      icon: FileText 
    },
    { 
      title: isRTL ? 'الإعدادات' : 'Settings', 
      url: '/settings', 
      icon: Settings 
    }
  ];

  return (
    <SidebarSection
      title={isRTL ? '👤 الحساب الشخصي' : '👤 Account'}
      items={accountItems}
      isCollapsed={isCollapsed}
      colorClass="text-blue-600"
    />
  );
};

export default AccountSection;
