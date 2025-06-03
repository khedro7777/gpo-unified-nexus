
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { languages } from '../data/localizationData';

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 flex items-center gap-2">
        <Globe className="h-4 w-4" />
        اللغة
      </label>
      <Select value={value} onValueChange={onChange}>
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
  );
};
