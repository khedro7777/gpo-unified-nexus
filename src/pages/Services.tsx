
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';

const ServicesContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Services Catalog</h1>
    <p className="text-muted-foreground">
      Browse and manage integrated services for your GPO platform.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">SnapDAO Integration</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Connect to SnapDAO for governance and voting functionality.
        </p>
        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block">
          Active
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Paddle Billing</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Subscription and payment processing service.
        </p>
        <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full inline-block">
          Configuration Required
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">ERPNext</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Enterprise resource planning for financial management.
        </p>
        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block">
          Connected
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Loomio</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Deliberation and consensus-building platform.
        </p>
        <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full inline-block">
          Available
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">ODR System</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Online Dispute Resolution for arbitration.
        </p>
        <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full inline-block">
          Available
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Smart Contracts Hub</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage and deploy DAO smart contracts.
        </p>
        <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full inline-block">
          Available
        </div>
      </Card>
    </div>
  </div>
);

const Services = () => {
  const tabs = [
    {
      id: 'services',
      title: 'Services Catalog',
      content: <ServicesContent />
    }
  ];

  return (
    <MainLayout>
      <TabSystem tabs={tabs} />
    </MainLayout>
  );
};

export default Services;
