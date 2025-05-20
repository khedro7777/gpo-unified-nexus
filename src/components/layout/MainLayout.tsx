
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MCPChat from '../chat/MCPChat';
import ObserverPanel from '../observer/ObserverPanel';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isObserverMode, setIsObserverMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        <main className="flex-1 flex">
          <div className="flex-1 p-6 overflow-y-auto">
            {isObserverMode && (
              <div className="mb-6">
                <ObserverPanel />
              </div>
            )}
            {children}
          </div>
          
          <div className={`${isChatOpen ? 'w-80' : 'w-0'} transition-all duration-300 relative`}>
            {isChatOpen ? (
              <div className="h-full">
                <MCPChat />
              </div>
            ) : null}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 left-0 transform -translate-x-full border-r-0 rounded-r-none h-10"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              {isChatOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>
        </main>
      </div>
      
      <div className="fixed bottom-4 left-4">
        <Button
          variant="outline"
          size="sm"
          className="bg-background border-muted-foreground/20"
          onClick={() => setIsObserverMode(!isObserverMode)}
        >
          <Eye className="h-4 w-4 mr-2" /> 
          {isObserverMode ? "إيقاف وضع المراقب" : "تفعيل وضع المراقب"}
        </Button>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
