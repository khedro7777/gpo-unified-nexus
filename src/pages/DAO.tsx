
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DAO = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">DAO Management</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Manage your decentralized autonomous organization and smart contracts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">Members</h3>
            <div className="text-2xl md:text-3xl font-bold mb-1">47</div>
            <p className="text-xs md:text-sm text-green-600">+3 this week</p>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">Active Proposals</h3>
            <div className="text-2xl md:text-3xl font-bold mb-1">8</div>
            <p className="text-xs md:text-sm text-muted-foreground">2 ending soon</p>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">Treasury Value</h3>
            <div className="text-2xl md:text-3xl font-bold mb-1">$128K</div>
            <p className="text-xs md:text-sm text-green-600">+12% this month</p>
          </Card>
        </div>
        
        <Card className="p-4 md:p-6">
          <h3 className="text-base md:text-lg font-medium mb-4">Smart Contracts</h3>
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border rounded gap-2">
              <div>
                <p className="font-medium text-sm md:text-base">Governance Contract</p>
                <p className="text-xs md:text-sm text-muted-foreground">0x1234...5678</p>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border rounded gap-2">
              <div>
                <p className="font-medium text-sm md:text-base">Treasury Contract</p>
                <p className="text-xs md:text-sm text-muted-foreground">0x8765...4321</p>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border rounded gap-2">
              <div>
                <p className="font-medium text-sm md:text-base">Token Contract</p>
                <p className="text-xs md:text-sm text-muted-foreground">0x9999...1111</p>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
          </div>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default DAO;
