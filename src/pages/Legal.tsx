
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LegalContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Legal & Compliance</h1>
    <p className="text-muted-foreground">
      Manage legal documents, contracts, and compliance requirements.
    </p>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Active Contracts</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <p className="font-medium">Service Agreement #001</p>
              <p className="text-sm text-muted-foreground">Expires: Dec 2025</p>
            </div>
            <Badge variant="default">Active</Badge>
          </div>
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <p className="font-medium">Partnership Agreement #002</p>
              <p className="text-sm text-muted-foreground">Expires: Mar 2026</p>
            </div>
            <Badge variant="default">Active</Badge>
          </div>
        </div>
        <Button className="w-full mt-4">View All Contracts</Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Compliance Status</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>GDPR Compliance</span>
            <Badge variant="default">Compliant</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>KYC Verification</span>
            <Badge variant="default">Verified</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Tax Documentation</span>
            <Badge variant="secondary">Pending</Badge>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4">Update Documents</Button>
      </Card>
    </div>
  </div>
);

const Legal = () => {
  const tabs = [
    {
      id: 'legal',
      title: 'Legal Overview',
      content: <LegalContent />
    }
  ];

  return (
    <NewMainLayout>
      <TabSystem tabs={tabs} />
    </NewMainLayout>
  );
};

export default Legal;
