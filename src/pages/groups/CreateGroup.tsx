
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'react-router-dom';

const CreateGroup = () => {
  const { type } = useParams();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">إنشاء مجموعة جديدة</h1>
        <Card>
          <CardHeader>
            <CardTitle>إنشاء مجموعة {type}</CardTitle>
            <CardDescription>أكمل النموذج أدناه لإنشاء مجموعة جديدة</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">نموذج إنشاء المجموعة سيتم تنفيذه هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateGroup;
