
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SentOffers = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">العروض المرسلة</h1>
        <Card>
          <CardHeader>
            <CardTitle>العروض التي قدمتها</CardTitle>
            <CardDescription>تتبع وإدارة العروض المرسلة</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قائمة العروض المرسلة سيتم تنفيذها هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SentOffers;
