
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ReceivedOffers = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">العروض المستلمة</h1>
        <Card>
          <CardHeader>
            <CardTitle>العروض المقدمة إليك</CardTitle>
            <CardDescription>مراجعة وإدارة العروض المستلمة</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قائمة العروض المستلمة سيتم تنفيذها هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReceivedOffers;
