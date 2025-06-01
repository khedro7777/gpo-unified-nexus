
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import {
  Home,
  Users,
  ShoppingCart,
  FileText,
  Building,
  Award,
  Gavel,
  Wrench,
  Wallet,
  Settings,
  LogOut,
  User,
  Bell,
  MessageSquare,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompactSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const CompactSidebar: React.FC<CompactSidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'ملفي الشخصي', path: '/profile', icon: User },
    { name: 'المجموعات', path: '/groups', icon: Users },
    { name: 'العروض', path: '/offers', icon: ShoppingCart },
    { name: 'وظائف المستقلين', path: '/freelance', icon: Briefcase },
    { name: 'المحفظة', path: '/wallet', icon: Wallet },
    { name: 'الفواتير', path: '/invoices', icon: FileText },
    { name: 'الإشعارات', path: '/notifications', icon: Bell },
    { name: 'النزاعات', path: '/disputes', icon: Gavel },
    { name: 'الدعم', path: '/support', icon: MessageSquare },
    { name: 'MCP', path: '/mcp', icon: Wrench },
    { name: 'الإعدادات', path: '/settings', icon: Settings },
  ];

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-50",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header with Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-gray-800">GPO</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-right",
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-right text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-sm font-medium">تسجيل الخروج</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CompactSidebar;
