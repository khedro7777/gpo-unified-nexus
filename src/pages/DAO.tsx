
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DAOContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">DAO Management</h1>
    <p className="text-muted-foreground">
      Manage your decentralized autonomous organization and smart contracts.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Members</h3>
        <div className="text-3xl font-bold mb-1">47</div>
        <p className="text-sm text-green-600">+3 this week</p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Active Proposals</h3>
        <div className="text-3xl font-bold mb-1">8</div>
        <p className="text-sm text-muted-foreground">2 ending soon</p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Treasury Value</h3>
        <div className="text-3xl font-bold mb-1">$128K</div>
        <p className="text-sm text-green-600">+12% this month</p>
      </Card>
    </div>
    
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Smart Contracts</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 border rounded">
          <div>
            <p className="font-medium">Governance Contract</p>
            <p className="text-sm text-muted-foreground">0x1234...5678</p>
          </div>
          <Badge variant="default">Active</Badge>
        </div>
        <div className="flex justify-between items-center p-3 border rounded">
          <div>
            <p className="font-medium">Treasury Contract</p>
            <p className="text-sm text-muted-foreground">0x8765...4321</p>
          </div>
          <Badge variant="default">Active</Badge>
        </div>
        <div className="flex justify-between items-center p-3 border rounded">
          <div>
            <p className="font-medium">Token Contract</p>
            <p className="text-sm text-muted-foreground">0x9999...1111</p>
          </div>
          <Badge variant="secondary">Pending</Badge>
        </div>
      </div>
    </Card>
  </div>
);

const DAO = () => {
  const tabs = [
    {
      id: 'dao',
      title: 'DAO Overview',
      content: <DAOContent />
    }
  ];

  return (
    <NewMainLayout>
      <TabSystem tabs={tabs} />
    </NewMainLayout>
  );
};

export default DAO;
