
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HamburgerMenuProps {
  children: React.ReactNode;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 bg-white border-l border-gray-200">
        <div className="flex flex-col h-full bg-white">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
            <h2 className="text-lg font-bold text-white">منصة التعاون الذكي</h2>
            <p className="text-sm text-blue-100">GPO Smart Platform</p>
          </div>
          <div className="flex-1 overflow-y-auto bg-white">
            {children}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
