
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CreateDispute = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Create Dispute</h1>
        <Card>
          <CardHeader>
            <CardTitle>New Dispute</CardTitle>
            <CardDescription>Fill in the details to create a new dispute case</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Dispute creation form will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateDispute;
