
import React from 'react';
import { HamburgerMenu } from '@/components/ui/hamburger-menu';
import AIPromethazine from '@/components/ai/AIPromethazine';
import ModernSidebar from './ModernSidebar';
import TopBar from '@/components/common/TopBar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

interface ModernLayoutProps {
  children: React.ReactNode;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-white">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <ModernSidebar />
        </div>

        <SidebarInset className="flex-1">
          {/* Top Bar with Mobile Menu */}
          <div className="border-b bg-white/80 backdrop-blur-md shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <HamburgerMenu>
                  <div className="p-4">
                    <ModernSidebar />
                  </div>
                </HamburgerMenu>
                <h1 className="text-xl font-bold text-gray-900">GPO Smart Platform</h1>
              </div>
              <TopBar />
            </div>
          </div>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>

        {/* AI Promethazine Component */}
        <AIPromethazine />
      </div>
    </SidebarProvider>
  );
};

export default ModernLayout;
