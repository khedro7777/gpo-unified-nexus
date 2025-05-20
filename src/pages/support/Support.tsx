
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Support = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Support</h1>
        <Card>
          <CardHeader>
            <CardTitle>Help Center</CardTitle>
            <CardDescription>Get assistance with the GPO platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Support options will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Support;
