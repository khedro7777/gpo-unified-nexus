
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LanguageSelect } from './components/LanguageSelect';
import { CountrySelect } from './components/CountrySelect';
import { CurrencySelect } from './components/CurrencySelect';
import { TimezoneSelect } from './components/TimezoneSelect';
import { DateFormatSelect } from './components/DateFormatSelect';
import { SettingsPreview } from './components/SettingsPreview';
import { LocalizationSettings as ILocalizationSettings } from './types';
import { useToast } from '@/hooks/use-toast';

const LocalizationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<ILocalizationSettings>({
    language: 'ar',
    country: 'SA',
    currency: 'SAR',
    timezone: 'Asia/Riyadh',
    dateFormat: 'DD/MM/YYYY'
  });

  const updateSetting = (key: keyof ILocalizationSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('gpo-localization', JSON.stringify(settings));
    document.documentElement.lang = settings.language;
    document.documentElement.dir = settings.language === 'ar' ? 'rtl' : 'ltr';
    
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم تطبيق إعدادات التوطين بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات التوطين</CardTitle>
          <CardDescription>
            تخصيص إعدادات اللغة والمنطقة والعملة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LanguageSelect 
              value={settings.language} 
              onChange={(value) => updateSetting('language', value)} 
            />
            <CountrySelect 
              value={settings.country} 
              onChange={(value) => updateSetting('country', value)} 
            />
            <CurrencySelect 
              value={settings.currency} 
              onChange={(value) => updateSetting('currency', value)} 
            />
            <TimezoneSelect 
              value={settings.timezone} 
              onChange={(value) => updateSetting('timezone', value)} 
            />
            <DateFormatSelect 
              value={settings.dateFormat} 
              onChange={(value) => updateSetting('dateFormat', value)} 
            />
          </div>
          
          <SettingsPreview settings={settings} />
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              حفظ الإعدادات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalizationSettings;
