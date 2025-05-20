
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FormationRequests = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">طلبات التأسيس</h1>
        <Card>
          <CardHeader>
            <CardTitle>طلبات تأسيس الشركات</CardTitle>
            <CardDescription>إدارة ومتابعة طلبات تأسيس الشركات</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قائمة طلبات التأسيس سيتم تنفيذها هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FormationRequests;
