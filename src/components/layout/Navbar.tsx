
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, Building, Gavel, FileText, Users, ShoppingCart, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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

  const services = [
    { name: 'الشراء التعاوني', path: '/groups', icon: ShoppingCart, desc: 'انضم لمجموعات الشراء' },
    { name: 'التسويق التعاوني', path: '/groups/marketing', icon: Users, desc: 'تسويق منتجاتك بشكل جماعي' },
    { name: 'المستقلين', path: '/freelance', icon: Briefcase, desc: 'اعثر على المواهب أو اعرض خدماتك' },
    { name: 'تأسيس الشركات', path: '/company-incorporation', icon: Building, desc: 'تأسيس شركتك في أفضل الولايات القضائية' },
    { name: 'التحكيم التجاري', path: '/arbitration', icon: Gavel, desc: 'حل النزاعات بطريقة عادلة وسريعة' },
    { name: 'إدارة الوثائق', path: '/documents', icon: FileText, desc: 'رقمنة وحفظ الوثائق' },
  ];
  
  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GPO</span>
          </div>
          <span className="font-bold text-lg md:text-xl hidden sm:block">GPO Unified Nexus</span>
        </Link>

        {/* Center Navigation - Desktop */}
        <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors text-sm">
            الرئيسية
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-gray-700 hover:text-primary">
                الخدمات
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white shadow-lg border" align="center">
              {services.map((service, index) => (
                <React.Fragment key={service.name}>
                  <DropdownMenuItem asChild>
                    <Link 
                      to={service.path}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <service.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{service.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{service.desc}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  {index < services.length - 1 && <DropdownMenuSeparator />}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/groups" className="text-gray-700 hover:text-primary transition-colors text-sm">
            المجموعات
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
          
          {/* Notifications */}
          {isAuthenticated && <NotificationButton />}
          
          {/* Auth Section */}
          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <AuthButtons />
          )}
          
          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <MobileMenu 
          isMenuOpen={showMobileMenu} 
          closeMenu={() => setShowMobileMenu(false)}
          services={services}
        />
      )}
    </nav>
  );
};

export default Navbar;
