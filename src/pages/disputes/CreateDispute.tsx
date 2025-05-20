
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CreateDispute = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">إنشاء نزاع جديد</h1>
        <Card>
          <CardHeader>
            <CardTitle>نموذج النزاع</CardTitle>
            <CardDescription>قم بملء النموذج أدناه لرفع نزاع</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">نموذج إنشاء النزاع سيتم تنفيذه هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateDispute;
