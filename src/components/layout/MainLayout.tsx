
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MCPChat from '../chat/MCPChat';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 flex">
          <div className="flex-1 p-6 overflow-y-auto">
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
      
      <Footer />
    </div>
  );
};

export default MainLayout;
