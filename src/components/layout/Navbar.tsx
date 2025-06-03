import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MobileMenu } from './navigation/MobileMenu';
import { NotificationButton } from './navigation/NotificationButton';
import { useAuth } from '@/hooks/use-auth';
import { UserDropdown } from './navigation/UserDropdown';
import { AuthButtons } from './navigation/AuthButtons';
import LanguageSelector from './navigation/LanguageSelector';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GPO</span>
          </div>
          <span className="font-bold text-xl hidden sm:block">GPO Unified Nexus</span>
        </Link>

        {/* Center Navigation - Desktop */}
        <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <Link to="/groups" className="text-gray-700 hover:text-primary transition-colors">
            المجموعات
          </Link>
          <Link to="/company-formation" className="text-gray-700 hover:text-primary transition-colors">
            تأسيس الشركات
          </Link>
          <Link to="/arbitration" className="text-gray-700 hover:text-primary transition-colors">
            التحكيم
          </Link>
          <Link to="/documents" className="text-gray-700 hover:text-primary transition-colors">
            الوثائق
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Language & Localization Selector */}
          <LanguageSelector />
          
          {/* Auth Buttons */}
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
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <MobileMenu isMenuOpen={showMobileMenu} closeMenu={() => setShowMobileMenu(false)} />
      )}
    </nav>
  );
};

export default Navbar;
