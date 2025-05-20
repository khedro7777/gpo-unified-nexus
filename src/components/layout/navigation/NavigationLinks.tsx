
import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavigationLinks: React.FC = () => {
  return (
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
  );
};
