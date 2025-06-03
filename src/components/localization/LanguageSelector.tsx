
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Clock, DollarSign, Calendar } from 'lucide-react';

interface LocalizationSettings {
  language: string;
  country: string;
  currency: string;
  timezone: string;
  dateFormat: string;
}

const LanguageSelector = () => {
  const [settings, setSettings] = useState<LocalizationSettings>({
    language: 'ar',
    country: 'SA',
    currency: 'SAR',
    timezone: 'Asia/Riyadh',
    dateFormat: 'DD/MM/YYYY'
  });

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

  const countries = [
    { code: 'SA', name: 'السعودية', flag: '🇸🇦' },
    { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
    { code: 'EG', name: 'مصر', flag: '🇪🇬' },
    { code: 'US', name: 'الولايات المتحدة', flag: '🇺🇸' },
    { code: 'GB', name: 'المملكة المتحدة', flag: '🇬🇧' },
    { code: 'FR', name: 'فرنسا', flag: '🇫🇷' },
    { code: 'DE', name: 'ألمانيا', flag: '🇩🇪' },
    { code: 'CN', name: 'الصين', flag: '🇨🇳' },
    { code: 'JP', name: 'اليابان', flag: '🇯🇵' },
    { code: 'KR', name: 'كوريا الجنوبية', flag: '🇰🇷' }
  ];

  const currencies = [
    { code: 'SAR', name: 'ريال سعودي', symbol: 'ر.س' },
    { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ' },
    { code: 'EGP', name: 'جنيه مصري', symbol: 'ج.م' },
    { code: 'USD', name: 'دولار أمريكي', symbol: '$' },
    { code: 'EUR', name: 'يورو', symbol: '€' },
    { code: 'GBP', name: 'جنيه إسترليني', symbol: '£' },
    { code: 'CNY', name: 'يوان صيني', symbol: '¥' },
    { code: 'JPY', name: 'ين ياباني', symbol: '¥' },
    { code: 'KRW', name: 'وون كوري', symbol: '₩' }
  ];

  const timezones = [
    { code: 'Asia/Riyadh', name: 'الرياض (GMT+3)', offset: '+3' },
    { code: 'Asia/Dubai', name: 'دبي (GMT+4)', offset: '+4' },
    { code: 'Africa/Cairo', name: 'القاهرة (GMT+2)', offset: '+2' },
    { code: 'America/New_York', name: 'نيويورك (GMT-5)', offset: '-5' },
    { code: 'Europe/London', name: 'لندن (GMT+0)', offset: '+0' },
    { code: 'Europe/Paris', name: 'باريس (GMT+1)', offset: '+1' },
    { code: 'Asia/Shanghai', name: 'شنغهاي (GMT+8)', offset: '+8' },
    { code: 'Asia/Tokyo', name: 'طوكيو (GMT+9)', offset: '+9' },
    { code: 'Asia/Seoul', name: 'سيول (GMT+9)', offset: '+9' }
  ];

  const dateFormats = [
    { code: 'DD/MM/YYYY', name: 'DD/MM/YYYY', example: '31/12/2025' },
    { code: 'MM/DD/YYYY', name: 'MM/DD/YYYY', example: '12/31/2025' },
    { code: 'YYYY-MM-DD', name: 'YYYY-MM-DD', example: '2025-12-31' },
    { code: 'DD-MM-YYYY', name: 'DD-MM-YYYY', example: '31-12-2025' }
  ];

  const handleSave = () => {
    localStorage.setItem('gpo-localization', JSON.stringify(settings));
    // Apply settings globally
    document.documentElement.lang = settings.language;
    document.documentElement.dir = settings.language === 'ar' ? 'rtl' : 'ltr';
    console.log('Localization settings saved:', settings);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          إعدادات اللغة والمنطقة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              اللغة
            </label>
            <Select
              value={settings.language}
              onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              البلد/المنطقة
            </label>
            <Select
              value={settings.country}
              onValueChange={(value) => setSettings(prev => ({ ...prev, country: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              العملة
            </label>
            <Select
              value={settings.currency}
              onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              المنطقة الزمنية
            </label>
            <Select
              value={settings.timezone}
              onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz.code} value={tz.code}>
                    {tz.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              تنسيق التاريخ
            </label>
            <Select
              value={settings.dateFormat}
              onValueChange={(value) => setSettings(prev => ({ ...prev, dateFormat: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateFormats.map((format) => (
                  <SelectItem key={format.code} value={format.code}>
                    {format.name} - مثال: {format.example}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">معاينة الإعدادات:</h3>
          <div className="text-sm space-y-1">
            <p>اللغة: {languages.find(l => l.code === settings.language)?.name}</p>
            <p>البلد: {countries.find(c => c.code === settings.country)?.name}</p>
            <p>العملة: {currencies.find(c => c.code === settings.currency)?.name}</p>
            <p>المنطقة الزمنية: {timezones.find(t => t.code === settings.timezone)?.name}</p>
            <p>تنسيق التاريخ: {dateFormats.find(d => d.code === settings.dateFormat)?.example}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            حفظ الإعدادات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSelector;
