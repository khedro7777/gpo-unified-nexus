
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import our new components
import { MobileMenu } from './navigation/MobileMenu';
import { UserDropdown } from './navigation/UserDropdown';
import { NavigationLinks } from './navigation/NavigationLinks';
import { AuthButtons } from './navigation/AuthButtons';
import { NotificationButton } from './navigation/NotificationButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <span className="font-heading font-bold text-xl text-gpo-indigo">GPO</span>
              <span className="ml-1 text-sm font-medium text-muted-foreground">Smart Cooperation Platform</span>
            </NavLink>
          </div>
          
          {/* Navigation Links */}
          <NavigationLinks />
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
