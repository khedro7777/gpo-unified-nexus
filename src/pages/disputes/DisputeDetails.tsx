
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'react-router-dom';

const DisputeDetails = () => {
  const { disputeId } = useParams();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">تفاصيل النزاع #{disputeId}</h1>
        <Card>
          <CardHeader>
            <CardTitle>حالة النزاع</CardTitle>
            <CardDescription>تفاصيل ومستندات النزاع</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">تفاصيل النزاع ستظهر هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DisputeDetails;
