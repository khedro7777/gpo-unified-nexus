
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MyJobs = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Jobs</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Freelance Jobs</CardTitle>
            <CardDescription>Track and manage your freelance tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Job list will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MyJobs;
