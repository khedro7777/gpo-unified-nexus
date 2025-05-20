
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut, Home, CreditCard, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

interface MobileMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, closeMenu }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-background transition-transform duration-300 md:hidden pt-16",
      isMenuOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <nav className="flex flex-col p-4">
        <div className="flex flex-col space-y-1 mb-6">
          {[
            { name: 'الرئيسية', path: '/', icon: Home },
            { name: 'الخدمات', path: '/services', icon: CreditCard },
            { name: 'المجموعات', path: '/groups', icon: User },
            { name: 'كيف تعمل؟', path: '/how-it-works', icon: HelpCircle },
            { name: 'عن المنصة', path: '/about', icon: HelpCircle },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `px-3 py-3 text-base font-medium rounded-md transition-colors flex items-center ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-muted'
                }`
              }
              onClick={closeMenu}
            >
              {React.createElement(item.icon, { className: "mr-2 h-5 w-5" })}
              {item.name}
            </NavLink>
          ))}
        </div>
        
        <div className="mt-auto border-t pt-4">
          {isAuthenticated ? (
            <div className="flex flex-col space-y-2">
              <Button variant="outline" asChild className="justify-start">
                <NavLink to="/profile" onClick={closeMenu}>
                  <User className="mr-2 h-5 w-5" />
                  الملف الشخصي
                </NavLink>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <NavLink to="/settings" onClick={closeMenu}>
                  <Settings className="mr-2 h-5 w-5" />
                  الإعدادات
                </NavLink>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start text-red-500 hover:text-red-600"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                <LogOut className="mr-2 h-5 w-5" />
                تسجيل الخروج
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button asChild>
                <NavLink to="/login" onClick={closeMenu}>
                  تسجيل الدخول
                </NavLink>
              </Button>
              <Button variant="outline" asChild>
                <NavLink to="/register" onClick={closeMenu}>
                  إنشاء حساب
                </NavLink>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
