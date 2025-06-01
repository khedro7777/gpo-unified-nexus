
import React, { useState } from 'react';
import CompactSidebar from './CompactSidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface SimplifiedLayoutProps {
  children: React.ReactNode;
}

const SimplifiedLayout: React.FC<SimplifiedLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        <CompactSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
        
        <main 
          className={cn(
            "flex-1 transition-all duration-300 pt-16",
            sidebarCollapsed ? "ml-16" : "ml-64"
          )}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default SimplifiedLayout;
