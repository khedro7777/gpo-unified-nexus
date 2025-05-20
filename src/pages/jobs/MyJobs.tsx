
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MyJobs = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">وظائفي</h1>
        <Card>
          <CardHeader>
            <CardTitle>وظائفك المستقلة</CardTitle>
            <CardDescription>تتبع وإدارة مهامك المستقلة</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قائمة الوظائف سيتم تنفيذها هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MyJobs;
