
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { 
  User, Bell, Menu, X, LogOut, Settings, CreditCard, Home, HelpCircle 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, userName } = useAuth();
  
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
          
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { name: 'الرئيسية', path: '/' },
              { name: 'الخدمات', path: '/services' },
              { name: 'المجموعات', path: '/groups' },
              { name: 'كيف تعمل؟', path: '/how-it-works' },
              { name: 'عن المنصة', path: '/about' },
            ].map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground hover:bg-muted'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" className="relative" asChild>
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{userName || 'المستخدم'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>الملف الشخصي</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wallet" className="w-full flex items-center cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>المحفظة</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="w-full flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>الإعدادات</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">تسجيل الدخول</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">إنشاء حساب</Link>
              </Button>
            </>
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
                  <Link to="/profile" onClick={closeMenu}>
                    <User className="mr-2 h-5 w-5" />
                    الملف الشخصي
                  </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start">
                  <Link to="/settings" onClick={closeMenu}>
                    <Settings className="mr-2 h-5 w-5" />
                    الإعدادات
                  </Link>
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
                  <Link to="/login" onClick={closeMenu}>
                    تسجيل الدخول
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/register" onClick={closeMenu}>
                    إنشاء حساب
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
