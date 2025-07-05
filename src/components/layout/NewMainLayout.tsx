
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import ThemeSidebar from './sidebar/ThemeSidebar';
import EnhancedTopBar from './EnhancedTopBar';

interface NewMainLayoutProps {
  children: React.ReactNode;
}

const NewMainLayout: React.FC<NewMainLayoutProps> = ({ children }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen w-full bg-background">
          <ThemeSidebar />
          <SidebarInset className="flex flex-col min-h-screen">
            <EnhancedTopBar />
            <main className="flex-1 p-6 bg-background">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default NewMainLayout;
