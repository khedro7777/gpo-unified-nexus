
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Disputes = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">ORDA Disputes</h1>
          <Button onClick={() => navigate('/disputes/create')}>Create Dispute</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Your Disputes</CardTitle>
            <CardDescription>Manage and track your dispute cases</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Dispute list will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Disputes;
