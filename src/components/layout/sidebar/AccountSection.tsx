
import React from 'react';
import { User, Wallet, Bell, FileText, Settings, CreditCard, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import SidebarSection from './SidebarSection';

interface AccountSectionProps {
  isCollapsed: boolean;
}

const AccountSection: React.FC<AccountSectionProps> = ({ isCollapsed }) => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  if (!user) return null;

  const accountItems = [
    { 
      title: isRTL ? 'الصفحة الرئيسية' : 'Home', 
      url: '/', 
      icon: Home 
    },
    { 
      title: isRTL ? 'لوحة التحكم' : 'Dashboard', 
      url: '/dashboard', 
      icon: User 
    },
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
      title: isRTL ? 'الاشتراكات' : 'Subscriptions', 
      url: '/wallet?tab=subscriptions', 
      icon: CreditCard 
    },
    { 
      title: isRTL ? 'الإشعارات' : 'Notifications', 
      url: '/notifications', 
      icon: Bell,
      badge: 3 // Example notification count
    },
    { 
      title: isRTL ? 'العقود' : 'Contracts', 
      url: '/contracts', 
      icon: FileText 
    },
    { 
      title: isRTL ? 'الفواتير' : 'Invoices', 
      url: '/invoices', 
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
      colorClass="text-blue-900 dark:text-blue-300 font-bold"
    />
  );
};

export default AccountSection;
