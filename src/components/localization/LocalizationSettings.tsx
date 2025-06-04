
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { LanguageSelect } from './components/LanguageSelect';
import { CountrySelect } from './components/CountrySelect';
import { CurrencySelect } from './components/CurrencySelect';
import { TimezoneSelect } from './components/TimezoneSelect';
import { DateFormatSelect } from './components/DateFormatSelect';
import { SettingsPreview } from './components/SettingsPreview';
import { LocalizationSettings as LocalizationSettingsType } from './types';

const LocalizationSettings = () => {
  const [settings, setSettings] = useState<LocalizationSettingsType>({
    language: 'ar',
    country: 'SA',
    currency: 'SAR',
    timezone: 'Asia/Riyadh',
    dateFormat: 'DD/MM/YYYY'
  });

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
          <LanguageSelect 
            value={settings.language} 
            onChange={(value) => setSettings(prev => ({ ...prev, language: value }))} 
          />
          <CountrySelect 
            value={settings.country} 
            onChange={(value) => setSettings(prev => ({ ...prev, country: value }))} 
          />
          <CurrencySelect 
            value={settings.currency} 
            onChange={(value) => setSettings(prev => ({ ...prev, currency: value }))} 
          />
          <TimezoneSelect 
            value={settings.timezone} 
            onChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))} 
          />
          <div className="md:col-span-2">
            <DateFormatSelect 
              value={settings.dateFormat} 
              onChange={(value) => setSettings(prev => ({ ...prev, dateFormat: value }))} 
            />
          </div>
        </div>

        <SettingsPreview settings={settings} />

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            حفظ الإعدادات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalizationSettings;
