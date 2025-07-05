
import React from 'react';
import { SidebarWrapper, SidebarInset } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import ThemeSidebar from './sidebar/ThemeSidebar';
import EnhancedTopBar from './EnhancedTopBar';

interface NewMainLayoutProps {
  children: React.ReactNode;
}

const NewMainLayout: React.FC<NewMainLayoutProps> = ({ children }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarWrapper defaultOpen={true} className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
        <ThemeSidebar />
        <SidebarInset className="flex flex-col">
          <EnhancedTopBar />
          <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarWrapper>
    </TooltipProvider>
  );
};

export default NewMainLayout;
