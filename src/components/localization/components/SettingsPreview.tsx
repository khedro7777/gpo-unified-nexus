
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { LocalizationSettings } from '../types';
import { languages, countries, currencies, timezones, dateFormats } from '../data/localizationData';

interface SettingsPreviewProps {
  settings: LocalizationSettings;
}

export const SettingsPreview: React.FC<SettingsPreviewProps> = ({ settings }) => {
  const language = languages.find(l => l.code === settings.language);
  const country = countries.find(c => c.code === settings.country);
  const currency = currencies.find(c => c.code === settings.currency);
  const timezone = timezones.find(t => t.code === settings.timezone);
  const dateFormat = dateFormats.find(d => d.code === settings.dateFormat);

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Eye className="h-5 w-5" />
          معاينة الإعدادات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">اللغة:</span>
          <span>{language?.flag} {language?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">البلد:</span>
          <span>{country?.flag} {country?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">العملة:</span>
          <span>{currency?.symbol} {currency?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">المنطقة الزمنية:</span>
          <span>{timezone?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">تنسيق التاريخ:</span>
          <span>{dateFormat?.example}</span>
        </div>
      </CardContent>
    </Card>
  );
};
