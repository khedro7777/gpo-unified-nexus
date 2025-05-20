
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ReceivedOffers = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Received Offers</h1>
        <Card>
          <CardHeader>
            <CardTitle>Offers for You</CardTitle>
            <CardDescription>Review and respond to offers from suppliers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Offer list will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReceivedOffers;
