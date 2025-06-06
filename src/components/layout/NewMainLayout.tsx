
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import ModernSidebar from './ModernSidebar';
import TopBar from '@/components/common/TopBar';
import { HamburgerMenu } from '@/components/ui/hamburger-menu';
import AIPromethazine from '@/components/ai/AIPromethazine';

interface NewMainLayoutProps {
  children: React.ReactNode;
}

const NewMainLayout: React.FC<NewMainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-white">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <ModernSidebar />
        </div>

        <SidebarInset className="flex-1">
          {/* Enhanced Top Bar */}
          <div className="border-b bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {/* Mobile Menu */}
                <HamburgerMenu>
                  <div className="p-4 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">القائمة الرئيسية</h2>
                    <ModernSidebar />
                  </div>
                </HamburgerMenu>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GPO</span>
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    منصة التعاون الذكي
                  </h1>
                </div>
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

        {/* AI Promethazine */}
        <AIPromethazine />
      </div>
    </SidebarProvider>
  );
};

export default NewMainLayout;
