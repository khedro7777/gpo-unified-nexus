
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Legal = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Legal & Compliance</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Manage legal documents, contracts, and compliance requirements.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-4">Active Contracts</h3>
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border rounded gap-2">
                <div>
                  <p className="font-medium text-sm md:text-base">Service Agreement #001</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Expires: Dec 2025</p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border rounded gap-2">
                <div>
                  <p className="font-medium text-sm md:text-base">Partnership Agreement #002</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Expires: Mar 2026</p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
            <Button className="w-full mt-4 text-xs md:text-sm">View All Contracts</Button>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-4">Compliance Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base">GDPR Compliance</span>
                <Badge variant="default">Compliant</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base">KYC Verification</span>
                <Badge variant="default">Verified</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base">Tax Documentation</span>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 text-xs md:text-sm">Update Documents</Button>
          </Card>
        </div>
      </div>
    </NewMainLayout>
  );
};

export default Legal;
