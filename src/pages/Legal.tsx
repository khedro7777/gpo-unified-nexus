
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';

const LegalContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Legal & Arbitration</h1>
    <p className="text-muted-foreground">
      Access dispute resolution and legal tools for your organization.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Online Dispute Resolution</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage conflicts and disputes through our integrated ODR system.
        </p>
        <button className="text-primary text-sm font-medium">Access ODR System →</button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Contract Templates</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Access standardized legal templates for your organization.
        </p>
        <button className="text-primary text-sm font-medium">Browse Templates →</button>
      </Card>
    </div>
    
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Active Cases</h2>
      <Card>
        <div className="divide-y divide-border">
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Payment Dispute</p>
              <p className="text-sm text-muted-foreground">Case #A2305-01</p>
            </div>
            <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              In Progress
            </div>
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Service Agreement Clarification</p>
              <p className="text-sm text-muted-foreground">Case #A2304-12</p>
            </div>
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Resolution Proposed
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const Legal = () => {
  const tabs = [
    {
      id: 'legal',
      title: 'Legal & Arbitration',
      content: <LegalContent />
    }
  ];

  return (
    <MainLayout>
      <TabSystem tabs={tabs} />
    </MainLayout>
  );
};

export default Legal;
