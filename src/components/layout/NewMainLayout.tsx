
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import ModernSidebar from './ModernSidebar';
import TopBar from '@/components/common/TopBar';

interface NewMainLayoutProps {
  children: React.ReactNode;
}

const NewMainLayout: React.FC<NewMainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ModernSidebar />
        <SidebarInset className="flex-1">
          <TopBar />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default NewMainLayout;
