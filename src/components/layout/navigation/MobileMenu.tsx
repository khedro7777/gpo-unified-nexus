
import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import LanguageSelector from './LanguageSelector';

interface Service {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  desc: string;
}

interface MobileMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  services?: Service[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, closeMenu, services = [] }) => {
  const { isAuthenticated } = useAuth();

  if (!isMenuOpen) return null;

  return (
    <div className="lg:hidden">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeMenu}
      />
      
      {/* Menu Content - Opens from Right */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-lg font-bold text-white">القائمة الرئيسية</h2>
          <Button variant="ghost" size="icon" onClick={closeMenu} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 bg-white">
          {/* Language Selector */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">اللغة والمنطقة</h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <LanguageSelector />
            </div>
          </div>

          {/* Main Navigation */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">التنقل الرئيسي</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-blue-700"
                onClick={closeMenu}
              >
                <span className="font-medium">الرئيسية</span>
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              </Link>
              <Link 
                to="/groups" 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-blue-700"
                onClick={closeMenu}
              >
                <span className="font-medium">المجموعات</span>
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              </Link>
              <Link 
                to="/wallet" 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-blue-700"
                onClick={closeMenu}
              >
                <span className="font-medium">المحفظة</span>
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Services */}
          {services.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">الخدمات</h3>
              <div className="space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.path}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 hover:shadow-sm transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <service.icon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{service.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{service.desc}</div>
                    </div>
                    <ChevronLeft className="h-4 w-4 text-gray-400 mt-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* User Actions */}
          {isAuthenticated && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">الحساب</h3>
              <div className="space-y-2">
                <Link 
                  to="/profile" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-blue-700"
                  onClick={closeMenu}
                >
                  <span className="font-medium">ملفي الشخصي</span>
                  <ChevronLeft className="h-4 w-4 text-gray-400" />
                </Link>
                <Link 
                  to="/notifications" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-blue-700"
                  onClick={closeMenu}
                >
                  <span className="font-medium">الإشعارات</span>
                  <ChevronLeft className="h-4 w-4 text-gray-400" />
                </Link>
                <Link 
                  to="/contracts" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-blue-700"
                  onClick={closeMenu}
                >
                  <span className="font-medium">العقود</span>
                  <ChevronLeft className="h-4 w-4 text-gray-400" />
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-blue-700"
                  onClick={closeMenu}
                >
                  <span className="font-medium">الإعدادات</span>
                  <ChevronLeft className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </div>
          )}

          {/* Logout */}
          {isAuthenticated && (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  // Add logout logic here
                  closeMenu();
                }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-red-50 hover:shadow-sm transition-all duration-200 text-red-600 hover:text-red-700 w-full"
              >
                <span className="font-medium">تسجيل الخروج</span>
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
