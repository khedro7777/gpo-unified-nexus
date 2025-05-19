
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';

const LegalContracts = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Legal Contracts</h1>
        <Card className="p-6">
          <p>Legal contracts functionality will be implemented here.</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LegalContracts;
