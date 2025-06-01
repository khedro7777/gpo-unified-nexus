
import React from 'react';
import SimplifiedLayout from '@/components/layout/SimplifiedLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WalletContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Wallet & Payments</h1>
    <p className="text-muted-foreground">
      Manage your organization's finances, payments, and subscriptions.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">DAO Treasury</h3>
        <div className="text-3xl font-bold mb-1">$128,450.00</div>
        <p className="text-sm text-green-600">+2.4% this month</p>
        <div className="mt-4">
          <Button variant="outline" size="sm" className="mr-2">Transfer</Button>
          <Button size="sm">Manage</Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">ETH Balance</h3>
        <div className="text-3xl font-bold mb-1">45.32 ETH</div>
        <p className="text-sm text-muted-foreground">≈ $77,044.00</p>
        <div className="mt-4">
          <Button variant="outline" size="sm">View</Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">GPO Tokens</h3>
        <div className="text-3xl font-bold mb-1">150,000</div>
        <p className="text-sm text-red-600">-0.8% this week</p>
        <div className="mt-4">
          <Button variant="outline" size="sm">View</Button>
        </div>
      </Card>
    </div>
    
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <Card>
        <div className="divide-y divide-border">
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Subscription Payment</p>
              <p className="text-sm text-muted-foreground">ERPNext monthly plan</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-red-600">-$49.99</p>
              <p className="text-xs text-muted-foreground">May 15, 2025</p>
            </div>
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Member Contribution</p>
              <p className="text-sm text-muted-foreground">From: 0x8f23...45ab</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-600">+$500.00</p>
              <p className="text-xs text-muted-foreground">May 12, 2025</p>
            </div>
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Smart Contract Deployment</p>
              <p className="text-sm text-muted-foreground">Gas fee</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-red-600">-0.05 ETH</p>
              <p className="text-xs text-muted-foreground">May 10, 2025</p>
            </div>
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Revenue Share</p>
              <p className="text-sm text-muted-foreground">Q1 Distribution</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-600">+$1,250.00</p>
              <p className="text-xs text-muted-foreground">May 1, 2025</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const Wallet = () => {
  const tabs = [
    {
      id: 'wallet',
      title: 'Wallet Overview',
      content: <WalletContent />
    }
  ];

  return (
    <SimplifiedLayout>
      <TabSystem tabs={tabs} />
    </SimplifiedLayout>
  );
};

export default Wallet;
