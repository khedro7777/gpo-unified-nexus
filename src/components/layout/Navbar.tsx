
import React from 'react';
import { Button } from "@/components/ui/button";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="gpo-container flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <span className="font-heading font-bold text-xl text-gpo-indigo">GPO MCP</span>
              <span className="ml-1 text-sm font-medium text-gpo-gray">Intelligent Platform</span>
            </NavLink>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: 'Governance', path: '/governance' },
              { name: 'Wallet', path: '/wallet' },
              { name: 'Legal', path: '/legal' },
              { name: 'DAO', path: '/dao' },
              { name: 'Tools', path: '/tools' },
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
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Connect Wallet
          </Button>
          <Button size="sm">Sign In</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
