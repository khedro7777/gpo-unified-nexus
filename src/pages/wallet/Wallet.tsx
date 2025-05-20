
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Wallet = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Wallet</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
            <CardDescription>Manage your funds and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Wallet functionality will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Wallet;
