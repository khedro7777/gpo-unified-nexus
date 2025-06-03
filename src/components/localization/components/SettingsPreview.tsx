
import React from 'react';
import { LocalizationSettings } from '../types';
import { languages, countries, currencies, timezones, dateFormats } from '../data/localizationData';

interface SettingsPreviewProps {
  settings: LocalizationSettings;
}

export const SettingsPreview: React.FC<SettingsPreviewProps> = ({ settings }) => {
  return (
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
  );
};
