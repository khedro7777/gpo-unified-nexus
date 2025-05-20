
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Notifications = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">الإشعارات</h1>
        <Card>
          <CardHeader>
            <CardTitle>إشعاراتك</CardTitle>
            <CardDescription>تصفح أحدث التحديثات والإشعارات</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قائمة الإشعارات سيتم تنفيذها هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Notifications;
