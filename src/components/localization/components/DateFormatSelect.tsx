
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { dateFormats } from '../data/localizationData';

interface DateFormatSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const DateFormatSelect: React.FC<DateFormatSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        تنسيق التاريخ
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {dateFormats.map((format) => (
            <SelectItem key={format.code} value={format.code}>
              {format.name} ({format.example})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
