import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MobileMenu } from './MobileMenu';
import { NotificationButton } from './navigation/NotificationButton';
import { useAuth } from '@/hooks/use-auth';
import { UserDropdown } from './navigation/UserDropdown';
import { AuthButtons } from './navigation/AuthButtons';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="text-primary">GPO</span>
              <span className="hidden md:inline text-sm text-muted-foreground font-normal">Smart Cooperation Platform</span>
            </Link>
          </div>
          
          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link to="/groups" className="text-sm hover:text-primary transition-colors">
              المجموعات
            </Link>
            <Link to="/governance" className="text-sm hover:text-primary transition-colors">
              الحوكمة
            </Link>
            <Link to="/dao" className="text-sm hover:text-primary transition-colors">
              DAO
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <NotificationButton />
            
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <AuthButtons />
            )}
            
            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <MobileMenu onClose={() => setShowMobileMenu(false)} />
      )}
    </header>
  );
};

export default Navbar;
