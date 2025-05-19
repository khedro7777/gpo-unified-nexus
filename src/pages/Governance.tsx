
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GovernanceContent = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Governance</h1>
      <Button>Create Proposal</Button>
    </div>
    
    <p className="text-muted-foreground">
      Manage proposals, voting, and deliberation for your organization.
    </p>
    
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Active Proposals</h2>
      
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Treasury Allocation Q2</h3>
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Voting Active
            </div>
          </div>
          <p className="text-sm text-muted-foreground my-2">
            Proposal to allocate treasury funds for Q2 projects and initiatives.
          </p>
          <div className="flex justify-between text-sm mt-4">
            <span>Votes: 24/50</span>
            <span>Ends in 3 days</span>
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[48%]"></div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">New Member Onboarding Process</h3>
            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Deliberation
            </div>
          </div>
          <p className="text-sm text-muted-foreground my-2">
            Discussion on improving the member onboarding process and requirements.
          </p>
          <div className="flex justify-between text-sm mt-4">
            <span>12 comments</span>
            <span>Updated 2 hours ago</span>
          </div>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mt-8">Past Proposals</h2>
      
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Community Guidelines Update</h3>
            <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
              Passed
            </div>
          </div>
          <p className="text-sm text-muted-foreground my-2">
            Updates to community guidelines and code of conduct.
          </p>
          <div className="flex justify-between text-sm mt-4">
            <span>Votes: 42/50 in favor</span>
            <span>Ended 3 days ago</span>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Partnership with XYZ Protocol</h3>
            <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
              Rejected
            </div>
          </div>
          <p className="text-sm text-muted-foreground my-2">
            Proposal for strategic partnership with XYZ Protocol.
          </p>
          <div className="flex justify-between text-sm mt-4">
            <span>Votes: 18/50 in favor</span>
            <span>Ended 1 week ago</span>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const Governance = () => {
  const tabs = [
    {
      id: 'governance',
      title: 'Governance',
      content: <GovernanceContent />
    }
  ];

  return (
    <MainLayout>
      <TabSystem tabs={tabs} />
    </MainLayout>
  );
};

export default Governance;
