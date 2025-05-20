
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FormationRequests = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Formation Requests</h1>
        <Card>
          <CardHeader>
            <CardTitle>Company Formation</CardTitle>
            <CardDescription>Track and manage legal entity formation requests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Formation request list will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FormationRequests;
