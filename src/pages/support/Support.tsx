
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Support = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">الدعم</h1>
        <Card>
          <CardHeader>
            <CardTitle>مركز المساعدة</CardTitle>
            <CardDescription>الحصول على المساعدة من منصة GPO</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">خيارات الدعم سيتم تنفيذها هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Support;
