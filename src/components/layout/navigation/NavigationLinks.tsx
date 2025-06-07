
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, FileText, Building2, Briefcase } from 'lucide-react';

export const NavigationLinks: React.FC = () => {
  return (
    <nav className="w-full fixed bottom-0 left-0 right-0 bg-white border-t border-border flex items-center justify-around z-30 md:static md:w-auto md:border-none md:justify-start md:space-x-1 md:mr-4">
      {[
        { name: 'الرئيسية', path: '/', icon: Home },
        { name: 'المجموعات', path: '/groups', icon: Users },
        { name: 'العروض', path: '/offers', icon: FileText },
        { name: 'تأسيس شركات', path: '/company-incorporation', icon: Building2 },
        { name: 'المستقلون', path: '/freelance', icon: Briefcase },
      ].map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => 
            `flex flex-col items-center py-2 px-3 text-xs md:text-sm md:flex-row md:font-medium md:rounded-md md:py-2 md:px-3 transition-colors ${
              isActive 
                ? 'text-primary border-t-2 md:border-t-0 md:bg-primary/10 border-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <item.icon className="h-5 w-5 mb-1 md:mb-0 md:mr-2 md:h-4 md:w-4" />
          <span className="md:inline">{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};
