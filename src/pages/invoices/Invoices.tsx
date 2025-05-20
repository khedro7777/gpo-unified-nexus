
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Invoices = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">الفواتير</h1>
        <Card>
          <CardHeader>
            <CardTitle>فواتيرك</CardTitle>
            <CardDescription>عرض وتنزيل سجل الفواتير الخاص بك</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قائمة الفواتير سيتم تنفيذها هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Invoices;
