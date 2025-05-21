
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface WalletHeaderProps {
  title: string;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          <ArrowUp className="mr-2 h-4 w-4" />
          سحب
        </Button>
        <Button size="sm">
          <ArrowDown className="mr-2 h-4 w-4" />
          إيداع
        </Button>
      </div>
    </div>
  );
};

export default WalletHeader;
