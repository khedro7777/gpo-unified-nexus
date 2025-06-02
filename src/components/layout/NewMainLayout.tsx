
import React, { useState } from 'react';
import NewSidebar from './NewSidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import MCPPanel from '../mcp/MCPPanel';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Layout, Settings } from 'lucide-react';
import ManualFlowExplorer from '../manual/ManualFlowExplorer';
import { SidebarProvider, SidebarWrapper } from '@/components/ui/sidebar';
import { NavigationLinks } from './navigation/NavigationLinks';
import { cn } from '@/lib/utils';

interface NewMainLayoutProps {
  children: React.ReactNode;
}

const NewMainLayout: React.FC<NewMainLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true); // MCP panel open by default
  
  return (
    <SidebarWrapper defaultOpen={!isCollapsed}>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <Navbar />
        
        <div className="flex flex-1">
          <NewSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          
          <div className={cn(
            "flex flex-1 transition-all duration-300",
            isCollapsed ? "ml-16" : "ml-64"
          )}>
            {/* Left Panel: Manual Flow Explorer */}
            <div className={cn(
              "transition-all duration-300 border-r border-gray-200 bg-white relative overflow-hidden",
              leftPanelOpen ? "w-64" : "w-0"
            )}>
              {leftPanelOpen && (
                <div className="h-full p-4">
                  <ManualFlowExplorer />
                </div>
              )}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-0 transform translate-x-full border-l-0 rounded-l-none h-10 bg-white shadow-sm"
                onClick={() => setLeftPanelOpen(!leftPanelOpen)}
              >
                {leftPanelOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </Button>
            </div>
            
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-white">
              {/* Page Content */}
              <div className="p-4 md:p-6 pb-20 md:pb-6">
                {children}
              </div>
            </main>
            
            {/* Right Panel: MCP Panel */}
            <div className={cn(
              "transition-all duration-300 relative bg-white border-l border-gray-200",
              rightPanelOpen ? "w-80" : "w-0"
            )}>
              {rightPanelOpen && (
                <div className="h-full">
                  <MCPPanel />
                </div>
              )}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 left-0 transform -translate-x-full border-r-0 rounded-r-none h-10 bg-white shadow-sm"
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
              >
                {rightPanelOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <div className="md:hidden">
          <NavigationLinks />
        </div>
        
        {/* Floating Action Buttons */}
        <div className="fixed bottom-20 md:bottom-4 right-4 z-40">
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="fixed bottom-20 md:bottom-4 left-4 z-40 hidden md:block">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "bg-white shadow-sm",
              leftPanelOpen ? "border-primary" : "border-gray-200"
            )}
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          >
            <Layout className="h-4 w-4 mr-2" /> 
            عرض المسارات
          </Button>
        </div>
        
        <Footer className="hidden md:block" />
      </div>
    </SidebarWrapper>
  );
};

export default NewMainLayout;
