
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GovernanceContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Governance & Voting</h1>
    <p className="text-muted-foreground">
      Participate in decision-making and vote on important proposals.
    </p>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Active Proposals</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded">
            <p className="font-medium">Proposal #12: Budget Allocation</p>
            <p className="text-sm text-muted-foreground">Voting ends in 2 days</p>
            <Button size="sm" className="mt-2">Vote Now</Button>
          </div>
          <div className="p-3 border rounded">
            <p className="font-medium">Proposal #11: New Partnership</p>
            <p className="text-sm text-muted-foreground">Voting ends in 5 days</p>
            <Button size="sm" className="mt-2">Vote Now</Button>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Voting Power</h3>
        <div className="text-3xl font-bold mb-2">1,250 votes</div>
        <p className="text-sm text-muted-foreground mb-4">Based on your GPO token holdings</p>
        <Button variant="outline">View Details</Button>
      </Card>
    </div>
  </div>
);

const Governance = () => {
  const tabs = [
    {
      id: 'governance',
      title: 'Governance Overview',
      content: <GovernanceContent />
    }
  ];

  return (
    <NewMainLayout>
      <TabSystem tabs={tabs} />
    </NewMainLayout>
  );
};

export default Governance;
