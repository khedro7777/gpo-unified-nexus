
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import { countries } from '../data/localizationData';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        البلد
      </label>
      <Select value={value} onValueChange={onChange}>
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
  );
};
