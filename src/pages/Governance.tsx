
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GovernanceProposals from '@/components/governance/GovernanceProposals';
import GovernanceVoting from '@/components/governance/GovernanceVoting';
import GovernanceDeliberation from '@/components/governance/GovernanceDeliberation';

const Governance = () => {
  const [activeTab, setActiveTab] = useState('proposals');
  const [openTabs, setOpenTabs] = useState([
    {
      id: 'proposals-tab',
      title: 'Proposals',
      content: <GovernanceProposals />
    }
  ]);

  const handleAddTab = (type: string) => {
    let newTab;
    
    switch (type) {
      case 'proposals':
        newTab = {
          id: `proposals-tab-${Date.now()}`,
          title: 'New Proposal',
          content: <GovernanceProposals />
        };
        break;
      case 'voting':
        newTab = {
          id: `voting-tab-${Date.now()}`,
          title: 'Voting',
          content: <GovernanceVoting />
        };
        break;
      case 'deliberation':
        newTab = {
          id: `deliberation-tab-${Date.now()}`,
          title: 'Deliberation',
          content: <GovernanceDeliberation />
        };
        break;
      default:
        return;
    }
    
    setOpenTabs([...openTabs, newTab]);
  };

  const handleCloseTab = (tabId: string) => {
    setOpenTabs(openTabs.filter(tab => tab.id !== tabId));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Governance Portal</h1>
          <div className="space-x-2">
            <span className="text-sm text-muted-foreground">View Mode:</span>
            <Tabs defaultValue="individual" className="inline-flex">
              <TabsList className="h-8">
                <TabsTrigger className="text-xs h-7 px-2" value="individual">Individual</TabsTrigger>
                <TabsTrigger className="text-xs h-7 px-2" value="collective">Collective DAO</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 bg-muted/30">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="proposals" onClick={() => handleAddTab('proposals')}>Proposals</TabsTrigger>
                <TabsTrigger value="voting" onClick={() => handleAddTab('voting')}>Voting</TabsTrigger>
                <TabsTrigger value="deliberation" onClick={() => handleAddTab('deliberation')}>Deliberation</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="h-[calc(100vh-16rem)]">
              <TabSystem 
                tabs={openTabs} 
                onCloseTab={handleCloseTab} 
                onAddTab={() => handleAddTab(activeTab)} 
              />
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Governance;
