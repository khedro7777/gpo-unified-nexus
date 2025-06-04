
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Clock, DollarSign, MapPin } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { useTranslation } from 'react-i18next';

const TopBar = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound' }
  ];

  const countries = [
    { code: 'SA', name: isRTL ? 'السعودية' : 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'AE', name: isRTL ? 'الإمارات' : 'UAE', flag: '🇦🇪' },
    { code: 'EG', name: isRTL ? 'مصر' : 'Egypt', flag: '🇪🇬' },
    { code: 'US', name: isRTL ? 'الولايات المتحدة' : 'United States', flag: '🇺🇸' },
    { code: 'GB', name: isRTL ? 'المملكة المتحدة' : 'United Kingdom', flag: '🇬🇧' }
  ];

  const currentTime = new Date().toLocaleTimeString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="h-12 bg-background border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{currentTime}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
          <SelectTrigger className="w-auto h-8 border-0 bg-transparent">
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span className="text-xs">{languages.find(l => l.code === i18n.language)?.flag}</span>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-900 border shadow-lg">
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Country Selector */}
        <Select defaultValue="SA">
          <SelectTrigger className="w-auto h-8 border-0 bg-transparent">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">🇸🇦</span>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-900 border shadow-lg">
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="mr-2">{country.flag}</span>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Currency Selector */}
        <Select defaultValue="USD">
          <SelectTrigger className="w-auto h-8 border-0 bg-transparent">
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              <span className="text-xs">$</span>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-900 border shadow-lg">
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="mr-2">{currency.symbol}</span>
                {currency.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default TopBar;
