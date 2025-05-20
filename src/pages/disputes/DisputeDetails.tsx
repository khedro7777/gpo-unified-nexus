
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DisputeDetails = () => {
  const { disputeId } = useParams();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dispute Details</h1>
        <Card>
          <CardHeader>
            <CardTitle>Dispute #{disputeId}</CardTitle>
            <CardDescription>View the details and status of this dispute</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Dispute details will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DisputeDetails;
