
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Settings = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">الإعدادات</h1>
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الحساب</CardTitle>
            <CardDescription>إدارة تفضيلات حسابك</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">إعدادات الحساب سيتم تنفيذها هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
