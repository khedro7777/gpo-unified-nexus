
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign } from 'lucide-react';
import { currencies } from '../data/localizationData';

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 flex items-center gap-2">
        <DollarSign className="h-4 w-4" />
        العملة
      </label>
      <Select value={value} onValueChange={onChange}>
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
  );
};
