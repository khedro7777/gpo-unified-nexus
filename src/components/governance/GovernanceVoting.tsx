
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import TabSystem from '../tabs/TabSystem';
import { activeProposal, pastVotings } from './voting/ProposalDataProvider';
import ProposalVotingCard from './voting/ProposalVotingCard';
import PastVotingsList from './voting/PastVotingsList';
import VotingAlert from './voting/VotingAlert';
import EmptyVotingState from './voting/EmptyVotingState';

type VotingTab = 'active' | 'past' | 'upcoming';

interface ProposalTabContent {
  id: string;
  title: string;
  content: React.ReactNode;
}

const GovernanceVoting = () => {
  const [activeTab, setActiveTab] = useState<VotingTab>('active');
  const [openProposalTabs, setOpenProposalTabs] = useState<ProposalTabContent[]>([
    {
      id: '1',
      title: 'تخصيص صندوق المجتمع',
      content: <ProposalVotingCard proposal={activeProposal} />
    }
  ]);
  
  const addTab = () => {
    // Simulating adding a new proposal tab
    const newId = String(Date.now());
    setOpenProposalTabs(prev => [...prev, {
      id: newId,
      title: `اقتراح جديد ${newId.slice(-3)}`,
      content: (
        <EmptyVotingState 
          title="اقتراح جديد قيد الإنشاء"
          buttonText="بدء إنشاء اقتراح"
        />
      )
    }]);
  };

  const closeTab = (tabId: string) => {
    setOpenProposalTabs(prev => prev.filter(tab => tab.id !== tabId));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">التصويت والمقترحات</h2>
        <Button onClick={addTab}>إنشاء اقتراح جديد</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as VotingTab)}>
        <TabsList className="mb-4">
          <TabsTrigger value="active">تصويتات نشطة</TabsTrigger>
          <TabsTrigger value="past">تصويتات سابقة</TabsTrigger>
          <TabsTrigger value="upcoming">تصويتات قادمة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <VotingAlert />
          
          <TabSystem 
            tabs={openProposalTabs}
            onCloseTab={closeTab}
            onAddTab={addTab}
          />
        </TabsContent>
        
        <TabsContent value="past">
          <PastVotingsList pastVotings={pastVotings} />
        </TabsContent>
        
        <TabsContent value="upcoming">
          <EmptyVotingState 
            title="لا توجد تصويتات قادمة حاليًا" 
            buttonText="جدولة تصويت جديد"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GovernanceVoting;
