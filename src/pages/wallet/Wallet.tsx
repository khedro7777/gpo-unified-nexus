
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Wallet = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">المحفظة</h1>
        <Card>
          <CardHeader>
            <CardTitle>رصيدك</CardTitle>
            <CardDescription>إدارة أموالك والمعاملات</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">وظائف المحفظة سيتم تنفيذها هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Wallet;
