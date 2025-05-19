
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';

const DAOProjects = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">DAO Projects</h1>
        <Card className="p-6">
          <p>DAO projects functionality will be implemented here.</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DAOProjects;
