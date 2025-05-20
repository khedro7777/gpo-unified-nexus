
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CreateGroup = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Create Group</h1>
        <Card>
          <CardHeader>
            <CardTitle>New Group</CardTitle>
            <CardDescription>Fill in the details to create a new cooperation group</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Group creation form will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateGroup;
