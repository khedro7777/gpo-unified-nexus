
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Menu, X, Globe, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import our components
import { MobileMenu } from './navigation/MobileMenu';
import { UserDropdown } from './navigation/UserDropdown';
import { NavigationLinks } from './navigation/NavigationLinks';
import { AuthButtons } from './navigation/AuthButtons';
import { NotificationButton } from './navigation/NotificationButton';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [language, setLanguage] = useState('ar');
  const [country, setCountry] = useState('sa');
  const [currency, setCurrency] = useState('sar');
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="border-b border-border bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <span className="font-heading font-bold text-xl text-primary">GPO</span>
              <span className="hidden md:inline ml-1 text-sm font-medium text-muted-foreground">Smart Platform</span>
            </NavLink>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[70px] h-8 px-2">
              <SelectValue placeholder="Lang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-[80px] h-8 px-2">
              <Globe className="h-3 w-3 mr-1" />
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sa">SA</SelectItem>
              <SelectItem value="ae">UAE</SelectItem>
              <SelectItem value="eg">Egypt</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[80px] h-8 px-2">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sar">SAR</SelectItem>
              <SelectItem value="aed">AED</SelectItem>
              <SelectItem value="egp">EGP</SelectItem>
              <SelectItem value="usd">USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <NotificationButton />
              <UserDropdown />
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </header>
  );
};

export default Navbar;
