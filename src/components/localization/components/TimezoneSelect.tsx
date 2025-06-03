
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock } from 'lucide-react';
import { timezones } from '../data/localizationData';

interface TimezoneSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const TimezoneSelect: React.FC<TimezoneSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 flex items-center gap-2">
        <Clock className="h-4 w-4" />
        المنطقة الزمنية
      </label>
      <Select value={value} onValueChange={onChange}>
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
  );
};
